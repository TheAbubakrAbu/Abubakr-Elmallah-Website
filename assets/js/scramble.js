/* scramble.js — decode/scramble text on load (hero) and on hover (email) */
(function scramble() {
  const glyphs = '!<>-_\\/[]{}—=+*^?#________ABCDEFGHIJKLMNPQRSTUVWXYZ0123456789';
  const rand = arr => arr[Math.floor(Math.random() * arr.length)];

  function scrambleTo(el, finalText, frames = 38) {
    if (reduceMotion) { el.textContent = finalText; return; }
    const len = finalText.length;
    const queue = [];
    for (let i = 0; i < len; i++) {
      const start = Math.floor(Math.random() * frames * 0.5);
      const end = start + Math.floor(Math.random() * frames * 0.6) + 8;
      queue.push({ ch: finalText[i], start, end, rendered: '' });
    }
    let frame = 0;
    (function run() {
      let out = '', done = 0;
      for (const q of queue) {
        if (frame >= q.end) { done++; out += q.ch; }
        else if (frame >= q.start) {
          if (!q.rendered || Math.random() < 0.28) q.rendered = rand(glyphs);
          out += `<span style="color:var(--green-2)">${q.rendered}</span>`;
        }
      }
      el.innerHTML = out;
      if (done < queue.length) { frame++; requestAnimationFrame(run); }
      else el.textContent = finalText;
    })();
  }

  document.querySelectorAll('[data-scramble]').forEach((el, i) => {
    const text = el.textContent.trim();
    el.textContent = '';
    setTimeout(() => scrambleTo(el, text), 250 + i * 260);
  });

  document.querySelectorAll('[data-scramble-hover]').forEach(el => {
    const text = el.textContent.trim();
    el.addEventListener('mouseenter', () => scrambleTo(el, text, 26));
  });
})();
