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

     HTML            cache-first, refreshed behind the page
                                    : a page already on the device is served
                                      at once, and the network copy fetched at
                                      the same moment replaces it for the NEXT
                                      visit. A page never seen before waits for
                                      the network. See "the dead tab bar".
     CSS / JS        cache-first    : safe because these carry ?v=<mtime>
                                      (see _includes/v.html), so a changed file
                                      is a different URL and misses naturally.
     Images / fonts  stale-while-revalidate
                                    : instant from cache, refreshed quietly.
                                      Images have no ?v=, so this is what stops
                                      a replaced image being stale forever.
                                      The photographs are the exception: they
                                      are keyed by content hash (see below), so
                                      a hit is served with no network at all.

   THREE CACHES, AND WHY THE PHOTOGRAPHS ARE NOT IN WITH THE STYLESHEETS.

   WebKit opens a cache by reading and decoding every record file in it before
   it answers a single match (CacheStorageCache::open, which calls
   CacheStorageDiskStore::readAllRecordInfos: one file per record, opened and
   read in turn), and it closes the cache again the moment nothing holds a
   handle to it: when the worker is shut down, which iOS does within seconds
   of it going idle, or when the handle is collected. So that walk is paid on
   nearly every opening of the app, its length is the number of records in
   the cache, and it is paid by whichever request opens the cache first. On a
   page that is the CSS, which nothing can paint without. And keys(), which
   the old activate() called twice on the same cache inside waitUntil(),
   serialises every record across to the worker: with the photographs in
   there that was thousands of records, in the one state where the spec
   holds every navigation until the worker has finished activating. That was
   the first tap after every deploy.

   With the 3,700 photographs in the same cache as the stylesheets, an
   installed app with the whole site on the device did all of that reading
   for pictures the page had not asked for. So:

     PAGES    every page                                ~80 records
     ASSETS   CSS, JS, icons, app and franchise art     ~500 records
     GALLERY  the year galleries and trip photographs   ~3,700 records,
              opened only when a photograph is actually requested

   and every handle is held for the life of the worker (openCache), so the walk
   happens once per start, not once per garbage collection. Nothing lists a
   cache on the request path any more, and nothing lists one during
   activation. A device that cached the photographs before the split moves
   them across in the background rather than downloading them again: see
   migrateGallery().

   THE DEAD TAB BAR, and why two things here look over-engineered:

   Tapping the bottom tab bar on a weak connection used to do nothing at all.
   Not slow: nothing, no spinner, no paint, for as long as you cared to wait.
   Two bugs stacked up to produce that.

     1. network-first had no timeout. A navigation handled by this worker is
        exactly as fast as `fetch()` decides to be, and on a bad connection that
        is a minute or more. The browser will not paint the old page's exit or
        the new page's entry while that promise is unsettled, so the tap looked
        ignored. First fixed by racing the network against a 900 ms timeout,
        which still cost every tap up to a second whenever the photographs
        were coming down behind it. Now the cached page is served straight
        away and the network copy lands behind it: see servePage().

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
        stopped. The same goes for the housekeeping (migrateGallery, prune):
        nothing that walks a cache runs inside waitUntil any more.

     3. and, once fetch events could actually be dispatched, the pass was still
        competing for the pipe. holdFill()/yieldFill() stand it down whenever a
        page asks for something, and a navigation additionally aborts whatever
        the pass has open, handing the connections straight back. Aborted URLs
        go on the end of the queue. See "the gate" below.

   THE PHOTOS ARE NOT PART OF THE DEAL UNLESS YOU ASK FOR THEM.

   /assets/img/years/ and /assets/img/years-large/ are the year galleries and
   the trip photos: about 1,600 photographs in two sizes, the 1000px frame the
   grids show and the 2000px copy the full-screen deck swaps in, and nearly
   all of the site's weight (~410 MB of AVIF). All of it used to come down
   here in the background on every first visit, whether or not the visitor
   had ever asked to see a photograph -- and "show other pictures" (pics.js)
   is off by default, so for most people that was tens of megabytes
   downloaded to satisfy nothing at all, competing with the pages they
   actually wanted.

   So the fill runs in tiers. ALL_PAGES and ALL_ASSETS -- every page, the CSS,
   the JS, the icons, the app and franchise art -- are always fetched: that is
   what makes the site work offline. PHOTOS is only fetched when a page has
   told this worker the switch is on, or that the site is running from the
   home screen (an installed app gets everything; see utils.js). The handful of
   cover images somebody sees with the switch off are picked up the ordinary
   way, by looking at them, via stale-while-revalidate.

   A PHOTOGRAPH IS STORED UNDER ITS CONTENT HASH, NOT ITS PATH.

   Pages ask for /assets/img/years/x.avif, plain. This worker keys that file
   as /assets/img/years/x.avif?v=<hash of its bytes> (photo_versions.yml,
   written by tools/stamp.py), the same trick the CSS and JS get from v.html.
   The fill decides "already have it" by looking the key up, so a photograph
   replaced under the same filename is a new key: it is fetched, and prune()
   drops the old copy. Before this the fill trusted the path alone and a
   replaced photograph stayed stale on the device for good. See photoKey().

   Bump CACHE_VERSION only for a deliberate full flush. Routine deploys must NOT
   bump it: that would re-download the whole site on every deploy, which is the
   exact problem this exists to solve. */

