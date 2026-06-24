/* cardlink.js — make a whole card clickable to its primary link,
   while keeping inner links (GitHub, image popups, category tags) working. */
(function cardLinks() {
  document.querySelectorAll('.app-card, .proj-card').forEach(card => {
    // primary destination: the project media link, else the first footer link (App Store, etc.)
    const primary = card.querySelector('.proj-media, .app-links a');
    if (!primary || !primary.href) return;

    card.classList.add('is-clickable');

    card.addEventListener('click', e => {
      // let real links / buttons behave normally
      if (e.target.closest('a, button')) return;
      // don't navigate if the user is selecting text
      if (window.getSelection && String(window.getSelection())) return;

      if (primary.target === '_blank') window.open(primary.href, '_blank', 'noopener');
      else window.location.href = primary.href;
    });
  });
})();
