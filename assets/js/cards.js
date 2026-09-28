/* cards.js: renders app/bot cards from APP_CARDS (see apps-data.js).

   Markup parity: produces the exact same .app-card structure the pages used to
   hand-write, so cardlink.js / tilt.js / reveal.js / gallery.js keep working.

   Usage in a page: give a grid the IDs to render, in order:
     <div class="apps-grid" data-cards="zotfinder,uci-now,uci-esports,peterplate"></div>
     <div class="hs-grid" data-projects="hs-datapad,hs-calculator"></div>
   Never hand-write a card in a page: add it to apps-data.js and list its id
   here, so the same app on five pages stays one thing to edit.
   An entry with a `long` array also gets the hidden .app-more panel and the
   "Read more" button; expand.js (loaded after this) opens them. See block()
   for the headings, lists and number strips a `long` array can hold.
   Add the `data-cards-cat` attribute to also show each card's theme pill
   ("Star Wars ↗" / "Islamic ↗"): used on the projects catalog, omitted on the
   themed pages. This file must load AFTER apps-data.js and BEFORE
   reveal.js / tilt.js / cardlink.js so those enhancers see the cards. */
(function () {
  var IMG = '../assets/img/';

  /* A badge's leading emoji (the trophy on an award) is drawn, not read: a
     screen reader said "trophy, Congressional Challenge '23". The wording in
     apps-data.js is unchanged. */
  function badge(b) {
    if (!b) return '';
    var cls = 'app-badge' + (b.dead ? ' app-badge--dead' : '');
    var text = b.text.replace(/^(\p{Extended_Pictographic}\uFE0F?)\s*/u, '<span aria-hidden="true">$1 </span>');
    return b.href
      ? ext(b.href, text, cls)
      : '<span class="' + cls + '">' + text + '</span>';
  }

  function head(d) {
    return '<div class="app-head">'
      + '<img class="app-icon" src="' + IMG + d.icon + '" alt="' + d.alt + '" loading="lazy" decoding="async" />'
      + badge(d.badge)
      + '</div>';
  }

  /* EVERY card emits the SAME sequence of parts, even the ones it doesn't
     have: an absent theme pill / award shot / "Read more" is an empty slot
     element, never nothing at all. That is what lets the cards share row
     lines through subgrid (see components.css), so titles line up with
     titles and footers with footers right across a row. Return '' from any
     of these and every part below it in that card slides up a row. */
  var SLOT = '<span class="app-slot" aria-hidden="true"></span>';

  /* An outbound text link. The ↗ is drawn but not read: a screen reader used
     to say "north east arrow" at the end of every link name. What it hears
     instead is that the link opens a new tab (.vh is visually hidden, base.css). */
  // markup to plain words: a <br> becomes a space, tags go (the index and labels use it)
  function strip(h) { return String(h || '').replace(/<br\s*\/?>/g, ' ').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim(); }

  var NEWTAB = '<span class="vh"> (opens in a new tab)</span>';

  /* A " · " run (a date line, a tag line) breaks only BETWEEN its parts, each
     keeping its dot: on a phone it used to break inside them ("Remastered by
     me May / 29, 2025", "Discord · / Python"). */
  function runs(s) {
    var parts = String(s == null ? '' : s).split(' · ');
    if (parts.length < 2) return s;
    return parts.map(function (t, i) {
      return '<span class="nw">' + t + (i < parts.length - 1 ? ' ·' : '') + '</span>';
    }).join(' ');
  }
  function ext(href, label, cls) {
    var arrow = /↗\s*$/.test(label);
    return '<a' + (cls ? ' class="' + cls + '"' : '') + ' href="' + href + '" target="_blank" rel="noopener">'
      + label.replace(/\s*↗\s*$/, '') + (arrow ? '<i aria-hidden="true"> ↗</i>' : '') + NEWTAB + '</a>';
  }

  function cat(d, showCat) {
    if (!showCat || !d.cat) return SLOT;
    /* same-tab link to the category's page: the arrow is drawn, not read */
    var arrow = /↗\s*$/.test(d.cat.label);
    return '<a class="app-cat ' + d.cat.cls + '" href="' + d.cat.href + '">'
      + d.cat.label.replace(/\s*↗\s*$/, '') + (arrow ? '<span aria-hidden="true"> ↗</span>' : '') + '</a>';
  }

  function shots(d) {
    if (!d.shots || !d.shots.length) return SLOT;
    return '<div class="app-shots" role="group" aria-label="Award proof">' + d.shots.map(function (s) {
      var ic = s.imgClass ? ' class="' + s.imgClass + '"' : '';
      return '<figure><a href="' + IMG + s.src + '">'
        + '<img' + ic + ' src="' + IMG + s.src + '" alt="' + s.alt + '" loading="lazy" decoding="async" /></a>'
        + '<figcaption>' + s.caption + '</figcaption></figure>';
    }).join('') + '</div>';
  }

  /* One entry of a `long` write-up. Most are paragraph strings; the longer
     write-ups also use three shapes so a page of text stays scannable:
       { h: 'Heading' }                     a subheading inside the panel
       { list: ['…', '…'] }                 a bulleted list
       { facts: [['6,236', 'ayahs'], …] }   a strip of headline numbers */
  function block(p) {
    if (typeof p === 'string') return '<p>' + p + '</p>';
    if (p.h) return '<h4 class="app-more-h">' + p.h + '</h4>';
    if (p.list) return '<ul class="app-more-list" role="list">' + p.list.map(function (li) {
      return '<li>' + li + '</li>';
    }).join('') + '</ul>';
    /* the tiles are laid out in balanced rows (six as 3 + 3, eight as 4 + 4)
       rather than as many as fit, which left a single tile on a row of its own */
    if (p.facts) return '<ul class="app-more-facts" role="list" style="--cols:'
      + (p.facts.length <= 4 ? p.facts.length : Math.ceil(p.facts.length / 2)) + '">'
      + p.facts.map(function (f) {
      return '<li><strong>' + f[0] + '</strong><span>' + f[1] + '</span></li>';
    }).join('') + '</ul>';
    return '';
  }

  /* The expandable panel: the full write-up plus big action buttons.
     Rendered only for cards that have a `long` array; expand.js opens it.
     `hidden` keeps it out of the flow (and out of the accessibility tree)
     until the card is opened. It ends with a second "Show less": a long
     write-up puts the one above it a few screens away, and expand.js brings
     the card back into view when this one folds it. */
  function more(d) {
    if (!d.long || !d.long.length) return '';   // no slot: display:none takes no row anyway
    var body = d.long.map(block).join('');
    var acts = (d.links || []).map(function (l) {
      return '<a class="app-action" href="' + l.href + '" target="_blank" rel="noopener">'
        + '<span>' + l.label.replace(/\s*↗\s*$/, '') + '</span><i aria-hidden="true">↗</i>' + NEWTAB + '</a>';
    }).join('');
    var note = d.dead ? '<p class="app-more-dead">' + d.deadNote + '</p>' : '';
    var end = '<button class="app-expand app-expand--end" type="button" aria-expanded="false">'
      + '<span class="app-expand-t">Show less</span><i aria-hidden="true">↓</i></button>';
    return '<div class="app-more" hidden><div class="app-more-body">' + body + '</div>'
      + note + (acts ? '<div class="app-actions">' + acts + '</div>' : '') + end + '</div>';
  }

  // the "Read more / Show less" toggle; expand.js wires it up
  function opener(d) {
    if (!d.long || !d.long.length) return SLOT;
    return '<button class="app-expand" type="button" aria-expanded="false">'
      + '<span class="app-expand-t">Read more</span><i aria-hidden="true">↓</i></button>';
  }

  function foot(d) {
    var links = (d.links || []).map(function (l) {
      return ext(l.href, l.label);
    }).join('');
    var right = d.dead
      ? '<span class="app-links"><span class="app-dead">' + d.deadNote + '</span>' + links + '</span>'
      : '<span class="app-links">' + links + '</span>';
    return '<div class="app-foot"><span class="app-tags">' + runs(d.tags) + '</span>' + right + '</div>';
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
    if (d.long && d.long.length) cls += ' is-expandable';
    cls += ' reveal';
    /* id="app-<id>" so a card can be linked to directly (the "Latest" pill on
       the home hero points at /projects/#app-hadith-json-engine). A page can
       list a card twice (PeterPlate is UCI work and web work), so only the
       first copy carries the id; fill() says which one that is. */
    var domId = opts.domId || (opts.anchor === false ? '' : 'app-' + id);
    return '<article' + (domId ? ' id="' + domId + '"' : '') + ' class="' + cls + '">'
      + head(d)
      + cat(d, opts.showCat)
      + '<h3>' + d.title + '</h3>'
      + '<p class="app-sub">' + runs(d.sub) + '</p>'
      + '<p>' + d.desc + '</p>'
      + shots(d)
      + opener(d)
      + more(d)
      + foot(d)
      + '</article>';
  }
  window.renderAppCard = renderAppCard;

  // Render a single high-school project card by id (see PROJ_CARDS).
  function renderProjCard(id, opts) {
    opts = opts || {};
    var d = (window.PROJ_CARDS || {})[id];
    if (!d) { console.warn('[cards] unknown project id:', id); return ''; }
    var ls = d.links || [];
    var links = ls.map(function (l) {
      return ext(l.href, l.label);
    }).join('');
    /* The screenshot opens full size in the lightbox (gallery.js takes any
       link to an image): drawn at 107-295px wide, the code and menus in these
       were unreadable, and the screenshot used to be just a second link to
       the project. The footer links, and the card itself (cardlink.js), still
       go to the project. target=_blank is only the no-JS fallback. */
    var media = IMG + d.img;
    var cls = 'proj-card' + (d.long && d.long.length ? ' is-expandable' : '') + ' reveal';
    var domId = opts.domId || (opts.anchor === false ? '' : 'proj-' + id);
    return '<article' + (domId ? ' id="' + domId + '"' : '') + ' class="' + cls + '">'
      + '<a class="proj-media' + (d.crop ? ' proj-media--crop' : '') + '" href="' + media + '" data-label="' + strip(d.title) + '" target="_blank" rel="noopener">'
      + '<img src="' + IMG + d.img + '" alt="' + d.alt + '" loading="lazy" decoding="async" /><span class="vh"> (full size)</span></a>'
      + '<div class="proj-info">'
      + '<div class="proj-titlerow"><h3>' + d.title + '</h3><span class="proj-yr">' + d.year + '</span></div>'
      + (d.grade ? '<span class="proj-grade">' + d.grade + '</span>' : SLOT)
      + '<span class="app-tags">' + runs(d.tags) + '</span>'
      + opener(d)
      + more(d)
      + '<div class="app-links">' + links + '</div>'
      + '</div></article>';
  }
  window.renderProjCard = renderProjCard;

  // Fill every <… data-cards="id1,id2,…"> grid with its cards, in listed order.
  // Same for <… data-projects="…"> using the PROJ_CARDS table.
  function fill(attr, render) {
    var grids = document.querySelectorAll('[' + attr + ']');
    /* The first copy of a card on the page is app-<id>, so links to it keep
       working; a second copy (PeterPlate is UCI work and web work) is
       app-<id>-2, so the index can link each row to its own copy rather than
       sending "My Web Work" 5,000px back up to "My UCI Work". */
    var seen = {};
    var prefix = attr === 'data-projects' ? 'proj-' : 'app-';
    for (var i = 0; i < grids.length; i++) {
      var grid = grids[i];
      var showCat = grid.hasAttribute('data-cards-cat');
      var ids = grid.getAttribute(attr).split(',');
      var html = '';
      for (var j = 0; j < ids.length; j++) {
        var id = ids[j].trim();
        if (!id) continue;
        seen[id] = (seen[id] || 0) + 1;
        html += render(id, { showCat: showCat, domId: prefix + id + (seen[id] > 1 ? '-' + seen[id] : '') });
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

  /* ── "At a glance" (_includes/glance.html) ──
     The summary at the top of a page, built from the cards already on it, so
     it is never a second list to keep in step with the first. Every grid in
     <main> becomes a group, named by the .subsec heading above it (or the
     grid's data-label), and every card a row that links to the card. */

  /* The year a thing is FROM, for me: "Remastered by me May 29, 2025" means
     2025 even though the app is from 2014; a span becomes "2023–26". */
  function yearOf(sub) {
    var s = String(sub || '');
    var mine = /by me.*?((?:19|20)\d\d)/.exec(s);
    if (mine) return mine[1];
    var ys = s.match(/\b(?:19|20)\d\d\b/g) || [];
    if (ys.length > 1 && ys[0] !== ys[ys.length - 1] && /\u2013|&#8211;/.test(s)) {
      return ys[0] + '\u2013' + ys[ys.length - 1].slice(2);
    }
    return ys[0] || '';
  }

  // what kind of thing it is, as chips: award, retired, where it lives
  function chipsOf(d) {
    var ls = d.links || [], c = [];
    var has = function (re) { return ls.some(function (l) { return re.test(l.href); }); };
    if (d.badge && /\u{1F3C6}/u.test(d.badge.text)) c.push(['award', strip(d.badge.text.replace(/\u{1F3C6}/u, ''))]);
    if (d.dead) c.push(['dead', (strip(d.deadNote).split(' ')[0] || 'Retired')]);
    if (has(/apps\.apple\.com/)) c.push(['store', 'App Store']);
    if (has(/github\.com/)) c.push(['open', 'Open source']);
    if (has(/discord/)) c.push(['plain', 'Discord']);
    if (/Internal/.test(d.tags || '')) c.push(['plain', 'Internal']);
    if (has(/studio\.code\.org/)) c.push(['plain', 'Code.org']);
    if (has(/scratch\.mit\.edu/)) c.push(['plain', 'Scratch']);
    return c;
  }

  /* the heading a grid sits under: the nearest .subsec before it. Two grids
     under one heading (the Islamic apps are a row of three, then a row of two)
     both find it, and glance() folds them back into one group. */
  function groupName(grid) {
    if (grid.getAttribute('data-label')) return grid.getAttribute('data-label');
    for (var el = grid.previousElementSibling; el; el = el.previousElementSibling) {
      if (el.matches('.subsec')) {
        // the name alone: not the subtitle, nor text that is only for screen readers
        var h = el.cloneNode(true);
        h.querySelectorAll('.subsec-yr, .vh').forEach(function (x) { x.remove(); });
        return h.textContent.trim();
      }
    }
    return 'Apps';
  }

  // the id of the section heading a grid sits under, if it has one
  function groupAnchor(grid) {
    if (grid.getAttribute('data-label')) return '';
    for (var el = grid.previousElementSibling; el; el = el.previousElementSibling) {
      if (el.matches('.subsec')) return el.id || '';
    }
    return '';
  }

  /* The index draws each picture at 30px, so it reads a 96px thumbnail
     (tools/thumbs.py) rather than the card's own 512px icon or 1400px
     screenshot; if one has not been made yet it falls back to the full file. */
  var THUMB = IMG + 'thumbs/';
  function thumbOf(path) { return THUMB + String(path).replace(/\.\w+$/, '.webp'); }

  function glance() {
    var boxes = document.querySelectorAll('[data-glance]');
    if (!boxes.length) return;
    var APPS = window.APP_CARDS || {}, PROJS = window.PROJ_CARDS || {};
    var grids = document.querySelectorAll('main [data-cards], main [data-projects]');
    var groups = [], all = [], anyProj = false;
    Array.prototype.forEach.call(grids, function (grid) {
      var proj = grid.hasAttribute('data-projects');
      var rows = grid.getAttribute(proj ? 'data-projects' : 'data-cards').split(',').map(function (k) {
        k = k.trim();
        var d = (proj ? PROJS : APPS)[k];
        if (!d) return null;
        if (proj) anyProj = true;
        var pic = proj ? d.img : d.icon;
        var row = { key: (proj ? 'proj-' : 'app-') + k, href: '#' + (proj ? 'proj-' : 'app-') + k, title: strip(d.title),
          icon: thumbOf(pic), full: IMG + pic, thumb: proj,
          year: proj ? strip(d.year) : yearOf(d.sub), chips: chipsOf(d) };
        all.push(row);
        return row;
      }).filter(Boolean);
      if (!rows.length) return;
      /* each row links to the copy of the card in THIS grid (fill() gave a
         second copy its own id) */
      var cards = grid.querySelectorAll(':scope > article[id]');
      rows.forEach(function (r, i) { if (cards[i]) r.href = '#' + cards[i].id; });
      var name = groupName(grid), last = groups[groups.length - 1];
      if (last && last.name === name) last.rows = last.rows.concat(rows);
      else groups.push({ name: name, anchor: groupAnchor(grid), rows: rows });
    });
    /* A card listed twice keeps both rows (it belongs to both groups), each
       linking to its own copy, but is counted once. */
    var uniq = {};
    all = all.filter(function (r) { return uniq[r.key] ? false : (uniq[r.key] = true); });

    var n = function (kind) { return all.filter(function (r) { return r.chips.some(function (c) { return c[0] === kind; }); }).length; };
    var parts = [all.length + ' ' + (anyProj ? 'projects' : 'apps')];
    if (n('store')) parts.push(n('store') + ' on the App Store');
    if (n('open')) parts.push(n('open') + ' open source');
    // "honors", not "awards": one of them is an App Store Top 10 ranking
    if (n('award')) parts.push(n('award') + (n('award') === 1 ? ' honor' : ' honors'));

    var html = groups.map(function (g, gi) {
      var gid = 'glance-g-' + gi;
      // the group name jumps to its section, where the section has an id
      var label = g.anchor ? '<a href="#' + g.anchor + '">' + g.name + '</a>' : g.name;
      return '<div class="glance-group"><p class="glance-h" id="' + gid + '">' + label + '</p>'
        + '<ul role="list" aria-labelledby="' + gid + '">'
        + g.rows.map(function (r) {
          return '<li><a class="glance-row" href="' + r.href + '">'
            + '<img class="glance-ic' + (r.thumb ? ' glance-ic--thumb' : '') + '" src="' + r.icon + '" alt="" width="30" height="30" loading="lazy" decoding="async"'
            + ' onerror="this.onerror=null;this.src=\'' + r.full + '\'" />'
            + '<span class="glance-t">' + r.title + '</span>'
            + '<span class="glance-y">' + r.year + '</span>'
            + '<span class="glance-chips">' + r.chips.map(function (c) {
              return '<i class="gc gc--' + c[0] + '">' + (c[0] === 'award' ? '\u{1F3C6} ' : '') + c[1] + '</i>';
            }).join('') + '</span>'
            + '</a></li>';
        }).join('') + '</ul></div>';
    }).join('');

    /* A phone gets it folded: the index is a screen or two long there, and
       the count on the fold already says what is in it. */
    var narrow = window.matchMedia && matchMedia('(max-width: 640px)').matches;
    Array.prototype.forEach.call(boxes, function (box) {
      var count = box.querySelector('[data-glance-count]');
      var index = box.querySelector('[data-glance-index]');
      if (count) count.innerHTML = parts.map(function (t, i) {
        return '<span>' + t + (i < parts.length - 1 ? ' \u00b7' : '') + '</span>';
      }).join(' ');
      if (index) index.innerHTML = html;
      if (narrow) box.removeAttribute('open');
    });
  }
  glance();

  /* A link straight to a card (/projects/#app-… or #proj-…). The cards are
     written by this script, and the lazy images above them settle after the
     browser has already made its one attempt at the fragment, so it can land
     a screen off. Once everything has loaded, bring the card's top in below
     the top bar ('start' honours the page's scroll-padding; 'center' put a
     tall card's top under the bar). */
  var target = /^#(app|proj)-[\w-]+$/.test(location.hash) && document.querySelector(location.hash);
  if (target) {
    window.addEventListener('load', function () {
      target.scrollIntoView({ block: 'start' });
    });
  }
})();
