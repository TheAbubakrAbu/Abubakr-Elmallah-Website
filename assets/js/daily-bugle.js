/* daily-bugle.js: /daily-bugle/, the Spider-Man terminal.

   The front page of the Bugle, with someone loose in the building. This
   file is everything on it that moves:

     the dateline   today's real date, the volume counted from 1962 and the
                    issue from the day of the year, and the edition on the
                    street at this hour (Morning, Afternoon, Late City,
                    Night Final) in the ink strip at the top
     the web        point at a story and a line shoots from the cursor to
                    the rule above it, catches, twangs and holds while you
                    read; point at another and the old line lets go and
                    drops. Tab to a story, or read one on a phone (no hover
                    there), and the web drops from the top of the screen
                    instead, as if from a rooftop. One canvas, drawn only
                    while something on it is moving.
     the sense      the spider-sense: the little jagged lines round the
                    head, drawn round the cursor a beat before the web fires,
                    and whenever the pointer moves fast enough to be danger
     the card       the press card leans toward the pointer
     the presses    "Stop the presses!" and the extra edition

   Everything it draws is lines on a canvas; nothing here loads a file. */
(function bugle() {
  'use strict';

  var root = document.getElementById('db');
  if (!root) return;
  function $(id) { return document.getElementById(id); }
  var reduced = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var noHover = window.matchMedia && matchMedia('(hover: none)').matches;

  /* ───────────── the dateline ───────────── */

  var DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  function roman(n) {
    var v = [100, 90, 50, 40, 10, 9, 5, 4, 1], s = ['C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'], out = '';
    for (var i = 0; i < v.length; i++) while (n >= v[i]) { out += s[i]; n -= v[i]; }
    return out;
  }
  function edition(h) {
    if (h >= 5 && h < 11) return 'Morning Edition';
    if (h >= 11 && h < 16) return 'Afternoon Edition';
    if (h >= 16 && h < 21) return 'Late City Edition';
    return 'Night Final';
  }
  function clock(d) {
    var h = d.getHours(), m = d.getMinutes();
    return ((h + 11) % 12 + 1) + ':' + (m < 10 ? '0' : '') + m + (h < 12 ? ' a.m.' : ' p.m.');
  }
  function tick() {
    var d = new Date();
    var start = new Date(d.getFullYear(), 0, 1);
    var day = Math.floor((d - start) / 864e5) + 1;
    var vol = $('dbVol'), date = $('dbDate'), ed = $('dbEdition');
    // a volume a year since the spider first appeared in print, in 1962
    if (vol) vol.textContent = 'Vol. ' + roman(Math.max(1, d.getFullYear() - 1962)) + ' · No. ' + day;
    if (date) date.textContent = 'New York, ' + DAYS[d.getDay()] + ', ' + MONTHS[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
    if (ed) ed.textContent = edition(d.getHours()) + ' · ' + clock(d);
  }
  tick(); setInterval(tick, 20000);

  var hint = $('dbHint');
  if (hint && noHover) hint.textContent = 'Scroll, and a web drops to the story you are reading.';

  /* ───────────── the canvas ───────────── */

  var cv = $('dbWeb');
  var ctx = cv && cv.getContext && cv.getContext('2d');
  var W = 0, H = 0, dpr = 1;
  function size() {
    if (!ctx) return;
    dpr = Math.min(2, window.devicePixelRatio || 1);
    W = innerWidth; H = innerHeight;
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    need();
  }

  var INK = 'rgba(23, 20, 18, .82)', RED = '#b3121c';
  var ptr = { x: -1, y: -1, has: false, t: 0 };

  // The live web: which element it has caught, where on that element's top
  // rule it stuck (as a fraction of the width, so it stays put as the page
  // scrolls), where it was fired from, and when.
  //   mode 'hover'  fired from the cursor, and follows it
  //   mode 'drop'   fired from the top of the screen, straight down
  var web = null;
  var falling = [];     // old webs, let go, dropping out of the frame
  var tingle = null;    // { x, y, t0 }
  var lastSense = 0;

  function now() { return performance.now(); }
  function anchorOf(w) {
    var r = w.el.getBoundingClientRect();
    return { x: r.left + w.fx * r.width, y: r.top + 1 };
  }
  function originOf(w, a) {
    if (w.mode === 'hover') return { x: ptr.x, y: ptr.y };
    return { x: a.x + w.dx, y: -12 };
  }

  function release() {
    if (!web) return;
    var a = anchorOf(web), o = originOf(web, a);
    if (!reduced) falling.push({ ax: a.x, ay: a.y, ox: o.x, oy: o.y, v: 0, t0: now() });
    web = null;
    need();
  }

  function fire(el, mode) {
    if (web && web.el === el && web.mode === mode) return;
    release();
    var r = el.getBoundingClientRect();
    var fx;
    if (mode === 'hover') {
      // stick a little ahead of the cursor, never right at a corner
      fx = (ptr.x - r.left + (Math.random() * 60 - 30)) / r.width;
    } else {
      fx = 0.2 + Math.random() * 0.6;
    }
    fx = Math.max(0.06, Math.min(0.94, fx));
    web = { el: el, mode: mode, fx: fx, dx: (Math.random() * 2 - 1) * Math.min(120, W * 0.15), t0: now() };
    if (mode === 'hover') sense(ptr.x, ptr.y);
    need();
  }

  function sense(x, y) {
    if (reduced) return;
    tingle = { x: x, y: y, t0: now() };
    lastSense = tingle.t0;
    need();
  }

  /* drawing */

  var queued = false;
  function need() { if (!queued && ctx) { queued = true; requestAnimationFrame(frame); } }

  // A strand from o to p: two threads twisted round a quadratic curve,
  // with `bow` pixels of sideways give at the middle.
  function strand(ox, oy, px, py, bow, alpha) {
    var mx = (ox + px) / 2, my = (oy + py) / 2;
    var dx = px - ox, dy = py - oy, len = Math.hypot(dx, dy) || 1;
    var nx = -dy / len, ny = dx / len;
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = INK; ctx.lineCap = 'round';
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(ox, oy); ctx.quadraticCurveTo(mx + nx * (bow + 1.6), my + ny * (bow + 1.6), px, py); ctx.stroke();
    ctx.lineWidth = 0.8;
    ctx.beginPath(); ctx.moveTo(ox, oy); ctx.quadraticCurveTo(mx - nx * (bow + 1.6) * 0.4, my - ny * (bow + 1.6) * 0.4, px, py); ctx.stroke();
    ctx.globalAlpha = 1;
  }

  // Where it sticks: a splat of six spokes and two rings of thread, grown in.
  function splat(x, y, k) {
    var n = 6, r1 = 13 * k, i, a;
    ctx.strokeStyle = INK; ctx.lineWidth = 1; ctx.lineCap = 'round';
    ctx.beginPath();
    for (i = 0; i < n; i++) {
      a = Math.PI * (i / (n - 1));      // a fan opening downward from the rule
      ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(a) * r1, y + Math.sin(a) * r1 * 0.8);
    }
    ctx.stroke();
    [0.5, 0.9].forEach(function (f) {
      ctx.beginPath();
      for (i = 0; i < n; i++) {
        a = Math.PI * (i / (n - 1));
        var px = x + Math.cos(a) * r1 * f, py = y + Math.sin(a) * r1 * 0.8 * f;
        if (i) ctx.lineTo(px, py); else ctx.moveTo(px, py);
      }
      ctx.stroke();
    });
  }

  // The spider-sense: six jagged little lines standing out round the head,
  // flickering, in red. Gone in under half a second.
  function drawSense(t) {
    var age = (t - tingle.t0) / 460;
    if (age >= 1) { tingle = null; return false; }
    var flick = (Math.floor(age * 14) % 2) ? 0.55 : 1;
    ctx.strokeStyle = RED; ctx.lineWidth = 2; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    ctx.globalAlpha = (1 - age) * flick;
    var grow = 1 + age * 0.6;
    var angles = [-160, -125, -90, -55, -20, 160, 20];
    for (var i = 0; i < angles.length; i++) {
      var a = angles[i] * Math.PI / 180, ca = Math.cos(a), sa = Math.sin(a);
      var r0 = 16 * grow, r1 = 34 * grow, steps = 4;
      ctx.beginPath();
      for (var s = 0; s <= steps; s++) {
        var r = r0 + (r1 - r0) * s / steps, side = (s % 2 ? 4 : -4);
        var px = tingle.x + ca * r - sa * side, py = tingle.y + sa * r + ca * side;
        if (s) ctx.lineTo(px, py); else ctx.moveTo(px, py);
      }
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    return true;
  }

  function frame() {
    queued = false;
    var t = now(), busy = false;
    ctx.clearRect(0, 0, W, H);

    // the old webs, falling
    for (var i = falling.length - 1; i >= 0; i--) {
      var f = falling[i], age = (t - f.t0) / 1000;
      if (age > 0.7) { falling.splice(i, 1); continue; }
      var drop = 0.5 * 2200 * age * age;
      strand(f.ox, f.oy + drop * 0.6, f.ax, f.ay + drop, 10 * age, 1 - age / 0.7);
      busy = true;
    }

    if (web && web.el.isConnected) {
      var a = anchorOf(web), o = originOf(web, a);
      var age2 = (t - web.t0) / 1000;
      // the shot: the tip races out over 160 ms, easing in at the end
      var k = reduced ? 1 : Math.min(1, age2 / 0.16);
      var e = 1 - Math.pow(1 - k, 3);
      var px = o.x + (a.x - o.x) * e, py = o.y + (a.y - o.y) * e;
      // the twang once it catches: a sideways shiver that dies away
      var after = age2 - 0.16;
      var bow = (!reduced && after > 0) ? 9 * Math.exp(-after * 5) * Math.sin(after * 38) : 0;
      if (web.mode === 'hover' && !ptr.has) { web = null; }
      else {
        strand(o.x, o.y, px, py, bow, 1);
        if (k >= 1) splat(a.x, a.y, reduced ? 1 : Math.min(1, after / 0.12 + 0.3));
        if (!reduced && after < 1.2) busy = true;
      }
    }

    if (tingle && drawSense(t)) busy = true;
    if (busy) need();
  }

  /* ───────────── what fires it ───────────── */

  if (ctx) {
    size();
    addEventListener('resize', size);
    // the webs are pinned to the page, so they move when it scrolls
    addEventListener('scroll', function () { if (web || falling.length) need(); if (noHover) pickByScroll(); }, { passive: true });

    // the pointer: whichever [data-web] it is over is the one the web catches
    document.addEventListener('pointermove', function (e) {
      if (e.pointerType === 'touch') return;
      var t = now();
      // fast enough to be danger: the sense goes off on its own
      if (ptr.has && !reduced) {
        var v = Math.hypot(e.clientX - ptr.x, e.clientY - ptr.y) / Math.max(1, t - ptr.t);
        if (v > 3.2 && t - lastSense > 1400) sense(e.clientX, e.clientY);
      }
      ptr.x = e.clientX; ptr.y = e.clientY; ptr.has = true; ptr.t = t;
      if (root.classList.contains('is-stopped')) return;
      var el = e.target.closest && e.target.closest('[data-web]');
      if (el) fire(el, 'hover');
      else if (web && web.mode === 'hover') release();
      if (web) need();
    }, { passive: true });
    document.addEventListener('pointerleave', function () { ptr.has = false; if (web && web.mode === 'hover') release(); });

    // the keyboard: a web drops from above onto whatever has focus
    var keyed = false;
    document.addEventListener('keydown', function (e) { if (e.key === 'Tab') keyed = true; });
    document.addEventListener('pointerdown', function () { keyed = false; });
    document.addEventListener('focusin', function (e) {
      var el = e.target.closest && e.target.closest('[data-web]');
      if (el && keyed) fire(el, 'drop');
    });
    document.addEventListener('focusout', function (e) {
      if (web && web.mode === 'drop' && web.el === e.target && !noHover) release();
    });
  }

  // On a phone there is no hover, so the web finds the story you are
  // reading: the one whose top is nearest a third of the way down the screen.
  var stories = [].slice.call(document.querySelectorAll('.db-story, .db-dispatch'));
  var scrollQueued = false;
  function pickByScroll() {
    if (scrollQueued || !ctx) return;
    scrollQueued = true;
    requestAnimationFrame(function () {
      scrollQueued = false;
      if (root.classList.contains('is-stopped')) return;
      // not over the masthead: the web waits until you have started reading
      if (scrollY < 140) { release(); return; }
      var line = H * 0.34, best = null, bestD = Infinity;
      for (var i = 0; i < stories.length; i++) {
        var r = stories[i].getBoundingClientRect();
        if (r.bottom < 60 || r.top > H * 0.7) continue;
        var d = Math.abs(r.top - line);
        if (d < bestD) { bestD = d; best = stories[i]; }
      }
      if (best) fire(best, 'drop');
      else release();
    });
  }
  if (noHover && ctx) setTimeout(pickByScroll, 900);

  /* ───────────── the press card ───────────── */

  var card = $('dbCard');
  if (card && !reduced && !noHover) {
    card.addEventListener('pointermove', function (e) {
      var r = card.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      card.style.setProperty('--ry', (x * 12).toFixed(2) + 'deg');
      card.style.setProperty('--rx', (-y * 10).toFixed(2) + 'deg');
      card.style.setProperty('--sx', (x * 40).toFixed(1) + '%');
    });
    card.addEventListener('pointerleave', function () {
      card.style.removeProperty('--ry'); card.style.removeProperty('--rx'); card.style.removeProperty('--sx');
    });
  }

  /* ───────────── stop the presses ───────────── */

  var stop = $('dbStop'), home = $('dbHome');
  function close() { root.classList.remove('is-stopped'); }
  if (stop) stop.addEventListener('click', function () {
    release();
    root.classList.add('is-stopped');
    // focus the way back once the paper has landed
    setTimeout(function () { if (home && root.classList.contains('is-stopped')) home.focus({ preventScroll: true }); }, reduced ? 0 : 1150);
  });
  // back from the next page, the extra is still on screen; take it down
  addEventListener('pageshow', function (e) { if (e.persisted) { close(); release(); } });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && root.classList.contains('is-stopped')) { close(); if (stop) stop.focus({ preventScroll: true }); }
  });
})();
