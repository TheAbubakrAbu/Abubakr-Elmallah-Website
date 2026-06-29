/* tilt.js — pointer-tracked 3D tilt + glare on cards, images, and the hero name */
(function tilt() {
  if (!fine || reduceMotion) return;

  function bind(el, max, lift) {
    if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
    el.style.transformStyle = 'preserve-3d';

    const glare = document.createElement('span');
    glare.className = 'card-glare';
    el.appendChild(glare);

    el.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;   // 0..1
      const py = (e.clientY - r.top) / r.height;   // 0..1
      const rx = (0.5 - py) * max * 2;
      const ry = (px - 0.5) * max * 2;
      el.style.transition = 'transform .08s linear';
      el.style.transform = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)` + (lift ? ` translateY(${lift}px)` : '');
      glare.style.setProperty('--gx', (px * 100).toFixed(1) + '%');
      glare.style.setProperty('--gy', (py * 100).toFixed(1) + '%');
      glare.style.opacity = '1';
    });
    el.addEventListener('pointerleave', () => {
      el.style.transition = '';   // fall back to the CSS ease-out
      el.style.transform = '';
      glare.style.opacity = '0';
    });
  }

  // cards lift as they tilt
  document.querySelectorAll('.app-card, .proj-card').forEach(el => bind(el, 7, -6));
  // standalone images / media tilt a touch harder
  document.querySelectorAll('.pic-frame, .flyer, .wall, .year-card').forEach(el => bind(el, 9, 0));
  // the big hero name — subtle
  const name = document.querySelector('.display');
  if (name) bind(name, 5, 0);
})();
