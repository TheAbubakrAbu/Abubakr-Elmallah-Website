/* flowfield.js — ambient particle field (green → gold), repelled by cursor */
(function flowField() {
  const canvas = document.getElementById('field');
  if (!canvas || reduceMotion) return;
  const ctx = canvas.getContext('2d');
  let w, h, dpr, particles = [], t = 0;
  const mouse = { x: -999, y: -999 };

  // calm (slow particle) → hot (fast particle) colors, themed per page via <body data-intro>
  const THEMES = {
    home:     { calm: [31, 157, 92],  hot: [245, 198, 60] },  // Islamic green → UCI gold
    alislam:  { calm: [31, 157, 92],  hot: [63, 213, 137] },  // green → emerald
    starwars: { calm: [120, 92, 24],  hot: [255, 232, 31] },  // amber → Star Wars yellow
    school:   { calm: [47, 127, 214], hot: [245, 198, 60] },  // UCI blue → gold
    projects: { calm: [47, 127, 214], hot: [95, 163, 236] },  // navy → sky blue
  };
  const theme = THEMES[document.body.dataset.intro] || THEMES.home;

  function resize() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    w = canvas.width = innerWidth * dpr;
    h = canvas.height = innerHeight * dpr;
    canvas.style.width = innerWidth + 'px';
    canvas.style.height = innerHeight + 'px';
    const count = Math.min(140, Math.floor((innerWidth * innerHeight) / 12000));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: 0, vy: 0, life: Math.random() * 100,
    }));
  }

  // pseudo flow field from layered sines — cheap and organic
  function angleAt(x, y) {
    const s = 0.0013;
    return (Math.sin(x * s + t * 0.0006) + Math.cos(y * s - t * 0.0005)) * Math.PI;
  }

  addEventListener('mousemove', e => { mouse.x = e.clientX * dpr; mouse.y = e.clientY * dpr; }, { passive: true });
  addEventListener('mouseout', () => { mouse.x = -999; mouse.y = -999; });

  function frame() {
    t++;
    ctx.fillStyle = 'rgba(8,8,10,0.10)';
    ctx.fillRect(0, 0, w, h);

    for (const p of particles) {
      const a = angleAt(p.x, p.y);
      p.vx += Math.cos(a) * 0.10;
      p.vy += Math.sin(a) * 0.10;

      const dx = p.x - mouse.x, dy = p.y - mouse.y;
      const d2 = dx * dx + dy * dy;
      if (d2 < (160 * dpr) ** 2) {
        const d = Math.sqrt(d2) || 1;
        p.vx += (dx / d) * 1.1;
        p.vy += (dy / d) * 1.1;
      }

      p.vx *= 0.92; p.vy *= 0.92;
      p.x += p.vx; p.y += p.vy;
      p.life--;

      if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
      if (p.life < 0) { p.x = Math.random() * w; p.y = Math.random() * h; p.life = 100 + Math.random() * 120; p.vx = p.vy = 0; }

      const speed = Math.hypot(p.vx, p.vy);
      const hot = Math.min(speed / 2.2, 1);
      const cr = Math.round(theme.calm[0] + (theme.hot[0] - theme.calm[0]) * hot);
      const cg = Math.round(theme.calm[1] + (theme.hot[1] - theme.calm[1]) * hot);
      const cb = Math.round(theme.calm[2] + (theme.hot[2] - theme.calm[2]) * hot);
      ctx.fillStyle = `rgba(${cr}, ${cg}, ${cb}, ${0.18 + hot * 0.5})`;
      const radius = (0.6 + hot * 1.6) * dpr;
      ctx.beginPath();
      ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(frame);
  }

  resize();
  addEventListener('resize', resize);
  frame();
})();
