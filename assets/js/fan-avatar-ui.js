/* fan-avatar-ui.js: the bioluminescent forest floor on /worlds/avatar/.

   LOAD ORDER MATTERS. Runs AFTER reveal.js, whole body in a try/catch. Sections
   start at opacity 0 and are revealed by reveal.js; a page script that throws
   before that runs leaves the page blank.

   The effect: plants light where the pointer passes and fade behind it, the way
   the ground answers Jake's footsteps. Two details make it read right --

     1. The light LINGERS. Lighting on hover and dropping instantly looks like a
        hover state; holding for a beat and fading looks like something reacting.
     2. It breathes on its own when nobody is there. A dead panel reads as
        broken, so an idle drift wakes a plant here and there until you touch it.

   Positions are seeded from a fixed integer hash rather than Math.random, so the
   layout is the same on every visit and does not reshuffle on a re-render. */
(function forestFloor() {
  try {
    var floor = document.getElementById('avFloor');
    if (!floor) return;                            // not this page

    var hint = document.getElementById('avHint');
    var COUNT = 54;
    var RADIUS = 17;                               // % of the panel's width

    /* Deterministic pseudo-random in [0,1). Same seed, same forest, always. */
    function rnd(i, salt) {
      var x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
      return x - Math.floor(x);
    }

    var KIND = ['spiral', 'frond', 'pod'];
    var plants = [];
    var html = '';
    for (var i = 0; i < COUNT; i++) {
      var x = 3 + rnd(i, 1) * 94;
      var y = 8 + rnd(i, 2) * 84;
      var k = KIND[Math.floor(rnd(i, 3) * KIND.length)];
      var sc = 0.6 + rnd(i, 4) * 0.9;
      var hue = 168 + Math.floor(rnd(i, 5) * 62);   // teal through to violet-blue
      html += '<span class="av-plant av-plant--' + k + '"'
        + ' style="left:' + x.toFixed(2) + '%;top:' + y.toFixed(2) + '%;'
        + '--s:' + sc.toFixed(2) + ';--h:' + hue + '">' + shape(k) + '</span>';
      plants.push({ x: x, y: y, el: null, until: 0 });
    }
    floor.innerHTML = html;

    var nodes = floor.getElementsByClassName('av-plant');
    for (var j = 0; j < plants.length; j++) plants[j].el = nodes[j];

    function shape(k) {
      if (k === 'spiral') {
        return '<svg viewBox="0 0 24 24" aria-hidden="true">'
          + '<path d="M12 22V13M12 13a5 5 0 1 1 5-5 3 3 0 1 1-3 3"/></svg>';
      }
      if (k === 'frond') {
        return '<svg viewBox="0 0 24 24" aria-hidden="true">'
          + '<path d="M12 22V4M12 8l-5-3M12 8l5-3M12 13l-6-3M12 13l6-3M12 18l-4-2M12 18l4-2"/></svg>';
      }
      return '<svg viewBox="0 0 24 24" aria-hidden="true">'
        + '<path d="M12 22v-6"/><ellipse cx="12" cy="10" rx="5" ry="6"/><path d="M12 4v2"/></svg>';
    }

    var touched = false;

    function wake(idx, hold) {
      var p = plants[idx];
      if (!p || !p.el) return;
      p.until = Date.now() + hold;
      p.el.classList.add('is-lit');
    }

    /* One timer for the whole panel rather than a timeout per plant -- with
       fifty-odd of them, per-plant timers pile up fast under a moving pointer. */
    setInterval(function () {
      var now = Date.now();
      for (var i = 0; i < plants.length; i++) {
        if (plants[i].until && now > plants[i].until) {
          plants[i].until = 0;
          if (plants[i].el) plants[i].el.classList.remove('is-lit');
        }
      }
    }, 120);

    function at(clientX, clientY) {
      var r = floor.getBoundingClientRect();
      if (!r.width || !r.height) return;
      var px = ((clientX - r.left) / r.width) * 100;
      var py = ((clientY - r.top) / r.height) * 100;
      floor.style.setProperty('--x', px.toFixed(2) + '%');
      floor.style.setProperty('--y', py.toFixed(2) + '%');
      var ratio = r.height ? r.width / r.height : 1;
      for (var i = 0; i < plants.length; i++) {
        var dx = plants[i].x - px;
        var dy = (plants[i].y - py) / ratio;       // circular in pixels, not in %
        if (dx * dx + dy * dy < RADIUS * RADIUS) wake(i, 900);
      }
      if (!touched) {
        touched = true;
        floor.classList.add('is-awake');
        if (hint) hint.textContent = 'There you are.';
      }
    }

    floor.addEventListener('pointermove', function (e) { at(e.clientX, e.clientY); });
    floor.addEventListener('pointerdown', function (e) { at(e.clientX, e.clientY); });
    floor.addEventListener('pointerleave', function () {
      floor.classList.remove('is-awake');
      if (hint) hint.textContent = 'Gone quiet again.';
    });

    /* Ambient drift, so the panel is alive before anybody touches it. */
    var seed = 0;
    setInterval(function () {
      if (floor.classList.contains('is-awake')) return;
      seed++;
      wake(Math.floor(rnd(seed, 7) * plants.length), 1700);
      wake(Math.floor(rnd(seed, 9) * plants.length), 1700);
    }, 900);
  } catch (err) { /* never take the page down with it */ }
})();
