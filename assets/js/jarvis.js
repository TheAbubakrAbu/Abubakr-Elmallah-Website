/* jarvis.js — drives the /jarvis/ HUD: boot sequence, chronometer, gauges,
   telemetry canvas, pointer reticle and parallax. No dependencies. */
(function () {
  'use strict';

  // failsafe: whatever happens below, the HUD becomes visible
  setTimeout(function () { document.body.classList.add('is-live'); }, 5000);

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var pad = function (n) { return (n < 10 ? '0' : '') + n; };

  /* ─────────── boot sequence ─────────── */

  var BOOT = [
    ['INITIALIZING J.A.R.V.I.S. INTERFACE', 'OK'],
    ['MOUNTING PORTFOLIO ARCHIVE', 'OK'],
    ['LOADING PERSONALITY MATRIX', 'OK'],
    ['SYNCING APP STORE TELEMETRY', '12 UNITS'],
    ['CALIBRATING ARC REACTOR', '100%'],
    ['ALL SYSTEMS NOMINAL', 'READY']
  ];

  function boot() {
    var ov = $('#jvBoot'), log = $('#jvBootLog'), bar = $('#jvBootBar');
    if (!ov) { live(); return; }

    var done = false;
    function finish() {
      if (done) return;
      done = true;
      ov.classList.add('is-done');
      setTimeout(function () { ov.remove(); }, 700);
      live();
    }
    $('#jvSkip').addEventListener('click', finish);

    if (reduce) { finish(); return; }

    var i = 0;
    (function step() {
      if (i >= BOOT.length) { setTimeout(finish, 420); return; }
      var row = BOOT[i], line = document.createElement('div');
      log.appendChild(line);
      var full = '> ' + row[0], j = 0;
      var typer = setInterval(function () {
        j += 2;
        line.textContent = full.slice(0, j);
        if (j >= full.length) {
          clearInterval(typer);
          line.innerHTML = '<b>' + full + '</b> <i>… ' + row[1] + '</i>';
          i++;
          bar.style.width = (i / BOOT.length * 100) + '%';
          setTimeout(step, 130);
        }
      }, 12);
    })();
  }

  function live() {
    document.body.classList.add('is-live');
    greet();
  }

  /* ─────────── greeting line (typed) ─────────── */

  function greet() {
    var el = $('#jvGreet');
    if (!el) return;
    var h = new Date().getHours();
    var part = h < 5 ? 'a late night' : h < 12 ? 'morning' : h < 17 ? 'afternoon' : h < 21 ? 'evening' : 'night';
    var msg = h < 5
      ? 'Working late again, sir. All systems are yours.'
      : 'Good ' + part + ', sir. Portfolio systems are online.';
    if (reduce) { el.textContent = msg; return; }
    var i = 0;
    var t = setInterval(function () {
      el.innerHTML = msg.slice(0, ++i) + '<span class="jv-caret"></span>';
      if (i >= msg.length) clearInterval(t);
    }, 26);
  }

  /* ─────────── calendar strip ─────────── */

  function days() {
    var wrap = $('#jvDays');
    if (!wrap) return;
    var now = new Date();
    var total = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    var html = '';
    for (var d = 1; d <= total; d++) {
      var cls = d === now.getDate() ? 'is-now' : (d < now.getDate() ? 'is-past' : '');
      html += '<span class="jv-day ' + cls + '">' + pad(d) + '</span>';
    }
    wrap.innerHTML = html;
  }

  /* ─────────── chronometer ─────────── */

  var MONTHS = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY',
                'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
  var DAYS = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];

  // Hijri date via the Um al-Qura calendar (falls back silently if unsupported)
  function hijri(d) {
    try {
      return new Intl.DateTimeFormat('en-u-ca-islamic-umalqura-nu-latn',
        { day: 'numeric', month: 'long', year: 'numeric' }).format(d).toUpperCase();
    } catch (e) { return '···'; }
  }

  // Synodic month since the reference new moon of 2000-01-06 18:14 UTC
  var PHASES = ['NEW', 'WAXING CRESCENT', 'FIRST QUARTER', 'WAXING GIBBOUS',
                'FULL', 'WANING GIBBOUS', 'LAST QUARTER', 'WANING CRESCENT'];
  function moon(d) {
    var syn = 29.530588853;
    var days = (d - Date.UTC(2000, 0, 6, 18, 14)) / 86400000;
    var age = ((days % syn) + syn) % syn;
    var frac = age / syn;
    var illum = Math.round((1 - Math.cos(2 * Math.PI * frac)) / 2 * 100);
    return { name: PHASES[Math.floor(frac * 8 + 0.5) % 8], illum: illum, age: age.toFixed(1) };
  }

  function tick() {
    var now = new Date();
    var t = $('#jvTime'); if (t) t.firstChild.nodeValue = pad(now.getHours()) + ':' + pad(now.getMinutes());
    var s = $('#jvSecs'); if (s) s.textContent = pad(now.getSeconds());
    var up = $('#jvUptime');
    if (up) {
      var ms = now - START;
      up.textContent = pad(Math.floor(ms / 3600000)) + 'H ' + pad(Math.floor(ms / 60000) % 60) + 'M ' + pad(Math.floor(ms / 1000) % 60) + 'S';
    }
  }

  var START = new Date();

  function chrono() {
    var now = new Date();
    var set = function (id, v) { var e = document.getElementById(id); if (e) e.textContent = v; };
    set('jvDate', DAYS[now.getDay()] + ' · ' + MONTHS[now.getMonth()] + ' ' + pad(now.getDate()) + ' · ' + now.getFullYear());
    set('jvHijri', hijri(now));
    var m = moon(now);
    set('jvMoon', m.name + ' · ' + m.illum + '%');
    var start = new Date(now.getFullYear(), 0, 0);
    set('jvDoy', 'DAY ' + Math.floor((now - start) / 86400000) + ' / ' + (((now.getFullYear() % 4 === 0 && now.getFullYear() % 100 !== 0) || now.getFullYear() % 400 === 0) ? 366 : 365));
    set('jvTz', 'UTC' + (now.getTimezoneOffset() > 0 ? '-' : '+') + pad(Math.abs(now.getTimezoneOffset() / 60)) + '00');
    tick();
  }

  /* ─────────── radial gauges ─────────── */

  function gauges() {
    $$('.jv-gauge').forEach(function (g) {
      var arc = $('.arc', g);
      if (!arc) return;
      var r = parseFloat(arc.getAttribute('r'));
      var circ = 2 * Math.PI * r;
      var pct = Math.max(0, Math.min(100, parseFloat(g.dataset.val || 0)));
      g.style.setProperty('--circ', circ.toFixed(2));
      g.style.setProperty('--off', (circ * (1 - pct / 100)).toFixed(2));
    });
  }

  // decorative live load meter — HUD flavour, not a real measurement
  function loadMeter() {
    var g = $('#jvLoad'), v = $('#jvLoadV');
    if (!g || reduce) return;
    setInterval(function () {
      var pct = 38 + Math.round(Math.random() * 34);
      g.dataset.val = pct;
      var arc = $('.arc', g), r = parseFloat(arc.getAttribute('r')), circ = 2 * Math.PI * r;
      g.style.setProperty('--off', (circ * (1 - pct / 100)).toFixed(2));
      v.textContent = pct + '%';
    }, 2200);
  }

  /* ─────────── telemetry canvas ─────────── */

  function wave() {
    var c = $('#jvWave');
    if (!c) return;
    var ctx = c.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w, h, N = 150;
    var a = new Array(N).fill(0), b = new Array(N).fill(0);

    function size() {
      w = c.clientWidth; h = c.clientHeight;
      c.width = w * dpr; c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    size();
    window.addEventListener('resize', size);

    var t = 0;
    function series(arr, colour, amp, glow) {
      ctx.beginPath();
      for (var i = 0; i < N; i++) {
        var x = (i / (N - 1)) * w;
        var y = h - 4 - arr[i] * (h - 10) * amp;
        i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
      }
      ctx.strokeStyle = colour;
      ctx.lineWidth = 1.2;
      ctx.shadowBlur = glow; ctx.shadowColor = colour;
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    function frame() {
      t += 0.055;
      a.shift(); a.push(0.45 + 0.34 * Math.sin(t) * Math.sin(t * 0.37) + Math.random() * 0.16);
      b.shift(); b.push(0.24 + 0.2 * Math.abs(Math.sin(t * 0.7)) + Math.random() * 0.3);

      ctx.clearRect(0, 0, w, h);
      // baseline grid
      ctx.strokeStyle = 'rgba(41,231,255,0.10)';
      ctx.lineWidth = 1;
      for (var gx = 0; gx <= w; gx += 28) { ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, h); ctx.stroke(); }
      ctx.beginPath(); ctx.moveTo(0, h - 4); ctx.lineTo(w, h - 4); ctx.stroke();

      series(b, 'rgba(255,179,71,0.75)', 0.7, 6);
      series(a, 'rgba(41,231,255,0.95)', 1, 9);
      requestAnimationFrame(frame);
    }
    if (reduce) { ctx.clearRect(0, 0, w, h); series(a, 'rgba(41,231,255,0.8)', 1, 0); }
    else frame();
  }

  /* ─────────── pointer reticle + parallax ─────────── */

  function pointer() {
    if (reduce || !window.matchMedia('(hover: hover)').matches) return;
    var ret = $('#jvReticle');
    var tx = innerWidth / 2, ty = innerHeight / 2, cx = tx, cy = ty;

    document.addEventListener('pointermove', function (e) {
      tx = e.clientX; ty = e.clientY;
      document.body.classList.add('has-pointer');
      var px = (e.clientX / innerWidth - 0.5), py = (e.clientY / innerHeight - 0.5);
      $$('[data-par]').forEach(function (el) {
        var d = parseFloat(el.dataset.par);
        el.style.transform = 'translate3d(' + (-px * d) + 'px,' + (-py * d) + 'px,0)';
      });
    });

    (function loop() {
      cx += (tx - cx) * 0.18; cy += (ty - cy) * 0.18;
      if (ret) ret.style.transform = 'translate3d(' + cx + 'px,' + cy + 'px,0)';
      requestAnimationFrame(loop);
    })();
  }

  /* ─────────── escape hatch: skip the boot, then leave ─────────── */

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var ov = $('#jvBoot');
    if (ov && !ov.classList.contains('is-done')) { $('#jvSkip').click(); return; }
    location.href = '/';
  });

  /* ─────────── go ─────────── */

  days();
  chrono();
  gauges();
  wave();
  pointer();
  loadMeter();
  setInterval(tick, 1000);
  setInterval(chrono, 60000);
  boot();
})();
