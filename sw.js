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

     HTML            network-first  : always fresh online, cached copy offline.
     CSS / JS        cache-first    : safe because these carry ?v=<mtime>
                                      (see _includes/v.html), so a changed file
                                      is a different URL and misses naturally.
     Images / fonts  stale-while-revalidate
                                    : instant from cache, refreshed quietly.
                                      Images have no ?v=, so this is what stops
                                      a replaced image being stale forever.

   Bump CACHE_VERSION only for a deliberate full flush. Routine deploys must NOT
   bump it: that would re-download all 16 MB on every deploy, which is the exact
   problem this exists to solve. */

const CACHE_VERSION = 'v1';

const DONE_KEY = '/__offline-complete';
const PAGES  = `ae-pages-${CACHE_VERSION}`;
const ASSETS = `ae-assets-${CACHE_VERSION}`;
const KEEP   = [PAGES, ASSETS];

/* The shell: needed before anything can render. Kept deliberately short. */
const SHELL = [
  '/',
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
{%- for p in site.pages %}{% if p.url contains '.html' or p.url == '/' or p.url contains '/' %}{% unless p.url contains '.js' or p.url contains '.webmanifest' or p.url contains '.json' %}
  '{{ p.url }}',
{%- endunless %}{% endif %}{% endfor %}
];

const ALL_ASSETS = [
{%- for f in site.static_files %}{% if f.path contains '/assets/' %}
  '{{ f.path }}',
{%- endif %}{% endfor %}
];

/* A fingerprint of what this worker actually knows about, used to answer "have
   I already pulled the whole site down for this version?" without re-walking
   every URL on every page load.

   Deliberately derived from the content lists rather than from the build clock:
   the SHELL urls carry ?v=<mtime>, so this only changes when a real file
   changes. Stamping it with site.time instead would make sw.js differ on every
   rebuild and force a pointless worker update on deploys that changed nothing. */
const BUILD = [SHELL.join(), ALL_PAGES.length, ALL_ASSETS.length].join('|');

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(ASSETS)
      .then(c => Promise.allSettled(SHELL.map(u => c.add(u))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => !KEEP.includes(k)).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
      .then(() => fillCache())
  );
});

/* Download the rest of the site, a few at a time so we never saturate the
   connection while the visitor is still using the page.

   Guarded twice: `filling` dedupes concurrent calls within one worker, and the
   DONE_KEY marker means that once this build is fully cached we return
   immediately instead of re-walking 190 URLs on every navigation. */
let filling = null;

function fillCache() {
  if (!filling) filling = doFill().finally(() => { filling = null; });
  return filling;
}

async function doFill() {
  const assetsCache = await caches.open(ASSETS);
  const done = await assetsCache.match(DONE_KEY);
  if (done && (await done.text()) === BUILD) return;      // nothing to do

  const pages  = await caches.open(PAGES);
  const assets = assetsCache;

  async function warm(cache, urls, concurrency) {
    const queue = urls.slice();
    const workers = Array.from({ length: concurrency }, async () => {
      while (queue.length) {
        const u = queue.shift();
        try {
          if (await cache.match(u)) continue;         // already have it
          const res = await fetch(u, { cache: 'no-cache' });
          if (res && res.ok) await cache.put(u, res);
        } catch (err) { /* one failure must not stop the pass */ }
      }
    });
    await Promise.all(workers);
  }

  await warm(pages, ALL_PAGES, 4);        // pages first: they are small and matter most
  await warm(assets, ALL_ASSETS, 3);      // then ~16 MB of images, gently

  await assets.put(DONE_KEY, new Response(BUILD));        // remember we finished
  const clients = await self.clients.matchAll();
  clients.forEach(c => c.postMessage({ type: 'offline-ready' }));
}

const isHTML      = (req, url) => req.mode === 'navigate' || url.pathname.endsWith('.html');
const isCodeAsset = url => /\/assets\/(css|js)\//.test(url.pathname);
const isMedia     = url => /\/assets\/img\//.test(url.pathname) ||
                           url.hostname === 'fonts.gstatic.com' ||
                           url.hostname === 'fonts.googleapis.com';

async function networkFirst(req) {
  try {
    const res = await fetch(req);
    if (res && res.ok) (await caches.open(PAGES)).put(req, res.clone());
    return res;
  } catch (err) {
    return (await caches.match(req)) || (await caches.match('/'));
  }
}

async function cacheFirst(req) {
  const hit = await caches.match(req);
  if (hit) return hit;
  const res = await fetch(req);
  if (res && (res.ok || res.type === 'opaque')) (await caches.open(ASSETS)).put(req, res.clone());
  return res;
}

async function staleWhileRevalidate(req) {
  const cache = await caches.open(ASSETS);
  const hit = await cache.match(req);
  const net = fetch(req)
    .then(res => { if (res && (res.ok || res.type === 'opaque')) cache.put(req, res.clone()); return res; })
    .catch(() => null);
  return hit || net;
}

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin && !isMedia(url)) return;   // leave third parties alone

  if (isHTML(req, url))      e.respondWith(networkFirst(req));
  else if (isCodeAsset(url)) e.respondWith(cacheFirst(req));
  else if (isMedia(url))     e.respondWith(staleWhileRevalidate(req));
});

/* Escape hatch: post {type:'flush'} and the worker empties every cache and
   unregisters itself. A bad service worker is otherwise painful to recover
   from, so this always needs to exist. */
self.addEventListener('message', e => {
  if (!e.data) return;
  if (e.data.type === 'flush') {
    e.waitUntil(
      caches.keys()
        .then(keys => Promise.all(keys.map(k => caches.delete(k))))
        .then(() => self.registration.unregister())
    );
  }
  if (e.data.type === 'prefetch') e.waitUntil(fillCache());
});
