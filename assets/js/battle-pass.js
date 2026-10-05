/* battle-pass.js: /battle-pass/, the Fortnite terminal.

   The tiers are the ordinary list of links in battle-pass.html, each carrying
   its tier number, rarity and chip label in data- attributes; this file is the
   pass around them:

     the rarity   each tile's colour, from its data-r, as one custom property
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
