/* fanpage.js: one renderer for all six franchise pages.

   Each page ships a data file that sets window.FAN_PAGE = { sections: [...] };
   this walks it and writes the markup into #fanBody. The look is entirely in
   fanpages.css, scoped by <body data-fan="sw|hp|mcu|mc|potc|jp">, so the same
   five section kinds read completely differently from page to page.

     kind: 'cards'     grid of title / sub / desc / meta cards
     kind: 'lands'     a park land by land, each land listing its rides
     kind: 'works'     the same shelf: every film, book, show and game
     kind: 'rank'      numbered list: films in order, books, phases
     kind: 'timeline'  when → what, stacked down a rule
     kind: 'tiles'     compact colour-chips (legions, spells, ores, stones)
     kind: 'quotes'    pull quotes with an attribution
     kind: 'stats'     a strip of big numbers with a caption
     kind: 'era'       a horizontal rail of eras against a drawn time axis
     kind: 'films'     one-sheet panels: a huge numeral behind the title
     kind: 'sabers'    a rack of lightsabers that ignite on hover / click
     kind: 'links'     outbound cards: where to actually read about the thing
     kind: 'gallery'   screenshots, with a caption under each

   A section may also carry `season: N`, which tags it so a page can react to
   it on scroll (Stranger Things repaints its backdrop season by season).

   A section may carry `symbiote: true`, which tags it so Spider-Man can flip
   the whole page to black-and-white while you are inside it.

   A section may carry `mount: 'end'`, which sends it to #fanBodyEnd instead of
   #fanBody. Star Wars uses that: its planet atlas is hand-written into the page
   between the two, so the Links block still lands underneath it. Pages without
   a #fanBodyEnd just render everything into #fanBody, in order.

   Every item may carry `accent` (a colour) which the CSS picks up as --a.
   Loads AFTER its data file and BEFORE reveal.js. */
