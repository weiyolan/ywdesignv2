"use client";

import { useEffect, useRef } from "react";
import type { Project } from "@/content/work";

type Web = NonNullable<NonNullable<Project["signatureData"]>["automatxWeb"]>;

// AutomatX signature — the labs × capabilities map from the automatx.eu hub. The
// SVG below is lifted verbatim from the live site (labels stay EN) and is the
// label / focus / link layer; automatxWeb3d.js (ported web3d.js) is lazy-loaded
// behind it and draws the three.js constellation. Both talk through classes
// (.on / .is-sel / .is-hover / .is-pin / .is-focus / .is-hub), as on the site.
// The whole map is plain DOM (innerHTML) because the 3D layer mutates it; the
// effect cleanup restores the markup so remounts start clean.
const X = `<svg class="x" viewBox="0 0 20 22" role="img" aria-label="X"><path class="x__b" d="M15.4 0H20L4.6 22H0z"/><path class="x__a" d="M0 0H4.6L20 22H15.4z"/></svg>`;
const WM = `<span class="wm">Automat${X} <span class="wm__labs">Labs</span></span>`;
const MAP = `<svg viewBox="0 0 600 480" aria-labelledby="web-t"><title id="web-t">Map of the AutomatX labs and the subjects that connect them</title>
<line class="edge edge--core" data-a="hub" data-b="pharma" x1="300" y1="240" x2="215" y2="169"/>
<line class="edge edge--core" data-a="hub" data-b="sports" x1="300" y1="240" x2="385" y2="169"/>
<line class="edge edge--core" data-a="hub" data-b="robotics" x1="300" y1="240" x2="215" y2="311"/>
<line class="edge edge--core" data-a="hub" data-b="ai" x1="300" y1="240" x2="385" y2="311"/>
<line class="edge" data-a="indus" data-b="pharma" x1="69" y1="165" x2="215" y2="169"/>
<line class="edge" data-a="indus" data-b="robotics" x1="69" y1="165" x2="215" y2="311"/>
<line class="edge" data-a="val" data-b="pharma" x1="204" y1="60" x2="215" y2="169"/>
<line class="edge" data-a="data" data-b="pharma" x1="396" y1="60" x2="215" y2="169"/>
<line class="edge" data-a="data" data-b="sports" x1="396" y1="60" x2="385" y2="169"/>
<line class="edge" data-a="data" data-b="ai" x1="396" y1="60" x2="385" y2="311"/>
<line class="edge" data-a="sensors" data-b="sports" x1="531" y1="165" x2="385" y2="169"/>
<line class="edge" data-a="sensors" data-b="robotics" x1="531" y1="165" x2="215" y2="311"/>
<line class="edge" data-a="sensors" data-b="pharma" x1="531" y1="165" x2="215" y2="169"/>
<line class="edge" data-a="sw" data-b="pharma" x1="531" y1="315" x2="215" y2="169"/>
<line class="edge" data-a="sw" data-b="sports" x1="531" y1="315" x2="385" y2="169"/>
<line class="edge" data-a="sw" data-b="ai" x1="531" y1="315" x2="385" y2="311"/>
<line class="edge" data-a="ml" data-b="ai" x1="396" y1="420" x2="385" y2="311"/>
<line class="edge" data-a="ml" data-b="sports" x1="396" y1="420" x2="385" y2="169"/>
<line class="edge" data-a="ml" data-b="pharma" x1="396" y1="420" x2="215" y2="169"/>
<line class="edge" data-a="hw" data-b="robotics" x1="204" y1="420" x2="215" y2="311"/>
<line class="edge" data-a="hw" data-b="ai" x1="204" y1="420" x2="385" y2="311"/>
<line class="edge" data-a="hw" data-b="sports" x1="204" y1="420" x2="385" y2="169"/>
<line class="edge" data-a="mech" data-b="robotics" x1="69" y1="315" x2="215" y2="311"/>
<line class="edge" data-a="mech" data-b="sports" x1="69" y1="315" x2="385" y2="169"/>
<line class="edge" data-a="mech" data-b="pharma" x1="69" y1="315" x2="215" y2="169"/>
<g class="node node--hub" data-id="hub" tabindex="0" data-title="AutomatX Labs" data-desc="AutomatX Labs — four labs split by what they improve: a process, a body, a physical thing, a computation."><circle cx="300" cy="240" r="30"/><path d="M291 231L309 249M309 231L291 249"/></g>
<g class="node" data-id="indus" tabindex="0" data-desc="Prototyping → industrialisation: from a first working part to repeatable production."><circle cx="69" cy="165" r="7"/><text x="69" y="191">Industrialisation</text></g>
<g class="node" data-id="val" tabindex="0" data-desc="GMP validation: qualification, process validation, data integrity."><circle cx="204" cy="60" r="7"/><text x="204" y="86">Validation</text></g>
<g class="node" data-id="data" tabindex="0" data-desc="Pipelines that turn raw signals and runs into comparable numbers."><circle cx="396" cy="60" r="7"/><text x="396" y="86">Data</text></g>
<g class="node" data-id="sensors" tabindex="0" data-desc="IMUs, pressure, heart rate, temperature — measuring the real world, down to 6D motion tracking."><circle cx="531" cy="165" r="7"/><text x="531" y="191">Sensors</text></g>
<g class="node" data-id="sw" tabindex="0" data-desc="C#, Python and JavaScript tying instruments, sensors and data together."><circle cx="531" cy="315" r="7"/><text x="531" y="341">Software</text></g>
<g class="node" data-id="ml" tabindex="0" data-desc="Models that classify, predict and detect anomalies in lab and sensor data."><circle cx="396" cy="420" r="7"/><text x="396" y="446">AI/ML</text></g>
<g class="node" data-id="hw" tabindex="0" data-desc="Microcontrollers, circuits and chips — down to the transistor."><circle cx="204" cy="420" r="7"/><text x="204" y="446">Electronics</text></g>
<g class="node" data-id="mech" tabindex="0" data-desc="Mechanical design: CAD, FEA, mechanisms — from bike geometry to lab fixtures."><circle cx="69" cy="315" r="7"/><text x="69" y="341">Mechanics</text></g>
<a href="https://automatx.eu/pharma/" class="node node--lab" data-id="pharma" style="--c:#3aa0c8" data-title="Process · Pharma lab" data-desc="Improves pharma research and production workflows: Hamilton VENUS automation, software, GMP validation, industrialisation. The consulting practice."><circle cx="215" cy="169" r="22"/><text x="215" y="213">Process</text><text class="sub" x="215" y="230">Pharma lab</text></a>
<a href="https://automatx.eu/sports/" class="node node--lab" data-id="sports" style="--c:#4fae7a" data-title="Body · Sports lab" data-desc="Improves the human: quantitative motion analysis (from surgical-skill research), sleep, body temperature and biometrics — for badminton, running and cycling, and the effect of equipment and environment."><circle cx="385" cy="169" r="22"/><text x="385" y="213">Body</text><text class="sub" x="385" y="230">Sports lab</text></a>
<a href="https://automatx.eu/robotics/" class="node node--lab" data-id="robotics" style="--c:#d8a23a" data-title="Matter · Robotics lab" data-desc="Improves physical things: 3D printing, soft robotics, moulding, materials and sensor hardware."><circle cx="215" cy="311" r="22"/><text x="215" y="355">Matter</text><text class="sub" x="215" y="372">Robotics lab</text></a>
<a href="https://automatx.eu/ai/" class="node node--lab" data-id="ai" style="--c:#9b7be0" data-title="Compute · AI lab" data-desc="Improves computation: AI and machine learning, and the silicon underneath — 2 nm nodes, GAA transistors, imec research."><circle cx="385" cy="311" r="22"/><text x="385" y="355">Compute</text><text class="sub" x="385" y="372">AI lab</text></a>
</svg>`;

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

