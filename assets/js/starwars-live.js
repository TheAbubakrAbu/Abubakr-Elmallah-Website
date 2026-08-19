/* starwars-live.js: the working parts of /star-wars/.

   The page used to end with a CSS atlas of every planet in the galaxy. That
   atlas already exists on /worlds/star-wars/, which is the page about the
   films, so having it twice was the problem; this page is about four things I
   built, and it now ends by letting you use them instead.

     1. Aurebesh:   type anything and get it spelled out in the alphabet,
                    which is what Aurebesh Translator and Aurebesh Droid do.
     2. Sabacc:     a playable hand of Corellian Spike against the house,
                    which is what Sabacc Droid deals in Discord.
     3. Kyber:      build a lightsaber: pick the crystal, pick the hilt,
                    ignite it. Drawn in SVG, not photographed.
     4. Stardate:   the Datapad chronometer, in Galactic Standard.

   LOAD ORDER MATTERS. Runs AFTER reveal.js, whole body in a try/catch: this
   page's sections start at opacity 0 and are revealed by reveal.js, so a script
   that throws before that runs would leave the page blank. */
(function starWarsLive() {
  try {

    /* ═══════════ 1. Aurebesh ═══════════
       The thirty-four characters of the alphabet: twenty-six letters and eight
       digraphs, each with the name it is actually called by. The NAMES are what
       this block prints; the letterforms themselves are the app's job, and
       drawing thirty-four angular glyphs by hand here would be a worse version
       of something I have already shipped twice. */
    var AUREBESH = {
      a: 'Aurek', b: 'Besh', c: 'Cresh', d: 'Dorn', e: 'Esk', f: 'Forn',
      g: 'Grek', h: 'Herf', i: 'Isk', j: 'Jenth', k: 'Krill', l: 'Leth',
      m: 'Mern', n: 'Nern', o: 'Osk', p: 'Peth', q: 'Qek', r: 'Resh',
      s: 'Senth', t: 'Trill', u: 'Usk', v: 'Vev', w: 'Wesk', x: 'Xesh',
      y: 'Yirt', z: 'Zerek',
    };

    /* The eight digraphs are single characters in Aurebesh, so they are matched
       before the single letters; otherwise "sh" comes out Senth-Herf, which is
       two characters where the alphabet has one. */
    var DIGRAPHS = [
      ['ch', 'Cherek'], ['ae', 'Enth'], ['eo', 'Onith'], ['kh', 'Krenth'],
      ['ng', 'Nen'], ['oo', 'Orenth'], ['sh', 'Shen'], ['th', 'Thesh'],
    ];

    function toAurebesh(text) {
      var out = [], i = 0, s = String(text).toLowerCase();
      while (i < s.length) {
        var two = s.substr(i, 2), hit = null;
        for (var d = 0; d < DIGRAPHS.length; d++) {
          if (DIGRAPHS[d][0] === two) { hit = DIGRAPHS[d]; break; }
        }
        if (hit) { out.push({ src: two, name: hit[1], digraph: true }); i += 2; continue; }
        var ch = s[i];
        if (AUREBESH[ch]) out.push({ src: ch, name: AUREBESH[ch] });
        else if (/\s/.test(ch)) out.push({ space: true });
        else if (/[0-9]/.test(ch)) out.push({ src: ch, name: ch, digit: true });
        i += 1;
      }
      return out;
    }

    var auInput = document.getElementById('swAuIn');
    var auOut = document.getElementById('swAuOut');
    if (auInput && auOut) {
      var paint = function () {
        var chars = toAurebesh(auInput.value);
        if (!chars.length) { auOut.innerHTML = '<span class="sw-au-empty">Awaiting input…</span>'; return; }
        auOut.innerHTML = chars.map(function (c) {
          if (c.space) return '<span class="sw-au-space" aria-hidden="true"></span>';
          return '<span class="sw-au-ch' + (c.digraph ? ' is-digraph' : '') + (c.digit ? ' is-digit' : '') + '">'
            + '<b>' + c.name + '</b><i>' + c.src + '</i></span>';
        }).join('');
      };
      auInput.addEventListener('input', paint);
      auInput.value = 'May the Force be with you';
      paint();
    }

    /* ═══════════ 2. Sabacc · Corellian Spike ═══════════
       The deck is 62 cards: three suits running +1 to +10 and −1 to −10, plus
       two sylops worth zero. The hand closest to ZERO wins, not the highest,
       which is what makes it a game of nerve rather than arithmetic.

       Implemented faithfully as a single round: you are dealt two, you draw or
       you stand, the house plays to its own rule, and ties go to the smaller
       hand. The chance cubes are rolled once a turn: doubles and everyone's
       hand is discarded and redealt, which is the actual rule and the reason
       nobody in that galaxy trusts a sabacc pot. */
    function newDeck() {
      var d = [];
      ['Flasks', 'Sabers', 'Staves'].forEach(function (suit) {
        for (var v = 1; v <= 10; v++) { d.push({ v: v, suit: suit }); d.push({ v: -v, suit: suit }); }
      });
      d.push({ v: 0, suit: 'Sylop' }, { v: 0, suit: 'Sylop' });
      return d;
    }

    function shuffle(d) {
      for (var i = d.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var t = d[i]; d[i] = d[j]; d[j] = t;
      }
      return d;
    }

    var total = function (h) { return h.reduce(function (t, c) { return t + c.v; }, 0); };

    /* The Idiot's Array: a sylop with a two and a three. It beats everything,
       including another hand that also totals zero, and it is the one hand in
       the game with a name. */
    function isIdiotsArray(h) {
      if (h.length !== 3) return false;
      var vs = h.map(function (c) { return c.v; }).sort(function (a, b) { return a - b; });
      return vs[0] === 0 && vs[1] === 2 && vs[2] === 3;
    }

    var sab = document.getElementById('swSabacc');
    if (sab) {
      var deck = [], you = [], house = [], over = false, msg = '', dice = [0, 0];

      function cardEl(c, hidden) {
        if (hidden) return '<span class="sb-card is-back" aria-label="Face-down card"><i></i></span>';
        var cls = c.suit === 'Sylop' ? ' is-sylop' : (c.v < 0 ? ' is-neg' : ' is-pos');
        return '<span class="sb-card' + cls + '">'
          + '<b>' + (c.v > 0 ? '+' + c.v : c.v) + '</b>'
          + '<i>' + c.suit + '</i></span>';
      }

      function handLine(h) {
        var t = total(h);
        return '<span class="sb-total' + (t === 0 ? ' is-zero' : '') + '">'
          + (t > 0 ? '+' + t : t) + '</span>'
          + (isIdiotsArray(h) ? '<span class="sb-array">Idiot’s Array</span>' : '');
      }

      function deal() {
        deck = shuffle(newDeck());
        you = [deck.pop(), deck.pop()];
        house = [deck.pop(), deck.pop()];
        over = false; msg = '';
        roll();
      }

      /* The chance cubes. Doubles wipe the table, which can happen on the very
         first roll of a hand; that is the game, not a bug in it. */
      function roll() {
        dice = [1 + Math.floor(Math.random() * 6), 1 + Math.floor(Math.random() * 6)];
        if (dice[0] === dice[1] && !over) {
          you = [deck.pop(), deck.pop()];
          house = [deck.pop(), deck.pop()];
          msg = 'Doubles. The cubes wipe the table: both hands discarded and redealt.';
        }
      }

      function stand() {
        // the house draws while it is further from zero than three
        while (Math.abs(total(house)) > 3 && deck.length) house.push(deck.pop());
        over = true;
        var y = Math.abs(total(you)), h = Math.abs(total(house));
        if (isIdiotsArray(you) && !isIdiotsArray(house)) msg = 'Idiot’s Array. You take the pot outright.';
        else if (isIdiotsArray(house) && !isIdiotsArray(you)) msg = 'The house has the Idiot’s Array. Pot gone.';
        else if (y < h) msg = 'You are nearer zero. The pot is yours.';
        else if (h < y) msg = 'The house is nearer zero. Bad luck.';
        else if (you.length < house.length) msg = 'Level on total: the smaller hand takes it. Yours.';
        else if (house.length < you.length) msg = 'Level on total: the house had fewer cards.';
        else msg = 'A dead heat. The pot carries over.';
      }

      function render() {
        var t = total(you);
        sab.innerHTML =
          '<div class="sb-table">'
          + '<div class="sb-side">'
          +   '<span class="sb-who">The House</span>'
          +   '<div class="sb-cards">' + house.map(function (c) { return cardEl(c, !over); }).join('') + '</div>'
          +   '<div class="sb-read">' + (over ? handLine(house) : '<span class="sb-total is-hidden">?</span>') + '</div>'
          + '</div>'
          + '<div class="sb-cubes" aria-label="Chance cubes">'
          +   '<span class="sb-cube">' + dice[0] + '</span><span class="sb-cube">' + dice[1] + '</span>'
          + '</div>'
          + '<div class="sb-side sb-side--you">'
          +   '<span class="sb-who">You</span>'
          +   '<div class="sb-cards">' + you.map(function (c) { return cardEl(c, false); }).join('') + '</div>'
          +   '<div class="sb-read">' + handLine(you) + '</div>'
          + '</div>'
          + '</div>'
          + '<p class="sb-msg' + (msg ? ' is-on' : '') + '">' + (msg || 'Closest to zero wins. Draw if you dare.') + '</p>'
          + '<div class="sb-acts">'
          +   '<button class="sb-btn" type="button" data-act="draw"' + (over ? ' disabled' : '') + '>Draw</button>'
          +   '<button class="sb-btn" type="button" data-act="stand"' + (over ? ' disabled' : '') + '>Stand</button>'
          +   '<button class="sb-btn sb-btn--new" type="button" data-act="deal">New hand</button>'
          + '</div>'
          + '<p class="sb-fine">Corellian Spike, as dealt in the Vandor sabacc den: sixty-two cards, three suits of +1 to +10 and −1 to −10, and two sylops worth nothing at all. A sylop with a two and a three is the Idiot’s Array and beats every other hand in the game, including another zero.</p>';
      }

      sab.addEventListener('click', function (e) {
        var b = e.target.closest('[data-act]');
        if (!b) return;
        var act = b.getAttribute('data-act');
        if (act === 'deal') deal();
        else if (act === 'draw' && !over) {
          if (deck.length) you.push(deck.pop());
          roll();
          // busting is not a thing here: you can be as far from zero as you like
          if (!deck.length) stand();
        } else if (act === 'stand' && !over) stand();
        render();
      });

      deal();
      render();
    }

    /* ═══════════ 3. The kyber forge ═══════════
       A crystal, a focusing array and a power cell, in a hilt every Jedi builds
       by hand. The colours below are the canon ones and what they signify; the
       blade is drawn, so changing the crystal is a change of one CSS variable. */
    var CRYSTALS = [
      { k: 'blue',   name: 'Blue',    c: '#3f9fe8', who: 'Guardian', note: 'The Jedi who leads with the blade. Obi-Wan, Anakin, Rey at the end.' },
      { k: 'green',  name: 'Green',   c: '#3fd06a', who: 'Consular', note: 'The Jedi who leads with the Force. Yoda, Qui-Gon, Luke at Jabba’s.' },
      { k: 'purple', name: 'Purple',  c: '#a05fe0', who: 'Sentinel',  note: 'Mace Windu, and only because Samuel L. Jackson asked George Lucas for one.' },
      { k: 'yellow', name: 'Yellow',  c: '#e8cf3f', who: 'Temple Guard', note: 'The sentinels who policed the Order itself, and Rey’s own at the very end.' },
      { k: 'white',  name: 'White',   c: '#eaf2ff', who: 'Purified',  note: 'A red crystal healed of the Sith who bled it. Ahsoka’s, after the Empire.' },
      { k: 'red',    name: 'Red',     c: '#e83f3f', who: 'Sith',      note: 'Not a colour a crystal comes in. A Sith pours rage into it until it bleeds.' },
      { k: 'orange', name: 'Orange',  c: '#e8853f', who: 'Rare',      note: 'A handful of Jedi and the odd Inquisitor. Mostly seen in the games.' },
      { k: 'dark',   name: 'Darksaber', c: '#141419', who: 'Mandalore', note: 'One of a kind, made by the first Mandalorian Jedi. A flat black blade with a white edge, and whoever holds it rules Mandalore.' },
    ];

    var HILTS = [
      { k: 'standard', name: 'Standard', note: 'One blade, one hand.' },
      { k: 'curved',   name: 'Curved',   note: 'Dooku’s: angled for one-handed duelling in Makashi form.' },
      { k: 'double',   name: 'Double-bladed', note: 'Maul’s saberstaff: two emitters, one hilt.' },
      { k: 'shoto',    name: 'Shoto',    note: 'A short blade for the off hand. Ahsoka’s second.' },
    ];

    var forge = document.getElementById('swForge');
    if (forge) {
      var crystal = CRYSTALS[0], hilt = HILTS[0], lit = true;

      function renderForge() {
        forge.innerHTML =
          '<div class="kb-stage" style="--blade:' + crystal.c + '">'
          /* Order matters: the back blade, then the hilt, then the main one, so
             the blade comes OUT of the emitter and a saberstaff grows a second
             one behind the pommel rather than the other way round. */
          + '<div class="kb-saber kb-saber--' + hilt.k + (lit ? ' is-lit' : '') + (crystal.k === 'dark' ? ' is-dark' : '') + '">'
          +   '<span class="kb-blade kb-blade--b" aria-hidden="true"><i></i></span>'
          +   '<span class="kb-hilt" aria-hidden="true"><b></b><b></b><b></b><b></b></span>'
          +   '<span class="kb-blade kb-blade--a" aria-hidden="true"><i></i></span>'
          + '</div>'
          + '</div>'
          + '<div class="kb-ctl">'
          +   '<span class="kb-k">Crystal</span>'
          +   '<div class="kb-chips">' + CRYSTALS.map(function (c) {
                return '<button class="kb-chip' + (c === crystal ? ' is-on' : '') + '" type="button"'
                  + ' data-crystal="' + c.k + '" style="--c:' + c.c + '" aria-label="' + c.name + ' crystal">'
                  + '<i aria-hidden="true"></i><span>' + c.name + '</span></button>';
              }).join('') + '</div>'
          + '</div>'
          + '<div class="kb-ctl">'
          +   '<span class="kb-k">Hilt</span>'
          +   '<div class="kb-chips">' + HILTS.map(function (h) {
                return '<button class="kb-chip kb-chip--hilt' + (h === hilt ? ' is-on' : '') + '" type="button"'
                  + ' data-hilt="' + h.k + '">' + h.name + '</button>';
              }).join('') + '</div>'
          + '</div>'
          + '<div class="kb-read">'
          +   '<span class="kb-who">' + crystal.who + '</span>'
          +   '<p class="kb-note">' + crystal.note + '</p>'
          +   '<p class="kb-note kb-note--hilt">' + hilt.note + '</p>'
          + '</div>'
          + '<button class="kb-ignite' + (lit ? ' is-lit' : '') + '" type="button" data-ignite aria-pressed="'
          +   (lit ? 'true' : 'false') + '">' + (lit ? 'Retract' : 'Ignite') + '</button>';
      }

      forge.addEventListener('click', function (e) {
        var c = e.target.closest('[data-crystal]');
        var h = e.target.closest('[data-hilt]');
        var ig = e.target.closest('[data-ignite]');
        if (c) CRYSTALS.forEach(function (x) { if (x.k === c.getAttribute('data-crystal')) crystal = x; });
        else if (h) HILTS.forEach(function (x) { if (x.k === h.getAttribute('data-hilt')) hilt = x; });
        else if (ig) lit = !lit;
        else return;
        renderForge();
      });

      renderForge();
    }

    /* ═══════════ 4. Galactic Standard ═══════════
       The chronometer from Datapad. The Galactic Standard Calendar counts from
       the Battle of Yavin (everything before it is BBY and everything after is
       ABY), and the year is 368 days of 24 standard hours. The film came out in
       1977, so that is the year this counts from. */
    var YAVIN = 1977;
    var stamp = document.getElementById('swStardate');
    if (stamp) {
      var tick = function () {
        var now = new Date();
        var start = new Date(now.getFullYear(), 0, 0);
        var day = Math.floor((now - start) / 86400000);
        var aby = now.getFullYear() - YAVIN;
        var frac = (now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds()) / 864;
        stamp.innerHTML =
          '<span class="sw-sd-v">' + aby + ':' + (day < 100 ? ('00' + day).slice(-3) : day)
          + ':' + ('00' + Math.floor(frac)).slice(-3) + '</span>'
          + '<span class="sw-sd-k">' + aby + ' ABY · Galactic Standard</span>';
      };
      tick();
      setInterval(tick, 1000);
    }

    if (typeof window.AEreveal === 'function') window.AEreveal(document);

  } catch (err) { /* never take the page down with it */ }
})();
