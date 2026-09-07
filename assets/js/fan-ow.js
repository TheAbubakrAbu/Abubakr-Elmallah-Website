/* fan-ow.js: content for /worlds/overwatch/. Rendered by fanpage.js.
   The game that invented the hero shooter and then told its story everywhere
   except inside itself. */
window.FAN_PAGE = {
  when: { at: 'After it launched', note: 'The only shooter I have played where switching character mid-match is the actual skill rather than an admission of defeat.' },
  sections: [

  { id: 'roles', kind: 'cards', title: 'How It Works', note: 'nobody has the same gun',
    lede: 'Blizzard cancelled an MMO called Titan in 2014 and built this out of the pieces in about eighteen months. The design decision everything else follows from is that there is no default weapon: every hero is a different set of verbs, and the counter to a problem is usually a different character rather than better aim.',
    items: [
      { title: 'Tank', sub: 'Makes the space', tag: 'The role', accent: '#5f9fe0',
        desc: 'Barriers, bulk and the job of deciding where the fight happens. Reinhardt with a shield walking his team down a corridor is still the clearest picture of what this game is.',
        meta: 'One per team since Overwatch 2' },
      { title: 'Damage', sub: 'Takes the space', tag: 'The role', accent: '#e0704a',
        desc: 'The largest and least disciplined half of the roster: hitscan, projectile, flankers, and one cowboy with a revolver whose whole design is a countdown.',
        meta: 'Two per team' },
      { title: 'Support', sub: 'Keeps the space', tag: 'The role', accent: '#5fbf7f',
        desc: 'Healing, but never only healing: every support in the game has a way to win a fight on its own, which is why the role is not the chore it is in most shooters.',
        meta: 'Two per team' },
      { title: 'Ultimates', sub: 'And the voice line', tag: 'The mechanic', accent: '#f0c840',
        desc: 'A meter that fills as you play, one enormous ability at the end of it, and a line shouted in the character\'s own language that the enemy team also hears. Blizzard turned a cooldown into a warning system and then into a meme, all at once.',
        meta: 'Hearing it in Japanese means it is too late' },
      { title: 'Switching', sub: 'The actual skill', tag: 'The idea', accent: '#a06fd0',
        desc: 'You can change hero every time you die. Reading what is beating you and answering it is a completely different competence from aiming, and it is the thing this game has that its imitators mostly do not.',
        meta: 'Counter-picking as a core loop' },
      { title: 'The story is elsewhere', sub: 'Shorts, comics, voice lines', tag: 'The problem', accent: '#c9ced6',
        desc: 'Overwatch has one of the most fully realised casts in games and told almost none of it inside the game. The animated shorts are genuinely excellent short films; the campaign they were advertising took six years to arrive and then arrived thin.',
        meta: 'A decade-long argument' },
    ] },

  { id: 'works', kind: 'works', title: 'Everything In It', note: 'two games, a pile of shorts, and the lore',
    lede: 'Overwatch 2 replaced Overwatch 1 outright in 2022, which is a thing almost no other live game has done: the original was switched off and its sequel took over the same install.',
    items: [
      { title: 'The Games', sub: '2016 – now', unit: 'game',
        desc: 'One release, one replacement, and a long list of events that people still measure the game by.',
        rows: [
          { n: 'Overwatch', y: '2016', big: true },
          { n: 'Overwatch: Game of the Year Edition', y: '2017' },
          { n: 'Overwatch 2', y: '2022', big: true },
          { n: 'Overwatch 2: Invasion (story missions)', y: '2023' },
        ] },
      { title: 'The Animated Shorts', sub: '2016 – now', unit: 'short',
        desc: 'Blizzard Animation making seven-minute films to sell a shooter, and getting Emmy nominations for it.',
        rows: [
          { n: 'Recall', y: '2016' },
          { n: 'Alive', y: '2016' },
          { n: 'Dragons', y: '2016', big: true },
          { n: 'Hero', y: '2016' },
          { n: 'The Last Bastion', y: '2016', big: true },
          { n: 'Infiltration', y: '2016' },
          { n: 'Rise and Shine', y: '2017' },
          { n: 'Honor and Glory', y: '2017' },
          { n: 'Shooting Star', y: '2018' },
          { n: 'Reunion', y: '2018' },
          { n: 'Zero Hour', y: '2019' },
        ] },
    ] },

  { id: 'themes', kind: 'tiles', compact: true, title: 'The Music', note: 'four tracks · Duke, Velásquez, and the trailers',
    lede: 'Derek Duke and Neal Acree wrote most of it, and the main theme does the same job the animated shorts do: it tells you this is a hopeful game about heroes, in a genre that had spent a decade being about neither.',
    items: [
      { title: 'Overture', accent: '#f09d3a', sub: 'Overwatch · 2016 · 1:55',
        desc: 'The main theme. Brass, a rising fourth, and no aggression in it anywhere, which for a shooter released in 2016 was a statement.',
        href: 'https://www.youtube.com/watch?v=LrA__QQ6RAE', link: 'Listen' },
      { title: 'Overwatch Cinematic Trailer', accent: '#5f9fe0', sub: 'Blizzard · 2016 · 6:01',
        desc: 'The museum fight: Tracer, Winston, Widowmaker and Reaper, and two children watching. Six minutes that sold the entire game before anyone had played it.',
        href: 'https://www.youtube.com/watch?v=FqnKB22pOC0', link: 'Watch' },
      { title: 'Zero Hour', accent: '#c04a4a', sub: 'Overwatch 2 · 2019 · 7:35',
        desc: 'The short that announced the sequel: Paris under attack, and the team coming back together. Blizzard Animation at full strength.',
        href: 'https://www.youtube.com/watch?v=1uXkvNaSPY0', link: 'Watch' },
      { title: 'Anthem', accent: '#a06fd0', sub: 'Overwatch: Heroes & Villains · 2:32',
        desc: 'From the later soundtrack releases, and the closest the score gets to a proper concert arrangement of the main theme.',
        href: 'https://www.youtube.com/watch?v=4nXOiBulQcc', link: 'Listen' },
    ] },

  { id: 'links', kind: 'links', title: 'Links', note: 'the world could always use more of them',
    items: [
      { title: 'PlayOverwatch', href: 'https://overwatch.blizzard.com/',
        desc: 'The official site: the roster, the maps, and the patch notes.' },
      { title: 'On Wikipedia', href: 'https://en.wikipedia.org/wiki/Overwatch_(video_game)',
        desc: 'The Titan cancellation, the 2016 launch, and how the sequel replaced the original.' },
      { title: 'Overwatch Wiki', href: 'https://overwatch.fandom.com/wiki/Overwatch_Wiki',
        desc: 'Every hero, every ability, and the lore that is not in the game.' },
    ] },

] };