const CACHE_VERSION = 'v1';

const PAGES   = `ae-pages-${CACHE_VERSION}`;
const ASSETS  = `ae-assets-${CACHE_VERSION}`;
const GALLERY = `ae-gallery-${CACHE_VERSION}`;
const KEEP    = [PAGES, ASSETS, GALLERY];

/* Bookkeeping entries, kept in the caches themselves so they survive the
   worker being shut down. None of them is a URL a page could ask for. */
const DONE_KEY   = '/__offline-complete';   // ASSETS : which build is fully on the device, see doFill()
const MOVED_KEY  = '/__gallery-moved';      // ASSETS : the photographs have left this cache, see migrateGallery()
const PRUNED_KEY = '/__pruned';             // ASSETS : which build last swept it; GALLERY: which photo list, see prune()
const CURSOR_KEY = '/__gallery-cursor';     // GALLERY: how far the photo pass got, see warmGallery()

/* One handle per cache, held for the life of the worker.

   caches.open() is not free: see "three caches" above. Every request handler
   used to open its cache afresh and let the handle go, and WebKit closes a
   cache as soon as its last handle is collected, so a garbage collection in
   the middle of a page load meant the next stylesheet re-read every record
   file. Held here, a cache is walked once per start and never again. A
   failed open is forgotten so the next caller can try again. */
const handles = {};
function openCache(name) {
  if (!handles[name]) {
    handles[name] = caches.open(name).catch(err => { delete handles[name]; throw err; });
  }
  return handles[name];
}

/* A worker is only ever started because a request is on its way, and that
   request will want a page and then its CSS. Start both walks now, while the
   event is still being dispatched, rather than one after the other as each
   request lands. The gallery is NOT opened here: nothing on most pages ever
   needs it, and it is by far the largest walk. */
openCache(PAGES).catch(() => {});
openCache(ASSETS).catch(() => {});

/* Why a page on the device is served before the network is even asked.

   This site changes a few times a month; a tap happens every few seconds. So
   a navigation is answered from the cache the moment the copy is found, and
   the network request runs behind it with its result stored for the next
   visit. The cost is one visit's worth of staleness after a deploy. The gain
   is a tab bar that switches pages instantly however busy the connection is,
   which with the whole site coming down in the background (see the fill,
   below) is the difference between an app and a spinner.

   Two things keep the staleness short. Every navigation refreshes the page it
   lands on, so the second visit is always current. And a new build of this
   worker re-fetches every page in its first pass (doFill), so a deploy that
   touches any CSS, JS or image list brings the pages with it.

   Only applies when there IS a cached copy. A page never seen before has
   nothing to fall back to and waits as long as it takes. */

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
{%- for f in site.static_files %}{% if f.path contains '/assets/' %}{% unless f.path contains '/assets/img/years/' or f.path contains '/assets/img/years-large/' %}
  '{% if f.path contains '/assets/css/' or f.path contains '/assets/js/' %}{% include v.html f=f.path %}{% else %}{{ f.path }}{% endif %}',
{%- endunless %}{% endif %}{% endfor %}
];

/* The year galleries and the trip photos: the heavy half of the site, and the
   half nobody sees unless "show other pictures" is on. Fetched only when a page
   says so -- see doFill(). */
const PHOTOS = [
{%- for f in site.static_files %}{% if f.path contains '/assets/img/years/' or f.path contains '/assets/img/years-large/' %}{% assign pv = site.data.photo_versions[f.path] %}
  '{{ f.path }}{% if pv %}?v={{ pv }}{% endif %}',
{%- endif %}{% endfor %}
];

