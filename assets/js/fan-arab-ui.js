/* fan-arab-ui.js: the two interactive blocks on /worlds/arab/.

   LOAD ORDER MATTERS. Runs AFTER reveal.js, whole body in a try/catch, for the
   same reason fan-lego-ui.js does: sections start at opacity 0 and are revealed
   by reveal.js, so a script that throws before that runs leaves a blank page.

   1. THE ALPHABET. Twenty-eight letters, each shown in all the shapes it takes
      depending on where it stands in a word. The forms are NOT hard-coded from
      the Arabic Presentation Forms block; that would be a list of two hundred
      codepoints to get wrong. Instead each form is the plain letter wrapped in
      zero-width joiners (U+200D), which is exactly what a joiner is for: it
      tells the shaping engine "there is a letter attached on this side", and
      the font resolves the correct glyph itself. One codepoint per letter, and
      it stays right in any font.

      Six letters (ا د ذ ر ز و) never join to the letter that FOLLOWS them.
      They therefore have no initial or medial shape at all, which is not a gap
      in the data: it is the rule that makes Arabic words break where they do.

   2. THE ROOT. Almost every Arabic word is three consonants poured into a
      pattern. Pick a root and the derived words are shown with the three
      radicals highlighted inside each one, which is the single fastest way to
      see how the language is actually built. */
