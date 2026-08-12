/* accents-data.js: the accents and impersonations I do, on /accents/.
   accents.js renders them, accents.css holds the look.

   ORDERED BY WHEN I LEARNED THEM, not by region and not by how good they are.
   That ordering is the whole point of the page: it is a timeline of a habit,
   from one accent I did not know was an accent to nineteen of them.

   Fields:
     id     slug, and the audio filename (see below)
     name   what it says on the card
     ar     the two-letter mark drawn in the medallion
     note   the region / where it comes from
     line   the phrase I actually use to get into it
     desc   what makes it work: the one sound that carries the whole accent
     rec    true once a recording for it exists (see below)

   ── THE RECORDINGS ──
   Every card is wired for audio and nothing is recorded yet, which is why every
   `rec` below is absent. The moment a file exists at

       /assets/audio/accents/<id>.m4a

   set `rec: true` on that entry and the card grows a working play button; until
   then it renders an honest "not recorded yet" chip instead of a button that
   404s. Nothing else has to change.

   Pipeline for the files themselves, so they stay small enough to ship inside
   the offline cache: record and keep a lossless master (WAV -> FLAC, which is
   lossless compression and stays in the repo's history, not in /assets), then
   encode the lossy copy the site actually serves:

       ffmpeg -i master.flac -c:a aac -b:a 96k -ac 1 -ar 44100 <id>.m4a

   Mono at 96 kbps is transparent for one voice and lands a ten-second clip at
   well under 150 KB. */

