/* wanted.js: /wanted/, the Red Dead Redemption terminal.

   The sheriff's board in Valentine, and the one trick every player
   remembers: Dead Eye. Time slows, the world goes the colour of an old
   photograph, you paint a red mark on each target, and when you let go
   the shots land one after another. This file is that, for the bills on
   the board:

     the date     today, as it would read in 1899 (the year the second
                  game is set), with the right weekday for 1899
     the core     the Dead Eye core in the top bar: it drains while Dead
                  Eye is on, fires for you when it runs dry, and fills
                  back up afterwards
     Dead Eye     the wash and the slowing (every running animation is
                  played at a quarter speed, rather than restarted at a
                  new duration, so nothing jumps), the marks, the six
                  chambers, the heartbeat, and the shots
     the sound    Web Audio, made on the spot (no sound files): a low
                  swell going in, a heartbeat, a tick per mark, a crack
                  per shot. Nothing plays until you press Dead Eye.
     the ride     "Ride off into the sunset", and the sun going down

   A bill is a real link the whole time. Marking only stands in for the
   click when Dead Eye is on and the bill is not yet marked (that is how a
   tap marks on a phone); a marked bill, or any bill outside Dead Eye,
   goes where it says. First Light (Al-Islam) is a notice, not a bill, and
   never takes a mark or a bullet. */
