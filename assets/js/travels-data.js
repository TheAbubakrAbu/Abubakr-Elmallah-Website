/* travels-data.js: the trips shown on /travels/.

   The gate on that page is a curtain, not a lock. The password sits here in
   plain sight on purpose -- the point is that the list is not the first thing a
   visitor falls over, not that it is secret.

   Per trip:
     grade   the school year I was in, which is how the page groups them
     flags   one per country actually visited, in order
     via     layover country, shown faintly and not counted as a visit
     c1/c2   the two colours its section is drawn in
     look    which backdrop treatment the section gets
     note    why that one mattered */
window.TRAVELS = {
  pass: 'my future wife',
  grades: [
    { k: '9th', name: '9th grade', years: '2020\u201321' },
    { k: '10th', name: '10th grade', years: '2021\u201322' },
    { k: '11th', name: '11th grade', years: '2022\u201323' },
    { k: '12th', name: '12th grade', years: '2023\u201324' },
    { k: '1st yr', name: '1st year of college', years: '2024\u201325' },
    { k: '2nd yr', name: '2nd year of college', years: '2025\u201326' },
  ],
  trips: [
    { when: '2021 Aug', y: '2021', m: 'Aug', grade: '9th', places: 'Puerto Vallarta',
      countries: 'Mexico', flags: '\u{1F1F2}\u{1F1FD}', c1: '#e0763a', c2: '#1f1108', look: 'coast',
      note: 'The first one. Pacific coast, and the trip that started all of this.' },
    { when: '2021 Dec', y: '2021', m: 'Dec', grade: '10th', places: 'Cozumel and Canc\u00fan',
      countries: 'Mexico', flags: '\u{1F1F2}\u{1F1FD}', c1: '#2fc0b0', c2: '#07201f', look: 'reef',
      note: 'The Caribbean side, which is a completely different country from the Pacific side.' },
    { when: '2022 Jul', y: '2022', m: 'Jul', grade: '10th', places: 'T\u00fcrkiye',
      countries: 'T\u00fcrkiye', flags: '\u{1F1F9}\u{1F1F7}', c1: '#e03a3a', c2: '#200a0a', look: 'dome',
      note: 'The first of three trips here. Somewhere I keep going back to.' },
    { when: '2022 Nov', y: '2022', m: 'Nov', grade: '11th', places: 'Spain',
      countries: 'Spain', flags: '\u{1F1EA}\u{1F1F8}', c1: '#e0a83a', c2: '#241703', look: 'arches',
      note: 'Al-Andalus. Eight hundred years of history you can still read in the walls.' },
    { when: '2022 Dec', y: '2022', m: 'Dec', grade: '11th', places: 'Morocco', via: 'France',
      countries: 'Morocco', flags: '\u{1F1F2}\u{1F1E6}', c1: '#c9432f', c2: '#200c07', look: 'desert',
      note: 'Straight across from Spain, and the other half of the same story.' },
    { when: '2023 Jul', y: '2023', m: 'Jul', grade: '11th', places: 'Jordan',
      countries: 'Jordan', flags: '\u{1F1EF}\u{1F1F4}', c1: '#c98f4f', c2: '#1e1408', look: 'canyon',
      note: 'Petra, cut into the rock face, and a desert that does not look like any other desert.' },
    { when: '2023 Nov', y: '2023', m: 'Nov', grade: '12th', places: 'Mecca and Medina', tag: 'Umrah',
      countries: 'Saudi Arabia', flags: '\u{1F54B}\u{1F1F8}\u{1F1E6}', c1: '#d8c68a', c2: '#0d0f14', look: 'haram',
      note: 'The one that is not really a trip. Umrah, and the only entry on this page I would not trade.' },
    { when: '2023 Dec', y: '2023', m: 'Dec', grade: '12th', places: 'Malaysia, Singapore', via: 'Qatar',
      countries: 'Malaysia \u00b7 Singapore', flags: '\u{1F1F2}\u{1F1FE}\u{1F1F8}\u{1F1EC}', c1: '#3fbf7f', c2: '#062014', look: 'skyline',
      note: 'Kuala Lumpur and then Singapore, which is two very different ideas of a city an hour apart.' },
    { when: '2024 Apr', y: '2024', m: 'Apr', grade: '12th', places: 'Portugal',
      countries: 'Portugal', flags: '\u{1F1F5}\u{1F1F9}', c1: '#4fa8d0', c2: '#07161f', look: 'tiles',
      note: 'Lisbon, the tiles, and the hills that make every street a decision.' },
    { when: '2024 Jun', y: '2024', m: 'Jun', grade: '12th', places: 'Italy, Lebanon, T\u00fcrkiye', via: 'Switzerland',
      countries: 'Italy \u00b7 Lebanon \u00b7 T\u00fcrkiye', flags: '\u{1F1EE}\u{1F1F9}\u{1F1F1}\u{1F1E7}\u{1F1F9}\u{1F1F7}', c1: '#5fbf6a', c2: '#081a0c', look: 'ruins',
      note: 'Three countries in one run, right after graduating. The biggest trip on here.' },
    { when: '2024 Dec', y: '2024', m: 'Dec', grade: '1st yr', places: 'Tunisia',
      countries: 'Tunisia', flags: '\u{1F1F9}\u{1F1F3}', c1: '#e04a5f', c2: '#1f070c', look: 'medina',
      note: 'First trip as a college student. Carthage, and a medina you get lost in on purpose.' },
    { when: '2025 Apr', y: '2025', m: 'Apr', grade: '1st yr', places: 'Malta',
      countries: 'Malta', flags: '\u{1F1F2}\u{1F1F9}', c1: '#e8d8a0', c2: '#131519', look: 'limestone',
      note: 'A very small island with an absurd amount of history stacked on it.' },
    { when: '2025 Jul', y: '2025', m: 'Jul', grade: '1st yr', places: 'Balkans, T\u00fcrkiye',
      countries: 'The Balkans \u00b7 T\u00fcrkiye', flags: '\u{1F1E7}\u{1F1E6}\u{1F1F9}\u{1F1F7}', c1: '#7f9fd0', c2: '#0b1220', look: 'mountains',
      note: 'Overland through the Balkans and back to T\u00fcrkiye for the third time.' },
    { when: '2025 Sep', y: '2025', m: 'Sep', grade: '2nd yr', places: 'Maui, Hawaii',
      countries: 'United States', flags: '\u{1F1FA}\u{1F1F8}', c1: '#3fc0a0', c2: '#05201c', look: 'volcano',
      note: 'With friends rather than family, which made it a completely different kind of trip. Technically domestic, and it does not feel domestic at all.' },
    { when: '2025 Nov', y: '2025', m: 'Nov', grade: '2nd yr', places: 'Ecuador',
      countries: 'Ecuador', flags: '\u{1F1EA}\u{1F1E8}', c1: '#f0c840', c2: '#1c1604', look: 'andes',
      note: 'The equator, the Andes, and the first time I had been to South America.' },
    { when: '2025 Dec', y: '2025', m: 'Dec', grade: '2nd yr', places: 'Portugal, Spain', via: 'England',
      countries: 'Portugal \u00b7 Spain', flags: '\u{1F1F5}\u{1F1F9}\u{1F1EA}\u{1F1F8}', c1: '#e0904a', c2: '#1f1207', look: 'arches',
      note: 'Back to both, three years after the first time, and better for knowing what to look for.' },
    { when: '2026 Mar', y: '2026', m: 'Mar', grade: '2nd yr', places: 'Ireland',
      countries: 'Ireland', flags: '\u{1F1EE}\u{1F1EA}', c1: '#4fbf6f', c2: '#061a0e', look: 'cliffs',
      note: 'Green in a way photographs genuinely do not convey.' },
    { when: '2026 Jul', y: '2026', m: 'Jul', grade: '2nd yr', places: 'Japan',
      countries: 'Japan', flags: '\u{1F1EF}\u{1F1F5}', c1: '#e8788f', c2: '#1c0d12', look: 'torii',
      note: 'The most recent one, and the one I had wanted to do the longest.' },
  ]
};
