/* music-data.js: the top twenty songs of every year from 2006 to 2025, on /music/.
   music.js renders them, music.css holds the look.

   ── WHAT THESE LISTS ARE ──
   The Billboard Year-End Hot 100, top twenty, one block a year. Billboard's
   year-end chart is a cumulative ranking of a whole tracking year of sales,
   radio and streaming, which makes it the closest thing there is to a neutral
   record of what a year actually sounded like. It is deliberately NOT my
   taste: I was a toddler for the first stretch of this and had no opinion
   about any of it. What I keep and cut is a later pass over this raw material.

   The tracking year is not the calendar year: it runs roughly late October to
   mid October, so a big song can chart in two consecutive years. On this
   page it is listed ONCE, in the year it came out, or the nearest charted
   year to that (2026-10-03): "Royals" stays in 2013, "Shake It Off" in 2014,
   "Blinding Lights" (out November 2019) in 2020, "Heat Waves" (2020) in
   2021, and the seven 2024 songs that charted again in 2025 stay in 2024.
   The year it leaves keeps every other song's real chart rank as `r`, which
   is why some years still at full length carry ranks with gaps in them.

   ── TITLES ──
   Spelled as Billboard credits them, which is not always how the label
   stylises them and not always how they look right:
     "Thats What I Want", "Whats Poppin" and "Lovin on Me" have no apostrophe.
     "XO Tour Llif3" is leetspeak, not "Life".
     "APT." and "Humble" keep or drop their trailing period per Billboard.
     "Good Luck, Babe!", "Sad!", "Run It!" and "Can't Stop the Feeling!" keep
     their punctuation.
   Two 2011 entries are Billboard's printed radio titles, "Forget You" and
   "Perfect", rather than the uncensored forms some sources list. That is a
   deliberate choice for a public page, and Billboard's own credit besides.

   Fields:
     years   year -> the twenty songs, in rank order. Position IS the rank, so
             nothing carries a number: renumbering a list means reordering it.
             A year cut down to the songs I keep (2006 to 2025), or one that
             lost a repeat to another year, gives each its chart rank as `r`,
             so the page still prints the real position.
     peak    1, 2 or 3 on the songs that are more than just kept: Peak, Peak
             Peak and Peak Peak Peak, in my own words. Any number a year, any
             level; most songs have none
     extra   true on a song that was never on the chart but belongs in the
             year (a cover I grew up on); it has no rank, and `note` says why
     t       song title
     a       artist, as credited, featured artists included
     grades  year -> the school years that calendar year spans (a school year
             runs August or September to June), for context in the header
     notes   year -> a line above that year's list, where there is one to make
     eras    the filter chips. `from`/`to` are inclusive. */

