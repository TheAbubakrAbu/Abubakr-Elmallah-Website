/* fanpage.js: one renderer for all six franchise pages.

   Each page ships a data file that sets window.FAN_PAGE = { sections: [...] };
   this walks it and writes the markup into #fanBody. The look is entirely in
   fanpages.css, scoped by <body data-fan="sw|hp|mcu|mc|potc|jp">, so the same
   five section kinds read completely differently from page to page.

     kind: 'cards'     grid of title / sub / desc / meta cards
     kind: 'rank'      numbered list: films in order, books, phases
     kind: 'timeline'  when → what, stacked down a rule
     kind: 'tiles'     compact colour-chips (sabers, spells, ores, stones)
     kind: 'quotes'    pull quotes with an attribution

   A section may also carry `season: N`, which tags it so a page can react to
   it on scroll (Stranger Things repaints its backdrop season by season).

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

    tiles: function (s) {
      return '<div class="fan-tiles">' + s.items.map(function (it) {
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
  };

  root.innerHTML = (page.sections || []).map(function (s) {
    var build = KINDS[s.kind] || KINDS.cards;
    return '<section class="fan-sec" id="' + esc(s.id || '') + '"'
      + (s.season ? ' data-season="' + s.season + '"' : '') + '>'
      + '<h3 class="subsec subsec--fan reveal">' + esc(s.title)
      +   (s.note ? '<span class="subsec-yr">' + esc(s.note) + '</span>' : '')
      + '</h3>'
      + (s.lede ? '<p class="fan-lede reveal">' + esc(s.lede) + '</p>' : '')
      + build(s)
      + '</section>';
  }).join('');
})();
