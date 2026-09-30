/* search.js: find anything on the page you are on, and the page it is on.

   One dialog, opened by the magnifier in the top bar, by "/" anywhere that is
   not already a text field, or by Cmd/Ctrl+K. It answers two questions at
   once, in this order:

     On this page   every card, tile, caption, heading and paragraph the page
                    has actually rendered, read out of the DOM when the dialog
                    opens rather than out of any data file, so it is the same
                    on the fan pages, the galleries, /travels/ after its gate,
                    and every page that has never heard of this file.
                    Choosing one scrolls to it, opens any folded section it is
                    in, and rings it for a moment.
     Other pages    every page's title and description, from /search.json,
                    which Jekyll writes from the pages themselves at build
                    time (so a new page is searchable with no edit here).
                    Fetched the first time the dialog opens, never before.

   Matching ignores case and accents (Pokémon matches pokemon, Qurʾān matches
   quran) and wants every word typed, in any order. Nothing is sent anywhere:
   it all happens in the page.

   Loaded from the top bar include with `defer`, so it runs once the page's own
   scripts have drawn what they draw, on every page that has the top bar. */
(function search() {
  var open = document.getElementById('searchOpen');
  if (!open) return;
  var esc = window.AEesc || function (t) {
    return String(t).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };

  /* One character in, one character out, so a position found in the folded
     text is the same position in the original and a match can be marked up
     where it really is. */
  var QUOTES = { '‘': "'", '’': "'", 'ʼ': "'", 'ʾ': "'", 'ʿ': "'", '“': '"', '”': '"' };
  function fold(s) {
    var out = '';
    for (var i = 0; i < s.length; i++) {
      var c = s.charAt(i);
      out += QUOTES[c] || c.normalize('NFD').charAt(0).toLowerCase();
    }
    return out;
  }
  function words(q) { return fold(q).split(/\s+/).filter(Boolean); }
  function clean(s) { return String(s || '').replace(/\s+/g, ' ').trim(); }
  // the site index carries the pages' own front matter, entities and all
  var ent = document.createElement('textarea');
  function decode(s) { ent.innerHTML = String(s || ''); return ent.value; }

  /* ── the page's own index ──
     An item is the smallest thing worth jumping to: a whole card or tile
     (not the paragraph inside it), a caption, a heading, a paragraph that
     belongs to no card. Anything inside another item is part of that item. */
  var ITEM = 'h1, h2, h3, h4, .fan-card, .fan-tile, .fan-shot, .fan-land, .fan-rankrow, .fan-tick,'
    + ' .fan-quote, .fan-stat, .fan-era, .fan-film, .fan-saber, .fan-linkcard, .been, .fan-intro-when,'
    + ' .fr-card, .fr-door, .app-card, .proj-card, .tv-trip, .year-card, .flyer, .wall, .acad-stat,'
    + ' .ts-rows li, .ring-spec div, .edu-row, .role, .tv-told, p, li, blockquote, figcaption, dt, dd, summary';
  var SKIP = '.srch, .lightbox, .topbar, .tabbar, .footer, .rail, .skip-link, script, style, noscript, [aria-hidden="true"]';
  var TITLE = 'h1, h2, h3, h4, b, strong, .fr-name, .fan-linkhead b';

  /* The words of an element as they read on screen: a space wherever one
     element ends and the next begins (textContent runs a card's title into
     its subtitle), and nothing that is not there to be read: the "(opens in
     a new tab)" notes for screen readers, the decorative arrows, and a
     heading's small note when `drop` asks for it. */
  var QUIET = '.vh, [aria-hidden="true"], script, style';
  function txt(el, drop) {
    var out = [], last = null, sel = drop ? QUIET + ', ' + drop : QUIET;
    var w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
    for (var n = w.nextNode(); n; n = w.nextNode()) {
      var p = n.parentElement, q = p && p.closest(sel);
      if (q && el.contains(q) && q !== el) continue;
      if (last && p !== last) out.push(' ');
      out.push(n.nodeValue); last = p;
    }
    return clean(out.join(''));
  }
  var NOTE = '.subsec-yr, .fan-fold-n, .pic-n, .fr-count';

  function heading(el) {
    // the nearest section heading above an item, for context under its title
    var sec = el.closest('section, .fan-sec, .fr-group, .tv-grade');
    while (sec) {
      var h = sec.querySelector('h2, h3, .fr-grouphead, .tv-gradehead h2');
      if (h && !h.contains(el) && h !== el) return txt(h, NOTE);
      sec = sec.parentElement && sec.parentElement.closest('section, .fan-sec, .fr-group');
    }
    return '';
  }

  function pageIndex() {
    var root = document.querySelector('main') || document.body;
    var all = root.querySelectorAll(ITEM), out = [];
    for (var i = 0; i < all.length; i++) {
      var el = all[i];
      if (el.closest(SKIP)) continue;
      var up = el.parentElement && el.parentElement.closest(ITEM);
      if (up && root.contains(up)) continue;
      var text = txt(el);
      if (text.length < 2) continue;
      var t = /^H[1-4]$/.test(el.tagName) ? el : el.querySelector(TITLE);
      var title = t ? txt(t, NOTE) : '';
      if (!title || title.length > 90) title = text.length > 90 ? text.slice(0, 88) + '…' : text;
      out.push({ el: el, title: title, text: text, ft: fold(title), fx: fold(text), sec: heading(el) });
    }
    return out;
  }

  /* ── the site's index ── */
  var SITE = null, siteLoading = null;
  function siteIndex() {
    if (SITE || siteLoading) return siteLoading;
    siteLoading = fetch('/search.json', { credentials: 'same-origin' })
      .then(function (r) { return r.ok ? r.json() : []; })
      .catch(function () { return []; })
      .then(function (list) {
        var here = location.pathname.replace(/index\.html$/, '');
        SITE = (list || []).filter(function (p) { return p && p.u && p.u !== here; }).map(function (p) {
          var t = clean(decode(p.t).replace(/\s*·\s*Abubakr Elmallah\s*$/, '')) || p.u;
          var d = clean(decode(p.d));
          return { u: p.u, title: t, text: d, ft: fold(t), fx: fold(d + ' ' + p.u) };
        });
        return SITE;
      });
    return siteLoading;
  }

  /* ── ranking ── every word has to be there; the title counts for more */
  function rank(list, ws, limit) {
    var hits = [];
    for (var i = 0; i < list.length; i++) {
      var it = list[i], score = 0, ok = true;
      for (var j = 0; j < ws.length; j++) {
        var inT = it.ft.indexOf(ws[j]), inX = it.fx.indexOf(ws[j]);
        if (inT < 0 && inX < 0) { ok = false; break; }
        score += inT === 0 ? 6 : inT > 0 ? 4 : 1;
      }
      if (!ok) continue;
      if (ws.length > 1 && it.fx.indexOf(ws.join(' ')) >= 0) score += 3;
      hits.push({ it: it, score: score, i: i });
    }
    hits.sort(function (a, b) { return b.score - a.score || a.i - b.i; });
    return hits.slice(0, limit);
  }

  /* the words marked where they fall, in the original text */
  function mark(s, fs, ws) {
    var spans = [];
    ws.forEach(function (w) {
      var at = fs.indexOf(w);
      while (at >= 0 && spans.length < 40) { spans.push([at, at + w.length]); at = fs.indexOf(w, at + w.length); }
    });
    spans.sort(function (a, b) { return a[0] - b[0]; });
    var out = '', pos = 0;
    spans.forEach(function (sp) {
      if (sp[0] < pos) return;
      out += esc(s.slice(pos, sp[0])) + '<mark>' + esc(s.slice(sp[0], sp[1])) + '</mark>';
      pos = sp[1];
    });
    return out + esc(s.slice(pos));
  }
  // a window of the text around the first word it matches
  function snippet(it, ws) {
    var at = -1;
    for (var j = 0; j < ws.length && at < 0; j++) at = it.fx.indexOf(ws[j]);
    if (it.text === it.title) return '';
    var from = Math.max(0, at - 50), to = Math.min(it.text.length, (at < 0 ? 0 : at) + 110);
    var s = it.text.slice(from, to), fs = it.fx.slice(from, to);
    return (from > 0 ? '…' : '') + mark(s, fs, ws) + (to < it.text.length ? '…' : '');
  }

  /* ── the dialog, built the first time it is opened ── */
  var dlg, input, out, live, page = [], opener = null;
  function build() {
    dlg = document.createElement('div');
    dlg.className = 'srch';
    dlg.setAttribute('role', 'dialog');
    dlg.setAttribute('aria-modal', 'true');
    dlg.setAttribute('aria-label', 'Search');
    dlg.hidden = true;
    dlg.innerHTML =
      '<div class="srch-panel">'
      + '<div class="srch-bar">'
      +   '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2"/></svg>'
      +   '<canvas class="srch-orb" data-orb="searching" data-orb-size="20" data-orb-ink="--green-2" aria-hidden="true"></canvas>'
      +   '<input class="srch-in" type="search" placeholder="Search this page and the site" aria-label="Search"'
      +     ' aria-controls="srchOut" autocomplete="off" autocapitalize="off" spellcheck="false" enterkeyhint="go" />'
      +   '<button class="srch-x" type="button" aria-label="Close search"><span aria-hidden="true">Esc</span></button>'
      + '</div>'
      + '<div class="srch-out" id="srchOut"></div>'
      + '<p class="srch-live vh" aria-live="polite"></p>'
      + '</div>';
    document.body.appendChild(dlg);
    input = dlg.querySelector('.srch-in');
    out = dlg.querySelector('.srch-out');
    live = dlg.querySelector('.srch-live');
    input.addEventListener('input', run);
    dlg.querySelector('.srch-x').addEventListener('click', close);
    dlg.addEventListener('click', function (e) {
      if (e.target === dlg) return close();
      var b = e.target.closest('.srch-hit[data-i]');
      if (b) { e.preventDefault(); go(page[+b.getAttribute('data-i')]); }
    });
    dlg.addEventListener('keydown', keys);
  }

  function row(inner, attrs) {
    return '<li><' + (attrs.href ? 'a href="' + esc(attrs.href) + '"' : 'button type="button" data-i="' + attrs.i + '"')
      + ' class="srch-hit">' + inner + '</' + (attrs.href ? 'a' : 'button') + '></li>';
  }

  /* the thinking orbs (orbs.js): the magnifier becomes a turning globe
     while there is something typed, and the empty dialog has a larger one */
  function orbs(root) { if (window.AEorb) window.AEorb.scan(root); }

  function run() {
    var q = input.value, ws = words(q);
    dlg.querySelector('.srch-bar').classList.toggle('is-typing', ws.length > 0);
    if (!ws.length) {
      if (out.querySelector('.srch-empty')) return;
      out.innerHTML = '<canvas class="srch-empty-orb" data-orb="searching" data-orb-size="64" data-orb-ink="--green-2" aria-hidden="true"></canvas>'
        + '<p class="srch-empty">Type to search ' + esc(document.title.replace(/\s*·.*$/, '') || 'this page')
        + ', then every other page. <kbd>/</kbd> or <kbd>⌘K</kbd> opens this anywhere.</p>';
      live.textContent = '';
      orbs(dlg);
      return;
    }
    var mine = rank(page, ws, 40);
    var html = '<h2 class="srch-h">On this page <i>' + (mine.length === 40 ? '40+' : mine.length) + '</i></h2>';
    html += mine.length
      ? '<ul>' + mine.map(function (h) {
          var it = h.it, sn = snippet(it, ws);
          return row('<b>' + mark(it.title, it.ft, ws) + '</b>'
            + (it.sec && it.sec !== it.title ? '<i>' + esc(it.sec) + '</i>' : '')
            + (sn ? '<span>' + sn + '</span>' : ''), { i: page.indexOf(it) });
        }).join('') + '</ul>'
      : '<p class="srch-none">Nothing on this page.</p>';
    out.innerHTML = html + '<div class="srch-site"></div>';
    var n = mine.length;
    var fill = function (list) {
      if (input.value !== q) return;           // typed on since: a newer run owns the box
      var site = rank(list || [], ws, 10);
      var box = out.querySelector('.srch-site');
      if (!box) return;
      box.innerHTML = site.length
        ? '<h2 class="srch-h">Other pages <i>' + site.length + '</i></h2><ul>' + site.map(function (h) {
            var it = h.it;
            return row('<b>' + mark(it.title, it.ft, ws) + '</b><i>' + esc(it.u) + '</i>'
              + (it.text ? '<span>' + esc(it.text.length > 140 ? it.text.slice(0, 138) + '…' : it.text) + '</span>' : ''),
              { href: it.u });
          }).join('') + '</ul>'
        : '';
      live.textContent = n + (n === 1 ? ' result' : ' results') + ' on this page, '
        + site.length + (site.length === 1 ? ' other page' : ' other pages');
    };
    if (SITE) fill(SITE); else siteIndex().then(fill);
  }

  function hits() { return Array.prototype.slice.call(out.querySelectorAll('.srch-hit')); }
  function keys(e) {
    if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); return close(); }
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp' && e.key !== 'Enter') return;
    var list = hits(), at = list.indexOf(document.activeElement);
    if (e.key === 'Enter') {
      if (document.activeElement === input && list.length) { e.preventDefault(); list[0].click(); }
      return;
    }
    e.preventDefault();
    if (e.key === 'ArrowDown') (list[at + 1] || list[0] || input).focus();
    else if (at <= 0) input.focus();
    else list[at - 1].focus();
  }

  /* everything outside the dialog is inert while it is open, the same way
     the lightbox does it (gallery.js) */
  function setInert(on) {
    Array.prototype.forEach.call(document.body.children, function (n) {
      if (n !== dlg && n.tagName !== 'SCRIPT') n.inert = on;
    });
  }

  function show() {
    if (!dlg) build();
    if (!dlg.hidden) return;
    opener = document.activeElement;
    page = pageIndex();
    dlg.hidden = false;
    document.documentElement.classList.add('srch-lock');
    setInert(true);
    open.setAttribute('aria-expanded', 'true');
    input.focus();
    input.select();
    run();
    siteIndex();
  }
  function close() {
    if (!dlg || dlg.hidden) return;
    dlg.hidden = true;
    document.documentElement.classList.remove('srch-lock');
    setInert(false);
    open.setAttribute('aria-expanded', 'false');
    if (opener && opener.isConnected && opener.focus) opener.focus({ preventScroll: true });
  }

  /* to a result on this page: open every fold it sits in, bring it to the
     middle of the screen, and ring it so the eye lands on it */
  function go(it) {
    if (!it) return;
    close();
    var el = it.el;
    for (var d = el.closest('details'); d; d = d.parentElement && d.parentElement.closest('details')) d.open = true;
    // anything still waiting on its scroll reveal is shown now (reveal.js adds .in)
    for (var r = el.closest('.reveal'); r; r = r.parentElement && r.parentElement.closest('.reveal')) r.classList.add('in');
    var smooth = !(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
    el.scrollIntoView({ block: 'center', behavior: smooth ? 'smooth' : 'auto' });
    el.classList.remove('srch-ring');
    void el.offsetWidth;
    el.classList.add('srch-ring');
    setTimeout(function () { el.classList.remove('srch-ring'); }, 2200);
  }

  open.setAttribute('aria-expanded', 'false');
  open.addEventListener('click', show);
  addEventListener('keydown', function (e) {
    var t = e.target, typing = t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName));
    if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey) && !e.altKey) { e.preventDefault(); show(); return; }
    if (e.key === '/' && !typing && !e.metaKey && !e.ctrlKey && !e.altKey) { e.preventDefault(); show(); }
  });
})();
