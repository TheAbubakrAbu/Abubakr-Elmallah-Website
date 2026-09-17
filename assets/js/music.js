/* music.js: renders /music/ from MUSIC_PAGE (see music-data.js).

   One block per year, newest first, each holding that year's top twenty as a
   numbered chart. The whole page is one long list, so the work here is making
   twenty-one of those legible rather than making any one of them clever:
   a sticky year header, a rank column that stays a fixed width so the titles
   line up down the whole column, and a filter that hides years rather than
   re-rendering them.

   WHY THE FILTER HIDES RATHER THAN REBUILDS. Same reason as travels.js: the
   anchors (#y2014) have to keep working, and a rebuild would either drop them
   or renumber them. Every year section is always in the DOM and the chips
   toggle a class on the root.

   Loads AFTER music-data.js and BEFORE reveal.js. */
(function music() {
  var root = document.getElementById('muRoot');
  var page = window.MUSIC_PAGE;
  if (!root || !page || !page.years) return;

  var esc = function (s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  };

  /* Years arrive keyed by year. Sort numerically, newest first: the most
     recent list is the one worth opening on, and the older ones are the
     archive underneath it. */
  var years = Object.keys(page.years).sort(function (a, b) { return Number(b) - Number(a); });

  var GRADES = page.grades || {};
  var ERAS = page.eras || [];

  /* which era a year belongs to, for the chip filter */
  function eraOf(y) {
    for (var i = 0; i < ERAS.length; i++) {
      var e = ERAS[i];
      if (Number(y) >= e.from && Number(y) <= e.to) return e.k;
    }
    return '';
  }

  /* ── THE PLAY BUTTON ──
     Two kinds, and which one a song gets depends on whether it has a verified
     video id in the data.

     WITH AN ID it is a real Play button: ytplay.js (the same player the fan
     pages use) builds a YouTube embed under the row, with a transport and a
     scrubber, and tears it down when you stop.

     THESE ARE LYRIC VIDEOS, not the official music videos, and that is on
     purpose. A label's own upload is the single most likely thing on YouTube
     to refuse playback inside somebody else's page (error 101/150), and when
     it refuses there is nothing the page can do about it: that is what a Play
     button that "doesn't really work" actually is. The channels that publish
     lyric videos exist to be embedded, so they play. Every id was confirmed
     live through YouTube's oEmbed endpoint, and the title has to match the
     song with the artist named on it; covers, karaoke, live takes, remixes,
     loops and sped-up edits are all rejected outright.

     When one refuses anyway, the player says so and offers a link to YouTube
     rather than leaving a dead black rectangle. See refuse() in ytplay.js.

     WITHOUT ONE it stays a link to a YouTube Music search built from the title
     and artist. A song whose official upload could not be identified with
     confidence gets the honest version rather than a guess, and the search
     always lands somewhere sensible because it is derived from the row itself.

     The two look different on purpose: a filled button plays here, an outlined
     one leaves the page. */
  function searchHref(s) {
    /* encodeURIComponent leaves the apostrophe alone, which is legal in a URL
       and safe inside a double-quoted attribute, but forty of these titles have
       one in them ("Choosin' Texas", "That's So True", "I'm the Problem") and a
       raw quote in an href is the kind of thing that only becomes a bug once
       somebody changes how the attribute is written. Encode it here instead. */
    return 'https://music.youtube.com/search?q='
      + encodeURIComponent(s.t + ' ' + s.a).replace(/'/g, '%27');
  }

  var ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';

  function control(s) {
    var label = s.t + ' by ' + s.a;
    if (s.v) {
      return '<button class="mu-play mu-play--yt" type="button"'
        +   ' data-yt="' + esc(s.v) + '" data-t="' + esc(label) + '"'
        +   ' aria-pressed="false" aria-label="Play ' + esc(label) + '"'
        +   ' title="Play it here">' + ICON + '</button>';
    }
    return '<a class="mu-play" href="' + esc(searchHref(s)) + '"'
      +   ' target="_blank" rel="noopener"'
      +   ' aria-label="Find ' + esc(label) + ' on YouTube Music"'
      +   ' title="Find it on YouTube Music">' + ICON + '</a>';
  }

  /* One row. The rank is its own column and the title block is the rest, so
     a long title wraps under itself rather than under the number. */
  function row(s, i) {
    var n = i + 1;
    return '<li class="mu-row' + (n === 1 ? ' is-top' : '') + '">'
      + '<span class="mu-rank" aria-hidden="true">' + (n < 10 ? '0' + n : n) + '</span>'
      + '<span class="mu-song">'
      +   '<b class="mu-title">' + esc(s.t) + '</b>'
      +   '<i class="mu-artist">' + esc(s.a) + '</i>'
      + '</span>'
      + control(s)
      + '</li>';
  }

  function yearBlock(y) {
    var list = page.years[y] || [];
    var g = GRADES[y];
    var era = eraOf(y);
    var note = page.notes && page.notes[y];

    return '<section class="mu-year reveal" id="y' + esc(y) + '" data-year="' + esc(y) + '"'
      + ' data-era="' + esc(era) + '">'
      + '<h3 class="mu-head">'
      +   '<span class="mu-y">' + esc(y) + '</span>'
      +   (g ? '<span class="mu-grade">' + esc(g) + '</span>' : '')
      +   '<span class="mu-n">' + list.length + ' songs</span>'
      + '</h3>'
      + (note ? '<p class="mu-note">' + esc(note) + '</p>' : '')
      + '<ol class="mu-list">' + list.map(row).join('') + '</ol>'
      + '</section>';
  }

  /* ── the era filter ──
     Chips, not a dropdown: there are four of them and they are all worth
     seeing at once. Radio semantics, because exactly one is ever active. */
  function chips() {
    var all = '<button class="mu-chip is-on" type="button" role="radio" aria-checked="true"'
      + ' data-era="" tabindex="0"><b>Every year</b><i>' + years.length + ' years</i></button>';

    return '<div class="mu-filter reveal" role="radiogroup" aria-label="Filter the years">'
      + all
      + ERAS.map(function (e) {
          var n = years.filter(function (y) { return eraOf(y) === e.k; }).length;
          return '<button class="mu-chip" type="button" role="radio" aria-checked="false"'
            + ' data-era="' + esc(e.k) + '" tabindex="-1">'
            + '<b>' + esc(e.label) + '</b><i>' + esc(e.note) + '</i></button>';
        }).join('')
      + '</div>';
  }

  /* the jump strip: every year as an anchor, so the page is navigable without
     scrolling through four hundred rows to reach 2009 */
  function jump() {
    return '<nav class="mu-jump reveal" aria-label="Jump to a year">'
      + years.map(function (y) {
          return '<a href="#y' + esc(y) + '" data-jump="' + esc(y) + '">' + esc(y) + '</a>';
        }).join('')
      + '</nav>';
  }

  var total = years.reduce(function (n, y) { return n + page.years[y].length; }, 0);

  var tally = '<div class="mu-tally reveal">'
    + '<span><b>' + years.length + '</b><i>years</i></span>'
    + '<span><b>' + total + '</b><i>songs</i></span>'
    + '<span><b>' + years[years.length - 1] + '&#8211;' + years[0] + '</b><i>covered</i></span>'
    + '</div>';

  root.innerHTML = tally + chips() + jump()
    + '<div class="mu-years">' + years.map(yearBlock).join('') + '</div>';

  /* ── wiring ── */
  var rootEl = root.querySelector('.mu-years');
  var chipEls = [].slice.call(root.querySelectorAll('.mu-chip'));

  function setEra(era) {
    root.setAttribute('data-era', era);
    chipEls.forEach(function (c) {
      var on = c.getAttribute('data-era') === era;
      c.classList.toggle('is-on', on);
      c.setAttribute('aria-checked', on ? 'true' : 'false');
      c.setAttribute('tabindex', on ? '0' : '-1');
    });
    /* the jump strip follows the filter: no point offering 2008 while the
       2020s are the only thing on screen */
    [].slice.call(root.querySelectorAll('.mu-jump a')).forEach(function (a) {
      var y = a.getAttribute('data-jump');
      a.hidden = !!era && eraOf(y) !== era;
    });
  }

  chipEls.forEach(function (c, i) {
    c.addEventListener('click', function () { setEra(c.getAttribute('data-era')); });
    c.addEventListener('keydown', function (ev) {
      var k = ev.key;
      if (k !== 'ArrowRight' && k !== 'ArrowLeft' && k !== 'ArrowUp' && k !== 'ArrowDown') return;
      ev.preventDefault();
      var d = (k === 'ArrowRight' || k === 'ArrowDown') ? 1 : -1;
      var next = chipEls[(i + d + chipEls.length) % chipEls.length];
      setEra(next.getAttribute('data-era'));
      next.focus();
    });
  });

  setEra('');
  if (rootEl) rootEl.setAttribute('data-ready', '1');

  /* ── the player ──
     ytplay.js is the same module the fan pages use; it is told where the rows
     are and how to read a song off a button, and it does the rest. Only the
     buttons that carry a data-yt are selected, so a row that fell back to a
     search link is never picked up as a dead Play button.

     `label: null` because these buttons are an icon and have no text to swap
     between Play and Stop; the module already guards for that. */
  if (window.AEyt) {
    window.AEyt.attach(root, {
      btn: '.mu-play--yt',
      holder: '.mu-row',
      label: null,
    });
  }
}());
