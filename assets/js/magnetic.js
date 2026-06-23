/* magnetic.js — elements drift toward the cursor */
(function magnetic() {
  if (!fine || reduceMotion) return;
  document.querySelectorAll('[data-magnetic]').forEach(el => {
    const strength = 0.32;
    el.style.transition = 'transform .35s cubic-bezier(.16,1,.3,1)';
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  });
})();
