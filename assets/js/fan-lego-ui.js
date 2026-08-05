/* fan-lego-ui.js: the stud fountain on /franchises/lego/.

   LOAD ORDER MATTERS. Runs AFTER reveal.js, whole body in a try/catch. Sections
   start at opacity 0 and are revealed by reveal.js; a script that throws before
   that runs leaves the page blank.

   Pick a stud, and that stud pours. The four values are the ones every TT Games
   title has used since 2005 and they never changed once across thirty-five
   games, which is a genuinely remarkable bit of consistency for a series that
   otherwise rebuilt itself twice.

   The fountain reuses a fixed pool of elements rather than creating and
   destroying nodes per stud. At this rate a create/remove approach churns
   hundreds of nodes a second and the garbage collector starts showing up in the
   frame time; recycling keeps the DOM at a constant size. */
(function studFountain() {
  try {
    var pick = document.getElementById('lgPick');
    var fountain = document.getElementById('lgFountain');
    if (!pick || !fountain) return;                  // not this page

    var valEl = document.getElementById('lgVal');
    var nameEl = document.getElementById('lgName');
    var noteEl = document.getElementById('lgNote');
    var totalEl = document.getElementById('lgTotal');

    /* The four studs, then the three things that are not studs. Anything with a
       `v` counts toward the total; the collectibles carry a `label` instead,
       because "how many studs is a minikit worth" is not a question the games
       have ever answered. */
    var STUDS = [
      { k: 'silver', n: 'Silver stud', v: 10, c: '#b8bcc4', c2: '#8f949c', shape: 'stud',
        note: 'The common one. You will collect hundreds of thousands of these and never think about a single one.' },
      { k: 'gold', n: 'Gold stud', v: 100, c: '#f2cd37', c2: '#c9a614', shape: 'stud',
        note: 'Ten silvers in one. What most destructible scenery actually drops once you are a few levels in.' },
      { k: 'blue', n: 'Blue stud', v: 1000, c: '#3f7fd0', c2: '#2a5ca0', shape: 'stud',
        note: 'Now it is worth stopping for. Usually tucked behind something you need a specific character to break.' },
      { k: 'purple', n: 'Purple stud', v: 10000, c: '#a05fd0', c2: '#7a3fa8', shape: 'stud',
        note: 'The big one. Ten thousand each, and the reason a single well-hidden room can finish your True Jedi bar outright.' },
      { k: 'minikit', n: 'Minikit', label: '10', unit: 'per level', c: '#9fe8f5', c2: '#4fb8d0', shape: 'kit',
        note: 'Ten hidden in every single level, and collecting all ten builds a vehicle back at the hub. Translucent, faintly glowing, and always behind something you cannot reach on your first run — which is the entire reason Free Play exists.' },
      { k: 'redbrick', n: 'Red Brick', label: '×3,840', unit: 'stacked', c: '#e0342a', c2: '#a81c18', shape: 'brick',
        note: 'The cheat bricks. One per level, usually hidden worse than the minikits, and each unlocks something you buy at the hub — invincibility, stud magnet, and the multipliers. Stack ×2, ×4, ×6, ×8 and ×10 together and everything is worth 3,840 times as much.' },
      { k: 'goldbrick', n: 'Gold Brick', label: '100%', unit: 'the real goal', c: '#f0c840', c2: '#b8912a', shape: 'brick',
        note: 'The completion currency. You get them for finishing levels, hitting True Jedi, collecting every minikit, and about nine other things — and the total is what the whole game is actually scored on.' }
    ];

    var current = 0;
    var total = 0;

    var buttons = STUDS.map(function (s, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'lg-studbtn lg-studbtn--' + s.k;
      b.style.setProperty('--c', s.c);
      b.style.setProperty('--c2', s.c2);
      b.setAttribute('aria-label', s.v ? s.n + ', worth ' + s.v.toLocaleString() : s.n);
      b.innerHTML = '<span class="lg-studbtn-top lg-shape--' + s.shape + '"></span>'
        + '<span class="lg-studbtn-v">' + (s.v ? s.v.toLocaleString() : s.label) + '</span>';
      b.addEventListener('click', function () { select(i); });
      pick.appendChild(b);
      return b;
    });

    /* Fixed pool. POOL is comfortably above what SPAWN_MS can have in flight. */
    var POOL = 26;
    var pieces = [];
    for (var i = 0; i < POOL; i++) {
      var el = document.createElement('span');
      el.className = 'lg-bit';
      fountain.appendChild(el);
      pieces.push({ el: el, busy: false });
    }

    function fire() {
      var s = STUDS[current];
      var p = null;
      for (var i = 0; i < pieces.length; i++) if (!pieces[i].busy) { p = pieces[i]; break; }
      if (!p) return;                                 // pool saturated; skip this one
      p.busy = true;

      var el = p.el;
      var drift = (Math.random() * 2 - 1) * 46;        // sideways travel, px
      var lift = 120 + Math.random() * 90;             // how high it goes
      var spin = (Math.random() * 2 - 1) * 540;
      var dur = 1100 + Math.random() * 500;

      el.className = 'lg-bit lg-shape--' + s.shape;
      el.style.setProperty('--c', s.c);
      el.style.setProperty('--c2', s.c2);
      el.style.setProperty('--dx', drift.toFixed(1) + 'px');
      el.style.setProperty('--lift', lift.toFixed(1) + 'px');
      el.style.setProperty('--spin', spin.toFixed(0) + 'deg');
      el.style.setProperty('--dur', dur.toFixed(0) + 'ms');
      el.style.left = (46 + Math.random() * 8) + '%';

      /* Restart the animation on a recycled node: clear it, force layout, re-add. */
      el.classList.remove('is-up');
      void el.offsetWidth;
      el.classList.add('is-up');

      /* Only studs have a stud value, so only studs move the counter. */
      if (s.v) {
        total += s.v;
        if (totalEl) totalEl.textContent = total.toLocaleString();
      }

      setTimeout(function () { p.busy = false; el.classList.remove('is-up'); }, dur);
    }

    function select(i) {
      current = i;
      var s = STUDS[i];
      for (var j = 0; j < buttons.length; j++) buttons[j].classList.toggle('is-on', j === i);
      if (valEl) valEl.textContent = s.v ? s.v.toLocaleString() : s.label;
      if (nameEl) nameEl.textContent = s.v ? s.n : s.n + ' · ' + s.unit;
      if (noteEl) noteEl.textContent = s.note;
      fountain.style.setProperty('--glow', s.c);
      /* A burst on switch, so changing stud has an immediate result rather than
         waiting for the next tick of the loop. */
      for (var b = 0; b < 6; b++) setTimeout(fire, b * 70);
    }

    var SPAWN_MS = 190;
    setInterval(fire, SPAWN_MS);

    select(0);
  } catch (err) { /* never take the page down with it */ }
})();
