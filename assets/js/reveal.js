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
  /* The stagger counts within each batch that arrives together, in the order
     the batch arrives (document order), so a row of photos comes in left to
     right. It used to be (position on the whole page % 5) * 60ms, which made
     the third WWDC photo arrive first and the first terminal card last. The
     delay is only for the entrance: left on, it held back every hover
     transition on the element for good, so it is cleared once the reveal has
     played. Elements that other scripts reveal by adding .in themselves keep
     the delay scan() gives them, as before. */
  const io = new IntersectionObserver((entries) => {
    let n = 0;
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const el = en.target, delay = Math.min(n++, 5) * 60;
      el.style.transitionDelay = delay + 'ms';
      el.classList.add('in');
      io.unobserve(el);
      setTimeout(() => { el.style.transitionDelay = ''; }, delay + 950);
    });
  }, {
    /* Fires when the element's top edge crosses 88% of the window, whatever
       its height. It used to wait until 12% OF THE ELEMENT was on screen,
       which for a tall block is a long wait: the whole résumé transcription
       (one 4,200px block on a phone) stayed blank for 400px of scrolling, and
       on a 320px-wide screen 12% of it never fits, so it never appeared at
       all. Card-sized blocks trigger within a few pixels of where they used to. */
    threshold: 0, rootMargin: '0px 0px -12% 0px',
  });

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

  /* Keyboard focus can reach a link inside a block that has not revealed yet
     (Tab moves faster than scrolling does): show the block at once rather
     than leave a focused link sitting in an invisible box. */
  document.addEventListener('focusin', e => {
    const el = e.target.closest && e.target.closest('.reveal:not(.in)');
    if (!el) return;
    io.unobserve(el);
    /* at once, not as a 0.9s fade, and without the stagger delay scan() gave
       it, which would otherwise stay on and hold back every later hover */
    el.style.transitionDelay = '';
    el.classList.add('reveal-now', 'in');
    requestAnimationFrame(() => requestAnimationFrame(() => el.classList.remove('reveal-now')));
  });
})();
