---
permalink: /sw.js
---
/* sw.js: the caching layer, and what makes this installable as an app.

   GitHub Pages pins `Cache-Control: max-age=600` and gives you no way to change
   it, so ten minutes after a visit the browser is re-fetching everything. This
   worker is the only lever available.

   THE GOAL: add it to your home screen and it behaves like an app. The whole
   site is on the device, and it opens with no internet at all.

   How that is done, in two stages, because they have different urgency:

     1. install  : the shell only (CSS, JS, the icons, the home page). Small and
                   fast, because if install fails the worker never activates.
     2. activate : then a background pass quietly downloads EVERY page and EVERY
                   image. That is the bit that makes it work offline. It runs
                   after the page is already interactive, so the visitor never
                   waits on it.

   Serving strategy, per request type:

     HTML            network-first, on a stopwatch
                                    : fresh online, but the network only gets
                                      NAV_TIMEOUT ms before we serve the cached
                                      copy instead. See "the dead tab bar".
     CSS / JS        cache-first    : safe because these carry ?v=<mtime>
                                      (see _includes/v.html), so a changed file
                                      is a different URL and misses naturally.
     Images / fonts  stale-while-revalidate
                                    : instant from cache, refreshed quietly.
                                      Images have no ?v=, so this is what stops
                                      a replaced image being stale forever.

   THE DEAD TAB BAR, and why two things here look over-engineered:

   Tapping the bottom tab bar on a weak connection used to do nothing at all.
   Not slow: nothing, no spinner, no paint, for as long as you cared to wait.
   Two bugs stacked up to produce that.

     1. network-first had no timeout. A navigation handled by this worker is
        exactly as fast as `fetch()` decides to be, and on a bad connection that
        is a minute or more. The browser will not paint the old page's exit or
        the new page's entry while that promise is unsettled, so the tap looked
        ignored. Fixed by racing the network against NAV_TIMEOUT and falling
        back to the cached page: see networkFirst().

     2. and the real one: the whole-site download was inside the activate
        event's waitUntil(). A worker stays in the "activating" state until
        that promise settles, and the spec has Handle Fetch WAIT for a worker
        to reach "activated" before it will dispatch to it. So every request
        the site made -- every tap on the tab bar -- was queued behind "have
        you finished downloading all 16 MB of photos yet".

        On a good connection the pass finishes in seconds and nobody notices.
        On a bad one it never finishes, and nothing ever loads: measured
        against a server holding each page for six seconds, tapping Work never
        reached this file at all, no fetch event, nothing, for as long as the
        test would wait. Take the fill out of waitUntil and the same tap is
        served in 6.1 s.

        So fillCache() is deliberately NOT awaited in activate() below. Losing
        it to the worker being shut down mid-pass costs nothing: warm() skips
        whatever is already cached, so the next visit carries on where this one
        stopped.

     3. and, once fetch events could actually be dispatched, the pass was still
        competing for the pipe. holdFill()/yieldFill() stand it down whenever a
        page asks for something, and a navigation additionally aborts whatever
        the pass has open, handing the connections straight back. Aborted URLs
        go on the end of the queue. See "the gate" below.

   THE PHOTOS ARE NOT PART OF THE DEAL UNLESS YOU ASK FOR THEM.

   /assets/img/years/ is the year galleries and the trip photos: about 1,600
   files and the large majority of the site's weight (~70 MB of AVIF). All of it used
   to come down here in the background on every first visit, whether or not the
   visitor had ever asked to see a photograph -- and "show other pictures"
   (pics.js) is off by default, so for most people that was tens of megabytes
   downloaded to satisfy nothing at all, competing with the pages they actually
   wanted.

   So the fill runs in tiers. ALL_PAGES and ALL_ASSETS -- every page, the CSS,
   the JS, the icons, the app and franchise art -- are always fetched: that is
   what makes the site work offline. PHOTOS is only fetched when a page has
   told this worker the switch is on. The handful of cover images somebody sees
   with the switch off are picked up the ordinary way, by looking at them, via
   stale-while-revalidate.

   Bump CACHE_VERSION only for a deliberate full flush. Routine deploys must NOT
   bump it: that would re-download the whole site on every deploy, which is the
   exact problem this exists to solve. */

const CACHE_VERSION = 'v1';

const DONE_KEY = '/__offline-complete';
const PAGES  = `ae-pages-${CACHE_VERSION}`;
const ASSETS = `ae-assets-${CACHE_VERSION}`;
const KEEP   = [PAGES, ASSETS];

