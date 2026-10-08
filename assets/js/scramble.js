/* scramble.js: decode/scramble text on load (hero) and on hover (email)

   The glyphs are drawn on a layer over the real text (.scramble-layer, see
   components.css), and the real text stays where it is, transparent, for the
   whole effect. This used to empty the element and grow it back a character
   at a time, which collapsed each line of the name to nothing: the hero
   column re-centered twice while it decoded (almost all of the page's layout
   shift), the email shrank to 41px on hover and the link beside it jumped,
   and a screen reader got random glyphs for the h1. */
(function scramble() {
  const glyphs = '!<>-_\\/[]{}, =+*^?#________ABCDEFGHIJKLMNPQRSTUVWXYZ0123456789';
  const rand = s => s[Math.floor(Math.random() * s.length)];
  const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  /* durations are counted in 60 Hz frames but run on the clock, so a 120 Hz
     screen gets the same speed rather than twice it */
  const FRAME = 1000 / 60;

  // hide the real text under an (empty, for now) glyph layer
  function cover(el) {
    let layer = el.querySelector(':scope > .scramble-layer');
    if (!layer) {
      layer = document.createElement('span');
      layer.className = 'scramble-layer';
      layer.setAttribute('aria-hidden', 'true');
      el.appendChild(layer);
    }
    el.classList.add('is-scrambling');
    return layer;
  }
  function uncover(el) {
    const layer = el.querySelector(':scope > .scramble-layer');
    if (layer) layer.remove();
    el.classList.remove('is-scrambling');
    el.scrambling = false;
  }

  function scrambleTo(el, frames) {
    if (el.scrambling) return;
    el.scrambling = true;
    const layer = cover(el);
    const queue = Array.from(el.dataset.scrambleText, ch => {
      const start = Math.floor(Math.random() * frames * 0.5);
      return { ch, start, end: start + Math.floor(Math.random() * frames * 0.6) + 8, glyph: '' };
    });
    const t0 = performance.now();
    (function run(now) {
      const frame = (now - t0) / FRAME;
      let out = '', done = 0;
      for (const q of queue) {
        if (frame >= q.end) { done++; out += esc(q.ch); }
        else if (frame >= q.start) {
          if (!q.glyph || Math.random() < 0.28) q.glyph = rand(glyphs);
          out += '<span style="color:var(--green-2)">' + esc(q.glyph) + '</span>';
        }
        // not started yet: hold its place, so every letter lands where it belongs
        else out += '<span style="visibility:hidden">' + esc(q.ch) + '</span>';
      }
      layer.innerHTML = out;
      if (done < queue.length) requestAnimationFrame(run);
      else uncover(el);
    })(t0);
  }

  // under reduced motion the text is simply there, as written
  if (reduceMotion) return;

  const onLoad = document.querySelectorAll('[data-scramble]');
  onLoad.forEach(el => {
    el.dataset.scrambleText = el.textContent.trim();   // keep original so hover can reuse it
    cover(el);                                         // hidden until it decodes
  });

  /* On a first visit the launch screen (intro.js) is over the page for the
     first second, and the name used to decode behind it, finished before
     anyone could see it. So it waits for intro.js to say the screen is
     opening. intro.js runs after this file, which is why the check waits for
     DOMContentLoaded. The timeout means a launch screen that never reports
     back cannot leave the name hidden. */
  let started = false;
  function play() {
    if (started) return;
    started = true;
    onLoad.forEach((el, i) => setTimeout(() => scrambleTo(el, 38), 250 + i * 260));
  }
  document.addEventListener('ae:intro-done', play, { once: true });
  document.addEventListener('DOMContentLoaded', () => { if (!document.querySelector('.intro')) play(); });
  setTimeout(play, 3000);

  if (!fine) return;   // hover effects need a mouse
  document.querySelectorAll('[data-scramble-hover]').forEach(el => {
    if (!el.dataset.scrambleText) el.dataset.scrambleText = el.textContent.trim();
    let last = -Infinity;
    el.addEventListener('mouseenter', () => {
      // cooldown absorbs the rapid re-enters caused by the magnetic drift,
      // so the scramble plays once per hover instead of looping
      const now = performance.now();
      if (now - last < 700) return;
      last = now;
      scrambleTo(el, 26);
    });
  });
})();