/* plain path -> the versioned key above. Every request for a photograph, from
   a page or from the fill, goes through this so the cache is only ever asked
   about, and only ever holds, the current version. The network is asked for
   the versioned URL too: GitHub Pages ignores the query, and it keeps the
   browser's own HTTP cache (max-age=600) from handing back the old bytes. */
const PHOTO_KEY = new Map(PHOTOS.map(u => [u.split('?')[0], u]));
function photoKey(req) {
  const url = new URL(req.url);
  if (url.search) return req;
  const v = PHOTO_KEY.get(url.pathname);
  return v ? new Request(new URL(v, self.location.origin).href) : req;
}

/* Anything under the two gallery folders, whether or not this build still
   lists it: what belongs in GALLERY and nowhere else. */
const PHOTO_PATH = /^\/assets\/img\/years(-large)?\//;

/* A fingerprint of what this worker actually knows about, used to answer "have
   I already pulled the whole site down for this version?" without re-walking
   every URL on every page load.

   Hashed over the CONTENT of the lists, not their lengths. The length version
   missed the day every gallery photo changed extension: 1,610 files renamed,
   counts identical, so a returning visitor's worker would have sworn the new
   files were already on the device while holding none of them. A renamed file
   has to read as "not done any more", and now it does.

   Still deliberately derived from the lists rather than from the build clock:
   the CSS/JS urls carry ?v=<content hash>, and so do the photographs, so this
   only changes when a real file changes, and a photograph replaced under its
   old name reads as "not done any more" just like a renamed one. Stamping it with site.time instead would make sw.js differ on every
   rebuild and force a pointless worker update on deploys that changed nothing. */
function fingerprint(s) {
  let h = 2166136261;                                    // FNV-1a, 32-bit
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return (h >>> 0).toString(36);
}
const BUILD = fingerprint(['/', SHELL.join(), ALL_PAGES.join(), ALL_ASSETS.join(), PHOTOS.join()].join('|'));
const PHOTO_BUILD = fingerprint(PHOTOS.join());        // the photographs alone, for prune()

const wait = ms => new Promise(r => setTimeout(r, ms));

self.addEventListener('install', e => {
  /* The home page goes into PAGES, not ASSETS. caches.match() searches caches
     in creation order, and ASSETS is created first, so a copy of '/' in it
     would shadow every fresher copy servePage() later stores in PAGES: the
     home page would be frozen at install time. 'reload' skips the HTTP cache
     (GitHub Pages sends max-age=600) so the stored copy is current. */
  e.waitUntil(
    Promise.allSettled([
      openCache(ASSETS).then(c => Promise.allSettled(SHELL.map(u => c.add(u)))),
      openCache(PAGES).then(c => c.add(new Request('/', { cache: 'reload' }))),
    ]).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  /* Only the fast, local bookkeeping goes in waitUntil: dropping old cache
     versions, enabling navigation preload, claiming the open pages. Nothing
     in here walks a cache, because a worker that is still activating does
     not get fetch events, and a walk of the gallery is seconds on a phone. */
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => !KEEP.includes(k)).map(k => caches.delete(k))))
      /* Navigation preload: the browser starts the network request for a
         navigation IN PARALLEL with waking this worker up, instead of waiting
         for the worker to boot and call fetch() itself. On a cold start that
         is the worker's whole spin-up time taken off every page load; the
         response arrives in servePage() as e.preloadResponse, and is what
         refreshes the cached copy behind the one being shown. */
      .then(() => self.registration.navigationPreload ? self.registration.navigationPreload.enable() : null)
      .then(() => self.clients.claim())
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
     "no". utils.js sends the real state a few seconds later. The move of any
     photographs already on the device, and the sweep of stale entries, happen
     inside this pass too, in that order: see doFill(). */
  fillCache(false);
});

/* ── the gate ──
   The background fill must never be the reason a tap feels dead. Every request
   that comes from a page pushes the fill's start time out, so it only ever runs
   in the gaps when nobody is asking for anything.

   `yield` is the strong form, used for navigations: it also cancels whatever
   the fill has open right now. Holding without cancelling leaves the pass's
   existing connections in place, and on a slow network those are precisely what
   the navigation is stuck behind.

   Starts held: a worker only ever wakes because a request is coming, so the
   first FILL_HOLD of its life belongs to that request, not to housekeeping. */
let holdUntil = Date.now() + FILL_HOLD;
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

