/* hawkins.js: /hawkins/, the Stranger Things interface.

   One page where there used to be two: /starcourt/ (the mall and the Palace
   Arcade) and /upside-down/ (the Byers house and the walkie-talkie). Both
   drew the same town, both carried the same alphabet wall, and both are
   this. Their old addresses redirect here.

   The page is drawn in CSS and SVG; this is the part of it that is alive:

     the wall      Joyce's alphabet. Point at anything with data-spell, or
                   tab to it, and the bulbs over its letters light one at a
                   time to spell it, the way Will did, and again for as long
                   as you stay. A finger cannot hover, so on a touch screen
                   the wall (which rides over the rooms) spells whichever
                   room you stop scrolling at instead.
     the descent   THE MERGE'S WHOLE POINT. Scrolling turns the town over.
                   One number, --dp, goes on the body on every frame of
                   scroll: 0 at the top, 1 at the foot. hawkins.css keys
                   everything cold to it, so the mall dims, the vines grow
                   in and the neon goes out continuously as you read down.
                   Past the halfway mark the body also takes .is-down, the
                   binary state the switch has always set, which is what the
                   readouts, the fireworks and the spores already watch.
     the switch    still there, and still throws the whole town over at once,
                   for a reader who would rather not walk down. Throwing it
                   scrolls the page to match, so the switch and the scroll
                   can never disagree about which side you are on.
     this side     fireworks over Starcourt's parking lot now and then, the
                   Fourth of July of 1985, only while you are on this side.
     the far side  spores on a canvas and a soft red pulse of lightning every
                   several seconds, only while you are over there. Neither
                   sky moves at all with reduced motion.
     the readouts  the header clock (today's date as it fell in 1985, or, on
                   the other side, the date it stopped and how long you have
                   been in), the depth gauge, the arcade's attract screen,
                   which cycles the machines until you choose one, and the
                   mall's floor plan, which lights the shop you are
                   pointing at.

   Then the tape, which asks the question, and the Void, which answers it. */
