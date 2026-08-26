/* travels.js: the trips on /travels/.

   No gate any more. It sits at the bottom of the worlds page and nothing on
   it is sensitive, so a password was only ever friction. */
(function travels() {
  try {
    var root = document.getElementById('tvRoot');
    if (!root) return;

    var data = window.TRAVELS;
    if (!data) return;

    function esc(t) {
      return String(t == null ? '' : t)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    /* trip photos live in the year galleries; this page only points at them.
       years-data.js is loaded for the w/h and date of each shot, so the grids
       can be justified before a single image arrives, exactly like years.js */
    var IMG = '/assets/img/years/';
    var LARGE = '/assets/img/years-large/';   // the deck's 2000px copy of the same path
    var YP = {};                       // 'group/file' -> [file, date, w, h, place?]

    /* the src attribute, or rather not: with lazy.js on the page a frame is
       written with data-src and fetched when it is needed, a few at a time,
       nearest the viewport first (same as years.js). Without it, the browser's
       own lazy loading is the fallback. */
    function pic(src) {
      return window.AElazy
        ? 'data-src="' + src + '"'
        : 'src="' + src + '" loading="lazy" fetchpriority="low"';
    }
    if (window.YEARS) {
      Object.keys(window.YEARS.photos).forEach(function (gk) {
        window.YEARS.photos[gk].forEach(function (r) {
          /* a file with a slash in it is already a path from /assets/img/years/
             (one photograph shown in two galleries -- see url() in years.js), so
             it is its own key rather than being nested under this group */
          YP[r[0].indexOf('/') >= 0 ? r[0] : gk + '/' + r[0]] = r;
        });
      });
    }

    /* ── a trip only points at photographs; it does not own them ──

       Every shot here is a path into the year galleries, so a photo pulled out
       of a year (or simply never ingested) leaves a dangling reference. Left
       alone that renders as a broken frame, or a cover button that unfolds into
       nothing, which is worse than the trip having no photos at all.

       So each trip is filtered against what years-data.js actually contains
       before anything is drawn: missing shots are dropped, a missing cover falls
       back to the first surviving shot, and a trip with nothing left simply
       renders without a photo button. Deleting a photo from _originals/ and
       re-running ingest is therefore all that is needed -- this page keeps up on
       its own and never has to be edited in step. */
    function present(f) { return Object.prototype.hasOwnProperty.call(YP, f); }

    var dropped = 0;
    (data.trips || []).forEach(function (t) {
      if (!t.shots) return;
      var n = t.shots.length;
      t.shots = t.shots.filter(present);
      dropped += n - t.shots.length;
      if (t.cover && !present(t.cover)) t.cover = t.shots[0];   // may be undefined: handled below
      if (!t.shots.length) { t.shots = null; t.cover = null; }
    });
    if (dropped && window.console) {
      console.info('travels: ' + dropped + ' photo(s) no longer in the galleries, dropped from the trips');
    }

    var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    function shotDate(path) {          // -> '23 Nov 2022'
      var r = YP[path];
      var m = r && r[1] ? /(\d{4})-(\d{2})-(\d{2})/.exec(r[1])
                        : /(\d{4})-(\d{2})-(\d{2})-\d{4}/.exec(path);
      return m ? +m[3] + ' ' + MONTHS[+m[2] - 1] + ' ' + m[1] : '';
    }

    function reveal(el) {
      if (typeof window.AEreveal === 'function') window.AEreveal(el);
      else {
        var late = el.querySelectorAll('.reveal');
        for (var i = 0; i < late.length; i++) late[i].classList.add('in');
      }
    }

    /* ── what kind of place it was ──
       The badges down the right of every trip and the counts in the block
       under the summary are the SAME data read two ways: travels-data.js
       describes each country exactly once (see `world` there) and both of
       these follow from it. Add a country to a trip and it turns up in the
       badges and in the tallies without either being touched. */
    var WORLD = data.world || {};

    /* Three families, in the order they read on a trip: the continent, then
       who lives there, then the region. Not alphabetical, not by count --
       general to specific, so the pills tell a story down the column. */
    var FAMS = [
      { k: 'cont', label: 'Continents',
        note: 'T\u00fcrkiye is in two of them and counts in both' },
      { k: 'cult', label: 'Who Lives There',
        note: 'Arab = Arabic-speaking \u00b7 Muslim = Muslim-majority' },
      { k: 'reg', label: 'Regions',
        note: 'the specific answer rather than the continental one' },
    ];

    function countriesOf(t) {
      return String(t.countries).split('\u00b7').map(function (c) { return c.trim(); })
        .filter(Boolean);
    }

    /* Every label true of this trip, deduped, in family order. A trip may also
       carry `regions` of its own for something true of the trip and not of the
       whole country: the Caribbean side of Mexico, or Hawaii being Polynesia. */
    function kindsOf(t) {
      var out = [], seen = {};
      function push(label, fam) {
        if (!label || seen[label]) return;
        seen[label] = 1;
        out.push({ label: label, fam: fam });
      }
      FAMS.forEach(function (f) {
        countriesOf(t).forEach(function (c) {
          ((WORLD[c] || {})[f.k] || []).forEach(function (label) { push(label, f.k); });
        });
      });
      (t.regions || []).forEach(function (label) { push(label, 'reg'); });
      return out;
    }

    function kindBadges(t) {
      var ks = kindsOf(t);
      if (!ks.length) return '';
      return '<ul class="tv-kinds" aria-label="What kind of place this was">'
        + ks.map(function (k) {
            return '<li class="tv-kind tv-kind--' + k.fam + '">' + esc(k.label) + '</li>';
          }).join('')
        + '</ul>';
    }

    /* The tallies count COUNTRIES, not trips: three trips to T\u00fcrkiye is one
       Muslim country, not three. Sorted by count and then alphabetically, so
       the block orders itself and no list of labels has to be kept by hand. */
    function kindTally(trips) {
      var tally = {};
      FAMS.forEach(function (f) { tally[f.k] = {}; });
      function add(fam, label, country) {
        var row = tally[fam][label] || (tally[fam][label] = {});
        row[country] = 1;
      }
      trips.forEach(function (t) {
        countriesOf(t).forEach(function (c) {
          FAMS.forEach(function (f) {
            ((WORLD[c] || {})[f.k] || []).forEach(function (label) { add(f.k, label, c); });
          });
          (t.regions || []).forEach(function (label) { add('reg', label, c); });
        });
      });
      return FAMS.map(function (f) {
        return {
          fam: f,
          rows: Object.keys(tally[f.k]).map(function (label) {
            return { label: label, n: Object.keys(tally[f.k][label]).length };
          }).sort(function (a, b) {
            return b.n - a.n || (a.label < b.label ? -1 : a.label > b.label ? 1 : 0);
          }),
        };
      }).filter(function (g) { return g.rows.length; });
    }

    /* ── the page ── */
    function show() {
      var trips = data.trips;

      var places = {}, years = {}, stops = {}, flags = {};
      trips.forEach(function (t) {
        years[t.y] = 1;
        String(t.countries).split('·').forEach(function (c) {
          c = c.trim(); if (c) places[c] = 1;
        });
        if (t.via) stops[t.via] = 1;
        (t.flags.match(/[\uD83C][\uDDE6-\uDDFF][\uD83C][\uDDE6-\uDDFF]/g) || [])
          .forEach(function (f) { flags[f] = 1; });
      });

      /* Road trips sit in the same timeline as the flights (they are trips; the
         only difference is how you got there), so they are counted in `Trips`
         like everything else and get one figure of their own rather than a
         separate list. No road trips on the page means no fifth tile, which is
         why the stats are a list and the column count comes from its length. */
      var driven = trips.filter(function (t) { return t.road; }).length;

      var stats = [
        [trips.length, 'Trips'],
        [Object.keys(places).length, 'Countries'],
        [Object.keys(years).length, 'Years'],
        [Object.keys(stops).length, 'Layovers'],
      ];
      if (driven) stats.push([driven, 'Driven']);

      var html =
        '<section class="tv-summary reveal">'
        + '<div class="tv-stats" style="--n:' + stats.length + '">'
        +   stats.map(function (r) {
              return '<div><b>' + r[0] + '</b><span>' + esc(r[1]) + '</span></div>';
            }).join('')
        + '</div>'
        + '<div class="tv-flagwall" aria-label="Countries visited">'
        +   Object.keys(flags).map(function (f) { return '<span>' + f + '</span>'; }).join('')
        + '</div>'
        + '</section>';

      /* ── what kind of places ──
         The summary above counts trips and countries; this counts what those
         countries ARE. Every figure overlaps every other one on purpose:
         Morocco is Arab and Muslim and African and Maghreb all at once, so it
         is in four of these rows and that is the point of having them. */
      html += '<section class="tv-kindstats reveal">'
        + '<h2>What kind of places</h2>'
        + '<p class="tv-kindnote">' + Object.keys(places).length
        +   ' countries, counted by what they are rather than by where the plane landed.'
        +   ' The rows overlap on purpose: a country is in every one that is true of it,'
        +   ' and repeat visits do not count twice.</p>'
        + kindTally(trips).map(function (g) {
            return '<div class="tv-kindgrp">'
              + '<h3><span>' + esc(g.fam.label) + '</span><i></i><em>' + esc(g.fam.note) + '</em></h3>'
              + '<ul>' + g.rows.map(function (r) {
                  return '<li class="tv-kind tv-kind--' + g.fam.k + '">'
                    + '<b>' + r.n + '</b><span>' + esc(r.label) + '</span></li>';
                }).join('') + '</ul>'
              + '</div>';
          }).join('')
        + '</section>';

      /* ── the map ──
         An empty mount; travels-map.js fills it right after this runs. The
         shell lives here so the section order reads top to bottom in one
         place: summary, map, index, trips. */
      html += '<section class="tv-map reveal">'
        + '<h2>The map</h2>'
        + '<div id="tvMapMount"></div>'
        + '</section>';

      /* ── the short version ──
         Words, not just flags. A one-line-per-trip index you can read in ten
         seconds, grouped the same way as everything below it, with the flag as
         a marker rather than as the content. */
      html += '<section class="tv-short reveal">'
        + '<h2>At a glance</h2>'
        + data.grades.map(function (g) {
            var rows = trips.filter(function (t) { return t.grade === g.k; });
            if (!rows.length) return '';
            return '<div class="tv-shortgrp">'
              + '<h3><span>' + esc(g.name) + '</span><i></i><em>' + esc(g.years) + '</em></h3>'
              + '<ul>' + rows.map(function (t) {
                  var i = trips.indexOf(t);
                  return '<li><a href="#trip' + i + '" data-i="' + i + '" style="--c:' + esc(t.c1) + '">'
                    + '<span class="tv-s-flag">' + t.flags + '</span>'
                    + '<span class="tv-s-when">' + esc(t.m) + '</span>'
                    + '<span class="tv-s-place">' + esc(t.places) + '</span>'
                    + (t.road ? '<span class="tv-s-tag tv-s-tag--rd">Road trip</span>' : '')
                    + (t.tag ? '<span class="tv-s-tag">' + esc(t.tag) + '</span>' : '')
                    + (t.via ? '<span class="tv-s-via">via ' + esc(t.via) + '</span>' : '')
                    + '</a></li>';
                }).join('') + '</ul>'
              + '</div>';
          }).join('')
        + '</section>';

      /* ── the long version: one section per trip, grouped by school year ── */
      html += data.grades.map(function (g) {
        var rows = trips.filter(function (t) { return t.grade === g.k; });
        if (!rows.length) return '';
        return '<section class="tv-grade reveal">'
          + '<div class="tv-gradehead">'
          +   '<h2>' + esc(g.name) + '</h2>'
          +   '<span>' + esc(g.years) + ' &#183; ' + rows.length
          +     (rows.length === 1 ? ' trip' : ' trips') + '</span>'
          + '</div>'
          + '</section>'
          + rows.map(function (t) {
              var i = trips.indexOf(t);
              return '<section class="tv-trip reveal" id="trip' + i + '"'
                + ' style="--c1:' + esc(t.c1) + ';--c2:' + esc(t.c2) + '" data-look="' + esc(t.look) + '"'
                + ' data-i="' + i + '" tabindex="0" role="button" aria-pressed="false"'
                + ' aria-label="' + esc(t.places + ', ' + t.m + ' ' + t.y) + '">'
                + '<div class="tv-trip-bg" aria-hidden="true"><i></i><i></i><i></i></div>'
                + '<div class="tv-trip-row">'
                + '<div class="tv-trip-in">'
                +   '<div class="tv-trip-head">'
                +     '<span class="tv-trip-flags">' + t.flags + '</span>'
                +     '<span class="tv-trip-when">' + esc(t.m + ' ' + t.y) + '</span>'
                +     (t.road ? '<span class="tv-trip-tag tv-trip-tag--rd">'
                +       '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 21 9.5 3h5L20 21"/><path d="M12 5v3M12 11v3M12 17v3"/></svg>'
                +       'Road trip</span>' : '')
                +     (t.tag ? '<span class="tv-trip-tag">' + esc(t.tag) + '</span>' : '')
                +   '</div>'
                +   '<h3>' + esc(t.places) + '</h3>'
                +   '<p class="tv-trip-c">' + esc(t.countries)
                +     (t.via ? '<em>via ' + esc(t.via) + '</em>' : '') + '</p>'
                +   '<p class="tv-trip-n">' + esc(t.note) + '</p>'
                /* The places themselves, read off the photographs rather than
                   from memory: every entry in `spots` is somewhere that is
                   actually in this trip's camera roll. A trip with no spots
                   listed renders nothing here. */
                +   (t.spots && t.spots.length
                      ? '<ul class="tv-spots">'
                        + t.spots.map(function (sp) {
                            return '<li><b>' + esc(sp[0]) + '</b>'
                              + (sp[1] ? '<i>' + esc(sp[1]) + '</i>' : '') + '</li>';
                          }).join('')
                        + '</ul>'
                      : '')
                + '</div>'
                /* what kind of place it was, down the right of the words:
                   continent, then who lives there, then the region. Derived,
                   never typed per trip -- see travels-data.js's `world`. */
                + kindBadges(t)
                /* one main photo beside the words; touching it unfolds the
                   full grid below (and folds it back) */
                + (t.shots && t.shots.length
                    ? '<button class="tv-photo" type="button"'
                      + ' aria-expanded="false" aria-controls="tvshots' + i + '"'
                      + ' aria-label="Photos from ' + esc(t.places) + '">'
                      + '<img ' + pic(IMG + esc(t.cover || t.shots[0]))
                      +   ' alt="' + esc(t.places) + '"'
                      +   ' decoding="async" />'
                      + '<span class="tv-photo-n">' + t.shots.length + '</span>'
                      + '</button>'
                    : '')
                + '</div>'
                /* the grid itself: the same justified rows as the year
                   galleries (.yg / .yg-cell come with years.css), every frame
                   at its own aspect ratio, nothing cropped.

                   Empty on purpose. shots() below writes the frames the first
                   time a trip is unfolded: eighteen trips' worth up front was
                   ~90 <img> tags the page had no use for, all of them built
                   and laid out before anything could be shown. */
                + (t.shots && t.shots.length
                    ? '<div class="tv-shots yg" id="tvshots' + i + '" data-trip="' + i + '" hidden></div>'
                    : '')
                + '</section>';
            }).join('');
      }).join('');

      root.innerHTML = html;
      reveal(root);
      if (window.AElazy) window.AElazy.watch(root);   // the covers are data-src: hand them over


      /* ── selection ──
         Click (or focus and press Enter) a trip to pick it out; the page dims
         everything else so one entry can be read on its own. Clicking the same
         one again clears it, so there is always a way back to the whole list. */
      var cards = root.getElementsByClassName('tv-trip');
      var rows = root.querySelectorAll('.tv-shortgrp a');
      var chosen = -1;

      function select(i, force) {
        chosen = (i === chosen && !force) ? -1 : i;
        root.classList.toggle('is-picking', chosen !== -1);
        for (var c = 0; c < cards.length; c++) {
          var on = Number(cards[c].getAttribute('data-i')) === chosen;
          cards[c].classList.toggle('is-sel', on);
          cards[c].setAttribute('aria-pressed', on ? 'true' : 'false');
        }
        for (var r = 0; r < rows.length; r++) {
          rows[r].classList.toggle('is-sel', Number(rows[r].getAttribute('data-i')) === chosen);
        }
      }

      for (var c2 = 0; c2 < cards.length; c2++) {
        (function (el) {
          var idx = Number(el.getAttribute('data-i'));
          el.addEventListener('click', function () { select(idx); });
          el.addEventListener('keydown', function (e) {
            if (e.target !== el) return;   // a button inside handles its own keys
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(idx); }
          });
        })(cards[c2]);
      }
      /* The index rows still jump via their href; they also set the selection
         so you land on a highlighted entry rather than an anonymous one. */
      for (var r2 = 0; r2 < rows.length; r2++) {
        (function (a) {
          a.addEventListener('click', function () {
            var idx = Number(a.getAttribute('data-i'));
            if (idx !== chosen) select(idx);
          });
        })(rows[r2]);
      }

      /* The map on this page drives the same selection, so it lives on window
         rather than being duplicated there. */
      window.AEtravelSelect = select;

      /* Touching anywhere that is not a trip, the index, the map or the
         photo viewer clears the selection: the background is the way out. */
      document.addEventListener('click', function (e) {
        if (chosen === -1) return;
        if (e.target.closest('.tv-trip, .tv-shortgrp, #tvMapMount, .yg-deck')) return;
        select(chosen);
      });

      /* ── trip photos ──
         The cover card expands into the trip's photos; a photo opens
         full-screen. Same three states as the year galleries, and the
         full-screen deck reuses the yg-deck styles from years.css. Every
         click in here stops propagating so it never doubles as the trip
         card's own select/dim toggle. */
      var deck = document.createElement('div');
      deck.className = 'yg-deck';
      deck.setAttribute('aria-hidden', 'true');
      deck.innerHTML =
          '<button class="yg-x" aria-label="Close">&#10005;</button>'
        + '<button class="yg-prev" aria-label="Previous photo">&#8249;</button>'
        + '<button class="yg-next" aria-label="Next photo">&#8250;</button>'
        + '<figure class="yg-stage"><img alt="" /></figure>'
        + '<div class="yg-bar"><span class="yg-year"></span><span class="yg-date"></span>'
        +   '<span class="yg-place"></span><span class="yg-count"></span></div>';
      document.body.appendChild(deck);

      var stageImg = deck.querySelector('img');
      var elPlace = deck.querySelector('.yg-place');
      var set = [], at = 0, deckTrip = null;
      var pending = null;              // the path whose large copy the stage is waiting on

      /* Same two-step as years.js: the grid's 1000px frame goes on the stage
         at once (it is in the cache), the 2000px copy is fetched behind it and
         put in its place when it lands, and both are shown at one size worked
         out from the photo's proportions so nothing jumps. See fit() and
         swapIn() in years.js for the reasoning; the 1100 is .yg-stage's
         max-width in years.css. */
      function fit(r) {
        if (!r) { stageImg.style.width = stageImg.style.height = ''; return; }
        var cs = getComputedStyle(deck);
        var maxW = Math.min(1100, deck.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight));
        var maxH = parseFloat(getComputedStyle(stageImg).maxHeight);
        if (!(maxH > 0)) maxH = innerHeight - 128;
        var cap = Math.max(r[2], r[3]) < 1000 ? 1 : 2;
        var s = Math.min(maxW / r[2], maxH / r[3], cap);
        stageImg.style.width = Math.round(r[2] * s) + 'px';
        stageImg.style.height = Math.round(r[3] * s) + 'px';
      }
      function swapIn(f) {
        pending = f;
        var big = new Image();
        big.onload = function () { if (pending === f) stageImg.src = LARGE + f; };
        big.src = LARGE + f;
        if (set.length > 1) {
          new Image().src = LARGE + set[(at + 1) % set.length];
          new Image().src = LARGE + set[(at - 1 + set.length) % set.length];
        }
      }

      /* the town, from the year-gallery row (its fifth entry, where ingest
         found one): a Spain trip's frames say Seville, Granada, Toledo */
      function deckShow(i) {
        at = (i + set.length) % set.length;
        var r = YP[set[at]], place = (r && r[4]) || '';
        fit(r);
        stageImg.src = IMG + set[at];
        stageImg.alt = deckTrip.places;
        swapIn(set[at]);
        deck.querySelector('.yg-year').textContent = deckTrip.places;
        deck.querySelector('.yg-date').textContent = shotDate(set[at]);
        elPlace.textContent = place;
        elPlace.hidden = !place;
        deck.querySelector('.yg-count').textContent = (at + 1) + ' / ' + set.length;
      }
      function deckOpen(t, i) {
        deckTrip = t; set = t.shots;
        deck.classList.add('open');
        deck.setAttribute('aria-hidden', 'false');
        document.documentElement.classList.add('intro-lock');
        deckShow(i);
      }
      function deckClose() {
        deck.classList.remove('open');
        deck.setAttribute('aria-hidden', 'true');
        document.documentElement.classList.remove('intro-lock');
        pending = null;
        stageImg.removeAttribute('src');
        stageImg.style.width = stageImg.style.height = '';
      }
      addEventListener('resize', function () { if (deck.classList.contains('open')) fit(YP[set[at]]); });
      deck.querySelector('.yg-x').addEventListener('click', deckClose);
      deck.querySelector('.yg-prev').addEventListener('click', function () { deckShow(at - 1); });
      deck.querySelector('.yg-next').addEventListener('click', function () { deckShow(at + 1); });
      deck.addEventListener('click', function (e) { if (e.target === deck) deckClose(); });
      addEventListener('keydown', function (e) {
        if (!deck.classList.contains('open')) return;
        if (e.key === 'Escape') deckClose();
        else if (e.key === 'ArrowLeft') deckShow(at - 1);
        else if (e.key === 'ArrowRight') deckShow(at + 1);
      });
      var x0 = null;
      deck.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
      deck.addEventListener('touchend', function (e) {
        if (x0 === null) return;
        var dx = e.changedTouches[0].clientX - x0;
        if (Math.abs(dx) > 50) deckShow(at + (dx < 0 ? 1 : -1));
        x0 = null;
      }, { passive: true });

      var grids = root.querySelectorAll('.tv-shots');
      for (var g2 = 0; g2 < grids.length; g2++) {
        grids[g2].addEventListener('click', function (e) {
          e.stopPropagation();
          var b = e.target.closest('button[data-trip]');
          if (b) deckOpen(trips[Number(b.getAttribute('data-trip'))], Number(b.getAttribute('data-s')));
        });
      }

      /* Same rule as the year galleries: the cover photo is always there, but
         the grid behind it only unfolds when "show other pictures" (pics.js) is
         on. Off is the default, and off means the tap does nothing. */
      function picsOn() { return !!(window.AEpics && window.AEpics.on()); }

      /* When a trip folds up, what was below it moves up into the space and
         reads as the page having scrolled down by a gallery. Same answer as
         years.js: if the cover is off screen, put it back on screen in the
         same frame, with no animation; if it is on screen, move nothing. */
      function backTo(cover) {
        var r = cover.getBoundingClientRect();
        var bar = document.querySelector('.topbar');
        var tab = document.querySelector('.tabbar');
        var top = bar ? bar.getBoundingClientRect().bottom : 0;
        var bottom = tab && getComputedStyle(tab).display !== 'none'
          ? tab.getBoundingClientRect().top : innerHeight;
        if (r.top >= top && r.bottom <= bottom) return;
        var html = document.documentElement, was = html.style.scrollBehavior;
        html.style.scrollBehavior = 'auto';
        cover.scrollIntoView({ block: 'center' });
        html.style.scrollBehavior = was;
      }

      /* one trip's frames, written on first unfold */
      function shots(grid) {
        if (grid.dataset.built) return;
        grid.dataset.built = '1';
        var i = Number(grid.getAttribute('data-trip'));
        var t = trips[i];
        grid.innerHTML = t.shots.map(function (f, s) {
          var r = YP[f], w = r ? r[2] : 3, h = r ? r[3] : 2;
          return '<button class="yg-cell" type="button"'
            + ' data-trip="' + i + '" data-s="' + s + '"'
            + ' data-w="' + w + '" data-h="' + h + '">'
            + '<img ' + pic(IMG + esc(f)) + ' alt="' + esc(t.places) + '"'
            +   ' width="' + w + '" height="' + h + '" decoding="async" />'
            + '<span class="yg-when">' + esc(shotDate(f)) + '</span>'
            + '</button>';
        }).join('');
        if (window.AElazy) window.AElazy.watch(grid);
      }

      var covers = root.querySelectorAll('.tv-photo');
      for (var p = 0; p < covers.length; p++) {
        (function (btn) {
          btn.addEventListener('click', function (e) {
            e.stopPropagation();
            if (!picsOn()) return;
            var grid = document.getElementById(btn.getAttribute('aria-controls'));
            var opening = grid.hidden;
            if (opening) shots(grid);            // first unfold: build it now
            grid.hidden = !opening;
            btn.setAttribute('aria-expanded', opening ? 'true' : 'false');
            /* the rows can only be solved against a measurable width, so the
               maths runs after the unfold, not at render time */
            if (opening) layout();
            else backTo(btn);
          });
        })(covers[p]);
      }

      /* Switching it back off folds everything up again, so the page is never
         left showing photos underneath a switch that says it is not. */
      document.addEventListener('ae:pics', function (e) {
        if (e.detail && e.detail.on) return;
        for (var gi = 0; gi < grids.length; gi++) grids[gi].hidden = true;
        for (var ci = 0; ci < covers.length; ci++) covers[ci].setAttribute('aria-expanded', 'false');
        deckClose();
      });

      /* ── justified rows, same maths as years.js ──
         Fill each row left to right, then solve for the one height that lands
         the row exactly on the grid width; the last frame absorbs rounding. */
      var GAP = 10;   // keep in step with --yg-gap in travels.css
      function layout() {
        for (var gi = 0; gi < grids.length; gi++) {
          var grid = grids[gi];
          var W = grid.clientWidth;
          if (!W) continue;
          var target = W < 560 ? 158 : W < 900 ? 200 : 244;
          var row = [], sum = 0;

          function flush(isLast) {
            if (!row.length) return;
            var gaps = GAP * (row.length - 1);
            var h = (W - gaps) / sum;
            if (isLast && h > target * 1.4) h = target;
            var used = 0;
            row.forEach(function (c, ci) {
              var a = +c.dataset.w / +c.dataset.h;
              var w = (isLast && h === target) || ci < row.length - 1
                ? Math.floor(a * h) : (W - gaps - used);
              c.style.width = w + 'px';
              c.style.height = Math.round(h) + 'px';
              used += w;
            });
            row = []; sum = 0;
          }

          Array.prototype.forEach.call(grid.querySelectorAll('.yg-cell'), function (c) {
            row.push(c);
            sum += +c.dataset.w / +c.dataset.h;
            if (sum * target + GAP * (row.length - 1) >= W) flush(false);
          });
          flush(true);
        }
      }
      layout();
      addEventListener('resize', layout);
    }

    show();
  } catch (err) { /* never take the page down with it */ }
})();
