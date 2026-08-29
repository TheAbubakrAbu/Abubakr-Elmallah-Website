/* fan-hunger.js: content for /worlds/hunger-games/. Rendered by fanpage.js.
   A children's series about a televised child-killing contest, which is a
   sentence the trilogy spends three books earning. */
/* NO `when:` BLOCK YET, on purpose. That field is when Abubakr actually got
   into the thing, and the rest of this site's fan pages mean it literally. A
   plausible-sounding date here would make the one honest line on the page
   unreliable, so it is left for him to fill in:

     when: { at: '...', note: '...' },

   goes directly above `sections`. Same reason the tile in fandom-data.js has
   no `when`. */
window.FAN_PAGE = {
  sections: [

  { id: 'books', kind: 'films', title: 'The Books', note: 'Suzanne Collins · 2008 onward',
    lede: 'Collins writes one every few years and only when she has something to say, which is why there are five of these and not eleven. All of them are first-person present tense except the prequels, and the tense is doing work: you find out what is happening exactly when Katniss does.',
    items: [
      { num: 'I', title: 'The Hunger Games', sub: '2008', accent: '#e0b040',
        desc: 'Twenty-four children in an arena, one survivor, broadcast live and compulsory viewing. Katniss volunteers for her sister in the first thirty pages and wins by refusing to finish: two tributes with poison berries, on camera, is a threat the Capitol cannot answer without admitting it was beaten.',
        meta: 'The berries are the plot' },
      { num: 'II', title: 'Catching Fire', sub: '2009', accent: '#e0763a',
        desc: 'The consequence. A victory tour designed to prove nothing happened, districts that are not convinced, and a Quarter Quell that puts the previous winners back in to kill the symbol. The arena is a clock, and the best twist in the trilogy is that half the tributes were running a different game from the start.',
        meta: 'The best of the five' },
      { num: 'III', title: 'Mockingjay', sub: '2010', accent: '#8f9ab0',
        desc: 'The unpopular one, and the honest one. There is no arena; there is a war, a propaganda department, and a rebel command that is willing to spend Katniss exactly the way the Capitol did. The last act refuses to give the reader a clean victory, and the final vote is the whole series arguing with itself.',
        meta: 'Deliberately unsatisfying' },
      { num: 'IV', title: 'The Ballad of Songbirds and Snakes', sub: '2020', accent: '#4f7f5f',
        desc: 'Sixty-four years earlier, from inside the head of an eighteen-year-old Coriolanus Snow. A prequel about how a person talks themselves into it, and about the year the Games stopped being a punishment and started being entertainment.',
        meta: 'Snow lands on top' },
      { num: 'V', title: 'Sunrise on the Reaping', sub: '2025', accent: '#c9a06f',
        desc: 'Haymitch’s Games, the second Quarter Quell, twenty-four years before the first book. Everything about it is already known from Catching Fire, which is the point: you read it watching a boy walk into an outcome you were told about a decade ago.',
        meta: 'The one you already know' },
    ] },

  { id: 'films', kind: 'rank', title: 'The Films', note: 'Lionsgate · 2012 onward',
    lede: 'Four adaptations of three books, then a prequel. The split of Mockingjay into two films is the only real crime, and Jennifer Lawrence is the reason the series works on screen at all: the performance is mostly refusal, which is hard to play.',
    items: [
      { num: '12', title: 'The Hunger Games', sub: '2012', accent: '#e0b040',
        desc: 'Handheld, grainy, and much quieter than the premise suggests. Gary Ross keeps the camera at Katniss’ shoulder so the arena is only ever as legible to us as it is to her.' },
      { num: '13', title: 'Catching Fire', sub: '2013', accent: '#e0763a',
        desc: 'Francis Lawrence takes over and the series gets a budget and a spine. The best of the four, and the only one where the Capitol feels genuinely powerful rather than merely well dressed.' },
      { num: '14', title: 'Mockingjay, Part 1', sub: '2014', accent: '#7f8894',
        desc: 'Half a book, so half a film: a propaganda thriller with no arena, which is more interesting than it is entertaining. The Hanging Tree sequence is the high point of the whole series.' },
      { num: '15', title: 'Mockingjay, Part 2', sub: '2015', accent: '#8f9ab0',
        desc: 'The pods, the sewer, the mutts, and an ending the audience did not want and the book was right about. It lands the final vote correctly, which is more than most adaptations manage.' },
      { num: '23', title: 'The Ballad of Songbirds and Snakes', sub: '2023', accent: '#4f7f5f',
        desc: 'A prequel nobody asked for that turned out fine: Tom Blyth playing Snow as someone who keeps choosing, and Rachel Zegler singing most of the second half.' },
    ] },
  /* the complete index. Every other section on this page is a choice; this one
     is the whole list, so nothing is missing just because it is not worth a
     card. ◆ marks the ones that are mine, taken from what this page already
     says elsewhere rather than picked fresh here. */
  { id: 'works', kind: 'works', title: 'Everything In It', note: 'five books, six films',
    lede: 'Collins has written five books in thirty years and every one of them has been filmed, which is a completeness rate almost nothing else on this site can match. There are no games and no series: it is the one franchise here that stayed a franchise of books.',
    items: [
      { title: 'The Books', sub: 'Suzanne Collins · 2008 – 2025', unit: 'book',
        desc: 'Three in the main trilogy, then two prequels written fifteen years apart.',
        rows: [
          { n: 'The Hunger Games', y: '2008' },
          { n: 'Catching Fire', y: '2009', big: true },
          { n: 'Mockingjay', y: '2010' },
          { n: 'The Ballad of Songbirds and Snakes', y: '2020' },
          { n: 'Sunrise on the Reaping', y: '2025' },
        ] },
      { title: 'The Films', sub: 'Lionsgate · 2012 – 2026', unit: 'film',
        desc: 'Every book filmed, with Mockingjay split in two because that is what studios did in 2014.',
        rows: [
          { n: 'The Hunger Games', y: '2012' },
          { n: 'Catching Fire', y: '2013', big: true },
          { n: 'Mockingjay, Part 1', y: '2014' },
          { n: 'Mockingjay, Part 2', y: '2015' },
          { n: 'The Ballad of Songbirds and Snakes', y: '2023' },
          { n: 'Sunrise on the Reaping', y: '2026' },
        ] },
    ] },


  { id: 'panem', kind: 'tiles', title: 'Panem', note: 'the country, and how it is run', compact: true,
    lede: 'Twelve districts, each assigned one industry, feeding one city that produces nothing. The thirteenth was bombed flat as a demonstration, or so the Capitol says. The whole arrangement is a resource-extraction empire with a light-entertainment department bolted on the front.',
    items: [
      { title: 'The Capitol', accent: '#b06fd8', sub: 'The city', desc: 'In the Rockies, ringed by mountains, and dependent on every district for everything it eats and wears. Its power is logistical, not military, until it needs to be.' },
      { title: 'District 12', accent: '#5f6670', sub: 'Coal', desc: 'Appalachia, the Seam, and about eight thousand people. Poorest district, two victors in seventy-five years, and both of them matter.' },
      { title: 'District 11', accent: '#5fbf6a', sub: 'Agriculture', desc: 'The largest district, the most heavily policed, and where Rue is from. The bread the crowd sends Katniss is from here, and it is the first crack.' },
      { title: 'Districts 1, 2, 4', accent: '#e8c56a', sub: 'Careers', desc: 'Luxury, masonry and fishing, and near enough to the Capitol to train children for the arena as a career. Illegal, and universally allowed.' },
      { title: 'District 13', accent: '#7f8894', sub: 'Nuclear', desc: 'Officially destroyed, actually underground and armed, and running its own version of the same politics. Coin is not an improvement, and the series says so.' },
      { title: 'The reaping', accent: '#c94a3a', sub: 'The lottery', desc: 'Every child from twelve to eighteen, every year. Tesserae let the poor add entries in exchange for grain, so the poorest children are drawn most: the lottery is means-tested downward.' },
      { title: 'The Games', accent: '#e0b040', sub: 'The broadcast', desc: 'Twenty-four tributes, one victor, sponsors buying gifts mid-fight and a Gamemaker steering the weather. Compulsory viewing in the districts, which is the entire point of it.' },
      { title: 'The mockingjay', accent: '#e0a050', sub: 'The accident', desc: 'Jabberjays were a Capitol surveillance bird that failed and was abandoned; they bred with mockingbirds anyway. The symbol of the rebellion is the Capitol’s own weapon surviving on its own terms.' },
    ] },

  { id: 'quotes', kind: 'quotes', title: 'Lines', note: 'the four that carry it',
    items: [
      { title: 'I volunteer as tribute.', sub: 'Katniss Everdeen · The Hunger Games', accent: '#e0b040' },
      { title: 'May the odds be ever in your favour.', sub: 'Effie Trinket · the Capitol’s entire ideology in one sentence', accent: '#b06fd8' },
      { title: 'Fire is catching. And if we burn, you burn with us.', sub: 'Katniss Everdeen · Mockingjay', accent: '#c94a3a' },
      { title: 'Real or not real?', sub: 'Peeta Mellark · Mockingjay', accent: '#8f9ab0' },
    ] },

  /* the music: the anthem and the song; nothing Hunger Games is on my playlist yet */
  { id: 'themes', kind: 'tiles', compact: true, title: 'The Themes', note: 'two tracks · the anthem and the song',
    lede: 'Nothing from the Hunger Games is on my playlist yet, so these are the two: Panem’s anthem, and the song from the third film that turned into a real chart hit, linked to the albums’ own uploads.',
    items: [
      { title: 'Horn of Plenty', accent: '#e0b040', sub: 'James Newton Howard · The Hunger Games · 2012 · 2:00',
        desc: 'James Newton Howard. The Panem anthem, played at every reaping and every victory, and written to sound like a country with something to hide.',
        href: 'https://www.youtube.com/watch?v=ox4HKVg9sKw', link: 'Listen' },
      { title: 'The Hanging Tree', accent: '#e0763a', sub: 'Jennifer Lawrence · Mockingjay, Part 1 · 2014 · 3:36',
        desc: 'Jennifer Lawrence, and then District 12 singing it back at the dam. A folk song written for the book, and a hit single nobody planned.',
        href: 'https://www.youtube.com/watch?v=F3hTW9e20d8', link: 'Listen' },
    ] },

  { id: 'links', kind: 'links', title: 'Links', note: 'Panem, elsewhere',
    items: [
      { title: 'On Wikipedia', href: 'https://en.wikipedia.org/wiki/The_Hunger_Games',
        desc: 'The novels, the adaptations, and the panem et circenses the country is named after.' },
      { title: 'Suzanne Collins', href: 'https://en.wikipedia.org/wiki/Suzanne_Collins',
        desc: 'Gregor the Overlander first, and a father who taught military history, which explains a great deal.' },
      { title: 'The Hunger Games Wiki', href: 'https://thehungergames.fandom.com/wiki/The_Hunger_Games_Wiki',
        desc: 'Every district, every victor, every Games from the first to the seventy-fifth.' },
    ] },

] };