/* How long a navigation may wait on the network before we serve the copy we
   already have.

   Short on purpose, and shorter than it first looks like it should be. This is
   not a choice between fresh and stale: the network request carries on after
   the timeout and its result still goes into the cache, so falling back costs
   one tap's worth of staleness on a site that changes a few times a month. It
   IS a choice between a tab bar that responds and one that does not, and at
   2.5 s a tap still felt broken. GitHub Pages answers in about 100-300 ms on
   any connection worth the name, so the network still wins this race whenever
   there is a network to win it.

   Only applies when there IS a cached copy. A page never seen before has
   nothing to fall back to and waits as long as it takes. */
const NAV_TIMEOUT = 900;

/* How long the background fill stands down after a page asks for anything.
   Long enough to cover the navigation plus the images it pulls in behind it. */
const FILL_HOLD = 6000;

/* The shell: needed before anything can render. Kept deliberately short.
   The home page itself is not in here: it lives in PAGES with every other
   page (see install), so the fresh copy each visit writes is the one read. */
const SHELL = [
  '/manifest.webmanifest',
  '{% include v.html f='/assets/css/base.css' %}',
  '{% include v.html f='/assets/css/layout.css' %}',
  '{% include v.html f='/assets/css/components.css' %}',
  '{% include v.html f='/assets/js/utils.js' %}',
  '/assets/img/icons/icon-192.png',
  '/assets/img/icons/icon-512.png',
];

/* Everything else, written out by Jekyll at build time so the list can never
   drift from what the site actually contains. */
const ALL_PAGES = [
{%- comment -%} Redirect stubs (jekyll-redirect-from) are never navigated to
once cached, the real URL is served instead, so they are left out. {%- endcomment -%}
{%- for p in site.pages %}{% unless p.redirect_to or p.url contains '.js' or p.url contains '.webmanifest' or p.url contains '.json' or p.url contains '/src/' or p.url contains '/franchises/' %}
  '{{ p.url }}',
{%- endunless %}{% endfor %}
];

/* CSS and JS get the same ?v= the pages request them with (see v.html). Without it
   this pass downloaded /assets/js/years.js while every page asked for
   /assets/js/years.js?v=1755..., so the warmed copy could never be hit: 60-odd
   files fetched, stored, and never read once. */
const ALL_ASSETS = [
{%- for f in site.static_files %}{% if f.path contains '/assets/' %}{% unless f.path contains '/assets/img/years/' %}
  '{% if f.path contains '/assets/css/' or f.path contains '/assets/js/' %}{% include v.html f=f.path %}{% else %}{{ f.path }}{% endif %}',
{%- endunless %}{% endif %}{% endfor %}
];

/* The year galleries and the trip photos: the heavy half of the site, and the
   half nobody sees unless "show other pictures" is on. Fetched only when a page
   says so -- see doFill(). */
const PHOTOS = [
{%- for f in site.static_files %}{% if f.path contains '/assets/img/years/' %}
  '{{ f.path }}',
{%- endif %}{% endfor %}
];

/* A fingerprint of what this worker actually knows about, used to answer "have
   I already pulled the whole site down for this version?" without re-walking
   every URL on every page load.

   Hashed over the CONTENT of the lists, not their lengths. The length version
   missed the day every gallery photo changed extension: 1,610 files renamed,
   counts identical, so a returning visitor's worker would have sworn the new
   files were already on the device while holding none of them. A renamed file
   has to read as "not done any more", and now it does.

   Still deliberately derived from the lists rather than from the build clock:
   the CSS/JS urls carry ?v=<mtime>, so this only changes when a real file
   changes. Stamping it with site.time instead would make sw.js differ on every
   rebuild and force a pointless worker update on deploys that changed nothing. */
function fingerprint(s) {
  let h = 2166136261;                                    // FNV-1a, 32-bit
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return (h >>> 0).toString(36);
}
const BUILD = fingerprint(['/', SHELL.join(), ALL_PAGES.join(), ALL_ASSETS.join(), PHOTOS.join()].join('|'));

const wait = ms => new Promise(r => setTimeout(r, ms));

