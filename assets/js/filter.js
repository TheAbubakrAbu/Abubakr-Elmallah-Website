/* filter.js — theme filter chips for the Apple Apps grid */
(function filters() {
  const chips = [...document.querySelectorAll('.filters .chip')];
  const grid = document.getElementById('appsGrid');
  if (!chips.length || !grid) return;
  const cards = [...grid.querySelectorAll('.app-card')];

  function apply(filter) {
    cards.forEach(card => {
      const show = filter === 'all' || card.dataset.cat === filter;
      card.classList.toggle('is-hidden', !show);
    });
  }

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => { c.classList.remove('is-active'); c.setAttribute('aria-pressed', 'false'); });
      chip.classList.add('is-active');
      chip.setAttribute('aria-pressed', 'true');
      apply(chip.dataset.filter);
    });
  });
})();
