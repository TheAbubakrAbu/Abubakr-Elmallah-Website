/* magnetic.js: elements drift toward the cursor */
(function magnetic() {
  if (!fine || reduceMotion) return;
  const strength = 0.32;
  /* The drift is proportional to how far the pointer is from the center, so
     on a big element it had no ceiling: the hero name slid about 100px, a
     terminal card 208px, out past the edge of the window. 12px keeps the pull
     on buttons exactly as it was and turns the big blocks into a nudge. */
  const MAX = 12;
  /* data-magnetic="0.5" halves both the pull and the cap. The course chips
     have asked for half since they were written, and were given the full
     12px, which carried a chip into the 8px gap and over its neighbor. */
  document.querySelectorAll('[data-magnetic]').forEach(el => {
    const k = parseFloat(el.dataset.magnetic) || 1;
    const m = MAX * k;
    const clamp = v => Math.max(-m, Math.min(m, v));
    /* The rect is measured once on enter. Measuring on every mousemove was a
       layout read per event, and the rect included the element's own drift,
       so the center chased the cursor. */
    let cx = 0, cy = 0, x = 0, y = 0, raf = 0;
    const cs = getComputedStyle(el);
    /* `translate` does not move an inline box, so a link inside running text
       (the "Projects" link in /work/'s intro) could never drift: skip it rather
       than run handlers that change nothing. */
    if (cs.display === 'inline') return;
    /* The drift moves `translate`, not `transform`, and is added to the
       element's own transition list rather than replacing it. Writing
       `transition: transform` inline used to wipe every transition the
       stylesheet gave the element: hover colors and borders snapped, the
       scroll-reveal fade was lost, and the inline transform beat hover lifts
       like .jarvis-cta:hover's. */
    const own = cs.transitionProperty !== 'none';
    el.style.transitionProperty = (own ? cs.transitionProperty + ', ' : '') + 'translate';
    el.style.transitionDuration = (own ? cs.transitionDuration + ', ' : '') + '.35s';
    el.style.transitionTimingFunction = (own ? cs.transitionTimingFunction + ', ' : '') + 'cubic-bezier(.16,1,.3,1)';
    el.addEventListener('mouseenter', () => {
      const r = el.getBoundingClientRect();
      cx = r.left + r.width / 2; cy = r.top + r.height / 2;
    });
    el.addEventListener('mousemove', e => {
      x = clamp((e.clientX - cx) * strength * k); y = clamp((e.clientY - cy) * strength * k);
      if (!raf) raf = requestAnimationFrame(() => { raf = 0; el.style.translate = `${x}px ${y}px`; });
    }, { passive: true });
    el.addEventListener('mouseleave', () => {
      if (raf) { cancelAnimationFrame(raf); raf = 0; }
      el.style.translate = '';
    });
  });
})();