self.addEventListener('install', e => {
  /* The home page goes into PAGES, not ASSETS. caches.match() searches caches
     in creation order, and ASSETS is created first, so a copy of '/' in it
     would shadow every fresher copy networkFirst() later stores in PAGES: the
     home page would be frozen at install time. 'reload' skips the HTTP cache
     (GitHub Pages sends max-age=600) so the stored copy is current. */
  e.waitUntil(
    Promise.allSettled([
      caches.open(ASSETS).then(c => Promise.allSettled(SHELL.map(u => c.add(u)))),
      caches.open(PAGES).then(c => c.add(new Request('/', { cache: 'reload' }))),
    ]).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  /* Only the fast, local bookkeeping goes in waitUntil: dropping old cache
     versions, claiming the open pages, pruning entries this build no longer
     knows about. All of it is Cache Storage work with no network in it. */
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => !KEEP.includes(k)).map(k => caches.delete(k))))
      /* Navigation preload: the browser starts the network request for a
         navigation IN PARALLEL with waking this worker up, instead of waiting
         for the worker to boot and call fetch() itself. On a cold start that
         is the worker's whole spin-up time taken off every page load; the
         response arrives in networkFirst() as e.preloadResponse. */
      .then(() => self.registration.navigationPreload ? self.registration.navigationPreload.enable() : null)
      .then(() => self.clients.claim())
      .then(() => prune())
  );

  /* The site download is started here and deliberately NOT awaited.
     waitUntil() holds the worker in the "activating" state, and a worker that
     is still activating does not get fetch events -- they queue. Awaiting a
     whole-site download here is therefore the same thing as refusing to serve
     the site until every photo is on the device, which on a weak connection
     means refusing to serve it at all. This is the tab bar bug. Do not "tidy"
     this line back inside the waitUntil above.

     Started without the photographs on purpose: at this point no page has told
     us whether the switch is on, and the answer that costs nothing if wrong is
     "no". utils.js sends the real state a few seconds later. */
  fillCache(false);
});

/* Drop asset entries this build no longer knows about.

   Without this the cache only ever grows: every deploy that touches years.js
   adds a new ?v= URL and the old one stays forever, and a deleted photo is kept
   on the device for good. Same-origin /assets/ only, so the Google Fonts
   entries (cross-origin, no build list to check them against) are left alone. */
async function prune() {
  const keep = new Set([...SHELL, ...ALL_ASSETS, ...PHOTOS].map(u => new URL(u, self.location.origin).href));
  const cache = await caches.open(ASSETS);
  const keys = await cache.keys();
  await Promise.all(keys.map(req => {
    const url = new URL(req.url);
    if (url.origin !== self.location.origin) return null;      // fonts: not ours to judge
    if (!url.pathname.startsWith('/assets/')) return null;      // DONE_KEY, the manifest
    return keep.has(url.href) ? null : cache.delete(req);
  }));

  // and pages this build no longer has (renamed or deleted), which used to stay forever
  const pages = await caches.open(PAGES);
  const known = new Set(['/', ...ALL_PAGES]);
  const pkeys = await pages.keys();
  await Promise.all(pkeys.map(req => {
    const url = new URL(req.url);
    if (url.origin !== self.location.origin) return null;
    return known.has(url.pathname) ? null : pages.delete(req);
  }));
}

/* ── the gate ──
   The background fill must never be the reason a tap feels dead. Every request
   that comes from a page pushes the fill's start time out, so it only ever runs
   in the gaps when nobody is asking for anything.

   `yield` is the strong form, used for navigations: it also cancels whatever
   the fill has open right now. Holding without cancelling leaves the pass's
   existing connections in place, and on a slow network those are precisely what
   the navigation is stuck behind. */
let holdUntil = 0;
let inFlight = null;              // AbortController for the fill's current fetches

function holdFill(ms) {
  holdUntil = Math.max(holdUntil, Date.now() + ms);
}

function yieldFill(ms) {
  holdFill(ms);
  if (inFlight) { inFlight.abort(); inFlight = null; }
}

async function gate() {
  while (Date.now() < holdUntil) await wait(Math.min(300, holdUntil - Date.now()));
}

/* Is this connection worth pushing ~10 MB down? Save-Data is an explicit "no",
   and 2g means the fill would eat the whole pipe for an hour to no benefit.
   Not fatal, just deferred: the next visit on a better connection picks it up
   exactly where this one stopped, because warm() skips what is already there. */
function connectionIsPoor() {
  const c = self.navigator && self.navigator.connection;
  if (!c) return false;
  if (c.saveData) return true;
  return c.effectiveType === 'slow-2g' || c.effectiveType === '2g';
}

