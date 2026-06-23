/* intro.js — per-page launch animation.
   Type comes from <body data-intro="home|starwars|alislam">; default = "veil". */
(function intro() {
  if (reduceMotion) return;
  const type = document.body.dataset.intro || 'veil';

  const ov = document.createElement('div');
  ov.className = 'intro intro--' + type;

  if (type === 'home') {
    ov.innerHTML =
      '<div class="intro-panel intro-panel--l"></div>' +
      '<div class="intro-panel intro-panel--r"></div>' +
      '<div class="intro-center"><span class="intro-name">Abubakr Elmallah<span class="dot">.</span></span><span class="intro-line"></span></div>';
  } else if (type === 'starwars') {
    ov.innerHTML = '<canvas class="intro-stars"></canvas><span class="intro-sw">Star&nbsp;Wars</span>';
  } else if (type === 'alislam') {
    ov.innerHTML =
      '<div class="intro-isl-glow"></div>' +
      '<img class="intro-isl intro-isl--left" src="../assets/img/apps/al-quran.png" alt="" aria-hidden="true">' +
      '<img class="intro-isl intro-isl--right" src="../assets/img/apps/al-adhan.png" alt="" aria-hidden="true">' +
      '<img class="intro-isl intro-isl--main" src="../assets/img/apps/al-islam.jpg" alt="" aria-hidden="true">';
  } else if (type === 'projects') {
    // grouped: UCI Work · Star Wars · Islam
    const icons = ['apps/zotfinder.png', 'apps/uci-now.png', 'apps/uci-esports.png',
                   'apps/aurebesh-translator.jpg', 'apps/datapad.jpg', 'bots/sabacc-droid.png', 'bots/aurebesh-droid.png',
                   'apps/icoi.png', 'apps/al-adhan.png', 'apps/al-islam.jpg', 'apps/al-quran.png'];
    ov.innerHTML =
      '<div class="intro-mosaic">' +
      icons.map((s, i) => '<img class="intro-tile" style="animation-delay:' + (i * 28) + 'ms" src="../assets/img/' + s + '" alt="" aria-hidden="true">').join('') +
      '</div><span class="intro-proj-title">Projects<span class="dot">.</span></span>';
  } else if (type === 'school') {
    const ph = ['year-freshman.jpeg', 'year-sophomore-1.jpeg', 'year-junior.jpeg', 'year-senior-1.jpg'];
    ov.innerHTML =
      '<div class="intro-fan">' +
      ph.map((s, i) => '<img class="intro-photo" style="animation-delay:' + (i * 55) + 'ms" src="../assets/img/highschool/' + s + '" alt="" aria-hidden="true">').join('') +
      '</div><span class="intro-school-title">High&nbsp;School<span class="dot">.</span></span>';
  } else if (type === 'resume') {
    ov.innerHTML =
      '<div class="intro-paper"><span class="ln" style="--w:55%"></span><span class="ln" style="--w:90%"></span><span class="ln" style="--w:78%"></span><span class="ln" style="--w:92%"></span><span class="ln" style="--w:68%"></span></div>' +
      '<span class="intro-resume-title">Résumé<span class="dot">.</span></span>';
  } else {
    ov.innerHTML = '<span class="intro-name">Abubakr Elmallah<span class="dot">.</span></span>';
  }

  document.body.appendChild(ov);
  document.documentElement.classList.add('intro-lock');
  requestAnimationFrame(() => ov.classList.add('run'));

  if (type === 'starwars') warp(ov.querySelector('.intro-stars'));

  const DUR = { home: 820, starwars: 900, alislam: 900, projects: 900, school: 900, resume: 900, veil: 650 }[type] || 650;
  setTimeout(() => {
    ov.classList.add('is-done');
    document.documentElement.classList.remove('intro-lock');
    setTimeout(() => ov.remove(), 480);
  }, DUR);

  /* hyperspace starfield warp for the Star Wars intro */
  function warp(canvas) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h, cx, cy, raf, running = true;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    function size() {
      w = canvas.width = innerWidth * dpr; h = canvas.height = innerHeight * dpr;
      canvas.style.width = innerWidth + 'px'; canvas.style.height = innerHeight + 'px';
      cx = w / 2; cy = h / 2;
    }
    size();
    const mk = () => ({ a: Math.random() * Math.PI * 2, r: Math.random() * 50 * dpr, sp: (2 + Math.random() * 6) * dpr });
    const stars = Array.from({ length: 360 }, mk);
    const max = Math.hypot(w, h);
    function frame() {
      if (!running) return;
      ctx.fillStyle = 'rgba(0,0,0,0.25)';
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = 'rgba(255,255,255,0.9)';
      for (const s of stars) {
        s.r += s.sp; s.sp *= 1.028;
        const x1 = cx + Math.cos(s.a) * s.r, y1 = cy + Math.sin(s.a) * s.r;
        const x2 = cx + Math.cos(s.a) * (s.r - s.sp * 2.2), y2 = cy + Math.sin(s.a) * (s.r - s.sp * 2.2);
        ctx.lineWidth = Math.min(s.r / 140, 2.4) * dpr;
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
        if (s.r > max) { Object.assign(s, mk(), { r: Math.random() * 30 * dpr }); }
      }
      raf = requestAnimationFrame(frame);
    }
    addEventListener('resize', size);
    frame();
    setTimeout(() => { running = false; cancelAnimationFrame(raf); }, 950);
  }
})();
