/* compass.js: /compass/, the Pirates of the Caribbean terminal.

   Jack's compass does not point north. It points to the thing you want
   most in this world, and if you do not know what that is, it will not
   settle. This file is that compass, for the rooms of this site:

     the needle    a magnetised needle on a damped spring: it swings to
                   the bearing of whichever room you point at, tab to or
                   (on a phone, where the chart is a list) scroll past,
                   overshoots once or twice and holds. Wanting nothing,
                   it wanders round on its own.
     the reading   the slip under the compass, the log's heading, and the
                   strip that follows you down the list on a phone
     the bell      ship's time from your clock: a bell every half hour,
                   one to eight through each four-hour watch, and a
                   button that strikes them (Web Audio, no sound files)
     the call      "Take what you can." and the crew's answer

   Everything it moves is drawn in compass.html; nothing here loads a file. */
(function compass() {
  'use strict';

  var root = document.getElementById('pc');
  if (!root) return;
  function $(id) { return document.getElementById(id); }
  var reduced = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var listMQ = window.matchMedia && matchMedia('(max-width: 1099.98px)');
  function isList() { return !!(listMQ && listMQ.matches); }
  function ended() { return root.classList.contains('is-ended'); }

  /* ───────────── the needle ───────────── */

  // the big needle, its shadow on the card, and the small one on a phone,
  // all turned together
  var needles = ['pcNeedle', 'pcNeedleS', 'pcNeedleM'].map($).filter(Boolean);
  // At rest (and always, with reduced motion) it points between the
  // Pantano River and Isla Cruces, at nothing on the chart.
  var REST = 156;
  var theta = REST, omega = 0, goal = REST, wanted = null;
  // Stiffness and damping: about a third of critical damping, so it swings
  // past, comes back, swings past a little less and holds, the way a real
  // needle on a jewelled pivot does. Degrees and seconds throughout.
  var K = 58, C = 5.2;

  function draw() {
    var t = 'rotate(' + theta.toFixed(2) + ')';
    for (var i = 0; i < needles.length; i++) needles[i].setAttribute('transform', t);
  }
  // the shortest way round from one bearing to another, -180 to 180
  function shortest(to, from) { return ((to - from) % 360 + 540) % 360 - 180; }

  // Wanting nothing, it drifts at a speed that rises, falls, and now and
  // then runs backwards for a moment, as if it nearly had something.
  function driftSpeed(t) { return 15 + 21 * Math.sin(t * 0.31) + 8 * Math.sin(t * 0.97 + 1.3); }

  var raf = 0, last = 0, clock = 0, running = false;
  var seen = { big: true, follow: false };
  function frame(now) {
    var dt = Math.min(0.05, (now - last) / 1000 || 0.016);
    last = now; clock += dt;
    var g;
    if (wanted == null) { goal += driftSpeed(clock) * dt; g = goal; }
    // held, it still trembles a little on its pivot
    else g = goal + 0.6 * Math.sin(clock * 7.1) + 0.35 * Math.sin(clock * 12.7);
    omega += (K * (g - theta) - C * omega) * dt;
    theta += omega * dt;
    draw();
    if (running) raf = requestAnimationFrame(frame);
  }
  // only while one of the two compasses is on screen and the tab is in front
  function sync() {
    var go = !reduced && !document.hidden && (seen.big || seen.follow);
    if (go && !running) { running = true; last = performance.now(); raf = requestAnimationFrame(frame); }
    else if (!go && running) { running = false; cancelAnimationFrame(raf); }
  }
  function point(b) {
    if (b == null) {
      wanted = null; goal = theta;
      if (reduced) { theta = REST; draw(); }
      return;
    }
    wanted = b;
    goal = theta + shortest(b, theta);
    if (reduced) { theta = goal; draw(); }
  }
  draw();

  var binn = $('pcBinn');
  if ('IntersectionObserver' in window && binn) {
    new IntersectionObserver(function (es) { seen.big = es[0].isIntersecting; sync(); }).observe(binn);
  }
  document.addEventListener('visibilitychange', sync);
  sync();

  /* ───────────── wanting ───────────── */

  var links = Array.prototype.slice.call(document.querySelectorAll('a[data-b]'));
  var ports = Array.prototype.slice.call(document.querySelectorAll('.pc-port a'));
  var readK = $('pcReadK'), readT = $('pcReadT'), heading = $('pcHeading');
  var followK = $('pcFollowK'), followT = $('pcFollowT');
  var course = $('pcCourse'), courseSvg = $('pcCourseSvg');

  function text(a, sel) { var e = a.querySelector(sel); return e ? e.textContent : ''; }
  function brg(b) { var n = Math.round(b) % 360; return ('00' + n).slice(-3) + '°'; }
  // the reading's sentence: the name in ink, then the plain words, then the line
  function setRead(name, rest) {
    if (!readT) return;
    readT.textContent = '';
    if (name) { var b = document.createElement('b'); b.textContent = name; readT.appendChild(b); }
    readT.appendChild(document.createTextNode(rest));
  }

  // Three things can want a room. Pointing at it beats having it focused,
  // which beats having scrolled to it, so the needle follows the hand.
  var hoverA = null, focusA = null, scrollA = null, current = null, leaveT = 0;
  function apply() {
    var a = hoverA || focusA || scrollA;
    if (a === current) return;
    if (current) {
      var was = current.closest('.pc-port');
      if (was) was.classList.remove('is-wanted');
    }
    current = a;
    if (!a) {
      point(null);
      if (readK) readK.textContent = 'The needle will not settle';
      setRead('', 'Nothing wanted yet. Choose a room, and the needle will find it.');
      if (heading) heading.textContent = 'Undecided: the needle is wandering';
      if (followK) followK.textContent = 'Wandering';
      if (followT) followT.textContent = 'Nothing wanted yet';
      if (courseSvg) courseSvg.classList.remove('is-on');
      return;
    }
    var b = +a.dataset.b, name = text(a, 'b'), what = text(a, 'i');
    var li = a.closest('.pc-port');
    point(b);
    if (li) {
      li.classList.add('is-wanted');
      if (readK) readK.textContent = b === 0 ? 'It points due north, for once' : 'It points to ' + brg(b) + ', and holds';
      setRead(name, ' · ' + what + '. ' + (a.dataset.line || ''));
    } else {
      if (readK) readK.textContent = 'Off this chart, ' + brg(b);
      setRead(name, ' · ' + what + '. Another ship, in other waters.');
    }
    if (heading) heading.textContent = brg(b) + ', for ' + name;
    if (followK) followK.textContent = brg(b);
    if (followT) followT.textContent = name + ' · ' + what;

    // the course, from the compass to the island, stopping short of it
    if (course && courseSvg) {
      if (li && !isList()) {
        var x = parseFloat(li.style.getPropertyValue('--x')) * 12;
        var y = parseFloat(li.style.getPropertyValue('--y')) * 8;
        var dx = x - 600, dy = y - 400, d = Math.sqrt(dx * dx + dy * dy) || 1;
        course.setAttribute('x2', (x - dx / d * 22).toFixed(1));
        course.setAttribute('y2', (y - dy / d * 22).toFixed(1));
        courseSvg.classList.add('is-on');
      } else courseSvg.classList.remove('is-on');
    }
  }

  links.forEach(function (a) {
    // a touch has no hover; the tap is already on its way to the page
    a.addEventListener('pointerenter', function (e) {
      if (e.pointerType === 'touch') return;
      clearTimeout(leaveT); hoverA = a; apply();
    });
    // a short grace on the way out, so crossing the sea between two
    // islands does not set the needle wandering for a frame
    a.addEventListener('pointerleave', function () {
      if (hoverA !== a) return;
      clearTimeout(leaveT);
      leaveT = setTimeout(function () { if (hoverA === a) { hoverA = null; apply(); } }, 220);
    });
    a.addEventListener('focus', function () { focusA = a; apply(); });
    a.addEventListener('blur', function () { if (focusA === a) { focusA = null; apply(); } });
  });

  /* On a phone the chart is a list, and a phone has no hover, so the room
     that is wanted is whichever line is across the middle of the screen as
     you scroll; and once the big compass has gone off the top, a small one
     follows you down the list so the needle can still be seen. */
  var follow = $('pcFollow'), list = document.querySelector('.pc-ports');
  function onScroll() {
    var a = null;
    if (isList() && !ended()) {
      var mid = innerHeight * 0.5, best = Infinity;
      for (var i = 0; i < ports.length; i++) {
        var r = ports[i].getBoundingClientRect();
        if (r.top <= mid && r.bottom >= mid) {
          var dx = Math.abs(r.left + r.width / 2 - innerWidth / 2);
          if (dx < best) { best = dx; a = ports[i]; }
        }
      }
    }
    if (a !== scrollA) { scrollA = a; apply(); }

    var on = false;
    if (follow && list && binn && isList() && !ended()) {
      var bb = binn.getBoundingClientRect(), lb = list.getBoundingClientRect();
      on = bb.bottom < 40 && lb.bottom > innerHeight * 0.35;
    }
    if (follow && on !== seen.follow) { seen.follow = on; follow.classList.toggle('is-on', on); sync(); }
  }
  var ticking = false;
  addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () { ticking = false; onScroll(); });
  }, { passive: true });
  addEventListener('resize', onScroll);
  // across the breakpoint the course and the scroll line change meaning;
  // let go of whatever was wanted and work it out again
  if (listMQ && listMQ.addEventListener) listMQ.addEventListener('change', function () {
    var was = document.querySelector('.pc-port.is-wanted');
    if (was) was.classList.remove('is-wanted');
    current = undefined; scrollA = null; apply(); onScroll();   // undefined, so apply() cannot skip it
  });
  onScroll();

  // On a phone the drawing's centre goes under the compass, so the rhumb
  // lines still run out of it: measured, because the cartouche above it
  // wraps to a different height on every width.
  var chart = $('pcChart');
  function placeArt() {
    if (!chart || !binn) return;
    if (!isList()) { chart.style.removeProperty('--art-top'); return; }
    var c = chart.getBoundingClientRect(), b = binn.getBoundingClientRect();
    chart.style.setProperty('--art-top', Math.round(b.top - c.top + b.height * 0.625 - 400) + 'px');
  }
  placeArt();
  addEventListener('resize', placeArt);
  if (listMQ && listMQ.addEventListener) listMQ.addEventListener('change', placeArt);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(placeArt);

  /* ───────────── the ship's bell ───────────── */

  /* A ship keeps time in half hours. The day is cut into four-hour watches
     and a bell is struck every half hour of each, once at the first, twice
     at the second, up to eight at the end of the watch, when the next comes
     on. The dog watches split 16:00 to 20:00 in two, so the watches rotate
     round the crew; their bells are counted straight through, five to eight
     in the last dog. (The Royal Navy's one, two, three, eight there is said
     to date from the Nore mutiny of 1797, seventy years after the films.) */
  var WATCHES = [
    [0, 'middle watch', '00:00', '04:00'],
    [4, 'morning watch', '04:00', '08:00'],
    [8, 'forenoon watch', '08:00', '12:00'],
    [12, 'afternoon watch', '12:00', '16:00'],
    [16, 'first dog watch', '16:00', '18:00'],
    [18, 'last dog watch', '18:00', '20:00'],
    [20, 'first watch', '20:00', '00:00']
  ];
  var WORDS = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight'];
  var DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  function ord(n) { var s = ['th', 'st', 'nd', 'rd'], v = n % 100; return n + (s[(v - 20) % 10] || s[v] || s[0]); }
  function watchAt(h) { for (var i = WATCHES.length - 1; i >= 0; i--) if (h >= WATCHES[i][0]) return WATCHES[i]; return WATCHES[0]; }
  // the bells for a minute of the day: half hours gone in its four-hour block
  function bellsAt(m) { return Math.floor((m % 240) / 30) || 8; }
  function bellsWord(n) { return WORDS[n] + (n === 1 ? ' bell' : ' bells'); }

  var pips = Array.prototype.slice.call(document.querySelectorAll('#pcPips i'));
  var ringing = false, nowBells = 8;
  function tick() {
    var d = new Date();
    var m = d.getHours() * 60 + d.getMinutes();
    var n = bellsAt(m), w = watchAt(d.getHours());
    nowBells = n;
    var since = m - w[0] * 60;              // minutes since this watch came on
    var bell = since < 30
      ? bellsWord(n) + ', and the ' + w[1] + ' has come on'
      : bellsWord(n) + ' in the ' + w[1];

    var nm = (Math.floor(m / 30) + 1) * 30, nmd = nm % 1440;
    var nn = bellsAt(nmd), left = nm * 60 - (m * 60 + d.getSeconds());
    var change = WATCHES.some(function (x) { return x[0] * 60 === nmd; });
    var when = left < 60 ? 'in under a minute' : 'in ' + Math.ceil(left / 60) + (Math.ceil(left / 60) === 1 ? ' minute' : ' minutes');
    var next = bellsWord(nn) + ' at ' + pad(Math.floor(nmd / 60)) + ':' + pad(nmd % 60) + ', ' + when + (change ? ', and the watch changes' : '');

    if ($('pcBell')) $('pcBell').textContent = bellsWord(n) + ' · ' + w[1];
    if ($('pcBellT')) $('pcBellT').textContent = bell;
    if ($('pcWatch')) $('pcWatch').textContent = 'The ' + w[1] + ', ' + w[2] + ' to ' + w[3];
    if ($('pcNext')) $('pcNext').textContent = next;
    if ($('pcLogDate')) $('pcLogDate').textContent = DAYS[d.getDay()] + ', the ' + ord(d.getDate()) + ' of ' + MONTHS[d.getMonth()] + ', ' + d.getFullYear();
    if ($('pcStrikeT')) $('pcStrikeT').textContent = 'Strike ' + bellsWord(n).toLowerCase();
    if (!ringing) pips.forEach(function (p, i) { p.classList.toggle('on', i < n); });
  }
  tick(); setInterval(tick, 15000);

  /* Struck, a bell is a handful of sine partials at the ratios a small
     cast bell rings at (the hum an octave down, the prime, a minor third,
     a fifth, the nominal an octave up), each dying away at its own rate,
     the high ones first. Quiet on purpose: up to three strikes overlap. */
  var actx = null;
  function bell(ctx, when) {
    var out = ctx.createGain();
    out.gain.value = 0.085;
    out.connect(ctx.destination);
    var f = 932;
    [[0.5, 0.35, 2.4], [1, 1, 2.2], [1.183, 0.45, 1.6], [1.506, 0.3, 1.2], [2, 0.5, 1], [2.514, 0.2, 0.7], [3.011, 0.15, 0.5]].forEach(function (p) {
      var o = ctx.createOscillator(), g = ctx.createGain();
      o.type = 'sine'; o.frequency.value = f * p[0];
      g.gain.setValueAtTime(0.0001, when);
      g.gain.exponentialRampToValueAtTime(p[1], when + 0.005);
      g.gain.exponentialRampToValueAtTime(0.0001, when + p[2]);
      o.connect(g); g.connect(out);
      o.start(when); o.stop(when + p[2] + 0.05);
    });
  }
  // in pairs, as a ship strikes them: five bells is two, two and one
  function strike() {
    if (ringing) return;
    var n = nowBells, times = [], t = 0;
    for (var i = 0; i < n; i++) { times.push(t); t += (i % 2 === 0 && i + 1 < n) ? 0.34 : 0.95; }
    var AC = window.AudioContext || window.webkitAudioContext;
    if (AC) {
      try {
        actx = actx || new AC();
        if (actx.state === 'suspended') actx.resume();
        var t0 = actx.currentTime + 0.05;
        times.forEach(function (s) { bell(actx, t0 + s); });
      } catch (e) { /* no sound, the pips still ring */ }
    }
    ringing = true;
    pips.forEach(function (p) { p.classList.remove('on', 'rung'); });
    times.forEach(function (s, k) {
      setTimeout(function () { if (pips[k]) pips[k].classList.add('on', 'rung'); }, s * 1000 + 50);
    });
    setTimeout(function () {
      ringing = false;
      pips.forEach(function (p) { p.classList.remove('rung'); });
      tick();
    }, (times[n - 1] + 1.2) * 1000);
  }
  if ($('pcStrike')) $('pcStrike').addEventListener('click', strike);

  /* ───────────── take what you can ───────────── */

  var main = $('pcMain'), header = document.querySelector('.pc-top');
  var take = $('pcTake'), home = $('pcHome'), stay = $('pcStay');
  // the page under the answer is gone for the keyboard too, not only the eye
  function hush(on) { [main, header].forEach(function (el) { if (el) el.inert = on; }); }
  function end() {
    root.classList.add('is-ended');
    hush(true);
    onScroll();
    setTimeout(function () { if (home && ended()) home.focus({ preventScroll: true }); }, reduced ? 0 : 900);
  }
  function unend(refocus) {
    root.classList.remove('is-ended');
    hush(false);
    if (refocus && take) take.focus({ preventScroll: true });
  }
  if (take) take.addEventListener('click', end);
  if (stay) stay.addEventListener('click', function () { unend(true); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && ended()) unend(true); });
  // coming back with the back button restores the page as it was left,
  // answer and all; take it down again
  addEventListener('pageshow', function (e) { if (e.persisted) unend(false); });
})();
