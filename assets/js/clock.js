/* clock.js: live Pacific-time clock for the left rail + back-to-top */
(function clock() {
  const el = document.getElementById('clock');
  if (el) {
    /* The clock lives in the rail, and the rail is hidden at 820px and below
       (layout.css), so on a phone there is nothing to show it in: no ticking
       then, and no formatter either (building one with a time zone costs a
       phone 30 to 70 ms). It starts if the window is widened to show it. */
    const shown = matchMedia('(min-width: 821px)');
    let fmt = null, t = 0;
    const tick = () => { el.textContent = fmt.format(new Date()) + ' PT'; };
    const run = () => {
      clearInterval(t); t = 0;
      if (document.hidden || !shown.matches) return;       // no ticking in a background tab
      /* hourCycle 'h23', not hour12: false: the latter leaves the engine to
         pick between the 0-23 and the 1-24 cycles, and some pick 1-24, which
         showed midnight as "24:00:00" for a minute. */
      if (!fmt) fmt = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'America/Los_Angeles',
        hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23',
      });
      tick(); t = setInterval(tick, 1000);
    };
    document.addEventListener('visibilitychange', run);
    if (shown.addEventListener) shown.addEventListener('change', run);
    run();
  }

  document.getElementById('totop')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  });
})();
