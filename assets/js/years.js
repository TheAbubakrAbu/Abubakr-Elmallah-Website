/* years.js: the year photo galleries on /high-school/ and /college/.

   Reads window.YEARS (years-data.js). Three states, in order of how much you
   have asked for:

     1. one square cover card per school year, which is all the page shows
        until you touch it;
     2. click a card and that year expands underneath into every photo it has,
        in date order, as justified rows: each row filled left to right and
        then given the one height that makes it land exactly on the container
        width, so nothing is cropped and there are no holes. The maths runs off
        the w/h in the data, so it is done before a single byte has loaded and
        the layout never jumps;
     3. click a photo and it opens full-screen, with arrows, swipe and keyboard.

   Closed years are display:none, so their photos are never fetched, and a
   year's grid is not even BUILT until the first time it is opened. That second
   part matters more than it sounds: /high-school/ has 666 photos across its
   years, and writing all of them out at load cost ~2,500 DOM nodes and a 112 ms
   scripting block on a mid-range phone before the page could show anything.
   Now the page costs six cover images and nothing else, and the work of laying
   out a year happens when that year is asked for.

   Inside an open year, which frames are fetched, and when, is lazy.js's
   decision: every <img> here is written with data-src and handed to it, so
   the frames arrive a few at a time nearest the viewport, and are let go
   again once scrolled far away. See the header of lazy.js.

   Stage 2 and 3 are behind the "show other pictures" switch at the bottom of
   the page (pics.js). With it off -- which is the default -- the cards are all
   there is: no counts on them, and clicking one does nothing. The photos are
   personal and the covers are the part of them that is meant to be public.

   Mount it by putting <div class="years" data-years="hs"></div> (or "uci") on
   the page. The full-screen deck is this file's own overlay rather than the
   shared #lightbox: that one stacks its images in a column, which is right for
   four graduation photos and wrong for twenty-two. */
