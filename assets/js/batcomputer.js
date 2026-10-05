/* batcomputer.js: /batcomputer/, the Batman terminal.

   The live parts of the cave, in the order they sit on the page:

     the clock      Gotham time (New York's clock, since Gotham is drawn
                    from it) and whether he is out on patrol
     the signal     the main monitor: a canvas of Gotham at night, cloud
                    rolling over the skyline, and the signal thrown from
                    the GCPD roof. Lit, every puff of cloud near the spot
                    takes the light, and the spot follows your pointer
     detective      one class on the body; the CSS recolours the page and
                    the canvas redraws itself as a wireframe
     the file       the redaction bars lift once the file is on screen
     the turn       Gordon turns round, the bats go, and he is gone

   Nothing here writes an address or a fact: the page's lists are the real
   content, and this only lights them up. */
(function batcomputer() {
  'use strict';

  var root = document.getElementById('bc');
  if (!root) return;
  var $ = function (id) { return document.getElementById(id); };
  var reduced = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  /* smooth scrolling only after load, so back/forward restores the position instantly instead of sliding to it */
  addEventListener('load', function () {
    requestAnimationFrame(function () { requestAnimationFrame(function () {
      document.documentElement.classList.add('smooth');
    }); });
  });

  /* ───────────── the clock ───────────── */

  var clock = $('bcClock');
  var gothamFmt = null;
  try {
    gothamFmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  } catch (e) { gothamFmt = null; }
  function tick() {
    var d = new Date();
    var t = gothamFmt ? gothamFmt.format(d) : pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds());
    var h = parseInt(t.slice(0, 2), 10);
    // after dark the cave is empty: he is out in the city until dawn
    var where = (h >= 20 || h < 6) ? 'on patrol' : 'in the cave';
    if (clock) clock.textContent = 'Gotham ' + t + ' · ' + where;
  }
  tick(); setInterval(tick, 1000);

  /* ───────────── the signal ───────────── */

  // The bat, as on the page's <symbol id="bcBat">: the same outline in the
  // same units, centred on (0, 0), 192 wide and 72 tall.
  var BAT = 'M0 -12 L8 -12 L12 -30 L16 -10 C34 -12 60 -22 96 -34 C84 -18 82 -2 90 12 C78 4 64 4 56 16 C48 6 36 6 30 20 C20 18 10 24 0 38 C-10 24 -20 18 -30 20 C-36 6 -48 6 -56 16 C-64 4 -78 4 -90 12 C-82 -2 -84 -18 -96 -34 C-60 -22 -34 -12 -16 -10 L-12 -30 L-8 -12 Z';

  var scene = $('bcScene'), cv = $('bcSky');
  var ctx = cv && cv.getContext ? cv.getContext('2d') : null;
  var sw = $('bcSwitch'), swT = $('bcSwitchT'), status = $('bcStatus'), aimEl = $('bcAim');
  var detBtn = $('bcDetect');
  var batPath = null;
  try { batPath = new Path2D(BAT); } catch (e) { batPath = null; }

  var W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
  var detective = false;

  // a seeded random, so the city is the same city every time it is drawn
  function rng(seed) {
    return function () {
      seed |= 0; seed = seed + 0x6D2B79F5 | 0;
      var t = Math.imul(seed ^ seed >>> 15, 1 | seed);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }

  /* The skyline, in fractions of the frame so it survives a resize: a far
     row of paler blocks, a near row of black ones with gothic tops (spires,
     stepped crowns, the odd gargoyle ledge), Wayne Tower standing on the left
     (clear of the signal) and the GCPD building on the right with the lamp on its roof. */
  var far = [], near = [], wins = [];
  var GCPD = { x: 0.72, w: 0.085, h: 0.30 };
  var WAYNE = { x: 0.13, w: 0.05, h: 0.5 };
  function buildCity() {
    var r = rng(1939);
    far = []; near = [];
    var x = -0.02;
    while (x < 1.02) {
      var w = 0.03 + r() * 0.05;
      far.push({ x: x, w: w, h: 0.22 + r() * 0.26, top: r() < 0.35 ? 'spire' : (r() < 0.5 ? 'step' : 'flat') });
      x += w + r() * 0.01;
    }
    x = -0.01;
    while (x < 1.02) {
      var w2 = 0.028 + r() * 0.05;
      var b = { x: x, w: w2, h: 0.14 + r() * 0.24, top: r() < 0.3 ? 'spire' : (r() < 0.45 ? 'step' : (r() < 0.4 ? 'ledge' : 'flat')) };
      // leave room for the two landmarks
      if (!(x + w2 > GCPD.x - 0.01 && x < GCPD.x + GCPD.w + 0.01) && !(x + w2 > WAYNE.x - 0.01 && x < WAYNE.x + WAYNE.w + 0.01)) near.push(b);
      x += w2 + r() * 0.006;
    }
    near.push({ x: WAYNE.x, w: WAYNE.w, h: WAYNE.h, top: 'wayne' });
    near.push({ x: GCPD.x, w: GCPD.w, h: GCPD.h, top: 'flat', gcpd: true });
    // windows: a grid on each near block, about a quarter of them lit
    wins = [];
    near.forEach(function (bk) {
      var cols = Math.max(2, Math.round(bk.w / 0.012));
      var rows = Math.max(3, Math.round(bk.h / 0.035));
      for (var i = 0; i < cols; i++) for (var j = 1; j < rows; j++) {
        if (r() < 0.24) wins.push({ b: bk, i: i, j: j, cols: cols, rows: rows, on: 1, warm: r() });
      }
    });
  }

  /* Cloud: soft puffs in three layers that drift left at three speeds and
     wrap round. Each is drawn twice from two sprites: once dark, as cloud
     at night, and once in the signal's light, as strongly as it is close to
     the spot. That second pass is what makes the light look like it lands
     in the weather. */
  var puffs = [];
  function buildClouds() {
    var r = rng(52);
    puffs = [];
    for (var i = 0; i < 70; i++) {
      var layer = i < 26 ? 0 : (i < 52 ? 1 : 2);
      puffs.push({
        x: r() * 1.3 - 0.15,
        y: 0.04 + r() * (layer === 2 ? 0.34 : 0.42),
        s: (layer === 0 ? 0.20 : layer === 1 ? 0.16 : 0.12) + r() * 0.10,
        v: (layer === 0 ? 0.004 : layer === 1 ? 0.007 : 0.011) * (0.7 + r() * 0.6),
        a: layer === 0 ? 0.55 : layer === 1 ? 0.6 : 0.45,
        layer: layer
      });
    }
  }
  function sprite(rgb) {
    var c = document.createElement('canvas'); c.width = c.height = 128;
    var g = c.getContext('2d');
    var gr = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    gr.addColorStop(0, 'rgba(' + rgb + ',1)');
    gr.addColorStop(0.45, 'rgba(' + rgb + ',.6)');
    gr.addColorStop(1, 'rgba(' + rgb + ',0)');
    g.fillStyle = gr; g.fillRect(0, 0, 128, 128);
    return c;
  }
  var SPR = null;
  function sprites() {
    SPR = {
      dark: sprite('52,58,72'), lit: sprite('255,232,160'),
      dDark: sprite('10,52,84'), dLit: sprite('255,154,60')
    };
  }

  // the light: on (0 or 1, where it is heading), level (where it is), and the spot
  var on = false, level = 0, warm = 0;
  var spot = { x: 0.42, y: 0.2 }, aim = { x: 0.42, y: 0.2 }, aimed = false, pointerAt = 0;

  function resize() {
    if (!cv) return;
    var r = scene.getBoundingClientRect();
    W = Math.max(1, Math.round(r.width)); H = Math.max(1, Math.round(r.height));
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    kick();
  }

  function lamp() {   // the lamp's place on the GCPD roof, in pixels
    return { x: (GCPD.x + GCPD.w * 0.5) * W, y: H - GCPD.h * H - 12 };
  }
  // keep the spot in the cloud band and inside the frame
  function clampSpot(p) {
    p.x = Math.max(0.12, Math.min(0.88, p.x));
    p.y = Math.max(0.1, Math.min(0.4, p.y));
    return p;
  }

  function drawSky() {
    var g = ctx.createLinearGradient(0, 0, 0, H);
    if (detective) {
      g.addColorStop(0, '#020a14'); g.addColorStop(0.7, '#061a2c'); g.addColorStop(1, '#0a2a44');
    } else {
      // the city's sodium glow from below, which is all the light Gotham has
      g.addColorStop(0, '#05070c'); g.addColorStop(0.55, '#121722'); g.addColorStop(0.85, '#2a2522'); g.addColorStop(1, '#3a2c20');
    }
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  }

  function drawClouds(layerMin, layerMax, sx, sy, rx, ry) {
    var dark = detective ? SPR.dDark : SPR.dark, lit = detective ? SPR.dLit : SPR.lit;
    for (var i = 0; i < puffs.length; i++) {
      var p = puffs[i];
      if (p.layer < layerMin || p.layer > layerMax) continue;
      var size = p.s * Math.max(W, H * 1.4);
      var px = p.x * W, py = p.y * H * 1.0;
      ctx.globalAlpha = p.a * (detective ? 0.7 : 1);
      ctx.drawImage(dark, px - size / 2, py - size * 0.32, size, size * 0.64);
      if (level > 0.01) {
        var dx = (px - sx) / rx, dy = (py - sy) / ry;
        var L = level * Math.exp(-(dx * dx + dy * dy) * 0.9);
        if (L > 0.02) {
          ctx.globalAlpha = Math.min(1, p.a * L * 0.95);
          ctx.drawImage(lit, px - size / 2, py - size * 0.32, size, size * 0.64);
        }
      }
    }
    ctx.globalAlpha = 1;
  }

  function drawBeam(L, sx, sy, rx) {
    if (level <= 0.01) return;
    var dx = sx - L.x, dy = sy - L.y, len = Math.sqrt(dx * dx + dy * dy) || 1;
    var nx = -dy / len, ny = dx / len;
    var near1 = 5, far1 = rx * 0.85;
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    var g = ctx.createLinearGradient(L.x, L.y, sx, sy);
    var c = detective ? '255,154,60' : '255,236,180';
    g.addColorStop(0, 'rgba(' + c + ',' + (0.42 * level) + ')');
    g.addColorStop(0.6, 'rgba(' + c + ',' + (0.12 * level) + ')');
    g.addColorStop(1, 'rgba(' + c + ',' + (0.05 * level) + ')');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.moveTo(L.x + nx * near1, L.y + ny * near1);
    ctx.lineTo(sx + nx * far1, sy + ny * far1);
    ctx.lineTo(sx - nx * far1, sy - ny * far1);
    ctx.lineTo(L.x - nx * near1, L.y - ny * near1);
    ctx.closePath(); ctx.fill();
    ctx.restore();
  }

  function drawSpot(sx, sy, rx, ry) {
    if (level <= 0.01) return;
    ctx.save();
    // the disc of light on the cloud base
    var g = ctx.createRadialGradient(sx, sy, 0, sx, sy, rx * 1.25);
    var c = detective ? '255,170,90' : '255,233,160';
    g.addColorStop(0, 'rgba(' + c + ',' + (0.9 * level) + ')');
    g.addColorStop(0.72, 'rgba(' + c + ',' + (0.7 * level) + ')');
    g.addColorStop(0.8, 'rgba(' + c + ',' + (0.18 * level) + ')');
    g.addColorStop(1, 'rgba(' + c + ',0)');
    ctx.translate(sx, sy);
    ctx.scale(1, ry / rx);
    ctx.translate(-sx, -sy);
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(sx, sy, rx * 1.25, 0, Math.PI * 2); ctx.fill();
    // the bat, the lamp's own shadow, thrown up with the light
    if (batPath) {
      ctx.translate(sx, sy);
      var k = (rx * 1.55) / 192;
      ctx.scale(k, k);
      ctx.globalAlpha = 0.86 * level;
      ctx.fillStyle = detective ? '#04121e' : '#12141a';
      ctx.fill(batPath);
    }
    ctx.restore();
  }

  function blockPath(b, base) {
    var x = b.x * W, w = b.w * W, h = b.h * H, y = base - h;
    ctx.moveTo(x, base); ctx.lineTo(x, y);
    if (b.top === 'spire') {
      ctx.lineTo(x + w * 0.2, y); ctx.lineTo(x + w * 0.5, y - h * 0.22); ctx.lineTo(x + w * 0.8, y); ctx.lineTo(x + w, y);
    } else if (b.top === 'step') {
      ctx.lineTo(x + w * 0.15, y); ctx.lineTo(x + w * 0.15, y - h * 0.06); ctx.lineTo(x + w * 0.3, y - h * 0.06); ctx.lineTo(x + w * 0.3, y - h * 0.12);
      ctx.lineTo(x + w * 0.7, y - h * 0.12); ctx.lineTo(x + w * 0.7, y - h * 0.06); ctx.lineTo(x + w * 0.85, y - h * 0.06); ctx.lineTo(x + w * 0.85, y); ctx.lineTo(x + w, y);
    } else if (b.top === 'ledge') {
      // a cornice with a crouched shape at one end: every roof in Gotham has one
      ctx.lineTo(x - 3, y); ctx.lineTo(x - 3, y - 3); ctx.lineTo(x + w * 0.62, y - 3);
      ctx.lineTo(x + w * 0.66, y - 9); ctx.lineTo(x + w * 0.7, y - 6); ctx.lineTo(x + w * 0.78, y - 11); ctx.lineTo(x + w * 0.8, y - 3);
      ctx.lineTo(x + w + 3, y - 3); ctx.lineTo(x + w + 3, y); ctx.lineTo(x + w, y);
    } else if (b.top === 'wayne') {
      // Wayne Tower: setbacks, a lantern and a mast
      ctx.lineTo(x + w * 0.12, y); ctx.lineTo(x + w * 0.12, y - h * 0.06); ctx.lineTo(x + w * 0.24, y - h * 0.06);
      ctx.lineTo(x + w * 0.24, y - h * 0.12); ctx.lineTo(x + w * 0.46, y - h * 0.12); ctx.lineTo(x + w * 0.48, y - h * 0.26);
      ctx.lineTo(x + w * 0.52, y - h * 0.26); ctx.lineTo(x + w * 0.54, y - h * 0.12); ctx.lineTo(x + w * 0.76, y - h * 0.12);
      ctx.lineTo(x + w * 0.76, y - h * 0.06); ctx.lineTo(x + w * 0.88, y - h * 0.06); ctx.lineTo(x + w * 0.88, y); ctx.lineTo(x + w, y);
    } else {
      ctx.lineTo(x + w, y);
    }
    ctx.lineTo(x + w, base);
  }

  function drawCity(t) {
    var base = H + 1;
    // far row, scaled down a little so it sits behind
    ctx.beginPath();
    far.forEach(function (b) { blockPath({ x: b.x, w: b.w, h: b.h * 0.85, top: b.top }, base); });
    if (detective) {
      ctx.fillStyle = 'rgba(6,30,50,.85)'; ctx.fill();
      ctx.strokeStyle = 'rgba(76,195,255,.28)'; ctx.lineWidth = 1; ctx.stroke();
    } else {
      ctx.fillStyle = '#161a22'; ctx.fill();
    }
    // near row
    ctx.beginPath();
    near.forEach(function (b) { blockPath(b, base); });
    if (detective) {
      ctx.fillStyle = '#041321'; ctx.fill();
      ctx.strokeStyle = 'rgba(76,195,255,.75)'; ctx.lineWidth = 1.2; ctx.stroke();
    } else {
      ctx.fillStyle = '#07080b'; ctx.fill();
    }
    // windows (detective mode sees through them, so they go dark)
    if (!detective) {
      for (var i = 0; i < wins.length; i++) {
        var wn = wins[i]; if (!wn.on) continue;
        var b = wn.b, bw = b.w * W, bh = b.h * H;
        var cw = bw / wn.cols, rh = bh / wn.rows;
        ctx.fillStyle = wn.warm > 0.8 ? 'rgba(170,200,230,.55)' : 'rgba(247,206,120,' + (0.35 + wn.warm * 0.4) + ')';
        ctx.fillRect(b.x * W + wn.i * cw + cw * 0.3, base - bh + wn.j * rh, Math.max(1.5, cw * 0.4), Math.max(2, rh * 0.42));
      }
    }
    // Wayne Tower's lantern
    var wx = (WAYNE.x + WAYNE.w * 0.5) * W, wh = WAYNE.h * H, wy = H - wh;
    ctx.fillStyle = detective ? '#ff9a3c' : 'rgba(255,214,140,.9)';
    ctx.fillRect(wx - WAYNE.w * W * 0.22, wy - wh * 0.11, WAYNE.w * W * 0.44, wh * 0.03);
    // the aircraft light on the mast, blinking
    if (!reduced && Math.floor(t / 900) % 2) {
      ctx.fillStyle = '#ff4a3a';
      ctx.beginPath(); ctx.arc(wx, wy - wh * 0.26, 1.8, 0, Math.PI * 2); ctx.fill();
    }
  }

  function drawLamp(L, sx, sy) {
    var a = Math.atan2(sy - L.y, sx - L.x);
    ctx.save();
    // the stand
    ctx.fillStyle = detective ? '#0b2a44' : '#0d0f13';
    ctx.strokeStyle = detective ? 'rgba(255,154,60,.9)' : 'rgba(201,205,210,.35)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(L.x - 9, L.y + 12); ctx.lineTo(L.x, L.y); ctx.lineTo(L.x + 9, L.y + 12); ctx.closePath(); ctx.fill(); ctx.stroke();
    // the drum, turned toward the spot
    ctx.translate(L.x, L.y); ctx.rotate(a);
    ctx.fillStyle = detective ? '#0b2a44' : '#1b1f26';
    ctx.fillRect(-8, -7, 18, 14); ctx.strokeRect(-8, -7, 18, 14);
    if (level > 0.01) {
      ctx.globalCompositeOperation = 'lighter';
      var g = ctx.createRadialGradient(11, 0, 0, 11, 0, 26);
      g.addColorStop(0, 'rgba(255,240,200,' + level + ')'); g.addColorStop(1, 'rgba(255,200,90,0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(11, 0, 26, 0, Math.PI * 2); ctx.fill();
    }
    ctx.restore();
  }

  // rain: a hundred and forty short slants, falling and blown a little left
  var drops = [];
  function buildRain() {
    var r = rng(7); drops = [];
    for (var i = 0; i < 140; i++) drops.push({ x: r(), y: r(), v: 0.6 + r() * 0.5, l: 8 + r() * 10 });
  }
  function drawRain(dt) {
    if (reduced) return;
    ctx.strokeStyle = detective ? 'rgba(76,195,255,.18)' : 'rgba(170,185,205,.16)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (var i = 0; i < drops.length; i++) {
      var d = drops[i];
      d.y += d.v * dt / 1000; d.x -= d.v * dt / 9000;
      if (d.y > 1) { d.y -= 1.05; }
      if (d.x < 0) d.x += 1;
      var x = d.x * W, y = d.y * H;
      ctx.moveTo(x, y); ctx.lineTo(x - d.l * 0.25, y + d.l);
    }
    ctx.stroke();
  }

  var last = 0, raf = 0, visible = true, flick = 0;
  function frame(now) {
    raf = 0;
    var dt = last ? Math.min(64, now - last) : 16; last = now;
    if (!ctx || !W) return;

    // the light's level: a lamp warming up flickers before it holds; going
    // out, it fades. Reduced motion skips the flicker.
    var target = on ? 1 : 0;
    if (on) {
      warm = Math.min(1, warm + dt / 1100);
      if (reduced) level = 1;
      else if (warm < 1) {
        flick -= dt;
        if (flick <= 0) { flick = 40 + Math.random() * 110; level = warm * (Math.random() < 0.35 ? 0.15 : 0.6 + Math.random() * 0.4); }
      } else level += (1 - level) * Math.min(1, dt / 120);
    } else {
      warm = 0;
      level = reduced ? 0 : Math.max(0, level - dt / 450);
    }

    // the spot: follows the pointer once you have aimed, otherwise it drifts
    // slowly over the clouds the way a hand-held light would
    if (!aimed && !reduced) {
      aim.x = 0.42 + Math.sin(now / 5200) * 0.06;
      aim.y = 0.2 + Math.sin(now / 3700) * 0.03;
    }
    var ease = reduced ? 1 : Math.min(1, dt / 220);
    spot.x += (aim.x - spot.x) * ease; spot.y += (aim.y - spot.y) * ease;

    // the clouds roll on
    if (!reduced) {
      for (var i = 0; i < puffs.length; i++) {
        var p = puffs[i]; p.x -= p.v * dt / 1000;
        if (p.x < -0.25) p.x += 1.5;
      }
    }

    var sx = spot.x * W, sy = spot.y * H;
    var rx = Math.min(W * 0.17, H * 0.3), ry = rx * 0.6;
    var L = lamp();
    // the light reaches cloud further than the disc itself
    var lrx = rx * 2.1, lry = ry * 2.4;

    drawSky();
    drawClouds(0, 0, sx, sy, lrx, lry);
    drawBeam(L, sx, sy, rx);
    drawClouds(1, 1, sx, sy, lrx, lry);
    drawSpot(sx, sy, rx, ry);
    drawClouds(2, 2, sx, sy, lrx * 0.9, lry * 0.9);   // the near layer passes in front of the bat
    drawRain(dt);
    drawCity(now);
    drawLamp(L, sx, sy);

    // the readout over the monitor: the lamp's bearing and elevation
    if (aimEl) {
      var brg = Math.round((Math.atan2(sx - L.x, -(sy - L.y)) * 180 / Math.PI + 360) % 360);
      var elv = Math.round(Math.atan2(L.y - sy, Math.abs(sx - L.x)) * 180 / Math.PI);
      var txt = 'AIM ' + ('00' + brg).slice(-3) + ' · ELEV ' + pad(Math.max(0, elv));
      if (aimEl.textContent !== txt) aimEl.textContent = txt;
    }

    // keep going while anything moves; with reduced motion, stop once still
    var busy = !reduced || Math.abs(level - target) > 0.01 || Math.abs(aim.x - spot.x) > 0.001 || Math.abs(aim.y - spot.y) > 0.001;
    if (busy && visible && !document.hidden) raf = requestAnimationFrame(frame);
  }
  function kick() { if (!raf && ctx) { last = 0; raf = requestAnimationFrame(frame); } }

  function setSignal(v) {
    on = v;
    if (sw) sw.setAttribute('aria-pressed', v ? 'true' : 'false');
    if (swT) swT.textContent = v ? 'Kill the signal' : 'Light the signal';
    if (scene) scene.classList.toggle('is-lit', v);
    if (status) status.textContent = v ? 'Signal lit over Gotham. He has seen it.' : 'Signal dark. Gotham is quiet.';
    kick();
  }

  if (ctx && scene) {
    buildCity(); buildClouds(); buildRain(); sprites();
    resize();
    addEventListener('resize', resize);
    if ('ResizeObserver' in window) new ResizeObserver(resize).observe(scene);

    // pause offscreen and in a background tab
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) { visible = es[0].isIntersecting; if (visible) kick(); }).observe(scene);
    }
    document.addEventListener('visibilitychange', function () { if (!document.hidden) kick(); });

    // aim: the pointer over the sky moves the spot, once the light is on
    function point(e) {
      if (!on) return;
      var r = scene.getBoundingClientRect();
      aim.x = (e.clientX - r.left) / r.width; aim.y = (e.clientY - r.top) / r.height;
      clampSpot(aim);
      if (!aimed) { aimed = true; scene.classList.add('is-aimed'); }
      pointerAt = Date.now();
      kick();
    }
    scene.addEventListener('pointermove', point);
    scene.addEventListener('pointerdown', point);
    // left alone for a while, the hand on the lamp goes back to its drift
    setInterval(function () { if (aimed && Date.now() - pointerAt > 6000) { aimed = false; kick(); } }, 1000);

    if (sw) sw.addEventListener('click', function () { setSignal(!on); });
    // the signal comes on by itself shortly after the page opens: this is
    // the centrepiece, and the switch is for putting it out and back
    setTimeout(function () { if (!on && !root.classList.contains('is-gone')) setSignal(true); }, reduced ? 0 : 900);
  }

  /* ───────────── detective mode ───────────── */

  if (detBtn) detBtn.addEventListener('click', function () {
    detective = !detective;
    root.classList.toggle('is-detective', detective);
    detBtn.setAttribute('aria-pressed', detective ? 'true' : 'false');
    if (status) status.textContent = detective
      ? 'Detective mode on. Every case on the wall scanned; evidence marked.'
      : (on ? 'Signal lit over Gotham. He has seen it.' : 'Signal dark. Gotham is quiet.');
    kick();
  });

  /* ───────────── the file ───────────── */

  // seal the answers (only now, with the script running) and lift the bars
  // one by one when the file comes on screen
  var file = $('bcFile');
  if (file && !reduced && 'IntersectionObserver' in window) {
    file.querySelectorAll('dd span').forEach(function (s, i) { s.style.setProperty('--k', i); });
    file.classList.add('is-sealed');
    var io = new IntersectionObserver(function (es) {
      if (es[0].isIntersecting) { file.classList.add('is-open'); io.disconnect(); }
    }, { threshold: 0.35 });
    io.observe(file);
  }

  /* ───────────── the turn ───────────── */

  var turn = $('bcTurn'), flock = $('bcFlock');
  function scatter() {
    if (!flock || reduced || !turn) return;
    var r = turn.getBoundingClientRect();
    var cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    var html = '';
    for (var i = 0; i < 22; i++) {
      var ang = -Math.PI / 2 + (Math.random() - 0.5) * 2.4;
      var dist = Math.max(innerWidth, innerHeight) * (0.55 + Math.random() * 0.5);
      html += '<svg viewBox="-100 -40 200 82" style="left:' + (cx - 20) + 'px;top:' + (cy - 8) + 'px;' +
        '--x:' + Math.round(Math.cos(ang) * dist) + 'px;--y:' + Math.round(Math.sin(ang) * dist) + 'px;' +
        '--s:' + Math.round(40 + Math.random() * 44) + 'px;--d:' + (Math.random() * 0.35).toFixed(2) + 's;' +
        '--t:' + (1.2 + Math.random() * 0.8).toFixed(2) + 's;--r:' + Math.round((Math.random() - 0.5) * 40) + 'deg">' +
        '<use href="#bcBat"/></svg>';
    }
    flock.innerHTML = html;
    setTimeout(function () { flock.innerHTML = ''; }, 2600);
  }
  if (turn) turn.addEventListener('click', function () {
    scatter();
    root.classList.add('is-gone');
  });
  function back() { root.classList.remove('is-gone'); if (flock) flock.innerHTML = ''; }
  // back from the next page, the empty roof is still on screen; take it down
  addEventListener('pageshow', function (e) { if (e.persisted) back(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') back(); });
})();
