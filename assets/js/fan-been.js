/* fan-been.js: the photographs of a franchise's real places, on its own page.

   A fan page is taste; this is the one part of it that is evidence. Mos Espa is
   a set in the Tunisian desert, Ahch-To is an island off Kerry, the Coruscant
   Senate is a Valencian concert hall, and I have stood in all of them. Those
   photographs already exist in the year galleries, so like /travels/ this file
   only POINTS at them and owns nothing.

   ── EVERY PHOTOGRAPH IS DEFINED EXACTLY ONCE ──
   `shots` is the table: key -> [file, caption, where]. `pages` is keyed by the
   `data-fan` id each page already carries, and lists KEYS, not photographs.

   That split is the whole point. A LEGOLAND frame of Lloyd belongs on both the
   LEGO page and the Ninjago page, and the Jurassic Park arch at Universal
   Studios Singapore belongs on both Jurassic Park and Universal. Written out
   twice, the two copies drift: before this file was restructured, one frame was
   "The Ninjago ride" on one page and "The ride" on the other, and the Singapore
   arch was "The Jurassic Park arch" and "Jurassic Park". Both were caught by a
   duplicate check rather than by reading. Now there is one row to edit and both
   pages follow, and the same photograph cannot be described two ways.

   fanpage.js checks every file against years-data.js before drawing, so a photo
   pulled out of a year vanishes from here too instead of turning into a broken
   frame. A page whose shots all vanish renders no section at all.

   ── what is allowed in here ──
   Only photographs I can point at a frame for. Every row below was checked
   against the file's own GPS or something readable in the shot: the Star Wars
   pop-up store sign says "by SHIBUYA TSUTAYA", the Fearann sign says BINARY
   SUNSET / MEDITATION ROCK / FILM LOCATION, 2020-12-29-0942 says THE SIMPSONS
   RIDE. Nothing here is from memory. If a place is on a trip but not
   photographed it belongs in `onscreen` in travels-data.js, because this file
   is the pictures. */
