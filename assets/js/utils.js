/* utils.js: shared flags (loaded first; classic scripts share global scope) */
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/* Pointer beacon: publishes an eased cursor position as --mx / --my on <html>
   so CSS can light the HUD grid under the cursor (see layout.css). Eased with a
   lerp so the glow trails the pointer instead of snapping to it. */
(function pointerBeacon() {
  if (!fine) return;
  const root = document.documentElement;
  let tx = innerWidth / 2, ty = innerHeight / 2, x = tx, y = ty, raf = 0, idle = true;

  addEventListener('pointermove', e => {
    tx = e.clientX; ty = e.clientY;
    if (idle) { idle = false; root.classList.add('has-beacon'); }
    if (!raf) raf = requestAnimationFrame(loop);
  }, { passive: true });

  addEventListener('pointerleave', () => { root.classList.remove('has-beacon'); idle = true; });

  function loop() {
    x += (tx - x) * 0.14;
    y += (ty - y) * 0.14;
    root.style.setProperty('--mx', x.toFixed(1) + 'px');
    root.style.setProperty('--my', y.toFixed(1) + 'px');
    raf = (Math.abs(tx - x) > 0.4 || Math.abs(ty - y) > 0.4) ? requestAnimationFrame(loop) : 0;
  }
})();

/* Service worker: the caching layer (see /sw.js).

   GitHub Pages pins Cache-Control to 600s and will not let us change it, so
   this is what makes repeat visits instant. Registered from here because
   utils.js is the one script every page already loads first.

   Only over https (or localhost); file:// and http:// are skipped, and a
   failure here must never take the page down with it. */
(function serviceWorker() {
  if (!('serviceWorker' in navigator)) return;
  if (location.protocol !== 'https:' && location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') return;
  addEventListener('load', function () {
    navigator.serviceWorker.register('/sw.js').then(function () {
      /* .ready rather than the registration this resolves with: on a first
         visit the worker is still installing and reg.active is null, so telling
         it anything at that point tells it nothing. That is what left the
         galleries un-cached for somebody who had the switch on before they had
         ever loaded the site -- activate() defaults to "no photographs", and
         the message that would have corrected it was never sent. */
      return navigator.serviceWorker.ready;
    }).then(function (reg) {
      /* Once it is running, tell it to pull the rest of the site down so the
         whole thing works with no connection at all.

         Held back a few seconds after load on purpose. The worker already
         stands down whenever a page asks for something (see holdFill in
         sw.js), but this page is still fetching its own lazy images for a
         while after `load` fires, and there is no reason to make it fight for
         the connection at all on a phone with two bars. */
      if (!reg.active) return;
      /* `photos` tells the worker whether it may pull the year galleries down
         too. They are the bulk of the site and nobody wants them unless they
         have turned "show other pictures" on, so the answer is normally no.
         Read straight from storage rather than via pics.js, because most pages
         do not load pics.js and the default there has to be the safe one. */
      var kick = function () {
        var wants = false;
        try { wants = localStorage.getItem('ae-show-pics') === 'on'; } catch (e) { /* private mode */ }
        reg.active.postMessage({ type: 'prefetch', photos: wants });
      };
      if (window.requestIdleCallback) requestIdleCallback(kick, { timeout: 8000 });
      else setTimeout(kick, 4000);
    }).catch(function () { /* not fatal */ });
  });

  // the worker says so when every page and image is on the device
  navigator.serviceWorker.addEventListener('message', function (e) {
    if (e.data && e.data.type === 'offline-ready') {
      document.documentElement.dataset.offline = 'ready';
    }
  });
})();

/* Navigation feedback: the other half of the dead-tab-bar fix.

   sw.js now makes a tab-bar tap fast when the page is already on the device,
   but the first visit on a weak connection still has to go and get the HTML,
   and a browser paints absolutely nothing while it waits. No spinner, no
   pressed state, nothing: the tap reads as ignored, so you tap again, and
   again. That was most of what "the tab bar is broken" actually was.

   So: mark the tap ourselves, the instant it happens. The tapped tab holds a
   pressed state and a hairline bar creeps across the top of the screen until
   the new document replaces this one. Purely cosmetic; the link is a plain
   <a href> and is never intercepted, so a failed navigation just leaves the
   page as it was (and the timeout below tidies up after it). */
(function navFeedback() {
  const root = document.documentElement;
  let bar = null, timer = 0;

  function stop() {
    clearTimeout(timer);
    root.classList.remove('nav-busy');
    document.querySelectorAll('.is-going').forEach(el => el.classList.remove('is-going'));
  }

  function start(link) {
    if (!bar) {
      bar = document.createElement('div');
      bar.className = 'navbar-progress';
      bar.setAttribute('aria-hidden', 'true');
      document.body.appendChild(bar);
    }
    // restart the animation from zero on every tap
    bar.classList.remove('run'); void bar.offsetWidth; bar.classList.add('run');
    root.classList.add('nav-busy');
    if (link) link.classList.add('is-going');
    clearTimeout(timer);
    timer = setTimeout(stop, 12000);   // gave up: do not leave the bar stuck on
  }

  addEventListener('click', e => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = e.target.closest('a[href]');
    if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
    const href = a.getAttribute('href');
    if (!href || href.charAt(0) === '#') return;                      // in-page anchor, not a navigation
    const url = new URL(href, location.href);
    if (url.origin !== location.origin) return;                       // off-site: not ours to show
    if (url.pathname === location.pathname && url.hash) return;       // same page, just a jump
    start(a.closest('.tabbar a') || a);
  }, true);

  // leaving, or coming back out of the bfcache: either way the bar is done
  addEventListener('pagehide', stop);
  addEventListener('pageshow', stop);
})();
