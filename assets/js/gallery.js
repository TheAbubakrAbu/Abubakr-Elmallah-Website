/* gallery.js — lightbox for photos & image links.

   IMAGE POLICY: every in-page link that points to an image opens in THIS
   lightbox overlay — never a new browser tab. (The overlay reads far better
   than dumping the raw file in a tab.) That covers the "Through the Years"
   photos, app/award proof shots, flyers, wallpapers, and the WWDC photos.
   The target="_blank" left on those <a>s is just a no-JS fallback; the click
   handler below intercepts it. Any page that wants this must include the
   #lightbox markup and load gallery.js. */
(function gallery() {
  const lb = document.getElementById('lightbox');
  if (!lb) return;
  const wrap = lb.querySelector('.lightbox-imgs');
  const title = lb.querySelector('.lightbox-title');
  const isImg = href => /\.(jpe?g|png|webp|gif|avif)$/i.test(href || '');

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

  // "Through the Years" year cards — each opens its full set of photos
  document.querySelectorAll('.year-card').forEach(card => {
    card.addEventListener('click', () => open(card.dataset.label, (card.dataset.images || '').split(',').filter(Boolean)));
  });

  // app / award proof screenshots — grouped per card, open together
  document.querySelectorAll('.app-shots').forEach(shots => {
    const card = shots.closest('.app-card, .proj-card');
    const h3 = card && card.querySelector('h3');
    const label = h3 ? h3.textContent.trim() : '';
    const links = Array.from(shots.querySelectorAll('a'));
    const images = links.map(a => a.getAttribute('href')).filter(Boolean);
    links.forEach(a => a.addEventListener('click', e => { e.preventDefault(); open(label, images); }));
  });

  // every other image link (flyers, wallpapers, WWDC photos, …) opens singly
  document.querySelectorAll('a[href]').forEach(a => {
    if (a.closest('.app-shots')) return;            // already handled as a group above
    const href = a.getAttribute('href');
    if (!isImg(href)) return;
    const cap = a.querySelector('.flyer-cap b');
    const img = a.querySelector('img');
    const label = a.dataset.label || (cap && cap.textContent.trim()) || (img && img.alt) || '';
    a.addEventListener('click', e => { e.preventDefault(); open(label, [href]); });
  });

  lb.querySelector('.lightbox-close').addEventListener('click', close);
  lb.addEventListener('click', e => { if (e.target === lb) close(); });
  addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
})();
