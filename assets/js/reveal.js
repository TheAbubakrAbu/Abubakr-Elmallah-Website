/* reveal.js: fade/slide elements in as they enter the viewport.

   Elements start at opacity 0 (see .reveal in base.css) and only become visible
   once this observes them and adds .in.

   THE TRAP: this used to scan the document exactly once, on load. Anything
   injected into the page afterwards was never observed and therefore stayed
   invisible forever -- laid out, taking up space, blank. fan-play.js builds its
   block after this file runs and hit exactly that.

   So the scan is now re-runnable and exposed as window.AEreveal(root). Any
   script that injects .reveal markup after load must call it. */
(function reveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  function scan(root) {
    const els = (root || document).querySelectorAll('.reveal');
    els.forEach((el, i) => {
      if (el.dataset.revealSeen) return;          // never observe the same node twice
      el.dataset.revealSeen = '1';
      el.style.transitionDelay = `${(i % 5) * 60}ms`;
      io.observe(el);
    });
  }

  scan();
  window.AEreveal = scan;
})();
