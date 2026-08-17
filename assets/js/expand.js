/* expand.js: click a card, it expands in place.

   Every card whose entry in apps-data.js has a `long` array is rendered with a
   hidden .app-more panel (cards.js writes it). Clicking anywhere on such a card
   opens that panel and stretches the card across the whole row of its grid, so
   the full write-up gets the width to be readable and the App Store / GitHub
   links become big buttons instead of 0.72rem footer text.

   Rules:
     - real links inside the card (App Store, GitHub, the theme pill, the award
       shots) keep their own behavior and never toggle the card
     - the high-school screenshot (.proj-media) is an <a>, but it expands too:
       the card's own link lives in the panel as a button
     - one card open at a time per grid, Escape closes
     - cardlink.js skips these cards, so there is no stretched overlay anchor
       fighting the click (see the guard there)

   Must load AFTER cards.js. */
(function expand() {
  var cards = document.querySelectorAll('.app-card.is-expandable, .proj-card.is-expandable');
  if (!cards.length) return;

  function set(card, open) {
    var panel = card.querySelector('.app-more');
    var btn = card.querySelector('.app-expand');
    if (!panel) return;
    card.classList.toggle('is-open', open);
    panel.hidden = !open;
    if (btn) {
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      var t = btn.querySelector('.app-expand-t');
      var i = btn.querySelector('i');
      if (t) t.textContent = open ? 'Show less' : 'Read more';
      if (i) i.textContent = open ? '↑' : '↓';
    }
    // tilt.js leaves an inline transform behind; an open card must sit still
    if (open) card.style.transform = '';
  }

  function close(card) { set(card, false); }

  function open(card) {
    var grid = card.parentElement;
    if (grid) {
      grid.querySelectorAll('.is-open').forEach(function (other) {
        if (other !== card) close(other);
      });
    }
    set(card, true);
    // if the card grew past the top of the window, bring it back into view
    requestAnimationFrame(function () {
      var top = card.getBoundingClientRect().top;
      if (top < 0 || top > innerHeight * 0.8) {
        card.scrollIntoView({ block: 'nearest', behavior: reduceMotion ? 'auto' : 'smooth' });
      }
    });
  }

  cards.forEach(function (card) {
    card.classList.add('is-openable');

    card.addEventListener('click', function (e) {
      if (e.target.closest('.app-shots')) return;        // gallery.js owns the proof shots
      if (e.target.closest('.app-more')) {
        // inside the panel only the buttons do anything; text is just text
        if (e.target.closest('a')) return;
        return;
      }
      var link = e.target.closest('a');
      // a real link (App Store, GitHub, theme pill) keeps its own behavior;
      // the project screenshot is the one <a> that expands instead
      if (link && !link.classList.contains('proj-media')) return;
      if (link) e.preventDefault();
      if (card.classList.contains('is-open')) close(card); else open(card);
    });

    /* The visible affordance is a real <button>, so it is focusable and
       Enter/Space already fire a click that bubbles up to the handler above:
       keyboard users get the same thing the pointer does, and handling the
       keydown here as well would toggle twice and cancel itself out. */
  });

  addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    document.querySelectorAll('.is-open').forEach(function (card) {
      if (card.classList.contains('is-expandable')) close(card);
    });
  });
})();
