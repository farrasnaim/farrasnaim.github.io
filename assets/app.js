/* =========================================================================
   Farras Naim — interactive personal site
   Everything is progressive: the page reads fine with this file missing.
   ========================================================================= */
(function () {
    'use strict';

    /* Set to true to respect the visitor's prefers-reduced-motion setting.
       Left false on purpose: the animation is meant to run for everyone, so
       every `reduce.matches` check below reads false regardless of the OS.
       Flipping this back also needs the reduced-motion block in app.css
       un-commented — the two halves cover scripted and declarative motion. */
    var HONOR_REDUCED_MOTION = false;

    var reduce = HONOR_REDUCED_MOTION
        ? window.matchMedia('(prefers-reduced-motion: reduce)')
        : { matches: false };
    var $  = function (s, r) { return (r || document).querySelector(s); };
    var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

    /* --- LANGUAGE --------------------------------------------------------
       index.html (Indonesian) and en.html share this file; <html lang> decides
       which copy gets used. Anything translated is stored twice — English on
       the field, the Indonesian one on the same field suffixed `_id` — and
       read back through pick(). A missing translation falls through to the
       English string rather than rendering blank. */
    var LANG = (document.documentElement.lang || 'en').slice(0, 2).toLowerCase() === 'id' ? 'id' : 'en';
    function pick(obj, field) {
        if (LANG === 'id' && obj[field + '_id']) return obj[field + '_id'];
        return obj[field];
    }
    /* Interface strings that live in this file rather than the markup. */
    var UI = {
        en: {
            cities: 'cities', countries: 'countries', legs: 'intl. legs',
            mostly: 'mostly', solo: 'solo',
            noLegs: 'every line on this map starts and ends here.',
            noMatch: 'nothing matches that.',
            toLight: 'Switch to light theme', toDark: 'Switch to dark theme',
            section: 'section', link: 'link', action: 'action',
            pJourney: 'journey — work & campus', pWork: 'the work — day to day',
            pRig: 'the rig — desk setup', pMap: 'the map — travel',
            pHours: 'off hours', pConnect: 'connect', pEmail: 'email me',
            pTheme: 'toggle theme', pTop: 'back to top'
        },
        id: {
            cities: 'kota', countries: 'negara', legs: 'leg intl.',
            mostly: 'seringnya', solo: 'sendirian',
            noLegs: 'tiap rute garis di peta ini mulai dan berakhir di sini.',
            noMatch: 'ga ada hasil yang cocok.',
            toLight: 'Ganti ke tema terang', toDark: 'Ganti ke tema gelap',
            section: 'bagian', link: 'link', action: 'aksi',
            pJourney: 'perjalanan — kerja & kampus', pWork: 'kerjaan — rutinitas harian',
            pRig: 'the rig — setup meja', pMap: 'peta — jalan-jalan',
            pHours: 'waktu luang', pConnect: 'kontak', pEmail: 'email gua',
            pTheme: 'ganti tema', pTop: 'balik ke atas'
        }
    }[LANG];

    /* Contact address, assembled from the split parts on #emailLink so a
       harvestable "user@domain" string lives neither in the HTML nor in this
       file. app.js is deferred, so the DOM is ready by the time this runs. */
    var EMAIL = '';
    (function email() {
        var link = $('#emailLink');
        if (!link) return;
        EMAIL = (link.dataset.user || '') + '@' + (link.dataset.domain || '');
        link.href = 'mailto:' + EMAIL;
        var text = $('#emailText', link);
        if (text) text.textContent = EMAIL;
    })();

    /* =====================================================================
       CONTENT YOU'LL WANT TO EDIT
       ===================================================================== */

    /* --- THE RIG ---------------------------------------------------------
       Real parts. `part` must match the data-part attribute on the SVG.
       `name` and `spec` are product names and numbers, so they stay put in
       both languages; only `label` and `why` carry an `_id` translation.   */
    var RIG = [
        { part: 'pc', label: 'tower', label_id: 'tower', name: 'the main PC', spec: 'i7-14700F · RTX 5060 8GB · 32GB DDR4 · 1TB NVMe',
          why: 'a 20-core i7-14700F next to a mid-range RTX 5060, which looks unbalanced until I remember that not a single office task touches this machine. <strong>work stays on the work laptop—BYOD here stops at a phone and an iPad</strong>, so this machine has exactly one job description: games, streams, and whatever I decide to reinstall at 1am. a 360mm AIO inside a darkFlash C280 keeps temperatures calm through gaming and multistreaming to several platforms.',
          why_id: 'i7-14700F 20-core disandingin sama RTX 5060 kelas menengah, yang keliatan ga seimbang sampe gua nyadar ga ada satu pun kerjaan kantor yang nyentuh mesin ini. <strong>kerjaan tetep di laptop kantor — BYOD di sini mentok di hp sama iPad</strong>, jadi mesin ini job desc-nya cuma satu: nge-game, stream, sama jalanin apa pun yang pengen gua install ulang jam 1 pagi. AIO 360mm di dalem darkFlash C280 bikin suhunya tetep anteng dibawa main game sambil multistream ke beberapa platform.' },

        { part: 'monitor', label: 'display', label_id: 'layar', name: 'ASUS ROG Strix XG27WCS', spec: '27" QHD · 180 Hz · on an Oximus dual arm',
          why: '2K at 27" over 4K for a simple reason—<strong>at this size, the extra pixels from 4K are not worth the frame rate they cost</strong>. I spend far more time looking at spreadsheets than game textures. 180Hz is purely for valorant. it sits on a dual monitor arm because desk space is worth more than the stand it came with.',
          why_id: 'gua milih 2K di 27" ketimbang 4K dengan alasan jelas — <strong>di ukuran segini, tambahan pixel dari 4K nggak sebanding sama frame rate yang harus dikorbanin</strong>, dan gua jauh lebih sering mantengin spreadsheet daripada ngeliatin tekstur game. 180Hz itu murni alesan khusus buat main valorant. monitor ini nangkring di dual monitor arm karena space di atas meja jauh lebih berharga daripada stand bawaannya.' },

        { part: 'keyboard', label: 'keyboard', label_id: 'keyboard', name: 'iLovBee B87', spec: 'TKL · tri-mode wireless · RGB',
          why: 'tenkeyless (TKL) so the mouse sits closer to my shoulder. <strong>a numpad I only use twice a month is not worth the wrist angle</strong>, and tri-mode makes it easy to connect the same keyboard straight to the ThinkPad while I work.',
          why_id: 'pakai tenkeyless (TKL) biar posisi mouse-nya lebih deket ke bahu. <strong>numpad yang cuma gua pake dua kali sebulan ga sebanding sama pegelnya sudut pergelangan tangan</strong>, dan fitur tri-mode ngebantu banget biar keyboard yang sama bisa langsung diconnect ke ThinkPad pas lagi kerja.' },

        { part: 'mouse', label: 'mouse', label_id: 'mouse', name: 'LAMZU MAYA X', spec: 'wireless · 8K polling · Artisan Ninja FX Raiden',
          why: 'an expensive mouse on an expensive mousepad, and my aim is still terrible. the LAMZU is genuinely light, and the Artisan is a control-speed mousepad used by plenty of pro players. <strong>none of it can save aim that was always destined to miss</strong>—valorant and CS2 have made that clear to me again and again. the problem is not the gear anymore. it is purely a skill issue, and I have made peace with that.',
          why_id: 'mouse mahal di atas mousepad mahal, dan aim gua tetep ampas. LAMZU-nya beneran enteng, dan Artisan itu mousepad control-speed banyak dipake pro player. <strong>tapi semua itu tetep ga bisa nyelametin aim yang emang dari awal ditakdirin meleset</strong> — valorant sama CS2 udah ngebuktiin ke gua soal ini berkali-kali. masalahnya emang udah bukan di gear lagi. ini murni skill issue dan gua udah berdamai sama fakta itu.' },

        { part: 'audio', label: 'audio', label_id: 'audio', name: 'Sony WH-1000XM6 + 7Hz G1', spec: 'wireless ANC over-ears · wired IEMs',
          why: 'noise cancelling is the main feature, and honestly, not really for music. <strong>an open-plan office and a laptop fan are the two things I most want to block out</strong>, and the XM6 still sounds good during calls. the 7Hz G1 handles the rest: wired IEMs for when I want to hear footsteps in a game, not just audio tuned to sound nice. both sit on top of the tower so they have one dedicated, tidy place.',
          why_id: 'noise cancelling itu fitur utamanya, dan jujur bukan buat dengerin musik. <strong>suara hiruk-pikuk gedung kantor open-plan sama kipas laptop itu dua hal yang paling pengen gua block</strong>, dan XM6 masih kedengeran enak di tengah call. 7Hz G1 ngeberesin sisanya: IEM kabel buat momen pas gua pengen denger step di game, bukan sekedar suara yang di-tuning biar enak. dua-duanya sengaja ditaro di atas tower biar ada satu tempat khusus yang rapi.' },

        { part: 'laptop', label: 'work laptop', label_id: 'laptop kerja', name: 'ThinkPad T14 Gen 3', spec: 'i7-1265U · 32GB · since 2022',
          why: 'the machine that has been with me since I joined EY in 2022, and the one that has taken the most abuse. <strong>32GB of RAM is the only reason Excel workbooks with millions of rows can still open</strong>—the CPU is a power-efficient U-series chip, so the RAM is what saves me from crashing while I am processing data, even if it still goes not responding at 2am. this machine draws the sacred line on the desk: the tower is mine; this one is for making money.',
          why_id: 'mesin yang udah nemenin gua dari awal masuk EY tahun 2022, dan yang paling banyak disiksa. <strong>RAM 32GB itu satu-satunya alasan workbook Excel jutaan baris masih kuat kebuka</strong> — CPU-nya pake chip U-series yang hemat daya, jadi RAMnya yang nyelametin si ThinkPad dari crash pas lagi asik ngolah data, walaupun masih sering not responding di jam 2 pagi. mesin ini ngebatesin batas suci meja: tower-nya punya gua, si ThinkPad buat nyari duit.' },

        { part: 'cam', label: 'webcam', label_id: 'webcam', name: 'Streamplify CAM PRO', spec: '4K · fixed on the bezel',
          why: 'a camera that keeps getting called good when I am streaming or turn it on. I did not buy it to look cinematic; <strong>it turns out having a webcam that does not make your face look like a victim of 2020 Zoom is worth it.</strong>',
          why_id: 'kamera yang berkali-kali dibilang bagus pas stream atau lagi nyalain kamera. gua beli ini bukan karena pengen keliatan cinematic; <strong>ternyata punya webcam yang bikin muka nggak keliatan kayak korban Zoom tahun 2020 itu cukup worth it.</strong>' },

        { part: 'mic', label: 'microphone', label_id: 'mikrofon', name: 'Thronmax Rosa Mdrill Zero+', spec: 'USB condenser · own stand',
          why: 'the one thing I would tell people to buy first. <strong>headset mics tend to be a compromise, and everyone on the call can hear how bad yours sounds except you</strong>—good audio makes streams nicer to watch, and people on calls do not have to work to hear me. it sits on its own stand to the left.',
          why_id: 'satu-satunya barang yang bakal gua suruh orang beli duluan. <strong>mic bawaan headset itu suka nanggung, dan semua orang di call bisa denger betapa jeleknya suara lo, kecuali lo sendiri</strong> — audio yang bagus bikin stream lebih enak ditonton, dan orang di call nggak perlu capek dengerin suara gua. posisinya di sebelah kiri pake stand sendiri.' }
    ];

    /* --- TRAVEL ----------------------------------------------------------
       International legs only, taken straight from the flight log.
       lat/lon place the pin; `legs` are real flights; `note` is yours to
       rewrite — everything else here is data rather than recollection.   */
    var TRIPS = [
        { city: 'Jakarta', country: 'Indonesia', lat: -6.21, lon: 106.85, when: 'home base', when_id: 'markas', home: true,
          note: 'home. every line on this map leaves from here and comes back to here, usually at an hour that made a lot more sense when I booked it. the plan is for a lot more lines — the US first, since I have been watching their shows since I was sixteen, then Europe.',
          note_id: 'rumah. tiap garis di peta ini berangkat dari sini dan balik lagi ke sini, biasanya di jam yang kedengerannya jauh lebih masuk akal pas awal gua booking. rencananya pengen nambahin lebih banyak garis — US jadi target utama, soalnya gua udah nonton TV show mereka dari umur 16, baru abis itu Eropa.',
          legs: [] },

        { city: 'Cairo', country: 'Egypt', lat: 30.04, lon: 31.24, when: 'apr 2025',
          note: 'the longest single leg I have flown - over eleven hours one way. we stopped here to see The Pyramid before continuing to Saudi Arabia for Umrah. standing in front of it is still one of the closest moments I have had to "I cannot believe this is real" - honestly, it is not just Egypt; it is the realisation that a place you have only seen in photos actually exists in physical form, that huge.',
          note_id: 'rute tunggal terpanjang yang pernah gua terbangin — sebelas jam lebih sekali jalan. kita mampir ke sini buat liat The Pyramid sebelum lanjut ke Arab Saudi buat Umrah. berdiri di depannya masih jadi salah satu momen paling dekat dengan rasa "nggak mungkin ini beneran ada" — jujur ini bukan cuma soal Mesirnya, tapi soal realisasi pas tempat yang selama ini cuma lo liat di foto ternyata beneran ada wujud fisiknya segede itu.',
          legs: [ { d: '2 apr 2025', r: 'CGK → CAI', f: 'EgyptAir · MS 978 · B789', t: '11h 18m' },
                  { d: '3 apr 2025', r: 'CAI → JED', f: 'EgyptAir · MS 665 · A333', t: '2h 07m' } ] },

        { city: 'Jeddah', country: 'Saudi Arabia', lat: 21.49, lon: 39.19, when: 'apr 2025',
          note: 'Umrah with my brothers — the same classmates I spent four years of campus with. most people here save for years and go with family, so a group of university friends pulling it off together caught everyone off guard, us very much included. nine days on the ground between landing from Cairo and flying back out, still the longest I have stayed anywhere abroad.',
          note_id: 'Umrah bareng my brothers — circle temen sekelas yang sama yang nemenin gua selama empat tahun kuliah. kebanyakan orang ke sini harus nabung bertahun-tahun dan berangkatnya sama keluarga, jadi pas kita bisa berangkat segerombolan bareng temen kuliah, banyak orang yang kaget, termasuk kita sendiri. sembilan hari di sana dihitung dari mendarat dari Mesir sampe terbang balik, dan ini masih jadi durasi paling lama gua tinggal di luar negeri.',
          legs: [ { d: '3 apr 2025',  r: 'CAI → JED', f: 'EgyptAir · MS 665 · A333',  t: '2h 07m' },
                  { d: '12 apr 2025', r: 'JED → DOH', f: 'Qatar Airways · QR 1185 · A333', t: '1h 59m' } ] },

        { city: 'Doha', country: 'Qatar', lat: 25.29, lon: 51.53, when: 'apr 2025',
          note: 'technically a connection, but I cleared immigration and got a room by the airport — a few hours of sleep and a shower before the Bangkok leg. the window looked straight out at a client whose systems I\'d been buried in not long before, on one of the hardest stretches I\'ve worked. six thousand kilometres from my desk and there it was, still looking back.',
          note_id: 'secara teknis cuma transit, tapi gua sempet keluar imigrasi dan sewa hotel deket bandara — tidur beberapa jam sama mandi sebelum lanjut penerbangan ke Bangkok. jendelanya ngadep lurus ke kantor klien yang baru gua tangani nggak lama sebelumnya, di salah satu periode paling berat yang pernah gua jalanin. enam ribu kilometer jauhnya dari meja gua, dan gedung itu ada di situ, seakan ngeliatin gua balik.',
          legs: [ { d: '12 apr 2025', r: 'JED → DOH', f: 'Qatar Airways · QR 1185 · A333', t: '1h 59m' },
                  { d: '12 apr 2025', r: 'DOH → BKK', f: 'Qatar Airways · QR 838 · B77W',  t: '6h 12m' } ] },

        { city: 'Bangkok', country: 'Thailand', lat: 13.76, lon: 100.50, when: 'nov 2024 · apr 2025',
          note: 'the only city on this map I have been to twice - and the one that nearly made me miss a flight. arrived from Doha at 9am, got a hotel near the airport for a shower and a short sleep before the evening flight home, then forgot to set an alarm. woke at 4pm for a flight I should have been boarding at 6. one full minute of panic just sitting on the edge of the bed, then I checked the airport information system and thankfully saw it had been delayed to 9pm. packed in ninety seconds, left the lunch I had ordered through GrabFood at reception, then took a GrabBike while the driver sped through traffic. the shower happened at the airport instead.',
          note_id: 'satu-satunya kota di map ini yang gua datengin dua kali — dan yang hampir bikin gua ketinggalan pesawat. nyampe dari Doha jam 9 pagi, ambil hotel deket bandara buat mandi sama tidur bentar sebelum nunggu penerbangan malem ke rumah, terus lupa pasang alarm. kebangun jam 4 sore buat jadwal yang seharusnya gua boarding jam 6. satu menit full panik cuma duduk di pinggir kasur, terus ngecek info bandara yang untungnya bilang delay ke jam 9 malem. packing dalam sembilan puluh detik, ninggalin makan siang di resepsionis yang gua pesen di GrabFood buat makan siang, terus naik GrabBike sambil dibawa ngebut sama abang drivernya. mandinya malah di bandara.',
          legs: [ { d: '28 nov 2024', r: 'CGK → DMK', f: 'Thai Lion Air · SL 117 · B738',  t: '3h 21m' },
                  { d: '1 dec 2024',  r: 'DMK → CGK', f: 'Indonesia AirAsia · QZ 253 · A320',  t: '3h 25m' },
                  { d: '12 apr 2025', r: 'DOH → BKK', f: 'Qatar Airways · QR 838 · B77W',  t: '6h 12m' },
                  { d: '13 apr 2025', r: 'DMK → CGK', f: 'Batik Air · ID 7630 · A320', t: '3h 26m' } ] },

        { city: 'Kuala Lumpur', country: 'Malaysia', lat: 3.14, lon: 101.69, when: 'jun 2024 · nov 2025',
          note: 'where the solo travelling actually started. a two-night trial run in 2024, mostly to find out whether I could handle myself somewhere the language, the food and the unwritten rules were all slightly different. turned out the answer was just: "you have done new before, you will do new again". back in 2025 as the first stop of a two-country loop.',
          note_id: 'tempat solo traveling gua beneran dimulai. trial dua malem di 2024, intinya cuma buat nyari tau apakah gua bisa survive sendiri di tempat yang bahasa, makanan, sama aturan ga tertulisnya rada beda. ternyata jawabannya lebih gampang dari yang gua kira: gua pernah ngadepin hal baru sebelumnya, jadi kemungkinan besar gua bakal bisa lagi sekarang. balik lagi ke sini di 2025 sebagai perhentian pertama buat trip loop dua negara.',
          legs: [ { d: '14 jun 2024', r: 'CGK → KUL', f: 'TransNusa · 8B 673 · A320', t: '2h 05m' },
                  { d: '16 jun 2024', r: 'KUL → CGK', f: 'TransNusa · 8B 680 · A320', t: '2h 15m' },
                  { d: '6 nov 2025',  r: 'CGK → KUL', f: 'TransNusa · 8B 675 · A321',      t: '2h 18m' },
                  { d: '9 nov 2025',  r: 'KUL → SGN', f: 'Malaysia Airlines · MH 758 · B738',      t: '2h 55m' } ] },

        { city: 'Ho Chi Minh City', country: 'Vietnam', lat: 10.82, lon: 106.63, when: 'nov 2025',
          note: 'the second half of that two-country trip, and the most recent stamp in my passport. I was still amazed by how cheap everyday necessities were there, to the point that I felt like a foreigner holidaying in Bali.',
          note_id: 'separuh kedua dari trip dua negara tadi, dan jadi cap paling baru di dalem paspor gua. masih terkagum-kagum sama murahnya kebutuhan harian di sana sampai gua berasa kayak bule yang lagi liburan di Bali.',
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
            btn.setAttribute('aria-label', t === 'dark' ? UI.toLight : UI.toDark);
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

        /* The word swap is content rather than decoration, so it runs either
           way; only the cross-fade would be dropped if reduced motion were
           being honoured. Gating the whole rotation on it made the line look
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
       6b. STORY ASIDES — expandable detail in the work section
       ===================================================================== */
    (function story() {
        $$('.story__aside').forEach(function (aside) {
            var btn = $('.story__toggle', aside);
            var more = $('.story__more', aside);
            if (!btn || !more) return;
            var id = 'st-' + Math.random().toString(36).slice(2, 8);
            more.id = id;
            btn.setAttribute('aria-controls', id);
            btn.addEventListener('click', function () {
                var open = aside.classList.toggle('is-open');
                btn.setAttribute('aria-expanded', String(open));
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
                '<p class="rig__kicker">' + pick(d, 'label') + '</p>' +
                '<h3 class="rig__name">' + d.name + '</h3>' +
                '<p class="rig__spec">' + d.spec + '</p>' +
                '<p class="rig__why">' + pick(d, 'why') + '</p>';
            card.classList.remove('is-shown');
            requestAnimationFrame(function () { card.classList.add('is-shown'); });
        }

        RIG.forEach(function (d) {
            var b = document.createElement('button');
            b.className = 'rig__listBtn';
            b.dataset.part = d.part;
            b.textContent = pick(d, 'label');
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
            b.setAttribute('aria-label', t.city + ', ' + t.country + ' — ' + pick(t, 'when'));
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
                : '<p class="route__none">' + UI.noLegs + '</p>';

            card.innerHTML =
                '<div class="trip__head">' +
                    '<p class="trip__when">' + pick(t, 'when') + '</p>' +
                    '<h3 class="trip__place">' + t.city + '<span>' + t.country + '</span></h3>' +
                    '<p class="trip__note">' + pick(t, 'note') + '</p>' +
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
                '<div><p class="stat__n">' + away.length + '</p><p class="stat__l">' + UI.cities + '</p></div>' +
                '<div><p class="stat__n">' + Object.keys(countries).length + '</p><p class="stat__l">' + UI.countries + '</p></div>' +
                '<div><p class="stat__n">' + Object.keys(uniqueLegs).length + '</p><p class="stat__l">' + UI.legs + '</p></div>' +
                '<div><p class="stat__n">' + UI.mostly + '</p><p class="stat__l">' + UI.solo + '</p></div>';
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
            { icon: '◐', label: UI.pJourney, hint: UI.section, go: function () { jump('#journey'); } },
            { icon: '◒', label: UI.pWork,    hint: UI.section, go: function () { jump('#work'); } },
            { icon: '◧', label: UI.pRig,     hint: UI.section, go: function () { jump('#rig'); } },
            { icon: '◍', label: UI.pMap,     hint: UI.section, go: function () { jump('#travel'); } },
            { icon: '◔', label: UI.pHours,   hint: UI.section, go: function () { jump('#offhours'); } },
            { icon: '◈', label: UI.pConnect, hint: UI.section, go: function () { jump('#connect'); } },
            { icon: '✉', label: UI.pEmail,   hint: UI.link, go: function () { if (EMAIL) location.href = 'mailto:' + EMAIL; } },
            { icon: 'in', label: 'linkedin',  hint: UI.link, go: function () { win('https://linkedin.com/in/farrasnaim'); } },
            { icon: '◎', label: 'instagram',  hint: UI.link, go: function () { win('https://instagram.com/farrasnaim'); } },
            { icon: '♪', label: 'tiktok',     hint: UI.link, go: function () { win('https://www.tiktok.com/@farrasnaim'); } },
            { icon: '♫', label: 'spotify',    hint: UI.link, go: function () { win('https://open.spotify.com/user/farrasnaim'); } },
            { icon: '▶', label: 'twitch stream', hint: UI.link, go: function () { win('https://www.twitch.tv/rughseel'); } },
            { icon: '▷', label: 'youtube',    hint: UI.link, go: function () { win('https://www.youtube.com/@farrasnaim/streams'); } },
            { icon: '◑', label: UI.pTheme,   hint: UI.action, go: function () { $('#themeToggle').click(); } },
            { icon: '⤒', label: UI.pTop,     hint: UI.action, go: function () { jump('#top'); } }
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
                list.innerHTML = '<p class="cmdk__empty">' + UI.noMatch + '</p>';
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
