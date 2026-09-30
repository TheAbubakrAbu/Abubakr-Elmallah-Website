/* projects.js: the "Sort projects" menu on /projects/.

   Default is the page as written, grouped by category. Oldest first and
   Newest first lay every card out in one column by its `date` in
   apps-data.js (release date, or when my part of it began). The cards are
   moved, not copied, so an opened "Read more", the lightbox links and the
   tilt all come along; a comment left in each card's place puts it back. A
   card listed twice (PeterPlate is UCI work and web work) appears once. */
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
      var row = document.createElement('div');
      row.className = card.classList.contains('app-card') ? 'apps-grid apps-grid--1' : 'hs-grid project-timeline-school';
      entries.push({ card: card, placeholder: placeholder, row: row, date: card.dataset.projectDate, index: index });
    });
    function sort() {
      var mode = order.value;
      var grouped = mode === 'default';
      if (grouped) {
        entries.forEach(function (entry) { entry.placeholder.after(entry.card); });
      } else {
        entries.slice().sort(function (a, b) {
          if (!a.date || !b.date) return !a.date - !b.date || a.index - b.index;
          return a.date.localeCompare(b.date) * (mode === 'desc' ? -1 : 1) || a.index - b.index;
        }).forEach(function (entry) {
          entry.row.appendChild(entry.card);
          timeline.appendChild(entry.row);
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
