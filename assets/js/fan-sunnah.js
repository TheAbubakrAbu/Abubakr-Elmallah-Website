/* fan-sunnah.js: content for /franchises/sunnah/. Rendered by fanpage.js.

   Sits under Islam in the identity row, next to the Qurʾān page. The Qurʾān
   page is about the Book as sound; this one is about the second source — what
   the Prophet ﷺ said, did and approved of, how it was carried and graded, and
   the habits it still delivers into an ordinary day. The Hadith JSON Engine
   exists because this page’s subject deserved clean data. */
window.FAN_PAGE = {
  when: { at: 'The other half of the dīn', note: 'You cannot pray a single prayer from the Qurʾān alone: the how of it is entirely Sunnah. Once you notice that, you notice it everywhere.' },
  sections: [

  { id: 'what', kind: 'cards', title: 'What Counts as Sunnah', note: 'قول · فعل · تقرير',
    lede: 'Three kinds of report, one standard of evidence. A ḥadīth is not a quotation floating loose; it is a text plus the named chain of people who carried it, and the chain is the part the scholars spent their lives on.',
    items: [
      { title: 'Qawl', sub: 'قول · What he said', tag: 'Sayings', accent: '#6fcfa4',
        desc: 'The words themselves: rulings, warnings, duʿāʾs, and one-line sentences that have organised whole lives — actions are by intentions, the best of you are the best to their families, say good or stay silent.',
        meta: 'The largest category' },
      { title: 'Fiʿl', sub: 'فعل · What he did', tag: 'Actions', accent: '#e8c56a',
        desc: 'How he ﷺ prayed, fasted, ate, slept and dealt with people, observed and reported by the companions in detail. The prayer you see in any mosque tonight is a seventh-century motion, transmitted body to body.',
        meta: 'Pray as you have seen me pray' },
      { title: 'Taqrīr', sub: 'تقرير · What he approved', tag: 'Approvals', accent: '#5fa3ec',
        desc: 'Things done in front of him ﷺ that he let stand. Silence from the one man whose objection would have been law is itself a ruling, and the scholars treated it as one.',
        meta: 'Approval by silence' },
      { title: 'Bayān', sub: 'بيان · The explanation', tag: 'Why it matters', accent: '#e0b84f',
        desc: 'The Qurʾān names the destination; the Sunnah is the road. Ṣalāh, zakāh and ḥajj are all commanded in the Book and all impossible to perform from the Book alone. The two sources were never designed to be separated.',
        meta: 'Qurʾān 16:44' },
    ] },

  { id: 'six', kind: 'cards', title: 'The Six Books', note: 'الكتب الستة',
    lede: 'The canonical collections, compiled in the third Islamic century by men who travelled thousands of miles to hear one narration from one reliable mouth. Al-Bukhārī is said to have sifted six hundred thousand reports for the few thousand that met his bar. These six, plus the Muwaṭṭaʾ and the Musnad of Aḥmad and more, are the corpus my Hadith JSON Engine packages: 50,884 ḥadīth, structured.',
    items: [
      { title: 'Ṣaḥīḥ al-Bukhārī', sub: 'Muḥammad al-Bukhārī · d. 870', tag: 'The benchmark', accent: '#6fcfa4',
        desc: 'The most rigorously authenticated book in Islam after the Qurʾān itself. His conditions were the strictest: proven meeting between every two links in every chain, or the report stayed out.',
        meta: '7,563 with repetitions' },
      { title: 'Ṣaḥīḥ Muslim', sub: 'Muslim ibn al-Ḥajjāj · d. 875', tag: 'The pair', accent: '#6fcfa4',
        desc: 'Bukhārī’s student, with a book organised so cleanly by topic that scholars reach for Muslim first even when both carry the report. Together the two Ṣaḥīḥs are the gold standard: agreed upon.',
        meta: '~7,500 with repetitions' },
      { title: 'Sunan Abī Dāwūd', sub: 'Abū Dāwūd as-Sijistānī · d. 889', tag: 'Law', accent: '#e8c56a',
        desc: 'The jurist’s collection: gathered specifically for legal rulings, with his own notes on weaknesses. The book a faqīh opens to find what the madhhabs were built from.',
        meta: '~5,270' },
      { title: 'Jāmiʿ at-Tirmidhī', sub: 'Abū ʿĪsā at-Tirmidhī · d. 892', tag: 'The grader', accent: '#5fa3ec',
        desc: 'The first collection to print its grades on the page: ṣaḥīḥ, ḥasan, gharīb, after each report, plus which scholars acted on it. The most transparent methodology of the six.',
        meta: '~3,956' },
      { title: 'Sunan an-Nasāʾī', sub: 'Aḥmad an-Nasāʾī · d. 915', tag: 'Precision', accent: '#e0b84f',
        desc: 'The strictest of the four Sunan on narrators — closest in rigour to the two Ṣaḥīḥs, with a fineness for spotting subtle defects in chains that other collectors missed.',
        meta: '~5,758' },
      { title: 'Sunan Ibn Mājah', sub: 'Ibn Mājah al-Qazwīnī · d. 887', tag: 'The sixth', accent: '#a05fd0',
        desc: 'The most debated seat in the canon: it carries reports the others left out, which is both its value and its weakness. Graded ḥadīth by ḥadīth, it completes the six.',
        meta: '~4,341' },
    ] },

  { id: 'isnad', kind: 'timeline', title: 'The Isnād', note: 'how a sentence survives 1,400 years',
    items: [
      { when: '610–632', title: 'The words are said', desc: 'The Prophet ﷺ teaches for twenty-three years in front of thousands of companions, many of whom memorise professionally the way their culture memorised poetry: exactly.' },
      { when: '632–700', title: 'The companions carry it', desc: 'Abū Hurayrah, ʿĀʾishah, Ibn ʿUmar, Anas and hundreds more transmit what they saw and heard, each report tagged with who heard it from whom. The isnād — the chain — is born as a habit before it is a science.' },
      { when: '717–720', title: 'The order to write', desc: 'Caliph ʿUmar ibn ʿAbd al-ʿAzīz orders the systematic writing-down of ḥadīth, worried the carriers were dying faster than the knowledge was settling.' },
      { when: 'c. 767', title: 'The Muwaṭṭaʾ', desc: 'Mālik ibn Anas compiles the first great organised collection in Madinah, the city where the Sunnah was still a living practice you could watch out the window.' },
      { when: '810–875', title: 'The sifting', desc: 'Al-Bukhārī and Muslim apply the hardest filter in the tradition: biography of every narrator, proof the links met, cross-checking of every text. Ḥadīth criticism becomes the most sophisticated information-audit of the medieval world.' },
      { when: '9th–10th c.', title: 'The canon settles', desc: 'The six books take their place, alongside the narrator encyclopaedias — ʿilm ar-rijāl, the science of men — recording the memory, honesty and travels of tens of thousands of transmitters.' },
      { when: '1233–1277', title: 'An-Nawawī', desc: 'The great organiser: his Forty Ḥadīth puts the essentials in one short list, and Riyāḍ aṣ-Ṣāliḥīn arranges the Sunnah by the life it is meant to produce. Still the two most-read ḥadīth books in the world.' },
      { when: 'Now', title: 'The corpus goes digital', desc: 'Sunnah.com puts the collections online with gradings attached; my Hadith JSON Engine turns them into clean structured data — 50,884 ḥadīth, 21,455 gradings — because scraped HTML was quietly mangling a 1,400-year-old archive.' },
    ] },

  { id: 'grades', kind: 'tiles', title: 'The Grading', note: 'every report carries a verdict', compact: true,
    lede: 'Ḥadīth are not all equal and were never claimed to be — the tradition itself built the ranking system, and honesty about weak reports is a feature of the science, not an embarrassment to it.',
    items: [
      { title: 'Mutawātir', accent: '#6fcfa4', sub: 'متواتر', desc: 'Mass-transmitted: so many independent chains that fabrication is impossible. The prayer itself travels this way.' },
      { title: 'Ṣaḥīḥ', accent: '#6fcfa4', sub: 'صحيح', desc: 'Authentic: unbroken chain of reliable, precise narrators, no hidden defect. The standard for creed and law.' },
      { title: 'Ḥasan', accent: '#e8c56a', sub: 'حسن', desc: 'Sound: a chain with a slightly lighter memory in it. Acceptable as evidence, ranked honestly below ṣaḥīḥ.' },
      { title: 'Ḍaʿīf', accent: '#e0642a', sub: 'ضعيف', desc: 'Weak: a broken chain or a doubted narrator. Recorded rather than hidden, and labelled so nobody builds on it.' },
      { title: 'Mawḍūʿ', accent: '#a05fd0', sub: 'موضوع', desc: 'Fabricated: identified, catalogued in dedicated books of forgeries, and thrown out. The system caught its own counterfeits.' },
      { title: 'ʿIlm ar-rijāl', accent: '#5fa3ec', sub: 'علم الرجال', desc: 'The science of men: biographical audits of tens of thousands of narrators. The database the grades run on.' },
    ] },

  { id: 'daily', kind: 'tiles', title: 'In an Ordinary Day', note: 'the Sunnah you can watch', compact: true,
    lede: 'The reason this page sits in the identity row: the Sunnah is not an archive I admire, it is the operating system of an ordinary day, and most of it is small on purpose.',
    items: [
      { title: 'The miswāk', accent: '#e8c56a', sub: 'Teeth, before prayer', desc: 'A toothbrush tree twig, recommended fourteen centuries before dentistry agreed.' },
      { title: 'Right side first', accent: '#6fcfa4', sub: 'Shoes, doors, dressing', desc: 'Begin with the right in honourable things. A habit so small it disappears — until you notice everyone doing it.' },
      { title: 'Bismillāh, then eat', accent: '#e0b84f', sub: 'And with the right hand', desc: 'Name Allah, eat from what is in front of you, and stop before you are full. Three sentences of table manners, kept for 1,400 years.' },
      { title: 'The greeting', accent: '#5fa3ec', sub: 'As-salāmu ʿalaykum', desc: 'Peace be upon you — said first, said to strangers, and answered with more than you were given.' },
      { title: 'Sleep on the right', accent: '#a05fd0', sub: 'With the last two sūrahs', desc: 'Wudūʾ, the right side, the muʿawwidhatān over the palms. The day closes the way it opened: deliberately.' },
      { title: 'A smile is charity', accent: '#6fcfa4', sub: 'Ṣadaqah, priced at zero', desc: 'The Sunnah counts a smile at your brother as charity, which reprices every hallway you ever walk down.' },
    ] },

  { id: 'quotes', kind: 'quotes', title: 'Two Ḥadīth', note: 'the ones that organise the rest',
    items: [
      { title: 'Actions are only by intentions, and every person will have only what they intended.', sub: 'Ṣaḥīḥ al-Bukhārī 1 · Ṣaḥīḥ Muslim 1907', accent: '#6fcfa4' },
      { title: 'I have left among you two things; you will never go astray so long as you hold fast to them: the Book of Allah and the Sunnah of His Prophet.', sub: 'Muwaṭṭaʾ Mālik', accent: '#e0b84f' },
    ] },

  { id: 'links', kind: 'links', title: 'Links', note: 'read it, with the gradings attached',
    items: [
      { title: 'Sunnah.com', href: 'https://sunnah.com/',
        desc: 'The collections in Arabic and English, with the grading on each report. The reference site.' },
      { title: 'An-Nawawī’s Forty', href: 'https://sunnah.com/nawawi40',
        desc: 'Forty-two ḥadīth chosen as the essentials of the dīn. The best possible starting point.' },
      { title: 'Riyāḍ aṣ-Ṣāliḥīn', href: 'https://sunnah.com/riyadussalihin',
        desc: 'An-Nawawī’s arrangement of the Sunnah by the life it is meant to produce, chapter by chapter.' },
      { title: 'Hadith JSON Engine', href: 'https://github.com/TheAbubakrAbu/Hadith-JSON-Engine',
        desc: 'My open-source ḥadīth database: 50,884 reports across 17 collections, repaired, graded and structured.' },
    ] },

] };