(function upsideDown() {
  'use strict';

  var root = document.getElementById('ud');
  if (!root) return;
  var $ = function (id) { return document.getElementById(id); };
  var mq = function (q) { return !!(window.matchMedia && matchMedia(q).matches); };
  var reduced = mq('(prefers-reduced-motion: reduce)');
  var canHover = mq('(hover: hover) and (pointer: fine)');
  function isDown() { return root.classList.contains('is-down'); }
  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  /* ───────────── the wall ───────────── */
  var cellList = Array.prototype.slice.call(document.querySelectorAll('.ud-cell[data-c]'));
  var cells = {};
  cellList.forEach(function (c) { cells[c.dataset.c] = c; });
  var spelled = $('udSpelt'), capK = $('udCapK');
  var IDLE = canHover ? 'Point at a room' : 'Scroll to a room';

  var word = '', idx = 0, timer = 0, looping = false, asker = null;

  function dark() { cellList.forEach(function (c) { c.classList.remove('is-on'); }); }

  // the read-out under the wall: the letters so far, a dot for each to come
  function readout(n) {
    var out = [];
    for (var i = 0; i < word.length; i++) out.push(word[i] === ' ' ? ' ' : i < n ? word[i] : '·');
    if (spelled) spelled.textContent = out.join(' ');
  }
  function quiet() {
    clearTimeout(timer); dark();
    word = ''; asker = null; looping = false;
    if (capK) capK.textContent = 'The wall is quiet';
    if (spelled) spelled.textContent = IDLE;
  }

  // loop: say it again for as long as whoever asked (who) is still asking
  function spell(text, loop, who) {
    clearTimeout(timer); dark();
    word = String(text || '').toUpperCase().replace(/[^A-Z ]/g, '').replace(/\s+/g, ' ').trim();
    if (!word) { quiet(); return; }
    idx = 0; looping = !!loop; asker = who || null;
    if (capK) capK.textContent = 'Will is spelling';
    if (reduced) {
      // no flicker and no sequence: the whole word lights at once
      word.split('').forEach(function (ch) { if (cells[ch]) cells[ch].classList.add('is-on'); });
      readout(word.length);
      if (!loop) timer = setTimeout(quiet, 4000);
      return;
    }
    step();
  }
  function step() {
    dark();
    if (idx >= word.length) {
      readout(word.length);
      // the wall goes dark for a beat, then says it again if it is still wanted
      timer = looping ? setTimeout(function () { idx = 0; step(); }, 1500) : setTimeout(quiet, 2600);
      return;
    }
    var ch = word[idx++];
    readout(idx);
    if (ch === ' ') { timer = setTimeout(step, 340); return; }
    var c = cells[ch];
    if (c) c.classList.add('is-on');
    timer = setTimeout(function () {
      if (c) c.classList.remove('is-on');
      timer = setTimeout(step, 90);
    }, 360);
  }
  // let go: the word in progress is finished, and then the wall falls quiet
  function release(who) { if (asker === who) { looping = false; asker = null; } }

  /* ───────────── the attract screen and the floor plan ───────────── */
  var lcdCh = $('udLcdCh'), lcdName = $('udLcdName'), plan = $('udPlan'), lit = null;
  var cabs = Array.prototype.slice.call(document.querySelectorAll('.ud-cab'));
  var attractT = 0, attractI = 0;
  // nobody playing: the screen does what an idle cabinet does, and runs
  // through the machines on the floor one at a time, with a coin call
  // between each. Still, it simply asks for a coin.
  function attract() {
    clearInterval(attractT);
    if (!lcdCh || !lcdName) return;
    lcdCh.textContent = 'CAB --'; lcdName.textContent = 'Insert coin';
    if (reduced || !cabs.length) return;
    attractI = 0;
    attractT = setInterval(function () {
      if (document.hidden) return;
      attractI = (attractI + 1) % (cabs.length * 2);
      var c = attractI % 2 ? cabs[(attractI - 1) / 2] : null;
      lcdCh.textContent = c ? 'CAB ' + c.dataset.ch : 'CAB --';
      lcdName.textContent = c ? c.querySelector('b').textContent : 'Insert coin';
    }, 1800);
  }
  function channel(el) {
    // the shop on the plan, in the color of its listing
    var u = el && el.dataset.unit, g = u && plan ? plan.querySelector('[data-u="' + u + '"]') : null;
    if (lit && lit !== g) lit.classList.remove('is-lit');
    lit = g;
    if (g) { g.style.setProperty('--u', getComputedStyle(el).getPropertyValue('--a') || '#fff'); g.classList.add('is-lit'); }
    if (!lcdCh || !lcdName) return;
    var ch = el && el.dataset.ch, name = el && el.querySelector('b');
    if (!ch) { if (!attractT) attract(); return; }
    clearInterval(attractT); attractT = 0;
    lcdCh.textContent = 'CAB ' + ch + ' · 1UP';
    lcdName.textContent = name ? name.textContent : '';
  }

  /* ───────────── who is asking ───────────── */
  function asking(e) { return e.target && e.target.closest ? e.target.closest('[data-spell]') : null; }
  if (canHover) {
    document.addEventListener('pointerover', function (e) {
      var el = asking(e);
      if (el && el !== asker) { spell(el.dataset.spell, true, el); channel(el); }
    });
    document.addEventListener('pointerout', function (e) {
      var el = asking(e);
      if (el && !(e.relatedTarget && el.contains(e.relatedTarget))) { release(el); channel(null); }
    });
  }
  document.addEventListener('focusin', function (e) {
    var el = asking(e);
    if (el && el !== asker) { spell(el.dataset.spell, true, el); channel(el); }
  });
  document.addEventListener('focusout', function (e) {
    var el = asking(e);
    if (el) { release(el); channel(null); }
  });

  // no hover: when the scrolling stops, the room in the middle of what is
  // left of the screen gets spelled. Under the wall when it rides along on
  // top (a phone), the middle of the screen when it is a column of its own.
  var wallbox = $('udWallbox'), stage = $('udStage'), picked = null;
  var picks = stage ? Array.prototype.slice.call(stage.querySelectorAll('[data-spell]')) : [];
  function pick() {
    if (!wallbox || !stage || root.classList.contains('is-gone')) return;
    var w = wallbox.getBoundingClientRect(), s = stage.getBoundingClientRect();
    var cs = getComputedStyle(wallbox);
    var side = w.right < s.left + s.width * 0.7;
    var riding = side
      ? s.top < innerHeight * 0.5 && s.bottom > innerHeight * 0.5
      : cs.position === 'sticky' && w.top <= (parseFloat(cs.top) || 0) + 1 && s.bottom > w.bottom + 60;
    var best = null;
    if (riding) {
      var floor = side ? 0 : w.bottom;
      var y = side ? innerHeight * 0.5 : floor + (innerHeight - floor) * 0.4, bestD = Infinity;
      picks.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.bottom < floor + 8 || r.top > innerHeight) return;
        var d = Math.abs((r.top + r.bottom) / 2 - y);
        if (d < bestD) { bestD = d; best = el; }
      });
    }
    if (best === picked) return;
    if (picked) picked.classList.remove('is-picked');
    picked = best;
    if (best) { best.classList.add('is-picked'); spell(best.dataset.spell, false, best); channel(best); }
    else channel(null);
  }
  if (!canHover) {
    var settle = 0;
    addEventListener('scroll', function () { clearTimeout(settle); settle = setTimeout(pick, 160); }, { passive: true });
  }

  // now and then a bulb warms a little by itself; more often on the other side
  function twinkle() {
    if (!reduced && !word && !document.hidden) {
      var c = cellList[Math.floor(Math.random() * cellList.length)];
      if (c) {
        c.classList.add('is-faint');
        setTimeout(function () { c.classList.remove('is-faint'); }, 700);
      }
    }
    setTimeout(twinkle, (isDown() ? 700 : 1700) + Math.random() * 1400);
  }

  /* ───────────── this side: fireworks ─────────────
     One shell at a time, every few seconds: a spark climbs out of the
     parking lot, opens into a ring of embers in one of the mall's neon
     colors, and the embers fall and fade. The canvas lives on the front
     face of the sky, so it turns over with the town. */
  var fc = $('udFire'), fx = fc && fc.getContext ? fc.getContext('2d') : null;
  var FW = ['#ff5fb4', '#3ee6d6', '#ffd23f', '#b48cff', '#ffffff', '#4aa8ff'];
  var shells = [], embers = [], fraf = 0, fireT = 0, fw = 0, fh = 0;
  function fireSize() {
    if (!fx) return;
    fw = innerWidth; fh = innerHeight;
    fc.width = Math.round(fw * dpr); fc.height = Math.round(fh * dpr);
  }
  function launch() {
    var x = fw * (0.12 + Math.random() * 0.76);
    shells.push({ x: x, y: fh * 0.86, ty: fh * (0.1 + Math.random() * 0.26), vx: (Math.random() - 0.5) * 0.6,
                  c: FW[Math.floor(Math.random() * FW.length)] });
  }
  function burst(s) {
    var n = 34 + Math.floor(Math.random() * 18), sp = 1.6 + Math.random() * 1.4;
    for (var i = 0; i < n; i++) {
      var a = (i / n) * 6.283 + Math.random() * 0.1, v = sp * (0.75 + Math.random() * 0.35);
      embers.push({ x: s.x, y: s.y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: 1, c: s.c });
    }
  }
  function fireFrame() {
    fx.setTransform(dpr, 0, 0, dpr, 0, 0);
    fx.clearRect(0, 0, fw, fh);
    for (var i = shells.length - 1; i >= 0; i--) {
      var s = shells[i];
      s.y -= 5.2; s.x += s.vx;
      fx.globalAlpha = 0.9; fx.fillStyle = '#ffe9c0';
      fx.fillRect(s.x - 1, s.y, 2, 7);
      if (s.y <= s.ty) { burst(s); shells.splice(i, 1); }
    }
    for (var j = embers.length - 1; j >= 0; j--) {
      var e = embers[j];
      e.x += e.vx; e.y += e.vy; e.vx *= 0.985; e.vy = e.vy * 0.985 + 0.028; e.life -= 0.0105;
      if (e.life <= 0) { embers.splice(j, 1); continue; }
      fx.globalAlpha = Math.min(1, e.life * 1.4); fx.fillStyle = e.c;
      fx.beginPath(); fx.arc(e.x, e.y, 1.7, 0, 6.283); fx.fill();
    }
    fx.globalAlpha = 1;
    fraf = shells.length || embers.length ? requestAnimationFrame(fireFrame) : 0;
  }
  function fireworks() {
    clearTimeout(fireT);
    if (!fx || reduced || isDown()) return;
    fireT = setTimeout(function () {
      if (!isDown() && !document.hidden && !root.classList.contains('is-gone')) {
        if (!fw) fireSize();
        launch();
        // now and then a second shell goes up right behind the first
        if (Math.random() < 0.35) setTimeout(launch, 380);
        if (!fraf) fraf = requestAnimationFrame(fireFrame);
      }
      fireworks();
    }, 3800 + Math.random() * 5200);
  }

  /* ───────────── the far side: spores ───────────── */
  var cv = $('udSpores'), cx = cv && cv.getContext ? cv.getContext('2d') : null;
  var dpr = Math.min(window.devicePixelRatio || 1, 2), P = [], raf = 0, stopT = 0;
  function seed() {
    if (!cx) return;
    cv.width = Math.round(innerWidth * dpr); cv.height = Math.round(innerHeight * dpr);
    var n = Math.round(Math.min(110, Math.max(36, innerWidth * innerHeight / 14000)));
    P = [];
    for (var i = 0; i < n; i++) {
      P.push({ x: Math.random() * innerWidth, y: Math.random() * innerHeight,
               r: 0.5 + Math.random() * 1.8, v: 0.08 + Math.random() * 0.3,
               a: 0.2 + Math.random() * 0.5, p: Math.random() * 6.283 });
    }
  }
  function drawSpores() {
    cx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cx.clearRect(0, 0, innerWidth, innerHeight);
    cx.fillStyle = '#d9e3ec';
    for (var i = 0; i < P.length; i++) {
      var s = P[i];
      cx.globalAlpha = s.a;
      cx.beginPath(); cx.arc(s.x, s.y, s.r, 0, 6.283); cx.fill();
    }
    cx.globalAlpha = 1;
  }
  // they rise, slowly, and sway: ash in still air
  function drift(t) {
    for (var i = 0; i < P.length; i++) {
      var s = P[i];
      s.y -= s.v;
      s.x += Math.sin(t / 2600 + s.p) * 0.22;
      if (s.y < -4) { s.y = innerHeight + 4; s.x = Math.random() * innerWidth; }
      if (s.x < -4) s.x = innerWidth + 4; else if (s.x > innerWidth + 4) s.x = -4;
    }
    drawSpores();
    raf = requestAnimationFrame(drift);
  }
  function spores() {
    clearTimeout(stopT);
    if (!cx) return;
    if (!isDown()) {
      // keep them moving while the canvas fades out, then stop drawing
      stopT = setTimeout(function () { cancelAnimationFrame(raf); raf = 0; }, 1300);
      return;
    }
    if (!P.length) seed();
    if (reduced) { drawSpores(); return; }     // still: drawn once, where they hang
    if (!raf && !document.hidden) raf = requestAnimationFrame(drift);
  }
  var resizeT = 0;
  addEventListener('resize', function () {
    clearTimeout(resizeT);
    resizeT = setTimeout(function () {
      if (cx && P.length) { seed(); if (reduced && isDown()) drawSpores(); }
      if (fw) fireSize();
    }, 200);
  });

  /* ───────────── the far side: lightning ───────────── */
  var face = $('udDownFace'), bolt = $('udBolt'), flashT = 0;
  // a jagged line down out of the cloud, with one fork off it; drawn in a
  // 1000 by 1000 box that is stretched over the sky
  function boltPath(x) {
    var pts = [[x, -10]], px = x, py = -10, n = 8 + Math.floor(Math.random() * 4);
    for (var i = 0; i < n; i++) { py += 26 + Math.random() * 30; px += (Math.random() - 0.5) * 64; pts.push([px, py]); }
    var d = 'M' + pts.map(function (p) { return p[0].toFixed(0) + ',' + p[1].toFixed(0); }).join(' L');
    var f = pts[3 + Math.floor(Math.random() * 3)], fx = f[0], fy = f[1], dir = Math.random() < 0.5 ? -1 : 1;
    d += ' M' + fx.toFixed(0) + ',' + fy.toFixed(0);
    for (var j = 0; j < 4; j++) { fy += 18 + Math.random() * 24; fx += dir * (12 + Math.random() * 20); d += ' L' + fx.toFixed(0) + ',' + fy.toFixed(0); }
    return d;
  }
  function strike() {
    if (!isDown() || reduced || !face || !bolt) return;
    if (!document.hidden) {
      var x = 8 + Math.random() * 84;
      bolt.setAttribute('d', boltPath(x * 10));
      face.style.setProperty('--x', x + '%');
      face.classList.remove('is-strike');
      void face.offsetWidth;                  // restart the pulse
      face.classList.add('is-strike');
    }
    schedule();
  }
  // one pulse every 6.5 to 14 seconds: weather, not a strobe
  function schedule(soon) {
    clearTimeout(flashT);
    if (isDown() && !reduced) flashT = setTimeout(strike, soon ? 2600 : 6500 + Math.random() * 7500);
  }

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) { cancelAnimationFrame(raf); raf = 0; }
    else spores();
  });

  /* ───────────── the readout ───────────── */
  var clock = $('udClock'), downSince = Date.now();
  var DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  function tick() {
    if (!clock) return;
    var d = new Date();
    if (isDown()) {
      // the other side stopped the night the gate first opened; only your time there moves
      var s = Math.floor((Date.now() - downSince) / 1000);
      clock.textContent = 'Nov 6 1983 · ' + Math.floor(s / 60) + ':' + pad(s % 60) + ' inside';
    } else {
      // today, as it fell in 1985, the summer Starcourt opened: the same date, with that year's weekday
      var then = new Date(1985, d.getMonth(), d.getDate());
      clock.textContent = DAYS[then.getDay()] + ' ' + MONTHS[d.getMonth()] + ' ' + d.getDate() + ' 1985 · ' +
        pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds());
    }
  }
  tick(); setInterval(tick, 1000);

  /* ───────────── the switch ───────────── */
  var sw = $('udSwitch'), crossBtn = $('udCross'), crossT = $('udCrossT'), where = $('udWhere');
  function paint() {
    var d = isDown();
    if (sw) sw.setAttribute('aria-checked', d ? 'true' : 'false');
    if (crossT) crossT.textContent = d ? 'Walk back up' : 'Take me straight down';
    if (where) where.textContent = d ? 'The Upside Down · under Starcourt' : 'Hawkins, Indiana · Starcourt Mall';
  }
  function cross(d) {
    root.classList.toggle('is-down', d);
    downSince = Date.now();
    // the switch is a shortcut for the scroll, so it takes the page with it:
    // otherwise the class and --dp would disagree and the sky would say one
    // side while the color over it said the other
    ride(d);
    paint(); tick(); spores(); schedule(true); fireworks();
    // what Will spelled first, and what he spelled when it came
    spell(d ? 'RUN' : 'RIGHT HERE', false);
  }
  var busy = false;
  function flip() {
    if (busy) return;
    var d = !isDown();
    if (sw) sw.classList.remove('is-nudge');
    if (reduced) { cross(d); return; }
    busy = true;
    // the lights know first: every bulb surges once, out of order
    cellList.forEach(function (c) { c.style.setProperty('--sd', (Math.random() * 0.3).toFixed(2) + 's'); });
    clearTimeout(timer); dark();
    root.classList.add('is-surge');
    setTimeout(function () { root.classList.remove('is-surge'); cross(d); busy = false; }, 620);
  }
  if (sw) sw.addEventListener('click', flip);
  if (crossBtn) crossBtn.addEventListener('click', flip);
  paint();

  /* ───────────── the descent ─────────────
     The merge's one new mechanism. Scrolling the page walks the town over:
     --dp is how far down you are (0 at the top, 1 at the foot) and
     hawkins.css keys every cold thing on the page to it.

     WHY A CLASS AS WELL AS A NUMBER. The gradual part is --dp, but the flip
     of the sky is a 3D card turn that cannot be done halfway without
     looking broken, and the fireworks, the spores, the clock and the signs
     were all already written against the binary .is-down that the switch
     sets. So the scroll sets --dp continuously and trips the SAME class at
     the halfway mark. Nothing that existed had to be rewritten, and the
     switch keeps working for a reader who would rather not walk.

     WHY A DEAD BAND ROUND THE TRIP POINT. Flipping exactly at .5 would turn
     the sky over and back on every small scroll near the middle, so the
     class goes on at .55 going down and only comes off again at .45. */
  /* the gauge is aria-hidden: it is a picture of the scroll, and the
     header's where-line is what a screen reader is actually told. Only
     its word needs writing. */
  var depthT = $('udDepthT');
  var dp = 0, dpRaf = 0, swept = false;

  // what the gauge is called at this depth: the five names the show gives it
  function depthName(v) {
    if (v < .12) return 'Hawkins';
    if (v < .40) return 'Starcourt';
    if (v < .58) return 'The gate';
    if (v < .84) return 'Going under';
    return 'The Upside Down';
  }

  function measure() {
    var h = document.documentElement;
    var run = (h.scrollHeight - innerHeight);
    return run > 40 ? Math.min(1, Math.max(0, (pageYOffset || h.scrollTop || 0) / run)) : 0;
  }

  function writeDepth() {
    dpRaf = 0;
    root.style.setProperty('--dp', dp.toFixed(4));
    if (depthT) {
      var n = depthName(dp);
      if (depthT.textContent !== n) depthT.textContent = n;
    }

    // the class, with the dead band, and only when neither the switch's
    // animation nor the scroll it started is still running
    if (!busy && !autoScroll) {
      var d = isDown();
      if (!d && dp > .55) { root.classList.add('is-down'); settleSide(); }
      else if (d && dp < .45) { root.classList.remove('is-down'); settleSide(); }
    }
  }

  // everything that watches the side, after the scroll has changed it
  function settleSide() {
    paint(); tick(); spores(); schedule(true); fireworks();
    // Will says it once, the first time the scroll takes you under
    if (isDown() && !swept) { swept = true; spell('RUN', false); }
  }

  function onScroll() {
    dp = measure();
    if (!dpRaf) dpRaf = requestAnimationFrame(writeDepth);
  }

  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);
  onScroll(); writeDepth();

  /* the switch and the scroll must never disagree about which side you are
     on, so throwing the switch also takes the page to that end. The class is
     set by flip() first and the scroll then arrives at a matching --dp. */
  /* WHY THE LOCK. ride() scrolls, the scroll calls writeDepth(), and
     writeDepth() is the thing that sets the class from the depth: without a
     lock the switch would set the class, the scroll it started would pass
     back through the dead band and set it straight back. So the scroll the
     switch causes is marked as the switch's own and writeDepth() only writes
     the number while it runs, not the class. The lock is cleared when the
     page stops moving, not on a timer, so a slow smooth scroll is safe.
     (pick() has its own local `riding`, meaning something else entirely:
     whether the wall is alongside the rooms. These must not be confused.) */
  var autoScroll = 0;
  function ride(d) {
    var h = document.documentElement;
    var y = d ? (h.scrollHeight - innerHeight) : 0;
    autoScroll++;
    var last = -1, still = 0;
    (function watch() {
      var now = pageYOffset || h.scrollTop || 0;
      if (Math.abs(now - last) < 1) { still++; } else { still = 0; }
      last = now;
      // two quiet frames in a row, or the far end reached, and it has landed
      if (still > 1 || Math.abs(now - y) < 2) { autoScroll = Math.max(0, autoScroll - 1); return; }
      requestAnimationFrame(watch);
    })();
    try { scrollTo({ top: y, behavior: reduced ? 'auto' : 'smooth' }); }
    catch (e) { scrollTo(0, y); }   /* older WebKit: no options object */
  }

  /* ───────────── the tape, and the Void ───────────── */
  var tape = $('udTape'), main = $('udMain'), top = $('udTop'), home = $('udHome'), stay = $('udStay');
  function gone(on) {
    root.classList.toggle('is-gone', on);
    if (main) main.inert = on;
    if (top) top.inert = on;
    if (on) {
      clearTimeout(timer); dark();
      setTimeout(function () { if (home) home.focus({ preventScroll: true }); }, reduced ? 0 : 400);
    }
  }
  function back() {
    if (!root.classList.contains('is-gone')) return;
    gone(false);
    if (tape) tape.focus({ preventScroll: true });
  }
  if (tape) tape.addEventListener('click', function () { gone(true); });
  if (stay) stay.addEventListener('click', back);
  // back from the next page, the Void is still up; take it down
  addEventListener('pageshow', function (e) { if (e.persisted) gone(false); });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { back(); return; }
    if (e.metaKey || e.ctrlKey || e.altKey || e.repeat) return;
    // type at the wall and it answers, a bulb a key, when it is not busy talking
    if (/^[a-z]$/i.test(e.key) && !word && !root.classList.contains('is-gone')) {
      var c = cells[e.key.toUpperCase()];
      if (!c) return;
      c.classList.add('is-on');
      clearTimeout(c.udT);
      c.udT = setTimeout(function () { c.classList.remove('is-on'); }, 650);
    }
  });

  /* ───────────── first words ───────────── */
  setTimeout(function () {
    if (!word) spell('RIGHT HERE', false);
    // and once it has said them, the switch twitches, so it gets found
    if (!reduced && sw) setTimeout(function () {
      if (!isDown()) { sw.classList.add('is-nudge'); setTimeout(function () { sw.classList.remove('is-nudge'); }, 2000); }
    }, 6400);
  }, 700);
  setTimeout(twinkle, 9000);
  attract();
  fireworks();
})();
