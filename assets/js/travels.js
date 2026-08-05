/* travels.js: the trips on /travels/.

   No gate any more. It sits at the bottom of the franchises page and nothing on
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
                /* Photos slot in here later: drop a `shots` array on the trip
                   and this fills without touching anything else. */
                +   (t.shots && t.shots.length
                      ? '<div class="tv-shots">' + t.shots.map(function (src) {
                          return '<a href="' + esc(src) + '" target="_blank" rel="noopener">'
                            + '<img src="' + esc(src) + '" alt="' + esc(t.places) + '" loading="lazy" /></a>';
                        }).join('') + '</div>'
                      : '')
                + '</div>'
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

      function select(i) {
        chosen = (i === chosen) ? -1 : i;
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
    }

    show();
  } catch (err) { /* never take the page down with it */ }
})();
