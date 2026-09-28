/* cursor.js: custom lerped cursor that grows over interactive targets,
   with a saved on/off preference (toggled from the button in the top bar). */
(function cursor() {
  const KEY = 'customCursor';
  const root = document.documentElement;
  /* The moving cursor only exists on fine pointers with motion allowed.
     Everything the toggle's click handler touches is declared up here, before
     any early return: start() used to read a `let` declared after the return,
     so on a touch screen or under reduced motion the toggle threw. */
  const capable = fine && !reduceMotion;
  const ring = document.getElementById('cursor');
  const dot  = document.getElementById('cursorDot');
  let mx = 0, my = 0, rx = 0, ry = 0, raf = 0;

  // preference persists across pages; default ON. 'off' hides the custom cursor
  // and restores the native one (see html.cursor-off rules in base.css)
  let enabled = true;
  try { enabled = localStorage.getItem(KEY) !== 'off'; } catch (_) {}   // storage can throw under strict privacy settings
  /* .cursor-off also goes on where the custom cursor cannot run at all, so the
     elements that set cursor:none for it (.totop, the lightbox close button,
     clickable cards) get a real pointer back instead of no cursor */
  const applyPref = () => root.classList.toggle('cursor-off', !enabled || !capable);
  applyPref();

  // wire any toggle buttons present on the page (the top bar's)
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

  if (!capable || !ring || !dot) return;

  addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    /* first move: put the ring on the pointer and show it (base.css hides
       the native cursor from here on), rather than flying in from wherever
       it was parked */
    if (!root.classList.contains('cursor-live')) {
      rx = mx; ry = my;
      root.classList.add('cursor-live');
    }
    if (enabled) dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
    start();
  }, { passive: true });

  addEventListener('mousedown', () => ring.classList.add('is-down'));
  addEventListener('mouseup',   () => ring.classList.remove('is-down'));

  /* Delegated, so targets that scripts add after this runs (year cards, trip
     cards, transcript toggles) grow the ring too. The small magnetic pieces
     that look like controls and are not (the course chips and labels, the
     academic stats, the school rows) keep their drift but not the grown
     ring: it told the pointer they could be clicked. */
  const HOVER = 'a, button, summary, [role="button"], [data-magnetic]:not(li, .acad-stat, .edu-row, .course-label)';
  document.addEventListener('pointerover', e => {
    ring.classList.toggle('is-hover', !!(e.target.closest && e.target.closest(HOVER)));
  }, { passive: true });

  /* The ring eases toward the pointer and the loop stops once it has caught
     up; the next mouse move starts it again. It used to run every frame for
     the life of the page, mouse or no mouse. */
  function start() {
    if (!capable || !enabled || raf) return;
    raf = requestAnimationFrame(loop);
  }
  function loop() {
    raf = 0;
    if (!enabled) return;                         // toggled off: let the loop end
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
    if (Math.abs(mx - rx) > 0.1 || Math.abs(my - ry) > 0.1) raf = requestAnimationFrame(loop);
  }
})();
