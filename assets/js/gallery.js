/* gallery.js: lightbox for photos & image links.

   IMAGE POLICY: every in-page link that points to an image opens in THIS
   lightbox overlay, never a new browser tab. (The overlay reads far better
   than dumping the raw file in a tab.) That covers the "Through the Years"
   photos, app/award proof shots, flyers, wallpapers, and the WWDC photos.
   The target="_blank" left on those <a>s is just a no-JS fallback; the click
   handler below intercepts it. Any page that wants this must include the
   #lightbox markup and load gallery.js. */
(function gallery() {
  const lb = document.getElementById('lightbox');
  if (!lb) return;
  /* The overlay lives at the end of <body>, whatever page it was included in.
     Inside <main> (z-index 10, a stacking context) its own z-index counted
     for nothing: the tab bar drew over the open dialog, still inert and still
     showing the current tab, and covered the bottom of the last picture. */
  if (lb.parentElement !== document.body) document.body.appendChild(lb);
  const esc = window.AEesc || (t => String(t));
  // a title as words: textContent drops a <br> ("Datapad ·Aurebesh Translator")
  const words = el => {
    if (!el) return '';
    const c = el.cloneNode(true);
    c.querySelectorAll('br').forEach(b => b.replaceWith(' '));
    return c.textContent.replace(/\s+/g, ' ').trim();
  };
  const wrap = lb.querySelector('.lightbox-imgs');
  const title = lb.querySelector('.lightbox-title');
  const closeBtn = lb.querySelector('.lightbox-close');
  const isImg = href => /\.(jpe?g|png|webp|gif|avif)$/i.test(href || '');

  /* A real modal (role="dialog" in lightbox.html): focus moves to the close
     button on open and back to whatever opened it on close, and everything
     else on the page is inert meanwhile. Before, focus stayed on the photo
     behind the overlay and Tab walked on through the page underneath it. */
  let opener = null;
  function setInert(on) {
    for (let n = lb; n.parentElement; n = n.parentElement) {
      for (const sib of n.parentElement.children) {
        if (sib !== n && sib.tagName !== 'SCRIPT') sib.inert = on;
      }
      if (n.parentElement === document.body) break;
    }
  }

  function open(label, images) {
    label = label || '';
    opener = document.activeElement;
    const m = label.match(/^(.*?)(\s*[’']\d+)?$/);
    title.innerHTML = m ? (esc(m[1]) + (m[2] ? '<i>' + esc(m[2]) + '</i>' : '')) : esc(label);
    /* each picture keeps its own description where it has one (an award
       screenshot says what it shows); a plain path falls back to the title */
    wrap.innerHTML = images.map(s => {
      const src = typeof s === 'string' ? s : s.src;
      const alt = (typeof s === 'string' ? '' : s.alt) || label;
      return '<img src="' + esc(src) + '" alt="' + esc(alt) + '" loading="lazy" decoding="async">';
    }).join('');
    lb.setAttribute('aria-label', label || 'Photo');
    lb.classList.add('open');
    lb.setAttribute('aria-hidden', 'false');
    document.documentElement.classList.add('intro-lock');
    wrap.scrollTop = 0;
    setInert(true);
    closeBtn.focus({ preventScroll: true });
  }
  function close() {
    if (!lb.classList.contains('open')) return;   // Escape anywhere else on the page is not ours
    lb.classList.remove('open');
    lb.setAttribute('aria-hidden', 'true');
    document.documentElement.classList.remove('intro-lock');
    setInert(false);
    if (opener && opener.isConnected && opener.focus) opener.focus({ preventScroll: true });
    opener = null;
  }

  /* "Through the Years" year cards from the OLD hand-written markup, where the
     card carried its whole photo set in data-images.

     Scoped to [data-images] on purpose. The year cards on /high-school/ and
     /college/ are built by years.js now and carry data-group instead, and they
     open years.js's own deck, not this lightbox. Binding to a bare .year-card
     caught those too and threw on every click, because they have no
     data-label to match against. */
  document.querySelectorAll('.year-card[data-images]').forEach(card => {
    card.addEventListener('click', () => open(card.dataset.label, (card.dataset.images || '').split(',').filter(Boolean)));
  });

  // app / award proof screenshots: grouped per card, open together
  document.querySelectorAll('.app-shots').forEach(shots => {
    const card = shots.closest('.app-card, .proj-card');
    const label = words(card && card.querySelector('h3'));
    const links = Array.from(shots.querySelectorAll('a'));
    const images = links.filter(a => a.getAttribute('href')).map(a => {
      const img = a.querySelector('img');
      return { src: a.getAttribute('href'), alt: img ? img.alt : '' };
    });
    links.forEach(a => a.addEventListener('click', e => { e.preventDefault(); open(label, images); }));
  });

  /* franchise-catalog tiles: a finished game carries every image it has in
     data-images (fanpage.js writes it), and clicking anywhere on the tile
     opens the whole set; in grid view the thumbnail is hidden, so the tile
     itself is the only thing there is to click. */
  document.querySelectorAll('.fan-tile[data-images]').forEach(tile => {
    tile.addEventListener('click', e => {
      if (e.target.closest('a:not(.fan-tileshot)')) return;   // outbound links keep working
      e.preventDefault();
      open(tile.dataset.label, (tile.dataset.images || '').split(',').filter(Boolean));
    });
  });

  /* Every other image link (flyers, wallpapers, WWDC photos, …) opens singly.

     DELEGATED, on purpose. This used to walk a[href] once at load and bind
     each match, which missed every link written afterwards: the picture grids
     on /files/ are rendered from a data file (files-pics.js), so none of
     their eighty-eight links existed when this ran and all of them dumped the
     raw file in a tab. One listener on the document covers whatever the page
     builds later, and costs one closest() per click. */
  document.addEventListener('click', e => {
    const a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    if (a.closest('.app-shots')) return;             // handled as a group above
    if (a.closest('.fan-tile[data-images]')) return; // the tile handler owns these
    const href = a.getAttribute('href');
    if (!isImg(href)) return;
    const cap = a.querySelector('.flyer-cap b');
    const img = a.querySelector('img');
    const label = a.dataset.label || (cap && cap.textContent.trim()) || (img && img.alt) || '';
    e.preventDefault();
    open(label, [href]);
  });

  closeBtn.addEventListener('click', close);
  lb.addEventListener('click', e => { if (e.target === lb) close(); });
  /* marked handled, so expand.js does not close an open card with the same press */
  addEventListener('keydown', e => {
    if (e.key === 'Escape' && lb.classList.contains('open')) { e.preventDefault(); close(); }
  });
})();
