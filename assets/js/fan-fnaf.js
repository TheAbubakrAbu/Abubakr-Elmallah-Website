/* fan-fnaf.js: content for /worlds/five-nights-at-freddys/. Rendered by fanpage.js. */
window.FAN_PAGE = {
  when: { at: 'Middle school, around 2017\u201320', note: 'Picked it up in middle school, mostly through the theory videos before I ever played it properly.' },
  sections: [

  { id: 'rules', kind: 'tiles', title: 'The Rules', note: 'the entire first game, in five mechanics',
    lede: 'You cannot move, you cannot fight, and you have a battery. Everything else is arithmetic.',
    items: [
      { title: 'Power', accent: '#f0c840', sub: '100% at 12 AM', desc: 'Every camera, door and light drains it. Run out and the office goes dark, and then the music starts.' },
      { title: 'The Doors', accent: '#c96f4f', sub: 'Left and right', desc: 'The only defence in the building, and the most expensive thing you can hold shut.' },
      { title: 'The Cameras', accent: '#5f9ab0', sub: 'Eleven feeds', desc: 'Watching costs power. Not watching costs more.' },
      { title: 'The Music Box', accent: '#a06fd0', sub: 'FNAF 2', desc: 'Wind it or the Puppet comes out, and no door will help you.' },
      { title: '6 AM', accent: '#7fd07f', sub: 'The win condition', desc: 'Six in-game hours, about eight real minutes, and a paycheque of $4.' },
    ] },
  /* the complete index. Every other section on this page is a choice; this one
     is the whole list, so nothing is missing just because it is not worth a
     card. ◆ marks the ones that are mine, taken from what this page already
     says elsewhere rather than picked fresh here. */
  { id: 'works', kind: 'works', title: 'Everything In It', note: 'the games, the books, the films',
    lede: 'One person made the first six of these in three years, alone, and the release schedule is part of why the theory community got as big as it did: there was never time to finish arguing before the next one landed.',
    items: [
      { title: 'The Games', sub: 'Scott Cawthon and after · 2014 – now', unit: 'game',
        desc: 'The two marked are the ones I have at a hundred percent, listed again below with the proof.',
        rows: [
          { n: 'Five Nights at Freddy’s', y: '2014', big: true },
          { n: 'Five Nights at Freddy’s 2', y: '2014', big: true },
          { n: 'Five Nights at Freddy’s 3', y: '2015' },
          { n: 'Five Nights at Freddy’s 4', y: '2015' },
          { n: 'Sister Location', y: '2016' },
          { n: 'Pizzeria Simulator', y: '2017' },
          { n: 'Ultimate Custom Night', y: '2018' },
          { n: 'Help Wanted', y: '2019' },
          { n: 'Security Breach', y: '2021' },
          { n: 'Help Wanted 2', y: '2023' },
          { n: 'Into the Pit', y: '2024' },
          { n: 'Secret of the Mimic', y: '2025' },
        ] },
      { title: 'The Side Games', sub: '2016 – 2019', unit: 'game',
        desc: 'The ones that are canon-adjacent, including an RPG made as an apology for a trailer.',
        rows: [
          { n: 'FNaF World', y: '2016' },
          { n: 'Freddy in Space 2', y: '2019' },
          { n: 'Special Delivery', y: '2019' },
        ] },
      { title: 'The Books', sub: '2015 – now', unit: 'series',
        desc: 'A separate continuity that answers questions the games refuse to, and where most of the actual lore is written down.',
        rows: [
          { n: 'The Silver Eyes', y: '2015' },
          { n: 'The Twisted Ones', y: '2017' },
          { n: 'The Fourth Closet', y: '2018' },
          { n: 'The Freddy Files', y: '2017' },
          { n: 'Fazbear Frights', y: '2019' },
          { n: 'Tales from the Pizzaplex', y: '2022' },
        ] },
      { title: 'The Films', sub: 'Blumhouse · 2023 – now', unit: 'film',
        desc: 'Ten years in development, and then the biggest horror opening of its year.',
        rows: [
          { n: 'Five Nights at Freddy’s', y: '2023' },
          { n: 'Five Nights at Freddy’s 2', y: '2025' },
        ] },
    ] },


  { id: 'cast', kind: 'cards', title: 'The Animatronics', note: 'who is coming and from where',
    items: [
      { title: 'Freddy Fazbear', sub: 'The face of the band', tag: 'Original four', desc: 'Moves last, moves in the dark, and only when the cameras are down. The laugh is the warning.', meta: 'Show Stage → East Hall' },
      { title: 'Bonnie', sub: 'Guitar', tag: 'Original four', desc: 'The fastest of the four on night one, and the one that ends most first runs.', meta: 'West Hall' },
      { title: 'Chica', sub: 'Cupcake', tag: 'Original four', desc: 'Takes the kitchen route, where there is no camera: only audio.', meta: 'East Hall · Kitchen' },
      { title: 'Foxy', sub: 'Pirate Cove', tag: 'Original four', desc: 'The one you have to check on. Watch too little and he sprints the west hall.', meta: 'Pirate Cove' },
      { title: 'Golden Freddy', sub: 'It’s me', tag: 'Anomaly', desc: 'Appears in the office without walking there. Looking too long ends the run outright.', meta: 'No fixed room' },
      { title: 'Springtrap', sub: 'FNAF 3', tag: 'The real one', desc: 'The only animatronic in the third game, and the only one with somebody inside it.', meta: 'Fazbear’s Fright' },
      { title: 'Circus Baby', sub: 'Sister Location', tag: 'Funtime', desc: 'The point where the series stops being about jump scares and starts being about a plan.', meta: 'Circus Gallery' },
      { title: 'Glamrock Freddy', sub: 'Security Breach', tag: 'Modern', desc: 'The first one on your side, and the reason that game plays like a mall stealth game.', meta: 'Mega Pizzaplex' },
    ] },

  { id: 'sound', kind: 'cards', title: 'It Is All Sound', note: 'the part people underrate',
    lede: 'Take the audio away and the first game is a slideshow of still images. Almost the entire horror budget is spent on things you hear and cannot see, which is also why it ran on anything: sound is cheap and imagination is free.',
    items: [
      { title: 'You listen more than you look', sub: 'The core trick', tag: 'Design', accent: '#c98f4f',
        desc: 'Footsteps in the hall, the clatter when Foxy starts running, the groan of a door. The camera tells you where something was; the audio tells you where it is now. Players end up navigating an entire building by ear, through a monitor that only shows one room at a time.',
        meta: 'The building is audio-only' },
      { title: 'The music box', sub: 'FNAF 2', tag: 'Best mechanic', accent: '#b8935a',
        desc: 'A box you have to keep winding from the camera panel or the Puppet comes for you. It is a timer you can hear running down while you are busy elsewhere, and it makes every other task feel expensive. Probably the single best piece of design in the series.',
        meta: 'Wind it or else' },
      { title: 'The phone calls', sub: 'Phone Guy', tag: 'Storytelling', accent: '#c9a05f',
        desc: 'The tutorial is a colleague leaving increasingly worrying voicemails, delivered in a cheerful corporate register that slowly stops matching what he is describing. All the exposition arrives through a man trying not to alarm you.',
        meta: 'Cheerful, then not' },
      { title: 'Silence as a weapon', sub: 'FNAF 4', tag: 'The scariest', accent: '#8f7040',
        desc: 'The fourth game removes the cameras entirely and asks you to stand at a door and listen for breathing. If you hear it, hold the door. If you do not, open it. Nothing on screen helps you. It is the most uncomfortable the series has ever been.',
        meta: 'Headphones required' },
    ] },

  { id: 'lore', kind: 'timeline', title: 'The Story, In Order', note: 'assembled by the fanbase out of minigames and cutscenes',
    lede: 'None of this is told to you directly. It is pieced together from eight-bit minigames, newspaper clippings on the loading screens, and lines hidden in the phone calls.',
    items: [
      { when: 'Fredbear\u2019s', title: 'The bite', desc: 'A birthday, a group of older kids, and a child lifted into an animatronic mouth. The event the whole series circles.' },
      { when: 'Freddy Fazbear\u2019s Pizza', title: 'The missing children', desc: 'Five children lured away by a man in a spare suit. The bodies are never found, and the restaurant starts to smell.' },
      { when: 'After', title: 'The suits', desc: 'The animatronics begin moving on their own at night, and the company writes it off as a servo fault.' },
      { when: 'The spring locks', title: 'What happens to him', desc: 'The man hides inside a spring lock suit to escape, and the springs fail. He does not get out, and he does not quite die either.' },
      { when: 'Fazbear\u2019s Fright', title: 'The horror attraction', desc: 'Thirty years on, someone builds a haunted attraction out of the salvage and finds one suit still standing.' },
      { when: 'Pizzeria Simulator', title: 'The trap', desc: 'A restaurant built specifically as a lure, by the one man who wanted all of it in the same room, with one exit.' },
      { when: 'The Pizzaplex', title: 'The mall', desc: 'A three-storey entertainment complex built on top of the ruins, which is exactly as bad an idea as it sounds.' },
    ] },

  { id: 'beyond', kind: 'cards', title: 'Beyond The Games', note: 'a horror game that became an industry',
    items: [
      { title: 'The theory channels', sub: 'Since 2014', tag: 'Fandom', desc: 'Frame-by-frame analysis of eight-bit minigames became an entire YouTube genre. The games are written to be read that way.', meta: 'Game Theory · Dawko' },
      { title: 'The novels', sub: 'Since 2015', tag: 'Books', desc: 'The Silver Eyes and the Fazbear Frights collections, which tell parallel versions rather than canon.', meta: 'Scott Cawthon · Kira Breed-Wrisley' },
      { title: 'Help Wanted', sub: '2019 · VR', tag: 'Game', desc: 'The whole series remade as VR minigames, which is a genuinely cruel idea and works perfectly.', meta: 'Steel Wool' },
      { title: 'The films', sub: '2023 · 2025', tag: 'Film', desc: 'Jim Henson\u2019s Creature Shop built the animatronics practically rather than in a computer, which is the right call and the best thing about them. Critics disliked the first one and it made nearly three hundred million anyway, so a sequel followed.', meta: 'Blumhouse' },
      { title: 'Made by one person', sub: 'Scott Cawthon', tag: 'Origin', desc: 'A developer whose previous game was criticised for characters that looked like stiff animatronics, who took the note and built a horror franchise out of it.', meta: 'Five months' },
    ] },

  { id: 'games', kind: 'rank', title: 'The Games', note: 'released 2014 – now · set 1983 – 2023, in no order at all',
    lede: 'The release order and the story order have almost nothing to do with each other: the second game is a prequel six years before the first, the fourth goes back four years further, and the third jumps thirty years forward. Working that out is most of what the fandom does.',
    items: [
      { title: 'Five Nights at Freddy’s', sub: '2014', meta: 'Released August 2014 · set November 1993', desc: 'Made in months by one person, and it reset what a horror game needed to be.' },
      { title: 'FNAF 2', sub: 'Nov 2014', meta: 'Released November 2014 · set 1987, six years before the first game', desc: 'No doors. A flashlight, a mask and a music box, ten months after the first.' },
      { title: 'FNAF 3', sub: '2015', meta: 'Released March 2015 · set 2023, thirty years after the first game', desc: 'One animatronic, and the first game where the lore is the horror.' },
      { title: 'FNAF 4', sub: '2015', meta: 'Released July 2015 · set 1983, the earliest point in the story', desc: 'A bedroom, a torch and audio cues. The scariest of them by a distance.' },
      { title: 'Sister Location', sub: '2016', meta: 'Released October 2016 · set years after the 1980s locations closed', desc: 'Voice acting, minigames, and the story finally taking the wheel.' },
      { title: 'Pizzeria Simulator', sub: '2017', meta: 'Released December 2017 · set after FNAF 3, and it closes the original run', desc: 'Disguised as a management sim, and then it is not.' },
      { title: 'Help Wanted & Security Breach', sub: '2019 · 2021', meta: 'Released May 2019 · December 2021 · set in the present day, decades on', desc: 'VR, then a full 3D open mall. The series in a body it did not have before.' },
    ] },


  /* the two I took to a hundred percent, with the Steam banners as the
     receipt (`shot`, and the key art as an extra `shots` entry for the first
     one, both opening in the lightbox). `finished` is the date I actually
     finished each, not the "last played" date on the banner, which is a later
     replay; see the note on `finished` in fanpage.js. `views` gives the
     grid/list switch the LEGO catalogue has, and the layout that goes with
     it. */
  { id: 'finished', kind: 'tiles', compact: true, cols: 2, views: true, tally: 'at 100%', title: 'Both, at a Hundred Percent', note: 'my own Steam banners · 100%',
    lede: 'The first two, every achievement, with the Steam library banners as proof and the screens the games print for themselves beside them. The dates are when I actually finished them; the banners show the last time I went back.',
    items: [
      { title: 'Five Nights at Freddy’s', accent: '#c98f4f', sub: '2014 · Steam', done: true, hours: '4.4', finished: '2023-11-09',
        desc: 'Five nights, the sixth, and then the custom night with everything turned up, which is the actual hundred percent. Four and a half hours, most of them spent staring at a door. The menu with all three stars on it and the termination notice from the seventh night were both captured on 9 November 2023, minutes apart, which is the evening it was finished.',
        shot: '/assets/img/franchises/fnaf/fnaf-1/banner.jpg', shots: ['art', 'three-stars', 'seventh-night'],
        shotAlt: 'Steam library banner for Five Nights at Freddy’s, showing 100% and my play time' },
      { title: 'Five Nights at Freddy’s 2', accent: '#5f9ab0', sub: 'Nov 2014 · Steam', done: true, hours: '6.2', finished: '2024-07-05',
        desc: 'No doors, a mask, a music box, and six hours to the last achievement. Harder than the first by a distance, and Toy Bonnie is in the vent on the banner for a reason. It pays you in paycheques: a hundred dollars and fifty cents for the fifth night, dated 11-12-1987, and twenty dollars and ten cents of overtime for the sixth, the morning the restaurant closes.',
        shot: '/assets/img/franchises/fnaf/fnaf-2/banner.jpg', shots: ['night-five', 'night-six'],
        shotAlt: 'Steam library banner for Five Nights at Freddy’s 2, showing 100% and my play time' },
    ] },

  /* the music: the song, since the game itself has almost none; nothing FNAF
     is on my playlist yet */
  { id: 'themes', kind: 'tiles', compact: true, title: 'The Themes', note: 'eleven tracks · in the games, and around them',
    lede: 'FNAF is the rare franchise whose most famous music is not in it. The games are nearly silent on purpose (a fan, a door, and a Bizet music box), so the songs everyone knows are fan songs, and one of them ended up in the credits of the film. Grouped into the two, because they are genuinely two different things.',
    groupable: { key: 'series', label: 'Group', on: 'In the games / around them', open: 'on' },
    sortable: { label: 'Sort', authored: 'asc', by: [
      { key: 'year', label: 'Released', asc: 'Oldest', desc: 'Newest' },
      { key: 'secs', label: 'Length', asc: 'Shortest', desc: 'Longest' },
    ] },
    items: [
      { title: 'Toreador March', series: 'In the games', accent: '#c98f4f', year: 2014, secs: 61, sub: 'Bizet, on a music box · Five Nights at Freddy\'s · 1:01',
        desc: 'Bizet wrote it for Carmen in 1875. Scott Cawthon put it on a music box in Freddy’s chest, so it means he has left the stage and is coming for you, and now a hundred and fifty years of opera belongs to a bear.',
        href: 'https://www.youtube.com/watch?v=R1yvZf7peCU', link: 'Listen' },
      { title: 'Les Cloches du Monastère', series: 'In the games', accent: '#a8763f', year: 2014, secs: 56, sub: 'Monastery Bells · Five Nights at Freddy\'s 2 · 0:56',
        desc: 'Lefébure-Wély, on a Regina disc music box, and the thing the Puppet’s box plays while you wind it. Stop winding and it stops, and then you have a much worse problem than the one you were dealing with.',
        href: 'https://www.youtube.com/watch?v=8GAn69cJw0Y', link: 'Listen' },
      { title: 'Hallway Ambience', series: 'In the games', accent: '#7f6a52', year: 2014, secs: 3600, sub: 'Five Nights at Freddy\'s 2 · one hour',
        desc: 'Not music: a fan, a hum and a room tone, which is the entire sound design of the first two games. An hour of it, because that is how these are uploaded, and honestly the right length for what it is.',
        href: 'https://www.youtube.com/watch?v=X6N671K_qU0', link: 'Fan upload' },
      { title: 'Eisoptrophobia', series: 'In the games', accent: '#8f5fd0', year: 2018, secs: 70, sub: 'Ultimate Custom Night · character select · 2018 · 1:10',
        desc: 'The menu music from Ultimate Custom Night, where you pick which fifty animatronics get to come for you. Named after the fear of mirrors, which is Cawthon telling you something about the game underneath the game.',
        href: 'https://www.youtube.com/watch?v=liaiTJoqQaw', link: 'Listen' },
      { title: 'Five Nights at Freddy\'s', series: 'Around them', accent: '#c98f4f', year: 2014, secs: 178, sub: 'The Living Tombstone · 2014 · 2:58',
        desc: 'The fan song from the first year that became the franchise’s anthem and then the closing song of the 2023 film. Over a billion plays, and Scott Cawthon never wrote a note of it.',
        href: 'https://www.youtube.com/watch?v=l18A5BOTlzE', link: 'Listen' },
      { title: 'It\'s Been So Long', series: 'Around them', accent: '#5fa8d0', year: 2015, secs: 181, sub: 'The Living Tombstone · FNAF 2 · 2015 · 3:01',
        desc: 'The second one, sung from the Puppet’s side of it, and the one people actually go back to. The Living Tombstone got sadder every time.',
        href: 'https://www.youtube.com/watch?v=gk-aCL6eyGc', link: 'Listen' },
      { title: 'Die In A Fire', series: 'Around them', accent: '#e0543a', year: 2015, secs: 186, sub: 'The Living Tombstone feat. EileMonty & Orko · FNAF 3 · 2015 · 3:06',
        desc: 'Springtrap’s song, and the angriest of the set. Three games in, the fan songs were doing more lore work than the games were.',
        href: 'https://www.youtube.com/watch?v=AibtyCAhyQE', link: 'Listen' },
      { title: 'I Got No Time', series: 'Around them', accent: '#c060d0', year: 2015, secs: 168, sub: 'The Living Tombstone · FNAF 4 · 2015 · 2:48',
        desc: 'For the fourth game, the one set in a child’s bedroom with no cameras and no power meter, just a torch and listening at doors.',
        href: 'https://www.youtube.com/watch?v=YREhVveHq9k', link: 'Listen' },
      { title: 'I Can\'t Fix You', series: 'Around them', accent: '#e07fa8', year: 2016, secs: 306, sub: 'The Living Tombstone feat. Crusher-P · Sister Location · 2016 · 5:06',
        desc: 'The fifth one, for Circus Baby and the Funtimes. Five minutes, and the point where these stopped being novelty songs.',
        href: 'https://www.youtube.com/watch?v=kXMwZNRiPe0', link: 'Listen' },
      { title: 'Join Us For A Bite', series: 'Around them', accent: '#e0b040', year: 2016, secs: 230, sub: 'JT Music · Sister Location · 2016 · 3:50',
        desc: 'JT Music’s Sister Location song, and the other half of the FNAF music canon: the one people quote back at each other, in Baby’s voice, whether or not they have played the game.',
        href: 'https://www.youtube.com/watch?v=rLeQSd7R-jU', link: 'Listen' },
      { title: 'The FNAF Beatbox', series: 'Around them', accent: '#7fd0a0', year: 2021, secs: 166, sub: 'The full version · 2:46',
        desc: 'One person doing the entire first song with their mouth, which became its own genre of video and is now more recognisable to a certain age group than the original. Genuinely impressive, and completely ridiculous.',
        href: 'https://www.youtube.com/watch?v=7WL8fYjsli8', link: 'Watch' },
    ] },

  { id: 'links', kind: 'links', title: 'Links', note: 'where I actually read about it',
    items: [
      { title: 'Scott Games', href: 'https://scottgames.com/',
        desc: 'Scott Cawthon’s own site, which is where every teaser landed first.' },
      { title: 'FNaF Wiki', href: 'https://freddy-fazbears-pizza.fandom.com/wiki/Five_Nights_at_Freddy%27s_Wiki',
        desc: 'The lore, the timeline, and the arguments about both.' },
      { title: 'On Wikipedia', href: 'https://en.wikipedia.org/wiki/Five_Nights_at_Freddy%27s',
        desc: 'The series, and how a one-man project became a film.' },
    ] },

] };
