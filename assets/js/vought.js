/* vought.js: /vought/, The Boys terminal.

   Vought Tower has a lobby, a lift and a PR department, and this file
   runs all three, plus the folder Butcher keeps on the building:

     the clock     Vought Standard Time in the top bar, beside the Seven's
                   approval index, which drifts a little every few seconds
                   and is drawn as a live line on the brand-health card.
                   In the file the same bar is a surveillance log.
     the lift      a glass car up the outside of the tower. Point at a
                   floor, tab to it, or (with no mouse) scroll it to the
                   middle of the screen, and the car travels there: longer
                   rides take longer, the indicator counts every floor on
                   the way, and the doors part on arrival.
     the switch    Vought's view or Butcher's. Remembered between visits,
                   crossfaded with a view transition where the browser has
                   one.
     the bars      in Butcher's view, redactions peel back when pointed at,
                   focused or tapped; lift them all and the stamp changes.
     the NDA       the sign-off, and its answer.

   Everything it moves is drawn in vought.html and vought.css; nothing here
   loads a file. */
(function vought() {
  'use strict';

  var root = document.getElementById('vt');
  if (!root) return;
  function $(id) { return document.getElementById(id); }
  var reduced = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  function butcher() { return root.classList.contains('is-butcher'); }
  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  /* ───────────── the approval index ─────────────
     A random walk held between 86 and 99: it never falls far, because
     Vought would not let it, and it never quite reaches 100, because
     nobody would believe it. */
  var N = 48, series = [], idx = 94;
  for (var s = 0; s < N; s++) { idx = step(idx); series.push(idx); }
  function step(v) {
    v += (Math.random() - 0.5) * 1.6 + (93.5 - v) * 0.08;
    return Math.max(86, Math.min(99.4, v));
  }
  var spark = $('vtSpark'), fill = $('vtSparkFill'), idxEl = $('vtIndex');
  function drawSpark() {
    if (!spark) return;
    // 84 to 100 fills the card's 80 units of height
    var d = '';
    for (var i = 0; i < series.length; i++) {
      var x = (i / (N - 1)) * 240, y = 80 - ((series[i] - 84) / 16) * 80;
      d += (i ? 'L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1);
    }
    spark.setAttribute('d', d);
    if (fill) fill.setAttribute('d', d + 'L240 80L0 80Z');
    if (idxEl) idxEl.textContent = series[series.length - 1].toFixed(1);
  }

  /* ───────────── the clock ───────────── */
  var live = $('vtLive');
  function tick() {
    var d = new Date();
    var hm = pad(d.getHours()) + ':' + pad(d.getMinutes());
    if (!live) return;
    if (butcher()) {
      live.textContent = 'Surveillance log · ' + d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) + ' · ' + hm + ':' + pad(d.getSeconds());
    } else {
      live.innerHTML = 'Vought Standard Time ' + hm + ' · Approval <b>' + series[series.length - 1].toFixed(1) + '%</b>';
    }
  }
  function poll() {
    series.push(idx = step(idx));
    if (series.length > N) series.shift();
    drawSpark(); tick();
  }
  drawSpark(); tick();
  setInterval(tick, 1000);
  setInterval(poll, reduced ? 12000 : 2600);

  /* ───────────── the lift ───────────── */
  var stack = $('vtStack'), car = $('vtCar');
  var floors = [].slice.call(document.querySelectorAll('.vt-floor'));
  var noEl = $('vtFloorNo'), nameEl = $('vtFloorName'), arrowEl = $('vtArrow');
  // It starts in the lobby, the last row.
  var here = floors[floors.length - 1], shown = 0, countRaf = 0, openTimer = 0;
  function label(n) { return n <= 0 ? 'G' : n >= 101 ? 'R' : '' + n; }
  function yFor(li) { return li.offsetTop + li.offsetHeight / 2 - car.offsetHeight / 2; }

  function park(li, instant) {
    if (!car || !li) return;
    var from = here, to = li;
    var a = +from.getAttribute('data-fl'), b = +to.getAttribute('data-fl');
    // a real lift: a short hop is quick, the run to the roof takes a while
    var dur = (instant || reduced) ? 0 : Math.min(2.2, 0.45 + Math.abs(b - a) * 0.017);
    car.style.setProperty('--dur', dur + 's');
    car.style.setProperty('--y', yFor(to) + 'px');
    for (var i = 0; i < floors.length; i++) floors[i].classList.toggle('is-here', floors[i] === to);
    here = to;
    if (nameEl) nameEl.textContent = to.querySelector('b').textContent;

    // doors shut, travel, doors open
    clearTimeout(openTimer);
    if (dur) car.classList.remove('is-open');
    openTimer = setTimeout(function () { car.classList.add('is-open'); }, dur * 1000);

    // the indicator counts through every floor the car passes
    cancelAnimationFrame(countRaf);
    if (arrowEl) arrowEl.textContent = b > shown ? '▲' : b < shown ? '▼' : '■';
    if (!dur) { shown = b; if (noEl) noEl.textContent = label(b); if (arrowEl) arrowEl.textContent = '■'; return; }
    var start = performance.now(), s0 = shown;
    (function count(now) {
      var t = Math.min(1, (now - start) / (dur * 1000));
      // the same ease-in-out as the car's transition, near enough
      var e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      shown = Math.round(s0 + (b - s0) * e);
      if (noEl) noEl.textContent = label(shown);
      if (t < 1) countRaf = requestAnimationFrame(count);
      else if (arrowEl) arrowEl.textContent = '■';
    })(start);
  }

  floors.forEach(function (li) {
    var a = li.querySelector('a');
    li.addEventListener('mouseenter', function () { if (here !== li) park(li); });
    if (a) a.addEventListener('focus', function () { if (here !== li) park(li); });
  });

  // No mouse: the floor nearest the middle of the screen calls the car.
  var hoverMQ = window.matchMedia && matchMedia('(hover: hover)');
  var scrollRaf = 0;
  function onScroll() {
    if (hoverMQ && hoverMQ.matches) return;
    if (scrollRaf) return;
    scrollRaf = requestAnimationFrame(function () {
      scrollRaf = 0;
      var mid = innerHeight / 2, best = null, bestD = Infinity;
      for (var i = 0; i < floors.length; i++) {
        var r = floors[i].getBoundingClientRect();
        var d = Math.abs(r.top + r.height / 2 - mid);
        if (d < bestD) { bestD = d; best = floors[i]; }
      }
      // only while the directory is actually on screen
      var sr = stack.getBoundingClientRect();
      if (best && best !== here && sr.top < mid && sr.bottom > mid) park(best);
    });
  }
  addEventListener('scroll', onScroll, { passive: true });

  // text reflows (fonts arriving, a turned phone, the other view's copy)
  // move the floors, so keep the car on its floor without a ride
  function reseat() { if (car && here) { car.style.setProperty('--dur', '0s'); car.style.setProperty('--y', yFor(here) + 'px'); } }
  addEventListener('resize', reseat);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(reseat);
  park(here, true);
  car && car.classList.add('is-open');

  /* ───────────── the redactions ───────────── */
  var bars = [].slice.call(document.querySelectorAll('.vt-x'));
  var liftedEl = $('vtLifted'), totalEl = $('vtTotal'), stamp = $('vtStamp');
  if (totalEl) totalEl.textContent = bars.length;
  function count() {
    var n = 0;
    for (var i = 0; i < bars.length; i++) if (bars[i].classList.contains('is-peeled')) n++;
    if (liftedEl) liftedEl.textContent = n;
    var done = n === bars.length;
    root.classList.toggle('is-declassified', done);
    if (stamp) stamp.textContent = done ? 'Declassified' : 'Classified';
  }
  function peel(el) { if (butcher() && !el.classList.contains('is-peeled')) { el.classList.add('is-peeled'); count(); } }
  // A bar over a line that wraps would cover only the first line; those get
  // the ink drawn on the text itself (.is-wrap) instead of the lifted bar.
  function measure() {
    for (var i = 0; i < bars.length; i++) bars[i].classList.toggle('is-wrap', bars[i].getClientRects().length > 1);
  }
  bars.forEach(function (el) {
    el.addEventListener('mouseenter', function () { peel(el); });
    el.addEventListener('focus', function () { peel(el); });
    el.addEventListener('click', function (e) {
      // a bar inside a floor's link: the first tap peels, the next one goes
      if (butcher() && !el.classList.contains('is-peeled')) { e.preventDefault(); peel(el); }
    });
  });
  var reseal = $('vtReseal');
  if (reseal) reseal.addEventListener('click', function () {
    bars.forEach(function (el) { el.classList.remove('is-peeled'); });
    count();
  });

  /* ───────────── the switch ───────────── */
  var sw = $('vtSwitch');
  function apply(on) {
    root.classList.toggle('is-butcher', on);
    if (sw) sw.setAttribute('aria-checked', on ? 'true' : 'false');
    // Bars inside a floor's link are part of that link already; the rest
    // join the tab order in the file, so a keyboard can lift them too.
    bars.forEach(function (el) {
      if (on && !el.closest('a')) el.setAttribute('tabindex', '0'); else el.removeAttribute('tabindex');
    });
    try { localStorage.setItem('vt-view', on ? 'butcher' : 'vought'); } catch (e) {}
    tick(); measure(); reseat();
  }
  apply(butcher());
  addEventListener('resize', measure);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
  if (sw) sw.addEventListener('click', function () {
    var on = !butcher();
    if (document.startViewTransition && !reduced) document.startViewTransition(function () { apply(on); });
    else apply(on);
  });

  /* ───────────── the NDA ───────────── */
  var sign = $('vtSignBtn'), stay = $('vtStay');
  function close() { root.classList.remove('is-signed'); }
  if (sign) sign.addEventListener('click', function () { root.classList.add('is-signed'); if (stay) stay.focus({ preventScroll: true }); });
  if (stay) stay.addEventListener('click', function () { close(); if (sign) sign.focus({ preventScroll: true }); });
  // back from the next page, the answer is still on screen; take it down
  addEventListener('pageshow', function (e) { if (e.persisted) { close(); reseat(); } });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
})();
