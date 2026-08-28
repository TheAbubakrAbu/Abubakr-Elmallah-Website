/* travels-map.js: the dot-grid world map on /travels/.

   travels.js leaves an empty #tvMapMount in the page; this fills it. The land
   is one <path> of zero-length segments with round caps, which renders a few
   thousand dots without a few thousand DOM nodes. Visited countries get the
   accent, the United States gets its own tone, and every trip gets a pin with
   a flight arc drawn from home in Southern California. */
(function travelsMap() {
  try {
    var M = window.TRAVELS_MAP;
    var mount = document.getElementById('tvMapMount');
    if (!M || !mount) return;

    var CW = 4; /* svg units per grid cell */
    var W = M.cols * CW, H = M.rows * CW;

    /* One pin per stop. Layovers render small and dim, with no arc.
       `e` is the legend chip's flag; the map itself stays drawn, not iconed. */
    var HOME = { name: 'Home · Southern California', lat: 33.64, lon: -117.84 };

    /* `w` is the trip's `when` from travels-data.js, and the colour and the
       jump target are both looked up from it below.

       This used to be a hardcoded `t`, the trip's INDEX in that array, and a
       hardcoded `c` copied from its `c1`. Both were silently wrong the moment
       a trip was inserted anywhere but the end: four trips added at the front
       shifted every index by four, so every pin on the map pointed at the
       wrong entry and the whole thing still rendered without an error. `when`
       is unique per trip and does not move, so a pin can now only be stale by
       naming a trip that does not exist, which reports itself below. */
    var PINS = [
      { name: 'Egypt',             e: '🇪🇬',  lat:  30.04, lon:   31.24, w: '2007 Jan' },
      { name: 'Ensenada',          e: '🇲🇽',  lat:  31.87, lon: -116.60, w: '2018 Aug' },
      { name: 'Puerto Vallarta',   e: '🇲🇽',  lat:  20.62, lon: -105.23, w: '2021 Aug' },
      { name: 'Cancún · Cozumel', e: '🇲🇽',  lat:  20.70, lon:  -86.90, w: '2021 Dec' },
      { name: 'San Felipe',        e: '🇲🇽',  lat:  30.95, lon: -114.75, w: '2022 Feb' },
      { name: 'Türkiye',          e: '🇹🇷',  lat:  41.01, lon:   28.98, w: '2022 Jun' },
      { name: 'La Bufadora',       e: '🇲🇽',  lat:  31.72, lon: -116.72, w: '2022 Jul' },
      { name: 'Spain',             e: '🇪🇸',  lat:  37.18, lon:   -3.60, w: '2022 Nov' },
      { name: 'Morocco',           e: '🇲🇦',  lat:  31.63, lon:   -8.00, w: '2022 Dec' },
      { name: 'Jordan',            e: '🇯🇴',  lat:  30.33, lon:   35.44, w: '2023 Jul' },
      { name: 'Mecca · Medina',   e: '🕋🕌🇸🇦', lat:  21.42, lon:   39.83, w: '2023 Nov' },
      { name: 'Malaysia',          e: '🇲🇾',  lat:   3.14, lon:  101.69, w: '2023 Dec' },
      { name: 'Singapore',         e: '🇸🇬',  lat:   1.35, lon:  103.82, w: '2023 Dec' },
      { name: 'Portugal',          e: '🇵🇹',  lat:  38.72, lon:   -9.14, w: '2024 Apr' },
      { name: 'Italy',             e: '🇮🇹',  lat:  41.90, lon:   12.50, w: '2024 Jul' },
      { name: 'Lebanon',           e: '🇱🇧',  lat:  33.89, lon:   35.50, w: '2024 Jul' },
      { name: 'Tunisia',           e: '🇹🇳',  lat:  36.80, lon:   10.18, w: '2024 Dec' },
      { name: 'Malta',             e: '🇲🇹',  lat:  35.90, lon:   14.51, w: '2025 Apr' },
      { name: 'The Balkans',       e: '🇧🇦',  lat:  43.86, lon:   18.41, w: '2025 Jul' },
      { name: 'Maui',              e: '🌺🇺🇸', lat:  20.80, lon: -156.33, w: '2025 Sep' },
      { name: 'Ecuador',           e: '🇪🇨',  lat:  -0.18, lon:  -78.47, w: '2025 Nov' },
      { name: 'The Galápagos',    e: '🇪🇨',  lat:  -0.75, lon:  -90.31, w: '2025 Nov' },
      { name: 'The Algarve',       e: '🇵🇹🇪🇸', lat:  37.10, lon:   -8.30, w: '2025 Dec' },
      { name: 'Ireland',           e: '🇮🇪',  lat:  53.35, lon:   -6.26, w: '2026 Apr' },
      { name: 'Japan',             e: '🇯🇵',  lat:  35.68, lon:  139.69, w: '2026 Jul' },
    ];
    var LAYOVERS = [
      { name: 'France', lat: 48.85, lon: 2.35 },
      { name: 'England', lat: 51.5, lon: -0.12 },
      { name: 'Switzerland', lat: 47.38, lon: 8.54 },
      { name: 'Qatar', lat: 25.29, lon: 51.53 },
      { name: 'Panama', lat: 9.07, lon: -79.39 },
    ];

    /* Resolve every pin against travels-data.js: `t` is the index its links
       need, `c` is the trip's own c1 so the map and the list below it can
       never disagree about a colour. A pin naming a trip that is not there
       keeps its dot and loses its link rather than throwing. */
    var TRIPS = (window.TRAVELS && window.TRAVELS.trips) || [];
    PINS.forEach(function (p) {
      for (var i = 0; i < TRIPS.length; i++) {
        if (TRIPS[i].when === p.w) { p.t = i; p.c = TRIPS[i].c1; return; }
      }
      p.c = '#9fb6c8';
    });

    /* The geography, named. Lines you can actually point at beat an anonymous
       graticule: the equator runs through Ecuador, which is half the reason
       that trip is on the list, and every trip on this page but one sits
       between the two tropics. The Arctic Circle is left off because it would
       land on top of Alaska and nothing here goes near it. */
    var PARALLELS = [
      { lat: 23.44, name: 'Tropic of Cancer', k: 'trop' },
      { lat: 0, name: 'Equator', k: 'eq' },
      { lat: -23.44, name: 'Tropic of Capricorn', k: 'trop' },
    ];

    function px(lon) { return ((lon - M.lon0) / M.step + 0.5) * CW; }
    function py(lat) { return ((M.lat0 - lat) / M.step + 0.5) * CW; }
    function r1(n) { return Math.round(n * 10) / 10; }

    /* decode the run-length grid into three dot paths */
    var paths = { l: '', u: '', v: '' };
    var i = 0, cell = 0, len = M.rle.length;
    while (i < len) {
      var n = 0;
      while (i < len && M.rle.charCodeAt(i) >= 48 && M.rle.charCodeAt(i) <= 57) {
        n = n * 10 + (M.rle.charCodeAt(i) - 48); i++;
      }
      var ch = M.rle.charAt(i); i++;
      n = n || 1;
      if (ch === '.') { cell += n; continue; }
      for (var k = 0; k < n; k++, cell++) {
        var x = (cell % M.cols) * CW + CW / 2;
        var y = Math.floor(cell / M.cols) * CW + CW / 2;
        paths[ch] += 'M' + x + ' ' + y + 'h.01';
      }
    }

    /* flight arcs: a quadratic lifted toward the pole. When wrapping the date
       line is shorter (Japan, Malaysia, Singapore), the same path is drawn
       twice, once shifted a full map west and once east, so the route exits
       one edge and re-enters the other. */
    var hx = px(HOME.lon), hy = py(HOME.lat);
    function arcD(tx, ty) {
      var mx = (hx + tx) / 2;
      var lift = Math.min(70, Math.abs(tx - hx) * 0.16 + 14);
      return 'M' + r1(hx) + ' ' + r1(hy) + 'Q' + r1(mx) + ' ' + r1(Math.min(hy, ty) - lift)
        + ' ' + r1(tx) + ' ' + r1(ty);
    }
    var arcs = '';
    PINS.forEach(function (p, idx) {
      var tx = px(p.lon), ty = py(p.lat);
      var wrapEast = tx - hx > W / 2;
      var style = ' pathLength="1" data-k="' + p.name + '" style="--i:' + idx + ';--pc:' + p.c + '"';
      if (wrapEast) {
        var d = arcD(tx - W, ty);
        arcs += '<path d="' + d + '"' + style + '/>'
          + '<path d="' + d + '" transform="translate(' + W + ' 0)"' + style + '/>';
      } else {
        arcs += '<path d="' + arcD(tx, ty) + '"' + style + '/>';
      }
    });

    function pinSvg(p, cls) {
      var x = r1(px(p.lon)), y = r1(py(p.lat));
      var anchor = x < 90 ? 'start' : (x > W - 90 ? 'end' : 'middle');
      return '<g class="' + cls + '" data-k="' + p.name + '"'
        + (p.t == null ? '' : ' data-t="' + p.t + '"')
        + ' style="--pc:' + (p.c || '#9fb6c8') + '">'
        + '<circle class="tvm-halo" cx="' + x + '" cy="' + y + '" r="7.5"/>'
        + '<circle class="tvm-hit" cx="' + x + '" cy="' + y + '" r="11"/>'
        + '<circle class="tvm-dot" cx="' + x + '" cy="' + y + '" r="3"/>'
        + '<text x="' + x + '" y="' + (y - 8) + '" text-anchor="' + anchor + '">' + p.name + '</text>'
        + '</g>';
    }

    /* named parallels, drawn behind everything, plus the prime meridian */
    var lines = PARALLELS.map(function (l) {
      var y = r1(py(l.lat));
      return '<g class="tvm-par tvm-par--' + l.k + '">'
        + '<line x1="0" y1="' + y + '" x2="' + W + '" y2="' + y + '"/>'
        + '<text x="10" y="' + (y - 5) + '">' + l.name + '</text>'
        + '</g>';
    }).join('');
    var pm = r1(px(0));
    lines += '<g class="tvm-par tvm-par--pm">'
      + '<line x1="' + pm + '" y1="0" x2="' + pm + '" y2="' + H + '"/>'
      + '<text x="' + (pm + 6) + '" y="' + (H - 8) + '">Prime Meridian</text>'
      + '</g>';

    var svg =
      '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" '
      + 'aria-label="World map with every country visited lit up and flight arcs from Southern California">'
      + '<g class="tvm-pars">' + lines + '</g>'
      + '<path class="tvm-land" d="' + paths.l + '"/>'
      + '<path class="tvm-us" d="' + paths.u + '"/>'
      + '<path class="tvm-vis" d="' + paths.v + '"/>'
      + '<g class="tvm-arcs">' + arcs + '</g>'
      + '<g class="tvm-lay">' + LAYOVERS.map(function (p) { return pinSvg(p, 'tvm-pin tvm-pin--lay'); }).join('') + '</g>'
      + '<g class="tvm-pins">' + PINS.map(function (p) { return pinSvg(p, 'tvm-pin'); }).join('') + '</g>'
      + '<g class="tvm-home" data-k="' + HOME.name + '">'
      +   '<circle class="tvm-halo" cx="' + r1(hx) + '" cy="' + r1(hy) + '" r="12"/>'
      +   '<circle class="tvm-dot" cx="' + r1(hx) + '" cy="' + r1(hy) + '" r="3.4"/>'
      +   '<text x="' + r1(hx) + '" y="' + r1(hy + 15) + '" text-anchor="middle">' + HOME.name + '</text>'
      + '</g>'
      + '</svg>';

    var legend = '<div class="tvm-legend" aria-label="Countries on the map">'
      + PINS.map(function (p) {
          return '<button type="button" data-k="' + p.name + '" data-t="' + p.t + '" style="--pc:' + p.c + '">'
            + '<i></i><span class="tvm-flag" aria-hidden="true">' + (p.e || '') + '</span>' + p.name + '</button>';
        }).join('')
      + '</div>';

    var key = '<div class="tvm-key" aria-hidden="true">'
      + '<span class="tvm-k tvm-k--vis">Visited</span>'
      + '<span class="tvm-k tvm-k--us">United States</span>'
      + '<span class="tvm-k tvm-k--lay">Layover only</span>'
      + '<span class="tvm-k tvm-k--land">Everywhere else, so far</span>'
      + '</div>';

    mount.innerHTML =
      '<div class="tvm-frame"><div class="tvm-pan">' + svg + '</div></div>'
      + '<div class="tvm-zoom">'
      +   '<button type="button" data-zoom="out" aria-label="Zoom out">&#8722;</button>'
      +   '<output class="tvm-lvl" aria-live="polite">1.0&#215;</output>'
      +   '<button type="button" data-zoom="in" aria-label="Zoom in">+</button>'
      +   '<button type="button" data-zoom="reset" class="tvm-reset">Whole world</button>'
      + '</div>'
      + '<p class="tvm-swipe">Drag to move around, and zoom in to read the names</p>'
      + key
      + legend
      + '<p class="tvm-note">Every lit country is a trip further down the page, and every arc starts '
      + 'in Southern California, which is why they all fan out from the same point. Tap a country to '
      + 'jump to it. The routes to Japan and Southeast Asia leave the left edge and come back in on '
      + 'the right, because west across the Pacific is genuinely the short way round. The United '
      + 'States is drawn in its own colour rather than as a destination: I have been all over it, '
      + 'coast to coast, and those trips would need a map of their own. Small faint dots are '
      + 'layovers, which do not count as visits.</p>';

    /* ── zoom ──
       The whole SVG is scaled and the frame scrolls, rather than the viewBox
       being narrowed. Both put the same pixels on screen at the same size, and
       this way ONE number changes: the dots, the arcs, the labels and the pin
       hit areas all grow together, so a country you have zoomed into is
       readable rather than being the same 6 px text over bigger dots. Narrowing
       the viewBox would have meant counter-scaling every font-size and radius
       on every frame to stop them shrinking away, which is a lot of work to
       arrive back where this starts.

       Panning is the frame's own scroll, so it keeps native momentum, native
       scrollbars and the keyboard, and it is what the map already did
       sideways on a phone before there was any zoom at all. */
    var frame = mount.querySelector('.tvm-frame');
    var pan = mount.querySelector('.tvm-pan');
    var lvl = mount.querySelector('.tvm-lvl');
    var MINZ = 1, MAXZ = 8;
    var z = 1;

    function baseW() { return Math.max(frame.clientWidth, 720); }

    /* Keep the point under (ax, ay), in frame coordinates, where it is. */
    function setZoom(nz, ax, ay) {
      nz = Math.max(MINZ, Math.min(MAXZ, nz));
      if (nz === z) return;
      var b = baseW();
      var ox = (frame.scrollLeft + ax) / z;
      var oy = (frame.scrollTop + ay) / z;
      z = nz;
      pan.style.width = (b * z) + 'px';
      frame.scrollLeft = ox * z - ax;
      frame.scrollTop = oy * z - ay;
      frame.classList.toggle('is-zoomed', z > 1);
      frame.classList.toggle('is-labelled', z >= 2);
      /* the divisor the stylesheet holds the type and the pins at, so they
         stay one size on screen while the map grows under them */
      frame.style.setProperty('--z', z);
      if (lvl) lvl.textContent = (Math.round(z * 10) / 10) + '\u00d7';
    }
    function centreZoom(nz) { setZoom(nz, frame.clientWidth / 2, frame.clientHeight / 2); }

    /* A resize changes what 1x means, so the current zoom is re-applied
       against the new base rather than left at a stale pixel width. */
    var reflow;
    window.addEventListener('resize', function () {
      clearTimeout(reflow);
      reflow = setTimeout(function () {
        pan.style.width = z > 1 ? (baseW() * z) + 'px' : '';
      }, 120);
    });

    var zbtns = mount.querySelectorAll('.tvm-zoom button');
    for (var b = 0; b < zbtns.length; b++) {
      (function (btn) {
        btn.addEventListener('click', function () {
          var k = btn.getAttribute('data-zoom');
          if (k === 'in') centreZoom(z * 1.6);
          else if (k === 'out') centreZoom(z / 1.6);
          else { z = 1.0001; centreZoom(1); frame.scrollLeft = 0; frame.scrollTop = 0; }
        });
      })(zbtns[b]);
    }

    /* ctrl/cmd + wheel, which is also what a trackpad pinch sends. A bare
       wheel is left to scroll the page: a map that swallows the scroll wheel
       is a trap on the way past it. */
    frame.addEventListener('wheel', function (e) {
      if (!(e.ctrlKey || e.metaKey)) return;
      e.preventDefault();
      var r = frame.getBoundingClientRect();
      setZoom(z * Math.pow(0.99, e.deltaY), e.clientX - r.left, e.clientY - r.top);
    }, { passive: false });

    frame.addEventListener('dblclick', function (e) {
      var r = frame.getBoundingClientRect();
      setZoom(z >= MAXZ ? 1 : z * 2, e.clientX - r.left, e.clientY - r.top);
    });

    /* Drag to pan, but only once the pointer has actually travelled: a plain
       click has to keep working on the pins underneath, so nothing is
       captured until the movement passes a few pixels. */
    var drag = null;
    frame.addEventListener('pointerdown', function (e) {
      if (e.button) return;
      drag = { x: e.clientX, y: e.clientY, sl: frame.scrollLeft, st: frame.scrollTop, on: false, id: e.pointerId };
    });
    frame.addEventListener('pointermove', function (e) {
      if (!drag || e.pointerId !== drag.id) return;
      var dx = e.clientX - drag.x, dy = e.clientY - drag.y;
      if (!drag.on) {
        if (Math.abs(dx) + Math.abs(dy) < 5) return;
        drag.on = true;
        frame.classList.add('is-dragging');
        if (frame.setPointerCapture) { try { frame.setPointerCapture(e.pointerId); } catch (x) {} }
      }
      frame.scrollLeft = drag.sl - dx;
      frame.scrollTop = drag.st - dy;
    });
    var moved = false;
    function endDrag() {
      if (!drag) return;
      moved = drag.on;
      frame.classList.remove('is-dragging');
      drag = null;
    }
    frame.addEventListener('pointerup', endDrag);
    frame.addEventListener('pointercancel', endDrag);
    /* A drag that happens to end on top of a pin is not a click on that pin:
       the click fires anyway, so it is swallowed here in the capture phase
       before it can reach one and scroll the page to a trip nobody asked for. */
    frame.addEventListener('click', function (e) {
      if (!moved) return;
      moved = false;
      e.stopPropagation();
      e.preventDefault();
    }, true);

    /* Pins and legend chips are the same control in two places: hover or tap to
       light one route up, tap again to release it, and a pin jumps to the trip
       it belongs to so the map doubles as an index. */
    var root = mount;
    var hot = '';
    function heat(k) {
      hot = (k === hot) ? '' : k;
      var gs = root.querySelectorAll('[data-k]');
      for (var g = 0; g < gs.length; g++) {
        gs[g].classList.toggle('is-hot', hot !== '' && gs[g].getAttribute('data-k') === hot);
      }
      root.classList.toggle('is-heating', hot !== '');
    }

    /* jump to the trip entry and select it, if travels.js is on the page */
    function goto(t) {
      if (t == null || t === '') return;
      var card = document.getElementById('trip' + t);
      if (!card) return;
      if (typeof window.AEtravelSelect === 'function') window.AEtravelSelect(Number(t), true);
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    var chips = root.querySelectorAll('.tvm-legend button');
    for (var c = 0; c < chips.length; c++) {
      (function (b) {
        var k = b.getAttribute('data-k');
        b.addEventListener('click', function () { heat(k); goto(b.getAttribute('data-t')); });
        b.addEventListener('mouseenter', function () { if (!hot) heat(k); });
        b.addEventListener('mouseleave', function () { if (hot === k) heat(k); });
      })(chips[c]);
    }

    var pins = root.querySelectorAll('.tvm-pins .tvm-pin');
    for (var q = 0; q < pins.length; q++) {
      (function (g) {
        var k = g.getAttribute('data-k');
        g.addEventListener('click', function () { heat(k); goto(g.getAttribute('data-t')); });
        g.addEventListener('mouseenter', function () { if (!hot) heat(k); });
        g.addEventListener('mouseleave', function () { if (hot === k) heat(k); });
      })(pins[q]);
    }
  } catch (err) { /* the map is decoration; never take the page down */ }
})();
