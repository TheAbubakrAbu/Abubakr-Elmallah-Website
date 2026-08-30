/* gaming-data.js: /gaming/, the third of the three pages that are about me
   rather than about somebody else's world. Travels is where I have been,
   Accents is what I sound like, and this is what I have played.

   TWO HALVES, AND THE RULE IS DIFFERENT IN EACH.

   The top half is a hub. Every game already lives on the page of the world it
   belongs to: the TT Games catalogue with its sort control on /worlds/lego/,
   the thirty-six Star Wars games on /worlds/star-wars/, the Realm on
   /worlds/minecraft/. Copying any of those LISTS here would give the site two
   versions of the same games that drift apart the first time one is
   corrected, so what is up there is only what belongs to no single world: the
   four Steam Replays, the completion shelves, where I actually play, and one
   card per world with games in it, pointing at the page that holds the list.

   The bottom half is the opposite: EVERY PICTURE, in a section per franchise.
   It is not written down here either. src/gaming.html has Jekyll list what is
   actually in assets/img/franchises/ at build time into window.GAME_PICS, and
   this file groups that list by folder. So a new capture is three steps and
   none of them are on this page: put the original in _originals/franchises/,
   run tools/shots.py, and it appears in its franchise's sheet on the next
   build with a caption read off its path. Give it a row in fan-shots.js as
   well and that row's caption, which is written off the pixels, is used
   instead. A whole new franchise folder gets its own section the same way.

   Nothing is shown twice: a frame used by the Replay set or the completion
   wall above is skipped when its franchise's sheet is built, which is why
   Spider-Man ends up with no sheet of its own (its one frame is on the wall).

   EVERY FIGURE IS READ OFF A CARD. Steam publishes a Replay each December and
   takes it down again, so the four here are my own captures, all taken in one
   sitting on 27 December 2025; the screenshots are in fan-shots.js under the
   `steam-replay` set and the numbers below come off them. Steam reports a
   SHARE OF A YEAR and a session count, never hours, so there are no hours on
   this page: an hours column derived from a percentage would be a guess.

   The per-year counts add up honestly in one direction only. "Games played"
   counts the same game again every year I opened it, so those four numbers
   cannot be summed into a library size; "new games" is once per game by
   definition, and 19 + 28 + 20 + 11 is a real total of 78.

   Loads after fan-shots.js, which it reads, and before fanpage.js, which
   renders what it builds. */

