/* fan-percy-ui.js: the claiming, on /worlds/percy-jackson/.

   LOAD ORDER MATTERS. This runs AFTER reveal.js, and the whole body sits inside
   a try/catch. Sections on these pages start at opacity 0 and are revealed by
   reveal.js; a page script that throws before that runs leaves the page blank.

   In the books a demigod is claimed when their parent burns a symbol into the
   air over their head, in front of the whole camp. This does that: you step up,
   the fire goes quiet, and somebody finally admits you exist.

   The weights matter. Hermes is common because the cabin takes in everybody who
   has not been claimed; the Big Three are rare because of the pact they made not
   to have any more children. Getting Poseidon should feel like it did in book
   one -- unlikely, and slightly alarming. */
(function claiming() {
  try {
    var go = document.getElementById('pjGo');
    var sigil = document.getElementById('pjSigil');
    if (!go || !sigil) return;                 // not this page

    var stage = document.getElementById('pjStage');
    var say   = document.getElementById('pjSay');
    var out   = document.getElementById('pjOut');
    var cabin = document.getElementById('pjCabin');
    var godEl = document.getElementById('pjGod');
    var domEl = document.getElementById('pjDom');
    var note  = document.getElementById('pjNote');
    var tally = document.getElementById('pjTally');

    /* w = relative weight, not a percentage. */
    var GODS = [
      { n: 'Poseidon', c: 3,  w: 1,  col: '#4f9fd0', dom: 'The sea, earthquakes, horses',
        note: 'Cabin three has been empty for decades. The Big Three swore an oath not to have any more children, and this is what a broken oath looks like.',
        sig: 'M12 2v20M6 6c0 7 2 11 6 12 4-1 6-5 6-12M4 4h3v4H4zM17 4h3v4h-3zM10.5 4h3v4h-3z' },
      { n: 'Zeus', c: 1,  w: 1,  col: '#e8dc7a', dom: 'The sky, thunder, kingship',
        note: 'The eldest brother, who keeps the pact, breaks it, and then blames everybody else for the consequences.',
        sig: 'M13 2L4 13h5l-2 9 11-13h-6l3-7z' },
      { n: 'Hades', c: 13, w: 1,  col: '#8f6fd0', dom: 'The underworld, wealth, the dead',
        note: 'There was no cabin thirteen until book five, because nobody wanted to admit he had children. He is written as the villain and turns out to be the one everybody wronged.',
        sig: 'M12 3a7 7 0 0 0-7 7v5h3v4h8v-4h3v-5a7 7 0 0 0-7-7zM9 10h2v3H9zm4 0h2v3h-2z' },
      { n: 'Athena', c: 6,  w: 4,  col: '#c9c0a0', dom: 'Wisdom, strategy, crafts',
        note: 'Annabeth’s mother. Her children are born from thought rather than birth, and the books hand you that detail without stopping to explain it.',
        sig: 'M12 3a8 8 0 0 0-8 8c0 5 4 9 8 10 4-1 8-5 8-10a8 8 0 0 0-8-8zm-3 7a2 2 0 1 1 0 .1zm6 0a2 2 0 1 1 0 .1zM12 14l-2 3h4z' },
      { n: 'Hermes', c: 11, w: 7,  col: '#8fb0a0', dom: 'Travellers, thieves, messages',
        note: 'The cabin that takes in every unclaimed demigod, which is why it is always full and always crowded. Most people end up here because nobody came for them.',
        sig: 'M12 2v20M12 6c-3 0-5 2-5 4s2 4 5 4 5-2 5-4M7 4l5 3 5-3' },
      { n: 'Apollo', c: 7,  w: 4,  col: '#f0c840', dom: 'The sun, music, prophecy, archery',
        note: 'Also the god who gets made mortal and has to earn it back across five books of The Trials of Apollo, which is funnier and sadder than it sounds.',
        sig: 'M12 5a7 7 0 1 1 0 14 7 7 0 0 1 0-14zM12 1v2M12 21v2M3 12H1M23 12h-2M5 5L3.5 3.5M19 19l1.5 1.5M19 5l1.5-1.5M5 19l-1.5 1.5' },
      { n: 'Ares', c: 5,  w: 4,  col: '#c04a3a', dom: 'War, courage, the fight itself',
        note: 'Clarisse La Rue is in this cabin, and she is written far better than the bully she starts out as.',
        sig: 'M14 3l7 7-3 3-2-2-6 6 2 2-3 3-7-7 3-3 2 2 6-6-2-2z' },
      { n: 'Demeter', c: 4,  w: 3,  col: '#7fbf5f', dom: 'The harvest, growing things',
        note: 'Persephone’s mother, and half the reason the seasons exist at all in this mythology.',
        sig: 'M12 21V7M12 11c-3-1-4-4-4-7 3 0 5 2 6 5M12 11c3-1 4-4 4-7-3 0-5 2-6 5M12 16c-2-1-3-2-4-4M12 16c2-1 3-2 4-4' },
      { n: 'Hephaestus', c: 9, w: 3, col: '#c07a4f', dom: 'The forge, fire, making things',
        note: 'Leo Valdez is in this cabin in the second series, and he is the best thing in it.',
        sig: 'M4 14h16v3H4zM8 17h8v4H8zM9 3h6l1 8H8z' },
      { n: 'Aphrodite', c: 10, w: 3, col: '#e07f9f', dom: 'Love, beauty, and every complication',
        note: 'Piper McLean turns this cabin from a joke into something with teeth in The Heroes of Olympus.',
        sig: 'M12 21s-8-5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 6-8 11-8 11z' },
      { n: 'Dionysus', c: 12, w: 2, col: '#8f6fd0', dom: 'Wine gods aside: madness, theatre, and being bored',
        note: 'Mr D runs the camp as a punishment and does not pretend otherwise. He never gets anybody’s name right, and it is deliberate.',
        sig: 'M12 3v4M9 7h6l1 4a4 4 0 0 1-8 0zM8 15h8M10 15v6M14 15v6' },
      { n: 'Hecate', c: 20, w: 2, col: '#6fd0c0', dom: 'Magic, crossroads, the Mist',
        note: 'She controls the Mist, which is the reason mortals never notice any of this happening.',
        sig: 'M4 12a8 8 0 0 1 8-8v16a8 8 0 0 1-8-8zM12 4a8 8 0 0 1 0 16M6 12h2M16 12h2' },
      { n: 'Nike', c: 17, w: 2, col: '#d8b45f', dom: 'Victory, and only victory',
        note: 'One of the minor gods whose cabins only exist because Percy made the Olympians build them.',
        sig: 'M12 21V9M12 9L4 4c0 6 3 9 8 10M12 9l8-5c0 6-3 9-8 10M8 21h8' },
      { n: 'Iris', c: 14, w: 2, col: '#5fd0a0', dom: 'The rainbow, and messages across it',
        note: 'Iris-messaging is how anybody in these books contacts anybody else. A drachma and a rainbow.',
        sig: 'M3 18a9 9 0 0 1 18 0M6 18a6 6 0 0 1 12 0M9 18a3 3 0 0 1 6 0' },
      { n: 'Hypnos', c: 15, w: 2, col: '#8fa8c0', dom: 'Sleep, and not being awake for any of this',
        note: 'The cabin nobody in it has ever been on time for anything.',
        sig: 'M14 3a8 8 0 1 0 7 11 7 7 0 0 1-7-11z' }
    ];

    var counts = {};
    var busy = false;

    var pool = [];
    GODS.forEach(function (g) { for (var i = 0; i < g.w; i++) pool.push(g); });

    function pick() { return pool[Math.floor(Math.random() * pool.length)]; }

    var WAIT = [
      'The fire goes green, then white.',
      'Somebody near the back stops talking.',
      'Chiron turns round.',
      'The whole pavilion goes quiet.',
      'Every head at every table turns.'
    ];

    function claim() {
      if (busy) return;
      busy = true;
      go.disabled = true;
      if (out) out.hidden = true;
      if (note) note.textContent = '';
      sigil.className = 'pj-sigil';
      sigil.innerHTML = '';
      if (stage) stage.classList.remove('is-claimed');

      var g = pick();
      var lines = WAIT.slice();
      var step = 0;

      var tick = setInterval(function () {
        if (say) say.textContent = lines[step];
        step++;
        if (step >= lines.length) {
          clearInterval(tick);
          reveal(g);
        }
      }, 620);
    }

    function reveal(g) {
      sigil.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="' + g.sig + '"/></svg>';
      sigil.style.setProperty('--g', g.col);
      sigil.classList.add('is-on');
      if (stage) stage.classList.add('is-claimed');
      if (stage) stage.style.setProperty('--g', g.col);

      if (say) say.textContent = 'Hail, child of ' + g.n + '.';
      if (cabin) cabin.textContent = 'Cabin ' + g.c;
      if (godEl) { godEl.textContent = g.n; godEl.style.color = g.col; }
      if (domEl) domEl.textContent = g.dom;
      if (note) note.textContent = g.note;
      if (out) out.hidden = false;

      counts[g.n] = (counts[g.n] || 0) + 1;
      var total = 0, parts = [];
      for (var k in counts) if (counts.hasOwnProperty(k)) total += counts[k];
      if (total > 1 && tally) {
        for (var k2 in counts) if (counts.hasOwnProperty(k2)) parts.push(k2 + ' ×' + counts[k2]);
        tally.textContent = total + ' claimings: ' + parts.join(' · ');
      }

      go.disabled = false;
      go.textContent = 'Step forward again';
      busy = false;
    }

    go.addEventListener('click', claim);
  } catch (err) { /* never take the page down with it */ }
})();
