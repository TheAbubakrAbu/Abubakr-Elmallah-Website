/* gallery.js — lightbox for the "Through the Years" year cards.
   Each .year-card carries data-label + data-images (comma-separated).
   Clicking opens a lightbox with that year's photos at their real ratios. */
(function gallery() {
  const lb = document.getElementById('lightbox');
  if (!lb) return;
  const wrap = lb.querySelector('.lightbox-imgs');
  const title = lb.querySelector('.lightbox-title');

  function open(label, images) {
    const m = label.match(/^(.*?)(\s*[’']\d+)?$/);
    title.innerHTML = m ? (m[1] + (m[2] ? '<i>' + m[2] + '</i>' : '')) : label;
    wrap.innerHTML = images.map(s => '<img src="' + s + '" alt="' + label + '" loading="lazy">').join('');
    lb.classList.add('open');
    lb.setAttribute('aria-hidden', 'false');
    document.documentElement.classList.add('intro-lock');
    wrap.scrollTop = 0;
  }
  function close() {
    lb.classList.remove('open');
    lb.setAttribute('aria-hidden', 'true');
    document.documentElement.classList.remove('intro-lock');
  }

  document.querySelectorAll('.year-card').forEach(card => {
    card.addEventListener('click', () => open(card.dataset.label, (card.dataset.images || '').split(',').filter(Boolean)));
  });
  lb.querySelector('.lightbox-close').addEventListener('click', close);
  lb.addEventListener('click', e => { if (e.target === lb) close(); });
  addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
})();