window.MUSIC_PAGE = {

  /* the filter chips, oldest era last */
  eras: [
    { k: 'now', label: 'College',     note: '2024\u201325', from: 2024, to: 2025 },
    { k: '20s', label: 'High school', note: '2020\u201323', from: 2020, to: 2023 },
    { k: '10s', label: 'Growing up',  note: '2011\u201319', from: 2011, to: 2019 },
    { k: '00s', label: 'Before school', note: '2006\u201310', from: 2006, to: 2010 },
  ],

  grades: {
    '2025': '1st to 2nd year of college',
    '2024': '12th grade to 1st year of college',
    '2023': '11th to 12th grade',
    '2022': '10th to 11th grade',
    '2021': '9th to 10th grade',
    '2020': '8th to 9th grade',
    '2019': '7th to 8th grade',
    '2018': '6th to 7th grade',
    '2017': '5th to 6th grade',
    '2016': '4th to 5th grade',
    '2015': '3rd to 4th grade',
    '2014': '2nd to 3rd grade',
    '2013': '1st to 2nd grade',
    '2012': 'Kindergarten to 1st grade',
    '2011': 'Preschool to Kindergarten',
  },

  notes: {
    '2020': 'Eighth grade into ninth, and the year school stopped happening in a building.',
    '2011':
        'The year I started school, so the first one where I might genuinely have '
        + 'heard some of these at the time.',
    '2006':
        'The year I was born, in May. Everything on this list was already playing '
        + 'before I was.',
  },

  years: {

    /* cut to the six I keep */
    '2025': [
      { t: 'Luther', a: 'Kendrick Lamar and SZA', v: 'l0wJqJT3gh8', r: 2 },
      { t: 'Ordinary', a: 'Alex Warren', v: 'A8dH4cKGa6s', r: 7 },
      { t: 'Love Somebody', a: 'Morgan Wallen', v: 'zxMo0CZZzyg', r: 11 },
      { t: 'That\'s So True', a: 'Gracie Abrams', v: '9zctVgA2ZkY', r: 14 },
      { t: 'Timeless', a: 'The Weeknd and Playboi Carti', v: '16jA-6hiSUo', r: 16 },
      { t: 'Taste', a: 'Sabrina Carpenter', v: 'z9Q9OzL_wI8', peak: 1, r: 19 },
    ],

    /* cut to the fifteen I keep */
    '2024': [
      { t: 'A Bar Song (Tipsy)', a: 'Shaboozey', v: '_20-PoMDZqo', peak: 1, r: 2 },
      { t: 'Beautiful Things', a: 'Benson Boone', v: 'HU08BcK5SUY', peak: 1, r: 3 },
      { t: 'I Had Some Help', a: 'Post Malone featuring Morgan Wallen', v: '11T6kF66dKY', peak: 1, r: 4 },
      { t: 'Not Like Us', a: 'Kendrick Lamar', v: 'd-9W8MoAM3M', r: 6 },
      { t: 'Espresso', a: 'Sabrina Carpenter', v: '2I9eC2MRhto', peak: 1, r: 7 },
      { t: 'Million Dollar Baby', a: 'Tommy Richman', v: 'bUX8MDNQda4', peak: 1, r: 8 },
      { t: 'I Remember Everything', a: 'Zach Bryan featuring Kacey Musgraves', v: 'VMW-g9Dx2Q4', r: 9 },
      { t: 'Too Sweet', a: 'Hozier', v: 'aezstCBHOPQ', peak: 2, r: 10 },
      { t: 'Stick Season', a: 'Noah Kahan', v: 'iWG6apzIWAk', r: 11 },
      { t: 'Greedy', a: 'Tate McRae', v: '1K_--gz5jhY', peak: 3, r: 13 },
      { t: 'Birds of a Feather', a: 'Billie Eilish', v: 'd5gf9dXbPi0', r: 15 },
      { t: 'Please Please Please', a: 'Sabrina Carpenter', v: 'Yl_thbk40A0', peak: 2, r: 16 },
      { t: 'Agora Hills', a: 'Doja Cat', v: '7Vd6K6i51WQ', peak: 2, r: 17 },
      { t: 'Good Luck, Babe!', a: 'Chappell Roan', v: '1RKqOmSkGgM', peak: 1, r: 18 },
      { t: 'Saturn', a: 'SZA', v: 'eYalXJvJ2Mg', r: 19 },
    ],

    /* cut to the twelve I keep */
    '2023': [
      { t: 'Last Night', a: 'Morgan Wallen', v: 'TyjgBxIVmEc', r: 1 },
      { t: 'Flowers', a: 'Miley Cyrus', v: '7V3jqsIe8c0', r: 2 },
      { t: 'Kill Bill', a: 'SZA', v: '0Uajw7boJgI', r: 3 },
      { t: 'Anti-Hero', a: 'Taylor Swift', v: 'XqN2qFvY64U', r: 4 },
      { t: 'Calm Down', a: 'Rema and Selena Gomez', v: 'LPgN4EfzUrU', peak: 1, r: 6 },
      { t: 'Die for You', a: 'The Weeknd and Ariana Grande', v: 'CVw7iulcI98', r: 7 },
      { t: 'Fast Car', a: 'Luke Combs', v: 'b4Zp75xe6tE', r: 8 },
      { t: 'Snooze', a: 'SZA', v: 'bs0qR3-7lIY', r: 9 },
      { t: 'I\'m Good (Blue)', a: 'David Guetta and Bebe Rexha', v: 'TiodJKq92WY', peak: 1, r: 10 },
      { t: 'Rock and a Hard Place', a: 'Bailey Zimmerman', v: '0XfOGBp52kc', r: 16 },
      { t: 'Cruel Summer', a: 'Taylor Swift', v: 'P8T1rUpVdXE', peak: 3, r: 18 },
      { t: 'Boy\'s a Liar Pt. 2', a: 'PinkPantheress and Ice Spice', v: '0BBK85ilscA', r: 20 },
    ],

    /* cut to the ten I keep */
    '2022': [
      { t: 'As It Was', a: 'Harry Styles', v: 'Qfm6nfz1QNQ', r: 2 },
      { t: 'Easy on Me', a: 'Adele', v: 'X-yIEMduRXk', r: 4 },
      { t: 'Shivers', a: 'Ed Sheeran', v: 'z2_Lrg6rRks', peak: 2, r: 5 },
      { t: 'Ghost', a: 'Justin Bieber', v: 'rfCvBFIv454', peak: 3, r: 8 },
      { t: 'Cold Heart (Pnau Remix)', a: 'Elton John and Dua Lipa', r: 10 },
      { t: 'Thats What I Want', a: 'Lil Nas X', v: 'zHd4rSpZn48', peak: 1, r: 14 },
      { t: 'Enemy', a: 'Imagine Dragons and JID', v: 'rwI_7tDAbUU', peak: 1, r: 15 },
      { t: 'Industry Baby', a: 'Lil Nas X and Jack Harlow', v: 'HCq1OcAEAm0', peak: 3, r: 16 },
      { t: 'ABCDEFU', a: 'Gayle', v: '87yshUAtf4Q', r: 17 },
      { t: 'Need to Know', a: 'Doja Cat', v: 'f9CPymNwkYw', r: 18 },
    ],

    /* cut to the eighteen I keep */
    '2021': [
      { t: 'Levitating', a: 'Dua Lipa', v: 'WHuBW3qKm9g', peak: 2, r: 1 },
      { t: 'Save Your Tears', a: 'The Weeknd and Ariana Grande', v: '3o4ug07qJBI', peak: 3, r: 2 },
      { t: 'Mood', a: '24kGoldn featuring Iann Dior', v: '0jSpCxmb2VQ', peak: 2, r: 4 },
      { t: 'Good 4 U', a: 'Olivia Rodrigo', v: 'o6Tf-xcVB_o', peak: 2, r: 5 },
      { t: 'Kiss Me More', a: 'Doja Cat featuring SZA', v: 'Ab6E2BsuLJ0', peak: 2, r: 6 },
      { t: 'Drivers License', a: 'Olivia Rodrigo', v: '_Bjf-iExroI', r: 8 },
      { t: 'Montero (Call Me by Your Name)', a: 'Lil Nas X', v: 'nsXwi67WgOo', peak: 1, r: 9 },
      { t: 'Peaches', a: 'Justin Bieber featuring Daniel Caesar and Giveon', v: 'BydBU2pCkU8', peak: 1, r: 10 },
      { t: 'Butter', a: 'BTS', v: 'bOq67Poe95w', peak: 2, r: 11 },
      { t: 'Stay', a: 'The Kid Laroi and Justin Bieber', v: 'yWHrYNP6j4k', peak: 3, r: 12 },
      { t: 'Deja Vu', a: 'Olivia Rodrigo', v: 'fWgboQNNfB8', peak: 1, r: 13 },
      { t: 'Positions', a: 'Ariana Grande', v: 'Xsb9flAEymA', peak: 3, r: 14 },
      { t: 'Bad Habits', a: 'Ed Sheeran', v: 'HeOpRzcqKrE', peak: 3, r: 15 },
      { t: 'Heat Waves', a: 'Glass Animals', v: 'KT7F15T9VBI', peak: 2, r: 16 },
      { t: 'Without You', a: 'The Kid Laroi', v: 'JLViYST58cc', peak: 1, r: 17 },
      { t: 'Forever After All', a: 'Luke Combs', v: '6p8L4nLBCdI', r: 18 },
      { t: 'Go Crazy', a: 'Chris Brown and Young Thug', v: '18hB5edZhYY', r: 19 },
      { t: 'Astronaut in the Ocean', a: 'Masked Wolf', v: 'Ju9xgdp89Jk', r: 20 },
    ],

    /* cut to the fifteen I keep */
    '2020': [
      { t: 'Blinding Lights', a: 'The Weeknd', v: 'XwxLwG2_Sxk', peak: 3, r: 1 },
      { t: 'Circles', a: 'Post Malone', v: 'WnLIGgTaBM0', peak: 3, r: 2 },
      { t: 'The Box', a: 'Roddy Ricch', v: '4QGqFfhKWYo', peak: 3, r: 3 },
      { t: 'Don\'t Start Now', a: 'Dua Lipa', v: 'CVhJYPNK6sI', peak: 1, r: 4 },
      { t: 'Adore You', a: 'Harry Styles', v: 'xzNliaWxdjM', r: 6 },
      { t: 'Life Is Good', a: 'Future featuring Drake', v: 'rOVsNCo_2d4', peak: 1, r: 7 },
      { t: 'Memories', a: 'Maroon 5', v: 'o2DXt11SMNI', peak: 1, r: 8 },
      { t: 'Someone You Loved', a: 'Lewis Capaldi', v: 'FGGo8LFmbjs', r: 10 },
      { t: 'Say So', a: 'Doja Cat', v: 'Amsbv8GlEBk', r: 11 },
      { t: 'Dance Monkey', a: 'Tones and I', v: '0Yy9YzdmTJA', r: 14 },
      { t: 'Roxanne', a: 'Arizona Zervas', v: 'YTY2E80qfCs', peak: 1, r: 16 },
      { t: 'Intentions', a: 'Justin Bieber featuring Quavo', v: 'VI8lrXNSLnA', peak: 1, r: 17 },
      { t: 'Everything I Wanted', a: 'Billie Eilish', v: 'rodyJ8gGEFc', r: 18 },
      { t: 'Roses (Imanbek remix)', a: 'Saint Jhn', peak: 2, r: 19 },
      { t: 'Watermelon Sugar', a: 'Harry Styles', v: 'dZwffaluIgg', r: 20 },
    ],

    /* cut to the nineteen I keep */
    '2019': [
      { t: 'Old Town Road', a: 'Lil Nas X featuring Billy Ray Cyrus', v: '7UGOIMoJtB4', peak: 3, r: 1 },
      { t: 'Sunflower', a: 'Post Malone and Swae Lee', v: 'cKMQz1Rf2ow', peak: 3, r: 2 },
      { t: 'Without Me', a: 'Halsey', v: 'rQH8vrOBrPs', peak: 2, r: 3 },
      { t: 'Wow', a: 'Post Malone', v: 'K7KLL-crH2Q', r: 5 },
      { t: 'Happier', a: 'Marshmello and Bastille', v: 'RE87rQkXdNw', peak: 3, r: 6 },
      { t: '7 Rings', a: 'Ariana Grande', v: 'uDAjINEp8H8', peak: 2, r: 7 },
      { t: 'Talk', a: 'Khalid', v: 'qjL_-OFbk8I', r: 8 },
      { t: 'Sicko Mode', a: 'Travis Scott', v: 'f2YWfeFRZO0', peak: 2, r: 9 },
      { t: 'Sucker', a: 'Jonas Brothers', v: 'tdKmewyZPXE', peak: 2, r: 10 },
      { t: 'High Hopes', a: 'Panic! at the Disco', v: 'fH_OnJk6QqU', peak: 2, r: 11 },
      { t: 'Thank U, Next', a: 'Ariana Grande', v: 'EEhZAHZQyf4', peak: 2, r: 12 },
      { t: 'Truth Hurts', a: 'Lizzo', v: 'k50WMM9g-0Q', r: 13 },
      { t: 'Dancing with a Stranger', a: 'Sam Smith and Normani', v: 'o8lX-uRdIDs', r: 14 },
      { t: 'Señorita', a: 'Shawn Mendes and Camila Cabello', v: 'xq866Q7GUlc', peak: 2, r: 15 },
      { t: 'I Don\'t Care', a: 'Ed Sheeran and Justin Bieber', v: 'CCSGelSCPGE', peak: 2, r: 16 },
      { t: 'Eastside', a: 'Benny Blanco, Halsey and Khalid', v: 'KFof8aaUvGY', peak: 2, r: 17 },
      { t: 'Going Bad', a: 'Meek Mill featuring Drake', v: 'SvOG90krtt4', r: 18 },
      { t: 'Shallow', a: 'Lady Gaga and Bradley Cooper', v: 'aU_bj9SxvdU', r: 19 },
      { t: 'Better', a: 'Khalid', v: 'cXrd_IQzCtM', peak: 1, r: 20 },
    ],

    /* cut to the seventeen I keep */
    '2018': [
      { t: 'God\'s Plan', a: 'Drake', v: 'pPKx-fon1nY', peak: 3, r: 1 },
      { t: 'Perfect', a: 'Ed Sheeran', v: 'iKzRIweSBLA', peak: 3, r: 2 },
      { t: 'Meant to Be', a: 'Bebe Rexha featuring Florida Georgia Line', v: 'j5YSOabmFgw', r: 3 },
      { t: 'Havana', a: 'Camila Cabello featuring Young Thug', v: 'egtD5GfAh58', peak: 3, r: 4 },
      { t: 'Rockstar', a: 'Post Malone featuring 21 Savage', v: 'E0ks77ipLN4', r: 5 },
      { t: 'Psycho', a: 'Post Malone featuring Ty Dolla Sign', v: 'uhx8NjSsdY0', r: 6 },
      { t: 'The Middle', a: 'Zedd, Maren Morris and Grey', v: 'Lj6Y6JCu-l4', peak: 3, r: 8 },
      { t: 'In My Feelings', a: 'Drake', v: '-Smq4jjrCIc', peak: 3, r: 9 },
      { t: 'Girls Like You', a: 'Maroon 5 featuring Cardi B', v: '0lZ2AFZR6IU', peak: 1, r: 10 },
      { t: 'Lucid Dreams', a: 'Juice Wrld', v: '_fh64GbFSw4', peak: 3, r: 12 },
      { t: 'Better Now', a: 'Post Malone', v: 'nqggm9o2Z9k', peak: 1, r: 13 },
      { t: 'Boo\'d Up', a: 'Ella Mai', v: 'bppexIE1CFc', r: 15 },
      { t: 'New Rules', a: 'Dua Lipa', v: 'AyWsHs5QdiY', peak: 1, r: 16 },
      { t: 'Sad!', a: 'XXXTentacion', v: 'h6ScDiPhOZk', peak: 3, r: 17 },
      { t: 'Never Be the Same', a: 'Camila Cabello', v: 'F5MXO1cLRGQ', r: 18 },
      { t: 'Love Lies', a: 'Khalid and Normani', v: 'FGa067-f_LI', r: 19 },
      { t: 'No Tears Left to Cry', a: 'Ariana Grande', v: 'fFuQfcAbCIA', r: 20 },
    ],

    /* cut to the fifteen I keep */
    '2017': [
      { t: 'Shape of You', a: 'Ed Sheeran', v: '_dK2tDK9grQ', r: 1, peak: 2 },
      { t: 'Despacito (Remix)', a: 'Luis Fonsi and Daddy Yankee featuring Justin Bieber', r: 2, peak: 1 },
      { t: 'That\'s What I Like', a: 'Bruno Mars', v: 'OMRhatk0aZg', r: 3 },
      { t: 'Something Just Like This', a: 'The Chainsmokers and Coldplay', v: 'FM7MFYoylVs', r: 5, peak: 3 },
      { t: 'Believer', a: 'Imagine Dragons', v: 'W0DM5lcj6mw', r: 9, peak: 1 },
      { t: 'Congratulations', a: 'Post Malone featuring Quavo', v: 'mtXjDa61_Fs', r: 10 },
      { t: 'Say You Won\'t Let Go', a: 'James Arthur', v: '8A7-54UguKg', r: 11, peak: 1 },
      { t: 'I\'m the One', a: 'DJ Khaled featuring Justin Bieber, Quavo, Chance the Rapper and Lil Wayne', v: '158plNHX4vw', r: 12, peak: 2 },
      { t: 'XO Tour Llif3', a: 'Lil Uzi Vert', v: 'VcyFfcJbyeM', r: 13, peak: 3 },
      { t: 'Mask Off', a: 'Future', v: '-68Y711xMGY', r: 14 },
      { t: 'Unforgettable', a: 'French Montana featuring Swae Lee', v: 'MIcIza4sqaM', r: 15 },
      { t: '24K Magic', a: 'Bruno Mars', v: 'LhZ5GXCZtEw', r: 16 },
      { t: 'Stay', a: 'Zedd and Alessia Cara', v: 'h--P8HzYZ74', r: 17, peak: 3 },
      { t: 'Black Beatles', a: 'Rae Sremmurd featuring Gucci Mane', v: 'HvO9xAeIrj0', r: 19, peak: 3 },
      { t: 'Starboy', a: 'The Weeknd featuring Daft Punk', v: 'dMMUH_ZpbB0', r: 20, peak: 1 },
    ],

    /* cut to the nineteen I keep */
    '2016': [
      { t: 'Love Yourself', a: 'Justin Bieber', v: 'HDe7GYpxq9g', r: 1 },
      { t: 'Sorry', a: 'Justin Bieber', v: '8ELbX5CMomE', r: 2, peak: 3 },
      { t: 'Work', a: 'Rihanna featuring Drake', v: 'OED5AZhbskk', r: 4 },
      { t: 'Stressed Out', a: 'Twenty One Pilots', v: 'JRqRVAUlA4E', r: 5, peak: 3 },
      { t: 'Panda', a: 'Desiigner', v: 'OLOnCNKUzWU', r: 6 },
      { t: 'Hello', a: 'Adele', v: '8fIUkINS1uo', r: 7, peak: 2 },
      { t: 'Don\'t Let Me Down', a: 'The Chainsmokers featuring Daya', v: 'mywyuiAbww4', r: 8, peak: 2 },
      { t: 'Can\'t Stop the Feeling!', a: 'Justin Timberlake', v: '0Ui-QzihJGo', r: 9, peak: 1 },
      { t: 'Closer', a: 'The Chainsmokers featuring Halsey', v: 'PT2_F-1esPk', r: 10, peak: 3 },
      { t: 'Cheap Thrills', a: 'Sia featuring Sean Paul', v: 'nYh-n7EOtMA', r: 11 },
      { t: '7 Years', a: 'Lukas Graham', v: 'Q0bnAmfGQC8', r: 12, peak: 1 },
      { t: 'Needed Me', a: 'Rihanna', v: 'Ni06ODnrEsk', r: 13 },
      { t: 'My House', a: 'Flo Rida', v: 'RMmEtcIW_WA', r: 14, peak: 3 },
      { t: 'I Took a Pill in Ibiza', a: 'Mike Posner', v: '81KvRXxmcEI', r: 15 },
      { t: 'Work from Home', a: 'Fifth Harmony featuring Ty Dolla Sign', v: 'GJf28veNWHE', r: 16 },
      { t: 'This Is What You Came For', a: 'Calvin Harris featuring Rihanna', v: 'ipLRRzJ9sWg', r: 17, peak: 3 },
      { t: 'Cake by the Ocean', a: 'DNCE', v: 'G6AcBEz3Qxg', r: 18, peak: 1 },
      { t: 'Me, Myself & I', a: 'G-Eazy and Bebe Rexha', v: 'qiqllkchWTI', r: 19 },
      { t: 'Ride', a: 'Twenty One Pilots', v: 'jHKQof8WIlI', r: 20, peak: 3 },
    ],

    /* cut to the sixteen I keep */
    '2015': [
      { t: 'Uptown Funk', a: 'Mark Ronson featuring Bruno Mars', v: 'W8FUmkw3a4U', r: 1 },
      { t: 'Thinking Out Loud', a: 'Ed Sheeran', v: 'XMPgVZtADtQ', r: 2 },
      { t: 'See You Again', a: 'Wiz Khalifa featuring Charlie Puth', v: 'NDEWXnMRq3c', r: 3, peak: 1 },
      { t: 'Trap Queen', a: 'Fetty Wap', v: '1AM_VSfudig', r: 4, peak: 1 },
      { t: 'Sugar', a: 'Maroon 5', v: 'N1BcpzPGlYQ', r: 5, peak: 1 },
      { t: 'Shut Up and Dance', a: 'Walk the Moon', v: 'X8HUhFSLnl0', r: 6 },
      { t: 'Blank Space', a: 'Taylor Swift', v: 'nAQ_1lTDvPQ', r: 7 },
      { t: 'Watch Me', a: 'Silentó', v: 'yqes4O24ddo', r: 8 },
      { t: 'Earned It', a: 'The Weeknd', v: 'xe_iCkFsQKE', r: 9 },
      { t: 'The Hills', a: 'The Weeknd', v: 'zxdSHfZFKkY', r: 10, peak: 1 },
      { t: 'Cheerleader', a: 'OMI', v: 'irCD8WvvS88', r: 11, peak: 1 },
      { t: 'Can\'t Feel My Face', a: 'The Weeknd', v: 'QC2FoaT7Yb8', r: 12 },
      { t: 'Love Me Like You Do', a: 'Ellie Goulding', v: 'uWoYIOcOpwU', r: 13, peak: 1 },
      { t: 'Bad Blood', a: 'Taylor Swift featuring Kendrick Lamar', v: 'lUvBk4owRNU', r: 15, peak: 2 },
      { t: 'Lean On', a: 'Major Lazer and DJ Snake featuring MØ', v: 'rn9AQoI7mYU', r: 16, peak: 1 },
      { t: 'Fight Song', a: 'Rachel Platten', v: 'XbxNtPiCBK8', r: 20, peak: 3 },
    ],

    /* cut to the eighteen I keep */
    '2014': [
      { t: 'Happy', a: 'Pharrell Williams', v: 'KmAbeMvjBmk', r: 1, peak: 1 },
      { t: 'Dark Horse', a: 'Katy Perry featuring Juicy J', v: 'GSHPm2JkbUw', r: 2 },
      { t: 'All of Me', a: 'John Legend', v: 'QfgJQUiQFes', r: 3 },
      { t: 'Fancy', a: 'Iggy Azalea featuring Charli XCX', v: 'bN5HSSko1dc', r: 4, peak: 1 },
      { t: 'Counting Stars', a: 'OneRepublic', v: 'mgT0N3tMP74', r: 5, peak: 1 },
      { t: 'Rude', a: 'Magic!', v: 'xjqQfVY0yAc', r: 7 },
      { t: 'All About That Bass', a: 'Meghan Trainor', v: 'M6w_4k62uHc', r: 8 },
      { t: 'Problem', a: 'Ariana Grande featuring Iggy Azalea', v: 'SoJ8s90NLc4', r: 9, peak: 1 },
      { t: 'Stay with Me', a: 'Sam Smith', v: 'bXDSR4GggUU', r: 10 },
      { t: 'Timber', a: 'Pitbull featuring Kesha', v: 'Lq_1cfgUxO8', r: 11, peak: 3 },
      { t: 'Pompeii', a: 'Bastille', v: 'ilLEuwH4hws', r: 12, peak: 3 },
      { t: 'Shake It Off', a: 'Taylor Swift', v: 'Z4A9ZZo_rAE', r: 13, peak: 2 },
      { t: 'Am I Wrong', a: 'Nico & Vinz', v: 'VBmEJZofz2s', r: 14, peak: 1 },
      { t: 'Turn Down for What', a: 'DJ Snake and Lil Jon', v: '9U1VuzkvJYc', r: 15 },
      { t: 'The Monster', a: 'Eminem featuring Rihanna', v: 'mWUamzMQFvI', r: 16, peak: 1 },
      { t: 'Say Something', a: 'A Great Big World and Christina Aguilera', v: 'tV3uXVBydcI', r: 17, peak: 1 },
      { t: 'Team', a: 'Lorde', v: 'biUnzjsuehA', r: 18, peak: 3 },
      { t: 'Let Her Go', a: 'Passenger', v: 'XMk3BxjD9J0', r: 19, peak: 3 },
    ],

    /* cut to the seventeen I keep */
    '2013': [
      { t: 'Thrift Shop', a: 'Macklemore & Ryan Lewis featuring Wanz', v: '2LjZbRpW2Eo', r: 1 },
      { t: 'Radioactive', a: 'Imagine Dragons', v: 'w3viBe2Q0P8', r: 3, peak: 1 },
      { t: 'Can\'t Hold Us', a: 'Macklemore & Ryan Lewis featuring Ray Dalton', v: 'qWMNO8gq_cg', r: 5, peak: 1 },
      { t: 'Mirrors', a: 'Justin Timberlake', v: 'ZFlpVBFSEis', r: 6 },
      { t: 'Just Give Me a Reason', a: 'Pink featuring Nate Ruess', r: 7 },
      { t: 'Cruise', a: 'Florida Georgia Line featuring Nelly', v: 'zAND37zOC9g', r: 9 },
      { t: 'Roar', a: 'Katy Perry', v: 'mwL1cohnHNE', r: 10, peak: 1 },
      { t: 'Locked Out of Heaven', a: 'Bruno Mars', v: 'WzsYtW8zyXU', r: 11 },
      { t: 'Ho Hey', a: 'The Lumineers', v: 'LPyZYmPb3sM', r: 12, peak: 3 },
      { t: 'Stay', a: 'Rihanna featuring Mikky Ekko', v: '_bXqoIzH0N8', r: 13 },
      { t: 'Get Lucky', a: 'Daft Punk featuring Pharrell Williams', v: '5glDAaCaazc', r: 14, peak: 1 },
      { t: 'Royals', a: 'Lorde', v: 'I7EYuObA8h4', r: 15, peak: 3 },
      { t: 'I Knew You Were Trouble', a: 'Taylor Swift', v: 'TqAollrUJdA', r: 16, peak: 2 },
      { t: 'We Can\'t Stop', a: 'Miley Cyrus', v: 'g3Kv2BZ7muY', r: 17 },
      { t: 'Wrecking Ball', a: 'Miley Cyrus', v: 'AHtYLZu3ZQk', r: 18 },
      { t: 'Wake Me Up', a: 'Avicii', v: '5y_KJAg8bHI', r: 19, peak: 3 },
      { t: 'Suit & Tie', a: 'Justin Timberlake featuring Jay-Z', v: 'KReoTOZK9W8', r: 20 },
    ],

    /* cut to the thirteen I keep */
    '2012': [
      { t: 'Somebody That I Used to Know', a: 'Gotye featuring Kimbra', v: 'HlxogDOxBSE', r: 1, peak: 1 },
      { t: 'Call Me Maybe', a: 'Carly Rae Jepsen', v: '47EG91_XHic', r: 2 },
      { t: 'We Are Young', a: 'Fun featuring Janelle Monáe', v: 'nAzRHjreg6w', r: 3, peak: 1 },
      { t: 'Payphone', a: 'Maroon 5 featuring Wiz Khalifa', v: '5FlQSQuv_mg', r: 4, peak: 1 },
      { t: 'Lights', a: 'Ellie Goulding', v: 'V9RbUwvqc2U', r: 5, peak: 1 },
      { t: 'Glad You Came', a: 'The Wanted', v: 'I5GjALNHzPQ', r: 6 },
      { t: 'Stronger (What Doesn\'t Kill You)', a: 'Kelly Clarkson', v: 'RjZzySx7TmM', r: 7 },
      { t: 'We Found Love', a: 'Rihanna featuring Calvin Harris', v: 'QrJosGJj7w0', r: 8, peak: 3 },
      { t: 'Starships', a: 'Nicki Minaj', v: 'sy7HTezsNZk', r: 9, peak: 1 },
      { t: 'What Makes You Beautiful', a: 'One Direction', v: 'VpnuubCJjCU', r: 10, peak: 1 },
      { t: 'Set Fire to the Rain', a: 'Adele', v: 'qOagQWjKpyM', r: 12 },
      { t: 'Good Feeling', a: 'Flo Rida', v: 'EO6ZFcBd3hg', r: 16, peak: 2 },
      { t: 'Whistle', a: 'Flo Rida', v: 'rza3NaxW0R4', r: 17, peak: 1 },
    ],

    /* cut to the ten I keep */
    '2011': [
      { t: 'Rolling in the Deep', a: 'Adele', v: 'AIYpdjQVidc', r: 1 },
      { t: 'Party Rock Anthem', a: 'LMFAO featuring Lauren Bennett and GoonRock', v: 'GvuSYrQGLNE', r: 2 },
      { t: 'Firework', a: 'Katy Perry', v: 'KSbwHzlcgs8', r: 3, peak: 1 },
      { t: 'E.T.', a: 'Katy Perry featuring Kanye West', v: '0P-_GnPdxZw', r: 4 },
      { t: 'Forget You', a: 'CeeLo Green', v: 'sy-a95dXkl8', r: 7 },
      { t: 'Moves like Jagger', a: 'Maroon 5 featuring Christina Aguilera', v: 'GzUMdeecB_s', r: 9, peak: 1 },
      { t: 'On the Floor', a: 'Jennifer Lopez featuring Pitbull', v: '70XspGKI8kQ', r: 11 },
      { t: 'Pumped Up Kicks', a: 'Foster the People', v: '0DOv0-2yyfE', r: 13 },
      { t: 'Last Friday Night (T.G.I.F.)', a: 'Katy Perry', v: 'oIl8lEz86jY', r: 14 },
      { t: 'What\'s My Name?', a: 'Rihanna featuring Drake', v: 'zuLVjvXcnIk', r: 20, peak: 3 },
    ],

    /* cut to the ten I keep */
    '2010': [
      { t: 'Tik Tok', a: 'Kesha', v: 'OF04pKp-r9o', r: 1, peak: 1 },
      { t: 'Hey, Soul Sister', a: 'Train', v: 'NCDL1h_j6EQ', r: 3, peak: 2 },
      { t: 'California Gurls', a: 'Katy Perry featuring Snoop Dogg', v: 'iCzbrrnmSFo', r: 4 },
      { t: 'Airplanes', a: 'B.o.B featuring Hayley Williams', v: '-RQNe52jkao', r: 6 },
      { t: 'Love the Way You Lie', a: 'Eminem featuring Rihanna', v: 'a-U8osE4BD8', r: 7 },
      { t: 'Bad Romance', a: 'Lady Gaga', v: 'TTOPBQhrvtQ', r: 8, peak: 1 },
      { t: 'Dynamite', a: 'Taio Cruz', v: 'kJNyjdpT1vo', r: 9, peak: 3 },
      { t: 'Rude Boy', a: 'Rihanna', v: 'u-JFVczaNsY', r: 15 },
      { t: 'Teenage Dream', a: 'Katy Perry', v: 'oRCz85wXwzw', r: 17 },
      { t: 'Just the Way You Are', a: 'Bruno Mars', v: 'u7XjPmN-tHw', r: 18 },
    ],

    /* cut to the ten I keep */
    '2009': [
      { t: 'Poker Face', a: 'Lady Gaga', v: 'BvJSig2WhnY', r: 2, peak: 1 },
      { t: 'Just Dance', a: 'Lady Gaga featuring Colby O\'Donis', v: 'zVH638r_X_I', r: 3 },
      { t: 'I Gotta Feeling', a: 'The Black Eyed Peas', v: 'ipii7KbbJLY', r: 4, peak: 2 },
      { t: 'Love Story', a: 'Taylor Swift', v: 'aXzVF3XeS8M', r: 5, peak: 3 },
      { t: 'Right Round', a: 'Flo Rida', v: 'yYRjZP1t868', r: 6 },
      { t: 'Single Ladies (Put a Ring on It)', a: 'Beyoncé', v: '_7zlfbXdWAY', r: 8 },
      { t: 'Heartless', a: 'Kanye West', v: 'cIFnh0FyGT8', r: 9 },
      { t: 'You Belong with Me', a: 'Taylor Swift', v: 'yA3jAcbIzHM', r: 11 },
      { t: 'Live Your Life', a: 'T.I. featuring Rihanna', v: 'rXneGIQjhC4', r: 18 },
      { t: 'Down', a: 'Jay Sean featuring Lil Wayne', v: 'DirKD1ecaw4', r: 20 },
    ],

    /* cut to the ten I keep, plus one that was never on any chart */
    '2008': [
      { t: 'Low', a: 'Flo Rida featuring T-Pain', v: 'CxPc1Q3-0zc', r: 1 },
      { t: 'Apologize', a: 'OneRepublic', v: 'rF5oITEq43Q', r: 5 },
      { t: 'No Air', a: 'Jordin Sparks and Chris Brown', v: 'RE-vp5H_maE', r: 6 },
      { t: 'With You', a: 'Chris Brown', v: 'rnAA7sK_c5I', r: 9 },
      /* not on the chart: Raef's cover, the version I actually grew up on */
      { t: 'With You (Chris Brown Cover)', a: 'Raef', v: 'kfnan71ANLY', extra: true,
        note: 'Islamic childhood nostalgia' },
      { t: 'Forever', a: 'Chris Brown', v: 'D1--EAvWVAU', r: 10, peak: 1 },
      { t: 'Viva la Vida', a: 'Coldplay', v: 'y4zdDXPYo0I', r: 13 },
      { t: 'I Kissed a Girl', a: 'Katy Perry', v: 'xHOgq4C8P9Y', r: 14 },
      { t: 'Disturbia', a: 'Rihanna', v: 'a9LwyQQbaTU', r: 16, peak: 1 },
      { t: 'Don\'t Stop the Music', a: 'Rihanna', v: '_P7Yr4_caB8', r: 17 },
      { t: 'Pocketful of Sunshine', a: 'Natasha Bedingfield', v: 'w2WnOFuoqfA', r: 18 },
    ],

    /* cut to the seven I keep; `r` is each one's rank on the full chart */
    '2007': [
      { t: 'Umbrella', a: 'Rihanna featuring Jay-Z', v: 'EPtrQpx9VDw', r: 2 },
      { t: 'The Sweet Escape', a: 'Gwen Stefani featuring Akon', v: 'JcXxdpdi6f4', r: 3 },
      { t: 'Hey There Delilah', a: 'Plain White T\'s', v: '6tV8jb258w8', r: 7, peak: 1 },
      { t: 'Say It Right', a: 'Nelly Furtado', v: 'w4SwtMaAYak', r: 9 },
      { t: 'Don\'t Matter', a: 'Akon', v: 'EqlIq87A1yE', r: 11 },
      { t: 'Girlfriend', a: 'Avril Lavigne', v: 'MLEfglaTmd0', r: 12 },
      { t: 'Crank That (Soulja Boy)', a: 'Soulja Boy Tell \'Em', v: 'V5uzVcumYpc', r: 20 },
    ],

    /* cut to the six I keep; `r` is each one's rank on the full chart */
    '2006': [
      { t: 'Bad Day', a: 'Daniel Powter', v: 'eN_SVw-yyhA', r: 1 },
      { t: 'Hips Don\'t Lie', a: 'Shakira featuring Wyclef Jean', v: 'p3pEe6aAJ4k', r: 5, peak: 1 },
      { t: 'Unwritten', a: 'Natasha Bedingfield', v: 'vRQb_-mRcAc', r: 6, peak: 2 },
      { t: 'Crazy', a: 'Gnarls Barkley', v: 'U0EW0s1fN-8', r: 7 },
      { t: 'Me & U', a: 'Cassie', v: 'CllteyEUY2Y', r: 14 },
      { t: 'SOS', a: 'Rihanna', v: 'OFfVQCVzjZU', r: 19 },
    ],

  },
};
