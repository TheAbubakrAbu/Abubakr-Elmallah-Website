/* fan-spidey-ui.js: the symbiote takeover on /franchises/spider-man/.

   The Venom section is tagged data-symbiote by fanpage.js. When it is the
   thing you are looking at, <body> gets .is-symbiote and the entire page drops
   its red-and-blue for black and bone white: the skyline dims out, the swinging
   figure leaves, and white tendrils crawl in from the edges.

   Loads after reveal.js on purpose — a fault in here must never be able to stop
   the reveal pass and leave the page invisible. */
(function symbiote() {
  try {
    var sec = document.querySelector('.fan-sec[data-symbiote]');
    if (!sec) return;
    var body = document.body;
    var on = false;

    function check() {
      var r = sec.getBoundingClientRect();
      // on once the section covers the middle of the screen, off when it leaves
      var mid = innerHeight * 0.5;
      var want = r.top < mid && r.bottom > mid * 0.5;
      if (want === on) return;
      on = want;
      body.classList.toggle('is-symbiote', on);
    }

    var raf = 0;
    addEventListener('scroll', function () {
      if (!raf) raf = requestAnimationFrame(function () { raf = 0; check(); });
    }, { passive: true });
    addEventListener('resize', check, { passive: true });
    check();
  } catch (e) { /* the page just stays red and blue */ }
})();