// hover / focus / pin logic, ported from automatx.eu main.js
function wire(web: HTMLElement, goLabel: string) {
  const panel = web.querySelector<HTMLElement>(".web__panel")!;
  const svg = web.querySelector("svg")!;
  const initial = panel.innerHTML;
  const show = (node: HTMLElement | SVGElement) => {
    const id = node.dataset.id!;
    const isHub = id === "hub";
    web.classList.add("is-focus");
    web.classList.toggle("is-hub", isHub);
    web.querySelectorAll(".on, .is-sel").forEach((el) => el.classList.remove("on", "is-sel"));
    node.classList.add("on", "is-sel");
    web.querySelectorAll<SVGElement>(".edge").forEach((e) => {
      if (!isHub && e.dataset.a !== id && e.dataset.b !== id) return;
      e.classList.add("on");
      web.querySelector(`[data-id="${e.dataset.a === id ? e.dataset.b : e.dataset.a}"]`)?.classList.add("on");
    });
    panel.innerHTML = "<b></b><p></p>";
    if (isHub) panel.querySelector("b")!.innerHTML = WM;
    else panel.querySelector("b")!.textContent = node.dataset.title || node.querySelector("text")!.textContent;
    panel.querySelector("p")!.textContent = node.dataset.desc ?? "";
    const href = node.getAttribute("href");
    if (href) { // labs: the map only selects, the panel links through
      const go = document.createElement("a");
      go.className = "web__go";
      go.href = href;
      go.style.color = (node as SVGElement).style.getPropertyValue("--c");
      go.textContent = goLabel;
      panel.appendChild(go);
    }
  };
  const reset = () => {
    web.classList.remove("is-focus", "is-hub");
    web.querySelectorAll(".is-sel").forEach((el) => el.classList.remove("is-sel"));
    panel.innerHTML = initial;
  };
  let pinned: SVGElement | null = null;
  const pin = (n: SVGElement | null) => {
    pinned?.classList.remove("is-pin");
    pinned = n;
    if (n) { n.classList.add("is-pin"); show(n); } else reset();
  };
  web.querySelectorAll<SVGElement>(".node").forEach((n) => {
    n.addEventListener("mouseenter", () => { n.classList.add("is-hover"); show(n); });
    n.addEventListener("mouseleave", () => n.classList.remove("is-hover"));
    n.addEventListener("focus", () => show(n));
  });
  svg.addEventListener("mouseleave", () => (pinned ? show(pinned) : reset()));
  web.addEventListener("focusout", (e) => {
    if (web.contains(e.relatedTarget as Node)) return;
    if (pinned) show(pinned);
    else reset();
  });
  web.addEventListener("keydown", (e) => {
    const n = (e.target as Element).closest?.<SVGElement>(".node");
    if (e.key === "Escape") pin(null);
    else if ((e.key === "Enter" || e.key === " ") && n) { e.preventDefault(); pin(n); }
  });
  // click / tap keeps a star selected; a tap on empty space (not a rotate) clears it
  web.addEventListener("click", (e) => {
    if (!svg.contains(e.target as Node)) return;
    const n = (e.target as Element).closest<SVGElement>(".node");
    if (!n) { if (!svg.dataset.rotated) pin(null); return; }
    e.preventDefault(); // labs are links (no-JS fallback); in the map a click only selects
    pin(n);
  });
}

