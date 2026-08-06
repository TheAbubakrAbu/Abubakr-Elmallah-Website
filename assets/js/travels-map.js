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

    /* One pin per stop. Colours are the trips' own c1 values so the map and
       the list below it agree. Layovers render small and dim, with no arc. */
    var HOME = { name: 'Home · Southern California', lat: 33.64, lon: -117.84 };
    /* t is the index into TRAVELS.trips, so a pin can jump to its entry */
    var PINS = [
      { name: 'Puerto Vallarta', lat: 20.62, lon: -105.23, c: '#e0763a', t: 0 },
      { name: 'Cancún · Cozumel', lat: 20.7, lon: -86.9, c: '#2fc0b0', t: 1 },
      { name: 'Türkiye', lat: 41.01, lon: 28.98, c: '#e03a3a', t: 2 },
      { name: 'Spain', lat: 37.18, lon: -3.6, c: '#e0a83a', t: 3 },
      { name: 'Morocco', lat: 31.63, lon: -8.0, c: '#c9432f', t: 4 },
      { name: 'Jordan', lat: 30.33, lon: 35.44, c: '#c98f4f', t: 5 },
      { name: 'Mecca · Medina', lat: 21.42, lon: 39.83, c: '#d8c68a', t: 6 },
      { name: 'Malaysia', lat: 3.14, lon: 101.69, c: '#3fbf7f', t: 7 },
      { name: 'Singapore', lat: 1.35, lon: 103.82, c: '#3fbf7f', t: 7 },
      { name: 'Portugal', lat: 38.72, lon: -9.14, c: '#4fa8d0', t: 8 },
      { name: 'Italy', lat: 41.9, lon: 12.5, c: '#5fbf6a', t: 9 },
      { name: 'Lebanon', lat: 33.89, lon: 35.5, c: '#5fbf6a', t: 9 },
      { name: 'Tunisia', lat: 36.8, lon: 10.18, c: '#e04a5f', t: 10 },
      { name: 'Malta', lat: 35.9, lon: 14.51, c: '#e8d8a0', t: 11 },
      { name: 'The Balkans', lat: 43.86, lon: 18.41, c: '#7f9fd0', t: 12 },
      { name: 'Maui', lat: 20.8, lon: -156.33, c: '#3fc0a0', t: 13 },
      { name: 'Ecuador', lat: -0.18, lon: -78.47, c: '#f0c840', t: 14 },
      { name: 'Ireland', lat: 53.35, lon: -6.26, c: '#4fbf6f', t: 16 },
      { name: 'Japan', lat: 35.68, lon: 139.69, c: '#e8788f', t: 17 },
    ];
    var LAYOVERS = [
      { name: 'France', lat: 48.85, lon: 2.35 },
      { name: 'England', lat: 51.5, lon: -0.12 },
      { name: 'Switzerland', lat: 47.38, lon: 8.54 },
      { name: 'Qatar', lat: 25.29, lon: 51.53 },
    ];

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
            + '<i></i>' + p.name + '</button>';
        }).join('')
      + '</div>';

    var key = '<div class="tvm-key" aria-hidden="true">'
      + '<span class="tvm-k tvm-k--vis">Visited</span>'
      + '<span class="tvm-k tvm-k--us">United States</span>'
      + '<span class="tvm-k tvm-k--lay">Layover only</span>'
      + '<span class="tvm-k tvm-k--land">Everywhere else, so far</span>'
      + '</div>';

    mount.innerHTML =
      '<div class="tvm-frame">' + svg + '</div>'
      + '<p class="tvm-swipe">Drag the map sideways to reach the rest of it</p>'
      + key
      + legend
      + '<p class="tvm-note">Every lit country is a trip further down the page, and every arc starts '
      + 'in Southern California, which is why they all fan out from the same point. Tap a country to '
      + 'jump to it. The routes to Japan and Southeast Asia leave the left edge and come back in on '
      + 'the right, because west across the Pacific is genuinely the short way round. The United '
      + 'States is drawn in its own colour rather than as a destination: I have been all over it, '
      + 'coast to coast, and those trips would need a map of their own. Small faint dots are '
      + 'layovers, which do not count as visits.</p>';

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