(function arabUI() {
  try {

    var ZWJ = '‍';

    /* ── 1. the alphabet ── */
    var LETTERS = [
      { c: 'ا', name: 'alif',  tr: 'ā',  sound: 'long a, and the seat other letters sit on', solo: true },
      { c: 'ب', name: 'bāʾ',   tr: 'b',  sound: 'b, as in book' },
      { c: 'ت', name: 'tāʾ',   tr: 't',  sound: 't, as in table' },
      { c: 'ث', name: 'thāʾ',  tr: 'th', sound: 'th, as in think' },
      { c: 'ج', name: 'jīm',   tr: 'j',  sound: 'j, and a hard g in Cairo' },
      { c: 'ح', name: 'ḥāʾ',   tr: 'ḥ',  sound: 'a hard h made in the throat; no English equivalent' },
      { c: 'خ', name: 'khāʾ',  tr: 'kh', sound: 'ch, as in Scottish loch' },
      { c: 'د', name: 'dāl',   tr: 'd',  sound: 'd, as in door', solo: true },
      { c: 'ذ', name: 'dhāl',  tr: 'dh', sound: 'th, as in this', solo: true },
      { c: 'ر', name: 'rāʾ',   tr: 'r',  sound: 'a tapped r, as in Spanish pero', solo: true },
      { c: 'ز', name: 'zāy',   tr: 'z',  sound: 'z, as in zoo', solo: true },
      { c: 'س', name: 'sīn',   tr: 's',  sound: 's, as in sun' },
      { c: 'ش', name: 'shīn',  tr: 'sh', sound: 'sh, as in ship' },
      { c: 'ص', name: 'ṣād',   tr: 'ṣ',  sound: 'an emphatic s: the whole tongue pulls back' },
      { c: 'ض', name: 'ḍād',   tr: 'ḍ',  sound: 'an emphatic d. Arabic is called the language of the ḍād' },
      { c: 'ط', name: 'ṭāʾ',   tr: 'ṭ',  sound: 'an emphatic t' },
      { c: 'ظ', name: 'ẓāʾ',   tr: 'ẓ',  sound: 'an emphatic dh' },
      { c: 'ع', name: 'ʿayn',  tr: 'ʿ',  sound: 'made low in the throat. The hardest sound in the language' },
      { c: 'غ', name: 'ghayn', tr: 'gh', sound: 'a gargled g, close to the French r' },
      { c: 'ف', name: 'fāʾ',   tr: 'f',  sound: 'f, as in fish' },
      { c: 'ق', name: 'qāf',   tr: 'q',  sound: 'a k made far back, at the uvula' },
      { c: 'ك', name: 'kāf',   tr: 'k',  sound: 'k, as in kite' },
      { c: 'ل', name: 'lām',   tr: 'l',  sound: 'l, as in light' },
      { c: 'م', name: 'mīm',   tr: 'm',  sound: 'm, as in moon' },
      { c: 'ن', name: 'nūn',   tr: 'n',  sound: 'n, as in noon' },
      { c: 'ه', name: 'hāʾ',   tr: 'h',  sound: 'h, as in house' },
      { c: 'و', name: 'wāw',   tr: 'w/ū', sound: 'w, and the long u vowel', solo: true },
      { c: 'ي', name: 'yāʾ',   tr: 'y/ī', sound: 'y, and the long i vowel' },
    ];

    var FORMS = [
      { k: 'isolated', label: 'Alone',  wrap: function (c) { return c; } },
      { k: 'initial',  label: 'Start',  wrap: function (c) { return c + ZWJ; } },
      { k: 'medial',   label: 'Middle', wrap: function (c) { return ZWJ + c + ZWJ; } },
      { k: 'final',    label: 'End',    wrap: function (c) { return ZWJ + c; } },
    ];

    var alpha = document.getElementById('arAlphabet');
    if (alpha) {
      alpha.innerHTML = '<div class="ar-alpha">' + LETTERS.map(function (l, i) {
        /* a non-connector has no start or middle shape, so those two cells are
           dropped rather than repeated: the absence is the information */
        var forms = FORMS.filter(function (f) {
          return !(l.solo && (f.k === 'initial' || f.k === 'medial'));
        });
        return '<article class="ar-let reveal' + (l.solo ? ' is-solo' : '') + '">'
          + '<div class="ar-let-head">'
          +   '<span class="ar-let-n">' + (i + 1 < 10 ? '0' + (i + 1) : i + 1) + '</span>'
          +   '<span class="ar-let-name"><b>' + l.name + '</b><i>' + l.tr + '</i></span>'
          +   (l.solo ? '<span class="ar-let-tag">does not join forward</span>' : '')
          + '</div>'
          + '<div class="ar-forms">' + forms.map(function (f) {
              return '<span class="ar-form">'
                + '<span class="ar-glyph" lang="ar" dir="rtl">' + f.wrap(l.c) + '</span>'
                + '<span class="ar-form-k">' + f.label + '</span>'
                + '</span>';
            }).join('') + '</div>'
          + '<p class="ar-let-sound">' + l.sound + '</p>'
          + '</article>';
      }).join('') + '</div>';
    }

    /* ── 2. the root explorer ──
       One root, and the words that come out of it when you pour it into the
       standard patterns. Each entry carries the word in Arabic, how it is
       transliterated and what it means; the point the block is making is that
       the English column looks like six unrelated words and the Arabic column
       is visibly one. */
    var ROOTS = [
      { id: 'ktb', root: 'ك ت ب', tr: 'k–t–b', sense: 'writing',
        note: 'The root every Arabic student is taught first, because every shape in the pattern system shows up in it.',
        words: [
          { w: 'كتب', tr: 'kataba', m: 'he wrote' },
          { w: 'كِتاب', tr: 'kitāb', m: 'a book' },
          { w: 'كاتب', tr: 'kātib', m: 'a writer' },
          { w: 'مكتب', tr: 'maktab', m: 'a desk, an office' },
          { w: 'مكتبة', tr: 'maktabah', m: 'a library' },
          { w: 'مكتوب', tr: 'maktūb', m: 'written; a letter' },
        ] },
      { id: 'slm', root: 'س ل م', tr: 's–l–m', sense: 'wholeness, peace, submission',
        note: 'The one worth knowing. Peace, the religion, and the person who follows it are not three related words; they are one word in three shapes.',
        words: [
          { w: 'سلام', tr: 'salām', m: 'peace' },
          { w: 'إسلام', tr: 'islām', m: 'submitting to God' },
          { w: 'مسلم', tr: 'muslim', m: 'one who submits' },
          { w: 'سليم', tr: 'salīm', m: 'sound, intact, unharmed' },
          { w: 'تسليم', tr: 'taslīm', m: 'handing over safely' },
          { w: 'سلم', tr: 'sullam', m: 'a ladder: what gets you up safely' },
        ] },
      { id: 'ilm', root: 'ع ل م', tr: 'ʿ–l–m', sense: 'knowing',
        note: 'Science, scholar, teacher, education and a single fact are all the same three letters in different moulds.',
        words: [
          { w: 'علم', tr: 'ʿilm', m: 'knowledge, science' },
          { w: 'عالم', tr: 'ʿālim', m: 'a scholar' },
          { w: 'معلم', tr: 'muʿallim', m: 'a teacher' },
          { w: 'تعليم', tr: 'taʿlīm', m: 'education' },
          { w: 'معلومة', tr: 'maʿlūmah', m: 'a piece of information' },
          { w: 'عالم', tr: 'ʿālam', m: 'the world: all that is known' },
        ] },
      { id: 'hmd', root: 'ح م د', tr: 'ḥ–m–d', sense: 'praise',
        note: 'Including two of the most common names on earth, both of which simply mean praised.',
        words: [
          { w: 'حمد', tr: 'ḥamd', m: 'praise' },
          { w: 'محمد', tr: 'Muḥammad', m: 'the much-praised one' },
          { w: 'أحمد', tr: 'Aḥmad', m: 'most praiseworthy' },
          { w: 'حميد', tr: 'ḥamīd', m: 'praiseworthy' },
          { w: 'محمود', tr: 'Maḥmūd', m: 'praised' },
        ] },
      { id: 'kbr', root: 'ك ب ر', tr: 'k–b–r', sense: 'greatness, size',
        note: 'From an ordinary adjective to the word called out from every minaret five times a day.',
        words: [
          { w: 'كبير', tr: 'kabīr', m: 'big, great' },
          { w: 'أكبر', tr: 'akbar', m: 'greater, greatest' },
          { w: 'تكبير', tr: 'takbīr', m: 'saying Allāhu akbar' },
          { w: 'كبرياء', tr: 'kibriyāʾ', m: 'grandeur' },
          { w: 'مكبر', tr: 'mukabbir', m: 'an amplifier' },
        ] },
    ];

    var rootRoot = document.getElementById('arRoot');
    if (rootRoot) {
      rootRoot.innerHTML =
        '<div class="filters ar-rootpick reveal" role="group" aria-label="Choose a root">'
        + ROOTS.map(function (r, i) {
            return '<button class="chip chip--ar' + (i === 0 ? ' is-active' : '') + '" type="button"'
              + ' data-root="' + r.id + '" data-magnetic>'
              + '<span lang="ar" dir="rtl">' + r.root + '</span> <em>' + r.tr + '</em></button>';
          }).join('')
        + '</div>'
        + ROOTS.map(function (r, i) {
            return '<section class="ar-rootbox reveal" data-root="' + r.id + '"' + (i === 0 ? '' : ' hidden') + '>'
              + '<div class="ar-roothead">'
              +   '<span class="ar-rootbig" lang="ar" dir="rtl">' + r.root + '</span>'
              +   '<span class="ar-rootmeta"><b>' + r.tr + '</b><i>' + r.sense + '</i></span>'
              + '</div>'
              + '<p class="ar-rootnote">' + r.note + '</p>'
              + '<div class="ar-words">' + r.words.map(function (w) {
                  return '<span class="ar-word">'
                    + '<span class="ar-word-ar" lang="ar" dir="rtl">' + w.w + '</span>'
                    + '<span class="ar-word-tr">' + w.tr + '</span>'
                    + '<span class="ar-word-m">' + w.m + '</span>'
                    + '</span>';
                }).join('') + '</div>'
              + '</section>';
          }).join('');

      rootRoot.addEventListener('click', function (e) {
        var btn = e.target.closest('.chip--ar');
        if (!btn) return;
        var id = btn.getAttribute('data-root');
        rootRoot.querySelectorAll('.chip--ar').forEach(function (c) {
          c.classList.toggle('is-active', c === btn);
        });
        rootRoot.querySelectorAll('.ar-rootbox').forEach(function (b) {
          var show = b.getAttribute('data-root') === id;
          b.hidden = !show;
          /* the box was hidden when reveal.js walked past it, so light its own
             children up rather than waiting for a scroll that will not come */
          if (show) b.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
        });
      });
    }

    /* Both blocks were written after reveal.js ran. Idempotent, so calling it
       again just picks up the new nodes. */
    if (typeof window.AEreveal === 'function') {
      if (alpha) window.AEreveal(alpha);
      if (rootRoot) window.AEreveal(rootRoot);
    }

  } catch (err) { /* never take the page down with it */ }
})();
