/* sound.js — subtle synthesized UI ticks (WebAudio, no asset files).
   Off by default; toggled from the rail and remembered in localStorage. */
(function sound() {
  const toggle = document.getElementById('soundToggle');
  let on = localStorage.getItem('ui-sound') !== 'off';   // ON by default
  let ac = null;

  function paint() {
    if (!toggle) return;
    toggle.setAttribute('aria-pressed', on ? 'true' : 'false');
    toggle.classList.toggle('is-on', on);
  }
  paint();

  function ctx() {
    if (!ac) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (AC) ac = new AC();
    }
    if (ac && ac.state === 'suspended') ac.resume();
    return ac;
  }

  // one short enveloped sine — a soft tick, not a beep
  function tick(freq, dur, vol) {
    if (!on) return;
    const a = ctx();
    if (!a) return;
    const t = a.currentTime;
    const o = a.createOscillator();
    const g = a.createGain();
    o.type = 'sine';
    o.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(vol, t + 0.004);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(a.destination);
    o.start(t);
    o.stop(t + dur + 0.02);
  }

  if (toggle) {
    toggle.addEventListener('click', () => {
      on = !on;
      localStorage.setItem('ui-sound', on ? 'on' : 'off');
      paint();
      ctx();
      if (on) { tick(523.25, 0.07, 0.05); setTimeout(() => tick(783.99, 0.08, 0.045), 70); } // little confirm chime
    });
  }

  const HOVER = '.tabbar a, .ql, .cta, .app-card, .proj-card, .back-link, .totop, .brand, .app-links a, .app-badge';
  let lastHover = 0;
  document.addEventListener('pointerover', e => {
    if (!on || !e.target.closest(HOVER)) return;
    const now = performance.now();
    if (now - lastHover < 45) return;        // throttle so fast moves don't machine-gun
    lastHover = now;
    tick(1180, 0.025, 0.018);
  }, { passive: true });

  document.addEventListener('click', e => {
    if (!on || !e.target.closest('a, button, .app-card, .proj-card')) return;
    tick(440, 0.05, 0.03);
  });
})();
