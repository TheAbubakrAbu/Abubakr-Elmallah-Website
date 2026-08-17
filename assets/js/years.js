/* years.js: the year photo galleries on /high-school/ and /college/.

   Reads window.YEARS (years-data.js). Three states, in order of how much you
   have asked for:

     1. one square cover card per school year, which is all the page shows
        until you touch it;
     2. click a card and that year expands underneath into every photo it has,
        in date order, as justified rows — each row filled left to right and
        then given the one height that makes it land exactly on the container
        width, so nothing is cropped and there are no holes. The maths runs off
        the w/h in the data, so it is done before a single byte has loaded and
        the layout never jumps;
     3. click a photo and it opens full-screen, with arrows, swipe and keyboard.

   Closed years are display:none, so their photos are never fetched: the page
   costs six cover images until you ask for more.

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

  var GAP = 10;       // gap between frames, px — keep in step with years.css

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

    groups.forEach(function (g) {
      var rows = DATA.photos[g.id];
      /* min–max rather than first–last: the ID photo is pinned to the front
         of its year whatever its date says, so row order is no longer the
         same thing as date order. The strings sort lexically as dates do. */
      var dates = rows.map(function (r) { return r[1]; }).filter(Boolean).sort();
      var range = dates.length
        ? fmtShort(dates[0]) + ' – ' + fmtShort(dates[dates.length - 1])
        : 'undated';
      var yr = '’' + g.span.slice(-2);           // '2020–21' -> ’21

      cards += '<button class="year-card reveal" type="button" data-group="' + g.id + '"'
        + ' aria-expanded="false" aria-controls="ygp-' + g.id + '">'
        + '<img src="/assets/img/years/' + g.id + '/' + g.cover + '"'
        +   ' alt="Abubakr Elmallah, ' + esc(g.label.toLowerCase()) + ' year" loading="lazy" />'
        + '<span class="year-cap">' + esc(g.label) + ' <i>' + yr + '</i></span>'
        + '<span class="year-more">' + rows.length + '</span>'
        + '</button>';

      panels += '<section class="yg-panel" id="ygp-' + g.id + '" data-group="' + g.id + '" hidden>'
        + '<div class="yg-head">'
        +   '<h4>' + esc(g.label) + '</h4>'
        +   '<span class="yg-span">' + esc(g.span) + '</span>'
        +   '<span class="yg-range">' + esc(range) + '</span>'
        +   '<span class="yg-n">' + rows.length + ' photo' + (rows.length === 1 ? '' : 's') + '</span>'
        +   '<button class="yg-shut" type="button">Close &#10005;</button>'
        + '</div>'
        + '<div class="yg" data-group="' + g.id + '">';

      rows.forEach(function (r, i) {
        var file = r[0], date = r[1], w = r[2], h = r[3];
        var alt = 'Abubakr Elmallah, ' + g.label.toLowerCase()
                + (date ? ', ' + fmt(date) : '');
        panels += '<button class="yg-cell"'
          + ' data-i="' + i + '" data-w="' + w + '" data-h="' + h + '" type="button">'
          + '<img src="/assets/img/years/' + g.id + '/' + file + '" alt="' + esc(alt) + '"'
          +   ' width="' + w + '" height="' + h + '" loading="lazy" decoding="async" />'
          + '<span class="yg-when">' + (date ? esc(fmt(date)) : '&#183;') + '</span>'
          + '</button>';
      });

      panels += '</div></section>';
    });

    mount.innerHTML = '<div class="years-grid">' + cards + '</div>'
                    + '<div class="yg-panels">' + panels + '</div>';

    /* An accordion rather than a stack of every year at once: the point of
       going back to the cards is that the page stays short until you ask it
       not to be. Photos inside a closed panel are display:none, so the browser
       never fetches them — opening one year pulls that year and nothing else. */
    function shut(panel) {
      var card = mount.querySelector('.year-card[data-group="' + panel.dataset.group + '"]');
      panel.classList.remove('in');
      panel.hidden = true;
      if (card) { card.classList.remove('is-open'); card.setAttribute('aria-expanded', 'false'); }
    }

    mount.querySelectorAll('.year-card').forEach(function (card) {
      card.addEventListener('click', function () {
        var panel = mount.querySelector('.yg-panel[data-group="' + card.dataset.group + '"]');
        var wasOpen = !panel.hidden;
        mount.querySelectorAll('.yg-panel:not([hidden])').forEach(shut);
        if (wasOpen) return;                       // clicking the open year closes it

        panel.hidden = false;
        card.classList.add('is-open');
        card.setAttribute('aria-expanded', 'true');
        layout();                                  // needs a measurable width, so: after unhide
        void panel.offsetHeight;                   // and a reflow before the transition
        panel.classList.add('in');
        if (window.AEreveal) window.AEreveal(panel);
      });
    });

    mount.querySelectorAll('.yg-shut').forEach(function (b) {
      b.addEventListener('click', function () {
        var panel = b.closest('.yg-panel');
        shut(panel);
        var card = mount.querySelector('.year-card[data-group="' + panel.dataset.group + '"]');
        if (card) card.scrollIntoView({ block: 'center', behavior: 'smooth' });
      });
    });

    // clicking any photo in an open year opens the deck at that photo
    mount.querySelectorAll('.yg').forEach(function (grid) {
      var g = DATA.groups.filter(function (x) { return x.id === grid.dataset.group; })[0];
      var list = DATA.photos[grid.dataset.group].map(function (r) {
        return { src: '/assets/img/years/' + grid.dataset.group + '/' + r[0], date: r[1],
                 alt: 'Abubakr Elmallah, ' + g.label.toLowerCase() };
      });
      grid.addEventListener('click', function (e) {
        var cell = e.target.closest('.yg-cell');
        if (cell) open(list, g.label + ' ' + g.span, +cell.dataset.i);
      });
    });
  });

  /* ── justified rows ──
     A column masonry would reorder the photos, and a fixed grid of row-spans
     leaves holes wherever a tall frame is followed by short ones. So: fill each
     row left to right in date order, then solve for the one row height that
     makes the row come out exactly the width of the container. Every photo
     keeps its own aspect ratio, nothing is cropped, nothing is out of order and
     there are no holes — the rows just breathe in and out a bit. */
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
