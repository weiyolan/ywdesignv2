/* ============================================================
   YWdesign — animation + interaction engine (vanilla)
   ============================================================ */
(function(){
  "use strict";
  var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  function motionOff(){ return document.body.getAttribute('data-motion') === 'off' || reduced; }

  /* ---------- nav scrolled ---------- */
  var nav = document.getElementById('nav') || document.querySelector('.detail-nav');
  if(nav){
    var onScroll = function(){ nav.classList.toggle('scrolled', window.scrollY > 20); };
    onScroll(); window.addEventListener('scroll', onScroll, {passive:true});
  }

  /* ---------- mobile nav drawer ---------- */
  var burger = document.getElementById('nav-burger');
  var drawer = document.getElementById('nav-drawer');
  var scrim  = document.getElementById('nav-scrim');
  if(burger && drawer){
    var openNav = function(){
      document.body.classList.add('nav-open');
      burger.setAttribute('aria-expanded','true');
      drawer.setAttribute('aria-hidden','false');
      if(scrim) scrim.hidden = false;
    };
    var closeNav = function(){
      document.body.classList.remove('nav-open');
      burger.setAttribute('aria-expanded','false');
      drawer.setAttribute('aria-hidden','true');
      if(scrim) setTimeout(function(){ if(!document.body.classList.contains('nav-open')) scrim.hidden = true; }, 360);
    };
    burger.addEventListener('click', function(){
      document.body.classList.contains('nav-open') ? closeNav() : openNav();
    });
    if(scrim) scrim.addEventListener('click', closeNav);
    drawer.querySelectorAll('[data-mclose]').forEach(function(a){ a.addEventListener('click', closeNav); });
    document.addEventListener('keydown', function(e){ if(e.key === 'Escape') closeNav(); });
    window.addEventListener('resize', function(){ if(window.innerWidth > 900) closeNav(); });
  }

  /* ---------- tech strip ---------- */
  (function(){
    var items = ["Next.js","React","TypeScript","Tailwind","Sanity CMS","Node.js","Stripe",
                 "Framer Motion","GraphQL","Vercel","Headless","i18n","SEO","Web Performance","AI-assisted"];
    var track = document.getElementById('strip');
    if(!track) return;
    function row(){ return items.map(function(t){ return '<span class="strip-item">'+t+'</span>'; }).join(''); }
    track.innerHTML = row() + row();
  })();

  /* ---------- text scramble ---------- */
  var GLYPHS = '!<>-_\\/[]{}=+*^?#__01010';
  function scramble(el){
    if(el.dataset.done) return;
    el.dataset.done = '1';
    var finalText = el.textContent;
    if(motionOff()){ return; }
    var chars = finalText.split('');
    var resolveAt = chars.map(function(c){
      return /\s|\u00a0/.test(c) ? 0 : Math.floor(Math.random()*16) + 6;
    });
    var frame = 0;
    var maxF = Math.max.apply(null, resolveAt) + 1;
    function tick(){
      var out = '';
      for(var i=0;i<chars.length;i++){
        var c = chars[i];
        if(/\s|\u00a0/.test(c)){ out += c; continue; }
        if(frame >= resolveAt[i]){ out += c; }
        else { out += GLYPHS[Math.floor(Math.random()*GLYPHS.length)]; }
      }
      el.textContent = out;
      frame++;
      if(frame <= maxF){ setTimeout(tick, 38); }
      else { el.textContent = finalText; }
    }
    tick();
  }

  /* ---------- counters ---------- */
  function runCount(el){
    if(el.dataset.done) return; el.dataset.done='1';
    var target = parseFloat(el.dataset.count) || 0;
    if(motionOff()){ el.textContent = target; return; }
    var start = performance.now(), dur = 1100;
    function step(now){
      var p = Math.min(1, (now-start)/dur);
      var e = 1 - Math.pow(1-p, 3);
      el.textContent = Math.round(target*e);
      if(p < 1){ setTimeout(function(){ step(performance.now()); }, 24); }
      else { el.textContent = target; }
    }
    setTimeout(function(){ step(performance.now()); }, 16);
  }

  /* ---------- terminal ---------- */
  (function(){
    var body = document.getElementById('term-body');
    if(!body) return;
    var lines = [
      {cls:'prompt', t:'$ yw new site --from-scratch', type:true},
      {cls:'ok',     t:'\u2713 architecture     hand-rolled'},
      {cls:'ok',     t:'\u2713 design-system    tokens \u00b7 type \u00b7 motion'},
      {cls:'ok',     t:'\u2713 i18n             en \u00b7 fr \u00b7 nl'},
      {cls:'key',    t:'\u2713 ai               pair-programmer, not pilot'},
      {cls:'prompt', t:'$ yw ship', type:true},
      {cls:'dim',    t:'deploying\u2026 done in 0.9s \u26a1'}
    ];
    var cursor = document.createElement('span');
    cursor.className = 'term-cursor';

    function showAll(){
      body.innerHTML = '';
      lines.forEach(function(l){
        var d = document.createElement('div');
        d.className = 'row '+l.cls; d.textContent = l.t; body.appendChild(d);
      });
      body.appendChild(cursor);
    }
    if(motionOff()){ showAll(); return; }

    var li = 0;
    function nextLine(){
      if(li >= lines.length){ body.appendChild(cursor); return; }
      var l = lines[li++];
      var d = document.createElement('div');
      d.className = 'row '+l.cls; body.appendChild(d);
      if(l.type){
        var ci = 0;
        (function typeChar(){
          d.textContent = l.t.slice(0, ci++);
          if(ci <= l.t.length){ setTimeout(typeChar, 34); }
          else { setTimeout(nextLine, 240); }
        })();
      } else {
        d.textContent = l.t;
        d.style.opacity = '0';
        d.style.transition = 'opacity .3s';
        requestAnimationFrame(function(){ d.style.opacity='1'; });
        setTimeout(nextLine, 200);
      }
    }
    // start after a beat
    setTimeout(nextLine, 650);
  })();

  /* ---------- reveal on scroll (setTimeout-driven, background-safe) ---------- */
  var reveals = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
  var ticking = false;
  function activate(el){
    el.classList.add('in');
    // scramble + counters inside
    var sc = el.matches('[data-scramble]') ? [el] : [];
    Array.prototype.push.apply(sc, el.querySelectorAll('[data-scramble]'));
    sc.forEach(scramble);
    el.querySelectorAll('[data-count]').forEach(runCount);
    setTimeout(function(){ el.style.transition = 'none'; }, 950);
  }
  function check(){
    ticking = false;
    var trig = window.innerHeight * 0.92;
    for(var i=reveals.length-1;i>=0;i--){
      var el = reveals[i];
      if(el.getBoundingClientRect().top < trig){ activate(el); reveals.splice(i,1); }
    }
  }
  function req(){ if(!ticking){ ticking = true; requestAnimationFrame(check); } }
  setTimeout(check, 60);
  window.addEventListener('scroll', req, {passive:true});
  window.addEventListener('resize', req, {passive:true});
  window.addEventListener('load', check);

  // expose for tweaks (re-evaluate motion-dependent visuals if needed)
  window.__yw = { check: check };
})();

