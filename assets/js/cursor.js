/* cursor.js — custom lerped cursor that grows over interactive targets */
(function cursor() {
  if (!fine || reduceMotion) return;
  const ring = document.getElementById('cursor');
  const dot  = document.getElementById('cursorDot');
  if (!ring || !dot) return;
  let mx = innerWidth / 2, my = innerHeight / 2;
  let rx = mx, ry = my;

  addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
  }, { passive: true });

  addEventListener('mousedown', () => ring.classList.add('is-down'));
  addEventListener('mouseup',   () => ring.classList.remove('is-down'));

  document.querySelectorAll('a, button, [data-magnetic]').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('is-hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('is-hover'));
  });

  (function loop() {
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
    requestAnimationFrame(loop);
  })();
})();