/* Download the rest of the site, a few at a time so we never saturate the
   connection while the visitor is still using the page.

   Guarded twice: `filling` dedupes concurrent calls within one worker, and the
   DONE_KEY marker means that once this build is fully cached we return
   immediately instead of re-walking 190 URLs on every navigation. */
let filling = null;
let photosQueued = false;

/* `withPhotos` comes from the page, which knows whether the switch is on.
   A pass already running is not restarted; if it was a core-only pass and the
   switch has since been turned on, the photos are picked up straight after. */
function fillCache(withPhotos) {
  if (filling) {
    if (withPhotos) photosQueued = true;
    return filling;
  }
  filling = doFill(withPhotos).finally(() => {
    filling = null;
    if (photosQueued) { photosQueued = false; fillCache(true); }
  });
  return filling;
}

/* What the DONE marker can say: BUILD for "everything except the photographs",
   BUILD|photos for "everything". Two values rather than a boolean so that
   turning the switch on after a core-only pass is noticed. */
async function doFill(withPhotos) {
  const assetsCache = await caches.open(ASSETS);
  const done = await assetsCache.match(DONE_KEY);
  const mark = done ? await done.text() : '';
  if (mark === BUILD + '|photos') return;                 // everything is here
  if (mark === BUILD && !withPhotos) return;              // and the rest is not wanted

  const pages  = await caches.open(PAGES);
  const assets = assetsCache;

  async function warm(cache, urls, concurrency) {
    const queue = urls.slice();
    const workers = Array.from({ length: concurrency }, async () => {
      while (queue.length) {
        await gate();                                 // stand down while a page is loading
        const u = queue.shift();
        try {
          if (await cache.match(u)) continue;         // already have it
          if (!inFlight) inFlight = new AbortController();
          const res = await fetch(u, { cache: 'no-cache', signal: inFlight.signal });
          if (res && res.ok) await cache.put(u, res);
        } catch (err) {
          /* Cancelled to get out of a navigation's way: that is the gate doing
             its job, not a failure, so put the URL back and come to it once the
             page has settled. gate() blocks first, so this cannot spin.
             Anything else -- a 404, a dead connection -- is dropped: one bad
             file must not stop the pass. */
          if (err && err.name === 'AbortError') queue.push(u);
        }
      }
    });
    await Promise.all(workers);
  }

  /* Pages first: they are small, and they are what makes the tab bar instant,
     which matters far more than having every photo on the device. Worth doing
     even on a poor connection (~190 KB of HTML in total). */
  await warm(pages, ALL_PAGES, 3);

  if (connectionIsPoor()) return;                     // leave the 16 MB for a better day

  await warm(assets, ALL_ASSETS, 2);                  // then the artwork, gently

  /* The galleries, and only if asked. This is the tens of megabytes, so it goes
     last and it goes nowhere near a visitor who has not turned the switch on. */
  if (withPhotos) await warm(assets, PHOTOS, 2);

  await assets.put(DONE_KEY, new Response(BUILD + (withPhotos ? '|photos' : '')));
  const clients = await self.clients.matchAll();
  clients.forEach(c => c.postMessage({ type: 'offline-ready', photos: !!withPhotos }));
}

const isHTML      = (req, url) => req.mode === 'navigate' || url.pathname.endsWith('.html');
const isCodeAsset = url => /\/assets\/(css|js)\//.test(url.pathname);
const isMedia     = url => /\/assets\/img\//.test(url.pathname) ||
                           url.hostname === 'fonts.gstatic.com' ||
                           url.hostname === 'fonts.googleapis.com';

/* Network-first, but only for as long as NAV_TIMEOUT. Past that the cached page
   is served and the network request is left running: whatever it returns still
   lands in the cache, so the copy is fresh by the next tap. This is the whole
   fix for a tab bar that did nothing on a weak connection.

   `preload` is the navigation-preload response the browser started before this
   worker had even woken up (see activate). Using it instead of a second
   fetch() means a cold worker start costs the navigation nothing; when it is
   absent (non-navigations, or a browser without the API) this falls straight
   back to fetching. Either way the result is stored, so the race below still
   freshens the cache even when the cached copy wins it. */
