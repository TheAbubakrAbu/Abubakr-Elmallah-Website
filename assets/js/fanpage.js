/* fanpage.js: one renderer for all six franchise pages.

   Each page ships a data file that sets window.FAN_PAGE = { sections: [...] };
   this walks it and writes the markup into #fanBody. The look is entirely in
   fanpages.css, scoped by <body data-fan="sw|hp|mcu|mc|potc|jp">, so the same
   five section kinds read completely differently from page to page.

     kind: 'cards'     grid of title / sub / desc / meta cards
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

  var esc = function (s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); };
  var a = function (it) { return it.accent ? ' style="--a:' + it.accent + '"' : ''; };

  // optional outbound link on an item: official sites, park pages
  var out = function (it) {
    if (!it.href) return '';
    return '<a class="fan-visit" href="' + it.href + '" target="_blank" rel="noopener">'
      + esc(it.link || 'Official site') + ' \u2197</a>';
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
    return '<span class="fan-rate" style="--pct:' + Math.max(0, Math.min(100, r * 10)).toFixed(0) + '%">'
      + '<span class="fan-rate-v">' + r.toFixed(1) + '</span>'
      + '<span class="fan-rate-o">/10</span>'
      + '<i aria-hidden="true"></i></span>';
  };

  /* optional single screenshot on an item. gallery.js picks the link up on its
     own (it claims every in-page link that points at an image), so this opens in
     the shared lightbox rather than a new tab. */
  var shot = function (it) {
    if (!it.shot) return '';
    return '<a class="fan-tileshot" href="' + esc(it.shot) + '" target="_blank" rel="noopener">'
      + '<img src="' + esc(it.shot) + '" alt="' + esc(it.shotAlt || it.title) + '" loading="lazy" />'
      + '</a>';
  };

  /* A section may carry `sortable`, which puts an order control above its tiles.
     Two independent axes: WHAT to sort on, and WHICH WAY.

       sortable: { label, by: [ { key, label, asc, desc }, \u2026 ] }

     Each `by` entry names an item field and the words for its two directions,
     which differ per field (oldest/newest reads wrong for a duration). Those
     words ride on the key button as data-asc / data-desc, so picking a new key
     relabels the direction buttons with no shared state to keep in sync.

     The single-key shorthand `sortable: { key, asc, desc }` still works. */
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
    return '<span class="fan-sortset fan-viewset" role="group" aria-label="View">'
      + '<span class="fan-sort-k">View</span>'
      + VIEWS.map(function (v, i) {
          return '<button class="fan-sortbtn fan-viewbtn' + (i ? '' : ' is-on') + '" type="button"'
            + ' data-view="' + v.k + '" aria-pressed="' + (i ? 'false' : 'true') + '">'
            + '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' + v.icon + '</svg>'
            + '<span>' + v.label + '</span></button>';
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
       not just the finished ones — an unfinished game still gets a rating. */
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
    var bar = sorter(s) + viewer(s) + tally(s);
    return bar ? '<div class="fan-sort reveal">' + bar + '</div>' : '';
  };

  var KINDS = {
    cards: function (s) {
      return '<div class="fan-cards">' + s.items.map(function (it) {
        return '<article class="fan-card reveal"' + a(it) + '>'
          + (it.tag ? '<span class="fan-tag">' + esc(it.tag) + '</span>' : '')
          + '<h4>' + esc(it.title) + '</h4>'
          + (it.sub ? '<span class="fan-sub">' + esc(it.sub) + '</span>' : '')
          + (it.desc ? '<p>' + esc(it.desc) + '</p>' : '')
          + out(it)
          + (it.meta ? '<span class="fan-meta">' + esc(it.meta) + '</span>' : '')
          + '</article>';
      }).join('') + '</div>';
    },

    rank: function (s) {
      return '<ol class="fan-rank">' + s.items.map(function (it, i) {
        return '<li class="fan-rankrow reveal"' + a(it) + '>'
          + '<span class="fan-num">' + (it.num || (i + 1 < 10 ? '0' + (i + 1) : i + 1)) + '</span>'
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
      return '<div class="fan-tiles' + (s.compact ? ' fan-tiles--compact' : '')
        + (s.views ? ' fan-tiles--switch is-grid' : '') + '"'
        + (s.cols ? ' data-cols style="--cols:' + esc(s.cols) + '"' : '')
        + (keys.length ? ' data-sortable="1"' : '') + '>' + s.items.map(function (it, i) {
        /* One data-sort-<key> per sortable field. A field the item does not have
           is left off entirely, which is what sinks it to the bottom of that
           sort rather than treating a missing value as zero. */
        return '<div class="fan-tile reveal' + (it.done ? ' is-done' : '') + '"'
          + (keys.length ? ' data-i="' + i + '"' : '')
          + keys.map(function (k) {
              return it[k] == null || it[k] === '' ? ''
                : ' data-sort-' + k + '="' + esc(it[k]) + '"';
            }).join('') + a(it) + '>'
          + '<span class="fan-swatch" aria-hidden="true"></span>'
          + '<span class="fan-tiletext"><b>' + esc(it.title) + '</b>'
          + (it.sub ? '<i>' + esc(it.sub) + '</i>' : '')
          + (it.desc ? '<em>' + esc(it.desc) + '</em>' : '')
          + shot(it)
          + '<span class="fan-chips">' + rate(it) + done(it) + proj(it) + '</span>'
          + out(it) + '</span>'
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
          + (it.sub ? '<i>' + esc(it.sub) + '</i>' : '')
          + (it.desc ? '<em>' + esc(it.desc) + '</em>' : '')
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
          +   (it.sub ? '<i>' + esc(it.sub) + '</i>' : '')
          +   (it.desc ? '<em>' + esc(it.desc) + '</em>' : '')
          + '</span>'
          + '</button>';
      }).join('') + '</div>';
    },

    /* ── kind: gallery ── the only place on these pages that uses photographs.
       Everything else is drawn; these are my own screenshots. */
    gallery: function (s) {
      return '<div class="fan-shots">' + s.items.map(function (it) {
        return '<figure class="fan-shot reveal"' + a(it) + '>'
          + '<a href="' + esc(it.src) + '" target="_blank" rel="noopener">'
          +   '<img src="' + esc(it.src) + '" alt="' + esc(it.alt || it.title) + '" loading="lazy" />'
          + '</a>'
          + '<figcaption><b>' + esc(it.title) + '</b>'
          +   (it.desc ? '<span>' + esc(it.desc) + '</span>' : '')
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
          + (it.desc ? '<p>' + esc(it.desc) + '</p>' : '')
          + '<span class="fan-linkhost">' + esc(host) + '</span>'
          + '</a>';
      }).join('') + '</div>';
    },
  };

  function markup(s) {
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

  // sections marked mount:'end' go after whatever the page hand-writes between
  // the two mounts; with no #fanBodyEnd they simply stay in #fanBody, in order
  var tail = document.getElementById('fanBodyEnd');
  var all = page.sections || [];
  var main = tail ? all.filter(function (s) { return s.mount !== 'end'; }) : all;

  /* `when` is page-level rather than a section: it belongs above everything,
     and every page has exactly one. Rendered only if the data file sets it. */
  var when = page.when
    ? '<aside class="fan-when reveal">'
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
     `data-sort` is compared as a number when both sides parse as one, and as a
     string otherwise, so this works for years and for titles alike. */
  function applySort(group, key, dir) {
    var sign = dir === 'asc' ? 1 : -1;
    Array.prototype.slice.call(group.children).sort(function (x, y) {
      var vx = x.getAttribute('data-sort-' + key), vy = y.getAttribute('data-sort-' + key);
      /* An item with no value for this field goes last BOTH ways round: it is
         unknown, not smallest, so flipping the direction must not float it to
         the top. Hence the check sits outside the sign. */
      if ((vx == null) !== (vy == null)) return vx == null ? 1 : -1;
      if (vx != null) {
        var nx = parseFloat(vx), ny = parseFloat(vy);
        var d = (isNaN(nx) || isNaN(ny)) ? String(vx).localeCompare(String(vy)) : nx - ny;
        if (d) return sign * d;
      }
      return sign * (+y.getAttribute('data-i') - +x.getAttribute('data-i'));
    }).forEach(function (t) { group.appendChild(t); });
  }

  Array.prototype.forEach.call(document.querySelectorAll('.fan-sort'), function (bar) {
    var sec = bar.closest('.fan-sec');
    var group = sec && sec.querySelector('[data-sortable]');
    var keyBtns = bar.querySelectorAll('[data-key]');
    var dirBtns = bar.querySelectorAll('[data-dir]');
    if (!group || !keyBtns.length) return;          // a tally-only bar has nothing to wire

    var key = keyBtns[0].getAttribute('data-key');
    var dirSet = bar.querySelector('[data-open]');
    var dir = (dirSet && dirSet.getAttribute('data-open')) || 'asc';

    function press(list, active) {
      Array.prototype.forEach.call(list, function (b) {
        var on = b === active;
        b.classList.toggle('is-on', on);
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
    }

    bar.addEventListener('click', function (e) {
      var k = e.target.closest('[data-key]'), d = e.target.closest('[data-dir]');
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
      } else return;
      applySort(group, key, dir);
    });

    /* The data files are authored newest-first (that is how TT Games list their
       own catalogue), so the opening order has to be applied, not assumed. */
    applySort(group, key, dir);
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

    set.addEventListener('click', function (e) {
      var b = e.target.closest('[data-view]');
      if (!b) return;
      var v = b.getAttribute('data-view');
      Array.prototype.forEach.call(btns, function (o) {
        var on = o === b;
        o.classList.toggle('is-on', on);
        o.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      group.classList.toggle('is-grid', v === 'grid');
      group.classList.toggle('is-list', v === 'list');
    });
  });

  /* a saber stays lit after a click, so you can leave the whole rack burning */
  root.addEventListener('click', function (e) {
    var saber = e.target.closest('.fan-saber');
    if (!saber) return;
    var lit = !saber.classList.contains('is-lit');
    saber.classList.toggle('is-lit', lit);
    saber.setAttribute('aria-pressed', lit ? 'true' : 'false');
  });

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