/* ============================================================
   Stack spine — stable CSS rail (height-driven, no per-frame rebuild)
   ------------------------------------------------------------
   The fill line is anchored to the ACTIVE node's centre, which is
   layout-stable: opening a row expands its panel BELOW the bar, so the
   active node never moves during its own animation. We therefore set a
   single height value on activation and only follow it briefly while the
   accordion settles — no full SVG rebuild, no scroll-pixel mapping against
   a container whose height changes.
   ============================================================ */
(function(){
  "use strict";
  var deep   = document.querySelector('.stack-deep');
  var rowsEl = deep && deep.querySelector('.deep-rows');
  var fill   = deep && deep.querySelector('.deep-rail-fill');
  if(!deep || !rowsEl || !fill) return;
  var rows = Array.prototype.slice.call(deep.querySelectorAll('.deep'));
  var current = -1;

  function noMo(){ return document.body.getAttribute('data-motion') === 'off' ||
                          matchMedia('(prefers-reduced-motion: reduce)').matches; }

  /* centre of a row's bar, measured relative to the rail's top — stable */
  function centerY(row){
    var b = row.querySelector('.deep-bar').getBoundingClientRect();
    var base = rowsEl.getBoundingClientRect();
    return (b.top - base.top) + b.height / 2;
  }
  function setFill(px){ px = Math.max(0, px); fill.style.height = px.toFixed(1) + 'px'; fill.classList.toggle('empty', px < 2); }
  function lightUpTo(idx){
    rows.forEach(function(r, i){ r.classList.toggle('lit', i <= idx); });
  }

  /* ---- panel height tween (rAF-driven; reliable across engines) ---- */
  function panelOf(r){ return r.querySelector('.deep-panel-in'); }
  function tween(pin, open, animate){
    if(!pin) return;
    cancelAnimationFrame(pin.__raf || 0);
    clearTimeout(pin.__to);
    pin.style.transition = 'none';
    var endVal = open ? 'none' : '0px';
    if(animate === false || noMo()){ pin.style.maxHeight = endVal; return; }
    var to = open ? pin.scrollHeight : 0;
    var from = pin.clientHeight;
    pin.style.maxHeight = from + 'px';
    var start = performance.now(), dur = 440;
    (function step(now){
      var p = Math.min(1, (now - start) / dur);
      var e = 1 - Math.pow(1 - p, 3);
      pin.style.maxHeight = (from + (to - from) * e) + 'px';
      if(p < 1){ pin.__raf = requestAnimationFrame(step); }
      else { pin.style.maxHeight = endVal; }
    })(start);
    pin.__to = setTimeout(function(){ cancelAnimationFrame(pin.__raf || 0); pin.style.maxHeight = endVal; }, dur + 90);
  }
  function openPanel(r, animate){ tween(panelOf(r), true, animate); }
  function closePanel(r){ tween(panelOf(r), false, true); }

  /* follow the fill to the active node while the layout settles */
  var followRAF;
  function followFill(ms){
    cancelAnimationFrame(followRAF);
    var end = performance.now() + (ms || 520);
    (function loop(){
      if(current >= 0) setFill(centerY(rows[current]));
      if(performance.now() < end){ followRAF = requestAnimationFrame(loop); }
    })();
  }

  /* activate a row: open it, close the others, advance the fill */
  function activate(idx, animate){
    if(idx < 0 || idx >= rows.length) return;
    var changed = idx !== current;
    rows.forEach(function(r, k){
      var bar = r.querySelector('.deep-bar');
      var isOpen = r.classList.contains('is-open');
      if(k === idx && !isOpen){ r.classList.add('is-open'); openPanel(r, animate); if(bar) bar.setAttribute('aria-expanded','true'); }
      else if(k !== idx && isOpen){ closePanel(r); r.classList.remove('is-open'); if(bar) bar.setAttribute('aria-expanded','false'); }
    });
    current = idx;
    lightUpTo(idx);
    if(animate === false){ setFill(centerY(rows[idx])); }
    else { followFill(560); }
  }

  /* ---- scroll: which technology is the line at? ---- */
  function update(){
    var sect = rowsEl.getBoundingClientRect();
    var vh = window.innerHeight || 800;
    // before the section is reached, keep the rail empty
    if(sect.top > vh * 0.55){ setFill(0); lightUpTo(-1); current = -1; return; }
    var threshold = vh * 0.42;
    var idx = 0;
    rows.forEach(function(r, i){
      if(r.querySelector('.deep-bar').getBoundingClientRect().top <= threshold) idx = i;
    });
    if(idx !== current) activate(idx);
    else if(current >= 0) setFill(centerY(rows[current])); // keep aligned on reflow
  }
  var ticking = false;
  function onScroll(){ if(!ticking){ ticking = true; requestAnimationFrame(function(){ ticking = false; update(); }); } }
  window.addEventListener('scroll', onScroll, {passive:true});
  window.addEventListener('resize', function(){ if(current >= 0) setFill(centerY(rows[current])); }, {passive:true});

  /* init: size the default-open row with no flash, then sync to scroll */
  rows.forEach(function(r){ if(r.classList.contains('is-open')) openPanel(r, false); });
  setTimeout(update, 80);
  if(document.fonts && document.fonts.ready){ document.fonts.ready.then(function(){ setTimeout(update, 30); }); }

  /* clicks still work — manual open advances the rail too */
  rows.forEach(function(r, i){
    var bar = r.querySelector('.deep-bar');
    if(!bar) return;
    bar.addEventListener('click', function(){
      if(r.classList.contains('is-open') && current === i){
        // collapsing the active row: close it, retreat the fill to the one above
        closePanel(r); r.classList.remove('is-open'); bar.setAttribute('aria-expanded','false');
        current = i - 1; lightUpTo(current);
        if(current >= 0) followFill(520); else { followFill(520); setFill(0); }
      } else {
        activate(i);
      }
    });
  });
})();

