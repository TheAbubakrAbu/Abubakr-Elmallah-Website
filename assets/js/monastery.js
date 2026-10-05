/* monastery.js: /monastery/, the Ninjago terminal.

   Spinjitzu is a spin that becomes a tornado in the ninja's own element:
   fire red for Kai, lightning blue for Jay, and so on. This file is that
   tornado, in the courtyard of the Monastery, for the rooms of this site:

     the tornado   a canvas funnel of ribbons wound round a moving axis,
                   with sparks flung off it. It idles slowly, turning
                   through the elements on its own; point at a station on
                   the course, pick an element or press Spinjitzu! and it
                   spins up, taller and faster, in that colour
     the rack      the four Golden Weapons (drawn in monastery.html),
                   carried round the tornado on an ellipse at a speed tied
                   to the spin, passing behind it on the far side
     the hour      the time from your clock as the old temple bells count
                   it: twelve double hours, each named for an animal
     the call      "Ninja, go!": the tornado spins up gold, then the team
                   answers

   Everything it moves is drawn in monastery.html; nothing here loads a file. */
(function monastery() {
  'use strict';

  var root = document.getElementById('mo');
  if (!root) return;
  function $(id) { return document.getElementById(id); }
  var reduced = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ───────────── the hour ───────────── */

  // Twelve double hours, the Rat's running from 23:00 to 01:00 and the rest
  // following two hours at a time. The Hour of the Snake comes round at
  // nine every morning, which the Serpentine would like.
  var ANIMALS = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Boar'];
  var hourEl = $('moHour');
  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  function tick() {
    var d = new Date(), h = d.getHours();
    if (hourEl) hourEl.textContent = 'Hour of the ' + ANIMALS[Math.floor(((h + 1) % 24) / 2)] + ' · ' + pad(h) + ':' + pad(d.getMinutes());
  }
  tick(); setInterval(tick, 20000);

  /* ───────────── the elements ───────────── */

  // The colours each element spins in, bright enough to read as light on
  // the night courtyard (Cole's black would vanish, so earth is the colour
  // of the rock he moves). The same values are on the buttons and the
  // stations in monastery.html, as --e.
  var EL = {
    gold:      { c: '#e0b040', t: 'Golden Power', s: 'the First Spinjitzu Master' },
    fire:      { c: '#ff5a3c', t: 'Fire',         s: 'Kai, with the Sword of Fire' },
    lightning: { c: '#4fb0ff', t: 'Lightning',    s: 'Jay, with the Nunchucks of Lightning' },
    earth:     { c: '#c9a46a', t: 'Earth',        s: 'Cole, with the Scythe of Quakes' },
    ice:       { c: '#dff4ff', t: 'Ice',          s: 'Zane, with the Shurikens of Ice' },
    water:     { c: '#5ec8e0', t: 'Water',        s: 'Nya, Master of Water' },
    energy:    { c: '#6fe08a', t: 'Energy',       s: 'Lloyd, the Green Ninja' }
  };
  // the order it idles through when nobody is asking for anything
  var CYCLE = ['gold', 'fire', 'lightning', 'earth', 'ice', 'water', 'energy'];
  function rgb(hex) { var n = parseInt(hex.slice(1), 16); return [n >> 16 & 255, n >> 8 & 255, n & 255]; }
  for (var k in EL) EL[k].rgb = rgb(EL[k].c);

  var readT = $('moReadT'), readS = $('moReadS');
  function say(title, sub, hex) {
    if (readT) { readT.textContent = title; readT.style.color = hex; }
    if (readS) readS.textContent = sub;
  }

  /* ───────────── state ───────────── */

  var col = EL.gold.rgb.slice();   // the colour on screen, eased toward goal
  var goalEl = 'gold';
  var picked = null;               // an element chosen with a button, held until unchosen
  var hovered = null;              // the station pointed at, if any
  var power = reduced ? 0.4 : 0.2, goalPower = 0.32;
  var burstUntil = 0, held = false, calling = false;
  var spin = 0, orbit = 0, clock = 0;
  var idleAt = 0, idleIx = 0;

  function aim(el) {
    goalEl = el;
    if (reduced) { col = EL[el].rgb.slice(); draw(0); }
  }
  function burst(ms) { burstUntil = performance.now() + ms; wake(); }

  /* ───────────── the stations ───────────── */

  var stations = document.querySelectorAll('.mo-st');
  Array.prototype.forEach.call(stations, function (a) {
    function on() {
      var el = a.getAttribute('data-el') || 'gold';
      hovered = a;
      aim(el);
      var name = a.querySelector('b'), real = a.querySelector('i');
      say(name ? name.textContent : '', EL[el].t + ' · ' + (real ? real.textContent : ''), EL[el].c);
      wake();
    }
    function off() {
      if (hovered !== a) return;
      hovered = null;
      rest();
    }
    a.addEventListener('pointerenter', on);
    a.addEventListener('focus', on);
    a.addEventListener('pointerleave', off);
    a.addEventListener('blur', off);
  });
  // back to the chosen element, or to idling through them all
  function rest() {
    var el = picked || CYCLE[idleIx];
    aim(el);
    say(EL[el].t, EL[el].s, EL[el].c);
    idleAt = performance.now();
  }

  /* ───────────── the element buttons ───────────── */

  var buttons = document.querySelectorAll('.mo-el');
  Array.prototype.forEach.call(buttons, function (b) {
    b.addEventListener('click', function () {
      var el = b.getAttribute('data-el');
      var again = picked === el;
      picked = again ? null : el;
      Array.prototype.forEach.call(buttons, function (o) { o.setAttribute('aria-pressed', o === b && !again ? 'true' : 'false'); });
      if (!again) { idleIx = CYCLE.indexOf(el); burst(1400); }
      rest();
    });
  });

  /* ───────────── the Spinjitzu! button ───────────── */

  // Held, it keeps spinning at full power; tapped (or pressed with a key),
  // it gives a burst and lets go.
  var spinBtn = $('moSpin');
  if (spinBtn) {
    spinBtn.addEventListener('pointerdown', function () { held = true; spinBtn.classList.add('is-held'); wake(); });
    var letGo = function () { if (held) { held = false; spinBtn.classList.remove('is-held'); burst(700); } };
    spinBtn.addEventListener('pointerup', letGo);
    spinBtn.addEventListener('pointerleave', letGo);
    spinBtn.addEventListener('pointercancel', letGo);
    spinBtn.addEventListener('click', function () { burst(1800); });
  }

  /* ───────────── the stage ───────────── */

  var stage = $('moStage'), cv = $('moTwister'), rack = $('moRack');
  var cx2 = cv && cv.getContext && cv.getContext('2d');
  var weapons = rack ? rack.querySelectorAll('.mo-gw') : [];
  var W = 0, H = 0, dpr = 1;
  function size() {
    if (!cv || !stage) return;
    var r = stage.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = r.width; H = r.height;
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    if (cx2) cx2.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (rack) rack.classList.add('is-placed');
    draw(0);
  }

  // The ribbons: each one a stretch of the funnel's height, with its own
  // phase round the axis, its own speed and weight, so the spin never
  // looks like one rigid object turning. Fixed seeds, so it looks the
  // same on every visit.
  var RIBBONS = [];
  (function () {
    var seed = 7;
    function rnd() { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }
    for (var i = 0; i < 18; i++) {
      var t0 = rnd() * 0.45;
      RIBBONS.push({ t0: t0, t1: Math.min(1, t0 + 0.35 + rnd() * 0.55), ph: i / 18 * Math.PI * 2 + rnd() * 0.4, sp: 0.8 + rnd() * 0.5, w: 0.7 + rnd() * 1.1 });
    }
  })();
  var sparks = [];

  function funnel(t, p) {
    // the funnel at height t (0 at the floor, 1 at the top): where its axis
    // is, how wide it is, and the y of that slice
    var base = H * 0.86, top = H * (0.42 - 0.3 * p);
    var y = base - t * (base - top);
    var r = 5 + Math.min(W * 0.34, 180) * (0.55 + 0.45 * p) * Math.pow(t, 1.25);
    var sway = Math.sin(clock * 1.1 + t * 3.2) * (6 + 10 * p) * t;
    return { x: W / 2 + sway, y: y, r: r };
  }

  function draw(dt) {
    if (!cx2 || !W) return;
    var p = Math.min(power, 1.25);
    cx2.clearRect(0, 0, W, H);
    cx2.globalCompositeOperation = 'lighter';
    var c = col.map(Math.round), cs = c.join(',');
    // a little whiter for the near side of each ribbon, as if lit
    var hi = c.map(function (v) { return Math.round(v + (255 - v) * 0.45); }).join(',');

    // the glow on the floor and up the core
    var g = cx2.createRadialGradient(W / 2, H * 0.86, 0, W / 2, H * 0.86, 40 + 90 * p);
    g.addColorStop(0, 'rgba(' + cs + ',' + (0.22 + 0.25 * p) + ')');
    g.addColorStop(1, 'rgba(' + cs + ',0)');
    cx2.fillStyle = g;
    cx2.beginPath(); cx2.ellipse(W / 2, H * 0.86, 40 + 90 * p, (40 + 90 * p) * 0.22, 0, 0, Math.PI * 2); cx2.fill();
    var mid = funnel(0.55, p);
    var g2 = cx2.createRadialGradient(mid.x, mid.y, 0, mid.x, mid.y, mid.r * 1.1);
    g2.addColorStop(0, 'rgba(' + cs + ',' + (0.08 + 0.1 * p) + ')');
    g2.addColorStop(1, 'rgba(' + cs + ',0)');
    cx2.fillStyle = g2;
    cx2.beginPath(); cx2.ellipse(mid.x, mid.y, mid.r * 1.1, mid.r * 1.6, 0, 0, Math.PI * 2); cx2.fill();

    // the ribbons, a short stroke at a time so each can be lit by its depth
    cx2.lineCap = 'butt';   // round caps overlap and, added together, bead every ribbon
    var STEPS = 34, TWIST = 4.2;
    for (var i = 0; i < RIBBONS.length; i++) {
      var rb = RIBBONS[i], prev = null;
      for (var s = 0; s <= STEPS; s++) {
        var t = rb.t0 + (rb.t1 - rb.t0) * s / STEPS;
        var f = funnel(t, p);
        var th = rb.ph + spin * rb.sp - t * TWIST;
        var depth = Math.sin(th);                       // 1 nearest, -1 furthest
        var pt = { x: f.x + f.r * Math.cos(th), y: f.y + f.r * 0.22 * depth, d: depth };
        if (prev) {
          var near = (depth + 1) / 2;
          // fade in at each end of the ribbon
          var u = s / STEPS, ends = Math.min(1, u * 4, (1 - u) * 4);
          var a = (0.08 + 0.5 * near) * ends * (0.5 + 0.5 * Math.min(p, 1));
          cx2.strokeStyle = 'rgba(' + (near > 0.6 ? hi : cs) + ',' + a.toFixed(3) + ')';
          cx2.lineWidth = rb.w * (0.6 + 2.4 * t) * (0.55 + 0.45 * near);
          cx2.beginPath(); cx2.moveTo(prev.x, prev.y); cx2.lineTo(pt.x, pt.y); cx2.stroke();
        }
        prev = pt;
      }
    }

    // sparks thrown off the rim, more of them the harder it spins
    if (dt && !reduced) {
      var want = dt * 60 * p * p;
      while (want > Math.random()) {
        var t2 = 0.25 + Math.random() * 0.75, f2 = funnel(t2, p), a2 = Math.random() * Math.PI * 2;
        sparks.push({ x: f2.x + f2.r * Math.cos(a2), y: f2.y + f2.r * 0.22 * Math.sin(a2),
          vx: -Math.sin(a2) * (60 + 140 * p), vy: -20 - Math.random() * 40, life: 0, max: 0.5 + Math.random() * 0.7 });
        want -= 1;
      }
    }
    for (var j = sparks.length - 1; j >= 0; j--) {
      var sp = sparks[j];
      sp.life += dt; sp.x += sp.vx * dt; sp.y += sp.vy * dt; sp.vy += 30 * dt;
      if (sp.life > sp.max) { sparks.splice(j, 1); continue; }
      cx2.fillStyle = 'rgba(' + hi + ',' + (0.9 * (1 - sp.life / sp.max)).toFixed(3) + ')';
      cx2.beginPath(); cx2.arc(sp.x, sp.y, 1.6, 0, Math.PI * 2); cx2.fill();
    }
    cx2.globalCompositeOperation = 'source-over';

    // the rack: the four weapons round an ellipse at mid height, the near
    // two in front of the tornado and the far two behind it
    var ex = W / 2, ey = H * 0.6, rx = Math.min(W * 0.38, 175), ry = rx * 0.2;
    for (var w = 0; w < weapons.length; w++) {
      var an = orbit + w * Math.PI / 2;
      var dz = Math.sin(an), nr = (dz + 1) / 2;
      var bob = Math.sin(clock * 1.6 + w) * 4;
      var x = ex + rx * Math.cos(an) - 23, y = ey + ry * dz - 46 + bob;
      var sc = 0.7 + 0.3 * nr;
      var el = weapons[w];
      el.style.transform = 'translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px) scale(' + sc.toFixed(3) + ') rotate(' + (Math.cos(an) * -12).toFixed(1) + 'deg)';
      el.style.zIndex = dz > 0 ? 3 : 1;
      el.style.opacity = (0.45 + 0.55 * nr).toFixed(2);
    }
  }

  /* ───────────── the loop ───────────── */

  var running = false, last = 0, visible = true;
  function frame(now) {
    if (!running) return;
    var dt = Math.min(0.05, (now - last) / 1000 || 0); last = now;
    clock += dt;

    // what the spin should be: full while held, pointed at or bursting;
    // a slow idle otherwise; past full for the battle cry
    var full = held || hovered || now < burstUntil;
    goalPower = calling ? 1.25 : full ? 1 : 0.32;
    power += (goalPower - power) * Math.min(1, dt * (goalPower > power ? 4 : 1.4));
    spin += dt * (0.9 + 7.5 * power);
    orbit += dt * (0.22 + 1.5 * power);

    // idling: a new element every five seconds, unless one is chosen
    if (!picked && !hovered && !calling && now - idleAt > 5000) {
      idleIx = (idleIx + 1) % CYCLE.length; rest();
    }
    var goal = EL[goalEl].rgb;
    for (var i = 0; i < 3; i++) col[i] += (goal[i] - col[i]) * Math.min(1, dt * 3.5);

    draw(dt);
    requestAnimationFrame(frame);
  }
  function wake() {
    if (reduced || running || !visible || document.hidden) return;
    running = true; last = performance.now(); requestAnimationFrame(frame);
  }
  function sleep() { running = false; }

  if (cv) {
    size();
    if (window.ResizeObserver) new ResizeObserver(size).observe(stage);
    else addEventListener('resize', size);
    // only spin while the courtyard is on screen and the tab is in front
    if (window.IntersectionObserver) {
      new IntersectionObserver(function (es) {
        visible = es[0].isIntersecting;
        if (visible) wake(); else sleep();
      }).observe(stage);
    }
    document.addEventListener('visibilitychange', function () { if (document.hidden) sleep(); else wake(); });
    idleAt = performance.now();
    wake();
  }

  /* ───────────── Ninja, go! ───────────── */

  // The tornado spins up gold past its usual limit, then the page gives way
  // to the team's answer. With reduced motion, the answer comes at once.
  var go = $('moGo'), stay = $('moStay');
  function answer() { root.classList.add('is-called'); }
  function reset() { root.classList.remove('is-called'); calling = false; rest(); }
  if (go) go.addEventListener('click', function () {
    if (reduced) { answer(); return; }
    calling = true; aim('gold'); say('Ninja, go!', 'every element at once', EL.gold.c);
    wake();
    // on a phone the courtyard may be far above; the answer comes regardless
    setTimeout(answer, visible ? 900 : 0);
  });
  if (stay) stay.addEventListener('click', reset);
  // back from the next page, the answer is still on screen; take it down
  addEventListener('pageshow', function (e) { if (e.persisted) reset(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && root.classList.contains('is-called')) reset(); });
})();
