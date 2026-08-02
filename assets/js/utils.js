/* utils.js — shared flags (loaded first; classic scripts share global scope) */
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/* Pointer beacon: publishes an eased cursor position as --mx / --my on <html>
   so CSS can light the HUD grid under the cursor (see layout.css). Eased with a
   lerp so the glow trails the pointer instead of snapping to it. */
(function pointerBeacon() {
  if (!fine) return;
  const root = document.documentElement;
  let tx = innerWidth / 2, ty = innerHeight / 2, x = tx, y = ty, raf = 0, idle = true;

  addEventListener('pointermove', e => {
    tx = e.clientX; ty = e.clientY;
    if (idle) { idle = false; root.classList.add('has-beacon'); }
    if (!raf) raf = requestAnimationFrame(loop);
  }, { passive: true });

  addEventListener('pointerleave', () => { root.classList.remove('has-beacon'); idle = true; });

  function loop() {
    x += (tx - x) * 0.14;
    y += (ty - y) * 0.14;
    root.style.setProperty('--mx', x.toFixed(1) + 'px');
    root.style.setProperty('--my', y.toFixed(1) + 'px');
    raf = (Math.abs(tx - x) > 0.4 || Math.abs(ty - y) > 0.4) ? requestAnimationFrame(loop) : 0;
  }
})();