/* ============================================================
   HERO — live growth graph: an ENDLESS, self-renewing line.
   ------------------------------------------------------------
   It travels horizontally forever and, every so often, a peak
   spikes up through the ceiling and bursts. It is not a loop:
   the curve is a sum of incommensurate sines (a quasi-random
   walk that never exactly repeats), with break-out spikes
   scheduled at random intervals. Runs only while on-screen and
   the tab is visible; resumes seamlessly.
   ============================================================ */
(function(){
  "use strict";
  var box = document.getElementById('growth');
  if(!box) return;
  var chart = document.getElementById('growth-chart');
  var svg   = box.querySelector('.chart-svg');
  var area  = box.querySelector('.chart-area');
  var line  = box.querySelector('.chart-line');
  var head  = box.querySelector('.chart-head');
  var grid  = box.querySelector('.chart-grid');
  var burst = box.querySelector('.burst');
  var vals  = Array.prototype.slice.call(box.querySelectorAll('.fn-v'));
  var NS = 'http://www.w3.org/2000/svg';

  function noMo(){ return document.body.getAttribute('data-motion') === 'off' ||
                          matchMedia('(prefers-reduced-motion: reduce)').matches; }
  function rand(a,b){ return a + Math.random()*(b-a); }
  function fmt(n, t){
    n = Math.round(n);
    function k(x){ return x>=1000 ? (x/1000).toFixed(x>=10000?0:1).replace(/\.0$/,'')+'k' : ''+x; }
    if(t==='k')   return k(n);
    if(t==='eur') return '\u20ac'+k(n);
    return ''+n;
  }

  /* ---- geometry ---- */
  var W=0, H=0, pad=10, bottom=0, span=0;
  var M = 72;        // sample points across the width
  var SPEED = 40;    // px / second the line travels left-to-right
  function measure(){
    W = chart.clientWidth || 520; H = chart.clientHeight || 188;
    bottom = H - pad; span = H - pad*2;
    svg.setAttribute('viewBox','0 0 '+W+' '+H);
    grid.innerHTML = '';
    for(var g=1; g<4; g++){
      var gy = H*g/4, ln = document.createElementNS(NS,'line');
      ln.setAttribute('x1',0); ln.setAttribute('x2',W);
      ln.setAttribute('y1',gy); ln.setAttribute('y2',gy);
      grid.appendChild(ln);
    }
  }
  function yOf(v){ return bottom - v*span; }   // v in [0,1]; >1 breaks above the top

  /* ---- value field: smooth quasi-random base + scheduled spikes ---- */
  function base(wx){
    return 0.45
      + 0.135*Math.sin(wx*0.0130)
      + 0.085*Math.sin(wx*0.0290 + 1.3)
      + 0.055*Math.sin(wx*0.0670 + 2.1)
      + 0.030*Math.sin(wx*0.1500 + 0.7);
  }
  var spikes = [];          // {sx, apex, sigma, bursted}
  var nextSpikeX = 0;
  function ensureSpikes(worldX){
    while(nextSpikeX < worldX + W + 140){
      spikes.push({ sx:nextSpikeX, apex:rand(0.99,1.12), sigma:rand(15,24), bursted:false });
      nextSpikeX += SPEED * rand(6.5, 13);          // a break-out every ~7–13s
    }
    for(var i=spikes.length-1;i>=0;i--){ if(spikes[i].sx < worldX - 140) spikes.splice(i,1); }
  }
  function value(wx){
    var v = base(wx);
    for(var i=0;i<spikes.length;i++){
      var s=spikes[i], d=wx - s.sx;
      v += (s.apex - base(s.sx)) * Math.exp(-(d*d)/(2*s.sigma*s.sigma));
    }
    return v;
  }

  function explode(px, py){
    if(noMo()) return;
    var N = 16;
    for(var i=0;i<N;i++){
      var dot = document.createElement('i');
      dot.className = 'pt';
      dot.style.left = px+'px'; dot.style.top = py+'px';
      if(i%3===0){ dot.style.background='var(--text)'; }
      burst.appendChild(dot);
      var ang = -Math.PI/2 + rand(-1.1,1.1);     // mostly upward — bursting through the ceiling
      var dist = 26 + Math.random()*60;
      var a = dot.animate([
        {transform:'translate(-50%,-50%) translate(0,0) scale(1)', opacity:1},
        {transform:'translate(-50%,-50%) translate('+(Math.cos(ang)*dist).toFixed(1)+'px,'+(Math.sin(ang)*dist).toFixed(1)+'px) scale(0)', opacity:0}
      ], { duration: 620+Math.random()*420, easing:'cubic-bezier(.2,.7,.2,1)' });
      a.onfinish = function(){ this.effect.target.remove(); };
    }
  }

  function draw(worldX){
    ensureSpikes(worldX);
    var x0 = pad, x1 = W - pad, dx = (x1 - x0)/(M-1), d='', x, y, i;
    for(i=0;i<M;i++){
      x = x0 + dx*i;
      y = yOf(value(worldX + x));
      d += (i===0?'M':' L') + x.toFixed(1) + ' ' + y.toFixed(1);
    }
    line.setAttribute('d', d);
    area.setAttribute('d', d + ' L'+x1.toFixed(1)+' '+bottom+' L'+x0.toFixed(1)+' '+bottom+' Z');
    // live head at the right edge
    var hv = value(worldX + x1);
    head.setAttribute('cx', x1.toFixed(1));
    head.setAttribute('cy', yOf(hv).toFixed(1));
    head.setAttribute('r', (hv>0.9 ? 6 + (hv-0.9)*14 : 6).toFixed(1));
    // burst each spike once, as its apex reaches the right edge near the ceiling
    for(i=0;i<spikes.length;i++){
      var s=spikes[i]; if(s.bursted) continue;
      var sxs = s.sx - worldX;
      if(sxs <= x1 && sxs >= x0){ s.bursted = true; explode(sxs, Math.max(3, yOf(s.apex))); }
    }
  }

  /* ---- funnel counters (count up once, then hold) ---- */
  var counted=false;
  function runCounts(){
    if(counted) return; counted=true;
    if(noMo()){ vals.forEach(function(v){ v.textContent=fmt(+v.dataset.val, v.dataset.fmt); }); return; }
    var start=performance.now(), dur=1300;
    (function step(){
      var p=Math.min(1,(performance.now()-start)/dur), e=1-Math.pow(1-p,3);
      vals.forEach(function(v){ v.textContent=fmt((+v.dataset.val)*e, v.dataset.fmt); });
      if(p<1){ setTimeout(step, 24); }
      else { vals.forEach(function(v){ v.textContent=fmt(+v.dataset.val, v.dataset.fmt); }); }
    })();
  }

  /* ---- run loop (visibility-gated, seamless resume) ----
     setTimeout-driven (not rAF) so it keeps stepping even where rAF is
     throttled; delta-time keeps the travel speed constant regardless. ---- */
  var timer=0, running=false, started=false, inView=false, lastNow=0, worldX=0;
  var STEP = 1000/45;     // ~45fps target
  function loop(){
    if(!running) return;
    var now = performance.now();
    var dt = Math.min(0.05, (now - lastNow)/1000);   // clamp after a tab switch
    lastNow = now; worldX += dt * SPEED;
    draw(worldX);
    timer = setTimeout(loop, STEP);
  }
  function play(){
    if(running || noMo() || !started) return;
    running = true; lastNow = performance.now(); loop();
  }
  function pause(){ running = false; clearTimeout(timer); }
  function start(){
    if(started) return; started = true;
    measure(); runCounts();
    area.style.opacity = 0.9; head.style.opacity = 1;
    spikes = []; nextSpikeX = W + SPEED*rand(2,4); worldX = 0;
    if(noMo()){ draw(0); return; }
    play();
  }

  if('IntersectionObserver' in window){
    new IntersectionObserver(function(es){
      inView = es[0].isIntersecting;
      if(inView){ started ? play() : start(); } else { pause(); }
    }, {threshold:0.04}).observe(box);
  }

  /* Scroll/resize-driven fallback (robust where IO is unreliable) */
  function isInView(){
    var r = box.getBoundingClientRect(), vh = window.innerHeight || 800;
    return r.top < vh*0.92 && r.bottom > vh*0.06;
  }
  var ticking=false;
  function checkView(){
    ticking=false;
    inView = isInView();
    if(inView){ started ? play() : start(); }
    else if(started){ pause(); }
  }
  function req(){ if(!ticking){ ticking=true; setTimeout(checkView, 16); } }
  window.addEventListener('scroll', req, {passive:true});
  window.addEventListener('resize', req, {passive:true});
  window.addEventListener('load', checkView);
  setTimeout(checkView, 80);

  document.addEventListener('visibilitychange', function(){
    if(document.hidden){ pause(); } else if(started && inView){ play(); }
  });
  window.addEventListener('resize', function(){ measure(); if(noMo() && started){ draw(worldX); } }, {passive:true});

  // expose for Tweaks (motion toggle): restart static/dynamic cleanly
  window.__ywGraph = { pause:pause, play:play, check:checkView };
})();

