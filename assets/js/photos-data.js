/* photos-data.js: my own photographs, sorted by what they are OF.

   THE POINT: the fan pages are otherwise entirely drawn -- type, colour and
   CSS, no artwork. The one honest exception is a photograph of me actually
   standing in the place, so /franchises/star-wars/ can show the saber I built
   at Savi's Workshop rather than describing it, and the Disney page can say
   "I went here" under a park and prove it.

   NOTHING HERE OWNS A PHOTOGRAPH. Every `src` is a <group>/<file> path into
   the year galleries under /assets/img/years/, the same set years-data.js and
   travels-data.js point at. One encode of each file, one copy on disk, and a
   visitor who has already seen it in a gallery does not download it twice.

   So this file can go stale in exactly one direction: delete a photo from
   _originals/ and re-run `python3 tools/photos.py ingest`, and the path here
   dangles. That is handled rather than policed -- fanpage.js drops an <img>
   that fails to load (see the error handler at the foot of it), so a missing
   photo leaves no broken glyph behind and nothing needs editing in step.

   Keyed by the SAME tag the page already carries on <body data-fan="...">,
   which is what lets fanpage.js find a page's photographs without its data
   file mentioning them. Add a tag here and the section appears; add nothing
   and the page renders exactly as it did before.

     fandom.<tag>  the "I Have Actually Been" gallery, spliced in above Links
     parks.<id>    one photo for one park card, pulled in by `photo:` in
                   fan-disney.js / fan-universal.js under the "I went here"
                   stamp

   Every identification here was made by looking at the photograph itself,
   not inferred from its file name or its date. Where the frame did not settle
   which park it was, it is not claimed. */
