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
    var YP = {};                       // 'group/file' -> [file, date, w, h]
    if (window.YEARS) {
      Object.keys(window.YEARS.photos).forEach(function (gk) {
        window.YEARS.photos[gk].forEach(function (r) { YP[gk + '/' + r[0]] = r; });
      });
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

      var html =
        '<section class="tv-summary reveal">'
        + '<div class="tv-stats">'
        +   '<div><b>' + trips.length + '</b><span>Trips</span></div>'
        +   '<div><b>' + Object.keys(places).length + '</b><span>Countries</span></div>'
        +   '<div><b>' + Object.keys(years).length + '</b><span>Years</span></div>'
        +   '<div><b>' + Object.keys(stops).length + '</b><span>Layovers</span></div>'
        + '</div>'
        + '<div class="tv-flagwall" aria-label="Countries visited">'
        +   Object.keys(flags).map(function (f) { return '<span>' + f + '</span>'; }).join('')
        + '</div>'
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
                +     (t.tag ? '<span class="tv-trip-tag">' + esc(t.tag) + '</span>' : '')
                +   '</div>'
                +   '<h3>' + esc(t.places) + '</h3>'
                +   '<p class="tv-trip-c">' + esc(t.countries)
                +     (t.via ? '<em>via ' + esc(t.via) + '</em>' : '') + '</p>'
                +   '<p class="tv-trip-n">' + esc(t.note) + '</p>'
                + '</div>'
                /* one main photo beside the words; touching it unfolds the
                   full grid below (and folds it back) */
                + (t.shots && t.shots.length
                    ? '<button class="tv-photo" type="button"'
                      + ' aria-expanded="false" aria-controls="tvshots' + i + '"'
                      + ' aria-label="Photos from ' + esc(t.places) + '">'
                      + '<img src="' + IMG + esc(t.cover || t.shots[0]) + '"'
                      +   ' alt="' + esc(t.places) + '" loading="lazy" />'
                      + '<span class="tv-photo-n">' + t.shots.length + '</span>'
                      + '</button>'
                    : '')
                + '</div>'
                /* the grid itself: the same justified rows as the year
                   galleries (.yg / .yg-cell come with years.css), every frame
                   at its own aspect ratio, nothing cropped. It starts hidden;
                   loading=lazy means a folded grid fetches nothing. */
                + (t.shots && t.shots.length
                    ? '<div class="tv-shots yg" id="tvshots' + i + '" hidden>'
                      + t.shots.map(function (f, s) {
                          var r = YP[f], w = r ? r[2] : 3, h = r ? r[3] : 2;
                          return '<button class="yg-cell" type="button"'
                            + ' data-trip="' + i + '" data-s="' + s + '"'
                            + ' data-w="' + w + '" data-h="' + h + '">'
                            + '<img src="' + IMG + esc(f) + '" alt="' + esc(t.places) + '"'
                            +   ' width="' + w + '" height="' + h + '" loading="lazy" decoding="async" />'
                            + '<span class="yg-when">' + esc(shotDate(f)) + '</span>'
                            + '</button>';
                        }).join('')
                      + '</div>'
                    : '')
                + '</section>';
            }).join('');
      }).join('');

      root.innerHTML = html;
      reveal(root);


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
        + '<div class="yg-bar"><span class="yg-year"></span><span class="yg-date"></span><span class="yg-count"></span></div>';
      document.body.appendChild(deck);

      var stageImg = deck.querySelector('img');
      var set = [], at = 0, deckTrip = null;

      function deckShow(i) {
        at = (i + set.length) % set.length;
        stageImg.src = IMG + set[at];
        stageImg.alt = deckTrip.places;
        deck.querySelector('.yg-year').textContent = deckTrip.places;
        deck.querySelector('.yg-date').textContent = shotDate(set[at]);
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
        stageImg.removeAttribute('src');
      }
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

      var covers = root.querySelectorAll('.tv-photo');
      for (var p = 0; p < covers.length; p++) {
        (function (btn) {
          btn.addEventListener('click', function (e) {
            e.stopPropagation();
            var grid = document.getElementById(btn.getAttribute('aria-controls'));
            var opening = grid.hidden;
            grid.hidden = !opening;
            btn.setAttribute('aria-expanded', opening ? 'true' : 'false');
            /* the rows can only be solved against a measurable width, so the
               maths runs after the unfold, not at render time */
            if (opening) layout();
          });
        })(covers[p]);
      }

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
