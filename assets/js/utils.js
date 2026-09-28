/* utils.js: shared flags (loaded first; classic scripts share global scope) */
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/* HTML-escape text before it goes into markup, as element content or inside
   a double-quoted attribute. The one copy: thirteen scripts used to carry
   their own, and not all of them escaped the quote, so the same title could be
   safe in one file and break an attribute in another. */
window.AEesc = function (s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
};

/* "Skip to content" (topbar.html) jumps to #main. Pages that have not given
   their <main> that id yet get it here, so the link works everywhere. */
(function skipTarget() {
  if (document.getElementById('main')) return;
  const m = document.querySelector('main');
  if (m) m.id = 'main';
})();

/* Keyboard focus never sits under the sticky top bar or the floating tab bar.
   base.css's scroll-padding covers focus that has to scroll, but a browser
   does not scroll to an element it considers already on screen, and one
   under a sticky bar counts: Shift+Tab left links 75-92% covered. Keyboard
   only (:focus-visible), so a mouse click never nudges the page. */
(function focusClear() {
  const bar = document.querySelector('.topbar'), tab = document.querySelector('.tabbar');
  if (!bar && !tab) return;
  const covered = (r, o) => o && Math.max(0, Math.min(r.right, o.right) - Math.max(r.left, o.left)) *
    Math.max(0, Math.min(r.bottom, o.bottom) - Math.max(r.top, o.top)) > 0;
  document.addEventListener('focusin', e => {
    const el = e.target;
    if (!el.getBoundingClientRect || !el.matches(':focus-visible') || el.closest('.topbar, .tabbar, .lightbox')) return;
    const r = el.getBoundingClientRect();
    if (covered(r, bar && bar.getBoundingClientRect()) || covered(r, tab && tab.getBoundingClientRect())) {
      try { el.scrollIntoView({ block: 'nearest', behavior: 'instant' }); }
      catch (err) { el.scrollIntoView({ block: 'nearest' }); }
    }
  });
})();

/* Tab jumps, it does not glide. html.smooth (below) makes every scroll the
   page makes a 1.5 s ease, and the browser scrolls to whatever Tab lands on,
   so tabbing to a control far down the page was a slow cruise past
   everything in between, on every press. base.css has
   html.kbd-focus { scroll-behavior: auto !important }; this puts the class
   on for the moment the focus moves. keydown fires before the focus changes,
   which is what makes it work; capture, so a handler on the element cannot
   stop it. Off again on the next pointer, wheel or touch, which is somebody
   scrolling by hand and wanting the ease back, or after 400 ms, long after
   the focus has moved. */
(function keyboardScroll() {
  const root = document.documentElement;
  let timer = 0;
  const off = () => { clearTimeout(timer); timer = 0; root.classList.remove('kbd-focus'); };
  addEventListener('keydown', e => {
    if (e.key !== 'Tab') return;
    root.classList.add('kbd-focus');
    clearTimeout(timer);
    timer = setTimeout(off, 400);
  }, { capture: true });
  ['pointerdown', 'wheel', 'touchstart'].forEach(t => addEventListener(t, off, { capture: true, passive: true }));
})();

/* Content must never stay invisible. Every .reveal block starts at opacity 0
   (base.css) and waits for reveal.js to add .in as it scrolls into view. If
   reveal.js never runs (it did not load: offline on a first-visit device
   before it joined the worker's shell, a blocked script, an error before it)
   the page was laid out and blank. So: a little after load, if reveal.js has
   not announced itself (window.AEreveal is the scan it exposes), every block
   is shown. The fade still plays, so it does not look like a glitch; there
   is no stagger, because nothing is scrolling them in. utils.js is the one
   file the shell always has, which is why the check lives here. A second
   timer, from when this script ran, covers a load event that never fires. */
(function revealFailsafe() {
  function show() {
    if (window.AEreveal) return;
    document.querySelectorAll('.reveal:not(.in)').forEach(el => el.classList.add('in'));
  }
  addEventListener('load', () => setTimeout(show, 2500));
  setTimeout(show, 8000);
})();

