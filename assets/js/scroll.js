/* scroll.js: scroll-driven hero (home) + a scroll-progress fill in the left rail */
(function scrollFx() {
  const railFill = document.getElementById('railFill');
  const lines = document.querySelectorAll('.hero .display .line');
  const kicker = document.querySelector('.hero .kicker');
  const role = document.querySelector('.hero .role');
  const heroDisperse = lines.length && !reduceMotion;
  let ticking = false;
  let lastEase = -1;                       // the hero progress the last frame wrote

  function update() {
    const y = window.scrollY || window.pageYOffset || 0;

    // rail scroll-progress bar
    if (railFill) {
      const max = document.documentElement.scrollHeight - innerHeight;
      const p = max > 0 ? Math.min(Math.max(y / max, 0), 1) : 0;
      railFill.style.transform = 'scaleY(' + p.toFixed(4) + ')';
    }

    // home hero: the two name lines drift apart and the intro text lifts away
    if (heroDisperse) {
      const prog = Math.min(y / (innerHeight * 0.8), 1);
      const ease = prog * prog;            // accelerate the disperse
      /* Past the hero the progress sits at 1, and every scroll frame for the
         rest of the page used to write the same eight styles again, a style
         invalidation on each of four elements per frame for nothing. Once a
         frame has written the finished state, the next frame at 1 leaves it
         alone; the moment the progress moves again it is written as before.
         (At 1 the values do not depend on the viewport, so a resize while
         parked there changes nothing either.) */
      if (ease === 1 && lastEase === 1) { ticking = false; return; }
      lastEase = ease;
      const shift = ease * 14;             // vw the lines slide apart
      if (lines[0]) { lines[0].style.transform = 'translateX(' + (-shift).toFixed(2) + 'vw)'; lines[0].style.opacity = (1 - ease).toFixed(3); }
      if (lines[1]) { lines[1].style.transform = 'translateX(' + shift.toFixed(2) + 'vw)'; lines[1].style.opacity = (1 - ease).toFixed(3); }
      if (kicker) { kicker.style.opacity = (1 - ease).toFixed(3); kicker.style.transform = 'translateY(' + (-ease * 36).toFixed(1) + 'px)'; }
      if (role) role.style.opacity = (1 - ease * 1.2).toFixed(3);
    }
    ticking = false;
  }

  addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
  addEventListener('resize', update);
  update();
})();
