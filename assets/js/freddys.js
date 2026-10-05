/* freddys.js: /freddys/, the Five Nights at Freddy's terminal.

   The cameras are the ordinary list of links in freddys.html, each carrying
   its number and room in data- attributes; this file is the office around
   them:

     the monitor   pulling it up shows one feed at a time, with the room
                   label and the static. Clicking a feed still goes to its
                   page, which is the whole point: this is navigation
     the power     the meter drains while the monitor is up, faster the more
                   you have running, exactly as the office does it. At zero
                   the lights go out and the page says so
     the clock     12 AM to 6 AM across the night, from the power left

   Everything it draws is CSS; nothing here loads a file, and no character or
   asset from the game is reproduced. */
(function freddys() {
  'use strict';

  var root = document.getElementById('fz');
  if (!root) return;
  function $(id) { return document.getElementById(id); }
  var reduced = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* smooth scrolling only after load, so back/forward restores the position
     instantly instead of sliding to it */
  addEventListener('load', function () {
    requestAnimationFrame(function () { requestAnimationFrame(function () {
      document.documentElement.classList.add('smooth');
    }); });
  });

  var cams = Array.prototype.slice.call(document.querySelectorAll('.fz-cam'));
  var monitor = $('fzMonitor'), out = $('fzOut');
  var powerBox = document.querySelector('.fz-power');

  /* ───────────── the power ─────────────
     100 down to 0. Usage is 1 with nothing running and 2 with the monitor
     up, which is the office's own arithmetic: watching costs more. The drain
     is slow enough that reading the page never runs it out by accident, and
     the whole thing resets on a button. */
  var power = 100, usage = 1, dead = false;

  function pips() {
    var box = $('fzPips');
    if (!box) return;
    var out = '';
    for (var i = 0; i < 4; i++) out += '<i class="' + (i < usage ? 'is-on' : '') + '"></i>';
    box.innerHTML = out;
  }

  function paint() {
    var pct = Math.max(0, Math.round(power));
    if ($('fzPct')) $('fzPct').textContent = pct + '%';
    if ($('fzFill')) $('fzFill').style.width = pct + '%';
    if ($('fzUsage')) $('fzUsage').textContent = usage;
    if (powerBox) powerBox.classList.toggle('is-low', pct <= 25);
    /* the hour: midnight at full, six at empty, which is the night in one line */
    var hour = Math.min(5, Math.floor((100 - power) / 20));
    if ($('fzHour')) $('fzHour').textContent = hour === 0 ? '12' : hour;
    pips();
  }

  function note(txt) { if ($('fzNote')) $('fzNote').textContent = txt; }

  function blackout() {
    if (dead) return;
    dead = true;
    power = 0;
    paint();
    close();
    if (out) out.removeAttribute('hidden');
  }

  function reset() {
    dead = false;
    power = 100;
    usage = 1;
    if (out) out.setAttribute('hidden', '');
    close();
    paint();
    note('The monitor is down. Nothing is drawing power except the lights.');
  }

  /* one tick a second, and only while the page is actually being looked at:
     a tab in the background should not run the night down */
  setInterval(function () {
    if (dead || document.hidden) return;
    power -= usage * 0.08;
    if (power <= 0) { blackout(); return; }
    paint();
  }, 1000);

  /* ───────────── the monitor ───────────── */

  var current = cams[0] || null;

  function show(cam) {
    if (!cam || dead) return;
    current = cam;
    if ($('fzMonCam')) $('fzMonCam').textContent = 'CAM ' + (cam.getAttribute('data-cam') || '');
    if ($('fzMonRoom')) $('fzMonRoom').textContent = cam.getAttribute('data-room') || '';
    var b = cam.querySelector('b'), i = cam.querySelector('i');
    if ($('fzMonT')) $('fzMonT').textContent = b ? b.textContent : '';
    if ($('fzMonD')) $('fzMonD').textContent = i ? i.textContent : '';
    var go = $('fzMonGo');
    if (go) go.setAttribute('href', cam.getAttribute('href') || '/');
  }

  function open() {
    if (dead || !monitor) return;
    monitor.removeAttribute('hidden');
    usage = 2;
    paint();
    note('The monitor is up, which is what costs you. Put it down when you are not using it.');
    show(current);
    var x = $('fzMonX');
    if (x) x.focus();
  }

  function close() {
    if (!monitor) return;
    monitor.setAttribute('hidden', '');
    usage = 1;
    paint();
    if (!dead) note('The monitor is down. Nothing is drawing power except the lights.');
  }

  var flip = $('fzFlip');
  if (flip) flip.addEventListener('click', function () {
    if (monitor && monitor.hasAttribute('hidden')) open(); else close();
  });
  var x = $('fzMonX');
  if (x) x.addEventListener('click', close);
  if ($('fzReset')) $('fzReset').addEventListener('click', reset);
  if ($('fzOutReset')) $('fzOutReset').addEventListener('click', reset);

  /* hovering or tabbing a feed selects it, and if the monitor is up it
     switches to it live. A click is still an ordinary link to the page. */
  cams.forEach(function (cam) {
    cam.addEventListener('mouseenter', function () {
      if (monitor && !monitor.hasAttribute('hidden')) show(cam); else current = cam;
    });
    cam.addEventListener('focus', function () {
      if (monitor && !monitor.hasAttribute('hidden')) show(cam); else current = cam;
    });
  });

  /* Escape puts the monitor down, which is what the key is for everywhere
     else on this site too */
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (monitor && !monitor.hasAttribute('hidden')) { close(); return; }
    location.href = '/';
  });

  paint();
  show(current);
})();
