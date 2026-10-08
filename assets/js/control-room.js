/* control-room.js: /control-room/, the Jurassic Park terminal.

   The live parts of the control room, in the order they sit on the page:

     the clock     island time (Costa Rica, UTC-6, no summer time), yours,
                   and how long you have been on shift
     the map       the pins and fences answer the directory, and the two
                   tour cars drive the loop
     fsn           the 3D file system browser from the film, on a plain 2D
                   canvas: directories as pedestals on a lit floor, files as
                   blocks on them, wires from each folder to what is in it
     security      Nedry's lockout: three tries at the grid, then the same
                   sentence until somebody gives up
     the reboot    "Hold on to your butts.", every screen going out, and the
                   end screen with the way home

   Every address here is read from the two lists in the page (#crRooms and
   #crHosts), never written twice: the pins, the file system and the
   terminal's ls all ask the list. */
(function controlRoom() {
  'use strict';

  var root = document.getElementById('cr');
  if (!root) return;
  var $ = function (id) { return document.getElementById(id); };
  var reduced = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  /* ───────────── the rooms, from the page ───────────── */

  // key -> { key, href, name, sub, link, group, n, pin, fences }
  var ROOMS = {}, ORDER = [];
  function collect(sel, group) {
    document.querySelectorAll(sel).forEach(function (a) {
      var key = a.dataset.fsn;
      var r = {
        key: key, href: a.getAttribute('href'), link: a, group: key === '/' ? 'root' : group,
        name: (a.querySelector('b') || a).textContent,
        sub: (a.querySelector('i') || a).textContent,
        n: a.dataset.n || null, pin: null, fences: []
      };
      if (r.n) {
        r.pin = document.querySelector('.cr-pin[data-n="' + r.n + '"]');
        r.fences = Array.prototype.slice.call(document.querySelectorAll('.cr-fence[data-n="' + r.n + '"]'));
      }
      ROOMS[key] = r; ORDER.push(r);
    });
  }
  collect('#crRooms .cr-room', 'park');
  collect('#crHosts .cr-host', 'net');

  // one room lit everywhere it appears: its row in a list, its pin, its fence
  var lit = null;
  function light(key) {
    if (lit === key) return;
    if (lit && ROOMS[lit]) paint(ROOMS[lit], false);
    lit = key;
    if (key && ROOMS[key]) paint(ROOMS[key], true);
  }
  function paint(r, on) {
    r.link.classList.toggle('is-hot', on);
    if (r.pin) r.pin.classList.toggle('is-hot', on);
    r.fences.forEach(function (f) { f.classList.toggle('is-hot', on); });
  }

  /* ───────────── the clock ───────────── */

  var islandFmt = null;
  try {
    islandFmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'America/Costa_Rica', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  } catch (e) { islandFmt = null; }
  function islandTime(d) {
    if (islandFmt) return islandFmt.format(d);
    // no time zone data: Costa Rica is six hours behind UTC all year
    var t = new Date(d.getTime() - 6 * 3600000);
    return pad(t.getUTCHours()) + ':' + pad(t.getUTCMinutes()) + ':' + pad(t.getUTCSeconds());
  }
  var started = Date.now();
  var printed = $('crPrinted');
  if (printed) {
    try { printed.textContent = 'Printed ' + new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }); } catch (e) { /* keeps "Printed today" */ }
  }
  function tick() {
    var d = new Date(), t = islandTime(d);
    if ($('crIsland')) $('crIsland').textContent = t;
    if ($('crTopClock')) $('crTopClock').textContent = root.classList.contains('is-down') ? 'Systems off · ' + t : 'Island time ' + t;
    if ($('crLocal')) $('crLocal').textContent = pad(d.getHours()) + ':' + pad(d.getMinutes());
    var s = Math.floor((Date.now() - started) / 1000);
    if ($('crShift')) $('crShift').textContent = Math.floor(s / 60) + ':' + pad(s % 60);
  }
  tick(); setInterval(tick, 1000);

  /* ───────────── the map ───────────── */

  // pins are pictures of the list: pointing lights the row, clicking goes
  ORDER.forEach(function (r) {
    if (!r.pin) return;
    r.pin.addEventListener('pointerenter', function () { light(r.key); fsn && fsn.point(r.key); });
    r.pin.addEventListener('pointerleave', function () { light(null); });
    r.pin.addEventListener('click', function () { location.href = r.href; });
  });

  // the two tour cars, a third of the loop apart, about a minute a lap
  var road = $('crRoad'), cars = [$('crCar1'), $('crCar2')];
  var mapOn = false;
  function placeCars(t) {
    if (!road || !road.getTotalLength) return;
    var L = road.getTotalLength();
    cars.forEach(function (car, i) {
      if (!car) return;
      var s = ((t / 60000) * L + i * L * 0.38) % L;
      var p = road.getPointAtLength(s), q = road.getPointAtLength((s + 2) % L);
      var a = Math.atan2(q.y - p.y, q.x - p.x) * 180 / Math.PI;
      car.setAttribute('transform', 'translate(' + p.x.toFixed(1) + ' ' + p.y.toFixed(1) + ') rotate(' + a.toFixed(1) + ')');
    });
  }
  placeCars(9000);
  function drive(t) {
    if (!mapOn || root.classList.contains('is-down')) return;
    if (!document.hidden) placeCars(t + 9000);
    requestAnimationFrame(drive);
  }
  // only while the map is on screen; with reduced motion they stay parked
  if (!reduced && road && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (es) {
      var was = mapOn; mapOn = es[0].isIntersecting;
      if (mapOn && !was) requestAnimationFrame(drive);
    }).observe(road.ownerSVGElement);
  }

  /* ───────────── fsn ─────────────
     A tiny 3D renderer: a pinhole camera that orbits a target on the
     floor, boxes drawn back to front, and the floor grid clipped at the
     near plane. No WebGL: a few hundred flat polygons a frame is nothing
     for a 2D canvas, and it keeps the page's one rule, that everything is
     drawn here. */
  var fsn = (function makeFsn(canvas) {
    if (!canvas || !canvas.getContext) return null;
    var ctx = canvas.getContext('2d');
    var mon = canvas.closest('.cr-mon');
    // a finger cannot hover, so on touch a first tap picks and a second opens
    var note = $('crFsnNote');
    if (note && window.matchMedia && matchMedia('(hover: none)').matches) note.textContent = 'Swipe to turn · tap twice to open';

    // seeded, so a page's blocks are the same every visit
    function seedOf(t) { var h = 2166136261; for (var i = 0; i < t.length; i++) { h ^= t.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
    function rng(seed) { var s = seed || 1; return function () { s ^= s << 13; s ^= s >>> 17; s ^= s << 5; return (s >>> 0) / 4294967296; }; }

    var FILES = ['#e0642a', '#f2c230', '#6dff9a', '#5fb7d0', '#c9d6df', '#ff7a5a'];
    var NODES = [], BYKEY = {};
    function node(o) {
      o.w = o.w || 3; o.h = o.h || 0.45; o.files = [];
      var r = rng(seedOf(o.key + '/fsn'));
      var count = o.kind === 'dir' ? 0 : o.kind === 'root' ? 4 : 1 + Math.floor(r() * 4);
      var spots = [[-0.65, -0.65], [0.65, -0.65], [-0.65, 0.65], [0.65, 0.65]];
      for (var i = 0; i < count; i++) {
        o.files.push({
          dx: spots[i][0] * (o.w / 3), dz: spots[i][1] * (o.w / 3), s: 0.42 * (o.w / 3),
          h: o.kind === 'root' ? 1.2 + i * 0.5 : 0.35 + r() * 2.1,
          c: FILES[Math.floor(r() * FILES.length)]
        });
      }
      NODES.push(o); BYKEY[o.key] = o;
      return o;
    }

    // the tree: home is the root, the rooms hang off /park, the terminals off /net
    var home = ROOMS['/'];
    var rootN = node({ key: '/', label: '/', kind: 'root', x: 0, z: 0, w: 4, room: home });
    var park = node({ key: '#park', label: 'park', kind: 'dir', x: -8, z: 7, w: 3.6, parent: rootN,
      dir: { href: '#crRooms', name: 'The park', sub: 'Every room on the site, as a directory', path: '/park' } });
    var net = node({ key: '#net', label: 'net', kind: 'dir', x: 9, z: 7, w: 3.6, parent: rootN,
      dir: { href: '#crHosts', name: 'Remote terminals', sub: 'The other interfaces', path: '/net' } });
    var pi = 0, ni = 0;
    ORDER.forEach(function (r) {
      if (r.group === 'park') {
        node({ key: r.key, label: r.key, kind: 'file', room: r, parent: park,
          x: -8 + ((pi % 5) - 2) * 4.2, z: 14 + Math.floor(pi / 5) * 5.6 });
        pi++;
      } else if (r.group === 'net') {
        node({ key: r.key, label: r.key, kind: 'file', room: r, parent: net,
          x: 9 + ((ni % 3) - 1) * 4.2, z: 14 + Math.floor(ni / 3) * 5.6 });
        ni++;
      }
    });

    /* camera: orbits a target point on the floor */
    var W = 0, H = 0, F = 1;
    var cam = { tx: -1.5, tz: 12, yaw: 0, dist: 20, h: 12 };
    var goal = { tx: -1.5, tz: 12, yaw: 0, dist: 20, h: 12 };
    var C = { x: 0, y: 0, z: 0 }, R = {}, U = {}, Fw = {};
    var NEAR = 0.6;

    // the horizontal distance that shows `width` units across at the target
    function frame(width) { return Math.max(4, Math.min(40, width * F / Math.max(W, 1))); }
    // the whole tree at once, looking down at about 42 degrees: far enough
    // back that the root's front edge and the last row both fit the height,
    // and on a narrow screen, that both ends of the rows fit the width
    function overview() {
      var L = Math.max(34, 36 * F / Math.max(W, 1)), a = 42 * Math.PI / 180;
      goal.tx = -1.5; goal.tz = 12.5; goal.yaw = 0; goal.dist = L * Math.cos(a); goal.h = L * Math.sin(a);
    }
    // with reduced motion there is no tour, so the still view sits between
    // home and the first rows, near enough that their names are readable
    function still() { var d = frame(26); goal.tx = -2.5; goal.tz = 4.8; goal.yaw = 0; goal.dist = d; goal.h = d * 0.62; }
    function closeOn(n, wide) {
      var d = frame(wide || 13);
      goal.tx = n.x; goal.tz = n.z + 1.2; goal.dist = d; goal.h = d * 0.6;
    }

    function basis() {
      var sy = Math.sin(cam.yaw), cy = Math.cos(cam.yaw);
      C.x = cam.tx - sy * cam.dist; C.y = cam.h; C.z = cam.tz - cy * cam.dist;
      var fx = cam.tx - C.x, fy = 0.8 - C.y, fz = cam.tz - C.z;
      var fl = Math.hypot(fx, fy, fz); fx /= fl; fy /= fl; fz /= fl;
      var rx = fz, rz = -fx, rl = Math.hypot(rx, rz); rx /= rl; rz /= rl;
      Fw.x = fx; Fw.y = fy; Fw.z = fz;
      R.x = rx; R.y = 0; R.z = rz;
      U.x = fy * rz; U.y = fz * rx - fx * rz; U.z = -fy * rx;
    }
    function cam3(x, y, z) {
      var vx = x - C.x, vy = y - C.y, vz = z - C.z;
      return { x: vx * R.x + vy * R.y + vz * R.z, y: vx * U.x + vy * U.y + vz * U.z, z: vx * Fw.x + vy * Fw.y + vz * Fw.z };
    }
    function scr(p) { return { x: W / 2 + p.x * F / p.z, y: H / 2 - p.y * F / p.z, z: p.z }; }
    function proj(x, y, z) { var p = cam3(x, y, z); return p.z < NEAR ? null : scr(p); }

    // a line on the floor, cut where it passes behind the camera
    function seg(x0, z0, x1, z1) {
      var a = cam3(x0, 0, z0), b = cam3(x1, 0, z1);
      if (a.z < NEAR && b.z < NEAR) return;
      if (a.z < NEAR || b.z < NEAR) {
        var t = (NEAR - a.z) / (b.z - a.z), m = { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t, z: NEAR };
        if (a.z < NEAR) a = m; else b = m;
      }
      var p = scr(a), q = scr(b);
      ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
    }

    // a color lit or shaded by k, as hex so it can be shaded again
    function shade(hex, k) {
      var v = parseInt(hex.slice(1), 16), out = '#';
      [16, 8, 0].forEach(function (sh) {
        var c = Math.min(255, Math.round(((v >> sh) & 255) * k));
        out += (c < 16 ? '0' : '') + c.toString(16);
      });
      return out;
    }
    function poly(pts, fill, stroke) {
      for (var i = 0; i < pts.length; i++) if (!pts[i]) return;
      ctx.beginPath(); ctx.moveTo(pts[0].x, pts[0].y);
      for (var j = 1; j < pts.length; j++) ctx.lineTo(pts[j].x, pts[j].y);
      ctx.closePath(); ctx.fillStyle = fill; ctx.fill();
      if (stroke) { ctx.strokeStyle = stroke; ctx.stroke(); }
    }
    // a box, showing only the faces that point at the camera, lit from above right
    function box(x0, x1, y0, y1, z0, z1, col, edge) {
      var P = [proj(x0, y0, z0), proj(x1, y0, z0), proj(x1, y1, z0), proj(x0, y1, z0),
               proj(x0, y0, z1), proj(x1, y0, z1), proj(x1, y1, z1), proj(x0, y1, z1)];
      if (C.z < z0) poly([P[0], P[1], P[2], P[3]], shade(col, 0.62), edge);
      if (C.z > z1) poly([P[5], P[4], P[7], P[6]], shade(col, 0.5), edge);
      if (C.x < x0) poly([P[4], P[0], P[3], P[7]], shade(col, 0.5), edge);
      if (C.x > x1) poly([P[1], P[5], P[6], P[2]], shade(col, 0.74), edge);
      if (C.y > y1) poly([P[3], P[2], P[6], P[7]], shade(col, 1), edge);
      return P;
    }

    // the outline of a node on screen, for pointing at it: the convex hull
    // of its pedestal and its tallest block
    function hull(pts) {
      pts = pts.filter(Boolean).sort(function (a, b) { return a.x - b.x || a.y - b.y; });
      if (pts.length < 3) return pts;
      function cross(o, a, b) { return (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x); }
      var lo = [], up = [];
      pts.forEach(function (p) { while (lo.length >= 2 && cross(lo[lo.length - 2], lo[lo.length - 1], p) <= 0) lo.pop(); lo.push(p); });
      for (var i = pts.length - 1; i >= 0; i--) { var p = pts[i]; while (up.length >= 2 && cross(up[up.length - 2], up[up.length - 1], p) <= 0) up.pop(); up.push(p); }
      return lo.slice(0, -1).concat(up.slice(0, -1));
    }
    function inside(poly, x, y) {
      var c = false;
      for (var i = 0, j = poly.length - 1; i < poly.length; j = i++) {
        var a = poly[i], b = poly[j];
        if ((a.y > y) !== (b.y > y) && x < (b.x - a.x) * (y - a.y) / (b.y - a.y) + a.x) c = !c;
      }
      return c;
    }

    var sel = rootN, hover = null;

    function draw() {
      if (!W || !H) return;
      basis();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.lineWidth = 1;

      // sky and floor meet at the horizon
      var hz = Math.hypot(Fw.x, Fw.z), dirU = 0, dirF = hz;   // a level direction straight ahead
      dirU = (Fw.x / hz) * U.x + (Fw.z / hz) * U.z;
      var horizon = H / 2 - (dirU / dirF) * F;
      var sky = ctx.createLinearGradient(0, 0, 0, Math.max(1, horizon));
      sky.addColorStop(0, '#010307'); sky.addColorStop(1, '#0b1d2b');
      ctx.fillStyle = sky; ctx.fillRect(0, 0, W, Math.max(0, horizon));
      var floor = ctx.createLinearGradient(0, Math.max(0, horizon), 0, H);
      floor.addColorStop(0, '#071a22'); floor.addColorStop(1, '#03222a');
      ctx.fillStyle = floor; ctx.fillRect(0, Math.max(0, horizon), W, H - Math.max(0, horizon));

      // the lit grid
      ctx.beginPath();
      for (var gx = -34; gx <= 34; gx += 2) seg(gx, -14, gx, 48);
      for (var gz = -14; gz <= 48; gz += 2) seg(-34, gz, 34, gz);
      ctx.strokeStyle = 'rgba(80, 230, 200, .2)'; ctx.stroke();

      // a pool of light under whatever is selected, as fsn does
      if (sel) {
        var c0 = proj(sel.x, 0, sel.z), ring = [];
        for (var a = 0; a < 24; a++) ring.push(proj(sel.x + Math.cos(a / 24 * 6.283) * sel.w * 1.05, 0, sel.z + Math.sin(a / 24 * 6.283) * sel.w * 1.05));
        if (c0 && ring.every(Boolean)) {
          var rad = Math.max.apply(null, ring.map(function (p) { return Math.hypot(p.x - c0.x, p.y - c0.y); }));
          var g = ctx.createRadialGradient(c0.x, c0.y, 0, c0.x, c0.y, rad);
          g.addColorStop(0, 'rgba(255, 190, 120, .5)'); g.addColorStop(1, 'rgba(255, 150, 80, 0)');
          poly(ring, g);
        }
      }

      // fog over the far floor, so the grid fades instead of turning to moiré
      if (horizon < H) {
        var fog = ctx.createLinearGradient(0, horizon, 0, horizon + H * 0.32);
        fog.addColorStop(0, 'rgba(11, 29, 43, 1)'); fog.addColorStop(1, 'rgba(11, 29, 43, 0)');
        ctx.fillStyle = fog; ctx.fillRect(0, Math.max(0, horizon - 1), W, H * 0.32 + 1);
      }

      // wires from each folder to what is in it; the selected path in amber
      var chain = {};
      for (var s = sel; s; s = s.parent) chain[s.key] = true;
      NODES.forEach(function (n) {
        if (!n.parent) return;
        ctx.beginPath(); seg(n.parent.x, n.parent.z + n.parent.w / 2, n.x, n.z - n.w / 2);
        ctx.strokeStyle = chain[n.key] ? 'rgba(255, 154, 92, .9)' : 'rgba(150, 220, 235, .35)';
        ctx.lineWidth = chain[n.key] ? 2 : 1; ctx.stroke(); ctx.lineWidth = 1;
      });

      // the nodes, far to near
      var order = NODES.map(function (n) { return { n: n, d: cam3(n.x, 0, n.z).z }; })
        .filter(function (o) { return o.d > NEAR; })
        .sort(function (a, b) { return b.d - a.d; });
      order.forEach(function (o) {
        var n = o.n, on = n === sel, over = n === hover;
        var base = on ? '#e0642a' : over ? '#d39a6e' : n.kind === 'root' ? '#a7bccb' : n.kind === 'dir' ? '#5d7f90' : n.room && n.room.group === 'net' ? '#8b8a7a' : '#6f8796';
        var hw = n.w / 2;
        var P = box(n.x - hw, n.x + hw, 0, n.h, n.z - hw, n.z + hw, base, on ? 'rgba(255, 220, 190, .7)' : 'rgba(255, 255, 255, .14)');
        var tall = n.h;
        n.files.map(function (f) { return { f: f, d: cam3(n.x + f.dx, 0, n.z + f.dz).z }; })
          .sort(function (a, b) { return b.d - a.d; })
          .forEach(function (fo) {
            var f = fo.f, x = n.x + f.dx, z = n.z + f.dz;
            box(x - f.s, x + f.s, n.h, n.h + f.h, z - f.s, z + f.s, on ? shade(f.c, 1.2) : f.c, 'rgba(0, 0, 0, .35)');
            tall = Math.max(tall, n.h + f.h);
          });
        // the outline for pointing, with the tallest block included
        var top = [proj(n.x - hw, tall, n.z - hw), proj(n.x + hw, tall, n.z - hw), proj(n.x + hw, tall, n.z + hw), proj(n.x - hw, tall, n.z + hw)];
        n.hull = hull(P.concat(top)); n.depth = o.d;

        n.lp = proj(n.x, 0, n.z - hw - 0.75);
      });

      // the names on the floor in front of each pedestal, last, so a tall
      // block nearer the camera cannot hide one; an outline in the floor's
      // color keeps them readable where they cross a block. Only names big
      // enough to read are drawn (the lists beside the screen carry them all).
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineJoin = 'round';
      order.forEach(function (o) {
        var n = o.n, lp = n.lp, on = n === sel;
        if (!lp) return;
        var size = Math.min(19, F * 0.55 / lp.z);
        if (size < 11) return;
        ctx.font = (on ? '600 ' : '500 ') + size.toFixed(1) + 'px "IBM Plex Mono", ui-monospace, monospace';
        ctx.lineWidth = 4; ctx.strokeStyle = 'rgba(3, 18, 24, .85)';
        ctx.strokeText(n.label, lp.x, lp.y);
        ctx.fillStyle = on ? '#ffb27a' : 'rgba(205, 238, 228, .92)';
        ctx.fillText(n.label, lp.x, lp.y);
      });
      ctx.lineWidth = 1;
    }

    /* the status line under the screen */
    var stPath = $('crFsnPath'), stName = $('crFsnName'), stSub = $('crFsnSub'), stGo = $('crFsnGo'), stGoName = $('crFsnGoName');
    function status(n) {
      var info = n.room ? { href: n.room.href, name: n.room.name, sub: n.room.sub, path: n.room.href } : n.dir;
      if (!info) return;
      if (stPath) stPath.textContent = info.path;
      if (stName) stName.textContent = info.name;
      if (stSub) stSub.textContent = info.sub;
      if (stGo) stGo.setAttribute('href', info.href);
      if (stGoName) stGoName.textContent = ' ' + info.name;
    }
    function select(n) { if (!n) return; sel = n; status(n); }

    /* motion: the camera eases toward its goal; idle, it flies a tour of
       the blocks, the way the shot in the film drifts over the floor */
    var running = false, visible = false, last = 0, lastUser = -1e9, t0 = performance.now(), tourAt = 0, tourI = 0;
    var TOUR = NODES.filter(function (n) { return n.kind !== 'dir'; });
    function busy() { return mon && (mon.matches(':hover') || mon.contains(document.activeElement)); }
    function loop(now) {
      if (!running) return;
      var dt = Math.min(0.05, (now - (last || now)) / 1000); last = now;
      if (!document.hidden) {
        var idle = now - lastUser > 7000 && !busy() && now - t0 > 1800;
        if (idle && now > tourAt) {
          tourI = (tourI + 1) % TOUR.length;
          select(TOUR[tourI]); closeOn(TOUR[tourI], 18);
          tourAt = now + 3400;
        }
        if (idle) goal.yaw = Math.sin(now / 9000) * 0.32;
        var k = 1 - Math.exp(-dt * 2.6);
        cam.tx += (goal.tx - cam.tx) * k; cam.tz += (goal.tz - cam.tz) * k;
        cam.yaw += (goal.yaw - cam.yaw) * k; cam.dist += (goal.dist - cam.dist) * k; cam.h += (goal.h - cam.h) * k;
        draw();
      }
      requestAnimationFrame(loop);
    }
    function start() { if (reduced || running || !visible || root.classList.contains('is-down')) return; running = true; last = 0; requestAnimationFrame(loop); }
    function stop() { running = false; }
    // without motion the camera jumps straight to its goal and draws once
    function settle() { if (reduced) { cam.tx = goal.tx; cam.tz = goal.tz; cam.yaw = goal.yaw; cam.dist = goal.dist; cam.h = goal.h; draw(); } }

    function resize() {
      var r = canvas.getBoundingClientRect();
      if (!r.width) return;
      var first = !W;
      W = r.width; H = r.height;
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      F = H / (2 * Math.tan(26 * Math.PI / 180));
      if (first) {
        if (reduced) still(); else overview();
        cam.tx = goal.tx; cam.tz = goal.tz; cam.dist = goal.dist; cam.h = goal.h;
      }
      else if (sel && sel !== rootN) closeOn(sel); else if (reduced) still(); else overview();
      cam.dist = goal.dist; cam.h = goal.h;
      draw();
    }
    if ('ResizeObserver' in window) new ResizeObserver(resize).observe(canvas); else addEventListener('resize', resize);
    resize();
    status(rootN);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { draw(); });
    new IntersectionObserver(function (es) {
      visible = es[0].isIntersecting;
      if (visible) start(); else stop();
    }).observe(canvas);

    /* pointing, dragging and clicking */
    function pick(e) {
      var r = canvas.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top, best = null;
      NODES.forEach(function (n) {
        if (n.hull && n.hull.length > 2 && inside(n.hull, x, y) && (!best || n.depth < best.depth)) best = n;
      });
      return best;
    }
    var drag = null;
    canvas.addEventListener('pointerdown', function (e) {
      drag = { x: e.clientX, y: e.clientY, moved: 0, type: e.pointerType };
      lastUser = performance.now();
      if (e.pointerType === 'mouse') { canvas.setPointerCapture(e.pointerId); }
    });
    canvas.addEventListener('pointermove', function (e) {
      lastUser = performance.now();
      if (drag) {
        var dx = e.clientX - drag.x, dy = e.clientY - drag.y;
        drag.moved += Math.abs(dx) + Math.abs(dy);
        drag.x = e.clientX; drag.y = e.clientY;
        if (drag.moved > 6) {
          canvas.classList.add('is-dragging');
          goal.yaw += dx * 0.006;
          // mouse only: a touch drag up and down is the page scrolling
          if (drag.type === 'mouse') { goal.tz -= dy * 0.04 * Math.cos(goal.yaw); goal.tx -= dy * 0.04 * Math.sin(goal.yaw); }
          settle();
        }
        return;
      }
      if (e.pointerType !== 'mouse') return;
      var n = pick(e);
      if (n !== hover) {
        hover = n;
        canvas.classList.toggle('is-over', !!n);
        if (n) { select(n); light(n.room ? n.room.key : null); } else light(null);
        if (reduced) draw();
      }
    });
    canvas.addEventListener('pointerleave', function () { if (!drag) { hover = null; canvas.classList.remove('is-over'); light(null); if (reduced) draw(); } });
    canvas.addEventListener('pointercancel', function () { drag = null; canvas.classList.remove('is-dragging'); });
    canvas.addEventListener('pointerup', function (e) {
      var was = drag; drag = null; canvas.classList.remove('is-dragging');
      if (!was || was.moved > 6) return;
      var n = pick(e);
      if (!n) return;
      // a mouse click opens it, like the film; a tap selects it first and
      // a second tap opens it, so a finger can read the name before going
      if (n.room && (was.type === 'mouse' || n === sel)) { open(n); return; }
      select(n); closeOn(n); settle();
    });

    function open(n) {
      select(n); stop();
      if (reduced) { location.href = n.room.href; return; }
      goal.tx = n.x; goal.tz = n.z; goal.dist = 3.4; goal.h = 3.2;
      running = true; last = 0; requestAnimationFrame(loop);
      setTimeout(function () { location.href = n.room.href; }, 560);
    }

    return {
      // a row in a list was pointed at or focused: fly there
      point: function (key) {
        var n = BYKEY[key]; if (!n) return;
        lastUser = performance.now(); select(n); closeOn(n, 17); settle();
      },
      stop: stop, start: start,
      reset: function () { stop(); select(rootN); if (reduced) still(); else overview(); settle(); start(); }
    };
  })($('crFsn'));

  // the lists drive the pins, the fences and the camera
  ORDER.forEach(function (r) {
    function on() { light(r.key); if (fsn) fsn.point(r.key); }
    r.link.addEventListener('pointerenter', on);
    r.link.addEventListener('focus', on);
    r.link.addEventListener('pointerleave', function () { if (document.activeElement !== r.link) light(null); });
    r.link.addEventListener('blur', function () { light(null); });
  });

  /* ───────────── security ───────────── */

  var mac = $('crMac'), log = $('crLog'), flood = $('crFlood'), screen = $('crTerm'), form = $('crForm'), input = $('crCmd');
  var READY = log ? log.innerHTML : '';
  var tries = 0, flooding = null, typing = null, user = false;

  function bottom() { if (screen) screen.scrollTop = screen.scrollHeight; }
  function say(text, cls) {
    if (!log) return;
    var p = document.createElement('p');
    if (cls) p.className = cls;
    p.textContent = text;
    log.appendChild(p); bottom();
  }
  function calm() {
    clearInterval(flooding); flooding = null;
    if (flood) flood.textContent = '';
    if (mac) mac.classList.remove('is-flood');
  }
  // the screen in the film: the sentence, over and over, until it fills
  function magicWord() {
    calm();
    say('YOU DIDN’T SAY THE MAGIC WORD!', 'is-deny');   // once, for a screen reader
    if (mac) mac.classList.add('is-flood');
    var n = 0, max = 48;
    function more() {
      var p = document.createElement('p');
      p.textContent = 'YOU DIDN’T SAY THE MAGIC WORD!';
      flood.appendChild(p); bottom();
      if (++n >= max) { clearInterval(flooding); flooding = null; }
    }
    if (reduced) { for (var i = 0; i < max; i++) more(); return; }
    flooding = setInterval(more, 70);
  }

  function find(arg) {
    var a = arg.toLowerCase().replace(/^\/+|\/+$/g, '');
    if (!a || a === '~' || a === '/') return ROOMS['/'];
    var hit = null;
    ORDER.forEach(function (r) {
      if (hit) return;
      var path = r.href.replace(/^\/+|\/+$/g, '');
      if (path === a || r.key === a || path.split('/').pop() === a) hit = r;
    });
    if (hit) return hit;
    ORDER.forEach(function (r) { if (!hit && r.name.toLowerCase().indexOf(a) >= 0) hit = r; });
    return hit;
  }

  function run(raw) {
    var c = (raw || '').trim(), lc = c.toLowerCase().replace(/\s+/g, ' ');
    calm();
    say('> ' + c, 'is-cmd');
    if (!c) return;
    var word = lc.split(' ')[0], arg = c.slice(word.length).trim();

    if (lc === 'help' || lc === '?' || lc === 'man') {
      say('access security · access security grid · access main security grid', 'is-note');
      say('please · whte_rbt.obj · ls · cd <room> · unix · reboot · clear', 'is-note');
    } else if (word === 'access') {
      tries++;
      if (lc === 'access main security grid' || tries >= 3) {
        tries = 0;
        say('access: PERMISSION DENIED....and....', 'is-deny');
        setTimeout(magicWord, reduced ? 0 : 500);
      } else {
        say('access: PERMISSION DENIED.', 'is-deny');
      }
    } else if (lc.indexOf('please') >= 0) {
      say('access: PERMISSION DENIED.', 'is-deny');
      say('Arnold shouted that one at the screen. It did not work for him either.', 'is-note');
    } else if (lc.indexOf('magic word') >= 0) {
      say('access: PERMISSION DENIED.', 'is-deny');
      say('Nobody ever finds out what it was.', 'is-note');
    } else if (word === 'whte_rbt.obj' || word === 'white_rabbit' || word === 'whte_rbt') {
      say('whte_rbt.obj: Nedry’s program, still running.', 'is-deny');
      say('It switched off the fences and the security systems, every one except the raptor pen.', 'is-note');
      say('The only way to clear it is to shut the whole park down. The switch is at the bottom of this page.', 'is-note');
    } else if (word === 'ls' || word === 'dir') {
      ORDER.forEach(function (r) {
        if (r.group === 'net') return;
        say(r.href + '  ' + r.name);
      });
      say('/net:', 'is-note');
      ORDER.forEach(function (r) { if (r.group === 'net') say(r.href + '  ' + r.name); });
    } else if (word === 'cd' || word === 'open' || word === 'go' || word === 'goto') {
      var r = find(arg);
      if (!r) { say(word + ': ' + (arg || '?') + ': no such room. Try ls.', 'is-deny'); return; }
      say('Opening ' + r.href + ' (' + r.name + ')...', 'is-note');
      setTimeout(function () { location.href = r.href; }, reduced ? 150 : 650);
    } else if (lc === 'unix' || lc === 'fsn') {
      say('It’s a UNIX system! I know this!', 'is-note');
      var u = $('crUnixH');
      if (u) u.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    } else if (word === 'reboot' || word === 'shutdown' || lc.indexOf('hold on to your butts') >= 0) {
      say('Hold on to your butts.', 'is-note');
      setTimeout(powerDown, reduced ? 0 : 700);
    } else if (word === 'clear' || word === 'reset' || word === 'cls') {
      if (log) log.innerHTML = READY;
      tries = 0;
    } else {
      say(word + ': command not found. Type help.', 'is-deny');
    }
  }

  // type a command into the prompt a key at a time, then run it
  function type(cmd, speed, done) {
    clearTimeout(typing);
    if (reduced || !input) { run(cmd); if (done) done(); return; }
    var i = 0;
    input.value = '';
    (function key() {
      input.value = cmd.slice(0, ++i);
      if (i < cmd.length) { typing = setTimeout(key, speed); return; }
      typing = setTimeout(function () { input.value = ''; run(cmd); if (done) typing = setTimeout(done, 900); }, 260);
    })();
  }

  if (form) form.addEventListener('submit', function (e) {
    e.preventDefault();
    user = true; clearTimeout(typing);
    run(input.value); input.value = '';
  });
  if (input) {
    input.addEventListener('focus', function () { user = true; clearTimeout(typing); });
  }
  document.querySelectorAll('.cr-chip').forEach(function (b) {
    b.addEventListener('click', function () { user = true; type(b.dataset.cmd, 28); });
  });

  // The scene plays itself once, the first time the window is properly on
  // screen: Arnold's three tries and the answer. Not with reduced motion,
  // where the prompt simply waits, and never once you have typed yourself.
  if (mac && !reduced && 'IntersectionObserver' in window) {
    var seen = new IntersectionObserver(function (es) {
      if (!es[0].isIntersecting || user) return;
      seen.disconnect();
      var steps = ['access security', 'access security grid', 'access main security grid'], k = 0;
      (function next() {
        if (user || k >= steps.length) return;
        type(steps[k++], 55, next);
      })();
    }, { threshold: 0.6 });
    seen.observe(mac);
  }

  /* ───────────── the reboot ───────────── */

  var main = document.querySelector('.cr-main'), bar = document.querySelector('.cr-top');
  var endHome = $('crEndHome'), butts = $('crButts'), ending = null;
  function powerDown() {
    if (root.classList.contains('is-down')) return;
    user = true; clearTimeout(typing); calm();
    if (fsn) fsn.stop();
    // the screens in view go out one after another, top to bottom
    var i = 0;
    document.querySelectorAll('.cr-screen, .cr-mac-screen').forEach(function (s) {
      var r = s.getBoundingClientRect();
      var inView = r.bottom > 0 && r.top < innerHeight;
      s.style.setProperty('--off', (inView ? i++ * 0.12 : 0) + 's');
    });
    root.classList.add('is-down');
    tick();
    ending = setTimeout(function () {
      root.classList.add('is-ended');
      if (main) main.inert = true;
      if (bar) bar.inert = true;
      if (endHome) endHome.focus({ preventScroll: true });
    }, reduced ? 0 : 1500 + i * 120);
  }
  function powerUp(focus) {
    clearTimeout(ending);
    root.classList.remove('is-down', 'is-ended');
    if (main) main.inert = false;
    if (bar) bar.inert = false;
    document.querySelectorAll('.cr-screen, .cr-mac-screen').forEach(function (s) { s.style.removeProperty('--off'); });
    tick();
    if (fsn) fsn.reset();
    if (focus && butts) butts.focus({ preventScroll: true });
  }
  if (butts) butts.addEventListener('click', powerDown);
  if ($('crBreakers')) $('crBreakers').addEventListener('click', function () { powerUp(true); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && root.classList.contains('is-down')) powerUp(true);
  });
  // back from the next page, the end screen is still up: take it down
  addEventListener('pageshow', function (e) { if (e.persisted) powerUp(false); });
})();
