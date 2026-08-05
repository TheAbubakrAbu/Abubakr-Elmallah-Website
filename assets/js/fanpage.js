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

    // `compact: true` packs the tiles tighter, for the long sets (30 places)
    tiles: function (s) {
      return '<div class="fan-tiles' + (s.compact ? ' fan-tiles--compact' : '') + '">' + s.items.map(function (it) {
        return '<div class="fan-tile reveal"' + a(it) + '>'
          + '<span class="fan-swatch" aria-hidden="true"></span>'
          + '<span class="fan-tiletext"><b>' + esc(it.title) + '</b>'
          + (it.sub ? '<i>' + esc(it.sub) + '</i>' : '')
          + (it.desc ? '<em>' + esc(it.desc) + '</em>' : '')
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
