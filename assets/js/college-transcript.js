/* college-transcript.js: the college coursework on /college/, rendered with
   the same ts- furniture as the high-school transcript so the two pages read
   as one system. Data and renderer live together because this list is small
   and has no exam blocks, no GPA column and no marks, just the courses,
   term by term, from the first Saddleback class in 11th grade onward.

   Saddleback rows carry `sb: true` and take the same blue tint the
   dual-enrolment rows have on the high-school page. `ge` is the UCI General
   Education category the course satisfied, shown as a small chip.

   Runs after reveal.js, so the markup is handed back via window.AEreveal. */
(function collegeTranscript() {
  try {
    var root = document.getElementById('collegeTranscript');
    if (!root) return;

    var TERMS = [
      { term: 'Fall 2022', yr: '11th grade', sb: true, rows: [
        { code: 'ARAB 1', name: 'Elementary Arabic 1' },
      ] },
      { term: 'Spring 2023', yr: '11th grade', sb: true, rows: [
        { code: 'ARAB 2', name: 'Elementary Arabic 2' },
      ] },
      { term: 'Summer 2023', yr: 'before 12th', sb: true, rows: [
        { code: 'CIMP 235', name: 'iPhone/iPad Programming' },
        { code: 'CIMP 8A', name: 'Python Programming' },
      ] },
      { term: 'Fall 2023', yr: '12th grade', sb: true, rows: [
        { code: 'ARAB 3', name: 'Intermediate Arabic' },
        { code: 'CIMP 7A', name: 'Java Programming' },
        { code: 'HIST 74', name: 'History of the Middle East' },
      ] },
      { term: 'Fall 2024', yr: '1st year', rows: [
        { code: 'ICS H32', name: 'Python Programming and Libraries (Honors)' },
        { code: 'ICS 6B', name: 'Boolean Logic and Discrete Structures' },
        { code: 'POLSCI 51A', name: 'Introduction to Politics', ge: 'GE III' },
      ] },
      { term: 'Winter 2025', yr: '1st year', rows: [
        { code: 'ICS 33', name: 'Intermediate Programming with Python' },
        { code: 'IN4MATX 43', name: 'Introduction to Software Engineering' },
        { code: 'BME 3', name: 'Biomedical Engineering', ge: 'GE II' },
      ] },
      { term: 'Spring 2025', yr: '1st year', rows: [
        { code: 'ICS 45C', name: 'Programming in C/C++ as a Second Language' },
        { code: 'ICS 6D', name: 'Discrete Mathematics for Computer Science' },
        { code: 'STATS 67', name: 'Introduction to Probability and Statistics for Computer Science' },
      ] },
      { term: 'Summer 2025', yr: 'between years', sb: true, rows: [
        { code: 'SOC 1', name: 'Introduction to Sociology', ge: 'GE VII' },
        { code: 'FN 50', name: 'Fundamentals of Nutrition', ge: 'GE II' },
      ] },
      { term: 'Fall 2025', yr: '2nd year', rows: [
        { code: 'WRITING 50', name: 'Critical Reading and Rhetoric', ge: 'GE I' },
        { code: 'LPS 40', name: 'Logic & Philosophy of Science', ge: 'GE II' },
        { code: 'ICS 46', name: 'Data Structure Implementation and Analysis' },
        { code: 'MATH 3A', name: 'Introduction to Linear Algebra' },
      ] },
      { term: 'Winter 2026', yr: '2nd year', rows: [
        { code: 'ICS 51', name: 'Introductory Computer Organization' },
        { code: 'CS 121', name: 'Information Retrieval' },
      ] },
      { term: 'Spring 2026', yr: '2nd year', rows: [
        { code: 'WRITING 60', name: 'Argument and Research', ge: 'GE I' },
        { code: 'CS 122A', name: 'Introduction to Data Management' },
        { code: 'CS 161', name: 'Design and Analysis of Algorithms' },
        { code: 'CS 171', name: 'Introduction to Artificial Intelligence' },
      ] },
    ];

    function esc(t) {
      return String(t == null ? '' : t)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    var rows = 0;
    TERMS.forEach(function (t) { rows += t.rows.length; });

    var html = '<div class="ts-full reveal">'
      + '<button class="ts-toggle" type="button" id="ctToggle" aria-expanded="false" data-magnetic>'
      +   'Show every course &#183; ' + rows + ' rows, Saddleback to UCI'
      + '</button>'
      + '<div class="ts-terms ts-terms--uni" id="ctTerms" hidden>'
      +   TERMS.map(function (t) {
            return '<section class="ts-term">'
              + '<div class="ts-termhead">'
              +   '<h5>' + esc(t.term) + '</h5>'
              +   '<span class="ts-yr">' + esc(t.yr) + '</span>'
              +   (t.sb ? '<span class="ts-where">Saddleback College</span>' : '')
              + '</div>'
              + '<ul class="ts-rows">'
              +   t.rows.map(function (r) {
                    return '<li' + (t.sb ? ' class="is-college"' : '') + '>'
                      + '<span class="ts-code">' + esc(r.code) + '</span>'
                      + '<span class="ts-course">' + esc(r.name) + '</span>'
                      + '<span class="ts-tags">'
                      +   (r.ge ? '<u title="UC Irvine General Education category">' + esc(r.ge) + '</u>' : '')
                      + '</span>'
                      + '</li>';
                  }).join('')
              + '</ul>'
              + '</section>';
          }).join('')
      + '</div>'
      + '</div>';

    root.innerHTML = html;

    var btn = document.getElementById('ctToggle');
    var terms = document.getElementById('ctTerms');
    if (btn && terms) {
      btn.addEventListener('click', function () {
        var open = terms.hidden;
        terms.hidden = !open;
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        btn.innerHTML = open
          ? 'Hide the course list'
          : 'Show every course &#183; ' + rows + ' rows, Saddleback to UCI';
        if (open && typeof window.AEreveal === 'function') window.AEreveal(terms);
      });
    }

    if (typeof window.AEreveal === 'function') window.AEreveal(root);
    else {
      var late = root.querySelectorAll('.reveal');
      for (var i = 0; i < late.length; i++) late[i].classList.add('in');
    }
  } catch (err) { /* never take the page down with it */ }
})();