/* Off-screen loops: a block marked [data-idle] gets .is-idle while it is out
   of view, and base.css pauses every CSS animation inside it. Opt-in, per
   block. The home page's terminal teasers alone were 13 infinite animations
   running 4,800px below the fold. */
(function idleLoops() {
  const blocks = document.querySelectorAll('[data-idle]');
  if (!blocks.length || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => en.target.classList.toggle('is-idle', !en.isIntersecting));
  }, { rootMargin: '100px 0px' });
  blocks.forEach(el => io.observe(el));
})();

/* Smooth scrolling (html.smooth in base.css) goes on only after the page has
   loaded and the browser has restored the scroll position for a back/forward
   visit. Otherwise that restoration itself is animated: a jump becomes a slide. */
addEventListener('load', () => {
  requestAnimationFrame(() => requestAnimationFrame(() => {
    document.documentElement.classList.add('smooth');
  }));
});

/* Pointer light: the HUD grid lights up under the cursor (.hud-light in
   layout.css). The lit patch is a small element of its own, moved with a
   transform, and the <i> inside it is a viewport-sized copy of the lattice
   moved the opposite way, so its lines stay on the page's grid while the patch
   travels. Eased with a lerp so the glow trails the pointer instead of
   snapping to it. Two transforms a frame and nothing else: no style is
   recalculated and nothing is repainted.

   It used to be two custom properties, --mx / --my, written onto <html> every
   frame and read by a full-screen html::before. Custom properties inherit, so
   each write changed the computed style of every element on the page: with a
   year gallery open that was an 8-9 ms style recalculation on every frame of
   mouse movement, with a full-screen gradient repaint behind it, and the main
   thread was busy for the whole frame. That was most of the stutter on a Mac. */
(function pointerLight() {
  if (!fine || reduceMotion) return;
  const reach = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--hud-reach'));
  if (!reach) return;                       // a page without the HUD backdrop

  const light = document.createElement('div');
  light.className = 'hud-light';
  light.setAttribute('aria-hidden', 'true');
  light.innerHTML = '<i></i>';
  document.body.appendChild(light);
  const lattice = light.firstChild;

  let tx = innerWidth / 2, ty = innerHeight / 2, x = tx, y = ty, raf = 0, idle = true;

  addEventListener('pointermove', e => {
    tx = e.clientX; ty = e.clientY;
    if (idle) { idle = false; light.classList.add('is-on'); }
    if (!raf) raf = requestAnimationFrame(loop);
  }, { passive: true });

  // pointerleave is not delivered to window in Chromium; the root element gets it
  document.documentElement.addEventListener('pointerleave', () => { light.classList.remove('is-on'); idle = true; });

  function loop() {
    x += (tx - x) * 0.14;
    y += (ty - y) * 0.14;
    /* the patch is centred on the pointer; the lattice inside is pushed back
       by the same amount so it stays at the viewport origin */
    light.style.transform = 'translate3d(' + (x - reach).toFixed(1) + 'px,' + (y - reach).toFixed(1) + 'px,0)';
    lattice.style.transform = 'translate3d(' + (reach - x).toFixed(1) + 'px,' + (reach - y).toFixed(1) + 'px,0)';
    raf = (Math.abs(tx - x) > 0.4 || Math.abs(ty - y) > 0.4) ? requestAnimationFrame(loop) : 0;
  }
})();

/* Service worker: the caching layer (see /sw.js).

   GitHub Pages pins Cache-Control to 600s and will not let us change it, so
   this is what makes repeat visits instant. Registered from here because
   utils.js is the one script every page already loads first.

   Only over https (or localhost); file:// and http:// are skipped, and a
   failure here must never take the page down with it. */
/* Is this running as an installed app (added to the home screen) rather than
   in a browser tab? */
