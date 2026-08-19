/* fan-st-ui.js: the three interactive pieces of /worlds/stranger-things/.

   1. Season scroll. Each season section carries data-season, and whichever is
      furthest down the page while still in view sets body[data-season]. The
      whole backdrop crossfades to that season, and a fixed HUD names it. This
      is the thing that makes the page: you scroll from 1983 to 1987 and
      Hawkins rots around you.

   2. The wall. Type anything and Joyce's alphabet spells it out one bulb at a
      time, on a loop, exactly as it does on the plaster.

   3. The flip, with a control at the top and the bottom of the page, so there
      is always one within reach whichever way up you are.

   Loads after reveal.js on purpose. The season sections are rendered by
   fanpage.js, and every block below is wrapped so that a fault in any one of
   the three cannot stop the others or anything after them. */

var ST_SEASONS = {
  1: { year: '1983', label: 'The Vanishing of Will Byers' },
  2: { year: '1984', label: 'The Mind Flayer' },
  3: { year: '1985', label: 'Starcourt' },
  4: { year: '1986', label: 'Vecna' },
  5: { year: '1987', label: 'The Last Season' },
};

/* ── 1. the backdrop follows the scroll ── */
(function stSeasons() {
  try {
  var secs = Array.prototype.slice.call(document.querySelectorAll('.fan-sec[data-season]'));
  if (!secs.length) return;

  var hud = document.getElementById('stHud');
  var num = document.getElementById('stHudNum');
  var yr  = document.getElementById('stHudYear');
  var lab = document.getElementById('stHudLabel');
  var body = document.body;
  var current = null;

  function paint(season) {
    if (season === current) return;
    current = season;
    if (season == null) { delete body.dataset.season; if (hud) hud.classList.remove('is-on'); return; }
    body.dataset.season = season;
    var s = ST_SEASONS[season];
    if (num) num.textContent = season;
    if (yr)  yr.textContent  = s.year;
    if (lab) lab.textContent = s.label;
    if (hud) hud.classList.add('is-on');
  }

  // whichever season section is nearest the middle of the screen wins
  function pick() {
    var mid = innerHeight / 2, best = null, bestDist = Infinity;
    secs.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight) return;
      var d = Math.abs((r.top + r.bottom) / 2 - mid);
      if (d < bestDist) { bestDist = d; best = el; }
    });
    paint(best ? best.dataset.season : null);
  }

  var raf = 0;
  addEventListener('scroll', function () {
    if (!raf) raf = requestAnimationFrame(function () { raf = 0; pick(); });
  }, { passive: true });
  addEventListener('resize', pick, { passive: true });
  pick();
  } catch (e) { /* the backdrop just stays put */ }
})();

/* ── 2. the alphabet wall spells whatever you type ── */
(function stWall() {
  try {
  var letters = Array.prototype.slice.call(document.querySelectorAll('.st-letter'));
  var input   = document.getElementById('stSay');
  if (!letters.length) return;

  var byChar = {};
  letters.forEach(function (el) { byChar[el.dataset.char] = el; });

  var timer = 0;

  function clear() {
    letters.forEach(function (el) { el.classList.remove('is-on'); });
  }

  function spell(msg) {
    clearTimeout(timer);
    clear();
    var chars = String(msg || '').toUpperCase().replace(/[^A-Z ]/g, '').split('');
    if (!chars.length) return;

    var i = 0;
    (function step() {
      clear();
      var c = chars[i];
      if (c !== ' ' && byChar[c]) byChar[c].classList.add('is-on');
      i++;
      var wait = c === ' ' ? 340 : 520;
      if (i >= chars.length) { i = 0; wait = 1500; }   // hold dark, then run it again
      timer = setTimeout(step, wait);
    })();
  }

  if (input) {
    input.addEventListener('input', function () { spell(input.value || 'run'); });
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter') e.preventDefault(); });
  }
  spell(input && input.value ? input.value : 'run');
  } catch (e) { /* the wall just stays dark */ }
})();

/* ── 3. the flip ── */
(function stFlip() {
  try {
  var btns = Array.prototype.slice.call(document.querySelectorAll('[data-flip]'));
  if (!btns.length) return;
  var body = document.body;

  function paint() {
    var down = body.classList.contains('is-upside-down');
    btns.forEach(function (b) {
      b.textContent = down ? 'Turn it upside up' : 'Turn it upside down';
      b.setAttribute('aria-pressed', down ? 'true' : 'false');
    });
  }

  btns.forEach(function (b) {
    b.addEventListener('click', function () {
      body.classList.toggle('is-upside-down');
      paint();
    });
  });
  paint();
  } catch (e) { /* the flip just does nothing */ }
})();