window.FAN_BEEN = {

  /* ── the photographs, once each ── */
  shots: {
    'a-demogorgon': ['uci-second/2026-07-20-1914.avif', 'A Demogorgon', 'Expocity, Suita, Osaka'],
    'a-door-in-diagon-alley': ['hs-freshman/2020-12-24-1630.avif', 'A door in Diagon Alley', 'Universal Orlando'],
    'a-lightsaber-built-at-savis': ['hs-senior/2024-06-02-1803.avif', 'A lightsaber built at Savi\u2019s', 'Galaxy\u2019s Edge, Disneyland'],
    'a-wall-of-the-japanese-release-pos': ['uci-second/2026-07-16-2044.avif', 'A wall of the Japanese release posters', 'Tokyo Skytree Town'],
    'a-wand-at-ollivanders': ['ms-middle/2020-07-26-1314-2.avif', 'A wand at Ollivanders', 'Universal Studios Hollywood'],
    'ahch-to-where-luke-dies': ['uci-second/2026-04-08-1931.avif', 'Ahch-To, where Luke dies', 'Fearann, County Kerry'],
    'avengers-campus': ['hs-sophomore/2022-05-08-1636.avif', 'Avengers Campus', 'Disney California Adventure, Anaheim'],
    'bb-8': ['pre-ms/2017-12-10-1853.avif', 'BB-8', 'Disneyland, Anaheim'],
    'black-spire-outpost': ['hs-freshman/2021-05-15-1728.avif', 'Black Spire Outpost', 'Galaxy\u2019s Edge, Disneyland'],
    'boba-fett': ['pre-ms/2018-08-21-1659.avif', 'Boba Fett', 'Disneyland, Anaheim'],
    'butterbeer': ['hs-freshman/2020-12-12-1525.avif', 'Butterbeer', 'Universal Studios Hollywood'],
    'chewbacca': ['pre-ms/2017-12-10-1922.avif', 'Chewbacca', 'Disneyland, Anaheim'],
    'cole': ['pre-ms/2016-06-26-1521.avif', 'Cole', 'Ninjago World, LEGOLAND California'],
    'darth-vader': ['pre-ms/2016-07-06-1932.avif', 'Darth Vader', 'LEGOLAND California'],
    'darth-vader-2': ['pre-ms/2017-12-10-1928.avif', 'Darth Vader', 'Disneyland, Anaheim'],
    'darth-vader-again': ['pre-ms/2016-07-06-1932-2.avif', 'Darth Vader again', 'LEGOLAND California'],
    'darth-vader-in-lego': ['pre-ms/2010-10-24-1445.avif', 'Darth Vader in LEGO', 'LEGOLAND California'],
    'game-of-thrones-studio-tour': ['uci-second/2026-04-11-1153.avif', 'Game of Thrones Studio Tour', 'Banbridge, Northern Ireland'],
    'harry-potter-harajuku': ['uci-second/2026-07-15-1503.avif', 'Harry Potter Harajuku', 'Harajuku, Tokyo'],
    'hogwarts-castle': ['hs-freshman/2020-12-25-1345.avif', 'Hogwarts Castle', 'Universal Orlando'],
    'hogwarts-castle-2': ['hs-freshman/2020-12-25-1347.avif', 'Hogwarts Castle', 'Universal Orlando'],
    'hogwarts-castle-3': ['hs-freshman/2021-05-09-1915.avif', 'Hogwarts Castle', 'Universal Studios Hollywood'],
    'hogwarts-castle-4': ['uci-second/2026-07-21-1853.avif', 'Hogwarts Castle', 'Universal Studios Japan, Osaka'],
    'hoth-in-lego': ['pre-ms/2016-07-06-1934.avif', 'Hoth, in LEGO', 'Miniland, LEGOLAND California'],
    'inside-the-tour': ['uci-second/2026-04-11-1220.avif', 'Inside the tour', 'Banbridge, Northern Ireland'],
    'iron-man': ['hs-sophomore/2022-05-08-1730.avif', 'Iron Man', 'Disney California Adventure, Anaheim'],
    'jay': ['pre-ms/2016-06-26-1520-2.avif', 'Jay', 'Ninjago World, LEGOLAND California'],
    'jay-in-the-square': ['pre-ms/2016-07-06-1841.avif', 'Jay in the square', 'Ninjago World, LEGOLAND California'],
    'jurassic-park': ['uci-second/2026-07-21-1350.avif', 'Jurassic Park', 'Universal Studios Japan, Osaka'],
    'jurassic-world': ['hs-freshman/2021-05-09-1610.avif', 'Jurassic World', 'Universal Studios Hollywood'],
    'kai': ['pre-ms/2016-06-26-1521-2.avif', 'Kai', 'Ninjago World, LEGOLAND California'],
    'lego-batman': ['pre-ms/2016-06-26-1915.avif', 'LEGO Batman', 'LEGOLAND California'],
    'lloyd': ['pre-ms/2016-07-06-1837.avif', 'Lloyd', 'Ninjago World, LEGOLAND California'],
    'lloyd-again': ['pre-ms/2016-07-06-1840.avif', 'Lloyd again', 'Ninjago World, LEGOLAND California'],
    'lloyd-four-years-later': ['ms-middle/2020-07-19-1603.avif', 'Lloyd, four years later', 'LEGOLAND California'],
    'luthens-flashback': ['uci-second/2026-01-02-1543.avif', 'Luthen\u2019s flashback', 'X\u00e0tiva'],
    'marvel-store': ['uci-second/2026-07-20-1803.avif', 'Marvel store', 'Umeda, Osaka'],
    'master-wu': ['pre-ms/2016-07-06-1841-3.avif', 'Master Wu', 'Ninjago World, LEGOLAND California'],
    'mewtwo-pokemon-center-shibuya': ['uci-second/2026-07-15-1546.avif', 'Mewtwo, Pok\u00e9mon Center Shibuya', 'Shibuya PARCO, Tokyo'],
    'minecraft-store': ['uci-second/2026-07-20-1917.avif', 'Minecraft store', 'Expocity, Suita, Osaka'],
    'mon-mothmas-estate-chandrila': ['hs-junior/2022-11-26-0938.avif', 'Mon Mothma\u2019s estate, Chandrila', 'Montserrat'],
    'mount-prometheus': ['uci-second/2026-07-14-1056.avif', 'Mount Prometheus', 'Tokyo DisneySea, Chiba'],
    'nya': ['pre-ms/2016-07-06-1841-2.avif', 'Nya', 'Ninjago World, LEGOLAND California'],
    'obi-wan-kenobis-hut': ['uci-first/2025-01-01-1049.avif', 'Obi-Wan Kenobi\u2019s hut', 'Ajim, Djerba'],
    'on-a-broom-over-hogwarts': ['hs-freshman/2021-07-25-1200.avif', 'On a broom over Hogwarts', 'WB Studio Tour Hollywood, Burbank'],
    'outside-the-theed-palace-naboo': ['hs-junior/2022-11-22-0910.avif', 'Outside the Theed Palace, Naboo', 'Plaza de Espa\u00f1a, Seville'],
    'pixar-pier': ['hs-sophomore/2022-02-06-1455.avif', 'Pixar Pier', 'Disney California Adventure, Anaheim'],
    'platform-934-and-the-hogwarts-expr': ['uci-second/2026-07-15-1137.avif', 'Platform 9\u00be and the Hogwarts Express', 'Studio Tour Tokyo, Nerima'],
    'pokemon-cafe': ['uci-second/2026-07-20-1548.avif', 'Pok\u00e9mon Caf\u00e9', 'Shinsaibashi, Osaka'],
    'pokemon-center-kyoto': ['uci-second/2026-07-17-1302.avif', 'Pok\u00e9mon Center Kyoto', 'Kyoto'],
    'pokemon-center-osaka-dx': ['uci-second/2026-07-20-1605.avif', 'Pok\u00e9mon Center Osaka DX', 'Shinsaibashi, Osaka'],
    'pokemon-center-skytree-town': ['uci-second/2026-07-16-2042.avif', 'Pok\u00e9mon Center Skytree Town', 'Sumida, Tokyo'],
    'pokemon-center-tokyo-dx': ['uci-second/2026-07-16-1432.avif', 'Pok\u00e9mon Center Tokyo DX', 'Nihonbashi, Tokyo'],
    'rise-of-the-resistance': ['hs-sophomore/2022-05-02-2054.avif', 'Rise of the Resistance', 'Galaxy\u2019s Edge, Disneyland'],
    'sleeping-beauty-castle': ['uci-second/2026-05-06-1827.avif', 'Sleeping Beauty Castle', 'Disneyland, Anaheim'],
    'super-nintendo-world': ['uci-first/2025-03-30-1101.avif', 'Super Nintendo World', 'Universal Studios Hollywood'],
    'super-nintendo-world-fifth-anniver': ['uci-second/2026-07-21-1549.avif', 'Super Nintendo World, fifth anniversary', 'Universal Studios Japan, Osaka'],
    'the-arch': ['ms-middle/2020-06-14-1311.avif', 'The arch', 'Universal Studios Hollywood'],
    'the-at-ats': ['pre-ms/2016-07-06-1935.avif', 'The AT-ATs', 'Miniland, LEGOLAND California'],
    'the-avengers-mark': ['hs-sophomore/2022-05-08-1732.avif', 'The Avengers mark', 'Disney California Adventure, Anaheim'],
    'the-basilisk': ['hs-freshman/2021-07-25-1912.avif', 'The Basilisk', 'WB Studio Tour Hollywood, Burbank'],
    'the-batmobile': ['hs-freshman/2021-07-25-1856.avif', 'The Batmobile', 'WB Studio Tour Hollywood, Burbank'],
    'the-batpod-and-the-fleet': ['hs-freshman/2021-07-25-1858.avif', 'The Batpod and the fleet', 'WB Studio Tour Hollywood, Burbank'],
    'the-biplane': ['pre-ms/2016-10-23-1645.avif', 'The biplane', 'LEGOLAND California'],
    'the-castle-at-night': ['hs-freshman/2020-12-25-1955.avif', 'The castle at night', 'Universal Orlando'],
    'the-castle-at-night-2': ['hs-sophomore/2022-05-02-2004.avif', 'The castle at night', 'Disneyland, Anaheim'],
    'the-discovery-restaurant': ['uci-second/2026-07-21-1444.avif', 'The Discovery Restaurant', 'Universal Studios Japan, Osaka'],
    'the-dojo': ['pre-ms/2016-06-26-1605-2.avif', 'The dojo', 'Ninjago World, LEGOLAND California'],
    'the-driving-school': ['pre-ms/2016-08-21-1809.avif', 'The driving school', 'LEGOLAND California'],
    'the-fire-dragon': ['pre-ms/2016-07-06-1839-2.avif', 'The fire dragon', 'Ninjago World, LEGOLAND California'],
    'the-galactic-senate-coruscant': ['hs-junior/2022-11-24-1558.avif', 'The Galactic Senate, Coruscant', 'City of Arts and Sciences, Valencia'],
    'the-gate': ['pre-ms/2016-09-04-0905.avif', 'The gate', 'LEGOLAND California'],
    'the-great-hall': ['uci-second/2026-07-15-0953.avif', 'The Great Hall', 'Studio Tour Tokyo, Nerima'],
    'the-hogwarts-express': ['hs-freshman/2020-12-25-2115.avif', 'The Hogwarts Express', 'Universal Orlando'],
    'the-horcrux-cave': ['uci-second/2026-04-07-1050.avif', 'The Horcrux cave', 'Cliffs of Moher, County Clare'],
    'the-ice-dragon': ['pre-ms/2016-07-06-1839.avif', 'The ice dragon', 'Ninjago World, LEGOLAND California'],
    'the-incredible-hulk-coaster': ['hs-freshman/2020-12-26-1854.avif', 'The Incredible Hulk Coaster', 'Universal Orlando'],
    'the-incredicoaster': ['hs-sophomore/2022-02-06-1634.avif', 'The Incredicoaster', 'Disney California Adventure, Anaheim'],
    'the-jeep': ['uci-second/2026-07-21-1350-2.avif', 'The jeep', 'Universal Studios Japan, Osaka'],
    'the-jurassic-park-arch': ['hs-senior/2024-01-05-1320.avif', 'The Jurassic Park arch', 'Universal Studios Singapore'],
    'the-knight-bus': ['hs-freshman/2020-12-27-2219.avif', 'The Knight Bus', 'Universal Orlando'],
    'the-knight-bus-2': ['uci-second/2026-07-15-1115.avif', 'The Knight Bus', 'Studio Tour Tokyo, Nerima'],
    'the-lagoon': ['uci-second/2026-07-21-1244.avif', 'The lagoon', 'Universal Studios Japan, Osaka'],
    'the-lars-homestead-inside': ['uci-first/2024-12-31-1120.avif', 'The Lars homestead, inside', 'Hotel Sidi Driss, Matmata'],
    'the-lego-ninjago-movie-sand-sculpt': ['pre-ms/2017-09-03-1830.avif', 'The LEGO Ninjago Movie sand sculpture', 'Port of San Diego'],
    'the-millennium-falcon': ['hs-sophomore/2022-05-02-2049.avif', 'The Millennium Falcon', 'Galaxy\u2019s Edge, Disneyland'],
    'the-motorbike-and-sidecar': ['hs-freshman/2020-12-24-1736.avif', 'The motorbike and sidecar', 'Universal Orlando'],
    'the-ninjago-hotel-room': ['ms-middle/2020-07-19-1417.avif', 'The Ninjago hotel room', 'LEGOLAND California'],
    'the-ninjago-ride': ['pre-ms/2016-06-26-1521-3.avif', 'The Ninjago ride', 'Ninjago World, LEGOLAND California'],
    'the-park-at-night': ['hs-senior/2024-01-05-1900.avif', 'The park at night', 'Universal Studios Singapore'],
    'the-rise-of-skywalker-car': ['ms-middle/2020-07-12-1241.avif', 'The Rise of Skywalker car', 'Disneyland, Anaheim'],
    'the-season-5-screening': ['uci-second/2026-07-27-2027-2.avif', 'The Season 5 screening', 'Glendale, California'],
    'the-simpsons-ride': ['hs-freshman/2020-12-29-0942.avif', 'The Simpsons Ride', 'Universal Orlando'],
    'the-sorting-hat': ['hs-freshman/2021-07-25-1841.avif', 'The Sorting Hat', 'WB Studio Tour Hollywood, Burbank'],
    'the-star-wars-pop-up-store': ['uci-second/2026-07-16-1200.avif', 'The Star Wars pop-up store', 'Shibuya Tsutaya, Tokyo'],
    'the-star-wars-trading-post': ['uci-first/2025-08-03-2225.avif', 'The Star Wars Trading Post', 'Downtown Disney, Anaheim'],
    'tokyo-disneyland': ['uci-second/2026-07-13-1931.avif', 'Tokyo Disneyland', 'Urayasu, Chiba'],
    'tokyo-disneysea': ['uci-second/2026-07-14-1410.avif', 'Tokyo DisneySea', 'Urayasu, Chiba'],
    'walt-disney-world': ['ms-middle/2019-12-26-0632.avif', 'Walt Disney World', 'Orlando'],
    'walt-disney-world-2': ['ms-middle/2019-12-26-0912.avif', 'Walt Disney World', 'Orlando'],
    'walt-disney-world-3': ['ms-middle/2019-12-26-1235.avif', 'Walt Disney World', 'Orlando'],
    'walt-disney-world-4': ['ms-middle/2019-12-26-1535.avif', 'Walt Disney World', 'Orlando'],
    'walt-disney-world-5': ['ms-middle/2019-12-30-1200.avif', 'Walt Disney World', 'Orlando'],
    'welcome-to-hawkins-starcourt-mall': ['uci-second/2026-07-20-1850.avif', 'Welcome to Hawkins, Starcourt Mall', 'Expocity, Suita, Osaka'],
    'zane': ['pre-ms/2016-06-26-1520.avif', 'Zane', 'Ninjago World, LEGOLAND California'],
  },

  /* ── which pages use which, by key ── */
  pages: {
    'simpsons': {
      title: 'Springfield, in Florida',
      use: ['the-simpsons-ride'],
    },
    'lego': {
      title: 'LEGOLAND California, all of it',
      note: 'Every frame the library has from that park, from 2010 to the Ninjago hotel room in 2020.',
      use: ['darth-vader-in-lego', 'zane', 'jay', 'cole', 'kai', 'the-ninjago-ride', 
        'the-dojo', 'lego-batman', 'lloyd', 'the-ice-dragon', 'the-fire-dragon', 
        'lloyd-again', 'jay-in-the-square', 'nya', 'master-wu', 'darth-vader', 
        'darth-vader-again', 'hoth-in-lego', 'the-at-ats', 'the-driving-school', 
        'the-gate', 'the-biplane', 'the-ninjago-hotel-room', 'lloyd-four-years-later', 
        'the-lego-ninjago-movie-sand-sculpt'],
    },
    'ninjago': {
      title: 'Ninjago World, all of it',
      note: 'At LEGOLAND California, across two days in 2016 and the hotel room in 2020.',
      use: ['zane', 'jay', 'cole', 'kai', 'the-ninjago-ride', 'the-dojo', 'lloyd', 
        'the-ice-dragon', 'the-fire-dragon', 'lloyd-again', 'jay-in-the-square', 'nya', 
        'master-wu', 'the-ninjago-hotel-room', 'lloyd-four-years-later', 
        'the-lego-ninjago-movie-sand-sculpt'],
    },
    'sw': {
      title: 'Places I have actually stood in',
      note: 'Tatooine is in Tunisia, Ahch-To is off the coast of Kerry, and the Galactic Senate is a concert hall in Valencia. Every one of these is a photograph from a trip, not a still.',
      use: ['the-lars-homestead-inside', 'obi-wan-kenobis-hut', 'ahch-to-where-luke-dies', 
        'the-galactic-senate-coruscant', 'mon-mothmas-estate-chandrila', 
        'outside-the-theed-palace-naboo', 'luthens-flashback', 
        'the-star-wars-pop-up-store', 'a-wall-of-the-japanese-release-pos', 
        'the-millennium-falcon', 'rise-of-the-resistance', 'a-lightsaber-built-at-savis', 
        'the-star-wars-trading-post', 'darth-vader-2', 'chewbacca', 'boba-fett', 'bb-8', 
        'hoth-in-lego', 'the-at-ats', 'darth-vader', 'the-rise-of-skywalker-car', 
        'black-spire-outpost'],
    },
    'hp': {
      title: 'Places I have actually stood in',
      note: 'The Studio Tour in Tokyo is the sets themselves. The two castles are Osaka and Los Angeles. The cave is in County Clare and is only a cave.',
      use: ['the-great-hall', 'platform-934-and-the-hogwarts-expr', 'the-knight-bus-2', 
        'harry-potter-harajuku', 'hogwarts-castle-4', 'hogwarts-castle-3', 
        'a-wand-at-ollivanders', 'butterbeer', 'the-horcrux-cave', 
        'on-a-broom-over-hogwarts', 'the-sorting-hat', 'the-basilisk', 
        'a-door-in-diagon-alley', 'the-motorbike-and-sidecar', 'hogwarts-castle-2', 
        'the-castle-at-night', 'the-hogwarts-express', 'the-knight-bus'],
    },
    'got': {
      title: 'Places I have actually stood in',
      note: 'The sets, kept and opened rather than struck.',
      use: ['game-of-thrones-studio-tour', 'inside-the-tour'],
    },
    'pokemon': {
      title: 'Every Pok\u00e9mon Center I have been in',
      note: 'Tokyo, Kyoto and Osaka, plus the caf\u00e9, in the thirtieth year of the thing.',
      use: ['mewtwo-pokemon-center-shibuya', 'pokemon-center-tokyo-dx', 
        'pokemon-center-skytree-town', 'pokemon-center-kyoto', 'pokemon-center-osaka-dx', 
        'pokemon-cafe'],
    },
    'mc': {
      title: 'The Minecraft store',
      note: 'At Expocity in Suita, outside Osaka. The only one of its kind I have been to.',
      use: ['minecraft-store'],
    },
    'st': {
      title: 'Starcourt Mall, briefly, in Japan',
      note: 'A Season 5 pop-up at Expocity in Suita: the Hawkins board, the mall sign and a Demogorgon in a shopping centre.',
      use: ['welcome-to-hawkins-starcourt-mall', 'a-demogorgon', 'the-season-5-screening'],
    },
    'mcu': {
      title: 'Places I have actually stood in',
      note: 'Avengers Campus is twenty minutes from my house. The store is in Osaka.',
      use: ['avengers-campus', 'the-avengers-mark', 'iron-man', 'marvel-store', 
        'the-incredible-hulk-coaster'],
    },
    'batman': {
      title: 'The cars, in Burbank',
      note: 'The Warner Bros. Studio Tour keeps them: the Tumbler, the Batpod, and the rest of the fleet in one room.',
      use: ['the-batmobile', 'the-batpod-and-the-fleet', 'lego-batman'],
    },
    'pixar': {
      title: 'Pixar Pier',
      use: ['pixar-pier', 'the-incredicoaster'],
    },
    'jp': {
      title: 'Isla Nublar, twice',
      note: 'Osaka and Los Angeles. The jeep is the same jeep.',
      use: ['jurassic-park', 'the-jeep', 'the-discovery-restaurant', 'jurassic-world', 
        'the-jurassic-park-arch'],
    },
    'universal': {
      title: 'Both parks',
      note: 'Osaka and Los Angeles, six years apart.',
      use: ['the-lagoon', 'super-nintendo-world-fifth-anniver', 'the-arch', 
        'super-nintendo-world', 'the-simpsons-ride', 'the-incredible-hulk-coaster', 
        'hogwarts-castle', 'the-jurassic-park-arch', 'the-park-at-night'],
    },
    'disney': {
      title: 'The parks',
      note: 'Tokyo Disneyland and DisneySea in Chiba, and Anaheim, which is twenty minutes away and where most of this started.',
      use: ['tokyo-disneyland', 'tokyo-disneysea', 'mount-prometheus', 
        'sleeping-beauty-castle', 'the-castle-at-night-2', 'pixar-pier', 
        'walt-disney-world', 'walt-disney-world-2', 'walt-disney-world-3', 
        'walt-disney-world-4', 'walt-disney-world-5'],
    },
  },
};
