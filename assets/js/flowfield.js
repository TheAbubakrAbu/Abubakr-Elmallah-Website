/* flowfield.js : ambient circuit field.
   Light packets run along the same lattice the CSS HUD grid draws, cornering at
   intersections like traces on a board. Colours come from <body data-intro>, so
   every page routes its own palette. The cursor brightens and accelerates any
   packet it gets close to. (Replaces the old organic particle trails.) */
(function circuitField() {
  const canvas = document.getElementById('field');
  if (!canvas || reduceMotion) return;
  const ctx = canvas.getContext('2d');

  /* trace colour, then head colour */
  const THEMES = {
    home:       { line: [47, 127, 214], head: [245, 198, 60] },  // UCI blue, gold head
    alislam:    { line: [31, 157, 92],  head: [63, 213, 137] },  // green, emerald head
    starwars:   { line: [120, 92, 24],  head: [255, 232, 31] },  // amber, yellow head
    school:     { line: [47, 127, 214], head: [245, 198, 60] },
    education:  { line: [47, 127, 214], head: [245, 198, 60] },
    projects:   { line: [47, 127, 214], head: [63, 213, 137] },
    work:       { line: [47, 127, 214], head: [95, 163, 236] },
    franchises: { line: [120, 92, 24],  head: [245, 198, 60] },
    veil:       { line: [47, 127, 214], head: [63, 213, 137] },
    /* the franchise fan pages, keyed off <body data-fan> */
    sw:         { line: [120, 92, 24],  head: [255, 232, 31] },   // crawl yellow
    hp:         { line: [110, 60, 20],  head: [211, 166, 37] },   // candlelight
    mcu:        { line: [120, 40, 34],  head: [224, 72, 58] },    // Stark red
    mc:         { line: [60, 100, 45],  head: [127, 191, 79] },   // grass green
    potc:       { line: [110, 85, 45],  head: [216, 176, 106] },  // lantern gold
    jp:         { line: [120, 60, 24],  head: [224, 100, 42] },   // amber
  };
  const theme = THEMES[document.body.dataset.fan || document.body.dataset.intro] || THEMES.veil;
  const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

  /* pitch follows the CSS HUD grid so the traces sit exactly on it */
  const cssCell = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--hud-cell'));
  const STEP = cssCell > 8 ? cssCell : 52;

  const TAIL = 7;                        // nodes of trail dragged behind the head
  const mouse = { x: -9999, y: -9999 };
  let w, h, dpr, cols, rows, packets = [], sparks = [];

  const X = c => c * STEP;
  const Y = r => r * STEP;

  function spawn(offscreen) {
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    const d = dirs[(Math.random() * 4) | 0];
    let c, r;
    if (offscreen) {                                   // re-enter from an edge
      if (d[0] === 1)       { c = -1;       r = (Math.random() * rows) | 0; }
      else if (d[0] === -1) { c = cols + 1; r = (Math.random() * rows) | 0; }
      else if (d[1] === 1)  { r = -1;       c = (Math.random() * cols) | 0; }
      else                  { r = rows + 1; c = (Math.random() * cols) | 0; }
    } else {
      c = (Math.random() * cols) | 0;
      r = (Math.random() * rows) | 0;
    }
    return {
      c, r, dc: d[0], dr: d[1],
      t: 0,                                            // progress toward the next node
      speed: 0.5 + Math.random() * 0.9,                // nodes per second
      turn: 0.22 + Math.random() * 0.3,                // chance of cornering at a node
      life: 240 + Math.random() * 420,                 // nodes before it recycles
      trail: [],
    };
  }

  /* The glow around each head, drawn once into a sprite and stamped from
     there. It used to be ctx.shadowBlur on every head on every frame, and a
     canvas shadow is a fresh blur pass per fill: twenty-odd of them a frame,
     and WebKit runs that blur in software. The sprite is the same soft disc,
     rendered once per display scale. */
  const GLOW = 24;                       // sprite radius, css px: covers the old 8-20px blur
  const glow = document.createElement('canvas');
  function paintGlow() {
    glow.width = glow.height = GLOW * 2 * dpr;
    const g = glow.getContext('2d');
    const c = GLOW * dpr;
    const grd = g.createRadialGradient(c, c, 0, c, c, c);
    grd.addColorStop(0, rgba(theme.head, 0.85));
    grd.addColorStop(0.3, rgba(theme.head, 0.35));
    grd.addColorStop(1, rgba(theme.head, 0));
    g.fillStyle = grd;
    g.fillRect(0, 0, glow.width, glow.height);
  }

  function size() {
    /* iOS Safari fires resize every time its toolbar collapses or expands
       during a scroll. That is not a new viewport, and respawning the whole
       field for it made the animation visibly restart mid-scroll. */
    if (innerWidth === w && Math.abs(innerHeight - h) < 120 && packets.length) return;
    dpr = Math.min(devicePixelRatio || 1, 2);
    w = innerWidth; h = innerHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    paintGlow();
    cols = Math.ceil(w / STEP); rows = Math.ceil(h / STEP);
    const count = Math.max(9, Math.min(26, Math.round(w * h / 78000)));
    packets = Array.from({ length: count }, () => spawn(false));
    sparks = [];
  }

  addEventListener('resize', size);
  addEventListener('pointermove', e => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
  document.documentElement.addEventListener('pointerleave', () => { mouse.x = mouse.y = -9999; });
  size();

  let last = 0;
  function frame(ts) {
    /* fully covered by the intro cover or the lightbox: skip the drawing, keep the clock */
    if (document.documentElement.classList.contains('intro-lock')) { last = ts; requestAnimationFrame(frame); return; }
    const dt = last ? Math.min((ts - last) / 1000, 0.05) : 0;
    last = ts;
    ctx.clearRect(0, 0, w, h);

    for (const p of packets) {
      const px = X(p.c + p.dc * p.t), py = Y(p.r + p.dr * p.t);
      const dist = Math.hypot(px - mouse.x, py - mouse.y);
      const near = dist < 220 ? 1 - dist / 220 : 0;    // cursor proximity, 0..1

      p.t += p.speed * (1 + near * 2.2) * dt;

      while (p.t >= 1) {                               // reached the next node
        p.t -= 1;
        p.trail.push({ c: p.c, r: p.r });
        if (p.trail.length > TAIL) p.trail.shift();
        p.c += p.dc; p.r += p.dr;
        p.life--;
        sparks.push({ x: X(p.c), y: Y(p.r), a: 1 });

        if (Math.random() < p.turn + near * 0.35) {    // corner, like a board trace
          const left = [p.dr, -p.dc], right = [-p.dr, p.dc];
          let pick;
          if (near > 0.15 && Math.random() < near) {   // near the cursor, steer toward it
            const vx = mouse.x - X(p.c), vy = mouse.y - Y(p.r);
            pick = (left[0] * vx + left[1] * vy) > (right[0] * vx + right[1] * vy) ? left : right;
          } else {
            pick = Math.random() < 0.5 ? left : right;
          }
          p.dc = pick[0]; p.dr = pick[1];
        }
        if (p.life <= 0 || p.c < -3 || p.c > cols + 3 || p.r < -3 || p.r > rows + 3) {
          Object.assign(p, spawn(true));
        }
      }

      const pts = p.trail.concat([{ c: p.c + p.dc * p.t, r: p.r + p.dr * p.t }]);
      for (let i = 1; i < pts.length; i++) {           // trail brightens toward the head
        ctx.strokeStyle = rgba(theme.line, (i / pts.length) * 0.5 * (0.55 + near * 0.75));
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(X(pts[i - 1].c), Y(pts[i - 1].r));
        ctx.lineTo(X(pts[i].c), Y(pts[i].r));
        ctx.stroke();
      }

      const gr = 10 + near * 14;                     // glow reach, as the old blur's
      ctx.globalAlpha = 0.6 + near * 0.4;
      ctx.drawImage(glow, px - gr, py - gr, gr * 2, gr * 2);
      ctx.globalAlpha = 1;
      ctx.fillStyle = rgba(theme.head, 0.5 + near * 0.5);
      ctx.beginPath();
      ctx.arc(px, py, 1.5 + near * 1.4, 0, Math.PI * 2);
      ctx.fill();
    }

    for (let i = sparks.length - 1; i >= 0; i--) {     // intersection sparks decay
      const s = sparks[i];
      s.a -= dt * 1.6;
      if (s.a <= 0) { sparks.splice(i, 1); continue; }
      ctx.fillStyle = rgba(theme.head, s.a * 0.35);
      ctx.fillRect(s.x - 1.5, s.y - 1.5, 3, 3);
    }
    if (sparks.length > 400) sparks.splice(0, sparks.length - 400);

    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
