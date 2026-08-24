/* expand.js: "Read more" opens the write-up in place. Nothing else does.

   Every card whose entry in apps-data.js has a `long` array is rendered with a
   hidden .app-more panel and a "Read more" button (cards.js writes both).
   Pressing that button opens the panel and stretches the card across the whole
   row of its grid, so the full write-up gets the width to be readable and the
   App Store / GitHub links become big buttons instead of 0.72rem footer text.

   THE SPLIT: this used to listen on the whole card, which meant a click
   anywhere expanded it and the card's real destination was only reachable
   through the small footer link. So the two jobs are now split by target:

     - the "Read more" / "Show less" button expands and collapses
     - everywhere else on the card is the App Store (or GitHub, or the project
       link): cardlink.js stretches a real <a> over the card, so a left-click
       navigates and a right-click gets the native "Copy link address"
     - the .app-more panel sits above that overlay (components.css), so the
       write-up can be read, selected and clicked through without the card
       navigating out from under it
     - one card open at a time per grid, Escape closes

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
    var btn = card.querySelector('.app-expand');
    if (!btn) return;

    /* The button is a real <button>, so Enter and Space already fire a click:
       keyboard users get this for free and a keydown handler here would only
       toggle twice and cancel itself out.

       stopPropagation matters even though the stretched overlay is a sibling
       rather than an ancestor: the card sits inside grids and pages that watch
       for clicks of their own, and this one is not for them. */
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (card.classList.contains('is-open')) close(card); else open(card);
    });
  });

  addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    document.querySelectorAll('.is-open').forEach(function (card) {
      if (card.classList.contains('is-expandable')) close(card);
    });
  });
})();
