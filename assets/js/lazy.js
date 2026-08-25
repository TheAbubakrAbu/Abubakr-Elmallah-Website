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

   One IntersectionObserver, not two. It watches the FAR margin: a frame
   inside it is a candidate, a frame outside it is let go. Which candidates
   start is decided in pump() by measuring them: within NEAR screens of the
   viewport, nearest the middle first. The obvious shape is an observer per
   margin, and that was the first version; but an observer's cost is paid on
   every frame the page draws, for every target it watches, whether or not
   anything scrolled, and 700 frames watched twice was about 1.8 ms of every
   frame for as long as a year stayed open. One observer halves that, and
   measuring a couple of hundred candidates ten times a second costs nothing.

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
  var NEAR = 1;                      // screens beyond the viewport within which a frame may start
  var FAR  = '250% 0px 250% 0px';    // candidates live inside this margin; outside it, let go
  var FAST = 2.5;                    // screens per second: above this, nothing starts
  var SETTLE = 120;                  // ms without a scroll event before the page counts as still
  var PUMP = 100;                    // ms between looks at the queue during a slow scroll

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

  /* img -> 'idle' (no src, out of range) | 'wanted' (no src, inside FAR)
          | 'loading' | 'done' | 'failed' */
  var state = new WeakMap();
  var queue = [];           // the wanted frames; pump() picks from them by distance
  var inFlight = 0;

  function want(img) {
    if (state.get(img) !== 'idle') return;
    state.set(img, 'wanted');
    queue.push(img);
  }

  /* Out of range. A wanted frame is simply forgotten; a started or finished
     one has its src taken back. Mid-flight that cancels the request: an <img>
     with no src has nothing to load, and no event is fired for the abandoned
     one. A frame that failed goes back to idle here too, so it is tried again
     the next time it comes near, rather than staying blank for the visit. */
  function drop(img) {
    var s = state.get(img);
    if (s === 'wanted') {
      var i = queue.indexOf(img);
      if (i >= 0) queue.splice(i, 1);
    } else if (s === 'loading' || s === 'done' || s === 'failed') {
      if (s === 'loading') inFlight--;
      img.removeAttribute('src');
      img.classList.remove('is-loaded');
    } else {
      return;
    }
    state.set(img, 'idle');
  }

  function settle(img, ok) {
    if (state.get(img) !== 'loading') return;      // a stale event for a request we let go
    inFlight--;
    state.set(img, ok ? 'done' : 'failed');
    if (ok) {
      /* decode off the main thread first, so the fade-in is a fade and not a
         stall; if decode() has nothing to say (or rejects), show it anyway.
         And if it never answers at all (Safari has been seen to leave that
         promise hanging on an image it has already decoded), the timer shows
         it: a frame that has loaded must never stay blank over the decode. */
      var shown = false;
      var show = function () {
        if (shown) return;
        shown = true;
        if (state.get(img) === 'done') img.classList.add('is-loaded');
      };
      if (img.decode) { img.decode().then(show, show); setTimeout(show, 400); }
      else show();
    }
    pump();
  }

  function onload() { settle(this, true); }
  function onerror() { settle(this, false); }

  /* How fast the page is moving, in screens per second, from one scroll event
     to the next. Events more than SETTLE apart are not one motion (a jump, a
     click on "back to top" that landed), so those read as still rather than
     as an enormous velocity. The timer clears the speed once the events stop
     and restarts the queue, because nothing else would: the observer only
     speaks when a frame crosses the FAR margin, and a slow scroll can bring a
     frame within NEAR without anything crossing it, which is what the
     throttled pump on the scroll event itself is for. */
  var lastY = 0, lastT = 0, speed = 0, still = 0, lastPump = 0;

  addEventListener('scroll', function () {
    var now = performance.now(), dt = now - lastT;
    speed = (lastT && dt > 0 && dt < SETTLE)
      ? Math.abs(scrollY - lastY) / dt * 1000 / innerHeight
      : 0;
    lastY = scrollY; lastT = now;
    clearTimeout(still);
    still = setTimeout(function () { speed = 0; pump(); }, SETTLE);
    if (now - lastPump > PUMP) pump();
  }, { passive: true });

  /* Fill the free slots: of the candidates within NEAR screens of the
     viewport, the nearest the middle of the screen first. The ones further
     out stay in the queue for a later look. */
  function pump() {
    lastPump = performance.now();
    var slots = PARALLEL - inFlight;
    if (slots <= 0 || !queue.length) return;
    if (speed > FAST) return;                        // flinging: the settle timer calls back
    var vh = innerHeight, mid = vh / 2, near = [];
    for (var i = 0; i < queue.length; i++) {
      var r = queue[i].getBoundingClientRect();
      if (r.bottom < -NEAR * vh || r.top > vh + NEAR * vh) continue;
      near.push({ img: queue[i], d: Math.abs(r.top + r.height / 2 - mid) });
    }
    if (!near.length) return;
    near.sort(function (a, b) { return a.d - b.d; });
    for (var j = 0; j < near.length && slots > 0; j++, slots--) {
      var img = near[j].img;
      queue.splice(queue.indexOf(img), 1);
      state.set(img, 'loading');
      inFlight++;
      img.src = img.getAttribute('data-src');
    }
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) { if (en.isIntersecting) want(en.target); else drop(en.target); });
    pump();                                          // a new candidate, or a released request freeing a slot
  }, { rootMargin: FAR });

  function watch(root) {
    var imgs = (root || document).querySelectorAll('img[data-src]');
    for (var i = 0; i < imgs.length; i++) {
      var img = imgs[i];
      if (state.has(img)) continue;                  // already watched
      state.set(img, 'idle');
      img.addEventListener('load', onload);
      img.addEventListener('error', onerror);
      io.observe(img);
    }
  }

  window.AElazy = { watch: watch };
  watch(document);
})();
