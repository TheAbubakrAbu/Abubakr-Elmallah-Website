/* battle-pass.js: /battle-pass/, the Fortnite terminal.

   The tiers are the ordinary list of links in battle-pass.html, each carrying
   its tier number, rarity and chip label in data- attributes; this file is the
   pass around them:

     the rarity   each tile's color, from its data-r, as one custom property
                  the stylesheet does the rest of the work with
     the chip     the little label top right, from data-k
     the unlock   visiting a page unlocks its tier, remembered in
                  localStorage, so the pass genuinely fills in as you use the
                  site rather than being decorative
     the meter    the progress bar and the three figures, counted from the
                  tiles rather than written down

   Everything it draws is CSS; nothing here loads a file. */
(function battlePass() {
  'use strict';

  var root = document.getElementById('bp');
  if (!root) return;
  function $(id) { return document.getElementById(id); }

  /* smooth scrolling only after load, so back/forward restores the position
     instantly instead of sliding to it */
  addEventListener('load', function () {
    requestAnimationFrame(function () { requestAnimationFrame(function () {
      document.documentElement.classList.add('smooth');
    }); });
  });

  var tiers = Array.prototype.slice.call(document.querySelectorAll('.bp-tier'));
  if (!tiers.length) return;

  /* ───────────── what you have unlocked ─────────────
     A visit to one of these pages unlocks its tier. The pass reads the same
     key every interface-ish switch on this site reads, wrapped in try/catch
     because private mode throws on the getter as well as the setter. */
  var KEY = 'ae-bp-unlocked';
  var got = {};
  try { got = JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) { got = {}; }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(got)); } catch (e) { /* private mode */ }
  }

  /* this very page counts as visited, and so does whatever brought you here */
  function mark(href) {
    if (!href) return false;
    if (got[href]) return false;
    got[href] = 1;
    return true;
  }

  var legendary = 0, top = 0;

  /* refresh() reads both of these on its first call, so they are declared
     before it rather than beside the code that fills them */
  var nodes = [];     /* the track's tier nodes, built further down */
  var stars = 0;      /* Battle Stars the challenges have paid out */

  tiers.forEach(function (tile) {
    var rar = tile.getAttribute('data-r') || 'common';
    var chip = tile.getAttribute('data-k') || '';
    var t = parseInt(tile.getAttribute('data-t'), 10);
    if (!isNaN(t) && t > top) top = t;
    if (rar === 'legendary') legendary++;

    /* the rarity is one property; battle-pass.css draws the border, the wash,
       the glow and the chip from it */
    tile.style.setProperty('--rar', 'var(--c-' + rar + ')');

    var chipEl = tile.querySelector('.bp-tier-i');
    if (chipEl && chip) chipEl.textContent = chip;

    var href = tile.getAttribute('href');
    if (href && got[href]) tile.classList.add('is-on');

    /* clicking a tier unlocks it on the way out, so coming back shows it won */
    tile.addEventListener('click', function () {
      if (mark(href)) { save(); tile.classList.add('is-on'); }
    });
  });

  function refresh() {
    var on = tiers.filter(function (t) { return t.classList.contains('is-on'); }).length;
    var pct = Math.round((on / tiers.length) * 100);
    if ($('bpDone')) $('bpDone').textContent = on;
    if ($('bpTotal')) $('bpTotal').textContent = tiers.length;
    if ($('bpLeg')) $('bpLeg').textContent = legendary;
    if ($('bpFootN')) $('bpFootN').textContent = tiers.length;
    if ($('bpPct')) $('bpPct').textContent = pct + '%';
    if ($('bpFill')) $('bpFill').style.width = pct + '%';
    /* the tier in the top bar is the highest one actually unlocked, which is
       how a pass reads: your level, not your percentage */
    var hi = 0;
    tiers.forEach(function (t) {
      if (!t.classList.contains('is-on')) return;
      var n = parseInt(t.getAttribute('data-t'), 10);
      if (!isNaN(n) && n > hi) hi = n;
    });
    if ($('bpTier')) $('bpTier').textContent = hi || 1;

    /* the track nodes light with the tiles they were built from */
    nodes.forEach(function (node) {
      node.classList.toggle('is-on', node.tile.classList.contains('is-on'));
    });

    /* the wallet: a pass pays V-Bucks as it fills, and the stars are what
       the challenges have handed over. Both are counted, not written down. */
    if ($('bpVb')) $('bpVb').textContent = (on * 50).toLocaleString();
    if ($('bpStars2')) $('bpStars2').textContent = stars;
  }

  /* ───────────── the track ─────────────
     The horizontal road of tier nodes, built from the same tiles as the grid
     so the two can never disagree: one node per tier, in tier order, each a
     link to the same page its tile points at. */
  var track = $('bpTrack');

  if (track) {
    tiers.slice().sort(function (a, b) {
      return (parseInt(a.getAttribute('data-t'), 10) || 0) - (parseInt(b.getAttribute('data-t'), 10) || 0);
    }).forEach(function (tile) {
      var t = tile.getAttribute('data-t') || '';
      var rar = tile.getAttribute('data-r') || 'common';
      var b = tile.querySelector('b');
      var name = b ? b.textContent : '';

      var node = document.createElement('a');
      node.className = 'bp-node' + (t === '100' ? ' bp-node--100' : '');
      node.href = tile.getAttribute('href') || '/';
      node.setAttribute('role', 'listitem');
      node.style.setProperty('--rar', 'var(--c-' + rar + ')');
      node.innerHTML = '<span class="bp-node-d"></span><span class="bp-node-t"></span>';
      node.firstChild.textContent = t;
      node.lastChild.textContent = name;
      node.setAttribute('aria-label', 'Tier ' + t + ': ' + name + ', ' + rar);
      node.tile = tile;
      track.appendChild(node);
      nodes.push(node);
    });

    /* the arrows move the road by roughly a screenful, which is what the
       shoulder buttons do on that screen */
    var nudge = function (dir) {
      var vertical = track.scrollHeight > track.clientHeight + 4
                  && track.scrollWidth <= track.clientWidth + 4;
      var by = dir * Math.max(160, (vertical ? track.clientHeight : track.clientWidth) * 0.8);
      if (vertical) track.scrollTop += by; else track.scrollLeft += by;
    };
    if ($('bpTrkL')) $('bpTrkL').addEventListener('click', function () { nudge(-1); });
    if ($('bpTrkR')) $('bpTrkR').addEventListener('click', function () { nudge(1); });

    /* and the arrow keys do it too, since the track takes focus */
    track.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { nudge(1); e.preventDefault(); }
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { nudge(-1); e.preventDefault(); }
    });
  }

  /* ───────────── the challenges ─────────────
     Each one carries the stars it pays. Six of the seven are already done,
     because they are things that have actually happened; the last one is
     reading to the bottom of this page, which an observer can genuinely
     settle, so the pass has one challenge you complete by being here. */
  var chals = Array.prototype.slice.call(document.querySelectorAll('#bpChals li'));

  chals.forEach(function (li) {
    var n = parseInt(li.getAttribute('data-stars'), 10) || 0;
    var done = (li.querySelector('em') || {}).textContent || '';
    /* "19 / 19" is done; "0 / 1" is not. Reading it off the printed count
       keeps the badge and the figure from ever disagreeing. */
    var parts = done.split('/');
    var got = parseFloat(parts[0]), need = parseFloat(parts[1]);
    var complete = !isNaN(got) && !isNaN(need) && got >= need && need > 0;
    if (complete) { li.classList.add('is-done'); stars += n; }

    var st = document.createElement('span');
    st.className = 'bp-chal-st';
    st.textContent = '★ ' + n;
    li.appendChild(st);
  });

  /* the last challenge: reading to the bottom. Watching the footer rather
     than a scroll number, so it is true on a tall phone and a short laptop
     alike, and it pays its stars once. */
  var last = chals[chals.length - 1];
  if (last && 'IntersectionObserver' in window) {
    var foot = document.querySelector('.bp-bottom');
    if (foot) {
      var io = new IntersectionObserver(function (entries) {
        if (!entries.some(function (en) { return en.isIntersecting; })) return;
        io.disconnect();
        var em = last.querySelector('em');
        if (em) em.textContent = '1 / 1';
        last.classList.add('is-done');
        stars += parseInt(last.getAttribute('data-stars'), 10) || 0;
        refresh();
      }, { threshold: 0.3 });
      io.observe(foot);
    }
  }

  /* the bar animates from zero on load rather than appearing already filled */
  requestAnimationFrame(function () { requestAnimationFrame(refresh); });

  /* "claim every tier": the button every one of these games does not give you */
  var claim = $('bpClaim');
  if (claim) claim.addEventListener('click', function () {
    var all = tiers.every(function (t) { return t.classList.contains('is-on'); });
    tiers.forEach(function (t) {
      var href = t.getAttribute('href');
      if (all) { delete got[href]; t.classList.remove('is-on'); }
      else { if (href) got[href] = 1; t.classList.add('is-on'); }
    });
    save();
    claim.textContent = all ? 'Claim every tier' : 'Reset the pass';
    refresh();
  });
  /* and the label starts out saying the right thing */
  if (claim && tiers.every(function (t) { return t.classList.contains('is-on'); })) {
    claim.textContent = 'Reset the pass';
  }
})();
