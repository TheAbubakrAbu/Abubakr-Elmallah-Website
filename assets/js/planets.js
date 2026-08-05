/* planets.js: renders the galactic atlas from SW_PLANETS (see planets-data.js).

   Every planet is a stack of CSS layers, not an image:
     .pl-skin > .pl-band    the surface, twice as wide as the sphere and slid
                            one tile per cycle so it reads as rotation
     .pl-skin > .pl-cloud   a second, slower layer for weather
     .pl-shade              static sphere lighting (rim light + terminator)
   Optional: rings, a moon, a superlaser dish, a weapon well.

   Must load AFTER planets-data.js and BEFORE reveal.js so the cards get the
   scroll-in treatment like everything else on the site. */
(function planets() {
  var root = document.getElementById('planetAtlas');
  var groups = window.SW_PLANETS;
  if (!root || !groups) return;

  var esc = function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); };

  function sphere(w) {
    return '<div class="pl-globe">'
      + (w.ring ? '<span class="pl-ring" aria-hidden="true"></span>' : '')
      + '<div class="planet" data-type="' + w.type + '">'
      +   '<span class="pl-skin"><i class="pl-band"></i><i class="pl-cloud"></i></span>'
      +   (w.dish   ? '<span class="pl-dish"></span>'   : '')
      +   (w.weapon ? '<span class="pl-weapon"></span>' : '')
      +   (w.wip    ? '<span class="pl-wip"></span>'    : '')
      +   '<span class="pl-shade"></span>'
      + '</div>'
      + (w.ring ? '<span class="pl-ring pl-ring--front" aria-hidden="true"></span>' : '')
      + (w.moon ? '<span class="pl-moon" aria-hidden="true"><i></i></span>' : '')
      + '<span class="pl-scan" aria-hidden="true"></span>'
      + '</div>';
  }

  // the palette lives on the card so the border, title and reticle can all
  // tint themselves from the same world
  function card(w) {
    var c = w.colors;
    var css = '--c1:' + c[0] + ';--c2:' + c[1] + ';--c3:' + c[2] + ';--glow:' + w.glow
            + ';--spin:' + (w.spin || 44) + 's';
    return '<article class="pl-card reveal" style="' + css + '">'
      + sphere(w)
      + '<div class="pl-body">'
      +   '<div class="pl-titlerow"><h4>' + esc(w.name) + '</h4><span class="pl-src">' + esc(w.src) + '</span></div>'
      +   '<p class="pl-desc">' + esc(w.desc) + '</p>'
      +   '<span class="pl-meta">' + esc(w.meta) + '</span>'
      + '</div>'
      + '</article>';
  }

  function group(g, i) {
    return '<section class="pl-group" data-era="' + g.id + '"' + (i === 0 ? '' : ' hidden') + '>'
      + '<h3 class="subsec subsec--sw reveal">' + esc(g.label)
      +   '<span class="subsec-yr">' + esc(g.note) + '</span>'
      +   '<span class="pl-count">' + g.worlds.length + '</span>'
      + '</h3>'
      + '<div class="pl-grid">' + g.worlds.map(card).join('') + '</div>'
      + '</section>';
  }

  /* ── filter chips: one era at a time, opening on the first ── */
  var chips = groups.map(function (g, i) {
    return '<button class="chip chip--sw' + (i === 0 ? ' is-active' : '') + '" type="button" data-era="'
         + g.id + '" data-magnetic>' + esc(g.label.replace(' Planets', ''))
         + ' <em>' + g.worlds.length + '</em></button>';
  }).join('');

  root.innerHTML = '<div class="filters pl-filters reveal">' + chips + '</div>'
                 + groups.map(group).join('');

  /* Every card in here carries .reveal, which means it starts at opacity 0 and
     only appears once reveal.js observes it. reveal.js scans once on load, so
     if this file happens to run after it -- as it does on /star-wars/, where
     the script tags are in the wrong order -- nothing would ever be observed
     and the whole atlas would render as blank space.

     Handing the new markup back to reveal.js makes the order irrelevant, which
     is better than depending on a script tag staying where it is. */
  if (typeof window.AEreveal === 'function') {
    window.AEreveal(root);
  } else {
    var late = root.querySelectorAll('.reveal');
    for (var i = 0; i < late.length; i++) late[i].classList.add('in');
  }

  /* ── filtering: show one era, or all of them ── */
  var sections = root.querySelectorAll('.pl-group');
  root.addEventListener('click', function (e) {
    var btn = e.target.closest('.chip--sw');
    if (!btn) return;
    var era = btn.dataset.era;
    root.querySelectorAll('.chip--sw').forEach(function (c) {
      c.classList.toggle('is-active', c === btn);
    });
    sections.forEach(function (s) {
      var show = s.dataset.era === era;
      s.hidden = !show;
      // sections revealed after their scroll trigger already fired stay hidden
      if (show) s.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
    });
  });
})();

/* starfield parallax: the space layers drift against the scroll, slowest
   layer furthest away. Cheap: one rAF-throttled custom property write. */
(function spaceParallax() {
  var space = document.querySelector('.sw-space');
  if (!space || reduceMotion) return;
  var raf = 0;
  function paint() {
    raf = 0;
    space.style.setProperty('--sy', (window.scrollY * 0.05).toFixed(1) + 'px');
  }
  addEventListener('scroll', function () {
    if (!raf) raf = requestAnimationFrame(paint);
  }, { passive: true });
  paint();
})();
