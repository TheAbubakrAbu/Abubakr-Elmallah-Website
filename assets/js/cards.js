/* cards.js: renders app/bot cards from APP_CARDS (see apps-data.js).

   Markup parity: produces the exact same .app-card structure the pages used to
   hand-write, so cardlink.js / tilt.js / reveal.js / gallery.js keep working.

   Usage in a page: give a grid the IDs to render, in order:
     <div class="apps-grid" data-cards="zotfinder,uci-now,uci-esports,peterplate"></div>
     <div class="hs-grid" data-projects="hs-datapad,hs-calculator"></div>
   Never hand-write a card in a page: add it to apps-data.js and list its id
   here, so the same app on five pages stays one thing to edit.
   Add the `data-cards-cat` attribute to also show each card's theme pill
   ("Star Wars ↗" / "Islamic ↗"): used on the projects catalog, omitted on the
   themed pages. This file must load AFTER apps-data.js and BEFORE
   reveal.js / tilt.js / cardlink.js so those enhancers see the cards. */
(function () {
  var IMG = '../assets/img/';

  function badge(b) {
    if (!b) return '';
    var cls = 'app-badge' + (b.dead ? ' app-badge--dead' : '');
    return b.href
      ? '<a class="' + cls + '" href="' + b.href + '" target="_blank" rel="noopener">' + b.text + '</a>'
      : '<span class="' + cls + '">' + b.text + '</span>';
  }

  function head(d) {
    return '<div class="app-head">'
      + '<img class="app-icon" src="' + IMG + d.icon + '" alt="' + d.alt + '" loading="lazy" />'
      + badge(d.badge)
      + '</div>';
  }

  function cat(d, showCat) {
    if (!showCat || !d.cat) return '';
    return '<a class="app-cat ' + d.cat.cls + '" href="' + d.cat.href + '">' + d.cat.label + '</a>';
  }

  function shots(d) {
    if (!d.shots || !d.shots.length) return '';
    return '<div class="app-shots" aria-label="Award proof">' + d.shots.map(function (s) {
      var ic = s.imgClass ? ' class="' + s.imgClass + '"' : '';
      return '<figure><a href="' + IMG + s.src + '">'
        + '<img' + ic + ' src="' + IMG + s.src + '" alt="' + s.alt + '" loading="lazy" /></a>'
        + '<figcaption>' + s.caption + '</figcaption></figure>';
    }).join('') + '</div>';
  }

  function foot(d) {
    var links = (d.links || []).map(function (l) {
      return '<a href="' + l.href + '" target="_blank" rel="noopener">' + l.label + '</a>';
    }).join('');
    var right = d.dead
      ? '<span class="app-links"><span class="app-dead">' + d.deadNote + '</span>' + links + '</span>'
      : '<span class="app-links">' + links + '</span>';
    return '<div class="app-foot"><span class="app-tags">' + d.tags + '</span>' + right + '</div>';
  }

  // Render a single card by id. opts.showCat toggles the theme pill.
  function renderAppCard(id, opts) {
    opts = opts || {};
    var d = (window.APP_CARDS || {})[id];
    if (!d) { console.warn('[cards] unknown app id:', id); return ''; }
    var cls = 'app-card';
    if (d.feature) cls += ' app-card--feature';
    if (d.dead) cls += ' app-card--dead';
    if (d.stackLinks) cls += ' app-card--stack';
    cls += ' reveal';
    return '<article class="' + cls + '">'
      + head(d)
      + cat(d, opts.showCat)
      + '<h3>' + d.title + '</h3>'
      + '<p class="app-sub">' + d.sub + '</p>'
      + '<p>' + d.desc + '</p>'
      + shots(d)
      + foot(d)
      + '</article>';
  }
  window.renderAppCard = renderAppCard;

  // Render a single high-school project card by id (see PROJ_CARDS).
  function renderProjCard(id) {
    var d = (window.PROJ_CARDS || {})[id];
    if (!d) { console.warn('[cards] unknown project id:', id); return ''; }
    var ls = d.links || [];
    var links = ls.map(function (l) {
      return '<a href="' + l.href + '" target="_blank" rel="noopener">' + l.label + '</a>';
    }).join('');
    var media = d.href || (ls[0] && ls[0].href) || '';
    return '<article class="proj-card reveal">'
      + '<a class="proj-media" href="' + media + '" target="_blank" rel="noopener">'
      + '<img src="' + IMG + d.img + '" alt="' + d.alt + '" loading="lazy" /></a>'
      + '<div class="proj-info">'
      + '<div class="proj-titlerow"><h3>' + d.title + '</h3><span class="proj-yr">' + d.year + '</span></div>'
      + (d.grade ? '<span class="proj-grade">' + d.grade + '</span>' : '')
      + '<span class="app-tags">' + d.tags + '</span>'
      + '<div class="app-links">' + links + '</div>'
      + '</div></article>';
  }
  window.renderProjCard = renderProjCard;

  // Fill every <… data-cards="id1,id2,…"> grid with its cards, in listed order.
  // Same for <… data-projects="…"> using the PROJ_CARDS table.
  function fill(attr, render) {
    var grids = document.querySelectorAll('[' + attr + ']');
    for (var i = 0; i < grids.length; i++) {
      var grid = grids[i];
      var showCat = grid.hasAttribute('data-cards-cat');
      var ids = grid.getAttribute(attr).split(',');
      var html = '';
      for (var j = 0; j < ids.length; j++) {
        var id = ids[j].trim();
        if (id) html += render(id, { showCat: showCat });
      }
      grid.innerHTML = html;
    }
  }

  function mount() {
    fill('data-cards', renderAppCard);
    fill('data-projects', renderProjCard);
  }
  window.mountAppCards = mount;
  mount();
})();