/* ============================================================
   WORK — stacked-cards scroll effect (Tweak: data-work="stack")
   ============================================================ */
(function(){
  "use strict";
  function clamp(v,a,b){ return v<a?a:v>b?b:v; }
  function cards(){ return Array.prototype.slice.call(document.querySelectorAll('#work-grid .proj')); }
  function apply(){
    var stack = document.body.getAttribute('data-work') === 'stack';
    var cs = cards();
    if(!stack){ cs.forEach(function(c){ c.style.transform=''; c.style.filter=''; }); return; }
    cs.forEach(function(c,i){
      var next = cs[i+1];
      if(!next){ c.style.transform=''; c.style.filter=''; return; }
      var r = c.getBoundingClientRect(), nr = next.getBoundingClientRect();
      var gap = nr.top - r.top, h = r.height || 1;
      var prog = clamp(1 - gap/h, 0, 1);
      c.style.transform = 'scale(' + (1 - prog*0.05).toFixed(3) + ')';
      c.style.filter = 'brightness(' + (1 - prog*0.32).toFixed(3) + ')';
    });
  }
  var ticking = false;
  function onScroll(){ if(!ticking){ ticking = true; requestAnimationFrame(function(){ ticking=false; apply(); }); } }
  window.addEventListener('scroll', onScroll, {passive:true});
  window.addEventListener('resize', onScroll, {passive:true});
  window.__ywWork = { apply: apply };
  setTimeout(apply, 150);
})();

