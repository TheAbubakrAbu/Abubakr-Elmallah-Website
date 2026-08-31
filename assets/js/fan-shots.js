/* fan-shots.js: my own game screenshots, each described exactly once.

   fan-been.js does this for photographs; this does it for captures. `shots`
   is the table, key -> frame, and `sets` are the named groups a page can
   take whole (`set: 'realm'`) or dip into (`pick: ['if-spawn']`); fanpage.js
   joins `base` to every `src`. A frame shown on two pages is one row here, so
   it cannot be captioned two ways, and a row pulled from the table vanishes
   from every page at once instead of turning into a broken tile.

   THE ORIGINALS. Every file here is served from assets/img/franchises/ and
   has its capture in _originals/franchises/ under the same path (gitignored,
   encoded by tools/shots.py), and every one of those is also in the Video
   Game Screenshots library on iCloud under the name it was captured with; the
   README in _originals maps one to the other. Names, scores and tooltips
   below are read off the frames themselves, not remembered.

   DATES ARE NOT WRITTEN IN THESE ROWS. `dates` at the foot of this file has
   one entry per picture the site serves, whatever page shows it, and when()
   is the only place one is formatted; fanpage.js prints it under every
   screenshot. A `meta` here says what is printed INSIDE the frame, an
   achievement's own unlock date included, which is a different fact from
   when the screenshot was taken and is often a different date.

   My names, in order: aelmallah on the Pixelmon server, TheAbubakrAbu on
   Imagine Fun through June 2024, MasterThingW from 2025 on and on the Realm.
   The skin on Imagine Fun is a Mandalorian called Abu Vizsla. */
