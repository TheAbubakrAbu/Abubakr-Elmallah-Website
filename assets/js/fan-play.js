/* fan-play.js: the shared interactive block for the fan pages.

   LOAD ORDER MATTERS. Runs AFTER reveal.js, whole body in a try/catch. Sections
   start at opacity 0 and are revealed by reveal.js; a script that throws before
   that runs leaves the page blank. Because it runs after reveal.js has already
   done its one scan, the injected markup has to be handed back to it via
   window.AEreveal or it sits invisible forever.

   THE LAYOUT IS A HOTBAR, modelled on the Minecraft one on /worlds/minecraft/.
   Every option is a numbered slot in a single row, always visible, and picking
   one lights it. That is a much better fit than the two-column thing this used
   to be: you can see the whole set at once, it survives any number of items, and
   it reads as a game UI rather than as a form.

   Two behaviours, same furniture:
     pick -- click a slot (or press its number).
     roll -- same slots, plus a button that lands on one for you, weighted.

   A page opts in by setting window.FAN_PLAY. Emblems are single SVG paths. */
(function fanPlay() {
  try {
    var cfg = window.FAN_PLAY;
    var host = document.getElementById('fanPlay');
    if (!cfg || !host || !cfg.items || !cfg.items.length) return;

    function esc(t) {
      return String(t == null ? '' : t)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    var isRoll = cfg.kind === 'roll';
    var items = cfg.items;

    var slots = items.map(function (it, i) {
      return '<button class="fp-slot" type="button" data-i="' + i + '"'
        + ' style="--c:' + esc(it.c || '#8fa8c0') + '"'
        + ' aria-label="' + esc(it.n + (it.s ? ', ' + it.s : '')) + '" aria-pressed="false">'
        + (it.d ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="' + it.d + '"/></svg>' : '<i></i>')
        + (i < 9 ? '<u>' + (i + 1) + '</u>' : '')
        + '<span class="fp-slot-n">' + esc(it.n) + '</span>'
        + '</button>';
    }).join('');

    host.innerHTML =
      '<section class="fan-play reveal">'
      + '<div class="fp-head">'
      +   '<h3>' + esc(cfg.title || 'Try it') + '</h3>'
      +   (cfg.intro ? '<p>' + esc(cfg.intro) + '</p>' : '')
      + '</div>'
      + '<div class="fp-bar" id="fpBar" role="group" aria-label="' + esc(cfg.title || 'Choose') + '">'
      +   slots
      + '</div>'
      + '<p class="fp-hint" id="fpHint">'
      +   esc(cfg.prompt || 'Pick one.')
      +   (items.length <= 9 ? ' <span>Click a slot, or press 1–' + items.length + '.</span>' : ' <span>Click a slot.</span>')
      + '</p>'
      + (isRoll
          ? '<button class="fp-go" type="button" id="fpGo" data-magnetic>'
            + esc(cfg.button || 'Roll') + '</button>'
          : '')
      + '<div class="fp-out" id="fpOut" hidden>'
      +   '<div class="fp-out-head"><b id="fpName"></b><span id="fpSub"></span></div>'
      +   '<p id="fpNote"></p>'
      + '</div>'
      + '<p class="fp-tally" id="fpTally"></p>'
      + '</section>';

    /* Injected after reveal.js ran its scan, so hand it over -- otherwise every
       .reveal in here stays at opacity 0 and this is a blank gap in the page. */
    if (typeof window.AEreveal === 'function') {
      window.AEreveal(host);
    } else {
      var late = host.querySelectorAll('.reveal');
      for (var q = 0; q < late.length; q++) late[q].classList.add('in');
    }

    var bar = document.getElementById('fpBar');
    var hint = document.getElementById('fpHint');
    var out = document.getElementById('fpOut');
    var nameEl = document.getElementById('fpName');
    var subEl = document.getElementById('fpSub');
    var noteEl = document.getElementById('fpNote');
    var tally = document.getElementById('fpTally');
    var buttons = bar.getElementsByClassName('fp-slot');

    var counts = {};
    var busy = false;

    function show(i) {
      var it = items[i];
      for (var j = 0; j < buttons.length; j++) {
        var on = j === i;
        buttons[j].classList.toggle('is-sel', on);
        buttons[j].setAttribute('aria-pressed', on ? 'true' : 'false');
      }
      if (hint) hint.textContent = it.said || (cfg.said ? cfg.said.replace('%', it.n) : it.n);
      if (nameEl) { nameEl.textContent = it.n; nameEl.style.color = it.c || ''; }
      if (subEl) subEl.textContent = it.s || '';
      if (noteEl) noteEl.textContent = it.note || '';
      if (out) out.hidden = false;

      counts[it.n] = (counts[it.n] || 0) + 1;
      var total = 0, parts = [];
      for (var k in counts) if (counts.hasOwnProperty(k)) total += counts[k];
      if (total > 1 && tally) {
        for (var k2 in counts) if (counts.hasOwnProperty(k2)) parts.push(k2 + ' ×' + counts[k2]);
        tally.textContent = total + ' so far: ' + parts.join(' · ');
      }
    }

    for (var b = 0; b < buttons.length; b++) {
      (function (idx) {
        buttons[idx].addEventListener('click', function () { if (!busy) show(idx); });
      })(b);
    }

    /* Number keys, same as the Minecraft hotbar. */
    document.addEventListener('keydown', function (e) {
      if (busy) return;
      var t = e.target || {};
      if (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable) return;
      var n = parseInt(e.key, 10);
      if (n >= 1 && n <= Math.min(9, items.length)) { show(n - 1); e.preventDefault(); }
    });

    if (isRoll) {
      /* Weighted index pool -- items without a `w` count as 1. */
      var pool = [];
      items.forEach(function (it, i) {
        var w = it.w == null ? 1 : it.w;
        for (var x = 0; x < w; x++) pool.push(i);
      });
      var go = document.getElementById('fpGo');
      var WAIT = cfg.wait || ['…'];
      go.addEventListener('click', function () {
        if (busy) return;
        busy = true;
        go.disabled = true;
        if (out) out.hidden = true;
        var step = 0;
        var tick = setInterval(function () {
          /* Cycle the highlight while it thinks, so the bar is doing something. */
          var flick = Math.floor(Math.random() * items.length);
          for (var j = 0; j < buttons.length; j++) buttons[j].classList.toggle('is-sel', j === flick);
          if (hint) hint.textContent = WAIT[step % WAIT.length];
          step++;
          if (step >= WAIT.length) {
            clearInterval(tick);
            show(pool[Math.floor(Math.random() * pool.length)]);
            go.disabled = false;
            go.textContent = cfg.again || cfg.button || 'Again';
            busy = false;
          }
        }, cfg.beat || 320);
      });
    }
  } catch (err) { /* never take the page down with it */ }
})();
