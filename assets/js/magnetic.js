/* magnetic.js: elements drift toward the cursor */
(function magnetic() {
  if (!fine || reduceMotion) return;
  const strength = 0.32;
  document.querySelectorAll('[data-magnetic]').forEach(el => {
    /* The rect is measured once on enter. Measuring on every mousemove was a
       layout read per event, and the rect included the element's own drift,
       so the centre chased the cursor. */
    let cx = 0, cy = 0, x = 0, y = 0, raf = 0;
    el.style.transition = 'transform .35s cubic-bezier(.16,1,.3,1)';
    el.addEventListener('mouseenter', () => {
      const r = el.getBoundingClientRect();
      cx = r.left + r.width / 2; cy = r.top + r.height / 2;
    });
    el.addEventListener('mousemove', e => {
      x = (e.clientX - cx) * strength; y = (e.clientY - cy) * strength;
      if (!raf) raf = requestAnimationFrame(() => { raf = 0; el.style.transform = `translate(${x}px, ${y}px)`; });
    }, { passive: true });
    el.addEventListener('mouseleave', () => {
      if (raf) { cancelAnimationFrame(raf); raf = 0; }
      el.style.transform = '';
    });
  });
})();
