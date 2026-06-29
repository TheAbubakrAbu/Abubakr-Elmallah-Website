/* intro.js — per-page launch animation.
   Type comes from <body data-intro="home|starwars|alislam">; default = "veil". */
(function intro() {
  // Instant cover (inline-styled in the HTML) hides the page from the very first paint so the
  // real content never flashes before the launch overlay mounts. Drop it the moment we no longer
  // need it (overlay is up, or this page has no intro).
  const cover = document.getElementById('introCover');
  const dropCover = () => { if (cover && cover.parentNode) cover.remove(); };

  if (reduceMotion) { dropCover(); return; }
  const type = document.body.dataset.intro || 'veil';
  if (type === 'none') { dropCover(); return; }   // pages that opt out of the launch animation (e.g. résumé)

  const ov = document.createElement('div');
  ov.className = 'intro intro--' + type;

  if (type === 'home') {
    ov.innerHTML =
      '<div class="intro-panel intro-panel--l"></div>' +
      '<div class="intro-panel intro-panel--r"></div>' +
      '<div class="intro-center"><span class="intro-name">Abubakr Elmallah</span><span class="intro-line"></span></div>';
  } else if (type === 'starwars') {
    ov.innerHTML = '<canvas class="intro-stars"></canvas><span class="intro-sw">Star&nbsp;Wars</span>';
  } else if (type === 'alislam') {
    ov.innerHTML =
      '<div class="intro-isl-stage">' +
        '<div class="intro-isl-glow"></div>' +
        '<span class="intro-isl-ring"></span>' +
        '<span class="intro-isl-ring intro-isl-ring--2"></span>' +
        '<img class="intro-isl intro-isl--left" src="../assets/img/apps/al-adhan.jpg" alt="" aria-hidden="true">' +
        '<img class="intro-isl intro-isl--right" src="../assets/img/apps/al-quran.jpg" alt="" aria-hidden="true">' +
        '<span class="intro-isl-card">' +
          '<img class="intro-isl intro-isl--main" src="../assets/img/apps/al-islam.jpg" alt="" aria-hidden="true">' +
          '<span class="intro-isl-shine" aria-hidden="true"></span>' +
        '</span>' +
      '</div>' +
      '<span class="intro-isl-title">Al-Islam</span>';
  } else if (type === 'projects') {
    // grouped: UCI Work · Star Wars · Islam
    const icons = ['apps/zotfinder.jpg', 'apps/uci-now.jpg', 'apps/uci-esports.jpg',
                   'apps/datapad.jpg', 'bots/sabacc-droid.png', 'bots/aurebesh-droid.png',
                   'apps/al-adhan.jpg', 'apps/al-islam.jpg', 'apps/al-quran.jpg'];
    ov.innerHTML =
      '<div class="intro-mosaic">' +
      icons.map((s, i) => '<img class="intro-tile" style="animation-delay:' + (i * 28) + 'ms" src="../assets/img/' + s + '" alt="" aria-hidden="true">').join('') +
      '</div><span class="intro-proj-title">Projects</span>';
  } else if (type === 'school') {
    const ph = ['year-freshman.jpg', 'year-sophomore-1.jpg', 'year-junior.jpg', 'year-senior-1.jpg'];
    ov.innerHTML =
      '<div class="intro-fan">' +
      ph.map((s, i) => '<img class="intro-photo" style="animation-delay:' + (i * 55) + 'ms" src="../assets/img/highschool/' + s + '" alt="" aria-hidden="true">').join('') +
      '</div><span class="intro-school-title">High&nbsp;School</span>';
  } else {
    ov.innerHTML = '<span class="intro-name">Abubakr Elmallah</span>';
  }

  document.body.appendChild(ov);
  document.documentElement.classList.add('intro-lock');
  requestAnimationFrame(() => ov.classList.add('run'));
  dropCover();   // overlay now covers the screen — safe to remove the static cover

  if (type === 'starwars') {
    // Staged exit: the hyperspace streaks ease down and fade out FIRST, then the black
    // backdrop + logo fade — so nothing snaps off mid-warp.
    const stopWarp = warp(ov.querySelector('.intro-stars'));
    setTimeout(() => ov.classList.add('warp-out'), 1000);   // begin decelerating + fading the starfield
    setTimeout(() => {
      ov.classList.add('is-done');                          // now fade the rest away
      document.documentElement.classList.remove('intro-lock');
      setTimeout(() => { stopWarp(); ov.remove(); }, 600);
    }, 1650);
    return;
  }

  const DUR = { home: 820, alislam: 1050, projects: 900, school: 900, veil: 650 }[type] || 650;
  setTimeout(() => {
    ov.classList.add('is-done');
    document.documentElement.classList.remove('intro-lock');
    setTimeout(() => ov.remove(), 480);
  }, DUR);

  /* hyperspace starfield warp for the Star Wars intro. Returns a stop() fn — the caller keeps it
     running through the fade-out so the streaks ease down instead of freezing on a stale frame. */
  function warp(canvas) {
    if (!canvas) return function () {};
    const ctx = canvas.getContext('2d');
    const ov = canvas.closest('.intro');
    let w, h, cx, cy, raf, running = true;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    function size() {
      w = canvas.width = innerWidth * dpr; h = canvas.height = innerHeight * dpr;
      canvas.style.width = innerWidth + 'px'; canvas.style.height = innerHeight + 'px';
      cx = w / 2; cy = h / 2;
    }
    size();
    const mk = () => ({ a: Math.random() * Math.PI * 2, r: Math.random() * 60 * dpr, sp: (1.4 + Math.random() * 3.4) * dpr });
    // denser field + gentler acceleration = smoother, less gappy streaks
    const stars = Array.from({ length: 560 }, mk);
    const max = Math.hypot(w, h);
    function frame() {
      if (!running) return;
      const fading = ov && ov.classList.contains('warp-out');
      // heavier clear while fading wipes the trails so the field dims cleanly
      ctx.fillStyle = 'rgba(0,0,0,' + (fading ? 0.34 : 0.22) + ')';
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = 'rgba(255,255,255,0.9)';
      for (const s of stars) {
        if (fading) s.sp *= 0.94;          // decelerate out of lightspeed
        else s.sp *= 1.024;                // accelerate into it (gentler than before)
        s.r += s.sp;
        const tail = s.sp * 2.2;
        const x1 = cx + Math.cos(s.a) * s.r, y1 = cy + Math.sin(s.a) * s.r;
        const x2 = cx + Math.cos(s.a) * (s.r - tail), y2 = cy + Math.sin(s.a) * (s.r - tail);
        ctx.lineWidth = Math.min(s.r / 140, 2.4) * dpr;
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
        if (s.r > max && !fading) { Object.assign(s, mk(), { r: Math.random() * 30 * dpr }); }
      }
      raf = requestAnimationFrame(frame);
    }
    addEventListener('resize', size);
    frame();
    return function stop() { running = false; cancelAnimationFrame(raf); removeEventListener('resize', size); };
  }
})();
