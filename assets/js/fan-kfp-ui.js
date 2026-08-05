/* fan-kfp-ui.js: opening the Dragon Scroll, on /franchises/kung-fu-panda/.

   LOAD ORDER MATTERS. Runs AFTER reveal.js, whole body in a try/catch. Sections
   start at opacity 0 and are revealed by reveal.js; a script that throws before
   that runs leaves the page blank.

   The scroll starts rolled shut. You open it, and there is nothing inside --
   which is the answer, and the joke, and the point of the first film. Making the
   visitor do the opening themselves is the whole reason this is interactive: the
   line lands differently when you were the one expecting something. */
(function dragonScroll() {
  try {
    var btn = document.getElementById('kfpOpen');
    var rollers = document.getElementById('kfpRollers');
    if (!btn || !rollers) return;                 // not this page

    var line = document.getElementById('kfpLine');
    var sub  = document.getElementById('kfpSub');
    var cap  = document.getElementById('kfpCap');

    /* Shut to begin with. Done from JS rather than in the markup so that with
       JS off the scroll simply renders open and readable, instead of being a
       sliver nobody can do anything about. */
    rollers.classList.add('is-shut');
    if (cap) cap.textContent = 'Nobody has read it in a thousand years.';

    var opened = false;

    btn.addEventListener('click', function () {
      if (opened) {
        /* Roll it back up, so it can be opened again. */
        opened = false;
        rollers.classList.remove('is-open');
        rollers.classList.add('is-shut');
        btn.textContent = 'Open the Dragon Scroll';
        if (cap) cap.textContent = 'Nobody has read it in a thousand years.';
        return;
      }
      opened = true;
      rollers.classList.remove('is-shut');
      rollers.classList.add('is-open');
      btn.textContent = 'Roll it back up';
      if (line) line.textContent = 'There is no secret ingredient.';
      if (sub) sub.textContent = 'The Dragon Scroll · opened at last';
      if (cap) cap.textContent = 'Oogway hid nothing in it. That is the answer, and the film earns it.';
    });
  } catch (err) { /* never take the page down with it */ }
})();
