/* fan-hp-ui.js: the two interactive bits of /franchises/harry-potter/.

   1. The Sorting Hat. Press it and it mutters its way through a few lines
      before shouting a house, then lights up that crest in the grid above and
      keeps a tally of what it has said. It is weighted by nothing at all: the
      Hat takes your choice into account, but only if you argue with it.

   2. Castable spells. Clicking a tile in #spells throws sparks in that spell's
      own colour. Lumos actually lights the page up, and only Nox puts it out
      again, which is the whole joke.

   Loads AFTER fanpage.js (the spell tiles do not exist until it has run). */
(function hpSorting() {
  var btn = document.getElementById('hatGo');
  var say = document.getElementById('hatSay');
  var hat = document.getElementById('hat');
  if (!btn || !say || !hat) return;

  var HOUSES = [
    { name: 'GRYFFINDOR', hl: '#e8524a', line: 'Plenty of courage, I see. Not a bad mind either. There’s talent, oh yes.' },
    { name: 'RAVENCLAW',  hl: '#7b9be0', line: 'A ready mind, and it never stops. You’ll do well where the door asks questions.' },
    { name: 'HUFFLEPUFF', hl: '#f5c94f', line: 'Loyal, and you work. The Hat has never once thought that a lesser thing.' },
    { name: 'SLYTHERIN',  hl: '#4cc47f', line: 'A thirst to prove yourself. There’s greatness in you, and Slytherin will help you on the way.' },
  ];

  var MUTTER = [
    'Hmm. Difficult. Very difficult.',
    'Where to put you…',
    'Not Slytherin, eh? Are you sure?',
    'Plenty of courage, I see…',
    'A thirst to prove yourself…',
    'There’s a good mind in here. Oh yes.',
    'You could be great, you know. It’s all here in your head.',
    'Not a bad mind. Not a bad mind at all.',
  ];

  var crests = Array.prototype.slice.call(document.querySelectorAll('.crest'));
  var tally = document.getElementById('hatTally');
  var counts = { GRYFFINDOR: 0, RAVENCLAW: 0, HUFFLEPUFF: 0, SLYTHERIN: 0 };
  var busy = false;
  var timers = [];

  function clearTimers() { timers.forEach(clearTimeout); timers = []; }
  function later(fn, ms) { timers.push(setTimeout(fn, ms)); }

  function pick(list) { return list[Math.floor(Math.random() * list.length)]; }

  function paintTally() {
    if (!tally) return;
    var total = Object.keys(counts).reduce(function (n, k) { return n + counts[k]; }, 0);
    if (!total) { tally.textContent = ''; return; }
    tally.textContent = HOUSES
      .filter(function (h) { return counts[h.name]; })
      .map(function (h) { return h.name.charAt(0) + h.name.slice(1).toLowerCase() + ' ' + counts[h.name]; })
      .join('  ·  ');
  }

  function announce(house) {
    // the Hat is random, but the site has a house and is not shy about it
    say.textContent = house.name + '!' + (house.name === 'RAVENCLAW' ? ' Correct.' : '');
    say.className = 'hat-say is-shout';
    say.style.setProperty('--hl', house.hl);
    hat.classList.remove('is-thinking');
    hat.classList.add('is-shouting');
    document.body.dataset.house = house.name.toLowerCase();

    crests.forEach(function (c) {
      var h4 = c.querySelector('h4');
      var match = h4 && h4.textContent.trim().toUpperCase() === house.name;
      c.classList.toggle('is-sorted', !!match);
    });

    counts[house.name]++;
    paintTally();
    btn.disabled = false;
    btn.textContent = 'Try me on again';
    busy = false;
    later(function () { hat.classList.remove('is-shouting'); }, 900);
  }

  function sort() {
    if (busy) return;
    busy = true;
    clearTimers();
    btn.disabled = true;
    btn.textContent = 'Thinking…';
    crests.forEach(function (c) { c.classList.remove('is-sorted'); });
    hat.classList.add('is-thinking');
    say.className = 'hat-say is-muttering';
    say.style.removeProperty('--hl');

    var house = pick(HOUSES);
    // two random mutters, then the house's own line, then the shout
    var script = [pick(MUTTER), pick(MUTTER), house.line];
    var t = 0;
    script.forEach(function (line, i) {
      t += i === 0 ? 260 : 1350;
      later(function () { say.textContent = line; }, t);
    });
    later(function () { announce(house); }, t + 1400);
  }

  btn.addEventListener('click', sort);
})();

/* ── castable spells ── */
(function hpSpells() {
  var rack = document.getElementById('spells');
  if (!rack) return;

  var LIGHT_MS = 6000;
  var lumos = 0;

  function sparks(tile, colour) {
    if (reduceMotion) return;
    var burst = document.createElement('span');
    burst.className = 'spell-burst';
    for (var i = 0; i < 10; i++) {
      var s = document.createElement('i');
      var ang = (Math.PI * 2 * i) / 10 + Math.random() * 0.5;
      var dist = 26 + Math.random() * 40;
      s.style.setProperty('--dx', (Math.cos(ang) * dist).toFixed(1) + 'px');
      s.style.setProperty('--dy', (Math.sin(ang) * dist).toFixed(1) + 'px');
      s.style.setProperty('--d', (Math.random() * 120).toFixed(0) + 'ms');
      burst.appendChild(s);
    }
    burst.style.setProperty('--c', colour || '#f6e8a8');
    tile.appendChild(burst);
    setTimeout(function () { burst.remove(); }, 900);
  }

  rack.addEventListener('click', function (e) {
    var tile = e.target.closest('.fan-tile');
    if (!tile) return;

    var name = (tile.querySelector('b') || {}).textContent || '';
    var colour = tile.style.getPropertyValue('--a').trim();

    tile.classList.remove('is-cast');
    void tile.offsetWidth;                 // restart the flash
    tile.classList.add('is-cast');
    setTimeout(function () { tile.classList.remove('is-cast'); }, 700);
    sparks(tile, colour);

    if (name === 'Lumos') {
      document.body.classList.add('is-lumos');
      clearTimeout(lumos);
      // it burns out on its own eventually, but Nox is the proper way
      lumos = setTimeout(function () { document.body.classList.remove('is-lumos'); }, LIGHT_MS);
    } else if (name === 'Nox') {
      clearTimeout(lumos);
      document.body.classList.remove('is-lumos');
    }
  });
})();