async function networkFirst(req, preload) {
  const pages = await caches.open(PAGES);
  const cached = await pages.match(req);

  const net = Promise.resolve(preload).then(p => p || fetch(req)).then(res => {
    if (res && res.ok) {
      const copy = res.clone();
      pages.put(req, copy).catch(() => {});
    }
    return res;
  }).catch(() => null);

  if (!cached) {
    // never seen this page: the network is the only option, so wait it out
    return (await net) || (await pages.match('/')) || offlineResponse();
  }

  const first = await Promise.race([net, wait(NAV_TIMEOUT).then(() => null)]);
  return first || cached;
}

async function cacheFirst(req) {
  const cache = await caches.open(ASSETS);
  const hit = await cache.match(req);
  if (hit) return hit;
  try {
    const res = await fetch(req);
    if (res && res.ok) {
      const copy = res.clone();
      cache.put(req, copy).catch(() => {});
    }
    return res;
  } catch (err) {
    return offlineResponse();   // respondWith() must always be handed a Response
  }
}

async function staleWhileRevalidate(req) {
  const cache = await caches.open(ASSETS);
  const hit = await cache.match(req);
  /* The Google Fonts stylesheet is requested no-cors by the <link>, which makes
     the response opaque: its status is invisible (an error page would be
     cached as if it were the CSS) and Chrome pads every opaque entry to
     several MB of quota. Google sends CORS headers, so ask with CORS instead
     and only ever store a response whose status we can actually see. */
  const src = new URL(req.url).origin === self.location.origin ? req : new Request(req.url, { mode: 'cors' });
  const net = fetch(src)
    .then(res => {
      if (res && res.ok) {
        const copy = res.clone();
        cache.put(req, copy).catch(() => {});
      }
      return res;
    })
    .catch(() => null);
  if (hit) return hit;
  return (await net) || offlineResponse();
}

const offlineResponse = () =>
  new Response('', { status: 504, statusText: 'Offline' });

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin && !isMedia(url)) return;   // leave third parties alone

  if (isHTML(req, url)) {
    /* Somebody is going somewhere: get out of their way completely. Cancel the
       fill's open connections so this request can have one, and keep the pass
       down for FILL_HOLD. Runs before respondWith so the sockets are already
       free by the time the fetch below is made. */
    yieldFill(FILL_HOLD);
    e.respondWith(networkFirst(req, e.preloadResponse));
  } else if (isCodeAsset(url) || url.pathname === '/manifest.webmanifest') {
    /* Almost always a cache hit, and the page cannot render without it. Push
       the fill back but do not cancel: a miss here is one small file. */
    holdFill(3000);
    e.respondWith(cacheFirst(req));
  } else if (isMedia(url)) {
    /* A page full of lazy photos would otherwise keep the fill down forever,
       so this is the shortest hold of the three. */
    holdFill(1500);
    e.respondWith(staleWhileRevalidate(req));
  }
});

/* A page asking for specific gallery files to be kept.

   The fan pages, the parks pages and /travels/ now show a handful of frames
   out of /assets/img/years/ (see photos-data.js). Those live in the PHOTOS
   tier, which is deliberately NOT fetched unless the "show other pictures"
   switch is on -- so without this they would be the one part of the site that
   did not work offline, on pages where they are ordinary published content
   rather than personal photographs.

   So a page hands over the exact list it uses and this keeps those, and only
   those. Thirty-odd files rather than the sixteen hundred behind the switch.
   Already-cached URLs cost nothing: warm() checks before it fetches. */
async function keep(urls) {
  const cache = await caches.open(ASSETS);
  const queue = urls.filter(u => typeof u === 'string' && u.startsWith('/assets/img/years/'));
  for (const u of queue) {
    await gate();                                    // never race a navigation
    try {
      if (await cache.match(u)) continue;
      const res = await fetch(u, { cache: 'no-cache' });
      if (res && res.ok) await cache.put(u, res);
    } catch (err) { /* one missing frame must not stop the rest */ }
  }
}

/* Escape hatch: post {type:'flush'} and the worker empties every cache and
   unregisters itself. A bad service worker is otherwise painful to recover
   from, so this always needs to exist. */
self.addEventListener('message', e => {
  if (!e.data) return;
  if (e.data.type === 'keep' && Array.isArray(e.data.urls)) {
    e.waitUntil(keep(e.data.urls));
  }
  if (e.data.type === 'flush') {
    e.waitUntil(
      caches.keys()
        .then(keys => Promise.all(keys.map(k => caches.delete(k))))
        .then(() => self.registration.unregister())
    );
  }
  if (e.data.type === 'prefetch') e.waitUntil(fillCache(!!e.data.photos));
});
