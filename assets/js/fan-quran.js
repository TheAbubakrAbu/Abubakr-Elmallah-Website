/* fan-quran.js: content for /worlds/quran/. Rendered by fanpage.js.

   Sits under Islam in the identity row. The Islam page already carries the
   Qurʾān’s numbers (114 sūrahs, 6,236 āyāt, the muṣḥaf spec sheet), so this
   page deliberately does not repeat them. This one is about the Qurʾān as a
   RECITATION: how it came down, how it was fixed in writing, the ten readings
   it is transmitted in, and the tajwīd that governs the sound of it. The
   voice itself, al-Minshāwī, has a whole page of his own, one tile over. */
window.FAN_PAGE = {
  when: { at: 'Recited to me before I could read it', note: 'Minshāwī’s murattal was playing in the house and the car before I knew what a sūrah was. The Islam page has the numbers; this page is the sound.' },
  sections: [

  { id: 'wahy', kind: 'era', title: 'Revelation to Print', note: 'drag the rail',
    lede: 'The Qurʾān came down in pieces over twenty-three years, was fixed in one written standard within twenty years of the Prophet ﷺ passing, and has been transmitted since by two channels at once, memory and manuscript, each checking the other. This rail is that whole chain of custody.',
    items: [
      { when: '610 CE', title: 'Ḥirāʾ', accent: '#3fd589',
        desc: 'The cave above Makkah, Ramaḍān, and the first word of the revelation: Iqraʾ (recite). The Prophet ﷺ was forty, and could not read or write, which is the point of the story.', meta: 'Sūrat al-ʿAlaq 1–5' },
      { when: '610–622', title: 'The Makkan years', accent: '#e8c56a',
        desc: 'Short, rhythmic sūrahs on God, the resurrection and the reckoning, revealed into a culture whose entire art form was memorised speech. The Qurʾān arrived as sound, into the one society best equipped to keep sound.', meta: '86 sūrahs' },
      { when: '622–632', title: 'The Madinan years', accent: '#5fa3ec',
        desc: 'Longer sūrahs, law and community, revealed as situations demanded. Scribes wrote each passage as it came, Zayd ibn Thābit chief among them, while the ḥuffāẓ carried it whole.', meta: '28 sūrahs' },
      { when: '632', title: 'The last verses', accent: '#e0b84f',
        desc: 'Revelation ends with the Prophet’s ﷺ passing. The Qurʾān exists complete in memory and in scattered written pieces, cross-checked yearly: Jibrīl reviewed it with him every Ramaḍān, twice in the final year.', meta: 'The seal' },
      { when: '633', title: 'Abū Bakr collects it', accent: '#3fd589',
        desc: 'After ḥuffāẓ fell at Yamāmah, ʿUmar pressed Abū Bakr to gather the written Qurʾān into one volume. Zayd ibn Thābit required two witnesses per written passage against the memorised text. One master copy.', meta: 'The ṣuḥuf' },
      { when: 'c. 650', title: 'ʿUthmān’s codex', accent: '#e8c56a',
        desc: 'As Islam spread, ʿUthmān had the master copy standardised and copies sent to the major cities, with everything variant destroyed. Every muṣḥaf on earth descends from this recension, which is why there is nothing to argue about.', meta: 'The rasm' },
      { when: 'c. 690s', title: 'The dots', accent: '#5fa3ec',
        desc: 'Abū al-Aswad ad-Duʾalī and the generation after him add vowel marks and consonant dots so non-Arabs cannot misread the bare script. The letters get their points; the memory keeps the pronunciation.', meta: 'Iʿjām · tashkīl' },
      { when: '8th–10th c.', title: 'The readings are canonised', accent: '#a05fd0',
        desc: 'Scholars document the transmitted ways of reciting; Ibn Mujāhid’s book fixes seven canonical readings, later completed to ten, every one traced person by person to the Prophet ﷺ.', meta: 'Al-qirāʾāt' },
      { when: '1924', title: 'The Cairo edition', accent: '#e0642a',
        desc: 'Al-Azhar’s scholars produce the printed muṣḥaf in Ḥafṣ ʿan ʿĀṣim that becomes the world standard: typography good enough that nearly every printed Qurʾān since follows it. Egypt again.', meta: 'Amiri Press · al-Azhar' },
      { when: '1985', title: 'The Madinah muṣḥaf', accent: '#3fd589',
        desc: 'The King Fahd Complex begins printing the muṣḥaf calligraphed by ʿUthmān Ṭāhā: the exact page layout my apps render, where every copy breaks at the same word on the same page.', meta: '604 pages' },
    ] },

  { id: 'qiraat', kind: 'tiles', title: 'The Ten Readings', note: 'القراءات العشر', compact: true,
    lede: 'The Qurʾān is not transmitted as one recitation but as ten canonical readings: small, documented differences in pronunciation and wording, every one carried by an unbroken chain to the Prophet ﷺ. Each reader below has two canonical transmitters; Ḥafṣ ʿan ʿĀṣim is the one almost the whole world prints today, and Warsh ʿan Nāfiʿ is most of North and West Africa.',
    items: [
      { title: 'Nāfiʿ', accent: '#3fd589', sub: 'Madinah · d. 785', desc: 'Read by Qālūn and Warsh. Warsh ʿan Nāfiʿ is the sound of the Maghrib.' },
      { title: 'Ibn Kathīr', accent: '#e8c56a', sub: 'Makkah · d. 737', desc: 'Read by al-Bazzī and Qunbul. The reading of the Ḥaram’s own city for centuries.' },
      { title: 'Abū ʿAmr', accent: '#5fa3ec', sub: 'Baṣrah · d. 770', desc: 'Read by ad-Dūrī and as-Sūsī. Ad-Dūrī ʿan Abī ʿAmr is still recited in Sudan.' },
      { title: 'Ibn ʿĀmir', accent: '#a05fd0', sub: 'Damascus · d. 736', desc: 'Read by Hishām and Ibn Dhakwān. The Levant’s reading in the Umayyad era.' },
      { title: 'ʿĀṣim', accent: '#e0b84f', sub: 'Kūfah · d. 745', desc: 'Read by Shuʿbah and Ḥafṣ. Ḥafṣ ʿan ʿĀṣim is the default of the printed world.' },
      { title: 'Ḥamzah', accent: '#e0642a', sub: 'Kūfah · d. 772', desc: 'Read by Khalaf and Khallād. Famous for its careful, deliberate pauses.' },
      { title: 'Al-Kisāʾī', accent: '#3fd589', sub: 'Kūfah · d. 804', desc: 'Read by Abū al-Ḥārith and ad-Dūrī. Also the greatest Arabic grammarian of his day.' },
      { title: 'Abū Jaʿfar', accent: '#e8c56a', sub: 'Madinah · d. 747', desc: 'Read by Ibn Wardān and Ibn Jammāz. Nāfiʿ’s own teacher.' },
      { title: 'Yaʿqūb', accent: '#5fa3ec', sub: 'Baṣrah · d. 820', desc: 'Read by Ruways and Rawḥ. Completes the Baṣran line.' },
      { title: 'Khalaf', accent: '#a05fd0', sub: 'Kūfah · d. 843', desc: 'Ḥamzah’s own transmitter, with a reading of his own. The tenth of the ten.' },
    ] },

  { id: 'tajwid', kind: 'tiles', title: 'Tajwīd', note: 'the rules the sound obeys', compact: true,
    lede: 'Tajwīd is the discipline that governs how every letter is produced: where it comes from in the mouth, what happens when it meets its neighbours, how long a vowel is held. It is why recitation sounds the same from Jakarta to Cairo. It is also the most error-prone thing to build into software, which is why I built an engine that computes every rule below across all 6,236 āyāt instead of hand-marking them.',
    items: [
      { title: 'Ghunnah', accent: '#3fd589', sub: 'غنّة', desc: 'The nasal hum on nūn and mīm, held for two counts. The sound people imitate first.' },
      { title: 'Idghām', accent: '#e0b84f', sub: 'إدغام', desc: 'Merging: a silent nūn melts into the letter after it, with or without the hum.' },
      { title: 'Ikhfāʾ', accent: '#5fa3ec', sub: 'إخفاء', desc: 'Hiding: the nūn half-pronounced before fifteen letters, hovering between clear and merged.' },
      { title: 'Iqlāb', accent: '#a05fd0', sub: 'إقلاب', desc: 'Conversion: nūn before bāʾ becomes a mīm. One rule, one letter, always.' },
      { title: 'Qalqalah', accent: '#e0642a', sub: 'قلقلة', desc: 'The echo: five letters that bounce when the vowel is cut. Quṭb jadd, the mnemonic every kid learns.' },
      { title: 'Madd', accent: '#e8c56a', sub: 'مدّ', desc: 'Elongation: vowels held two, four, five or six counts by rule, not by taste. Where reciters live and die.' },
    ] },

  { id: 'habits', kind: 'cards', title: 'The Standing Appointments', note: 'the sūrahs with a schedule',
    lede: 'Some sūrahs have a fixed slot in the week that the Sunnah itself assigned, which means practising Muslims everywhere are reading the same things at the same times, forever. A recurring calendar, shipped in the seventh century.',
    items: [
      { title: 'Al-Fātiḥah', sub: 'الفاتحة · The Opening', tag: 'Every day', accent: '#3fd589',
        desc: 'Seven āyāt recited in every unit of every prayer: at minimum seventeen times a day, every day, for life. The most-recited text in human history and it is not close.',
        meta: '17× daily, minimum' },
      { title: 'Al-Kahf', sub: 'الكهف · The Cave', tag: 'Friday', accent: '#e8c56a',
        desc: 'The Friday sūrah: the sleepers, the two gardens, Mūsā and al-Khiḍr, and Dhū al-Qarnayn, four stories about trials of faith, wealth, knowledge and power, read while the week resets.',
        meta: 'Sūrah 18 · 110 āyāt' },
      { title: 'Al-Mulk', sub: 'الملك · The Sovereignty', tag: 'Before sleep', accent: '#5fa3ec',
        desc: 'Thirty āyāt the Prophet ﷺ described as interceding for the one who recites it. The nightly wind-down, and at thirty verses it is exactly the right length for one.',
        meta: 'Sūrah 67 · 30 āyāt' },
      { title: 'Āyat al-Kursī', sub: 'آية الكرسي', tag: 'After every prayer', accent: '#e0b84f',
        desc: 'One verse (al-Baqarah 255) on who Allah is, recited after each prayer and before sleep. The single most memorised āyah in the world.',
        meta: 'Al-Baqarah 2:255' },
      { title: 'Yāsīn', sub: 'يس', tag: 'The heart', accent: '#a05fd0',
        desc: 'Called the heart of the Qurʾān in a well-known narration. In Egyptian households it is the sūrah of hard mornings and hospital corridors; every family has a relationship with it.',
        meta: 'Sūrah 36 · 83 āyāt' },
      { title: 'The last two', sub: 'الفلق · الناس', tag: 'Protection', accent: '#e0642a',
        desc: 'Al-Falaq and an-Nās, the muʿawwidhatān: recited over the hands and wiped over the body before sleep, the way the Prophet ﷺ did every night. The muṣḥaf ends on protection.',
        meta: 'Sūrahs 113 · 114' },
    ] },

  /* the sūrahs I put on most, in Minshāwī's voice, each linked in both of his
     styles: mujawwad first (the long, live, ornamented readings, where he is
     most himself) and murattal second. `links` puts the two on one row. */
  { id: 'surahs', kind: 'cards', title: 'The Ones I Put On', note: 'five sūrahs · in Minshāwī’s voice',
    lede: 'The five I reach for most, and always in Minshāwī’s voice: the mujawwad if there is a choice, because the long live readings are where he is most himself, and the murattal for the car. Both linked for each.',
    items: [
      { title: 'Al-Kahf', sub: 'الكهف · The Cave', tag: 'Sūrah 18', accent: '#e8c56a',
        desc: 'The Friday sūrah, and the one above all. Four stories, one trial each: the sleepers and faith, the two gardens and wealth, Mūsā and al-Khiḍr and knowledge, Dhū al-Qarnayn and power. In his mujawwad it is an afternoon, and I have never wanted it shorter.',
        links: [{ href: 'https://www.youtube.com/watch?v=SnDbEv9rsPg', label: 'Mujawwad' }, { href: 'https://www.youtube.com/watch?v=AQ9SksFEf4k', label: 'Murattal' }],
        meta: 'Makkan · 110 āyāt' },
      { title: 'Ibrāhīm', sub: 'إبراهيم · Abraham', tag: 'Sūrah 14', accent: '#3fd589',
        desc: 'The parable of the good word as a good tree, its root firm and its branches in the sky, and Ibrāhīm’s prayer over the valley that became Makkah: for the city, for his children, for the prayer to be kept up. The sūrah I hear the ḥuzn in most.',
        links: [{ href: 'https://www.youtube.com/watch?v=LgwdOnh6S84', label: 'Mujawwad' }, { href: 'https://www.youtube.com/watch?v=JfFJSsc602g', label: 'Murattal' }],
        meta: 'Makkan · 52 āyāt' },
      { title: 'An-Najm', sub: 'النجم · The Star', tag: 'Sūrah 53', accent: '#5fa3ec',
        desc: 'By the star when it sets: the ascent, the lote tree at the boundary, and the sajdah at the very end. When the Prophet ﷺ first recited it aloud in Makkah, everyone present went down with him, believers and idolaters alike. Minshāwī’s reading of the last āyāt is the reason.',
        links: [{ href: 'https://www.youtube.com/watch?v=HBCLbc7YFB4', label: 'Mujawwad' }, { href: 'https://www.youtube.com/watch?v=0HSDDUQLYtM', label: 'Murattal' }],
        meta: 'Makkan · 62 āyāt' },
      { title: 'Adh-Dhāriyāt', sub: 'الذاريات · The Scattering Winds', tag: 'Sūrah 51', accent: '#a05fd0',
        desc: 'By the winds that scatter: the oaths, Ibrāhīm’s guests and the roasted calf, and the āyah the whole Book can be folded into, that jinn and mankind were created only to worship Him.',
        links: [{ href: 'https://www.youtube.com/watch?v=J-Msz0qn3WQ', label: 'Mujawwad' }, { href: 'https://www.youtube.com/watch?v=gob-JlE-Rec', label: 'Murattal' }],
        meta: 'Makkan · 60 āyāt' },
      { title: 'Al-Mursalāt', sub: 'المرسلات · Those Sent Forth', tag: 'Sūrah 77', accent: '#e0642a',
        desc: 'By those sent forth in gusts: fifty short āyāt and one refrain, woe that Day to the deniers, returning ten times like a bell. Built for a voice like his, and he knew it.',
        links: [{ href: 'https://www.youtube.com/watch?v=LCJHfZ94uEU', label: 'Mujawwad' }, { href: 'https://www.youtube.com/watch?v=c3NAZJmmE0Y', label: 'Murattal' }],
        meta: 'Makkan · 50 āyāt' },
    ] },

  { id: 'quotes', kind: 'quotes', title: 'Two Āyāt', note: 'on the Book itself',
    items: [
      { title: 'Indeed, it is We who sent down the Reminder, and indeed, We will be its guardian.', sub: 'Holy Qurʾān · al-Ḥijr 15:9', accent: '#3fd589' },
      { title: 'And We have certainly made the Qurʾān easy to remember. So is there anyone who will be mindful?', sub: 'Holy Qurʾān · al-Qamar 54:17', accent: '#e0b84f' },
    ] },

  { id: 'links', kind: 'links', title: 'Links', note: 'read it, hear it, build on it',
    items: [
      { title: 'Quran.com', href: 'https://quran.com/',
        desc: 'Every translation, every reading, word-by-word morphology, and the recitations, Minshāwī included.' },
      { title: 'QuranicAudio', href: 'https://quranicaudio.com/',
        desc: 'Full muṣḥaf recordings by reciter. Minshāwī’s murattal and mujawwad are both here.' },
      { title: 'Al-Quran, my app', href: 'https://apps.apple.com/us/developer/abubakr-elmallah/id1690310648',
        desc: 'The beginner-focused Qurʾān app I built, with the colour-coded tajwīd this page describes.' },
      { title: 'Quran Tajweed Engine', href: 'https://github.com/TheAbubakrAbu/Quran-Tajweed-Engine',
        desc: 'My open-source engine: 113,611 computed tajwīd spans across 17 rule categories, in seven languages.' },
    ] },

] };