window.ACCENT_PAGE = {

  groups: [

    { id: 'first', label: 'Before I knew it was one', note: 'the one I was already doing',
      items: [
        { id: 'midwestern', n: 1, name: 'Midwestern White American', ar: 'US',
          note: 'General American · the broadcast standard',
          line: 'Yeah, no, for sure.',
          desc: 'The accent that sounds like no accent, which is the trick of it: it is what American broadcast news standardised on, so a whole country hears it as neutral. Fully rhotic, every R pronounced, and cot and caught are the same word. It is the floor everything else on this page is measured against.' },
      ] },

    { id: 'g5', label: '5th grade', note: '2016–17 · where the habit actually starts',
      items: [
        { id: 'rp', n: 2, name: 'Posh British', ar: 'RP',
          note: 'Received Pronunciation · Queen’s English',
          line: 'Rather. Shall we?',
          desc: 'Non-rhotic — the R at the end of a word simply is not there — and the bath vowel goes long and back, so "bath" and "laugh" stop rhyming with "cat". The tell is the T: fully released, every time, where an American would tap it. Two percent of Britain speaks it and it is the one everyone abroad thinks is British.' },
        { id: 'scottish', n: 3, name: 'Scottish', ar: 'SC',
          note: 'Central belt · Glasgow and Edinburgh',
          line: 'Och, ye cannae be serious.',
          desc: 'The rolled R is the headline, but the real work is in the vowels: Scots keeps distinctions English lost, and holds them at one length instead of gliding through them. "Pool" and "pull" are the same word here. Getting it wrong sounds Irish, which is the mistake everyone makes.' },
      ] },

    { id: 'g7', label: '7th grade', note: '2018–19 · six in one year',
      items: [
        { id: 'southern', n: 4, name: 'Southern American', ar: 'SA',
          note: 'The South · Georgia through Texas',
          line: 'Well, I do declare.',
          desc: 'The drawl is one vowel doing the work of two: the long I in "time" flattens right out into "tahm". Non-rhotic in the older, coastal version and rhotic further inland, which is a useful dial to have. And "y’all" is not a joke, it is the second-person plural English is otherwise missing.' },
        { id: 'indian', n: 5, name: 'Indian', ar: 'IN',
          note: 'South Asia · Hindi and Urdu substrate',
          line: 'What is this nonsense?',
          desc: 'Retroflex T and D — the tongue curls back to the roof of the mouth — and no aspiration on the stops, so "top" loses its puff of air. Syllable-timed rather than stress-timed, which is what gives it that even, unhurried rhythm, and the W and V collapse toward each other.' },
        { id: 'russian', n: 6, name: 'Russian', ar: 'RU',
          note: 'Slavic · Eastern European',
          line: 'You have made a very serious mistake.',
          desc: 'Russian has no articles, so "the" and "a" go missing and the sentence gets shorter and flatter. Final consonants devoice, so "job" comes out as "jop", and every L is dark and heavy. The vowels stay short and hard where English would let them drift.' },
        { id: 'wakandan', n: 7, name: 'Wakandan', ar: 'WK',
          note: 'T’Challa · Xhosa-based South African',
          line: 'Wakanda forever.',
          desc: 'Not invented: the film built it on Xhosa, and Chadwick Boseman fought to keep it rather than let the character sound British. Crisp, fully released consonants, a rising melody at the end of a phrase, and the pace held deliberately slow. It is a king’s accent because it never hurries.' },
        { id: 'cockney', n: 8, name: 'Cockney British', ar: 'CK',
          note: 'East London · working class',
          line: 'You havin’ a laugh?',
          desc: 'The glottal stop is everything: "butter" loses its T entirely and becomes "bu’er". TH fronts to F and V, so "think" is "fink" and "brother" is "bruvver", and the H at the front of a word is gone. The exact opposite of the RP two cards up, from the same city.' },
        { id: 'noble', n: 9, name: 'Noble British', ar: 'NB',
          note: 'Theatrical · Shakespearean',
          line: 'You dare speak to me of honour?',
          desc: 'RP taken to the stage: the vowels open right up, the consonants get carved, and the pitch range doubles. Less an accent than a posture — the Royal Shakespeare Company built it to carry to the back of a theatre without a microphone, and it is what every screen villain borrows.' },
      ] },

    { id: 'g8', label: '8th grade', note: '2019–20 · the European run',
      items: [
        { id: 'irish', n: 10, name: 'Irish', ar: 'IE',
          note: 'Hiberno-English · Dublin and the west',
          line: 'Ah sure look it, you’re grand.',
          desc: 'The T between vowels goes soft and slushy rather than tapping like an American one — "water" ends up somewhere near "wah-ter" with a hiss on it. TH becomes a hard T and D, so "thirty-three" is "tirty-tree". The melody rises where English falls, which is why it always sounds cheerful even when it is not.' },
        { id: 'german', n: 11, name: 'German', ar: 'DE',
          note: 'High German · Hochdeutsch',
          line: 'Ve have vays of making you talk.',
          desc: 'Final devoicing again, harder than Russian: "have" ends in an F. W becomes V because German W already is a V, and the TH is not in the language at all, so it lands on S or Z. Every consonant is fully pronounced, which is what makes it sound so precise and so impatient.' },
        { id: 'nigerian', n: 12, name: 'Nigerian', ar: 'NG',
          note: 'West Africa · Yoruba and Igbo substrate',
          line: 'My friend, are you serious?',
          desc: 'Syllable-timed and musical, with the pitch doing grammatical work the way it does in a tone language. Consonant clusters get broken open, the vowels stay pure and unreduced, and there is no schwa — every syllable gets its full value, which is why it lands with such weight.' },
        { id: 'italian', n: 13, name: 'Italian', ar: 'IT',
          note: 'Standard Italian · Tuscan base',
          line: 'Mamma mia, what are you doing?',
          desc: 'Italian words almost all end in a vowel, so English consonant endings grow one: "dog" becomes "dogga". The vowels are five, pure, and never glide. The H is silent, the R is tapped, and doubled consonants are actually held twice as long, which English speakers never do.' },
        { id: 'french', n: 14, name: 'French', ar: 'FR',
          note: 'Metropolitan French · Parisian',
          line: 'Ah, but of course.',
          desc: 'The R is uvular, made at the back of the throat, and it is the single hardest sound on this page to fake without overdoing it. No H at all, so "house" becomes "ouse". And the stress goes on the last syllable of a phrase rather than inside the word, which is what makes an English sentence sound like a question.' },
      ] },

    { id: 'g9', label: '9th grade', note: '2020–21 · one for range, one for home',
      items: [
        { id: 'hillbilly', n: 15, name: 'Southern Redneck', ar: 'AP',
          note: 'Appalachian · rural South',
          line: 'Hold my sweet tea.',
          desc: 'Everything the Southern accent does, further. The vowel breaks into two where the standard one has one, so "bed" gets a whole extra syllable, and the R comes back in hard. Appalachian English keeps grammar older than the country — "might could", "a-fixin’ to" — which is not error, it is preservation.' },
        { id: 'arab', n: 16, name: 'Arab', ar: 'AR',
          note: 'Egyptian and Levantine · my own',
          line: 'Wallahi, habibi, I swear to you.',
          desc: 'The one on this page I do not have to build from the outside. Arabic has sounds English does not — the pharyngeal ʿayn and ḥāʾ, made low in the throat — plus emphatic consonants that pull every vowel around them backwards. English has no short vowel system to match, so the three Arabic vowels flatten it out. My family’s language, so this one is closer to a translation than an impression.' },
      ] },

    { id: 'g11', label: '11th grade', note: '2022–23 · East Asia',
      items: [
        { id: 'chinese', n: 17, name: 'Chinese', ar: 'CN',
          note: 'Mandarin substrate',
          line: 'You want this one or that one?',
          desc: 'Mandarin allows almost no consonant clusters and very few final consonants, so English ones get simplified or grow a vowel behind them. L and N trade places, the TH has nowhere to go, and because Mandarin is tonal the pitch moves per syllable rather than across the sentence.' },
        { id: 'japanese', n: 18, name: 'Japanese', ar: 'JP',
          note: 'Mora-timed · Tokyo standard',
          line: 'That is very difficult, I think.',
          desc: 'Japanese is mora-timed: every unit gets exactly the same length, which is why English words come out evenly spaced and consonant clusters grow vowels between them. There is one liquid sound sitting between L and R rather than two, and the pitch accent is on the word, not the syllable.' },
      ] },

    { id: 'g12', label: '12th grade', note: '2023–24 · the most recent one',
      items: [
        { id: 'aave', n: 19, name: 'Black American', ar: 'BL',
          note: 'African American Vernacular English',
          line: 'He be working late.',
          desc: 'A full dialect with its own grammar, not an accent laid over English, and the tense system is genuinely richer than the standard one: habitual "be" marks something that happens repeatedly, which standard English cannot say in one word. Final consonant clusters reduce, the R is often vocalised, and the intonation range is wider. The most recent one I picked up and the one I am most careful with.' },
      ] },

  ],

  /* Impersonations are a different job from accents. An accent is a system you
     can apply to any sentence; an impersonation is one specific person's voice,
     which means pitch, pace and damage as much as vowels. Four I actually do. */
  impressions: [
    { id: 'patrick-star', name: 'Patrick Star', ar: 'PS',
      from: 'SpongeBob SquarePants · Bill Fagerbakke',
      line: 'Is mayonnaise an instrument?',
      desc: 'Pitched down, slowed right out, and produced almost entirely through the nose with the jaw slack. The comedy is in the delay: every line arrives about a beat after it should, as if the sentence started before the thought did.' },
    { id: 'obi-wan', name: 'Obi-Wan Kenobi', ar: 'OW',
      from: 'The Phantom Menace · Ewan McGregor',
      line: 'I have a bad feeling about this.',
      desc: 'The specific one: Episode I, where McGregor is not doing his own voice but doing Alec Guinness doing Obi-Wan. Clipped RP, pitched slightly higher than McGregor speaks, with the vowels tightened and the pace kept very even. It is an impression of an impression, which is why it is the fun one.' },
    { id: 'davy-jones', name: 'Davy Jones', ar: 'DJ',
      from: 'Dead Man’s Chest · Bill Nighy',
      line: 'Do you fear death?',
      desc: 'Scottish, wet, and delivered from the back of the throat with everything pushed low. Nighy plays him almost gently, which is what makes it frightening — the threat is never in the volume, it is in how unhurried the man is about it.' },
    { id: 'jack-sparrow', name: 'Jack Sparrow', ar: 'JS',
      from: 'Pirates of the Caribbean · Johnny Depp',
      line: 'But you have heard of me.',
      desc: 'Keith Richards with the drunk turned up: a slurred, rolling estuary English where the sentence keeps changing direction halfway through. The hands do half of it. The trick is that the pitch rises at the end of a statement, so every certainty sounds like a question he has not finished asking.' },
  ],
};
