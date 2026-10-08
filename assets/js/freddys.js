/* freddys.js: /freddys/, the Five Nights at Freddy's terminal.

   The cameras are the ordinary list of links in freddys.html, each carrying
   its number and room in data- attributes; this file is the office around
   them:

     the monitor   pulling it up shows one feed at a time, with the room
                   label, the static and the whole camera wall down the side.
                   Clicking a feed still goes to its page, which is the whole
                   point: this is navigation
     the power     the meter drains while the monitor is up, and faster for
                   every door shut and light on, exactly as the office does
                   it. At zero the lights go out and the page says so
     the doors     two doorways, each with a door and a light. The light
                   shows you what is in the hall; the door is the only thing
                   that stops it coming in
     the thing     one animatronic walks the rooms on a timer. It shows on
                   the feed it is in, on the tile in the grid, and in the
                   hall once it reaches a doorway. A shut door sends it back
     the clock     12 AM to 6 AM across the night, from the power left, and
                   six is a screen of its own

   Everything it draws is CSS and SVG; nothing here loads a file, and no
   character, likeness or asset from the game is reproduced. */
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
  var monitor = $('fzMonitor'), out = $('fzOut'), six = $('fzSix');
  var powerBox = document.querySelector('.fz-power');
  if (!cams.length) return;

  /* ───────────── the office state ─────────────
     Two sides, each with a door and a light. Both cost power while they are
     on, which is the only arithmetic the game really has. */
  var side = {
    left:  { box: $('fzSideL'), door: $('fzDoorL'), light: $('fzLightL'), shut: false, lit: false },
    right: { box: $('fzSideR'), door: $('fzDoorR'), light: $('fzLightR'), shut: false, lit: false }
  };

  var power = 100, usage = 1, dead = false, won = false, checked = {};

  /* the night is a clock as well as a budget: six minutes, an hour a minute.
     Declared up here because paint() reads them on its very first call. */
  var NIGHT = 360;
  var elapsed = 0;

  /* usage is the office's own count: one for the lights that are always on,
     one for the monitor, and one for each door or light you are holding */
  function recount() {
    var u = 1;
    if (monitor && !monitor.hasAttribute('hidden')) u++;
    ['left', 'right'].forEach(function (k) {
      if (side[k].shut) u++;
      if (side[k].lit) u++;
    });
    usage = Math.min(5, u);
  }

  function pips() {
    var box = $('fzPips');
    if (!box) return;
    var txt = '';
    for (var i = 0; i < 5; i++) txt += '<i class="' + (i < usage ? 'is-on' : '') + '"></i>';
    box.innerHTML = txt;
  }

  /* the six hours, filled from the power: the hour on this page has never
     been anything but the meter in a different hat */
  function hours(hour) {
    var box = $('fzHours');
    if (!box) return;
    var txt = '';
    for (var i = 0; i < 6; i++) {
      txt += '<i class="' + (i < hour ? 'is-on' : i === hour ? 'is-now' : '') + '"></i>';
    }
    box.innerHTML = txt;
  }

  function paint() {
    var pct = Math.max(0, Math.round(power));
    if ($('fzPct')) $('fzPct').textContent = pct + '%';
    if ($('fzFill')) $('fzFill').style.width = pct + '%';
    if ($('fzUsage')) $('fzUsage').textContent = usage;
    if (powerBox) powerBox.classList.toggle('is-low', pct <= 25);
    /* the hour comes off the clock, an hour a minute: 12 AM at the start and
       6 AM at the end, whatever the meter happens to be doing */
    var hour = Math.min(5, Math.floor(elapsed / (NIGHT / 6)));
    if ($('fzHour')) $('fzHour').textContent = hour === 0 ? '12' : hour;
    root.setAttribute('data-hour', hour === 0 ? '12' : String(hour));
    hours(hour);
    pips();
  }

  function note(txt) { if ($('fzNote')) $('fzNote').textContent = txt; }

  function where(txt) { if ($('fzWhere')) $('fzWhere').textContent = txt; }

  /* ───────────── the doors and the lights ───────────── */

  function paintSide(k) {
    var s = side[k];
    if (!s.box) return;
    s.box.classList.toggle('is-shut', s.shut);
    s.box.classList.toggle('is-lit', s.lit);
    if (s.door) s.door.setAttribute('aria-pressed', s.shut ? 'true' : 'false');
    if (s.light) s.light.setAttribute('aria-pressed', s.lit ? 'true' : 'false');
  }

  function toggle(k, what) {
    if (dead || won) return;
    var s = side[k];
    s[what] = !s[what];
    /* the light is a button you hold in the game; here it is a toggle, but
       it still costs power the whole time it is on, so it is the same deal */
    paintSide(k);
    recount();
    paint();
    if (s.lit && s.box && s.box.classList.contains('is-here')) {
      note('Something is in the ' + (k === 'left' ? 'west' : 'east') + ' hall. The door is the only thing that moves it.');
    } else if (s.shut) {
      note('A door is shut, which costs you power for as long as you hold it.');
    } else {
      note(usage > 1 ? 'Everything you have running is on the usage meter.'
                     : 'The monitor is down. Nothing is drawing power except the lights.');
    }
  }

  ['left', 'right'].forEach(function (k) {
    var s = side[k];
    if (s.door) s.door.addEventListener('click', function () { toggle(k, 'shut'); });
    if (s.light) s.light.addEventListener('click', function () { toggle(k, 'lit'); });
    paintSide(k);
  });

  /* ───────────── the thing in the building ─────────────
     It walks the rooms: a route through the camera list, ending at one of
     the two doorways. At a doorway, a shut door sends it back to the start;
     an open one just means it waits there, because this is a portfolio and
     nothing is going to jump out at you. */
  var route = cams.map(function (c) { return c; });
  var at = 0;              /* index into route */
  var atDoor = null;       /* 'left' | 'right' | null */

  function clearHere() {
    cams.forEach(function (c) { c.classList.remove('is-here'); });
    ['left', 'right'].forEach(function (k) {
      if (side[k].box) side[k].box.classList.remove('is-here');
    });
    if (monitor) monitor.classList.remove('is-here');
  }

  function placeHere() {
    clearHere();
    if (atDoor) {
      var s = side[atDoor];
      if (s.box) s.box.classList.add('is-here');
      where('Something is at the ' + (atDoor === 'left' ? 'west' : 'east') + ' door. Check the light.');
      return;
    }
    var cam = route[at];
    if (!cam) return;
    cam.classList.add('is-here');
    where('Movement on CAM ' + (cam.getAttribute('data-cam') || '') + ' · ' + (cam.getAttribute('data-room') || ''));
    /* if you are looking at exactly that feed, the monitor shows it */
    if (monitor && !monitor.hasAttribute('hidden') && current === cam) {
      monitor.classList.add('is-here');
    }
  }

  function step() {
    if (dead || won) return;
    if (atDoor) {
      /* at a door: a shut door turns it around, an open one keeps it waiting */
      if (side[atDoor].shut) {
        atDoor = null;
        at = 0;
        note('The door held. Whatever it was has gone back down the hall.');
      }
      placeHere();
      return;
    }
    at++;
    if (at >= route.length) {
      /* the end of the route is a doorway, picked by which side is open */
      atDoor = Math.random() < 0.5 ? 'left' : 'right';
      at = route.length - 1;
    }
    placeHere();
  }

  /* one move every so often, and never while the tab is in the background */
  if (!reduced) {
    setInterval(function () {
      if (document.hidden) return;
      step();
    }, 9000);
  }

  /* ───────────── the night ─────────────
     One tick a second, and only while the page is actually being looked at:
     a tab in the background should not run the night down.

     The night is a clock and the power is a budget, and in the game those
     are two separate things: six in the morning comes whether or not you
     still have power, and losing is arriving at the end with nothing left.
     So the seconds are counted here, not inferred from the meter: survive
     the night with power to spare and you get six o'clock; spend it all
     before the night is up and the lights go out. */
  setInterval(function () {
    if (dead || won || document.hidden) return;
    elapsed++;
    power -= usage * 0.08;
    if (power <= 0) { blackout(); return; }
    if (elapsed >= NIGHT) { morning(); return; }
    paint();
  }, 1000);

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
    won = false;
    power = 100;
    elapsed = 0;
    at = 0;
    atDoor = null;
    checked = {};
    ['left', 'right'].forEach(function (k) {
      side[k].shut = false;
      side[k].lit = false;
      paintSide(k);
    });
    cams.forEach(function (c) { c.classList.remove('is-seen'); });
    if ($('fzChecked')) $('fzChecked').textContent = '0';
    if (out) out.setAttribute('hidden', '');
    if (six) six.setAttribute('hidden', '');
    close();
    clearHere();
    placeHere();
    recount();
    paint();
    note('The monitor is down. Nothing is drawing power except the lights.');
  }

  /* six in the morning: the one screen in this game that is a reward. The
     button on the desk hands it to you, because a page nobody can finish is
     a page with a mechanic and no ending. */
  function morning() {
    if (dead || won) return;
    won = true;
    close();
    if (six) six.removeAttribute('hidden');
  }

  /* ───────────── the monitor ───────────── */

  var current = cams[0] || null;

  function show(cam) {
    if (!cam || dead || won) return;
    current = cam;
    if ($('fzMonCam')) $('fzMonCam').textContent = 'CAM ' + (cam.getAttribute('data-cam') || '');
    if ($('fzMonRoom')) $('fzMonRoom').textContent = cam.getAttribute('data-room') || '';
    var b = cam.querySelector('b'), i = cam.querySelector('i');
    if ($('fzMonT')) $('fzMonT').textContent = b ? b.textContent : '';
    if ($('fzMonD')) $('fzMonD').textContent = i ? i.textContent : '';
    var go = $('fzMonGo');
    if (go) go.setAttribute('href', cam.getAttribute('href') || '/');
    /* the figure shows only on the feed it is actually standing in */
    if (monitor) monitor.classList.toggle('is-here', !atDoor && route[at] === cam);
    /* and the night report counts the feeds you have actually pulled up */
    var key = cam.getAttribute('data-cam');
    if (key && !checked[key]) {
      checked[key] = 1;
      cam.classList.add('is-seen');
      if ($('fzChecked')) $('fzChecked').textContent = Object.keys(checked).length;
    }
    /* keep the wall in step with the feed */
    wallButtons.forEach(function (btn) {
      btn.classList.toggle('is-on', btn.cam === cam);
      btn.classList.toggle('is-here', !atDoor && route[at] === btn.cam);
    });
  }

  /* the camera wall inside the monitor, built from the same list of feeds so
     it can never fall out of step with the grid */
  var wallButtons = [];
  var wall = $('fzWall');
  if (wall) {
    cams.forEach(function (cam) {
      var btn = document.createElement('button');
      btn.type = 'button';
      var n = cam.getAttribute('data-cam') || '';
      var b = cam.querySelector('b');
      btn.innerHTML = '<span></span><em></em>';
      btn.firstChild.textContent = n;
      btn.lastChild.textContent = b ? b.textContent : '';
      btn.setAttribute('aria-label', 'Camera ' + n + ', ' + (b ? b.textContent : ''));
      btn.cam = cam;
      btn.addEventListener('click', function () { show(cam); });
      wall.appendChild(btn);
      wallButtons.push(btn);
    });
  }

  function open() {
    if (dead || won || !monitor) return;
    monitor.removeAttribute('hidden');
    recount();
    paint();
    note('The monitor is up, which is what costs you. Put it down when you are not using it.');
    show(current);
    var x = $('fzMonX');
    if (x) x.focus();
  }

  function close() {
    if (!monitor) return;
    monitor.setAttribute('hidden', '');
    recount();
    paint();
    if (!dead && !won) {
      note(usage > 1 ? 'Everything you have running is on the usage meter.'
                     : 'The monitor is down. Nothing is drawing power except the lights.');
    }
  }

  var flip = $('fzFlip');
  if (flip) flip.addEventListener('click', function () {
    if (monitor && monitor.hasAttribute('hidden')) open(); else close();
  });
  var x = $('fzMonX');
  if (x) x.addEventListener('click', close);
  if ($('fzReset')) $('fzReset').addEventListener('click', reset);
  if ($('fzOutReset')) $('fzOutReset').addEventListener('click', reset);
  if ($('fzSixReset')) $('fzSixReset').addEventListener('click', reset);

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

  /* the keys the game uses: Escape puts the monitor down, and the four
     office controls are on A/D for the doors and Q/E for the lights, which
     is where that game put them and where a hand expects them */
  document.addEventListener('keydown', function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    var tag = (e.target && e.target.tagName) || '';
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;

    if (e.key === 'Escape') {
      if (monitor && !monitor.hasAttribute('hidden')) { close(); return; }
      location.href = '/';
      return;
    }
    var k = e.key.toLowerCase();
    if (k === 'a') { toggle('left', 'shut'); }
    else if (k === 'd') { toggle('right', 'shut'); }
    else if (k === 'q') { toggle('left', 'lit'); }
    else if (k === 'e') { toggle('right', 'lit'); }
    else if (k === 'c') {
      if (monitor && monitor.hasAttribute('hidden')) open(); else close();
    } else return;
    e.preventDefault();
  });

  recount();
  paint();
  placeHere();
  show(current);
})();