export function AutomatxWeb({ data }: { data: Web }) {
  const ref = useRef<HTMLDivElement>(null);
  const html =
    `<div class="web">${MAP}<div class="web__panel" aria-live="polite">` +
    `<b>${WM}</b><p>${esc(data.intro)}</p><small>${esc(data.hint)}</small></div></div>`;

  useEffect(() => {
    const stage = ref.current!;
    const web = stage.querySelector<HTMLElement>(".web")!;
    wire(web, data.go);
    let unmount = () => {};
    let alive = true;
    let io: IntersectionObserver | undefined;
    // three.js layer: fetched only when the map nears the viewport; the SVG stays the fallback
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches && window.WebGLRenderingContext) {
      const loader = document.createElement("span");
      loader.className = "web__load";
      loader.setAttribute("aria-hidden", "true");
      loader.innerHTML = "<i></i><i></i><i></i>";
      web.appendChild(loader);
      web.classList.add("is-loading");
      io = new IntersectionObserver(([e]) => {
        if (!e.isIntersecting) return;
        io!.disconnect();
        import("./automatxWeb3d")
          .then((m) => { if (alive) unmount = m.mountAutomatxWeb(stage, web); })
          .catch(() => web.classList.remove("is-loading"));
      }, { rootMargin: "400px 0px" });
      io.observe(web);
    }
    return () => {
      alive = false;
      io?.disconnect();
      unmount();
      stage.innerHTML = html;
    };
  }, [html, data.go]);

  return <div ref={ref} className="axw" dangerouslySetInnerHTML={{ __html: html }} />;
}
