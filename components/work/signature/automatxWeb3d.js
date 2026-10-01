/* AutomatX Labs — three.js layer for the labs × capabilities map (hub page).
   Ported from automatx.eu/web3d.js; lazy-loaded by AutomatxWeb.tsx. The SVG stays on top as the label / focus / link layer
   and the source of truth: home positions come from its circles, edges from its
   <line data-a data-b>, focus state from the .on / .is-focus / .is-hub classes
   AutomatxWeb.tsx toggles.
   A star constellation in one rotatable 3D space: the four labs sit on two
   diagonals through the centre, so their crosslink draws the logo X; the
   capabilities on an outer sphere near the labs they serve, plus unconnected
   neural stars. Drag the map to orbit (with inertia; slow auto-turn when idle),
   drag a star to pull and throw it (the orbit stays where it is left,
   no snap-back); hovering the X lights every link. Every frame each node is projected
   back to the screen and its SVG node moved there, so labels and hit areas stay
   glued to the stars. */
import {
  WebGLRenderer, Scene, PerspectiveCamera, Group, Sprite, SpriteMaterial,
  BufferGeometry, BufferAttribute, LineSegments, LineBasicMaterial,
  Points, PointsMaterial, CanvasTexture, Color, Vector3, Vector2, Plane, Raycaster,
  AdditiveBlending, Mesh, MeshBasicMaterial, DoubleSide,
} from 'three';

