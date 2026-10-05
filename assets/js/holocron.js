/* holocron.js: /holocron/, the Jedi Archives.

   Four small jobs:
     1. Every record's title spelled in Aurebesh, by letter name, the way
        /star-wars/ spells it: digraphs first (they are one character in the
        alphabet), then single letters. Written from the title itself, so
        the spelling can never drift from the name above it.
     2. The gatekeeper: a real search over the records, by title, subtitle
        and the extra words in data-k. No match gets the Archives' answer.
     3. Opening and sealing the holocron.
     4. The live readouts: local time, and a stardate counted from Yavin. */
(function holocron() {
  'use strict';
  var root = document.getElementById('hc');
  if (!root) return;
  var $ = function (id) { return document.getElementById(id); };
  var reduced = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── 1. Aurebesh ── */
  var LETTERS = {
    a: 'Aurek', b: 'Besh', c: 'Cresh', d: 'Dorn', e: 'Esk', f: 'Forn', g: 'Grek', h: 'Herf',
    i: 'Isk', j: 'Jenth', k: 'Krill', l: 'Leth', m: 'Mern', n: 'Nern', o: 'Osk', p: 'Peth',
    q: 'Qek', r: 'Resh', s: 'Senth', t: 'Trill', u: 'Usk', v: 'Vev', w: 'Wesk', x: 'Xesh',
    y: 'Yirt', z: 'Zerek'
  };
  var DIGRAPHS = { ch: 'Cherek', ae: 'Enth', eo: 'Onith', kh: 'Krenth', ng: 'Nen', oo: 'Orenth', sh: 'Shen', th: 'Thesh' };
  function aurebesh(text) {
    // accents off (Résumé is Resh Esk Senth...), then letters only, word by word
    var words = String(text).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().split(/[^a-z]+/);
    return words.filter(Boolean).map(function (w) {
      var out = [], i = 0;
      while (i < w.length) {
        var two = w.substr(i, 2);
        if (DIGRAPHS[two]) { out.push(DIGRAPHS[two]); i += 2; continue; }
        out.push(LETTERS[w[i]]); i += 1;
      }
      return out.join(' · ');
    }).join('  /  ');
  }

  var recs = Array.prototype.slice.call(document.querySelectorAll('.hc-rec'));
  recs.forEach(function (a, n) {
    var em = a.querySelector('em'), b = a.querySelector('b');
    if (em && b) { em.textContent = aurebesh(b.textContent); em.setAttribute('aria-hidden', 'true'); }
    a.style.setProperty('--n', n);
  });

  /* ── 2. the gatekeeper ── */
  var NUMBERS = ['No', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'];
  var ask = $('hcAsk'), answer = $('hcAnswer');
  function count(n) { return (n <= 10 ? NUMBERS[n] : String(n)) + (n === 1 ? ' record' : ' records'); }
  function search() {
    var q = (ask.value || '').trim().toLowerCase();
    var shown = 0;
    recs.forEach(function (a) {
      var hay = (a.textContent + ' ' + (a.dataset.k || '')).toLowerCase();
      var hit = !q || q.split(/\s+/).every(function (t) { return hay.indexOf(t) !== -1; });
      a.hidden = !hit;
      if (hit) shown++;
    });
    document.querySelectorAll('.hc-wing').forEach(function (w) {
      w.hidden = !w.querySelector('.hc-rec:not([hidden])');
    });
    answer.classList.toggle('is-void', shown === 0);
    if (!q) answer.textContent = 'Twenty-five records in the archive.';
    else if (!shown) answer.textContent = 'If an item does not appear in our records, it does not exist.';
    else answer.textContent = count(shown) + (shown === 1 ? ' answers' : ' answer') + ' to “' + ask.value.trim() + '”.';
  }
  if (ask && answer) ask.addEventListener('input', search);

  /* ── 3. open and seal ── */
  var open = $('hcOpen');
  if (open) open.addEventListener('click', function () {
    root.classList.add('is-open');
    open.textContent = 'The holocron is open';
    setTimeout(function () {
      var r = $('records'); if (r) r.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
    }, reduced ? 0 : 700);
  });
  var cube = $('hcCube');
  if (cube && open) cube.parentNode.addEventListener('click', function () { open.click(); });

  var seal = $('hcSeal');
  if (seal) seal.addEventListener('click', function () { root.classList.remove('is-open'); root.classList.add('is-sealed'); });
  // back from the next page, the sealed screen is still up; take it down
  addEventListener('pageshow', function (e) { if (e.persisted) root.classList.remove('is-sealed'); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') root.classList.remove('is-sealed'); });

  /* ── 4. the readouts ── */
  var clock = $('hcClock'), star = $('hcStardate');
  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  function tick() {
    var d = new Date();
    if (clock) clock.textContent = pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds());
    if (star) {
      var day = Math.floor((d - new Date(d.getFullYear(), 0, 1)) / 86400000) + 1;
      // the years since 1977, when the Death Star was destroyed on screen
      star.textContent = 'Stardate ' + (d.getFullYear() - 1977) + '.' + pad(day % 100) + ' ABY · ' + pad(d.getHours()) + pad(d.getMinutes());
    }
  }
  tick(); setInterval(tick, 1000);

  /* ── 5. the era ──
     One data-era on .hc re-tints the whole hall (holocron.css redefines its
     tokens per era), and the keeper's note and the top bar say where you are
     reading from. The records are untouched by design: a holocron outlasting
     the order that kept it is the entire conceit of the page.

     Remembered in localStorage, the same way the rest of the site keeps a
     switch, and wrapped in try/catch because private mode throws on the
     getter as well as the setter. */
  var ERAS = {
    republic: {
      bar: 'Jedi Archives \u00b7 Temple of Coruscant \u00b7 Level 4',
      note: 'The Archives are open, the Order is at its height, and every record here is '
          + 'catalogued, cross-referenced and quietly assumed to be complete.',
    },
    empire: {
      bar: 'Imperial Archive \u00b7 Seized Holdings \u00b7 Coruscant',
      note: 'The Temple has fallen and the Archives are Imperial property. The holocron survived '
          + 'because a holocron is the one record you cannot edit: everything in it is still here, '
          + 'which is exactly why it was supposed to be destroyed.',
    },
    newrepublic: {
      bar: 'Recovered Holocron \u00b7 New Jedi Archive \u00b7 Unlisted',
      note: 'Found, carried a long way, and read again. The catalogue marks are the original ones, '
          + 'because whoever reopened this had no authority to renumber anything and knew better '
          + 'than to try.',
    },
  };

  (function era() {
    var rail = $('hcEra');
    if (!rail) return;
    var note = $('hcEraNote'), bar = $('hcTopMid');
    var tabs = Array.prototype.slice.call(rail.querySelectorAll('.hc-era-tab'));
    var KEY = 'ae-holocron-era';

    function apply(k, save) {
      var e = ERAS[k];
      if (!e) return;
      root.setAttribute('data-era', k);
      if (note) note.textContent = e.note;
      if (bar) bar.textContent = e.bar;
      tabs.forEach(function (t) {
        var r = t.querySelector('input[type=radio]');
        var on = !!r && r.value === k;
        t.classList.toggle('is-on', on);
        if (on && r) r.checked = true;
      });
      if (save) { try { localStorage.setItem(KEY, k); } catch (err) { /* private mode */ } }
    }

    rail.addEventListener('change', function (ev) {
      var r = ev.target.closest('input[type=radio]');
      if (r) apply(r.value, true);
    });

    var saved;
    try { saved = localStorage.getItem(KEY); } catch (err) { saved = null; }
    apply(saved && ERAS[saved] ? saved : 'republic', false);
  })();

  /* ── 6. kyber ──
     Bonding a crystal re-lights the whole archive in its colour: one
     data-kyber on .hc, and holocron.css does the rest. Remembered the same
     way the era is, and "Archive" hands the hall back to its projector blue. */
  var KY = {
    none:   'No crystal bonded. The archive runs on its own projector blue.',
    blue:   'Blue, bonded. The Guardian\u2019s blade: the Jedi who leads with it.',
    green:  'Green, bonded. The Consular\u2019s blade: the Jedi who leads with the Force.',
    yellow: 'Yellow, bonded. The Sentinel\u2019s blade, and the Temple Guards\u2019 pikes.',
    purple: 'Purple, bonded. Vaapad: a form that works right at the edge of the dark.',
    red:    'Red, bonded. A crystal bled by a Sith. Not grown, stolen.',
    white:  'White, bonded. A bled crystal healed again, answering to nobody.',
  };

  (function kyber() {
    var box = $('hcKyber');
    if (!box) return;
    var note = $('hcKyberN');
    var tabs = Array.prototype.slice.call(box.querySelectorAll('.hc-ky'));
    var KEY = 'ae-holocron-kyber';

    function apply(k, save) {
      if (!KY[k]) k = 'none';
      if (k === 'none') root.removeAttribute('data-kyber');
      else root.setAttribute('data-kyber', k);
      if (note) note.textContent = KY[k];
      tabs.forEach(function (t) {
        var r = t.querySelector('input[type=radio]');
        var on = !!r && r.value === k;
        t.classList.toggle('is-on', on);
        if (on && r) r.checked = true;
      });
      if (save) { try { localStorage.setItem(KEY, k); } catch (e) { /* private mode */ } }
    }

    box.addEventListener('change', function (ev) {
      var r = ev.target.closest('input[type=radio]');
      if (r) apply(r.value, true);
    });

    var saved;
    try { saved = localStorage.getItem(KEY); } catch (e) { saved = null; }
    apply(saved && KY[saved] ? saved : 'none', false);
  })();

  /* smooth scrolling only after load, so back/forward restores the position instantly */
  addEventListener('load', function () {
    requestAnimationFrame(function () { requestAnimationFrame(function () {
      document.documentElement.classList.add('smooth');
    }); });
  });
})();
