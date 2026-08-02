/* elmallah.js — drives the E.L.M.A.L.L.A.H. holoterminal (/elmallah/):
   boot sequence, drifting starfield with hyperspace bursts, chronometer,
   schematic scope, glyph scramble and pointer parallax. No dependencies. */
(function () {
  'use strict';

  setTimeout(function () { document.body.classList.add('is-live'); }, 5000); // failsafe

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var pad = function (n) { return (n < 10 ? '0' : '') + n; };
  var START = new Date();

  /* ─────────── boot ─────────── */

  var BOOT = [
    ['LINKING TO HOLONET RELAY', 'SIGNAL LOCKED'],
    ['AUTHENTICATING OPERATOR // ELMALLAH, A.', 'CLEARED'],
    ['SPINNING UP HOLOCRON ARCHIVE', 'MOUNTED'],
    ['INDEXING PERSONAL FLEET', '6 REGISTERED'],
    ['CHARTING SECTORS · IRVINE, SOL', 'MAPPED'],
    ['PROJECTOR ALIGNMENT', 'NOMINAL']
  ];

  function boot() {
    var ov = $('#elBoot'), log = $('#elBootLog'), bar = $('#elBootBar'), done = false;
    if (!ov) { live(); return; }

    function finish() {
      if (done) return;
      done = true;
      if (window.EL_STARS && !reduce) window.EL_STARS.burst();   // drop out of hyperspace
      ov.classList.add('is-done');
      setTimeout(function () { ov.remove(); }, 700);
      live();
    }
    $('#elSkip').addEventListener('click', finish);
    if (reduce) { finish(); return; }

    var i = 0;
    (function step() {
      if (i >= BOOT.length) { setTimeout(finish, 400); return; }
      var row = BOOT[i], line = document.createElement('div');
      log.appendChild(line);
      var full = '// ' + row[0], j = 0;
      var t = setInterval(function () {
        j += 2;
        line.textContent = full.slice(0, j);
        if (j >= full.length) {
          clearInterval(t);
          line.innerHTML = '<b>' + full + '</b> <i>▸ ' + row[1] + '</i>';
          i++;
          bar.style.width = (i / BOOT.length * 100) + '%';
          setTimeout(step, 120);
        }
      }, 11);
    })();
  }

  function live() {
    document.body.classList.add('is-live');
    say();
    counters();
  }

  /* ─────────── operator line ─────────── */

  function say() {
    var el = $('#elSay');
    if (!el) return;
    var h = new Date().getHours();
    var when = h < 5 ? 'Late cycle' : h < 12 ? 'Morning' : h < 17 ? 'Afternoon' : h < 21 ? 'Evening' : 'Night';
    var msg = when + ' watch. Archive is intact. May the Force be with you.';
    if (reduce) { el.textContent = msg; return; }
    var i = 0;
    var t = setInterval(function () {
      el.innerHTML = msg.slice(0, ++i) + '<span class="el-caret"></span>';
      if (i >= msg.length) clearInterval(t);
    }, 25);
  }

  /* ─────────── chronometer ─────────── */

  var MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  var DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  function hijri(d) {
    try {
      return new Intl.DateTimeFormat('en-u-ca-islamic-umalqura-nu-latn',
        { day: 'numeric', month: 'long', year: 'numeric' }).format(d).toUpperCase();
    } catch (e) { return '···'; }
  }

  // "Galactic Standard" stardate — a decorative encoding of the real date
  function stardate(d) {
    var start = new Date(d.getFullYear(), 0, 0);
    var doy = (d - start) / 86400000;
    var frac = (d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds()) / 864;
    return d.getFullYear() + '.' + pad(Math.floor(doy)) + '.' + pad(Math.floor(frac / 10));
  }

  function tick() {
    var now = new Date();
    var t = $('#elTime'); if (t) t.textContent = pad(now.getHours()) + ':' + pad(now.getMinutes()) + ':' + pad(now.getSeconds());
    var sd = $('#elStar'); if (sd) sd.textContent = stardate(now);
    var up = $('#elUp');
    if (up) {
      var ms = now - START;
      up.textContent = pad(Math.floor(ms / 3600000)) + ':' + pad(Math.floor(ms / 60000) % 60) + ':' + pad(Math.floor(ms / 1000) % 60);
    }
  }

  function chrono() {
    var now = new Date(), set = function (id, v) { var e = document.getElementById(id); if (e) e.textContent = v; };
    set('elDate', DAYS[now.getDay()] + ' ' + pad(now.getDate()) + ' ' + MONTHS[now.getMonth()] + ' ' + now.getFullYear());
    set('elHijri', hijri(now));
    tick();
  }

  /* ─────────── starfield + hyperspace ─────────── */

  function stars() {
    var c = $('#elStars');
    if (!c) return null;
    var ctx = c.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w, h, field = [], streaks = [];

    function size() {
      w = c.clientWidth; h = c.clientHeight;
      c.width = w * dpr; c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      field = [];
      var n = Math.min(220, Math.round(w * h / 9000));
      for (var i = 0; i < n; i++) {
        field.push({ x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.2 + 0.2,
                     a: Math.random() * 0.6 + 0.15, v: Math.random() * 0.06 + 0.01, p: Math.random() * 6.28 });
      }
    }
    size();
    window.addEventListener('resize', size);

    if (reduce) {
      field.forEach(function (s) { ctx.fillStyle = 'rgba(207,230,255,' + s.a + ')'; ctx.fillRect(s.x, s.y, s.r, s.r); });
      return null;
    }

    // hyperspace jump — fired at the end of the boot sequence
    var boost = 0;
    function burst() {
      boost = 1;
      for (var i = 0; i < 90; i++) {
        streaks.push({ x: w + Math.random() * 500, y: Math.random() * h,
                       len: 200 + Math.random() * 460, v: 26 + Math.random() * 34 });
      }
      var flash = document.createElement('div');
      flash.className = 'el-flash';
      document.body.appendChild(flash);
      setTimeout(function () { flash.remove(); }, 900);
      setTimeout(function () { boost = 0; }, 1100);
    }

    var t = 0;
    function frame() {
      t += 0.016;
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < field.length; i++) {
        var s = field[i];
        s.x -= s.v * (1 + boost * 26); if (s.x < -2) s.x = w + 2;
        var tw = s.a * (0.65 + 0.35 * Math.sin(t * 2 + s.p));
        ctx.fillStyle = 'rgba(207,230,255,' + tw.toFixed(3) + ')';
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 6.283); ctx.fill();
      }
      // occasional hyperspace streak
      if (Math.random() < 0.012) {
        streaks.push({ x: w + 40, y: Math.random() * h, len: 80 + Math.random() * 220, v: 6 + Math.random() * 10 });
      }
      for (var k = streaks.length - 1; k >= 0; k--) {
        var st = streaks[k];
        st.x -= st.v;
        var grad = ctx.createLinearGradient(st.x, st.y, st.x + st.len, st.y);
        grad.addColorStop(0, 'rgba(95,163,236,0)');
        grad.addColorStop(0.5, 'rgba(207,230,255,0.5)');
        grad.addColorStop(1, 'rgba(95,163,236,0)');
        ctx.strokeStyle = grad; ctx.lineWidth = 1.1;
        ctx.beginPath(); ctx.moveTo(st.x, st.y); ctx.lineTo(st.x + st.len, st.y); ctx.stroke();
        if (st.x + st.len < 0) streaks.splice(k, 1);
      }
      requestAnimationFrame(frame);
    }
    frame();
    return { burst: burst };
  }

  /* ─────────── schematic scope ─────────── */

  function scope() {
    var c = $('#elScope');
    if (!c) return;
    var ctx = c.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w, h;

    function size() {
      w = c.clientWidth; h = c.clientHeight;
      c.width = w * dpr; c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    size();
    window.addEventListener('resize', size);

    var t = 0;
    function frame() {
      t += 0.02;
      ctx.clearRect(0, 0, w, h);

      // blueprint grid
      ctx.strokeStyle = 'rgba(95,163,236,0.09)'; ctx.lineWidth = 1;
      for (var x = 0; x <= w; x += 26) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
      for (var y = 0; y <= h; y += 18) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }

      // twin traces
      function trace(colour, freq, amp, phase, glow) {
        ctx.beginPath();
        for (var i = 0; i <= w; i += 2) {
          var v = Math.sin(i * freq + t * 2 + phase) * Math.cos(i * freq * 0.4 - t) * amp;
          var yy = h / 2 + v;
          i ? ctx.lineTo(i, yy) : ctx.moveTo(i, yy);
        }
        ctx.strokeStyle = colour; ctx.lineWidth = 1.3;
        ctx.shadowBlur = glow; ctx.shadowColor = colour;
        ctx.stroke(); ctx.shadowBlur = 0;
      }
      trace('rgba(245,198,60,0.55)', 0.022, h * 0.18, 1.4, 5);
      trace('rgba(95,163,236,0.95)', 0.014, h * 0.3, 0, 8);

      // sweeping playhead
      var px = (t * 60) % w;
      ctx.strokeStyle = 'rgba(255,215,106,0.85)'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(px, 0); ctx.lineTo(px, h); ctx.stroke();

      requestAnimationFrame(frame);
    }
    if (reduce) { size(); } else frame();
  }

  /* ─────────── glyph scramble on the wordmark ─────────── */

  function scramble() {
    var el = $('#elMark');
    if (!el || reduce) return;
    var real = el.textContent;
    var glyphs = '⌁⍀⎔⌖⌬◈◇△▽⧗⟁⌑';
    setInterval(function () {
      var i = Math.floor(Math.random() * real.length);
      if (real[i] === '.' || real[i] === ' ') return;
      var out = real.split('');
      out[i] = glyphs[Math.floor(Math.random() * glyphs.length)];
      el.textContent = out.join('');
      setTimeout(function () { el.textContent = real; }, 110);
    }, 2600);
  }

  /* ─────────── pointer ─────────── */

  function pointer() {
    if (reduce || !window.matchMedia('(hover: hover)').matches) return;
    var cur = $('#elCursor');
    var tx = innerWidth / 2, ty = innerHeight / 2, cx = tx, cy = ty;

    document.addEventListener('pointermove', function (e) {
      tx = e.clientX; ty = e.clientY;
      document.body.classList.add('has-pointer');
      var px = e.clientX / innerWidth - 0.5, py = e.clientY / innerHeight - 0.5;
      $$('[data-par]').forEach(function (el) {
        var d = parseFloat(el.dataset.par);
        el.style.transform = 'translate3d(' + (-px * d) + 'px,' + (-py * d) + 'px,0)';
      });
    });

    (function loop() {
      cx += (tx - cx) * 0.2; cy += (ty - cy) * 0.2;
      if (cur) cur.style.transform = 'translate3d(' + cx + 'px,' + cy + 'px,0)';
      requestAnimationFrame(loop);
    })();
  }



  /* ─────────── holocron spin (rAF-driven so hover never restarts it) ─────────── */

  function spinCube() {
    var cube = $('#elCube'), holo = $('#elHolo');
    if (!cube) return;
    if (reduce) { cube.style.transform = 'rotateX(-22deg) rotateY(28deg)'; return; }

    var angle = 0, speed = 18, target = 18, last = 0;   // degrees per second
    if (holo) {
      holo.addEventListener('pointerenter', function () { target = 58; });
      holo.addEventListener('pointerleave', function () { target = 18; });
    }
    function frame(ts) {
      var dt = last ? Math.min((ts - last) / 1000, 0.05) : 0;
      last = ts;
      speed += (target - speed) * Math.min(dt * 3.2, 1);   // ease into the new rate
      angle = (angle + speed * dt) % 360;
      cube.style.transform = 'rotateX(-22deg) rotateY(' + angle.toFixed(2) + 'deg)';
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /* ─────────── rising light motes ─────────── */

  function motes() {
    var wrap = $('#elMotes');
    if (!wrap || reduce) return;
    var html = '';
    for (var i = 0; i < 16; i++) {
      var left = 24 + Math.random() * 52;          // clustered over the projector plate
      var dur = 4 + Math.random() * 5;
      html += '<i style="left:' + left.toFixed(1) + '%;--dx:' + (Math.random() * 40 - 20).toFixed(0) +
              'px;animation-duration:' + dur.toFixed(2) + 's;animation-delay:-' + (Math.random() * dur).toFixed(2) + 's"></i>';
    }
    wrap.innerHTML = html;
  }

  /* ─────────── holocron responds to the pointer ─────────── */

  function tiltCube() {
    var holo = $('#elHolo'), stage = $('#elStage');
    if (!holo || !stage || reduce) return;
    holo.addEventListener('pointermove', function (e) {
      var r = holo.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width - 0.5;
      var py = (e.clientY - r.top) / r.height - 0.5;
      stage.style.setProperty('--ty', (px * 34).toFixed(1) + 'deg');
      stage.style.setProperty('--tx', (-py * 26).toFixed(1) + 'deg');
    });
    holo.addEventListener('pointerleave', function () {
      stage.style.setProperty('--ty', '0deg');
      stage.style.setProperty('--tx', '0deg');
    });
  }

  /* ─────────── lock-on reticle ─────────── */

  function lockOn() {
    var box = $('#elLock');
    if (!box || !window.matchMedia('(hover: hover)').matches) return;
    $$('[data-lock]').forEach(function (el) {
      el.addEventListener('pointerenter', function () {
        var r = el.getBoundingClientRect();
        box.style.width = r.width + 'px';
        box.style.height = r.height + 'px';
        box.style.transform = 'translate3d(' + r.left + 'px,' + r.top + 'px,0)';
        box.classList.add('on');
      });
      el.addEventListener('pointerleave', function () { box.classList.remove('on'); });
    });
    window.addEventListener('scroll', function () { box.classList.remove('on'); }, { passive: true });
  }

  /* ─────────── comm chatter ─────────── */

  var CHATTER = [
    ['ARCHIVE INDEX VERIFIED', 1], ['AUREBESH GLYPH TABLE LOADED', 0],
    ['SECTOR SCAN · NO HOSTILES', 1], ['QIBLA VECTOR RECALCULATED', 0],
    ['HOLOCRON SPIN STABLE · 20S/REV', 0], ['APP STORE UPLINK NOMINAL', 1],
    ['SWIFT COMPILER WARM', 0], ['SABACC DECK SHUFFLED', 0],
    ['PRAYER TIMES SYNCED · AL-ADHAN', 1], ['HYPERDRIVE COILS CHARGED', 0],
    ['TRANSPONDER · UCI CAMPUS', 0], ['CAFFEINE RESERVES CRITICAL', 0],
    ['PROJECTOR ALIGNMENT HOLDING', 1], ['DROID UPLINK · 2 UNITS', 0]
  ];

  function chatter() {
    var log = $('#elLog');
    if (!log) return;
    var i = Math.floor(Math.random() * CHATTER.length);

    function push() {
      var row = CHATTER[i % CHATTER.length]; i++;
      var d = new Date();
      var line = document.createElement('div');
      if (row[1]) line.className = 'ok';
      line.innerHTML = '<b>' + pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds()) +
                       '</b><span>' + row[0] + '</span>';
      log.insertBefore(line, log.firstChild);
      while (log.children.length > 6) log.removeChild(log.lastChild);
    }
    for (var k = 0; k < 4; k++) push();
    if (!reduce) setInterval(push, 3400);
  }

  /* ─────────── count-up readouts ─────────── */

  function counters() {
    $$('[data-count]').forEach(function (el) {
      var target = parseInt(el.dataset.count, 10) || 0;
      if (reduce) { el.textContent = target; return; }
      var n = 0;
      var step = setInterval(function () {
        n++; el.textContent = n;
        if (n >= target) clearInterval(step);
      }, Math.max(40, 700 / Math.max(target, 1)));
    });
  }

  /* escape hatch: first Esc skips the boot, then Esc leaves the terminal */
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var ov = $('#elBoot');
    if (ov && !ov.classList.contains('is-done')) { $('#elSkip').click(); return; }
    location.href = '/';
  });

  chrono();
  window.EL_STARS = stars();
  scope();
  scramble();
  pointer();
  motes();
  spinCube();
  tiltCube();
  lockOn();
  chatter();
  setInterval(tick, 1000);
  setInterval(chrono, 60000);
  boot();
})();
