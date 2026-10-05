/* projects.js: the "Sort projects" menu on /projects/.

   Default is the page as written, grouped by category. Oldest first and
   Newest first lay the cards out by their `date` in apps-data.js (release
   date, or when my part of it began), two app cards to a row like the
   categories, and the high-school projects in their own usual grid: a run of
   cards of one kind shares one grid, and a new grid starts only where the
   kind changes. The cards are
   moved, not copied, so an opened "Read more", the lightbox links and the
   tilt all come along; a comment left in each card's place puts it back. A
   card listed twice would appear once. */
(function () {
  'use strict';
  var control = document.querySelector('[data-project-sort]');
  if (control) {
    var categories = document.querySelector('[data-project-categories]');
    var timeline = document.querySelector('[data-project-timeline]');
    var order = document.getElementById('project-order');
    var status = document.querySelector('[data-sort-status]');
    var jump = document.querySelector('.jump');
    var seen = {};
    var entries = [];
    categories.querySelectorAll('[data-project-id]').forEach(function (card, index) {
      var id = card.dataset.projectId;
      if (seen[id]) return;
      seen[id] = true;
      var placeholder = document.createComment('project: ' + id);
      card.before(placeholder);
      entries.push({ card: card, placeholder: placeholder, app: card.classList.contains('app-card'),
        date: card.dataset.projectDate, index: index });
    });
    function sort() {
      var mode = order.value;
      var grouped = mode === 'default';
      if (grouped) {
        entries.forEach(function (entry) { entry.placeholder.after(entry.card); });
      } else {
        var sorted = entries.slice().sort(function (a, b) {
          if (!a.date || !b.date) return !a.date - !b.date || a.index - b.index;
          return a.date.localeCompare(b.date) * (mode === 'desc' ? -1 : 1) || a.index - b.index;
        });
        timeline.textContent = '';
        var grid = null;
        sorted.forEach(function (entry) {
          if (!grid || grid.app !== entry.app) {
            grid = document.createElement('div');
            grid.className = entry.app ? 'apps-grid apps-grid--2' : 'hs-grid';
            grid.app = entry.app;
            timeline.appendChild(grid);
          }
          grid.appendChild(entry.card);
        });
      }
      categories.hidden = !grouped;
      timeline.hidden = grouped;
      if (jump) jump.hidden = !grouped;
      status.textContent = grouped ? 'Grouped by category' : entries.length + ' projects · ' +
        (mode === 'asc' ? 'Oldest first' : 'Newest first') + ' · Release or contribution date';
    }
    order.addEventListener('change', sort);
    // Category and duplicate-card deep links remain reachable after sorting.
    window.addEventListener('hashchange', function () {
      var target = document.getElementById(location.hash.slice(1));
      if (target && categories.contains(target) && categories.hidden) {
        order.value = 'default';
        sort();
        target.scrollIntoView({ block: 'start' });
      }
    });
    control.hidden = false;
  }
})();
