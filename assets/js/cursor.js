/* cursor.js: custom lerped cursor that grows over interactive targets,
   with a saved on/off preference (toggled from the button near the email). */
(function cursor() {
  const KEY = 'customCursor';
  const root = document.documentElement;

  // preference persists across pages; default ON. 'off' hides the custom cursor
  // and restores the native one (see html.cursor-off rules in base.css)
  let enabled = true;
  try { enabled = localStorage.getItem(KEY) !== 'off'; } catch (_) {}   // storage can throw under strict privacy settings
  const applyPref = () => root.classList.toggle('cursor-off', !enabled);
  applyPref();

  // wire any toggle buttons present on the page (home page, near the email)
  const buttons = document.querySelectorAll('[data-cursor-toggle]');
  function syncButtons() {
    buttons.forEach(btn => {
      btn.setAttribute('aria-pressed', String(enabled));
      const label = btn.querySelector('[data-cursor-label]');
      if (label) label.textContent = enabled ? 'On' : 'Off';
    });
  }
  syncButtons();
  buttons.forEach(btn => btn.addEventListener('click', () => {
    enabled = !enabled;
    try { localStorage.setItem(KEY, enabled ? 'on' : 'off'); } catch (_) {}
    applyPref();
    syncButtons();
    if (enabled) start();
  }));

  // the moving cursor itself only exists on fine pointers with motion allowed
  if (!fine || reduceMotion) return;
  const ring = document.getElementById('cursor');
  const dot  = document.getElementById('cursorDot');
  if (!ring || !dot) return;

  let mx = innerWidth / 2, my = innerHeight / 2;
  let rx = mx, ry = my;
  let running = false;

  addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    if (enabled) dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
  }, { passive: true });

  addEventListener('mousedown', () => ring.classList.add('is-down'));
  addEventListener('mouseup',   () => ring.classList.remove('is-down'));

  /* Delegated, so targets that scripts add after this runs (year cards, trip
     cards, transcript toggles) grow the ring too. */
  document.addEventListener('pointerover', e => {
    ring.classList.toggle('is-hover', !!(e.target.closest && e.target.closest('a, button, [data-magnetic]')));
  }, { passive: true });

  function start() {
    if (running) return;
    running = true;
    (function loop() {
      if (!enabled) { running = false; return; }  // halt the RAF when toggled off
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
      requestAnimationFrame(loop);
    })();
  }
  start();
})();
