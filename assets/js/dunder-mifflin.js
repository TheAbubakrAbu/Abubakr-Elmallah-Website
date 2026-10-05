/* dunder-mifflin.js: /dunder-mifflin/, The Office terminal.

   The Scranton branch, drawn from above in dunder-mifflin.html, with a
   documentary crew on the floor. The live parts, in page order:

     the clock     the intranet's tray clock, from your own
     the camera    the floor plan seen through the crew's viewfinder. It
                   moves the SVG's viewBox on a slightly loose spring, so a
                   move onto a room is the show's quick snap zoom: fast, a
                   little past, then settled, with a hand-held drift on top.
                   Point at a room (on the plan or in the seating chart) or
                   tab to it and the camera finds it. On a phone, where the
                   camera is pinned above the chart, it cuts to whichever
                   room is in the middle of the screen. Left alone, it goes
                   off for B-roll round the floor by itself.
     the timecode  the tape running since you opened the page, in frames
     the line      "That's what she said." and the documentary's last word

   Every room is read from the seating chart (#dmSeats) and the plan's own
   rectangles; nothing is written twice. */
(function dunderMifflin() {
  'use strict';

  var root = document.getElementById('dm');
  if (!root) return;
  function $(id) { return document.getElementById(id); }
  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  var reduced = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var phoneMQ = window.matchMedia && matchMedia('(max-width: 959.98px)');

  /* ───────────── the tray clock ───────────── */
  var DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var clock = $('dmClock');
  function tick() {
    var d = new Date(), h = d.getHours();
    // the way the taskbar of the day put it: no seconds, twelve hours
    if (clock) clock.textContent = DAYS[d.getDay()] + ', ' + MONTHS[d.getMonth()] + ' ' + d.getDate() + ' · ' +
      ((h % 12) || 12) + ':' + pad(d.getMinutes()) + ' ' + (h < 12 ? 'AM' : 'PM');
  }
  tick(); setInterval(tick, 15000);

  /* ───────────── the rooms ───────────── */
  var plan = $('dmPlan'), cam = $('dmCam');
  var ROOMS = {}, ORDER = [];
  document.querySelectorAll('#dmSeats .dm-seat').forEach(function (seat) {
    var key = seat.dataset.room;
    var shape = plan && plan.querySelector('.dm-r[data-room="' + key + '"]');
    var hit = shape && shape.querySelector('.dm-r-hit');
    if (!hit) return;
    var r = ['x', 'y', 'width', 'height'].map(function (k) { return +hit.getAttribute(k); });
    ROOMS[key] = {
      key: key, seat: seat, shape: shape,
      rect: { x: r[0], y: r[1], w: r[2], h: r[3] },
      name: seat.querySelector('b').textContent,
      // the chyron carries the real page's name: the part after the dot
      sub: seat.querySelector('i').textContent.split(' · ').pop()
    };
    ORDER.push(key);
  });
  // The lot is a long strip down the side of the building; framing all of
  // it would be the wide shot again, so the crew shoots its far end, where
  // its sign is.
  if (ROOMS.lot) ROOMS.lot.rect = { x: 10, y: 470, w: 140, h: 270 };

  /* ───────────── the camera ───────────── */
  // The wide shot is the whole viewBox the page was written with.
  var WIDE = { x: -8, y: 0, w: 1216 };
  var A = 1.6;                     // the frame is 16:10, set in the CSS
  var camS = { x: WIDE.x, y: WIDE.y, w: WIDE.w };
  var vel = { x: 0, y: 0, w: 0 };
  var goal = { x: WIDE.x, y: WIDE.y, w: WIDE.w };
  // A little under critical damping (2 * sqrt(K) is about 11.7): the move
  // lands a touch past its mark and comes back, like a zoom done by hand.
  var K = 34, C = 8.6;

  function shotFor(key) {
    var room = key && ROOMS[key];
    if (!room) return { x: WIDE.x, y: WIDE.y, w: WIDE.w };
    var r = room.rect;
    var w = Math.max(r.w * 2, r.h * 2 * A, 440);
    w = Math.min(w, WIDE.w);
    var h = w / A;
    var x = r.x + r.w / 2 - w / 2, y = r.y + r.h / 2 - h / 2;
    x = Math.max(-60, Math.min(x, 1260 - w));
    y = Math.max(-30, Math.min(y, 790 - h));
    return { x: x, y: y, w: w };
  }

  var tc = $('dmTC'), shot = $('dmShot');
  var chy = $('dmChy'), chyT = $('dmChyT'), chyS = $('dmChyS');
  var t0 = performance.now();
  function timecode(now) {
    // 30 frames a second, written with the semicolon of drop-frame tape
    var f = Math.floor((now - t0) / (1000 / 30));
    var s = Math.floor(f / 30);
    if (tc) tc.textContent = pad(Math.floor(s / 3600)) + ':' + pad(Math.floor(s / 60) % 60) + ':' + pad(s % 60) + ';' + pad(f % 30);
  }

  var clockT = 0;
  function draw() {
    var x = camS.x, y = camS.y, w = camS.w;
    if (!reduced) {
      // hand-held: two slow sines a side, scaled to the shot, so a close-up
      // wobbles as much on screen as the wide shot does
      var j = w * 0.0035;
      x += j * (Math.sin(clockT * 0.9) + 0.6 * Math.sin(clockT * 2.3 + 1.1));
      y += j * (Math.sin(clockT * 0.7 + 2) + 0.6 * Math.sin(clockT * 1.9));
    }
    plan.setAttribute('viewBox', x.toFixed(2) + ' ' + y.toFixed(2) + ' ' + w.toFixed(2) + ' ' + (w / A).toFixed(2));
  }

  var raf = 0, last = 0, inView = true;
  function frame(now) {
    raf = 0;
    var dt = Math.min(0.05, (now - last) / 1000 || 0.016);
    last = now; clockT += dt;
    ['x', 'y', 'w'].forEach(function (k) {
      var acc = K * (goal[k] - camS[k]) - C * vel[k];
      vel[k] += acc * dt;
      camS[k] += vel[k] * dt;
    });
    draw();
    timecode(now);
    if (inView && !document.hidden) raf = requestAnimationFrame(frame);
  }
  function run() {
    if (reduced || raf || !inView || document.hidden) return;
    last = performance.now();
    raf = requestAnimationFrame(frame);
  }
  if (reduced) setInterval(function () { if (inView) timecode(performance.now()); }, 1000);

  /* what the camera is on: whoever asked last, by rank. A hand on a room
     beats the scroll on a phone, which beats the crew's own B-roll. */
  var want = { pointer: null, scroll: null, broll: null };
  var current = null, lastTouch = 0;
  function settle() {
    var key = want.pointer || want.scroll || want.broll || null;
    if (key === current) return;
    if (current && ROOMS[current]) { ROOMS[current].shape.classList.remove('is-on'); ROOMS[current].seat.classList.remove('is-on'); }
    current = key;
    var room = key && ROOMS[key];
    if (room) { room.shape.classList.add('is-on'); room.seat.classList.add('is-on'); }
    goal = shotFor(key);
    if (shot) shot.textContent = room ? (room.rect.w * room.rect.h > 60000 ? 'MEDIUM' : 'CLOSE') : 'WIDE';
    if (chy) {
      chyT.textContent = room ? room.name : 'Dunder Mifflin';
      chyS.textContent = room ? room.sub : 'Scranton branch, second floor';
      chy.classList.remove('is-new'); void chy.offsetWidth; chy.classList.add('is-new');
    }
    if (reduced) {
      // with motion calmed, the crew cuts instead of zooming
      camS = { x: goal.x, y: goal.y, w: goal.w };
      draw();
    } else run();
  }

  var releaseT = 0;
  function point(key) {
    clearTimeout(releaseT);
    lastTouch = Date.now();
    want.broll = null;
    want.pointer = key;
    settle();
  }
  function letGo() {
    clearTimeout(releaseT);
    lastTouch = Date.now();
    // hold the shot a moment after the hand leaves, as an operator would
    releaseT = setTimeout(function () { want.pointer = null; settle(); }, 1200);
  }
  ORDER.forEach(function (key) {
    var r = ROOMS[key];
    [r.seat, r.shape].forEach(function (el) {
      el.addEventListener('pointerenter', function () { point(key); });
      el.addEventListener('pointerleave', letGo);
    });
    r.seat.addEventListener('focus', function () { point(key); });
    r.seat.addEventListener('blur', letGo);
  });

  /* on a phone: the room in the middle of what the pinned camera leaves
     of the screen. Measured on scroll (once a frame at most) rather than
     with a fixed observer band, because the camera's height changes with
     the width of the phone. */
  var looking = 0;
  function lookDown() {
    looking = 0;
    if (!phoneMQ || !phoneMQ.matches || !cam) {
      if (want.scroll) { want.scroll = null; settle(); }   // turned to a wide screen
      return;
    }
    var top = cam.getBoundingClientRect().bottom, mid = (top + innerHeight) / 2;
    var best = null, bestD = 1e9;
    ORDER.forEach(function (key) {
      var b = ROOMS[key].seat.getBoundingClientRect();
      if (b.bottom < top || b.top > innerHeight) return;
      var d = Math.abs((b.top + b.bottom) / 2 - mid);
      if (d < bestD) { bestD = d; best = key; }
    });
    if (best !== want.scroll) {
      want.scroll = best;
      if (best) { lastTouch = Date.now(); want.broll = null; }
      settle();
    }
  }
  addEventListener('scroll', function () { if (!looking) looking = requestAnimationFrame(lookDown); }, { passive: true });

  if ('IntersectionObserver' in window) {
    // the camera only runs while it can be seen; off screen, the
    // scroll's room is let go so the next visit opens wide
    var seen = new IntersectionObserver(function (entries) {
      inView = entries[0].isIntersecting;
      if (inView) run();
    });
    if (cam) seen.observe(cam);
    var floor = $('dmFloor');
    if (floor) new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting && want.scroll) { want.scroll = null; settle(); }
    }).observe(floor);
  }
  document.addEventListener('visibilitychange', function () { if (!document.hidden) run(); });

  /* B-roll: left alone for a few seconds, the crew wanders the floor on its
     own, a room at a time, and pulls back to the wide shot every so often */
  if (!reduced && ORDER.length) {
    var reel = ORDER.slice();
    for (var i = reel.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = reel[i]; reel[i] = reel[j]; reel[j] = t; }
    var step = 0;
    setInterval(function () {
      if (!inView || document.hidden || want.pointer || want.scroll) return;
      if (Date.now() - lastTouch < 6000) return;
      step++;
      want.broll = step % 4 === 0 ? null : reel[step % reel.length];
      settle();
    }, 3800);
  }

  if (plan) { draw(); run(); }

  /* ───────────── the line ───────────── */
  var btn = $('dmTwss'), roll = $('dmRoll'), home = $('dmDoneHome');
  function said(on) {
    root.classList.toggle('is-said', on);
    if (on) setTimeout(function () { if (home) home.focus({ preventScroll: true }); }, 400);
    else if (btn) btn.focus({ preventScroll: true });
  }
  if (btn) btn.addEventListener('click', function () { said(true); });
  if (roll) roll.addEventListener('click', function () { said(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && root.classList.contains('is-said')) said(false);
  });
  // back from the next page, the last word is still on screen; take it down
  addEventListener('pageshow', function (e) { if (e.persisted) root.classList.remove('is-said'); });
})();
