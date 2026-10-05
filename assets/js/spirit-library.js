/* spirit-library.js: /spirit-library/, the Avatar terminal.

   Everything that moves on the page, and all of it is real arithmetic
   rather than decoration:

     the moon      the phase for any moment, from the new and full moon
                   times in Jean Meeus's Astronomical Algorithms (ch. 49).
                   Good to a few minutes; it puts the new moon of 2 August
                   2027 one minute off that eclipse's real maximum.
     the sky       the desert above the tower follows your clock: day,
                   dusk or night, with the sun and the moon on a simple
                   arc (rise in the east at six, high at noon, down at six)
                   and the moon behind the sun by its age, which is why a
                   full moon rises as the sun sets.
     the shelves   each nation's scrolls unroll as its shelf comes into view.
     the ceiling   the planetarium: two date rings turned like a lock, the
                   sun and the moon on their tracks, any date from 1900 to
                   2100, and the real solar eclipses of the next few years.
     the sand      leaving buries the library, and the back button digs it
                   out again. */
(function spiritLibrary() {
  'use strict';

  var root = document.getElementById('sl');
  if (!root) return;
  window.slReady = true;   // the page's own failsafe (in its <head>) checks for this
  var reduced = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var SVGNS = 'http://www.w3.org/2000/svg';
  function $(id) { return document.getElementById(id); }
  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  function el(tag, attrs, parent) {
    var e = document.createElementNS(SVGNS, tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }
  // xorshift, seeded, so the stars are in the same places on every visit
  function rng(seed) {
    var s = seed >>> 0 || 1;
    return function () { s ^= s << 13; s ^= s >>> 17; s ^= s << 5; return (s >>> 0) / 4294967296; };
  }

  /* ───────────── the moon ───────────── */

  var RAD = Math.PI / 180;
  var SYN = 29.530588861;   // the mean synodic month, in days

  /* the Julian Ephemeris Day of lunation k's new moon (k whole) or full
     moon (k + 0.5, full true): Meeus 49.1 and the main periodic terms of
     table 49.A. The smaller planetary terms are a minute or two at most
     and are left out. */
  function phaseJD(k, full) {
    var T = k / 1236.85, T2 = T * T, T3 = T2 * T, T4 = T3 * T;
    var jde = 2451550.09766 + SYN * k + 0.00015437 * T2 - 0.00000015 * T3 + 0.00000000073 * T4;
    var E = 1 - 0.002516 * T - 0.0000074 * T2;
    var M = (2.5534 + 29.1053567 * k - 0.0000014 * T2 - 0.00000011 * T3) * RAD;
    var Mp = (201.5643 + 385.81693528 * k + 0.0107582 * T2 + 0.00001238 * T3 - 0.000000058 * T4) * RAD;
    var F = (160.7108 + 390.67050284 * k - 0.0016118 * T2 - 0.00000227 * T3 + 0.000000011 * T4) * RAD;
    var O = (124.7746 - 1.56375588 * k + 0.0020672 * T2 + 0.00000215 * T3) * RAD;
    var c = full
      ? [-0.40614, 0.17302, 0.01614, 0.01043, 0.00734, -0.00515, 0.00209]
      : [-0.40720, 0.17241, 0.01608, 0.01039, 0.00739, -0.00514, 0.00208];
    return jde
      + c[0] * Math.sin(Mp) + c[1] * E * Math.sin(M) + c[2] * Math.sin(2 * Mp) + c[3] * Math.sin(2 * F)
      + c[4] * E * Math.sin(Mp - M) + c[5] * E * Math.sin(Mp + M) + c[6] * E * E * Math.sin(2 * M)
      - 0.00111 * Math.sin(Mp - 2 * F) - 0.00057 * Math.sin(Mp + 2 * F) + 0.00056 * E * Math.sin(2 * Mp + M)
      - 0.00042 * Math.sin(3 * Mp) + 0.00042 * E * Math.sin(M + 2 * F) + 0.00038 * E * Math.sin(M - 2 * F)
      - 0.00024 * E * Math.sin(2 * Mp - M) - 0.00017 * Math.sin(O);
  }
  function jdOf(d) { return d.getTime() / 864e5 + 2440587.5; }
  function dateOf(jd) { return new Date((jd - 2440587.5) * 864e5); }

  var PHASES = ['New moon', 'Waxing crescent', 'First quarter', 'Waxing gibbous', 'Full moon', 'Waning gibbous', 'Last quarter', 'Waning crescent'];

  /* where the moon is in its month at a moment: frac runs 0 (new) to 0.5
     (full) to 1 (new again), piecewise between the true times, so it is
     exactly 0.5 at the real full moon and not at the mean one */
  function moonAt(d) {
    var jd = jdOf(d);
    var k = Math.floor((jd - 2451550.09766) / SYN);
    while (phaseJD(k) > jd) k--;
    while (phaseJD(k + 1) <= jd) k++;
    var nm = phaseJD(k), fm = phaseJD(k + 0.5, true), nn = phaseJD(k + 1);
    var frac = jd < fm ? (jd - nm) / (fm - nm) * 0.5 : 0.5 + (jd - fm) / (nn - fm) * 0.5;
    // the named phases each get a day either side of their exact moment;
    // the four in-between names cover the rest
    var day = 1 / SYN, name;
    if (frac < day || frac > 1 - day) name = 0;
    else if (Math.abs(frac - 0.25) < day) name = 2;
    else if (Math.abs(frac - 0.5) < day) name = 4;
    else if (Math.abs(frac - 0.75) < day) name = 6;
    else name = frac < 0.25 ? 1 : frac < 0.5 ? 3 : frac < 0.75 ? 5 : 7;
    return {
      frac: frac,
      lit: (1 - Math.cos(frac * 2 * Math.PI)) / 2,
      age: jd - nm,
      waxing: frac < 0.5,
      phase: name,
      name: PHASES[name],
      nextFull: dateOf(jd < fm ? fm : phaseJD(k + 1.5, true)),
      nextNew: dateOf(nn)
    };
  }

  /* the lit part of a moon of radius r, lit fraction `lit`, with the lit
     limb toward +x: the outer half-circle on the right, and back along the
     terminator, an ellipse that bulges right for a crescent and left for a
     gibbous moon */
  function litPath(r, lit) {
    if (lit < 0.004) return '';
    var rx = Math.abs(1 - 2 * lit) * r;
    var sweep = lit < 0.5 ? 0 : 1;
    return 'M0 ' + (-r) + 'A' + r + ' ' + r + ' 0 0 1 0 ' + r + 'A' + rx.toFixed(2) + ' ' + r + ' 0 0 ' + sweep + ' 0 ' + (-r) + 'Z';
  }
  // as seen from the north: a waxing moon is lit on the right, a waning one on the left
  function drawMoon(path, r, m) {
    if (!path) return;
    path.setAttribute('d', litPath(r, m.lit));
    path.setAttribute('transform', m.waxing ? '' : 'rotate(180)');
  }

  /* ───────────── the sky, by the hour ─────────────
     One reckoning for the hero and the ceiling: the sun at hour h stands at
     (h - 12) x 15 degrees from the top of the sky, so noon is overhead,
     six is the eastern horizon and eighteen the western; the moon is
     behind it by its age, a whole day for a whole month. An equinox sky,
     with no latitude and no season, but honest about which is up when. */
  function hourOf(d) { return d.getHours() + d.getMinutes() / 60; }
  function sunDeg(h) { return (h - 12) * 15; }
  function moonDeg(h, m) { return (h - m.frac * 24 - 12) * 15; }

  var DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var MON = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  function fmtLong(d) { return DAYS[d.getDay()] + ', ' + MONTHS[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear(); }
  function fmtShort(d) { return DAYS[d.getDay()].slice(0, 3) + ', ' + MONTHS[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear(); }
  function fmtTime(d) { return pad(d.getHours()) + ':' + pad(d.getMinutes()); }
  function ymd(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }

  /* the stars over the desert */
  (function stars() {
    var svg = $('slStars');
    if (!svg) return;
    var r = rng(1007);
    for (var i = 0; i < 120; i++) {
      var c = el('circle', { cx: (r() * 1000).toFixed(1), cy: (r() * 560).toFixed(1), r: (0.5 + r() * r() * 1.6).toFixed(2) }, svg);
      if (i % 7 === 0) { c.setAttribute('class', 'tw'); c.style.animationDelay = (-r() * 4.5).toFixed(2) + 's'; }
      c.style.opacity = (0.35 + r() * 0.65).toFixed(2);
    }
  })();

  var sunEl = $('slSun'), moonEl = $('slMoon');
  function place(node, deg) {
    if (!node) return;
    var a = deg * RAD, up = Math.cos(a);
    node.style.setProperty('--x', (50 + 44 * Math.sin(a)).toFixed(2) + '%');
    node.style.setProperty('--y', (70 - 60 * up).toFixed(2) + '%');
    node.style.setProperty('--up', up > -0.04 ? '1' : '0');
  }
  function sky() {
    var now = new Date(), h = hourOf(now), m = moonAt(now);
    var up = Math.cos(sunDeg(h) * RAD);
    root.setAttribute('data-sky', up > 0.26 ? 'day' : up > -0.22 ? 'dusk' : 'night');
    place(sunEl, sunDeg(h));
    place(moonEl, moonDeg(h, m));
    drawMoon($('slMoonLit'), 11, m);
    drawMoon($('slNowLit'), 10, m);
    if ($('slNow')) $('slNow').textContent = m.name + ' · ' + fmtTime(now);
  }
  sky(); setInterval(sky, 30000);

  /* ───────────── the shelves ─────────────
     The scrolls are rolled up until their shelf scrolls into view. With
     reduced motion, or no IntersectionObserver, they are simply open. */
  var bays = Array.prototype.slice.call(document.querySelectorAll('.sl-bay'));
  if (reduced || !('IntersectionObserver' in window)) {
    bays.forEach(function (b) { b.classList.add('is-open'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-open'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });
    bays.forEach(function (b) { io.observe(b); });
  }
  // a scroll reached by Tab (or by find in page) may stop just short of the
  // observer's margin; it is never left rolled up with the focus on it
  document.addEventListener('focusin', function (e) {
    var bay = e.target.closest && e.target.closest('.sl-bay');
    if (bay) bay.classList.add('is-open');
  });

  /* ───────────── the planetarium ───────────── */

  /* the total and annular solar eclipses either side of now, as dates. Each
     one checks out against moonAt(): every date is a new moon. Partial
     eclipses are left out; the show's was not partial. */
  var ECLIPSES = [
    { d: '2026-02-17', type: 'annular' },
    { d: '2026-08-12', type: 'total' },
    { d: '2027-02-06', type: 'annular' },
    { d: '2027-08-02', type: 'total', note: 'This one’s path of totality crosses Egypt, right over Luxor.' },
    { d: '2028-01-26', type: 'annular' },
    { d: '2028-07-22', type: 'total' },
    { d: '2030-06-01', type: 'annular' },
    { d: '2030-11-25', type: 'total' }
  ];
  function parseYmd(s, h, min) { var p = s.split('-'); return new Date(+p[0], +p[1] - 1, +p[2], h || 0, min || 0); }
  function eclipseOn(d) { var k = ymd(d); for (var i = 0; i < ECLIPSES.length; i++) if (ECLIPSES[i].d === k) return ECLIPSES[i]; return null; }

  var planet = $('slPlanet');
  var dial = $('slDial');
  if (planet && dial) {
    var ringM = $('slRingM'), ringD = $('slRingD');
    var mLabels = [], dLabels = [];

    // the month ring: twelve names, each in its own thirty degrees
    for (var i = 0; i < 12; i++) {
      var g = el('g', { transform: 'rotate(' + (i * 30) + ')' }, ringM);
      var t = el('text', { x: 0, y: -187, 'text-anchor': 'middle', 'dominant-baseline': 'middle', 'class': 'sl-mlbl' }, g);
      t.textContent = MON[i];
      mLabels.push(t);
      el('line', { x1: 0, y1: -176, x2: 0, y2: -206, 'class': 'sl-msep', transform: 'rotate(15)' }, g);
    }
    // the day ring: thirty-one numbers; a short month just never reaches the end
    for (var dn = 1; dn <= 31; dn++) {
      var gd = el('g', { transform: 'rotate(' + ((dn - 1) * 360 / 31).toFixed(3) + ')' }, ringD);
      var td = el('text', { x: 0, y: -161, 'text-anchor': 'middle', 'dominant-baseline': 'middle', 'class': 'sl-dlbl' }, gd);
      td.textContent = dn;
      dLabels.push(td);
    }
    // the hours round the ceiling's edge, longer at dawn, noon, dusk and midnight
    var hours = $('slHours');
    for (var hh = 0; hh < 24; hh++) {
      el('line', { x1: 0, y1: -144, x2: 0, y2: hh % 6 ? -137 : -131, 'class': 'sl-hour-t' + (hh % 6 ? '' : ' is-major'), transform: 'rotate(' + (hh * 15) + ')' }, hours);
    }
    // the painted stars on the ceiling
    var cs = $('slCeilStars'), rs = rng(2006);
    for (var si = 0; si < 80; si++) {
      var rr = 140 * Math.sqrt(rs()), aa = rs() * Math.PI * 2;
      el('circle', { cx: (rr * Math.cos(aa)).toFixed(1), cy: (rr * Math.sin(aa)).toFixed(1), r: (0.5 + rs() * 0.9).toFixed(2), 'class': 'sl-cstar', opacity: (0.4 + rs() * 0.6).toFixed(2) }, cs);
    }

    // turn to an angle by the short way round from wherever it was
    var lastDeg = {};
    function turn(node, key, deg) {
      var p = lastDeg[key];
      if (p != null) deg = p + (((deg - p) % 360 + 540) % 360 - 180);
      lastDeg[key] = deg;
      node.style.transform = 'rotate(' + deg.toFixed(3) + 'deg)';
    }

    var sunArm = $('slSunArm'), moonArm = $('slMoonArm'), moonRot = $('slMoonRot');
    var dateIn = $('slDateIn'), hourIn = $('slHour'), hourOut = $('slHourOut');
    var status = $('slStatus'), eclList = $('slEcl');
    var cur = new Date(), following = true;

    function bend(m, sunUp, ecl) {
      if (ecl) {
        return ecl.type === 'total'
          ? 'A total solar eclipse: the moon covers the sun completely, and the room goes dark. In the show, the Day of Black Sun took every firebender’s bending away for as long as it lasted.' + (ecl.note ? ' ' + ecl.note : '')
          : 'An annular eclipse: the moon is too far from the Earth to cover the sun, and leaves a ring of fire round it. Not quite a Black Sun, but the ceiling still goes dim.';
      }
      var s = sunUp ? 'The sun is up, and firebenders draw their strength from it. ' : 'The sun is down: a better hour for waterbenders than for firebenders. ';
      var p = m.phase;
      if (p === 0) return s + 'A new moon, and the only time a solar eclipse can happen. That is what Sokka was turning the ceiling to find.';
      if (p === 4) return s + 'A full moon: waterbending at its strongest.';
      if (p < 4) return s + 'The moon is growing, and the waterbenders grow with it.';
      return s + 'The moon is past full and waning, and the waterbenders’ edge goes with it.';
    }

    function render(announce) {
      var h = hourOf(cur), m = moonAt(cur), ecl = eclipseOn(cur);
      var ds = sunDeg(h), dm = ecl ? ds : moonDeg(h, m);
      var up = Math.cos(ds * RAD);

      turn(ringM, 'm', -cur.getMonth() * 30);
      turn(ringD, 'd', -(cur.getDate() - 1) * 360 / 31);
      mLabels.forEach(function (t, k) { t.classList.toggle('is-on', k === cur.getMonth()); });
      dLabels.forEach(function (t, k) { t.classList.toggle('is-on', k === cur.getDate() - 1); });

      turn(sunArm, 'sun', ds);
      turn(moonArm, 'moon', dm);

      // the lit limb faces the sun: find the direction from the moon to the
      // sun on the ceiling and turn the drawing to it inside its arm
      var rm = ecl ? 114 : 82;
      var sx = 114 * Math.sin(ds * RAD), sy = -114 * Math.cos(ds * RAD);
      var mx = rm * Math.sin(dm * RAD), my = -rm * Math.cos(dm * RAD);
      var toSun = Math.atan2(sy - my, sx - mx) / RAD;
      if (moonRot) moonRot.setAttribute('transform', 'rotate(' + (toSun - dm).toFixed(2) + ')');
      var dl = $('slDialLit');
      if (dl) dl.setAttribute('d', ecl ? '' : litPath(14, m.lit));

      var dayFill = $('slDayFill');
      if (dayFill) dayFill.style.opacity = Math.max(0, Math.min(1, up * 1.8 + 0.25)) * 0.9;

      planet.classList.toggle('is-eclipse', !!ecl);
      planet.classList.toggle('is-annular', !!ecl && ecl.type === 'annular');

      $('slDate').textContent = fmtLong(cur);
      $('slTime').textContent = fmtTime(cur) + ' · ' + (up > 0.04 ? 'the sun is up' : up > -0.04 ? 'the sun is on the horizon' : 'the sun is down');
      $('slPhase').textContent = ecl ? 'New moon, in front of the sun' : m.name;
      var days = Math.floor(m.age);
      $('slLit').textContent = Math.round(m.lit * 100) + '% lit · ' + (days < 1 ? 'under a day' : days === 1 ? 'a day' : days + ' days') + ' since the new moon';
      drawMoon($('slBigLit'), 27, m);
      $('slBend').textContent = bend(m, up > 0, ecl);
      $('slNextFull').textContent = fmtShort(m.nextFull);
      $('slNextNew').textContent = fmtShort(m.nextNew);

      if (dateIn) dateIn.value = ymd(cur);
      var mins = cur.getHours() * 60 + cur.getMinutes();
      if (hourIn && document.activeElement !== hourIn) hourIn.value = Math.round(mins / 15) * 15 > 1425 ? 1425 : Math.round(mins / 15) * 15;
      if (hourOut) hourOut.textContent = fmtTime(cur);
      if (eclList) Array.prototype.forEach.call(eclList.querySelectorAll('button'), function (b) { b.classList.toggle('is-on', !!ecl && b.dataset.d === ecl.d); });

      if (announce && status) {
        status.textContent = 'Ceiling set to ' + fmtLong(cur) + ', ' + fmtTime(cur) + '. ' +
          (ecl ? (ecl.type === 'total' ? 'A total solar eclipse.' : 'An annular solar eclipse.') : m.name + ', ' + Math.round(m.lit * 100) + ' percent lit.');
      }
    }

    // a manual turn of the ceiling; landing on an eclipse day brings the
    // sun up to noon, so the darkness is on the ceiling and not under it
    function set(d, keepHour) {
      if (d.getFullYear() < 1900 || d.getFullYear() > 2100) return;
      following = false;
      if (!keepHour && eclipseOn(d)) { d.setHours(12, 0, 0, 0); }
      cur = d;
      render(true);
    }
    function shiftDays(n) { var d = new Date(cur.getTime()); d.setDate(d.getDate() + n); set(d); }

    $('slPrev').addEventListener('click', function () { shiftDays(-1); });
    $('slNextD').addEventListener('click', function () { shiftDays(1); });
    if (dateIn) dateIn.addEventListener('change', function () {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(dateIn.value)) return;
      set(parseYmd(dateIn.value, cur.getHours(), cur.getMinutes()));
    });
    if (hourIn) hourIn.addEventListener('input', function () {
      var v = +hourIn.value, d = new Date(cur.getTime());
      d.setHours(Math.floor(v / 60), v % 60, 0, 0);
      set(d, true);
    });
    $('slToday').addEventListener('click', function () { following = true; cur = new Date(); render(true); });
    $('slBlack').addEventListener('click', function () {
      var k = ymd(cur), next = null;
      for (var i = 0; i < ECLIPSES.length; i++) if (ECLIPSES[i].d > k) { next = ECLIPSES[i]; break; }
      if (!next) next = ECLIPSES[0];
      set(parseYmd(next.d, 12, 0));
    });

    // the next four from the real today, each a button that sets the ceiling
    if (eclList) {
      var today = ymd(new Date()), shown = 0;
      ECLIPSES.forEach(function (e) {
        if (e.d < today || shown >= 4) return;
        shown++;
        var li = document.createElement('li'), b = document.createElement('button');
        var d = parseYmd(e.d, 12, 0);
        b.type = 'button'; b.dataset.d = e.d;
        b.innerHTML = '<b>' + MONTHS[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear() + '</b><span>' + (e.type === 'total' ? 'Total' : 'Annular') + (e.note ? ' · over Luxor, Egypt' : '') + '</span>';
        b.addEventListener('click', function () { set(parseYmd(e.d, 12, 0)); });
        li.appendChild(b); eclList.appendChild(li);
      });
    }

    render(false);
    // left on today, the ceiling keeps time with the clock
    setInterval(function () { if (following) { cur = new Date(); render(false); } }, 30000);
  }

  /* ───────────── the library goes under ─────────────
     Wan Shi Tong sinks the tower; the sand comes up over the page; what is
     left is the desert and the way home. Escape, the back button or "dig
     it back out" bring it up again. */
  var leave = $('slLeave'), timer;
  function sink() {
    root.classList.add('is-sinking');
    clearTimeout(timer);
    timer = setTimeout(function () {
      root.classList.add('is-sunk');
      var home = $('slHome');
      if (home) home.focus({ preventScroll: true });
    }, reduced ? 450 : 2300);
  }
  function dig() {
    clearTimeout(timer);
    var was = root.classList.contains('is-sinking');
    root.classList.remove('is-sinking', 'is-sunk');
    if (was && leave) leave.focus({ preventScroll: true });
  }
  if (leave) leave.addEventListener('click', sink);
  if ($('slDig')) $('slDig').addEventListener('click', dig);
  // back from the next page, the page comes back as it was left, sand and all
  addEventListener('pageshow', function (e) { if (e.persisted) { clearTimeout(timer); root.classList.remove('is-sinking', 'is-sunk'); } });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && root.classList.contains('is-sinking')) dig();
  });

  /* smooth scrolling only after load, so back/forward restores the position instantly instead of sliding to it */
  addEventListener('load', function () {
    requestAnimationFrame(function () { requestAnimationFrame(function () {
      document.documentElement.classList.add('smooth');
    }); });
  });
})();
