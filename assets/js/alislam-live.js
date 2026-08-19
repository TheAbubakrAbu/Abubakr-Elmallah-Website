/* alislam-live.js: the working parts of /al-islam/.

   The page used to end with a list of scholars and a list of prophets. Those
   belong to the religion, not to three pieces of software, so they moved to
   /worlds/islam/ and this took their place: the things the apps on this
   page actually DO, running in the page itself rather than described.

     1. Prayer times: computed here, from the sun, for wherever you are.
     2. Qibla:        the true bearing and the great-circle distance to the
                      Kaʿbah from that same point.
     3. The date:     today in both calendars, and the gap between them.
     4. Tajweed:      a sūrah coloured by rule, which is what the Quran
                      Tajweed Engine does to all 6,236 verses.

   LOAD ORDER MATTERS. Runs AFTER reveal.js, whole body in a try/catch: this
   page's sections start at opacity 0 and are revealed by reveal.js, so a script
   that throws before that runs would leave the page blank.

   THE MATHS. The prayer-time code below is the standard solar-position method
   (Meeus' low-accuracy sun, then the hour angle for each altitude), the same
   one PrayTimes and every mainstream calculator implements. It agrees with the
   printed timetables to within a minute or so; it is not a substitute for one
   where the difference matters. */
(function alIslamLive() {
  try {

    /* ═══════════ trigonometry in degrees ═══════════ */
    var D = Math.PI / 180;
    function dsin(x) { return Math.sin(x * D); }
    function dcos(x) { return Math.cos(x * D); }
    function dtan(x) { return Math.tan(x * D); }
    function darcsin(x) { return Math.asin(x) / D; }
    function darccos(x) { return Math.acos(x) / D; }
    function darctan2(y, x) { return Math.atan2(y, x) / D; }
    function darccot(x) { return Math.atan2(1, x) / D; }
    function fixAngle(a) { return fix(a, 360); }
    function fixHour(a) { return fix(a, 24); }
    function fix(a, n) { a = a - n * Math.floor(a / n); return a < 0 ? a + n : a; }

    /* ═══════════ where the sun is ═══════════ */
    function julian(y, m, d) {
      if (m <= 2) { y -= 1; m += 12; }
      var A = Math.floor(y / 100);
      var B = 2 - A + Math.floor(A / 4);
      return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d + B - 1524.5;
    }

    /* Meeus, chapter 25, in its low-accuracy form: good to about a hundredth of
       a degree, which is a couple of seconds of prayer time. */
    function sunPosition(jd) {
      var Dd = jd - 2451545.0;
      var g = fixAngle(357.529 + 0.98560028 * Dd);          // mean anomaly
      var q = fixAngle(280.459 + 0.98564736 * Dd);          // mean longitude
      var L = fixAngle(q + 1.915 * dsin(g) + 0.020 * dsin(2 * g)); // ecliptic longitude
      var e = 23.439 - 0.00000036 * Dd;                     // obliquity
      var RA = fixHour(darctan2(dcos(e) * dsin(L), dcos(L)) / 15);
      return { decl: darcsin(dsin(e) * dsin(L)), eqt: q / 15 - RA };
    }

    /* ═══════════ the five times ═══════════
       Every method below differs only in how far the sun has to be below the
       horizon for Fajr and for ʿIshāʾ. Umm al-Qurā is the odd one out: ʿIshāʾ
       is a fixed ninety minutes after Maghrib rather than an angle at all. */
    var METHODS = [
      { id: 'isna',  name: 'ISNA',        note: 'North America', fajr: 15,   isha: 15 },
      { id: 'mwl',   name: 'Muslim World League', note: 'Europe, Far East', fajr: 18, isha: 17 },
      { id: 'egypt', name: 'Egyptian',    note: 'Egyptian General Authority', fajr: 19.5, isha: 17.5 },
      { id: 'makkah', name: 'Umm al-Qurā', note: 'Makkah', fajr: 18.5, isha: null, ishaMin: 90 },
      { id: 'karachi', name: 'Karachi',   note: 'University of Islamic Sciences', fajr: 18, isha: 18 },
    ];

    var ASR = [
      { id: 'standard', name: 'Standard', note: 'Shāfiʿī, Mālikī, Ḥanbalī', factor: 1 },
      { id: 'hanafi',   name: 'Ḥanafī',   note: 'shadow twice the object', factor: 2 },
    ];

    var PRAYERS = [
      { k: 'fajr',    name: 'Fajr',    ar: 'الفجر' },
      { k: 'sunrise', name: 'Sunrise', ar: 'الشروق', minor: true },
      { k: 'dhuhr',   name: 'Ẓuhr',    ar: 'الظهر' },
      { k: 'asr',     name: 'ʿAṣr',    ar: 'العصر' },
      { k: 'maghrib', name: 'Maghrib', ar: 'المغرب' },
      { k: 'isha',    name: 'ʿIshāʾ',  ar: 'العشاء' },
    ];

    /* All times come out as decimal hours in the location's own zone. */
    function prayerTimes(date, lat, lng, tz, method, asrFactor) {
      var jd = julian(date.getFullYear(), date.getMonth() + 1, date.getDate()) - lng / (15 * 24);

      function noon(t) { return fixHour(12 - sunPosition(jd + t).eqt); }

      // hour angle for the sun at a given altitude, either side of noon
      function angleTime(angle, t, before) {
        var decl = sunPosition(jd + t).decl;
        var cosH = (-dsin(angle) - dsin(decl) * dsin(lat)) / (dcos(decl) * dcos(lat));
        // above the arctic circle the sun may never reach that altitude at all
        if (cosH > 1 || cosH < -1) return NaN;
        var v = darccos(cosH) / 15;
        return noon(t) + (before ? -v : v);
      }

      function asrTime(factor, t) {
        var decl = sunPosition(jd + t).decl;
        return angleTime(-darccot(factor + dtan(Math.abs(lat - decl))), t, false);
      }

      /* One refinement pass: each time is first estimated at its nominal hour,
         then recomputed at that estimate, which is enough to converge. */
      var t = {
        fajr:    angleTime(method.fajr, 5 / 24, true),
        sunrise: angleTime(0.833, 6 / 24, true),
        dhuhr:   noon(12 / 24),
        asr:     asrTime(asrFactor, 13 / 24),
        maghrib: angleTime(0.833, 18 / 24, false),
        isha:    method.isha == null ? NaN : angleTime(method.isha, 18 / 24, false),
      };
      t = {
        fajr:    angleTime(method.fajr, t.fajr / 24, true),
        sunrise: angleTime(0.833, t.sunrise / 24, true),
        dhuhr:   noon(t.dhuhr / 24) + 1 / 60,          // a minute past the meridian
        asr:     asrTime(asrFactor, t.asr / 24),
        maghrib: angleTime(0.833, t.maghrib / 24, false),
        isha:    method.isha == null ? NaN : angleTime(method.isha, t.isha / 24, false),
      };

      var shift = tz - lng / 15;
      Object.keys(t).forEach(function (k) { t[k] += shift; });
      // fixed-interval ʿIshāʾ (Umm al-Qurā) hangs off Maghrib, not off an angle
      if (method.isha == null) t.isha = t.maghrib + method.ishaMin / 60;
      return t;
    }

    /* ═══════════ the qiblah ═══════════ */
    var KAABA = { lat: 21.4225, lng: 39.8262 };

    function qiblaBearing(lat, lng) {
      var dL = KAABA.lng - lng;
      return fixAngle(darctan2(dsin(dL), dcos(lat) * dtan(KAABA.lat) - dsin(lat) * dcos(dL)));
    }

    function kaabaDistance(lat, lng) {
      var R = 6371;
      var dLat = (KAABA.lat - lat) * D, dLng = (KAABA.lng - lng) * D;
      var a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
        + dcos(lat) * dcos(KAABA.lat) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
      return Math.round(2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
    }

    /* ═══════════ formatting ═══════════ */
    function hhmm(h) {
      if (isNaN(h)) return '…';
      h = fixHour(h + 0.5 / 60);                            // round to the minute
      var hr = Math.floor(h), mn = Math.floor((h - hr) * 60);
      var ap = hr < 12 ? 'AM' : 'PM';
      var h12 = hr % 12 === 0 ? 12 : hr % 12;
      return h12 + ':' + (mn < 10 ? '0' + mn : mn) + ' ' + ap;
    }

    function countdown(hours) {
      var mins = Math.max(0, Math.round(hours * 60));
      var h = Math.floor(mins / 60), m = mins % 60;
      return h ? h + ' h ' + m + ' min' : m + ' min';
    }

    /* The offset, in hours, of an IANA zone at a given instant. Derived by
       formatting the instant in that zone and reading the wall clock back,
       which is the only way to get it without shipping a tz database. */
    function zoneOffset(date, tz) {
      try {
        var parts = new Intl.DateTimeFormat('en-US', {
          timeZone: tz, hour12: false,
          year: 'numeric', month: '2-digit', day: '2-digit',
          hour: '2-digit', minute: '2-digit', second: '2-digit',
        }).formatToParts(date).reduce(function (a, p) { a[p.type] = p.value; return a; }, {});
        var asUTC = Date.UTC(parts.year, parts.month - 1, parts.day,
          parts.hour % 24, parts.minute, parts.second);
        // to the minute: the formatted wall clock has no milliseconds in it,
        // and real zone offsets are whole minutes anyway
        return Math.round((asUTC - date.getTime()) / 60000) / 60;
      } catch (e) {
        return -date.getTimezoneOffset() / 60;
      }
    }

    // the wall-clock date in a zone, as a Date whose UTC fields are that zone's
    function zoneDate(date, tz) {
      return new Date(date.getTime() + zoneOffset(date, tz) * 3600000);
    }

    /* ═══════════ 1 + 2 + 3: the live panel ═══════════ */
    var root = document.getElementById('islLive');
    if (root) {
      /* Default: Irvine, where I am, with its own zone rather than the
         visitor's; otherwise someone opening this in London gets Irvine's
         latitude on London's clock, which is worse than either. */
      var HOME = { lat: 33.6405, lng: -117.8443, label: 'Irvine, California', tz: 'America/Los_Angeles' };
      var place = HOME;
      var method = METHODS[0];
      var asr = ASR[0];

      root.innerHTML =
        '<div class="isl-live">'

        + '<section class="isl-panel isl-panel--times reveal">'
        +   '<header class="isl-panel-h">'
        +     '<span class="isl-panel-k">Al-Adhan</span>'
        +     '<h4>Prayer times</h4>'
        +     '<p class="isl-place" id="islPlace"></p>'
        +   '</header>'
        +   '<div class="isl-next" id="islNext"></div>'
        +   '<ol class="isl-times" id="islTimes"></ol>'
        +   '<div class="isl-controls">'
        +     '<div class="isl-ctl"><span class="isl-ctl-k">Method</span>'
        +       '<div class="isl-chips" id="islMethod">' + METHODS.map(function (m, i) {
                  return '<button class="chip chip--isl' + (i ? '' : ' is-active') + '" type="button"'
                    + ' data-method="' + m.id + '" title="' + m.note + '">' + m.name + '</button>';
                }).join('') + '</div></div>'
        +     '<div class="isl-ctl"><span class="isl-ctl-k">ʿAṣr</span>'
        +       '<div class="isl-chips" id="islAsr">' + ASR.map(function (a, i) {
                  return '<button class="chip chip--isl' + (i ? '' : ' is-active') + '" type="button"'
                    + ' data-asr="' + a.id + '" title="' + a.note + '">' + a.name + '</button>';
                }).join('') + '</div></div>'
        +   '</div>'
        +   '<button class="isl-geo" id="islGeo" type="button">Use my location</button>'
        +   '<p class="isl-fine">Computed in this page from the sun’s position: no network call, and nothing about your location leaves the browser. Accurate to about a minute; where a minute matters, use your local timetable.</p>'
        + '</section>'

        + '<section class="isl-panel isl-panel--qibla reveal">'
        +   '<header class="isl-panel-h">'
        +     '<span class="isl-panel-k">Al-Islam</span>'
        +     '<h4>Qiblah</h4>'
        +     '<p class="isl-place">The direction of the Kaʿbah, as a great circle</p>'
        +   '</header>'
        +   '<div class="isl-compass" id="islCompass">'
        +     '<svg viewBox="0 0 200 200" role="img" aria-label="Compass showing the direction of the Kaʿbah">'
        +       '<circle class="qb-face" cx="100" cy="100" r="86"/>'
        +       '<circle class="qb-ring" cx="100" cy="100" r="86"/>'
        +       '<circle class="qb-ring qb-ring--in" cx="100" cy="100" r="66"/>'
        +       '<g class="qb-ticks" id="qbTicks"></g>'
        +       '<text class="qb-card" x="100" y="26" text-anchor="middle">N</text>'
        +       '<text class="qb-card" x="176" y="105" text-anchor="middle">E</text>'
        +       '<text class="qb-card" x="100" y="184" text-anchor="middle">S</text>'
        +       '<text class="qb-card" x="24" y="105" text-anchor="middle">W</text>'
        +       '<g class="qb-needle" id="qbNeedle">'
        +         '<path class="qb-arrow" d="M100 22 111 100 100 92 89 100z"/>'
        +         '<rect class="qb-kaaba" x="93" y="12" width="14" height="14" rx="2"/>'
        +       '</g>'
        +       '<circle class="qb-hub" cx="100" cy="100" r="5"/>'
        +     '</svg>'
        +   '</div>'
        +   '<div class="isl-qread">'
        +     '<span><b id="qbDeg">…</b><i>from true north</i></span>'
        +     '<span><b id="qbDist">…</b><i>to Makkah</i></span>'
        +   '</div>'
        + '</section>'

        + '<section class="isl-panel isl-panel--date reveal">'
        +   '<header class="isl-panel-h">'
        +     '<span class="isl-panel-k">Both calendars</span>'
        +     '<h4>Today</h4>'
        +     '<p class="isl-place">The Hijri year is lunar, so it runs about eleven days short</p>'
        +   '</header>'
        +   '<p class="isl-hijri" id="islHijri" lang="ar" dir="rtl">…</p>'
        +   '<p class="isl-hijri-en" id="islHijriEn">…</p>'
        +   '<p class="isl-greg" id="islGreg">…</p>'
        +   '<p class="isl-fine">Umm al-Qurā reckoning, which is the calculated calendar Saudi Arabia keeps. A sighting-based calendar can differ by a day, and often does.</p>'
        + '</section>'

        + '</div>';

      // the tick ring, drawn rather than written out by hand
      var ticks = document.getElementById('qbTicks');
      if (ticks) {
        var d = '';
        for (var a = 0; a < 360; a += 15) {
          var big = a % 45 === 0;
          var r1 = big ? 70 : 76, r2 = 82;
          var rad = (a - 90) * D;
          d += 'M' + (100 + r1 * Math.cos(rad)).toFixed(1) + ' ' + (100 + r1 * Math.sin(rad)).toFixed(1)
            + 'L' + (100 + r2 * Math.cos(rad)).toFixed(1) + ' ' + (100 + r2 * Math.sin(rad)).toFixed(1);
        }
        ticks.innerHTML = '<path d="' + d + '"/>';
      }

      var elPlace = document.getElementById('islPlace');
      var elTimes = document.getElementById('islTimes');
      var elNext = document.getElementById('islNext');

      function render() {
        var now = new Date();
        var tz = zoneOffset(now, place.tz);
        var local = zoneDate(now, place.tz);
        // local's UTC fields ARE the wall clock at `place`
        var wall = new Date(local.getUTCFullYear(), local.getUTCMonth(), local.getUTCDate());
        var hourNow = local.getUTCHours() + local.getUTCMinutes() / 60 + local.getUTCSeconds() / 3600;

        var t = prayerTimes(wall, place.lat, place.lng, tz, method, asr.factor);

        elPlace.innerHTML = place.label + ' <em>' + place.lat.toFixed(3) + '°, '
          + place.lng.toFixed(3) + '°</em>';

        /* Which prayer is next, ignoring sunrise: it is a boundary, not a
           prayer, and counting down to it would be misleading. */
        var due = PRAYERS.filter(function (p) { return !p.minor; })
          .map(function (p) { return { p: p, at: t[p.k] }; })
          .filter(function (x) { return !isNaN(x.at); });
        var next = null;
        for (var i = 0; i < due.length; i++) {
          if (due[i].at > hourNow) { next = { p: due[i].p, in: due[i].at - hourNow }; break; }
        }
        // past ʿIshāʾ, the next one is tomorrow's Fajr
        if (!next && due.length) next = { p: due[0].p, in: 24 - hourNow + due[0].at };

        var current = null;
        for (var j = due.length - 1; j >= 0; j--) {
          if (due[j].at <= hourNow) { current = due[j].p; break; }
        }

        elNext.innerHTML = next
          ? '<span class="isl-next-k">Next</span>'
            + '<b>' + next.p.name + '</b>'
            + '<span class="isl-next-ar" lang="ar" dir="rtl">' + next.p.ar + '</span>'
            + '<span class="isl-next-in">in ' + countdown(next.in) + '</span>'
          : '';

        elTimes.innerHTML = PRAYERS.map(function (p) {
          return '<li class="isl-time' + (p.minor ? ' is-minor' : '')
            + (current === p ? ' is-now' : '')
            + (next && next.p === p ? ' is-next' : '') + '">'
            + '<span class="isl-time-n">' + p.name + '</span>'
            + '<span class="isl-time-ar" lang="ar" dir="rtl">' + p.ar + '</span>'
            + '<span class="isl-time-v">' + hhmm(t[p.k]) + '</span>'
            + '</li>';
        }).join('');

        // qiblah
        var bearing = qiblaBearing(place.lat, place.lng);
        var needle = document.getElementById('qbNeedle');
        if (needle) needle.setAttribute('transform', 'rotate(' + bearing.toFixed(2) + ' 100 100)');
        document.getElementById('qbDeg').textContent = bearing.toFixed(1) + '°';
        document.getElementById('qbDist').textContent = kaabaDistance(place.lat, place.lng).toLocaleString() + ' km';

        // both calendars
        try {
          var hij = new Intl.DateTimeFormat('ar-SA-u-ca-islamic-umalqura',
            { day: 'numeric', month: 'long', year: 'numeric' }).format(now);
          var hijEn = new Intl.DateTimeFormat('en-US-u-ca-islamic-umalqura',
            { day: 'numeric', month: 'long', year: 'numeric' }).format(now);
          document.getElementById('islHijri').textContent = hij;
          document.getElementById('islHijriEn').textContent = hijEn.replace(' AH', '') + ' AH';
        } catch (e) {
          document.getElementById('islHijri').textContent = '…';
          document.getElementById('islHijriEn').textContent = 'This browser has no Hijri calendar';
        }
        document.getElementById('islGreg').textContent = new Intl.DateTimeFormat('en-US',
          { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: place.tz }).format(now);
      }

      root.addEventListener('click', function (e) {
        var m = e.target.closest('[data-method]');
        var a = e.target.closest('[data-asr]');
        if (m) {
          METHODS.forEach(function (x) { if (x.id === m.getAttribute('data-method')) method = x; });
          root.querySelectorAll('[data-method]').forEach(function (b) { b.classList.toggle('is-active', b === m); });
          render();
        } else if (a) {
          ASR.forEach(function (x) { if (x.id === a.getAttribute('data-asr')) asr = x; });
          root.querySelectorAll('[data-asr]').forEach(function (b) { b.classList.toggle('is-active', b === a); });
          render();
        }
      });

      /* One button with two jobs, so it needs a state flag rather than a second
         listener: once the visitor's own coordinates are in, the same button
         becomes the way back to Irvine. */
      var geoBtn = document.getElementById('islGeo');
      if (geoBtn) {
        if (!navigator.geolocation) geoBtn.hidden = true;
        var located = false;
        geoBtn.addEventListener('click', function () {
          if (located) {
            place = HOME; located = false;
            geoBtn.textContent = 'Use my location';
            render();
            return;
          }
          geoBtn.disabled = true;
          geoBtn.textContent = 'Asking…';
          navigator.geolocation.getCurrentPosition(function (pos) {
            place = {
              lat: pos.coords.latitude, lng: pos.coords.longitude,
              label: 'Your location',
              tz: (Intl.DateTimeFormat().resolvedOptions().timeZone) || HOME.tz,
            };
            located = true;
            geoBtn.disabled = false;
            geoBtn.textContent = 'Back to Irvine';
            render();
          }, function () {
            geoBtn.disabled = false;
            geoBtn.textContent = 'Location unavailable. Tap to retry';
          }, { timeout: 10000, maximumAge: 600000 });
        });
      }

      render();
      setInterval(render, 30000);
    }

    /* ═══════════ 4: tajweed ═══════════
       Sūrat al-Ikhlāṣ, segmented by rule. The engine behind Al-Quran does this
       to the whole muṣḥaf from the rules rather than from a table; this is four
       verses of it, marked by hand, so the colours can be explained.

       Each segment is [text, ruleKey]. A null rule is plain text. */
    var RULES = [
      { k: 'madd',     name: 'Madd',     ar: 'مد',    desc: 'A vowel held long: two counts for the natural one, four to six where a hamzah or a sukūn follows.' },
      { k: 'qalqalah', name: 'Qalqalah', ar: 'قلقلة', desc: 'An echo on ق ط ب ج د when the letter carries no vowel. You bounce off it rather than stopping dead.' },
      { k: 'idgham',   name: 'Idghām',   ar: 'إدغام', desc: 'One letter merged into the next so the first is not heard at all, including the lām of “al-” before a sun letter.' },
      { k: 'ghunnah',  name: 'Ghunnah',  ar: 'غنة',   desc: 'A nasal hum held about two counts, on a doubled nūn or mīm and on the merges that carry it.' },
      { k: 'izhar',    name: 'Iẓhār',    ar: 'إظهار', desc: 'The opposite: the nūn or tanwīn is pronounced clearly, with no hum, because a throat letter follows.' },
    ];

    var SURAH = [
      { n: 1, seg: [['قُلْ ', null], ['هُوَ ', null], ['ٱللَّهُ ', 'ghunnah'], ['أَحَدٌ', 'madd']] },
      { n: 2, seg: [['ٱللَّهُ ', 'ghunnah'], ['ٱلصَّ', 'idgham'], ['مَدُ', 'qalqalah']] },
      { n: 3, seg: [['لَمْ ', null], ['يَلِدْ ', 'qalqalah'], ['وَلَمْ ', null], ['يُو', 'madd'], ['لَدْ', 'qalqalah']] },
      { n: 4, seg: [['وَلَمْ ', null], ['يَكُن ', null], ['لَّهُۥ ', 'idgham'], ['كُفُوًا ', 'madd'], ['أَحَدٌۢ', 'izhar']] },
    ];

    var taj = document.getElementById('islTajweed');
    if (taj) {
      taj.innerHTML =
        '<div class="tj-legend" id="tjLegend" role="group" aria-label="Tajweed rules">'
        + '<button class="tj-chip is-on" type="button" data-rule="all">All rules</button>'
        + RULES.map(function (r) {
            return '<button class="tj-chip tj-chip--' + r.k + '" type="button" data-rule="' + r.k + '">'
              + '<i aria-hidden="true"></i>' + r.name
              + '<span lang="ar" dir="rtl">' + r.ar + '</span></button>';
          }).join('')
        + '</div>'
        + '<div class="tj-sheet" id="tjSheet" lang="ar" dir="rtl">'
        + SURAH.map(function (v) {
            /* The verse number goes inside the ornate parentheses U+FD3E/U+FD3F,
               the pair a muṣḥaf actually uses, with Arabic-Indic digits. Written
               as escapes rather than literal glyphs so the file stays readable
               in an editor that does not do bidi well. */
            var digits = String(v.n).replace(/[0-9]/g, function (d) {
              return String.fromCharCode(0x0660 + (+d));
            });
            return '<p class="tj-ayah">' + v.seg.map(function (s) {
              return s[1] ? '<span class="tj tj--' + s[1] + '">' + s[0] + '</span>' : s[0];
            }).join('') + '<span class="tj-num">﴾' + digits + '﴿</span></p>';
          }).join('')
        + '</div>'
        + '<div class="tj-notes" id="tjNotes">'
        + RULES.map(function (r) {
            return '<p class="tj-note tj-note--' + r.k + '"><b>' + r.name + '</b>' + r.desc + '</p>';
          }).join('')
        + '</div>';

      var sheet = document.getElementById('tjSheet');
      document.getElementById('tjLegend').addEventListener('click', function (e) {
        var b = e.target.closest('[data-rule]');
        if (!b) return;
        var rule = b.getAttribute('data-rule');
        this.querySelectorAll('[data-rule]').forEach(function (x) { x.classList.toggle('is-on', x === b); });
        // `data-only` narrows the sheet to one rule; absent means show them all
        if (rule === 'all') sheet.removeAttribute('data-only');
        else sheet.setAttribute('data-only', rule);
        taj.querySelectorAll('.tj-note').forEach(function (n) {
          n.classList.toggle('is-dim', rule !== 'all' && !n.classList.contains('tj-note--' + rule));
        });
      });
    }

    /* Both blocks were written after reveal.js ran; handing them back is
       idempotent and picks up the new nodes. */
    if (typeof window.AEreveal === 'function') {
      if (root) window.AEreveal(root);
      if (taj) window.AEreveal(taj);
    }

  } catch (err) { /* never take the page down with it */ }
})();