(function fanpage() {
  var root = document.getElementById('fanBody');
  var page = window.FAN_PAGE;
  if (!root || !page) return;

  // used inside attributes too (alt, data-label, href), so quotes must go as well
  var esc = function (s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); };
  var a = function (it) { return it.accent ? ' style="--a:' + it.accent + '"' : ''; };

  /* Where a real photograph of mine lives. Every photo these pages show is one
     of the year-gallery files, referenced by its <group>/<file> path -- the
     galleries own the pixels and nothing is copied to a second location.
     See photos-data.js. */
  var PH = '/assets/img/years/';

  /* An empty stand-in for a part this item hasn't got. Cards and tiles share
     the rows of their grid (subgrid, see fanpages.css) so that every tile in a
     row puts its title, sub, description, chips and link on the same lines.
     That only holds while every item renders the SAME sequence of parts, so a
     missing sub or screenshot has to occupy its row rather than vanish. */
  var SLOT = '<span class="fan-slot" aria-hidden="true"></span>';

  /* ── a track you can hear without leaving the page ──
     Hundreds of the links on these pages are YouTube: the albums' own uploads
     of a theme, a recitation, a trailer. Those get a Play button next to the
     link, which drops a player in under the item and takes it away again.

     NOTHING IS HOSTED HERE and nothing is meant to be. These are commercial
     recordings; the file is not mine to put in /assets, and the licence to
     stream one is not something a personal site can buy. The album's own
     upload, played through the embed the rights holder publishes it with, is
     both the legal path and the free one. So this stores no audio, ships no
     audio, and fetches nothing at all until the button is pressed.

     The outbound link stays alongside it: the embed refuses to play for some
     uploads (age-gated, or embedding switched off by the uploader), and when
     that happens the answer has to be a link to the thing itself. */
  var YT = /(?:youtube\.com\/watch\?(?:.*&)?v=|youtu\.be\/|youtube\.com\/embed\/)([A-Za-z0-9_-]{6,})/;
  var ytid = function (href) {
    var m = YT.exec(String(href || ''));
    return m ? m[1] : '';
  };
  /* Set by the first link that turns out to be a track, and read at the bottom
     of this file, so the API script is fetched on the pages that have music
     and on no others. See the player block for why it cannot wait for a click. */
  var wantsApi = false;

  /* optional outbound link on an item: official sites, park pages, a track.
     `href` + `link` is the one-link form. `links: [{ href, label }, ...]` puts
     several on the same row (a s\u016brah in two styles of recitation), wrapped so
     the subgrid still sees one part. */
  var visit = function (href, label) {
    var id = ytid(href);
    if (id) wantsApi = true;
    return (id
        ? '<button class="fan-hear" type="button" data-yt="' + esc(id) + '"'
          + ' data-t="' + esc(label || 'this') + '" aria-pressed="false">'
          + '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>'
          + '<span class="fan-hear-t">Play</span></button>'
        : '')
      + '<a class="fan-visit" href="' + esc(href) + '" target="_blank" rel="noopener">'
      + esc(label || 'Official site') + ' \u2197</a>';
  };
  /* Always wrapped, even when there is one link. Tiles and cards share the rows
     of their grid (subgrid), so every item has to render the SAME NUMBER of
     parts or the columns stop lining up; a Play button beside the link is a
     second element, and unwrapped it took a grid row of its own and stretched
     the full width of the tile. One wrapper, one part, whatever is inside it. */
  var out = function (it) {
    if (it.links && it.links.length) {
      return '<span class="fan-visits">' + it.links.map(function (l) { return visit(l.href, l.label); }).join('') + '</span>';
    }
    if (!it.href) return '';
    return '<span class="fan-visits">' + visit(it.href, it.link) + '</span>';
  };

  /* optional completion stamp. `done: true` is the green hundred-percent chip and
     `hours` rides along inside it; `hours` on its own is a neutral chip that says
     how long I put in WITHOUT claiming I finished it, which is the honest way to
     show a title I have a play time for but never took all the way.

     Deliberately built from <span>s rather than <b>/<i>, because inside a tile
     those two tags already carry the title and sub styling. */
  var done = function (it) {
    if (!it.done && !it.hours) return '';
    if (!it.done) {
      return '<span class="fan-done fan-done--part">'
        + '<span class="fan-done-h">' + esc(it.hours) + ' h played</span></span>';
    }
    return '<span class="fan-done"><span>' + esc(it.done === true ? '100%' : it.done) + '</span>'
      + (it.hours ? '<span class="fan-done-h">' + esc(it.hours) + ' h</span>' : '')
      + '</span>';
  };

  /* `finished`: the date I took a title to a hundred percent, as ISO
     'YYYY-MM-DD' or 'YYYY-MM' when only the month is known.

     Written as ISO rather than as display text so the sort control can order
     on it as a plain string comparison, which for ISO dates is the same as
     ordering by time. Printed with the day when it is known: "Oct 5 2024",
     or "Oct 2024" from a month-only date.

     A title with no date simply carries no chip, and that is not a gap to be
     filled with a guess: Steam's library page records when a game was LAST
     PLAYED, not when it was completed, and the screenshots behind the LEGO
     page were taken in one sitting, so they all read "Today". The dates are
     from my own record of when each one was finished.

     Rendered wherever a game can live: on a tile, on a card in a section
     that opts in with `chips: true` (the row is part of the card subgrid, so
     it is all or nothing per section, like `been`), and in a screenshot's
     caption. */
  var MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
             'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  var fin = function (it) {
    if (!it.finished) return '';
    var p = String(it.finished).split('-');
    var when = p.length >= 2 && +p[1] >= 1 && +p[1] <= 12
      ? MON[+p[1] - 1] + (p.length >= 3 && +p[2] >= 1 ? ' ' + (+p[2]) : '') + ' ' + p[0]
      : p[0];
    return '<span class="fan-fin"><i aria-hidden="true">✓</i>'
      + '<span class="fan-fin-l">Finished</span>'
      + '<span class="fan-fin-v">' + esc(when) + '</span></span>';
  };

  /* `proj`: how long a thing is reckoned to take, from an outside source. On an
     item I have actually finished it also prints the gap between that estimate
     and my own time, which is the entire point of carrying it. */
  var proj = function (it) {
    if (it.proj == null) return '';
    var p = parseFloat(it.proj), h = parseFloat(it.hours);
    var gap = (it.done && !isNaN(h) && !isNaN(p)) ? h - p : null;
    return '<span class="fan-proj">'
      + '<span class="fan-proj-v">~' + esc(it.proj) + ' h</span>'
      + (gap === null
          ? '<span class="fan-proj-l">projected</span>'
          : '<span class="fan-proj-d ' + (gap <= 0 ? 'is-under' : 'is-over') + '">'
            + (gap <= 0 ? '−' : '+') + Math.abs(gap).toFixed(1) + ' h</span>')
      + '</span>';
  };

  /* `rating`: mine, out of ten, on an item. The bar behind the figure is the
     score itself, so a column of these reads as a ranking at a glance without
     having to compare the numbers one by one. */
  var rate = function (it) {
    var r = parseFloat(it.rating);
    if (it.rating == null || isNaN(r)) return '';
    // a whole-number score prints whole: "10/10" reads better than "10.0/10"
    return '<span class="fan-rate" style="--pct:' + Math.max(0, Math.min(100, r * 10)).toFixed(0) + '%">'
      + '<span class="fan-rate-v">' + (r % 1 ? r.toFixed(1) : r) + '</span>'
      + '<span class="fan-rate-o">/10</span></span>';
  };


  /* A section may carry `sortable`, which puts an order control above its tiles.
     Two independent axes: WHAT to sort on, and WHICH WAY.

       sortable: { label, by: [ { key, label, asc, desc }, \u2026 ] }

     Each `by` entry names an item field and the words for its two directions,
     which differ per field (oldest/newest reads wrong for a duration). Those
     words ride on the key button as data-asc / data-desc, so picking a new key
     relabels the direction buttons with no shared state to keep in sync.

     The single-key shorthand `sortable: { key, asc, desc }` still works.

     `authored: 'asc'` says the data file is written earliest-first. Ties fall
     back to the authored position, mirrored with the direction, and that
     mirroring assumes the newest-first order TT Games list their catalogue
     in; a list written the other way round (the Star Wars themes, in
     timeline order) would otherwise have its ties read backwards. */
  var sortBy = function (s) {
    if (!s.sortable) return [];
    return s.sortable.by || [{ key: s.sortable.key || 'year', label: s.sortable.label,
      asc: s.sortable.asc, desc: s.sortable.desc }];
  };

  var sorter = function (s) {
    var by = sortBy(s);
    if (!by.length) return '';
    var first = by[0];
    /* Which way round the section OPENS. Ascending suits a year (the catalogue
       should read forwards from 2005) and descending suits a score (nobody
       wants a ratings list that opens on the worst one), so the first `by`
       entry says which it wants and everything else defaults to ascending. */
    var open = first.dir === 'desc' ? 'desc' : 'asc';
    return '<span class="fan-sortset" role="group" aria-label="Sort by">'
      + '<span class="fan-sort-k">' + esc(s.sortable.label || 'Sort') + '</span>'
      + by.map(function (b, i) {
          return '<button class="fan-sortbtn' + (i ? '' : ' is-on') + '" type="button"'
            + ' data-key="' + esc(b.key) + '"'
            + ' data-asc="' + esc(b.asc || 'Ascending') + '"'
            + ' data-desc="' + esc(b.desc || 'Descending') + '"'
            + ' aria-pressed="' + (i ? 'false' : 'true') + '">' + esc(b.label || b.key) + '</button>';
        }).join('')
      + '</span>'
      + '<span class="fan-sortset" role="group" aria-label="Sort direction" data-open="' + open + '">'
      + ['asc', 'desc'].map(function (d, i) {
          return '<button class="fan-sortbtn fan-sortdir' + (d === open ? ' is-on' : '') + '" type="button"'
            + ' data-dir="' + d + '" aria-pressed="' + (d === open ? 'true' : 'false') + '">'
            + '<i aria-hidden="true">' + (i ? '\u2193' : '\u2191') + '</i>'
            + '<span>' + esc(first[d] || (i ? 'Descending' : 'Ascending')) + '</span></button>';
        }).join('')
      + '</span>';
  };

  /* A section may carry `groupable: { key, label, on, open }`, which puts an
     Off/On switch beside the sort control. On, the tiles fold into labelled
     sections, one per distinct value of `key` on the items ('Star Wars',
     'Batman & DC', 'Standalone'). Grouping composes with the sort rather than
     replacing it: tiles keep the active order inside their section, and the
     sections themselves run in order of their best-placed tile, so sorting by
     rating ranks the licences by their best game.

     `open: 'on'` opens the section already grouped, the way `dir` opens a
     sort descending: right for a list whose sections are the point of it
     (the themes by trilogy and show) and wrong for a catalogue. */
  var grouper = function (s) {
    if (!s.groupable) return '';
    var open = s.groupable.open === 'on' ? 'on' : 'off';
    return '<span class="fan-sortset fan-groupset" role="group" aria-label="Group" data-open="' + open + '">'
      + ['off', 'on'].map(function (m) {
          return '<button class="fan-sortbtn' + (m === open ? ' is-on' : '') + '" type="button"'
            + ' data-gmode="' + m + '" aria-pressed="' + (m === open ? 'true' : 'false') + '">'
            + esc(m === 'on' ? (s.groupable.on || 'On') : 'Off') + '</button>';
        }).join('')
      + '</span>';
  };

  /* A section may also carry `views: true`, which puts a grid/list switch beside
     the sort control. The two views show DIFFERENT amounts of the same tiles
     rather than different data: grid is the colour banner, the title and the
     numbers, and list opens each row out full width with its screenshot next to
     it. Grid is the default because thirty tiles at once is the point of it. */
  var VIEWS = [
    { k: 'grid', label: 'Grid', icon: '<rect x="3" y="3" width="7" height="7" rx="1.4"/><rect x="14" y="3" width="7" height="7" rx="1.4"/><rect x="3" y="14" width="7" height="7" rx="1.4"/><rect x="14" y="14" width="7" height="7" rx="1.4"/>' },
    { k: 'list', label: 'List', icon: '<rect x="3" y="4.5" width="18" height="5" rx="1.4"/><rect x="3" y="14.5" width="18" height="5" rx="1.4"/>' },
  ];

  var viewer = function (s) {
    if (!s.views) return '';
    // icon-only buttons: the two glyphs say grid/list better than the words did
    return '<span class="fan-sortset fan-viewset" role="group" aria-label="View">'
      + '<span class="fan-sort-k">View</span>'
      + VIEWS.map(function (v, i) {
          return '<button class="fan-sortbtn fan-viewbtn' + (i ? '' : ' is-on') + '" type="button"'
            + ' data-view="' + v.k + '" aria-label="' + v.label + ' view"'
            + ' aria-pressed="' + (i ? 'false' : 'true') + '">'
            + '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' + v.icon + '</svg>'
            + '</button>';
        }).join('')
      + '</span>';
  };

  /* `tally: true` (or a caption string) counts how many items are `done` out of
     how many there are, as a pill on the controls row. Counted from the data at
     render time rather than written down, so it cannot drift from the list. */
  var tally = function (s) {
    if (!s.tally || !s.items) return '';
    var fin = s.items.filter(function (it) { return it.done; });
    var pill = '<span class="fan-tally"><b>' + fin.length + '</b><em>/</em><b>' + s.items.length + '</b>'
      + '<i>' + esc(s.tally === true ? 'completed' : s.tally) + '</i></span>';

    /* Second pill: my total against the projected total, over the finished ones
       only, since an unfinished title has no time of mine to weigh against. */
    var mine = 0, est = 0, n = 0;
    fin.forEach(function (it) {
      var h = parseFloat(it.hours), p = parseFloat(it.proj);
      if (!isNaN(h) && !isNaN(p)) { mine += h; est += p; n++; }
    });
    /* Third pill: the average of my own ratings across the whole list, so the
       column of scores has a middle to be read against. Over every rated item,
       not just the finished ones; an unfinished game still gets a rating. */
    var scores = s.items.map(function (it) { return parseFloat(it.rating); })
      .filter(function (r) { return !isNaN(r); });
    var avg = scores.length
      ? '<span class="fan-tally fan-tally--rate"><b>'
        + (scores.reduce(function (t, r) { return t + r; }, 0) / scores.length).toFixed(1) + '</b>'
        + '<i>average of my ' + scores.length + ' ratings</i></span>'
      : '';

    if (!n) return pill + avg;
    var gap = mine - est;
    return pill + '<span class="fan-tally fan-tally--time"><b>' + mine.toFixed(1) + ' h</b>'
      + '<i>' + (gap <= 0 ? '−' : '+') + Math.abs(gap).toFixed(0) + ' h vs ' + est.toFixed(0) + ' projected</i></span>'
      + avg;
  };

  var controls = function (s) {
    var bar = sorter(s) + grouper(s) + viewer(s) + tally(s);
    return bar ? '<div class="fan-sort reveal">' + bar + '</div>' : '';
  };

  /* ── "I went here" ──
     A seventh row on a card, carrying the stamp for a place I have actually
     been and, under it, my own photograph from there.

     One row rather than two so the subgrid stays simple: a section that opts
     in with `been: true` spans 7 instead of 6 (see .fan-cards--been in
     fanpages.css) and EVERY card in it emits this part, empty or not, which is
     what keeps the rows of a grid in step.

     `photo` is a <group>/<file> path into the year galleries. `beenWhen` is
     the year I went, printed small beside the stamp. */
  var beenRow = function (it) {
    if (!it.been && !it.photo) return SLOT;
    var stamp = it.been
      ? '<span class="fan-been"><i aria-hidden="true">✓</i>I went here'
        + (it.beenWhen ? '<em>' + esc(it.beenWhen) + '</em>' : '') + '</span>'
      : '';
    var pic = it.photo
      ? '<a class="fan-beenpic" href="' + PH + esc(it.photo) + '" target="_blank" rel="noopener">'
        + '<img src="' + PH + esc(it.photo) + '"'
        + ' alt="Abubakr Elmallah at ' + esc(it.photoAlt || it.title) + '"'
        + ' loading="lazy" decoding="async" fetchpriority="low" />'
        + (it.photoCap ? '<span>' + esc(it.photoCap) + '</span>' : '')
        + '</a>'
      : '';
    return '<span class="fan-beenwrap">' + stamp + pic + '</span>';
  };

  /* the shelf: a grid of cards where each card carries a LIST, which is the
     part none of the other kinds has room for. `lands` fills it with the rides
     in a park, `works` with the films, books, shows and games in a franchise;
     the shape is identical, so it is written once.

     `key` is the property each item keeps its list under, `unit` the word the
     count under a card is set in unless the item overrides it. The dotted
     leader between a row's name and its year is drawn by the CSS, not written
     here, so a long title simply eats into it. */
  var shelf = function (s, key, unit) {
    var kind = key === 'rides' ? '' : ' is-works';
    return '<div class="fan-lands' + kind + '">' + s.items.map(function (it) {
      var rows = it[key] || it.rides || it.rows || [];
      var u = it.unit || unit;
      return '<article class="fan-land reveal"' + a(it) + '>'
        + '<span class="fan-land-bar" aria-hidden="true"></span>'
        + '<span class="fan-land-head">'
        +   '<h4>' + esc(it.title) + '</h4>'
        +   (it.sub ? '<span class="fan-land-sub">' + esc(it.sub) + '</span>' : '')
        + '</span>'
        + (it.desc ? '<p class="fan-land-desc">' + esc(it.desc) + '</p>' : '')
        + (rows.length
            ? '<ol class="fan-rides">' + rows.map(function (r) {
                return '<li class="fan-ride' + (r.big ? ' is-big' : '')
                  + (r.gone ? ' is-gone' : '') + '">'
                  + '<b>' + esc(r.n) + '</b>'
                  + '<i>' + esc(r.gone || r.y || '') + '</i>'
                  + '</li>';
              }).join('') + '</ol>'
            : '')
        + (rows.length ? '<span class="fan-land-count">' + rows.length + ' '
            + esc(u) + (rows.length === 1 || /s$/.test(u) ? '' : 's') + '</span>' : '')
        + '</article>';
    }).join('') + '</div>';
  };

  var KINDS = {
    cards: function (s) {
      /* `been: true` on the SECTION turns the seventh row on for all of its
         cards; without it nothing changes and the grid spans 6 as before.
         `chips: true` does the same for the completion row (the hundred
         percent stamp, the finish date, hours, rating), between the text and
         the link. Both are per section, never per card, because every card
         in a row has to emit the same parts for the subgrid to keep them in
         step (see .fan-cards--chips in fanpages.css). */
      var wantsBeen = !!s.been, wantsChips = !!s.chips;
      return '<div class="fan-cards' + (wantsBeen ? ' fan-cards--been' : '')
        + (wantsChips ? ' fan-cards--chips' : '') + '">'
        + s.items.map(function (it) {
        var ch = wantsChips ? rate(it) + done(it) + fin(it) + proj(it) : '';
        return '<article class="fan-card reveal"' + a(it) + '>'
          + (it.tag ? '<span class="fan-tag">' + esc(it.tag) + '</span>' : SLOT)
          + '<h4>' + esc(it.title) + '</h4>'
          + (it.sub ? '<span class="fan-sub">' + esc(it.sub) + '</span>' : SLOT)
          + (it.desc ? '<p>' + esc(it.desc) + '</p>' : SLOT)
          + (wantsChips ? (ch ? '<span class="fan-chips">' + ch + '</span>' : SLOT) : '')
          + (out(it) || SLOT)
          + (it.meta ? '<span class="fan-meta">' + esc(it.meta) + '</span>' : SLOT)
          + (wantsBeen ? beenRow(it) : '')
          + '</article>';
      }).join('') + '</div>';
    },

    /* ── kind: works ── the same shelf, holding a franchise instead of a park.
       Each item is a MEDIUM (the films, the books, the shows, the games) and
       its rows are the works themselves, so a page can list everything the
       thing has ever been without turning into forty cards.

       A row is { n: title, y: year } and takes the same two flags:
         big: true   one of mine, set heavier with a marker beside it
         gone: '...' printed in place of the year and struck through: a
                     cancelled game, a series that ended, a book never
                     finished.
       `unit` names what the group counts ('films', 'books'), since a shelf
       that says "12 attractions" under the novels would be nonsense. */
    works: function (s) { return shelf(s, 'rows', 'work'); },

    /* ── kind: lands ── one theme park, taken apart. Each item is a LAND:
       its name, the year it opened, a line on what it is for, and then every
       ride inside it. Same shelf as `works`; a ride carries `gone` when it is
       no longer standing, because a park is partly a record of what it used
       to have, and because I have photographs of a couple of those. */
    lands: function (s) { return shelf(s, 'rides', 'attraction'); },

    rank: function (s) {
      return '<ol class="fan-rank">' + s.items.map(function (it, i) {
        return '<li class="fan-rankrow reveal"' + a(it) + '>'
          + '<span class="fan-num">' + esc(it.num || (i + 1 < 10 ? '0' + (i + 1) : i + 1)) + '</span>'
          + '<span class="fan-rankbody">'
          +   '<span class="fan-rankhead"><b>' + esc(it.title) + '</b>'
          +     (it.sub ? '<i>' + esc(it.sub) + '</i>' : '') + '</span>'
          +   (it.desc ? '<span class="fan-rankdesc">' + esc(it.desc) + '</span>' : '')
          + '</span>'
          + '</li>';
      }).join('') + '</ol>';
    },

    timeline: function (s) {
      return '<div class="fan-time">' + s.items.map(function (it) {
        return '<div class="fan-tick reveal"' + a(it) + '>'
          + '<span class="fan-when">' + esc(it.when) + '</span>'
          + '<span class="fan-what"><b>' + esc(it.title) + '</b>'
          + (it.desc ? '<em>' + esc(it.desc) + '</em>' : '')
          + out(it) + '</span>'
          + '</div>';
      }).join('') + '</div>';
    },

    /* `compact: true` packs the tiles tighter, for the long sets (30 places).
       `cols: N` pins the row to exactly N once there is room for it, instead of
       letting auto-fill decide; use it when the tiles carry something with a
       fixed shape (a screenshot) that needs the width. */
    tiles: function (s) {
      var keys = sortBy(s).map(function (b) { return b.key; });
      var gkey = s.groupable && s.groupable.key;
      return '<div class="fan-tiles' + (s.compact ? ' fan-tiles--compact' : '')
        + (s.views ? ' fan-tiles--switch is-grid' : '') + '"'
        + (s.cols ? ' data-cols style="--cols:' + esc(s.cols) + '"' : '')
        + (keys.length ? ' data-sortable="1"' : '')
        + (keys.length && s.sortable.authored === 'asc' ? ' data-authored="asc"' : '')
        + '>' + s.items.map(function (it, i) {
        /* One data-sort-<key> per sortable field. A field the item does not have
           is left off entirely, which is what sinks it to the bottom of that
           sort rather than treating a missing value as zero. */
        /* every image a title has, for gallery.js: `shot` is the thumbnail and
           `shots` is any extras, and clicking the tile opens them all together.
           Kept as one comma-joined attribute, same shape as .year-card.
           A `shots` entry with no slash is shorthand: 'banner' resolves to
           <shot's folder>/banner.jpg, so the data file names each game's
           folder once instead of five times. */
        var base = it.shot ? it.shot.replace(/[^/]*$/, '') : '';
        var imgs = (it.shot ? [it.shot] : []).concat((it.shots || []).map(function (s) {
          return s.indexOf('/') === -1 ? base + s + '.jpg' : s;
        }));
        /* the whole set renders as links (list view lays them out as a grid;
           grid view hides them), and gallery.js opens any click on the tile
           into the lightbox. Alts for the extras are derived from the file
           name, which is why those names are words. */
        var strip = !imgs.length ? SLOT : '<span class="fan-tileshots">'
          + imgs.map(function (s, n) {
              var name = s.replace(/^.*\//, '').replace(/\.[a-z]+$/i, '').replace(/-/g, ' ');
              return '<a class="fan-tileshot" href="' + esc(s) + '" target="_blank" rel="noopener">'
                + '<img src="' + esc(s) + '" alt="'
                + esc(n === 0 ? (it.shotAlt || it.title) : it.title + ': ' + name)
                + '" loading="lazy" decoding="async" /></a>';
            }).join('') + '</span>';
        return '<div class="fan-tile reveal' + (it.done ? ' is-done' : '') + '"'
          + (keys.length ? ' data-i="' + i + '"' : '')
          + (gkey && it[gkey] ? ' data-group="' + esc(it[gkey]) + '"' : '')
          + (imgs.length ? ' data-images="' + esc(imgs.join(',')) + '" data-label="' + esc(it.title) + '"' : '')
          + keys.map(function (k) {
              return it[k] == null || it[k] === '' ? ''
                : ' data-sort-' + k + '="' + esc(it[k]) + '"';
            }).join('') + a(it) + '>'
          + '<span class="fan-swatch" aria-hidden="true"></span>'
          + '<span class="fan-tiletext"><b>' + esc(it.title) + '</b>'
          + (it.sub ? '<i>' + esc(it.sub) + '</i>' : SLOT)
          + (it.desc ? '<em>' + esc(it.desc) + '</em>' : SLOT)
          + '<span class="fan-chips">' + rate(it) + done(it) + fin(it) + proj(it) + '</span>'
          + (out(it) || SLOT) + '</span>'
          + strip
          + '</div>';
      }).join('') + '</div>';
    },

    quotes: function (s) {
      return '<div class="fan-quotes">' + s.items.map(function (it) {
        return '<figure class="fan-quote reveal"' + a(it) + '>'
          + '<blockquote>' + esc(it.title) + '</blockquote>'
          + '<figcaption>' + esc(it.sub) + '</figcaption>'
          + '</figure>';
      }).join('') + '</div>';
    },

    /* ── kind: stats ── a strip of big numbers: title is the figure */
    stats: function (s) {
      return '<div class="fan-stats">' + s.items.map(function (it) {
        return '<div class="fan-stat reveal"' + a(it) + '>'
          + '<b>' + esc(it.title) + '</b>'
          + (it.sub ? '<i>' + esc(it.sub) + '</i>' : SLOT)
          + (it.desc ? '<em>' + esc(it.desc) + '</em>' : SLOT)
          + '</div>';
      }).join('') + '</div>';
    },

    /* ── kind: era ── a horizontal rail: the time axis is drawn under the
       cards, so scrolling the rail reads as travelling down the timeline */
    era: function (s) {
      return '<div class="fan-rail"><div class="fan-rail-track">' + s.items.map(function (it) {
        return '<article class="fan-era reveal"' + a(it) + '>'
          + '<span class="fan-era-when">' + esc(it.when) + '</span>'
          + '<span class="fan-era-dot" aria-hidden="true"></span>'
          + '<h4>' + esc(it.title) + '</h4>'
          + (it.desc ? '<p>' + esc(it.desc) + '</p>' : '')
          + (it.meta ? '<span class="fan-meta">' + esc(it.meta) + '</span>' : '')
          + '</article>';
      }).join('') + '</div></div>'
      + '<p class="fan-rail-hint">Drag the rail, or scroll it sideways →</p>';
    },

    /* ── kind: films ── the numeral is set enormous behind the text, which is
       as close to a poster as this site gets: type only, no artwork */
    films: function (s) {
      return '<div class="fan-films">' + s.items.map(function (it, i) {
        return '<article class="fan-film reveal"' + a(it) + '>'
          + '<span class="fan-film-num" aria-hidden="true">' + esc(it.num || i + 1) + '</span>'
          + '<span class="fan-film-body">'
          +   '<h4>' + esc(it.title) + '</h4>'
          +   (it.sub ? '<span class="fan-sub">' + esc(it.sub) + '</span>' : '')
          +   (it.desc ? '<p>' + esc(it.desc) + '</p>' : '')
          +   out(it)
          +   (it.meta ? '<span class="fan-meta">' + esc(it.meta) + '</span>' : '')
          + '</span>'
          + '</article>';
      }).join('') + '</div>';
    },

    /* ── kind: sabers ── each item is a hilt; the blade extends on hover and
       stays lit once clicked. Buttons, so keyboards and touch get it too.
       `dark: true` gives the item a black blade with a white edge, which is
       the only way to draw the Darksaber honestly. */
    sabers: function (s) {
      return '<div class="fan-rack">' + s.items.map(function (it) {
        return '<button class="fan-saber reveal' + (it.dark ? ' saber--dark' : '')
          + '" type="button" aria-pressed="false"' + a(it) + '>'
          + '<span class="saber-blade" aria-hidden="true"><i></i></span>'
          + '<span class="saber-hilt" aria-hidden="true"><i></i><i></i><i></i></span>'
          + '<span class="saber-text"><b>' + esc(it.title) + '</b>'
          +   (it.sub ? '<i>' + esc(it.sub) + '</i>' : SLOT)
          +   (it.desc ? '<em>' + esc(it.desc) + '</em>' : SLOT)
          + '</span>'
          + '</button>';
      }).join('') + '</div>';
    },

    /* ── kind: gallery ── the only place on these pages that uses photographs.
       Everything else is drawn; these are my own screenshots and photos.

       `grid: true` packs them as a responsive grid instead of one full-width
       column. A column is right for a wide app screenshot and wrong for a set
       of holiday photographs, which want to be seen several at a time. */
    gallery: function (s) {
      return '<div class="fan-shots' + (s.grid ? ' fan-shots--grid' : '')
        + (s.wide ? ' fan-shots--wide' : '')
        + (s.two ? ' fan-shots--two' : '') + '">' + s.items.map(function (it) {
        /* a screenshot of one finished game can carry the same completion
           chips as a tile (`done`, `finished`, `hours`); the caption's own
           styles are scoped to its direct children so the chips keep theirs */
        var ch = rate(it) + done(it) + fin(it) + proj(it);
        return '<figure class="fan-shot reveal"' + a(it) + '>'
          + '<a href="' + esc(it.src) + '" target="_blank" rel="noopener">'
          +   '<img src="' + esc(it.src) + '" alt="' + esc(it.alt || it.title) + '" loading="lazy" decoding="async" />'
          + '</a>'
          + '<figcaption><b>' + esc(it.title) + '</b>'
          +   (it.desc ? '<span>' + esc(it.desc) + '</span>' : '')
          +   (ch ? '<span class="fan-chips">' + ch + '</span>' : '')
          +   (it.meta ? '<i>' + esc(it.meta) + '</i>' : '')
          + '</figcaption>'
          + '</figure>';
      }).join('') + '</div>';
    },

    /* ── kind: links ── the "elsewhere" block at the foot of every fan page.
       The host line is derived from the href, so the data file never repeats
       the domain and it can never drift out of sync with the link. */
    links: function (s) {
      return '<div class="fan-linkgrid">' + s.items.map(function (it) {
        var host = String(it.href || '')
          .replace(/^https?:\/\//, '').replace(/^www\./, '').split(/[/?#]/)[0];
        return '<a class="fan-linkcard reveal" href="' + esc(it.href) + '" target="_blank" rel="noopener"' + a(it) + '>'
          + '<span class="fan-linkhead"><b>' + esc(it.title) + '</b><i aria-hidden="true">↗</i></span>'
          + (it.desc ? '<p>' + esc(it.desc) + '</p>' : SLOT)
          + '<span class="fan-linkhost">' + esc(host) + '</span>'
          + '</a>';
      }).join('') + '</div>';
    },
  };

  function markup(s) {
    if (!Array.isArray(s.items)) s.items = [];   // a section with no items renders empty, not a blank page
    var build = KINDS[s.kind] || KINDS.cards;
    return '<section class="fan-sec" id="' + esc(s.id || '') + '"'
      + (s.season ? ' data-season="' + s.season + '"' : '')
      + (s.symbiote ? ' data-symbiote="1"' : '') + '>'
      + '<h3 class="subsec subsec--fan reveal">' + esc(s.title)
      +   (s.note ? '<span class="subsec-yr">' + esc(s.note) + '</span>' : '')
      + '</h3>'
      + (s.lede ? '<p class="fan-lede reveal">' + esc(s.lede) + '</p>' : '')
      + controls(s)
      + build(s)
      + '</section>';
  }

  /* ── my own photographs, pulled in rather than written down ──

     Every fan page that has real photographs behind it gets a section of them
     without its data file saying anything: photos-data.js keys them by the same
     tag the page already carries on <body data-fan="...">, and this looks that
     tag up. One list, one place to edit, and a page with no photographs simply
     renders nothing extra.

     It is spliced in BEFORE the Links block, because Links is the sign-off at
     the foot of every one of these pages and photographs of mine reading after
     it looked like an afterthought. */
  function myPhotoSection(list) {
    return {
      kind: 'gallery',
      grid: true,
      id: 'irl',
      title: 'I Have Actually Been',
      note: list.length + (list.length === 1 ? ' photo of mine' : ' photos of mine'),
      lede: 'Not press shots: my own camera roll, out of the year galleries.',
      items: list.map(function (p) {
        return {
          src: PH + p.src,
          title: p.title,
          desc: p.desc,
          meta: p.when,
          alt: p.alt || ('Abubakr Elmallah, ' + p.title),
          accent: p.accent,
        };
      }),
    };
  }

  /* ── my own screenshots, defined once ──

     fan-shots.js is to screenshots what fan-been.js is to photographs: every
     frame is described exactly once, inside a named set, and a section here
     only says which. `set: 'realm'` takes the whole set, heading and lede
     included; `pick: ['spawn', 'razor-crest']` takes some of its frames under
     the page's own heading; a section's own fields win over the set's, and
     any inline `items` come first. So the Minecraft page and the Star Wars
     page can both show the Imagine Fun spawn and cannot describe it two ways.
     A page without fan-shots.js loaded leaves such sections empty rather than
     broken. */
  var SHOTS = window.FAN_SHOTS;
  function resolveShots(s) {
    if (!s.set && !s.pick) return s;
    var set = (SHOTS && s.set && SHOTS.sets && SHOTS.sets[s.set]) || {};
    var out = {}, k;
    for (k in set) if (k !== 'items') out[k] = set[k];
    for (k in s) if (k !== 'set' && k !== 'pick') out[k] = s[k];
    if (!out.kind) out.kind = 'gallery';
    var keys = s.pick || set.items || [];
    out.items = (s.items || []).concat(keys.map(function (key) {
      var p = SHOTS && SHOTS.shots && SHOTS.shots[key];
      if (!p) return null;
      var it = {}, j;
      for (j in p) it[j] = p[j];
      it.src = (SHOTS.base || '') + p.src;
      return it;
    }).filter(Boolean));
    return out;
  }

  var tag = document.body.getAttribute('data-fan');
  var mine = window.MYPHOTOS && window.MYPHOTOS.fandom && window.MYPHOTOS.fandom[tag];

  // sections marked mount:'end' go after whatever the page hand-writes between
  // the two mounts; with no #fanBodyEnd they simply stay in #fanBody, in order
  var tail = document.getElementById('fanBodyEnd');
  var all = (page.sections || []).map(resolveShots);

  if (mine && mine.length) {
    var at = all.length;
    for (var li = all.length - 1; li >= 0; li--) {
      if (all[li].kind === 'links') at = li;              // sit above the sign-off
    }
    all.splice(at, 0, myPhotoSection(mine));
  }

  var main = tail ? all.filter(function (s) { return s.mount !== 'end'; }) : all;

  /* `when` is page-level rather than a section: it belongs above everything,
     and every page has exactly one. Rendered only if the data file sets it. */
  var when = page.when
    ? '<aside class="fan-intro-when reveal">'
      + '<span class="fan-when-k">When I got into it</span>'
      + '<b>' + esc(page.when.at) + '</b>'
      + (page.when.note ? '<span class="fan-when-n">' + esc(page.when.note) + '</span>' : '')
      + '</aside>'
    : '';
  root.innerHTML = when + main.map(markup).join('');
  /* These nodes carry .reveal, so they start invisible until reveal.js observes
     them. It scans once on load; this file currently runs before it, but making
     that a load-order dependency is how the atlas on /star-wars/ ended up blank.
     Handing the markup back is idempotent and makes the order irrelevant. */
  if (typeof window.AEreveal === 'function') window.AEreveal(root);

  if (tail) {
    tail.innerHTML = all.filter(function (s) { return s.mount === 'end'; }).map(markup).join('');
  }

  /* Tell the worker to keep the gallery frames THIS page uses.

     They come out of /assets/img/years/, which the worker otherwise leaves
     alone unless the "show other pictures" switch is on -- right for the year
     galleries, wrong here, where they are published content like any other
     image on the page. Handing over the exact list keeps the offline promise
     without dragging the whole camera roll onto the device. See keep() in
     sw.js. Fire and forget: if there is no worker yet, the next visit does it. */
  (function keepMine() {
    var reg = navigator.serviceWorker && navigator.serviceWorker.controller;
    if (!reg) return;
    var urls = [];
    Array.prototype.forEach.call(
      document.querySelectorAll('.fan-shot img, .fan-beenpic img'), function (img) {
        var u = img.getAttribute('src');
        if (u && u.indexOf('/assets/img/years/') === 0 && urls.indexOf(u) === -1) urls.push(u);
      });
    if (urls.length) reg.postMessage({ type: 'keep', urls: urls });
  })();

  /* A tile screenshot whose file is not in the repo yet should leave no trace,
     rather than a broken-image glyph sitting in the middle of the tile. */
  Array.prototype.forEach.call(document.querySelectorAll('.fan-tileshot img'), function (img) {
    img.addEventListener('error', function () {
      var link = img.closest('.fan-tileshot');
      if (link) link.remove();
    });
  });

  /* the sort control. Reordering is appendChild on nodes that are already in the
     document, so a tile keeps whatever reveal.js has done to it and nothing
     flashes. Ties fall back to the authored position, mirrored with the
     direction, so a year with several titles in it reads the same way round as
     the years above and below it.

     Runs after BOTH mounts are written, so a sortable section can sit in either.
     `data-sort` is compared as a number when both sides are wholly numeric,
     and as a string otherwise, so this works for years, hours and titles
     alike. Wholly, not "starts with one": parseFloat read the ISO date
     '2022-05-06' as 2022, which sorted every title finished in the same year
     as a tie and left May after July. Number() refuses it, and the string
     comparison ISO dates are written for takes over. */
  function applySort(group, key, dir, grouped) {
    var sign = dir === 'asc' ? 1 : -1;
    /* the tie-break below reads the authored order backwards, which is right
       for a list written newest-first and wrong for one written the other way
       (`authored: 'asc'` on the section, see sortBy) */
    var tie = group.getAttribute('data-authored') === 'asc' ? -1 : 1;
    /* Group headers are rebuilt from scratch on every pass: they are cheap, and
       removing them first means group.children below is only ever the tiles. */
    Array.prototype.forEach.call(group.querySelectorAll('.fan-grouphead'), function (h) { h.remove(); });
    var tiles = Array.prototype.slice.call(group.children).sort(function (x, y) {
      var vx = x.getAttribute('data-sort-' + key), vy = y.getAttribute('data-sort-' + key);
      /* An item with no value for this field goes last BOTH ways round: it is
         unknown, not smallest, so flipping the direction must not float it to
         the top. Hence the check sits outside the sign. */
      if ((vx == null) !== (vy == null)) return vx == null ? 1 : -1;
      if (vx != null) {
        var nx = Number(vx), ny = Number(vy);
        var d = (isNaN(nx) || isNaN(ny)) ? String(vx).localeCompare(String(vy)) : nx - ny;
        if (d) return sign * d;
      }
      return sign * tie * (+y.getAttribute('data-i') - +x.getAttribute('data-i'));
    });
    if (!grouped) {
      tiles.forEach(function (t) { group.appendChild(t); });
      return;
    }
    /* Bucket the sorted tiles by data-group, keeping sorted order inside each
       bucket, and let the buckets run in order of first appearance: the section
       whose best tile sorts highest comes first, so grouping composes with
       whatever sort is active instead of imposing a hardcoded order. */
    var buckets = {}, order = [];
    tiles.forEach(function (t) {
      var g = t.getAttribute('data-group') || 'Other';
      if (!buckets[g]) { buckets[g] = []; order.push(g); }
      buckets[g].push(t);
    });
    order.forEach(function (g) {
      var h = document.createElement('h4');
      h.className = 'fan-grouphead';
      /* the header borrows its accent from its first tile, so the Star Wars
         section reads yellow and Batman blue without a second colour table */
      var accent = buckets[g][0].style.getPropertyValue('--a');
      if (accent) h.style.setProperty('--a', accent);
      var name = document.createElement('b'); name.textContent = g;
      var count = document.createElement('i'); count.textContent = buckets[g].length;
      h.appendChild(name); h.appendChild(count);
      /* the series' average of MY ratings, over its rated tiles only; a
         section with nothing played simply carries no average */
      var rs = buckets[g].map(function (t) { return parseFloat(t.getAttribute('data-sort-rating')); })
        .filter(function (n) { return !isNaN(n); });
      if (rs.length) {
        var avg = document.createElement('em');
        avg.textContent = (rs.reduce(function (t, n) { return t + n; }, 0) / rs.length).toFixed(1) + ' avg';
        h.appendChild(avg);
      }
      group.appendChild(h);
      buckets[g].forEach(function (t) { group.appendChild(t); });
    });
  }

  /* ── the controls remember themselves ──
     Sort key, direction, grouping and grid/list are kept in localStorage, one
     entry per page and section, so the catalogue opens the way it was left
     rather than snapping back to release order on every visit. Same shape as
     the pics switch, the cursor and the sound toggle, and wrapped the same
     way for private mode, where storage throws. A saved value is only ever
     applied through the button that carries it, so a key that no longer
     exists is simply ignored and the labels follow as they would on a click. */
  var STORE = 'ae-fan:' + location.pathname + '#';
  function recall(sec) {
    try { return JSON.parse(localStorage.getItem(STORE + (sec.id || '')) || '{}') || {}; }
    catch (e) { return {}; }
  }
  function remember(sec, patch) {
    var cur = recall(sec);
    Object.keys(patch).forEach(function (k) { cur[k] = patch[k]; });
    try { localStorage.setItem(STORE + (sec.id || ''), JSON.stringify(cur)); } catch (e) { /* private mode */ }
  }

  Array.prototype.forEach.call(document.querySelectorAll('.fan-sort'), function (bar) {
    var sec = bar.closest('.fan-sec');
    var group = sec && sec.querySelector('[data-sortable]');
    var keyBtns = bar.querySelectorAll('[data-key]');
    var dirBtns = bar.querySelectorAll('[data-dir]');
    var grpBtns = bar.querySelectorAll('[data-gmode]');
    if (!group || !keyBtns.length) return;          // a tally-only bar has nothing to wire

    var key = keyBtns[0].getAttribute('data-key');
    /* the direction set and the group set each say which way they open */
    var dirSet = bar.querySelector('[aria-label="Sort direction"]');
    var grpSet = bar.querySelector('.fan-groupset');
    var dir = (dirSet && dirSet.getAttribute('data-open')) || 'asc';
    var grouped = !!grpSet && grpSet.getAttribute('data-open') === 'on';

    function press(list, active) {
      Array.prototype.forEach.call(list, function (b) {
        var on = b === active;
        b.classList.toggle('is-on', on);
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
    }

    /* one button, pressed: by a click or by the saved state on load. Returns
       false for anything that is not one of the three kinds of button. */
    function pick(el) {
      var k = el.closest('[data-key]'), d = el.closest('[data-dir]');
      var g = el.closest('[data-gmode]');
      if (k) {
        key = k.getAttribute('data-key');
        press(keyBtns, k);
        // the two directions mean different things per field, so relabel them
        Array.prototype.forEach.call(dirBtns, function (b) {
          var label = b.querySelector('span');
          if (label) label.textContent = k.getAttribute('data-' + b.getAttribute('data-dir'));
        });
      } else if (d) {
        dir = d.getAttribute('data-dir');
        press(dirBtns, d);
      } else if (g) {
        grouped = g.getAttribute('data-gmode') === 'on';
        press(grpBtns, g);
      } else return false;
      return true;
    }

    bar.addEventListener('click', function (e) {
      if (!pick(e.target)) return;
      applySort(group, key, dir, grouped);
      remember(sec, { key: key, dir: dir, grouped: grouped });
    });

    /* where this section was left last time, pressed the way a click would be */
    var saved = recall(sec);
    // matched by comparison, not by selector: a corrupt stored value must not throw and abort the wiring
    var byAttr = function (name, val) {
      return Array.prototype.find.call(bar.querySelectorAll('[' + name + ']'), function (b) { return b.getAttribute(name) === String(val); }) || null;
    };
    var savedKey = saved.key && byAttr('data-key', saved.key);
    var savedDir = saved.dir && byAttr('data-dir', saved.dir);
    var savedGrp = typeof saved.grouped === 'boolean' && byAttr('data-gmode', saved.grouped ? 'on' : 'off');
    if (savedKey) pick(savedKey);
    if (savedDir) pick(savedDir);
    if (savedGrp) pick(savedGrp);

    /* The data files are authored newest-first (that is how TT Games list their
       own catalogue), so the opening order has to be applied, not assumed. */
    applySort(group, key, dir, grouped);
  });

  /* the grid/list switch. Wired separately from the sort control so a section
     can carry either one on its own, and so switching view never disturbs
     whatever order the sort buttons have put the tiles in: it only swaps two
     classes on the container and lets the CSS re-lay the same nodes out. */
  Array.prototype.forEach.call(document.querySelectorAll('.fan-viewset'), function (set) {
    var sec = set.closest('.fan-sec');
    var group = sec && sec.querySelector('.fan-tiles--switch');
    if (!group) return;
    var btns = set.querySelectorAll('[data-view]');

    function show(b) {
      var v = b.getAttribute('data-view');
      Array.prototype.forEach.call(btns, function (o) {
        var on = o === b;
        o.classList.toggle('is-on', on);
        o.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      group.classList.toggle('is-grid', v === 'grid');
      group.classList.toggle('is-list', v === 'list');
      return v;
    }

    set.addEventListener('click', function (e) {
      var b = e.target.closest('[data-view]');
      if (!b) return;
      remember(sec, { view: show(b) });
    });

    /* the view it was left in, if the button for it exists */
    var savedView = recall(sec).view;
    var savedBtn = savedView && set.querySelector('[data-view="' + savedView + '"]');
    if (savedBtn) show(savedBtn);
  });

  /* a saber stays lit after a click, so you can leave the whole rack burning */
  root.addEventListener('click', function (e) {
    var saber = e.target.closest('.fan-saber');
    if (!saber) return;
    var lit = !saber.classList.contains('is-lit');
    saber.classList.toggle('is-lit', lit);
    saber.setAttribute('aria-pressed', lit ? 'true' : 'false');
  });

  /* ── the real places ──
     fan-been.js keyed by this page's own data-fan, drawn at the foot of the
     page. Like /travels/, it only POINTS at the year galleries, so every path
     is checked against years-data.js first: a photo pulled out of a year drops
     out of here rather than leaving a broken frame, and a page left with none
     renders nothing at all instead of an empty heading.

     Deliberately last on the page. Everything above it is what I think about a
     thing; this is the one part that is evidence. */
  (function been() {
    var BEEN = window.FAN_BEEN;
    var key = document.body.getAttribute('data-fan');
    var set = key && BEEN && BEEN.pages && BEEN.pages[key];
    if (!set || !set.use || !set.use.length) return;

    /* `use` is a list of KEYS into BEEN.shots, because a photograph that
       belongs to two franchises is written once and referenced twice; see the
       header of fan-been.js for why. A key with no row behind it is dropped
       the same way a missing file is, rather than drawing an empty frame. */
    var rows = set.use.map(function (k) { return BEEN.shots[k]; }).filter(Boolean);
    if (!rows.length) return;
    set = { title: set.title, note: set.note, shots: rows };

    var YP = {};
    if (window.YEARS && window.YEARS.photos) {
      Object.keys(window.YEARS.photos).forEach(function (g) {
        window.YEARS.photos[g].forEach(function (r) {
          YP[String(r[0]).indexOf('/') >= 0 ? r[0] : g + '/' + r[0]] = r;
        });
      });
    }
    var live = set.shots.filter(function (sh) {
      return Object.prototype.hasOwnProperty.call(YP, sh[0]);
    });
    if (!live.length) return;

    var html = '<section class="fan-sec fan-been reveal">'
      + '<h2 class="fan-h2"><span>' + esc(set.title || 'Places I have been') + '</span></h2>'
      + (set.note ? '<p class="fan-lede">' + esc(set.note) + '</p>' : '')
      + '<div class="been-grid">'
      + live.map(function (sh) {
          var r = YP[sh[0]];
          return '<figure class="been" style="--ar:' + (r[2] / r[3] || 1) + '">'
            + '<a href="/assets/img/years-large/' + esc(sh[0]) + '" target="_blank" rel="noopener">'
            /* plain src + native lazy: fan pages do not load lazy.js, which
               is what /travels/ uses, so there is no AElazy to hand this to */
            + '<img src="/assets/img/years/' + esc(sh[0]) + '"'
            +   ' width="' + r[2] + '" height="' + r[3] + '"'
            +   ' alt="' + esc(sh[1]) + '" loading="lazy" decoding="async" /></a>'
            + '<figcaption><b>' + esc(sh[1]) + '</b>'
            + (sh[2] ? '<i>' + esc(sh[2]) + '</i>' : '') + '</figcaption>'
            + '</figure>';
        }).join('')
      + '</div>'
      /* Shown only with the switch off (see pics.css). Says what is being
         withheld and where to turn it on, rather than leaving the list
         looking like all there ever was. */
      + '<p class="fan-lede been-hint">' + live.length
      +   (live.length === 1 ? ' photograph of these is' : ' photographs of these are')
      +   ' in here. Personal photos are off by default;'
      +   ' the switch is at the foot of <a href="/worlds/">Worlds</a>.</p>'
      + '</section>';

    var host = document.getElementById('fanBeen')
      || root.appendChild(document.createElement('div'));
    host.innerHTML = html;
    if (typeof window.AEreveal === 'function') window.AEreveal(host);
  })();

  /* ── the player ──
     One player for the whole page, built when a button is pressed and DESTROYED
     when it stops. Not hidden, destroyed: a paused YouTube iframe is still a
     live document holding a socket and a decoder, and thirty of them left
     behind after a scroll through the Star Wars themes is a page that never
     settles. Creating it costs nothing until asked and tearing it down gives
     everything back.

     NOTHING IS HOSTED HERE. See visit() above for why: these are commercial
     recordings played through the embed their rights holder publishes them
     with, which is both the legal path and the free one.

     ── why there is an API script, and why it loads WITH the page ──
     A bare <iframe> plays and nothing more: it cannot be asked where it is in
     the track, so there is no progress bar to scrub and no way to jump ten
     seconds. YouTube's IFrame API is what makes those possible.

     It wants to be lazy -- load it on the first press and a visitor who only
     reads the page fetches nothing from Google -- and that was how this was
     written first. It does not work. Injected after the load event the player
     is constructed, its iframe is created with enablejsapi on it, and then no
     method is ever attached to it and onReady never fires; injected with the
     page, the same call is ready with a duration in well under a second.
     Measured on this exact page with everything else held identical, so it is
     the timing of the injection and nothing else.

     So it is injected here, at render, and ONLY on a page that actually has a
     track on it: `armApi()` below is called from the first visit() that emits
     a play button, so the 40-odd pages with music pay for it and the rest do
     not. It is async and it blocks nothing.

     If it cannot load at all (offline, blocked, an extension), fall() drops
     back to exactly the plain iframe this had before: the track still plays,
     it simply has no scrubber. A missing nicety must not cost the feature. */
  var YT_SRC = 'https://www.youtube.com/iframe_api';
  var apiState = 0;                   // 0 untouched, 1 loading, 2 ready, 3 failed
  var apiWaiting = [];

  function withApi(cb) {
    if (apiState === 2) return cb(true);
    if (apiState === 3) return cb(false);
    apiWaiting.push(cb);
    if (apiState === 1) return;
    armApi();
  }

  function armApi() {
    if (apiState) return;
    apiState = 1;

    function settle(ok) {
      apiState = ok ? 2 : 3;
      var q = apiWaiting; apiWaiting = [];
      q.forEach(function (f) { f(ok); });
    }
    /* The API calls one global when it is ready. Something else on the page may
       want it one day, so whatever is already there is called too. */
    var prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = function () {
      if (typeof prev === 'function') { try { prev(); } catch (e) {} }
      settle(true);
    };
    var tag = document.createElement('script');
    tag.src = YT_SRC;
    tag.async = true;
    tag.onerror = function () { settle(false); };
    document.head.appendChild(tag);
    /* onerror does not fire for every way this can fail, so time it out too
       rather than leaving a button that says Play and never does anything. */
    setTimeout(function () { if (apiState === 1) settle(false); }, 6000);
  }

  var heard = null;    // the button currently playing
  var stage = null;    // the panel under it
  var player = null;   // the YT.Player, when the API came up
  var ticker = null;   // the progress poll
  var seat = 0;        // unique id per player element

  function clock(t) {
    if (!isFinite(t) || t < 0) t = 0;
    var m = Math.floor(t / 60), sec = Math.floor(t % 60);
    return m + ':' + (sec < 10 ? '0' : '') + sec;
  }

  function silence() {
    if (ticker) { clearInterval(ticker); ticker = null; }
    if (player && player.destroy) { try { player.destroy(); } catch (e) {} }
    player = null;
    if (stage && stage.parentNode) stage.parentNode.removeChild(stage);
    stage = null;
    if (heard) {
      heard.classList.remove('is-playing');
      heard.setAttribute('aria-pressed', 'false');
      var t = heard.querySelector('.fan-hear-t');
      if (t) t.textContent = 'Play';
      heard = null;
    }
  }

  /* ── the transport ──
     Rendered whether or not the API came up; without it the row is left off
     entirely rather than shown dead, because a scrubber that does not scrub is
     worse than no scrubber. */
  function transport(id) {
    return '<div class="fan-tr">'
      + '<button class="fan-tr-b" type="button" data-seek="-10" aria-label="Back ten seconds">'
      +   '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5V2L7 6l5 4V7a6 6 0 1 1-6 6H4a8 8 0 1 0 8-8z"/></svg>'
      +   '<u>10</u></button>'
      + '<button class="fan-tr-b fan-tr-pp" type="button" data-pp aria-label="Pause">'
      +   '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4h3.5v16H7zM13.5 4H17v16h-3.5z"/></svg></button>'
      + '<button class="fan-tr-b" type="button" data-seek="10" aria-label="Forward ten seconds">'
      +   '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5V2l5 4-5 4V7a6 6 0 1 0 6 6h2a8 8 0 1 1-8-8z"/></svg>'
      +   '<u>10</u></button>'
      + '<div class="fan-scrub" role="slider" tabindex="0" aria-label="Seek"'
      +   ' aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" aria-valuetext="0:00">'
      +   '<span class="fan-scrub-track"></span>'
      +   '<span class="fan-scrub-fill"></span>'
      +   '<span class="fan-scrub-knob"></span>'
      + '</div>'
      + '<span class="fan-tr-t"><b>0:00</b>/<i>0:00</i></span>'
      + '</div>';
  }

  root.addEventListener('click', function (e) {
    var btn = e.target.closest('.fan-hear');
    if (!btn) return;
    e.preventDefault();

    /* pressing the one that is already going is how you stop it */
    if (btn === heard) { silence(); return; }
    silence();

    /* Hang the player off whatever block the button sits in, falling back to
       the button's own parent, so this works in a tile, a card, a link row or
       anything added later without needing to know about each. */
    var holder = btn.closest('.fan-tile, .fan-card, .fan-linkcard, li') || btn.parentNode;
    var vid = btn.getAttribute('data-yt');
    var title = btn.getAttribute('data-t');
    var slot = 'fanyt' + (++seat);

    stage = document.createElement('div');
    stage.className = 'fan-stage is-waiting';
    /* The placeholder carries real width/height ATTRIBUTES, not just CSS. The
       API reads the element it is given to decide how big to build its iframe,
       and this panel is inserted and measured in the same frame it is animated
       in, so an aspect-ratio box can still be zero high at that moment. A
       zero-sized YouTube iframe never finishes its handshake and the player
       then has no methods at all, which looks exactly like the API failing. */
    stage.innerHTML =
      '<div class="fan-stage-vid"><div id="' + slot + '" width="426" height="240"></div></div>'
      + '<button class="fan-stage-x" type="button" aria-label="Stop">Stop</button>';

    if (holder.parentNode) holder.parentNode.insertBefore(stage, holder.nextSibling);
    else holder.appendChild(stage);

    heard = btn;
    btn.classList.add('is-playing');
    btn.setAttribute('aria-pressed', 'true');
    var lbl = btn.querySelector('.fan-hear-t');
    if (lbl) lbl.textContent = 'Stop';

    var mine = stage;   // so a late callback from a player already stopped does nothing

    /* the no-API path: what this did before there was a scrubber */
    function fall() {
      if (mine !== stage) return;
      /* If a player was constructed but never came up, it still owns an iframe
         in here; drop it before writing the plain one over the top. */
      if (player && player.destroy) { try { player.destroy(); } catch (e) {} }
      player = null;
      var vidbox = stage.querySelector('.fan-stage-vid');
      if (vidbox) vidbox.innerHTML = '<div id="' + slot + '"></div>';
      var host = stage.querySelector('#' + slot);
      if (!host) return;
      host.outerHTML =
        '<iframe title="' + esc(title) + '" allow="autoplay; encrypted-media"'
        + ' referrerpolicy="origin-when-cross-origin" loading="lazy" allowfullscreen'
        + ' src="https://www.youtube-nocookie.com/embed/' + esc(vid)
        + '?autoplay=1&rel=0&modestbranding=1&playsinline=1"></iframe>';
      stage.classList.remove('is-waiting');
    }

    withApi(function (ok) {
      if (mine !== stage) return;          // stopped while the script was loading
      if (!ok || !window.YT || !window.YT.Player) return fall();

      /* onReady is the fast path and NOT the only one. It is documented to
         fire once the player is usable, and there are real conditions where it
         does not arrive at all while the player is nonetheless working: a
         blocked autoplay, a throttled background tab. That left the panel
         sitting on its spinner forever with a track playing underneath it,
         which is the worst of both.

         So readiness is also POLLED. Whichever notices first calls arm(), and
         arm() only ever runs once. Four seconds is the giving-up point, and
         giving up means falling back to the plain iframe rather than leaving
         a spinner: a scrubber is worth a short wait and not a long one. */
      var armed = false;
      function arm() {
        if (armed || mine !== stage) return;
        if (!player || !player.getDuration || !(player.getDuration() > 0)) return;
        armed = true;
        if (probe) { clearInterval(probe); probe = null; }
        stage.classList.remove('is-waiting');
        stage.insertAdjacentHTML('beforeend', transport(slot));
        wire(stage);
      }

      /* ── why playVideo() is called by hand ──
         `autoplay: 1` below is a playerVar and the browser does not reliably
         honour it. The API builds its own iframe a beat or two after the click
         that asked for it, and by then the gesture no longer reaches the new
         document; what you get instead is the embed sitting on its poster
         frame with YouTube's play button in the middle, which is the exact
         thing the button was pressed to skip past. Asking the player itself is
         what actually starts it.

         Asked more than once, because the first call can land while the player
         is still cueing and is simply dropped. States -1 (unstarted) and 5
         (cued) both mean loaded and not playing, so those are the two worth
         another push; anything else is either playing, buffering, paused by
         hand or ended, and none of those should be overridden. Four pushes at
         400ms and then it stops, so a visitor who deliberately pauses within
         the first second is not fought by the page. */
      var nudges = 0;
      function start() {
        if (mine !== stage || !player || !player.playVideo) return;
        try { player.playVideo(); } catch (e) {}
        if (++nudges > 4) return;
        setTimeout(function () {
          if (mine !== stage || !player || !player.getPlayerState) return;
          var st;
          try { st = player.getPlayerState(); } catch (e) { return; }
          if (st === -1 || st === 5) start();
        }, 400);
      }

      var probe = null, waited = 0;
      try {
        player = new window.YT.Player(slot, {
          videoId: vid,
          host: 'https://www.youtube-nocookie.com',
          playerVars: { autoplay: 1, rel: 0, modestbranding: 1, playsinline: 1 },
          events: {
            /* start() before arm(): playback is the point, and it must not wait
               on a duration the transport needs but the audio does not. */
            onReady: function () { start(); arm(); },
            onStateChange: arm,
            onError: function () { if (mine === stage) fall(); },
          },
        });
      } catch (err) { return fall(); }

      probe = setInterval(function () {
        if (mine !== stage) { clearInterval(probe); probe = null; return; }
        waited += 250;
        /* onReady is not guaranteed (see arm), so the poll asks for playback
           too, once the player has methods to ask with. `nudges` keeps this
           from turning into a request every quarter second. */
        if (!nudges) start();
        arm();
        if (!armed && waited >= 4000) {
          clearInterval(probe); probe = null;
          fall();
        }
      }, 250);
    });
  });

  /* ── wiring one transport to the live player ── */
  function wire(host) {
    var scrub = host.querySelector('.fan-scrub');
    var fill = host.querySelector('.fan-scrub-fill');
    var knob = host.querySelector('.fan-scrub-knob');
    var now = host.querySelector('.fan-tr-t b');
    var end = host.querySelector('.fan-tr-t i');
    var pp = host.querySelector('.fan-tr-pp');
    var dragging = false;

    function dur() {
      var d = player && player.getDuration ? player.getDuration() : 0;
      return isFinite(d) && d > 0 ? d : 0;
    }
    function at() {
      var t = player && player.getCurrentTime ? player.getCurrentTime() : 0;
      return isFinite(t) && t > 0 ? t : 0;
    }
    function paint(t, d) {
      var pct = d ? Math.max(0, Math.min(100, (t / d) * 100)) : 0;
      fill.style.width = pct + '%';
      knob.style.left = pct + '%';
      now.textContent = clock(t);
      end.textContent = clock(d);
      scrub.setAttribute('aria-valuenow', Math.round(pct));
      scrub.setAttribute('aria-valuetext', clock(t) + ' of ' + clock(d));
    }
    function go(t) {
      var d = dur();
      t = Math.max(0, d ? Math.min(d, t) : t);
      if (player && player.seekTo) player.seekTo(t, true);
      paint(t, d);
    }

    /* 200 ms is under the eye's threshold for a bar this width and is 5 calls a
       second into an iframe, which is nothing. Stops with the player. */
    if (ticker) clearInterval(ticker);
    ticker = setInterval(function () {
      if (!player || dragging) return;
      paint(at(), dur());
      if (pp && player.getPlayerState) {
        var playing = player.getPlayerState() === 1;
        pp.classList.toggle('is-paused', !playing);
        pp.setAttribute('aria-label', playing ? 'Pause' : 'Play');
      }
    }, 200);
    paint(0, dur());

    host.addEventListener('click', function (e) {
      var b = e.target.closest('[data-seek]');
      if (b) { e.preventDefault(); go(at() + parseFloat(b.getAttribute('data-seek'))); return; }
      if (e.target.closest('[data-pp]')) {
        e.preventDefault();
        if (!player) return;
        if (player.getPlayerState() === 1) player.pauseVideo(); else player.playVideo();
      }
    });

    /* Scrub. Pointer events so mouse, pen and touch are one path, and capture
       so the drag survives leaving the bar, which is where a scrub usually
       ends up. */
    function frac(e) {
      var r = scrub.getBoundingClientRect();
      return r.width ? Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)) : 0;
    }
    scrub.addEventListener('pointerdown', function (e) {
      e.preventDefault();
      dragging = true;
      scrub.classList.add('is-scrubbing');
      try { scrub.setPointerCapture(e.pointerId); } catch (x) {}
      paint(frac(e) * dur(), dur());
    });
    scrub.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      paint(frac(e) * dur(), dur());
    });
    function drop(e) {
      if (!dragging) return;
      dragging = false;
      scrub.classList.remove('is-scrubbing');
      go(frac(e) * dur());
    }
    scrub.addEventListener('pointerup', drop);
    scrub.addEventListener('pointercancel', function () {
      dragging = false;
      scrub.classList.remove('is-scrubbing');
    });

    /* A slider has to work from the keyboard or it is a picture of a slider. */
    scrub.addEventListener('keydown', function (e) {
      var k = e.key, d = dur();
      if (k === 'ArrowRight' || k === 'ArrowUp') { go(at() + 5); }
      else if (k === 'ArrowLeft' || k === 'ArrowDown') { go(at() - 5); }
      else if (k === 'PageUp') { go(at() + 30); }
      else if (k === 'PageDown') { go(at() - 30); }
      else if (k === 'Home') { go(0); }
      else if (k === 'End') { go(d); }
      else return;
      e.preventDefault();
    });
  }

  root.addEventListener('click', function (e) {
    if (e.target.closest('.fan-stage-x')) { e.preventDefault(); silence(); }
  });

  /* Escape stops it, the same key that closes everything else on this site. */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && heard) silence();
  });

  /* The page is rendered by now, so wantsApi tells us whether anything on it
     can be played. Pages with no track never touch Google. */
  if (wantsApi) armApi();

  /* the era rail: grab and drag to scrub it. Touch and trackpads already
     scroll sideways on their own, so this is only wired for mouse/pen. */
  Array.prototype.forEach.call(root.querySelectorAll('.fan-rail'), function (rail) {
    var down = false, startX = 0, startScroll = 0;
    rail.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'touch') return;
      down = true; startX = e.clientX; startScroll = rail.scrollLeft;
      rail.setPointerCapture(e.pointerId);
      rail.classList.add('is-dragging');
    });
    rail.addEventListener('pointermove', function (e) {
      if (!down) return;
      e.preventDefault();
      rail.scrollLeft = startScroll - (e.clientX - startX);
    });
    ['pointerup', 'pointercancel'].forEach(function (evt) {
      rail.addEventListener(evt, function () {
        down = false; rail.classList.remove('is-dragging');
      });
    });
  });
})();
