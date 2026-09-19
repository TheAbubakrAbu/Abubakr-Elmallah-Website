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
     lived   true if this is somewhere I LIVED rather than somewhere I went.
             Three of these, all from before I can remember any of it. They sit
             in the same timeline because they are part of the same story and
             leaving them out would make the early years of this page a blank,
             but they are not trips and the page does not count them as trips:
             the `Trips` figure and the `Driven` figure both skip them, and the
             chip on the entry says "Lived there" so the difference is on the
             page rather than only in this comment. They are filed under Plane
             Travels because that is how you get there, and because a mode
             called Road Trips should not contain a year in Honolulu.
     road    true if it was a drive rather than a flight. A road trip is a trip
             and lives in the same school-year timeline as everything else; the
             flag only earns it the asphalt "Road trip" chip, one figure in the
             summary, and `look: 'road'` if you want the backdrop to match.
             Everything else works unchanged: give it
               countries: 'United States', flags: '\u{1F1FA}\u{1F1F8}'
             and the region badges and the map follow on their own. Use
             `regions: [...]` for what is true of the drive and not of the whole
             country ('Pacific Coast', 'The Southwest', 'Sierra Nevada').
     where   the states or provinces this trip was actually in, as keys into
             `states` below. It exists so the size-and-population block under a
             domestic trip can say "Arizona, 7.3 million" instead of "United
             States, 342 million", which is true of the country and says
             nothing whatever about the trip. Kept apart from `regions` on
             purpose: `regions` feeds the badges and the tallies, where a state
             has no business appearing, and this feeds only the figures.
             Order is the order they are shown in, so a drive reads in the
             order it was driven rather than alphabetically.
     crossed states the drive went through with no photograph to show for it,
             and only where the geography leaves no alternative: Arizona and
             Texas do not touch, so New Mexico happened whether or not anyone
             got the camera out. Shown apart from `where`, and never counted,
             because these are deductions rather than evidence, and the rest of
             this page is built on evidence. A state that is merely probable
             does not go here.
     within  the countries inside a `countries` entry that names a region
             rather than a state, as [flag, name] pairs. 'The Balkans' is one
             line in `world` on purpose (see below), so this is the one place
             the seven countries behind that word are actually spelled out.
             It is shown only in the long section, never in "At a glance",
             and it feeds no tally: the counts still follow `countries`.
     onscreen
             the screen worlds this trip walked into: the filming locations,
             the parks and the stores, grouped by franchise. `lede` is one line
             of what is in the set; each entry in `sets` is { tag, icon, rows,
             quote, by }, and a row is [what, where] or [what, where, which
             film or episode].

             This is the one part of a trip NOT read off the photographs, and
             it is the part most able to be wrong, so it is held to the same
             standard by hand: everything below was checked against the frames
             and the GPS under them before it was written, and where a claim
             could not be checked it was left out rather than guessed. Nara
             Park is in the Japan set because there are photographs of the deer
             at 34.6838, 135.8403; Skellig Michael is NOT in the Ireland set,
             because nothing in that roll shows it.
     citiesOmit
             place names to keep OUT of the city list travels.js reads off the
             shots' own GPS. For a frame that belongs to a trip without being
             somewhere the trip went: the drive home from the airport is the
             last hour of a trip and the town it passes through is not a place
             you visited. Rare, and it should stay rare, or the list stops
             being read off the photographs at all.
     note    why that one mattered
     cover   the one photo the trip's bar shows until it is touched
     shots   every photo from that trip, in date order; touching the cover
             unfolds them as justified rows. Both are paths under
             /assets/img/years/, because the pictures already live in the year
             galleries and this page only points at them. Trips with no shots
             simply have no camera roll from the trip in the galleries.

   NOTHING HERE OWNS A PHOTOGRAPH, so this list can go stale in one direction:
   pull a photo out of a year and the path here dangles. It does not have to be
   edited in step. travels.js checks every shot against years-data.js before it
   draws anything -- a missing shot is dropped, a missing cover falls back to the
   first surviving shot, and a trip left with nothing renders with no photo
   button at all rather than a cover that unfolds into an empty grid. So the only
   thing that ever needs doing is deleting the original and re-running
   `python3 tools/photos.py ingest`; this file catches up on its own. */