window.MYPHOTOS = {

  /* ── the fan pages ── keyed by <body data-fan="..."> */
  fandom: {

    /* The big one, and the only fandom on this site with a whole country
       attached to it: the Tatooine sets are still standing in southern
       Tunisia and I went to three of them. */
    sw: [
      { src: 'uci-first/2024-12-29-1139-2.avif',
        title: 'Mos Espa',
        desc: 'The Phantom Menace spaceport, built at Ong Jemel outside Nefta in 1997 and never taken down. Domed huts, moisture vaporators, and the sand slowly taking it back.',
        when: 'Dec 2024 · Tunisia' },
      { src: 'uci-first/2024-12-31-1133.avif',
        title: 'The Lars homestead',
        desc: 'Hotel Sidi Driss in Matmata is a real troglodyte hotel, and its sunken courtyard is the interior of Owen and Beru’s house. They still sell blue milk in it.',
        when: 'Dec 2024 · Tunisia' },
      { src: 'uci-first/2025-01-01-1112.avif',
        title: 'Ben Kenobi’s hut',
        desc: 'Alone on the shore at Ajim on Djerba, with Invader’s tiled Obi-Wan mosaic set into the wall.',
        when: 'Jan 2025 · Tunisia' },
      { src: 'hs-senior/2024-06-02-2048-2.avif',
        title: 'The saber I built',
        desc: 'Savi’s Workshop in Black Spire Outpost, then out under the Millennium Falcon with it lit.',
        when: 'June 2024 · Disneyland' },
      { src: 'hs-junior/2023-01-21-1829.avif',
        title: 'The Falcon, at night',
        desc: 'Smugglers Run with the full-size Falcon behind, and the Batuu spires lit blue.',
        when: 'Jan 2023 · Galaxy’s Edge' },
      { src: 'uci-second/2025-09-18-2228.avif',
        title: 'Oga’s Cantina',
        desc: 'In the booth under the blast door.',
        when: 'Sept 2025 · Batuu' },
      { src: 'pre-ms/2017-12-10-1928.avif',
        title: 'Meeting Vader',
        desc: 'Star Wars Launch Bay in Tomorrowland: Vader, Kylo Ren, Chewbacca, BB-8 and Rey, and Boba Fett the summer after.',
        when: 'Dec 2017 · Disneyland' },
      { src: 'uci-second/2026-04-08-1200-10.avif',
        title: 'Ahch-To',
        desc: 'Luke’s meditation rock on the Irish coast, sat the way he sits in The Last Jedi.',
        when: 'Apr 2026 · Ireland' },
      { src: 'uci-second/2026-04-11-1200-2.avif',
        title: 'The Jedi Archives',
        desc: 'The Long Room at Trinity College Dublin, which is the Archives on Coruscant in Attack of the Clones. Same vault, same colonnade.',
        when: 'Apr 2026 · Dublin' },
      { src: 'uci-second/2026-04-08-1931.avif',
        title: '“Star Wars Fearann”',
        desc: 'The hand-painted sign on the coast road pointing at the meditation rock. Irish and English, and no studio had anything to do with it.',
        when: 'Apr 2026 · Ireland' },
      { src: 'uci-second/2025-12-24-1921.avif',
        title: 'Theed, on Naboo',
        desc: 'Plaza de España in Seville is the palace plaza in Attack of the Clones. Phone held up against the real thing.',
        when: 'Dec 2025 · Seville' },
      { src: 'uci-second/2026-01-03-1200-8.avif',
        title: 'Andor, in Valencia',
        desc: 'The City of Arts and Sciences stands in for Coruscant across four episodes of season two. My frames, cut against the stills.',
        when: 'Jan 2026 · Valencia' },
      { src: 'uci-second/2026-01-02-1200-5.avif',
        title: 'Andor, at Xàtiva',
        desc: 'The castle above Xàtiva, matched to episode ten the same way.',
        when: 'Jan 2026 · Xàtiva' },
      { src: 'uci-first/2025-08-03-2225.avif',
        title: 'An X-wing helmet',
        desc: 'Outside the Star Wars Trading Post at Downtown Disney.',
        when: 'Aug 2025 · Anaheim' },
      { src: 'uci-first/2025-08-03-1946.avif',
        title: 'The collection',
        desc: 'Purple, white, green, pink, blue, and a Maul-style saberstaff. Dual-wielded on a hillside over the city lights.',
        when: 'Aug 2025' },
      { src: 'uci-first/2024-10-06-1456.avif',
        title: 'LA Comic Con',
        desc: 'Star Wars cosplayers, and one more saber home.',
        when: 'Oct 2024 · Los Angeles' },
      { src: 'uci-second/2026-07-16-2044.avif',
        title: 'The Mandalorian, in Shibuya',
        desc: 'The Star Wars pop-up by Shibuya Tsutaya, with the Mando and Grogu archway.',
        when: 'July 2026 · Tokyo' },
      { src: 'uci-second/2026-07-27-2041.avif',
        title: 'Vader II, premiere night',
        desc: 'Star Wars Theory’s fan film. Red carpet, a Vader and a clone trooper in costume, poster in hand.',
        when: 'July 2026' },
    ],

    /* Two Wizarding Worlds and the studio tour, plus the house I got sorted
       into and never argued with. */
    hp: [
      { src: 'hs-freshman/2020-12-25-1347.avif',
        title: 'Hogsmeade, Orlando',
        desc: 'Hogwarts Castle on the rock at Islands of Adventure, and the Hogwarts Express under steam at the station.',
        when: 'Dec 2020 · Florida' },
      { src: 'hs-freshman/2020-12-24-1630.avif',
        title: 'Diagon Alley',
        desc: 'Potage’s Cauldron Shop, behind the London facade at Universal Studios Florida. Still the best-realised themed land anywhere.',
        when: 'Dec 2020 · Florida' },
      { src: 'uci-second/2026-07-15-1214.avif',
        title: 'Studio Tour Tokyo',
        desc: 'The Making of Harry Potter, set by set: the Great Hall, the moving staircase, Platform 9¾ with the Hogwarts Express, Diagon Alley, and 4 Privet Drive.',
        when: 'July 2026 · Tokyo' },
      { src: 'hs-freshman/2021-07-25-1826.avif',
        title: 'Studio Tour Hollywood',
        desc: 'The Privet Drive letter storm, the Sorting Hat in the Great Hall, and the Triwizard Cup.',
        when: 'July 2021 · Burbank' },
      { src: 'hs-freshman/2021-06-27-1414.avif',
        title: 'Harry Potter New York',
        desc: 'The flagship store on Broadway, within weeks of it opening.',
        when: 'June 2021 · New York' },
      { src: 'uci-second/2026-07-15-1200-8.avif',
        title: 'Undesirable No. 1',
        desc: 'The Ministry wanted poster they print with your own face on it.',
        when: 'July 2026 · Tokyo' },
      { src: 'uci-second/2026-07-21-1853.avif',
        title: 'Hogwarts, above the pines',
        desc: 'The castle at dusk in the Wizarding World at Universal Studios Japan.',
        when: 'July 2026 · Osaka' },
      { src: 'ms-middle/2020-01-26-1615.avif',
        title: 'Hogsmeade, the first time',
        desc: 'Universal Studios Hollywood, with the village map and a wand.',
        when: 'Jan 2020 · Hollywood' },
      { src: 'uci-second/2026-07-15-1503.avif',
        title: 'Harry Potter Harajuku',
        desc: 'The flagship store, in the Mirror-of-Erised alcove.',
        when: 'July 2026 · Tokyo' },
      { src: 'uci-second/2026-08-07-1838.avif',
        title: 'Hogwarts Railways',
        desc: 'A full-size Hogwarts Express carriage, boarded in a Hogwarts crest shirt, which is the correct outfit.',
        when: 'Aug 2026' },
      { src: 'uci-second/2025-10-15-1344.avif',
        title: 'Ravenclaw',
        desc: 'Sorted years ago and never disputed it.',
        when: 'Oct 2025' },
    ],

    /* Every Jurassic Park gate I have walked through has been a Universal
       one, which is the closest anybody gets. */
    jp: [
      { src: 'uci-second/2026-07-21-1444.avif',
        title: 'The Discovery Restaurant',
        desc: 'Under the mounted T. rex at Universal Studios Japan, in the Jurassic Park zone.',
        when: 'July 2026 · Osaka' },
      { src: 'uci-second/2026-07-21-1349.avif',
        title: 'The gate, and the jeep',
        desc: 'The stone arch, a Jurassic Park jeep and a gyrosphere, with The Flying Dinosaur wrapped round the lagoon behind it.',
        when: 'July 2026 · Osaka' },
      { src: 'hs-senior/2024-01-05-1320.avif',
        title: 'The Lost World',
        desc: 'The carved log gate at Universal Studios Singapore, with the river ride track overhead.',
        when: 'Jan 2024 · Sentosa' },
      { src: 'uci-first/2025-03-21-2102.avif',
        title: '“They were here first”',
        desc: 'The tee I have worn to death.',
        when: '2025' },
    ],

    /* One studio tour, and it turned out to be a full day. */
    got: [
      { src: 'uci-second/2026-04-11-1412.avif',
        title: 'The Iron Throne',
        desc: 'The Studio Tour at Linen Mill Studios in Banbridge, where the sets actually stood.',
        when: 'Apr 2026 · Northern Ireland' },
      { src: 'uci-second/2026-04-11-1446.avif',
        title: 'The Studio Tour',
        desc: 'Winterfell interiors, the Chamber of the Painted Table, the Hall of Faces, and the Armoury with Longclaw and Ice in it.',
        when: 'Apr 2026 · Banbridge' },
      { src: 'uci-second/2026-04-11-1339.avif',
        title: 'The Night’s Watch',
        desc: 'Dressed for the Wall, briefly.',
        when: 'Apr 2026 · Banbridge' },
    ],

    /* Japan has a Pokémon Center roughly every four hundred metres and I found
       most of them. */
    pokemon: [
      { src: 'uci-second/2026-07-20-1551.avif',
        title: 'Pokémon Center Osaka DX',
        desc: 'Articuno, Zapdos and Moltres over the door, and the card tables inside.',
        when: 'July 2026 · Osaka' },
      { src: 'uci-second/2026-07-16-1432.avif',
        title: 'Pokémon Center Tokyo DX',
        desc: 'Snorlax, Pikachu and Mew.',
        when: 'July 2026 · Tokyo' },
      { src: 'uci-second/2026-07-15-1546.avif',
        title: 'Mewtwo, in Shibuya',
        desc: 'The containment tube at the Shibuya Parco centre, minutes after Nintendo TOKYO.',
        when: 'July 2026 · Tokyo' },
      { src: 'uci-second/2026-07-16-2042.avif',
        title: 'Rayquaza',
        desc: 'Coiled under the storefront sign.',
        when: 'July 2026 · Japan' },
      { src: 'uci-second/2026-07-20-1606.avif',
        title: 'The Pokémon Café',
        desc: 'Chef Pikachu on the door.',
        when: 'July 2026 · Osaka' },
      { src: 'hs-senior/2024-06-20-1731.avif',
        title: 'Three sheets of stickers',
        desc: 'All of them on my face, in a bookshop.',
        when: 'June 2024' },
    ],

    /* The first fandom, and the one with the longest paper trail. */
    lego: [
      { src: 'pre-ms/2016-09-04-0905.avif',
        title: 'LEGOLAND California',
        desc: 'Under the sign. Several visits across about a decade, and a stay at the hotel later.',
        when: 'Sept 2016 · Carlsbad' },
      { src: 'pre-ms/2016-07-06-1841-3.avif',
        title: 'NINJAGO World',
        desc: 'Opening year: Master Wu brick-built at full height, the dojo, and the elemental dragons.',
        when: 'July 2016 · LEGOLAND' },
      { src: 'pre-ms/2016-07-06-1932.avif',
        title: 'Hoth, in Miniland',
        desc: 'The Star Wars Miniland AT-AT scene, before they took it out.',
        when: 'July 2016 · LEGOLAND' },
      { src: 'pre-ms/2016-06-26-1915.avif',
        title: 'Brick-built Batman',
        desc: 'Cowl, cape, and a yellow stud base.',
        when: 'June 2016 · LEGOLAND' },
      { src: 'hs-sophomore/2021-12-02-1703.avif',
        title: 'Boba Fett’s helmet',
        desc: 'Set 75277, on the top shelf. Still there three years later.',
        when: 'Dec 2021' },
      { src: 'hs-senior/2023-10-28-2102.avif',
        title: 'The UCS Venator',
        desc: 'Studying it through the LEGO Store glass, as one does.',
        when: 'Oct 2023' },
      { src: 'ms-middle/2020-07-19-1417.avif',
        title: 'The LEGOLAND Hotel',
        desc: 'The Adventure room, and a brick-built Lloyd in the lobby.',
        when: 'July 2020 · Carlsbad' },
    ],

    ninjago: [
      { src: 'pre-ms/2016-07-06-1841-3.avif',
        title: 'Master Wu welcomes you',
        desc: 'NINJAGO World the year it opened, with the ride marquee and the character panels.',
        when: 'July 2016 · LEGOLAND' },
      { src: 'pre-ms/2016-06-26-1520.avif',
        title: 'The dojo',
        desc: 'Lloyd, Jay, Kai and Cole at full size, and the golden weapons lit up.',
        when: 'June 2016 · LEGOLAND' },
      { src: 'pre-ms/2017-09-03-1830.avif',
        title: 'The sand sculpture',
        desc: 'The LEGO Ninjago Movie, carved in sand at the Port of San Diego. “In theaters 9.22.”',
        when: 'Sept 2017 · San Diego' },
    ],

    mcu: [
      { src: 'hs-sophomore/2022-01-29-1458.avif',
        title: 'Avengers Campus',
        desc: 'The Collector’s Fortress behind me and the Quinjet on the roof of Avengers HQ.',
        when: 'Jan 2022 · California Adventure' },
      { src: 'hs-sophomore/2022-05-08-1636.avif',
        title: 'Mission: BREAKOUT!',
        desc: 'The Tivan Collection, and the tower that used to be the Tower of Terror.',
        when: 'May 2022 · Avengers Campus' },
      { src: 'hs-sophomore/2022-01-29-1511.avif',
        title: 'The gauntlet',
        desc: 'Drinking out of it, which is the correct use of an Infinity Gauntlet.',
        when: 'Jan 2022 · Avengers Campus' },
      { src: 'pre-ms/2018-08-10-1200.avif',
        title: 'Loki',
        desc: 'Full horned helmet, on a New York street set.',
        when: 'Aug 2018 · Disneyland Resort' },
      { src: 'hs-senior/2024-04-20-1503.avif',
        title: 'Thanos',
        desc: 'On the plinth of a very large Funko, gold gauntlet and all, at Funko Hollywood.',
        when: 'Apr 2024 · Hollywood' },
      { src: 'uci-second/2026-04-05-1908-2.avif',
        title: 'The Hulk',
        desc: 'Life-size, on a green-lit staircase in a collectibles shop.',
        when: 'Apr 2026' },
    ],

    spidey: [
      { src: 'uci-second/2026-07-31-0208.avif',
        title: 'Brand New Day, opening night',
        desc: 'In ScreenX, beside the lit poster, in the black-suit tee. Worth the midnight showing.',
        when: 'July 2026' },
      { src: 'pre-ms/2018-08-10-1200-2.avif',
        title: 'With great power',
        desc: 'Web-shooters up beside the Daily Bugle box, and the wall painted with the line.',
        when: 'Aug 2018 · Disneyland Resort' },
      { src: 'uci-second/2026-07-20-1803.avif',
        title: 'Wall-crawling, in Osaka',
        desc: 'Life-size, up the wall of the Marvel store.',
        when: 'July 2026 · Osaka' },
    ],

    potc: [
      { src: 'hs-sophomore/2022-05-07-1658.avif',
        title: 'Fifty-five years of it',
        desc: 'The anniversary mural at Disneyland, painted with the dog and the keys and the line the pirates never stop shouting.',
        when: 'May 2022 · Disneyland' },
    ],

    batman: [
      { src: 'pre-ms/2016-06-26-1915.avif',
        title: 'Batman in bricks',
        desc: 'Life-size and brick-built, at LEGOLAND California.',
        when: 'June 2016 · Carlsbad' },
    ],

    st: [
      { src: 'uci-second/2026-07-20-1850.avif',
        title: 'Welcome to Hawkins',
        desc: 'A Stranger Things pop-up in an Osaka department store: the Starcourt sign, a Demogorgon, and a Steve cutout.',
        when: 'July 2026 · Osaka' },
    ],

    mc: [
      { src: 'uci-second/2026-07-20-1917.avif',
        title: '“Everything Minecraft”',
        desc: 'A whole shop of it, grass-block storefront included.',
        when: 'July 2026 · Osaka' },
    ],

    indiana: [
      { src: 'hs-junior/2023-07-02-0938.avif',
        title: 'The Canyon of the Crescent Moon',
        desc: 'Al-Khazneh at Petra, which is the Temple of the Holy Grail in The Last Crusade. It is a facade cut into the rock and nothing behind it.',
        when: 'July 2023 · Jordan' },
      { src: 'uci-second/2025-12-26-1521.avif',
        title: 'The fedora and the jacket',
        desc: 'An Indiana Jones exhibition staged inside a church in Spain, with a walkable Temple of Doom rope bridge at the end of it.',
        when: 'Dec 2025 · Spain' },
    ],

    /* Deliberately NOT the same frames the park cards above them carry: the
       cards prove the visit, this is everything else from the same days. */
    disney: [
      { src: 'pre-ms/2017-10-29-1824-3.avif',
        title: 'The Fun Wheel',
        desc: 'Mickey’s face on the wheel over Paradise Pier, back when California Screamin’ was still called that.',
        when: 'Oct 2017 · California Adventure' },
      { src: 'pre-ms/2017-12-10-1853.avif',
        title: 'Star Wars Launch Bay',
        desc: 'BB-8 and Rey with a Jakku speeder, and Vader, Chewbacca and Boba Fett over two visits.',
        when: 'Dec 2017 · Disneyland' },
      { src: 'pre-ms/2018-08-21-1528.avif',
        title: 'Tomorrowland',
        desc: 'Under the Astro Orbitor, in a Disneyland Resort shirt, aged twelve.',
        when: 'Aug 2018 · Disneyland' },
      { src: 'hs-sophomore/2022-01-29-1458.avif',
        title: 'Avengers Campus',
        desc: 'The Collector’s Fortress, and the Quinjet parked on the roof of Avengers HQ.',
        when: 'Jan 2022 · California Adventure' },
      { src: 'uci-second/2026-05-06-1801.avif',
        title: 'Licence of Tomorrow',
        desc: 'The Autopia licence. I have three of them now, collected about a decade apart.',
        when: 'May 2026 · Disneyland' },
      { src: 'ms-middle/2020-07-12-1245.avif',
        title: 'The year it shut',
        desc: 'Alone on the esplanade in front of the California Adventure marquee, with the gates closed behind it.',
        when: 'July 2020 · Anaheim' },
      { src: 'uci-first/2025-08-03-2225.avif',
        title: 'The Trading Post',
        desc: 'Downtown Disney, in an X-wing pilot helmet.',
        when: 'Aug 2025 · Anaheim' },
    ],

    universal: [
      { src: 'hs-freshman/2021-05-09-1610.avif',
        title: 'The Jurassic World arch',
        desc: 'Universal Studios Hollywood, the week it reopened.',
        when: 'May 2021 · Hollywood' },
      { src: 'ms-middle/2020-06-14-1251.avif',
        title: 'The globe, Hollywood',
        desc: 'The fountain and the arch in June 2020, with the park shut behind them.',
        when: 'June 2020 · Hollywood' },
      { src: 'hs-freshman/2020-12-29-0942.avif',
        title: 'Springfield, USA',
        desc: 'The Simpsons Ride at Universal Studios Florida, Christmas 2020.',
        when: 'Dec 2020 · Orlando' },
      { src: 'hs-freshman/2020-12-26-1854.avif',
        title: 'Marvel Super Hero Island',
        desc: 'The Incredible Hulk Coaster at Islands of Adventure.',
        when: 'Dec 2020 · Orlando' },
      { src: 'hs-senior/2024-01-05-1115.avif',
        title: 'Sci-Fi City',
        desc: 'The Transformers ride at Universal Studios Singapore, with Bumblebee outside it.',
        when: 'Jan 2024 · Sentosa' },
      { src: 'hs-freshman/2021-05-16-1738.avif',
        title: 'Frankenstein’s monster',
        desc: 'The original Universal Monster, on a backlot street in Hollywood.',
        when: 'May 2021 · Hollywood' },
    ],

    islam: [
      { src: 'uci-second/2025-10-29-2108.avif',
        title: 'The outreach table',
        desc: 'Running the UCI Muslim Student Union table, handing out Qurans.',
        when: 'Oct 2025 · UC Irvine' },
      { src: 'pre-ms/2015-09-24-0722.avif',
        title: 'Eid prayer',
        desc: 'Outdoors, on the rugs, aged nine.',
        when: 'Sept 2015' },
    ],

    egypt: [
      { src: 'pre-ms/2015-12-17-0935.avif',
        title: 'Flag day',
        desc: 'Representing Egypt at school, with the flag on the desk.',
        when: 'Dec 2015' },
    ],
  },

  /* ── one photo of me at one park ──
     Named by `photo:` on a card in fan-disney.js / fan-universal.js, under the
     "I went here" stamp. A park I have been to but have no usable photograph
     of simply carries the stamp and no picture, which is the honest version. */
  parks: {
    'disneyland':      'hs-senior/2024-06-02-2048-2.avif',
    'dca':             'uci-second/2025-09-18-1737.avif',
    'tokyo-disneyland':'uci-second/2026-07-13-1931.avif',
    'tokyo-disneysea': 'uci-second/2026-07-14-0941.avif',
    'ush':             'ms-middle/2020-06-14-1251.avif',
    'usj':             'uci-second/2026-07-21-1549.avif',
    'uss':             'hs-senior/2024-01-05-1900.avif',
  },
};