(function wanted() {
  'use strict';

  var root = document.getElementById('wb');
  if (!root) return;
  function $(id) { return document.getElementById(id); }
  var reduced = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ───────────── the date, in 1899 ───────────── */

  var dateEl = $('wbDate');
  var DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  function tick() {
    var d = new Date();
    // the same day of the year, in 1899; 29 February did not happen in
    // 1899, so it reads as the 28th
    var day = Math.min(d.getDate(), new Date(1899, d.getMonth() + 1, 0).getDate());
    var then = new Date(1899, d.getMonth(), day);
    var h = d.getHours(), m = d.getMinutes();
    var clock = ((h + 11) % 12 + 1) + ':' + (m < 10 ? '0' : '') + m + (h < 12 ? ' am' : ' pm');
    if (dateEl) dateEl.textContent = DAYS[then.getDay()] + ', ' + day + ' ' + MONTHS[then.getMonth()] + ' 1899 · ' + clock;
  }
  tick(); setInterval(tick, 20000);

  /* ───────────── the sound ───────────── */

  var ac = null;
  function audio() {
    if (!ac) {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      try { ac = new AC(); } catch (e) { return null; }
    }
    if (ac.state === 'suspended') ac.resume();
    return ac;
  }
  // white noise, made once and reused by every shot and swell
  var noiseBuf = null;
  function noise(a) {
    if (!noiseBuf) {
      noiseBuf = a.createBuffer(1, a.sampleRate * 1.2, a.sampleRate);
      var ch = noiseBuf.getChannelData(0);
      for (var i = 0; i < ch.length; i++) ch[i] = Math.random() * 2 - 1;
    }
    var s = a.createBufferSource(); s.buffer = noiseBuf; return s;
  }
  function env(a, peak, attack, decay) {
    var g = a.createGain(), t = a.currentTime;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t + attack + decay);
    g.connect(a.destination);
    return g;
  }
  // a low sine falling away, under a filtered rush: time going thick
  function swell(down) {
    var a = audio(); if (!a) return;
    var t = a.currentTime;
    var o = a.createOscillator();
    o.frequency.setValueAtTime(down ? 150 : 45, t);
    o.frequency.exponentialRampToValueAtTime(down ? 45 : 150, t + 0.6);
    o.connect(env(a, 0.22, 0.04, 0.7)); o.start(t); o.stop(t + 0.8);
    var n = noise(a), f = a.createBiquadFilter();
    f.type = 'lowpass';
    f.frequency.setValueAtTime(down ? 2400 : 300, t);
    f.frequency.exponentialRampToValueAtTime(down ? 300 : 2400, t + 0.6);
    n.connect(f); f.connect(env(a, 0.09, 0.08, 0.6)); n.start(t); n.stop(t + 0.75);
  }
  function thump(when) {
    var a = audio(); if (!a) return;
    var o = a.createOscillator(), g = a.createGain(), t = a.currentTime + (when || 0);
    o.frequency.setValueAtTime(70, t); o.frequency.exponentialRampToValueAtTime(40, t + 0.12);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.28, t + 0.015); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);
    o.connect(g); g.connect(a.destination); o.start(t); o.stop(t + 0.2);
  }
  function click() {
    var a = audio(); if (!a) return;
    var o = a.createOscillator(); o.type = 'square'; o.frequency.value = 1700;
    var f = a.createBiquadFilter(); f.type = 'highpass'; f.frequency.value = 900;
    o.connect(f); f.connect(env(a, 0.05, 0.002, 0.03)); o.start(); o.stop(a.currentTime + 0.05);
  }
  // the crack: a hard noise burst through a falling band, over a low boom
  function bang() {
    var a = audio(); if (!a) return;
    var t = a.currentTime;
    var n = noise(a), f = a.createBiquadFilter();
    f.type = 'lowpass'; f.frequency.setValueAtTime(5000, t); f.frequency.exponentialRampToValueAtTime(400, t + 0.3);
    n.connect(f); f.connect(env(a, 0.5, 0.002, 0.35)); n.start(t); n.stop(t + 0.4);
    var o = a.createOscillator();
    o.frequency.setValueAtTime(110, t); o.frequency.exponentialRampToValueAtTime(35, t + 0.25);
    o.connect(env(a, 0.4, 0.004, 0.28)); o.start(t); o.stop(t + 0.32);
  }

  /* ───────────── the core ───────────── */

  var coreEl = $('wbCore');
  var level = 1;            // 1 is a full core
  var DRAIN = 1 / 14;       // a full core lasts fourteen seconds of Dead Eye
  var FILL = 1 / 24;        // and takes twenty-four to come back
  var last = 0, raf = 0;
  function drawCore() { if (coreEl) coreEl.style.strokeDashoffset = String(100 - level * 100); }
  function run(now) {
    var dt = last ? Math.min(0.1, (now - last) / 1000) : 0;
    last = now;
    if (on) {
      level = Math.max(0, level - dt * DRAIN);
      if (level === 0 && !firing) fire();
    } else {
      level = Math.min(1, level + dt * FILL);
    }
    drawCore();
    if (on || level < 1) raf = requestAnimationFrame(run);
    else { raf = 0; last = 0; }
  }
  function wake() { if (!raf) { last = 0; raf = requestAnimationFrame(run); } }

  /* ───────────── Dead Eye ───────────── */

  var btn = $('wbDE'), btnT = $('wbDEt');
  var hud = $('wbHud'), hudT = $('wbHudT');
  var chambers = Array.prototype.slice.call(document.querySelectorAll('#wbCyl .wb-ch'));
  var cyl = document.querySelector('.wb-cyl');
  var posters = Array.prototype.slice.call(document.querySelectorAll('.wb-poster'));
  var SIX = 6;
  var on = false, firing = false, marks = [], slowed = [], beat = 0;

  function say(t) { if (hudT) hudT.textContent = t; }
  function count() {
    chambers.forEach(function (c, i) { c.classList.toggle('is-on', i < marks.length); });
    if (cyl) cyl.style.rotate = (marks.length * 60) + 'deg';
    if (!marks.length) say('Paint your marks');
    else if (marks.length < SIX) say(marks.length + ' of six marked');
    else say('Six marked. Fire.');
  }

  function start() {
    if (on) return;
    if (level < 0.08) {   // an empty core will not take you in
      btnT.textContent = 'Core empty';
      setTimeout(function () { if (!on) btnT.textContent = 'Dead Eye'; }, 1400);
      return;
    }
    on = true; firing = false; marks = [];
    // slow what is already moving; new animations (the marks, the
    // heartbeat on the veil) run at their own speed on purpose
    slowed = document.getAnimations ? document.getAnimations() : [];
    slowed.forEach(function (an) { try { an.playbackRate = 0.25; } catch (e) {} });
    root.classList.add('is-deadeye');
    btn.setAttribute('aria-pressed', 'true');
    btnT.textContent = 'Holster';
    hud.hidden = false;
    count();
    swell(true);
    if (!reduced) {
      // lub-dub, every 1.2 s, in time with the veil
      beat = setInterval(function () { thump(0); thump(0.2); }, 1200);
      thump(0.3); thump(0.5);
    }
    wake();
  }

  function stop(quiet) {
    if (!on) return;
    on = false; firing = false;
    clearInterval(beat);
    slowed.forEach(function (an) { try { an.playbackRate = 1; } catch (e) {} });
    slowed = [];
    marks.forEach(function (m) { m.p.classList.remove('is-marked'); });
    marks = [];
    root.classList.remove('is-deadeye');
    btn.setAttribute('aria-pressed', 'false');
    btnT.textContent = 'Dead Eye';
    hud.hidden = true;
    count();
    if (!quiet) swell(false);
    wake();
  }

  // the mark lives outside the paper, so the wash on the paper never
  // greys it; each bill gets its own the first time it is marked
  function xOf(p) {
    var x = p.querySelector('.wb-x');
    if (!x) {
      x = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      x.setAttribute('class', 'wb-x');
      x.setAttribute('viewBox', '0 0 46 46');
      x.setAttribute('aria-hidden', 'true');
      x.innerHTML = '<path d="M8 9 L38 37"/><path d="M38 8 L9 38"/>';
      p.appendChild(x);
    }
    return x;
  }

  function mark(p, cx, cy) {
    if (!on || firing || p.classList.contains('wb-poster--calm')) return false;
    if (p.classList.contains('is-marked')) return false;
    if (marks.length >= SIX) { say('The cylinder’s full. Fire.'); return false; }
    var r = p.getBoundingClientRect();
    // where you aimed, kept off the very edge of the paper
    var fx = cx == null ? 0.5 + (Math.random() - 0.5) * 0.3 : (cx - r.left) / r.width;
    var fy = cy == null ? 0.42 + (Math.random() - 0.5) * 0.3 : (cy - r.top) / r.height;
    fx = Math.min(0.82, Math.max(0.18, fx));
    fy = Math.min(0.84, Math.max(0.16, fy));
    var x = xOf(p);
    x.classList.remove('is-spent');
    p.style.setProperty('--mx', (fx * 100).toFixed(1) + '%');
    p.style.setProperty('--my', (fy * 100).toFixed(1) + '%');
    p.classList.add('is-marked');
    marks.push({ p: p, fx: fx, fy: fy });
    click();
    count();
    return true;
  }

  function hole(m) {
    var h = document.createElement('span');
    h.className = 'wb-hole';
    h.setAttribute('aria-hidden', 'true');
    h.style.left = (m.fx * 100 + (Math.random() - 0.5) * 4).toFixed(1) + '%';
    h.style.top = (m.fy * 100 + (Math.random() - 0.5) * 4).toFixed(1) + '%';
    h.style.setProperty('--a', Math.round(Math.random() * 360) + 'deg');
    m.p.appendChild(h);
    // a bill takes three holes at most; the oldest goes first
    var all = m.p.querySelectorAll('.wb-hole');
    if (all.length > 3) all[0].remove();
  }

  function kick() {
    if (reduced) return;
    root.classList.remove('is-kick');
    void root.offsetWidth;   // restart the jolt for every shot
    root.classList.add('is-kick');
  }

  // let go: the shots land one after another, a sixth of a second apart,
  // then time comes back
  function fire() {
    if (!on || firing) return;
    if (!marks.length) { stop(); return; }
    firing = true;
    say('Bang.');
    var shots = marks.slice();
    shots.forEach(function (m, i) {
      setTimeout(function () {
        if (!on) return;
        bang(); kick(); hole(m);
        var x = m.p.querySelector('.wb-x');
        if (x) x.classList.add('is-spent');
        chambers[shots.length - 1 - i] && chambers[shots.length - 1 - i].classList.remove('is-on');
      }, 180 + i * 170);
    });
    setTimeout(function () { stop(); }, 180 + shots.length * 170 + 350);
  }

  if (btn) btn.addEventListener('click', function () { on ? stop() : start(); });
  var fireBtn = $('wbFire'), holster = $('wbHolster');
  if (fireBtn) fireBtn.addEventListener('click', fire);
  if (holster) holster.addEventListener('click', function () { stop(); btn.focus(); });

  posters.forEach(function (p) {
    // a mouse or pen marks as it passes, the way you sweep the reticle
    p.addEventListener('pointerenter', function (e) {
      if (e.pointerType === 'mouse' || e.pointerType === 'pen') mark(p, e.clientX, e.clientY);
    });
    // the keyboard marks what it tabs to
    p.addEventListener('focus', function () {
      var kb = true;
      try { kb = p.matches(':focus-visible'); } catch (e) {}
      if (kb) mark(p);
    });
    // a tap marks first; the bill is a link again once it carries a mark
    p.addEventListener('click', function (e) {
      if (!on || p.classList.contains('wb-poster--calm') || p.classList.contains('is-marked')) return;
      e.preventDefault();
      mark(p, e.clientX || null, e.clientY || null);
    });
  });

  /* ───────────── the ride ───────────── */

  var ride = $('wbRide');
  if (ride) ride.addEventListener('click', function () {
    stop(true);
    root.classList.add('is-ended');
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (root.classList.contains('is-ended')) root.classList.remove('is-ended');
    else stop();
  });
  // back from the next page, the sunset (or Dead Eye) is still on screen;
  // take it down and start the room afresh
  addEventListener('pageshow', function (e) {
    if (!e.persisted) return;
    root.classList.remove('is-ended');
    stop(true);
  });

  drawCore();
})();
