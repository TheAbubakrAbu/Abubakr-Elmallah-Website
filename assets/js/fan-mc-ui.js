/* fan-mc-ui.js: the hotbar on /worlds/minecraft/.

   Pick a tier and three things change together: the pickaxe and the sword in
   the hero drawing take that material's colours, and the matching ore in the
   background strata flares up. Number keys 1-7 select, exactly as they do in
   the game. Everything visual is CSS; this only sets a class, two custom
   properties and a data attribute.

   Loads after fanpage.js. */
(function mcHotbar() {
  var bar = document.querySelector('.mc-bar');
  if (!bar) return;

  var slots  = Array.prototype.slice.call(bar.querySelectorAll('.mc-slot[data-tier]'));
  var art    = document.querySelector('.fan-art--mc');
  var label  = document.getElementById('mcTier');
  var sword  = document.querySelector('.mc-sword');
  if (!slots.length) return;

  // which background ore each tier lights up; wood and stone have none
  var ORE = { copper: 'copper', iron: 'iron', gold: 'gold', diamond: 'diamond' };

  var swingTimer = 0;

  function select(slot) {
    if (!slot) return;
    slots.forEach(function (s) {
      var on = s === slot;
      s.classList.toggle('is-sel', on);
      s.setAttribute('aria-pressed', on ? 'true' : 'false');
    });

    if (art) {
      art.style.setProperty('--tool',  slot.dataset.tool);
      art.style.setProperty('--tool2', slot.dataset.tool2);
    }
    if (label) label.textContent = slot.querySelector('.mc-slot-name').textContent;

    var ore = ORE[slot.dataset.tier];
    if (ore) document.body.dataset.ore = ore;
    else delete document.body.dataset.ore;

    // swing the sword on every change
    if (sword && !reduceMotion) {
      sword.classList.remove('is-swinging');
      void sword.offsetWidth;
      sword.classList.add('is-swinging');
      clearTimeout(swingTimer);
      swingTimer = setTimeout(function () { sword.classList.remove('is-swinging'); }, 620);
    }
  }

  bar.addEventListener('click', function (e) {
    select(e.target.closest('.mc-slot[data-tier]'));
  });

  // 1-7 pick a slot, the way the game does
  addEventListener('keydown', function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    var t = e.target;
    if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
    var n = parseInt(e.key, 10);
    if (n >= 1 && n <= slots.length) { select(slots[n - 1]); e.preventDefault(); }
  });

  // start on whatever the markup marked selected
  select(bar.querySelector('.mc-slot.is-sel') || slots[0]);
})();
