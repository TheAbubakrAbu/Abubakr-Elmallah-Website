/* fan-st.js: content for /worlds/stranger-things/. Rendered by fanpage.js. */
window.FAN_PAGE = {
  when: { at: '2nd year of college, 2025\u201326', note: 'Second year of college, right after Game of Thrones.' },
  sections: [

  { id: 'seasons', kind: 'rank', title: 'The Seasons', note: '2016 – 2025 · scroll and the world changes under you',
    lede: 'Five seasons, and the backdrop of this page follows whichever one you are reading: 1983 in the woods, 1984 rotting in the fields, 1985 under mall neon, 1986 in Vecna’s violet, 1987 with the rifts open. Three is my favourite and by a distance the most fun: silly in places, and that is exactly the bit that made me love this show. One is the one that started all of it, and it is the best television of the five by a mile. Scroll outside the season run and the whole thing blends into one.',
    items: [
      { num: '01', title: 'Stranger Things', sub: '2016 · the best television', accent: '#e8261d', meta: 'Released July 2016 · November 1983', desc: 'A boy vanishes on the way home from a D&D game, and a girl with a shaved head walks out of the woods.' },
      { num: '02', title: 'The Vanishing', sub: '2017', meta: 'Released October 2017 · October and November 1984', desc: 'Will comes back wrong, the Mind Flayer arrives, and Dustin adopts something he should not have.' },
      { num: '03', title: 'Starcourt', sub: '2019 · my favourite', accent: '#ff5fb0', meta: 'Released July 2019 · summer 1985, over the Fourth of July', desc: 'A mall, a Russian bunker under it, and the best summer-blockbuster season of the lot.' },
      { num: '04', title: 'Vecna', sub: '2022', meta: 'Released May and July 2022 · spring 1986', desc: 'Split across three states, and the one where a song saves a life four minutes at a time.' },
      { num: '05', title: 'The Final Season', sub: '2025', meta: 'Released November and December 2025 · autumn 1987', desc: 'Back to Hawkins, with the gates open and the party grown up.' },
    ] },


  { id: 'favourites', kind: 'cards', title: 'My Favourites', note: 'Steve, and then the boys',
    lede: 'The show is at its best when it stops being about a monster and starts being about a teenager driving three children around in a car he did not agree to.',
    items: [
      { title: 'Steve Harrington', sub: 'Joe Keery', tag: 'No. 1', accent: '#e8261d',
        desc: 'Written as a disposable jock in season one and rewritten into the best character in the show because the actor was too good to waste. He gets no powers, no arc out of Hawkins, and no girl. He gets a nail bat and a car full of children he would genuinely die for, and he is the emotional core of five seasons.',
        meta: 'The nail bat · the babysitter' },
      { title: 'Mike Wheeler', sub: 'Finn Wolfhard', tag: 'No. 2', accent: '#4f9fd0',
        desc: 'The Dungeon Master, which is to say the one who decides what the party is doing and takes it personally when they will not. He hides a girl in his basement in episode two and never once considers that it might be a bad idea.',
        meta: 'The basement · the campaign' },
      { title: 'Dustin Henderson', sub: 'Gaten Matarazzo', tag: 'No. 3', accent: '#f0c840',
        desc: 'Curiosity door. The one who talks to everything, adopts the wrong creature, and is the reason Steve has a personality at all. Every good scene in seasons two and three has him in it.',
        meta: 'D’Artagnan · the compass' },
      { title: 'Lucas Sinclair', sub: 'Caleb McLaughlin', tag: 'No. 4', accent: '#4fd07f',
        desc: 'The realist, and the only one in the party who says the obvious thing out loud. Season four splits him off onto the basketball team and it is the best thing the show ever did with him.',
        meta: 'The wrist-rocket' },
    ] },
  /* the complete index. Every other section on this page is a choice; this one
     is the whole list, so nothing is missing just because it is not worth a
     card. ◆ marks the ones that are mine, taken from what this page already
     says elsewhere rather than picked fresh here. */
  { id: 'works', kind: 'works', title: 'Everything In It', note: 'five seasons, and the rest of it',
    lede: 'Five seasons across ten years, a stage play that is proper canon, a shelf of novels, and a couple of games. The seasons themselves are taken apart one by one below this.',
    items: [
      { title: 'The Seasons', sub: 'Netflix · 2016 – 2026', unit: 'season',
        desc: 'The Duffers wrote it to five from the start and stopped there. Three is my favourite and one is the best television of the five, which is the argument made above.',
        rows: [
          { n: 'Season One', y: '2016', big: true },
          { n: 'Season Two', y: '2017' },
          { n: 'Season Three', y: '2019', big: true },
          { n: 'Season Four', y: '2022' },
          { n: 'Season Five', y: '2025' },
        ] },
      { title: 'On Stage and Off', sub: '2023 – now', unit: 'work',
        desc: 'The First Shadow is canon: it is the Henry Creel story, staged, and it won an Olivier for it.',
        rows: [
          { n: 'The First Shadow', y: '2023' },
          { n: 'Tales from ’85', y: '2026' },
        ] },
      { title: 'The Books', sub: '2018 – now', unit: 'book',
        desc: 'Prequel novels and a comic line filling in Hopper, Eleven and the Russians.',
        rows: [
          { n: 'Suspicious Minds', y: '2019' },
          { n: 'Darkness on the Edge of Town', y: '2019' },
          { n: 'Rebel Robin', y: '2021' },
          { n: 'Flight of Icarus', y: '2023' },
        ] },
      { title: 'The Games', sub: '2017 – 2023', unit: 'game',
        desc: 'Two tie-ins, one asymmetric horror mode inside Dead by Daylight.',
        rows: [
          { n: 'Stranger Things: The Game', y: '2017' },
          { n: 'Stranger Things 3: The Game', y: '2019' },
          { n: 'Dead by Daylight: Stranger Things', y: '2019' },
        ] },
    ] },


  { id: 's1', season: 1, kind: 'cards', title: 'Season One', note: '1983 · the Demogorgon',
    lede: 'A boy misses a turn on the way home from a campaign and the whole town starts pulling at a thread.',
    items: [
      { title: 'The Demogorgon', sub: 'Named off a character sheet', tag: 'The thing', desc: 'A petal-faced hunter with no eyes, drawn to blood and to sound. The kids name it after a monster in their campaign because nobody has a better word.', meta: 'Mirkwood · the gate' },
      { title: 'Eleven', sub: 'Subject 011', tag: 'The girl', desc: 'Walks out of the woods in a stolen jacket with a shaved head and no idea what a friend is. Closes the gate at the cost of herself.', meta: 'Eggos · the void' },
      { title: 'The wall of lights', sub: 'Joyce', tag: 'The mother', desc: 'Everyone thought she was falling apart. She was reading an alphabet off a string of bulbs, and she was right.', meta: 'The Byers house' },
      { title: 'Hawkins Lab', sub: 'Dr Brenner', tag: 'The cause', desc: 'A sanctioned programme with a gate in the basement, and a director the children were made to call Papa.', meta: 'Department of Energy' },
      { title: 'Barb', sub: 'Barbara Holland', tag: 'The cost', desc: 'Taken at the pool in episode two, and the show spends a season and a half admitting that mattered.', meta: 'Justice for Barb' },
      { title: 'The campaign', sub: 'The frame', tag: 'The kids', desc: 'The whole season is structured like the D&D game it opens on: a party, a monster, a bad roll, and a plan made on the fly.', meta: 'The Wheeler basement' },
    ] },

  { id: 's2', season: 2, kind: 'cards', title: 'Season Two', note: '1984 · the fields turn',
    lede: 'A year later. The harvest is rotting, the tunnels are spreading under the farmland, and Will is bringing something back with him.',
    items: [
      { title: 'The Mind Flayer', sub: 'The shadow', tag: 'The thing', desc: 'Not a creature so much as a weather system with a will. It thinks of everything below it as a limb, including Will.', meta: 'The Upside Down' },
      { title: 'The tunnels', sub: 'Under the farms', tag: 'The spread', desc: 'A root system crawling out from the gate, killing the crops above it. The pumpkin fields going black is the first sign anyone can actually see.', meta: 'Merrill\u2019s farm' },
      { title: 'Dart', sub: 'A polliwog', tag: 'The pet', desc: 'Dustin adopts something he finds in the bins, feeds it nougat, and it grows into exactly what you would fear.', meta: 'D\u2019Artagnan' },
      { title: 'Max and Billy', sub: 'New in town', tag: 'The arrivals', desc: 'A stepsister who beats the arcade high score under the name MADMAX, and a stepbrother the show is honest about.', meta: 'Dig Dug · the Camaro' },
      { title: 'Bob Newby', sub: 'Superhero', tag: 'The best of them', desc: 'The kindest adult the series ever wrote, and he works out the maze from a drawing.', meta: 'RadioShack' },
      { title: 'The Snow Ball', sub: 'The last scene', tag: 'The ending', desc: 'A school dance, the party in borrowed suits, and one shot of the Mind Flayer standing over the school from the other side.', meta: 'Hawkins Middle' },
    ] },

  { id: 's3', season: 3, kind: 'cards', title: 'Season Three', note: '1985 · Starcourt, and the fair',
    lede: 'The brightest the show ever looks. A new mall has killed the old high street, the fair is in town, and there is a Soviet base under the food court.',
    items: [
      { title: 'Starcourt Mall', sub: 'The centrepiece', tag: 'The place', desc: 'Neon, fountains, a food court and a cinema, shot like a advert for the decade. It is also a front, and it burns down by the end.', meta: 'Gap · Sam Goody · Scoops Ahoy' },
      { title: 'Scoops Ahoy', sub: 'Steve and Robin', tag: 'The pairing', desc: 'A sailor hat, an ice cream counter, and the best new double act the show has produced.', meta: 'The USS Butterscotch' },
      { title: 'The Fun Fair', sub: 'Independence Day', tag: 'The setpiece', desc: 'Ferris wheel, ring toss, funnel cake, and the whole town in one field while the finale detonates under the mall.', meta: 'Hawkins fairground' },
      { title: 'The Flayed', sub: 'Built from rats', tag: 'The thing', desc: 'The Mind Flayer rebuilds itself out of whatever it can take apart, which turns the horror body-shaped and much closer.', meta: 'Brimborn Steel Works' },
      { title: 'The Russians', sub: 'Under the mall', tag: 'The plot', desc: 'A machine trying to force the gate open again, several floors below the shoppers, reached by a lift and a code cracked in a mall food court.', meta: 'The keys' },
      { title: 'Hopper and Joyce', sub: 'The heart', tag: 'The cost', desc: 'A dinner that never happens, an argument in a car, and a letter read at the end that lands harder than any monster in the season.', meta: 'Three inches' },
    ] },

  { id: 's4', season: 4, kind: 'cards', title: 'Season Four', note: '1986 · Vecna',
    lede: 'The horror stops being a creature and becomes a person with a plan, and the show finally explains where the gate came from.',
    items: [
      { title: 'Vecna', sub: 'Henry Creel · One', tag: 'The villain', desc: 'The first subject, the first gate, and the intelligence behind everything since. The first villain the series lets speak.', meta: 'Creel House · 1959' },
      { title: 'The curse', sub: 'Four chimes', tag: 'The rules', desc: 'A headache, a nosebleed, a clock striking four, and a victim walking into a trance in front of their friends.', meta: 'The grandfather clock' },
      { title: 'Running Up That Hill', sub: 'Max', tag: 'The escape', desc: 'A song on a Walkman as a lifeline, and four minutes of television that put a 1985 record back at the top of the charts in 2022.', meta: 'Kate Bush' },
      { title: 'Eddie Munson', sub: 'Hellfire Club', tag: 'The outsider', desc: 'Accused by the town for something the town cannot see, and he plays a guitar solo in the Upside Down as a distraction anyway.', meta: 'Master of Puppets' },
      { title: 'The Nina project', sub: 'Brenner again', tag: 'The past', desc: 'Eleven recovering her memories in a tank in the desert, and the massacre at the lab told properly at last.', meta: 'Nevada' },
      { title: 'Four gates', sub: 'The ending', tag: 'The break', desc: 'Hawkins splits open along a fault line and the two worlds stop being separate. The first ending that is not a win.', meta: 'March 1986' },
    ] },

  { id: 's5', season: 5, kind: 'cards', title: 'Season Five', note: '2025 · the last one',
    lede: 'Hawkins is a quarantine zone, the gates are open, and the kids from the first season are old enough to be the adults in this one.',
    items: [
      { title: 'The town, sealed', sub: 'After the split', tag: 'The setting', desc: 'A military cordon, a curfew, and a place that has stopped pretending nothing is happening under it.', meta: 'Hawkins, 1987' },
      { title: 'The party, grown', sub: 'Eight years on screen', tag: 'The cast', desc: 'The children who were on bikes in 1983 finish the story as the people responsible for it, which is the whole point of running it in real time.', meta: 'Since 2016' },
      { title: 'Vecna, unfinished', sub: 'The last piece', tag: 'The villain', desc: 'The one thread the fourth season deliberately left hanging, and the reason the split ending worked.', meta: 'One' },
      { title: 'Where it ends', sub: 'The Upside Down', tag: 'The place', desc: 'Everything since 1983 has been about one town, one lab and one gate. It closes where it opened.', meta: 'Mirkwood' },
    ] },

  { id: 'party', kind: 'cards', title: 'The Original Party', note: 'four boys, one campaign, 1983',
    lede: 'It starts with a ten-hour Dungeons & Dragons session in the Wheelers’ basement and four boys cycling home in the dark. One of them does not get there.',
    items: [
      { title: 'Mike Wheeler', sub: 'The Dungeon Master', tag: 'Founding', accent: '#4f9fd0',
        desc: 'Runs the campaign and, by extension, the party. Everything that happens for five seasons happens because he decided to hide someone in his basement.', meta: 'The basement' },
      { title: 'Will Byers', sub: 'The one who was taken', tag: 'Founding', accent: '#e8261d',
        desc: 'Missing by the end of the first episode and, in a real sense, never fully returned. The show is named after what happened to him.', meta: 'Castle Byers' },
      { title: 'Dustin Henderson', sub: 'Curiosity door', tag: 'Founding', accent: '#f0c840',
        desc: 'Cleodolithic. He finds the thing, keeps the thing, feeds the thing, and the thing eats the cat. Every time.', meta: 'D’Artagnan' },
      { title: 'Lucas Sinclair', sub: 'The realist', tag: 'Founding', accent: '#4fd07f',
        desc: 'The one who points out that a girl with a shaved head who bends spoons might be dangerous, is completely right, and gets shouted at for it.', meta: 'The wrist-rocket' },
    ] },

  { id: 'party2', kind: 'cards', title: 'The Party, Expanded', note: 'and then there were six',
    lede: 'Two more, one per season, and both of them arrive as outsiders the party does not want and cannot function without a year later.',
    items: [
      { title: 'Eleven', sub: 'Jane Hopper · S1', tag: '011', accent: '#e8261d',
        desc: 'Escapes the lab in episode one with a shaved head and a hospital gown, and learns most of what she knows about being a person from a boy her own age and a box of Eggos. The nosebleed is the cost of everything she does.',
        meta: 'Hawkins Lab · 011' },
      { title: 'Max Mayfield', sub: 'S2', tag: 'Zoomer', accent: '#f08030',
        desc: 'Arrives from California on a skateboard, beats their arcade high score under the name MADMAX, and is not invited to the party for most of a season. Season four makes her the heart of it and then very nearly kills her to a Kate Bush song.',
        meta: 'MADMAX · Running Up That Hill' },
    ] },

  { id: 'teens', kind: 'cards', title: 'The Teenagers', note: 'the other half of the show',
    lede: 'Every season the kids and the teenagers start on separate threads and end up in the same room, and the teenage half is consistently the better-written one.',
    items: [
      { title: 'Steve Harrington', sub: 'Joe Keery', tag: 'Nail bat', accent: '#e8261d',
        desc: 'The redemption nobody planned. He starts as the boyfriend you are meant to dislike and ends up the closest thing four children have to a responsible adult, which he is extremely bad at and does anyway.',
        meta: 'Scoops Ahoy · Family Video' },
      { title: 'Nancy Wheeler', sub: 'Natalia Dyer', tag: 'Reporter', accent: '#4f9fd0',
        desc: 'Loses her best friend in episode three and spends four seasons refusing to let it go. She is the one who goes and gets the gun, every single time.',
        meta: 'The Hawkins Post' },
      { title: 'Jonathan Byers', sub: 'Charlie Heaton', tag: 'Camera', accent: '#8f6fd0',
        desc: 'Photographs everything, says almost nothing, and is the only one who believes Joyce from the start because he is the only one who was listening.',
        meta: 'The photographs' },
      { title: 'Robin Buckley', sub: 'Maya Hawke', tag: 'Translator', accent: '#5fd0d0',
        desc: 'Arrives in season three fully formed, cracks a Russian code in an ice-cream parlour, and gets the single best scene in the show on a bathroom floor with Steve. Their friendship is the one relationship the writers never once ruined.',
        meta: 'Scoops Ahoy · the bathroom' },
    ] },

  { id: 'adults', kind: 'cards', title: 'The Adults', note: 'the ones who believed her, and the ones who did not',
    lede: 'The show’s quiet trick is that the grown-ups are not useless. Joyce is right from the first episode and everybody treats her as though she has lost it, and Hopper is the only person in Hawkins who checks.',
    items: [
      { title: 'Jim Hopper', sub: 'David Harbour', tag: 'Chief', accent: '#e8261d',
        desc: 'A wrecked small-town police chief who lost a daughter and gets handed another one. Season one is him doing actual police work while everyone tells him there is nothing to find, and he finds it.',
        meta: 'Three inches · the cabin rules' },
      { title: 'Joyce Byers', sub: 'Winona Ryder', tag: 'The wall', accent: '#f0c840',
        desc: 'Buys every string of Christmas lights in Melvald’s and paints the alphabet on her wall, and she is completely right. Nobody in television has ever been more correct while being treated as more unstable.',
        meta: 'Melvald’s · the bulbs' },
      { title: 'Ted Wheeler', sub: 'Joe Chrest', tag: 'Recliner', accent: '#8f8f6f',
        desc: 'A masterpiece. Asleep in the La-Z-Boy in every scene, opinion on nothing, awake only for the news and a plate of chicken. His entire arc across five seasons is that a government agent sits in his living room and he offers them the good chair.',
        meta: 'Asleep · in the chair' },
      { title: 'Karen Wheeler', sub: 'Cara Buono', tag: 'Mother', accent: '#e07ad0',
        desc: 'The only parent on the street who keeps asking her children what is going on, and gets lied to every single time. Season three gives her the Billy subplot and then, mercifully, thinks better of it.',
        meta: 'Asks the right questions' },
      { title: 'Murray Bauman', sub: 'Brett Gelman', tag: 'Conspiracy', accent: '#4fd07f',
        desc: 'A disgraced journalist in a soundproofed basement who is right about everything and insufferable about all of it. He translates the Russian, and he is the only one who says out loud what everyone else is avoiding.',
        meta: 'The bunker' },
      { title: 'Bob Newby', sub: 'Sean Astin', tag: 'Superhero', accent: '#4f9fd0',
        desc: 'A Radio Shack manager who is kind to everybody, works out the map, reboots the breaker by hand and does not make it back down the corridor. The single most upsetting death in the show.',
        meta: 'Bob Newby, superhero' },
      { title: 'Dr Martin Brenner', sub: 'Matthew Modine', tag: 'Papa', accent: '#8f8f9f',
        desc: 'Hawkins Lab. He calls himself Papa to a child he keeps in a cell, and the show is careful never to let him be anything but exactly what he is.',
        meta: 'Hawkins National Laboratory' },
      { title: 'Dr Sam Owens', sub: 'Paul Reiser', tag: 'The next one', accent: '#c0a8e0',
        desc: 'Brenner’s replacement, and a genuine subversion: cast as the Paul Reiser corporate villain from Aliens, and then written as a man who actually tries to do right by them.',
        meta: 'The second lab' },
    ] },

  { id: 'upside', kind: 'tiles', title: 'The Upside Down', note: 'the mythology, in order of appearance',
    lede: 'A copy of Hawkins frozen at the exact moment the first gate opened, in November 1983.',
    items: [
      { title: 'The Gate', accent: '#e8261d', sub: '1983', desc: 'Torn open in the Hawkins Lab basement, and never fully closed since.' },
      { title: 'Demogorgon', accent: '#c04a4a', sub: 'Season 1', desc: 'The petal-faced hunter. Named after a D&D monster because the kids had no other word for it.' },
      { title: 'Demodogs', accent: '#b06a4a', sub: 'Season 2', desc: 'What a hatched polliwog grows into, on a diet of cat and Nougat bars.' },
      { title: 'The Mind Flayer', accent: '#8f4fd0', sub: 'Season 2 – 3', desc: 'A hive mind the size of a storm cloud that thinks of every creature below it as a limb.' },
      { title: 'Vecna', accent: '#6f2fd0', sub: 'Season 4', desc: 'One, Henry Creel: the first subject, the first gate, and the intelligence behind all of it.' },
      { title: 'The Void', accent: '#2a2a2a', sub: 'All seasons', desc: 'Black water, total silence, and a radio. Eleven finds anyone from in here.' },
    ] },

  { id: 'hawkins', kind: 'cards', title: 'Hawkins, Indiana', note: 'population 30,000, give or take',
    items: [
      { title: 'Hawkins National Laboratory', sub: 'Department of Energy', tag: 'Front', desc: 'MKUltra with a state budget: Brenner, the tank, the children with numbers, and the gate they tore open under it.', meta: 'Est. 1953 · closed 1984' },
      { title: 'Starcourt Mall', sub: 'Opened 1985', tag: 'Season 3', desc: 'Scoops Ahoy, the food court, and a Soviet base under the floor. Burned down at the Fourth of July fair.', meta: 'Gap · Sam Goody · Orange Julius' },
      { title: 'The Byers House', sub: 'Mirkwood', tag: 'Season 1', desc: 'A string of bulbs on the plaster, an axe, a bear trap, and a wall that a mother read an alphabet off.', meta: 'Where the wall is' },
      { title: 'The Wheeler Basement', sub: 'Campaign HQ', tag: 'All seasons', desc: 'The D&D table, the blanket fort, and the room where the party actually forms.', meta: 'Demogorgon, 1983' },
      { title: 'Castle Byers', sub: 'The fort', tag: 'Season 1', desc: 'Built out of scrap in the woods. The place Will hides, and the place Joyce finds what is left.', meta: 'Mirkwood woods' },
      { title: 'Creel House', sub: '1959', tag: 'Season 4', desc: 'The murders that were never solved, the grandfather clock, and where Vecna actually starts.', meta: 'Victor Creel' },
    ] },

  { id: 'sound', kind: 'tiles', title: 'The Sound', note: 'a synth score and a needle drop that saved a life',
    items: [
      { title: 'Should I Stay or Should I Go', accent: '#e8261d', sub: 'The Clash, 1982', desc: 'Will and Jonathan\u2019s song. It plays in the Upside Down when he needs to be found.' },
      { title: 'Running Up That Hill', accent: '#c04a9a', sub: 'Kate Bush, 1985', desc: 'Max\u2019s song, and the reason a thirty-seven-year-old track topped the charts again in 2022.' },
      { title: 'Master of Puppets', accent: '#8f8f9a', sub: 'Metallica, 1986', desc: 'Eddie in the Upside Down, playing a distraction for the bats.' },
      { title: 'Never Ending Story', accent: '#4f9fd0', sub: 'Limahl, 1984', desc: 'Dustin and Suzie over the radio, in the middle of a Soviet bunker rescue.' },
      { title: 'The Main Title', accent: '#e8261d', sub: 'Kyle Dixon & Michael Stein', desc: 'A Prophet-6 arpeggio and red Benguiat lettering. Two seconds and you know the show.' },
    ] },

  { id: 'lines', kind: 'quotes', title: 'Lines', note: 'the ones that stuck',
    items: [
      { title: 'Friends don’t lie.', sub: 'Eleven' },
      { title: 'Mornings are for coffee and contemplation.', sub: 'Jim Hopper' },
      { title: 'She’s our friend and she’s crazy!', sub: 'Dustin Henderson' },
      { title: 'When one is in Hawkins, one does as the Hawkinsites do.', sub: 'Murray Bauman', accent: '#4fd07f' },
      { title: 'Bob Newby. Superhero.', sub: 'Bob Newby · and he was', accent: '#4f9fd0' },
      { title: 'It’s a compass. It points north.', sub: 'Dustin Henderson · it did not point north', accent: '#f0c840' },
      { title: 'Nobody normal ever accomplished anything meaningful in this world.', sub: 'Jonathan Byers', accent: '#8f6fd0' },
    ] },


  /* the music: the eight Stranger Things tracks on my playlist, grouped by
     season. `series` is the season (the Group control folds the list into
     them), `year` the season's year, `secs` the length; written earliest-first,
     hence `authored`. Linked to Kyle Dixon and Michael Stein's own uploads
     wherever there is one; two only exist on YouTube as London Music Works'
     re-recordings, which is also how the playlist has them, and they say so. */
  { id: 'themes', kind: 'tiles', compact: true, title: 'The Themes', note: 'eight tracks · five seasons',
    lede: 'Kyle Dixon and Michael Stein’s synths, and then, for the very last scene, an orchestra. Eight tracks named as the albums name them, grouped by season; sort them by year or by length, or switch the grouping off.',
    groupable: { key: 'series', label: 'Group', on: 'By season', open: 'on' },
    sortable: { label: 'Sort', authored: 'asc', by: [
      { key: 'year', label: 'Released', asc: 'Oldest',   desc: 'Newest' },
      { key: 'secs', label: 'Length',   asc: 'Shortest', desc: 'Longest' },
    ] },
    items: [
      { title: 'Stranger Things', series: 'Season 1', accent: '#e8261d', year: 2016, secs: 68, sub: 'Stranger Things, Vol. 1 · 2016 · 1:08',
        desc: 'Kyle Dixon and Michael Stein. The title theme: an arpeggio on an analogue synth, the red letters, and the reason every trailer for three years had a synth in it.',
        href: 'https://www.youtube.com/watch?v=2obv0DHuhu4', link: 'Listen' },
      { title: 'Kids', series: 'Season 1', accent: '#e8261d', year: 2016, secs: 158, sub: 'Stranger Things, Vol. 1 · 2016 · 2:38',
        desc: 'Kyle Dixon and Michael Stein. The theme for the four of them on bikes, the one that comes back whenever the show remembers what it is about.',
        href: 'https://www.youtube.com/watch?v=Ha2OcL_0gtM', link: 'Listen' },
      { title: 'Eulogy', series: 'Season 2', accent: '#e0643a', year: 2017, secs: 224, sub: 'Stranger Things 2 · 2017 · 3:44',
        desc: 'Kyle Dixon and Michael Stein. The second season’s grief theme. The copy is London Music Works’ re-recording, which is the one on the playlist too.',
        href: 'https://www.youtube.com/watch?v=ux96x1a7idg', link: 'Cover' },
      { title: 'The First Lie', series: 'Season 2', accent: '#e0643a', year: 2017, secs: 75, sub: 'Stranger Things 2 · 2017 · 1:15',
        desc: 'Kyle Dixon and Michael Stein. From the second season. London Music Works again.',
        href: 'https://www.youtube.com/watch?v=eFGCZ8ANpO4', link: 'Cover' },
      { title: 'Starcourt', series: 'Season 3', accent: '#e05a9a', year: 2019, secs: 185, sub: 'Stranger Things 3 · 2019 · 3:05',
        desc: 'Kyle Dixon and Michael Stein. The mall, in neon, and the closest the score comes to an actual pop song.',
        href: 'https://www.youtube.com/watch?v=uWYxoNwkszM', link: 'Listen' },
      { title: 'The First I Love You', series: 'Season 3', accent: '#e05a9a', year: 2019, secs: 147, sub: 'Stranger Things 3 · 2019 · 2:27',
        desc: 'Kyle Dixon and Michael Stein. Hopper’s letter, read over the last scene of the third season. The cue people mean when they say the show made them cry.',
        href: 'https://www.youtube.com/watch?v=vU0n9fHm2XU', link: 'Listen' },
      { title: 'Teens', series: 'Season 4', accent: '#8f4fd0', year: 2022, secs: 127, sub: 'Stranger Things 4 · 2022 · 2:07',
        desc: 'Kyle Dixon and Michael Stein. Kids, three seasons on and slower, for the same four of them older. The playlist has the London Music Works version; this is theirs.',
        href: 'https://www.youtube.com/watch?v=Se-3uSaPsaY', link: 'Listen' },
      { title: 'I Believe', series: 'Season 5', accent: '#c9cdd2', year: 2025, secs: 166, sub: 'Stranger Things 5 · 2025 · 2:46',
        desc: 'Dan Romer. The orchestral piece over the last scene of the whole show, on New Year’s Eve 2025. Not Dixon and Stein: the finale went to an orchestra.',
        href: 'https://www.youtube.com/watch?v=ekesyTGKZus', link: 'Listen' },
    ] },

  { id: 'links', kind: 'links', title: 'Links', note: 'where I actually read about it',
    items: [
      { title: 'On Netflix', href: 'https://www.netflix.com/title/80057281',
        desc: 'Where it lives.' },
      { title: 'Stranger Things Wiki', href: 'https://strangerthings.fandom.com/wiki/Stranger_Things_Wiki',
        desc: 'Hawkins, the Upside Down, and every timeline argument you could want.' },
      { title: 'On Wikipedia', href: 'https://en.wikipedia.org/wiki/Stranger_Things',
        desc: 'Season by season, with the production detail.' },
    ] },

] };
