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

  /* the card's title as words: textContent drops a <br>, which ran titles
     like 'Datapad ·<br>Aurebesh Translator' together ("·Aurebesh") */
  var titleOf = function (card) {
    var h = card.querySelector('h3');
    if (!h) return '';
    var c = h.cloneNode(true);
    c.querySelectorAll('br').forEach(function (b) { b.replaceWith(' '); });
    return c.textContent.replace(/\s+/g, ' ').trim();
  };

  /* A card has two of these buttons: the "Read more" above the panel, and a
     "Show less" at the end of it (cards.js), so a long write-up can be folded
     from where the reader finished it. Both carry the same state.

     The arrow turns rather than being swapped for another glyph (the turn is
     components.css), and each button is named after its card: five buttons
     all called "Read more" told a screen reader nothing about which was which. */
  function set(card, open) {
    var panel = card.querySelector('.app-more');
    if (!panel) return;
    /* Closing hides the panel. If focus is inside it (the "Show less" at its
       end, a link in the write-up), it would drop to <body>, so hand it back
       to the card's own toggle first. */
    if (!open && panel.contains(document.activeElement)) {
      var top = card.querySelector('.app-expand:not(.app-expand--end)');
      if (top) top.focus({ preventScroll: true });
    }
    card.classList.toggle('is-open', open);
    panel.hidden = !open;
    var title = titleOf(card);
    card.querySelectorAll('.app-expand').forEach(function (btn) {
      var label = open ? 'Show less' : 'Read more';
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (title) btn.setAttribute('aria-label', label + ' about ' + title);
      var t = btn.querySelector('.app-expand-t');
      if (t) t.textContent = label;
    });
    // tilt.js leaves an inline transform behind; an open card must sit still
    if (open) card.style.transform = '';
  }

  function close(card) { set(card, false); }

  /* Opening moves things: the card jumps to a full row of its own and the
     cards after it reflow. Done in one frame, the button that was just pressed
     could land half a screen away (a right-hand card drops below its
     neighbour). So every card in the grid glides from where it was to where
     it ends up (FLIP, on `translate`, which tilt.js and the open state's
     `transform: none` leave alone). */
  function flip(card, change, ms) {
    var grid = card.parentElement;
    if (reduceMotion || !grid || !grid.animate) { change(); return; }
    var kids = Array.prototype.slice.call(grid.children);
    var first = kids.map(function (k) { return k.getBoundingClientRect(); });
    change();
    kids.forEach(function (k, i) {
      var b = k.getBoundingClientRect();
      var dx = first[i].left - b.left, dy = first[i].top - b.top;
      if (Math.abs(dx) + Math.abs(dy) <= 1) return;
      /* A card moving most of a screen or more only flashes past for a frame,
         and one not yet revealed has nothing to show: those just land. */
      if (Math.abs(dy) > innerHeight * 0.75 || !k.classList.contains('in')) return;
      /* The pressed card changing column would slide, see-through, across its
         neighbour: it fades up in its new place instead. */
      if (k === card && Math.abs(dx) > 1) {
        k.animate([{ opacity: 0, translate: '0 10px' }, { opacity: 1, translate: '0 0' }],
          { duration: 260, easing: 'cubic-bezier(.16,1,.3,1)' });
        return;
      }
      k.animate([{ translate: dx + 'px ' + dy + 'px' }, { translate: '0 0' }],
        { duration: ms, easing: 'cubic-bezier(.16,1,.3,1)' });
    });
  }

  function open(card) {
    var grid = card.parentElement;
    if (grid) {
      grid.querySelectorAll('.is-open').forEach(function (other) {
        if (other !== card) close(other);
      });
    }
    set(card, true);
    /* Where the button landed: if it is above the window or low in it (the
       write-up would start below the fold), bring the card's top into view.
       It used to look at the card's top alone, so a card that moved down the
       page but still started on screen left its button and its whole
       write-up out of sight. */
    var btn = card.querySelector('.app-expand');
    var b = btn && btn.getBoundingClientRect();
    if (b && (b.top < 0 || b.bottom > innerHeight * 0.6)) scrollToCard(card);
  }

  /* Scroll so the card's top sits at its scroll margin. Called from inside
     flip()'s change, so the position read is where the card now is in the
     layout: once the glide starts the card is drawn at its OLD place, and
     scrollIntoView() aims at that drawn box and stops hundreds of px short. */
  function scrollToCard(card) {
    // the card's own scroll margin plus the page's top clearance (base.css)
    var margin = (parseFloat(getComputedStyle(card).scrollMarginTop) || 0)
      + (parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0);
    var y = scrollY + card.getBoundingClientRect().top - margin;
    requestAnimationFrame(function () {
      window.scrollTo({ top: y, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }

  /* Closing takes the write-up out from under the reader. Rather than leave
     them wherever the page now lands (thousands of px past the card, focus on
     a toggle hidden under the top bar) or rewind a long smooth scroll through
     other sections, the card's toggle is put exactly where the pressed button
     was on screen: the card folds up around the reader. Instant, not smooth,
     so nothing seems to move but the card. */
  function keep(card, y) {
    var t = card.querySelector('.app-expand:not(.app-expand--end)');
    if (!t) return;
    var dy = t.getBoundingClientRect().top - y;
    if (Math.abs(dy) < 1) return;
    jump(dy);
  }
  function jump(dy) {
    var h = document.documentElement, smooth = h.classList.contains('smooth');
    h.classList.remove('smooth');
    window.scrollBy(0, dy);
    if (smooth) h.classList.add('smooth');
  }

  var n = 0;
  cards.forEach(function (card) {
    /* The panel gets an id and both buttons point at it, so assistive tech
       knows which region a toggle opens. Numbered here rather than from the
       card's id: a card can appear twice on a page. */
    var panel = card.querySelector('.app-more');
    if (panel && !panel.id) panel.id = 'app-more-' + (++n);
    set(card, false);

    /* The buttons are real <button>s, so Enter and Space already fire a click:
       keyboard users get this for free and a keydown handler here would only
       toggle twice and cancel itself out.

       stopPropagation matters even though the stretched overlay is a sibling
       rather than an ancestor: the card sits inside grids and pages that watch
       for clicks of their own, and this one is not for them. */
    card.querySelectorAll('.app-expand').forEach(function (btn) {
      if (panel) btn.setAttribute('aria-controls', panel.id);
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (!card.classList.contains('is-open')) { flip(card, function () { open(card); }, 320); return; }
        var y = btn.getBoundingClientRect().top;
        flip(card, function () { close(card); keep(card, y); }, 240);
      });
    });
  });

  /* Escape closes an open card, unless the lightbox or a photo deck is up:
     then the Escape is theirs (gallery.js, years.js, travels.js), and one
     press used to close both. Whichever script's listener runs first, one of
     the two checks catches it: the overlay is still open, or its script has
     already marked the key handled. */
  addEventListener('keydown', function (e) {
    if (e.key !== 'Escape' || e.defaultPrevented || document.querySelector('#lightbox.open, .yg-deck.open')) return;
    document.querySelectorAll('.is-expandable.is-open').forEach(function (card) {
      close(card);
      // a keyboard close: if the card folded away out of view, bring it back, instantly
      var r = card.getBoundingClientRect();
      if (r.bottom < 80 || r.top > innerHeight) {
        var pad = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
        jump(r.top - pad - (parseFloat(getComputedStyle(card).scrollMarginTop) || 0));
      }
    });
  });
})();
