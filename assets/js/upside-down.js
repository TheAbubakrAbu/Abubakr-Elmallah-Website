/* upside-down.js: /upside-down/, the Stranger Things terminal.

   The page is drawn in CSS and SVG; this is the part of it that is alive:

     the wall      Joyce's alphabet. Point at anything with data-spell, or
                   tab to it, and the bulbs over its letters light one at a
                   time to spell it, the way Will did, and again for as long
                   as you stay. A finger cannot hover, so on a touch screen
                   the wall (which rides over the rooms) spells whichever
                   room you stop scrolling at instead.
     the switch    two controls for one state: the light switch on the wall
                   and the button under the intro. Every bulb surges once,
                   the sky turns over like a card, and the house is on the
                   other side.
     the far side  spores on a canvas and a soft red pulse of lightning every
                   several seconds, both only while you are over there, and
                   never at all with reduced motion.
     the readouts  the header clock (today's date as it fell in 1983, or, on
                   the other side, the date it stopped and how long you have
                   been in), and the walkie-talkie's channel screen.

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
  var spelt = $('udSpelt'), capK = $('udCapK');
  var IDLE = canHover ? 'Point at a room' : 'Scroll to a room';

  var word = '', idx = 0, timer = 0, looping = false, asker = null;

  function dark() { cellList.forEach(function (c) { c.classList.remove('is-on'); }); }

  // the read-out under the wall: the letters so far, a dot for each to come
  function readout(n) {
    var out = [];
    for (var i = 0; i < word.length; i++) out.push(word[i] === ' ' ? ' ' : i < n ? word[i] : '·');
    if (spelt) spelt.textContent = out.join(' ');
  }
  function quiet() {
    clearTimeout(timer); dark();
    word = ''; asker = null; looping = false;
    if (capK) capK.textContent = 'The wall is quiet';
    if (spelt) spelt.textContent = IDLE;
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

  /* ───────────── the walkie-talkie's screen ───────────── */
  var lcdCh = $('udLcdCh'), lcdName = $('udLcdName');
  function channel(el) {
    if (!lcdCh || !lcdName) return;
    var ch = el && el.dataset.ch, name = el && el.querySelector('b');
    lcdCh.textContent = ch ? 'CH ' + ch : 'CH --';
    lcdName.textContent = ch && name ? name.textContent : 'Listening';
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
    resizeT = setTimeout(function () { if (cx && P.length) { seed(); if (reduced && isDown()) drawSpores(); } }, 200);
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
      // the other side stopped the night the gate opened; only your time there moves
      var s = Math.floor((Date.now() - downSince) / 1000);
      clock.textContent = 'Nov 6 1983 · ' + Math.floor(s / 60) + ':' + pad(s % 60) + ' inside';
    } else {
      // today, as it fell in 1983: the same date, with that year's weekday
      var then = new Date(1983, d.getMonth(), d.getDate());
      clock.textContent = DAYS[then.getDay()] + ' ' + MONTHS[d.getMonth()] + ' ' + d.getDate() + ' 1983 · ' +
        pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds());
    }
  }
  tick(); setInterval(tick, 1000);

  /* ───────────── the switch ───────────── */
  var sw = $('udSwitch'), crossBtn = $('udCross'), crossT = $('udCrossT'), where = $('udWhere');
  function paint() {
    var d = isDown();
    if (sw) sw.setAttribute('aria-checked', d ? 'true' : 'false');
    if (crossT) crossT.textContent = d ? 'Turn it upside up' : 'Turn it upside down';
    if (where) where.textContent = d ? 'The Upside Down · the Byers house' : 'Hawkins, Indiana · the Byers house';
  }
  function cross(d) {
    root.classList.toggle('is-down', d);
    downSince = Date.now();
    paint(); tick(); spores(); schedule(true);
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
})();
