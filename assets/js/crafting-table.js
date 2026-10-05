/* crafting-table.js: /crafting-table/, the Minecraft terminal.

   Everything with a texture on this page is drawn here, so the page loads
   no image files at all:

     <canvas data-block="grass">   a block, as the isometric cube the game
                                   shows in an inventory slot
     <canvas data-item="ingot" data-tint="#f05138">
                                   a flat item: ingot, diamond or heart

   Each texture is 16 by 16, like the game's, built from a small palette
   with a seeded random so it comes out the same on every visit, and drawn
   at a whole multiple of its size so the pixels stay square.

   The rest is the live part of the page: the F3 readings, the sky that
   follows your clock, the hotbar keys (1 to 9, E for the inventory, Esc
   for the game menu), the advancement toast and saving the world. */
(function craftingTable() {
  'use strict';

  var root = document.getElementById('ct');
  if (!root) return;
  var dpr = Math.min(window.devicePixelRatio || 1, 3);
  var reduced = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ───────────── textures ───────────── */

  // xorshift, seeded by name, so a block looks the same every time
  function rng(seed) {
    var s = seed >>> 0 || 1;
    return function () { s ^= s << 13; s ^= s >>> 17; s ^= s << 5; return (s >>> 0) / 4294967296; };
  }
  function seedOf(t) {
    var h = 2166136261;
    for (var i = 0; i < t.length; i++) { h ^= t.charCodeAt(i); h = Math.imul(h, 16777619); }
    return h >>> 0;
  }
  function tex(fn) {
    var c = document.createElement('canvas'); c.width = c.height = 16;
    var x = c.getContext('2d');
    for (var j = 0; j < 16; j++) for (var i = 0; i < 16; i++) { x.fillStyle = fn(i, j); x.fillRect(i, j, 1, 1); }
    return c;
  }
  function pick(pal, r) { return pal[Math.floor(r * pal.length)]; }
  function noise(pal, name) { var r = rng(seedOf(name)); return tex(function () { return pick(pal, r()); }); }
  // a noise texture with a darker rim, for the metal and gem blocks
  function framed(pal, rim, name) {
    var r = rng(seedOf(name));
    return tex(function (i, j) {
      if (i === 0 || j === 0 || i === 15 || j === 15) return rim;
      if (i === 1 || j === 1) return pal[pal.length - 1];
      return pick(pal, r());
    });
  }
  function planks(pal, seam, name) {
    var r = rng(seedOf(name));
    return tex(function (i, j) {
      if (j % 4 === 3) return seam;
      var band = (j / 4) | 0;
      if (i === (band % 2 ? 11 : 4)) return seam;
      return pick(pal, r());
    });
  }

  var DIRT  = ['#866043', '#79553a', '#966c4a', '#6b4a32', '#8b6447'];
  var GRASS = ['#5f9f35', '#6aae3b', '#7fbd47', '#4f8a2b', '#73b443'];
  var STONE = ['#7d7d7d', '#8a8a8a', '#747474', '#686868', '#959595', '#7d7d7d'];
  var OAK   = ['#a2824e', '#b8945f', '#9c7f4e', '#ad8a55'];
  var OAKSEAM = '#6b5532';

  function grassSide() {
    var r = rng(seedOf('grass-side'));
    return tex(function (i, j) {
      var g = j < 3 || (j === 3 && r() < 0.6) || (j === 4 && r() < 0.25);
      return g ? pick(GRASS, r()) : pick(DIRT, r());
    });
  }
  function ore(spots, colour, name) {
    var base = noise(STONE, name), x = base.getContext('2d');
    x.fillStyle = colour;
    spots.forEach(function (p) { x.fillRect(p[0], p[1], p[2] || 2, p[3] || 2); });
    x.fillStyle = 'rgba(255,255,255,.55)';
    spots.forEach(function (p) { x.fillRect(p[0], p[1], 1, 1); });
    return base;
  }
  function logSide() {
    var r = rng(seedOf('log-side'));
    var cols = [];
    for (var i = 0; i < 16; i++) cols.push(pick(['#6b5232', '#5a4428', '#7a5e3a', '#4f3b22'], r()));
    return tex(function (i) { return r() < 0.15 ? '#3f2e1a' : cols[i]; });
  }
  function logTop() {
    return tex(function (i, j) {
      var d = Math.max(Math.abs(i - 7.5), Math.abs(j - 7.5));
      if (d > 6.5) return '#6b5232';
      return (Math.floor(d) % 2) ? '#9c7f4e' : '#b8945f';
    });
  }
  function bookshelf() {
    var r = rng(seedOf('books'));
    var books = ['#7a2a1d', '#2c4a7a', '#3e6b2e', '#8a6a24', '#5a2d6b', '#b07a3a', '#2f6d6b'];
    var spine = [];
    for (var i = 0; i < 16; i++) spine.push(pick(books, r()));
    return tex(function (i, j) {
      if (j < 2 || j > 13 || j === 7 || j === 8) return pick(OAK, r());
      if (i === 0 || i === 15) return OAKSEAM;
      var c = spine[(i + (j > 8 ? 5 : 0)) % 16];
      return (j === 2 || j === 9) ? '#2a1d10' : c;
    });
  }
  function tableTop() {
    var p = planks(OAK, OAKSEAM, 'table-top'), x = p.getContext('2d');
    x.fillStyle = '#5a4428';
    x.fillRect(0, 0, 16, 1); x.fillRect(0, 15, 16, 1); x.fillRect(0, 0, 1, 16); x.fillRect(15, 0, 1, 16);
    x.fillRect(5, 1, 1, 14); x.fillRect(10, 1, 1, 14); x.fillRect(1, 5, 14, 1); x.fillRect(1, 10, 14, 1);
    return p;
  }
  function tableSide() {
    var p = planks(OAK, OAKSEAM, 'table-side'), x = p.getContext('2d');
    x.fillStyle = '#5a4428'; x.fillRect(0, 0, 16, 3);
    x.fillStyle = '#9a9a9a'; x.fillRect(3, 5, 4, 2); x.fillRect(4, 7, 2, 5);   // hammer
    x.fillStyle = '#c9c9c9'; x.fillRect(9, 5, 5, 2);                           // saw
    x.fillStyle = '#6b5232'; x.fillRect(11, 7, 2, 5);
    return p;
  }
  function tnt(top) {
    if (top) {
      return tex(function (i, j) {
        if (i > 5 && i < 10 && j > 5 && j < 10) return (i + j) % 2 ? '#2a2a2a' : '#3a3a3a';
        return (i === 0 || j === 0 || i === 15 || j === 15) ? '#a83224' : '#cfc3a4';
      });
    }
    // T, N and T, three pixels wide and five high, on the white band
    var T = ['111', '010', '010', '010', '010'], N = ['101', '111', '111', '101', '101'];
    var letters = [[T, 2], [N, 6], [T, 11]];
    return tex(function (i, j) {
      if (j >= 4 && j <= 11) {
        for (var k = 0; k < letters.length; k++) {
          var L = letters[k][0], ox = letters[k][1];
          if (j >= 6 && j <= 10 && i >= ox && i < ox + 3 && L[j - 6][i - ox] === '1') return '#1b1b1b';
        }
        return j === 4 || j === 11 ? '#d0d0d0' : '#ededed';
      }
      return (i % 4 === 0) ? '#a52a1e' : '#db3b2a';
    });
  }
  function creeperFace() {
    var base = noise(['#5fbf3f', '#4aa82f', '#7ad055', '#3e8e27', '#94dd77'], 'creeper-face');
    var x = base.getContext('2d');
    var face = ['........', '........', '.XX..XX.', '.XX..XX.', '...XX...', '..XXXX..', '..XXXX..', '..X..X..'];
    x.fillStyle = '#121212';
    for (var j = 0; j < 8; j++) for (var i = 0; i < 8; i++) if (face[j][i] === 'X') x.fillRect(i * 2, j * 2, 2, 2);
    return base;
  }
  function seaLantern() {
    return tex(function (i, j) {
      var edge = i % 8 === 0 || j % 8 === 0;
      var core = (i % 8 > 2 && i % 8 < 6) && (j % 8 > 2 && j % 8 < 6);
      return edge ? '#9cc6bb' : core ? '#f4fffc' : ((i + j) % 3 ? '#cfe9e2' : '#bfe0d8');
    });
  }
  function beacon() {
    return tex(function (i, j) {
      if (i === 0 || j === 0 || i === 15 || j === 15) return '#d9f6ff';
      if (j > 11) return (i + j) % 2 ? '#1b1529' : '#2a2140';          // obsidian base
      if (i > 4 && i < 11 && j > 3 && j < 11) return (i > 6 && i < 9 && j > 5 && j < 9) ? '#ffffff' : '#5ff3ff';
      return 'rgba(200, 240, 255, .55)';
    });
  }
  function deepslate() {
    var r = rng(seedOf('deepslate'));
    return tex(function (i, j) {
      if (j % 4 === 3 && r() < 0.7) return '#2e2e33';
      return pick(['#4d4d52', '#45454a', '#58585e', '#3f3f44'], r());
    });
  }

  function barrelSide() {
    var r = rng(seedOf('barrel-side'));
    return tex(function (i, j) {
      if (j === 3 || j === 12) return '#4a4a4a';                       // the iron hoops
      if (i % 4 === 0) return '#4f3a20';                                // stave seams
      return pick(['#7a5a32', '#6e5029', '#86643a'], r());
    });
  }
  function barrelTop() {
    return tex(function (i, j) {
      var d = Math.max(Math.abs(i - 7.5), Math.abs(j - 7.5));
      if (d > 6.5) return '#4f3a20';
      if (d < 2.5) return '#2a1d10';                                    // the bung hole
      return (j % 3 === 0) ? '#6e5029' : '#86643a';
    });
  }
  function sculk() {
    var r = rng(seedOf('sculk'));
    return tex(function () {
      var v = r();
      return v > 0.93 ? '#3fe6e0' : v > 0.86 ? '#1b7f86' : pick(['#0d1e26', '#0a1820', '#11262f', '#0f222b'], r());
    });
  }
  function sandstone() {
    var r = rng(seedOf('sandstone'));
    return tex(function (i, j) {
      if (j === 3 || j === 10) return '#bba873';                       // the courses
      return pick(['#d8cb9a', '#e0d4a6', '#d1c38f', '#dccf9f'], r());
    });
  }

  // a hay bale: straw running down the side, bound by two red-brown bands,
  // and the cut ends on top
  function haySide() {
    var r = rng(seedOf('hay'));
    return tex(function (i, j) {
      if (j === 3 || j === 12) return '#7a3b1c';
      return pick(['#c9a227', '#d6b23a', '#b8911f', '#e0c255'], r());
    });
  }
  function hayTop() {
    var r = rng(seedOf('hay-top'));
    return tex(function (i, j) {
      if (i === 3 || i === 12) return '#7a3b1c';
      return pick(['#b8911f', '#c9a227', '#a8841a'], r());
    });
  }
  // a sponge: yellow, with holes punched through it
  function sponge() {
    var r = rng(seedOf('sponge'));
    return tex(function () {
      var v = r();
      return v < 0.16 ? '#8f8a1c' : pick(['#c8c43a', '#d4cf47', '#bdb932', '#dcd753'], v);
    });
  }

  // name -> { top, left, right } (left is the face toward you, on the left)
  var TEX = {};
  function faces(top, side, front) { return { top: top, left: front || side, right: side }; }
  function block(name) {
    if (TEX[name]) return TEX[name];
    var f;
    switch (name) {
      case 'grass':    f = faces(noise(GRASS, 'grass-top'), grassSide()); break;
      case 'dirt':     f = faces(noise(DIRT, 'dirt'), noise(DIRT, 'dirt')); break;
      case 'stone':    var s = noise(STONE, 'stone'); f = faces(s, s); break;
      case 'gold':     var g = framed(['#f8d93a', '#fbe364', '#f3cf2c', '#fdf2a0'], '#c88f12', 'gold'); f = faces(g, g); break;
      case 'iron':     var ir = framed(['#dcdcdc', '#d0d0d0', '#e6e6e6', '#f2f2f2'], '#9a9a9a', 'iron'); f = faces(ir, ir); break;
      case 'lapis':    var l = framed(['#1f4fa8', '#264fb8', '#1a3f8e', '#2f61c9', '#163378'], '#0f2a66', 'lapis'); f = faces(l, l); break;
      case 'emerald':  var e = framed(['#41f384', '#17dd62', '#0aa848', '#7cf6a8'], '#0b7a35', 'emerald'); f = faces(e, e); break;
      case 'redstone': var rd = framed(['#b31b0d', '#c8250f', '#8f1408', '#e0361a'], '#5e0d05', 'redstone'); f = faces(rd, rd); break;
      case 'diamond':  var d = framed(['#7ef6ee', '#5ed8d0', '#4fc3bb', '#a7fff9'], '#2a9d95', 'diamond'); f = faces(d, d); break;
      case 'obsidian': var o = noise(['#14101e', '#1b1529', '#0e0b15', '#14101e', '#3b2a5c', '#1b1529', '#251b3b'], 'obsidian'); f = faces(o, o); break;
      case 'sand':     var sa = noise(['#dbcf9f', '#e3d8a9', '#d1c48f', '#e9dfb6', '#cbbd86'], 'sand'); f = faces(sa, sa); break;
      case 'note':     var n = framed(['#5a3d29', '#6b4a32', '#4e3423', '#7a573c'], '#3a2618', 'note'); f = faces(n, n); break;
      case 'birch':    var b = planks(['#c5b47b', '#d7c890', '#cdbd83'], '#9e8c55', 'birch'); f = faces(b, b); break;
      case 'deepslate': var ds = deepslate(); f = faces(ds, ds); break;
      case 'barrel':   f = faces(barrelTop(), barrelSide()); break;
      case 'moss':     var mo = noise(['#596e2d', '#647a32', '#4e6227', '#6f8838', '#58702c'], 'moss'); f = faces(mo, mo); break;
      case 'sculk':    var sk = sculk(); f = faces(sk, sk); break;
      case 'sandstone': f = faces(noise(['#d8cb9a', '#e0d4a6', '#d1c38f'], 'sandstone-top'), sandstone()); break;
      case 'lantern':  var sl = seaLantern(); f = faces(sl, sl); break;
      case 'beacon':   var be = beacon(); f = faces(be, be); break;
      case 'log':      f = faces(logTop(), logSide()); break;
      case 'bookshelf': f = faces(planks(OAK, OAKSEAM, 'shelf-top'), bookshelf()); break;
      case 'table':    f = faces(tableTop(), tableSide()); break;
      case 'tnt':      f = faces(tnt(true), tnt(false)); break;
      // the Secondary worlds' interfaces, in the Other terminals slots
      case 'hay':      f = faces(hayTop(), haySide()); break;
      case 'sponge':   var sp = sponge(); f = faces(sp, sp); break;
      case 'quartz':   var qz = framed(['#ece6df', '#f4efe9', '#e2dbd2', '#fbf8f4'], '#cfc6bb', 'quartz'); f = faces(qz, qz); break;
      case 'wool':     var wo = noise(['#a12722', '#b02e28', '#962420', '#bb3530'], 'wool'); f = faces(wo, wo); break;
      case 'coal':     var co = framed(['#1c1c1e', '#232325', '#151517', '#2e2e31'], '#0b0b0c', 'coal'); f = faces(co, co); break;
      case 'creeper':  var c = noise(['#5fbf3f', '#4aa82f', '#7ad055', '#3e8e27'], 'creeper'); f = faces(c, c, creeperFace()); break;
      case 'diamond_ore':
        f = (function () {
          var t = ore([[2, 3], [9, 2, 3, 2], [5, 9], [11, 10, 2, 3], [3, 13]], '#5ee8e0', 'ore');
          return faces(t, t);
        })();
        break;
      default:         var st = noise(STONE, name); f = faces(st, st);
    }
    TEX[name] = f;
    return f;
  }

  // the cube, the way an inventory slot shows a block: the top face as a
  // diamond, the two sides below it, shaded so the light comes from above left
  function drawCube(canvas, name) {
    var css = canvas.clientWidth || 32;
    var k = Math.max(1, Math.round(css * dpr / 32));
    canvas.width = canvas.height = 32 * k;
    var x = canvas.getContext('2d'), f = block(name);
    x.imageSmoothingEnabled = false;
    x.setTransform(k, 0.5 * k, -k, 0.5 * k, 16 * k, 0);
    x.drawImage(f.top, 0, 0);
    x.setTransform(k, 0.5 * k, 0, k, 0, 8 * k);
    x.drawImage(f.left, 0, 0);
    x.fillStyle = 'rgba(0,0,0,.2)'; x.fillRect(0, 0, 16, 16);
    x.setTransform(k, -0.5 * k, 0, k, 16 * k, 16 * k);
    x.drawImage(f.right, 0, 0);
    x.fillStyle = 'rgba(0,0,0,.42)'; x.fillRect(0, 0, 16, 16);
    x.setTransform(1, 0, 0, 1, 0, 0);
  }

  /* ───────────── flat items ───────────── */

  function mix(hex, to, t) {
    var a = parseInt(hex.slice(1), 16), b = parseInt(to.slice(1), 16);
    var r = Math.round(((a >> 16) & 255) * (1 - t) + ((b >> 16) & 255) * t);
    var g = Math.round(((a >> 8) & 255) * (1 - t) + ((b >> 8) & 255) * t);
    var bl = Math.round((a & 255) * (1 - t) + (b & 255) * t);
    return 'rgb(' + r + ',' + g + ',' + bl + ')';
  }
  var SPRITES = {
    ingot: [
      '................',
      '................',
      '................',
      '................',
      '..........oooo..',
      '.......ooowhhho.',
      '....ooohhhhhhmo.',
      '..oohhhhhhmmmdo.',
      '.ohhhhhmmmmmddo.',
      '.ohmmmmmmmmddo..',
      '.ommmmmmmdddo...',
      '.odddmmmddoo....',
      '..ooodddoo......',
      '.....ooo........',
      '................',
      '................'
    ],
    diamond: [
      '................',
      '................',
      '.....oooooo.....',
      '....owhhhhmo....',
      '...ohwhhhmmmo...',
      '..ohhwhhmmmmdo..',
      '..ommmmmmmmddo..',
      '...ommmmmmddo...',
      '....ommmmddo....',
      '.....ommddo.....',
      '......oddo......',
      '.......oo.......',
      '................',
      '................',
      '................',
      '................'
    ],
    heart: [
      '.oo.oo.',
      'ohhorro',
      'ohrrrdo',
      '.orrdo.',
      '..odo..',
      '...o...'
    ]
  };
  function palette(kind, tint) {
    if (kind === 'diamond') return { o: '#0e3b3a', w: '#ffffff', h: '#a7fff9', m: '#4fd8d0', d: '#1d9c94' };
    if (kind === 'heart') return { o: '#2a0606', h: '#ff9a9a', r: '#e01d1d', d: '#9c0d0d' };
    var t = tint || '#d8d8d8';
    return { o: mix(t, '#000000', 0.7), w: '#ffffff', h: mix(t, '#ffffff', 0.45), m: t, d: mix(t, '#000000', 0.35) };
  }
  function drawSprite(canvas, kind, tint) {
    var rows = SPRITES[kind];
    if (!rows) return;
    var w = rows[0].length, h = rows.length, pal = palette(kind, tint);
    var css = canvas.clientWidth || w * 2;
    var k = Math.max(1, Math.round(css * dpr / w));
    canvas.width = w * k; canvas.height = h * k;
    var x = canvas.getContext('2d');
    for (var j = 0; j < h; j++) for (var i = 0; i < w; i++) {
      var ch = rows[j][i];
      if (ch === '.') continue;
      x.fillStyle = pal[ch] || '#000';
      x.fillRect(i * k, j * k, k, k);
    }
  }

  function paintAll() {
    document.querySelectorAll('canvas[data-block]').forEach(function (c) { drawCube(c, c.dataset.block); });
    document.querySelectorAll('canvas[data-item]').forEach(function (c) { drawSprite(c, c.dataset.item, c.dataset.tint); });
  }

  // a texture as a tile for CSS: the logo's stone, the ground, the dirt
  function tile(t, scale) {
    var c = document.createElement('canvas'); c.width = c.height = 16 * scale;
    var x = c.getContext('2d'); x.imageSmoothingEnabled = false;
    x.drawImage(t, 0, 0, 16 * scale, 16 * scale);
    return 'url(' + c.toDataURL() + ')';
  }

  paintAll();
  root.style.setProperty('--ct-stone', tile(noise(['#9a9a9a', '#a8a8a8', '#8c8c8c', '#b5b5b5', '#828282'], 'logo'), 3));
  root.style.setProperty('--ct-dirt', tile(noise(DIRT, 'dirt'), 4));
  var ground = document.getElementById('ctGround');
  if (ground) {
    var dirt = tile(noise(DIRT, 'dirt'), 3);
    ground.style.backgroundImage = tile(grassSide(), 3) + ', ' + dirt;
    ground.style.backgroundSize = '48px 48px, 48px 48px';
    ground.style.backgroundRepeat = 'repeat-x, repeat';
    ground.style.backgroundPosition = '0 0, 0 48px';
  }
  // the hotbar is sized by the window, so it is drawn again when that changes
  var redraw;
  addEventListener('resize', function () { clearTimeout(redraw); redraw = setTimeout(paintAll, 200); });

  /* ───────────── the map ─────────────
     Value noise in three octaves over a 128 by 128 grid, pulled down
     towards the sea at the edges and pushed up under every banner, then
     coloured with the game's map palette and shaded the way the game
     shades a map: a block higher than the one north of it is drawn
     lighter, lower is drawn darker. Water is darker the deeper it is. */
  function drawMap() {
    var cv = document.getElementById('ctMap');
    if (!cv) return;
    var N = 128, r = rng(seedOf('map-0'));
    var lattice = [];
    for (var a = 0; a < 33 * 33; a++) lattice.push(r());
    function lerp(p, q, t) { return p + (q - p) * t; }
    function smooth(t) { return t * t * (3 - 2 * t); }
    function vnoise(x, y, cell) {
      var gx = x / cell, gy = y / cell, x0 = Math.floor(gx), y0 = Math.floor(gy);
      var tx = smooth(gx - x0), ty = smooth(gy - y0);
      function L(i, j) { return lattice[((j % 33) + 33) % 33 * 33 + ((i % 33) + 33) % 33]; }
      return lerp(lerp(L(x0, y0), L(x0 + 1, y0), tx), lerp(L(x0, y0 + 1), L(x0 + 1, y0 + 1), tx), ty);
    }
    var bumps = [];
    document.querySelectorAll('.ct-banner, .ct-player').forEach(function (b) {
      var st = getComputedStyle(b);
      bumps.push([parseFloat(st.getPropertyValue('--x')) / 100 * N, parseFloat(st.getPropertyValue('--y')) / 100 * N]);
    });
    var H = new Float32Array(N * N), F = new Float32Array(N * N);
    for (var y = 0; y < N; y++) for (var x = 0; x < N; x++) {
      var h = vnoise(x, y, 32) * 0.55 + vnoise(x + 7, y + 3, 14) * 0.3 + vnoise(x + 1, y + 11, 6) * 0.15;
      var dx = (x - N / 2) / (N / 2), dy = (y - N / 2) / (N / 2);
      h += 0.06 - Math.max(0, Math.sqrt(dx * dx + dy * dy) - 0.78) * 1.4;  // sea towards the edges
      for (var k = 0; k < bumps.length; k++) {
        var bx = x - bumps[k][0], by = y - bumps[k][1];
        h += Math.max(0, 0.6 - h) * 0.9 * Math.exp(-(bx * bx + by * by) / 60); // dry land, not a mountain, under each banner
      }
      H[y * N + x] = h;
      F[y * N + x] = vnoise(x + 40, y + 40, 9);                          // where the forests are
    }
    var x2 = cv.getContext('2d'), img = x2.createImageData(N, N), d = img.data;
    var C = {
      water: [64, 64, 255], sand: [247, 233, 163], grass: [127, 178, 56],
      forest: [0, 124, 0], stone: [112, 112, 112], snow: [255, 255, 255]
    };
    for (var yy = 0; yy < N; yy++) for (var xx = 0; xx < N; xx++) {
      var i = yy * N + xx, hh = H[i], up = yy > 0 ? H[i - N] : hh, col, shade;
      if (hh < 0.5) {
        col = C.water;
        var depth = 0.5 - hh;
        shade = depth > 0.12 ? 0.53 : depth > 0.05 ? ((xx + yy) % 2 ? 0.71 : 0.86) : 0.86;
        if (depth < 0.02) shade = 1;
      } else {
        col = hh < 0.53 ? C.sand : hh > 0.9 ? C.snow : hh > 0.8 ? C.stone : (F[i] > 0.62 ? C.forest : C.grass);
        var diff = hh - up;
        shade = diff > 0.004 ? 1 : diff < -0.004 ? 0.71 : 0.86;
      }
      d[i * 4] = col[0] * shade; d[i * 4 + 1] = col[1] * shade; d[i * 4 + 2] = col[2] * shade; d[i * 4 + 3] = 255;
    }
    x2.putImageData(img, 0, 0);
  }
  drawMap();

  // the banner and its line in the legend light up together
  function lightUp(n, on) {
    document.querySelectorAll('[data-n="' + n + '"]').forEach(function (el) { el.classList.toggle('is-lit', on); });
  }
  document.querySelectorAll('.ct-legend a, .ct-banner').forEach(function (el) {
    var n = el.dataset.n;
    ['pointerenter', 'focus'].forEach(function (ev) { el.addEventListener(ev, function () { lightUp(n, true); }); });
    ['pointerleave', 'blur'].forEach(function (ev) { el.addEventListener(ev, function () { lightUp(n, false); }); });
  });

  /* ───────────── the splash ───────────── */
  var SPLASHES = [
    'Also try Datapad!', 'Twelve apps shipped!', 'Now with SwiftUI!', '100% CSS, 0 images!',
    'Class of 2028!', 'As seen at WWDC!', 'Seventy-one worlds!', 'Hello there!', 'Made in Irvine!',
    'Press E!', 'Not affiliated with Mojang!', 'Two mods, one camp each!'
  ];
  var splash = document.getElementById('ctSplash');
  if (splash) splash.textContent = SPLASHES[Math.floor(Math.random() * SPLASHES.length)];

  /* ───────────── F3, the sky and the statistics ───────────── */
  var $ = function (id) { return document.getElementById(id); };
  var started = Date.now();
  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  function mmss(ms) { var s = Math.floor(ms / 1000); return Math.floor(s / 60) + ':' + pad(s % 60); }

  function tick() {
    var d = new Date(), h = d.getHours(), m = d.getMinutes();
    var day = Math.floor((d - new Date(d.getFullYear(), 0, 1)) / 86400000) + 1;
    // the game's clock starts at six in the morning: 1,000 ticks an hour
    var ticks = ((h + 18) % 24) * 1000 + Math.floor(m * 1000 / 60);
    var sky = (h >= 20 || h < 5) ? 'night' : (h >= 18 || h < 7) ? 'dusk' : 'day';
    root.dataset.sky = sky;
    var light = sky === 'day' ? 15 : sky === 'dusk' ? 9 : 4;
    if ($('ctTicks')) $('ctTicks').textContent = 'Day ' + day + ' · ' + pad(h) + ':' + pad(m) + ' · time ' + ticks + ' ticks';
    if ($('ctLight')) $('ctLight').textContent = 'Light: ' + light + ' (' + light + ' sky, 0 block)';
    var played = mmss(Date.now() - started);
    if ($('ctPlayed')) $('ctPlayed').textContent = 'Time played: ' + played;
    if ($('ctStatTime')) $('ctStatTime').textContent = played;
  }
  tick(); setInterval(tick, 1000);

  function display() {
    if ($('ctDisplay')) $('ctDisplay').textContent = 'Display: ' + innerWidth + 'x' + innerHeight + ' (window)';
  }
  display(); addEventListener('resize', display);

  // facing: wherever the pointer is, from the middle of the window
  var FACING = [['east', 'Towards positive X'], ['south', 'Towards positive Z'], ['west', 'Towards negative X'], ['north', 'Towards negative Z']];
  addEventListener('pointermove', function (e) {
    var a = Math.atan2(e.clientY - innerHeight / 2, e.clientX - innerWidth / 2);
    var q = (Math.round(a / (Math.PI / 2)) + 4) % 4;
    if ($('ctFacing')) $('ctFacing').textContent = 'Facing: ' + FACING[q][0] + ' (' + FACING[q][1] + ')';
    // the arrow on the map points the same way, measured from the arrow itself
    var pl = $('ctPlayer');
    if (pl) {
      var pr = pl.getBoundingClientRect();
      var ang = Math.atan2(e.clientY - (pr.top + pr.height / 2), e.clientX - (pr.left + pr.width / 2));
      pl.style.setProperty('--r', (ang * 180 / Math.PI + 90) + 'deg');
    }
  }, { passive: true });

  // the targeted block: whichever slot you are pointing at or have focused
  function target(e) {
    var it = e.target.closest && e.target.closest('[data-id]');
    if ($('ctTarget')) $('ctTarget').textContent = 'Targeted Block: ' + (it ? 'minecraft:' + it.dataset.id : 'none');
  }
  document.addEventListener('pointerover', target);
  document.addEventListener('focusin', target);

  // distance scrolled, in blocks (a block is 48px, the size of the ground's),
  // and the experience bar, which fills as you go down the page
  var lastY = scrollY, walked = 0;
  function onScroll() {
    walked += Math.abs(scrollY - lastY); lastY = scrollY;
    if ($('ctStatDist')) $('ctStatDist').textContent = Math.floor(walked / 48) + ' blocks';
    var max = document.documentElement.scrollHeight - innerHeight;
    if ($('ctXp')) $('ctXp').style.width = (max > 0 ? Math.min(100, scrollY / max * 100) : 100) + '%';
  }
  onScroll(); addEventListener('scroll', onScroll, { passive: true });

  /* ───────────── the hotbar ───────────── */
  var bar = $('ctHotbar'), held = $('ctHeld'), heldTimer;
  var slots = bar ? Array.prototype.slice.call(bar.querySelectorAll('a')) : [];
  function select(i, focus) {
    slots.forEach(function (a, k) { a.classList.toggle('is-sel', k === i); });
    if (held && slots[i]) {
      held.textContent = slots[i].dataset.name;
      held.classList.add('is-on');
      clearTimeout(heldTimer);
      heldTimer = setTimeout(function () { held.classList.remove('is-on'); }, 2200);
    }
    if (focus && slots[i]) slots[i].focus({ preventScroll: true });
  }
  slots.forEach(function (a, k) {
    a.addEventListener('pointerenter', function () { select(k); });
    a.addEventListener('focus', function () { select(k); });
  });

  /* ───────────── the game menu ───────────── */
  var pause = $('ctPause');
  function openMenu() { if (pause && !pause.open && pause.showModal) pause.showModal(); }
  if ($('ctEscBtn')) $('ctEscBtn').addEventListener('click', openMenu);
  if (pause) {
    pause.addEventListener('click', function (e) {
      if (e.target === pause || e.target.closest('[data-close]')) pause.close();
      if (e.target.closest('[data-quit]')) { pause.close(); quit(); }
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.key >= '1' && e.key <= '9') { select(+e.key - 1, true); return; }
    if ((e.key === 'e' || e.key === 'E') && !(pause && pause.open)) {
      var inv = $('inv'); if (inv) inv.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
      return;
    }
    // the dialog closes itself on Escape; only open it from the page
    if (e.key === 'Escape' && !(pause && pause.open)) { e.preventDefault(); openMenu(); }
  });

  /* ───────────── the toast ───────────── */
  var toast = $('ctToast');
  if (toast) {
    setTimeout(function () { toast.classList.add('is-on'); }, 700);
    setTimeout(function () { toast.classList.remove('is-on'); }, 6200);
  }

  /* ───────────── save and quit ───────────── */
  function quit() {
    root.classList.add('is-saving');
    var t = $('ctSavingT');
    setTimeout(function () { if (t) t.textContent = 'Saving chunks'; }, 700);
    setTimeout(function () { location.href = '/'; }, reduced ? 600 : 1700);
  }
  if ($('ctQuit')) $('ctQuit').addEventListener('click', quit);
  // coming back with the back button restores the page as it was left,
  // saving screen and all; take it down again
  addEventListener('pageshow', function (e) {
    if (e.persisted) { root.classList.remove('is-saving'); if ($('ctSavingT')) $('ctSavingT').textContent = 'Saving world'; }
  });

  /* smooth scrolling only after load, so back/forward restores the position instantly */
  addEventListener('load', function () {
    requestAnimationFrame(function () { requestAnimationFrame(function () {
      document.documentElement.classList.add('smooth');
    }); });
  });
})();
