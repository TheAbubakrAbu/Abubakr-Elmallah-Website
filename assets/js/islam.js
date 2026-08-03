/* islam.js: renders the mosques and the scholars on /al-islam/.

   Mosques are drawn, not photographed: each one is an SVG elevation built from
   the same parts (facade, arcade, dome, minarets) with a different architectural
   grammar per style: Ottoman semi-domes, Mughal onion domes, Andalusi horseshoe
   arches, Maghribi square minarets, Sahelian mud towers, and so on. Colours come
   from the data file. Scholars get a Rubʿ al-Ḥizb medallion with their name in
   Arabic; no faces, by design.

   Loads AFTER mosques-data.js / scholars-data.js and BEFORE reveal.js. */
(function islam() {
  var M = window.ISL_MOSQUES, S = window.ISL_SCHOLARS;
  var esc = function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); };

  /* ───────────── SVG parts ───────────── */
  var W = 260, GROUND = 138;                       // viewBox width, ground line

  function path(d, fill, extra) {
    return '<path d="' + d + '" fill="' + fill + '"' + (extra || '') + '/>';
  }
  function box(x, y, w, h, fill, extra) {
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="' + fill + '"' + (extra || '') + '/>';
  }

  // dome outlines: cx centre, b base line, r half-width, h height
  function domeD(cx, b, r, h, shape) {
    if (shape === 'tent') return 'M' + (cx - r) + ' ' + b + 'L' + cx + ' ' + (b - h) + 'L' + (cx + r) + ' ' + b + 'Z';
    if (shape === 'hemi') return 'M' + (cx - r) + ' ' + b + 'A' + r + ' ' + h + ' 0 0 1 ' + (cx + r) + ' ' + b + 'Z';
    if (shape === 'ogee') {                        // Persian: bulged, then pointed
      return 'M' + (cx - r) + ' ' + b
        + 'C' + (cx - r * 1.06) + ' ' + (b - h * .44) + ',' + (cx - r * .72) + ' ' + (b - h * .78) + ',' + cx + ' ' + (b - h)
        + 'C' + (cx + r * .72) + ' ' + (b - h * .78) + ',' + (cx + r * 1.06) + ' ' + (b - h * .44) + ',' + (cx + r) + ' ' + b + 'Z';
    }
    return 'M' + (cx - r) + ' ' + b                // onion
      + 'C' + (cx - r * 1.16) + ' ' + (b - h * .48) + ',' + (cx - r * .6) + ' ' + (b - h * .84) + ',' + cx + ' ' + (b - h)
      + 'C' + (cx + r * .6) + ' ' + (b - h * .84) + ',' + (cx + r * 1.16) + ' ' + (b - h * .48) + ',' + (cx + r) + ' ' + b + 'Z';
  }

  function dome(cx, b, r, h, shape, fill, opts) {
    opts = opts || {};
    var s = '';
    if (opts.drum !== false) s += box(cx - r * .92, b - 1, r * 1.84, 6, 'var(--wall)');
    s += path(domeD(cx, b, r, h, shape), fill);
    if (opts.ribs) {                               // Mamluk ribbing
      for (var i = -2; i <= 2; i++) {
        s += '<path d="M' + cx + ' ' + (b - h) + 'Q' + (cx + i * r * .42) + ' ' + (b - h * .5) + ' ' + (cx + i * r * .5) + ' ' + b
          + '" fill="none" stroke="rgba(0,0,0,.22)" stroke-width="1"/>';
      }
    }
    if (opts.finial !== false) {                   // spire + crescent
      var y = b - h;
      s += '<path d="M' + cx + ' ' + y + 'v-' + (opts.spire || 8) + '" stroke="var(--trim)" stroke-width="1.6"/>';
      var cy = y - (opts.spire || 8) - 3;
      s += '<path d="M' + cx + ' ' + (cy - 3.4) + 'a3.4 3.4 0 1 0 0 6.8a2.6 2.6 0 1 1 0-6.8Z" fill="var(--trim)"/>';
    }
    return s;
  }

  // one arch opening: round | pointed | horseshoe
  function archD(x, y, w, h, kind) {
    var r = w / 2, cx = x + r, top = y + r;
    if (kind === 'pointed') {
      return 'M' + x + ' ' + (y + h) + 'V' + top + 'Q' + x + ' ' + (y - 2) + ' ' + cx + ' ' + (y - 4)
        + 'Q' + (x + w) + ' ' + (y - 2) + ' ' + (x + w) + ' ' + top + 'V' + (y + h) + 'Z';
    }
    if (kind === 'horseshoe') {
      var cy = y + r * 1.05;
      return 'M' + (x + 1) + ' ' + (y + h) + 'V' + cy + 'A' + r + ' ' + r + ' 0 1 1 ' + (x + w - 1) + ' ' + cy + 'V' + (y + h) + 'Z';
    }
    return 'M' + x + ' ' + (y + h) + 'V' + top + 'A' + r + ' ' + r + ' 0 0 1 ' + (x + w) + ' ' + top + 'V' + (y + h) + 'Z';
  }

  // a wall with an arcade cut into it
  function facade(x, y, w, h, n, kind, fill) {
    var s = box(x, y, w, h, fill || 'var(--wall)');
    var pitch = w / n, aw = pitch * .58, ah = h * .74;
    for (var i = 0; i < n; i++) {
      s += path(archD(x + pitch * i + (pitch - aw) / 2, y + h - ah, aw, ah, kind), 'var(--arch)');
    }
    return s;
  }

  // minaret styles, all standing on the ground line
  function minaret(x, top, style, cap) {
    var s = '', w;
    cap = cap || 'var(--dome)';
    if (style === 'square') {                      // Maghribi / Andalusi tower
      w = 17;
      s += box(x - w / 2, top, w, GROUND - top, 'var(--wall)');
      s += box(x - w / 2 + 3, top + 12, 3.5, 9, 'var(--arch)');
      s += box(x - w / 2 + w - 6.5, top + 12, 3.5, 9, 'var(--arch)');
      s += box(x - 6, top - 9, 12, 9, 'var(--wall)');
      s += path('M' + (x - 7) + ' ' + (top - 9) + 'L' + x + ' ' + (top - 20) + 'L' + (x + 7) + ' ' + (top - 9) + 'Z', cap);
      s += '<path d="M' + x + ' ' + (top - 20) + 'v-5" stroke="var(--trim)" stroke-width="1.4"/>';
      return s;
    }
    if (style === 'tiered') {                      // Mamluk
      s += box(x - 6, top + 26, 12, GROUND - top - 26, 'var(--wall)');
      s += box(x - 5, top + 12, 10, 15, 'var(--wall)');
      s += box(x - 7.5, top + 24, 15, 2.5, 'var(--trim)');
      s += box(x - 3.5, top, 7, 13, 'var(--wall)');
      s += box(x - 6, top + 10, 12, 2.5, 'var(--trim)');
      s += path(domeD(x, top, 4.5, 7, 'onion'), cap);
      return s;
    }
    if (style === 'chhatri') {                     // Mughal
      s += box(x - 4.5, top + 10, 9, GROUND - top - 10, 'var(--wall)');
      s += box(x - 7, top + 22, 14, 2.5, 'var(--trim)');
      s += box(x - 7, top + 9, 14, 2.5, 'var(--trim)');
      s += path(domeD(x, top + 9, 6, 10, 'onion'), cap);
      s += '<path d="M' + x + ' ' + (top - 1) + 'v-5" stroke="var(--trim)" stroke-width="1.4"/>';
      return s;
    }
    if (style === 'plain') {                       // modern / Persian: slim shaft
      s += box(x - 3.5, top, 7, GROUND - top, 'var(--wall)');
      s += box(x - 5.5, top + 16, 11, 2.5, 'var(--trim)');
      s += box(x - 5, top - 4, 10, 4, 'var(--trim)');
      s += '<path d="M' + x + ' ' + (top - 4) + 'v-6" stroke="var(--trim)" stroke-width="1.3"/>';
      return s;
    }
    if (style === 'mud') {                         // Sahelian: tapering, with toron
      s += path('M' + (x - 8) + ' ' + GROUND + 'L' + (x - 4.5) + ' ' + top + 'L' + (x + 4.5) + ' ' + top + 'L' + (x + 8) + ' ' + GROUND + 'Z', 'var(--wall)');
      for (var i = 0; i < 3; i++) {
        var yy = top + 10 + i * 12;
        s += box(x - 12, yy, 4, 2, 'var(--trim)');
        s += box(x + 8, yy, 4, 2, 'var(--trim)');
      }
      s += '<circle cx="' + x + '" cy="' + (top - 3) + '" r="2.6" fill="var(--trim)"/>';
      return s;
    }
    /* pencil: Ottoman */
    s += box(x - 3, top + 16, 6, GROUND - top - 16, 'var(--wall)');
    s += box(x - 5, top + 14, 10, 3, 'var(--trim)');
    s += box(x - 2.5, top + 2, 5, 13, 'var(--wall)');
    s += path('M' + (x - 3.4) + ' ' + (top + 3) + 'L' + x + ' ' + (top - 13) + 'L' + (x + 3.4) + ' ' + (top + 3) + 'Z', cap);
    s += '<path d="M' + x + ' ' + (top - 13) + 'v-4" stroke="var(--trim)" stroke-width="1.3"/>';
    return s;
  }

  // crenellations along a roof line: Ifrīqiyan and Andalusi walls wear these
  function merlons(x, y, w, n) {
    var s = '', p = w / n;
    for (var i = 0; i < n; i++) s += box(x + p * i + p * .22, y - 4.5, p * .56, 4.5, 'var(--wall)');
    return s;
  }

  // symmetric minaret positions for a given count
  function spots(n) {
    if (n <= 0) return [];
    if (n === 1) return [40];
    if (n === 2) return [34, 226];
    if (n === 3) return [30, 130, 230];
    if (n === 4) return [26, 74, 186, 234];
    return [20, 60, 100, 160, 200, 240];           // six
  }

  function elevation(m) {
    var st = m.style, n = m.minarets, g = '';
    var mn = function (style, top, cap) {
      spots(n === undefined ? 2 : n).forEach(function (x) { g += minaret(x, top, style, cap); });
    };

    if (st === 'kaaba') {
      mn('pencil', 34, 'var(--trim)');
      g += facade(20, 98, 220, 40, 12, 'round');
      g += box(16, 94, 228, 5, 'var(--trim)');
      g += box(102, 62, 56, 4, 'var(--trim)', ' opacity=".7"');    // the ḥaṭīm line above
      g += box(104, 66, 52, 72, '#0c0c0f');                        // the Kaʿbah itself
      g += box(104, 86, 52, 8, 'var(--trim)');                     // kiswah band
      g += box(140, 104, 11, 34, 'var(--trim)', ' opacity=".85"'); // the door
    } else if (st === 'nabawi') {
      mn('pencil', 26, 'var(--trim)');
      g += facade(18, 92, 224, 46, 11, 'round');
      g += box(14, 88, 232, 5, 'var(--trim)');
      for (var i = 0; i < 5; i++) g += dome(46 + i * 42, 88, 11, 12, 'hemi', 'var(--wall)', { drum: false, finial: false });
      g += box(96, 62, 68, 30, 'var(--wall)');
      g += dome(130, 62, 24, 30, 'hemi', 'var(--dome)', { spire: 9 });
    } else if (st === 'aqsa') {
      g += minaret(28, 40, 'square'); g += minaret(236, 46, 'square');
      g += facade(52, 100, 168, 38, 9, 'round');
      g += box(48, 96, 176, 4, 'var(--trim)');
      g += box(150, 74, 62, 26, 'var(--wall)');                // Qiblī Mosque
      g += dome(181, 74, 22, 22, 'hemi', 'var(--dome)', { spire: 6 });
      g += path('M78 100L86 76H124L132 100Z', 'var(--wall)');  // Dome of the Rock drum
      g += dome(105, 76, 19, 20, 'hemi', 'var(--trim)', { drum: false, spire: 7 });
    } else if (st === 'dome-rock') {
      g += box(62, 132, 136, 6, 'var(--trim)', ' opacity=".45"');   // the raised platform
      g += path('M76 132L80 80H180L184 132Z', 'var(--wall)');       // octagon, seen flat on
      for (var d = 0; d < 7; d++) {                                 // the tiled window band
        g += path(archD(88 + d * 12.6, 96, 8, 22, 'pointed'), 'var(--arch)');
      }
      g += box(78, 88, 104, 5, 'var(--trim)', ' opacity=".6"');
      g += box(104, 66, 52, 14, 'var(--wall)');                     // drum
      g += box(102, 64, 56, 4, 'var(--trim)', ' opacity=".7"');
      g += dome(130, 66, 27, 30, 'hemi', 'var(--dome)', { drum: false, spire: 10 });
    } else if (st === 'ifriqiya') {
      g += minaret(46, 26, 'square');
      g += facade(86, 96, 152, 42, 6, 'horseshoe');
      g += merlons(84, 96, 156, 13);
      g += box(84, 92, 156, 4, 'var(--trim)');
      g += dome(214, 92, 15, 15, 'hemi', 'var(--dome)', { ribs: true, spire: 6 });
    } else if (st === 'ottoman') {
      mn('pencil', 18);
      g += facade(52, 100, 156, 38, 7, 'pointed');
      g += dome(84, 100, 26, 18, 'hemi', 'var(--dome)', { drum: false, finial: false });
      g += dome(176, 100, 26, 18, 'hemi', 'var(--dome)', { drum: false, finial: false });
      g += box(96, 76, 68, 26, 'var(--wall)');
      g += dome(130, 76, 36, 34, 'hemi', 'var(--dome)', { spire: 9 });
    } else if (st === 'mughal') {
      mn('chhatri', 30);
      g += facade(60, 98, 140, 40, 5, 'pointed');
      g += path(archD(110, 66, 40, 72, 'pointed'), 'var(--arch)');   // central iwan
      g += box(56, 94, 148, 5, 'var(--trim)');
      g += dome(84, 94, 17, 22, 'onion', 'var(--dome)', { drum: false, spire: 5 });
      g += dome(176, 94, 17, 22, 'onion', 'var(--dome)', { drum: false, spire: 5 });
      g += dome(130, 66, 28, 38, 'onion', 'var(--dome)', { spire: 9 });
    } else if (st === 'mamluk') {
      mn('tiered', 24);
      g += facade(58, 96, 144, 42, 6, 'pointed');
      g += box(54, 92, 152, 5, 'var(--trim)');
      g += dome(130, 92, 24, 30, 'ogee', 'var(--dome)', { ribs: true, spire: 8 });
    } else if (st === 'andalusi') {
      g += minaret(40, 34, 'square');
      g += facade(66, 92, 172, 46, 7, 'horseshoe');
      g += box(62, 88, 180, 5, 'var(--trim)');   // the red voussoir line of the arcade
      g += merlons(62, 88, 180, 15);             // stepped merlons, no dome: this is a hypostyle hall
    } else if (st === 'maghribi') {
      g += minaret(48, 16, 'square');
      g += facade(84, 98, 152, 40, 6, 'horseshoe');
      g += box(80, 94, 160, 5, 'var(--trim)');
      g += path('M84 94L160 76L236 94Z', 'var(--dome)');       // shallow green tiled roof
      g += '<path d="M160 76v-8" stroke="var(--trim)" stroke-width="1.5"/>';
    } else if (st === 'persian') {
      [80, 180].forEach(function (x) { g += minaret(x, 30, 'plain'); });   // flanking the iwan
      g += facade(56, 104, 148, 34, 6, 'pointed');
      g += box(96, 62, 68, 42, 'var(--wall)');                 // iwan portal
      g += path(archD(104, 70, 52, 68, 'pointed'), 'var(--arch)');
      g += box(92, 58, 76, 6, 'var(--trim)');
      g += dome(130, 58, 26, 38, 'ogee', 'var(--dome)', { spire: 9 });
    } else if (st === 'sahel') {
      mn('mud', 52);
      g += box(56, 90, 148, 48, 'var(--wall)');
      for (var k = 0; k < 4; k++) {
        g += path('M' + (66 + k * 36) + ' 90L' + (74 + k * 36) + ' 64L' + (82 + k * 36) + ' 90Z', 'var(--wall)');
        g += '<circle cx="' + (74 + k * 36) + '" cy="61" r="2.4" fill="var(--trim)"/>';
      }
      for (var t = 0; t < 3; t++) {
        g += box(52, 100 + t * 13, 156, 2.5, 'var(--trim)', ' opacity=".6"');
      }
      g += path(archD(120, 104, 22, 34, 'pointed'), 'var(--arch)');
    } else if (st === 'chinese') {
      g += minaret(38, 62, 'square');                          // the pagoda-form minaret
      g += box(64, 100, 132, 38, 'var(--wall)');               // prayer hall
      g += box(92, 112, 18, 26, 'var(--arch)');                // timber doors
      g += box(150, 112, 18, 26, 'var(--arch)');
      g += box(124, 116, 12, 22, 'var(--arch)');
      g += path('M46 104Q130 74 214 104Q130 92 46 104Z', 'var(--dome)');   // lower eaves
      g += box(106, 78, 48, 24, 'var(--wall)');                // upper pavilion
      g += path('M80 82Q130 56 180 82Q130 70 80 82Z', 'var(--dome)');      // upper eaves
      g += '<path d="M130 60v-9" stroke="var(--trim)" stroke-width="1.6"/>';
      g += '<circle cx="130" cy="49" r="2.6" fill="var(--trim)"/>';
    } else if (st === 'gulf') {                    // a crown of small domes, Emirati marble
      mn('plain', 20);
      g += facade(56, 100, 148, 38, 7, 'pointed');
      g += box(52, 96, 156, 4, 'var(--trim)');
      g += merlons(52, 96, 156, 13);
      for (var q = 0; q < 4; q++) g += dome(74 + q * 37, 96, 13, 15, 'onion', 'var(--dome)', { drum: false, finial: false });
      g += box(106, 74, 48, 24, 'var(--wall)');
      g += dome(130, 74, 25, 28, 'onion', 'var(--dome)', { spire: 8 });
    } else if (st === 'slab') {                    // one great shallow dome on a modern block
      g += minaret(40, 18, 'plain');
      g += box(64, 98, 148, 40, 'var(--wall)');
      for (var c = 0; c < 7; c++) g += box(74 + c * 20, 106, 7, 32, 'var(--arch)');
      g += box(60, 94, 156, 5, 'var(--trim)');
      g += dome(138, 94, 46, 32, 'hemi', 'var(--dome)', { drum: false, spire: 8 });
    } else if (st === 'modern') {
      mn('plain', 20);
      g += path('M70 138L130 58L190 138Z', 'var(--dome)');     // tent form
      g += box(84, 118, 92, 20, 'var(--wall)');
      g += box(104, 122, 16, 16, 'var(--arch)');
      g += box(140, 122, 16, 16, 'var(--arch)');
      g += '<path d="M130 58v-9" stroke="var(--trim)" stroke-width="1.6"/>';
    } else {                                                    // 'early'
      mn('pencil', 44);
      g += facade(60, 100, 140, 38, 7, 'round');
      g += box(56, 96, 148, 4, 'var(--trim)');
      g += dome(130, 96, 22, 24, 'hemi', 'var(--dome)', { spire: 7 });
      g += dome(84, 96, 11, 11, 'hemi', 'var(--dome)', { drum: false, finial: false });
      g += dome(176, 96, 11, 11, 'hemi', 'var(--dome)', { drum: false, finial: false });
    }

    return '<svg class="msq-svg" viewBox="0 0 ' + W + ' 150" role="img" aria-label="' + esc(m.name) + '">'
      + '<defs><linearGradient id="msqSky" x1="0" y1="0" x2="0" y2="1">'
      + '<stop offset="0" stop-color="var(--glow)" stop-opacity=".16"/>'
      + '<stop offset="1" stop-color="var(--glow)" stop-opacity="0"/></linearGradient></defs>'
      + '<circle cx="130" cy="118" r="96" fill="url(#msqSky)"/>'
      + g
      + '<rect x="0" y="' + GROUND + '" width="' + W + '" height="2" fill="var(--trim)" opacity=".5"/>'
      + '</svg>';
  }

  function mosqueVars(m) {
    var c = m.colors;
    return '--wall:' + c.wall + ';--dome:' + c.dome + ';--trim:' + c.trim + ';--arch:' + c.arch + ';--glow:' + c.glow;
  }

  /* ───────────── mosque cards ───────────── */
  function holyCard(m) {
    return '<article class="msq-card msq-card--holy reveal" style="' + mosqueVars(m) + '">'
      + '<div class="msq-art">' + elevation(m) + '</div>'
      + '<div class="msq-body">'
      +   '<p class="msq-ar" lang="ar" dir="rtl">' + esc(m.ar) + '</p>'
      +   '<h4>' + esc(m.name) + '</h4>'
      +   '<span class="msq-when">' + esc(m.year) + '</span>'
      +   '<p class="msq-desc">' + esc(m.desc) + '</p>'
      +   '<span class="msq-place">' + esc(m.place) + '</span>'
      +   '<div class="msq-stats">' + (m.stats || []).map(function (s) {
            return '<span><i>' + esc(s[0]) + '</i><b>' + esc(s[1]) + '</b></span>';
          }).join('') + '</div>'
      + '</div>'
      + '</article>';
  }

  function mosqueCard(m) {
    return '<article class="msq-card reveal" style="' + mosqueVars(m) + '">'
      + '<div class="msq-art">' + elevation(m) + '</div>'
      + '<div class="msq-body">'
      +   '<div class="msq-titlerow"><h4>' + esc(m.name) + '</h4><span class="msq-yr">' + esc(m.year) + '</span></div>'
      +   '<p class="msq-ar msq-ar--sm" lang="ar" dir="rtl">' + esc(m.ar) + '</p>'
      +   '<p class="msq-desc">' + esc(m.desc) + '</p>'
      +   (m.note ? '<p class="msq-note">' + esc(m.note) + '</p>' : '')
      +   '<span class="msq-place">' + esc(m.place) + '</span>'
      + '</div>'
      + '</article>';
  }

  var holyRoot = document.getElementById('holyMosques');
  var famRoot = document.getElementById('famousMosques');
  if (holyRoot && M) holyRoot.innerHTML = M.holy.map(holyCard).join('');
  if (famRoot && M) famRoot.innerHTML = M.famous.map(mosqueCard).join('');

  /* ───────────── scholars ───────────── */
  // Rubʿ al-Ḥizb: two overlaid squares, the classic eight-point star
  var STAR = '<svg class="sch-star" viewBox="0 0 100 100" aria-hidden="true">'
    + '<rect x="22" y="22" width="56" height="56" fill="none" stroke="currentColor" stroke-width="1.2"/>'
    + '<rect x="22" y="22" width="56" height="56" fill="none" stroke="currentColor" stroke-width="1.2" transform="rotate(45 50 50)"/>'
    + '<circle cx="50" cy="50" r="34" fill="none" stroke="currentColor" stroke-width=".7" opacity=".55"/>'
    + '</svg>';

  function scholarCard(p) {
    return '<article class="sch-card reveal">'
      + '<div class="sch-medal">' + STAR + '<span class="sch-ar" lang="ar" dir="rtl">' + esc(p.ar) + '</span></div>'
      + '<div class="sch-body">'
      +   '<div class="sch-titlerow"><h4>' + esc(p.name) + '</h4></div>'
      +   '<span class="sch-died">' + esc(p.died) + '</span>'
      +   '<p class="sch-desc">' + esc(p.desc) + '</p>'
      +   (p.work ? '<span class="sch-work">' + esc(p.work) + '</span>' : '')
      +   '<span class="sch-meta">' + esc(p.meta) + '</span>'
      + '</div>'
      + '</article>';
  }

  var schRoot = document.getElementById('scholars');
  if (schRoot && S) {
    /* one generation at a time, opening on the rightly guided caliphs */
    var chips = S.map(function (g, i) {
      return '<button class="chip chip--isl' + (i === 0 ? ' is-active' : '') + '" type="button" data-gen="'
        + g.id + '" data-magnetic>' + esc(g.label) + ' <em>' + g.people.length + '</em></button>';
    }).join('');

    schRoot.innerHTML = '<div class="filters sch-filters reveal">' + chips + '</div>'
      + S.map(function (g, i) {
          return '<section class="sch-group" data-gen="' + g.id + '"' + (i === 0 ? '' : ' hidden') + '>'
            + '<h3 class="subsec subsec--isl reveal">' + esc(g.label)
            +   (g.sahabah ? '<span class="sch-tag sch-tag--sahabah">Ṣaḥābah</span>' : '')
            +   (g.salaf ? '<span class="sch-tag sch-tag--salaf">Salaf</span>' : '')
            +   '<span class="subsec-yr">' + esc(g.note) + '</span>'
            +   '<span class="sch-count">' + g.people.length + '</span>'
            + '</h3>'
            + '<div class="sch-grid">' + g.people.map(scholarCard).join('') + '</div>'
            + '</section>';
        }).join('');

    var groups = schRoot.querySelectorAll('.sch-group');
    schRoot.addEventListener('click', function (e) {
      var btn = e.target.closest('.chip--isl');
      if (!btn) return;
      var gen = btn.dataset.gen;
      schRoot.querySelectorAll('.chip--isl').forEach(function (c) { c.classList.toggle('is-active', c === btn); });
      groups.forEach(function (s) {
        var show = s.dataset.gen === gen;
        s.hidden = !show;
        if (show) s.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
      });
    });
  }
})();

/* the geometric backdrop drifts against the scroll, lattice slower than rosette */
(function islamParallax() {
  var sky = document.querySelector('.isl-sky');
  if (!sky || reduceMotion) return;
  var raf = 0;
  function paint() {
    raf = 0;
    sky.style.setProperty('--sy', (window.scrollY * 0.05).toFixed(1) + 'px');
  }
  addEventListener('scroll', function () { if (!raf) raf = requestAnimationFrame(paint); }, { passive: true });
  paint();
})();
