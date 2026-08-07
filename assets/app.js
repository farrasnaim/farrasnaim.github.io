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
       PLACEHOLDER DATA. Swap `spec` and `why` for your real setup.
       `part` must match the data-part attribute on the SVG group.        */
    var RIG = [
        { part: 'pc', label: 'desktop', name: 'the tower', spec: 'ryzen 7 · 32 GB · nvme',
          why: 'built it myself, mostly so I would know exactly what to blame. <strong>32 GB is the part I would not cut</strong> — running a VM, a browser with forty tabs of working papers and a game in the background is a normal tuesday.' },

        { part: 'monitor', label: 'monitor', name: 'the panel', spec: '27" · 1440p · 165 Hz',
          why: '1440p over 4K on purpose. at this size the extra pixels cost more frames than they add clarity, and <strong>I stare at spreadsheets more than I stare at textures</strong>. the high refresh is for valorant; the panel size is for having two documents side by side without squinting.' },

        { part: 'keyboard', label: 'keyboard', name: 'the board', spec: 'tkl · tactile switches',
          why: 'tenkeyless so the mouse sits closer to my shoulder — <strong>a numpad I use twice a month is not worth the wrist angle</strong>. tactile rather than clicky because I share calls with people who did not consent to my hobby.' },

        { part: 'mouse', label: 'mouse', name: 'the mouse', spec: 'lightweight · wireless',
          why: 'light matters more than dpi. <strong>nobody has ever lost a duel because their sensor was 6000 dpi instead of 8000</strong>, but everybody has lost one dragging a brick across a mousepad. wireless purely so there is one less cable to route.' },

        { part: 'audio', label: 'audio', name: 'the headphones', spec: 'open-back · desk mic',
          why: 'open-back means I can hear footsteps and the doorbell. <strong>the mic is a separate device on purpose</strong> — headset mics are a compromise on both halves, and streaming makes the difference obvious to everyone but me.' },

        { part: 'network', label: 'network', name: 'the network', spec: 'mesh · wired backhaul',
          why: 'the one thing I actually over-engineered. <strong>wired backhaul instead of pure wireless mesh</strong>, because packet loss in a ranked game is indistinguishable from being bad at the game, and I need to be able to rule it out.' },

        { part: 'desk', label: 'workspace', name: 'the desk', spec: 'standing · cable tray',
          why: 'sit-stand, though I would be lying if I said the stand half sees much use. <strong>the cable tray is the real upgrade</strong> — the desk being clear is the difference between opening the laptop and finding a reason not to.' }
    ];

    /* --- TRAVEL ----------------------------------------------------------
       PLACEHOLDER TRIPS. Replace with your real ones.
       lat/lon place the pin; `shots` are colour pairs for the photo blocks
       until you drop real images in (swap `shot.style.background` below). */
    var TRIPS = [
        { city: 'Jakarta', country: 'Indonesia', lat: -6.21, lon: 106.85, when: 'home base', home: true,
          note: 'where everything starts and ends. the airport I know well enough to cut it fine.',
          loved: ['warung at 2am', 'the drive home', 'nothing to plan'],
          shots: ['#3a1f1f', '#241a2e', '#1b2a33'] },

        { city: 'Bali', country: 'Indonesia', lat: -8.65, lon: 115.22, when: 'mar 2023',
          note: 'went for four days, spent three of them on a scooter with no particular destination.',
          loved: ['the ride to nowhere', 'coffee with a view', 'nobody asking where I was'],
          shots: ['#1f3a2e', '#2e2a1a', '#1b2633'] },

        { city: 'Singapore', country: 'Singapore', lat: 1.35, lon: 103.82, when: 'aug 2023',
          note: 'the easiest first solo trip there is. everything works, which is its own kind of holiday.',
          loved: ['hawker centres', 'the MRT', 'walking until my feet gave out'],
          shots: ['#2a1f3a', '#1a2e2a', '#331b1b'] },

        { city: 'Bangkok', country: 'Thailand', lat: 13.76, lon: 100.50, when: 'jan 2024',
          note: 'loud in the best way. got lost twice and both times it improved the day.',
          loved: ['street food at midnight', 'the river boats', 'the noise'],
          shots: ['#3a2a1f', '#1f2a3a', '#2e1a24'] },

        { city: 'Kuala Lumpur', country: 'Malaysia', lat: 3.14, lon: 101.69, when: 'jun 2024',
          note: 'a long weekend that was mostly an excuse to eat. no regrets, no itinerary.',
          loved: ['the food courts', 'cheap flights', 'a hotel with a view'],
          shots: ['#1f2e3a', '#331f2a', '#26331b'] },

        { city: 'Seoul', country: 'South Korea', lat: 37.57, lon: 126.98, when: 'oct 2024',
          note: 'first properly cold trip. underestimated the walking, overestimated my jacket.',
          loved: ['convenience stores', 'the subway', 'autumn actually existing'],
          shots: ['#2a2a3a', '#3a1f2a', '#1b3327'] },

        { city: 'Tokyo', country: 'Japan', lat: 35.68, lon: 139.69, when: 'apr 2025',
          note: 'the one that reset the bar. a week alone and I never once felt like I was alone badly.',
          loved: ['trains that mean it', 'tiny bars', 'vending machine coffee'],
          shots: ['#3a1f2e', '#1f3339', '#2e2a1f'] }
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
       1. THEME
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
            btn.setAttribute('aria-pressed', String(t === 'dark'));
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
       2. REVEAL ON SCROLL — reveals once, never hides again
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
        if (!el || reduce.matches) return;
        var words = (el.dataset.words || '').split(',').filter(Boolean);
        if (words.length < 2) return;
        var i = 0;

        el.style.transition = 'opacity .32s ease';
        setInterval(function () {
            if (document.hidden) return;
            el.style.opacity = '0';
            setTimeout(function () {
                i = (i + 1) % words.length;
                el.textContent = words[i];
                el.style.opacity = '1';
            }, 320);
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
            card.addEventListener('click', function () {
                var open = card.classList.toggle('is-open');
                card.setAttribute('aria-expanded', String(open));
            });
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
        panel.insertBefore(card, list);

        function show(part) {
            var d = RIG.filter(function (x) { return x.part === part; })[0];
            if (!d) return;
            groups.forEach(function (g) { g.classList.toggle('is-active', g.dataset.part === part); });
            $$('.rig__listBtn', list).forEach(function (b) { b.classList.toggle('is-active', b.dataset.part === part); });
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
            b.addEventListener('click', function () { show(d.part); });
            list.appendChild(b);
        });

        groups.forEach(function (g) {
            var part = g.dataset.part;
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

            for (var lat = LAT_TOP; lat >= LAT_BOT; lat -= step) {
                for (var lon = -180; lon <= 180; lon += step) {
                    if (!isLand(lon, lat)) continue;
                    var p = project(lon, lat);
                    ctx.beginPath();
                    ctx.arc(p.x * w, p.y * h, r, 0, Math.PI * 2);
                    ctx.fill();
                }
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

            card.innerHTML =
                '<div class="trip__shots">' +
                    t.shots.map(function (c, n) {
                        return '<div class="shot" style="background:linear-gradient(145deg,' + c + ',var(--bg-deep))">' +
                               (n === 0 ? 'photo — add yours' : 'photo') + '</div>';
                    }).join('') +
                '</div>' +
                '<div>' +
                    '<p class="trip__when">' + t.when + '</p>' +
                    '<h3 class="trip__place">' + t.city + ', ' + t.country + '</h3>' +
                    '<p class="trip__note">' + t.note + '</p>' +
                    '<div class="trip__loved">' +
                        '<p class="trip__lovedT">what stuck</p>' +
                        '<ul>' + t.loved.map(function (l) { return '<li class="tag">' + l + '</li>'; }).join('') + '</ul>' +
                    '</div>' +
                '</div>';

            card.classList.remove('is-shown');
            requestAnimationFrame(function () { card.classList.add('is-shown'); });
        }

        /* stats */
        var stats = $('#tripStats');
        if (stats) {
            var countries = {};
            TRIPS.forEach(function (t) { countries[t.country] = 1; });
            stats.innerHTML =
                '<div><p class="stat__n">' + TRIPS.length + '</p><p class="stat__l">cities</p></div>' +
                '<div><p class="stat__n">' + Object.keys(countries).length + '</p><p class="stat__l">countries</p></div>' +
                '<div><p class="stat__n">100%</p><p class="stat__l">solo</p></div>';
        }

        var rt;
        window.addEventListener('resize', function () {
            clearTimeout(rt);
            rt = setTimeout(function () { drawMap(); layoutPins(); }, 140);
        });

        drawMap();
        layoutPins();
        open(TRIPS.length - 1);
    })();

    /* =====================================================================
       9. COMMAND PALETTE
       ===================================================================== */
    (function palette() {
        var box = $('#cmdk'), input = $('#cmdkInput'), list = $('#cmdkList'), opener = $('#cmdkOpen');
        if (!box || !input || !list) return;
        box.removeAttribute('hidden');

        var ITEMS = [
            { icon: '◐', label: 'Journey — work & campus', hint: 'section', go: function () { jump('#journey'); } },
            { icon: '◧', label: 'The rig — desk setup',    hint: 'section', go: function () { jump('#rig'); } },
            { icon: '◍', label: 'The map — travel',        hint: 'section', go: function () { jump('#travel'); } },
            { icon: '◔', label: 'Off hours',               hint: 'section', go: function () { jump('#offhours'); } },
            { icon: '◈', label: 'Connect',                 hint: 'section', go: function () { jump('#connect'); } },
            { icon: '✉', label: 'Email me',                hint: 'link', go: function () { location.href = 'mailto:farrasnaim@outlook.com'; } },
            { icon: 'in', label: 'LinkedIn',               hint: 'link', go: function () { win('https://linkedin.com/in/farrasnaim'); } },
            { icon: '◎', label: 'Instagram',               hint: 'link', go: function () { win('https://instagram.com/farrasnaim'); } },
            { icon: '♪', label: 'TikTok',                  hint: 'link', go: function () { win('https://www.tiktok.com/@farrasnaim'); } },
            { icon: '♫', label: 'Spotify',                 hint: 'link', go: function () { win('https://open.spotify.com/user/farrasnaim'); } },
            { icon: '▶', label: 'Twitch stream',           hint: 'link', go: function () { win('https://www.twitch.tv/rughseel'); } },
            { icon: '▷', label: 'YouTube',                 hint: 'link', go: function () { win('https://www.youtube.com/@farrasnaim/streams'); } },
            { icon: '◑', label: 'Toggle theme',            hint: 'action', go: function () { $('#themeToggle').click(); } },
            { icon: '⤒', label: 'Back to top',             hint: 'action', go: function () { jump('#top'); } }
        ];

        function win(u) { window.open(u, '_blank', 'noopener'); }
        function jump(sel) {
            var el = $(sel);
            if (el) el.scrollIntoView({ behavior: reduce.matches ? 'auto' : 'smooth', block: 'start' });
        }

        var shown = [], sel = 0;

        function render(q) {
            var needle = q.trim().toLowerCase();
            shown = ITEMS.filter(function (it) {
                return !needle || it.label.toLowerCase().indexOf(needle) > -1 || it.hint.indexOf(needle) > -1;
            });
            sel = 0;
            if (!shown.length) { list.innerHTML = '<p class="cmdk__empty">nothing matches that.</p>'; return; }
            list.innerHTML = shown.map(function (it, i) {
                return '<button class="cmdk__item" role="option" aria-selected="' + (i === 0) + '" data-i="' + i + '">' +
                       '<i>' + it.icon + '</i>' + it.label + '<small>' + it.hint + '</small></button>';
            }).join('');
            $$('.cmdk__item', list).forEach(function (b) {
                b.addEventListener('click', function () { run(+b.dataset.i); });
                b.addEventListener('mousemove', function () { mark(+b.dataset.i); });
            });
        }
        function mark(i) {
            sel = i;
            $$('.cmdk__item', list).forEach(function (b, n) { b.setAttribute('aria-selected', String(n === i)); });
        }
        function run(i) {
            var it = shown[i];
            close();
            if (it) setTimeout(it.go, 120);
        }
        function open() {
            box.classList.add('is-open');
            input.value = '';
            render('');
            setTimeout(function () { input.focus(); }, 40);
        }
        function close() { box.classList.remove('is-open'); }

        if (opener) opener.addEventListener('click', open);
        box.addEventListener('click', function (e) { if (e.target === box) close(); });
        input.addEventListener('input', function () { render(input.value); });

        input.addEventListener('keydown', function (e) {
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
                box.classList.contains('is-open') ? close() : open();
            } else if (e.key === 'Escape' && box.classList.contains('is-open')) {
                close();
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
