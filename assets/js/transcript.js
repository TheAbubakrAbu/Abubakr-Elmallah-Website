/* transcript.js: renders the high-school record on /high-school/.

   Three blocks: the exam scores first, because those are what anyone actually
   wants, then the full course-by-course transcript behind a toggle, since fifty-
   nine rows is a lot to put in front of someone unasked.

   Runs after reveal.js, so the markup is handed back via window.AEreveal --
   without that everything here would sit at opacity 0 forever. */
(function transcript() {
  try {
    var root = document.getElementById('transcript');
    var T = window.TRANSCRIPT;
    if (!root || !T) return;

    function esc(t) {
      return String(t == null ? '' : t)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    /* AP is out of 5, IB out of 7 -- so the bar has to know which scale it is
       on or a 5 would look identical in both. */
    function bar(score, outOf) {
      if (typeof score !== 'number') return '';
      var pct = Math.round((score / outOf) * 100);
      return '<span class="ts-bar" style="--p:' + pct + '%"></span>';
    }

    var html = '';

    /* ── exams ── */
    html += '<div class="ts-exams reveal">'
      + '<div class="ts-exambox">'
      +   '<div class="ts-examhead"><h4>AP Exams</h4><span>College Board · out of 5</span></div>'
      +   '<ul class="ts-list">'
      +     T.ap.exams.map(function (e) {
            return '<li' + (e.score === 5 ? ' class="is-top"' : '') + '>'
              + '<span class="ts-n">' + esc(e.name)
              +   (e.sub ? '<i>' + esc(e.sub) + '</i>' : '') + '</span>'
              + '<span class="ts-y">' + esc(e.year) + '</span>'
              + bar(e.score, 5)
              + '<span class="ts-s">' + esc(e.score) + '</span>'
              + '</li>';
          }).join('')
      +   '</ul>'
      +   '<div class="ts-awards">'
      +     T.ap.awards.map(function (a) {
            return '<span><b>' + esc(a.year) + '</b>' + esc(a.name) + '</span>';
          }).join('')
      +   '</div>'
      + '</div>'
      + '<div class="ts-exambox">'
      +   '<div class="ts-examhead"><h4>IB Exams</h4><span>' + esc(T.ib.result)
      +     ' · ' + T.ib.points + ' points</span></div>'
      +   '<ul class="ts-list">'
      +     T.ib.exams.map(function (e) {
            return '<li' + (e.score === 7 ? ' class="is-top"' : '') + '>'
              + '<span class="ts-n">' + esc(e.name) + '</span>'
              + '<span class="ts-y">' + esc(e.year) + '</span>'
              + (e.letter ? '' : bar(e.score, 7))
              + '<span class="ts-s' + (e.letter ? ' ts-s--letter' : '') + '">' + esc(e.score) + '</span>'
              + '</li>';
          }).join('')
      +   '</ul>'
      +   '<p class="ts-note">Thirty-four points out of forty-five, including '
      +     T.ib.bonus + ' bonus point from the Extended Essay and Theory of Knowledge.</p>'
      + '</div>'
      + '</div>';

    /* ── the full transcript, folded away ── */
    var rows = 0;
    T.terms.forEach(function (t) { rows += t.rows.length; });

    html += '<div class="ts-full reveal">'
      + '<button class="ts-toggle" type="button" id="tsToggle" aria-expanded="false" data-magnetic>'
      +   'Show every course &#183; ' + rows + ' rows, grade 8 to 12'
      + '</button>'
      + '<div class="ts-terms" id="tsTerms" hidden>'
      +   T.terms.map(function (t) {
            return '<section class="ts-term">'
              + '<div class="ts-termhead">'
              +   '<h5>' + esc(t.term) + '</h5>'
              +   '<span class="ts-yr">' + esc(t.years) + '</span>'
              +   (t.where ? '<span class="ts-where">' + esc(t.where) + '</span>' : '')
              +   (t.gpa ? '<span class="ts-gpa">GPA ' + esc(t.gpa) + '</span>' : '')
              + '</div>'
              + (t.note ? '<p class="ts-termnote">' + esc(t.note) + '</p>' : '')
              + '<ul class="ts-rows">'
              +   t.rows.map(function (r) {
                    return '<li' + (r.college ? ' class="is-college"' : '') + '>'
                      + '<span class="ts-code">' + esc(r.code) + '</span>'
                      + '<span class="ts-course">' + esc(r.name)
                      +   (r.where ? '<i>' + esc(r.where) + '</i>' : '')
                      +   (r.span ? '<i>' + esc(r.span) + '</i>' : '')
                      + '</span>'
                      + '<span class="ts-tags">'
                      +   (r.tag.indexOf('+') > -1 ? '<u title="Honours, weighted">+</u>' : '')
                      +   (r.tag.indexOf('p') > -1 ? '<u title="College prep">p</u>' : '')
                      +   (r.tag.indexOf('*') > -1 ? '<u title="Non-academic">*</u>' : '')
                      + '</span>'
                      + '<span class="ts-mark">' + esc(r.mark) + '</span>'
                      + '</li>';
                  }).join('')
              + '</ul>'
              + '</section>';
          }).join('')
      + '</div>'
      + '</div>';

    root.innerHTML = html;

    var btn = document.getElementById('tsToggle');
    var terms = document.getElementById('tsTerms');
    if (btn && terms) {
      btn.addEventListener('click', function () {
        var open = terms.hidden;
        terms.hidden = !open;
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        btn.innerHTML = open
          ? 'Hide the full transcript'
          : 'Show every course &#183; ' + rows + ' rows, grade 8 to 12';
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