window.TRAVELS = {
  pass: 'my future wife',

  /* ── what kind of place each country is ──
     One row per country that appears in a trip's `countries` field, keyed by
     exactly that string. Three families, because they are three different
     sorts of fact and the badges on a trip should not pretend otherwise:

       cont  the continent, the only pure geography here. A country can be in
             two: Türkiye genuinely is in both Europe and Asia, and both count.
       cult  who lives there. `Arab` means Arabic-speaking, which is why
             Morocco and Tunisia are in it; `Muslim` means Muslim-majority.
       reg   the specific region, which is the part worth being precise about:
             Maghreb rather than "Africa", Levant rather than "Middle East".

     travels.js reads this for two things at once: the badges down the right of
     every trip, and the counts in the "What kind of places" block. So a country
     is described in exactly one place and both of them follow. A trip may also
     carry its own `regions: [...]` for something true of that trip and not of
     the whole country: the Caribbean side of Mexico, or Hawaii being Polynesia.

     'The Balkans' is a trip, not a country, and is left out of `cult` on
     purpose: the flag on it is Bosnia and the run also took in Bulgaria, so
     any claim about the majority faith of "The Balkans" would be a claim about
     two different countries at once. */
  world: {
    'Mexico':        { cont: ['North America'], cult: ['Latin America', 'Spanish-speaking'], reg: ['Mesoamerica'] },
    'United States': { cont: ['North America'], cult: [], reg: [] },
    'Canada':        { cont: ['North America'], cult: [], reg: [] },
    'Ecuador':       { cont: ['South America'], cult: ['Latin America', 'Spanish-speaking'], reg: ['Andes', 'The Equator'] },

    'Egypt':         { cont: ['Africa'], cult: ['Arab', 'Muslim'], reg: ['North Africa', 'The Nile'] },
    'Morocco':       { cont: ['Africa'], cult: ['Arab', 'Muslim'], reg: ['Maghreb', 'North Africa'] },
    'Tunisia':       { cont: ['Africa'], cult: ['Arab', 'Muslim'], reg: ['Maghreb', 'North Africa', 'Mediterranean'] },

    'Jordan':        { cont: ['Asia'], cult: ['Arab', 'Muslim'], reg: ['Middle East', 'Levant'] },
    'Lebanon':       { cont: ['Asia'], cult: ['Arab', 'Muslim'], reg: ['Middle East', 'Levant', 'Mediterranean'] },
    'Saudi Arabia':  { cont: ['Asia'], cult: ['Arab', 'Muslim'], reg: ['Middle East', 'Gulf', 'Arabian Peninsula'] },
    'T\u00fcrkiye':      { cont: ['Europe', 'Asia'], cult: ['Muslim'], reg: ['Anatolia', 'Middle East', 'Mediterranean'] },
    'Malaysia':      { cont: ['Asia'], cult: ['Muslim'], reg: ['Southeast Asia'] },
    'Singapore':     { cont: ['Asia'], cult: [], reg: ['Southeast Asia'] },
    'Japan':         { cont: ['Asia'], cult: [], reg: ['East Asia'] },

    'Spain':         { cont: ['Europe'], cult: ['Spanish-speaking'], reg: ['Iberia', 'Southern Europe', 'Mediterranean'] },
    'Portugal':      { cont: ['Europe'], cult: [], reg: ['Iberia', 'Southern Europe'] },
    'Italy':         { cont: ['Europe'], cult: [], reg: ['Southern Europe', 'Mediterranean'] },
    'Malta':         { cont: ['Europe'], cult: [], reg: ['Southern Europe', 'Mediterranean'] },
    'Ireland':       { cont: ['Europe'], cult: [], reg: ['British Isles', 'Northern Europe'] },
    'The Balkans':   { cont: ['Europe'], cult: [], reg: ['Balkans', 'Southeast Europe'] },
  },


  /* ── how big, and how many people, AT THE TIME ──
     One row per place a trip goes, with its area and the population in the
     year that trip happened. The year matters: Egypt in 2007 is not Egypt
     now, and a page that says "118 million" under a trip taken when it was
     84 million is quietly telling you the wrong thing about the trip.

     So `pop` is keyed BY YEAR rather than being one number, and travels.js
     looks up the trip's own `y`. A year that is not in the table falls back to
     the nearest one that is, and says so ("2021 estimate") rather than
     pretending to a precision it does not have.

     area   [square miles, square kilometres]. Total area, land plus inland
            water, which is the conventional figure for a country.
     pop    { '<year>': <people> }, mid-year.

     ── where these come from, and what they are not ──
     Countries: World Bank indicator SP.POP.TOTL (the WDI series, which is
     UN-aligned), and World Bank surface area cross-checked against national
     sources. Every one is a mid-year ESTIMATE, not a census count.
     US states: the Census Bureau's own Population Estimates Program, Vintage
     2025 throughout, whose reference date is 1 July. Vintage matters more
     than it looks: the 2020 estimates were rebased on the actual 2020 census
     afterwards, so Arizona in 2020 is 7.19M on the current vintage and 7.42M
     on the one published at the time. One vintage is used for all of them
     rather than the newest figure available for each, or the states would not
     be comparable with each other.
     Areas for the states are the Census Bureau's State Area Measurements,
     total area including water.

     The three rows before 2010 (New York 2006 and 2007, Hawaii 2007 and 2008)
     come from a different table again: ST-EST00INT-01, the Census Bureau's
     INTERCENSAL estimates for 2000-2010, which were rebenchmarked against the
     2010 census after the fact. They are used rather than the estimates
     published at the time because those drifted badly over the decade and were
     superseded: the 2009-vintage figures overstated New York by about a
     quarter of a million and understated Hawaii by 3 per cent, in opposite
     directions, so mixing the two series on one page would make one state look
     bigger and the other smaller for no reason but which file the number came
     out of.

     ── the three judgement calls in this table ──
     Egypt 2007 is 84.3M here, the World Bank number, and it is worth knowing
     that Egypt's own census authority (CAPMAS) put it at about 73.6M in the
     same year. The ~10M gap is a difference of definition rather than an
     error by either. The World Bank figure is used because every other row
     here is World Bank, and a table that mixes the two bases is worse than
     one that picks the same basis everywhere.
     Morocco's 172,414 sq mi EXCLUDES Western Sahara.
     Michigan is its total area, which includes its share of the Great Lakes;
     its land alone is 56,539 sq mi.

     ── why some years stop short of the trip ──
     There is no 2026 row for the United States and no 2026 row for Hawaii,
     because neither exists yet: the Census Bureau's newest vintage is 2025,
     whose reference date is 1 July 2025, and Vintage 2026 is not published
     until around January 2027. So the 2026 trips fall back to 2025 and the
     page SAYS "2025 estimate" under the figure rather than relabelling a 2025
     number as 2026. Same for Japan, where 2026 is a provisional monthly
     estimate from the Statistics Bureau rather than the World Bank series the
     other countries use, and Ireland, where April 2026 is a real CSO estimate.
     Canada and the provinces are Statistics Canada table 17-10-0009-01 on the
     1 July reference, which is the same basis the World Bank publishes for
     Canada. */
  facts: {
    'Egypt':         { area: [386662, 1001450], pop: { '2007': 84276225 } },
    'Mexico':        { area: [758449, 1964375], pop: { '2018': 124573711, '2021': 127648148, '2022': 128613117 } },
    'Canada':        { area: [3855100, 9984670], pop: { '2015': 35704498, '2017': 36545075 } },
    'Türkiye':      { area: [302535, 783562], pop: { '2022': 84979913, '2024': 85518661, '2025': 85878556 } },
    'Spain':         { area: [195364, 505990], pop: { '2022': 47786102, '2025': 49355143 } },
    'Morocco':       { area: [172414, 446550], pop: { '2022': 37329064 } },
    'Jordan':        { area: [34486, 89342], pop: { '2023': 11439213 } },
    'Saudi Arabia':  { area: [830000, 2149690], pop: { '2023': 33702731 } },
    'Malaysia':      { area: [127653, 330621], pop: { '2023': 35126298 } },
    'Singapore':     { area: [284, 735], pop: { '2023': 5917648 } },
    'Portugal':      { area: [35610, 92230], pop: { '2024': 10694681, '2025': 10804871 } },
    'Italy':         { area: [116631, 302073], pop: { '2024': 58952704 } },
    'Lebanon':       { area: [4036, 10452], pop: { '2024': 5805962 } },
    'Tunisia':       { area: [63170, 163610], pop: { '2024': 12277109 } },
    'Malta':         { area: [122, 316], pop: { '2025': 579704 } },
    'Ireland':       { area: [27133, 70273], pop: { '2026': 5525600 } },
    'Japan':         { area: [145937, 377975], pop: { '2025': 123366734, '2026': 122680000 } },
    'Ecuador':       { area: [109484, 283561], pop: { '2025': 18289896 } },
    'United States': { area: [3796743, 9833520], pop: { '2021': 332100166, '2025': 341784857 } },
    /* The seven inside 'The Balkans'. Summed rather than typed: the trip's
       own `within` list is what says which countries were on it, and these
       are the rows behind that. */
    'The Balkans':   { area: [215189, 557334], pop: { '2025': 39936429 },
                       note: 'the seven countries the trip actually crossed, added together' },
  },

  /* US states and provinces, for the trips inside one country. Same shape and
     same rules as `facts`; kept apart because a state is not a country and
     the counts on this page must never treat it as one. travels.js reads this
     for a trip whose `countries` is the United States or Canada and whose
     `regions` name somewhere in this table. */
  states: {
    'Hawaii':      { area: [10932, 28313], pop: { '2007': 1315675, '2008': 1332213, '2025': 1432820 } },
    'Florida':     { area: [65758, 170312], pop: { '2019': 21492056, '2020': 21591325 } },
    'Nevada':      { area: [110572, 286380], pop: { '2016': 2919555, '2017': 2972097, '2020': 3116851, '2024': 3253543 } },
    'Arizona':     { area: [113990, 295234], pop: { '2020': 7186647, '2021': 7274022, '2024': 7556424 } },
    'Texas':       { area: [268596, 695662], pop: { '2021': 29572672 } },
    'Oregon':      { area: [98379, 254799], pop: { '2020': 4243544 } },
    'Missouri':    { area: [69707, 180540], pop: { '2017': 6111382, '2021': 6172551 } },
    'New York':    { area: [54555, 141297], pop: { '2006': 19104631, '2007': 19132335, '2021': 19835345 } },
    'Massachusetts': { area: [10554, 27336], pop: { '2021': 6996721 } },
    'Michigan':    { area: [96714, 250487], pop: { '2021': 10042362 } },
    'Maryland':    { area: [12406, 32131], pop: { '2021': 6176035 } },
    'New Jersey':  { area: [8723, 22591], pop: { '2021': 9266509 } },
    'Washington, D.C.': { area: [68, 177], pop: { '2021': 669637 } },
    'California':  { area: [163695, 423967], pop: { '2025': 39355309 } },
    'British Columbia': { area: [364764, 944735], pop: { '2015': 4765472 } },
    'Alberta':     { area: [255541, 661848], pop: { '2017': 4237310 } },
  },
  grades: [
    /* The page used to begin at 9th grade because that is where the trips
       began. It now runs back past school entirely: a trip whose `grade`
       matches no row here renders nowhere at all, so Egypt in 2007 needs a row
       of its own even though there was no school year to put it in. */
    { k: 'baby', name: 'Before school', years: '2006\u201308' },
    /* The rows between 'baby' and 7th grade exist because the ROAD TRIPS
       reach back further than the flights do: the drives to Nevada, Victoria
       and Banff are all grade-school, and before those were read off the
       photographs this page had nothing to put in those years.

       Which year a summer belongs to follows what was already here rather than
       the calendar: a trip in July or August is filed under the school year
       that has just ENDED, not the one about to start (Jul 2023 is 11th grade,
       whose row reads 2022-23, and Aug 2021 is 9th, whose row reads 2020-21).
       So the drive to Victoria in July 2015 is 3rd grade, and Banff in August
       2017 is 5th. */
    { k: '3rd', name: '3rd grade', years: '2014\u201315' },
    { k: '4th', name: '4th grade', years: '2015\u201316' },
    { k: '5th', name: '5th grade', years: '2016\u201317' },
    { k: '7th', name: '7th grade', years: '2018\u201319' },
    { k: '8th', name: '8th grade', years: '2019\u201320' },
    { k: '9th', name: '9th grade', years: '2020\u201321' },
    { k: '10th', name: '10th grade', years: '2021\u201322' },
    { k: '11th', name: '11th grade', years: '2022\u201323' },
    { k: '12th', name: '12th grade', years: '2023\u201324' },
    { k: '1st yr', name: '1st year of college', years: '2024\u201325' },
    { k: '2nd yr', name: '2nd year of college', years: '2025\u201326' },
    { k: '3rd yr', name: '3rd year of college', years: '2026\u201327' },
  ],
  trips: [
    /* ── the three places from before I can remember ──
       New York, Egypt and Honolulu, in the order they happened. None of them
       is a trip and none of them is counted as one: see `lived` at the top of
       this file. There are no photographs of the first or the last in the
       galleries, which is why neither has `shots`. */
    { when: '2006', y: '2006', m: '', grade: 'baby', places: 'New York', lived: true,
      countries: 'United States', where: ['New York'], regions: ['The East Coast'],
      flags: '\u{1F1FA}\u{1F1F8}', c1: '#8fa8d8', c2: '#0a0d1a', look: 'road',
      note: 'Where the whole thing starts. Too early for me to have any memory of it or any photograph of my own, so it is on the page as a fact about where I was and nothing more.' },
    /* The one trip on this page that is not reconstructed from its own camera
       roll, because there is barely a camera roll: one frame, no GPS in a
       phone in 2007, and nobody left who was old enough to be asked. So the
       water in the photograph is named because it is known, and Alexandria is
       phrased as the near-certainty it is rather than promoted to a `spot`,
       which everywhere else on this page means somewhere a photograph proves. */
    { when: '2007 Jan', y: '2007', m: 'Jan', grade: 'baby', places: 'Egypt', lived: true,
      countries: 'Egypt', regions: ['Red Sea'],
      flags: '\u{1F1EA}\u{1F1EC}', c1: '#d9a441', c2: '#191206', look: 'desert',
      note: 'The first one of all of them, and the only one I cannot remember: I was not yet one year old. The single frame that survives is me in an inflatable boat on the Red Sea. Almost certainly Alexandria as well, and most of the family map besides, but there is no photograph of any of it and no memory to check it against, so the Red Sea is the only part of this trip I can actually stand behind.',
      spots: [
        ['The Red Sea', ''],
      ],
      cover: 'pre-ms/2007-01-21-1200.avif',
      shots: ['pre-ms/2007-01-21-1200.avif'] },
    { when: '2007 Nov', y: '2007', m: 'Nov', grade: 'baby', places: 'Honolulu, Hawaii', lived: true,
      countries: 'United States', where: ['Hawaii'], regions: ['Pacific', 'Polynesia'],
      flags: '\u{1F33A}\u{1F1FA}\u{1F1F8}', c1: '#5fc8b0', c2: '#04201b', look: 'volcano',
      note: 'A year in Honolulu from about eighteen months old, so the same island I went back to as a tourist in 2026 is one I had already lived on and could not remember a second of. Nothing survives of it in the galleries, which is why this one has no photographs.' },
    /* ── the drives, read off the GPS the same way everything else here is ──
       These were not on the page until the year galleries were searched for
       everywhere outside California the camera has been. Each one below is a
       cluster of located photographs with a road between them: not a single
       distant dot, which is what a flight leaves, but a trail. The Victoria
       run and Banff are the two that reach furthest back, and they are the
       reason this page now starts in grade school rather than in 7th grade. */
    { when: '2015 Jul', y: '2015', m: 'Jul', grade: '3rd', places: 'Victoria, British Columbia', road: true,
      countries: 'Canada', regions: ['Pacific Northwest', 'Vancouver Island'],
      where: ['British Columbia'],
      flags: '\u{1F1E8}\u{1F1E6}', c1: '#6fb0d8', c2: '#06151f', look: 'coast',
      note: 'Up the coast and onto Vancouver Island by ferry. The first time out of the country that was not Mexico, and the first border crossed going north.',
      spots: [
        ['The Inner Harbour', 'Victoria'],
        ['Oak Bay', 'Victoria'],
      ],
      cover: 'pre-ms/2015-07-22-1846.avif',
      shots: ['pre-ms/2015-07-22-1846.avif', 'pre-ms/2015-07-22-2103.avif'] },
    { when: '2016 Apr', y: '2016', m: 'Apr', grade: '4th', places: 'Reno', road: true,
      countries: 'United States', regions: ['Sierra Nevada', 'The Great Basin'],
      where: ['Nevada'],
      flags: '\u{1F1FA}\u{1F1F8}', c1: '#c8a96a', c2: '#191307', look: 'road',
      note: 'North over the Sierra Nevada to Reno. One of the short ones, and the first drive of the several that end in Nevada.',
      cover: 'pre-ms/2016-04-02-1053.avif',
      shots: ['pre-ms/2016-04-02-1053.avif', 'pre-ms/2016-04-02-1200.avif'] },
    { when: '2017 Apr', y: '2017', m: 'Apr', grade: '5th', places: 'Las Vegas', road: true,
      countries: 'United States', regions: ['Mojave Desert', 'The Southwest'],
      where: ['Nevada'],
      flags: '\u{1F1FA}\u{1F1F8}', c1: '#e0b84a', c2: '#1d1505', look: 'road',
      note: 'The drive everybody in Southern California has done: out across the Mojave on the 15 and back.',
      cover: 'pre-ms/2017-04-14-2024.avif',
      shots: ['pre-ms/2017-04-14-2024.avif'] },
    { when: '2017 Jul', y: '2017', m: 'Jul', grade: '5th', places: 'Kansas City', road: true,
      countries: 'United States', regions: ['The Midwest', 'The Great Plains'],
      where: ['Missouri'],
      flags: '\u{1F1FA}\u{1F1F8}', c1: '#7fb87f', c2: '#0a1a0c', look: 'road',
      note: 'Halfway across the country and back. The first of the two long hauls east, four years before the one that went all the way to the Atlantic.',
      cover: 'pre-ms/2017-07-27-1220.avif',
      shots: ['pre-ms/2017-07-27-1220.avif'] },
    { when: '2017 Aug', y: '2017', m: 'Aug', grade: '5th', places: 'Banff, Alberta', road: true,
      countries: 'Canada', regions: ['Canadian Rockies', 'Alberta'],
      where: ['Alberta'],
      flags: '\u{1F1E8}\u{1F1E6}', c1: '#5fc0c8', c2: '#05191d', look: 'mountains',
      note: 'The long way north into the Canadian Rockies, and the long way home: the frame after Banff is Elko, Nevada, two days later and most of a continent south, which is what a drive home looks like in a camera roll.',
      spots: [
        ['The Rockies', 'Alberta'],
      ],
      cover: 'pre-ms/2017-08-19-0947.avif',
      shots: ['pre-ms/2017-08-18-1622.avif', 'pre-ms/2017-08-19-0947.avif',
              'pre-ms/2017-08-21-1000.avif'] },
    { when: '2018 Aug', y: '2018', m: 'Aug', grade: '7th', places: 'Ensenada', road: true,
      countries: 'Mexico', regions: ['Baja California'],
      flags: '\u{1F1F2}\u{1F1FD}', c1: '#c8a24f', c2: '#1a1408', look: 'coast',
      note: 'The earliest one on this page, and the first time crossing a border by car rather than a plane. Down the Baja coast to Ensenada and back in the same trip.' },
    { when: '2019 Dec', y: '2019', m: 'Dec', grade: '8th', places: 'Orlando', road: true,
      countries: 'United States', regions: ['Florida', 'The Deep South'],
      where: ['Florida'],
      flags: '\u{1F1FA}\u{1F1F8}', c1: '#4fb8d8', c2: '#05161d', look: 'road',
      note: 'Christmas at Walt Disney World, the first of two years running. Bay Lake and Four Corners either side of the parks.',
      spots: [
        ['Walt Disney World', 'Bay Lake'],
      ],
      cover: 'ms-middle/2019-12-30-1200.avif',
      shots: ['ms-middle/2019-12-26-0017.avif', 'ms-middle/2019-12-26-0632.avif',
              'ms-middle/2019-12-26-0633.avif', 'ms-middle/2019-12-26-0912.avif',
              'ms-middle/2019-12-26-1235.avif', 'ms-middle/2019-12-26-1535.avif',
              'ms-middle/2019-12-30-1200.avif', 'ms-middle/2019-12-30-1200-2.avif'] },
    { when: '2020 Aug', y: '2020', m: 'Aug', grade: '8th', places: 'Portland and Las Vegas', road: true,
      countries: 'United States', regions: ['Pacific Northwest', 'The Great Basin'],
      where: ['Oregon', 'Nevada'],
      flags: '\u{1F1FA}\u{1F1F8}', c1: '#5fc08f', c2: '#061a12', look: 'road',
      note: 'North on the 5 the whole length of California and back south through Nevada: Williams and Tehama County on the way up, Portland at the top, Las Vegas on the way home. A loop rather than a there-and-back.',
      cover: 'ms-middle/2020-08-04-1820.avif',
      shots: ['ms-middle/2020-08-03-1136.avif', 'ms-middle/2020-08-03-1345.avif',
              'ms-middle/2020-08-03-1524.avif', 'ms-middle/2020-08-03-1717.avif',
              'ms-middle/2020-08-04-1820.avif', 'ms-middle/2020-08-07-1200.avif',
              'ms-middle/2020-08-08-1920.avif', 'ms-middle/2020-08-09-1247.avif',
              'hs-freshman/2020-08-09-1349.avif', 'hs-freshman/2020-08-09-1354.avif',
              'hs-freshman/2020-08-09-1744.avif'] },
    { when: '2020 Nov', y: '2020', m: 'Nov', grade: '9th', places: 'Sedona', road: true,
      countries: 'United States', regions: ['The Southwest', 'Colorado Plateau'],
      where: ['Arizona'],
      flags: '\u{1F1FA}\u{1F1F8}', c1: '#e0763a', c2: '#1d0c05', look: 'desert',
      note: 'Thanksgiving in Arizona: Prescott for the nights, then up through Yavapai County to the red rock at Sedona.',
      spots: [
        ['The red rock', 'Sedona'],
      ],
      cover: 'hs-freshman/2020-11-29-1207.avif',
      shots: ['hs-freshman/2020-11-28-1445.avif', 'hs-freshman/2020-11-29-0631.avif',
              'hs-freshman/2020-11-29-1144.avif', 'hs-freshman/2020-11-29-1207.avif'] },
    { when: '2020 Dec', y: '2020', m: 'Dec', grade: '9th', places: 'Orlando', road: true,
      countries: 'United States', regions: ['Florida', 'The Deep South'],
      where: ['Florida'],
      flags: '\u{1F1FA}\u{1F1F8}', c1: '#7f8fd8', c2: '#0a0d1f', look: 'road',
      note: 'The second Christmas in Orlando in as many years, and the strangest one: the parks in December 2020, at a fraction of the usual crowd. Universal rather than Disney this time, which the GPS under the photographs is unambiguous about: every frame is in the Universal resort, a good ten kilometres from Walt Disney World.',
      spots: [
        ['Universal Studios Florida', 'Orlando'],
        ['Islands of Adventure', 'Orlando'],
        ['CityWalk', 'Orlando'],
      ],
      cover: 'hs-freshman/2020-12-25-1345.avif',
      shots: ['hs-freshman/2020-12-24-1630.avif', 'hs-freshman/2020-12-24-1736.avif',
              'hs-freshman/2020-12-25-1345.avif', 'hs-freshman/2020-12-25-1347.avif',
              'hs-freshman/2020-12-25-1955.avif', 'hs-freshman/2020-12-25-2115.avif',
              'hs-freshman/2020-12-26-1854.avif', 'hs-freshman/2020-12-27-2219.avif',
              'hs-freshman/2020-12-27-2221.avif', 'hs-freshman/2020-12-29-0942.avif'] },
    /* The big one. Three weeks and most of the country: out on the 10 through
       Texas Canyon, across to Dallas, up the eastern seaboard from Washington
       to Boston, then home the northern way through Detroit and Kansas City.
       It is a drive and not a set of flights because the camera roll says so:
       Cochise County, Arizona on the 16th and Addison, Texas on the 19th are
       the interstate, and nothing flies Boston to Detroit to Kansas City to
       Orange County in that order. */
    { when: '2021 Jun', y: '2021', m: 'Jun', grade: '9th', places: 'Across the country', road: true,
      countries: 'United States',
      regions: ['The Southwest', 'The South', 'The East Coast', 'New England', 'The Midwest'],
      /* The states the camera actually stopped in, west to east and back. */
      where: ['Arizona', 'Texas', 'Maryland', 'New Jersey', 'New York',
              'Massachusetts', 'Michigan', 'Missouri'],
      /* States with no photograph that the drive cannot not have crossed.
         Only the ones where the geography leaves no choice, not the ones that
         are merely likely:
           New Mexico   Arizona and Texas do not touch. Nothing connects Tucson
                        to Dallas without crossing it.
           Connecticut  New York and Massachusetts touch only far up the
                        Hudson. Manhattan on the 27th and Boston on the 28th is
                        I-95 or I-84, and both run through Connecticut.
           Ohio         Detroit sits in Michigan's south-east corner. From the
                        east you enter either through Ohio or from Ontario, and
                        the Canadian land border was shut to non-essential
                        travel in June 2021.
           Illinois     Michigan and Missouri do not touch, and every road
                        between Detroit and Kansas City crosses it.
         Pennsylvania, Indiana and Delaware are each very likely and none of
         them is forced, so none of them is here. */
      crossed: ['New Mexico', 'Connecticut', 'Ohio', 'Illinois'],
      flags: '\u{1F1FA}\u{1F1F8}', c1: '#e0a83a', c2: '#1f1605', look: 'road',
      note: 'The longest drive of all of them: Orange County to the Atlantic and back, three weeks, eleven states. Out through Texas Canyon and Dallas, up the seaboard from Washington to Baltimore to New York to Boston, then west again through Detroit and Kansas City. The only trip on this page that crossed the whole continent by road.',
      spots: [
        ['Texas Canyon on the 10', 'Cochise County'],
        ['The National Mall', 'Washington'],
        ['The Inner Harbor', 'Baltimore'],
        ['Manhattan', 'New York'],
        ['Boston', 'Massachusetts'],
        ['Detroit', 'Michigan'],
        ['Kansas City', 'Missouri'],
      ],
      cover: 'hs-freshman/2021-06-27-1310.avif',
      shots: ['hs-freshman/2021-06-14-1531.avif', 'hs-freshman/2021-06-16-1822.avif',
              'hs-freshman/2021-06-19-1314.avif', 'hs-freshman/2021-06-19-1336.avif',
              'hs-freshman/2021-06-19-1529.avif', 'hs-freshman/2021-06-19-1807.avif',
              'hs-freshman/2021-06-20-2027.avif', 'hs-freshman/2021-06-21-1416.avif',
              'hs-freshman/2021-06-24-1451.avif', 'hs-freshman/2021-06-24-1725.avif',
              'hs-freshman/2021-06-25-1530.avif', 'hs-freshman/2021-06-25-1609.avif',
              'hs-freshman/2021-06-26-1324.avif', 'hs-freshman/2021-06-26-1551.avif',
              'hs-freshman/2021-06-26-1810.avif', 'hs-freshman/2021-06-27-1220-2.avif',
              'hs-freshman/2021-06-27-1229.avif', 'hs-freshman/2021-06-27-1231.avif',
              'hs-freshman/2021-06-27-1232.avif', 'hs-freshman/2021-06-27-1310.avif',
              'hs-freshman/2021-06-27-1414.avif', 'hs-freshman/2021-06-28-1540.avif',
              'hs-freshman/2021-06-30-2011.avif', 'hs-freshman/2021-07-02-1459.avif',
              'hs-freshman/2021-07-02-1512.avif', 'hs-freshman/2021-07-02-1626.avif',
              'hs-freshman/2021-07-06-0917.avif'] },
    { when: '2021 Aug', y: '2021', m: 'Aug', grade: '9th', places: 'Puerto Vallarta',
      countries: 'Mexico', regions: ['Pacific Coast'],
      flags: '\u{1F1F2}\u{1F1FD}', c1: '#e0763a', c2: '#1f1108', look: 'coast',
      note: 'The first one. Pacific coast, and the trip that started all of this. Boats out to Los Arcos, hanging bridges over the river at Cabo Corrientes, and quads along the coast road north.',
      spots: [
        ['Los Arcos', 'Boca de Tomatl\u00e1n'],
        ['The hanging bridges', 'Cabo Corrientes'],
        ['Quads above the coast', 'Higuera Blanca'],
        ['Sayulita', 'Nayarit'],
        ['The pirate ship in the harbour', 'Puerto Vallarta'],
      ],
      cover: 'hs-freshman/2021-08-12-1311.avif',
      shots: ['hs-freshman/2021-08-06-1611.avif', 'hs-freshman/2021-08-06-1706.avif',
              'hs-freshman/2021-08-07-1233.avif', 'hs-freshman/2021-08-08-1356.avif',
              'hs-freshman/2021-08-08-1357.avif', 'hs-freshman/2021-08-08-1400.avif',
              'hs-freshman/2021-08-08-1445.avif', 'hs-freshman/2021-08-08-1445-2.avif',
              'hs-freshman/2021-08-08-1447.avif', 'hs-freshman/2021-08-10-2228.avif',
              'hs-freshman/2021-08-12-0822.avif', 'hs-freshman/2021-08-12-0852.avif',
              'hs-freshman/2021-08-12-1118.avif', 'hs-freshman/2021-08-12-1311.avif',
              'hs-freshman/2021-08-12-1340.avif', 'hs-freshman/2021-08-12-1340-2.avif',
              'hs-freshman/2021-08-12-1932.avif', 'hs-freshman/2021-08-12-1944.avif',
              'hs-freshman/2021-08-12-1949.avif', 'hs-freshman/2021-08-12-1949-2.avif',
              'hs-freshman/2021-08-12-2036.avif', 'hs-freshman/2021-08-12-2218.avif',
              'hs-freshman/2021-08-13-0900.avif', 'hs-freshman/2021-08-13-0900-2.avif',
              'hs-freshman/2021-08-13-1548.avif', 'hs-freshman/2021-08-13-1600.avif',
              'hs-freshman/2021-08-13-1600-2.avif', 'hs-freshman/2021-08-13-1610.avif',
              'hs-freshman/2021-08-13-1610-2.avif', 'hs-freshman/2021-08-13-1612.avif',
              'hs-freshman/2021-08-13-1612-2.avif', 'hs-freshman/2021-08-13-1713.avif',
              'hs-freshman/2021-08-13-1713-2.avif', 'hs-freshman/2021-08-13-1725.avif',
              'hs-freshman/2021-08-13-1725-2.avif', 'hs-freshman/2021-08-13-1725-3.avif',
              'hs-freshman/2021-08-14-1756.avif'] },
    { when: '2021 Sep', y: '2021', m: 'Sep', grade: '10th', places: 'Phoenix', road: true,
      countries: 'United States', regions: ['The Southwest', 'Sonoran Desert'],
      where: ['Arizona'],
      flags: '\u{1F1FA}\u{1F1F8}', c1: '#e08a4a', c2: '#1d1006', look: 'desert',
      note: 'Out across the desert to Phoenix. One frame in Maricopa County is all that survives of it.',
      cover: 'hs-sophomore/2021-09-05-1631-2.avif',
      shots: ['hs-sophomore/2021-09-05-1631-2.avif'] },
    { when: '2021 Dec', y: '2021', m: 'Dec', grade: '10th', places: 'Cozumel and Canc\u00fan',
      countries: 'Mexico', regions: ['Caribbean', 'Yucat\u00e1n'],
      flags: '\u{1F1F2}\u{1F1FD}', c1: '#2fc0b0', c2: '#07201f', look: 'reef',
      note: 'The Caribbean side, which is a completely different country from the Pacific side. Cozumel is also the first place I ever drove: a white Jeep, right around the island. Then the ferry across for the mainland, Tulum on its cliff and Chich\u00e9n Itz\u00e1 a long day inland.',
      spots: [
        ['Chich\u00e9n Itz\u00e1', 'Yucat\u00e1n'],
        ['The Tulum ruins', 'Tulum'],
        ['San Gervasio', 'Cozumel'],
        ['El Cedral', 'Cozumel'],
        ['The reef', 'Cozumel'],
        ['San Miguel de Cozumel', 'Cozumel'],
        ['Playa M\u00eda', 'Cozumel'],
        ['The hotel zone', 'Canc\u00fan'],
      ],
      cover: 'hs-sophomore/2021-12-29-1301.avif',
      shots: ['hs-sophomore/2021-12-21-1456.avif', 'hs-sophomore/2021-12-21-1506.avif',
              'hs-sophomore/2021-12-21-1616.avif', 'hs-sophomore/2021-12-21-1628.avif',
              'hs-sophomore/2021-12-21-1635.avif', 'hs-sophomore/2021-12-21-2351.avif',
              'hs-sophomore/2021-12-22-1047.avif', 'hs-sophomore/2021-12-22-1806.avif',
              'hs-sophomore/2021-12-22-1838.avif', 'hs-sophomore/2021-12-22-1907.avif',
              'hs-sophomore/2021-12-22-2035.avif', 'hs-sophomore/2021-12-22-2036.avif',
              'hs-sophomore/2021-12-22-2042.avif', 'hs-sophomore/2021-12-23-1129.avif',
              'hs-sophomore/2021-12-23-1159.avif', 'hs-sophomore/2021-12-23-1212.avif',
              'hs-sophomore/2021-12-23-1300.avif', 'hs-sophomore/2021-12-23-1302.avif',
              'hs-sophomore/2021-12-23-1330.avif', 'hs-sophomore/2021-12-23-1430.avif',
              'hs-sophomore/2021-12-24-1409.avif', 'hs-sophomore/2021-12-24-1411.avif',
              'hs-sophomore/2021-12-24-1442.avif', 'hs-sophomore/2021-12-24-1501.avif',
              'hs-sophomore/2021-12-24-1849.avif', 'hs-sophomore/2021-12-24-1849-2.avif',
              'hs-sophomore/2021-12-24-2036.avif', 'hs-sophomore/2021-12-25-1011.avif',
              'hs-sophomore/2021-12-25-1021.avif', 'hs-sophomore/2021-12-25-1111.avif',
              'hs-sophomore/2021-12-25-1933.avif', 'hs-sophomore/2021-12-26-0944.avif',
              'hs-sophomore/2021-12-26-1227.avif', 'hs-sophomore/2021-12-26-1232.avif',
              'hs-sophomore/2021-12-26-1239.avif', 'hs-sophomore/2021-12-26-1246.avif',
              'hs-sophomore/2021-12-26-1258.avif', 'hs-sophomore/2021-12-26-1319.avif',
              'hs-sophomore/2021-12-26-1700.avif', 'hs-sophomore/2021-12-26-1703.avif',
              'hs-sophomore/2021-12-26-1829.avif', 'hs-sophomore/2021-12-26-1829-2.avif',
              'hs-sophomore/2021-12-26-1836.avif', 'hs-sophomore/2021-12-26-1837.avif',
              'hs-sophomore/2021-12-26-2042.avif', 'hs-sophomore/2021-12-26-2057.avif',
              'hs-sophomore/2021-12-26-2132.avif', 'hs-sophomore/2021-12-26-2137.avif',
              'hs-sophomore/2021-12-26-2138.avif', 'hs-sophomore/2021-12-27-1525.avif',
              'hs-sophomore/2021-12-27-1826.avif', 'hs-sophomore/2021-12-28-1134.avif',
              'hs-sophomore/2021-12-28-1457.avif', 'hs-sophomore/2021-12-28-1841.avif',
              'hs-sophomore/2021-12-29-0900.avif', 'hs-sophomore/2021-12-29-0900-2.avif',
              'hs-sophomore/2021-12-29-0900-3.avif', 'hs-sophomore/2021-12-29-0904.avif',
              'hs-sophomore/2021-12-29-0904-2.avif', 'hs-sophomore/2021-12-29-0905.avif',
              'hs-sophomore/2021-12-29-0905-2.avif', 'hs-sophomore/2021-12-29-0922.avif',
              'hs-sophomore/2021-12-29-0933.avif', 'hs-sophomore/2021-12-29-0935.avif',
              'hs-sophomore/2021-12-29-1218.avif', 'hs-sophomore/2021-12-29-1224.avif',
              'hs-sophomore/2021-12-29-1301.avif', 'hs-sophomore/2021-12-29-1306.avif',
              'hs-sophomore/2021-12-29-1318.avif', 'hs-sophomore/2021-12-29-1327.avif',
              'hs-sophomore/2021-12-29-1339.avif', 'hs-sophomore/2021-12-29-1340.avif',
              'hs-sophomore/2021-12-29-1341.avif', 'hs-sophomore/2021-12-29-1344.avif',
              'hs-sophomore/2021-12-30-1132.avif', 'hs-sophomore/2021-12-30-1133.avif',
              'hs-sophomore/2021-12-30-1228.avif', 'hs-sophomore/2021-12-31-1305.avif',
              'hs-sophomore/2021-12-31-1404.avif', 'hs-sophomore/2021-12-31-1417.avif',
              'hs-sophomore/2021-12-31-1648.avif', 'hs-sophomore/2022-01-01-1247.avif',
              'hs-sophomore/2022-01-01-1438.avif', 'hs-sophomore/2022-01-01-1849.avif',
              'hs-sophomore/2022-01-02-1733.avif'] },
    { when: '2022 Feb', y: '2022', m: 'Feb', grade: '10th', places: 'San Felipe', road: true,
      countries: 'Mexico', regions: ['Baja California', 'Sea of Cortez'],
      flags: '\u{1F1F2}\u{1F1FD}', c1: '#8fa8d8', c2: '#070a14', look: 'road',
      note: 'The drive down to the Sea of Cortez, and a trip of firsts: the first place we stayed in an Airbnb rather than a hotel, the first time the cats came with us, and the first night sky I ever managed to photograph. No light pollution for a hundred miles, so night mode had something to work with and the Milky Way actually came out.',
      spots: [
        ['The Milky Way over the Sea of Cortez', 'San Felipe'],
        ['The house on the beach', 'San Felipe'],
        ['The border at Mexicali', 'Mexicali'],
      ],
      cover: 'hs-sophomore/2022-02-19-2014.avif',
      shots: ['hs-sophomore/2022-02-19-1524.avif', 'hs-sophomore/2022-02-19-1629.avif',
              'hs-sophomore/2022-02-19-1631.avif', 'hs-sophomore/2022-02-19-1632.avif',
              'hs-sophomore/2022-02-19-1632-2.avif', 'hs-sophomore/2022-02-19-1746.avif',
              'hs-sophomore/2022-02-19-1746-2.avif', 'hs-sophomore/2022-02-19-1747.avif',
              'hs-sophomore/2022-02-19-2014.avif', 'hs-sophomore/2022-02-20-0831.avif',
              'hs-sophomore/2022-02-20-0832.avif', 'hs-sophomore/2022-02-20-0832-2.avif',
              'hs-sophomore/2022-02-20-0832-3.avif', 'hs-sophomore/2022-02-20-0834.avif',
              'hs-sophomore/2022-02-20-0834-2.avif', 'hs-sophomore/2022-02-20-0834-3.avif',
              'hs-sophomore/2022-02-20-1047.avif', 'hs-sophomore/2022-02-20-1050.avif',
              'hs-sophomore/2022-02-20-1050-2.avif', 'hs-sophomore/2022-02-20-1050-3.avif',
              'hs-sophomore/2022-02-20-1050-4.avif', 'hs-sophomore/2022-02-20-1050-5.avif',
              'hs-sophomore/2022-02-20-1110.avif', 'hs-sophomore/2022-02-20-1817.avif',
              'hs-sophomore/2022-02-20-1827.avif', 'hs-sophomore/2022-02-20-1827-2.avif',
              'hs-sophomore/2022-02-20-1906.avif', 'hs-sophomore/2022-02-20-1908.avif',
              'hs-sophomore/2022-02-20-1908-2.avif', 'hs-sophomore/2022-02-20-2016.avif',
              'hs-sophomore/2022-02-20-2022.avif', 'hs-sophomore/2022-02-21-0823.avif',
              'hs-sophomore/2022-02-21-0825.avif', 'hs-sophomore/2022-02-21-0838.avif',
              'hs-sophomore/2022-02-21-0838-2.avif', 'hs-sophomore/2022-02-21-1052.avif',
              'hs-sophomore/2022-02-21-1114.avif', 'hs-sophomore/2022-02-21-1156.avif',
              'hs-sophomore/2022-02-21-1335.avif', 'hs-sophomore/2022-02-21-1352.avif',
              'hs-sophomore/2022-02-21-1420.avif'] },
    { when: '2022 Jun', y: '2022', m: 'Jun', grade: '10th', places: 'T\u00fcrkiye',
      countries: 'T\u00fcrkiye', flags: '\u{1F1F9}\u{1F1F7}', c1: '#e03a3a', c2: '#200a0a', look: 'dome',
      note: 'The first of three trips here. Somewhere I keep going back to.',
      spots: [
        ['Hagia Sophia', 'Istanbul'],
        ['Lower D\u00fcden Waterfalls', 'Antalya'],
      ],
      cover: 'hs-sophomore/2022-06-06-1046.avif',
      shots: ['hs-sophomore/2022-06-06-1046.avif', 'hs-sophomore/2022-06-09-1440.avif',
              'hs-sophomore/2022-06-12-1120.avif', 'hs-sophomore/2022-06-13-0948.avif',
              'hs-sophomore/2022-06-13-0957.avif', 'hs-sophomore/2022-06-13-0958.avif',
              'hs-sophomore/2022-06-17-1449.avif'] },
    { when: '2022 Jul', y: '2022', m: 'Jul', grade: '10th', places: 'La Bufadora', road: true,
      countries: 'Mexico', regions: ['Baja California', 'Pacific Coast'],
      flags: '\u{1F1F2}\u{1F1FD}', c1: '#4fb0c8', c2: '#06181f', look: 'cliffs',
      note: 'A day\u2019s drive down the coast for one thing: the blowhole at Ensenada, which fires the swell straight up the cliff face every time a wave lands right.',
      spots: [
        ['La Bufadora', 'Ensenada'],
      ],
      cover: 'hs-sophomore/2022-07-02-1833.avif',
      shots: ['hs-sophomore/2022-07-02-1828.avif', 'hs-sophomore/2022-07-02-1829.avif',
              'hs-sophomore/2022-07-02-1830.avif', 'hs-sophomore/2022-07-02-1832.avif',
              'hs-sophomore/2022-07-02-1833.avif', 'hs-sophomore/2022-07-02-1834.avif',
              'hs-sophomore/2022-07-02-1835.avif', 'hs-sophomore/2022-07-02-1835-2.avif',
              'hs-sophomore/2022-07-02-1837.avif', 'hs-sophomore/2022-07-02-1837-2.avif'] },
    { when: '2022 Nov', y: '2022', m: 'Nov', grade: '11th', places: 'Spain',
      countries: 'Spain', flags: '\u{1F1EA}\u{1F1F8}', c1: '#e0a83a', c2: '#241703', look: 'arches',
      note: 'Al-Andalus. Eight hundred years of history you can still read in the walls.',
      spots: [
        ['The Alhambra', 'Granada'],
        ['Real Alc\u00e1zar', 'Seville'],
        ['Toledo and its Alc\u00e1zar', 'Toledo'],
      ],
      onscreen: {
        lede: 'The other half of the Spanish Star Wars map, four years before the rest of it.',
        sets: [
          { icon: '\u{1F30C}', tag: 'Andor',
            rows: [
              ['Mon Mothma\u2019s estate, Chandrila', 'Montserrat, Catalonia', 'Episodes 1 and 2'],
              ['The Galactic Senate, Coruscant', 'City of Arts and Sciences, Valencia', 'Episodes 4, 6, 7, 9 and 10'],
            ],
            quote: 'I have friends everywhere.', by: 'Luthen Rael' },
          { icon: '\u{1F3DB}', tag: 'Naboo',
            rows: [
              ['Outside the Theed Palace', 'Plaza de Espa\u00f1a, Seville', 'Attack of the Clones'],
            ],
          },
        ] },
      cover: 'hs-junior/2022-11-23-1634.avif',
      shots: ['hs-junior/2022-11-20-0918.avif', 'hs-junior/2022-11-22-0910.avif',
              'hs-junior/2022-11-22-1045-2.avif', 'hs-junior/2022-11-22-1048.avif',
              'hs-junior/2022-11-23-1634.avif', 'hs-junior/2022-11-23-1651.avif',
              'hs-junior/2022-11-23-1656.avif', 'hs-junior/2022-11-24-1558.avif',
              'hs-junior/2022-11-24-1558-2.avif', 'hs-junior/2022-11-25-2007.avif',
              'hs-junior/2022-11-26-0938.avif'] },
    { when: '2022 Dec', y: '2022', m: 'Dec', grade: '11th', places: 'Morocco', via: 'France',
      countries: 'Morocco', flags: '\u{1F1F2}\u{1F1E6}', c1: '#c9432f', c2: '#200c07', look: 'desert',
      note: 'Straight across from Spain, and the other half of the same story.',
      spots: [
        ['Hassan II Mosque', 'Casablanca'],
        ['Aït Benhaddou', 'Ouarzazate'],
        ['The dunes at Merzouga', 'Sahara'],
        ['The souk', 'Marrakesh'],
      ],
      cover: 'hs-junior/2022-12-30-1003.avif',
      /* The trip runs over the turn of the year, so the January frames belong
         to it as much as the December ones: the Sahara at Merzouga, Aït
         Benhaddou and the Marrakesh souk are all on this side of it. */
      shots: ['hs-junior/2022-12-29-2209.avif', 'hs-junior/2022-12-30-0904.avif',
              'hs-junior/2022-12-30-1003.avif', 'hs-junior/2022-12-30-1006.avif',
              'hs-junior/2022-12-30-1241-2.avif', 'hs-junior/2022-12-30-1754.avif',
              'hs-junior/2022-12-30-1829.avif', 'hs-junior/2023-01-01-1232.avif',
              'hs-junior/2023-01-02-1817.avif', 'hs-junior/2023-01-02-1828.avif',
              'hs-junior/2023-01-02-1859.avif', 'hs-junior/2023-01-02-1916.avif',
              'hs-junior/2023-01-03-0932.avif', 'hs-junior/2023-01-03-1140.avif',
              'hs-junior/2023-01-03-1153.avif', 'hs-junior/2023-01-04-1008.avif',
              'hs-junior/2023-01-04-1222.avif', 'hs-junior/2023-01-06-1344.avif'] },
    { when: '2023 Jul', y: '2023', m: 'Jul', grade: '11th', places: 'Jordan',
      countries: 'Jordan', flags: '\u{1F1EF}\u{1F1F4}', c1: '#c98f4f', c2: '#1e1408', look: 'canyon',
      note: 'Petra, cut into the rock face, and a desert that does not look like any other desert.',
      spots: [
        ['The Treasury, Petra', 'Petra'],
      ],
      cover: 'hs-junior/2023-07-02-0938.avif',
      shots: ['hs-junior/2023-07-02-0938.avif', 'hs-junior/2023-07-05-1615.avif',
              'hs-junior/2023-07-05-1615-2.avif', 'hs-junior/2023-07-05-1616.avif',
              'hs-junior/2023-07-05-1617.avif'] },
    { when: '2023 Nov', y: '2023', m: 'Nov', grade: '12th', places: 'Mecca and Medina', tag: 'Umrah',
      countries: 'Saudi Arabia', flags: '\u{1F54B}\u{1F54C}\u{1F1F8}\u{1F1E6}', c1: '#d8c68a', c2: '#0d0f14', look: 'haram',
      note: 'The one that is not really a trip. Umrah, and the only entry on this page I would not trade.',
      spots: [
        ['Masjid al-Haram and the Kaaba', 'Mecca'],
        ['Masjid an-Nabawi', 'Medina'],
        ['Makkah Royal Clock Tower', 'Mecca'],
      ],
      cover: 'hs-senior/2023-11-20-1040.avif',
      shots: ['hs-senior/2023-11-20-0002.avif', 'hs-senior/2023-11-20-0615.avif',
              'hs-senior/2023-11-20-0752.avif', 'hs-senior/2023-11-20-0753.avif',
              'hs-senior/2023-11-20-0938.avif', 'hs-senior/2023-11-20-0942.avif',
              'hs-senior/2023-11-20-1040.avif', 'hs-senior/2023-11-20-2015.avif',
              'hs-senior/2023-11-20-2015-2.avif', 'hs-senior/2023-11-20-2025.avif',
              'hs-senior/2023-11-20-2048.avif', 'hs-senior/2023-11-20-2336.avif',
              'hs-senior/2023-11-21-2114.avif', 'hs-senior/2023-11-21-2316.avif',
              'hs-senior/2023-11-21-2316-2.avif', 'hs-senior/2023-11-22-0018.avif',
              'hs-senior/2023-11-22-0019.avif', 'hs-senior/2023-11-22-1355.avif',
              'hs-senior/2023-11-22-1355-2.avif', 'hs-senior/2023-11-22-1415-2.avif',
              'hs-senior/2023-11-22-1416.avif', 'hs-senior/2023-11-22-1556.avif',
              'hs-senior/2023-11-22-1630.avif', 'hs-senior/2023-11-22-1719.avif',
              'hs-senior/2023-11-24-0914.avif', 'hs-senior/2023-11-24-0925.avif',
              'hs-senior/2023-11-25-0920.avif', 'hs-senior/2023-11-25-1205.avif',
              'hs-senior/2023-11-26-0629.avif'] },
    { when: '2023 Dec', y: '2023', m: 'Dec', grade: '12th', places: 'Malaysia, Singapore', via: 'Qatar',
      countries: 'Malaysia \u00b7 Singapore', flags: '\u{1F1F2}\u{1F1FE}\u{1F1F8}\u{1F1EC}', c1: '#3fbf7f', c2: '#062014', look: 'skyline',
      note: 'Kuala Lumpur and then Singapore, which is two very different ideas of a city an hour apart. Universal Studios Singapore made the list too.',
      spots: [
        ['Universal Studios Singapore', 'Sentosa'],
        ['Riverfront mosque', 'Kuching'],
        ['Orangutan sanctuary', 'Sarawak'],
      ],
      cover: 'hs-senior/2023-12-30-1508.avif',
      shots: ['hs-senior/2023-12-26-1115.avif', 'hs-senior/2023-12-30-1017.avif',
              'hs-senior/2023-12-30-1508.avif', 'hs-senior/2024-01-02-0950.avif',
              'hs-senior/2024-01-05-1115.avif', 'hs-senior/2024-01-05-1320.avif',
              'hs-senior/2024-01-05-1900.avif', 'hs-senior/2024-01-07-1616.avif'] },
    { when: '2024 Feb', y: '2024', m: 'Feb', grade: '12th', places: 'Las Vegas', road: true,
      countries: 'United States', regions: ['Mojave Desert', 'The Southwest'],
      where: ['Nevada'],
      flags: '\u{1F1FA}\u{1F1F8}', c1: '#d8a85f', c2: '#1a1307', look: 'road',
      note: 'The Mojave run again, seven years after the first one.',
      cover: 'hs-senior/2024-02-19-1024.avif',
      shots: ['hs-senior/2024-02-19-1024.avif', 'hs-senior/2024-02-19-1049.avif'] },
    { when: '2024 Apr', y: '2024', m: 'Apr', grade: '12th', places: 'Portugal',
      countries: 'Portugal', flags: '\u{1F1F5}\u{1F1F9}', c1: '#4fa8d0', c2: '#07161f', look: 'tiles',
      note: 'Lisbon, the tiles, and the hills that make every street a decision.',
      spots: [
        ['The clifftop at Nazar\u00e9', 'Nazar\u00e9'],
        ['Arab Room, Pal\u00e1cio da Bolsa', 'Porto'],
      ],
      cover: 'hs-senior/2024-04-04-1503.avif',
      shots: ['hs-senior/2024-04-04-1503.avif', 'hs-senior/2024-04-04-1857.avif',
              'hs-senior/2024-04-06-1559.avif'] },
    { when: '2024 Jul', y: '2024', m: 'Jul', grade: '12th', places: 'Italy, Lebanon, T\u00fcrkiye', via: 'Switzerland',
      countries: 'Italy \u00b7 Lebanon \u00b7 T\u00fcrkiye', flags: '\u{1F1EE}\u{1F1F9}\u{1F1F1}\u{1F1E7}\u{1F1F9}\u{1F1F7}', c1: '#5fbf6a', c2: '#081a0c', look: 'ruins',
      note: 'Three countries in one run, right after graduating. The biggest trip on here.',
      spots: [
        ['The Colosseum', 'Rome'],
        ['The Amalfi Coast', 'Italy'],
        ['San Marco and the lagoon', 'Venice'],
        ['Roman ruins in the Beqaa', 'Lebanon'],
        ['Hagia Sophia', 'Istanbul'],
      ],
      cover: 'hs-senior/2024-07-04-1105.avif',
      shots: ['hs-senior/2024-07-04-1105.avif', 'hs-senior/2024-07-05-0944.avif',
              'hs-senior/2024-07-07-0753.avif', 'hs-senior/2024-07-09-1206.avif',
              'hs-senior/2024-07-15-1006.avif', 'hs-senior/2024-07-17-1530.avif',
              'hs-senior/2024-07-19-1358.avif'] },
    { when: '2024 Nov', y: '2024', m: 'Nov', grade: '1st yr', places: 'Tucson', road: true,
      countries: 'United States', regions: ['The Southwest', 'Sonoran Desert'],
      where: ['Arizona'],
      flags: '\u{1F1FA}\u{1F1F8}', c1: '#c88f5f', c2: '#1a1108', look: 'desert',
      note: 'East on the 10 into Arizona over Thanksgiving.',
      cover: 'uci-first/2024-11-30-0727.avif',
      shots: ['uci-first/2024-11-30-0727.avif'] },
    { when: '2024 Dec', y: '2024', m: 'Dec', grade: '1st yr', places: 'Tunisia',
      countries: 'Tunisia', flags: '\u{1F1F9}\u{1F1F3}', c1: '#e04a5f', c2: '#1f070c', look: 'medina',
      note: 'First trip as a college student. Carthage, and a medina you get lost in on purpose. Also Tatooine: the Mos Espa set, the Lars homestead and Ben Kenobi’s hut are all still standing out here.',
      spots: [
        ['Ancient Carthage', 'Carthage'],
        ['Sidi Bou Said', 'Tunis'],
        ['Al-Zaytuna Mosque', 'Tunis'],
        ['Chott el Djerid', 'Tozeur'],
        ['Chebika oasis', 'Tozeur'],
        ['Ribat of Sousse', 'Sousse'],
        ['The Roman theatre', 'Dougga'],
      ],
      onscreen: {
        lede: 'Tatooine is named after Tataouine in the south of this country, and it is a real place you can stand in. These are the sets.',
        sets: [
          { icon: '\u{1F30C}', tag: 'Tatooine',
            rows: [
              ['Mos Espa', 'Ong Jemel, near Nefta', 'The Phantom Menace and Attack of the Clones'],
              ['The Lars homestead, inside', 'Hotel Sidi Driss, Matmata', 'A New Hope and Attack of the Clones'],
              ['Obi-Wan Kenobi\u2019s hut', 'Near Ajim, Djerba', 'A New Hope'],
              ['Mos Eisley', 'Ajim, Djerba', 'A New Hope'],
              ['Tataouine', 'Southern Tunisia', 'The town the planet is named after'],
            ],
            quote: 'If there\u2019s a bright center to the universe, you\u2019re on the planet that it\u2019s farthest from.', by: 'Luke Skywalker' },
        ] },
      cover: 'uci-first/2024-12-30-1217.avif',
      shots: ['uci-first/2024-12-25-1000.avif', 'uci-first/2024-12-25-1138.avif',
              'uci-first/2024-12-25-1139.avif', 'uci-first/2024-12-25-1154.avif',
              'uci-first/2024-12-25-1455.avif', 'uci-first/2024-12-25-1455-2.avif',
              'uci-first/2024-12-26-1233.avif', 'uci-first/2024-12-26-1537.avif',
              'uci-first/2024-12-27-1018.avif', 'uci-first/2024-12-27-1018-2.avif',
              'uci-first/2024-12-29-0910.avif', 'uci-first/2024-12-29-0910-2.avif',
              'uci-first/2024-12-29-0922.avif', 'uci-first/2024-12-29-1109.avif',
              'uci-first/2024-12-29-1110.avif', 'uci-first/2024-12-29-1111.avif',
              'uci-first/2024-12-29-1116.avif', 'uci-first/2024-12-29-1119.avif',
              'uci-first/2024-12-29-1119-2.avif', 'uci-first/2024-12-29-1120.avif',
              'uci-first/2024-12-29-1121.avif', 'uci-first/2024-12-29-1121-2.avif',
              'uci-first/2024-12-29-1124.avif', 'uci-first/2024-12-29-1124-2.avif',
              'uci-first/2024-12-29-1124-3.avif', 'uci-first/2024-12-29-1125.avif',
              'uci-first/2024-12-29-1130.avif', 'uci-first/2024-12-29-1130-2.avif',
              'uci-first/2024-12-29-1130-3.avif', 'uci-first/2024-12-29-1131.avif',
              'uci-first/2024-12-29-1132.avif', 'uci-first/2024-12-29-1132-2.avif',
              'uci-first/2024-12-29-1133.avif', 'uci-first/2024-12-29-1133-2.avif',
              'uci-first/2024-12-29-1139.avif', 'uci-first/2024-12-29-1139-2.avif',
              'uci-first/2024-12-29-1434.avif', 'uci-first/2024-12-29-1527.avif',
              'uci-first/2024-12-29-1701.avif', 'uci-first/2024-12-29-1704.avif',
              'uci-first/2024-12-29-1704-2.avif', 'uci-first/2024-12-29-1704-3.avif',
              'uci-first/2024-12-29-1706.avif', 'uci-first/2024-12-29-1707.avif',
              'uci-first/2024-12-29-1710.avif', 'uci-first/2024-12-29-1715.avif',
              'uci-first/2024-12-29-1715-2.avif', 'uci-first/2024-12-29-1722.avif',
              'uci-first/2024-12-29-1725.avif', 'uci-first/2024-12-29-1726.avif',
              'uci-first/2024-12-29-1729.avif', 'uci-first/2024-12-30-0857.avif',
              'uci-first/2024-12-30-1054.avif', 'uci-first/2024-12-30-1128.avif',
              'uci-first/2024-12-30-1131.avif', 'uci-first/2024-12-30-1203.avif',
              'uci-first/2024-12-30-1210.avif', 'uci-first/2024-12-30-1211.avif',
              'uci-first/2024-12-30-1212.avif', 'uci-first/2024-12-30-1213.avif',
              'uci-first/2024-12-30-1217.avif', 'uci-first/2024-12-30-1438.avif',
              'uci-first/2024-12-30-1439.avif', 'uci-first/2024-12-30-1440.avif',
              'uci-first/2024-12-30-1440-2.avif', 'uci-first/2024-12-31-1120.avif',
              'uci-first/2024-12-31-1121.avif', 'uci-first/2024-12-31-1122.avif',
              'uci-first/2024-12-31-1123.avif', 'uci-first/2024-12-31-1124.avif',
              'uci-first/2024-12-31-1125.avif', 'uci-first/2024-12-31-1126.avif',
              'uci-first/2024-12-31-1127.avif', 'uci-first/2024-12-31-1128.avif',
              'uci-first/2024-12-31-1128-2.avif', 'uci-first/2024-12-31-1130.avif',
              'uci-first/2024-12-31-1131.avif', 'uci-first/2024-12-31-1131-2.avif',
              'uci-first/2024-12-31-1132.avif', 'uci-first/2024-12-31-1133.avif',
              'uci-first/2024-12-31-1133-2.avif', 'uci-first/2024-12-31-1134.avif',
              'uci-first/2025-01-01-1049.avif', 'uci-first/2025-01-01-1050.avif',
              'uci-first/2025-01-01-1050-2.avif', 'uci-first/2025-01-01-1110.avif',
              'uci-first/2025-01-01-1110-2.avif', 'uci-first/2025-01-01-1112.avif',
              'uci-first/2025-01-01-1157.avif', 'uci-first/2025-01-01-1305.avif',
              'uci-first/2025-01-01-1309.avif', 'uci-first/2025-01-01-1650.avif',
              'uci-first/2025-01-02-0635.avif', 'uci-first/2025-01-03-1001.avif',
              'uci-first/2025-01-03-1001-2.avif', 'uci-first/2025-01-03-1007.avif',
              'uci-first/2025-01-03-1446.avif', 'uci-first/2025-01-03-1448.avif',
              'uci-first/2025-01-04-1232.avif'] },
    { when: '2025 Apr', y: '2025', m: 'Apr', grade: '1st yr', places: 'Malta',
      countries: 'Malta', flags: '\u{1F1F2}\u{1F1F9}', c1: '#e8d8a0', c2: '#131519', look: 'limestone',
      note: 'A very small island with an absurd amount of history stacked on it.',
      cover: 'uci-first/2025-04-17-1833.avif',
      shots: ['uci-first/2025-04-17-1802.avif', 'uci-first/2025-04-17-1833.avif',
              'uci-first/2025-04-19-1241.avif'] },
    { when: '2025 Jul', y: '2025', m: 'Jul', grade: '1st yr', places: 'Balkans, T\u00fcrkiye',
      countries: 'The Balkans \u00b7 T\u00fcrkiye', flags: '\u{1F1E7}\u{1F1E6}\u{1F1F9}\u{1F1F7}', c1: '#7f9fd0', c2: '#0b1220', look: 'mountains',
      note: 'Overland through the Balkans and back to T\u00fcrkiye for the third time.',
      within: [['\u{1F1F7}\u{1F1F4}', 'Romania'],
               ['\u{1F1E7}\u{1F1EC}', 'Bulgaria'],
               ['\u{1F1F2}\u{1F1F0}', 'North Macedonia'],
               ['\u{1F1E6}\u{1F1F1}', 'Albania'],
               ['\u{1F1F2}\u{1F1EA}', 'Montenegro'],
               ['\u{1F1E7}\u{1F1E6}', 'Bosnia and Herzegovina'],
               ['\u{1F1F7}\u{1F1F8}', 'Serbia']],
      spots: [
        ['The Blue Mosque', 'Istanbul'],
        ['Hagia Sophia', 'Istanbul'],
        ['Rila Monastery', 'Bulgaria'],
      ],
      cover: 'uci-first/2025-07-05-1437.avif',
      shots: ['uci-first/2025-07-05-1037.avif', 'uci-first/2025-07-05-1037-2.avif',
              'uci-first/2025-07-05-1049.avif', 'uci-first/2025-07-05-1437.avif',
              'uci-first/2025-07-05-1524.avif', 'uci-first/2025-07-10-0757.avif',
              'uci-first/2025-07-10-0757-2.avif', 'uci-first/2025-07-11-0805.avif',
              'uci-first/2025-07-11-1558.avif', 'uci-first/2025-07-12-0819.avif',
              'uci-first/2025-07-12-1546.avif', 'uci-first/2025-07-17-1057.avif',
              'uci-first/2025-07-20-1632.avif'] },
    { when: '2025 Sep', y: '2025', m: 'Sep', grade: '2nd yr', places: 'Maui, Hawaii',
      countries: 'United States', regions: ['Pacific', 'Polynesia'],
      where: ['Hawaii'],
      /* The last three frames are 23:45 on the 18th, a day after the last Maui
         photograph and in a car at home. They are on the trip because they are
         its coda, not because they are Maui, so Anaheim is kept out of the
         city list below: the trip did not go there. */
      citiesOmit: ['Anaheim'],
      flags: '\u{1F33A}\u{1F1FA}\u{1F1F8}', c1: '#3fc0a0', c2: '#05201c', look: 'volcano',
      note: 'With friends rather than family, which made it a completely different kind of trip. Technically domestic, and it does not feel domestic at all.',
      spots: [
        ['Haleakal\u0101 summit', 'Maui'],
      ],
      cover: 'uci-second/2025-09-16-0733-2.avif',
      shots: ['uci-second/2025-09-11-1048.avif', 'uci-second/2025-09-11-1204.avif',
              'uci-second/2025-09-11-1224.avif', 'uci-second/2025-09-11-1406.avif',
              'uci-second/2025-09-11-1905.avif', 'uci-second/2025-09-11-1905-2.avif',
              'uci-second/2025-09-11-1941.avif', 'uci-second/2025-09-12-0836.avif',
              'uci-second/2025-09-12-1216.avif', 'uci-second/2025-09-12-1436.avif',
              'uci-second/2025-09-12-1436-2.avif', 'uci-second/2025-09-13-1336.avif',
              'uci-second/2025-09-13-1415.avif', 'uci-second/2025-09-13-1655.avif',
              'uci-second/2025-09-13-1700.avif', 'uci-second/2025-09-13-1702.avif',
              'uci-second/2025-09-13-1703.avif', 'uci-second/2025-09-13-1711.avif',
              'uci-second/2025-09-14-0451.avif', 'uci-second/2025-09-14-1509.avif',
              'uci-second/2025-09-15-1338.avif', 'uci-second/2025-09-15-1341.avif',
              'uci-second/2025-09-15-1341-2.avif', 'uci-second/2025-09-15-1347.avif',
              'uci-second/2025-09-15-1438.avif', 'uci-second/2025-09-15-1815.avif',
              'uci-second/2025-09-15-1815-2.avif', 'uci-second/2025-09-15-1830.avif',
              'uci-second/2025-09-15-1830-2.avif', 'uci-second/2025-09-15-1830-3.avif',
              'uci-second/2025-09-15-1830-4.avif', 'uci-second/2025-09-15-1830-5.avif',
              'uci-second/2025-09-15-1830-6.avif', 'uci-second/2025-09-15-1830-7.avif',
              'uci-second/2025-09-15-2012.avif', 'uci-second/2025-09-15-2146.avif',
              'uci-second/2025-09-15-2205.avif', 'uci-second/2025-09-15-2329.avif',
              'uci-second/2025-09-15-2351.avif', 'uci-second/2025-09-16-0733.avif',
              'uci-second/2025-09-16-0733-2.avif', 'uci-second/2025-09-16-1152.avif',
              'uci-second/2025-09-16-1538.avif', 'uci-second/2025-09-16-1613.avif',
              'uci-second/2025-09-16-1643.avif', 'uci-second/2025-09-16-1643-2.avif',
              'uci-second/2025-09-16-1645.avif', 'uci-second/2025-09-16-1651.avif',
              'uci-second/2025-09-16-1701.avif', 'uci-second/2025-09-16-1704.avif',
              'uci-second/2025-09-16-2106.avif', 'uci-second/2025-09-16-2338.avif',
              'uci-second/2025-09-16-2338-2.avif', 'uci-second/2025-09-17-0621.avif',
              'uci-second/2025-09-17-1235.avif', 'uci-second/2025-09-17-1235-2.avif',
              'uci-second/2025-09-18-2345.avif', 'uci-second/2025-09-18-2345-2.avif',
              'uci-second/2025-09-18-2345-3.avif'] },
    { when: '2025 Nov', y: '2025', m: 'Nov', grade: '2nd yr',
      places: 'Ecuador and the Gal\u00e1pagos', via: 'Panama',
      countries: 'Ecuador', regions: ['Gal\u00e1pagos', 'Amazon'],
      flags: '\u{1F1EA}\u{1F1E8}', c1: '#f0c840', c2: '#1c1604', look: 'andes',
      note: 'The equator, the Andes, and the first time I had been to South America. Then out to the Gal\u00e1pagos for five days across San Crist\u00f3bal and Santa Cruz, and back through the Amazon. Panama on both ends, but only ever from the airport and the window seat.',
      spots: [
        ['Mitad del Mundo', 'San Antonio'],
        ['The Inti\u00f1an line', 'San Antonio'],
        ['Giant tortoises in the highlands', 'San Crist\u00f3bal'],
        ['Sea lions on the beach', 'San Crist\u00f3bal'],
        ['Marine iguanas on the lava', 'San Crist\u00f3bal'],
        ['Blue-footed boobies', 'San Crist\u00f3bal'],
        ['Puerto Baquerizo Moreno', 'San Crist\u00f3bal'],
        ['The tortoise reserve in the highlands', 'Santa Cruz'],
        ['Charles Darwin Research Station', 'Puerto Ayora'],
        ['Llamas in the p\u00e1ramo', 'Cuyuja'],
        ['The Amazon at Cotundo', 'Napo'],
        ['Monkeys on the river beach', 'Pununo'],
        ['Waterfalls in the jungle', 'Cotundo'],
        ['The hot springs', 'Papallacta'],
      ],
      cover: 'uci-second/2025-11-24-1028.avif',
      shots: ['uci-second/2025-11-21-1144.avif', 'uci-second/2025-11-21-1735.avif',
              'uci-second/2025-11-21-1936.avif', 'uci-second/2025-11-21-1939.avif',
              'uci-second/2025-11-22-1037.avif', 'uci-second/2025-11-22-1507.avif',
              'uci-second/2025-11-22-1548.avif', 'uci-second/2025-11-22-1603.avif',
              'uci-second/2025-11-22-1616.avif', 'uci-second/2025-11-22-1647.avif',
              'uci-second/2025-11-22-1707.avif', 'uci-second/2025-11-22-1711.avif',
              'uci-second/2025-11-22-1711-2.avif', 'uci-second/2025-11-22-1711-3.avif',
              'uci-second/2025-11-22-1712.avif', 'uci-second/2025-11-23-1334.avif',
              'uci-second/2025-11-23-1402.avif', 'uci-second/2025-11-23-1424.avif',
              'uci-second/2025-11-23-1427.avif', 'uci-second/2025-11-23-1519.avif',
              'uci-second/2025-11-24-0932.avif', 'uci-second/2025-11-24-1019.avif',
              'uci-second/2025-11-24-1027.avif', 'uci-second/2025-11-24-1028.avif',
              'uci-second/2025-11-24-1457.avif', 'uci-second/2025-11-24-1458.avif',
              'uci-second/2025-11-24-1500.avif', 'uci-second/2025-11-24-1500-2.avif',
              'uci-second/2025-11-24-2055.avif', 'uci-second/2025-11-25-1132.avif',
              'uci-second/2025-11-26-1708.avif', 'uci-second/2025-11-27-1238.avif',
              'uci-second/2025-11-27-1520.avif', 'uci-second/2025-11-27-1646.avif',
              'uci-second/2025-11-29-0935.avif', 'uci-second/2025-11-29-0938.avif',
              'uci-second/2025-11-29-1252.avif', 'uci-second/2025-11-29-1331.avif',
              'uci-second/2025-11-29-1333.avif', 'uci-second/2025-11-29-1335.avif',
              'uci-second/2025-11-29-1336.avif', 'uci-second/2025-11-29-1336-2.avif',
              'uci-second/2025-11-29-1507.avif', 'uci-second/2025-11-29-1617.avif',
              'uci-second/2025-11-29-1741.avif', 'uci-second/2025-11-29-1844.avif',
              'uci-second/2025-11-29-1847.avif', 'uci-second/2025-11-29-1917.avif',
              'uci-second/2025-11-29-2209.avif', 'uci-second/2025-11-29-2211.avif',
              'uci-second/2025-11-29-2214.avif', 'uci-second/2025-11-29-2214-2.avif',
              'uci-second/2025-11-29-2214-3.avif', 'uci-second/2025-11-30-0801.avif',
              'uci-second/2025-11-30-0820.avif', 'uci-second/2025-11-30-0826.avif',
              'uci-second/2025-11-30-1114.avif', 'uci-second/2025-11-30-1126.avif',
              'uci-second/2025-11-30-1126-2.avif', 'uci-second/2025-11-30-1256.avif',
              'uci-second/2025-11-30-1308.avif', 'uci-second/2025-11-30-1618.avif',
              'uci-second/2025-11-30-1633.avif', 'uci-second/2025-11-30-1634.avif',
              'uci-second/2025-11-30-1713.avif', 'uci-second/2025-11-30-1713-2.avif',
              'uci-second/2025-12-01-0840.avif', 'uci-second/2025-12-01-1014.avif',
              'uci-second/2025-12-01-1106.avif', 'uci-second/2025-12-01-1109.avif',
              'uci-second/2025-12-01-1123.avif', 'uci-second/2025-12-02-0200.avif',
              'uci-second/2025-12-02-0200-2.avif', 'uci-second/2025-12-02-0200-3.avif',
              'uci-second/2025-12-02-0200-4.avif', 'uci-second/2025-12-02-1252.avif',
              'uci-second/2025-12-02-1253.avif'] },
    { when: '2025 Dec', y: '2025', m: 'Dec', grade: '2nd yr', places: 'Portugal, Spain', via: 'England',
      countries: 'Portugal \u00b7 Spain', flags: '\u{1F1F5}\u{1F1F9}\u{1F1EA}\u{1F1F8}', c1: '#e0904a', c2: '#1f1207', look: 'arches',
      note: 'Back to both, three years after the first time, and better for knowing what to look for.',
      spots: [
        ['Puente Nuevo and El Tajo', 'Ronda'],
        ['The Algarve coast', 'Portugal'],
        ['Big Ben and Parliament', 'London'],
      ],
      onscreen: {
        lede: 'Andor, and the one square that has been Naboo since 2002.',
        sets: [
          { icon: '\u{1F30C}', tag: 'Andor',
            rows: [
              ['The Galactic Senate, Coruscant', 'City of Arts and Sciences, Valencia', 'Episodes 4, 6, 7, 9 and 10'],
              ['Luthen\u2019s flashback', 'X\u00e0tiva', 'Episode 10'],
            ],
            quote: 'Rebellions are built on hope.', by: 'Cassian Andor' },
          { icon: '\u{1F3DB}', tag: 'Naboo',
            rows: [
              ['Outside the Theed Palace', 'Plaza de Espa\u00f1a, Seville', 'Attack of the Clones, 38:40'],
            ],
            quote: 'I think the Republic needs you.', by: 'Anakin Skywalker, inside Theed Palace' },
        ] },
      cover: 'uci-second/2025-12-25-1343.avif',
      shots: ['uci-second/2025-12-21-1938.avif', 'uci-second/2025-12-21-1945.avif',
              'uci-second/2025-12-23-1443.avif', 'uci-second/2025-12-23-1659.avif',
              'uci-second/2025-12-24-1912.avif', 'uci-second/2025-12-24-1913.avif',
              'uci-second/2025-12-24-1913-2.avif', 'uci-second/2025-12-24-1914.avif',
              'uci-second/2025-12-24-1914-2.avif', 'uci-second/2025-12-24-1917.avif',
              'uci-second/2025-12-24-1917-2.avif', 'uci-second/2025-12-24-1918.avif',
              'uci-second/2025-12-24-1919.avif', 'uci-second/2025-12-24-1921.avif',
              'uci-second/2025-12-24-1922.avif', 'uci-second/2025-12-24-1922-2.avif',
              'uci-second/2025-12-24-1930.avif', 'uci-second/2025-12-25-1152.avif',
              'uci-second/2025-12-25-1343.avif', 'uci-second/2025-12-25-1345.avif',
              'uci-second/2025-12-25-1347.avif', 'uci-second/2025-12-25-1352.avif',
              'uci-second/2025-12-25-1353.avif', 'uci-second/2025-12-25-1355.avif',
              'uci-second/2025-12-25-1356.avif', 'uci-second/2025-12-25-1359.avif',
              'uci-second/2025-12-25-1359-2.avif', 'uci-second/2025-12-25-1402.avif',
              'uci-second/2025-12-25-1412.avif', 'uci-second/2025-12-25-1414.avif',
              'uci-second/2025-12-26-1521.avif', 'uci-second/2025-12-26-1524.avif',
              'uci-second/2025-12-26-1941.avif', 'uci-second/2025-12-28-1839.avif',
              'uci-second/2025-12-28-1839-2.avif', 'uci-second/2025-12-29-1429.avif',
              'uci-second/2026-01-02-0922.avif', 'uci-second/2026-01-02-1200.avif',
              'uci-second/2026-01-02-1200-2.avif', 'uci-second/2026-01-02-1200-3.avif',
              'uci-second/2026-01-02-1200-4.avif', 'uci-second/2026-01-02-1200-5.avif',
              'uci-second/2026-01-02-1200-6.avif', 'uci-second/2026-01-02-1200-7.avif',
              'uci-second/2026-01-02-1543.avif', 'uci-second/2026-01-02-1549.avif',
              'uci-second/2026-01-02-1618.avif', 'uci-second/2026-01-02-1630.avif',
              'uci-second/2026-01-02-1630-2.avif', 'uci-second/2026-01-02-1635.avif',
              'uci-second/2026-01-02-1636.avif', 'uci-second/2026-01-02-2226.avif',
              'uci-second/2026-01-02-2231.avif', 'uci-second/2026-01-02-2233.avif',
              'uci-second/2026-01-03-1200.avif', 'uci-second/2026-01-03-1200-2.avif',
              'uci-second/2026-01-03-1200-3.avif', 'uci-second/2026-01-03-1200-4.avif',
              'uci-second/2026-01-03-1200-5.avif', 'uci-second/2026-01-03-1200-6.avif',
              'uci-second/2026-01-03-1200-7.avif', 'uci-second/2026-01-03-1200-8.avif',
              'uci-second/2026-01-03-1350.avif', 'uci-second/2026-01-03-1356.avif',
              'uci-second/2026-01-03-1356-2.avif', 'uci-second/2026-01-03-1359.avif',
              'uci-second/2026-01-03-1403.avif', 'uci-second/2026-01-03-1423.avif',
              'uci-second/2026-01-03-1424.avif', 'uci-second/2026-01-03-1426.avif',
              'uci-second/2026-01-03-1427.avif', 'uci-second/2026-01-03-1427-2.avif',
              'uci-second/2026-01-03-1432.avif', 'uci-second/2026-01-03-1433.avif',
              'uci-second/2026-01-03-1532.avif'] },
    { when: '2026 Apr', y: '2026', m: 'Apr', grade: '2nd yr', places: 'Ireland',
      countries: 'Ireland', flags: '\u{1F1EE}\u{1F1EA}', c1: '#4fbf6f', c2: '#061a0e', look: 'cliffs',
      note: 'Green in a way photographs genuinely do not convey.',
      spots: [
        ['Killarney and its jaunting cars', 'County Kerry'],
      ],
      onscreen: {
        lede: 'Star Wars, Harry Potter and Game of Thrones, and a library that quietly lent its shelves to both.',
        sets: [
          { icon: '\u{1F30C}', tag: 'Star Wars',
            rows: [
              ['Ahch-To, where Luke Skywalker dies', 'Fearann, County Kerry', 'The Last Jedi'],
        ['Ahch-To, Luke Skywalker\u2019s island', 'Skellig Michael, County Kerry', 'The Force Awakens'],
            ],
            quote: 'I will not be the last Jedi.' },
          { icon: '\u26a1', tag: 'Harry Potter',
            rows: [
              ['The Horcrux cave', 'Cliffs of Moher, County Clare', 'The Half-Blood Prince'],
            ],
            quote: 'Do you think the Horcrux is in there, sir?' },
          { icon: '\u{1F43A}', tag: 'Game of Thrones',
            rows: [
              ['Game of Thrones Studio Tour', 'Banbridge, Northern Ireland'],
            ],
            quote: 'The North remembers.' },
          { icon: '\u{1F4DA}', tag: 'The Long Room',
            rows: [
              ['The Long Room, Old Library, Trinity College', 'Dublin', 'The unofficial likeness behind the Jedi Archives on Coruscant, and behind more than one Hogwarts library'],
            ],
          },
        ] },
      cover: 'uci-second/2026-04-07-1050.avif',
      shots: ['uci-second/2026-04-06-0753.avif', 'uci-second/2026-04-07-1045.avif',
              'uci-second/2026-04-07-1050.avif', 'uci-second/2026-04-07-1051.avif',
              'uci-second/2026-04-07-1053.avif', 'uci-second/2026-04-07-1141.avif',
              'uci-second/2026-04-08-0841.avif', 'uci-second/2026-04-08-0841-2.avif',
              'uci-second/2026-04-08-0948.avif', 'uci-second/2026-04-08-1010.avif',
              'uci-second/2026-04-08-1346.avif', 'uci-second/2026-04-08-1600.avif',
              'uci-second/2026-04-08-1600-2.avif', 'uci-second/2026-04-08-1931.avif',
              'uci-second/2026-04-09-1155.avif', 'uci-second/2026-04-09-1305.avif',
              'uci-second/2026-04-11-1153.avif', 'uci-second/2026-04-11-1200.avif',
              'uci-second/2026-04-11-1201.avif', 'uci-second/2026-04-11-1220.avif',
              'uci-second/2026-04-11-1224.avif', 'uci-second/2026-04-11-1225.avif',
              'uci-second/2026-04-11-1227.avif', 'uci-second/2026-04-11-1241.avif',
              'uci-second/2026-04-11-1242.avif', 'uci-second/2026-04-11-1243.avif',
              'uci-second/2026-04-11-1246.avif', 'uci-second/2026-04-11-1252.avif',
              'uci-second/2026-04-11-1309.avif', 'uci-second/2026-04-11-1318.avif',
              'uci-second/2026-04-11-1318-2.avif', 'uci-second/2026-04-11-1321.avif',
              'uci-second/2026-04-11-1321-2.avif', 'uci-second/2026-04-11-1323.avif',
              'uci-second/2026-04-11-1323-2.avif', 'uci-second/2026-04-11-1324.avif',
              'uci-second/2026-04-11-1328.avif', 'uci-second/2026-04-11-1328-2.avif',
              'uci-second/2026-04-11-1332.avif', 'uci-second/2026-04-11-1333.avif',
              'uci-second/2026-04-11-1334.avif', 'uci-second/2026-04-11-1334-2.avif',
              'uci-second/2026-04-11-1336.avif', 'uci-second/2026-04-11-1337.avif',
              'uci-second/2026-04-11-1339.avif', 'uci-second/2026-04-11-1411.avif',
              'uci-second/2026-04-11-1411-3.avif', 'uci-second/2026-04-11-1412.avif',
              'uci-second/2026-04-11-1432.avif', 'uci-second/2026-04-11-1446.avif',
              'uci-second/2026-04-11-1447.avif', 'uci-second/2026-04-11-1756.avif',
              'uci-second/2026-04-11-1757.avif', 'uci-second/2026-04-11-1802.avif',
              'uci-second/2026-04-11-1815.avif', 'uci-second/2026-04-11-1815-2.avif'] },
    { when: '2026 Jul', y: '2026', m: 'Jul', grade: '2nd yr', places: 'Japan',
      countries: 'Japan', flags: '\u{1F1EF}\u{1F1F5}', c1: '#e8788f', c2: '#1c0d12', look: 'torii',
      note: 'The most recent one, and the one I had wanted to do the longest. Both Tokyo Disney parks, Disneyland and DisneySea, plus Universal Studios Japan, all in one trip.',
      spots: [
        ['Kinkaku-ji', 'Kyoto'],
        ['Arashiyama bamboo grove', 'Kyoto'],
        ['Nara Park', 'Nara'],
        ['Art Aquarium', 'Ginza'],
        ['Tokyo Skytree Town', 'Sumida'],
        ['Shibuya Crossing', 'Shibuya'],
        ['A capybara caf\u00e9', 'Shinjuku'],
      ],
      onscreen: {
        lede: 'Star Wars, Harry Potter, Disney, Marvel, Pok\u00e9mon, Nintendo, Stranger Things, Minecraft and Universal Studios, all of it real and all of it walked into.',
        sets: [
          { icon: '\u{1F30C}', tag: 'Star Wars',
            rows: [
              ['Star Wars Pop-Up Store by Shibuya Tsutaya', 'Shibuya, Tokyo'],
              ['The Mandalorian and Grogu displays', 'Shibuya, Tokyo'],
        ['A wall of the Japanese release posters', 'Tokyo Skytree Town'],
            ],
            quote: 'This is the Way.' },
          { icon: '\u26a1', tag: 'Harry Potter',
            rows: [
              ['Warner Bros. Studio Tour Tokyo, The Making of Harry Potter', 'Nerima, Tokyo', 'The Great Hall, Diagon Alley, Platform 9\u00be, the Forbidden Forest, Privet Drive, the Knight Bus and the Ford Anglia'],
              ['The Wizarding World of Harry Potter', 'Universal Studios Japan, Osaka'],
        ['Harry Potter Mahoudokoro', 'Harajuku, Tokyo'],
            ],
            quote: 'Happiness can be found even in the darkest of times, if one only remembers to turn on the light.' },
          { icon: '\u{1F3F0}', tag: 'Disney',
            rows: [
              ['Tokyo Disneyland', 'Urayasu, Chiba'],
              ['Tokyo DisneySea', 'Urayasu, Chiba'],
            ],
          },
          { icon: '\u{1F3AE}', tag: 'Nintendo and Pok\u00e9mon',
            rows: [
              ['Nintendo TOKYO', 'Shibuya PARCO, Tokyo'],
              ['Nintendo OSAKA', 'Umeda, Osaka'],
              ['Super Nintendo World', 'Universal Studios Japan, Osaka'],
              ['Pok\u00e9mon Centers', 'Tokyo DX, Shibuya and Skytree Town in Tokyo, then Kyoto, Osaka and Osaka DX', 'Every one in the three cities but two: Mega Tokyo was shut that summer, and Tokyo-Bay is an hour out in Funabashi'],
              ['Pok\u00e9mon Caf\u00e9', 'Shinsaibashi, Osaka'],
            ],
            quote: 'Gotta catch \u2019em all.' },
          { icon: '\u2728', tag: 'Marvel, Stranger Things and Minecraft',
            rows: [
              ['Marvel store', 'Umeda, Osaka'],
              ['Stranger Things store, Starcourt Mall and Hawkins', 'Expocity, Suita, Osaka'],
              ['Minecraft store', 'Expocity, Suita, Osaka'],
            ],
            quote: 'Friends don\u2019t lie.' },
          { icon: '\u{1F996}', tag: 'Universal Studios Japan',
            rows: [
              ['Jurassic Park', 'Universal Studios Japan, Osaka'],
            ],
            quote: 'Life finds a way.' },
        ] },
      cover: 'uci-second/2026-07-19-1301.avif',
      shots: ['uci-second/2026-07-13-1741.avif', 'uci-second/2026-07-13-1931.avif',
              'uci-second/2026-07-13-2100.avif', 'uci-second/2026-07-14-0941.avif',
              'uci-second/2026-07-14-0959.avif', 'uci-second/2026-07-14-1056.avif',
              'uci-second/2026-07-14-1200.avif', 'uci-second/2026-07-14-1410.avif',
              'uci-second/2026-07-14-1827.avif', 'uci-second/2026-07-15-0925.avif',
              'uci-second/2026-07-15-0948.avif', 'uci-second/2026-07-15-0949.avif',
              'uci-second/2026-07-15-0949-2.avif', 'uci-second/2026-07-15-0953.avif',
              'uci-second/2026-07-15-0953-2.avif', 'uci-second/2026-07-15-0953-3.avif',
              'uci-second/2026-07-15-0955.avif', 'uci-second/2026-07-15-0957.avif',
              'uci-second/2026-07-15-0958.avif', 'uci-second/2026-07-15-1001.avif',
              'uci-second/2026-07-15-1019.avif', 'uci-second/2026-07-15-1019-2.avif',
              'uci-second/2026-07-15-1025.avif', 'uci-second/2026-07-15-1025-2.avif',
              'uci-second/2026-07-15-1028.avif', 'uci-second/2026-07-15-1031.avif',
              'uci-second/2026-07-15-1032.avif', 'uci-second/2026-07-15-1035.avif',
              'uci-second/2026-07-15-1036.avif', 'uci-second/2026-07-15-1036-2.avif',
              'uci-second/2026-07-15-1039.avif', 'uci-second/2026-07-15-1041.avif',
              'uci-second/2026-07-15-1041-2.avif', 'uci-second/2026-07-15-1043.avif',
              'uci-second/2026-07-15-1047.avif', 'uci-second/2026-07-15-1047-2.avif',
              'uci-second/2026-07-15-1047-3.avif', 'uci-second/2026-07-15-1048.avif',
              'uci-second/2026-07-15-1108.avif', 'uci-second/2026-07-15-1108-2.avif',
              'uci-second/2026-07-15-1108-3.avif', 'uci-second/2026-07-15-1109.avif',
              'uci-second/2026-07-15-1110.avif', 'uci-second/2026-07-15-1110-2.avif',
              'uci-second/2026-07-15-1111.avif', 'uci-second/2026-07-15-1112.avif',
              'uci-second/2026-07-15-1113.avif', 'uci-second/2026-07-15-1113-2.avif',
              'uci-second/2026-07-15-1114.avif', 'uci-second/2026-07-15-1115.avif',
              'uci-second/2026-07-15-1116.avif', 'uci-second/2026-07-15-1116-2.avif',
              'uci-second/2026-07-15-1116-3.avif', 'uci-second/2026-07-15-1117.avif',
              'uci-second/2026-07-15-1117-2.avif', 'uci-second/2026-07-15-1135.avif',
              'uci-second/2026-07-15-1137.avif', 'uci-second/2026-07-15-1138.avif',
              'uci-second/2026-07-15-1139.avif', 'uci-second/2026-07-15-1151.avif',
              'uci-second/2026-07-15-1151-2.avif', 'uci-second/2026-07-15-1200.avif',
              'uci-second/2026-07-15-1200-10.avif', 'uci-second/2026-07-15-1200-11.avif',
              'uci-second/2026-07-15-1200-12.avif', 'uci-second/2026-07-15-1200-13.avif',
              'uci-second/2026-07-15-1200-15.avif', 'uci-second/2026-07-15-1200-2.avif',
              'uci-second/2026-07-15-1200-3.avif', 'uci-second/2026-07-15-1200-4.avif',
              'uci-second/2026-07-15-1200-5.avif', 'uci-second/2026-07-15-1200-6.avif',
              'uci-second/2026-07-15-1200-7.avif', 'uci-second/2026-07-15-1200-8.avif',
              'uci-second/2026-07-15-1200-9.avif', 'uci-second/2026-07-15-1209.avif',
              'uci-second/2026-07-15-1209-2.avif', 'uci-second/2026-07-15-1210.avif',
              'uci-second/2026-07-15-1211.avif', 'uci-second/2026-07-15-1214.avif',
              'uci-second/2026-07-15-1301.avif', 'uci-second/2026-07-15-1306.avif',
              'uci-second/2026-07-15-1503.avif', 'uci-second/2026-07-15-1540.avif',
              'uci-second/2026-07-15-1546.avif', 'uci-second/2026-07-16-1200.avif',
              'uci-second/2026-07-16-1200-2.avif', 'uci-second/2026-07-16-1223.avif',
              'uci-second/2026-07-16-1229.avif', 'uci-second/2026-07-16-1231.avif',
              'uci-second/2026-07-16-1232.avif', 'uci-second/2026-07-16-1232-2.avif',
              'uci-second/2026-07-16-1432.avif', 'uci-second/2026-07-16-1653.avif',
              'uci-second/2026-07-16-1653-2.avif', 'uci-second/2026-07-16-2042.avif',
              'uci-second/2026-07-16-2044.avif', 'uci-second/2026-07-17-1200.avif',
              'uci-second/2026-07-17-1300.avif', 'uci-second/2026-07-17-1302.avif',
              'uci-second/2026-07-19-1009.avif', 'uci-second/2026-07-19-1010.avif',
              'uci-second/2026-07-19-1012.avif', 'uci-second/2026-07-19-1012-2.avif',
              'uci-second/2026-07-19-1200.avif', 'uci-second/2026-07-19-1256.avif',
              'uci-second/2026-07-19-1259.avif', 'uci-second/2026-07-19-1301.avif',
              'uci-second/2026-07-19-1555.avif', 'uci-second/2026-07-20-1200.avif',
              'uci-second/2026-07-20-1200-2.avif', 'uci-second/2026-07-20-1200-3.avif',
              'uci-second/2026-07-20-1200-4.avif', 'uci-second/2026-07-20-1200-5.avif',
              'uci-second/2026-07-20-1548.avif', 'uci-second/2026-07-20-1551.avif',
              'uci-second/2026-07-20-1605.avif', 'uci-second/2026-07-20-1605-2.avif',
              'uci-second/2026-07-20-1605-3.avif', 'uci-second/2026-07-20-1605-4.avif',
              'uci-second/2026-07-20-1606.avif', 'uci-second/2026-07-20-1732.avif',
              'uci-second/2026-07-20-1803.avif', 'uci-second/2026-07-20-1849.avif',
              'uci-second/2026-07-20-1850.avif', 'uci-second/2026-07-20-1850-2.avif',
              'uci-second/2026-07-20-1850-3.avif', 'uci-second/2026-07-20-1914.avif',
              'uci-second/2026-07-20-1914-2.avif', 'uci-second/2026-07-20-1917.avif',
              'uci-second/2026-07-21-1200.avif', 'uci-second/2026-07-21-1244.avif',
              'uci-second/2026-07-21-1244-2.avif', 'uci-second/2026-07-21-1349.avif',
              'uci-second/2026-07-21-1350.avif', 'uci-second/2026-07-21-1350-2.avif',
              'uci-second/2026-07-21-1433.avif', 'uci-second/2026-07-21-1444.avif',
              'uci-second/2026-07-21-1444-2.avif', 'uci-second/2026-07-21-1549.avif',
              'uci-second/2026-07-21-1853.avif', 'uci-second/2026-07-21-1921.avif',
              'uci-second/2026-07-27-0111.avif'] },
    /* No `shots` and no `cover` yet: the camera roll is not in the galleries
       yet. That is a supported state rather than a gap to be filled in with a
       placeholder -- travels.js draws the section with no photo button at all
       and the trip reads as a trip. When the photos are ingested, add the
       paths here and everything else on the page follows on its own. */
    { when: '2026 Sep', y: '2026', m: 'Sep', grade: '3rd yr', places: 'Oahu, Hawaii',
      countries: 'United States', regions: ['Pacific', 'Polynesia'],
      where: ['Hawaii'],
      flags: '\u{1F33A}\u{1F1FA}\u{1F1F8}', c1: '#4f9fd8', c2: '#05141f', look: 'volcano',
      note: 'The second Hawaiian island, a year after the first: Honolulu and the rest of Oahu rather than Maui. Photos to come.',
      spots: [
        ['Honolulu', 'Oahu'],
        ['Aulani, a Disney Resort & Spa', 'Kapolei, Oahu'],
      ] },
  ]
};
