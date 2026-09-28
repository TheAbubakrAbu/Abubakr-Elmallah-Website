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

  function esc(s) { return window.AEesc(s); }

  /* Where a photo actually lives.

     Normally a row's file is just a name inside its own group's folder. A file
     containing a slash is a path relative to /assets/img/years/ instead, which
     is how one photograph appears in two galleries without being stored twice:
     the four school ID cards are encoded in their own year, and the ID Pics card
     points at those same four files. See ALIASES in tools/photos.py. */
  function url(gid, file) {
    return '/assets/img/years/' + (file.indexOf('/') >= 0 ? file : gid + '/' + file);
  }

  /* The deck's copy: the same name under /assets/img/years-large/, a 2000px
     encode of the same photo (LARGE_OUT in tools/photos.py). The grid's
     1000px frame is what fills the stage first, because it is already in the
     cache; this one is fetched behind it and put in its place. */
  function large(gid, file) {
    return '/assets/img/years-large/' + (file.indexOf('/') >= 0 ? file : gid + '/' + file);
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

  /* ── the deck ──
     A real modal, like the shared lightbox (gallery.js): a dialog with a name,
     focus on its close button while it is up and back on the photo it ended
     on when it goes, and the rest of the page inert meanwhile. Before, focus
     stayed on the grid cell behind the overlay and Tab walked on through the
     photos underneath it. The bar along the bottom is a polite live region,
     so paging with the arrow keys says where you are. */
  var deck = document.createElement('div');
  deck.className = 'yg-deck';
  deck.setAttribute('role', 'dialog');
  deck.setAttribute('aria-modal', 'true');
  deck.setAttribute('aria-label', 'Photo viewer');
  deck.setAttribute('aria-hidden', 'true');
  deck.innerHTML =
      '<button class="yg-x" type="button" aria-label="Close">&#10005;</button>'
    + '<button class="yg-prev" type="button" aria-label="Previous photo">&#8249;</button>'
    + '<button class="yg-next" type="button" aria-label="Next photo">&#8250;</button>'
    + '<figure class="yg-stage"><img alt="" /></figure>'
    + '<div class="yg-bar" aria-live="polite"><span class="yg-year"></span><span class="yg-date"></span>'
    +   '<span class="yg-place"></span><span class="yg-count"></span></div>';
  document.body.appendChild(deck);

  var stageImg = deck.querySelector('img');
  var elYear = deck.querySelector('.yg-year');
  var elDate = deck.querySelector('.yg-date');
  var elPlace = deck.querySelector('.yg-place');
  var elCount = deck.querySelector('.yg-count');

  var set = [], at = 0, label = '';
  var pending = null;                 // the photo whose large copy the stage is waiting on
  var opener = null, from = null;     // what opened the deck, and the open year it came from
  var unload = 0;                     // the stage is emptied after the fade-out, not during it

  /* Both copies of a photo are shown at the same size, worked out from the
     photo's own proportions and the room the stage has, rather than from
     whichever file is loaded at the moment: otherwise the picture would jump
     when the large copy lands. Never above the large copy's own pixels (twice
     the grid frame), and never above 1:1 for a photo too small to have been
     given a large copy at all. The 1100 is .yg-stage's max-width in years.css. */
  function scaleOf(p) {
    var cs = getComputedStyle(deck);
    var maxW = Math.min(1100, deck.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight));
    var maxH = parseFloat(getComputedStyle(stageImg).maxHeight);
    if (!(maxH > 0)) maxH = innerHeight - 128;
    var cap = Math.max(p.w, p.h) < 1000 ? 1 : 2;
    return Math.min(maxW / p.w, maxH / p.h, cap);
  }
  function fit(p) {
    var s = scaleOf(p);
    stageImg.style.width = Math.round(p.w * s) + 'px';
    stageImg.style.height = Math.round(p.h * s) + 'px';
  }

  /* Whether the stage shows this photo at more device pixels than the grid's
     1000px frame has. Often it does not: a 1100px stage on an ordinary
     screen, or a landscape photo across a phone, is covered by the frame
     that is already in the cache, and fetching the 2000px copy for it spent
     a quarter of a megabyte a photo on nothing anyone could see. */
  function wantsLarge(p) {
    return Math.max(p.w, p.h) >= 1000
      && scaleOf(p) * (window.devicePixelRatio || 1) > 1.15;
  }

  /* Fetch the large copy behind the frame on the stage and put it in its
     place when it lands, unless the deck has moved on. The two neighbours
     are fetched next, their grid frames and, where the screen can use it,
     their large copies, so an arrow press or a swipe finds the next photo
     already here instead of an empty frame. */
  function swapIn(p) {
    pending = p;
    if (wantsLarge(p)) {
      var big = new Image();
      big.onload = function () { if (pending === p) stageImg.src = p.full; };
      big.src = p.full;
    }
    if (set.length > 1) {
      [set[(at + 1) % set.length], set[(at - 1 + set.length) % set.length]].forEach(function (n) {
        new Image().src = n.src;
        if (wantsLarge(n)) new Image().src = n.full;
      });
    }
  }

  /* The place is the town the photo was taken in, when the data carries one:
     ingest reads it off the original's GPS and names it, and leaves it out
     for the photos whose place is not meant to be shown. So an empty place
     is the normal case for a good part of the set, and the span simply goes
     away rather than reading "unknown". */
  function show(i) {
    at = (i + set.length) % set.length;
    var p = set[at];
    fit(p);
    stageImg.src = p.src;
    stageImg.alt = p.alt + (p.date ? ', ' + fmt(p.date) : '');
    swapIn(p);
    elYear.textContent = label;
    elDate.textContent = p.date ? fmt(p.date) : 'Date unrecorded';
    elPlace.textContent = p.place || '';
    elPlace.hidden = !p.place;
    elCount.textContent = (at + 1) + ' / ' + set.length;
  }

  /* Everything but the deck goes inert while it is up (the deck is a child of
     <body>, so its siblings are the whole page). */
  function setInert(on) {
    Array.prototype.forEach.call(document.body.children, function (n) {
      if (n !== deck && n.tagName !== 'SCRIPT') n.inert = on;
    });
  }

  function open(list, name, i, panel) {
    set = list; label = name;
    opener = document.activeElement; from = panel || null;
    clearTimeout(unload);
    deck.classList.add('open');
    deck.setAttribute('aria-hidden', 'false');
    document.documentElement.classList.add('intro-lock');
    show(i);
    setInert(true);
    deck.querySelector('.yg-x').focus({ preventScroll: true });
  }
  function close() {
    if (!deck.classList.contains('open')) return;   // Escape elsewhere on the page is not ours
    deck.classList.remove('open');
    deck.setAttribute('aria-hidden', 'true');
    document.documentElement.classList.remove('intro-lock');
    setInert(false);
    pending = null;
    /* The photo stays on the stage through the fade-out. Emptying it in the
       first frame showed a broken-image box and the alt text for the length
       of the fade, over a backdrop that had not started to go. */
    unload = setTimeout(function () {
      if (deck.classList.contains('open')) return;
      stageImg.removeAttribute('src');
      stageImg.style.width = stageImg.style.height = '';
    }, 220);
    /* Focus goes back to the photo the deck ended on, which is where the
       page behind it is brought to as well: page through forty photos and
       close, and you are looking at the fortieth, not the first. */
    var cell = from && from.querySelector('.yg-cell[data-i="' + at + '"]');
    if (cell && cell.offsetParent !== null) {
      cell.focus({ preventScroll: true });
      var html = document.documentElement, was = html.style.scrollBehavior;
      html.style.scrollBehavior = 'auto';            // under the fade, not a second movement after it
      cell.scrollIntoView({ block: 'nearest' });
      html.style.scrollBehavior = was;
    } else if (opener && opener.isConnected && opener.focus) {
      opener.focus({ preventScroll: true });
    }
    opener = from = null;
  }
  addEventListener('resize', function () { if (deck.classList.contains('open')) fit(set[at]); });

  deck.querySelector('.yg-x').addEventListener('click', close);
  deck.querySelector('.yg-prev').addEventListener('click', function () { show(at - 1); });
  deck.querySelector('.yg-next').addEventListener('click', function () { show(at + 1); });
  deck.addEventListener('click', function (e) { if (e.target === deck || e.target.closest('.yg-stage') === e.target) close(); });
  /* handled keys are marked as such, so expand.js does not also fold away an
     open "Read more" card on the same Escape */
  addEventListener('keydown', function (e) {
    if (!deck.classList.contains('open')) return;
    if (e.key === 'Escape') { e.preventDefault(); close(); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); show(at - 1); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); show(at + 1); }
  });

  /* Swipe, for the half of this that will be read on a phone. The photo
     follows the finger once the drag has picked a direction; a sideways
     drag past 50px, or a quick flick, turns the page, and anything else
     springs back. A drag that starts out vertical never turns it (that was
     most accidental page turns), and a second finger (a pinch) cancels. The
     next photo slides in from the side the finger was heading for. */
  var x0 = null, y0 = 0, t0 = 0, axis = '';
  var SPRING = 'transform .26s cubic-bezier(.16,1,.3,1)';
  function settle(dir) {
    if (reduceMotion) { stageImg.style.transition = 'none'; stageImg.style.transform = ''; return; }
    if (dir) {                                     // the new photo starts a little to that side
      stageImg.style.transition = 'none';
      stageImg.style.transform = 'translateX(' + (dir * 36) + 'px)';
      void stageImg.offsetWidth;
    }
    stageImg.style.transition = SPRING;
    stageImg.style.transform = '';
  }
  deck.addEventListener('touchstart', function (e) {
    if (e.touches.length !== 1) { if (x0 !== null) settle(0); x0 = null; return; }
    x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; t0 = e.timeStamp; axis = '';
    stageImg.style.transition = 'none';
  }, { passive: true });
  deck.addEventListener('touchmove', function (e) {
    if (x0 === null) return;
    if (e.touches.length !== 1) { x0 = null; settle(0); return; }
    var mx = e.touches[0].clientX - x0, my = e.touches[0].clientY - y0;
    if (!axis && Math.abs(mx) + Math.abs(my) > 10) axis = Math.abs(mx) > Math.abs(my) ? 'x' : 'y';
    if (axis === 'x' && !reduceMotion) stageImg.style.transform = 'translateX(' + mx + 'px)';
  }, { passive: true });
  deck.addEventListener('touchend', function (e) {
    if (x0 === null) return;
    var mx = e.changedTouches[0].clientX - x0;
    var v = Math.abs(mx) / Math.max(1, e.timeStamp - t0);          // px per ms
    var turn = axis === 'x' && (Math.abs(mx) > 50 || (v > 0.3 && Math.abs(mx) > 12));
    x0 = null;
    if (!turn) { settle(0); return; }
    var dir = mx < 0 ? 1 : -1;
    show(at + dir);
    settle(dir);
  }, { passive: true });
  deck.addEventListener('touchcancel', function () { if (x0 !== null) { x0 = null; settle(0); } }, { passive: true });

  /* ── one square card per year, and the grid it opens ── */
  mounts.forEach(function (mount) {
    var school = mount.dataset.years;
    var groups = DATA.groups.filter(function (g) { return g.school === school; })
                            .filter(function (g) { return (DATA.photos[g.id] || []).length; });
    var cards = '', panels = '';
    var byId = {};
    groups.forEach(function (g) { byId[g.id] = g; });

    /* who the photos are of, for the alt text: "freshman year", "first
       year", "middle school", never "first year year" */
    function whoOf(g) {
      if (g.id === 'id-pics') return 'school ID cards';
      var l = g.label.toLowerCase();
      return /(year|school)$/.test(l) ? l : l + ' year';
    }

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
         cover the way the others do.

         A cover is a button only while the switch is on (arm() below). With
         it off, the default, it is a picture with a caption: it used to be a
         <button> that did nothing, a Tab stop and a "collapsed, button" for
         every school year, promising a gallery that was not there. */
      cards += '<div class="year-card reveal'
        + (g.id === 'id-pics' ? ' year-card--wide year-card--ids' : '')
        + '" data-group="' + g.id + '">'
        + '<img ' + pic(url(g.id, g.cover))
        +   ' alt="Abubakr Elmallah, ' + esc(whoOf(g)) + '"'
        +   ' decoding="async" />'
        + '<span class="year-cap">' + esc(g.label) + ' <i>' + yr + '</i></span>'
        + '<span class="year-more">' + rows.length + '<span class="vh"> photos</span></span>'
        + '</div>';

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
        +   '<h3 tabindex="-1">' + esc(g.label) + '</h3>'
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
            + '<h4 class="yg-chap">' + esc(breaks[i][1])
            + '<span>' + esc(breaks[i][2]) + '</span></h4>'
            + '<div class="yg" data-group="' + g.id + '">';
        } else if (i === 0) {
          out += '<div class="yg" data-group="' + g.id + '">';
        }
        var alt = 'Abubakr Elmallah, ' + whoOf(g)
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
      if (card) {
        card.classList.remove('is-open');
        if (card.hasAttribute('aria-expanded')) card.setAttribute('aria-expanded', 'false');
      }
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

    /* A cover takes on the button role, its Tab stop and its expanded state
       while the switch is on, and puts them all down again when it goes off.
       The element stays the same one either way, so tilt, the reveal and the
       lazy-loaded cover photo are not disturbed by the change. */
    function arm(on) {
      mount.querySelectorAll('.year-card').forEach(function (card) {
        if (on) {
          card.setAttribute('role', 'button');
          card.tabIndex = 0;
          card.setAttribute('aria-expanded', card.classList.contains('is-open') ? 'true' : 'false');
          card.setAttribute('aria-controls', 'ygp-' + card.dataset.group);
        } else {
          ['role', 'tabindex', 'aria-expanded', 'aria-controls'].forEach(function (a) { card.removeAttribute(a); });
        }
      });
    }
    arm(picsOn());

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

        /* The year opens underneath the whole row of covers, which on a phone
           is one or two screens below the cover you touched: the only sign
           anything had happened was the green border. When the year's heading
           lands below the lower part of the screen, the page is taken to it,
           and focus goes with it so a keyboard or VoiceOver user is in the
           year and not left on its cover. */
        var head = panel.querySelector('.yg-head h3');
        if (head && head.getBoundingClientRect().top > innerHeight * 0.7) {
          head.focus({ preventScroll: true });
          head.scrollIntoView({ block: 'start', behavior: reduceMotion ? 'auto' : 'smooth' });
        }
      });
    });

    /* role="button" on a div needs the keys a real button gets for free */
    mount.addEventListener('keydown', function (e) {
      var card = e.target;
      if (!card.classList || !card.classList.contains('year-card') || card.getAttribute('role') !== 'button') return;
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.click(); }
    });

    /* Delegated, not bound per element: the Close button and the photo cells
       are written by body() the first time a year is opened, so there is
       nothing to bind to when this runs. The cover it belongs to takes focus
       before the page moves back to it; closing used to hide the button that
       had focus and leave it on <body>. */
    mount.addEventListener('click', function (e) {
      var b = e.target.closest('.yg-shut');
      if (!b) return;
      var panel = b.closest('.yg-panel');
      var card = mount.querySelector('.year-card[data-group="' + panel.dataset.group + '"]');
      shut(panel);
      if (card) card.focus({ preventScroll: true });
      backTo(card);
    });

    /* Turning the switch back off has to put the page back the way it was, so
       an open year folds up rather than being left showing behind a switch
       that says the pictures are hidden. Either way the covers change role. */
    document.addEventListener('ae:pics', function (e) {
      var on = !!(e.detail && e.detail.on);
      if (!on) {
        mount.querySelectorAll('.yg-panel:not([hidden])').forEach(shut);
        close();
      }
      arm(on);
    });

    /* clicking any photo in an open year opens the deck at that photo.
       The deck's list is worked out the first time that year is used and kept,
       so paging through 200 photos does not rebuild it on every arrow press. */
    var lists = {};
    function listFor(g) {
      if (!lists[g.id]) {
        lists[g.id] = DATA.photos[g.id].map(function (r) {
          return { src: url(g.id, r[0]), full: large(g.id, r[0]), w: r[2], h: r[3],
                   date: r[1], place: r[4] || '',
                   alt: 'Abubakr Elmallah, ' + whoOf(g) };
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
      open(listFor(g), g.label + ' ' + g.span, +cell.dataset.i, panel);
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
    /* Every measurement first, every write after. A year with chapters is a
       grid per chapter, and measuring each grid after writing the one before
       it forced a full re-layout per chapter: that, more than anything, was
       the ~120 ms of forced layout in opening Second Year on a phone.

       The width is the real, fractional one, rounded DOWN. clientWidth
       rounds to the nearest pixel, so a 321.8px column (an iPhone 17 Pro, a
       14-inch MacBook at its default scale) was solved as 322: every row came
       out a fraction too wide, its last photo wrapped onto a line of its own,
       and a year became a ragged stack of short rows. A row a fraction short
       of the edge is invisible; one a fraction too long breaks. */
    var jobs = [];
    document.querySelectorAll('.yg').forEach(function (grid) {
      var W = Math.floor(grid.getBoundingClientRect().width);
      if (!W) return;
      /* A cell the pics switch has hidden takes up no space, so it must not
         be counted into a row either: leaving it in would solve the row for
         a width one frame wider than the row actually is, and that row would
         land short of the container. */
      jobs.push([grid, W, Array.prototype.filter.call(grid.querySelectorAll('.yg-cell'), function (c) {
        return c.offsetParent !== null;
      })]);
    });
    jobs.forEach(function (job) {
      var W = job[1], cells = job[2];
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

      /* the offsetParents were read up front with the widths, before any
         width is written: reading one after the previous row's writes forced
         a full re-layout per row (150 of them on a big year, on every resize) */
      cells.forEach(function (c) {
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
