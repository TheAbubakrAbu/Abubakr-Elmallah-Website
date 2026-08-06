/* prophets-data.js: the prophets named in the Quran, on /al-islam/.

   Twenty-five are named. They are grouped here by line of descent, which is how
   the Quran itself tends to introduce them -- the first prophets, the ones sent
   to the Arab peoples, the house of Ibrahim, the Israelites who came through
   Ishaq, and finally the one who came through Ismaʿil.

   Where a lineage is disputed between classical scholars the card says so
   rather than picking a side quietly.

   Group fields: id (filter key), label, note, azm (true if the group contains
     one of the five Ulul-ʿAzm)
   Prophet fields:
     name  transliterated name
     en    the English or biblical name, the words 'No biblical equivalent'
           where there is none, and a trailing * where the identification is
           traditional rather than certain (see the footnote on the page)
     meaning  used instead of `en` for the Prophet ﷺ, whose name is described
           rather than translated
     ar    Arabic name, set as the medallion
     sent  who he was sent to
     desc  one or two sentences
     sura  where the story mostly sits
     azm   true for the five of firm resolve */

window.ISL_PROPHETS = [

  { id: 'first', label: 'The First Prophets', note: 'from Adam to the flood',
    people: [
      { name: 'Ādam', en: 'Adam', ar: 'آدم', sent: 'The first man', azm: false,
        desc: 'The first human being and the first prophet, taught the names of all things and made a khalīfah on the earth. The one story every later prophet is measured against.',
        sura: 'Al-Baqarah · Al-Aʿrāf' },
      { name: 'Idrīs', en: 'Enoch*', ar: 'إدريس', sent: 'His people',
        desc: 'Mentioned twice, described as truthful and a prophet, and raised by Allah to a high station. The Quran says very little about him, which is itself notable.',
        sura: 'Maryam 19:56 · Al-Anbiyāʾ' },
      { name: 'Nūḥ', en: 'Noah', ar: 'نوح', azm: true, sent: 'His people, before the flood',
        desc: 'Called his people for nine hundred and fifty years and was believed by very few. The first of the five Ulul-ʿAzm, and the ark is the Quran’s clearest picture of what patience costs.',
        sura: 'Nūḥ · Hūd' },
    ] },

  { id: 'arab', label: 'Sent to the Arabs', note: 'ʿĀd, Thamūd and Madyan',
    people: [
      { name: 'Hūd', en: 'No biblical equivalent', ar: 'هود', sent: 'The people of ʿĀd',
        desc: 'Sent to ʿĀd in the sand dunes of al-Aḥqāf, a people the Quran describes as built like no other. They refused him and the wind took them.',
        sura: 'Hūd · Al-Aḥqāf' },
      { name: 'Ṣāliḥ', en: 'No biblical equivalent', ar: 'صالح', sent: 'The people of Thamūd',
        desc: 'Sent to Thamūd, who carved homes into the rock. They asked for a sign, were given the she-camel, and hamstrung it.',
        sura: 'Al-Aʿrāf · Ash-Shams' },
      { name: 'Shuʿayb', en: 'Jethro*', ar: 'شعيب', sent: 'The people of Madyan',
        desc: 'Sent to Madyan, who cheated in weights and measures. The one prophet whose message is mostly about commercial honesty, which the Quran treats as a matter of belief rather than manners.',
        sura: 'Al-Aʿrāf · Hūd' },
    ] },

  { id: 'ibrahim', label: 'The House of Ibrāhīm', note: 'and the two sons',
    people: [
      { name: 'Ibrāhīm', en: 'Abraham', ar: 'إبراهيم', azm: true, sent: 'His father, and Nimrod',
        desc: 'Khalīlullāh, the friend of Allah, and the father of the line every prophet after him comes from. Broke the idols, was thrown into the fire, and was told to leave his wife and infant son in an empty valley.',
        sura: 'Ibrāhīm · Al-Anbiyāʾ' },
      { name: 'Lūṭ', en: 'Lot', ar: 'لوط', sent: 'The people of Sodom',
        desc: 'Ibrāhīm’s nephew, who believed in him and emigrated with him, then was sent to a people whose crime the Quran says no nation had committed before them.',
        sura: 'Hūd · Al-ʿAnkabūt' },
      { name: 'Ismāʿīl', en: 'Ishmael', ar: 'إسماعيل', sent: 'Makkah',
        desc: 'The son of the sacrifice, left as an infant in the valley of Makkah with Hājar, and the one who raised the foundations of the Kaʿbah with his father. The Arabs descend from him.',
        sura: 'Aṣ-Ṣāffāt · Al-Baqarah' },
      { name: 'Isḥāq', en: 'Isaac', ar: 'إسحاق', sent: 'The promised son',
        desc: 'Promised to Ibrāhīm and Sārah in their old age, and the beginning of the Israelite line. The Quran gives his birth as good news delivered by angels on their way to Lūṭ.',
        sura: 'Hūd · Aṣ-Ṣāffāt' },
    ] },

  { id: 'israel', label: 'The Israelites', note: 'the line through Isḥāq',
    people: [
      { name: 'Yaʿqūb', en: 'Jacob', ar: 'يعقوب', sent: 'Israel',
        desc: 'Isrāʾīl himself, son of Isḥāq, and father of the twelve tribes. The Quran shows him mostly as a father who lost a son and never stopped expecting him back.',
        sura: 'Yūsuf' },
      { name: 'Yūsuf', en: 'Joseph', ar: 'يوسف', sent: 'Egypt',
        desc: 'The only prophet whose story is told in one continuous sūrah, which the Quran itself calls the best of stories. The well, the house of al-ʿAzīz, the prison, the famine, and a forgiveness at the end that costs him something.',
        sura: 'Yūsuf 12' },
      { name: 'Ayyūb', en: 'Job', ar: 'أيوب', sent: 'Patience under trial',
        desc: 'Lost his wealth, his family and his health, and is remembered for the shortest possible complaint: that harm had touched him, and Allah is the most merciful. Classical scholars differ on exactly where he sits in the lineage.',
        sura: 'Al-Anbiyāʾ · Ṣād' },
      { name: 'Mūsā', en: 'Moses', ar: 'موسى', azm: true, sent: 'Firʿawn and Banī Isrāʾīl',
        desc: 'Kalīmullāh, the one Allah spoke to directly. Named more than any other prophet in the Quran, and the only one whose life is told from the basket in the river to the end.',
        sura: 'Al-Qaṣaṣ · Ṭāhā' },
      { name: 'Hārūn', en: 'Aaron', ar: 'هارون', sent: 'With Mūsā',
        desc: 'Mūsā’s elder brother, asked for by name as a helper because he was clearer of speech. Left in charge and blamed for the calf, and the Quran clears him.',
        sura: 'Ṭāhā · Al-Aʿrāf' },
      { name: 'Dhul-Kifl', en: 'Ezekiel*', ar: 'ذو الكفل', sent: 'Named among the patient',
        desc: 'Named only twice, both times in a short list of the steadfast. Scholars differ over who he was; the name itself means the one who took on a pledge and kept it.',
        sura: 'Al-Anbiyāʾ · Ṣād' },
      { name: 'Dāwūd', en: 'David', ar: 'داود', sent: 'Given the Zabūr',
        desc: 'Killed Jālūt as a young man, was given the Zabūr, and had iron made soft in his hands. The mountains and the birds joined him when he praised Allah.',
        sura: 'Ṣād · Al-Anbiyāʾ' },
      { name: 'Sulaymān', en: 'Solomon', ar: 'سليمان', sent: 'A kingdom like no other after him',
        desc: 'Dāwūd’s son, given the wind, the jinn, and the speech of birds and ants, and a kingdom he asked would belong to no one after him. Died leaning on his staff without the jinn noticing.',
        sura: 'An-Naml · Ṣād' },
      { name: 'Ilyās', en: 'Elijah', ar: 'إلياس', sent: 'Against the worship of Baʿl',
        desc: 'Sent to a people who had taken Baʿl as a god, and the Quran preserves his question to them: will you call on Baʿl and leave the best of creators.',
        sura: 'Aṣ-Ṣāffāt 37:123' },
      { name: 'Al-Yasaʿ', en: 'Elisha', ar: 'اليسع', sent: 'After Ilyās',
        desc: 'Named twice among the chosen and the excellent. Understood to have succeeded Ilyās among the same people.',
        sura: 'Al-Anʿām · Ṣād' },
      { name: 'Yūnus', en: 'Jonah', ar: 'يونس', sent: 'Nīnawā',
        desc: 'Left his people before he was permitted to, was swallowed, and made the duʿāʾ from inside the darkness. The only nation in the Quran that believed after the warning and was spared.',
        sura: 'Yūnus · Aṣ-Ṣāffāt' },
      { name: 'Zakariyyā', en: 'Zechariah', ar: 'زكريا', sent: 'Guardian of Maryam',
        desc: 'Prayed quietly for an heir in his old age and was answered. His sign was that he could not speak to people for three nights, though he was sound.',
        sura: 'Maryam · Āl ʿImrān' },
      { name: 'Yaḥyā', en: 'John the Baptist', ar: 'يحيى', sent: 'A name given to no one before him',
        desc: 'Given wisdom while still a child, and described with the same three-part greeting the Quran gives ʿĪsā: peace on the day he was born, the day he dies, and the day he is raised.',
        sura: 'Maryam 19' },
      { name: 'ʿĪsā', en: 'Jesus', ar: 'عيسى', azm: true, sent: 'Banī Isrāʾīl',
        desc: 'Son of Maryam, born without a father, who spoke from the cradle and was given the Injīl. Not crucified but raised to Allah, and he will return.',
        sura: 'Āl ʿImrān · Maryam' },
    ] },

  { id: 'ismail', label: 'The Line of Ismāʿīl', note: 'and the seal of them all', azm: true,
    people: [
      { name: 'Muḥammad ﷺ', ar: 'محمد', azm: true, sent: 'All of mankind',
        meaning: 'The name is not translated, it is described: from the root ḥ-m-d, “praise”. Muḥammad means the one who is praised, and praised repeatedly: the intensive form, not simply “praised” once.',
        desc: 'Khātam an-Nabiyyīn, the seal of the prophets, descended from Ismāʿīl and sent not to one people but to everyone. The last of the five Ulul-ʿAzm, and the answer to the duʿāʾ Ibrāhīm made while building the Kaʿbah.',
        sura: 'Al-Aḥzāb 33:40' },
    ] },

];
