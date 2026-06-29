/* cardlink.js — make a whole card act like a link to its primary destination.
   A transparent stretched <a> overlay covers the card, so a left-click anywhere
   navigates AND a right-click anywhere offers the browser's native
   "Copy link address" — just like clicking the real link. Inner links
   (GitHub, App Store, image popups, category tags) sit above the overlay and
   keep their own behavior. */
(function cardLinks() {
  document.querySelectorAll('.app-card, .proj-card').forEach(card => {
    // primary destination: the project media link, else the first footer link (App Store, etc.)
    const primary = card.querySelector('.proj-media, .app-links a');
    if (!primary || !primary.href) return;

    card.classList.add('is-clickable');

    // a real anchor stretched over the whole card — gives native navigation
    // and the native right-click "Copy link address" menu item
    const overlay = document.createElement('a');
    overlay.className = 'card-link-overlay';
    overlay.href = primary.href;
    overlay.setAttribute('aria-hidden', 'true');
    overlay.tabIndex = -1;
    if (primary.target) overlay.target = primary.target;
    if (primary.rel) overlay.rel = primary.rel;
    card.appendChild(overlay);
  });
})();