function installed() {
  if (navigator.standalone === true) return true;
  try { return window.matchMedia('(display-mode: standalone)').matches; } catch (e) { return false; }
}

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
         do not load pics.js and the default there has to be the safe one.

         The exception is the home screen. Somebody who has installed this as
         an app wants the whole site on the device, photographs included, so
         that opening it with no connection shows everything rather than
         everything-but-the-galleries. The home-screen app also has its own
         storage, separate from Safari's, so nothing cached in a tab carries
         over: this is what fills it. `navigator.standalone` is the iOS
         property; the display-mode query is everyone else's. */
      /* The rest of the site (the 70 fan pages, ~1 MB, and ~20 MB of CSS, JS
         and artwork) is for somebody coming back: a first visit keeps only
         the core pages, which is what makes the tab bar instant. The
         installed app, and anyone with the photo switch on, gets it all as
         before.

         "Coming back" is a load more than thirty minutes after the previous
         one, by a timestamp in localStorage (ae-last). It used to be decided
         once per sessionStorage lifetime, and a restored tab keeps its
         sessionStorage: somebody who kept the same tab for a week was a
         first visit every day and never got the rest of the site. The rest of
         a return visit's loads count too (ae-back, in sessionStorage, only
         ever set, so a restored tab cannot be wrong about it): the worker's
         second tier is resumable across page loads and would otherwise stall
         until the next half-hour gap. Storage that is blocked reads as a
         first visit, the answer that costs nothing if wrong. */
      var kick = function () {
        var wants = false;
        try { wants = localStorage.getItem('ae-show-pics') === 'on'; } catch (e) { /* private mode */ }
        var app = installed();
        if (app) wants = true;
        var again = false;
        try {
          var now = Date.now(), last = parseInt(localStorage.getItem('ae-last'), 10);
          again = (last > 0 && now - last > 30 * 60 * 1000) || sessionStorage.getItem('ae-back') === '1';
          if (again) sessionStorage.setItem('ae-back', '1');
          localStorage.setItem('ae-last', String(now));
        } catch (e) { /* storage blocked: treated as a first visit */ }
        reg.active.postMessage({ type: 'prefetch', photos: wants, assets: app || again || wants });
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

  /* Bubble phase, then a deferred check: a handler on the link itself (the
     lightbox on screenshot links, for one) may call preventDefault(), and that
     has to have happened before we decide this click is a real navigation. */
  addEventListener('click', e => {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = e.target.closest('a[href]');
    if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
    const href = a.getAttribute('href');
    if (!href || href.charAt(0) === '#') return;                      // in-page anchor, not a navigation
    let url;
    try { url = new URL(href, location.href); } catch (_) { return; }
    if (url.origin !== location.origin) return;                       // off-site: not ours to show
    if (url.pathname === location.pathname && url.hash) return;       // same page, just a jump
    setTimeout(() => { if (!e.defaultPrevented) start(a.closest('.tabbar a') || a); }, 0);
  });

  // leaving, or coming back out of the bfcache: either way the bar is done
  addEventListener('pagehide', stop);
  addEventListener('pageshow', stop);
})();

/* Google Docs embeds (/college/, /high-school/, /al-islam/): each one waits
   behind a "Load the document" panel (see .embed-facade in components.css)
   and is only fetched when that button is pressed. The frame takes the
   panel's place and takes focus, so a keyboard carries straight on into it.
   A <noscript> copy beside each frame keeps it readable without scripts. */
(function docEmbeds() {
  document.querySelectorAll('.embed-load').forEach(btn => {
    btn.addEventListener('click', () => {
      const wrap = btn.closest('.embed-wrap');
      const f = wrap && wrap.querySelector('iframe[data-doc-src]');
      if (!f) return;
      f.src = f.dataset.docSrc;
      f.removeAttribute('data-doc-src');
      f.hidden = false;
      wrap.classList.add('is-live');
      f.focus({ preventScroll: true });
    });
  });
})();
