/* elmallah.js: /elmallah/, the war-room holotable.

   The page's HTML already holds everything a visitor needs: the charts
   list every room as a plain link, under the power that holds it (the
   Republic, the interfaces; the Empire, the main site). This file turns
   that list into the table:

     the map       every .el-sys link is read for its bearing (data-a), its
                   distance from the core (data-r) and its height over the
                   plane (data-h), projected through one small perspective
                   camera, and drawn on one canvas with the table under it.
                   Each system gets a button over the canvas, so the map is
                   keyboard and screen-reader reachable, and the list and
                   the map cannot drift apart.
     the powers    each holds one unbroken stretch of the rim: its
                   territory is tinted in its color, its crest is laid
                   flat on the plane, and a frontier runs between them.
     the briefing  locking a target reads its data-brief and data-facts out
                   in the column beside the table, with the jump.
     the jump      stars stretch into lines, a flash, then the blue of
                   hyperspace, while the next page loads. Any key or tap
                   skips it, Esc aborts it, reduced motion never plays it.
     the stardate  years after the Battle of Yavin, which the films reached
                   on May 25, 1977, then the day of that year and the time.

   No dependencies, no image files. The thinking orbs are orbs.js's own. */
(function elmallah() {
  'use strict';

  var root = document.getElementById('el');
  if (!root) return;
  var reduced = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (id) { return document.getElementById(id); };
  var TAU = Math.PI * 2, DEG = Math.PI / 180;
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function ease(t) { return 1 - Math.pow(1 - clamp(t, 0, 1), 3); }

  /* ───────────── the stardate ───────────── */
  var clock = $('elClock');
  function stardate() {
    var d = new Date(), y = d.getFullYear(), since = y - 1977;
    var anniv = Date.UTC(y, 4, 25), today = Date.UTC(y, d.getMonth(), d.getDate());
    if (today < anniv) { since--; anniv = Date.UTC(y - 1, 4, 25); }
    var day = Math.round((today - anniv) / 864e5) + 1;
    if (clock) clock.textContent = since + ' ABY · Day ' + day + ' · ' + pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds());
  }
  stardate(); setInterval(stardate, 1000);

  /* ───────────── the systems, read from the charts ───────────── */
  // The lane each sector is reached by: the five great hyperlanes, one
  // each, and the Republic's worlds on the one that runs through them all.
  var LANE = {
    Core: 'You are already at the core',
    Work: 'The Corellian Run',
    Schools: 'The Perlemian Trade Route',
    Builds: 'The Hydian Way',
    Worlds: 'The Rimma Trade Route',
    Interfaces: 'The Corellian Trade Spine'
  };
  function rgbOf(hex) {
    hex = (hex || '#5fa3ec').trim().replace('#', '');
    if (hex.length === 3) hex = hex.replace(/./g, '$&$&');
    var n = parseInt(hex, 16);
    return ((n >> 16) & 255) + ',' + ((n >> 8) & 255) + ',' + (n & 255);
  }

  // The two powers, each read off its own section of the charts: its
  // color (--f), the name of its space and its crest, whose path the
  // table borrows from the page's sprite so there is only one drawing of it.
  var FACTIONS = {};
  function factionOf(a) {
    var box = a.closest('.el-faction'), name = box ? box.dataset.faction : 'Empire';
    if (!FACTIONS[name]) {
      var c = box ? getComputedStyle(box).getPropertyValue('--f').trim() : '#c9d4e2';
      var path = box && box.dataset.crest && document.querySelector('#' + box.dataset.crest + ' path');
      FACTIONS[name] = {
        name: name, full: 'Galactic ' + name, space: box ? box.dataset.space : name + ' space',
        c: c, rgb: rgbOf(c), crestId: box ? box.dataset.crest : '',
        crest: path && window.Path2D ? new Path2D(path.getAttribute('d')) : null
      };
    }
    return FACTIONS[name];
  }

  var links = Array.prototype.slice.call(document.querySelectorAll('.el-sys'));
  var SECTORS = {};
  var systems = links.map(function (a, i) {
    var box = a.closest('.el-sector');
    var name = box ? box.dataset.sector : 'Core';
    if (!SECTORS[name]) {
      // the color is the sector's own --c, so the CSS stays its only source
      var c = box ? getComputedStyle(box).getPropertyValue('--c').trim() : '#5fa3ec';
      SECTORS[name] = { name: name, c: c, rgb: rgbOf(c), list: [] };
    }
    var ang = (+a.dataset.a || 0) * DEG, r = +a.dataset.r || 0;
    var facts = (a.dataset.facts || '').split('|').filter(Boolean).map(function (f) {
      var k = f.indexOf(': ');
      return k > 0 ? [f.slice(0, k), f.slice(k + 2)] : ['', f];
    });
    var w = a.querySelector('.el-sys-w');
    var s = {
      i: i, a: a, href: a.getAttribute('href'),
      name: a.querySelector('b').textContent, sub: a.querySelector('i').textContent, world: w ? w.textContent : '',
      sector: SECTORS[name], faction: factionOf(a), ang: ang, r: r, h: +a.dataset.h || 0.1,
      x: r * Math.cos(ang), y: r * Math.sin(ang),
      grid: a.dataset.grid || '', brief: a.dataset.brief || '', facts: facts,
      core: r === 0, station: a.hasAttribute('data-station'), side: a.dataset.side || '',
      ping: 0, sx: 0, sy: 0
    };
    SECTORS[name].list.push(s);
    return s;
  });

  /* each sector's wedge, worked out from where its systems sit: the bounds
     fall halfway across the gaps between neighboring sectors */
  var wedges = [];
  (function () {
    var spans = [];
    Object.keys(SECTORS).forEach(function (k) {
      var sec = SECTORS[k];
      if (k === 'Core') return;
      var base = sec.list[0].ang, lo = Infinity, hi = -Infinity;
      sec.list.forEach(function (s) {
        var d = Math.atan2(Math.sin(s.ang - base), Math.cos(s.ang - base));
        lo = Math.min(lo, base + d); hi = Math.max(hi, base + d);
      });
      spans.push({ sec: sec, lo: lo, hi: hi });
    });
    spans.forEach(function (w) { while (w.lo < 0) { w.lo += TAU; w.hi += TAU; } });
    spans.sort(function (a, b) { return a.lo - b.lo; });
    spans.forEach(function (w, i) {
      var next = spans[(i + 1) % spans.length];
      var nlo = next.lo + (i === spans.length - 1 ? TAU : 0);
      var mid = (w.hi + nlo) / 2;
      w.end = mid; next.start = mid - (i === spans.length - 1 ? TAU : 0);
    });
    wedges = spans;
  })();

  /* each power's territory: the run of neighboring wedges it holds,
     joined up round the rim. Where one run ends and the next begins is
     the frontier. Each crest goes where its territory has the most open
     space, so it lies on the plane between the systems, not under them. */
  var realms = [];
  (function () {
    wedges.forEach(function (w) {
      var f = w.sec.list[0].faction, last = realms[realms.length - 1];
      if (last && last.f === f) last.end = w.end;
      else realms.push({ f: f, start: w.start, end: w.end });
    });
    if (realms.length > 1 && realms[0].f === realms[realms.length - 1].f) {
      var tail = realms.pop();
      realms[0].start = tail.start - TAU;
    }
    realms.forEach(function (rm) {
      var best = null, span = rm.end - rm.start;
      for (var k = 2; k <= 14; k++) {
        var a = rm.start + span * k / 16;
        for (var r = 0.4; r <= 0.76; r += 0.04) {
          var x = Math.cos(a) * r, y = Math.sin(a) * r, clear = Infinity;
          systems.forEach(function (s) { clear = Math.min(clear, Math.hypot(s.x - x, s.y - y)); });
          // the crest must not hang across the frontier either
          clear = Math.min(clear, r * Math.sin(Math.min(a - rm.start, rm.end - a)) * 1.15);
          var score = clear - Math.abs(k - 8) * 0.004;
          if (!best || score > best.score) best = { score: score, x: x, y: y, clear: clear };
        }
      }
      rm.cx = best.x; rm.cy = best.y; rm.size = clamp(best.clear * 0.95, 0.14, 0.26);
    });
  })();

  // the lanes: every system hangs off the nearest system further in on its
  // own sector, or off the core when it is the first one out
  var CORE = systems.filter(function (s) { return s.core; })[0];
  systems.forEach(function (s) {
    if (s.core) return;
    var best = CORE, bd = Infinity;
    s.sector.list.forEach(function (o) {
      if (o === s || o.r >= s.r) return;
      var d = Math.hypot(o.x - s.x, o.y - s.y);
      if (d < bd) { bd = d; best = o; }
    });
    s.from = best;
  });
  // where the war room itself is on the map: the near rim, by the table's edge
  var HERE = { x: 0, y: 1.02 };

  /* ───────────── the stage ───────────── */
  var stage = $('elStage'), cv = $('elHolo'), pinsBox = $('elPins'), tagsBox = $('elTags');
  var ctx = cv && cv.getContext && cv.getContext('2d');
  if (!stage || !ctx) return;

  var W = 0, H = 0, dpr = 1, compact = false;
  // the camera: e is how far above the table you stand (90 is straight
  // down), F how far back, as multiples of the table's radius R
  var cam = { e: 44 * DEG, F: 3.4, yaw: 0, R: 300, ox: 0, oy: 0, se: 0, ce: 1, sy: 0, cy: 1 };
  var PX = 0, PY = 0, PK = 1;
  function proj(x, y, z) {
    var x1 = x * cam.cy - y * cam.sy, y1 = x * cam.sy + y * cam.cy;
    var d = y1 * cam.ce + z * cam.se;
    PK = cam.F / (cam.F - d);
    PX = cam.ox + x1 * PK * cam.R;
    PY = cam.oy + (y1 * cam.se - z * cam.ce) * PK * cam.R;
  }
  function setYaw(a) { cam.yaw = a; cam.sy = Math.sin(a); cam.cy = Math.cos(a); }
  function setTilt(e) { cam.e = e; cam.se = Math.sin(e); cam.ce = Math.cos(e); }

  var TABLE_Z = -0.3, BODY_Z = -0.52;

  /* ───────────── the galaxy's dust ───────────── */
  // A four-armed spiral, seeded so it is the same galaxy on every visit.
  var dust = [], haze = [];
  function seeded(seed) { return function () { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }; }
  function makeDust(n) {
    var rnd = seeded(1977), gauss = function () { return (rnd() + rnd() + rnd() - 1.5) / 1.5; };
    dust = []; haze = [];
    for (var i = 0; i < n; i++) {
      var scatter = rnd() < 0.14;
      var r = 0.04 + Math.pow(rnd(), 0.8) * 0.96;
      var a = scatter ? rnd() * TAU : (i % 4) * (TAU / 4) + Math.log(r / 0.04) * 1.55 + gauss() * (0.2 + r * 0.2);
      var warm = r < 0.26 && rnd() < 0.6;
      dust.push({ r: r, a: a, z: gauss() * 0.012, s: 0.8 + rnd() * 1.3, al: 0.25 + rnd() * 0.55 * (1.15 - r * 0.5), warm: warm });
    }
    // the glow the arms make: soft dots along the same spiral, much fainter
    for (i = 0; i < n / 6; i++) {
      r = 0.06 + Math.pow(rnd(), 0.9) * 0.9;
      a = (i % 4) * (TAU / 4) + Math.log(r / 0.04) * 1.55 + gauss() * 0.2;
      haze.push({ r: r, a: a, s: 14 + rnd() * 18, al: 0.05 + rnd() * 0.07 * (1.2 - r) });
    }
  }
  // one soft dot, drawn once, stamped for every bit of haze
  var puff = document.createElement('canvas');
  puff.width = puff.height = 32;
  (function () {
    var p = puff.getContext('2d'), g = p.createRadialGradient(16, 16, 0, 16, 16, 16);
    g.addColorStop(0, 'rgba(140,190,245,1)'); g.addColorStop(1, 'rgba(140,190,245,0)');
    p.fillStyle = g; p.fillRect(0, 0, 32, 32);
  })();

  /* ───────────── buttons over the canvas ───────────── */
  systems.forEach(function (s) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'el-pin' + (s.core ? ' el-pin--core' : '');
    b.style.setProperty('--c', s.sector.c);
    b.setAttribute('aria-pressed', 'false');
    b.setAttribute('aria-label', s.name + ', ' + (s.world ? s.world + ': ' : '') + s.sub + ', ' + s.faction.full + ', grid ' + s.grid);
    b.tabIndex = s.core ? 0 : -1;
    var n = document.createElement('b'); n.textContent = s.name;
    var g = document.createElement('i'); g.textContent = s.grid;
    b.appendChild(n); b.appendChild(g);
    pinsBox.appendChild(b);
    s.pin = b;
  });
  var tags = wedges.map(function (w) {
    var t = document.createElement('span');
    t.className = 'el-tag';
    t.style.setProperty('--c', w.sec.c);
    t.textContent = w.sec.name;
    tagsBox.appendChild(t);
    return { el: t, w: w, ang: (w.start + w.end) / 2 };
  });
  var hereTag = document.createElement('span');
  hereTag.className = 'el-tag el-tag--here';
  hereTag.style.setProperty('--c', '#f5c63c');
  hereTag.textContent = 'You are here';
  tagsBox.appendChild(hereTag);

  /* ───────────── fitting the table to the stage ───────────── */
  var labels = [];
  function fit() {
    var r = stage.getBoundingClientRect();
    W = Math.round(r.width); H = Math.round(r.height);
    if (!W || !H) return;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    compact = W < 720;
    pinsBox.classList.toggle('is-compact', compact);
    var mid = !compact && W < 1000;
    pinsBox.classList.toggle('is-mid', mid);
    // a phone looks from higher up, so the table fits the width and the
    // systems spread further apart down the screen
    setTilt((compact ? 62 : 44) * DEG); cam.F = compact ? 3.8 : 3.4;
    setYaw(0);
    if (!dust.length || (compact && dust.length > 1600) || (!compact && dust.length < 1600)) makeDust(compact ? 1300 : 2800);

    // the outline of everything at R = 1, then scaled into the stage
    cam.R = 1; cam.ox = 0; cam.oy = 0;
    var minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    function take() { minX = Math.min(minX, PX); maxX = Math.max(maxX, PX); minY = Math.min(minY, PY); maxY = Math.max(maxY, PY); }
    for (var k = 0; k < 48; k++) {
      var a = k / 48 * TAU, c = Math.cos(a), s = Math.sin(a);
      proj(c * 1.16, s * 1.16, TABLE_Z); take();
      proj(c * 1.12, s * 1.12, 0); take();
      if (s > 0) { proj(c * 1.1, s * 1.1, BODY_Z); take(); }
    }
    systems.forEach(function (s) { proj(s.x, s.y, s.h); take(); });
    var side = compact ? 6 : mid ? 118 : 140;
    var top = 30, bottom = compact ? 4 : 14;
    var R = Math.min((W - side * 2) / (maxX - minX), (H - top - bottom) / (maxY - minY));
    if (!compact) R = Math.min(R, 560);
    cam.R = R;
    cam.ox = W / 2 - (minX + maxX) / 2 * R;
    cam.oy = top + (H - top - bottom - (maxY - minY) * R) / 2 - minY * R;
    paintTable();
    layoutLabels();
  }

  // The table is drawn once per size onto a layer of its own and stamped
  // under every frame. It never needs more: the hologram sways, the
  // furniture under it does not, and the table's fills are the largest
  // thing on the canvas.
  var tableLayer = document.createElement('canvas');
  function paintTable() {
    tableLayer.width = cv.width; tableLayer.height = cv.height;
    var keep = ctx, yaw = cam.yaw;
    ctx = tableLayer.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    setYaw(0);
    drawTable();
    ctx = keep; setYaw(yaw);
  }

  // Place each label beside its planet. Every label tries both sides of
  // its planet and a ladder of heights, and takes the cheapest spot that
  // hits nothing already placed; the outermost go first, because the rim
  // leaves them the fewest choices. Done once per size, at rest, and kept
  // as offsets, so a label rides along with its planet when the table sways.
  function layoutLabels() {
    var gap = compact ? 8 : 13, M = 6;
    var fixed = [];
    // the planets themselves, so no label sits on top of one
    systems.forEach(function (s) {
      proj(s.x, s.y, s.h);
      fixed.push({ x: PX - 8, y: PY - 8, w: 16, h: 16, own: s, tight: true });
    });
    // "you are here", beside its triangle on the near rim
    proj(HERE.x, HERE.y, 0);
    var hw = hereTag.offsetWidth, hh = hereTag.offsetHeight;
    var hx = clamp(PX + 12, 4, W - hw - 4), hy = clamp(PY + 6, 2, H - hh - 2);
    hereTag.style.transform = 'translate(' + Math.round(hx) + 'px,' + Math.round(hy) + 'px)';
    fixed.push({ x: hx, y: hy, w: hw, h: hh });

    function area(r, list, own) {
      var n = 0;
      for (var i = 0; i < list.length; i++) {
        var o = list[i], m = o.tight ? 1 : M;
        if (own && o.own === own) continue;
        var ox = Math.min(r.x + r.w, o.x + o.w + m) - Math.max(r.x, o.x - m), oy = Math.min(r.y + r.h, o.y + o.h + m) - Math.max(r.y, o.y - m);
        // covering another label is the worst thing; grazing a planet's
        // glow matters less than sending a name far from its own planet
        if (ox > 0 && oy > 0) n += ox * oy * (o.tight ? 0.25 : 1);
      }
      return n;
    }

    labels = systems.map(function (s) {
      proj(s.x, s.y, s.h);
      s.sx = PX; s.sy = PY;   // where it sits at rest, until the first frame says otherwise
      // labels point away from the core, unless the chart says otherwise
      var left = compact ? s.x > 0.3 : s.side ? s.side === 'l' : (s.x < -0.02 && !s.core);
      return { s: s, w: s.pin.offsetWidth, h: s.pin.offsetHeight, left: left, px: PX, py: PY, dy: 0 };
    });
    var placed = [];
    var order = labels.slice().sort(function (p, q) { return q.s.r - p.s.r; });
    var STEPS = [0];
    for (var st = 1; st <= 9; st++) STEPS.push(-st * 0.35, st * 0.35);
    order.forEach(function (l) {
      var best = null;
      [l.left, !l.left].forEach(function (left, flip) {
        [gap, gap + 28].forEach(function (g, far) {
          STEPS.forEach(function (k) {
            var dy = k * l.h;
            var r = { x: left ? l.px - g - l.w : l.px + g, y: l.py - l.h / 2 + dy, w: l.w, h: l.h };
            if (r.x < 2 || r.x + r.w > W - 2 || r.y < 2 || r.y + r.h > H - 2) return;
            var cost = (area(r, placed) + area(r, fixed, l.s)) * 10 + Math.abs(dy) * 1.6 + flip * 26 + far * 18;
            if (!best || cost < best.cost) best = { cost: cost, r: r, left: left, dy: dy, g: g };
          });
        });
      });
      if (!best) best = { r: { x: l.px + gap, y: l.py - l.h / 2, w: l.w, h: l.h }, left: false, dy: 0, g: gap };
      l.left = best.left; l.dy = best.dy; l.g = best.g;
      best.r.own = l.s;
      placed.push(best.r);
    });

    // The sector names, just outside the rim. Each tries points along its
    // own arc and takes the one covering the fewest labels and planets, so
    // a name never lands on a system it is naming.
    var taken = placed.concat(fixed);
    tags.forEach(function (t) {
      var w = t.el.offsetWidth, h = t.el.offsetHeight, best = null;
      for (var k = 0; k <= 12; k++) {
        var ang = t.w.start + 0.06 + (t.w.end - t.w.start - 0.12) * k / 12;
        [1.16, 1.23, 1.3].forEach(function (rr) {
          proj(Math.cos(ang) * rr, Math.sin(ang) * rr, 0);
          var r = { x: clamp(PX - w / 2, 4, W - w - 4), y: clamp(PY - h / 2, 2, H - h - 2), w: w, h: h };
          // scored with a margin round it, so a name does not sit flush against a label either
          var pad = { x: r.x - 10, y: r.y - 5, w: w + 20, h: h + 10 };
          var score = area(pad, taken) + Math.abs(k - 6) * 3 + (rr - 1.16) * 120;
          if (!best || score < best.score) best = { score: score, r: r };
        });
      }
      t.el.style.transform = 'translate(' + Math.round(best.r.x) + 'px,' + Math.round(best.r.y) + 'px)';
      taken.push(best.r);
    });

    labels.forEach(function (l) {
      l.ox = l.left ? -l.g - l.w : l.g;
      l.oy = -l.h / 2 + l.dy;
      l.s.pin.classList.toggle('is-l', l.left);
      l.s.label = l;
    });
    placePins(true);
  }

  function placePins(force) {
    labels.forEach(function (l) {
      var s = l.s;
      var x = Math.round(s.sx + l.ox), y = Math.round(s.sy + l.oy);
      if (!force && x === l.lx && y === l.ly) return;
      l.lx = x; l.ly = y;
      s.pin.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0)';
    });
  }

  /* ───────────── drawing ───────────── */
  var t0 = performance.now(), introT = reduced ? 1 : 0, sel = null, hot = null;
  var swayT = 0, still = false, flickerTill = 0, nextFlicker = 4000;

  function ring(r, z, n) {
    ctx.beginPath();
    for (var k = 0; k <= n; k++) {
      var a = k / n * TAU;
      proj(Math.cos(a) * r, Math.sin(a) * r, z);
      if (k) ctx.lineTo(PX, PY); else ctx.moveTo(PX, PY);
    }
  }
  function arc(r, z, a0, a1, n) {
    ctx.beginPath();
    for (var k = 0; k <= n; k++) {
      var a = a0 + (a1 - a0) * k / n;
      proj(Math.cos(a) * r, Math.sin(a) * r, z);
      if (k) ctx.lineTo(PX, PY); else ctx.moveTo(PX, PY);
    }
  }
  function line(x0, y0, z0, x1, y1, z1) {
    proj(x0, y0, z0); ctx.moveTo(PX, PY);
    proj(x1, y1, z1); ctx.lineTo(PX, PY);
  }

  // the table: a dark round top, a ring of emitters, its near side and its
  // status lights. Drawn first and opaque; the hologram is added on top.
  function drawTable() {
    var u = cam.R / 400, a, k, g;
    // its shadow on the floor
    proj(0, 0.1, BODY_Z - 0.1);
    g = ctx.createRadialGradient(PX, PY, 0, PX, PY, cam.R * 1.4);
    g.addColorStop(0, 'rgba(0,0,0,0.55)'); g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g; ctx.fillRect(PX - cam.R * 1.4, PY - cam.R * 0.7, cam.R * 2.8, cam.R * 1.4);

    // the near side of the body, from the rim down, lit from above by the
    // projection: brighter at the top edge, falling away into the dark
    ctx.beginPath();
    for (k = 0; k <= 40; k++) { a = k / 40 * Math.PI - cam.yaw; proj(Math.cos(a) * 1.16, Math.sin(a) * 1.16, TABLE_Z); if (k) ctx.lineTo(PX, PY); else ctx.moveTo(PX, PY); }
    for (k = 40; k >= 0; k--) { a = k / 40 * Math.PI - cam.yaw; proj(Math.cos(a) * 1.1, Math.sin(a) * 1.1, BODY_Z); ctx.lineTo(PX, PY); }
    proj(0, 1.16, TABLE_Z); var topY = PY; proj(0, 1.1, BODY_Z);
    g = ctx.createLinearGradient(0, topY, 0, PY);
    g.addColorStop(0, '#16233b'); g.addColorStop(0.35, '#0b1426'); g.addColorStop(1, '#04070e');
    ctx.fillStyle = g; ctx.fill();
    // the seams round the body and the status lights in them
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(95,163,236,0.16)';
    arc(1.15, -0.37, -cam.yaw, Math.PI - cam.yaw, 40); ctx.stroke();
    ctx.strokeStyle = 'rgba(95,163,236,0.09)';
    arc(1.13, -0.46, -cam.yaw, Math.PI - cam.yaw, 40); ctx.stroke();
    for (k = 1; k < 24; k++) {
      a = k / 24 * Math.PI - cam.yaw;
      proj(Math.cos(a) * 1.143, Math.sin(a) * 1.143, -0.415);
      var face = Math.sin(k / 24 * Math.PI);
      if (face < 0.3) continue;
      ctx.fillStyle = k % 7 === 0 ? 'rgba(63,213,137,0.9)' : k % 5 === 0 ? 'rgba(245,198,60,0.85)' : 'rgba(109,139,255,0.6)';
      ctx.fillRect(PX - 4 * u * face, PY - 1.2, 8 * u * face, 2.4);
    }

    // the top: a metal band round a dark glass bed
    ring(1.16, TABLE_Z, 90);
    proj(0, -1.16, TABLE_Z); var farY = PY; proj(0, 1.16, TABLE_Z);
    g = ctx.createLinearGradient(0, farY, 0, PY);
    g.addColorStop(0, '#0a1220'); g.addColorStop(1, '#1a2842');
    ctx.fillStyle = g; ctx.fill();
    ring(0.99, TABLE_Z, 90);
    proj(0, 0, TABLE_Z);
    g = ctx.createRadialGradient(PX, PY, 0, PX, PY, cam.R);
    g.addColorStop(0, '#0d1d3c'); g.addColorStop(1, '#050a15');
    ctx.fillStyle = g; ctx.fill();
    ctx.strokeStyle = 'rgba(95,163,236,0.3)'; ctx.lineWidth = 1; ctx.stroke();
    // the rim catches the light on the side nearest you
    ctx.lineWidth = 1.4;
    ctx.strokeStyle = 'rgba(109,139,255,0.75)';
    arc(1.16, TABLE_Z, 0.1 - cam.yaw, Math.PI - 0.1 - cam.yaw, 50); ctx.stroke();
    ctx.strokeStyle = 'rgba(109,139,255,0.3)';
    arc(1.16, TABLE_Z, Math.PI - cam.yaw, TAU - cam.yaw, 50); ctx.stroke();
    // the projector bed, glowing Trabuco blue where the light comes up
    ring(0.99, TABLE_Z, 90);
    proj(0, 0, TABLE_Z);
    g = ctx.createRadialGradient(PX, PY, 0, PX, PY, cam.R);
    g.addColorStop(0, 'rgba(58,95,217,0.32)'); g.addColorStop(0.6, 'rgba(58,95,217,0.1)'); g.addColorStop(1, 'rgba(58,95,217,0.02)');
    ctx.fillStyle = g; ctx.fill();
    // the emitter ring: short lenses all the way round, gold and green among the blue
    ctx.lineWidth = Math.max(1.6, 2.6 * u);
    for (k = 0; k < 96; k++) {
      a = k / 96 * TAU;
      ctx.strokeStyle = k % 16 === 0 ? 'rgba(245,198,60,0.95)' : k % 12 === 6 ? 'rgba(63,213,137,0.95)' : 'rgba(109,139,255,0.75)';
      ctx.beginPath(); line(Math.cos(a - 0.014) * 1.075, Math.sin(a - 0.014) * 1.075, TABLE_Z, Math.cos(a + 0.014) * 1.075, Math.sin(a + 0.014) * 1.075, TABLE_Z); ctx.stroke();
    }
  }

  function drawHolo(now, lift, alpha) {
    var u = cam.R / 400, Z = lift;
    ctx.globalAlpha = alpha;

    // the light coming up off the emitters to the projection
    proj(0, 0, TABLE_Z); var yb = PY; proj(0, 0, Z); var yt = PY;
    var g = ctx.createLinearGradient(0, yb + cam.R * 0.4, 0, yt - cam.R * 0.2);
    g.addColorStop(0, 'rgba(95,163,236,0.1)'); g.addColorStop(1, 'rgba(95,163,236,0)');
    ctx.strokeStyle = g; ctx.lineWidth = 1;
    ctx.beginPath();
    for (var k = 0; k < 64; k++) {
      var a = k / 64 * TAU, c = Math.cos(a), s = Math.sin(a);
      line(c * 1.075, s * 1.075, TABLE_Z, c * 1.04, s * 1.04, Z);
    }
    ctx.stroke();

    // the projected disc
    ring(1.04, Z, 90);
    proj(0, 0, Z);
    g = ctx.createRadialGradient(PX, PY, 0, PX, PY, cam.R * 1.1);
    g.addColorStop(0, 'rgba(95,163,236,0.16)'); g.addColorStop(0.7, 'rgba(95,163,236,0.05)'); g.addColorStop(1, 'rgba(95,163,236,0.09)');
    ctx.fillStyle = g; ctx.fill();

    // the sector grid
    ctx.strokeStyle = 'rgba(95,163,236,0.075)'; ctx.lineWidth = 1;
    ctx.beginPath();
    for (k = -9; k <= 9; k++) {
      var v = k / 10, h = Math.sqrt(1 - v * v);
      line(v, -h, Z, v, h, Z); line(-h, v, Z, h, v, Z);
    }
    ctx.stroke();

    // the powers' territories, each tinted toward its rim in its color
    if (realms.length > 1) realms.forEach(function (rm) {
      var mine = sel && sel.faction === rm.f;
      ctx.beginPath(); proj(0, 0, Z); ctx.moveTo(PX, PY);
      for (var q = 0; q <= 40; q++) { var qa = rm.start + (rm.end - rm.start) * q / 40; proj(Math.cos(qa), Math.sin(qa), Z); ctx.lineTo(PX, PY); }
      ctx.closePath();
      proj(0, 0, Z);
      var tg = ctx.createRadialGradient(PX, PY, cam.R * 0.15, PX, PY, cam.R * 1.05);
      tg.addColorStop(0, 'rgba(' + rm.f.rgb + ',0)');
      tg.addColorStop(1, 'rgba(' + rm.f.rgb + ',' + (mine ? 0.15 : 0.085) + ')');
      ctx.fillStyle = tg; ctx.fill();
    });

    // range rings, then the rim with its degree ticks
    ctx.strokeStyle = 'rgba(95,163,236,0.2)';
    ctx.setLineDash([2, 5]);
    ring(0.25, Z, 40); ctx.stroke(); ring(0.5, Z, 60); ctx.stroke(); ring(0.75, Z, 72); ctx.stroke();
    ctx.setLineDash([]);
    ctx.strokeStyle = 'rgba(95,163,236,0.55)'; ctx.lineWidth = 1.3;
    ring(1, Z, 120); ctx.stroke();
    ctx.lineWidth = 1; ctx.strokeStyle = 'rgba(95,163,236,0.38)';
    ctx.beginPath();
    for (k = 0; k < 72; k++) {
      a = k / 72 * TAU; var len = k % 6 === 0 ? 1.055 : 1.025;
      line(Math.cos(a), Math.sin(a), Z, Math.cos(a) * len, Math.sin(a) * len, Z);
    }
    ctx.stroke();

    // the wedges: a faint bound between sectors, a bright arc for each
    ctx.strokeStyle = 'rgba(95,163,236,0.24)'; ctx.setLineDash([3, 6]);
    ctx.beginPath();
    wedges.forEach(function (w) { line(Math.cos(w.start) * 0.16, Math.sin(w.start) * 0.16, Z, Math.cos(w.start) * 1.0, Math.sin(w.start) * 1.0, Z); });
    ctx.stroke(); ctx.setLineDash([]);
    ctx.lineWidth = Math.max(1.6, 2.4 * u);
    wedges.forEach(function (w) {
      ctx.strokeStyle = 'rgba(' + w.sec.rgb + ',' + (sel && sel.sector === w.sec ? 0.95 : 0.6) + ')';
      arc(1.085, Z, w.start + 0.025, w.end - 0.025, 30); ctx.stroke();
    });

    // the powers: a heavier band outside the sectors' arcs, and between
    // them the frontier, a bright seam with each side's color along it
    if (realms.length > 1) {
      ctx.lineWidth = Math.max(2.4, 4 * u);
      realms.forEach(function (rm) {
        ctx.strokeStyle = 'rgba(' + rm.f.rgb + ',' + (sel && sel.faction === rm.f ? 0.95 : 0.7) + ')';
        arc(1.13, Z, rm.start + 0.03, rm.end - 0.03, 60); ctx.stroke();
      });
      realms.forEach(function (rm, i) {
        var prev = realms[(i + realms.length - 1) % realms.length];
        var ux = Math.cos(rm.start), uy = Math.sin(rm.start), nx = -uy * 0.012, ny = ux * 0.012;
        ctx.lineWidth = 7 * u; ctx.strokeStyle = 'rgba(255,236,200,0.07)';
        ctx.beginPath(); line(ux * 0.1, uy * 0.1, Z, ux * 1.16, uy * 1.16, Z); ctx.stroke();
        ctx.lineWidth = 1.3;
        [[rm.f, 1], [prev.f, -1]].forEach(function (side) {
          ctx.strokeStyle = 'rgba(' + side[0].rgb + ',0.85)';
          ctx.beginPath(); line(ux * 0.1 + nx * side[1], uy * 0.1 + ny * side[1], Z, ux * 1.16 + nx * side[1], uy * 1.16 + ny * side[1], Z); ctx.stroke();
        });
        // and a pulse running out along it, the border being patrolled
        var run = reduced ? 0.6 : ((now - t0) / 3200 + i * 0.5) % 1, pr = 0.1 + run * 1.06;
        proj(ux * pr, uy * pr, Z);
        var pg = ctx.createRadialGradient(PX, PY, 0, PX, PY, 9 * Math.max(0.8, u));
        pg.addColorStop(0, 'rgba(255,236,190,0.8)'); pg.addColorStop(1, 'rgba(245,198,60,0)');
        ctx.fillStyle = pg; ctx.fillRect(PX - 10 * u - 2, PY - 10 * u - 2, 20 * u + 4, 20 * u + 4);
      });
    }

    // the galaxy, turning once every five minutes
    var spin = reduced ? 0 : (now - t0) / 300000 * TAU;
    for (k = 0; k < haze.length; k++) {
      var hz = haze[k], ha = hz.a + spin;
      proj(Math.cos(ha) * hz.r, Math.sin(ha) * hz.r, Z);
      var hs = hz.s * PK * u;
      ctx.globalAlpha = alpha * hz.al;
      ctx.drawImage(puff, PX - hs / 2, PY - hs * cam.se / 2, hs, hs * cam.se);
    }
    var cold = 'rgb(140,190,245)', warm = 'rgb(255,222,150)';
    for (var pass = 0; pass < 2; pass++) {
      ctx.fillStyle = pass ? warm : cold;
      for (k = 0; k < dust.length; k++) {
        var d = dust[k];
        if (d.warm !== !!pass) continue;
        var da = d.a + spin;
        proj(Math.cos(da) * d.r, Math.sin(da) * d.r, d.z + Z);
        ctx.globalAlpha = alpha * d.al;
        var sz = d.s * PK * Math.max(0.8, u);
        ctx.fillRect(PX, PY, sz, sz);
      }
    }
    ctx.globalAlpha = alpha;
    proj(0, 0, Z);
    g = ctx.createRadialGradient(PX, PY, 0, PX, PY, cam.R * 0.3);
    g.addColorStop(0, 'rgba(255,236,190,0.5)'); g.addColorStop(0.35, 'rgba(245,198,60,0.14)'); g.addColorStop(1, 'rgba(245,198,60,0)');
    ctx.fillStyle = g; ctx.fillRect(PX - cam.R * 0.3, PY - cam.R * 0.3, cam.R * 0.6, cam.R * 0.6);

    // the crests, laid flat on the plane in the middle of each territory.
    // A crest is small next to the camera's distance, so the projection
    // across it is taken as flat: its center and two unit steps, one along
    // each of the table's axes, make the transform its path is filled with.
    realms.forEach(function (rm) {
      if (!rm.f.crest) return;
      proj(rm.cx, rm.cy, Z); var ox = PX, oy = PY;
      proj(rm.cx + rm.size, rm.cy, Z); var ax = PX - ox, ay = PY - oy;
      proj(rm.cx, rm.cy + rm.size, Z); var bx = PX - ox, by = PY - oy;
      var mine = sel && sel.faction === rm.f;
      ctx.save();
      ctx.transform(ax / 50, ay / 50, bx / 50, by / 50, ox, oy);
      ctx.fillStyle = 'rgba(' + rm.f.rgb + ',' + (mine ? 0.24 : 0.12) + ')';
      ctx.fill(rm.f.crest);
      ctx.lineWidth = 50 / Math.max(1, Math.hypot(ax, ay));
      ctx.strokeStyle = 'rgba(' + rm.f.rgb + ',' + (mine ? 0.6 : 0.3) + ')';
      ctx.stroke(rm.f.crest);
      ctx.restore();
    });

    // the sweep: one turn every seven seconds, lighting each system as it passes
    var sweep = reduced ? -0.9 : ((now - t0) / 7000 * TAU) % TAU;
    for (k = 0; k < 8; k++) {
      var a0 = sweep - 0.72 + k * 0.09;
      ctx.beginPath(); proj(0, 0, Z); ctx.moveTo(PX, PY);
      proj(Math.cos(a0), Math.sin(a0), Z); ctx.lineTo(PX, PY);
      proj(Math.cos(a0 + 0.045), Math.sin(a0 + 0.045), Z); ctx.lineTo(PX, PY);
      proj(Math.cos(a0 + 0.09), Math.sin(a0 + 0.09), Z); ctx.lineTo(PX, PY);
      ctx.closePath();
      ctx.fillStyle = 'rgba(95,163,236,' + (0.012 + k * 0.016).toFixed(3) + ')';
      ctx.fill();
    }
    ctx.strokeStyle = 'rgba(207,230,255,0.55)'; ctx.lineWidth = 1;
    ctx.beginPath(); line(0, 0, Z, Math.cos(sweep), Math.sin(sweep), Z); ctx.stroke();
    if (!reduced) systems.forEach(function (s) {
      if (s.core) return;
      var diff = (sweep - s.ang) % TAU; if (diff < 0) diff += TAU;
      if (diff < 0.08) s.ping = 1;
    });

    // the lanes
    ctx.setLineDash([3, 5]); ctx.lineWidth = 1;
    systems.forEach(function (s) {
      if (s.core) return;
      ctx.strokeStyle = 'rgba(' + s.sector.rgb + ',' + (sel === s || hot === s ? 0.6 : 0.24) + ')';
      ctx.beginPath(); line(s.from.x, s.from.y, Z, s.x, s.y, Z); ctx.stroke();
    });
    ctx.setLineDash([]);

    // the course to the locked target, plotted from the war room
    if (sel) {
      ctx.strokeStyle = 'rgba(245,198,60,0.85)'; ctx.lineWidth = Math.max(1.3, 1.8 * u);
      ctx.setLineDash([7, 6]); ctx.lineDashOffset = reduced ? 0 : -(now - t0) / 40;
      ctx.beginPath(); line(HERE.x, HERE.y, Z, sel.x, sel.y, Z); ctx.stroke();
      ctx.setLineDash([]); ctx.lineDashOffset = 0;
      var f = reduced ? 0.5 : ((now - t0) / 1800) % 1;
      proj(HERE.x + (sel.x - HERE.x) * f, HERE.y + (sel.y - HERE.y) * f, Z);
      ctx.fillStyle = '#ffe08a'; ctx.beginPath(); ctx.arc(PX, PY, 2.6 * Math.max(0.8, u), 0, TAU); ctx.fill();
    }
    // you are here: a gold triangle on the near rim
    proj(HERE.x, HERE.y, Z);
    ctx.fillStyle = 'rgba(245,198,60,0.95)';
    ctx.beginPath(); ctx.moveTo(PX, PY - 6); ctx.lineTo(PX + 5, PY + 3); ctx.lineTo(PX - 5, PY + 3); ctx.closePath(); ctx.fill();

    // the systems: a footprint on the plane, a stem, and the planet over it
    systems.forEach(function (s) {
      proj(s.x, s.y, Z); var fx = PX, fy = PY, fk = PK;
      proj(s.x, s.y, s.h + Z); s.sx = PX; s.sy = PY;
      var col = s.sector.rgb, on = sel === s, lit = on || hot === s;
      ctx.strokeStyle = 'rgba(' + col + ',' + (lit ? 0.75 : 0.4) + ')'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.ellipse(fx, fy, 0.024 * cam.R * fk, 0.024 * cam.R * fk * cam.se, 0, 0, TAU); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(fx, fy); ctx.lineTo(PX, PY); ctx.stroke();
      if (on) col = '245,198,60';
      var glow = (s.core ? 30 : 15) * PK * clamp(u, 0.55, 1.25) * (1 + s.ping * 0.7 + (lit ? 0.35 : 0));
      g = ctx.createRadialGradient(PX, PY, 0, PX, PY, glow);
      g.addColorStop(0, 'rgba(' + col + ',' + (0.55 + s.ping * 0.35) + ')'); g.addColorStop(1, 'rgba(' + col + ',0)');
      ctx.fillStyle = g; ctx.fillRect(PX - glow, PY - glow, glow * 2, glow * 2);
      var dot = (s.core ? 4.6 : 3) * PK * clamp(u, 0.7, 1.2);
      ctx.fillStyle = s.core ? '#fff6dc' : 'rgba(' + col + ',1)';
      ctx.beginPath();
      if (s.station) { ctx.moveTo(PX, PY - dot * 1.4); ctx.lineTo(PX + dot * 1.4, PY); ctx.lineTo(PX, PY + dot * 1.4); ctx.lineTo(PX - dot * 1.4, PY); ctx.closePath(); }
      else ctx.arc(PX, PY, dot, 0, TAU);
      ctx.fill();
      if (!reduced) s.ping *= 0.94;

      // the callout to its label
      var l = s.label;
      if (l) {
        var lx = l.left ? PX + l.ox + l.w : PX + l.ox, ly = PY + l.oy + l.h / 2;
        ctx.strokeStyle = 'rgba(' + col + ',' + (lit ? 0.8 : 0.42) + ')';
        ctx.beginPath(); ctx.moveTo(PX + (l.left ? -dot - 2 : dot + 2), PY); ctx.lineTo(lx, ly); ctx.stroke();
      }
    });

    // the core's own ring, turning
    if (CORE) {
      proj(0, 0, CORE.h + Z);
      ctx.strokeStyle = 'rgba(245,198,60,0.55)'; ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]); ctx.lineDashOffset = reduced ? 0 : (now - t0) / 60;
      ctx.beginPath(); ctx.ellipse(PX, PY, 0.07 * cam.R * PK, 0.07 * cam.R * PK * cam.se, 0, 0, TAU); ctx.stroke();
      ctx.setLineDash([]); ctx.lineDashOffset = 0;
    }

    // tracking: a thin ring on whatever you point at; the lock: gold
    // brackets turning round the target and a beam down to the table
    if (hot && hot !== sel) {
      ctx.strokeStyle = 'rgba(207,230,255,0.75)'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(hot.sx, hot.sy, 13 * clamp(u, 0.8, 1.2), 0, TAU); ctx.stroke();
    }
    if (sel) {
      var R0 = 19 * clamp(u, 0.8, 1.2), rot = reduced ? 0.4 : (now - t0) / 1400;
      ctx.strokeStyle = '#f5c63c'; ctx.lineWidth = 2;
      for (k = 0; k < 4; k++) {
        var q = rot + k * Math.PI / 2;
        ctx.beginPath(); ctx.arc(sel.sx, sel.sy, R0, q - 0.32, q + 0.32); ctx.stroke();
      }
      proj(sel.x, sel.y, TABLE_Z);
      g = ctx.createLinearGradient(0, PY, 0, sel.sy);
      g.addColorStop(0, 'rgba(245,198,60,0)'); g.addColorStop(1, 'rgba(245,198,60,0.6)');
      ctx.strokeStyle = g; ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.moveTo(PX, PY); ctx.lineTo(sel.sx, sel.sy + R0); ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  function draw(now) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'source-over';
    ctx.drawImage(tableLayer, 0, 0, W, H);
    // the hologram rises off the table as it comes on, flickering
    var p = ease(introT);
    var lift = TABLE_Z * (1 - p);
    var alpha = introT < 1 ? p * (introT < 0.6 && Math.random() < 0.25 ? 0.45 : 1) : 1;
    if (now < flickerTill) alpha *= 0.72;
    ctx.globalCompositeOperation = 'lighter';
    drawHolo(now, lift, alpha);
    ctx.globalCompositeOperation = 'source-over';
  }

  /* ───────────── the loop ───────────── */
  var raf = 0, last = 0, onScreen = true, pointerIn = false, pending = 0;
  function frame(now) {
    raf = 0;
    var dt = last ? Math.min(now - last, 64) : 16; last = now;
    if (!reduced) {
      if (introT < 1) {
        introT = Math.min(1, introT + dt / 1100);
        if (introT > 0.55) { pinsBox.classList.add('is-up'); tagsBox.classList.add('is-up'); }
      }
      // a slow sway, so the heights read as heights; it holds still
      // while you are pointing at the table, so nothing moves under you
      if (!pointerIn && !still) swayT += dt;
      setYaw(Math.sin(swayT / 46000 * TAU) * 4.5 * DEG);
      if (now > nextFlicker) { flickerTill = now + 70 + Math.random() * 60; nextFlicker = now + 5000 + Math.random() * 7000; }
    }
    draw(now);
    placePins(false);
    if (!reduced && onScreen && !document.hidden) raf = requestAnimationFrame(frame);
  }
  function start() { if (!raf) { last = 0; raf = requestAnimationFrame(frame); } }
  // with reduced motion nothing runs; a change asks for one more frame
  function redraw() { if (reduced) { if (!pending) pending = requestAnimationFrame(function () { pending = 0; frame(performance.now()); }); } else start(); }

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es) { onScreen = es[0].isIntersecting; if (onScreen) redraw(); }).observe(stage);
  }
  document.addEventListener('visibilitychange', function () { if (!document.hidden) redraw(); });

  if (reduced) { pinsBox.classList.add('is-up'); tagsBox.classList.add('is-up'); }
  fit();
  redraw();
  if ('ResizeObserver' in window) new ResizeObserver(function () { fit(); redraw(); }).observe(stage);
  else addEventListener('resize', function () { fit(); redraw(); });
  // label widths change when the font arrives
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { fit(); redraw(); });

  /* ───────────── targeting ───────────── */
  var say = $('elSay'), body = $('elBriefBody'), act = $('elBriefAct'), go = $('elGo');
  var state = $('elBriefState'), panel = document.querySelector('.el-brief-in');
  var idle = body ? body.innerHTML : '';
  var fetched = {};

  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }

  function lock(s, focus) {
    if (!s) return;
    sel = s;
    systems.forEach(function (o) {
      var on = o === s;
      o.pin.classList.toggle('is-on', on);
      o.pin.setAttribute('aria-pressed', on ? 'true' : 'false');
      o.pin.tabIndex = on ? 0 : -1;
      o.a.classList.toggle('is-on', on);
    });
    root.classList.add('has-target');
    if (panel) panel.style.setProperty('--c', s.sector.c);
    if (state) state.textContent = 'Target locked';
    if (body) {
      body.textContent = '';
      body.appendChild(el('p', 'el-brief-name', s.name));
      body.appendChild(el('p', 'el-brief-sub', s.sub));
      var meta = el('p', 'el-brief-meta');
      [['Allegiance', s.faction.name], ['Sector', s.core ? 'The Core' : s.sector.name], ['Grid', s.grid], ['Lane', LANE[s.sector.name] || 'Uncharted']].forEach(function (m) {
        var sp = el('span', null, m[0] + ' '); sp.appendChild(el('b', null, m[1])); meta.appendChild(sp);
      });
      body.appendChild(meta);
      if (s.brief) body.appendChild(el('p', 'el-brief-p', s.brief));
      var facts = s.world ? [['Story', s.world]].concat(s.facts) : s.facts;
      if (facts.length) {
        var dl = el('dl', 'el-facts');
        facts.forEach(function (f) { var d = el('div'); d.appendChild(el('dt', null, f[0])); d.appendChild(el('dd', null, f[1])); dl.appendChild(d); });
        body.appendChild(dl);
      }
    }
    if (act) act.hidden = false;
    if (go) go.setAttribute('href', s.href);
    if (say) say.textContent = 'Target locked: ' + s.name + ', ' + s.sub + '. Enter makes the jump.';
    // start fetching the page now, so the jump lands on it sooner
    if (!fetched[s.href]) {
      fetched[s.href] = 1;
      var pf = document.createElement('link'); pf.rel = 'prefetch'; pf.href = s.href; document.head.appendChild(pf);
    }
    if (focus) s.pin.focus({ preventScroll: true });
    // on a phone the briefing is under the table: bring it up into view
    if (compact && panel) {
      var r = panel.getBoundingClientRect();
      if (r.top > innerHeight - 140) panel.scrollIntoView({ block: 'nearest', behavior: reduced ? 'auto' : 'smooth' });
    }
    redraw();
  }

  function unlock() {
    if (!sel) return;
    var was = sel;
    sel = null;
    systems.forEach(function (o) { o.pin.classList.remove('is-on'); o.pin.setAttribute('aria-pressed', 'false'); o.a.classList.remove('is-on'); });
    root.classList.remove('has-target');
    if (panel) panel.style.removeProperty('--c');
    if (state) state.textContent = 'Awaiting target';
    if (body) body.innerHTML = idle;
    if (act) act.hidden = true;
    if (say) say.textContent = 'Target cleared.';
    if (document.activeElement && document.activeElement.closest && document.activeElement.closest('.el-brief')) was.pin.focus({ preventScroll: true });
    redraw();
  }

  function track(s) {
    if (hot === s) return;
    if (hot) hot.pin.classList.remove('is-hot');
    hot = s;
    if (hot) hot.pin.classList.add('is-hot');
    redraw();
  }

  // a planet under the pointer: the nearest within reach of a fingertip
  function nearest(e) {
    var r = stage.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
    var best = null, bd = compact ? 26 : 22;
    systems.forEach(function (s) { var d = Math.hypot(s.sx - x, s.sy - y); if (d < bd) { bd = d; best = s; } });
    return best;
  }

  function choose(s) { if (sel === s) jump(s); else lock(s); }

  systems.forEach(function (s, i) {
    s.pin.addEventListener('click', function () { choose(s); });
    s.pin.addEventListener('pointerenter', function () { track(s); });
    s.pin.addEventListener('pointerleave', function () { track(null); });
    s.pin.addEventListener('keydown', function (e) {
      var to = -1, n = systems.length;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') to = (i + 1) % n;
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') to = (i - 1 + n) % n;
      else if (e.key === 'Home') to = 0;
      else if (e.key === 'End') to = n - 1;
      if (to < 0) return;
      e.preventDefault();
      lock(systems[to], true);
    });
    // the charts: pointing at a row tracks its system on the table, and a
    // click jumps straight there (these are the plain way in)
    s.a.addEventListener('pointerenter', function () { track(s); });
    s.a.addEventListener('pointerleave', function () { track(null); });
    s.a.addEventListener('click', function (e) {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      jump(s);
    });
  });

  stage.addEventListener('pointerenter', function () { pointerIn = true; });
  stage.addEventListener('pointerleave', function () { pointerIn = false; track(null); stage.style.cursor = ''; });
  stage.addEventListener('pointermove', function (e) {
    if (e.target.closest('.el-pin')) return;
    var s = nearest(e);
    track(s);
    stage.style.cursor = s ? 'pointer' : '';
  });
  stage.addEventListener('click', function (e) {
    if (e.target.closest('.el-pin')) return;
    var s = nearest(e);
    if (s) choose(s);
  });
  pinsBox.addEventListener('focusin', function () { still = true; });
  pinsBox.addEventListener('focusout', function () { still = false; });

  if (go) go.addEventListener('click', function (e) {
    if (!sel || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    jump(sel);
  });
  if ($('elClear')) $('elClear').addEventListener('click', unlock);

  /* ───────────── the jump to lightspeed ───────────── */
  var jumpBox = $('elJump'), sky = $('elJumpSky'), jumpTo = $('elJumpTo');
  var jumpCrest = $('elJumpCrest'), jumpSpace = $('elJumpSpace');
  var sctx = sky && sky.getContext && sky.getContext('2d');
  var jumping = null, jraf = 0, jt0 = 0, navTimer = 0, stars = [];

  function go2(s) { if (!s || s.gone) return; s.gone = true; location.href = s.href; }

  function jump(s) {
    if (jumping) return;
    if (reduced || !sctx) { location.href = s.href; return; }
    jumping = { href: s.href };
    if (jumpTo) jumpTo.textContent = s.name;
    // the HUD wears the colors of the space you are jumping into
    if (jumpSpace) jumpSpace.textContent = s.faction.space;
    if (jumpCrest && s.faction.crestId) jumpCrest.setAttribute('href', '#' + s.faction.crestId);
    if (jumpBox) jumpBox.style.setProperty('--f', s.faction.c);
    if (say) say.textContent = 'Jumping to ' + s.name + '.';
    root.classList.add('is-jumping');
    var w = innerWidth, h = innerHeight, r = Math.min(window.devicePixelRatio || 1, 2);
    sky.width = Math.round(w * r); sky.height = Math.round(h * r);
    sctx.setTransform(r, 0, 0, r, 0, 0);
    stars = [];
    var asp = w / h;
    for (var k = 0; k < 520; k++) stars.push({ x: (Math.random() * 2 - 1) * Math.max(1, asp), y: (Math.random() * 2 - 1) * Math.max(1, 1 / asp), z: 0.15 + Math.random() * 0.85, pz: 0, a: Math.random() * TAU });
    jt0 = performance.now();
    jraf = requestAnimationFrame(hyper);
    // the page is asked for while the stars are still stretching, so the
    // jump is mostly time the next page would have taken to load anyway
    navTimer = setTimeout(function () { go2(jumping); }, 640);
    setTimeout(function () {
      addEventListener('keydown', skip, true);
      addEventListener('pointerdown', skip, true);
    }, 0);
  }
  function skip(e) {
    if (!jumping) return;
    if (e.type === 'keydown' && (e.key === 'Escape' || e.key === 'Esc')) { e.preventDefault(); e.stopPropagation(); abort(); return; }
    go2(jumping);
  }
  function abort() {
    clearTimeout(navTimer);
    cancelAnimationFrame(jraf); jraf = 0;
    jumping = null;
    root.classList.remove('is-jumping');
    removeEventListener('keydown', skip, true);
    removeEventListener('pointerdown', skip, true);
    if (say) say.textContent = 'Jump aborted.';
  }

  // Three beats, as the films do it: the stars stretch into lines as the
  // ship accelerates, a bloom of light as it crosses over, then the blue
  // tunnel of hyperspace with the streaks turning slowly round you.
  function hyper(now) {
    var w = innerWidth, h = innerHeight, cx = w / 2, cy = h / 2, f = Math.max(w, h) * 0.42;
    var t = (now - jt0) / 1000;
    var v = t < 0.38 ? Math.pow(t / 0.38, 2.4) * 2.2 : 2.2 + (t - 0.38) * 1.2;
    var tunnel = clamp((t - 0.36) / 0.18, 0, 1);
    sctx.globalCompositeOperation = 'source-over';
    sctx.fillStyle = '#000'; sctx.fillRect(0, 0, w, h);
    if (tunnel > 0) {
      var g = sctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h) * 0.75);
      g.addColorStop(0, 'rgba(2,6,16,' + tunnel + ')');
      g.addColorStop(0.3, 'rgba(16,48,112,' + tunnel + ')');
      g.addColorStop(0.7, 'rgba(10,30,76,' + tunnel + ')');
      g.addColorStop(1, 'rgba(3,8,22,' + tunnel + ')');
      sctx.fillStyle = g; sctx.fillRect(0, 0, w, h);
    }
    var swirl = tunnel * (t - 0.36) * 0.6, c = Math.cos(swirl), sn = Math.sin(swirl);
    sctx.lineCap = 'round';
    sctx.globalCompositeOperation = 'lighter';
    for (var k = 0; k < stars.length; k++) {
      var s = stars[k];
      var pz = s.z;
      s.z -= v * 0.016;
      if (s.z <= 0.03) { s.z = 1; pz = 1.04; s.x = (Math.random() * 2 - 1) * 1.6; s.y = (Math.random() * 2 - 1) * 1.6; }
      var x = s.x * c - s.y * sn, y = s.x * sn + s.y * c;
      var tail = pz + 0.015 + v * (0.04 + tunnel * 0.1);
      var x1 = cx + x / s.z * f, y1 = cy + y / s.z * f;
      var x0 = cx + x / tail * f, y0 = cy + y / tail * f;
      var br = clamp(1.15 - s.z, 0.12, 0.95);
      sctx.strokeStyle = tunnel > 0.3 && k % 3 ? 'rgba(110,170,255,' + br + ')' : 'rgba(225,238,255,' + br + ')';
      sctx.lineWidth = (1 - s.z) * 2.2 + 0.5;
      sctx.beginPath(); sctx.moveTo(x0, y0); sctx.lineTo(x1, y1); sctx.stroke();
    }
    // the bloom as the ship crosses over, from the middle outwards
    var fl = t > 0.33 && t < 0.56 ? 1 - Math.abs(t - 0.4) / (t < 0.4 ? 0.07 : 0.16) : 0;
    if (fl > 0) {
      var b = sctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h) * (0.3 + fl * 0.5));
      b.addColorStop(0, 'rgba(235,244,255,' + (fl * 0.85).toFixed(3) + ')');
      b.addColorStop(1, 'rgba(120,170,255,0)');
      sctx.fillStyle = b; sctx.fillRect(0, 0, w, h);
    }
    sctx.globalCompositeOperation = 'source-over';
    if (jumping) jraf = requestAnimationFrame(hyper);
  }

  /* ───────────── keys ───────────── */
  document.addEventListener('keydown', function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey || jumping) return;
    if (e.key === 'Escape' || e.key === 'Esc') {
      if (sel) { e.preventDefault(); unlock(); return; }
      location.href = '/';
      return;
    }
    // Enter with nothing focused jumps to the locked target
    if (e.key === 'Enter' && sel && (document.activeElement === document.body || !document.activeElement)) {
      e.preventDefault(); jump(sel);
    }
  });

  // Back from the next page, this one comes out of the cache as it was
  // left: mid-jump, black, with the stars frozen. Take all of that down.
  addEventListener('pageshow', function (e) {
    if (!e.persisted) return;
    if (jumping) abort();
    clearTimeout(navTimer);
    root.classList.remove('is-jumping');
    track(null);
    pointerIn = false;
    if (say) say.textContent = '';
    redraw();
  });

  /* ── the rest of the fleet ──
     Four systems are the sector and the other eighteen sit behind a button;
     opening it is remembered, the same way the worlds switch and the sound
     and cursor toggles are, and wrapped in try/catch because private mode
     throws on the getter as well as the setter. */
  (function moreFleet() {
    var more = document.getElementById('elMore');
    if (!more) return;
    var KEY = 'ae-elmallah-fleet';
    try { if (localStorage.getItem(KEY) === 'on') more.open = true; } catch (e) { /* private mode */ }
    more.addEventListener('toggle', function () {
      try { localStorage.setItem(KEY, more.open ? 'on' : 'off'); } catch (e) { /* private mode */ }
    });
  })();

  /* smooth scrolling only after load, so back/forward restores the position instantly */
  addEventListener('load', function () {
    requestAnimationFrame(function () { requestAnimationFrame(function () {
      document.documentElement.classList.add('smooth');
    }); });
  });
})();