window.FAN_SHOTS = {
  base: '/assets/img/franchises/',

  shots: {

    /* ── the Realm, July to August 2026 ── */
    'realm-day-one': { src: 'minecraft/realms/2026-07-04-2009-day-one.jpg', title: 'Day one, on the beach',
      desc: 'The fourth of July, a chest on the sand, a map in a frame on the ground, and a diamond axe already in hand. The first capture in the world.',
      alt: 'A Minecraft beach at the start of a Realm, a chest and a framed map on the sand and a diamond axe in hand' },
    'realm-savanna': { src: 'minecraft/realms/2026-07-28-0111-savanna.jpg', title: 'Savanna, four weeks in',
      desc: 'The sun low over the acacias at one in the morning, and a toast in the corner saying a new recipe had unlocked.',
      alt: 'A Minecraft savanna at sunset with shaders on' },
    'realm-portal-room': { src: 'minecraft/realms/2026-08-19-1818-portal-room.jpg', title: 'The portal room',
      desc: 'All twelve eyes in, GentleSigma and Quatic on the far side, and the last minute of the Overworld before the four of us dropped through.',
      alt: 'A Minecraft stronghold portal room with all twelve eyes of ender placed and two other players beside it' },
    'realm-the-end': { src: 'minecraft/realms/2026-08-19-1819-the-end.jpg', title: 'The End?',
      desc: 'The advancement with the question mark, three times in the chat inside the same minute: GentleSigma, Quatic, ItsDauntless. The bow in hand is called Death Star.',
      alt: 'Arriving in the End in Minecraft, the boss bar up and three advancement lines in the chat' },
    'realm-crystals': { src: 'minecraft/realms/2026-08-19-1822-crystals.jpg', title: 'The crystals',
      desc: 'Obsidian pillars with the end crystals still lit on top, which is the part of the fight nobody enjoys. Ice Longclaw in hand.',
      alt: 'The obsidian pillars of the End with end crystals on top' },
    'realm-the-dragon': { src: 'minecraft/realms/2026-08-19-1824-the-dragon.jpg', title: 'The dragon',
      desc: 'Perched on a pillar, the boss bar across the top of the screen, Death Star drawn.',
      alt: 'The Ender Dragon perched on an obsidian pillar' },
    'realm-hitboxes': { src: 'minecraft/realms/2026-08-19-1824-hitboxes.jpg', title: 'Hitboxes on',
      desc: 'F3 and B: the dragon as the game sees it, a cage of green boxes coming straight at the camera, and the rest of us small on the island below.',
      alt: 'The Ender Dragon flying at the camera with its hitboxes drawn as green boxes' },
    'realm-under-the-dragon': { src: 'minecraft/realms/2026-08-19-1826-under-the-dragon.jpg', title: 'Under the dragon',
      desc: 'Third person: ItsDauntless and me in diamond on the end stone, the dragon crossing overhead, endermen wandering through the fight.',
      alt: 'Two players in diamond armour on the End island with the dragon overhead' },
    'realm-quatic': { src: 'minecraft/realms/2026-08-19-1828-quatic.jpg', title: 'Teleported Quatic',
      desc: 'The chat line reads Teleported Quatic to MasterThingW, which is me. Everybody back on the island for the last of it.',
      alt: 'A player named Quatic arriving on the End island beside the camera' },
    'realm-free-the-end': { src: 'minecraft/realms/2026-08-19-1830-free-the-end.jpg', title: 'Free the End',
      desc: 'The dragon dying in beams of light, the advancement toast in the corner, and GentleSigma in the chat: “If I breath it dies.” Forty-six days after the beach.',
      alt: 'The Ender Dragon dying in beams of light, with the Free the End advancement toast in the corner' },
    'realm-exit-portal': { src: 'minecraft/realms/2026-08-19-1831-exit-portal.jpg', title: 'The exit portal',
      desc: 'Lit, with the bedrock fountain in the middle of it and everyone gathered round.',
      alt: 'The lit exit portal of the End with players standing around it' },
    'realm-gentlesigma': { src: 'minecraft/realms/2026-08-19-1831-gentlesigma.jpg', title: 'GentleSigma',
      desc: 'Teleported over to the fountain a minute after the kill, sword out.',
      alt: 'A player named GentleSigma beside the End fountain' },
    'realm-outer-end': { src: 'minecraft/realms/2026-08-19-1833-outer-end.jpg', title: 'The outer islands',
      desc: 'Out into the dark: end stone to the horizon, chorus plants, and endermen who had not noticed yet.',
      alt: 'The outer End islands at night with endermen in the distance' },
    'realm-end-city': { src: 'minecraft/realms/2026-08-19-1834-end-city.jpg', title: 'The City at the End of the Game',
      desc: 'Purpur towers, the advancement of that name for ItsDauntless and me, and Remote Getaway for GentleSigma in the same second of chat.',
      alt: 'An end city of purpur blocks with the City at the End of the Game advancement toast' },
    'realm-end-ship': { src: 'minecraft/realms/2026-08-19-1903-end-ship.jpg', title: 'Inside the ship',
      desc: 'The end ship’s hold: a chest, and the elytra in its frame on the wall, which is what all of this was for.',
      alt: 'Inside an end ship, an elytra in an item frame on a purpur wall' },
    'realm-next-generation': { src: 'minecraft/realms/2026-08-23-2315-next-generation.jpg', title: 'The Next Generation',
      desc: 'Four days later, back in the End for the egg. The goal toast in the corner is the one for holding it.',
      alt: 'A tunnel in the End with the Next Generation goal toast in the corner' },
    'realm-advancements': { src: 'minecraft/realms/2026-08-23-2344-advancements.jpg', title: 'The advancements screen',
      desc: 'The Minecraft tab, most of the way filled in, opened underground on the last night of captures.',
      alt: 'The Minecraft advancements screen, most of the tab completed' },
    'realm-sunset': { src: 'minecraft/realms/2026-08-23-2349-sunset.jpg', title: 'Sunset over the ocean',
      desc: 'Ice Longclaw raised at the sun going down over a lukewarm ocean, shaders on.',
      alt: 'A sword raised at a Minecraft sunset over the ocean' },
    'realm-in-the-water': { src: 'minecraft/realms/2026-08-23-2349-in-the-water.jpg', title: 'In the water',
      desc: 'Third person, waist deep, name tag and all: diamond armour and a purple sword against a gold sky.',
      alt: 'A player in diamond armour standing in the sea at sunset' },
    'realm-underwater': { src: 'minecraft/realms/2026-08-23-2350-underwater.jpg', title: 'Underwater',
      desc: 'Light through the surface, seagrass, a shoal of fish. Respiration III on the helmet makes this somewhere you can stay.',
      alt: 'Underwater in Minecraft with light rays, seagrass and fish' },
    'realm-nether-portal': { src: 'minecraft/realms/2026-08-23-2350-nether-portal.jpg', title: 'The portal on the beach',
      desc: 'A nether portal built at the water’s edge, the last frame of the set, and the beach looks a lot like the first one.',
      alt: 'A nether portal on a Minecraft beach' },

    /* ── Imagine Fun, the Disneyland half ── */
    'if-castle': { src: 'minecraft/imagine-fun/disney100-castle.jpg', title: 'The castle, Disney100',
      desc: 'Sleeping Beauty Castle from the hub with the platinum hundredth-anniversary bunting the real park hung in 2023, rendered more than five thousand pixels wide.',
      meta: 'Disneyland Park · 2023', alt: 'Sleeping Beauty Castle rebuilt in Minecraft with Disney100 bunting' },
    'if-entrance-tunnel': { src: 'minecraft/imagine-fun/entrance-tunnel.jpg', title: 'The entrance tunnel',
      desc: 'Under the railroad, between the attraction posters, with the plaque overhead about leaving today. A Mandalorian walking into Disneyland, which is the whole server in one frame.',
      meta: 'Main Street, U.S.A.', alt: 'A Mandalorian skin in the Disneyland entrance tunnel rebuilt in Minecraft' },
    'if-fanatic': { src: 'minecraft/imagine-fun/disneyland-fanatic.jpg', title: 'Disneyland Fanatic',
      desc: 'The achievement for a thousand rides on the server, unlocked May the 4th 2024 and worth two thousand Kingdom Coins. The corner says where I was standing: Frosty Falls, 137 guests online.',
      meta: '1,000 rides · 4 May 2024', alt: 'The Disneyland Fanatic achievement window on Imagine Fun, at 100 percent' },
    'if-coins': { src: 'minecraft/imagine-fun/hundred-thousand-coins.jpg', title: 'A hundred thousand coins',
      desc: 'The bank window reading 100,051 Kingdom Coins. Rides pay out, and a thousand of them add up.',
      meta: 'Balance 100,051', alt: 'The Imagine Fun bank window showing a balance of 100,051 Kingdom Coins' },
    'if-halfway': { src: 'minecraft/imagine-fun/2025-05-27-2250-halfway.jpg', title: 'Halfway',
      desc: 'Two achievements in one frame, Top Ten Trolley Times and 50% Complete, with the ride log scrolling past in the chat.',
      alt: 'Two achievement toasts on Imagine Fun, Top Ten Trolley Times and 50 percent complete' },
    'if-ride-log': { src: 'minecraft/imagine-fun/2025-07-22-0203-ride-log.jpg', title: 'Two in the morning',
      desc: 'The ride count the server prints after a ride, forty-eight XP on the MagicPass, and the chat welcoming somebody who had started playing that day.',
      alt: 'The Imagine Fun ride count breakdown in the chat, holding a lightsaber hilt' },
    'if-seventieth-pin': { src: 'minecraft/imagine-fun/2025-07-22-0204-seventieth-pin.jpg', title: 'The seventieth-anniversary pin',
      desc: 'Galaxy’s Edge, Disneyland 70th Anniversary series, Deluxe rarity, brand new, original owner MasterThingW. Pins are the collectable the whole economy runs on.',
      meta: 'Pin · Deluxe', alt: 'The tooltip of a Galaxy’s Edge Disneyland 70th Anniversary pin on Imagine Fun' },
    'if-esplanade': { src: 'minecraft/imagine-fun/2026-02-14-1324-esplanade.jpg', title: 'The Esplanade, Valentine’s Day',
      desc: 'Between the two parks at night with a purple saber out, 119 guests online, and a Sith Reaper helmet in the hotbar.',
      alt: 'The Esplanade between the Disneyland parks rebuilt in Minecraft, at night, with a purple lightsaber' },
    'if-food-locker': { src: 'minecraft/imagine-fun/food-locker.jpg', title: 'The food locker',
      desc: 'Locker #2, and every slot is something to eat. Main Street a few blocks away, 96 guests online.',
      meta: 'Locker #2', alt: 'A locker window full of food items on Imagine Fun' },
    'if-scrooge': { src: 'minecraft/imagine-fun/scrooge-mcduck.jpg', title: 'Scrooge McDuck',
      desc: 'Top hat, cane and the red coat, out by the hedges with another duck in a top hat. Characters walk this park the way the face characters do in Anaheim.',
      meta: 'Character', alt: 'Scrooge McDuck and another duck character in Minecraft by a hedge' },
    'if-wondrous-journeys': { src: 'minecraft/imagine-fun/wondrous-journeys.jpg', title: 'Wondrous Journeys',
      desc: 'The server’s poster for its version of the Disney100 fireworks, with my Mandalorian in front of the castle and the concept sketches peeling back at the edge.',
      meta: 'October 2023', alt: 'An Imagine Fun poster for Wondrous Journeys with a Mandalorian skin in front of the castle' },

    /* ── Imagine Fun, the Star Wars half ── */
    'if-spawn': { src: 'star-wars/imagine-fun/spawn.jpg', title: 'Spawn',
      desc: 'IMAGINEFUN PARKS in letters you can walk under, a TIE fighter overhead, and my hooded skin at the time.',
      meta: 'mc.imaginefun.net', alt: 'The Imagine Fun spawn, with the server name in giant letters and a TIE fighter overhead' },
    'if-first-order-invasion': { src: 'star-wars/imagine-fun/first-order-invasion.jpg', title: 'First Order Invasion',
      desc: 'Page one of six of the event book for May the 4th 2025. The corner is already keeping score: nine intel chips, next rank Technician.',
      meta: '4 May 2025', alt: 'The First Order Invasion event book open on Imagine Fun' },
    'if-hyperspace-ten': { src: 'star-wars/imagine-fun/hyperspace-mountain-ten-times.jpg', title: 'Oh I Have A Bad Feeling About This',
      desc: 'A secret achievement: ride Hyperspace Mountain ten times. Unlocked May the 4th 2024, twenty Kingdom Coins, and a tour guide in the chat telling everyone to follow him.',
      meta: 'Hyperspace Mountain ×10 · 4 May 2024', alt: 'The secret achievement for riding Hyperspace Mountain ten times, unlocked' },
    'if-galaxy-far-far-away': { src: 'star-wars/imagine-fun/a-galaxy-far-far-away.jpg', title: 'A Galaxy Far Far Away',
      desc: 'The other secret one, for the first ride on Hyperspace Mountain, also dated May the 4th 2024. Captured a year later, on a ride, with 116 intel chips in the First Order Fight.',
      meta: 'First ride · 4 May 2024', alt: 'The secret achievement for a first ride on Hyperspace Mountain, unlocked' },
    'if-dagobah': { src: 'star-wars/imagine-fun/dagobah.jpg', title: 'Dagobah',
      desc: 'Yoda’s swamp in the dark, the roots and the mist, and the Mandalorian with a purple blade lit.',
      meta: 'Render', alt: 'A Mandalorian skin in a Minecraft Dagobah swamp with a purple lightsaber' },
    'if-hoth': { src: 'star-wars/imagine-fun/hoth.jpg', title: 'Hoth',
      desc: 'The ice cave from Empire, and the Mandalorian standing in it with a blade out.',
      meta: 'Render', alt: 'A Mandalorian skin inside an ice cave built in Minecraft' },
    'if-laat': { src: 'star-wars/imagine-fun/laat-gunship.jpg', title: 'LAAT gunship',
      desc: 'A Republic gunship parked on the plaza at sunset, doors open, built to walk into.',
      meta: 'Render', alt: 'A Republic LAAT gunship built in Minecraft with a Mandalorian skin in front' },
    'if-landspeeder': { src: 'star-wars/imagine-fun/landspeeder.jpg', title: 'Landspeeder',
      desc: 'Luke’s X-34 on a Tatooine street, and the Mandalorian beside it with a pink blade.',
      meta: 'Render', alt: 'An X-34 landspeeder built in Minecraft on a Tatooine street' },
    'if-gold-kenobi': { src: 'star-wars/imagine-fun/gold-kenobi-saber.jpg', title: 'The gold Kenobi saber',
      desc: 'A limited-edition hilt, carried through Black Spire Outpost at dusk with the Falcon behind.',
      meta: 'Render', alt: 'A Mandalorian skin in Black Spire Outpost holding a gold lightsaber hilt' },
    'if-falcon': { src: 'star-wars/imagine-fun/millennium-falcon.jpg', title: 'The Millennium Falcon',
      desc: 'Black Spire Outpost’s centrepiece, where it sits in Anaheim, with the spires behind and morning light on the plaza.',
      meta: 'Render', alt: 'The Millennium Falcon built in Minecraft with the Batuu spires behind' },
    'if-falcon-cockpit': { src: 'star-wars/imagine-fun/falcon-cockpit.jpg', title: 'The Falcon’s cockpit',
      desc: 'Inside, looking out through the cockpit frame into the dark of the hangar.',
      meta: 'Render', alt: 'The inside of the Millennium Falcon cockpit built in Minecraft' },
    'if-escape-pod': { src: 'star-wars/imagine-fun/rise-of-the-resistance-escape-pod.jpg', title: 'The escape pod',
      desc: 'The end of Rise of the Resistance, the pod half-buried in the rock the way the ride finishes, and the Mandalorian climbing out of it.',
      meta: 'Render', alt: 'The Rise of the Resistance escape pod built in Minecraft' },
    'if-razor-crest': { src: 'star-wars/imagine-fun/razor-crest.jpg', title: 'The Razor Crest',
      desc: 'Din Djarin’s ship on the ground at sunset, and mine in front of it.',
      meta: 'Render', alt: 'The Razor Crest built in Minecraft at sunset with a Mandalorian skin in front' },
    'if-starspeeder': { src: 'star-wars/imagine-fun/starspeeder-1000.jpg', title: 'StarSpeeder 1000',
      desc: 'Star Tours’ ship parked outside the ride, something flying over, purple blade up.',
      meta: 'Render', alt: 'The Star Tours StarSpeeder 1000 built in Minecraft' },
    'if-savis': { src: 'star-wars/imagine-fun/savis-workshop.jpg', title: 'Savi’s Workshop',
      desc: 'Four finished sabers on the wall, blue, green, yellow and red, and a sign about scrap: find the barcodes and /scan them.',
      meta: 'Savi’s Workshop', alt: 'Four lightsabers on the wall of Savi’s Workshop built in Minecraft' },
    'if-legacy-saber-shop': { src: 'star-wars/imagine-fun/legacy-saber-shop.jpg', title: 'The Legacy Saber Shop',
      desc: 'Four hilts on the shelf, 94.65K coins to spend on them, Dok-Ondar’s the nearest warp. Sixty-two guests online at a quarter to one in the morning.',
      alt: 'The Legacy Saber Shop window on Imagine Fun with four hilts for sale' },
    'if-dok-ondars': { src: 'star-wars/imagine-fun/dok-ondars-shop.jpg', title: 'Dok-Ondar’s',
      desc: 'The other shop: helmets rather than hilts. A Mandalorian’s, a stormtrooper’s, and the rest of the case.',
      alt: 'Dok-Ondar’s shop window on Imagine Fun, selling helmets' },
    'if-saber-locker': { src: 'star-wars/imagine-fun/saber-locker.jpg', title: 'The saber locker',
      desc: 'Locker #3, every slot a hilt, and a purple one out in hand on Main Street.',
      meta: 'Locker #3', alt: 'A locker window full of lightsaber hilts on Imagine Fun' },
    'if-gold-kenobi-ignited': { src: 'star-wars/imagine-fun/gold-kenobi-saber-ignited.jpg', title: 'Gold Kenobi, ignited',
      desc: 'The limited-edition hilt lit, held straight up against the evening sky over Black Spire Outpost.',
      meta: 'Render', alt: 'A Mandalorian skin holding an ignited gold lightsaber up against the sky' },
    'if-may-the-fourth-2024': { src: 'star-wars/imagine-fun/may-the-fourth-2024.jpg', title: 'May the 4th, 2024',
      desc: 'The event poster: my Mandalorian and the other one, in hyperspace.',
      meta: 'Poster', alt: 'The Imagine Fun May the 4th 2024 poster with two Mandalorians in hyperspace' },
    'if-milk-stand': { src: 'star-wars/imagine-fun/milk-stand.jpg', title: 'The Milk Stand',
      desc: 'Blue milk 7.98, green milk 7.58, the May the 4th sign on the counter and the cups lined up. An earlier year’s event.',
      meta: 'May the 4th', alt: 'The Milk Stand of Galaxy’s Edge built in Minecraft, with prices on the board' },
    'if-ogas': { src: 'star-wars/imagine-fun/ogas-cantina.jpg', title: 'Oga’s Cantina',
      desc: 'The doorway with the sign over it and the event banner on the wall, empty in the small hours.',
      meta: 'May the 4th', alt: 'The entrance of Oga’s Cantina built in Minecraft' },
    'if-tie-echelon': { src: 'star-wars/imagine-fun/tie-echelon.jpg', title: 'The TIE Echelon',
      desc: 'Parked on the First Order side of the outpost with stormtroopers under it and the event sign on the wall.',
      meta: 'May the 4th', alt: 'The TIE Echelon built in Minecraft with stormtrooper characters beneath it' },
    'if-magic-shot-tie': { src: 'star-wars/imagine-fun/magic-shot-tie-echelon.jpg', title: 'The May the 4th Magic Shot',
      desc: 'Sitting in the TIE Echelon’s cockpit with stars out of the windscreen and a TIE fighter passing, Club 33 tag over my head. The server’s photographers set these up.',
      alt: 'A Magic Shot inside the TIE Echelon cockpit on Imagine Fun' },
    'if-boba-fett': { src: 'star-wars/imagine-fun/boba-fett.jpg', title: 'Boba Fett',
      desc: 'A year on, a new name over my head, MasterThingW, and a Boba Fett character standing beside me indoors in the outpost.',
      alt: 'A Boba Fett character beside the player inside a building on Imagine Fun' },
    'if-first-order-fight': { src: 'star-wars/imagine-fun/first-order-fight.jpg', title: 'The First Order Fight',
      desc: 'The Esplanade with the Mickey fountain in front and the corner counting intel chips: 141, next rank Specialist. The 2025 event was a war.',
      alt: 'The Esplanade fountain on Imagine Fun with the First Order Fight scoreboard in the corner' },
    'if-vs-anakin': { src: 'star-wars/imagine-fun/vs-anakin.jpg', title: 'Abu Vizsla vs Anakin',
      desc: 'A Magic Shot on Mustafar: blades crossed in front of the lava, imaginefun.net in the corner.',
      meta: 'Magic Shot', alt: 'A Magic Shot of two Minecraft characters duelling with lightsabers in front of lava' },
    'if-vs-obi-wan': { src: 'star-wars/imagine-fun/vs-obi-wan.jpg', title: 'Abu Vizsla vs Obi-Wan',
      desc: 'The same set, the other duellist. He has the high ground in neither.',
      meta: 'Magic Shot', alt: 'A Magic Shot of two Minecraft characters duelling with blue lightsabers in front of lava' },
    'if-luke-leia-han': { src: 'star-wars/imagine-fun/luke-leia-and-han.jpg', title: 'Luke, Leia and Han',
      desc: 'Three characters crossing the plaza in front of the Falcon at midday, long shadows on the ground.',
      meta: 'Black Spire Outpost', alt: 'Luke, Leia and Han characters walking in front of the Millennium Falcon on Imagine Fun' },
    'if-dj-r3x': { src: 'star-wars/imagine-fun/dj-r3x.jpg', title: 'DJ R-3X',
      desc: 'Oga’s from the inside, the droid at the decks behind me, in the May the 4th frame.',
      meta: 'Magic Shot', alt: 'A Magic Shot inside Oga’s Cantina with DJ R-3X behind the player' },
    'if-throne': { src: 'star-wars/imagine-fun/the-throne.jpg', title: 'The throne',
      desc: 'Snoke’s chair with a Praetorian Guard either side and the Death Star in the corner, and me sitting in it.',
      meta: 'Magic Shot', alt: 'A Magic Shot of the player on a throne between two red Praetorian Guards' },
    'if-hyperspace-poster': { src: 'star-wars/imagine-fun/hyperspace-mountain-poster.jpg', title: 'Hyperspace Mountain',
      desc: 'The poster the server made of me in the front row of the ride vehicle, X-wings and TIEs overhead.',
      meta: 'Poster', alt: 'An Imagine Fun Hyperspace Mountain poster with the player in the front row of the ride' },
    'if-magic-shot-falcon': { src: 'star-wars/imagine-fun/magic-shot-falcon.jpg', title: 'The Falcon, May the 4th',
      desc: 'Standing in front of the ship with a Rebel starbird and crossed sabers over it and hyperspace streaks round the edge.',
      meta: 'Magic Shot', alt: 'A May the 4th Magic Shot in front of the Millennium Falcon on Imagine Fun' },
    'if-trivia-first': { src: 'star-wars/imagine-fun/trivia-2024-05-31-first.jpg', title: 'Star Wars Trivia, first',
      desc: 'End of round: 1st TheAbubakrAbu 34, 2nd zanderman24 34, 3rd HorseGirl41 27, five hundred Kingdom Coins, and an Ewok in the chat saying yub nub.',
      alt: 'The Star Wars Trivia results in the chat on Imagine Fun, TheAbubakrAbu first' },
    'if-trivia-stage': { src: 'star-wars/imagine-fun/trivia-2024-06-15-stage.jpg', title: 'Up on the stage',
      desc: 'A cast member on a red-brick stage with me beside them, and the chat congratulating somebody: up those stairs to the right.',
      alt: 'The player and a cast member on a stage on Imagine Fun' },
    'if-trivia-seventy-five': { src: 'star-wars/imagine-fun/trivia-seventy-five.jpg', title: 'Seventy-five points',
      desc: 'The leaderboard with my name at the top by eight: 75 to Hoobins’ 67. Hollywood Land the nearest warp, 103 guests online.',
      meta: 'Star Wars Trivia · 1st', alt: 'The Star Wars Trivia leaderboard on Imagine Fun with TheAbubakrAbu first on 75 points' },
    'if-trivia-top-three': { src: 'star-wars/imagine-fun/trivia-top-three.jpg', title: 'Top three',
      desc: 'First, a hundred coins, and my own line in the chat when somebody asked whether the worst player gets a consolation prize: yes, you get a sticker, courtesy of me.',
      meta: 'Star Wars Trivia', alt: 'The Star Wars Trivia top three in the chat on Imagine Fun' },
    'if-trivia-quiz-stage': { src: 'star-wars/imagine-fun/trivia-quiz-stage.jpg', title: 'The quiz stage',
      desc: 'The trivia room in purple and pink, TRIVIA QUIZ over the screen, and the seventh- and sixteenth-placed in the chat.',
      meta: 'Star Wars Trivia', alt: 'The trivia stage on Imagine Fun, in purple and pink' },

    /* ── the Star Wars MC server ── */
    'swmc-sabers': { src: 'star-wars/star-wars-mc/saber-inventory.jpg', title: 'Every colour',
      desc: 'The inventory on the Star Wars MC server: three rows of hilts, a blaster in the corner, and the robed skin in the middle.',
      meta: 'Star Wars MC', alt: 'A Minecraft inventory full of lightsaber hilts of every colour' },
    'swmc-legacy': { src: 'star-wars/star-wars-mc/legacy-sabers.jpg', title: 'The ender chest',
      desc: 'Legacy sabers on the top rows and health potions filling the rest.',
      meta: 'Star Wars MC', alt: 'An ender chest window with lightsabers and potions' },
    'swmc-parkour': { src: 'star-wars/star-wars-mc/parkour.jpg', title: 'Parkour',
      desc: 'Easy, Medium and Hard on the banners in a red-and-black lobby, which is what you did between things.',
      meta: 'Star Wars MC', alt: 'A red and black lobby with Easy, Medium and Hard parkour banners' },

    /* ── Potterverse, February 2022 ── */
    'pv-sorting': { src: 'harry-potter/potterverse/sorting.jpg', title: 'The Sorting',
      desc: 'The Great Hall, the hat, and the verdict: Ravenclaw. The server gave it Gryffindor’s line, “where dwell the brave at heart”, and nobody corrected it. Philosopher’s Stone storyline unlocked.',
      meta: 'February 2022', alt: 'The Great Hall on the Potterverse server with the Sorting Hat’s message in the chat' },
    'pv-ravenclaw': { src: 'harry-potter/potterverse/ravenclaw.jpg', title: 'Ravenclaw, valuing wit beyond measure',
      desc: 'The hat again, in the Defence Against the Dark Arts classroom with Professor Lockhart, and a quest to find a key.',
      meta: 'February 2022', alt: 'A classroom on the Potterverse server with the Sorting Hat naming Ravenclaw' },
    'pv-express': { src: 'harry-potter/potterverse/hogwarts-express.jpg', title: 'The Hogwarts Express',
      desc: 'Crossing the viaduct under a pixel plume of steam, rendered ten thousand pixels wide.',
      meta: 'Render', alt: 'The Hogwarts Express crossing a viaduct, built in Minecraft' },
    'pv-banners': { src: 'harry-potter/potterverse/house-banners.jpg', title: 'The four banners',
      desc: 'Gryffindor, Slytherin, the crest, Hufflepuff, Ravenclaw, on a bare stone wall.',
      meta: 'Render', alt: 'The four Hogwarts house banners and the school crest on a Minecraft stone wall' },
    'pv-library': { src: 'harry-potter/potterverse/library.jpg', title: 'The library',
      desc: 'In the robes, book in hand, between the stacks. A Monday afternoon in February.',
      meta: '21 Feb 2022', alt: 'The player in Hogwarts robes in the library on the Potterverse server' },
    'pv-ollivanders': { src: 'harry-potter/potterverse/ollivanders.jpg', title: 'Ollivanders',
      desc: 'Mr Ollivander behind the counter, white hair and all, and the wand boxes to the ceiling.',
      meta: 'Diagon Alley', alt: 'Ollivanders wand shop on the Potterverse server, with Ollivander behind the counter' },
    'pv-prefect-badge': { src: 'harry-potter/potterverse/prefect-badge.jpg', title: 'The prefect badge',
      desc: 'Pinned to the robe, gold on blue, seen from above.',
      meta: 'February 2022', alt: 'A prefect badge on the player’s robe, seen from above' },
    'pv-prefect': { src: 'harry-potter/potterverse/prefect.jpg', title: 'Prefect',
      desc: 'In the library with the badge on the floor beside me, the day it was given.',
      meta: '20 Feb 2022', alt: 'The player in the library with a prefect badge on the floor beside them' },
    'pv-owlery': { src: 'harry-potter/potterverse/2024-08-24-0116-owlery.jpg', title: 'The Owlery, two years on',
      desc: 'A return at one in the morning: the Owlery, a quest to get through the Potions room, Lumos on the wand, and another student called Rowan.',
      alt: 'The Owlery on the Potterverse server with another player named Rowan' },

    /* ── Pixelmon ── */
    'pixelmon-mewtwo': { src: 'minecraft/pixelmon/mewtwo.jpg', title: 'A level 100 Mewtwo at spawn',
      desc: 'Mewtwo and Flareon at level 100, then Emboar, Raichu, Staraptor and a Seadra I never got round to. The sign in the middle of the screen is the server telling me off for sending Mewtwo out at spawn, which is fair.',
      meta: 'Pixelmon · aelmallah', alt: 'A Pixelmon server spawn in Minecraft with a level 100 Mewtwo sent out' },

    /* ── the shelves shown on two pages ── */
    'lego-star-wars-hundred': { src: 'star-wars/lego-hundred-percent.jpg', title: 'The LEGO Star Wars run',
      desc: 'The Complete Saga at 26 hours 40. The Clone Wars at 22 hours 05. The Force Awakens with every planet on the galaxy map at 100. The Skywalker Saga with all 1,200 Kyber bricks, 380 characters and 135 ships.',
      meta: 'Four games · 100.0% each', alt: 'Completion screens from four LEGO Star Wars games, all at 100 percent' },
    'lego-pirates-hundred': { src: 'lego/pirates/pause-screen.jpg', title: 'LEGO Pirates of the Caribbean',
      desc: 'A hundred percent, eleven and a half billion studs, and every collectable in the game: 200 gold bricks, 20 red hats, 20 minikit-ships, 85 characters and 160 of everything else.',
      meta: '11,536,474,040 studs', alt: 'LEGO Pirates of the Caribbean paused at 100 percent completion',
      done: true, finished: '2023-09-28' },

    /* The three Steam collection views. Each one is the library filtered to a
       licence and sorted by percentage of achievements complete, so the row of
       hundreds at the top is the receipt and the count in the tab is how many
       games that collection holds. Shown on the franchise page each belongs to
       and again on /gaming/, where the four of them are the wall. */
    'sw-shelf': { src: 'star-wars/shelf.jpg', title: 'The Star Wars shelf',
      desc: 'LEGO The Force Awakens, LEGO The Skywalker Saga, Droid Repair Bay, Jedi: Fallen Order, Jedi: Survivor and Outlaws, all at a hundred percent.',
      meta: '36 in the collection', alt: 'A row of Star Wars game covers, each marked 100% Complete' },
    'ww-shelf': { src: 'harry-potter/shelf.jpg', title: 'Five games, three platinums',
      desc: 'Quidditch Champions, Hogwarts Legacy and the LEGO Harry Potter Collection at a hundred percent. The two standalone LEGO years have no achievements to earn, which is the only reason they are not marked too.',
      meta: 'Wizarding World · 5', alt: 'Wizarding World game covers, three marked 100% Complete' },
    'spidey-shelf': { src: 'spider-man/shelf.jpg', title: 'The Insomniac trilogy',
      desc: 'Spider-Man Remastered, Miles Morales and Spider-Man 2. Every side mission, every backpack, every suit. The web-swinging in these is the closest a game has come to making a superpower feel like a skill.',
      meta: 'Three games · 100.0% each', alt: 'Spider-Man 2, Miles Morales and Spider-Man Remastered, each marked 100% Complete' },

    /* ── the Insomniac trilogy, all three at a hundred percent ──
       One shelf frame each is on the wall further up /gaming/; these are the
       screens the games print for themselves. Every figure below is read off
       the frame it is under. */
    'spidey-1-banner': { src: 'spider-man/spider-man-1/banner.jpg', title: 'Spider-Man Remastered, 78 of 78',
      desc: 'The library banner as the receipt: 39.4 hours, every one of the seventy-eight achievements, and the collection\u2019s hundred percent tag in the corner.',
      meta: '39.4 hours \u00b7 78/78', alt: 'Steam library banner for Marvel\u2019s Spider-Man Remastered, showing 39.4 hours and 78 of 78 achievements' },
    'spidey-1-profiles': { src: 'spider-man/spider-man-1/load-game.jpg', title: 'Two profiles, back to back',
      desc: 'Profile 1 at 100% on Spectacular, level 50, dated 9/24/2024; Profile 2 a New Game+ run on Ultimate started the next day and already 61% through the story. The panel underneath is the game offering New Game+ for the first time.',
      meta: 'Spectacular \u00b7 then Ultimate', alt: 'The Spider-Man profile select screen: one save at 100% and a New Game+ save at 61%' },
    'spidey-1-main-story': { src: 'spider-man/spider-man-1/main-story.jpg', title: 'Main story finished',
      desc: 'The alert the game throws when the story is done: the time of day unlocks in the research stations, and Ultimate difficulty and New Game+ open up.',
      meta: 'SUCCESS!!!', alt: 'A Marvel\u2019s Spider-Man alert reading Congratulations, you have finished the main story' },
    'spidey-1-all-stories': { src: 'spider-man/spider-man-1/all-stories.jpg', title: 'Every story, DLC included',
      desc: 'The Additional Content tab with all four at a hundred percent: the main story, then The Heist, Turf Wars and Silver Lining, which are the three chapters of The City That Never Sleeps.',
      meta: 'Main story + three DLC', alt: 'The Spider-Man additional content menu with the main story and three DLC chapters all at 100%' },
    'spidey-1-skills': { src: 'spider-man/spider-man-1/skills.jpg', title: 'All three trees',
      desc: 'Innovator, Defender and Webslinger at a hundred percent each, at level 50 with 35 resources left over.',
      meta: 'Level 50 \u00b7 100% \u00d7 3', alt: 'The Spider-Man skills screen with all three trees at 100%' },
    'spidey-1-suits': { src: 'spider-man/spider-man-1/suits.jpg', title: 'The Advanced Suit',
      desc: 'The suit the game puts on the cover, and the one worth ending on. The tab reads 100% complete: every suit, every mod, every suit power.',
      meta: 'Suits \u00b7 100% complete', alt: 'The Spider-Man suit menu showing the Advanced Suit and 100% complete' },

    'spidey-mm-banner': { src: 'spider-man/miles-morales/banner.jpg', title: 'Miles Morales, 50 of 50',
      desc: 'Seventeen and a bit hours, which is the shortest of the three and the tightest.',
      meta: '17.3 hours \u00b7 50/50', alt: 'Steam library banner for Marvel\u2019s Spider-Man: Miles Morales, showing 17.3 hours and 50 of 50 achievements' },
    'spidey-mm-last': { src: 'spider-man/miles-morales/all-achievements.jpg', title: 'The last one',
      desc: 'Plus Plus, for finishing the game on New Game+, and the toast that comes with it: all achievements unlocked, 50/50.',
      meta: 'Plus Plus', alt: 'A Steam toast reading you have unlocked all achievements, 50 of 50' },
    'spidey-mm-achievements': { src: 'spider-man/miles-morales/achievements.jpg', title: 'Be Yourself',
      desc: 'The achievement list with the timestamp on it: Be Yourself, collect all achievements, unlocked 2 March 2026 at 1:32 AM, in the same minute as Plus Plus above it.',
      meta: 'Unlocked 2 Mar 2026 \u00b7 1:32 AM', alt: 'The Steam achievement list for Miles Morales, every achievement unlocked' },

    'spidey-2-banner': { src: 'spider-man/spider-man-2/banner.jpg', title: 'Spider-Man 2, 43 of 43',
      desc: 'Forty and a bit hours across both of them, Peter and Miles, and the symbiote arc in the middle.',
      meta: '40.4 hours \u00b7 43/43', alt: 'Steam library banner for Marvel\u2019s Spider-Man 2, showing 40.4 hours and 43 of 43 achievements' },
    'spidey-2-last': { src: 'spider-man/spider-man-2/all-achievements.jpg', title: 'Once More, With Feeling',
      desc: 'The last achievement of the three games: finish the main story in New Game+. 43 of 43, a hundred percent.',
      meta: 'The last of all three', alt: 'A Steam toast reading you have unlocked all achievements, 43 of 43' },
    'spidey-2-skills': { src: 'spider-man/spider-man-2/skills.jpg', title: 'Level 60',
      desc: 'The abilities screen near the end: level 60, three skill points spare, and the gadget upgrades being bought out.',
      meta: 'Level 60', alt: 'The Spider-Man 2 abilities screen at level 60' },

    /* ── not a game at all ── */
    'oi-order': { src: 'gaming/oi-order.jpg', title: 'The Oi Order',
      desc: 'Eleven lines of Python on a Windows laptop, in IDLE, run five times in a row and landing on a different one of the five names each time. It picks a member of the Oi High Council at random and announces who the smartest person in the Oi Order is; when it lands on Oi_MasterThingW it prints THE SHELL HAS SPOKEN, and when it lands on anybody else it prints THE SHELL HAS MADE A MISTAKE and names me instead. Python 3.8.5, saved as The Oi Order.py.',
      meta: 'random.choice \u00b7 five names', alt: 'A Python script open in IDLE beside a shell that has run it six times' },

    /* ── the four Steam Replays ──
       Steam publishes one of these per year in December and it expires with
       the page; these are my own captures of mine, all four taken in one
       sitting on 27 December 2025. Every figure in the captions below is read
       off the card itself. Steam gives percentages of a year rather than
       hours, so there are no hours here: a share of a year and a number of
       sessions is all the card knows, and inventing an hours column out of it
       would be a guess. */
    'steam-2022': { src: 'gaming/steam/2022.jpg', title: 'Steam Replay 2022',
      desc: '23 games played, 19 of them new, and 132 achievements across 9 of them, 55 of those rare. The top three are all LEGO Star Wars: the Skywalker Saga at 45% of the year over 73 sessions, The Complete Saga at 19% over another 73, and The Force Awakens at 14% over 27.',
      meta: '16-day streak · 3 to 19 July', alt: 'Steam Replay 2022: 23 games played, 132 achievements, a 16 day streak' },
    'steam-2022-vs': { src: 'gaming/steam/2022-vs-steam.jpg', title: 'Against the rest of Steam',
      desc: '132 achievements against a community median of 21, 23 games against a median of 5, and a 16-day streak against a median of 10.',
      meta: '2022 · How You Compare', alt: 'Steam Replay 2022 comparison bars against the Steam community medians' },
    'steam-2022-vr': { src: 'gaming/steam/2022-vr.jpg', title: 'The one VR year',
      desc: 'Four VR games and eight sessions, one percent of the playtime: Blade & Sorcery took 85% of that, Car Parking Simulator 13%, and Virtual Vacations and Broomball the rest. The only year the Replay lists a headset among the devices.',
      meta: '2022 · Windows, macOS and VR', alt: 'Steam Replay 2022 VR card: four games, eight sessions, one percent of playtime' },
    'steam-2023': { src: 'gaming/steam/2023.jpg', title: 'Steam Replay 2023',
      desc: '40 games, 28 of them new, and 96 achievements across 14. Jedi: Survivor took 38% of the year over 144 sessions, which is more sessions than any other game in these four years; Hogwarts Legacy 13% over 22; LEGO Pirates of the Caribbean 12% over 13.',
      meta: '8-day streak · 23 September to 1 October', alt: 'Steam Replay 2023: 40 games played, 96 achievements, an 8 day streak' },
    'steam-2023-vs': { src: 'gaming/steam/2023-vs-steam.jpg', title: 'Against the rest of Steam',
      desc: '96 achievements against a median of 16, 40 games against a median of 4, and an 8-day streak against a median of 5.',
      meta: '2023 · How You Compare', alt: 'Steam Replay 2023 comparison bars against the Steam community medians' },
    'steam-2024': { src: 'gaming/steam/2024.jpg', title: 'Steam Replay 2024',
      desc: '46 games, 20 new plus a demo and a playtest, and 351 achievements across 17 games, 83 of them rare: 255 more than the year before and the most of any year here. Bloons TD 6 took 23% over 82 sessions, Red Dead Redemption 2 21% over 36, Star Wars Outlaws 12% over 60.',
      meta: '12-day streak · 31 August to 12 September', alt: 'Steam Replay 2024: 46 games played, 351 achievements, a 12 day streak' },
    'steam-2024-vs': { src: 'gaming/steam/2024-vs-steam.jpg', title: 'Against the rest of Steam',
      desc: '351 achievements against a community median of 13, 46 games against a median of 4, and a 12-day streak against a median of 6. The widest the gap gets in these four years.',
      meta: '2024 · How You Compare', alt: 'Steam Replay 2024 comparison bars against the Steam community medians' },
    'steam-2025': { src: 'gaming/steam/2025.jpg', title: 'Steam Replay 2025',
      desc: '28 games, 11 new, and 168 achievements across 14. Battlefront II took 23% of the year over 83 sessions, Overwatch 2 22% over 26, and the LEGO Harry Potter Collection 22% over 16 sessions, picked up in August and finished the same month with all 84 of its achievements.',
      meta: '11-day streak · 11 to 22 June', alt: 'Steam Replay 2025: 28 games played, 168 achievements, an 11 day streak' },
    'steam-2025-vs': { src: 'gaming/steam/2025-vs-steam.jpg', title: 'Against the rest of Steam',
      desc: '168 achievements against a median of 11, 28 games against a median of 4, and an 11-day streak against a median of 6.',
      meta: '2025 · How You Compare', alt: 'Steam Replay 2025 comparison bars against the Steam community medians' },
  },

  sets: {
    realm: { title: 'The Realm', note: 'July to August 2026 · four of us', grid: true, wide: true,
      lede: 'A Realm with three friends, GentleSigma, Quatic and ItsDauntless: from a beach on the fourth of July 2026 to the dragon on the nineteenth of August and the egg four days after that. Shaders on, Lunar Client, and the whole thing in twenty-one frames; the gear we did it with is below.',
      items: ['realm-day-one', 'realm-savanna', 'realm-portal-room', 'realm-the-end', 'realm-crystals', 'realm-the-dragon', 'realm-hitboxes',
              'realm-under-the-dragon', 'realm-quatic', 'realm-free-the-end', 'realm-exit-portal', 'realm-gentlesigma', 'realm-outer-end',
              'realm-end-city', 'realm-end-ship', 'realm-next-generation', 'realm-advancements', 'realm-sunset', 'realm-in-the-water',
              'realm-underwater', 'realm-nether-portal'] },

    'imagine-fun': { title: 'Disneyland, in Minecraft', note: 'Imagine Fun · mc.imaginefun.net', grid: true, wide: true,
      lede: 'Imagine Fun rebuilds the Disneyland Resort at real scale inside Minecraft, both parks, with the rides running and an economy of Kingdom Coins and pins on top of them. I have been on it since 2023 at least, under two names, and past a thousand rides. The Star Wars half of it has its own room on the Star Wars page.',
      items: ['if-castle', 'if-entrance-tunnel', 'if-fanatic', 'if-coins', 'if-halfway', 'if-ride-log', 'if-seventieth-pin', 'if-esplanade',
              'if-food-locker', 'if-scrooge', 'if-wondrous-journeys'] },

    'galaxys-edge': { title: 'Galaxy’s Edge, in Minecraft', note: 'Imagine Fun · Black Spire Outpost', grid: true, wide: true,
      lede: 'mc.imaginefun.net rebuilds the Disneyland Resort at real scale, Black Spire Outpost included, and its photographers will render you into it. My skin there is a Mandalorian called Abu Vizsla. The Falcon, Rise of the Resistance, Star Tours and the saber shops block for block, plus the ships that are not in Anaheim at all.',
      items: ['if-spawn', 'if-falcon', 'if-falcon-cockpit', 'if-escape-pod', 'if-starspeeder', 'if-razor-crest', 'if-laat', 'if-landspeeder',
              'if-dagobah', 'if-hoth', 'if-gold-kenobi', 'if-gold-kenobi-ignited', 'if-savis', 'if-legacy-saber-shop', 'if-dok-ondars', 'if-saber-locker'] },

    'may-the-fourth': { title: 'May the 4th on Imagine Fun', note: 'three years of it', grid: true, wide: true,
      lede: 'The server does May the 4th every year: an event book, secret achievements, Magic Shots by the staff photographers and, in 2025, a First Order invasion to fight with intel chips. The decorations go up on the Milk Stand and the Cantina, and the posters are of you.',
      items: ['if-may-the-fourth-2024', 'if-hyperspace-poster', 'if-magic-shot-falcon', 'if-magic-shot-tie', 'if-dj-r3x', 'if-throne',
              'if-vs-anakin', 'if-vs-obi-wan', 'if-luke-leia-han', 'if-hyperspace-ten', 'if-galaxy-far-far-away', 'if-milk-stand', 'if-ogas',
              'if-tie-echelon', 'if-boba-fett', 'if-first-order-invasion', 'if-first-order-fight', 'if-seventieth-pin'] },

    'star-wars-trivia': { title: 'Star Wars Trivia', note: 'Imagine Fun · 2024', grid: true, wide: true,
      lede: 'A hosted quiz in a purple room on the server. I won it more than once in the spring of 2024, and the seventy-five-point night is the one on the leaderboard.',
      items: ['if-trivia-seventy-five', 'if-trivia-top-three', 'if-trivia-quiz-stage', 'if-trivia-first', 'if-trivia-stage'] },

    'star-wars-mc': { title: 'Star Wars MC', note: 'the other server', grid: true, wide: true,
      lede: 'A Star Wars server rather than a Disneyland one: sabers in every colour, a blaster, and parkour in the lobby. Three frames, undated.',
      items: ['swmc-sabers', 'swmc-legacy', 'swmc-parkour'] },

    potterverse: { title: 'Potterverse', note: 'Hogwarts in Minecraft · February 2022', grid: true, wide: true,
      lede: 'A Hogwarts server, joined in February of sophomore year: sorted into Ravenclaw in the Great Hall, a prefect badge the same weekend, Ollivanders, the library, the Express on its viaduct. One visit back, in August 2024. The Minecraft page shows four of these; the rest are here.',
      items: ['pv-sorting', 'pv-ravenclaw', 'pv-express', 'pv-banners', 'pv-library', 'pv-ollivanders', 'pv-prefect-badge', 'pv-prefect', 'pv-owlery'] },

    pixelmon: { title: 'Pixelmon', note: 'my own screenshot · a server, years ago',
      lede: 'The other thing Minecraft servers were for: a mod that put the entire Pokémon system inside the game, running on a public server, with an economy and a jail and a rule against releasing anything at spawn.',
      items: ['pixelmon-mewtwo'] },

    'spider-man-hundred': { title: 'All Three, Platinum', note: 'Insomniac \u00b7 2024, 2026, 2026', grid: true, wide: true,
      lede: 'The shelf, and then what each of the three prints when you get to the end of it: the library banner with the play time on it, the save slots, the skill trees emptied out, and the toast for the last achievement. Remastered in September 2024, Miles Morales in March 2026, Spider-Man 2 four months later.',
      items: ['spidey-shelf', 'spidey-1-banner', 'spidey-1-profiles', 'spidey-1-main-story', 'spidey-1-all-stories',
              'spidey-1-skills', 'spidey-1-suits', 'spidey-mm-banner', 'spidey-mm-last', 'spidey-mm-achievements',
              'spidey-2-banner', 'spidey-2-last', 'spidey-2-skills'] },

    /* ── /gaming/ ──
       Two sets that belong to no single franchise, which is the whole reason
       that page exists. `steam-replay` runs a year per row: the card first,
       its comparison against the Steam medians second. */
    'steam-replay': { title: 'Four Steam Replays', note: '2022 to 2025 · captured 27 December 2025', two: true,
      lede: 'Steam writes one of these every December and takes it down again, so these are my own captures of my own four. A year per row: the card on the left, and on the right the same year set against the median Steam account. The figures underneath are read off the cards.',
      items: ['steam-2022', 'steam-2022-vs', 'steam-2023', 'steam-2023-vs', 'steam-2024', 'steam-2024-vs',
              'steam-2025', 'steam-2025-vs', 'steam-2022-vr'] },

    'oi-order': { title: 'The Oi Order', note: 'Python \u00b7 IDLE \u00b7 a Windows laptop', wide: true,
      lede: 'Not a game, and the only picture on this site that is a piece of code. The Oi Order was five of us and I gave it a High Council and a script to settle the only question that mattered. It is here because it belongs to exactly the same afternoons as everything else on this page.',
      items: ['oi-order'] },

    /* The three shelves and the one four-up completion screen. LEGO Pirates
       used to be a fifth frame here and came out on 2026-08-31: a single
       paused game sitting beside three whole collections was the odd one out,
       and it is still on /gaming/ a section further down, inside the LEGO
       catalogue where the other twelve finished games are. */
    'hundred-percent': { title: 'The Hundred Percents', note: 'every receipt I have', two: true,
      lede: 'Steam sorts a collection by percentage of achievements complete, which turns the library into a scoreboard. These are the three collection views I keep, plus the completion screens for the four LEGO Star Wars games in one frame. Each one is also on the page of the world it belongs to.',
      items: ['sw-shelf', 'ww-shelf', 'spidey-shelf', 'lego-star-wars-hundred'] },
  },

  /* ── when every frame was taken ─────────────────────────────────────────
     One row per picture the site serves, keyed by the same path as `src`
     above, and complete: assets/img/franchises/ and this table have exactly
     the same 230 entries, so no screenshot on this site is undated. Read by
     fanpage.js (the caption under every screenshot) and by gaming-data.js
     (the same, for the frames that have no row above), through when() below.

     THIS IS WHEN THE PICTURE WAS TAKEN, not when the thing in it happened.
     They are often different and both are worth printing: the Disneyland
     Fanatic achievement unlocked on 4 May 2024 and the frame of it is dated
     later, so its `meta` says the first and this says the second.

     WHERE EACH DATE COMES FROM. Every one of these files is in the Video Game
     Screenshots library on iCloud, which is the canonical copy and has its
     own README about exactly this; the value here is derived from it and from
     nothing else, in this order:

       1. a capture timestamp in the file's own name (Steam's
          `20240918004116_1`, Minecraft's `2026-08-19_18.18.54`, Xnip's
          `Xnip2025-12-27_21-52-03`, the Windows Snipping Tool's): 961 files
          in the library carry one, and it is exact;
       2. the same timestamp recovered from an older copy's name, recorded in
          the library's `crtime-plan-backups-20260830.txt`;
       3. the file's own creation date, where the file has never been through
          anything that resets one.

     A LEADING `<` MEANS "BEFORE", AND IT IS NOT A HEDGE. Two bulk copies and
     two batch re-encodes (2023-10-14, 2023-12-22, 2025-08-09 and 2025-09-28)
     overwrote the creation dates of about 900 files in the library years
     before any of this, and a copy date is an upper bound: the picture is
     older than that, by an unknown amount, and the library has no second
     source for it. Ninety of the frames here are in that state and say so
     rather than printing a date that is really the day a folder was moved.
     One test does most of that work: a batch re-encode leaves a
     "Compressed by jpeg-recompress" comment in the file, so a 2025-09-28 file
     without the marker was captured that evening rather than rewritten.

     A DAY WITH NO TIME is a file whose name and whose clock disagree by more
     than a minute, which is the same instant read in two timezones: the nine
     Steam Replay captures were named at 21:52 and are stamped 12:52, so they
     keep the day, 27 December 2025, and drop the hour. */
  dates: {
    'fnaf/fnaf-1/art.jpg':                                         '<2023-11-06',
    'fnaf/fnaf-1/banner.jpg':                                      '2026-08-25 14:55',
    'fnaf/fnaf-1/seventh-night.jpg':                               '2023-11-09 18:37',
    'fnaf/fnaf-1/three-stars.jpg':                                 '2023-11-09 18:37',

    'fnaf/fnaf-2/banner.jpg':                                      '2026-08-25 14:55',
    'fnaf/fnaf-2/night-five.jpg':                                  '<2025-09-28',
    'fnaf/fnaf-2/night-six.jpg':                                   '<2025-09-28',

    'gaming/oi-order.jpg':                                         '<2023-10-14',

    'gaming/steam/2022-vr.jpg':                                    '2025-12-27',
    'gaming/steam/2022-vs-steam.jpg':                              '2025-12-27',
    'gaming/steam/2022.jpg':                                       '2025-12-27',
    'gaming/steam/2023-vs-steam.jpg':                              '2025-12-27',
    'gaming/steam/2023.jpg':                                       '2025-12-27',
    'gaming/steam/2024-vs-steam.jpg':                              '2025-12-27',
    'gaming/steam/2024.jpg':                                       '2025-12-27',
    'gaming/steam/2025-vs-steam.jpg':                              '2025-12-27',
    'gaming/steam/2025.jpg':                                       '2025-12-27',

    'harry-potter/hogwarts-legacy/acceptance-letter.jpg':          '2024-11-05 23:51',
    'harry-potter/hogwarts-legacy/all-houses.jpg':                 '2024-11-07 01:34',
    'harry-potter/hogwarts-legacy/banner.jpg':                     '<2025-09-28',
    'harry-potter/hogwarts-legacy/challenges.jpg':                 '2024-11-05 02:07',
    'harry-potter/hogwarts-legacy/highlands-map.jpg':              '2024-11-05 01:17',
    'harry-potter/hogwarts-legacy/hogwarts-map.jpg':               '2024-11-05 23:50',
    'harry-potter/hogwarts-legacy/menu.jpg':                       '2024-11-05 02:10',
    'harry-potter/hogwarts-legacy/story-complete.jpg':             '2024-10-24 15:04',

    'harry-potter/potterverse/2024-08-24-0116-owlery.jpg':         '2024-08-24 01:16',
    'harry-potter/potterverse/hogwarts-express.jpg':               '<2023-10-14',
    'harry-potter/potterverse/house-banners.jpg':                  '<2023-10-14',
    'harry-potter/potterverse/library.jpg':                        '<2023-10-14',
    'harry-potter/potterverse/ollivanders.jpg':                    '<2023-10-14',
    'harry-potter/potterverse/prefect-badge.jpg':                  '<2023-10-14',
    'harry-potter/potterverse/prefect.jpg':                        '<2023-10-14',
    'harry-potter/potterverse/ravenclaw.jpg':                      '<2023-10-14',
    'harry-potter/potterverse/sorting.jpg':                        '<2023-10-14',

    'harry-potter/quidditch-champions/banner.jpg':                 '<2025-09-28',
    'harry-potter/quidditch-champions/last-achievement.jpg':       '<2025-09-28',
    'harry-potter/quidditch-champions/skill-points.jpg':           '2025-09-26 23:34',
    'harry-potter/quidditch-champions/victory.jpg':                '2025-09-26 23:33',

    'harry-potter/shelf.jpg':                                      '<2025-09-28',

    'lego/batman-2/banner.jpg':                                    '2026-08-13 02:04',
    'lego/batman-2/characters.jpg':                                '2026-08-13 02:03',
    'lego/batman-2/load-game.jpg':                                 '2026-08-13 02:01',
    'lego/batman-2/pause-screen.jpg':                              '2026-08-13 01:58',
    'lego/batman-2/start-screen.jpg':                              '2026-08-12 00:52',

    'lego/batman/banner.jpg':                                      '2026-08-07 01:02',
    'lego/batman/characters.jpg':                                  '2026-04-20 02:33',
    'lego/batman/load-game.jpg':                                   '2026-04-20 02:37',
    'lego/batman/pause-screen.jpg':                                '2026-04-20 02:35',
    'lego/batman/start-screen.jpg':                                '2026-03-07 14:11',

    'lego/clone-wars/banner.jpg':                                  '2026-08-07 01:11',
    'lego/clone-wars/characters.jpg':                              '<2023-10-14',
    'lego/clone-wars/load-game.jpg':                               '<2023-10-14',
    'lego/clone-wars/pause-screen.jpg':                            '<2023-10-14',
    'lego/clone-wars/start-screen.jpg':                            '2026-08-25 03:28',

    'lego/complete-saga/banner.jpg':                               '2026-08-07 01:09',
    'lego/complete-saga/characters.jpg':                           '<2023-10-14',
    'lego/complete-saga/load-game.jpg':                            '<2023-10-14',
    'lego/complete-saga/pause-screen.jpg':                         '2026-08-11 13:45',
    'lego/complete-saga/start-screen.jpg':                         '2026-08-11 13:47',
    'lego/complete-saga/stud-fountain.jpg':                        '<2023-10-14',

    'lego/force-awakens/banner.jpg':                               '<2023-10-14',
    'lego/force-awakens/characters.jpg':                           '<2023-10-14',
    'lego/force-awakens/galaxy-map.jpg':                           '<2023-10-14',
    'lego/force-awakens/load-game.jpg':                            '<2023-10-14',
    'lego/force-awakens/pause-screen.jpg':                         '<2023-10-14',
    'lego/force-awakens/start-screen.jpg':                         '<2023-10-14',

    'lego/harry-potter-years-1-4/banner.jpg':                      '<2025-09-28',
    'lego/harry-potter-years-1-4/characters.jpg':                  '2025-09-02 21:41',
    'lego/harry-potter-years-1-4/load-game.jpg':                   '2025-09-02 22:05',
    'lego/harry-potter-years-1-4/pause-screen.jpg':                '2025-09-02 22:05',
    'lego/harry-potter-years-1-4/start-screen.jpg':                '2023-09-29 16:13',

    'lego/harry-potter-years-5-7/banner.jpg':                      '<2025-09-28',
    'lego/harry-potter-years-5-7/characters.jpg':                  '2026-08-11 13:17',
    'lego/harry-potter-years-5-7/load-game.jpg':                   '2025-09-20 00:36',
    'lego/harry-potter-years-5-7/pause-screen.jpg':                '2025-09-20 00:35',
    'lego/harry-potter-years-5-7/start-screen.jpg':                '2025-09-03 17:02',
    'lego/harry-potter-years-5-7/stud-fountain.jpg':               '2025-09-20 00:36',

    'lego/indiana-jones-2/banner.jpg':                             '2026-08-07 00:25',
    'lego/indiana-jones-2/load-game.jpg':                          '2026-08-07 00:16',
    'lego/indiana-jones-2/pause-screen.jpg':                       '2026-08-07 00:23',
    'lego/indiana-jones-2/start-screen.jpg':                       '2026-08-03 01:58',

    'lego/indiana-jones/banner.jpg':                               '2023-09-16 14:01',
    'lego/indiana-jones/characters.jpg':                           '2026-08-11 13:12',
    'lego/indiana-jones/load-game.jpg':                            '2023-09-16 14:01',
    'lego/indiana-jones/pause-screen.jpg':                         '2026-08-11 13:12',
    'lego/indiana-jones/start-screen.jpg':                         '2023-06-10 22:19',
    'lego/indiana-jones/stud-fountain.jpg':                        '2023-09-16 13:57',

    'lego/lord-of-the-rings/banner.jpg':                           '2026-08-30 00:14',
    'lego/lord-of-the-rings/characters.jpg':                       '2026-08-30 00:12',
    'lego/lord-of-the-rings/load-game.jpg':                        '2026-08-30 00:05',
    'lego/lord-of-the-rings/pause-screen.jpg':                     '2026-08-29 23:56',
    'lego/lord-of-the-rings/start-screen.jpg':                     '2026-08-13 18:32',

    'lego/marvel-super-heroes/banner.jpg':                         '2026-08-02 17:46',
    'lego/marvel-super-heroes/characters.jpg':                     '2026-08-02 17:02',
    'lego/marvel-super-heroes/load-game.jpg':                      '2026-08-02 17:36',
    'lego/marvel-super-heroes/pause-screen.jpg':                   '2026-08-02 17:35',
    'lego/marvel-super-heroes/start-screen.jpg':                   '2026-08-25 03:28',

    'lego/pirates/banner.jpg':                                     '2023-09-28 16:01',
    'lego/pirates/characters.jpg':                                 '2023-09-28 15:51',
    'lego/pirates/load-game.jpg':                                  '2023-09-28 16:01',
    'lego/pirates/pause-screen.jpg':                               '2023-09-28 16:01',
    'lego/pirates/start-screen.jpg':                               '2026-08-13 02:30',

    'lego/skywalker-saga/banner.jpg':                              '<2023-10-14',
    'lego/skywalker-saga/characters.jpg':                          '<2023-10-14',
    'lego/skywalker-saga/load-game.jpg':                           '<2023-10-14',
    'lego/skywalker-saga/pause-screen.jpg':                        '<2023-10-14',
    'lego/skywalker-saga/start-screen.jpg':                        '2022-04-09 15:29',
    'lego/skywalker-saga/stud-fountain.jpg':                       '<2023-10-14',

    'lego/thirty-years.jpg':                                       '2026-04-28 02:19',

    'minecraft/imagine-fun/2025-05-27-2250-halfway.jpg':           '2025-05-27 22:50',
    'minecraft/imagine-fun/2025-07-22-0203-ride-log.jpg':          '2025-07-22 02:03',
    'minecraft/imagine-fun/2025-07-22-0204-seventieth-pin.jpg':    '2025-07-22 02:04',
    'minecraft/imagine-fun/2026-02-14-1324-esplanade.jpg':         '2026-02-14 13:24',
    'minecraft/imagine-fun/disney100-castle.jpg':                  '<2023-10-14',
    'minecraft/imagine-fun/disneyland-fanatic.jpg':                '<2025-09-28',
    'minecraft/imagine-fun/entrance-tunnel.jpg':                   '<2023-12-22',
    'minecraft/imagine-fun/food-locker.jpg':                       '2023-08-20 16:19',
    'minecraft/imagine-fun/hundred-thousand-coins.jpg':            '<2023-10-14',
    'minecraft/imagine-fun/scrooge-mcduck.jpg':                    '<2023-10-14',
    'minecraft/imagine-fun/wondrous-journeys.jpg':                 '<2023-10-14',

    'minecraft/pixelmon/mewtwo.jpg':                               '<2023-10-14',

    'minecraft/realms/2026-07-04-2009-day-one.jpg':                '2026-07-04 20:09',
    'minecraft/realms/2026-07-28-0111-savanna.jpg':                '2026-07-28 01:11',
    'minecraft/realms/2026-08-19-1818-portal-room.jpg':            '2026-08-19 18:18',
    'minecraft/realms/2026-08-19-1819-the-end.jpg':                '2026-08-19 18:19',
    'minecraft/realms/2026-08-19-1822-crystals.jpg':               '2026-08-19 18:22',
    'minecraft/realms/2026-08-19-1824-hitboxes.jpg':               '2026-08-19 18:24',
    'minecraft/realms/2026-08-19-1824-the-dragon.jpg':             '2026-08-19 18:24',
    'minecraft/realms/2026-08-19-1826-under-the-dragon.jpg':       '2026-08-19 18:26',
    'minecraft/realms/2026-08-19-1828-quatic.jpg':                 '2026-08-19 18:28',
    'minecraft/realms/2026-08-19-1830-free-the-end.jpg':           '2026-08-19 18:30',
    'minecraft/realms/2026-08-19-1831-exit-portal.jpg':            '2026-08-19 18:31',
    'minecraft/realms/2026-08-19-1831-gentlesigma.jpg':            '2026-08-19 18:31',
    'minecraft/realms/2026-08-19-1833-outer-end.jpg':              '2026-08-19 18:33',
    'minecraft/realms/2026-08-19-1834-end-city.jpg':               '2026-08-19 18:34',
    'minecraft/realms/2026-08-19-1903-end-ship.jpg':               '2026-08-19 19:03',
    'minecraft/realms/2026-08-23-2315-next-generation.jpg':        '2026-08-23 23:15',
    'minecraft/realms/2026-08-23-2344-advancements.jpg':           '2026-08-23 23:44',
    'minecraft/realms/2026-08-23-2349-in-the-water.jpg':           '2026-08-23 23:49',
    'minecraft/realms/2026-08-23-2349-sunset.jpg':                 '2026-08-23 23:49',
    'minecraft/realms/2026-08-23-2350-nether-portal.jpg':          '2026-08-23 23:50',
    'minecraft/realms/2026-08-23-2350-underwater.jpg':             '2026-08-23 23:50',
    'minecraft/realms/gear-abbasid-vanguard.jpg':                  '2026-08-23 23:47',
    'minecraft/realms/gear-burrow.jpg':                            '2026-08-23 23:47',
    'minecraft/realms/gear-death-star.jpg':                        '2026-08-23 23:47',
    'minecraft/realms/gear-dragon-egg.jpg':                        '2026-08-23 23:49',
    'minecraft/realms/gear-fetts-jetpack.jpg':                     '2026-08-23 23:49',
    'minecraft/realms/gear-harvest.jpg':                           '2026-08-23 23:47',
    'minecraft/realms/gear-ice-longclaw.jpg':                      '2026-08-23 23:47',
    'minecraft/realms/gear-mandalore.jpg':                         '2026-08-23 23:47',
    'minecraft/realms/gear-mjolnir.jpg':                           '2026-08-23 23:47',
    'minecraft/realms/gear-nimbus-vecna.jpg':                      '2026-08-23 23:48',
    'minecraft/realms/gear-rashidun-sentinel.jpg':                 '2026-08-23 23:47',
    'minecraft/realms/gear-stormbreaker.jpg':                      '2026-08-23 23:47',

    'spider-man/miles-morales/achievements.jpg':                   '2026-03-02 01:38',
    'spider-man/miles-morales/all-achievements.jpg':               '2026-03-02 01:37',
    'spider-man/miles-morales/banner.jpg':                         '2026-03-02 01:37',

    'spider-man/shelf.jpg':                                        '2026-08-02 18:07',

    'spider-man/spider-man-1/all-stories.jpg':                     '2024-09-24 14:16',
    'spider-man/spider-man-1/banner.jpg':                          '<2025-09-28',
    'spider-man/spider-man-1/load-game.jpg':                       '2024-09-25 16:24',
    'spider-man/spider-man-1/main-story.jpg':                      '2024-09-21 17:30',
    'spider-man/spider-man-1/skills.jpg':                          '2024-09-22 13:50',
    'spider-man/spider-man-1/suits.jpg':                           '2024-09-24 14:16',

    'spider-man/spider-man-2/all-achievements.jpg':                '2026-07-25 17:56',
    'spider-man/spider-man-2/banner.jpg':                          '2026-07-25 17:56',
    'spider-man/spider-man-2/skills.jpg':                          '2026-07-09 19:37',

    'star-wars/battlefront-2/achievements.jpg':                    '2025-09-28 23:06',
    'star-wars/battlefront-2/banner.jpg':                          '<2025-09-28',
    'star-wars/battlefront-2/campaign-complete.jpg':               '2025-03-10 23:37',
    'star-wars/battlefront-2/milestones.jpg':                      '2025-09-28 23:06',

    'star-wars/droid-repair-bay/banner.jpg':                       '<2025-09-28',

    'star-wars/fallen-order/achievements.jpg':                     '<2024-03-22',
    'star-wars/fallen-order/banner.jpg':                           '<2024-03-22',
    'star-wars/fallen-order/load-game.jpg':                        '<2023-10-14',
    'star-wars/fallen-order/play-time.jpg':                        '2026-08-25 16:43',
    'star-wars/fallen-order/start-screen.jpg':                     '2024-03-17 11:03',
    'star-wars/fallen-order/tactical-guide.jpg':                   '2024-03-22 17:44',

    'star-wars/imagine-fun/a-galaxy-far-far-away.jpg':             '2025-05-18 15:20',
    'star-wars/imagine-fun/boba-fett.jpg':                         '2025-05-02 00:15',
    'star-wars/imagine-fun/dagobah.jpg':                           '<2023-12-22',
    'star-wars/imagine-fun/dj-r3x.jpg':                            '<2023-12-22',
    'star-wars/imagine-fun/dok-ondars-shop.jpg':                   '2024-05-12 00:47',
    'star-wars/imagine-fun/falcon-cockpit.jpg':                    '<2023-12-22',
    'star-wars/imagine-fun/first-order-fight.jpg':                 '2025-05-27 13:04',
    'star-wars/imagine-fun/first-order-invasion.jpg':              '<2025-09-28',
    'star-wars/imagine-fun/gold-kenobi-saber-ignited.jpg':         '<2023-12-22',
    'star-wars/imagine-fun/gold-kenobi-saber.jpg':                 '<2023-12-22',
    'star-wars/imagine-fun/hoth.jpg':                              '<2023-12-22',
    'star-wars/imagine-fun/hyperspace-mountain-poster.jpg':        '<2023-12-22',
    'star-wars/imagine-fun/hyperspace-mountain-ten-times.jpg':     '<2025-09-28',
    'star-wars/imagine-fun/laat-gunship.jpg':                      '<2023-12-22',
    'star-wars/imagine-fun/landspeeder.jpg':                       '<2023-12-22',
    'star-wars/imagine-fun/legacy-saber-shop.jpg':                 '2024-05-12 00:47',
    'star-wars/imagine-fun/luke-leia-and-han.jpg':                 '<2023-12-22',
    'star-wars/imagine-fun/magic-shot-falcon.jpg':                 '<2023-12-22',
    'star-wars/imagine-fun/magic-shot-tie-echelon.jpg':            '2024-05-12 00:50',
    'star-wars/imagine-fun/may-the-fourth-2024.jpg':               '2024-05-12 00:44',
    'star-wars/imagine-fun/milk-stand.jpg':                        '<2023-12-22',
    'star-wars/imagine-fun/millennium-falcon.jpg':                 '<2023-12-22',
    'star-wars/imagine-fun/ogas-cantina.jpg':                      '<2023-12-22',
    'star-wars/imagine-fun/razor-crest.jpg':                       '<2023-12-22',
    'star-wars/imagine-fun/rise-of-the-resistance-escape-pod.jpg': '<2023-12-22',
    'star-wars/imagine-fun/saber-locker.jpg':                      '2023-08-20 16:19',
    'star-wars/imagine-fun/savis-workshop.jpg':                    '<2023-12-22',
    'star-wars/imagine-fun/spawn.jpg':                             '<2023-12-22',
    'star-wars/imagine-fun/starspeeder-1000.jpg':                  '<2023-12-22',
    'star-wars/imagine-fun/the-throne.jpg':                        '<2023-12-22',
    'star-wars/imagine-fun/tie-echelon.jpg':                       '<2023-12-22',
    'star-wars/imagine-fun/trivia-2024-05-31-first.jpg':           '2024-05-31 20:07',
    'star-wars/imagine-fun/trivia-2024-06-15-stage.jpg':           '2024-06-15 13:56',
    'star-wars/imagine-fun/trivia-quiz-stage.jpg':                 '<2023-12-22',
    'star-wars/imagine-fun/trivia-seventy-five.jpg':               '<2023-12-22',
    'star-wars/imagine-fun/trivia-top-three.jpg':                  '<2023-12-22',
    'star-wars/imagine-fun/vs-anakin.jpg':                         '<2023-12-22',
    'star-wars/imagine-fun/vs-obi-wan.jpg':                        '<2023-12-22',

    'star-wars/lego-hundred-percent.jpg':                          '<2025-09-28',
    'star-wars/shelf.jpg':                                         '<2025-09-28',

    'star-wars/outlaws/achievements.jpg':                          '<2025-09-28',
    'star-wars/outlaws/all-achievements.jpg':                      '<2025-09-28',
    'star-wars/outlaws/banner.jpg':                                '<2025-09-28',

    'star-wars/star-wars-mc/legacy-sabers.jpg':                    '<2023-10-14',
    'star-wars/star-wars-mc/parkour.jpg':                          '<2023-10-14',
    'star-wars/star-wars-mc/saber-inventory.jpg':                  '<2023-10-14',

    'star-wars/survivor/achievements.jpg':                         '<2023-10-14',
    'star-wars/survivor/banner.jpg':                               '<2023-10-14',
    'star-wars/survivor/galaxy-map.jpg':                           '<2023-10-14',
    'star-wars/survivor/load-game.jpg':                            '<2023-10-14',
    'star-wars/survivor/start-screen.jpg':                         '<2023-10-14',
    'star-wars/survivor/tactical-guide.jpg':                       '<2023-10-14',
  },

  /* '2026-08-19 18:18' -> '19 Aug 2026 · 6:18 PM', '2026-08' -> 'August 2026',
     '<2023-10-14' -> 'before 14 Oct 2023'. The table holds machine-readable
     values and this is the only place they are turned into words, so every
     date on every page is formatted the same way. */
  when: function (src) {
    var v = (this.dates && this.dates[src]) || '';
    /* A frame dropped in since this table was last written still gets a date
       if its NAME carries one, `YYYY-MM-DD-HHMM-slug`, the way the photographs
       are named. That is what keeps "add a picture" from meaning "edit a data
       file": the table is for the frames whose names cannot say it. */
    if (!v) {
      var n = /(\d{4})-(\d{2})-(\d{2})-(\d{2})(\d{2})-[^/]*$/.exec(String(src));
      if (n) v = n[1] + '-' + n[2] + '-' + n[3] + ' ' + n[4] + ':' + n[5];
    }
    var before = v.charAt(0) === '<';
    if (before) v = v.slice(1);
    var m = /^(\d{4})-(\d{2})(?:-(\d{2}))?(?: (\d{2}):(\d{2}))?$/.exec(v);
    if (!m) return v;
    var SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var LONG = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
                'August', 'September', 'October', 'November', 'December'];
    var out = m[3] ? (+m[3]) + ' ' + SHORT[+m[2] - 1] + ' ' + m[1]
                   : LONG[+m[2] - 1] + ' ' + m[1];
    if (m[4]) {
      var h = +m[4];
      out += ' · ' + ((h % 12) || 12) + ':' + m[5] + ' ' + (h >= 12 ? 'PM' : 'AM');
    }
    return before ? 'before ' + out : out;
  },

};