(function years() {
  var mounts = document.querySelectorAll('[data-years]');
  if (!mounts.length || !window.YEARS) return;

  var DATA = window.YEARS;
  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  var GAP = 10;       // gap between frames, px; keep in step with years.css

  function fmt(d) {                       // '2024-05-30 18:06' -> '30 May 2024'
    if (!d) return '';
    var p = d.split(/[- :]/);
    return +p[2] + ' ' + MONTHS[+p[1] - 1] + ' ' + p[0];
  }
  function fmtShort(d) {                  // -> 'May 2024'
    if (!d) return '';
    var p = d.split(/[- :]/);
    return MONTHS[+p[1] - 1] + ' ' + p[0];
  }

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  }

  /* Where a photo actually lives.

     Normally a row's file is just a name inside its own group's folder. A file
     containing a slash is a path relative to /assets/img/years/ instead, which
     is how one photograph appears in two galleries without being stored twice:
     the four school ID cards are encoded in their own year, and the ID Pics card
     points at those same four files. See ALIASES in tools/photos.py. */
  function url(gid, file) {
    return '/assets/img/years/' + (file.indexOf('/') >= 0 ? file : gid + '/' + file);
  }

  /* The src attribute, or rather not: with lazy.js on the page a frame is
     written with data-src and fetched when it is needed, a few at a time,
     nearest the viewport first. Without it, the browser's own lazy loading is
     the fallback. */
  function pic(src) {
    return window.AElazy
      ? 'data-src="' + src + '"'
      : 'src="' + src + '" loading="lazy" fetchpriority="low"';
  }

  /* ── the deck ── */
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
  var elYear = deck.querySelector('.yg-year');
  var elDate = deck.querySelector('.yg-date');
  var elCount = deck.querySelector('.yg-count');

  var set = [], at = 0, label = '';

  function show(i) {
    at = (i + set.length) % set.length;
    var p = set[at];
    stageImg.src = p.src;
    stageImg.alt = p.alt;
    elYear.textContent = label;
    elDate.textContent = p.date ? fmt(p.date) : 'Date unrecorded';
    elCount.textContent = (at + 1) + ' / ' + set.length;
  }
  function open(list, name, i) {
    set = list; label = name;
    deck.classList.add('open');
    deck.setAttribute('aria-hidden', 'false');
    document.documentElement.classList.add('intro-lock');
    show(i);
  }
  function close() {
    deck.classList.remove('open');
    deck.setAttribute('aria-hidden', 'true');
    document.documentElement.classList.remove('intro-lock');
    stageImg.removeAttribute('src');
  }

  deck.querySelector('.yg-x').addEventListener('click', close);
  deck.querySelector('.yg-prev').addEventListener('click', function () { show(at - 1); });
  deck.querySelector('.yg-next').addEventListener('click', function () { show(at + 1); });
  deck.addEventListener('click', function (e) { if (e.target === deck || e.target.closest('.yg-stage') === e.target) close(); });
  addEventListener('keydown', function (e) {
    if (!deck.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') show(at - 1);
    else if (e.key === 'ArrowRight') show(at + 1);
  });

  // swipe, for the half of this that will be read on a phone
  var x0 = null;
  deck.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  deck.addEventListener('touchend', function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 50) show(at + (dx < 0 ? 1 : -1));
    x0 = null;
  }, { passive: true });

  /* ── one square card per year, and the grid it opens ── */
  mounts.forEach(function (mount) {
    var school = mount.dataset.years;
    var groups = DATA.groups.filter(function (g) { return g.school === school; })
                            .filter(function (g) { return (DATA.photos[g.id] || []).length; });
    var cards = '', panels = '';
    var byId = {};
    groups.forEach(function (g) { byId[g.id] = g; });

    groups.forEach(function (g) {
      var rows = DATA.photos[g.id];
      /* '2020–21' -> ’21 for a single school year; an era card spanning
         several years shows both ends: '2006–18' -> ’06–’18 */
      var yr = '’' + g.span.slice(-2);
      var yp = g.span.split('–');
      if (yp.length === 2) {
        var y0 = parseInt(yp[0], 10);
        var y1 = parseInt(yp[0].slice(0, 2) + yp[1].slice(-2), 10);
        if (y1 - y0 > 1) yr = '’' + yp[0].slice(-2) + '–’' + yp[1].slice(-2);
      }

      /* the ID Pics card shows the whole group shot at its own aspect ratio,
         double-wide, instead of a square centre crop of it */
      /* The ID cards are school photographs of me with my name and school on
         them, so the whole card is behind the switch: `year-card--ids` is
         display:none until "show other pictures" is on (pics.css). It is the
         one year card that is not public, so it does not sit on the page as a
         cover the way the others do. */
      cards += '<button class="year-card reveal'
        + (g.id === 'id-pics' ? ' year-card--wide year-card--ids' : '')
        + '" type="button" data-group="' + g.id + '"'
        + ' aria-expanded="false" aria-controls="ygp-' + g.id + '">'
        + '<img ' + pic(url(g.id, g.cover))
        +   ' alt="Abubakr Elmallah, ' + esc(g.label.toLowerCase()) + ' year"'
        +   ' decoding="async" />'
        + '<span class="year-cap">' + esc(g.label) + ' <i>' + yr + '</i></span>'
        + '<span class="year-more">' + rows.length + '</span>'
        + '</button>';

      /* the shell only; body() below fills it in on first open */
      panels += '<section class="yg-panel" id="ygp-' + g.id + '" data-group="' + g.id + '" hidden></section>';
    });

    /* Everything inside a year: the header row, then the justified grid(s).
       Called once per year, the first time that year is opened. */
    function body(g) {
      var rows = DATA.photos[g.id];
      /* min–max rather than first–last: the ID photo is pinned to the front
         of its year whatever its date says, so row order is no longer the
         same thing as date order. The strings sort lexically as dates do. */
      var dates = rows.map(function (r) { return r[1]; }).filter(Boolean).sort();
      var range = dates.length
        ? fmtShort(dates[0]) + ' – ' + fmtShort(dates[dates.length - 1])
        : 'undated';
      var out = '<div class="yg-head">'
        +   '<h4>' + esc(g.label) + '</h4>'
        +   '<span class="yg-span">' + esc(g.span) + '</span>'
        +   '<span class="yg-range">' + esc(range) + '</span>'
        +   '<span class="yg-n">' + rows.length + ' photo' + (rows.length === 1 ? '' : 's') + '</span>'
        +   '<button class="yg-shut" type="button">Close &#10005;</button>'
        + '</div>';

      /* One gallery, optionally divided: a group in DATA.chapters gets a small
         heading and its own justified grid per chapter. data-i stays global
         across the whole group, so the full-screen deck runs straight through
         all of it, and layout() justifies each grid on its own. */
      var chapters = (DATA.chapters && DATA.chapters[g.id]) || null;
      var breaks = {};
      if (chapters) chapters.forEach(function (c) { breaks[c[0]] = c; });

      rows.forEach(function (r, i) {
        var file = r[0], date = r[1], w = r[2], h = r[3];
        if (breaks[i]) {
          out += (i > 0 ? '</div>' : '')
            + '<h5 class="yg-chap">' + esc(breaks[i][1])
            + '<span>' + esc(breaks[i][2]) + '</span></h5>'
            + '<div class="yg" data-group="' + g.id + '">';
        } else if (i === 0) {
          out += '<div class="yg" data-group="' + g.id + '">';
        }
        var alt = 'Abubakr Elmallah, ' + g.label.toLowerCase()
                + (date ? ', ' + fmt(date) : '');
        /* The school ID photographs, pinned to the front of their year, are
           hidden with the same switch. Hidden in CSS rather than dropped here
           on purpose: the cell stays in the DOM, so data-i still matches the
           index in DATA.photos and the full-screen deck does not have to be
           renumbered. layout() skips them by measuring only visible cells. */
        var isID = file.replace(/^.*\//, '').indexOf('id') === 0;
        out += '<button class="yg-cell' + (isID ? ' yg-cell--id' : '') + '"'
          + ' data-i="' + i + '" data-w="' + w + '" data-h="' + h + '" type="button">'
          + '<img ' + pic(url(g.id, file)) + ' alt="' + esc(alt) + '"'
          +   ' width="' + w + '" height="' + h + '" decoding="async" />'
          + '<span class="yg-when">' + (date ? esc(fmt(date)) : '&#183;') + '</span>'
          + '</button>';
      });

      return out + '</div>';
    }

    function fill(panel) {
      if (panel.dataset.built) return;
      panel.dataset.built = '1';
      panel.innerHTML = body(byId[panel.dataset.group]);
      if (window.AElazy) window.AElazy.watch(panel);   // the frames are data-src: hand them over
    }

    mount.innerHTML = '<div class="years-grid">' + cards + '</div>'
                    + '<div class="yg-panels">' + panels + '</div>';
    if (window.AElazy) window.AElazy.watch(mount);

    /* The covers, like every frame in the panels, are written with data-src
       and fetched by lazy.js: after the page has painted, a few at a time,
       nearest the viewport first, and let go again once scrolled far away.
       The cards are already their final size (aspect-ratio in components.css),
       so nothing moves when the photographs land in them. */

    /* An accordion rather than a stack of every year at once: the point of
       going back to the cards is that the page stays short until you ask it
       not to be. Photos inside a closed panel are display:none, so the browser
       never fetches them: opening one year pulls that year and nothing else. */
    function shut(panel) {
      var card = mount.querySelector('.year-card[data-group="' + panel.dataset.group + '"]');
      panel.classList.remove('in');
      panel.hidden = true;
      if (card) { card.classList.remove('is-open'); card.setAttribute('aria-expanded', 'false'); }
    }

    /* Where the page stands after a year folds up.

       Everything below the panel (the year blocks, the transcript, on a
       phone the rest of the page) moves up into the space it leaves, and
       from where the visitor is standing that reads as the page having
       scrolled DOWN by a whole gallery: one moment the top of the year, the
       next some paragraph from thousands of pixels further on. This used to
       follow that with a smooth scrollIntoView back to the card, which
       animated up from the wrong place and made it two movements instead
       of none. So: if the card is off screen, it is put back on screen in
       the same frame as the collapse, with no animation; and if it is on
       screen already, nothing moves at all. */
    function backTo(card) {
      if (!card) return;
      var r = card.getBoundingClientRect();
      var bar = document.querySelector('.topbar');
      var tab = document.querySelector('.tabbar');
      var top = bar ? bar.getBoundingClientRect().bottom : 0;
      var bottom = tab && getComputedStyle(tab).display !== 'none'
        ? tab.getBoundingClientRect().top : innerHeight;
      if (r.top >= top && r.bottom <= bottom) return;
      var html = document.documentElement, was = html.style.scrollBehavior;
      html.style.scrollBehavior = 'auto';          // base.css asks for smooth; not for this
      card.scrollIntoView({ block: 'center' });
      html.style.scrollBehavior = was;
    }

    /* the switch at the bottom of the page decides whether a card is a button
       at all; with it off the click is simply dropped */
    function picsOn() { return !!(window.AEpics && window.AEpics.on()); }

    mount.querySelectorAll('.year-card').forEach(function (card) {
      card.addEventListener('click', function () {
        if (!picsOn()) return;
        var panel = mount.querySelector('.yg-panel[data-group="' + card.dataset.group + '"]');
        var wasOpen = !panel.hidden;
        mount.querySelectorAll('.yg-panel:not([hidden])').forEach(shut);
        if (wasOpen) return;                       // clicking the open year closes it

        fill(panel);                               // first open: write the grid out now
        panel.hidden = false;
        card.classList.add('is-open');
        card.setAttribute('aria-expanded', 'true');
        layout();                                  // needs a measurable width, so: after unhide
        void panel.offsetHeight;                   // and a reflow before the transition
        panel.classList.add('in');
        if (window.AEreveal) window.AEreveal(panel);
      });
    });

    /* Delegated, not bound per element: the Close button and the photo cells
       are written by body() the first time a year is opened, so there is
       nothing to bind to when this runs. */
    mount.addEventListener('click', function (e) {
      var b = e.target.closest('.yg-shut');
      if (!b) return;
      var panel = b.closest('.yg-panel');
      shut(panel);
      backTo(mount.querySelector('.year-card[data-group="' + panel.dataset.group + '"]'));
    });

    /* Turning the switch back off has to put the page back the way it was, so
       an open year folds up rather than being left showing behind a switch
       that says the pictures are hidden. */
    document.addEventListener('ae:pics', function (e) {
      if (e.detail && e.detail.on) return;
      mount.querySelectorAll('.yg-panel:not([hidden])').forEach(shut);
      close();
    });

    /* clicking any photo in an open year opens the deck at that photo.
       The deck's list is worked out the first time that year is used and kept,
       so paging through 200 photos does not rebuild it on every arrow press. */
    var lists = {};
    function listFor(g) {
      if (!lists[g.id]) {
        lists[g.id] = DATA.photos[g.id].map(function (r) {
          return { src: url(g.id, r[0]), date: r[1],
                   alt: 'Abubakr Elmallah, ' + g.label.toLowerCase() };
        });
      }
      return lists[g.id];
    }

    mount.addEventListener('click', function (e) {
      var cell = e.target.closest('.yg-cell');
      if (!cell) return;
      var panel = cell.closest('.yg-panel');
      if (!panel) return;
      var g = byId[panel.dataset.group];
      open(listFor(g), g.label + ' ' + g.span, +cell.dataset.i);
    });
  });

  /* ── justified rows ──
     A column masonry would reorder the photos, and a fixed grid of row-spans
     leaves holes wherever a tall frame is followed by short ones. So: fill each
     row left to right in date order, then solve for the one row height that
     makes the row come out exactly the width of the container. Every photo
     keeps its own aspect ratio, nothing is cropped, nothing is out of order and
     there are no holes; the rows just breathe in and out a bit. */
  function layout() {
    document.querySelectorAll('.yg').forEach(function (grid) {
      var W = grid.clientWidth;
      if (!W) return;
      var target = W < 560 ? 158 : W < 900 ? 200 : 244;
      var row = [], sum = 0;

      function flush(isLast) {
        if (!row.length) return;
        var gaps = GAP * (row.length - 1);
        var h = (W - gaps) / sum;
        // a last row of one or two frames would balloon; leave it at target
        if (isLast && h > target * 1.4) h = target;
        var used = 0;
        row.forEach(function (c, i) {
          var a = +c.dataset.w / +c.dataset.h;
          // the final frame absorbs the rounding, so the row lands flush
          var w = (isLast && h === target) || i < row.length - 1
            ? Math.floor(a * h) : (W - gaps - used);
          c.style.width = w + 'px';
          c.style.height = Math.round(h) + 'px';
          used += w;
        });
        row = []; sum = 0;
      }

      Array.prototype.forEach.call(grid.querySelectorAll('.yg-cell'), function (c) {
        /* A cell the pics switch has hidden takes up no space, so it must not
           be counted into a row either: leaving it in would solve the row for
           a width one frame wider than the row actually is, and that row would
           land short of the container. */
        if (c.offsetParent === null) return;
        row.push(c);
        sum += +c.dataset.w / +c.dataset.h;
        if (sum * target + GAP * (row.length - 1) >= W) flush(false);
      });
      flush(true);
    });
  }

  addEventListener('resize', layout);   // layout() also runs each time a year opens
  if (window.AEreveal) window.AEreveal(document);
})();
