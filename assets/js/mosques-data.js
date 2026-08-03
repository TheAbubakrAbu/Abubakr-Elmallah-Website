/* mosques-data.js: the mosques on /al-islam/.
   Every mosque is drawn as an SVG elevation by islam.js (no photographs), so
   each entry describes the architecture as much as the history.

   Fields (all optional unless noted):
     name    required: display name
     ar      required: Arabic name
     place   required: city · country
     year    required: founded / built, short label
     desc    required: one or two sentences
     style   required: which elevation islam.js draws:
             kaaba nabawi aqsa dome-rock ottoman mughal mamluk andalusi
             ifriqiya maghribi persian sahel chinese gulf slab modern early
     colors  required: { wall, dome, trim, arch, glow }
     minarets number of minarets to draw (default per style)
     stats   feature cards only: [[label, value], …]
     note    small caveat line (e.g. a building that is no longer a mosque) */

window.ISL_MOSQUES = {

  /* ═══════════ the three holy mosques ═══════════ */
  holy: [
    {
      name: 'Al-Masjid al-Ḥarām', ar: 'المسجد الحرام', place: 'Makkah · Saudi Arabia',
      year: 'The Kaʿbah, raised by Ibrāhīm & Ismāʿīl',
      style: 'kaaba', minarets: 4,
      colors: { wall: '#d8cfbc', dome: '#0d0d10', trim: '#d9b45f', arch: '#1a1712', glow: '#e8c56a' },
      desc: 'The house every Muslim turns to five times a day, and the only mosque where the prayer is offered in a circle rather than a line. The Kaʿbah stands at its centre under the kiswah; the mosque around it has been rebuilt and widened for fourteen centuries and now holds well over a million worshippers.',
      stats: [['Qiblah for', 'the whole ummah'], ['Ṭawāf', 'never stops'], ['Reward', '100,000× a prayer']],
    },
    {
      name: 'Al-Masjid an-Nabawī', ar: 'المسجد النبوي', place: 'Madinah · Saudi Arabia',
      year: 'Built 1 AH / 622 CE by the Prophet ﷺ',
      style: 'nabawi', minarets: 4,
      colors: { wall: '#e6dcc4', dome: '#2f8f5f', trim: '#d9b45f', arch: '#2a231a', glow: '#4fd08f' },
      desc: 'The Prophet ﷺ built it with his own hands when he arrived in Madinah: palm trunks, mud walls, a roof of fronds. The Green Dome now stands over his resting place, and between his pulpit and his house lies the Rawḍah, which he called a garden from the gardens of Paradise.',
      stats: [['Built by', 'the Prophet ﷺ'], ['The Rawḍah', 'a garden of Jannah'], ['Reward', '1,000× a prayer']],
    },
    {
      name: 'Al-Masjid al-Aqṣā', ar: 'المسجد الأقصى', place: 'Jerusalem · Palestine',
      year: 'The first qiblah · Umayyad rebuild 705 CE',
      style: 'aqsa', minarets: 4,
      colors: { wall: '#dcd2bb', dome: '#8f9aa3', trim: '#d9b45f', arch: '#241f17', glow: '#c9b06a' },
      desc: 'The first of the two qiblahs and the third of the three mosques worth travelling to. The whole walled compound is Al-Masjid al-Aqṣā: the silver-grey Qiblī Mosque at its south end, the golden Dome of the Rock at its centre, and the night journey of Isrāʾ and Miʿrāj in its history.',
      stats: [['First qiblah', 'before the Kaʿbah'], ['Isrāʾ & Miʿrāj', 'the night journey'], ['Reward', '500× a prayer']],
    },
  ],

  /* ═══════════ everywhere else ═══════════ */
  famous: [
    { name: 'Masjid Qubāʾ', ar: 'مسجد قباء', place: 'Madinah · Saudi Arabia', year: '1 AH / 622',
      style: 'early', minarets: 4,
      colors: { wall: '#efe7d4', dome: '#f4efe2', trim: '#c9a95f', arch: '#2a231a', glow: '#e8d9a8' },
      desc: 'The first mosque built in Islam. Praying two rakʿahs here is written as the reward of an ʿumrah.' },

    { name: 'Masjid al-Qiblatayn', ar: 'مسجد القبلتين', place: 'Madinah · Saudi Arabia', year: '2 AH / 623',
      style: 'early', minarets: 2,
      colors: { wall: '#efe7d4', dome: '#e8e2d2', trim: '#c9a95f', arch: '#2a231a', glow: '#e0d0a0' },
      desc: 'The mosque of the two qiblahs, the revelation came mid-prayer and the congregation turned from Jerusalem to Makkah where they stood.' },

    { name: 'Dome of the Rock', ar: 'قبة الصخرة', place: 'Jerusalem · Palestine', year: '691',
      style: 'dome-rock', minarets: 0,
      colors: { wall: '#3f7f8f', dome: '#e0b44f', trim: '#d9b45f', arch: '#1f2a2e', glow: '#f0c96a' },
      desc: 'The oldest Islamic monument still standing, built by ʿAbd al-Malik over the rock at the heart of the Aqṣā compound.',
      note: 'A shrine within Al-Masjid al-Aqṣā, not a separate mosque.' },

    { name: 'Great Mosque of Kairouan', ar: 'جامع القيروان', place: 'Kairouan · Tunisia', year: '670',
      style: 'ifriqiya', minarets: 1,
      colors: { wall: '#d8c9a8', dome: '#cbbd9c', trim: '#b09a5f', arch: '#2a2318', glow: '#d8bd7a' },
      desc: 'Founded by ʿUqbah ibn Nāfiʿ, the oldest mosque in the Maghrib, and the square minaret every North African mosque copied afterwards.' },

    { name: 'Umayyad Mosque', ar: 'الجامع الأموي', place: 'Damascus · Syria', year: '715',
      style: 'early', minarets: 3,
      colors: { wall: '#ded3b8', dome: '#c9c0ad', trim: '#c9a95f', arch: '#251f16', glow: '#d8c48f' },
      desc: 'Built by al-Walīd ibn ʿAbd al-Malik, with the golden mosaics of the courtyard and the Minaret of ʿĪsā on its south-east corner.' },

    { name: 'Mosque of Córdoba', ar: 'مسجد قرطبة', place: 'Córdoba · al-Andalus', year: '785',
      style: 'andalusi', minarets: 1,
      colors: { wall: '#e0c9a8', dome: '#d8bd94', trim: '#b04f3f', arch: '#2a1f16', glow: '#d89a5f' },
      desc: 'A forest of eight hundred columns under double horseshoe arches of red brick and white stone, the peak of Andalusi building.',
      note: 'A cathedral since 1236; the arches remain.' },

    /* ───────────────────────────────────────────────────────────────
       Parked, not deleted. This list ran to nineteen mosques and swamped the
       three that matter; uncomment any block to put it back on the page.
       The Shāh Mosque of Isfahan was removed outright: it is a Safavid Shīʿī
       foundation, and this page stays with Sunnī mosques.
       ─────────────────────────────────────────────────────────────── */
    // { name: 'Al-Azhar', ar: 'الجامع الأزهر', place: 'Cairo · Egypt', year: '972',
    // style: 'mamluk', minarets: 3,
    // colors: { wall: '#e2d5b6', dome: '#d0c3a2', trim: '#c9a95f', arch: '#261f15', glow: '#e0c07a' },
    // desc: 'A mosque that became a university and never stopped teaching, a thousand years of ḥalaqāt in the same courtyard.' },

    // { name: 'Great Mosque of Xi’an', ar: 'مسجد شيان', place: 'Xi’an · China', year: '742 · rebuilt 1392',
    // style: 'chinese', minarets: 1,
    // colors: { wall: '#c9a37f', dome: '#4f6b52', trim: '#b0743f', arch: '#221a12', glow: '#c98f5f' },
    // desc: 'Timber halls, tiled pagoda roofs and a garden courtyard: a mosque built entirely in the Chinese architectural language.' },

    // { name: 'Great Mosque of Djenné', ar: 'مسجد جينيه', place: 'Djenné · Mali', year: '13th c. · rebuilt 1907',
    // style: 'sahel', minarets: 3,
    // colors: { wall: '#c98f5f', dome: '#b07a4f', trim: '#8f5f33', arch: '#2a1a10', glow: '#e0a068' },
    // desc: 'The largest mud-brick building on earth, replastered every year by the whole town in a single day.' },

    // { name: 'Süleymaniye', ar: 'جامع السليمانية', place: 'Istanbul · Türkiye', year: '1557',
    // style: 'ottoman', minarets: 4,
    // colors: { wall: '#d6cdb8', dome: '#9aa8b0', trim: '#c9a95f', arch: '#221d16', glow: '#a8c4d6' },
    // desc: 'Sinān’s great Istanbul mosque: one vast dome carried on semi-domes, and the acoustics still argued about by engineers.' },

    // { name: 'Selimiye', ar: 'جامع السليمية', place: 'Edirne · Türkiye', year: '1575',
    // style: 'ottoman', minarets: 4,
    // colors: { wall: '#dad1bc', dome: '#8f9fb0', trim: '#c9a95f', arch: '#221d16', glow: '#9fbcd6' },
    // desc: 'Sinān called this one his masterwork: a single dome wider than Hagia Sophia’s, on eight piers, with four pencil minarets.' },

    // { name: 'Sultan Ahmed Mosque', ar: 'جامع السلطان أحمد', place: 'Istanbul · Türkiye', year: '1616',
    // style: 'ottoman', minarets: 6,
    // colors: { wall: '#d4ccbb', dome: '#7f97ad', trim: '#c9a95f', arch: '#1f1c17', glow: '#7fb0e0' },
    // desc: 'The Blue Mosque: twenty thousand İznik tiles inside, and the six minarets that caused a small scandal in Makkah.' },

    // { name: 'Jāmiʿ Masjid', ar: 'الجامع المسجد', place: 'Delhi · India', year: '1656',
    // style: 'mughal', minarets: 2,
    // colors: { wall: '#b0563f', dome: '#e8e2d2', trim: '#d9b45f', arch: '#2a1710', glow: '#e08a5f' },
    // desc: 'Shāh Jahān’s red sandstone congregational mosque, with a courtyard for twenty-five thousand.' },

    // { name: 'Bādshāhī Mosque', ar: 'المسجد البادشاهي', place: 'Lahore · Pakistan', year: '1673',
    // style: 'mughal', minarets: 4,
    // colors: { wall: '#a84f3a', dome: '#efe8d6', trim: '#d9b45f', arch: '#2a1710', glow: '#e8845f' },
    // desc: 'Three marble domes over red sandstone, and for three hundred years the largest mosque in the world.' },

    // { name: 'Ḥassan II Mosque', ar: 'مسجد الحسن الثاني', place: 'Casablanca · Morocco', year: '1993',
    // style: 'maghribi', minarets: 1,
    // colors: { wall: '#e0d5bd', dome: '#4f8f7a', trim: '#2f7f5f', arch: '#22201a', glow: '#5fc9a0' },
    // desc: 'Built out over the Atlantic, with a 210-metre minaret: the tallest in the world, and a roof that opens to the sky.' },

    // { name: 'Fayṣal Mosque', ar: 'مسجد الملك فيصل', place: 'Islamabad · Pakistan', year: '1986',
    // style: 'modern', minarets: 4,
    // colors: { wall: '#e2e2e0', dome: '#cfd4d8', trim: '#9aa8b0', arch: '#20242a', glow: '#a8c4d6' },
    // desc: 'No dome at all: a bedouin tent in white concrete under the Margalla Hills, with four pencil minarets at its corners.' },

    // { name: 'Sheikh Zayed Grand Mosque', ar: 'جامع الشيخ زايد', place: 'Abu Dhabi · UAE', year: '2007',
    // style: 'gulf', minarets: 4,
    // colors: { wall: '#f2efe6', dome: '#ffffff', trim: '#c9a95f', arch: '#252a30', glow: '#cfe0ff' },
    // desc: 'Eighty-two white marble domes, the largest hand-knotted carpet ever made, and floors inlaid with flowers in stone.' },

    // { name: 'Istiqlāl Mosque', ar: 'مسجد الاستقلال', place: 'Jakarta · Indonesia', year: '1978',
    // style: 'slab', minarets: 1,
    // colors: { wall: '#e6e6e2', dome: '#d0d8dc', trim: '#8f9aa0', arch: '#20242a', glow: '#9fd6c9' },
    // desc: 'The largest mosque in South-East Asia, named for independence, and deliberately built facing the cathedral across the road.' },

  ],
};
