/* files-pics.js: the picture grids on /files/.

   Renders window.FILESPICS (files-pics-data.js) into the .files-pics block,
   one group per folder under assets/img/archive/, every picture shown rather
   than listed. The rows above it are Google documents and cannot be shown on
   the page at all, which is the whole reason this half looks different.

   WHY IT IS RENDERED AND NOT WRITTEN OUT. Eighty-eight <a><img> blocks is
   nine hundred lines of markup that would have to be edited by hand every
   time a picture is added, and the titles beside them already exist on the
   pages that show each picture. tools/filespics.py harvests those; this
   prints them.

   Each tile is the .flyer shape the rest of the site uses for a picture with
   a caption, so gallery.js picks them up with no special case: a link whose
   href ends in an image extension opens in the lightbox.

   Loading: every tile is lazy and carries its own dimensions, so eighty-eight
   pictures cost one layout and nothing is fetched until it is scrolled to.
   The whole block is behind the "show all pictures" switch (pics.css), so on
   a first visit none of this is requested at all. */
(function filesPics() {
  var root = document.getElementById('filesPics');
  var data = window.FILESPICS;
  if (!root || !Array.isArray(data)) return;

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* How many across. Every group is a different length, so one column count
     for all of them always strands somebody: at three across the two groups
     of four leave a single tile alone on a second row, and thirteen leaves one
     alone at two, three AND four. So each grid picks its own count, the widest
     that divides it (or at worst leaves a pair) within what the column can
     actually fit, which is four or five across on a desktop and three below
     1280px (pics.css steps it down, so no group is squeezed thin). CSS cannot
     work this out on its own: it would need the item count, and :has/nth-child
     arithmetic cannot read it. The number rides on data-cols, and pics.css
     turns it into that many columns. */
  function colsFor(n) {
    if (n <= 4) return n;                  // a short group fits on one row
    var best = 4, bestLast = 0;
    for (var c = 5; c >= 3; c--) {
      var last = n % c || c;               // tiles on the final row
      if (last > bestLast) { best = c; bestLast = last; }
      if (last === c) return c;            // divides exactly, nothing stranded
    }
    return best;
  }

  var total = 0;
  var html = data.map(function (g) {
    total += g.items.length;
    var tiles = g.items.map(function (it) {
      return '<a class="flyer reveal" href="' + esc(it.src) + '">'
        + '<img src="' + esc(it.src) + '" alt="' + esc(it.alt) + '"'
        +   ' loading="lazy" decoding="async" />'
        + '<span class="flyer-cap"><b>' + esc(it.title) + '</b>'
        +   (it.desc ? '<i>' + esc(it.desc) + '</i>' : '')
        + '</span></a>';
    }).join('');

    /* h3, not h2: the "Pictures" heading above this block is the h2, and each
       of these is a group inside it. See the heading note in CLAUDE-adjacent
       memory; the levels on this site are h1 > h2 > h3 with nothing skipped. */
    return '<section class="files-picgroup">'
      + '<h3 class="subsec subsec--fp reveal">' + esc(g.label)
      +   '<span class="subsec-yr">' + esc(g.note) + ' &#183; ' + g.items.length + '</span>'
      + '</h3>'
      + '<div class="flyer-grid" data-cols="' + colsFor(g.items.length) + '">'
      +   tiles + '</div>'
      + '<a class="files-picmore" href="' + esc(g.href) + '" data-magnetic>'
      +   'Where they are shown &#8599;</a>'
      + '</section>';
  }).join('');

  root.innerHTML = html;

  /* the count in the heading above, so it is the real number and not a number
     written into the copy that can go stale */
  var n = document.getElementById('filesPicsN');
  if (n) n.textContent = total;

  /* reveal.js has already run, so these nodes have to be handed back; it is
     idempotent and picks up the new ones. gallery.js needs no such call: its
     image-link handler is delegated from the document, which is exactly why
     it catches links written after it ran. */
  if (typeof window.AEreveal === 'function') window.AEreveal(root);
})();