/* ============================================================
   PROCESS — animated SVG timeline
   ============================================================ */
(function(){
  "use strict";
  var tl  = document.getElementById('timeline');
  var svg = tl && tl.querySelector('.tl-spine');
  if(!svg) return;
  var NS = 'http://www.w3.org/2000/svg';
  var rows = Array.prototype.slice.call(tl.querySelectorAll('.tl-row'));
  var fill, cap, dots = [], nums = [], nodeY = [], top = 18, len = 0;

  function el(name, attrs){ var n = document.createElementNS(NS, name);
    for(var k in attrs){ n.setAttribute(k, attrs[k]); } return n; }
  function clamp(v){ return v<0?0:v>1?1:v; }

  function build(){
    var W = svg.clientWidth || 52, H = tl.offsetHeight;
    if(!H) return;
    var cx = Math.round(W/2), bottom = H - 18;
    len = bottom - top;
    svg.setAttribute('viewBox','0 0 '+W+' '+H);
    svg.innerHTML = ''; dots=[]; nums=[]; nodeY=[];
    svg.appendChild(el('line',{x1:cx,y1:top,x2:cx,y2:bottom,class:'tl-track'}));
    var tlRect = tl.getBoundingClientRect();
    rows.forEach(function(r){
      var rr = r.getBoundingClientRect();
      var y = (rr.top - tlRect.top) + rr.height/2;
      y = Math.min(bottom-4, Math.max(top+4, y));
      nodeY.push(y);
    });
    fill = el('line',{x1:cx,y1:top,x2:cx,y2:bottom,class:'tl-fill'});
    fill.style.strokeDasharray = len; fill.style.strokeDashoffset = len;
    svg.appendChild(fill);
    nodeY.forEach(function(y,i){
      var d = el('circle',{cx:cx,cy:y,r:13,class:'tl-dot'});
      svg.appendChild(d); dots.push(d);
      var t = el('text',{x:cx,y:y,class:'tl-num','text-anchor':'middle','dominant-baseline':'central'});
      t.textContent = '0'+(i+1); svg.appendChild(t); nums.push(t);
    });
    cap = el('circle',{cx:cx,cy:top,r:4,class:'tl-cap'});
    svg.appendChild(cap);
    update();
  }
  function update(){
    if(!fill) return;
    var rect = tl.getBoundingClientRect(), vh = window.innerHeight || 800;
    var p = clamp((vh*0.80 - rect.top) / (rect.height*0.82));
    fill.style.strokeDashoffset = (len*(1-p)).toFixed(1);
    var fillY = top + len*p;
    cap.setAttribute('cy', fillY.toFixed(1));
    cap.classList.toggle('on', p>0.001 && p<0.999);
    for(var i=0;i<dots.length;i++){
      var lit = nodeY[i] <= fillY + 1;
      dots[i].classList.toggle('lit', lit);
      nums[i].classList.toggle('lit', lit);
      rows[i].classList.toggle('lit', lit);
    }
  }
  var ticking = false;
  function onScroll(){ if(!ticking){ ticking=true; requestAnimationFrame(function(){ ticking=false; update(); }); } }
  window.addEventListener('scroll', onScroll, {passive:true});
  window.addEventListener('resize', build, {passive:true});
  window.addEventListener('load', build);
  setTimeout(build, 90);
  if(document.fonts && document.fonts.ready){ document.fonts.ready.then(function(){ setTimeout(build,30); }); }
})();
