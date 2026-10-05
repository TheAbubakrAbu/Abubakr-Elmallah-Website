/* batman-descent.js: the way down.

   You arrive on /worlds/batman/ in Gotham and scroll into the Batcave. One
   number does all of it: --depth on .bat-sky, 0 at the top of the page and 1
   once you are under the city. batman.css reads it and moves the skyline, the
   signal, the rain, the rock, the stalactites and the pool off it; nothing
   here knows what any of those look like.

   The descent is over by the time the hero has gone: it is the transition
   between the top of the page and the body of it, not a thing that keeps
   happening for the whole page. Everything below the belt is already in the
   cave.

   Loaded after utils.js (for reduceMotion) and before the page's content
   scripts; there is nothing here that needs the content.

   With no scripts, --depth keeps the 0 batman.css declares and the page is
   Gotham at night, which is what it was before this file existed. */
(function batDescent() {
  var sky = document.querySelector('.bat-sky');
  if (!sky) return;

  /* The hero is the shaft you come down: the descent runs from the top of the
     page to the point where the hero has left the screen. Measured rather
     than a fixed pixel count, because the hero is a different height on a
     phone, and read fresh on resize for the same reason. */
  var hero = document.querySelector('.fan-hero');
  var span = 1;

  function measure() {
    /* 0.72 of the hero, not all of it: the cave should be fully in a little
       BEFORE the hero is gone, or the belt and the first tiles arrive while
       the rock is still sliding and the two movements read as one mess. */
    var h = hero ? hero.getBoundingClientRect().height : innerHeight;
    span = Math.max(h * 0.72, 240);
  }

  /* An ease rather than the raw ratio. Linear, the rock crept in from the
     first pixel of scroll and the whole top of the page was already half
     cave; this keeps Gotham intact for the first stretch and then commits. */
  function ease(t) { return t * t * (3 - 2 * t); }

  var last = -1;
  var ticking = false;

  function update() {
    ticking = false;
    var y = window.scrollY || window.pageYOffset || 0;
    var d = ease(Math.min(Math.max(y / span, 0), 1));
    /* Two decimals is finer than the eye on any of these layers, and it stops
       a style write on every frame of a slow scroll for a change nothing can
       see. */
    d = Math.round(d * 100) / 100;
    if (d === last) return;
    last = d;
    sky.style.setProperty('--depth', d);
  }

  addEventListener('scroll', function () {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });

  addEventListener('resize', function () { measure(); last = -1; update(); });

  measure();
  update();

  /* The fonts land after this runs and the hero grows a line, so the shaft is
     taller than it was measured. Re-measure once they are in rather than
     leaving the descent calibrated to the fallback face. */
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () { measure(); last = -1; update(); });
  }
})();
