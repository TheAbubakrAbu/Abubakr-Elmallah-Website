/* pokedex.js: /pokedex/, the Pokémon terminal.

   The red Kanto Pokédex, open on the page. The entries are the ordinary
   list of links in pokedex.html, each carrying its dex data in data-
   attributes; this file is the device around them:

     the screen   the chosen entry: its number, name, types, height and
                  weight, a pixel glyph of its own, and the field note
                  typed out a letter at a time, as the old games did
     the walk     pointing at or tabbing to an entry chooses it; the
                  D-pad and the arrow keys walk the list (up and down by
                  one, left and right by five, as the old list paged), A
                  opens the chosen room and B plays its cry
     the cry      every entry has a cry of its own, built on the spot
                  from its number with Web Audio square waves, the way
                  the handhelds built theirs from a few base sounds
     the clock    the second generation's clock: weekday, MORN, DAY or
                  NITE, and the time
     the save     "Saving... Don't turn off the power."

   Everything it draws is boxes and SVG; nothing here loads a file. */
(function pokedex() {
  'use strict';

  var root = document.getElementById('px');
  if (!root) return;
  function $(id) { return document.getElementById(id); }
  var reduced = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  function pad(n, w) { n = '' + n; while (n.length < (w || 2)) n = '0' + n; return n; }

  /* smooth scrolling only after load, so back/forward restores the position instantly instead of sliding to it */
  addEventListener('load', function () {
    requestAnimationFrame(function () { requestAnimationFrame(function () {
      document.documentElement.classList.add('smooth');
    }); });
  });

  /* ───────────── the clock ───────────── */

  // The second generation split the day in three: morning from four,
  // day from ten, night from six in the evening.
  var DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  var clock = $('pxClock');
  function tick() {
    var d = new Date(), h = d.getHours();
    var part = h >= 4 && h < 10 ? 'MORN' : h >= 10 && h < 18 ? 'DAY' : 'NITE';
    if (clock) clock.textContent = DAYS[d.getDay()] + ' ' + part + ' ' + pad(h) + ':' + pad(d.getMinutes());
  }
  tick(); setInterval(tick, 15000);

  // the trainer card's TIME: how long this card has been open
  var opened = Date.now(), timeEl = $('pxTime');
  setInterval(function () {
    var s = Math.floor((Date.now() - opened) / 1000);
    if (timeEl) timeEl.textContent = Math.floor(s / 60) + ':' + pad(s % 60);
  }, 1000);

  /* ───────────── the glyphs ───────────── */

  // One 12 by 12 drawing per entry, in the screen's two dark greens:
  // # is the darkest, + the middle, . the screen showing through. None of
  // them is a Pokémon; each is the room's own thing.
  var GLYPHS = {
    home: [
      '.....##.....', '....#++#....', '...#++++#...', '..#++++++#..', '.#++++++++#.', '############',
      '.#++++++++#.', '.#+##++##+#.', '.#+##++##+#.', '.#+++##+++#.', '.#+++##+++#.', '.##########.'],
    case: [
      '............', '....####....', '....#..#....', '############', '#++++++++++#', '#++++++++++#',
      '#####++#####', '#++++##++++#', '#++++++++++#', '#++++++++++#', '############', '............'],
    apps: [
      '.####..####.', '.#++#..#++#.', '.#++#..#++#.', '.####..####.', '............', '............',
      '.####...##..', '.#++#...##..', '.#++#.######', '.####.######', '........##..', '........##..'],
    book: [
      '............', '.####..####.', '#++++##++++#', '#+##+##+##+#', '#++++##++++#', '#+##+##+##+#',
      '#++++##++++#', '#+##+##+##+#', '#++++##++++#', '#####..#####', '.....##.....', '............'],
    cap: [
      '............', '.....##.....', '...##++##...', '.##++++++##.', '#++++++++++#', '.##++++++##.',
      '..###++###.#', '..#++##++#.#', '..#++++++#.#', '...######..#', '..........##', '............'],
    bell: [
      '.....##.....', '....####....', '...#++++#...', '..#++++++#..', '..#++++++#..', '..#++++++#..',
      '.#++++++++#.', '.#++++++++#.', '############', '############', '.....##.....', '....####....'],
    globe: [
      '....####....', '..##++++##..', '.#+###+++##.', '.#+####+###.', '#++###++##+#', '#+++##+++++#',
      '#++++++##++#', '#+++++####+#', '.#+++++####.', '.#++++++#+#.', '..##++++##..', '....####....'],
    ball: [
      '....####....', '..##++++##..', '.#++++++++#.', '.#++++++++#.', '#+++####+++#', '####+..+####',
      '#...+..+...#', '#...####...#', '.#........#.', '.#........#.', '..##....##..', '....####....'],
    pad: [
      '.##########.', '.#........#.', '.#...#....#.', '.#..###...#.', '.#.#####..#.', '.#..###...#.',
      '.#..#.#...#.', '.#........#.', '.#........#.', '.##########.', '.#++++##++#.', '.##########.'],
    moon: [
      '...####.....', '.####.......', '.###........', '###......#..', '##......###.', '##.......#..',
      '##..........', '###.........', '.###......#.', '.####...###.', '..########..', '....####....'],
    plane: [
      '.....##.....', '....#++#....', '....#++#....', '...##++##...', '.##++++++##.', '############',
      '....#++#....', '....#++#....', '....#++#....', '...##++##...', '..##++++##..', '..########..'],
    talk: [
      '............', '.##########.', '#++++++++++#', '#+##+##+##+#', '#++++++++++#', '#+######+++#',
      '#++++++++++#', '.####+####..', '....#+#.....', '....##......', '............', '............'],
    pad2: [
      '............', '............', '..########..', '.#++++++++#.', '#++#++++#++#', '#+###++#+#+#',
      '#++#++++#++#', '#++++++++++#', '#+###..###+#', '.##......##.', '............', '............'],
    saber: [
      '..........##', '.........#+#', '........#+#.', '.......#+#..', '......#+#...', '.....#+#....',
      '....#+#.....', '...###......', '..####......', '..###.......', '.##.........', '##..........'],
    page: [
      '.#######....', '.#+++++##...', '.#+++++#+#..', '.#+++++####.', '.#++++++++#.', '.#+######+#.',
      '.#++++++++#.', '.#+######+#.', '.#++++++++#.', '.#+####+++#.', '.#++++++++#.', '.##########.']
  };
  // each glyph as two SVG paths, one per shade, a unit square per pixel
  function glyphSVG(name) {
    var rows = GLYPHS[name] || GLYPHS.home, d1 = '', d2 = '';
    for (var y = 0; y < 12; y++) {
      for (var x = 0; x < 12; x++) {
        var c = (rows[y] || '').charAt(x), sq = 'M' + x + ' ' + y + 'h1v1h-1z';
        if (c === '#') d1 += sq; else if (c === '+') d2 += sq;
      }
    }
    return '<path class="px-px2" d="' + d2 + '"/><path class="px-px1" d="' + d1 + '"/>';
  }

  /* ───────────── the screen ───────────── */

  var rows = Array.prototype.slice.call(document.querySelectorAll('#pxList .px-row'));
  var entries = rows.map(function (a) {
    return {
      a: a,
      no: a.querySelector('.px-row-no').textContent,
      name: a.querySelector('.px-row-t b').textContent,
      real: a.querySelector('.px-row-t i').textContent,
      types: Array.prototype.map.call(a.querySelectorAll('.px-ty'), function (t) { return t.textContent; }),
      ht: a.getAttribute('data-ht'), wt: a.getAttribute('data-wt'),
      dex: a.getAttribute('data-dex'), glyph: a.getAttribute('data-glyph')
    };
  });
  var N = entries.length, cur = -1;
  var card = $('pxCard'), lens = $('pxLens'), dexEl = $('pxDex');
  var leds = [$('pxLedR'), $('pxLedY'), $('pxLedG')];

  function flashLens() {
    if (!lens || reduced) return;
    lens.classList.remove('is-flash'); void lens.offsetWidth; lens.classList.add('is-flash');
  }
  function led(i, on) { if (leds[i]) leds[i].classList.toggle('is-on', !!on); }

  // The field note types out a letter at a time. The rest of the line sits
  // after the caret, written but invisible, so it already takes its space.
  var typing = 0;
  function typeDex(text) {
    clearInterval(typing);
    if (!dexEl) return;
    if (reduced) { dexEl.textContent = text; return; }
    var i = 0, shown = document.createElement('span'), caret = document.createElement('span'), ghost = document.createElement('span');
    caret.className = 'px-caret'; ghost.className = 'px-ghost';
    dexEl.textContent = ''; dexEl.appendChild(shown); dexEl.appendChild(caret); dexEl.appendChild(ghost);
    ghost.textContent = text;
    led(1, true);
    typing = setInterval(function () {
      i = Math.min(text.length, i + 2);
      shown.textContent = text.slice(0, i); ghost.textContent = text.slice(i);
      led(1, (i >> 2) % 2 === 0);
      if (i >= text.length) { clearInterval(typing); led(1, false); }
    }, 22);
  }

  function show(i, opts) {
    i = ((i % N) + N) % N;
    var e = entries[i];
    if (i === cur && !(opts && opts.force)) return;
    if (cur >= 0) entries[cur].a.classList.remove('is-sel');
    cur = i; e.a.classList.add('is-sel');

    $('pxNo').textContent = 'No.' + e.no;
    $('pxName').textContent = e.name;
    $('pxReal').textContent = e.real;
    $('pxTypes').innerHTML = e.types.map(function (t) { return '<span>' + t + '</span>'; }).join('');
    $('pxHt').textContent = e.ht;
    $('pxWt').textContent = e.wt;
    $('pxGlyph').innerHTML = glyphSVG(e.glyph);
    $('pxMini').textContent = e.no + '/' + pad(N, 3);
    typeDex(e.dex);

    if (card && !reduced) { card.classList.remove('is-flip'); void card.offsetWidth; card.classList.add('is-flip'); }
    flashLens();
    if (opts && opts.scroll) keepInView(e.a);
  }

  // Walking with the D-pad keeps the chosen row on screen, but only nudges
  // the page when the row has gone out of view (and never on first paint).
  function keepInView(el) {
    var r = el.getBoundingClientRect();
    if (r.top < 70 || r.bottom > innerHeight - 20) el.scrollIntoView({ block: 'nearest', behavior: reduced ? 'auto' : 'smooth' });
  }

  rows.forEach(function (a, i) {
    a.addEventListener('mouseenter', function () { show(i); });
    a.addEventListener('focus', function () { show(i); });
  });

  // The arrow keys walk the list while focus is in it, moving focus with
  // the cursor, so Tab and Enter keep working as they always do. A and B
  // are the buttons of the same names.
  var list = $('pxList');
  if (list) list.addEventListener('keydown', function (ev) {
    if (ev.altKey || ev.ctrlKey || ev.metaKey) return;
    var step = { ArrowUp: -1, ArrowDown: 1, ArrowLeft: -5, ArrowRight: 5 }[ev.key];
    if (step) {
      ev.preventDefault();
      var to = Math.max(0, Math.min(N - 1, cur + step));
      entries[to].a.focus();
      return;
    }
    if (ev.key === 'a' || ev.key === 'A') { ev.preventDefault(); press($('pxA')); open(); }
    else if (ev.key === 'b' || ev.key === 'B') { ev.preventDefault(); press($('pxB')); cry(cur); }
  });

  function press(btn) {
    if (!btn) return;
    btn.classList.add('is-down');
    setTimeout(function () { btn.classList.remove('is-down'); }, 140);
  }
  function open() { if (cur >= 0) location.href = entries[cur].a.getAttribute('href'); }

  // the D-pad: up and down by one, left and right by five, round the ends
  Array.prototype.forEach.call(document.querySelectorAll('.px-dp'), function (b) {
    b.addEventListener('click', function () {
      var step = +b.getAttribute('data-step');
      var to = Math.abs(step) === 1 ? cur + step : Math.max(0, Math.min(N - 1, cur + step));
      show(to, { scroll: true });
    });
  });
  var A = $('pxA'), B = $('pxB');
  if (A) A.addEventListener('click', open);
  if (B) B.addEventListener('click', function () { cry(cur); });
  var mCry = $('pxMenuCry'), mOpen = $('pxMenuOpen');
  if (mCry) mCry.addEventListener('click', function () { cry(cur); });
  if (mOpen) mOpen.addEventListener('click', open);

  /* ───────────── the cry ───────────── */

  // The handhelds had a few dozen base cries and gave each creature its
  // own by changing the pitch and the length. These are built the same
  // way, from the entry's number: a seeded run of three to five square-wave
  // chirps, each sliding between two pitches, with a little vibrato, and
  // a triangle under the last one. Quiet, and only ever on a press.
  var ctx = null;
  function seeded(n) { var s = n * 9301 + 49297; return function () { s = (s * 9301 + 49297) % 233280; return s / 233280; }; }
  function cry(i) {
    if (i < 0) return;
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    if (!ctx) ctx = new AC();
    if (ctx.state === 'suspended') ctx.resume();
    var r = seeded(i + 1), t = ctx.currentTime + 0.02, base = 260 + r() * 380;
    var out = ctx.createGain(); out.gain.value = 0.05; out.connect(ctx.destination);
    var parts = 3 + Math.floor(r() * 3), end = t;
    for (var k = 0; k < parts; k++) {
      var len = 0.06 + r() * 0.14, o = ctx.createOscillator(), g = ctx.createGain();
      o.type = 'square';
      var f1 = base * (0.7 + r() * 0.9), f2 = f1 * (0.6 + r() * 0.9);
      o.frequency.setValueAtTime(f1, end);
      o.frequency.exponentialRampToValueAtTime(f2, end + len);
      var lfo = ctx.createOscillator(), depth = ctx.createGain();
      lfo.frequency.value = 18 + r() * 14; depth.gain.value = f1 * 0.03;
      lfo.connect(depth); depth.connect(o.frequency);
      g.gain.setValueAtTime(0.0001, end);
      g.gain.exponentialRampToValueAtTime(1, end + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, end + len);
      o.connect(g); g.connect(out);
      o.start(end); lfo.start(end); o.stop(end + len + 0.02); lfo.stop(end + len + 0.02);
      end += len * (0.75 + r() * 0.3);
    }
    var tri = ctx.createOscillator(), tg = ctx.createGain();
    tri.type = 'triangle'; tri.frequency.setValueAtTime(base / 2, t);
    tri.frequency.exponentialRampToValueAtTime(base / 3, end);
    tg.gain.setValueAtTime(0.0001, t); tg.gain.exponentialRampToValueAtTime(0.8, t + 0.02); tg.gain.exponentialRampToValueAtTime(0.0001, end + 0.05);
    tri.connect(tg); tg.connect(out); tri.start(t); tri.stop(end + 0.08);

    // the screen while it plays: the wave orb by the glyph, the red light
    // on, and the lens pulsing once per chirp
    var ms = (end - t) * 1000 + 120;
    root.classList.add('is-crying'); led(0, true); flashLens();
    clearTimeout(cry.t);
    cry.t = setTimeout(function () { root.classList.remove('is-crying'); led(0, false); }, ms);
  }

  /* ───────────── boot ───────────── */

  // The screen comes up scanning, the lights run once, and the first entry
  // appears. With reduced motion it is simply on.
  function boot() {
    root.classList.add('is-booted');
    show(0, { force: true });
    led(2, true);
  }
  if (reduced) boot();
  else {
    [0, 1, 2].forEach(function (k) {
      setTimeout(function () { led(k, true); }, 150 + k * 160);
      setTimeout(function () { led(k, false); }, 450 + k * 160);
    });
    setTimeout(boot, 1100);
  }

  /* ───────────── the save ───────────── */

  var saveBtn = $('pxSaveBtn'), doneT = $('pxDoneT'), saveT = 0;
  var SAVING = 'Saving… Don’t turn off the power.';
  var SAVED = 'ABUBAKR saved the game.';
  function save() {
    root.classList.add('is-saved');
    if (doneT) doneT.textContent = SAVING;
    clearTimeout(saveT);
    saveT = setTimeout(function () { if (doneT) doneT.textContent = SAVED; }, reduced ? 300 : 1900);
    var home = $('pxDoneHome');
    setTimeout(function () { if (home) home.focus(); }, 50);
  }
  function unsave() {
    clearTimeout(saveT);
    if (!root.classList.contains('is-saved')) return;
    root.classList.remove('is-saved');
    if (doneT) doneT.textContent = SAVING;
  }
  if (saveBtn) saveBtn.addEventListener('click', save);
  var back = $('pxDoneBack');
  if (back) back.addEventListener('click', function () { unsave(); if (saveBtn) saveBtn.focus(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && root.classList.contains('is-saved')) { unsave(); if (saveBtn) saveBtn.focus(); }
  });
  // back from the next page, the save screen is still up; take it down
  addEventListener('pageshow', function (e) { if (e.persisted) unsave(); });
})();
