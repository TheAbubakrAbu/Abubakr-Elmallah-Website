/* lazy.js: the photographs load AFTER the page, a few at a time, nearest the
   viewport first.

   An <img data-src="..."> means nothing to the browser's own loader: no src,
   so nothing is fetched, and the page is painted and readable before a single
   photograph has been asked for. This file watches those images and hands
   each one its src when it comes within a screen of the viewport, through a
   short queue: PARALLEL at a time, the one nearest the middle of the screen
   first. A year with 700 frames in it therefore costs the page nothing until
   it is opened and scrolled, and while it is scrolled the pictures arrive in
   reading order, instead of the browser opening sixty requests at once and
   painting none of them until the last has landed. That "sixty at once" is
   what loading="lazy" does by itself: it only holds back what is well off
   screen, and everything within a couple of screens is fired together.

   And it lets go. A loaded photograph scrolled a few screens away has its src
   taken back and goes on the watch list again, so the browser can drop the
   decoded bitmap (a 1000px frame is ~3 MB decoded; a fast scroll through
   Second Year used to leave hundreds of those alive at once, which is what
   took the tab down on a phone). Scrolling back re-fetches it from the cache,
   which is instant, and it fades in again. Closing a year releases every
   frame in it the same way, because display:none is "not intersecting" too.

   And it waits out a fling. A fast scroll sweeps hundreds of frames through
   the load zone in a second, and starting each one would spend the bandwidth
   and, worse, put a decode on every frame of the fling. So while the page is
   moving faster than FAST nothing is started; the moment it slows, the frames
   nearest the viewport go first. (Measured: an 18,000px fling used to start
   ~350 loads and keep 70; gated, it starts only what it keeps.)

   Mount: write the markup with data-src instead of src, then call
   window.AElazy.watch(root). Idempotent, so call it again after writing more.
   A loaded frame carries .is-loaded; base.css keeps an unloaded one at
   opacity 0 and each component's own transition fades it in.

   Do NOT also put loading="lazy" on a data-src image. The browser would then
   apply its own distance rule on top of this one and hold a frame back after
   it has been given its src, and that frame would sit in the queue as
   "loading", blocking a slot until the visitor happened to scroll closer.

   The small stuff (icons, app shots, a dozen flyers) stays on the native
   loading="lazy": fine at that size and needs no script. This is for the
   galleries: years.js and travels.js write for it. */
(function lazy() {
  var PARALLEL = 4;                  // frames in flight at once
  var NEAR = '100% 0px 100% 0px';    // start a frame within one screen of the viewport
  var FAR  = '250% 0px 250% 0px';    // let a loaded frame go once it is this far away
  var FAST = 2.5;                    // screens per second: above this, nothing starts
  var SETTLE = 120;                  // ms without a scroll event before the page counts as still

  /* No IntersectionObserver (nothing this site supports, but a gallery must
     never be left blank): give every frame its src and let the browser get on
     with it. */
  if (!('IntersectionObserver' in window)) {
    window.AElazy = {
      watch: function (root) {
        var imgs = (root || document).querySelectorAll('img[data-src]');
        for (var i = 0; i < imgs.length; i++) {
          imgs[i].src = imgs[i].getAttribute('data-src');
          imgs[i].classList.add('is-loaded');
        }
      }
    };
    return;
  }

  /* img -> 'idle' (no src) | 'queued' | 'loading' | 'done' | 'failed' */
  var state = new WeakMap();
  var queue = [];           // wanted and not yet started
  var inFlight = 0;

  function want(img) {
    if (state.get(img) !== 'idle') return;
    state.set(img, 'queued');
    queue.push(img);
  }

  function unwant(img) {
    if (state.get(img) !== 'queued') return;
    state.set(img, 'idle');
    var i = queue.indexOf(img);
    if (i >= 0) queue.splice(i, 1);
  }

  /* Take the src back. Mid-flight this cancels the request: an <img> with no
     src has nothing to load, and no event is fired for the abandoned one. A
     frame that failed goes back to idle here too, so it is tried again the
     next time it comes near, rather than staying blank for the whole visit. */
  function release(img) {
    var s = state.get(img);
    if (s !== 'loading' && s !== 'done' && s !== 'failed') return;
    if (s === 'loading') inFlight--;
    img.removeAttribute('src');
    img.classList.remove('is-loaded');
    state.set(img, 'idle');
  }

  function settle(img, ok) {
    if (state.get(img) !== 'loading') return;      // a stale event for a request we let go
    inFlight--;
    state.set(img, ok ? 'done' : 'failed');
    if (ok) {
      /* decode off the main thread first, so the fade-in is a fade and not a
         stall; if decode() has nothing to say (or rejects), show it anyway */
      var show = function () { if (state.get(img) === 'done') img.classList.add('is-loaded'); };
      if (img.decode) img.decode().then(show, show); else show();
    }
    pump();
  }

  function onload() { settle(this, true); }
  function onerror() { settle(this, false); }

  function distance(img) {
    var r = img.getBoundingClientRect();
    return Math.abs(r.top + r.height / 2 - innerHeight / 2);
  }

  /* How fast the page is moving, in screens per second, from one scroll event
     to the next. Events more than SETTLE apart are not one motion (a jump, a
     click on "back to top" that landed), so those read as still rather than
     as an enormous velocity. The timer clears the speed once the events stop
     and restarts the queue, because nothing else would: the observers only
     speak when a frame crosses a boundary, and a fling that just came to rest
     may have crossed none. */
  var lastY = 0, lastT = 0, speed = 0, still = 0;

  addEventListener('scroll', function () {
    var now = performance.now(), dt = now - lastT;
    speed = (lastT && dt > 0 && dt < SETTLE)
      ? Math.abs(scrollY - lastY) / dt * 1000 / innerHeight
      : 0;
    lastY = scrollY; lastT = now;
    clearTimeout(still);
    still = setTimeout(function () { speed = 0; pump(); }, SETTLE);
  }, { passive: true });

  /* fill the free slots from the queue, nearest the middle of the screen first */
  function pump() {
    var slots = PARALLEL - inFlight;
    if (slots <= 0 || !queue.length) return;
    if (speed > FAST) return;                        // flinging: the settle timer calls back
    if (queue.length > 1) {
      var d = new Map();
      queue.forEach(function (img) { d.set(img, distance(img)); });
      queue.sort(function (a, b) { return d.get(a) - d.get(b); });
    }
    while (slots-- > 0 && queue.length) {
      var img = queue.shift();
      state.set(img, 'loading');
      inFlight++;
      img.src = img.getAttribute('data-src');
    }
  }

  var near = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) { if (en.isIntersecting) want(en.target); else unwant(en.target); });
    pump();
  }, { rootMargin: NEAR });

  var far = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) { if (!en.isIntersecting) release(en.target); });
    pump();                                          // a released request frees a slot
  }, { rootMargin: FAR });

  function watch(root) {
    var imgs = (root || document).querySelectorAll('img[data-src]');
    for (var i = 0; i < imgs.length; i++) {
      var img = imgs[i];
      if (state.has(img)) continue;                  // already watched
      state.set(img, 'idle');
      img.addEventListener('load', onload);
      img.addEventListener('error', onerror);
      near.observe(img);
      far.observe(img);
    }
  }

  window.AElazy = { watch: watch };
  watch(document);
})();
