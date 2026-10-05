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

  var esc = window.AEesc;

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

  /* `peak` 1, 2 or 3: Peak, Peak Peak, Peak Peak Peak, in those words; each
     level is a step brighter than the one under it (music.css) */
  var PEAK = ['', 'Peak', 'Peak Peak', 'Peak Peak Peak'];
  function pill(level) {
    var n = level === true ? 1 : +level || 0;
    return n ? ' <span class="mu-peak mu-peak--' + n + '">' + PEAK[n] + '</span>' : '';
  }

  /* One row. The rank is its own column and the title block is the rest, so
     a long title wraps under itself rather than under the number. */
  function row(s, i) {
    // `r`: the chart rank, where a year has been cut down; an `extra` was never
    // on the chart, so it has no number. `peak` is my one favourite of the year.
    var n = s.extra ? 0 : (s.r || (s.i != null ? s.i : i) + 1);   // `i`: its place in its own year, in the grouped views
    return '<li class="mu-row' + (n === 1 ? ' is-top' : '') + (s.peak ? ' is-peak is-peak-' + (+s.peak || 1) : '')
      + (s.extra ? ' is-extra' : '') + '"' + (s.era ? ' data-era="' + esc(s.era) + '"' : '') + '>'
      + '<span class="mu-rank" aria-hidden="true">' + (!n ? '+' : n < 10 ? '0' + n : n) + '</span>'
      + '<span class="mu-song">'
      +   '<b class="mu-title">' + esc(s.t) + pill(s.peak) + '</b>'
      +   '<i class="mu-artist">' + esc(s.a) + (s.yr ? ' &#183; ' + esc(s.yr) : '') + '</i>'
      +   (s.note ? '<i class="mu-note">' + esc(s.note) + '</i>' : '')
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

  /* The tally is counted off the lists every load, never typed, so it keeps
     up while the years are still being cut down: artists by lead credit (the
     same rule as Group By artist), Peaks at any level, and how many years are
     already down to the songs I keep. A year counts as picked once it has a
     Peak in it: length cannot say, because a year that only lost a repeat to
     the year before is short without having been picked over. */
  var leads = {}, peaks = 0, top3 = 0, cut = 0;
  years.forEach(function (y) {
    var list = page.years[y] || [];
    if (list.some(function (s) { return s.peak; })) cut++;
    list.forEach(function (s) {
      var k = lead(s.a); leads[k] = (leads[k] || 0) + 1;
      var lv = s.peak === true ? 1 : +s.peak || 0;
      if (lv) peaks++;
      if (lv === 3) top3++;
    });
  });
  var most = Object.keys(leads).sort(function (a, b) { return leads[b] - leads[a] || a.localeCompare(b); })[0];
  var stat = function (n, label) { return '<span><b>' + n + '</b><i>' + label + '</i></span>'; };

  var tally = '<div class="mu-tally reveal">'
    + stat(years.length, 'years')
    + stat(total, 'songs')
    + stat(Object.keys(leads).length, 'artists')
    + stat(peaks, 'Peaks')
    + stat(top3, 'Peak Peak Peak')
    + (most ? stat(esc(most), 'most songs &#183; ' + leads[most]) : '')
    + stat(cut + ' of ' + years.length, 'years cut to my picks')
    + '</div>';

  /* ── sort and group ──
     The year blocks stay in the page whatever is chosen (the anchors have to
     keep working); Order just moves them, and a Group other than By year is
     drawn into .mu-alt while the years are hidden. The era chips filter
     whichever view is showing. */
  function views() {
    var sel = function (id, label, opts) {
      return '<label class="mu-view-l" for="' + id + '">' + label + '</label>'
        + '<select id="' + id + '" class="mu-view-s">'
        + opts.map(function (o) { return '<option value="' + o[0] + '">' + o[1] + '</option>'; }).join('')
        + '</select>';
    };
    return '<div class="mu-view reveal">'
      + sel('muOrder', 'Order', [['new', 'Newest first'], ['old', 'Oldest first']])
      + sel('muGroup', 'Group', [['year', 'By year'], ['peak', 'By Peak'], ['artist', 'By artist']])
      + sel('muPeak', 'Show', [['', 'Every song'], ['any', 'All Peaks'], ['3', 'Peak Peak Peak'], ['2', 'Peak Peak'], ['1', 'Peak']])
      + '</div>';
  }

  /* every kept song, flat, with its year on it */
  var flat = [];
  years.forEach(function (y) {
    (page.years[y] || []).forEach(function (s, i) {
      var o = {}, k; for (k in s) o[k] = s[k];
      o.yr = y; o.era = eraOf(y); o.i = i;
      flat.push(o);
    });
  });

  /* the lead artist: what comes before "featuring", "and", "&" or a comma */
  function lead(a) { return String(a).split(/\s+(?:featuring|feat\.|and|&|x)\s+|,\s*/i)[0].trim(); }

  function altBlock(title, sub, list) {
    return '<section class="mu-year mu-group reveal">'
      + '<h3 class="mu-head"><span class="mu-y">' + esc(title) + '</span>'
      + (sub ? '<span class="mu-grade">' + esc(sub) + '</span>' : '')
      + '<span class="mu-n">' + list.length + (list.length === 1 ? ' song' : ' songs') + '</span></h3>'
      + '<ol class="mu-list">' + list.map(row).join('') + '</ol></section>';
  }

  function drawAlt(group, order) {
    var byYear = function (a, b) {
      return (order === 'old' ? a.yr - b.yr : b.yr - a.yr) || a.i - b.i;
    };
    if (group === 'peak') {
      return [3, 2, 1, 0].map(function (lv) {
        var list = flat.filter(function (s) { return (+s.peak || (s.peak === true ? 1 : 0)) === lv; }).sort(byYear);
        return list.length ? altBlock(lv ? PEAK[lv] : 'Everything else', lv ? '' : 'kept, no Peak', list) : '';
      }).join('');
    }
    var groups = {};
    flat.forEach(function (s) { var k = lead(s.a); (groups[k] = groups[k] || []).push(s); });
    return Object.keys(groups).sort(function (a, b) {
      return groups[b].length - groups[a].length || a.localeCompare(b);
    }).map(function (k) { return altBlock(k, '', groups[k].sort(byYear)); }).join('');
  }

  /* ── the worlds' themes ── one main theme for every world, generated from
     the worlds pages by tools/themes.js into music-themes.js */
  function themes() {
    var T = window.MUSIC_THEMES || [];
    if (!T.length) return '';
    return '<section class="mu-year mu-themes reveal" id="themes">'
      + '<h3 class="mu-head"><span class="mu-y">Themes</span>'
      + '<span class="mu-grade">the main theme of every world</span>'
      + '<span class="mu-n">' + T.length + ' worlds</span></h3>'
      + '<ol class="mu-list">' + T.map(function (x) {
          var s = { t: x.t, a: x.w, v: x.v };
          return '<li class="mu-row mu-theme">'
            + '<span class="mu-rank" aria-hidden="true">&#9834;</span>'
            + '<span class="mu-song"><b class="mu-title">' + esc(x.t) + '</b>'
            + '<i class="mu-artist"><a href="' + esc(x.href) + '">' + esc(x.w) + '</a>'
            + (x.a ? ' &#183; ' + esc(x.a) : '') + '</i></span>'
            + control(s) + '</li>';
        }).join('') + '</ol></section>';
  }

  root.innerHTML = tally + chips() + views() + jump()
    + '<div class="mu-years">' + years.map(yearBlock).join('') + '</div>'
    + '<div class="mu-years mu-alt" hidden></div>'
    + '<div class="mu-years">' + themes() + '</div>';

  var yearsEl = root.querySelector('.mu-years');
  var altEl = root.querySelector('.mu-alt');
  var jumpEl = root.querySelector('.mu-jump');
  var orderEl = document.getElementById('muOrder');
  var groupEl = document.getElementById('muGroup');
  function applyView() {
    var order = orderEl.value, group = groupEl.value;
    var secs = [].slice.call(yearsEl.querySelectorAll(':scope > .mu-year'));
    secs.sort(function (a, b) {
      var d = +a.getAttribute('data-year') - +b.getAttribute('data-year');
      return order === 'old' ? d : -d;
    }).forEach(function (sec) { yearsEl.appendChild(sec); });
    var links = [].slice.call(jumpEl.querySelectorAll('a'));
    if (order === 'old') links.reverse();
    links.sort(function (a, b) {
      var d = +a.getAttribute('data-jump') - +b.getAttribute('data-jump');
      return order === 'old' ? d : -d;
    }).forEach(function (l) { jumpEl.appendChild(l); });
    var alt = group !== 'year';
    yearsEl.hidden = alt;
    jumpEl.hidden = alt;
    altEl.hidden = !alt;
    altEl.innerHTML = alt ? drawAlt(group, order) : '';
    if (alt && typeof window.AEreveal === 'function') window.AEreveal(altEl);
    applyPeak();
  }
  orderEl.addEventListener('change', applyView);
  groupEl.addEventListener('change', applyView);

  /* ── the Peak filter ──
     Show narrows every view to one Peak level (an exact level, not "at least",
     so Peak shows only the single Peaks) or to all of them. Rows are hidden by
     music.css off data-peak; this pass hides a block left with nothing in it
     and recounts its header, so a year reads "3 of 20" rather than "20 songs"
     over three rows. The themes have no Peaks, so they drop out too. */
  var peakEl = document.getElementById('muPeak');
  function applyPeak() {
    var v = peakEl.value;
    root.setAttribute('data-peak', v);
    var sel = v === 'any' ? '.is-peak' : v ? '.is-peak-' + v : '';
    [].slice.call(root.querySelectorAll('.mu-year')).forEach(function (sec) {
      var n = sec.querySelector('.mu-n');
      if (n && !n.hasAttribute('data-all')) n.setAttribute('data-all', n.textContent);
      var all = sec.querySelectorAll('.mu-list > .mu-row').length;
      var hit = sel ? sec.querySelectorAll('.mu-list > .mu-row' + sel).length : all;
      sec.classList.toggle('is-unpeaked', !hit);
      if (n) n.textContent = sel ? hit + ' of ' + all : n.getAttribute('data-all');
    });
    /* the jump strip only offers years that still have something showing */
    [].slice.call(jumpEl.querySelectorAll('a')).forEach(function (a) {
      var sec = document.getElementById('y' + a.getAttribute('data-jump'));
      a.classList.toggle('is-unpeaked', !!sec && sec.classList.contains('is-unpeaked'));
    });
  }
  peakEl.addEventListener('change', applyPeak);

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
  applyPeak();
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