window.FAN_PAGE = (function gaming() {

  /* ── the written half ─────────────────────────────────────────────────── */

  var SECTIONS = [

    /* The strip is a summary of the four cards below it and nothing else:
       every figure here is printed on a frame further down the page, so none
       of it has to be taken on trust. */
    { id: 'numbers', kind: 'stats', title: 'Four Years, Counted', note: '2022 to 2025 · off my own cards',
      lede: 'What four Steam Replays add up to. Steam deals in percentages of a year rather than hours, so these are counts: games, achievements, sessions and days in a row.',
      items: [
        { title: '78', sub: 'games opened for the first time',
          desc: '19 in 2022, 28 in 2023, 20 in 2024, 11 in 2025. A game is new only once, so unlike the games-played counts these four can be added up.' },
        { title: '747', sub: 'achievements unlocked',
          desc: '132, then 96, then 351, then 168. Steam calls 211 of them rare, which means few enough of the people who own the game ever got them.' },
        { title: '351', sub: 'of them in 2024 alone',
          desc: 'Against a Steam community median of 13 that year, on a bar that runs most of the way across the card. 255 more than the year before it.' },
        { title: '144', sub: 'sessions in one game',
          desc: 'Jedi: Survivor in 2023, which took 38% of that year. No other game in the four comes near it: the next highest is Battlefront II at 83.' },
        { title: '16 days', sub: 'longest streak of days in a row',
          desc: '3 to 19 July 2022, five different games inside the run, most of them LEGO Star Wars. The Steam median that year was 10.' },
        { title: '4', sub: 'VR games, ever',
          desc: 'Eight sessions and one percent of 2022. No Replay since has listed a headset among the devices at all.' },
      ] },

    /* the nine frames: four year cards, four comparisons, and the VR one.
       Captioned once in fan-shots.js, because a screenshot is described in
       exactly one place on this site. */
    { id: 'steam', set: 'steam-replay' },

    /* the same rule: each of these five is also on the page of its own world,
       from the same row */
    { id: 'hundred', set: 'hundred-percent' },

    { id: 'where', kind: 'cards', title: 'Where I Actually Play', note: 'five places, one account',
      lede: 'The Replays only see Steam, and a good share of what I play has never been on it. This is the whole surface, in the order Steam ranks the ones it can see.',
      items: [
        { tag: 'Steam', title: 'Windows', sub: 'the main record', accent: '#5fa3ec',
          desc: 'Every one of the four Replays puts Windows first on its devices card, and every hundred percent further up this page was earned there.' },
        { tag: 'Steam', title: 'macOS', sub: 'all four years', accent: '#9ab4c8',
          desc: 'Each Replay counts a second device, every year without a gap: the same account and the same library, on a Mac.' },
        { tag: 'Headset', title: 'VR', sub: '2022 only', accent: '#b06fd8',
          desc: 'Four games and eight sessions, one percent of that year. Blade & Sorcery took 85% of that percent, Car Parking Simulator 13%, and Virtual Vacations and Broomball the rest.' },
        { tag: 'Off Steam', title: 'Minecraft', sub: 'Java · Lunar Client', accent: '#7fbf4f',
          desc: 'None of it appears in any Replay, and it is the game I have played longest: a Realm with three friends, and Imagine Fun, Potterverse, Star Wars MC and a Pixelmon server before it.',
          href: '/worlds/minecraft/', link: 'The Minecraft page' },
        { tag: 'Before all of it', title: 'A phone', sub: 'the oldest games here', accent: '#f0c040',
          desc: 'Angry Birds, Clash Royale in elementary school, Geometry Dash as a kid. Not one of them appears on a Replay card above.' },
      ] },

    /* One card per world on this site that has games in it, each pointing at
       the page that holds the actual list. The line on each card is about the
       GAMES, since the worlds themselves are described on /worlds/. */
    { id: 'worlds', kind: 'cards', title: 'The Game Worlds', note: 'seventeen pages · the lists live there',
      lede: 'Every world on this site I have played rather than only watched or read. The catalogues, the completion screens and the write-ups are all on those pages; this is the index to them, and every picture is underneath.',
      items: [
        { tag: 'Since I was a kid', title: 'Minecraft', sub: 'Java · Realms · four servers', accent: '#7fbf4f',
          desc: 'A Realm with three friends from July to August 2026, the dragon on the nineteenth, and twelve named tools with Mending on every one. Four public servers before it.',
          href: '/worlds/minecraft/', link: 'The page', meta: 'Never on Steam' },
        { tag: 'Steam · 36 in one collection', title: 'Star Wars', sub: 'six at a hundred percent', accent: '#ffe81f',
          desc: 'Fallen Order, Survivor, Outlaws, Droid Repair Bay and two LEGO ones sit at the top of the collection at 100%, and Battlefront II took 23% of my 2025 over 83 sessions.',
          href: '/worlds/star-wars/', link: 'The page', meta: 'Sorted by achievements' },
        { tag: 'TT Games · the whole catalogue', title: 'LEGO', sub: 'thirteen finished', accent: '#ffd21f',
          desc: 'Every LEGO game since 2005 with a sort control on it: by release date, by my rating, by my time, or by how long each one is reckoned to take. Thirteen at a hundred percent, and the Skywalker Saga alone is 79 hours of that.',
          href: '/worlds/lego/', link: 'The page', meta: 'Grid or list' },
        { tag: 'Wizarding World · 5', title: 'Harry Potter', sub: 'three platinums', accent: '#d9b45f',
          desc: 'Hogwarts Legacy, Quidditch Champions and the LEGO Harry Potter Collection, all three at a hundred percent. The two standalone LEGO years have no achievements to earn, which is the only reason they are not marked too.',
          href: '/worlds/harry-potter/', link: 'The page', meta: 'Plus Potterverse in Minecraft' },
        { tag: 'Insomniac · 3', title: 'Spider-Man', sub: 'all three, completely', accent: '#e02a3a',
          desc: 'Remastered, Miles Morales and Spider-Man 2: every side mission, every backpack, every suit. Remastered alone was 9% of my 2024 over 22 sessions.',
          href: '/worlds/spider-man/', link: 'The page', meta: '100.0% each' },
        { tag: 'Steam · 2 at 100%', title: 'Five Nights at Freddy’s', sub: 'the first two', accent: '#c98f4f',
          desc: 'Both finished with every achievement, including the custom night with everything turned up: 4.4 hours on the first and 6.2 on the second, most of them spent staring at a door.',
          href: '/worlds/five-nights-at-freddys/', link: 'The page', meta: 'Nov 2023 and Jul 2024' },
        { tag: '2024 · 21% of the year', title: 'Red Dead Redemption', sub: '36 sessions', accent: '#c9402f',
          desc: 'Started in June 2023 and properly played the year after: 36 sessions and 24 achievements in 2024, second only to Bloons TD 6 in that year.',
          href: '/worlds/red-dead/', link: 'The page', meta: 'Chapters and epilogues' },
        { tag: 'A mod, not a game', title: 'Pokémon', sub: 'Pixelmon · the Centers', accent: '#ffd43f',
          desc: 'The most Pokémon I ever played was a Minecraft mod on a public server with its own economy. The page also has every Pokémon Center I got to in Japan in July 2026.',
          href: '/worlds/pokemon/', link: 'The page', meta: 'Level 100 Mewtwo' },
        { tag: 'Chapter 1 · 2018-19', title: 'Fortnite', sub: 'seasons three to seven', accent: '#6fb0ff',
          desc: 'Omega at tier one hundred and the live events as they happened, plus Droid Tycoon: the Creative map I actually sank time into, which is an idle game living inside the same client.',
          href: '/worlds/fortnite/', link: 'The page', meta: 'Nothing since has come close' },
        { tag: 'Switch · March 2017', title: 'The Legend of Zelda', sub: 'Breath of the Wild', accent: '#e8c247',
          desc: 'The game that came home with the console. The page ranks the entries that actually changed the series and takes apart why the open world works.',
          href: '/worlds/zelda/', link: 'The page', meta: 'Since I was a kid' },
        { tag: 'Switch · summer 2017', title: 'Splatoon', sub: 'the three of them', accent: '#c6f03a',
          desc: 'Splatoon 2 first, in the summer of 2017: the shooter where the score is ground covered rather than people hit, which is why it plays like nothing else on the console.',
          href: '/worlds/splatoon/', link: 'The page', meta: 'Turf war' },
        { tag: 'Hardware', title: 'Nintendo', sub: 'the Switch, launch week', accent: '#e0403a',
          desc: 'The machines rather than any one series: what each console was built for, why the formula keeps working, and the people who made them.',
          href: '/worlds/nintendo/', link: 'The page', meta: 'March 2017' },
        { tag: 'Phone · since launch', title: 'Clash Royale', sub: 'elementary school', accent: '#6f9fe8',
          desc: 'Eight cards, a three-minute match and a game built out of pieces of Clash of Clans, which is the smartest asset reuse in mobile gaming.',
          href: '/worlds/clash-royale/', link: 'The page', meta: '2016' },
        { tag: 'Phone', title: 'Geometry Dash', sub: 'as far as Theory of Everything', accent: '#39d6f0',
          desc: 'One button, no checkpoints, and a difficulty curve that turns into a wall. The page ranks the main levels and shows how far past the wall it goes.',
          href: '/worlds/geometry-dash/', link: 'The page', meta: 'Ranked' },
        { tag: 'Phone', title: 'Angry Birds', sub: 'the ones you cannot buy', accent: '#e03a2a',
          desc: 'The whole flock, the games themselves, and the several that were pulled off the stores and cannot be bought at any price now.',
          href: '/worlds/angry-birds/', link: 'The page', meta: 'Delisted' },
        { tag: 'Arkham', title: 'Batman', sub: 'no powers, just preparation', accent: '#c9cdd2',
          desc: 'No powers, just preparation: the animated series and the Arkham games especially. My Arkham City captures go back far enough that Steam still stamped the game’s own id onto the file name.',
          href: '/worlds/batman/', link: 'The page', meta: 'Plus LEGO Batman 1 and 2' },
        { tag: 'LEGO · 100%', title: 'Pirates of the Caribbean', sub: 'eleven and a half billion studs', accent: '#d8c9a0',
          desc: 'The LEGO adaptation covers the first four films and is the only game that has ever let you play as Jack Sparrow properly. Finished in September 2023.',
          href: '/worlds/pirates/', link: 'The page', meta: 'Every collectable' },
      ] },
  ];

  /* the sign-off, pushed on last, after however many sheets there turn out
     to be */
  var LINKS =
    { id: 'links', kind: 'links', title: 'Elsewhere', note: 'the two outside sources this page leans on',
      items: [
        { title: 'Steam Replay', href: 'https://store.steampowered.com/replay/',
          desc: 'Steam builds one of these per account per year in December. It is the source of every number on this page, and it goes away again, which is why the four above are captures.' },
        { title: 'HowLongToBeat', href: 'https://howlongtobeat.com/',
          desc: 'Where the projected completion times on the LEGO catalogue come from: the community Completionist average per title, one methodology across the whole column.' },
      ] };

  /* ── the sheets: every picture, grouped by the folder it sits in ───────── */

  var SHOTS = window.FAN_SHOTS || {};
  var BASE = SHOTS.base || '/assets/img/franchises/';
  var PICS = (window.GAME_PICS || []).slice();

  /* One section per franchise, in this order. `lede` is the only prose down
     here; the counts after it are built from the files themselves. A folder
     that is not on this list still gets a section, at the end, named after
     itself, which is what makes a new franchise no work at all. */
  var FRANCHISES = [
    { dir: 'minecraft', title: 'Minecraft', accent: '#7fbf4f',
      lede: 'Every Minecraft frame the site has, and not one of them has ever been through Steam: a Realm with three friends, a Disneyland server, and a Pokémon mod on a public server years before either.' },
    { dir: 'star-wars', title: 'Star Wars', accent: '#ffe81f',
      lede: 'Star Wars here is mostly two Minecraft servers: Imagine Fun, which has Galaxy’s Edge built at real scale, and a Star Wars one with a saber in every colour.' },
    { dir: 'lego', title: 'LEGO', accent: '#ffd21f',
      lede: 'Every LEGO game I finished leaves the same set of frames: the title screen as it opens, the pause screen at a hundred percent, the save slot with the game’s own timestamp on it, and the characters grid. The hours, the ratings and the dates are on the LEGO page.' },
    { dir: 'harry-potter', title: 'Wizarding World', accent: '#d9b45f',
      lede: 'Three different things under one heading: Hogwarts Legacy, Quidditch Champions, and a Hogwarts server in Minecraft from February of sophomore year.' },
    { dir: 'spider-man', title: 'Spider-Man', accent: '#e02a3a',
      lede: 'The Insomniac trilogy.' },
    { dir: 'fnaf', title: 'Five Nights at Freddy’s', accent: '#c98f4f',
      lede: 'Both of the first two at a hundred percent, with the Steam library banners as the receipt.' },

    /* THE REST OF THESE HAVE NO PICTURES YET, and a franchise with no folder
       renders nothing at all, so they sit here dormant: the day a Red Dead or
       a Fortnite capture is dropped in, its section is already named and
       written rather than falling back to its own slug. That fallback still
       works for anything not listed here. */
    { dir: 'red-dead', title: 'Red Dead Redemption', accent: '#c9402f',
      lede: 'The one that took a fifth of my 2024, over 36 sessions.' },
    { dir: 'pokemon', title: 'Pokémon', accent: '#ffd43f',
      lede: 'Pokémon outside Minecraft; the Pixelmon frame is filed with Minecraft, where it was taken.' },
    { dir: 'fortnite', title: 'Fortnite', accent: '#6fb0ff',
      lede: 'Chapter 1, and the Creative maps that came after it.' },
    { dir: 'batman', title: 'Batman', accent: '#c9cdd2',
      lede: 'The Arkham games, which are the oldest Steam captures I have.' },
    { dir: 'nintendo', title: 'Nintendo', accent: '#e0403a',
      lede: 'The machines, and whatever was on the screen.' },
    { dir: 'zelda', title: 'The Legend of Zelda', accent: '#e8c247',
      lede: 'Hyrule.' },
    { dir: 'splatoon', title: 'Splatoon', accent: '#c6f03a',
      lede: 'Turf war: the score is ground covered, not people hit.' },
    { dir: 'clash-royale', title: 'Clash Royale', accent: '#6f9fe8',
      lede: 'Eight cards and three minutes.' },
    { dir: 'geometry-dash', title: 'Geometry Dash', accent: '#39d6f0',
      lede: 'One button, no checkpoints.' },
    { dir: 'angry-birds', title: 'Angry Birds', accent: '#e03a2a',
      lede: 'The flock, including the games nobody can buy any more.' },
    { dir: 'pirates', title: 'Pirates of the Caribbean', accent: '#d8c9a0',
      lede: 'Anything not filed under the LEGO game.' },

    { dir: 'gaming', title: 'Steam', accent: '#5fa3ec',
      lede: 'Steam’s own cards.' },
  ];

  /* What each folder is CALLED when it is printed. Names, not descriptions:
     the write-up of every one of these lives on its own page. A folder with no
     entry here is printed from its own name, so this map only has to grow when
     a slug reads badly. */
  var PLACES = {
    'minecraft/realms': 'The Realm',
    'minecraft/imagine-fun': 'Imagine Fun',
    'minecraft/pixelmon': 'Pixelmon',
    'star-wars/imagine-fun': 'Imagine Fun',
    'star-wars/star-wars-mc': 'Star Wars MC',
    'harry-potter/potterverse': 'Potterverse',
    'harry-potter/hogwarts-legacy': 'Hogwarts Legacy',
    'harry-potter/quidditch-champions': 'Quidditch Champions',
    'fnaf/fnaf-1': 'Five Nights at Freddy’s',
    'fnaf/fnaf-2': 'Five Nights at Freddy’s 2',
    'gaming/steam': 'Steam Replay',
    'lego/batman': 'LEGO Batman',
    'lego/batman-2': 'LEGO Batman 2',
    'lego/clone-wars': 'LEGO Star Wars III',
    'lego/complete-saga': 'LEGO Star Wars: The Complete Saga',
    'lego/force-awakens': 'LEGO Star Wars: The Force Awakens',
    'lego/harry-potter-years-1-4': 'LEGO Harry Potter: Years 1–4',
    'lego/harry-potter-years-5-7': 'LEGO Harry Potter: Years 5–7',
    'lego/indiana-jones': 'LEGO Indiana Jones',
    'lego/indiana-jones-2': 'LEGO Indiana Jones 2',
    'lego/lord-of-the-rings': 'LEGO The Lord of the Rings',
    'lego/marvel-super-heroes': 'LEGO Marvel Super Heroes',
    'lego/pirates': 'LEGO Pirates of the Caribbean',
    'lego/skywalker-saga': 'LEGO Star Wars: The Skywalker Saga',
  };

  /* What each kind of frame is. Every finished game on this site carries the
     same four or five, which is the point of them: they compare. */
  var FRAMES = {
    'banner': 'Steam library banner',
    'art': 'Key art',
    'start-screen': 'Title screen',
    'pause-screen': 'Pause screen',
    'load-game': 'Save slot',
    'characters': 'Characters',
    'stud-fountain': 'Stud fountain',
    'galaxy-map': 'Galaxy map',
    'shelf': 'The shelf',
    'thirty-years': 'Thirty years of LEGO games',
    'lego-hundred-percent': 'Four completion screens',
  };

  var MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  function pretty(s) {
    s = String(s || '').replace(/-/g, ' ');
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  function dirOf(p) { var i = p.lastIndexOf('/'); return i < 0 ? '' : p.slice(0, i); }
  function fileOf(p) { return p.slice(p.lastIndexOf('/') + 1).replace(/\.[a-z]+$/i, ''); }
  function leafOf(d) { return d.slice(d.lastIndexOf('/') + 1); }

  /* A capture named the way the photographs are, `YYYY-MM-DD-HHMM-slug`, says
     both what it is and when it was taken, so both get printed. Anything else
     is only its name. */
  function frameOf(stem) {
    // `gear-<item>`: the in-game tooltip for a named tool, which is its receipt
    if (stem.indexOf('gear-') === 0) return { t: pretty(stem.slice(5)), m: 'Named gear' };
    var m = /^(\d{4})-(\d{2})-(\d{2})-(\d{2})(\d{2})-(.+)$/.exec(stem);
    if (!m) return FRAMES[stem] || pretty(stem);
    var h = +m[4];
    return pretty(m[6]) + ' · ' + (+m[3]) + ' ' + MON[+m[2] - 1] + ' ' + m[1]
      + ' · ' + ((h % 12) || 12) + ':' + m[5] + ' ' + (h >= 12 ? 'PM' : 'AM');
  }

  /* Two indexes: every captioned row by the file it points at, and every file
     already shown further up this page, which is not shown again below. */
  var ROW = {}, USED = {};
  (function index() {
    var shots = SHOTS.shots || {}, sets = SHOTS.sets || {}, k;
    for (k in shots) ROW[shots[k].src] = shots[k];
    SECTIONS.forEach(function (s) {
      var keys = s.pick || (s.set && sets[s.set] && sets[s.set].items) || [];
      keys.forEach(function (key) { if (shots[key]) USED[shots[key].src] = 1; });
    });
  })();

  function sheet(f) {
    var mine = PICS.filter(function (p) {
      return p.indexOf(f.dir + '/') === 0 && !USED[p];
    });
    if (!mine.length) return null;

    /* Loose files first, then folder by folder, then by name. A loose file's
       folder IS the franchise, which sorts before any subfolder of it, so one
       comparison does both. */
    mine.sort(function (a, b) {
      var da = dirOf(a), db = dirOf(b);
      if (da !== db) return da < db ? -1 : 1;
      return a < b ? -1 : 1;
    });

    var order = [], count = {};
    mine.forEach(function (p) {
      var d = dirOf(p);
      if (count[d] == null) { count[d] = 0; order.push(d); }
      count[d]++;
    });
    var name = function (d) { return d === f.dir ? f.title : (PLACES[d] || pretty(leafOf(d))); };

    var items = mine.map(function (p) {
      var row = ROW[p], it = {}, j;
      if (row) {
        for (j in row) it[j] = row[j];
        it.src = BASE + row.src;
      } else {
        var fr = frameOf(fileOf(p));
        it.src = BASE + p;
        /* Normally the folder names the picture and the file says which frame
           of it this is; a named-gear receipt is the other way round, since
           the item is the subject and "The Realm" is the context. */
        it.title = fr.t || name(dirOf(p));
        it.meta = fr.m || fr;
        it.alt = (fr.t ? name(dirOf(p)) + ', ' + fr.t : it.title + ', ' + it.meta);
      }
      if (!it.accent) it.accent = f.accent;
      return it;
    });

    return {
      id: 'pics-' + f.dir, kind: 'gallery', grid: true, wide: true,
      title: f.title,
      note: mine.length + (mine.length === 1 ? ' frame' : ' frames'),
      /* parenthesised, because half these names end in a number themselves
         and "Five Nights at Freddy's 2 1" is not a sentence */
      lede: f.lede + ' ' + order.map(function (d) { return name(d) + ' (' + count[d] + ')'; }).join(', ') + '.',
      items: items,
    };
  }

  // a franchise folder nobody has written a heading for still gets a section
  var known = {};
  FRANCHISES.forEach(function (f) { known[f.dir] = 1; });
  PICS.map(function (p) { return p.split('/')[0]; }).sort().forEach(function (d) {
    if (known[d]) return;
    known[d] = 1;
    FRANCHISES.push({ dir: d, title: pretty(d), accent: '#3fd589',
      lede: 'Every frame filed under ' + d + '.' });
  });

  FRANCHISES.forEach(function (f) {
    var s = sheet(f);
    if (s) SECTIONS.push(s);
  });

  SECTIONS.push(LINKS);

  return {
    when: {
      at: 'Minecraft and the LEGO games, as a kid',
      note: 'The measured record starts in 2022, which is as far back as my own Steam Replay captures go. Everything older than that is on the page of the world it belongs to.',
    },
    sections: SECTIONS,
  };
})();