/* ── moving house ──
   Up to September 2026 the photographs lived in ASSETS with everything else,
   which is what made every cold start slow (see "three caches"). A device
   that already holds them is not made to download 410 MB again: each one is
   copied into GALLERY under its key and dropped from ASSETS, in the
   background and behind the gate like the fill, and MOVED_KEY is written when
   the list has been walked. Resumable: a worker shut down halfway leaves
   ASSETS holding whatever is still to move, and the next pass carries on.

   Driven by the PHOTOS list, one match at a time, rather than by keys() on
   the cache: listing thousands of records was the single most expensive
   call this worker made, with every page request queued behind it, and the
   old activate() made it twice. Whatever the list does not name
   (a copy stored before the hash keys, a superseded hash) is left for
   prune() to sweep.

   Idle once done: one match on the small cache says so. */
let galleryMoved = false;         // MOVED_KEY seen or written this lifetime
let moving = null;
function migrateGallery() {
  if (galleryMoved) return Promise.resolve();
  if (!moving) moving = doMigrate().catch(() => {}).finally(() => { moving = null; });
  return moving;
}

async function doMigrate() {
  const assets = await openCache(ASSETS);
  if (await assets.match(MOVED_KEY)) { galleryMoved = true; return; }
  const gallery = await openCache(GALLERY);
  for (const key of PHOTOS) {
    await gate();                                    // never race a page
    try {
      const res = await assets.match(key);
      if (!res) continue;
      /* The body is read into memory first and stored as a fresh Response.
         Handing put() the matched response itself, its body still streaming
         out of the same store it is being written back into, stalled for good
         after a few dozen files in the iPhone 17 Pro simulator. */
      const body = await res.arrayBuffer();
      await gallery.put(key, new Response(body, { status: res.status, statusText: res.statusText, headers: res.headers }));
      await assets.delete(key);
    } catch (err) { /* one bad record must not stop the move; prune() takes what is left */ }
  }
  await assets.put(MOVED_KEY, new Response('1'));
  galleryMoved = true;
}

/* Drop entries this build no longer knows about.

   Without this the caches only ever grow: every deploy that touches years.js
   adds a new ?v= URL and the old one stays forever, and a deleted photo is kept
   on the device for good. Same-origin /assets/ only, so the Google Fonts
   entries (cross-origin, no build list to check them against) are left alone.

   Once per build, remembered in PRUNED_KEY, because listing a cache is the
   most expensive thing this worker can do (every record serialised across
   to the worker) and it must not happen on every page load. The gallery is
   the worst of them by far, so it is only listed when the photo list itself
   has changed, which its own stamp in GALLERY records. Runs after
   migrateGallery() on purpose: swept first, the photographs still sitting in
   ASSETS would be deleted rather than moved. */
async function prune() {
  const assets = await openCache(ASSETS);
  const stamp = await assets.match(PRUNED_KEY);
  if (stamp && await stamp.text() === BUILD) return;

  const here = u => new URL(u, self.location.origin).href;
  async function sweep(cache, keep) {
    const keys = await cache.keys();
    await Promise.all(keys.map(req => {
      const url = new URL(req.url);
      if (url.origin !== self.location.origin) return null;      // fonts: not ours to judge
      if (!url.pathname.startsWith('/assets/')) return null;      // the markers, the manifest
      return keep.has(url.href) ? null : cache.delete(req);
    }));
  }
  await sweep(assets, new Set([...SHELL, ...ALL_ASSETS].map(here)));

  const gallery = await openCache(GALLERY);
  const gstamp = await gallery.match(PRUNED_KEY);
  if (!(gstamp && await gstamp.text() === PHOTO_BUILD)) {
    await sweep(gallery, new Set(PHOTOS.map(here)));
    await gallery.put(PRUNED_KEY, new Response(PHOTO_BUILD));
  }

  // and pages this build no longer has (renamed or deleted), which used to stay forever
  const pages = await openCache(PAGES);
  const known = new Set(['/', ...ALL_PAGES]);
  const pkeys = await pages.keys();
  await Promise.all(pkeys.map(req => {
    const url = new URL(req.url);
    if (url.origin !== self.location.origin) return null;
    return known.has(url.pathname) ? null : pages.delete(req);
  }));

  await assets.put(PRUNED_KEY, new Response(BUILD));
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
  const assets = await openCache(ASSETS);
  /* Before anything else, and before the DONE check below: a device that had
     finished the whole site under the old layout is marked done for this very
     build, and must still move its photographs across. One match once done. */
  await migrateGallery();
  const done = await assets.match(DONE_KEY);
  const mark = done ? await done.text() : '';
  if (mark === BUILD + '|photos') return;                 // everything is here
  if (mark === BUILD && !withPhotos) return;              // and the rest is not wanted

  /* A build this device has not finished before. Pages are served from the
     cache first (servePage), so the copies on the device are what a visitor
     sees; a new build re-fetches all of them rather than trusting "already
     have it", which is ~190 KB and bounds the staleness to one deploy.
     When the marker already says BUILD, the pages and the assets are done and
     only the photographs are wanted: neither list is walked again. */
  const newBuild = mark.split('|')[0] !== BUILD;

  /* Pages first: they are small, and they are what makes the tab bar instant,
     which matters far more than having every photo on the device. Worth doing
     even on a poor connection (~190 KB of HTML in total). */
  if (newBuild) await warm(await openCache(PAGES), ALL_PAGES, 3, true);

  /* Then sweep what this build no longer lists; idle once done (one match).
     After the move above on purpose: swept first, the photographs still in
     ASSETS would have been thrown away rather than moved. */
  await prune();

  if (connectionIsPoor()) return;                     // leave the 16 MB for a better day

  if (newBuild) await warm(assets, ALL_ASSETS, 2);    // then the artwork, gently

  /* The galleries, and only if asked. This is the hundreds of megabytes, so
     it goes last and it goes nowhere near a visitor who has not turned the
     switch on. */
  if (withPhotos) await warmGallery();

  await assets.put(DONE_KEY, new Response(BUILD + (withPhotos ? '|photos' : '')));
  const clients = await self.clients.matchAll();
  clients.forEach(c => c.postMessage({ type: 'offline-ready', photos: !!withPhotos }));
}