// ywdesign port: wrapped as mount(section, web) → cleanup; `section` is the demo stage.
export function mountAutomatxWeb(section, web) {
  const svg = web.querySelector('svg');
  let renderer;
  try { renderer = svg && new WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' }); }
  catch (e) { renderer = null; } // no WebGL → the SVG map stays as is
  if (!renderer) { web.classList.remove('is-loading'); return () => {}; }

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const canvas = renderer.domElement;
  canvas.className = 'web3d';
  canvas.setAttribute('aria-hidden', 'true');
  renderer.setPixelRatio(dpr);
  renderer.setClearColor(0x000000, 0);
  section.prepend(canvas);

  const FOV = 30, TAN = Math.tan((FOV / 2) * Math.PI / 180);
  const scene = new Scene();
  const camera = new PerspectiveCamera(FOV, 1, 1, 5000);
  const graph = new Group(); scene.add(graph); // graph units = SVG user units, y up, map centre at 0
  const css = getComputedStyle(web);
  const ACCENT = new Color(css.getPropertyValue('--accent').trim() || '#3aa0c8');
  const ACCENT2 = new Color(css.getPropertyValue('--accent-2').trim() || '#9b7be0');
  const WHITE = new Color('#ffffff');

  const additive = { transparent: true, depthWrite: false, blending: AdditiveBlending };

  const dot = (stops) => { // radial sprite texture
    const c = document.createElement('canvas'); c.width = c.height = 64;
    const g = c.getContext('2d'), r = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    stops.forEach(([t, a]) => r.addColorStop(t, 'rgba(255,255,255,' + a + ')'));
    g.fillStyle = r; g.fillRect(0, 0, 64, 64);
    return new CanvasTexture(c);
  };
  const GLOW = dot([[0, 1], [0.2, 0.5], [1, 0]]); // soft halo, pulses, dust
  const STAR = dot([[0, 1], [0.06, 1], [0.16, 0.35], [0.4, 0.04], [1, 0]]); // pin-sharp core

  /* ---- read the graph from the SVG ---- */
  const CX = 300, CY = 240;
  const nodes = {}, tmpDir = new Vector3();
  let placeHub = () => {};
  web.querySelectorAll('.node').forEach((el) => {
    const c = el.querySelector('circle');
    const kind = el.classList.contains('node--hub') ? 'hub' : el.classList.contains('node--lab') ? 'lab' : 'cap';
    const color = kind === 'lab' ? new Color(getComputedStyle(el).getPropertyValue('--c').trim()) : ACCENT.clone();
    const sx = +c.getAttribute('cx'), sy = +c.getAttribute('cy');
    // small labels on a thin leader line: up-right from the star; the X's own label points right, between its arms
    const NS_SVG = 'http://www.w3.org/2000/svg';
    if (kind === 'hub' && !el.querySelector('text')) { // wordmark: Automat + the blue logo X + Labs
      const t = document.createElementNS(NS_SVG, 'text'); t.textContent = 'Automat'; el.appendChild(t);
      const x = document.createElementNS(NS_SVG, 'g'); x.setAttribute('class', 'x wm-x');
      x.innerHTML = '<path class="x__b" d="M15.4 0H20L4.6 22H0z"/><path class="x__a" d="M0 0H4.6L20 22H15.4z"/>';
      el.appendChild(x);
      const l = document.createElementNS(NS_SVG, 'text'); l.setAttribute('class', 'wm-labs'); l.textContent = 'Labs'; el.appendChild(l);
    }
    const [lx, ly] = kind === 'hub' ? [sx + 32, sy] : [sx + 22, sy - 14];
    const lead = document.createElementNS(NS_SVG, 'polyline');
    lead.setAttribute('class', 'lead');
    lead.setAttribute('points', kind === 'hub' ? `${sx + 8},${sy} ${lx - 3},${ly}` : `${sx + 3},${sy - 3} ${sx + 14},${ly} ${lx - 3},${ly}`);
    el.insertBefore(lead, el.querySelector('text'));
    el.querySelectorAll('text').forEach((t) => { t.setAttribute('x', lx); t.setAttribute('y', ly + (t.classList.contains('sub') ? 14 : 3.5)); });
    if (kind === 'hub') { // place the X and "Labs" after the measured "Automat" (again once the web font is in)
      const place = () => {
        const [t, labsT] = el.querySelectorAll('text'), w = t.getComputedTextLength(), xs = 8 / 22;
        el.querySelector('.wm-x').setAttribute('transform', `translate(${(lx + w + 0.8).toFixed(2)} ${(ly + 3.5 - 8).toFixed(2)}) scale(${xs})`);
        labsT.setAttribute('x', (lx + w + 0.8 + 20 * xs + 3.2).toFixed(2));
      };
      placeHub = place; if (document.fonts) document.fonts.ready.then(() => web.classList.contains('is-3d') && place());
    }
    nodes[el.dataset.id] = {
      el, kind, color, sx, sy, hx: 0, hy: 0, hz: 0, // 3D home, set below
      dir: new Vector3(), d: 1,
      size: kind === 'lab' ? 10 : kind === 'hub' ? 8 : 5.5,
      ox: 0, oy: 0, oz: 0, vx: 0, vy: 0, vz: 0, fx: 0, fy: 0, fz: 0,
      m: (kind === 'hub' ? 3 : kind === 'lab' ? 1.5 : 1) * (0.85 + Math.random() * 0.3),
      glow: 0, boost: 0, flash: 0, edges: [], phase: Math.random() * 6.28, pos: new Vector3(),
    };
  });
  const list = Object.values(nodes);
  const hub = nodes.hub;
  const edges = [...web.querySelectorAll('.edge')].map((el) => {
    const a = nodes[el.dataset.a], b = nodes[el.dataset.b];
    const e = { el, a, b, lab: b.kind === 'lab' ? b : a, glow: 0, core: el.classList.contains('edge--core') };
    a.edges.push(e); b.edges.push(e);
    return e;
  });
  // capability colour = blend of the labs it serves
  list.forEach((n) => {
    if (n.kind !== 'cap') return;
    n.color.setRGB(0, 0, 0);
    n.edges.forEach((e) => n.color.add(e.lab.color));
    n.color.multiplyScalar(1 / n.edges.length).lerp(WHITE, 0.2);
  });

  /* ---- 3D layout: labs on two diagonals through the centre at the logo's angle
     (viewBox 20×22) → their crosslink is the X; capabilities on an outer sphere
     toward the labs they serve ---- */
  const DIAG = { pharma: [-10, 11, 3], ai: [10, -11, -3], sports: [10, 11, -3], robotics: [-10, -11, 3] };
  const R_LAB = 130, R_CAP = 210;
  const labs = list.filter((n) => n.kind === 'lab'), caps = list.filter((n) => n.kind === 'cap');
  labs.forEach((n, i) => n.dir.fromArray(DIAG[n.el.dataset.id] || Object.values(DIAG)[i % 4]).normalize());
  caps.forEach((n, i) => {
    n.edges.forEach((e) => n.dir.add(e.lab.dir));
    // bias toward where the 2D map draws it, so the front view stays familiar; alternate front/back for depth
    n.dir.add(tmpDir.set(n.sx - CX, CY - n.sy, 0).normalize().multiplyScalar(1.2));
    n.dir.z += (i % 2 ? 0.7 : -0.7);
    n.dir.normalize();
  });
  for (let it = 0; it < 40; it++) caps.forEach((a) => caps.forEach((b) => { // spread them out on the sphere
    if (a === b) return;
    const dot = a.dir.dot(b.dir);
    if (dot > 0.55) a.dir.addScaledVector(tmpDir.subVectors(a.dir, b.dir), 0.04 * (dot - 0.55)).normalize();
  }));
  list.forEach((n) => {
    const r = n.kind === 'lab' ? R_LAB : n.kind === 'cap' ? R_CAP : 0;
    n.hx = n.dir.x * r; n.hy = n.dir.y * r; n.hz = n.dir.z * r;
  });

  /* ---- stars: a pin-sharp core + a soft halo per node ---- */
  hub.color.copy(ACCENT);
  list.forEach((n) => {
    n.core = new Sprite(new SpriteMaterial(Object.assign({ map: STAR }, additive)));
    n.halo = new Sprite(new SpriteMaterial(Object.assign({ map: GLOW }, additive)));
    n.core.scale.setScalar(n.size); n.halo.scale.setScalar(n.size * 3.2);
    n.coreColor = n.color.clone().lerp(WHITE, n.kind === 'lab' ? 0.75 : 0.6);
    n.twinkle = 1.5 + Math.random() * 2;
    graph.add(n.core, n.halo);
  });
  // stroke b of the logo X (sports ↔ robotics) is the dimmer one
  edges.forEach((e) => { e.dim = e.core && (e.lab.el.dataset.id === 'sports' || e.lab.el.dataset.id === 'robotics'); });

  /* ---- fine edges, pulses, dust ---- */
  const lPos = new Float32Array(edges.length * 6), lCol = new Float32Array(edges.length * 6);
  const lGeo = new BufferGeometry();
  lGeo.setAttribute('position', new BufferAttribute(lPos, 3));
  lGeo.setAttribute('color', new BufferAttribute(lCol, 3));
  const lines = new LineSegments(lGeo, new LineBasicMaterial(Object.assign({ vertexColors: true }, additive)));
  lines.frustumCulled = false; graph.add(lines);

  // bold X crossing: per core arm a camera-facing triangle, wide at the hub, tapering to the fine beam
  const cores = edges.filter((e) => e.core);
  const xPos = new Float32Array(cores.length * 9), xCol = new Float32Array(cores.length * 9);
  const xGeo = new BufferGeometry();
  xGeo.setAttribute('position', new BufferAttribute(xPos, 3));
  xGeo.setAttribute('color', new BufferAttribute(xCol, 3));
  const xMesh = new Mesh(xGeo, new MeshBasicMaterial(Object.assign({ vertexColors: true, side: DoubleSide }, additive)));
  xMesh.frustumCulled = false; graph.add(xMesh);
  const arm = new Vector3(), side = new Vector3(), camLocal = new Vector3();

  const MAXP = 120, pulses = [];
  const pPos = new Float32Array(MAXP * 3), pCol = new Float32Array(MAXP * 3);
  const pGeo = new BufferGeometry();
  pGeo.setAttribute('position', new BufferAttribute(pPos, 3));
  pGeo.setAttribute('color', new BufferAttribute(pCol, 3));
  // sizeAttenuation: world size s ⇒ size = s / tan(fov/2)
  const pts = new Points(pGeo, new PointsMaterial(Object.assign({ size: 2.5 / TAN, map: GLOW, vertexColors: true }, additive)));
  pts.frustumCulled = false; graph.add(pts);
  const spawn = (e, from, speed) => { if (pulses.length < MAXP) pulses.push({ e, from, t: 0, speed }); };

  // particle shells: card-near (inside/around the map) and section-wide far field.
  // Each trails the orbit at its own rate (`follow`) → smooth depth parallax.
  const shell = (count, rMin, rMax, size, bright, follow, map = GLOW) => {
    const pos = new Float32Array(count * 3), col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      tmpDir.randomDirection().multiplyScalar(rMin + Math.random() * (rMax - rMin)).toArray(pos, i * 3);
      const b = bright * (0.5 + Math.random() * 0.5) * (Math.random() < 1 / 12 ? 2.5 : 1); // a few brighter ones
      new Color().copy(i % 3 ? ACCENT : ACCENT2).lerp(WHITE, Math.random() * 0.3).multiplyScalar(b).toArray(col, i * 3);
    }
    const geo = new BufferGeometry();
    geo.setAttribute('position', new BufferAttribute(pos, 3));
    geo.setAttribute('color', new BufferAttribute(col, 3));
    const p = new Points(geo, new PointsMaterial(Object.assign({ size: size / TAN, map, vertexColors: true }, additive)));
    p.frustumCulled = false; p.follow = follow; scene.add(p);
    return p;
  };
  const dusts = [
    shell(400, 240, 440, 1.2, 0.7, 0.85), // card: fine motes around the graph
    shell(500, 450, 780, 1.5, 0.6, 0.5),  // mid shell
    shell(900, 800, 1150, 1.8, 0.55, 0.25, STAR), // crisp far star field filling the section (inside the camera distance)
    shell(70, 500, 1150, 3.4, 1.3, 0.35, STAR), // brighter speckles scattered through the outer layers
    shell(110, 450, 1100, 4.8, 2, 0.6, STAR), // strong specks that visibly turn with the orbit
  ];

  // unconnected stars inside the constellation (rotate with it exactly), twinkling:
  // many faint neural ones + a few apparent brighter ones
  const twinklers = [];
  const stars = (count, rMin, rMax, size, bMin, bMax, halo) => {
    const pos = new Float32Array(count * 3), col = new Float32Array(count * 3), base = [];
    for (let i = 0; i < count; i++) {
      tmpDir.randomDirection().multiplyScalar(rMin + Math.random() * (rMax - rMin)).toArray(pos, i * 3);
      base.push({ c: new Color().copy(i % 4 ? ACCENT : ACCENT2).lerp(WHITE, 0.3 + Math.random() * 0.4).multiplyScalar(bMin + Math.random() * (bMax - bMin)), ph: Math.random() * 6.28, f: 0.6 + Math.random() * 1.8 });
    }
    const geo = new BufferGeometry();
    geo.setAttribute('position', new BufferAttribute(pos, 3));
    geo.setAttribute('color', new BufferAttribute(col, 3));
    const p = new Points(geo, new PointsMaterial(Object.assign({ size: size / TAN, map: STAR, vertexColors: true }, additive)));
    p.frustumCulled = false; graph.add(p);
    if (halo) { // soft glow around each, sharing the twinkling colours
      const h = new Points(geo, new PointsMaterial(Object.assign({ size: size * halo / TAN, map: GLOW, vertexColors: true, opacity: 0.3 }, additive)));
      h.frustumCulled = false; graph.add(h);
    }
    twinklers.push({ geo, col, base });
  };
  stars(60, 50, 250, 2.6, 0.5, 1);   // neural
  stars(10, 70, 220, 5, 0.8, 1);     // apparent
  stars(14, 260, 400, 5.5, 0.9, 1.2, 4); // glowing outliers further out

  /* ---- pointer (mouse, pen, touch) ---- */
  const ptr = { cx: 0, cy: 0, on: 0, ndc: new Vector2() };
  const onPtr = (ev) => { ptr.cx = ev.clientX; ptr.cy = ev.clientY; ptr.on = 1; };
  section.addEventListener('pointermove', onPtr, { passive: true });
  section.addEventListener('pointerdown', onPtr, { passive: true });
  section.addEventListener('pointerleave', () => { ptr.on = 0; });
  const ray = new Raycaster(), plane = new Plane(), hit = new Vector3(), Z = new Vector3(0, 0, 1);
  // pointer → graph-space point on the camera-facing plane through `at` (graph space)
  const pointerAt = (at, out) => {
    ray.setFromCamera(ptr.ndc, camera);
    plane.setFromNormalAndCoplanarPoint(Z, graph.localToWorld(out.copy(at)));
    return ray.ray.intersectPlane(plane, hit) ? graph.worldToLocal(out.copy(hit)) : null;
  };

  /* ---- orbit: drag the empty map (touch: horizontal swipe; vertical still scrolls) ---- */
  const PITCH_MAX = 1.25;
  const rot = { yaw: 0.25, pitch: 0.22, vyaw: 0, vpitch: 0, auto: 1 }; // small default turn so the depth reads at first sight
  let orbit = null;
  svg.addEventListener('pointerdown', (ev) => {
    if (ev.button > 0 || pinch || ev.target.closest('.node:not(.node--hub)')) return; // the X is derived → dragging it rotates
    orbit = { id: ev.pointerId, x: ev.clientX, y: ev.clientY, x0: ev.clientX, y0: ev.clientY, t: performance.now() };
    try { svg.setPointerCapture(ev.pointerId); } catch (e) { /* pointer already gone */ }
    web.classList.add('is-rotating');
  });
  svg.addEventListener('pointermove', (ev) => {
    if (!orbit || orbit.id !== ev.pointerId || pinch) return;
    const now = performance.now(), dt = Math.max((now - orbit.t) / 1000, 1 / 240);
    const dyaw = (ev.clientX - orbit.x) * 0.006, dpitch = (ev.clientY - orbit.y) * 0.006;
    rot.yaw += dyaw; rot.pitch = Math.max(-PITCH_MAX, Math.min(PITCH_MAX, rot.pitch + dpitch));
    rot.vyaw = rot.vyaw * 0.5 + (dyaw / dt) * 0.5; rot.vpitch = rot.vpitch * 0.5 + (dpitch / dt) * 0.5;
    Object.assign(orbit, { x: ev.clientX, y: ev.clientY, t: now });
  });
  const endOrbit = (ev) => {
    if (!orbit || orbit.id !== ev.pointerId) return;
    // main.js reads this on the following click: a rotate is not a tap
    svg.dataset.rotated = Math.hypot(ev.clientX - orbit.x0, ev.clientY - orbit.y0) > 6 ? '1' : '';
    orbit = null; web.classList.remove('is-rotating');
  };
  svg.addEventListener('pointerup', endOrbit);
  svg.addEventListener('pointercancel', endOrbit);

  /* ---- zoom: ⌘/Ctrl + wheel or trackpad pinch, touch pinch, +/− buttons; zooms toward the pointer ---- */
  const zoom = { z: 1, t: 1, px: 0, py: 0, tpx: 0, tpy: 0 }, Z_MIN = 0.6, Z_MAX = 2.6;
  let viewScale = 1; // px per graph unit at zoom 1 (from the SVG's screen matrix, set every frame)
  const zoomBy = (f, cx, cy) => {
    const sr = section.getBoundingClientRect();
    const t = Math.max(Z_MIN, Math.min(Z_MAX, zoom.t * f));
    if (t === zoom.t) return;
    if (cx != null) { // keep the graph point under the pointer where it is
      const k = (1 / zoom.t - 1 / t) / viewScale;
      zoom.tpx += (cx - sr.left - sr.width / 2) * k; zoom.tpy -= (cy - sr.top - sr.height / 2) * k;
    }
    zoom.t = t;
    const mx = Math.max(0, 1 - 1 / t) * sr.width / 2 / viewScale, my = Math.max(0, 1 - 1 / t) * sr.height / 2 / viewScale;
    zoom.tpx = Math.max(-mx, Math.min(mx, zoom.tpx)); zoom.tpy = Math.max(-my, Math.min(my, zoom.tpy));
    if (zoomOut) zoomOut.textContent = Math.round(t * 100) + '%';
  };
  const zoomReset = () => { zoom.t = 1; zoom.tpx = zoom.tpy = 0; if (zoomOut) zoomOut.textContent = '100%'; };
  svg.addEventListener('wheel', (ev) => { // plain wheel keeps scrolling the page
    if (!ev.ctrlKey && !ev.metaKey) return;
    ev.preventDefault();
    zoomBy(Math.exp(-ev.deltaY * (ev.deltaMode ? 0.05 : 0.0025)), ev.clientX, ev.clientY);
  }, { passive: false });
  let gscale = 1; // Safari trackpad pinch
  svg.addEventListener('gesturestart', (ev) => { ev.preventDefault(); gscale = 1; });
  svg.addEventListener('gesturechange', (ev) => { ev.preventDefault(); zoomBy(ev.scale / gscale, ev.clientX, ev.clientY); gscale = ev.scale; });
  const touches = new Map(); let pinch = null;
  svg.addEventListener('pointerdown', (ev) => {
    if (ev.pointerType !== 'touch') return;
    touches.set(ev.pointerId, ev);
    if (touches.size === 2) {
      const [a, b] = [...touches.values()];
      pinch = { d: Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY) };
      orbit = null; web.classList.remove('is-rotating');
    }
  }, true);
  svg.addEventListener('pointermove', (ev) => {
    if (!touches.has(ev.pointerId)) return;
    touches.set(ev.pointerId, ev);
    if (!pinch || touches.size < 2) return;
    const [a, b] = [...touches.values()], d = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
    if (pinch.d > 0) zoomBy(d / pinch.d, (a.clientX + b.clientX) / 2, (a.clientY + b.clientY) / 2);
    pinch.d = d;
  }, true);
  const endTouch = (ev) => { touches.delete(ev.pointerId); if (touches.size < 2) pinch = null; };
  svg.addEventListener('pointerup', endTouch, true); svg.addEventListener('pointercancel', endTouch, true);
  // buttons: + / − / reset, labelled in the page language
  const fr = document.documentElement.lang === 'fr';
  const zoomUi = document.createElement('div');
  zoomUi.className = 'web__zoom';
  zoomUi.innerHTML = `<button type="button" data-z="in" aria-label="${fr ? 'Zoomer' : 'Zoom in'}">+</button>` +
    `<button type="button" data-z="out" aria-label="${fr ? 'Dézoomer' : 'Zoom out'}">−</button>` +
    `<button type="button" data-z="reset" aria-label="${fr ? 'Réinitialiser le zoom' : 'Reset zoom'}">⟲</button><output aria-live="polite">100%</output>`;
  const zoomOut = zoomUi.querySelector('output');
  zoomUi.addEventListener('click', (ev) => {
    const b = ev.target.closest('button'); if (!b) return;
    if (b.dataset.z === 'reset') zoomReset(); else zoomBy(b.dataset.z === 'in' ? 1.3 : 1 / 1.3);
  });
  web.appendChild(zoomUi);
  svg.addEventListener('dblclick', (ev) => { if (!ev.target.closest('.node:not(.node--hub)')) zoomReset(); });

  /* ---- drag & throw ---- */
  let drag = null;
  list.forEach((n) => {
    if (n === hub) return;
    n.el.addEventListener('pointerdown', (ev) => {
      if (ev.button > 0) return;
      drag = { n, id: ev.pointerId, x0: ev.clientX, y0: ev.clientY, moved: false, at: new Vector3(), target: null };
      onPtr(ev);
      try { n.el.setPointerCapture(ev.pointerId); } catch (e) { /* pointer already gone */ }
      n.el.classList.add('is-drag');
    });
    n.el.addEventListener('pointermove', (ev) => {
      if (drag && drag.id === ev.pointerId && Math.hypot(ev.clientX - drag.x0, ev.clientY - drag.y0) > 6) drag.moved = true;
    });
    const end = (ev) => {
      if (!drag || drag.id !== ev.pointerId) return;
      n.el.classList.remove('is-drag');
      n.el.dataset.dragged = drag.moved ? '1' : '';
      drag = null;
    };
    n.el.addEventListener('pointerup', end);
    n.el.addEventListener('pointercancel', end);
    // a drag is not a click: don't open the lab you just threw
    n.el.addEventListener('click', (ev) => {
      if (n.el.dataset.dragged) { ev.preventDefault(); ev.stopPropagation(); n.el.dataset.dragged = ''; }
    }, true);
  });

  /* ---- sizing ---- */
  let W = 1, H = 1;
  const resize = () => {
    W = section.clientWidth; H = section.clientHeight;
    if (!W || !H) return; // hidden / not laid out yet: keep the last good size
    renderer.setSize(W, H, false);
    camera.aspect = W / H; camera.updateProjectionMatrix();
  };
  resize();
  const ro = new ResizeObserver(resize); ro.observe(section);

  /* ---- physics: nodes + orbit pitch, both lightly under-damped (ζ≈0.35) → quick small bounce ---- */
  const K_HOME = 40, K_EDGE = 10, DAMP = 5.5, DRIFT = 40, K_PTR = 14, R_PTR = 90, K_DRAG = 200, MAXO = 70;
  const AUTO_YAW = 0.07;
  const step = (dt, T) => {
    list.forEach((n) => {
      n.fx = -K_HOME * n.ox + DRIFT * Math.sin(T * 0.6 + n.phase) * Math.cos(T * 0.23 + n.phase * 2);
      n.fy = -K_HOME * n.oy + DRIFT * Math.cos(T * 0.5 + n.phase * 1.7);
      n.fz = -K_HOME * n.oz + DRIFT * Math.sin(T * 0.4 + n.phase * 0.7);
      const px = n.hx + n.ox, py = n.hy + n.oy, pz = n.hz + n.oz;
      if (n.ptrT) { // lean toward the pointer (on the camera-facing plane through the node)
        const dx = n.ptrT.x - px, dy = n.ptrT.y - py, dz = n.ptrT.z - pz, d = Math.hypot(dx, dy, dz);
        if (d < R_PTR) { const f = K_PTR * (1 - d / R_PTR); n.fx += f * dx; n.fy += f * dy; n.fz += f * dz; }
      }
    });
    edges.forEach((e) => { // connected particles tug each other
      const fx = K_EDGE * (e.b.ox - e.a.ox), fy = K_EDGE * (e.b.oy - e.a.oy), fz = K_EDGE * (e.b.oz - e.a.oz);
      e.a.fx += fx; e.a.fy += fy; e.a.fz += fz; e.b.fx -= fx; e.b.fy -= fy; e.b.fz -= fz;
    });
    if (drag && drag.target) {
      const n = drag.n;
      n.fx += K_DRAG * (drag.target.x - n.hx - n.ox) - 16 * n.vx;
      n.fy += K_DRAG * (drag.target.y - n.hy - n.oy) - 16 * n.vy;
      n.fz += K_DRAG * (drag.target.z - n.hz - n.oz) - 16 * n.vz;
    }
    const damp = Math.exp(-DAMP * dt);
    list.forEach((n) => {
      if (n === hub) return; // the X is where the lab diagonals cross, not a particle
      n.vx = (n.vx + (n.fx / n.m) * dt) * damp;
      n.vy = (n.vy + (n.fy / n.m) * dt) * damp;
      n.vz = (n.vz + (n.fz / n.m) * dt) * damp;
      n.ox += n.vx * dt; n.oy += n.vy * dt; n.oz += n.vz * dt;
      const o = Math.hypot(n.ox, n.oy, n.oz), max = drag && drag.n === n ? MAXO * 4 : MAXO;
      if (o > max) { n.ox *= max / o; n.oy *= max / o; n.oz *= max / o; }
    });
    // orbit: inertia + constant slow auto-turn; the tilt stays where the user left it (no spring back).
    // The turn only pauses while dragging or while a star is under the pointer (so it doesn't slip away).
    rot.auto += ((orbit || drag || web.querySelector('.node.is-hover') ? 0 : 1) - rot.auto) * (1 - Math.exp(-dt * 2));
    if (!orbit) {
      rot.vyaw *= Math.exp(-3 * dt); rot.vpitch *= Math.exp(-3 * dt);
      rot.yaw += (rot.vyaw + AUTO_YAW * rot.auto) * dt;
      rot.pitch = Math.max(-PITCH_MAX, Math.min(PITCH_MAX, rot.pitch + rot.vpitch * dt));
    }
  };

  /* ---- loop ---- */
  let last = performance.now(), spawnAcc = 0, started = false;
  const ROT_LAG = 0.6, prevRot = { pitch: rot.pitch, yaw: rot.yaw };
  const ease = (cur, target, k) => cur + (target - cur) * k;
  const tmp = new Color(), tmpV = new Vector3(), proj = new Vector3();

  const frame = (now) => {
    const dt = Math.min((now - last) / 1000, 1 / 30); last = now;
    const k = 1 - Math.exp(-dt * 14), T = now / 1000;
    const focus = web.classList.contains('is-focus');
    const isHub = web.classList.contains('is-hub');

    const m = svg.getScreenCTM(), sr = section.getBoundingClientRect();
    if (!m || !m.a || !W || !H) return; // not laid out (e.g. mid-reload) → skip, avoids NaN transforms
    const inv = m.inverse(), scale = m.a || 1;
    // camera: 1 graph unit = 1 SVG unit on the z=0 plane, map centre where the SVG draws it
    const mcx = m.a * CX + m.c * CY + m.e - sr.left, mcy = m.b * CX + m.d * CY + m.f - sr.top;
    viewScale = scale;
    const kz = 1 - Math.exp(-dt * 10);
    zoom.z = ease(zoom.z, zoom.t, kz); zoom.px = ease(zoom.px, zoom.tpx, kz); zoom.py = ease(zoom.py, zoom.tpy, kz);
    camera.position.set((W / 2 - mcx) / scale + zoom.px, (mcy - H / 2) / scale + zoom.py, H / 2 / (scale * TAN) / zoom.z);
    camera.updateMatrixWorld();

    ptr.ndc.set(((ptr.cx - sr.left) / W) * 2 - 1, -((ptr.cy - sr.top) / H) * 2 + 1);
    const lean = ptr.on && !drag && !orbit;
    list.forEach((n) => { n.ptrT = lean ? pointerAt(tmpV.set(n.hx + n.ox, n.hy + n.oy, n.hz + n.oz), n.ptrV || (n.ptrV = new Vector3())) : null; });
    if (drag) drag.target = pointerAt(tmpV.set(drag.n.hx + drag.n.ox, drag.n.hy + drag.n.oy, drag.n.hz + drag.n.oz), drag.at);

    step(dt / 2, T); step(dt / 2, T);
    // elastic orbit: stars stay behind as the frame turns (−Δθ × r), then spring back; outer + lighter ones lag more
    const dP = rot.pitch - prevRot.pitch, dY = rot.yaw - prevRot.yaw;
    prevRot.pitch = rot.pitch; prevRot.yaw = rot.yaw;
    list.forEach((n) => {
      if (n === hub) return;
      const L = ROT_LAG / n.m;
      n.ox -= dY * n.hz * L; n.oy += dP * n.hz * L; n.oz -= (dP * n.hy - dY * n.hx) * L;
    });
    graph.rotation.set(rot.pitch, rot.yaw, 0);
    graph.updateMatrixWorld();

    list.forEach((n) => { if (n !== hub) n.pos.set(n.hx + n.ox, n.hy + n.oy, n.hz + n.oz); });
    hub.pos.set(0, 0, 0); labs.forEach((n) => hub.pos.add(n.pos)); hub.pos.multiplyScalar(1 / labs.length); // the crossing of the X

    list.forEach((n) => {
      const cl = n.el.classList, on = cl.contains('on'), sel = cl.contains('is-sel');
      const speed = Math.min(1, Math.hypot(n.vx, n.vy, n.vz) / 220); // moving stars burn brighter
      const target = (sel ? 1.4 : isHub ? 1.1 : focus ? (on ? 1 : 0.15) : n.kind === 'cap' ? 0.55 : 1.15) + speed * 0.4;
      n.glow = ease(n.glow, target, k);
      // hover lights the star a little more; the pinned (clicked) star keeps a brighter, wider glow
      n.boost = ease(n.boost, cl.contains('is-pin') ? 1 : cl.contains('is-hover') ? 0.55 : 0, k);
      n.core.scale.setScalar(n.size * (1 + 0.3 * n.boost)); n.halo.scale.setScalar(n.size * 3.2 * (1 + 0.7 * n.boost));
      n.flash = Math.max(0, n.flash - dt * 3);
      // project to the screen → move the SVG node (label + hit area) there
      proj.copy(n.pos).applyMatrix4(graph.matrixWorld);
      n.d = Math.max(0.3, Math.min(1, 0.65 + proj.z / (R_CAP * 2))); // 0.3 far … 1 near
      n.el.style.setProperty('--d', n.d.toFixed(2));
      const g = (n.glow + n.flash + 0.9 * n.boost) * (0.7 + 0.3 * n.d) * (0.9 + 0.1 * Math.sin(T * n.twinkle + n.phase));
      n.core.position.copy(n.pos); n.halo.position.copy(n.pos);
      n.core.material.color.copy(n.coreColor).multiplyScalar(g);
      n.halo.material.color.copy(n.color).multiplyScalar(g * 0.35);
      proj.project(camera);
      const X = (proj.x + 1) / 2 * W + sr.left, Y = (1 - proj.y) / 2 * H + sr.top;
      const ux = inv.a * X + inv.c * Y + inv.e, uy = inv.b * X + inv.d * Y + inv.f;
      n.el.setAttribute('transform', 'translate(' + (ux - n.sx).toFixed(2) + ' ' + (uy - n.sy).toFixed(2) + ')');
    });
    // unconnected stars twinkle
    twinklers.forEach((t) => {
      t.base.forEach((s, i) => tmp.copy(s.c).multiplyScalar(0.55 + 0.45 * Math.sin(T * s.f + s.ph)).toArray(t.col, i * 3));
      t.geo.attributes.color.needsUpdate = true;
    });

    // fine edges; the four core ones draw the X (stroke b dimmer, like the logo)
    edges.forEach((e, i) => {
      const on = e.el.classList.contains('on');
      const idle = e.core ? (e.dim ? 0.5 : 0.8) : 0.12;
      e.glow = ease(e.glow, focus ? (on ? 0.95 : e.core ? idle * 0.3 : 0.04) : idle, k);
      e.a.pos.toArray(lPos, i * 6); e.b.pos.toArray(lPos, i * 6 + 3);
      tmp.copy(e.a.kind === 'hub' ? ACCENT : e.a.color).multiplyScalar(e.glow * e.a.d).toArray(lCol, i * 6);
      tmp.copy(e.lab.color).multiplyScalar(e.glow * e.b.d).toArray(lCol, i * 6 + 3);
    });
    lGeo.attributes.position.needsUpdate = true; lGeo.attributes.color.needsUpdate = true;

    // bold X crossing: wide at the hub, tapering along each core arm
    graph.worldToLocal(camLocal.copy(camera.position));
    cores.forEach((e, i) => {
      arm.subVectors(e.lab.pos, hub.pos);
      side.crossVectors(arm, tmpV.subVectors(camLocal, hub.pos)).normalize().multiplyScalar(2.2);
      const j = i * 9;
      tmpV.copy(hub.pos).add(side).toArray(xPos, j);
      tmpV.copy(hub.pos).sub(side).toArray(xPos, j + 3);
      tmpV.copy(hub.pos).addScaledVector(arm, 0.45).toArray(xPos, j + 6);
      tmp.copy(e.lab.color).lerp(ACCENT, 0.5).multiplyScalar(e.glow * 0.9);
      tmp.toArray(xCol, j); tmp.toArray(xCol, j + 3); xCol[j + 6] = xCol[j + 7] = xCol[j + 8] = 0;
    });
    xGeo.attributes.position.needsUpdate = true; xGeo.attributes.color.needsUpdate = true;

    // pulses: idle trickle, denser along focused edges, outward from the X in hub mode
    const live = focus ? edges.filter((e) => e.el.classList.contains('on')) : edges;
    spawnAcc += dt * (isHub ? 12 : focus ? 7 : 1.6);
    while (spawnAcc > 1 && live.length) {
      spawnAcc--;
      const e = live[(Math.random() * live.length) | 0];
      spawn(e, isHub && e.core ? hub : Math.random() < 0.5 ? e.a : e.b, 0.5 + Math.random() * 0.7);
    }
    for (let i = pulses.length - 1; i >= 0; i--) {
      const p = pulses[i];
      p.t += dt * p.speed;
      if (p.t >= 1) { (p.e.a === p.from ? p.e.b : p.e.a).flash = 0.3; pulses.splice(i, 1); }
    }
    for (let i = 0; i < MAXP; i++) {
      const p = pulses[i], j = i * 3;
      if (!p) { pCol[j] = pCol[j + 1] = pCol[j + 2] = 0; continue; }
      const to = p.e.a === p.from ? p.e.b : p.e.a;
      tmpV.copy(p.from.pos).lerp(to.pos, p.t).toArray(pPos, j);
      tmp.copy(p.e.lab.color).lerp(WHITE, 0.4).multiplyScalar(Math.sin(Math.PI * p.t)).toArray(pCol, j);
    }
    pGeo.attributes.position.needsUpdate = true; pGeo.attributes.color.needsUpdate = true;

    // particle shells ease after the orbit at their own rate (+ a slow drift of their own)
    const kd = 1 - Math.exp(-dt * 3);
    dusts.forEach((d, i) => {
      d.rotation.x = ease(d.rotation.x, rot.pitch * d.follow, kd);
      d.rotation.y = ease(d.rotation.y, rot.yaw * d.follow + T * 0.01 * (i + 1), kd);
    });

    renderer.render(scene, camera);
    if (!started) { started = true; web.classList.add('is-3d'); web.classList.remove('is-loading'); placeHub(); }
  };

  // only run while the section is on screen (rAF itself pauses in hidden tabs)
  const io = new IntersectionObserver(([en]) => {
    if (en.isIntersecting) { last = performance.now(); renderer.setAnimationLoop(frame); }
    else renderer.setAnimationLoop(null);
  });
  io.observe(section);

  return () => {
    renderer.setAnimationLoop(null); io.disconnect(); ro.disconnect();
    renderer.dispose(); renderer.forceContextLoss();
    canvas.remove(); zoomUi.remove();
  };
}
