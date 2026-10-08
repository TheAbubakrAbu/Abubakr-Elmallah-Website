/* springfield.js: /springfield/, the Simpsons terminal.

   The town is drawn in springfield.html; this file only brings it to life:

     the sky        day, dusk or night, from the visitor's own clock, so the
                    windows in town are lit when it is dark where you are
     the gate sign  "days without an accident", which (like the real one)
                    keeps going back to zero: here, on the first of the month
     the directory  pointing at an address lights its building in the town
     the board      a different line on the chalkboard every visit, written
                    out five times, a letter at a time
     the dial       the couch gag: every turn of the TV's dial runs the next
     lights out     "Turn off the TV" and the answer

   Nothing here loads a file, and with JavaScript off every link still
   works and the board still shows its first line. */
(function springfield() {
  'use strict';

  var root = document.getElementById('sf');
  if (!root) return;
  function $(id) { return document.getElementById(id); }
  var reduced = !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);

  // localStorage can throw (private windows, blocked site data), so every
  // touch of it is wrapped, and the page works the same without it
  function load(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function save(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* fine */ } }

  /* ───────────── the sky and the gate sign ───────────── */

  var days = $('sfDays'), time = $('sfTime');
  function sky(h) {
    // night after eight and before five, a dusk either side, day between
    root.classList.toggle('is-night', h >= 20 || h < 5);
    root.classList.toggle('is-dusk', (h >= 17 && h < 20) || h === 5);
  }
  function tick() {
    var d = new Date(), h = d.getHours(), m = d.getMinutes();
    if (days) days.textContent = String(d.getDate() - 1);
    if (time) time.textContent = ((h % 12) || 12) + ':' + (m < 10 ? '0' : '') + m + (h < 12 ? ' AM' : ' PM');
    sky(h);
  }
  tick(); setInterval(tick, 20000);

  /* ───────────── the directory lights the town ───────────── */

  var frame = $('sfFrame');
  var buildings = {};
  Array.prototype.forEach.call(document.querySelectorAll('.sf-b[data-room]'), function (b) {
    buildings[b.getAttribute('data-room')] = b;
  });
  function light(room, on, bring) {
    var b = buildings[room];
    if (!b) return;
    b.classList.toggle('is-lit', on);
    // tabbing down the directory on a narrow screen, the town scrolls
    // sideways to keep the lit building in its frame
    if (on && bring && frame && frame.scrollWidth > frame.clientWidth + 4) {
      var f = frame.getBoundingClientRect(), r = b.getBoundingClientRect();
      if (r.left < f.left || r.right > f.right) {
        frame.scrollTo({ left: frame.scrollLeft + (r.left + r.width / 2) - (f.left + f.width / 2), behavior: reduced ? 'auto' : 'smooth' });
      }
    }
  }
  Array.prototype.forEach.call(document.querySelectorAll('.sf-room[data-room]'), function (a) {
    var room = a.getAttribute('data-room');
    a.addEventListener('mouseenter', function () { light(room, true, false); });
    a.addEventListener('mouseleave', function () { light(room, false); });
    a.addEventListener('focus', function () { light(room, true, true); });
    a.addEventListener('blur', function () { light(room, false); });
  });

  /* ───────────── the chalkboard ───────────── */

  // This site's own jokes, written for the board. One per visit, in turn,
  // counted in this browser; a random one if the browser will not keep count.
  var LINES = [
    'I will not ship a thirteenth app during class',
    'Seventy-four worlds is not too many worlds',
    'I will not compute prayer times a twenty-third way',
    'The Discord bots are not doing my homework',
    'Order 66 was a school project, not a plan',
    'There is no Sector 7G at UC Irvine',
    'I will not rebuild the site inside another world',
    'A Top 10 chart position is not a personality',
    'I will not change the fonts again',
    'The lightsaber guide is not a weapons permit',
    'Not every page needs a thinking orb',
    'I will not prank call the esports arena',
    'A résumé is not a world. Probably',
    'I will not leave the receipt in the Kwik-E-Mart'
  ];
  var chalk = $('sfChalk'), chalkSr = $('sfChalkSr'), chalkN = $('sfChalkN');
  var rows = chalk ? chalk.querySelectorAll('p') : [];
  var line = parseInt(load('sf-chalk'), 10);
  if (isNaN(line)) line = Math.floor(Math.random() * LINES.length);
  line = ((line % LINES.length) + LINES.length) % LINES.length;
  save('sf-chalk', String(line + 1));

  var writing = 0;   // bumped on every new line, so an old run stops writing
  function write(text) {
    var run = ++writing;
    if (chalkSr) chalkSr.textContent = 'Today’s line: ' + text + '.';
    if (chalkN) chalkN.textContent = 'Line ' + (line + 1) + ' of ' + LINES.length + ', and a new one every visit.';
    var i;
    if (reduced) {
      for (i = 0; i < rows.length; i++) { rows[i].textContent = text; rows[i].className = ''; }
      return;
    }
    // Every row holds the whole line from the start, the unwritten part in
    // invisible chalk, so the board is already its final height and nothing
    // under it jumps as a line wraps halfway through being written.
    var done = [], todo = [];
    for (i = 0; i < rows.length; i++) {
      var a = document.createElement('span'), z = document.createElement('span');
      z.className = 'sf-unwritten'; z.textContent = text;
      rows[i].textContent = ''; rows[i].className = '';
      rows[i].appendChild(a); rows[i].appendChild(z);
      done.push(a); todo.push(z);
    }
    var r = 0, c = 0;
    (function step() {
      if (run !== writing || r >= rows.length) return;
      var p = rows[r];
      p.className = 'is-writing';
      c++;
      done[r].textContent = text.slice(0, c);
      todo[r].textContent = text.slice(c);
      var delay = 26 + Math.random() * 34;
      if (text.charAt(c - 1) === ' ') delay += 30;   // the chalk lifts between words
      if (c >= text.length) { p.className = ''; r++; c = 0; delay = 420; }
      setTimeout(step, delay);
    })();
  }
  // start writing when the board is on screen, not while nobody is watching
  if (chalk) {
    if ('IntersectionObserver' in window) {
      var seen = new IntersectionObserver(function (es) {
        if (es[0].isIntersecting) { seen.disconnect(); write(LINES[line]); }
      }, { threshold: 0.4 });
      seen.observe(chalk);
    } else {
      write(LINES[line]);
    }
  }
  var chalkBtn = $('sfChalkBtn');
  if (chalkBtn) chalkBtn.addEventListener('click', function () {
    line = (line + 1) % LINES.length;
    save('sf-chalk', String(line + 1));
    write(LINES[line]);
  });

  /* ───────────── the couch gag ───────────── */

  var GAGS = [
    ['slide',  'The couch slides out of the room and comes back in from the other side.'],
    ['sail',   'The sailboat leaves its painting for a lap of the living room.'],
    ['shrink', 'The couch shrinks to the size of a crumb, then thinks better of it.'],
    ['donut',  'The couch is gone. A donut rolls in and takes its place, briefly.'],
    ['dark',   'The lamp goes out. Somebody finds the switch.'],
    ['flip',   'The whole room turns upside down and all the way round.'],
    ['quake',  'An earthquake. The painting ends up crooked, and stays that way.']
  ].filter(function (g) { return !(reduced && (g[0] === 'flip' || g[0] === 'quake')); });
  var CHANNELS = [3, 6, 9, 11, 2, 6, 13, 4, 6, 8];
  var tv = $('sfTv'), cap = $('sfGagCap'), btn = $('sfGagBtn'), ch = $('sfCh');
  var hand = tv ? tv.querySelector('.sf-dial-hand') : null;
  var gag = -1, turns = 0;
  function run() {
    if (!tv) return;
    gag = (gag + 1) % GAGS.length;
    turns++;
    if (hand) hand.style.rotate = (turns * 45) + 'deg';
    if (ch) ch.textContent = String(CHANNELS[turns % CHANNELS.length]);
    // clear the last gag and the snow, let the browser see the room at
    // rest for one frame, then run the next: the same attribute value twice
    // in a row would not restart its animation otherwise
    tv.setAttribute('data-gag', '');
    tv.classList.remove('is-tuning');
    void tv.getBoundingClientRect();
    tv.classList.add('is-tuning');
    tv.setAttribute('data-gag', GAGS[gag][0]);
    if (cap) cap.textContent = 'Channel ' + ch.textContent + '. ' + GAGS[gag][1];
  }
  if (btn) btn.addEventListener('click', run);
  // run the first one by itself when the set comes into view
  if (tv && !reduced && 'IntersectionObserver' in window) {
    var watch = new IntersectionObserver(function (es) {
      if (es[0].isIntersecting) { watch.disconnect(); setTimeout(run, 500); }
    }, { threshold: 0.6 });
    watch.observe(tv);
  }

  /* ───────────── lights out ───────────── */

  var off = $('sfOffBtn'), done = $('sfDone');
  var home = done ? done.querySelector('a') : null;
  function lightsOut() {
    root.classList.add('is-off');
    // keyboard users land on the way home once the picture has gone
    setTimeout(function () { if (home && root.classList.contains('is-off')) home.focus({ preventScroll: true }); }, reduced ? 50 : 1300);
  }
  function lightsOn() {
    if (!root.classList.contains('is-off')) return;
    root.classList.remove('is-off');
    if (off) off.focus({ preventScroll: true });
  }
  if (off) off.addEventListener('click', lightsOut);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') lightsOn(); });
  // back from the next page, the set is still off; switch it back on
  addEventListener('pageshow', function (e) { if (e.persisted) root.classList.remove('is-off'); });
})();
