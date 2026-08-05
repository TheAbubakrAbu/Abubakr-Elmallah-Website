/* fan-fnaf-ui.js: the camera panel on /franchises/five-nights-at-freddys/.

   LOAD ORDER MATTERS. This runs AFTER reveal.js, and the whole body is inside a
   try/catch. Every section on these pages starts at opacity 0 and is revealed by
   reveal.js; if a page script throws before reveal.js has run, nothing is ever
   revealed and the page renders blank. Both guards exist for that reason.

   What it does: eleven cameras you can actually switch between, each a drawn
   room. Four animatronics wander between rooms on their own timers, so a camera
   shows whoever happens to be standing in it. Switching costs power, and the
   power is the clock -- which is the entire first game in one sentence. */
(function fnafCams() {
  try {
    var camsEl = document.getElementById('fnafCams');
    var scene  = document.getElementById('fnafScene');
    if (!camsEl || !scene) return;           // not this page

    var lbl   = document.getElementById('fnafLbl');
    var burst = document.getElementById('fnafBurst');
    var pctEl = document.getElementById('fnafPct');
    var useEl = document.getElementById('fnafUsage');
    var useLb = document.getElementById('fnafUsageLbl');
    var hourEl = document.getElementById('fnafHour');
    var noteEl = document.getElementById('fnafNote');

    /* Each room is drawn once, as a background of simple shapes. `slots` are the
       floor positions an animatronic can stand in, in viewBox units. */
    var W = 320, H = 180;
    var CAMS = [
      { id: '1A', name: 'Show Stage',   art: stage,   slots: [[104, 132], [160, 132], [216, 132]] },
      { id: '1B', name: 'Dining Area',  art: dining,  slots: [[80, 140], [160, 138], [240, 140]] },
      { id: '1C', name: 'Pirate Cove',  art: cove,    slots: [[160, 136]] },
      { id: '2A', name: 'West Hall',    art: hall,    slots: [[160, 142]] },
      { id: '2B', name: 'W. Hall Corner', art: corner, slots: [[168, 140]] },
      { id: '3',  name: 'Supply Closet', art: closet, slots: [[160, 140]] },
      { id: '4A', name: 'East Hall',    art: hall,    slots: [[160, 142]] },
      { id: '4B', name: 'E. Hall Corner', art: corner, slots: [[152, 140]] },
      { id: '5',  name: 'Backstage',    art: backstage, slots: [[96, 138], [224, 138]] },
      { id: '6',  name: 'Kitchen',      art: kitchen, slots: [] },   // audio only, as in the game
      { id: '7',  name: 'Restrooms',    art: restroom, slots: [[112, 138], [208, 138]] }
    ];

    /* ── the rooms ── */
    function stage() {
      return '<path class="fs-wall" d="M0 0h320v150H0z"/>'
        + '<path class="fs-floor" d="M0 150h320v30H0z"/>'
        + '<path class="fs-curtain" d="M40 20h56l-12 118H40zM224 20h56v118h-44z"/>'
        + '<path class="fs-riser" d="M78 138h164v14H78z"/>'
        + '<path class="fs-dim" d="M108 8h104v10H108z"/>';
    }
    function dining() {
      return '<path class="fs-wall" d="M0 0h320v150H0z"/>'
        + '<path class="fs-floor" d="M0 150h320v30H0z"/>'
        + '<g class="fs-tile"><path d="M0 150h32v30H0zM64 150h32v30H64zM128 150h32v30h-32zM192 150h32v30h-32zM256 150h32v30h-32z"/></g>'
        + '<g class="fs-prop"><circle cx="70" cy="120" r="20"/><circle cx="160" cy="116" r="20"/><circle cx="250" cy="120" r="20"/></g>'
        + '<g class="fs-dim"><path d="M20 26h44v8H20zM128 20h64v8h-64zM256 26h44v8h-44z"/></g>';
    }
    function cove() {
      return '<path class="fs-wall" d="M0 0h320v150H0z"/>'
        + '<path class="fs-floor" d="M0 150h320v30H0z"/>'
        + '<path class="fs-curtain" d="M62 14h196v124H62z"/>'
        + '<path class="fs-riser" d="M62 8h196v10H62z"/>'
        + '<path class="fs-dim" d="M126 60h68v9h-68zM138 76h44v7h-44z"/>';
    }
    function hall() {
      return '<path class="fs-wall" d="M0 0h320v150H0z"/>'
        + '<path class="fs-floor" d="M0 150h320v30H0z"/>'
        + '<path class="fs-deep" d="M116 40h88v104h-88z"/>'
        + '<path class="fs-riser" d="M0 0l116 40v104L0 180zM320 0L204 40v104l116 36z"/>'
        + '<g class="fs-lamp"><rect x="140" y="28" width="40" height="7" rx="2"/></g>';
    }
    function corner() {
      return '<path class="fs-wall" d="M0 0h320v150H0z"/>'
        + '<path class="fs-floor" d="M0 150h320v30H0z"/>'
        + '<path class="fs-deep" d="M0 22h150v122H0z"/>'
        + '<path class="fs-riser" d="M150 22h170v122H150z"/>'
        + '<g class="fs-dim"><path d="M186 44h72v9h-72zM186 62h50v7h-50z"/></g>';
    }
    function closet() {
      return '<path class="fs-wall" d="M0 0h320v150H0z"/>'
        + '<path class="fs-floor" d="M0 150h320v30H0z"/>'
        + '<path class="fs-deep" d="M74 16h172v128H74z"/>'
        + '<g class="fs-prop"><path d="M92 60h44v9H92zM92 80h44v9H92zM92 100h44v9H92z"/></g>'
        + '<g class="fs-lamp"><circle cx="212" cy="34" r="7"/></g>';
    }
    function backstage() {
      return '<path class="fs-wall" d="M0 0h320v150H0z"/>'
        + '<path class="fs-floor" d="M0 150h320v30H0z"/>'
        + '<g class="fs-prop"><path d="M24 96h64v48H24zM232 96h64v48h-64z"/></g>'
        /* the shelf of spare heads, which is the whole joke of this room */
        + '<g class="fs-head"><circle cx="128" cy="60" r="15"/><circle cx="164" cy="60" r="15"/><circle cx="200" cy="60" r="15"/></g>'
        + '<path class="fs-riser" d="M110 76h108v8H110z"/>';
    }
    function kitchen() {
      return '<path class="fs-dead" d="M0 0h320v180H0z"/>'
        + '<text class="fs-oos" x="160" y="86">CAMERA DISABLED</text>'
        + '<text class="fs-oos fs-oos--sm" x="160" y="106">AUDIO ONLY</text>';
    }
    function restroom() {
      return '<path class="fs-wall" d="M0 0h320v150H0z"/>'
        + '<path class="fs-floor" d="M0 150h320v30H0z"/>'
        + '<path class="fs-deep" d="M40 20h100v124H40zM180 20h100v124H180z"/>'
        + '<g class="fs-dim"><path d="M74 46h32v9H74zM214 46h32v9h-32z"/></g>';
    }

    /* ── who is where ──
       Each one starts on stage (except Foxy in the Cove) and drifts. This is
       decorative, not a simulation: the point is that a camera you looked at a
       moment ago is not necessarily what is there now. */
    var BOTS = [
      { key: 'freddy', label: 'Freddy', at: '1A', route: ['1A', '1B', '7', '4A', '4B'], step: 0, every: 9200 },
      { key: 'bonnie', label: 'Bonnie', at: '1A', route: ['1A', '1B', '5', '3', '2A', '2B'], step: 0, every: 6100 },
      { key: 'chica',  label: 'Chica',  at: '1A', route: ['1A', '1B', '6', '4A', '4B'], step: 0, every: 7300 },
      { key: 'foxy',   label: 'Foxy',   at: '1C', route: ['1C', '1C', '2A', '2B'], step: 0, every: 11500 }
    ];

    function botsAt(id) {
      var out = [];
      for (var i = 0; i < BOTS.length; i++) if (BOTS[i].at === id) out.push(BOTS[i]);
      return out;
    }

    function botMarkup(bot, x, y) {
      var g = '<g class="fs-bot fs-bot--' + bot.key + '" transform="translate(' + x + ' ' + y + ')">';
      if (bot.key === 'bonnie') {
        g += '<ellipse cx="0" cy="-16" rx="17" ry="18"/>'
           + '<ellipse cx="-8" cy="-42" rx="5" ry="14"/><ellipse cx="8" cy="-42" rx="5" ry="14"/>';
      } else if (bot.key === 'chica') {
        g += '<ellipse cx="0" cy="-16" rx="18" ry="17"/><path d="M0-30l-7 9h14z"/>';
      } else if (bot.key === 'foxy') {
        g += '<ellipse cx="0" cy="-16" rx="16" ry="18"/><path d="M-14-32l4 12 8-8zM14-32l-4 12-8-8z"/>';
      } else {
        g += '<ellipse cx="0" cy="-16" rx="19" ry="17"/><circle cx="-16" cy="-32" r="7"/><circle cx="16" cy="-32" r="7"/>'
           + '<path d="M-11-40h22v7h-22z"/>';
      }
      g += '<rect x="-13" y="0" width="26" height="14" rx="4"/>'
         + '<g class="fs-eyes"><circle cx="-6" cy="-18" r="3"/><circle cx="6" cy="-18" r="3"/></g>'
         + '</g>';
      return g;
    }

    /* ── state ── */
    var current = 0;
    var power = 99;
    var usage = 1;
    var hour = 0;
    var HOURS = ['12 AM', '1 AM', '2 AM', '3 AM', '4 AM', '5 AM'];
    var dead = false;

    /* ── the camera buttons ── */
    var buttons = CAMS.map(function (c, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'fnaf-cam';
      b.textContent = 'CAM ' + c.id;
      b.setAttribute('aria-label', 'Camera ' + c.id + ', ' + c.name);
      b.addEventListener('click', function () { select(i, true); });
      camsEl.appendChild(b);
      return b;
    });

    function draw() {
      var c = CAMS[current];
      var inner = c.art();
      if (!dead) {
        var here = botsAt(c.id);
        for (var i = 0; i < here.length && i < c.slots.length; i++) {
          inner += botMarkup(here[i], c.slots[i][0], c.slots[i][1]);
        }
      }
      scene.innerHTML = '<svg viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' + inner + '</svg>';
      if (lbl) lbl.textContent = 'CAM ' + c.id + ' · ' + c.name.toUpperCase();
      for (var j = 0; j < buttons.length; j++) buttons[j].classList.toggle('is-on', j === current);
      if (buttons[current]) buttons[current].setAttribute('aria-current', 'true');
    }

    function flick() {
      if (!burst) return;
      burst.classList.remove('is-on');
      void burst.offsetWidth;                 // restart the animation
      burst.classList.add('is-on');
    }

    function select(i, cost) {
      if (dead || i === current) { if (i === current) flick(); return; }
      current = i;
      draw();
      flick();
      if (cost) drain(1.5);                   // switching costs, as it should
    }

    function setUsage(n) {
      usage = Math.max(1, Math.min(4, n));
      if (useLb) useLb.textContent = 'usage ' + usage;
      if (!useEl) return;
      var bars = useEl.children;
      for (var i = 0; i < bars.length; i++) bars[i].classList.toggle('is-on', i < usage);
    }

    function drain(n) {
      if (dead) return;
      power = Math.max(0, power - n);
      if (pctEl) pctEl.textContent = Math.ceil(power) + '%';
      if (pctEl) pctEl.classList.toggle('is-low', power <= 20);
      if (power <= 0) blackout();
    }

    function blackout() {
      dead = true;
      scene.innerHTML = '';
      if (lbl) lbl.textContent = 'POWER OUT';
      if (pctEl) pctEl.textContent = '0%';
      if (noteEl) noteEl.textContent = 'And that is the game. You did not lose a fight — you spent the battery, and the only thing left to do is sit in the dark and listen. Reload the page to start the night again.';
      var mon = document.getElementById('fnafFeed');
      if (mon) mon.classList.add('is-dead');
      setUsage(1);
    }

    /* ── clocks ──
       Nothing here is a real game loop; it is scenery with a cost attached.
       All three intervals stop the moment the power is gone. */
    var tick = setInterval(function () {
      if (dead) { clearInterval(tick); return; }
      drain(0.4 * usage);
    }, 1400);

    var clock = setInterval(function () {
      if (dead) { clearInterval(clock); return; }
      hour = (hour + 1) % HOURS.length;
      if (hourEl) hourEl.textContent = HOURS[hour];
    }, 21000);

    BOTS.forEach(function (bot) {
      setInterval(function () {
        if (dead) return;
        bot.step = (bot.step + 1) % bot.route.length;
        bot.at = bot.route[bot.step];
        /* If one walks into the room you are watching, redraw so it appears
           while you are looking -- much better than only ever finding them
           already in place. */
        if (CAMS[current].id === bot.at) { draw(); flick(); }
      }, bot.every);
    });

    /* ── keyboard ── */
    document.addEventListener('keydown', function (e) {
      if (dead) return;
      var t = e.target || {};
      if (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { select((current + 1) % CAMS.length, true); e.preventDefault(); }
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { select((current - 1 + CAMS.length) % CAMS.length, true); e.preventDefault(); }
    });

    setUsage(1);
    draw();
    if (pctEl) pctEl.textContent = '99%';
  } catch (err) { /* never let this take the page down with it */ }
})();
