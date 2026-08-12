/* fan-arab.js: content for /franchises/arab/. Rendered by fanpage.js.

   The second of the Big Three. The two interactive blocks — the alphabet and
   the root explorer — are hand-written into the page and built by
   fan-arab-ui.js; everything here is the reading around them.

   Sections marked mount:'end' land under those blocks. */
window.FAN_PAGE = {
  when: { at: 'My first language at home', note: 'Not something I studied. It is what is spoken in my house, which means I learned to hear it long before I could read a word of it — and reading it is genuinely the harder half.' },
  sections: [

  { id: 'why', kind: 'cards', title: 'What Makes It Different', note: 'the four things that surprise everyone',
    lede: 'Arabic is not English written backwards. It is put together on a completely different principle, and these are the four bits that take the longest to stop being strange.',
    items: [
      { title: 'It is built from roots', sub: 'Three consonants', tag: 'Morphology', accent: '#e8c56a',
        desc: 'Almost every word is three consonants poured into a fixed pattern. Change the pattern and you change the word from a verb to a place to a person to an abstract noun, without ever changing the root. English has nothing like it; the nearest thing is sing / sang / sung, extended to the entire dictionary.',
        meta: 'k–t–b → book, writer, office, library' },
      { title: 'Every letter has four shapes', sub: 'And six have only two', tag: 'Script', accent: '#e8c56a',
        desc: 'A letter looks different depending on whether it starts a word, sits inside one, ends one, or stands alone — and it is the font that resolves that, not the writer. Six letters refuse to join to whatever follows them, which is why a single Arabic word can visibly break into pieces mid-word.',
        meta: '28 letters, 100-odd shapes' },
      { title: 'The vowels are optional', sub: 'And usually absent', tag: 'Reading', accent: '#5fa3ec',
        desc: 'Short vowels are marks above and below the line and almost every printed text leaves them out. You are expected to know which word it is from the root and the context. The Qurʾān is the great exception: it is fully marked, because there the pronunciation is the point.',
        meta: 'kataba, kutiba, kutub — same three letters' },
      { title: 'It never really split', sub: 'Fuṣḥā and the dialects', tag: 'Diglossia', accent: '#3fd589',
        desc: 'One formal register, understood from Morocco to Oman and effectively unchanged for fourteen centuries, sitting on top of spoken dialects that differ enough that an Egyptian and a Moroccan will switch to it to be sure. Everyone is bilingual in their own language.',
        meta: 'Modern Standard + your own' },
    ] },

  { id: 'numerals', kind: 'tiles', mount: 'end', title: 'The Numerals', note: 'the ones the whole world uses', compact: true,
    lede: 'The digits on this page came to Europe from India through Arabic, which is why English calls them Arabic numerals and Arabic calls them Indian ones. Both are right, and everyone got them from somebody else. Arabic writes right to left but writes numbers left to right, exactly as here — the one thing on the page that does not flip.',
    items: [
      { title: '٠', sub: 'ṣifr', desc: 'zero — and the word English turned into both "cipher" and "zero"', accent: '#e8c56a' },
      { title: '١', sub: 'wāḥid', desc: 'one', accent: '#e8c56a' },
      { title: '٢', sub: 'ithnān', desc: 'two', accent: '#e8c56a' },
      { title: '٣', sub: 'thalāthah', desc: 'three', accent: '#e8c56a' },
      { title: '٤', sub: 'arbaʿah', desc: 'four', accent: '#e8c56a' },
      { title: '٥', sub: 'khamsah', desc: 'five', accent: '#e8c56a' },
      { title: '٦', sub: 'sittah', desc: 'six', accent: '#e8c56a' },
      { title: '٧', sub: 'sabʿah', desc: 'seven', accent: '#e8c56a' },
      { title: '٨', sub: 'thamāniyah', desc: 'eight', accent: '#e8c56a' },
      { title: '٩', sub: 'tisʿah', desc: 'nine', accent: '#e8c56a' },
    ] },

  { id: 'loanwords', kind: 'tiles', mount: 'end', title: 'Words You Already Say', note: 'English, via Arabic', compact: true, cols: 3,
    lede: 'A few hundred everyday English words came out of Arabic, most of them through Spain and Sicily between the tenth and thirteenth centuries, and most of them in the fields the Arabic-speaking world was leading in at the time: mathematics, astronomy, chemistry, navigation and trade. The al- on the front of several of them is just the definite article, carried across whole because nobody realised it was a separate word.',
    items: [
      { title: 'Algebra', sub: 'al-jabr · الجبر', desc: 'The restoring. From the title of al-Khwārizmī’s book, which is where the subject starts.', accent: '#e8c56a' },
      { title: 'Algorithm', sub: 'al-Khwārizmī · الخوارزمي', desc: 'Not a word at all — it is his name, Latinised. Every algorithm is named after one man.', accent: '#e8c56a' },
      { title: 'Alcohol', sub: 'al-kuḥl · الكحل', desc: 'The powdered kohl, then any distilled essence, then specifically the one in wine.', accent: '#5fa3ec' },
      { title: 'Chemistry', sub: 'al-kīmiyāʾ · الكيمياء', desc: 'Through alchemy, which was the same word before the discipline split in two.', accent: '#5fa3ec' },
      { title: 'Sugar', sub: 'sukkar · سكر', desc: 'Sanskrit into Arabic into Italian into English, following the crop itself.', accent: '#3fd589' },
      { title: 'Coffee', sub: 'qahwah · قهوة', desc: 'Through Turkish kahve. The drink and the word both travelled from Yemen.', accent: '#3fd589' },
      { title: 'Cotton', sub: 'quṭn · قطن', desc: 'Straight across, barely changed, via Spanish.', accent: '#3fd589' },
      { title: 'Admiral', sub: 'amīr al-baḥr · أمير البحر', desc: 'Commander of the sea. English kept the first two words and dropped the sea.', accent: '#5fa3ec' },
      { title: 'Magazine', sub: 'makhzan · مخزن', desc: 'A storehouse — which is why a rifle and a periodical share a word.', accent: '#5fa3ec' },
      { title: 'Safari', sub: 'safar · سفر', desc: 'A journey. Into Swahili first, then into English from East Africa.', accent: '#3fd589' },
      { title: 'Giraffe', sub: 'zarāfah · زرافة', desc: 'Via Italian giraffa, and it has meant exactly the same animal the whole way.', accent: '#3fd589' },
      { title: 'Zenith & nadir', sub: 'samt · naẓīr', desc: 'Both from astronomy: the point overhead and the point opposite it.', accent: '#a05fd0' },
      { title: 'Sofa', sub: 'ṣuffah · صفة', desc: 'A raised bench along a wall, which is what one originally was.', accent: '#e0642a' },
      { title: 'Lemon & orange', sub: 'laymūn · nāranj', desc: 'The fruit and the word arrived together, both of them going west.', accent: '#e0642a' },
      { title: 'Checkmate', sub: 'shāh māt · مات', desc: 'Persian shāh with the Arabic for "died". The king is dead, not merely trapped.', accent: '#a05fd0' },
    ] },

  { id: 'scripts', kind: 'cards', mount: 'end', title: 'The Hands', note: 'one alphabet, six ways of writing it',
    lede: 'Arabic calligraphy is not decoration applied to writing — the scripts are separate, formally taught systems with their own proportions, and a trained eye reads which hand a page is in before reading what it says.',
    items: [
      { title: 'Kūfī', sub: 'كوفي · 7th century', tag: 'Angular', accent: '#e8c56a',
        desc: 'The oldest, squared off and architectural, made for carving and for the earliest copies of the Qurʾān. It is what you see running around the top of a mosque wall.',
        meta: 'Kufa, Iraq' },
      { title: 'Naskh', sub: 'نسخ · 10th century', tag: 'The reading hand', accent: '#3fd589',
        desc: 'Small, round and extremely legible, which is why it became the copying hand and then the printing one. Almost every muṣḥaf and almost every Arabic book you have seen is set in it.',
        meta: 'Ibn Muqlah’s proportional system' },
      { title: 'Thuluth', sub: 'ثلث', tag: 'The display hand', accent: '#e8c56a',
        desc: 'Tall, sweeping and difficult, used for titles and inscriptions rather than body text. The one on the Kaʿbah’s kiswah.',
        meta: 'A third — the ratio it is named for' },
      { title: 'Dīwānī', sub: 'ديواني · Ottoman', tag: 'The chancery hand', accent: '#5fa3ec',
        desc: 'Dense, cursive and deliberately hard to forge or interpolate, because it was developed for imperial decrees where an added word mattered.',
        meta: 'Ottoman court' },
      { title: 'Ruqʿah', sub: 'رقعة', tag: 'Handwriting', accent: '#8f98a8',
        desc: 'The plain, quick, everyday hand. This is what an Arab actually writes a shopping list in, and it is taught in school as the default.',
        meta: 'What people really write' },
      { title: 'Maghribī', sub: 'مغربي · North Africa', tag: 'The western hand', accent: '#e0642a',
        desc: 'The one that developed west of Egypt, with deep bowl-shaped descenders and its own dot conventions — fāʾ and qāf are pointed differently from the east entirely.',
        meta: 'Morocco, al-Andalus' },
    ] },

  { id: 'dialects', kind: 'tiles', mount: 'end', title: 'The Dialects', note: 'and which one is mine',
    lede: 'Fuṣḥā is what is written and broadcast. Nobody grows up speaking it. What people actually speak splits roughly five ways, and how well any two of them understand each other has more to do with television than with geography.',
    items: [
      { title: 'Egyptian', accent: '#e8a13f', sub: 'مصري', desc: 'Mine. The one everybody else understands without trying, because Egypt made the films and the music for a century. The jīm is a hard g, which no other dialect does.' },
      { title: 'Levantine', accent: '#3fd589', sub: 'شامي', desc: 'Syria, Lebanon, Palestine, Jordan. Soft, musical, and the second most widely understood, for the same reason: television.' },
      { title: 'Gulf', accent: '#5fa3ec', sub: 'خليجي', desc: 'The peninsula. Closest to the classical language in a lot of its vocabulary, and the qāf often stays a hard g.' },
      { title: 'Maghrebi', accent: '#e0642a', sub: 'دارجة', desc: 'Morocco, Algeria, Tunisia. Short vowels drop out wholesale and there is heavy Amazigh and French vocabulary, which is why the east struggles with it.' },
      { title: 'Iraqi', accent: '#a05fd0', sub: 'عراقي', desc: 'Mesopotamian, with its own vocabulary from Persian, Turkish and Aramaic layered over the top.' },
      { title: 'Fuṣḥā', accent: '#e8c56a', sub: 'فصحى', desc: 'The formal register nobody speaks at home and everybody can read. The reason a fourteen-hundred-year-old text is still directly legible.' },
    ] },

  { id: 'links', kind: 'links', mount: 'end', title: 'Links', note: 'where to actually start',
    items: [
      { title: 'Madinah Arabic Reader', href: 'https://www.lqtoronto.com/books.html',
        desc: 'The three-book course most people learn classical Arabic from, and it is free.' },
      { title: 'Lane’s Lexicon', href: 'https://lexicon.quranic-research.net/',
        desc: 'The great nineteenth-century Arabic–English dictionary, arranged by root rather than by spelling, which is the correct way round.' },
      { title: 'Almaany', href: 'https://www.almaany.com/',
        desc: 'The dictionary I actually use day to day.' },
      { title: 'Quran.com', href: 'https://quran.com/',
        desc: 'Fully vowelled Arabic with word-by-word grammar under it — the best free reading practice there is.' },
    ] },

] };
