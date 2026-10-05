/* thinking.js: where the thinking orbs (orbs.js) live on this site.

   Most of them are written into the pages as <canvas data-orb> and drawn by
   orbs.js on its own: the footer mark, the home page's interfaces and
   contact, 404 and offline, the ten terminals. This file places the ones
   that follow a pattern instead of a page:

     the heading      a large orb behind the title of every page with a
                      .page-hero or a .fan-hero, in the state that page is
                      about (HERO below). On a world page it takes the
                      page's own accent, --a. On the home page it is a green
                      ribbon round the portrait instead.
     the roles        the node of a current role on the timeline (/work/,
                      /college/, /high-school/) is a small "working" orb: it
                      is still going.

   The search dialog (search.js), the navigation bar (utils.js), the Google
   Doc embeds (utils.js) and the résumé preview use it as their loading
   state themselves. Loaded after orbs.js from head.html, with defer. */
(function thinking() {
  'use strict';
  var O = window.AEorb;
  if (!O) return;

  /* The state for each page's heading. A hero can name its own with
     data-orb-state (404 and offline, which are served at whatever address
     was asked for); a world page not listed here gets one of the six by its
     address, so it keeps the same one every visit. */
  var HERO = {
    '/': 'composing',
    '/work/': 'solving',
    '/projects/': 'shaping',
    '/education/': 'composing',
    '/college/': 'searching',
    '/high-school/': 'composing',
    '/worlds/': 'searching',
    '/travels/': 'searching',
    '/accents/': 'listening',
    '/gaming/': 'solving',
    '/star-wars/': 'shaping',
    '/al-islam/': 'listening',
    '/worlds/quran/': 'listening',
    '/worlds/minshawi/': 'listening',
    '/worlds/sunnah/': 'composing',
    '/worlds/lego/': 'solving',
    '/worlds/legoland/': 'solving',
    '/worlds/minecraft/': 'solving',
    '/worlds/roblox/': 'solving',
    '/worlds/harry-potter/': 'composing',
    '/worlds/star-wars/': 'shaping',
    '/worlds/egypt/': 'shaping',
    '/worlds/arab/': 'searching',
    '/worlds/islam/': 'searching'
  };
  var STATES = ['working', 'searching', 'solving', 'listening', 'composing', 'shaping'];

  function stateFor(hero, path) {
    if (hero.dataset.orbState) return hero.dataset.orbState;
    if (HERO[path]) return HERO[path];
    var h = 0;
    for (var i = 0; i < path.length; i++) h = (h * 31 + path.charCodeAt(i)) >>> 0;
    return STATES[h % STATES.length];
  }

  function orb(cls, state, size, extra) {
    var c = document.createElement('canvas');
    c.className = cls;
    c.setAttribute('aria-hidden', 'true');
    c.dataset.orb = state;
    c.dataset.orbSize = size;
    for (var k in extra || {}) c.dataset[k] = extra[k];
    return c;
  }

  /* ── the heading ── */
  var hero = document.querySelector('main .page-hero, main .fan-hero, main > .hero');
  if (hero && !hero.querySelector('.hero-orb')) {
    var path = location.pathname.replace(/index\.html$/, '');
    var fan = hero.classList.contains('fan-hero');
    hero.classList.add('has-orb');
    /* the home page's right-hand side is the portrait: the orb goes round it */
    var host = hero.querySelector('.portrait') || hero;
    host.prepend(orb('hero-orb' + (host === hero ? '' : ' hero-orb--portrait'),
      stateFor(hero, path), 'fit', fan ? { orbInk: '--a' } : host === hero ? null : { orbInk: '--green-2' }));
  }

  /* ── the roles still going ── */
  document.querySelectorAll('.role--now').forEach(function (r) {
    if (r.querySelector('.role-orb')) return;
    r.classList.add('has-orb');
    r.prepend(orb('role-orb', 'working', 20, { orbInk: '#5fbf8f' }));
  });

  O.scan();
})();
