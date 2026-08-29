/* mascots.js: the five schools I have been to, in order, each one an animal.

   ONE LIST, THREE PAGES. /education/ is the only page that spans all five, so
   it gets the full ladder. /high-school/ and /college/ get the same list
   compressed into a single rail with their own school lit up and the rest
   dimmed, because on those pages the run of schools is context, not the
   subject. Two renderings, one array, so a correction is made once and lands
   everywhere.

   Mount points, anywhere in a page:

     <div data-mascots="full"></div>
     <div data-mascots="rail" data-mark="mustangs"></div>

   `data-mark` is an id from LIST below. On the rail it is the entry that gets
   the accent and full ink; leave it off and the whole rail reads dim.

   EVERY LINE HERE IS OFF A PHOTOGRAPH, not off memory. The hawk is on the
   Cielo Vista marquee in pre-ms/2016-09-08-0721, the roadrunner is printed on
   the 7th-grade ID card in id-pics, the mustang is on the school sign in
   hs-senior/2024-05-20-1744-2. The years chain back from the one hard anchor
   in the library, the ID card that reads Gr: 007 for 2018-2019.

   Runs after reveal.js and hands its markup back through window.AEreveal,
   without which all of it would sit at opacity 0 for good. */
(function mascots() {
  try {
    /* `mascot: null` is not missing data, it is the finding: Minaret is the
       one school of the five with no animal on record anywhere I can find.
       The renderer prints "None" for it rather than skipping the card, since
       the gap at the start of the row is the point. */
    var LIST = [
      {
        id: 'minaret',
        mascot: null,
        school: 'Minaret Academy',
        short: 'Minaret',
        step: 'First school',
        when: '2011 – 2015 · grades K to 3',
        tint: 'var(--green)',
        note: 'Kindergarten through 3rd grade at the Islamic school in Anaheim, '
            + 'and the one gap in the row: no mascot on record anywhere I can '
            + 'find, and none I ever knew. The name is the emblem.',
      },
      {
        id: 'hawks',
        mascot: 'Hawks',
        school: 'Cielo Vista Elementary',
        short: 'Cielo Vista',
        step: 'Elementary',
        when: '2015 – 2018 · grades 4 to 6',
        tint: 'var(--blue)',
        note: 'The marquee out front put it plainly: “It’s a great day to be a '
            + 'HAWK!” There is a photo of me standing under that sign in '
            + 'September 2016, backpack on.',
      },
      {
        id: 'roadrunners',
        mascot: 'Roadrunners',
        school: 'RSM Intermediate',
        short: 'RSM',
        step: 'Middle',
        when: '2018 – 2020 · grades 7 and 8',
        tint: 'var(--green-2)',
        note: '“Home of the Roadrunners” is printed on the student ID card '
            + 'itself, on the line directly under my name.',
      },
      {
        id: 'mustangs',
        mascot: 'Mustangs',
        school: 'Trabuco Hills High School',
        short: 'Trabuco Hills',
        step: 'High school',
        when: '2020 – 2024 · Mission Viejo, CA',
        tint: 'var(--gold)',
        note: 'Four years of it, and in the last weeks of senior year the '
            + 'school sign read “Congratulations THHS Mustangs” on the way in.',
      },
      {
        id: 'anteaters',
        mascot: 'Anteaters',
        school: 'University of California, Irvine',
        short: 'UC Irvine',
        step: 'College',
        when: '2024 – 2028 · Irvine, CA',
        tint: 'var(--blue-2)',
        note: 'The current one, and the only one of the five with its own hand '
            + 'signal and its own war cry. Zot zot zot.',
      },
    ];

    var mounts = document.querySelectorAll('[data-mascots]');
    if (!mounts.length) return;

    function esc(t) {
      return String(t == null ? '' : t)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    /* the ladder: one card per school, the mascot set large. */
    function full() {
      return '<ol class="mascots">' + LIST.map(function (m, i) {
        var n = ('0' + (i + 1)).slice(-2);
        return '<li class="mascot reveal' + (m.mascot ? '' : ' is-none')
          + '" style="--m: ' + m.tint + '">'
          + '<span class="mascot-step">' + n + ' · ' + esc(m.step) + '</span>'
          + '<h4>' + esc(m.mascot || 'None') + '</h4>'
          + '<span class="mascot-school">' + esc(m.school) + '</span>'
          + '<span class="mascot-when">' + esc(m.when) + '</span>'
          + '<p>' + esc(m.note) + '</p>'
          + '</li>';
      }).join('') + '</ol>';
    }

    /* the rail: the same five as one line of type, for a page that is about
       one of them. The chevron between nodes is drawn by the CSS. */
    function rail(mark) {
      return '<div class="mascot-rail reveal">'
        + '<span class="mascot-rail-lead">The mascots</span>'
        + '<ol>' + LIST.map(function (m) {
            return '<li class="ms-node' + (m.id === mark ? ' is-mark' : '')
              + (m.mascot ? '' : ' is-none') + '" style="--m: ' + m.tint + '">'
              + '<b>' + esc(m.mascot || 'None') + '</b>'
              + '<i>' + esc(m.short) + '</i>'
              + '</li>';
          }).join('') + '</ol>'
        + '<a class="mascot-rail-more" href="/education/#mascots" data-magnetic>All five ↗</a>'
        + '</div>';
    }

    Array.prototype.forEach.call(mounts, function (el) {
      el.innerHTML = el.dataset.mascots === 'rail'
        ? rail(el.dataset.mark || '')
        : full();
      if (typeof window.AEreveal === 'function') window.AEreveal(el);
    });
  } catch (e) { /* a decorative strip must never take a page down with it */ }
})();
