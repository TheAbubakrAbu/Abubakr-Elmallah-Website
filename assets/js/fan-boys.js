/* fan-boys.js: content for /worlds/the-boys/. Rendered by fanpage.js.
   Kept deliberately restrained: the show is not, but a portfolio page can be. */
window.FAN_PAGE = {
  when: { at: 'Summer 2022, going into 11th grade', note: 'The summer between tenth and eleventh grade, 2022, and it was absolutely fire.' },
  sections: [

  { id: 'premise', kind: 'cards', title: 'The Premise', note: 'supes as a product line',
    items: [
      { title: 'Vought International', sub: 'The company', tag: 'Corporate', desc: 'A pharmaceutical firm that manufactures heroes, sells the film rights, and manages the fallout with a PR department.', meta: 'Compound V · Vought Tower' },
      { title: 'The Seven', sub: 'The flagship team', tag: 'Supes', desc: 'A superhero team assembled the way a boy band is assembled, with the same amount of say in the matter.', meta: 'Seven slots · one brand' },
      { title: 'The Boys', sub: 'The other side', tag: 'Humans', desc: 'A handful of people with no powers and a lot of grievances, working out how to hold the untouchable to account.', meta: 'No powers · no budget' },
      { title: 'Compound V', sub: 'The secret', tag: 'Chemistry', desc: 'Nobody was born with anything. Every hero on the shelf was made in a lab and sold a story about destiny.', meta: 'The whole conspiracy' },
    ] },
  /* the complete index. Every other section on this page is a choice; this one
     is the whole list, so nothing is missing just because it is not worth a
     card. ◆ marks the ones that are mine, taken from what this page already
     says elsewhere rather than picked fresh here. */
  { id: 'works', kind: 'works', title: 'Everything In It', note: 'the show, the spin-offs, the comic',
    lede: 'Five seasons planned from the start, two animated and live-action spin-offs around it, and the Garth Ennis comic underneath, which is meaner than the show and much less interested in being liked.',
    items: [
      { title: 'The Show', sub: 'Amazon · 2019 – 2026', unit: 'season',
        desc: 'Eric Kripke ran it to a planned five-season ending rather than until it stopped selling.',
        rows: [
          { n: 'Season One', y: '2019' },
          { n: 'Season Two', y: '2020' },
          { n: 'Season Three', y: '2022' },
          { n: 'Season Four', y: '2024' },
          { n: 'Season Five', y: '2026' },
        ] },
      { title: 'The Spin-offs', sub: '2022 – now', unit: 'series',
        desc: 'One animated anthology, one college series, and a prequel about how Vought got started.',
        rows: [
          { n: 'The Boys Presents: Diabolical', y: '2022' },
          { n: 'Gen V', y: '2023' },
          { n: 'Vought Rising', y: 'announced' },
        ] },
      { title: 'The Comic', sub: 'Dynamite · 2006 – 2012', unit: 'title',
        desc: 'Garth Ennis and Darick Robertson, seventy-two issues and a handful of side books.',
        rows: [
          { n: 'The Boys #1 – 72', y: '2006' },
          { n: 'Herogasm', y: '2009' },
          { n: 'Highland Laddie', y: '2010' },
          { n: 'Butcher, Baker, Candlestickmaker', y: '2011' },
          { n: 'Dear Becky', y: '2020' },
        ] },
    ] },


  { id: 'seven', kind: 'cards', title: 'The Seven', note: 'the flagship team, as a product line',
    items: [
      { title: 'Homelander', sub: 'The leader', tag: 'Vought', desc: 'Marketed as the most powerful man alive and managed like a brand. The performance is the whole show.', meta: 'Laser vision · flight' },
      { title: 'Queen Maeve', sub: 'The conscience', tag: 'Vought', desc: 'Knows exactly what the team is and stays anyway, which the series treats as its own kind of damage.', meta: 'Strength · durability' },
      { title: 'A-Train', sub: 'Fastest man alive', tag: 'Vought', desc: 'A sprinter whose whole career depends on a drug that is destroying his heart.', meta: 'Speed' },
      { title: 'The Deep', sub: 'Aquatic', tag: 'Vought', desc: 'The punchline of the team, and the running joke about how PR rehabilitates anyone.', meta: 'Talks to fish' },
      { title: 'Black Noir', sub: 'Silent', tag: 'Vought', desc: 'Never speaks. The reveal about why is one of the show\u2019s better swings.', meta: 'Martial arts' },
      { title: 'Starlight', sub: 'Annie January', tag: 'Vought', desc: 'Joins as a true believer, finds out what the job is in her first week, and spends four seasons deciding what to do about it.', meta: 'Light manipulation' },
    ] },

  { id: 'crew', kind: 'cards', title: 'The Boys', note: 'no powers, a lot of grievances',
    items: [
      { title: 'Billy Butcher', sub: 'The one with the plan', tag: 'Crew', desc: 'Right about the supes and wrong about nearly everything else, and willing to burn anyone standing near the fire.', meta: 'Ex-SAS' },
      { title: 'Hughie Campbell', sub: 'The audience', tag: 'Crew', desc: 'Pulled in by a personal loss and spends the series working out whether he is becoming what he is fighting.', meta: 'Everyman' },
      { title: 'Mother\u2019s Milk', sub: 'The professional', tag: 'Crew', desc: 'The only one running the operation like an operation, and the one holding the group together.', meta: 'Ex-military' },
      { title: 'Frenchie', sub: 'Chemist', tag: 'Crew', desc: 'Builds whatever the job needs, and is written with more tenderness than anyone else on the team.', meta: 'Improvised weapons' },
      { title: 'Kimiko', sub: 'The Female', tag: 'Crew', desc: 'Almost entirely silent, and the most expressive performance in the show.', meta: 'Superhuman · mute' },
    ] },

  { id: 'seasons', kind: 'rank', title: 'The Seasons', note: 'released 2019 – 2026 · set contemporary throughout · finished',
    items: [
      { num: '01', title: 'Season One', sub: '2019', meta: 'Released July 2019 · set over a few weeks, present day', desc: 'Establishes the joke and then stops treating it as one, a satire that keeps finding the sad thing under the gag.' },
      { num: '02', title: 'Season Two', sub: '2020', meta: 'Released September – October 2020 · set weeks after season one', desc: 'Stormfront, and the show’s sharpest point about how a brand launders an ideology.' },
      { num: '03', title: 'Season Three', sub: '2022', meta: 'Released June – July 2022 · set about a year later', desc: 'Soldier Boy, and the argument that the cure looks a lot like the disease.' },
      { num: '04', title: 'Season Four', sub: '2024', meta: 'Released June – July 2024 · set months later, through an election', desc: 'The politics turn from subtext into text, and the walls come in.' },
      { num: '05', title: 'Season Five', sub: '2026 · the finale', meta: 'Released 2026 · picks up straight off season four', desc: 'The last one, and the only season I did not watch at home: I saw it in a cinema, in 4DX, with the seat moving. A satire about spectacle, watched as spectacle. Five seasons is the right length: it ends before the joke wears through, which is more than most of these get.' },
    ] },

  { id: 'finale', kind: 'cards', title: 'The Finale', note: 'season five, 2026, in 4DX',
    lede: 'The Boys ended in 2026 after five seasons, which was the plan for a long time rather than a cancellation. I watched the last one in a cinema in 4DX (the moving seat, the whole thing), which is a genuinely absurd way to watch a series that spent five years taking apart the business of selling spectacle to people. Absolutely worth it.',
    items: [
      { title: 'It ended on purpose', sub: 'Five seasons', tag: 'The run', accent: '#e02a2a',
        desc: 'Announced as the final season well ahead of time, so it got to be written as an ending instead of stopping mid-sentence. Almost nothing on this page’s list of shows manages that.',
        meta: '2019 – 2026' },
      { title: '4DX', sub: 'In a cinema, in a moving seat', tag: 'How I saw it', accent: '#c9a05f',
        desc: 'A show about how spectacle is manufactured and sold, watched in the single most manufactured format available. I do not think the irony was lost on anyone in the room. It ruled.',
        meta: 'The seat moves' },
      { title: 'The right length', sub: 'No filler season', tag: 'Why it works', accent: '#6f9fd0',
        desc: 'Five is enough to escalate and not so many that the satire goes blunt from repetition. The premise has a ceiling built into it (once the joke is fully explained there is nowhere left) and it stopped near it.',
        meta: 'Ends before it dulls' },
      { title: 'And Gen V with it', sub: 'Two seasons', tag: 'The universe', accent: '#8f6fd0',
        desc: 'The spinoff wrapped too, and stayed small enough to matter. The whole thing is now a closed set you can watch start to finish, which is rare for something this size.',
        meta: 'Closed set' },
    ] },

  { id: 'bench', kind: 'cards', title: 'Beyond The Seven', note: 'the rest of the roster',
    items: [
      { title: 'Soldier Boy', sub: 'Payback', tag: 'Season 3', desc: 'The first supe America was sold, defrosted decades later with all the attitudes intact, and the season\u2019s argument that the cure looks like the disease.', meta: 'Vought\u2019s first' },
      { title: 'Stormfront', sub: 'Season 2', tag: 'Antagonist', desc: 'A modern brand voice attached to a very old ideology, and the show\u2019s sharpest point about how a platform launders one.', meta: 'Social media' },
      { title: 'Translucent', sub: 'Season 1', tag: 'The Seven', desc: 'Invisible skin, and the first sign that the series is not going to be precious about its roster.', meta: 'Carbon skin' },
      { title: 'Sister Sage', sub: 'Season 4', tag: 'Strategist', desc: 'The smartest person in the world, hired precisely because nobody in the building will listen to her.', meta: 'No powers to speak of' },
      { title: 'Ryan', sub: 'Homelander\u2019s son', tag: 'The stake', desc: 'The only character both sides actually want, and the reason the last seasons have anything to lose.', meta: 'Raised in secret' },
      { title: 'Victoria Neuman', sub: 'Congresswoman', tag: 'Politics', desc: 'The supe running the oversight committee. The reveal recontextualises the entire first season.', meta: 'Head popper' },
    ] },

  { id: 'brand', kind: 'tiles', title: 'The Brand', note: 'the satire, in merchandising form',
    items: [
      { title: 'Vought News Network', accent: '#e02a2a', sub: 'VNN', desc: 'A news channel owned by the company the news is about, which the show plays completely straight.' },
      { title: 'Dawn of the Seven', accent: '#c9a05f', sub: 'The film', desc: 'A superhero blockbuster made inside a superhero satire, with reshoots, a director cut out, and a marketing push.' },
      { title: 'Voughtland', accent: '#6f9fd0', sub: 'The park', desc: 'A theme park with rides themed to the team, because of course there is one.' },
      { title: 'Compound V', accent: '#4fd0ff', sub: 'The product', desc: 'Never sold, never admitted, and the answer to every question the show asks.' },
      { title: 'V24', accent: '#8f6fd0', sub: 'Temporary dose', desc: 'Twenty-four hours of powers for anyone. The moment the humans stop being clean.' },
      { title: 'Brave Maeve merch', accent: '#5fd07f', sub: 'The lie', desc: 'A rainbow marketing campaign approved by the same people managing her private life. The most pointed joke in the show.' },
    ] },

  { id: 'spin', kind: 'cards', title: 'The Wider Universe', note: 'spinoffs',
    items: [
      { title: 'Gen V', sub: '2023 – 2025 · 2 seasons', tag: 'Series', desc: 'Godolkin University: the supe school, which is really a story about what a system does to the students inside it. Two seasons and done, feeding back into the main show rather than sprawling: the rare spinoff that knew its own size.', meta: 'Finished' },
      { title: 'Diabolical', sub: '2022', tag: 'Animation', desc: 'Eight short animated episodes in eight different styles, and a couple of them are canon.', meta: 'Anthology' },
    ] },

  { id: 'lines', kind: 'quotes', title: 'Lines', note: 'the ones that stuck',
    items: [
      { title: 'The real heroes are the people watching at home.', sub: 'Vought marketing' },
      { title: 'Diabolical.', sub: 'Billy Butcher' },
    ] },


  /* the music: explicitly supplied tracks are in the playlist */
  { id: 'themes', kind: 'tiles', compact: true, title: 'The Themes & Songs', note: 'seven tracks · from my playlist',
    lede: 'The title theme, the little Homelander violin meme cue, a few perfect Vought pop songs, and the sped-up Party in the U.S.A. edit.',
    items: [
      { title: 'Main Title', accent: '#e02a2a', sub: 'Christopher Lennertz · The Boys · 2019 · 1:10',
        desc: 'Christopher Lennertz. The main title, all seventy seconds of it, which the show itself barely ever plays in full: guitars, and a sneer.',
        href: 'https://www.youtube.com/watch?v=GRyxwcPm_BI', link: 'Listen' },
      { title: 'Homelander in Hallway', accent: '#c9a05f', sub: 'Christopher Lennertz · Season 2 · 2020 · 0:34',
        desc: 'The tiny, unnerving violin cue from the Homelander hallway meme. It is a real score track, not just trailer music.',
        href: 'https://music.amazon.com/tracks/B08KL3TWZ7', link: 'Listen' },
      { title: 'Never Truly Vanish', accent: '#f0c840', sub: 'Erin Moriarty · Season 2 · 2020',
        desc: 'Starlight’s glossy, totally sincere Vought pop anthem.' },
      { title: 'Faster', accent: '#5f9fd0', sub: 'Jessie T. Usher & Aimée Proal · Season 2 · 2020',
        desc: 'A-Train’s own track: absurdly polished, just like the Vought rollout.' },
      { title: 'Pressure', accent: '#e0603a', sub: 'Billy Joel · Season 2 · 2020',
        desc: 'The Billy Joel needle-drop: pressure, then worse pressure.' },
      { title: 'We Didn’t Start the Fire', accent: '#e0483a', sub: 'Billy Joel · Season 2 · 2020',
        desc: 'The other essential Billy Joel choice: history as a list of disasters, which is basically the show’s format.' },
      { title: 'Party in the U.S.A. (Sped Up)', accent: '#6f9fd0', sub: 'Miley Cyrus · The Boys meme edit',
        desc: 'The “walked into LAX” sped-up meme version. A meme association, not a song used in the series.',
        href: 'https://open.spotify.com/search/Party%20in%20the%20U.S.A.%20Miley%20Cyrus', link: 'Listen' },
    ] },

  { id: 'links', kind: 'links', title: 'Links', note: 'where I actually read about it',
    items: [
      { title: 'The Boys Wiki', href: 'https://the-boys.fandom.com/wiki/The_Boys_Wiki',
        desc: 'Supes, Vought, and the comics the show diverges from.' },
      { title: 'On Wikipedia', href: 'https://en.wikipedia.org/wiki/The_Boys_(TV_series)',
        desc: 'Season by season, with the comic differences noted.' },
    ] },

] };

