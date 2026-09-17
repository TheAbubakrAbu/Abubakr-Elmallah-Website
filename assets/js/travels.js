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

    /* "Nov 2007", or just "2006" for an entry with no month. The three `lived`
       entries are the only ones without one: a year somewhere is not dated to a
       month the way a trip is, and concatenating an empty `m` left a leading
       space in the heading and a double space in the aria-label. */
    function whenOf(t) {
      return (t.m ? t.m + ' ' : '') + t.y;
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

    /* ── how you got there ──
       Two ways of travelling and one timeline. The picker at the top of the
       page switches between them, and everything below it -- the figures, the
       map, the index and the trip sections -- answers to the same choice.

       It FILTERS rather than re-renders. Every trip is drawn once, with its
       index into data.trips baked into the markup (`data-i`), and those indices
       have to stay stable: travels-map.js addresses trips by them through
       window.AEtravelSelect, and re-rendering a filtered array would renumber
       every trip underneath it. So the whole page is built as it always was and
       the mode only decides what is SHOWN, which also means switching modes
       costs a class change rather than a rebuild, and a photo grid you have
       already opened is still open when you come back.

       The figures are the one part that cannot be done with a class, because
       "4 countries" is a different sentence in each mode. Those are rewritten
       in applyMode() below from the trips the mode actually contains. */
    var MODES = [
      { k: 'plane', label: 'Plane Travels', hint: 'the ones I flew to' },
      { k: 'road',  label: 'Road Trips', hint: 'the ones I drove to' },
      { k: 'all',   label: 'Everything', hint: 'every trip, however I got there' },
    ];
    /* ORDER MATTERS TWICE HERE. The first entry is what the page opens on, and
       that is Plane Travels on purpose: Everything is the widest view but it is
       not the most useful one to land on, and it is last in the row so it reads
       as the way out of a filter rather than the default state of the page. */
    function inMode(t, mode) {
      return mode === 'all' || (mode === 'road' ? !!t.road : !t.road);
    }

    /* The inside of the "what kind of places" block, for whichever trips the
       mode is showing. Pulled out of show() so applyMode() can rebuild it:
       a Road Trips view that still claims twenty countries, most of them
       across an ocean, is describing trips that are not on the screen.

       Counted off the trips it is handed rather than off data.trips, for the
       same reason the summary is. The note names the mode when it is filtered,
       because "9 countries" with no qualifier reads as a total. */
    function kindStats(trips, mode) {
      var seen = {};
      trips.forEach(function (t) {
        countriesOf(t).forEach(function (c) { seen[c] = 1; });
      });
      var n = Object.keys(seen).length;
      var what = mode === 'road' ? ' I have driven to'
               : mode === 'plane' ? ' I have flown to'
               : '';

      return '<p class="tv-kindnote">' + n + ' countr' + (n === 1 ? 'y' : 'ies') + what
        +   ', counted by what they are rather than by where the plane landed.'
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
          }).join('');
    }

    /* ── the page ── */
    function show() {
      var trips = data.trips;

      /* The figures and the flag wall, for whichever trips the mode is showing.
         Read off the trips it is handed rather than off data.trips, so the same
         function answers for all three modes. `Driven` only appears where it
         says something: in 'all', where it splits the total, and never in the
         two modes that are already nothing but one kind of travel. */
      function summaryOf(rows, mode) {
        var places = {}, years = {}, stops = {}, flags = {};
        rows.forEach(function (t) {
          years[t.y] = 1;
          String(t.countries).split('·').forEach(function (c) {
            c = c.trim(); if (c) places[c] = 1;
          });
          if (t.via) stops[t.via] = 1;
          (t.flags.match(/[\uD83C][\uDDE6-\uDDFF][\uD83C][\uDDE6-\uDDFF]/g) || [])
            .forEach(function (f) { flags[f] = 1; });
        });

        /* Somewhere I lived is not a trip and is not counted as one; it is
           still in `rows`, because it is still on the page and its country
           still belongs in the flag wall and the country count.

           There is no "Driven" figure any more: with the Everything tab gone
           every trip in Road Trips is driven and every trip in Plane Travels
           is not, so the number would only ever have been the trip count again
           or zero. */
        var trps = rows.filter(function (t) { return !t.lived; });
        var lived = rows.length - trps.length;
        var stats = [
          [trps.length, 'Trips'],
          [Object.keys(places).length, 'Countries'],
          [Object.keys(years).length, 'Years'],
          [Object.keys(stops).length, 'Layovers'],
        ];
        if (lived) stats.push([lived, 'Lived in']);

        return '<div class="tv-stats" style="--n:' + stats.length + '">'
          +   stats.map(function (r) {
                return '<div><b>' + r[0] + '</b><span>' + esc(r[1]) + '</span></div>';
              }).join('')
          + '</div>'
          + '<div class="tv-flagwall" aria-label="Countries visited">'
          +   Object.keys(flags).map(function (f) { return '<span>' + f + '</span>'; }).join('')
          + '</div>';
      }

      /* ── the picker ──
         Three buttons, a radiogroup rather than a row of toggles: they are one
         choice with three answers, not three independent switches, and that is
         what a screen reader should be told. */
      var html =
        '<section class="tv-modes reveal">'
        + '<div class="tv-modebar" role="radiogroup" aria-label="How I got there">'
        +   MODES.map(function (m) {
              var rows = data.trips.filter(function (t) { return inMode(t, m.k); });
              var n = rows.filter(function (t) { return !t.lived; }).length;
              var lv = rows.length - n;
              return '<button class="tv-mode" type="button" role="radio" data-mode="' + m.k + '"'
                + ' aria-checked="' + (m.k === 'all' ? 'true' : 'false') + '"'
                + ' tabindex="' + (m.k === 'all' ? '0' : '-1') + '" data-magnetic>'
                + '<b>' + esc(m.label) + '</b>'
                + '<span>' + n + (n === 1 ? ' trip' : ' trips')
                +   (lv ? ' + ' + lv + ' lived' : '') + '</span>'
                + '</button>';
            }).join('')
        + '</div>'
        + '<p class="tv-modehint" id="tvModeHint">' + esc(MODES[0].hint) + '</p>'
        + '</section>';

      html +=
        '<section class="tv-summary reveal" id="tvSummary">'
        + summaryOf(trips, 'all')
        + '</section>';

      /* ── what kind of places ──
         The summary above counts trips and countries; this counts what those
         countries ARE. Every figure overlaps every other one on purpose:
         Morocco is Arab and Muslim and African and Maghreb all at once, so it
         is in four of these rows and that is the point of having them. */
      html += '<section class="tv-kindstats reveal">'
        + '<h2>What kind of places</h2>'
        + '<div id="tvKinds">' + kindStats(trips.filter(function (t) {
            return inMode(t, MODES[0].k);
          }), MODES[0].k) + '</div>'
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
            return '<div class="tv-shortgrp" data-grade="' + esc(g.k) + '">'
              + '<h3><span>' + esc(g.name) + '</span><i></i><em>' + esc(g.years) + '</em></h3>'
              + '<ul>' + rows.map(function (t) {
                  var i = trips.indexOf(t);
                  return '<li data-road="' + (t.road ? '1' : '0') + '">'
                    + '<a href="#trip' + i + '" data-i="' + i + '" style="--c:' + esc(t.c1) + '">'
                    + '<span class="tv-s-flag">' + t.flags + '</span>'
                    + '<span class="tv-s-when">' + esc(t.m) + '</span>'
                    + '<span class="tv-s-place">' + esc(t.places) + '</span>'
                    + (t.road ? '<span class="tv-s-tag tv-s-tag--rd">Road trip</span>' : '')
                    + (t.lived ? '<span class="tv-s-tag tv-s-tag--lv">Lived there</span>' : '')
                    + (t.tag ? '<span class="tv-s-tag">' + esc(t.tag) + '</span>' : '')
                    + (t.via ? '<span class="tv-s-via">via ' + esc(t.via) + '</span>' : '')
                    + '</a></li>';
                }).join('') + '</ul>'
              + '</div>';
          }).join('')
        + '</section>';

      /* ── the cities, read off the photographs and nothing else ──
         years-data.js carries a town-level place under every located photo
         ("Puerto Ayora, Ecuador"), put there by tools/photos.py from the
         original's GPS. A trip's cities are therefore just the distinct places
         its own shots were taken in, in the order they were first taken, which
         means this list can never claim somewhere the camera did not go and
         never needs maintaining by hand.

         What is dropped, and why:
           - the country half after the comma. It is already on the line above.
           - anything with no comma at all. Nominatim answers "Mexico" when it
             has nothing more local, and a city list reading "Mexico" is noise.
           - administrative wrappers. "Municipio de San Felipe" and "Quito
             Canton" are the district, not the town, and the town is usually in
             the list already from another frame.
           - anything already listed, case-insensitively.
         A photo with no place at all contributes nothing: that is either a
         frame the camera did not locate or one of the places on the hide list
         in _originals/places.json, and neither belongs here. */
      var ADMIN = /^(Municipio de |Municipality of |Canton of )|( Canton| Municipality| County| Municipio| District| Governorate| Province)$/;
      function citiesOf(t) {
        var seen = {}, out = [], omit = {};
        (t.citiesOmit || []).forEach(function (c) { omit[String(c).toLowerCase()] = 1; });
        (t.shots || []).forEach(function (f) {
          var row = YP[f];
          var place = row && row[4];
          if (!place) return;
          var cut = place.indexOf(',');
          if (cut < 0) return;
          var city = place.slice(0, cut).trim().replace(ADMIN, '');
          var key = city.toLowerCase();
          if (!city || seen[key]) return;
          /* somewhere a photo passed through rather than somewhere the trip
             went; see `citiesOmit` in travels-data.js */
          if (omit[key]) return;
          seen[key] = 1;
          out.push(city);
        });
        return out;
      }

      /* ── the screen worlds ──
         Filming locations, parks and stores, grouped by franchise. The only
         part of a trip that is not derived from the photographs, so it is the
         only part that can be wrong on its own; see `onscreen` in
         travels-data.js for the rule it is held to instead.

         Rendered after the spots and before the photo grid, because it is the
         answer to "why here" rather than a list of what is here. */
      function onscreenOf(t) {
        var o = t.onscreen;
        if (!o || !o.sets || !o.sets.length) return '';
        return '<div class="tv-screen">'
          + '<h4><span class="tv-screen-k">On screen</span>'
          + (o.lede ? '<i>' + esc(o.lede) + '</i>' : '') + '</h4>'
          + o.sets.map(function (st) {
              return '<section class="tv-set">'
                + '<h5>' + (st.icon ? '<b aria-hidden="true">' + st.icon + '</b>' : '')
                +   esc(st.tag) + '</h5>'
                + '<ul>' + (st.rows || []).map(function (r) {
                    return '<li><b>' + esc(r[0]) + '</b>'
                      + (r[1] ? '<span>' + esc(r[1]) + '</span>' : '')
                      + (r[2] ? '<i>' + esc(r[2]) + '</i>' : '')
                      + '</li>';
                  }).join('') + '</ul>'
                + (st.quote
                    ? '<blockquote>' + esc(st.quote)
                      + (st.by ? '<cite>' + esc(st.by) + '</cite>' : '') + '</blockquote>'
                    : '')
                + '</section>';
            }).join('')
          + '</div>';
      }

      /* ── the country's own outline ──
         travels-shapes.js is generated by tools/shapes.py from Natural Earth
         and keyed by exactly the strings in `countries`, so a trip through two
         countries draws two silhouettes and a trip through a region draws that
         region. A country with no shape drawn simply gets none: the file is
         optional and the page is whole without it. */
      function shapeSvg(name, cls) {
        var sh = window.TRAVELS_SHAPES && window.TRAVELS_SHAPES[name];
        if (!sh) return '';
        var crossed = /is-crossed/.test(cls || '');
        return '<span class="tv-shape ' + esc(cls || '') + '" title="' + esc(name)
          + (crossed ? ' (crossed, no photograph)' : '') + '">'
          + '<svg viewBox="0 0 ' + sh.w + ' ' + sh.h + '" role="img"'
          + ' aria-label="Outline of ' + esc(name) + '" preserveAspectRatio="xMidYMid meet">'
          + '<path d="' + sh.d + '" fill-rule="evenodd"/></svg>'
          + '<i>' + esc(name) + '</i></span>';
      }
      /* ── how big it is, and how many people were in it at the time ──
         One row per country on the trip: its area, and its population in the
         YEAR OF THE TRIP rather than today. See `facts` in travels-data.js for
         where the numbers come from and which of them are contested.

         A trip inside one country (the drives, and Hawaii) gets the state or
         province instead of the country wherever `regions` names one that is
         in the `states` table: "Arizona, 113,990 sq mi" says something about
         that trip and "United States, 3.8 million sq mi" does not.

         A place with no row renders nothing rather than a blank: the table is
         allowed to be incomplete. */
      var FACTS = data.facts || {};
      var STATES = data.states || {};

      function nfmt(n) {
        return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      }
      /* People read "84.3 million" and cannot read "84,276,225". Both are
         shown: the round one as the figure, the exact one in the title. */
      function human(n) {
        if (n >= 1e9) return (n / 1e9).toFixed(n >= 1e10 ? 0 : 1) + ' billion';
        if (n >= 1e6) return (n / 1e6).toFixed(n >= 1e8 ? 0 : 1) + ' million';
        if (n >= 1e3) return nfmt(Math.round(n / 1e3) * 1e3);
        return nfmt(n);
      }

      /* The population in the trip's own year, or the nearest year the table
         has. `exact` is false when it fell back, so the line can say which
         year it is actually quoting instead of implying the trip's. */
      function popAt(row, year) {
        if (!row || !row.pop) return null;
        var ys = Object.keys(row.pop);
        if (!ys.length) return null;
        if (row.pop[year] != null) return { n: row.pop[year], y: year, exact: true };
        var best = ys[0];
        ys.forEach(function (y) {
          if (Math.abs(+y - +year) < Math.abs(+best - +year)) best = y;
        });
        return { n: row.pop[best], y: best, exact: false };
      }

      function factsOf(t) {
        /* The states a trip names in `where` win over its country, because
           they are the more specific true thing: "Arizona, 7.3 million" is
           about the trip and "United States, 342 million" is not. A trip with
           no `where` falls back to its countries, which is every trip abroad. */
        var names = [], seen = {};
        (t.where || []).forEach(function (r) {
          if (STATES[r] && !seen[r]) { seen[r] = 1; names.push([r, STATES[r]]); }
        });
        if (!names.length) {
          countriesOf(t).forEach(function (c) {
            if (FACTS[c] && !seen[c]) { seen[c] = 1; names.push([c, FACTS[c]]); }
          });
        }
        if (!names.length) return '';

        return '<ul class="tv-facts" aria-label="Size and population">'
          + names.map(function (row) {
              var name = row[0], f = row[1];
              var p = popAt(f, t.y);
              return '<li>'
                + '<b>' + esc(name) + '</b>'
                + '<span class="tv-fact"><i>Area</i>' + nfmt(f.area[0]) + ' sq mi'
                +   '<em>' + nfmt(f.area[1]) + ' km²</em></span>'
                + (p
                    ? '<span class="tv-fact" title="' + nfmt(p.n) + ' in ' + esc(p.y) + '">'
                      + '<i>People' + (p.exact ? ' in ' + esc(p.y) : '') + '</i>'
                      + human(p.n)
                      + '<em>' + (p.exact ? 'at the time' : esc(p.y) + ' estimate') + '</em></span>'
                    : '')
                + (f.note ? '<span class="tv-factnote">' + esc(f.note) + '</span>' : '')
                + '</li>';
            }).join('')
          + '</ul>';
      }

      /* The country, then every state or province the trip was actually in.
         A drive across eight states says far more as eight state outlines than
         as one outline of the United States, which is the same picture on
         every domestic trip. The country still leads, so the states are read
         as being inside something.

         `crossed` states are drawn too, in the same row but marked: they are
         the ones with no photograph that the drive cannot not have gone
         through. See `crossed` in travels-data.js for the rule. */
      function shapesOf(t) {
        var svg = String(t.countries).split('\u00b7').map(function (c) {
          return shapeSvg(c.trim());
        }).join('');

        (t.where || []).forEach(function (n) { svg += shapeSvg(n, 'is-state'); });
        (t.crossed || []).forEach(function (n) { svg += shapeSvg(n, 'is-state is-crossed'); });

        return svg ? '<div class="tv-shapes" aria-hidden="false">' + svg + '</div>' : '';
      }

      /* ── the long version: one section per trip, grouped by school year ── */
      html += data.grades.map(function (g) {
        var rows = trips.filter(function (t) { return t.grade === g.k; });
        if (!rows.length) return '';
        return '<section class="tv-grade reveal" data-grade="' + esc(g.k) + '">'
          + '<div class="tv-gradehead">'
          +   '<h2>' + esc(g.name) + '</h2>'
          /* the count is per mode, so applyMode() rewrites this span; the
             number rendered here is the one the page opens on */
          +   '<span>' + esc(g.years) + ' &#183; <i class="tv-gradeN">' + rows.length
          +     (rows.length === 1 ? ' trip' : ' trips') + '</i></span>'
          + '</div>'
          + '</section>'
          + rows.map(function (t) {
              var i = trips.indexOf(t);
              return '<section class="tv-trip reveal" id="trip' + i + '"'
                + ' style="--c1:' + esc(t.c1) + ';--c2:' + esc(t.c2) + '" data-look="' + esc(t.look) + '"'
                + ' data-road="' + (t.road ? '1' : '0') + '"'
                /* Clicking a trip used to pick it out and dim the rest of the
                   page, which was more annoying than useful. Now it shows the
                   trip's photographs instead, which is what the gesture was
                   always reaching for; the handler is delegated from the root
                   further down. Still a <section> and not a <button>: the real
                   control is the cover thumbnail inside it, which carries the
                   aria-expanded and is what a screen reader is handed, and a
                   card full of headings and a paragraph has no business being
                   a button. The map still jumps here by id. */
                + ' data-i="' + i + '">'
                + '<div class="tv-trip-bg" aria-hidden="true"><i></i><i></i><i></i></div>'
                + '<div class="tv-trip-row">'
                + '<div class="tv-trip-in">'
                +   '<div class="tv-trip-head">'
                +     '<span class="tv-trip-flags">' + t.flags + '</span>'
                +     '<span class="tv-trip-when">' + esc(whenOf(t)) + '</span>'
                +     (t.road ? '<span class="tv-trip-tag tv-trip-tag--rd">'
                +       '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 21 9.5 3h5L20 21"/><path d="M12 5v3M12 11v3M12 17v3"/></svg>'
                +       'Road trip</span>' : '')
                +     (t.lived ? '<span class="tv-trip-tag tv-trip-tag--lv">'
                +       '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 11.5 12 4l9 7.5"/><path d="M5 10v10h14V10"/></svg>'
                +       'Lived there</span>' : '')
                +     (t.tag ? '<span class="tv-trip-tag">' + esc(t.tag) + '</span>' : '')
                +   '</div>'
                +   '<h3>' + esc(t.places) + '</h3>'
                +   '<p class="tv-trip-c">' + esc(t.countries)
                +     (t.via ? '<em>via ' + esc(t.via) + '</em>' : '') + '</p>'
                +   shapesOf(t)
                /* how big it is and who was in it, in the year of the trip */
                +   factsOf(t)
                /* Which countries a region-shaped entry actually was. Only
                   here, in the long version: "At a glance" is one line per
                   trip and seven flags would swamp it. Nothing is counted off
                   this -- see `within` in travels-data.js. */
                +   (t.within && t.within.length
                      ? '<ul class="tv-within" aria-label="Countries on this trip">'
                        + t.within.map(function (w) {
                            return '<li><span>' + w[0] + '</span>' + esc(w[1]) + '</li>';
                          }).join('')
                        + '</ul>'
                      : '')
                +   '<p class="tv-trip-n">' + esc(t.note) + '</p>'
                +   (function () {
                      var cs = citiesOf(t);
                      if (!cs.length) return '';
                      return '<p class="tv-cities"><b>Cities</b>'
                        + cs.map(function (c) { return '<span>' + esc(c) + '</span>'; }).join('')
                        + '</p>';
                    })()
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
                +   onscreenOf(t)
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
                   time a trip is unfolded: every trip's worth up front was
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


      /* ── the map's way in ──
         travels-map.js calls this to bring a trip into view when a pin or a
         legend chip is clicked. It used to also select the trip and dim every
         other one; the dimming is gone, so all that is left is the scroll,
         which travels-map.js does itself. This stays defined and does nothing
         so that an older cached copy of that file cannot throw. */
      window.AEtravelSelect = function () {};

      /* ── the mode picker ──
         Everything is already on the page; this only decides what is shown.
         A trip and its index row carry data-road, so hiding is a class on the
         root and one attribute comparison in CSS. The three things CSS cannot
         do are done here: the figures, the per-year counts, and dropping a
         school year whose trips are all in the other mode. */
      var modeBtns = root.querySelectorAll('.tv-mode');
      var summaryEl = root.querySelector('#tvSummary');
      var hintEl = root.querySelector('#tvModeHint');
      var mode = MODES[0].k;

      function applyMode(next) {
        mode = next;
        root.setAttribute('data-mode', mode);

        var shown = data.trips.filter(function (t) { return inMode(t, mode); });
        if (summaryEl) summaryEl.innerHTML = summaryOf(shown, mode);

        /* The kinds block counts what the countries ARE, so it has to be
           recounted from the same trips the rest of the page is showing. */
        var kindsEl = root.querySelector('#tvKinds');
        if (kindsEl) kindsEl.innerHTML = kindStats(shown, mode);

        var m = MODES.filter(function (x) { return x.k === mode; })[0];
        if (hintEl && m) hintEl.textContent = m.hint;

        for (var b = 0; b < modeBtns.length; b++) {
          var on = modeBtns[b].getAttribute('data-mode') === mode;
          modeBtns[b].setAttribute('aria-checked', on ? 'true' : 'false');
          /* one tab stop for the whole group, which is what a radiogroup is */
          modeBtns[b].setAttribute('tabindex', on ? '0' : '-1');
        }

        /* A school year with nothing in it in this mode is hidden outright,
           heading and all, rather than left as an empty bar. The count beside
           the year is rewritten for the same reason: "5 trips" over two is
           worse than no count. */
        data.grades.forEach(function (g) {
          var n = shown.filter(function (t) { return t.grade === g.k; }).length;
          var head = root.querySelector('.tv-grade[data-grade="' + g.k + '"]');
          var grp = root.querySelector('.tv-shortgrp[data-grade="' + g.k + '"]');
          if (head) {
            head.hidden = !n;
            var nEl = head.querySelector('.tv-gradeN');
            if (nEl) nEl.textContent = n + (n === 1 ? ' trip' : ' trips');
          }
          if (grp) grp.hidden = !n;
        });

        /* the map dims the pins the mode is not showing */
        if (window.AEtravelMode) window.AEtravelMode(mode);
      }

      for (var mb = 0; mb < modeBtns.length; mb++) {
        (function (btn) {
          btn.addEventListener('click', function () { applyMode(btn.getAttribute('data-mode')); });
          /* arrow keys move within a radiogroup, which is what makes it one */
          btn.addEventListener('keydown', function (e) {
            var d = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1
                  : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
            if (!d) return;
            e.preventDefault();
            var i = 0;
            for (var k = 0; k < modeBtns.length; k++) if (modeBtns[k] === btn) i = k;
            var nxt = modeBtns[(i + d + modeBtns.length) % modeBtns.length];
            applyMode(nxt.getAttribute('data-mode'));
            nxt.focus();
          });
        })(modeBtns[mb]);
      }
      applyMode(MODES[0].k);

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

      /* Unfold or fold one trip's photographs. `from` is whatever was pressed,
         so a fold can scroll the card back into view rather than leaving you
         somewhere down the page where the grid used to be. */
      function toggleShots(btn, from) {
        if (!picsOn()) return;
        var grid = document.getElementById(btn.getAttribute('aria-controls'));
        if (!grid) return;
        var opening = grid.hidden;
        if (opening) shots(grid);              // first unfold: build it now
        grid.hidden = !opening;
        btn.setAttribute('aria-expanded', opening ? 'true' : 'false');
        /* the rows can only be solved against a measurable width, so the
           maths runs after the unfold, not at render time */
        if (opening) layout();
        else backTo(from || btn);
      }

      for (var p = 0; p < covers.length; p++) {
        (function (btn) {
          btn.addEventListener('click', function (e) {
            e.stopPropagation();
            toggleShots(btn);
          });
        })(covers[p]);
      }

      /* ── THE WHOLE CARD IS THE CONTROL ──
         Touching a trip anywhere shows its photographs, and touching it again
         puts them away. This replaces the old click-to-select, which dimmed the
         page and was more annoying than useful: the gesture people were already
         making now does the thing they actually wanted.

         Delegated from the root rather than bound per card, so it costs one
         listener for the whole page and keeps working for cards the mode
         filter shows later.

         WHAT IT DECLINES TO SWALLOW:
           a real control  the cover thumbnail has its own handler (and calls
                           stopPropagation), a photo in the grid opens the deck,
                           and any link or button must do its own job;
           a selection     dragging across the note to copy it ends in a click,
                           and folding the card away underneath that is
                           infuriating. If anything is selected, do nothing;
           a photo grid    clicking the open grid's own background is not a
                           request to close the card you are looking into. */
      root.addEventListener('click', function (e) {
        if (!picsOn()) return;
        var card = e.target.closest ? e.target.closest('.tv-trip') : null;
        if (!card) return;
        if (e.target.closest('a, button, input, select, textarea, .tv-shots')) return;
        /* A drag to copy text ends in a click, and folding the card away
           underneath that is infuriating. Test the selection's own anchor
           rather than sel.containsNode(): that method is missing or a no-op in
           more than one engine (jsdom returns false for a node that plainly
           contains the range), so relying on it means the guard quietly never
           fires. The anchor node is always present when there is a selection,
           and walking up from it answers the only question that matters. */
        var sel = window.getSelection && window.getSelection();
        if (sel && String(sel).length > 1) {
          var n = sel.anchorNode;
          if (n && n.nodeType === 3) n = n.parentNode;
          if (n && card.contains(n)) return;
        }
        var btn = card.querySelector('.tv-photo');
        if (btn) toggleShots(btn, card);
      });

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
