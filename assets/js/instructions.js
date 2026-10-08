/* instructions.js: /instructions/, the LEGO instruction booklet.

   The steps are the ordinary list of links in instructions.html, each
   carrying its brick, color and parts in data- attributes; this file is the
   booklet around them:

     the brick    one drawn brick per step, in that step's color, built from
                  its data-brick shape. SVG written here, so a step only has
                  to name a shape and a color
     the parts    the parts list printed under each step, from data-parts
     the count    the piece total, added up from every step's data-pcs rather
                  than written down, so it cannot drift from the list
     the ticks    a checkbox per step, remembered in localStorage: a booklet
                  you can actually work through

   Everything it draws is SVG; nothing here loads a file, and no logo or
   wordmark is reproduced. */
(function instructions() {
  'use strict';

  var root = document.getElementById('lg');
  if (!root) return;
  function $(id) { return document.getElementById(id); }

  /* smooth scrolling only after load, so back/forward restores the position
     instantly instead of sliding to it */
  addEventListener('load', function () {
    requestAnimationFrame(function () { requestAnimationFrame(function () {
      document.documentElement.classList.add('smooth');
    }); });
  });

  /* ───────────── the bricks ─────────────
     One drawing per shape, in studs. Each returns the brick's body and its
     studs; the color is passed in, and the outline is always the ink so a
     pale brick still reads on white paper. */

  function studs(n, y, w) {
    var out = '', gap = w / n, i;
    for (i = 0; i < n; i++) {
      var cx = gap * i + gap / 2;
      out += '<rect x="' + (cx - 3.4) + '" y="' + y + '" width="6.8" height="4.6" rx="1.8"'
           + ' fill="currentColor" stroke="#16181c" stroke-width="1.4"/>';
    }
    return out;
  }

  var SHAPES = {
    /* a plain brick, n studs wide: the body, then the studs on top */
    brick: function (n) {
      var w = n * 11;
      return { w: w + 4, h: 26, body:
          studs(n, 2, w)
        + '<rect x="0" y="6.4" width="' + w + '" height="16" rx="1.6"'
        + ' fill="currentColor" stroke="#16181c" stroke-width="1.6"/>'
        /* the near face, a shade darker, which is what makes it read as 3D */
        + '<rect x="0" y="16" width="' + w + '" height="6.4" fill="#16181c" opacity=".16"/>' };
    },
    /* a plate: the same footprint, a third of the height */
    plate: function (n) {
      var w = n * 11;
      return { w: w + 4, h: 26, body:
          studs(n, 7.6, w)
        + '<rect x="0" y="12" width="' + w + '" height="7.4" rx="1.4"'
        + ' fill="currentColor" stroke="#16181c" stroke-width="1.6"/>' };
    },
    /* a tile: a plate with no studs at all, which is the point of a tile */
    tile: function (n) {
      var w = n * 11;
      return { w: w + 4, h: 26, body:
          '<rect x="0" y="11" width="' + w + '" height="8.4" rx="1.4"'
        + ' fill="currentColor" stroke="#16181c" stroke-width="1.6"/>'
        + '<rect x="2.4" y="13.2" width="' + (w - 4.8) + '" height="1.4" fill="#16181c" opacity=".2"/>' };
    },
    /* an arch: the one shape that is obviously a shape and not a box */
    arch: function (n) {
      var w = n * 11;
      return { w: w + 4, h: 26, body:
          studs(n, 2, w)
        + '<path d="M0 22.4V8a1.6 1.6 0 0 1 1.6-1.6h' + (w - 3.2)
        + 'a1.6 1.6 0 0 1 1.6 1.6v14.4h-6V16a' + (w / 2 - 5) + ' ' + 7
        + ' 0 0 0-' + (w - 12) + ' 0v6.4z"'
        + ' fill="currentColor" stroke="#16181c" stroke-width="1.6"/>' };
    },
  };

  /* what each data-brick name draws: a shape and a width in studs */
  var BRICKS = {
    '1x2':  ['brick', 2], '1x4': ['brick', 4],
    '2x2':  ['brick', 2], '2x3': ['brick', 3], '2x4': ['brick', 4],
    'plate': ['plate', 4], 'tile': ['tile', 3], 'arch': ['arch', 4],
  };

  function draw(name, color) {
    var spec = BRICKS[name] || BRICKS['2x2'];
    var made = SHAPES[spec[0]](spec[1]);
    return '<svg class="lg-brick" viewBox="0 0 ' + made.w + ' ' + made.h + '"'
      + ' aria-hidden="true" style="color:' + color + '">' + made.body + '</svg>';
  }

  /* ───────────── build the booklet ───────────── */

  var steps = Array.prototype.slice.call(document.querySelectorAll('.lg-step'));
  if (!steps.length) return;

  var KEY = 'ae-lego-built';
  var built = {};
  try { built = JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) { built = {}; }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(built)); } catch (e) { /* private mode */ }
  }

  var total = 0;

  /* ───────────── the model ─────────────
     The pile the booklet is building. It is stacked from the steps that are
     ticked off, in step order, so it is never anything other than the
     booklet's own state drawn upward. */
  var stack = $('lgStack'), model = $('lgModel');

  function remodel() {
    if (!stack) return;
    var on = steps.filter(function (s) {
      return s.classList.contains('is-built');
    });
    /* the bricks, bottom of the model first: the baseplate step is step one,
       which is why the stack is laid out in reverse by CSS rather than here */
    stack.innerHTML = on.map(function (s) {
      return draw(s.getAttribute('data-brick'), s.getAttribute('data-c') || '#f5d222');
    }).join('');
    if (model) model.classList.toggle('is-built', on.length > 0);

    /* the figures beside it, all counted from the list rather than written */
    var pcs = on.reduce(function (sum, s) {
      var n = parseInt(s.getAttribute('data-pcs'), 10);
      return sum + (isNaN(n) ? 0 : n);
    }, 0);
    var pct = Math.round((on.length / steps.length) * 100);
    if ($('lgBuiltPct')) $('lgBuiltPct').textContent = pct + '%';
    if ($('lgPFill')) $('lgPFill').style.width = pct + '%';
    if ($('lgBuiltN')) $('lgBuiltN').textContent = on.length;
    if ($('lgBuiltT')) $('lgBuiltT').textContent = steps.length;
    if ($('lgBuiltPc')) $('lgBuiltPc').textContent = pcs.toLocaleString();
    if ($('lgEmpty')) {
      $('lgEmpty').textContent = on.length
        ? '' : 'Nothing built yet. Tick a step.';
    }
    bags();
  }

  /* ───────────── the bags ─────────────
     Each .lg-bag in the booklet is one bag; its count is its own steps, so
     adding a step to a bag in the HTML needs no change here. */
  function bags() {
    var box = $('lgBags');
    if (!box) return;
    var groups = Array.prototype.slice.call(document.querySelectorAll('.lg-bag'));
    box.innerHTML = groups.map(function (g, i) {
      var mine = Array.prototype.slice.call(g.querySelectorAll('.lg-step'));
      var done = mine.filter(function (s) { return s.classList.contains('is-built'); }).length;
      var h = g.querySelector('.lg-bag-h');
      /* the bag's own name, without the number chip the heading starts with */
      var name = h ? h.textContent.replace(/^\s*\d+\s*/, '').trim() : 'Bag ' + (i + 1);
      return '<li class="' + (done === mine.length && mine.length ? 'is-done' : '') + '">'
        + '<b>' + (i + 1) + '</b>'
        + '<span>' + name + '</span>'
        + '<em>' + done + '/' + mine.length + '</em></li>';
    }).join('');
  }

  /* ───────────── the callout ─────────────
     The parts box in the corner, following whichever step you point at. */
  function callout(step) {
    var b = $('lgCalloutB'), n = $('lgCalloutN'), p = $('lgCalloutP');
    if (!b || !step) return;
    var pcs = parseInt(step.getAttribute('data-pcs'), 10);
    var color = step.getAttribute('data-c') || '#f5d222';
    var brick = step.getAttribute('data-brick');
    /* up to six of the step's bricks, which is as many as a callout ever
       shows before it starts printing "6x" instead */
    var many = Math.max(1, Math.min(6, isNaN(pcs) ? 1 : pcs));
    var out = '';
    for (var i = 0; i < many; i++) out += draw(brick, color);
    b.innerHTML = out;
    var num = step.querySelector('.lg-step-n');
    if (n) n.textContent = 'Step ' + (num ? num.textContent : '');
    if (p) p.textContent = step.getAttribute('data-parts') || '';
  }

  steps.forEach(function (step) {
    var brick = step.getAttribute('data-brick');
    var color = step.getAttribute('data-c') || '#f5d222';
    var parts = step.getAttribute('data-parts');
    var pcs = parseInt(step.getAttribute('data-pcs'), 10);
    if (!isNaN(pcs)) total += pcs;

    /* the brick goes between the number and the text */
    var n = step.querySelector('.lg-step-n');
    if (n && brick) n.insertAdjacentHTML('afterend', draw(brick, color));

    /* the parts list under the step's own title */
    var t = step.querySelector('.lg-step-t');
    if (t && parts) {
      var p = document.createElement('span');
      p.className = 'lg-step-p';
      p.textContent = parts;
      t.appendChild(p);
    }

    /* the tick. It is a real button rather than a checkbox inside the link,
       because a control inside an <a> is not reachable by the keyboard in the
       order anybody expects: the step stays a link, and the tick sits beside
       it as its own control with its own label. */
    var href = step.getAttribute('href') || '';
    var tick = document.createElement('button');
    tick.type = 'button';
    tick.className = 'lg-tick';
    tick.setAttribute('aria-pressed', built[href] ? 'true' : 'false');
    tick.setAttribute('aria-label', 'Mark this step built');
    tick.textContent = built[href] ? '✓' : '';
    if (built[href]) step.classList.add('is-built');

    tick.addEventListener('click', function () {
      var on = !built[href];
      if (on) built[href] = 1; else delete built[href];
      tick.setAttribute('aria-pressed', on ? 'true' : 'false');
      tick.textContent = on ? '✓' : '';
      step.classList.toggle('is-built', on);
      save();
      /* the model is the whole point of ticking a step off */
      remodel();
    });

    /* pointing at a step puts its parts in the callout */
    step.addEventListener('mouseenter', function () { callout(step); });
    step.addEventListener('focus', function () { callout(step); });
    step.parentNode.insertBefore(tick, step.nextSibling);
    /* the tick and its step share a row */
    step.parentNode.style.display = 'flex';
    step.parentNode.style.alignItems = 'center';
    step.parentNode.style.gap = '0.5rem';
    step.style.flex = '1';
  });

  /* the counts, added up rather than written down */
  var pcTxt = total.toLocaleString() + ' pcs';
  if ($('lgCount')) $('lgCount').textContent = pcTxt;
  if ($('lgFootPc')) $('lgFootPc').textContent = total.toLocaleString();
  if ($('lgSteps')) $('lgSteps').textContent = steps.length;

  /* "open bag 1" just goes to the first step, which is what it means */
  var start = $('lgStart');
  if (start) start.addEventListener('click', function () {
    var first = document.querySelector('.lg-step');
    if (!first) return;
    first.scrollIntoView({ behavior: 'smooth', block: 'center' });
    first.focus({ preventScroll: true });
  });

  /* ───────────── build it all, or take it apart ─────────────
     Every tick, set at once. It goes through each step's own tick button so
     there is exactly one place that knows what ticking a step means. */
  function setAll(on) {
    steps.forEach(function (step) {
      var isOn = step.classList.contains('is-built');
      if (isOn === on) return;
      var tick = step.parentNode.querySelector('.lg-tick');
      if (tick) tick.click();
    });
  }
  if ($('lgAll')) $('lgAll').addEventListener('click', function () { setAll(true); });
  if ($('lgClear')) $('lgClear').addEventListener('click', function () { setAll(false); });

  /* the model and the callout start from whatever the booklet remembers */
  remodel();
  callout(steps[0]);
})();