/* The interactive block, rendered by fan-play.js. */
window.FAN_PLAY = {
  kind: "pick",
  title: "The Seven, As A Product Line",
  intro: "Vought does not have heroes, it has assets, and each one is a brand with a marketing plan, a merchandising line and a crisis file. Pick one and read the file rather than the poster.",
  prompt: "Open a personnel file.",
  said: "%.",
  items: [
    { n: "Compound V", s: "The product", c: "#4fd0ff", d: "M9 3h6v4l3 10a3 3 0 0 1-3 4H9a3 3 0 0 1-3-4l3-10z M9 13h6", note: "Nobody was born with anything. Every hero on the shelf was made in a lab as an infant and sold a story about destiny afterwards. That single fact is the whole show." },
    { n: "V24", s: "Temporary dose", c: "#8f6fd0", d: "M4 12h5l2-5 3 10 2-5h4", note: "Twenty-four hours of powers for anyone. The moment the humans stop being clean, and the show is careful to make it feel like a relief before it makes it feel like a mistake." },
    { n: "Vought News Network", s: "VNN", c: "#e02a2a", d: "M4 6h16v12H4z M8 10h8 M8 14h5 M17 3v3", note: "A news channel owned by the company the news is about, played completely straight, which is far more effective than satire that winks." },
    { n: "Brave Maeve", s: "The campaign", c: "#5fd07f", d: "M12 3l2.6 6.5L21 12l-6.4 2.5L12 21l-2.6-6.5L3 12l6.4-2.5z", note: "A rainbow marketing push approved by the same executives managing her private life against her will. The most pointed joke in the show, and it is barely a joke." },
    { n: "Voughtland", s: "The theme park", c: "#f0c840", d: "M12 3l7 5v12H5V8z M9 20v-6h6v6 M12 3v-1", note: "Of course there is a theme park. Of course there is a ride themed to the thing that killed somebody." },
    { n: "Dawn of the Seven", s: "The film", c: "#c9a05f", d: "M4 5h16v14H4z M4 9h16 M8 5v4 M16 5v4 M8 19v-4 M16 19v-4", note: "A superhero blockbuster made inside a superhero satire, complete with reshoots, a director quietly removed, and a marketing push. The show gets a lot of mileage out of the film being obviously bad." },
  ],
};
