/* clock.js: live Pacific-time clock for the left rail + back-to-top */
(function clock() {
  const el = document.getElementById('clock');
  if (el) {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'America/Los_Angeles',
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
    });
    const tick = () => { el.textContent = fmt.format(new Date()) + ' PT'; };
    let t = 0;
    const run = () => {
      clearInterval(t); t = 0;
      if (!document.hidden) { tick(); t = setInterval(tick, 1000); }   // no ticking in a background tab
    };
    document.addEventListener('visibilitychange', run);
    run();
  }

  document.getElementById('totop')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  });
})();
