/* =========================================================================
   Farras Naim — interactive personal site
   Everything is progressive: the page reads fine with this file missing.
   ========================================================================= */
(function () {
    'use strict';

    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    var $  = function (s, r) { return (r || document).querySelector(s); };
    var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

    /* =====================================================================
       CONTENT YOU'LL WANT TO EDIT
       ===================================================================== */

    /* --- THE RIG ---------------------------------------------------------
       Real parts. `part` must match the data-part attribute on the SVG.   */
    var RIG = [
        { part: 'pc', label: 'tower', name: 'the main PC', spec: 'i7-14700F · RTX 5060 8GB · 32GB DDR4 · 1TB NVMe',
          why: 'a 20-core i7-14700F next to a mid-range RTX 5060, which looks unbalanced until you remember that nothing from the office ever touches it. <strong>work stays on the work laptop — BYOD here stops at a phone and an iPad</strong>, so this machine has exactly one job description: games, streams, and whatever I have decided to reinstall at 1am. a 360mm AIO in a darkFlash C280 keeps it quiet through all of it.' },

        { part: 'monitor', label: 'display', name: 'ASUS ROG Strix XG27WCS', spec: '27" QHD · 180 Hz · on an Oximus dual arm',
          why: '1440p at 27" over 4K on purpose — <strong>at this size the extra pixels cost frames without adding clarity</strong>, and I read spreadsheets far more than I look at textures. 180Hz is the valorant half of the argument. it sits on a dual monitor arm because the desk surface is worth more than the stand was.' },

        { part: 'keyboard', label: 'keyboard', name: 'iLovBee B87', spec: 'TKL · tri-mode wireless · RGB',
          why: 'tenkeyless so the mouse sits closer to my shoulder. <strong>a numpad I touch twice a month is not worth the wrist angle</strong>, and tri-mode means the same board follows the ThinkPad when I work somewhere else without re-learning a layout.' },

        { part: 'mouse', label: 'mouse', name: 'LAMZU MAYA X', spec: 'wireless · 8K polling · Artisan Ninja FX Raiden',
          why: 'an expensive mouse sitting on an expensive pad, and I still cannot aim. the LAMZU is genuinely light, the 8K polling is genuinely real, and the Artisan Raiden is the control-speed surface everyone skips and then immediately notices. <strong>none of it has ever landed a shot my hands were not already going to miss</strong> — valorant and CS2 have both made this very clear to me. the gear stopped being the variable a long time ago. it is a skill issue and I have made peace with it.' },

        { part: 'audio', label: 'audio', name: 'Sony WH-1000XM6 + 7Hz G1', spec: 'wireless ANC over-ears · wired IEMs',
          why: 'noise cancelling is the actual feature, and it is not for music. <strong>open-plan office building and a laptop fan are the two sounds I most need gone</strong>, and the XM6 survives me standing up mid-call. the 7Hz G1 covers the other half: wired IEMs for when I want to hear the footsteps themselves rather than a pleasant interpretation of them. both live on top of the tower so there is one obvious place they belong.' },

        { part: 'laptop', label: 'work laptop', name: 'ThinkPad T14 Gen 3', spec: 'i7-1265U · 32GB · since 2022',
          why: 'the machine that has been with me since I joined EY in 2022, and the one that has taken the most abuse. <strong>32GB is the only reason million-row Excel workbooks open at all</strong> — the CPU is a low-power U-series chip, so memory is what stops a pivot table from ending the afternoon. it keeps the desk honest: the tower is mine, this one is the job.' },

        { part: 'cam', label: 'webcam', name: 'Streamplify CAM PRO', spec: '4K · fixed on the bezel',
          why: 'a real camera instead of the laptop\'s, because <strong>the ThinkPad lid is never pointed where I am actually sitting</strong>. it stays clipped to the monitor so joining a client call is one click and not a furniture rearrangement.' },

        { part: 'mic', label: 'microphone', name: 'Thronmax Rosa Mdrill Zero+', spec: 'USB condenser · own stand',
          why: 'the one piece I would tell anyone to buy first. <strong>headset mics compromise both halves and everyone hears it except you</strong> — audio is what makes a stream watchable and a call not exhausting. it sits off to the right on its own stand, clear of the keyboard.' }
    ];

    /* --- TRAVEL ----------------------------------------------------------
       International legs only, taken straight from the flight log.
       lat/lon place the pin; `legs` are real flights; `note` is yours to
       rewrite — everything else here is data rather than recollection.   */
    var TRIPS = [
        { city: 'Jakarta', country: 'Indonesia', lat: -6.21, lon: 106.85, when: 'home base', home: true,
          note: 'home. every line on this map leaves from here and comes back to here, usually at an hour that made a lot more sense when I booked it.',
          legs: [] },

        { city: 'Cairo', country: 'Egypt', lat: 30.04, lon: 31.24, when: 'apr 2025',
          note: 'the longest single leg I have flown — over eleven hours in one go. we stopped here for the pyramids before carrying on to Saudi for Umrah, and standing in front of them is still the closest I have come to not believing a place was real.',
          legs: [ { d: '2 apr 2025', r: 'CGK → CAI', f: 'EgyptAir · MS 978 · B789', t: '11h 18m' },
                  { d: '3 apr 2025', r: 'CAI → JED', f: 'EgyptAir · MS 665 · A333', t: '2h 07m' } ] },

        { city: 'Jeddah', country: 'Saudi Arabia', lat: 21.49, lon: 39.19, when: 'apr 2025',
          note: 'Umrah with my brothers — the same classmates I spent four years of campus with. none of us, and none of the people who knew us, really saw that trip coming. nine days on the ground between landing from Cairo and flying back out, which is still the longest I have stayed anywhere abroad.',
          legs: [ { d: '3 apr 2025',  r: 'CAI → JED', f: 'EgyptAir · MS 665 · A333',  t: '2h 07m' },
                  { d: '12 apr 2025', r: 'JED → DOH', f: 'Qatar Airways · QR 1185 · A333', t: '1h 59m' } ] },

        { city: 'Doha', country: 'Qatar', lat: 25.29, lon: 51.53, when: 'apr 2025',
          note: 'technically a connection, but I cleared immigration and booked a room at the Best Western by the airport — a few hours of sleep and a shower, and enough of the city to say I was actually there, before the Bangkok leg.',
          legs: [ { d: '12 apr 2025', r: 'JED → DOH', f: 'Qatar Airways · QR 1185 · A333', t: '1h 59m' },
                  { d: '12 apr 2025', r: 'DOH → BKK', f: 'Qatar Airways · QR 838 · B77W',  t: '6h 12m' } ] },

        { city: 'Bangkok', country: 'Thailand', lat: 13.76, lon: 100.50, when: 'nov 2024 · apr 2025',
          note: 'the only city out here I went back to. first on a direct hop from Jakarta, then again as the last stop on the way home from Doha.',
          legs: [ { d: '28 nov 2024', r: 'CGK → DMK', f: 'Thai Lion Air · SL 117 · B738',  t: '3h 21m' },
                  { d: '1 dec 2024',  r: 'DMK → CGK', f: 'Indonesia AirAsia · QZ 253 · A320',  t: '3h 25m' },
                  { d: '12 apr 2025', r: 'DOH → BKK', f: 'Qatar Airways · QR 838 · B77W',  t: '6h 12m' },
                  { d: '13 apr 2025', r: 'DMK → CGK', f: 'Batik Air · ID 7630 · A320', t: '3h 26m' } ] },

        { city: 'Kuala Lumpur', country: 'Malaysia', lat: 3.14, lon: 101.69, when: 'jun 2024 · nov 2025',
          note: 'where the solo travelling actually started. a two-night trial run in 2024 to find out whether I could do this on my own, and then again in 2025 as the first stop of a two-country loop.',
          legs: [ { d: '14 jun 2024', r: 'CGK → KUL', f: 'TransNusa · 8B 673 · A320', t: '2h 05m' },
                  { d: '16 jun 2024', r: 'KUL → CGK', f: 'TransNusa · 8B 680 · A320', t: '2h 15m' },
                  { d: '6 nov 2025',  r: 'CGK → KUL', f: 'TransNusa · 8B 675 · A321',      t: '2h 18m' },
                  { d: '9 nov 2025',  r: 'KUL → SGN', f: 'Malaysia Airlines · MH 758 · B738',      t: '2h 55m' } ] },

        { city: 'Ho Chi Minh City', country: 'Vietnam', lat: 10.82, lon: 106.63, when: 'nov 2025',
          note: 'second half of the same trip, and the most recent stamp in the book.',
          legs: [ { d: '9 nov 2025',  r: 'KUL → SGN', f: 'Malaysia Airlines · MH 758 · B738', t: '2h 55m' },
                  { d: '12 nov 2025', r: 'SGN → CGK', f: 'Vietnam Airlines · VN 631 · A321', t: '2h 53m' } ] }
    ];

    /* Coarse continent outlines [lon, lat] — rasterised into dots below.
       Deliberately low-fidelity; the dot grid softens the edges. */
    var LAND = [
        [[-168,65],[-158,71],[-140,70],[-125,70],[-110,68],[-95,70],[-85,73],[-75,68],[-62,60],[-55,52],[-66,45],[-70,42],[-76,35],[-81,25],[-90,29],[-97,26],[-105,20],[-115,30],[-125,40],[-124,48],[-130,55],[-140,60],[-152,59],[-168,65]],
        [[-45,60],[-20,70],[-20,82],[-45,84],[-60,80],[-55,70],[-45,60]],
        [[-81,8],[-75,10],[-60,11],[-50,0],[-35,-5],[-35,-22],[-48,-25],[-58,-35],[-62,-40],[-65,-50],[-70,-55],[-75,-45],[-72,-30],[-70,-18],[-75,-5],[-81,8]],
        [[-10,36],[0,38],[10,38],[20,36],[28,36],[30,45],[40,48],[40,60],[30,65],[20,70],[10,63],[5,58],[-5,50],[-10,43],[-10,36]],
        [[-17,15],[-10,28],[0,32],[10,33],[20,32],[32,31],[35,22],[43,12],[51,12],[42,-2],[40,-15],[35,-25],[25,-34],[18,-35],[12,-18],[9,-2],[0,5],[-8,5],[-17,15]],
        [[30,45],[40,48],[45,40],[50,30],[58,25],[65,25],[70,24],[78,8],[82,10],[88,22],[92,22],[96,17],[100,8],[105,10],[108,20],[115,23],[120,32],[122,40],[130,43],[135,50],[142,55],[150,60],[160,62],[170,65],[180,68],[180,73],[140,76],[100,78],[70,72],[60,70],[40,68],[35,60],[30,55],[30,45]],
        [[95,5],[100,0],[104,-6],[100,-3],[96,2],[95,5]],
        [[105,-6],[114,-8],[114,-9],[105,-7]],
        [[109,2],[117,4],[119,-2],[114,-4],[109,-2],[109,2]],
        [[119,1],[123,1],[125,-3],[121,-5],[119,-2],[119,1]],
        [[131,-1],[141,-3],[150,-6],[147,-9],[140,-8],[133,-4],[131,-1]],
        [[120,18],[124,18],[126,10],[122,6],[120,12],[120,18]],
        [[113,-22],[122,-18],[130,-12],[137,-12],[142,-11],[145,-15],[150,-22],[153,-28],[150,-37],[143,-39],[135,-35],[129,-32],[120,-34],[115,-34],[113,-22]],
        [[172,-34],[178,-38],[174,-42],[168,-47],[166,-45],[172,-34]],
        [[130,31],[136,34],[141,40],[145,44],[141,45],[136,37],[130,33],[130,31]],
        [[-6,50],[-2,51],[0,53],[-1,58],[-5,58],[-6,54],[-6,50]],
        [[43,-12],[50,-15],[47,-25],[44,-22],[43,-12]]
    ];

    /* =====================================================================
       1. REVEAL ON SCROLL — reveals once, never hides again.
       Runs before every other module so that an exception anywhere later
       can never leave the .rv-hidden page blank.
       ===================================================================== */
    (function reveal() {
        var els = $$('.rv');
        if (reduce.matches || !('IntersectionObserver' in window)) {
            els.forEach(function (e) { e.classList.add('is-in'); });
            return;
        }
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (en) {
                if (!en.isIntersecting) return;
                en.target.classList.add('is-in');
                io.unobserve(en.target);
            });
        }, { threshold: 0.06, rootMargin: '0px 0px -40px 0px' });
        els.forEach(function (e) { io.observe(e); });
    })();

    /* =====================================================================
       2. THEME
       ===================================================================== */
    (function theme() {
        var btn = $('#themeToggle');
        if (!btn) return;
        var media = window.matchMedia('(prefers-color-scheme: light)');

        function read() { try { return localStorage.getItem('theme'); } catch (e) { return null; } }
        function current() {
            return document.documentElement.getAttribute('data-theme') || (media.matches ? 'light' : 'dark');
        }
        function paint(t) {
            document.documentElement.setAttribute('data-theme', t);
            /* the label alone carries the state; pairing aria-pressed with a
               swapped action label reads as contradictory in screen readers */
            btn.setAttribute('aria-label', t === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
            var meta = $('meta[name="theme-color"]');
            if (meta) meta.setAttribute('content', t === 'dark' ? '#08080b' : '#fbfbfc');
        }
        paint(current());

        btn.addEventListener('click', function () {
            var next = current() === 'dark' ? 'light' : 'dark';
            try { localStorage.setItem('theme', next); } catch (e) {}
            paint(next);
            drawMap();
        });

        var onSys = function (e) { if (!read()) { paint(e.matches ? 'light' : 'dark'); drawMap(); } };
        if (media.addEventListener) media.addEventListener('change', onSys);
        else if (media.addListener) media.addListener(onSys);
    })();

    /* =====================================================================
       3. NAV — stuck state + active section
       ===================================================================== */
    (function nav() {
        var bar = $('#nav');
        var links = $$('.nav__link');
        var secs = links.map(function (a) { return $(a.getAttribute('href')); }).filter(Boolean);
        var tick = false;

        function update() {
            tick = false;
            if (bar) bar.classList.toggle('is-stuck', window.scrollY > 30);
            var y = window.scrollY + window.innerHeight * 0.32;
            var active = -1;
            secs.forEach(function (s, i) { if (s.offsetTop <= y) active = i; });
            links.forEach(function (a, i) { a.classList.toggle('is-active', i === active); });
        }
        window.addEventListener('scroll', function () {
            if (tick) return; tick = true; requestAnimationFrame(update);
        }, { passive: true });
        update();
    })();

    /* =====================================================================
       4. HERO — rotating role word
       ===================================================================== */
    (function role() {
        var el = $('#roleWord');
        if (!el) return;
        var words = (el.dataset.words || '').split(',').filter(Boolean);
        if (words.length < 2) return;
        var i = 0;

        /* The rotation is content rather than decoration, so it keeps running
           even when the OS asks for reduced motion — only the cross-fade is
           dropped there. Gating the whole thing on `reduce` made the line look
           broken on any machine with animation effects switched off. */
        var fade = !reduce.matches;
        if (fade) el.style.transition = 'opacity .32s ease';

        /* Reserve the widest word's width once so swaps never shift the caret
           or the line's right edge (tiny CLS entries otherwise). */
        el.style.display = 'inline-block';
        var widest = 0;
        words.forEach(function (w) {
            el.textContent = w;
            widest = Math.max(widest, el.offsetWidth);
        });
        el.style.minWidth = widest + 'px';
        el.textContent = words[0];

        /* Idle the interval while the hero is offscreen, not just when the
           tab is hidden. */
        var inView = true;
        if ('IntersectionObserver' in window) {
            new IntersectionObserver(function (en) { inView = en[0].isIntersecting; }).observe(el);
        }

        function step() {
            i = (i + 1) % words.length;
            el.textContent = words[i];
        }

        setInterval(function () {
            if (document.hidden || !inView) return;
            if (!fade) { step(); return; }
            el.style.opacity = '0';
            setTimeout(function () { step(); el.style.opacity = '1'; }, 320);
        }, 2900);
    })();

    /* =====================================================================
       5. TIMELINE — expand, filter, scroll progress
       ===================================================================== */
    (function timeline() {
        var root = $('#timeline');
        if (!root) return;
        var items = $$('.tl-item', root);

        items.forEach(function (item) {
            var head = $('.tl-head', item);
            var body = $('.tl-body', item);
            if (!head || !body) return;

            var id = 'tlb-' + Math.random().toString(36).slice(2, 8);
            body.id = id;
            head.setAttribute('aria-controls', id);

            head.addEventListener('click', function () {
                var open = item.classList.toggle('is-open');
                head.setAttribute('aria-expanded', String(open));
            });
        });

        /* filters */
        var filters = $$('.filter');
        filters.forEach(function (btn) {
            btn.addEventListener('click', function () {
                var want = btn.dataset.filter;
                filters.forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
                items.forEach(function (item) {
                    var show = want === 'all' || item.dataset.type === want;
                    item.hidden = !show;
                    if (!show) {
                        item.classList.remove('is-open');
                        var h = $('.tl-head', item);
                        if (h) h.setAttribute('aria-expanded', 'false');
                    }
                });
            });
        });

        /* spine progress */
        var bar = $('#tlProgress');
        if (!bar || reduce.matches) return;
        var tick = false;
        function draw() {
            tick = false;
            var r = root.getBoundingClientRect();
            var vh = window.innerHeight;
            var p = (vh * 0.72 - r.top) / r.height;
            bar.style.height = Math.max(0, Math.min(1, p)) * 100 + '%';
        }
        window.addEventListener('scroll', function () {
            if (tick) return; tick = true; requestAnimationFrame(draw);
        }, { passive: true });
        window.addEventListener('resize', draw);
        draw();
    })();

    /* =====================================================================
       6. OFF-HOURS CARDS — expand + pointer-tracked sheen
       ===================================================================== */
    (function cards() {
        $$('.card').forEach(function (card) {
            var head = $('.card__head', card);
            if (head) {
                head.addEventListener('click', function () {
                    var open = card.classList.toggle('is-open');
                    head.setAttribute('aria-expanded', String(open));
                });
            }
            card.addEventListener('pointermove', function (e) {
                var r = card.getBoundingClientRect();
                card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
                card.style.setProperty('--my', (e.clientY - r.top) + 'px');
            });
        });
    })();

    /* =====================================================================
       7. THE RIG — hotspots + detail panel
       ===================================================================== */
    (function rig() {
        var panel = $('#rigPanel'), hint = $('#rigHint'), list = $('#rigList');
        if (!panel || !list) return;

        var groups = $$('.rig-part');
        var card = document.createElement('div');
        card.className = 'rig__card';
        /* announce panel swaps to screen readers, same as #tripCard */
        card.setAttribute('aria-live', 'polite');
        panel.insertBefore(card, list);

        function show(part) {
            var d = RIG.filter(function (x) { return x.part === part; })[0];
            if (!d) return;
            groups.forEach(function (g) {
                var on = g.dataset.part === part;
                g.classList.toggle('is-active', on);
                g.setAttribute('aria-pressed', String(on));
            });
            $$('.rig__listBtn', list).forEach(function (b) {
                var on = b.dataset.part === part;
                b.classList.toggle('is-active', on);
                b.setAttribute('aria-pressed', String(on));
            });
            if (hint) hint.style.display = 'none';
            card.innerHTML =
                '<p class="rig__kicker">' + d.label + '</p>' +
                '<h3 class="rig__name">' + d.name + '</h3>' +
                '<p class="rig__spec">' + d.spec + '</p>' +
                '<p class="rig__why">' + d.why + '</p>';
            card.classList.remove('is-shown');
            requestAnimationFrame(function () { card.classList.add('is-shown'); });
        }

        RIG.forEach(function (d) {
            var b = document.createElement('button');
            b.className = 'rig__listBtn';
            b.dataset.part = d.part;
            b.textContent = d.label;
            b.setAttribute('aria-pressed', 'false');
            b.addEventListener('click', function () { show(d.part); });
            list.appendChild(b);
        });

        groups.forEach(function (g) {
            var part = g.dataset.part;
            g.setAttribute('aria-pressed', 'false');
            g.addEventListener('click', function () { show(part); });
            g.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); show(part); }
            });
        });

        show('pc');
    })();

    /* =====================================================================
       8. TRAVEL MAP — dotted canvas world + DOM pins
       ===================================================================== */
    var drawMap = function () {};

    (function travel() {
        var wrap = $('#mapWrap'), cv = $('#mapCanvas');
        if (!wrap || !cv) return;
        var ctx = cv.getContext('2d');

        function inPoly(lon, lat, poly) {
            var hit = false;
            for (var i = 0, j = poly.length - 1; i < poly.length; j = i++) {
                var xi = poly[i][0], yi = poly[i][1], xj = poly[j][0], yj = poly[j][1];
                if (((yi > lat) !== (yj > lat)) && (lon < (xj - xi) * (lat - yi) / (yj - yi) + xi)) hit = !hit;
            }
            return hit;
        }
        function isLand(lon, lat) {
            for (var i = 0; i < LAND.length; i++) if (inPoly(lon, lat, LAND[i])) return true;
            return false;
        }
        /* equirectangular, clipped to the latitudes that actually hold land */
        var LAT_TOP = 78, LAT_BOT = -56;
        function project(lon, lat) {
            return {
                x: (lon + 180) / 360,
                y: (LAT_TOP - lat) / (LAT_TOP - LAT_BOT)
            };
        }

        /* The land lattice depends only on the step value, so cache the
           projected points per step — theme toggles and resizes then skip
           the ~13k point-in-polygon tests and just replay coordinates. */
        var landCache = {};
        function landPoints(step) {
            var key = String(step);
            if (!landCache[key]) {
                var pts = [];
                for (var lat = LAT_TOP; lat >= LAT_BOT; lat -= step) {
                    for (var lon = -180; lon <= 180; lon += step) {
                        if (!isLand(lon, lat)) continue;
                        var p = project(lon, lat);
                        pts.push(p.x, p.y);
                    }
                }
                landCache[key] = pts;
            }
            return landCache[key];
        }

        drawMap = function () {
            var w = wrap.clientWidth, h = wrap.clientHeight;
            if (!w || !h) return;
            var dpr = Math.min(window.devicePixelRatio || 1, 2);
            cv.width = w * dpr; cv.height = h * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.clearRect(0, 0, w, h);

            var css = getComputedStyle(document.documentElement);
            var dot = css.getPropertyValue('--map-dot').trim() || 'rgba(214,216,232,.4)';

            var step = w < 520 ? 2.8 : 1.9;      // degrees per dot
            var r = w < 520 ? 1.0 : 1.3;
            ctx.fillStyle = dot;

            var pts = landPoints(step);
            for (var i = 0; i < pts.length; i += 2) {
                ctx.beginPath();
                ctx.arc(pts[i] * w, pts[i + 1] * h, r, 0, Math.PI * 2);
                ctx.fill();
            }
        };

        /* pins */
        var card = $('#tripCard');
        var pins = [];

        TRIPS.forEach(function (t, i) {
            var b = document.createElement('button');
            b.className = 'pin' + (t.home ? ' is-home' : '');
            b.style.animationDelay = (i * 0.35) + 's';
            b.setAttribute('aria-label', t.city + ', ' + t.country + ' — ' + t.when);
            b.innerHTML = '<span class="pin__dot"></span><span class="pin__label">' + t.city + '</span>';
            b.addEventListener('click', function () { open(i); });
            wrap.appendChild(b);
            pins.push(b);
        });

        /* Neighbouring cities (KL/Singapore, Jakarta/Bali) land within a few
           pixels of each other, which left the lower pin unclickable because
           its neighbour covered the hit area. Nudge overlapping pins apart —
           a few px of drift is invisible at this scale and keeps every pin
           reachable. */
        function layoutPins() {
            var w = wrap.clientWidth, h = wrap.clientHeight;
            if (!w || !h) return;
            var MIN = 21;                       // px between pin centres
            var pts = TRIPS.map(function (t) {
                var p = project(t.lon, t.lat);
                return { x: p.x * w, y: p.y * h };
            });

            for (var pass = 0; pass < 24; pass++) {
                var moved = false;
                for (var i = 0; i < pts.length; i++) {
                    for (var j = i + 1; j < pts.length; j++) {
                        var dx = pts[j].x - pts[i].x, dy = pts[j].y - pts[i].y;
                        var d = Math.sqrt(dx * dx + dy * dy);
                        if (d >= MIN) continue;
                        if (d < 0.001) { dx = 0.6; dy = -0.8; d = 1; }
                        var push = (MIN - d) / 2;
                        var ux = dx / d, uy = dy / d;
                        pts[i].x -= ux * push; pts[i].y -= uy * push;
                        pts[j].x += ux * push; pts[j].y += uy * push;
                        moved = true;
                    }
                }
                if (!moved) break;
            }

            pts.forEach(function (pt, i) {
                pins[i].style.left = Math.max(10, Math.min(w - 10, pt.x)) + 'px';
                pins[i].style.top  = Math.max(10, Math.min(h - 10, pt.y)) + 'px';
            });
        }

        function open(i) {
            var t = TRIPS[i];
            pins.forEach(function (p, n) { p.classList.toggle('is-active', n === i); });

            var route = t.legs.length
                ? '<ol class="route">' + t.legs.map(function (l) {
                      return '<li class="route__leg">' +
                                 '<span class="route__node" aria-hidden="true"></span>' +
                                 '<span class="route__d">' + l.d + '</span>' +
                                 '<span class="route__r">' + l.r + '</span>' +
                                 '<span class="route__f">' + l.f + '</span>' +
                                 '<span class="route__t">' + l.t + '</span>' +
                             '</li>';
                  }).join('') + '</ol>'
                : '<p class="route__none">every line on this map starts and ends here.</p>';

            card.innerHTML =
                '<div class="trip__head">' +
                    '<p class="trip__when">' + t.when + '</p>' +
                    '<h3 class="trip__place">' + t.city + '<span>' + t.country + '</span></h3>' +
                    '<p class="trip__note">' + t.note + '</p>' +
                '</div>' +
                route;

            card.classList.remove('is-shown');
            requestAnimationFrame(function () { card.classList.add('is-shown'); });
        }

        /* stats */
        var stats = $('#tripStats');
        if (stats) {
            var away = TRIPS.filter(function (t) { return !t.home; });
            var countries = {}, uniqueLegs = {};
            away.forEach(function (t) {
                countries[t.country] = 1;
                t.legs.forEach(function (l) { uniqueLegs[l.d + l.r] = 1; });
            });
            stats.innerHTML =
                '<div><p class="stat__n">' + away.length + '</p><p class="stat__l">cities</p></div>' +
                '<div><p class="stat__n">' + Object.keys(countries).length + '</p><p class="stat__l">countries</p></div>' +
                '<div><p class="stat__n">' + Object.keys(uniqueLegs).length + '</p><p class="stat__l">intl. legs</p></div>' +
                '<div><p class="stat__n">mostly</p><p class="stat__l">solo</p></div>';
        }

        var rt;
        function relayout() {
            clearTimeout(rt);
            rt = setTimeout(function () { drawMap(); layoutPins(); }, 140);
        }
        /* ResizeObserver catches container size changes that never fire a
           window resize (embedded webviews, some zoom paths); fall back to
           the window event where it's unavailable. */
        if ('ResizeObserver' in window) new ResizeObserver(relayout).observe(wrap);
        else window.addEventListener('resize', relayout);

        drawMap();
        layoutPins();
        open(TRIPS.length - 1);
    })();

    /* =====================================================================
       9. COMMAND PALETTE
       ===================================================================== */
    (function palette() {
        var box = $('#cmdk'), input = $('#cmdkInput'), list = $('#cmdkList'), opener = $('#cmdkOpen');
        if (!box || !input || !list || typeof box.showModal !== 'function') return;

        var ITEMS = [
            { icon: '◐', label: 'journey — work & campus', hint: 'section', go: function () { jump('#journey'); } },
            { icon: '◧', label: 'the rig — desk setup',    hint: 'section', go: function () { jump('#rig'); } },
            { icon: '◍', label: 'the map — travel',        hint: 'section', go: function () { jump('#travel'); } },
            { icon: '◔', label: 'off hours',               hint: 'section', go: function () { jump('#offhours'); } },
            { icon: '◈', label: 'connect',                 hint: 'section', go: function () { jump('#connect'); } },
            { icon: '✉', label: 'email me',                hint: 'link', go: function () { location.href = 'mailto:farrasnaim@outlook.com'; } },
            { icon: 'in', label: 'linkedin',               hint: 'link', go: function () { win('https://linkedin.com/in/farrasnaim'); } },
            { icon: '◎', label: 'instagram',               hint: 'link', go: function () { win('https://instagram.com/farrasnaim'); } },
            { icon: '♪', label: 'tiktok',                  hint: 'link', go: function () { win('https://www.tiktok.com/@farrasnaim'); } },
            { icon: '♫', label: 'spotify',                 hint: 'link', go: function () { win('https://open.spotify.com/user/farrasnaim'); } },
            { icon: '▶', label: 'twitch stream',           hint: 'link', go: function () { win('https://www.twitch.tv/rughseel'); } },
            { icon: '▷', label: 'youtube',                 hint: 'link', go: function () { win('https://www.youtube.com/@farrasnaim/streams'); } },
            { icon: '◑', label: 'toggle theme',            hint: 'action', go: function () { $('#themeToggle').click(); } },
            { icon: '⤒', label: 'back to top',             hint: 'action', go: function () { jump('#top'); } }
        ];

        function win(u) { window.open(u, '_blank', 'noopener'); }
        function jump(sel) {
            var el = $(sel);
            if (!el) return;
            /* move focus along with the scroll so keyboard and screen-reader
               users land in the section they picked */
            el.setAttribute('tabindex', '-1');
            el.focus({ preventScroll: true });
            el.scrollIntoView({ behavior: reduce.matches ? 'auto' : 'smooth', block: 'start' });
        }

        var shown = [], sel = 0;

        function render(q) {
            var needle = q.trim().toLowerCase();
            shown = ITEMS.filter(function (it) {
                return !needle || it.label.toLowerCase().indexOf(needle) > -1 || it.hint.indexOf(needle) > -1;
            });
            sel = 0;
            if (!shown.length) {
                list.innerHTML = '<p class="cmdk__empty">nothing matches that.</p>';
                input.removeAttribute('aria-activedescendant');
                return;
            }
            list.innerHTML = shown.map(function (it, i) {
                /* tabindex="-1": options are targeted via aria-activedescendant
                   from the input, so they must not be tab stops themselves */
                return '<button class="cmdk__item" role="option" tabindex="-1" id="cmdk-opt-' + i + '" aria-selected="' + (i === 0) + '" data-i="' + i + '">' +
                       '<i>' + it.icon + '</i>' + it.label + '<small>' + it.hint + '</small></button>';
            }).join('');
            input.setAttribute('aria-activedescendant', 'cmdk-opt-0');
            $$('.cmdk__item', list).forEach(function (b) {
                b.addEventListener('click', function () { run(+b.dataset.i); });
                b.addEventListener('mousemove', function () { mark(+b.dataset.i); });
            });
        }
        function mark(i) {
            if (i < 0 || i >= shown.length) return;
            sel = i;
            /* mirror the visual highlight for the combobox pattern — focus
               stays on the input, so SRs follow aria-activedescendant */
            input.setAttribute('aria-activedescendant', 'cmdk-opt-' + i);
            $$('.cmdk__item', list).forEach(function (b, n) { b.setAttribute('aria-selected', String(n === i)); });
        }
        function run(i) {
            var it = shown[i];
            close();
            if (it) setTimeout(it.go, 120);
        }
        /* showModal() supplies the modal contract: Tab containment, inert
           background, native Escape, and focus restore to the opener */
        function open() {
            if (box.open) return;
            box.showModal();
            input.value = '';
            render('');
            input.focus();
        }
        function close() { if (box.open) box.close(); }

        if (opener) opener.addEventListener('click', open);
        /* pointerdown, not click: a click's target resolves to the common
           ancestor when a drag starts in the input and releases on the
           backdrop, which used to dismiss the palette mid-text-selection */
        box.addEventListener('pointerdown', function (e) { if (e.target === box) close(); });
        input.addEventListener('input', function () { render(input.value); });

        input.addEventListener('keydown', function (e) {
            /* nothing to move through or run when the filter matched nothing */
            if (!shown.length && (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter')) { e.preventDefault(); return; }
            if (e.key === 'ArrowDown') { e.preventDefault(); mark(Math.min(sel + 1, shown.length - 1)); scrollSel(); }
            else if (e.key === 'ArrowUp') { e.preventDefault(); mark(Math.max(sel - 1, 0)); scrollSel(); }
            else if (e.key === 'Enter') { e.preventDefault(); run(sel); }
            else if (e.key === 'Escape') { close(); }
        });
        function scrollSel() {
            var el = list.children[sel];
            if (el && el.scrollIntoView) el.scrollIntoView({ block: 'nearest' });
        }

        document.addEventListener('keydown', function (e) {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                box.open ? close() : open();
            }
        });
    })();

    /* =====================================================================
       10. CURSOR SPOTLIGHT — fine pointers only
       ===================================================================== */
    (function spotlight() {
        var el = $('.spotlight');
        if (!el || reduce.matches) return;
        if (!window.matchMedia('(pointer: fine)').matches) return;
        document.body.classList.add('has-pointer');

        var x = 0, y = 0, cx = 0, cy = 0, raf = null;
        window.addEventListener('pointermove', function (e) {
            x = e.clientX; y = e.clientY;
            if (!raf) raf = requestAnimationFrame(loop);
        }, { passive: true });

        function loop() {
            cx += (x - cx) * 0.12;
            cy += (y - cy) * 0.12;
            el.style.transform = 'translate3d(' + (cx - 230) + 'px,' + (cy - 230) + 'px,0)';
            raf = (Math.abs(x - cx) > 0.5 || Math.abs(y - cy) > 0.5) ? requestAnimationFrame(loop) : null;
        }
    })();

    /* year */
    var yr = $('#yr'); if (yr) yr.textContent = new Date().getFullYear();

})();