async function warm(cache, urls, concurrency, refresh) {
  const queue = urls.slice();
  const workers = Array.from({ length: concurrency }, async () => {
    while (queue.length) {
      await gate();                                 // stand down while a page is loading
      const u = queue.shift();
      try {
        if (!refresh && await cache.match(u)) continue;   // already have it
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
  inFlight = null;
}

/* The photo pass. One file at a time: this runs for many minutes on an
   installed app, and the visitor is using the site the whole time. Two in
   flight was enough to make a photograph the page actually wanted queue
   behind a megabyte of gallery it did not; one leaves the pipe mostly free,
   and the gate hands it over entirely the moment a page asks.

   Resumable through CURSOR_KEY. The pass is almost never finished in one
   worker lifetime (iOS shuts an idle worker down in seconds), and before this
   every restart re-checked all 3,700 files one match at a time before it
   found the first one still missing: a couple of seconds of chatter with the
   cache on every page load until the whole thing was done. Now it picks up at
   the file it stopped on. The cursor names the build it counts for, so a new
   list starts from the top. */
async function warmGallery() {
  const gallery = await openCache(GALLERY);
  let i = 0;
  const saved = await gallery.match(CURSOR_KEY);
  if (saved) {
    const [b, n] = (await saved.text()).split('|');
    if (b === BUILD) i = Math.min(parseInt(n, 10) || 0, PHOTOS.length);
  }
  while (i < PHOTOS.length) {
    await gate();                                       // never race a page
    const u = PHOTOS[i];
    try {
      if (!(await gallery.match(u))) {
        if (!inFlight) inFlight = new AbortController();
        const res = await fetch(u, { cache: 'no-cache', signal: inFlight.signal });
        if (res && res.ok) await gallery.put(u, res);
      }
    } catch (err) {
      // cancelled for a navigation: the same file again once the page has settled
      if (err && err.name === 'AbortError') continue;
      /* anything else is dropped: one bad file must not stop the pass */
    }
    i++;
    if (i % 25 === 0 || i === PHOTOS.length) {
      await gallery.put(CURSOR_KEY, new Response(BUILD + '|' + i)).catch(() => {});
    }
  }
  inFlight = null;
}

const isHTML      = (req, url) => req.mode === 'navigate' || url.pathname.endsWith('.html');
const isCodeAsset = url => /\/assets\/(css|js)\//.test(url.pathname);
const isMedia     = url => /\/assets\/img\//.test(url.pathname) ||
                           url.hostname === 'fonts.gstatic.com' ||
                           url.hostname === 'fonts.googleapis.com';

/* A page: the cached copy at once if there is one, and the network copy
   stored behind it for next time. Nothing about the network, not its speed
   and not the fill running on it, can delay a tap on a page that is already
   on the device. This is the whole fix for a tab bar that did nothing while
   the site was downloading.

   `e.preloadResponse` is the navigation-preload request the browser started
   before this worker had even woken up (see activate). Using it instead of a
   second fetch() means a cold worker start costs the navigation nothing, and
   when it is absent (non-navigations, or a browser without the API) this
   falls straight back to fetching. Either way the result is stored.

   waitUntil() keeps the worker alive until that copy has landed: without it
   the worker may be shut down as soon as the cached response has gone out,
   and the refresh with it. */
async function servePage(e) {
  const req = e.request;
  const pages = await openCache(PAGES);
  const cached = await pages.match(req);

  let stored = Promise.resolve();      // the put, so waitUntil can cover the whole write
  const net = Promise.resolve(e.preloadResponse).then(p => p || fetch(req)).then(res => {
    if (res && res.ok) {
      const copy = res.clone();
      stored = pages.put(req, copy).catch(() => {});
    }
    return res;
  }).catch(() => null);

  if (cached) {
    e.waitUntil(net.then(() => stored));
    return cached;
  }
  // never seen this page: the network is the only option, so wait it out
  return (await net) || (await pages.match('/')) || offlineResponse();
}

async function cacheFirst(req) {
  const cache = await openCache(ASSETS);
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

/* Images and fonts: stale-while-revalidate out of ASSETS, except a photograph,
   which lives in GALLERY and is served with no network at all when it is
   there. GALLERY is opened here and nowhere else on the request path, so a
   page with no photographs on it never pays for its walk. */
async function serveMedia(req) {
  const url = new URL(req.url);
  const photo = PHOTO_PATH.test(url.pathname);
  const cache = await openCache(photo ? GALLERY : ASSETS);
  if (photo) req = photoKey(req);            // its versioned key, see PHOTO_KEY
  const hit = await cache.match(req);
  /* A photograph is keyed by the hash of its bytes, so a hit cannot be stale
     and there is nothing to revalidate: served, and the network left alone.
     While the fill is running every needless request is one more thing in
     front of the next tap, and a gallery scroll used to make hundreds. */
  if (hit && photo) return hit;
  if (photo && !galleryMoved) {
    /* Still moving house (see migrateGallery): the copy may not have crossed
       yet. Served from where it still is, and left for the move to carry. */
    const old = await (await openCache(ASSETS)).match(req);
    if (old) return old;
  }
  /* A miss means the page needs the pipe right now. Cancel whatever the fill
     has open so this file is not queued behind a gallery frame nobody has
     asked to see; the fill puts the cancelled file back and carries on once
     the page has what it wants. */
  if (!hit) yieldFill(1500);
  /* The Google Fonts stylesheet is requested no-cors by the <link>, which makes
     the response opaque: its status is invisible (an error page would be
     cached as if it were the CSS) and Chrome pads every opaque entry to
     several MB of quota. Google sends CORS headers, so ask with CORS instead
     and only ever store a response whose status we can actually see. */
  const src = url.origin === self.location.origin ? req : new Request(req.url, { mode: 'cors' });
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
    e.respondWith(servePage(e));
  } else if (isCodeAsset(url) || url.pathname === '/manifest.webmanifest') {
    /* Almost always a cache hit, and the page cannot render without it. Push
       the fill back but do not cancel: a miss here is one small file. */
    holdFill(3000);
    e.respondWith(cacheFirst(req));
  } else if (isMedia(url)) {
    /* A page full of lazy photos would otherwise keep the fill down forever,
       so this is the shortest hold of the three. */
    holdFill(1500);
    e.respondWith(serveMedia(req));
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
   Already-cached URLs cost nothing beyond the match. */
async function keep(urls) {
  const gallery = await openCache(GALLERY);
  const queue = urls.filter(u => typeof u === 'string' && PHOTO_PATH.test(u))
                    .map(u => PHOTO_KEY.get(u) || u);        // under its versioned key
  for (const u of queue) {
    await gate();                                    // never race a navigation
    try {
      if (await gallery.match(u)) continue;
      const res = await fetch(u, { cache: 'no-cache' });
      if (res && res.ok) await gallery.put(u, res);
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
    for (const k of Object.keys(handles)) delete handles[k];
    e.waitUntil(
      caches.keys()
        .then(keys => Promise.all(keys.map(k => caches.delete(k))))
        .then(() => self.registration.unregister())
    );
  }
  if (e.data.type === 'prefetch') e.waitUntil(fillCache(!!e.data.photos));
});
