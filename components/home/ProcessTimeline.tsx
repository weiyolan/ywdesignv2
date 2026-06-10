"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import type { Home } from "@/content/home";
import { Reveal } from "@/components/primitives/Reveal";

// Section 05 — process timeline (index.html :458-483, ports app.js :532-595).
// The SVG spine (track, fill, numbered dots, cap) is built imperatively from the
// measured row positions; a ScrollTrigger scrub draws the fill and lights each
// dot/row as it's reached. Reduced motion renders fully drawn + all lit.
export function ProcessTimeline({ process }: { process: Home["process"] }) {
  const p = process;
  const tlRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const tl = tlRef.current;
      const svg = svgRef.current;
      if (!tl || !svg) return;

      const NS = "http://www.w3.org/2000/svg";
      const rows = Array.from(tl.querySelectorAll<HTMLElement>(".tl-row"));
      const top = 18;
      let len = 0;
      let fill: SVGLineElement | null = null;
      let cap: SVGCircleElement | null = null;
      let dots: SVGCircleElement[] = [];
      let nums: SVGTextElement[] = [];
      let nodeY: number[] = [];

      const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
      const make = <T extends SVGElement>(name: string, attrs: Record<string, string | number>): T => {
        const n = document.createElementNS(NS, name) as T;
        for (const k in attrs) n.setAttribute(k, String(attrs[k]));
        return n;
      };

      const build = () => {
        const W = svg.clientWidth || 52;
        const H = tl.offsetHeight;
        if (!H) return;
        const cx = Math.round(W / 2);
        const bottom = H - 18;
        len = bottom - top;
        svg.setAttribute("viewBox", "0 0 " + W + " " + H);
        svg.replaceChildren();
        dots = [];
        nums = [];
        nodeY = [];
        svg.appendChild(make("line", { x1: cx, y1: top, x2: cx, y2: bottom, class: "tl-track" }));
        const tlRect = tl.getBoundingClientRect();
        rows.forEach((r) => {
          const rr = r.getBoundingClientRect();
          let y = rr.top - tlRect.top + rr.height / 2;
          y = Math.min(bottom - 4, Math.max(top + 4, y));
          nodeY.push(y);
        });
        fill = make<SVGLineElement>("line", { x1: cx, y1: top, x2: cx, y2: bottom, class: "tl-fill" });
        fill.style.strokeDasharray = String(len);
        fill.style.strokeDashoffset = String(len);
        svg.appendChild(fill);
        nodeY.forEach((y, i) => {
          dots.push(svg.appendChild(make<SVGCircleElement>("circle", { cx, cy: y, r: 13, class: "tl-dot" })));
          const t = make<SVGTextElement>("text", {
            x: cx,
            y,
            class: "tl-num",
            "text-anchor": "middle",
            "dominant-baseline": "central",
          });
          t.textContent = "0" + (i + 1);
          nums.push(svg.appendChild(t));
        });
        cap = make<SVGCircleElement>("circle", { cx, cy: top, r: 4, class: "tl-cap" });
        svg.appendChild(cap);
      };

      const update = () => {
        if (!fill || !cap) return;
        const rect = tl.getBoundingClientRect();
        const vh = window.innerHeight || 800;
        const prog = clamp((vh * 0.8 - rect.top) / (rect.height * 0.82));
        fill.style.strokeDashoffset = (len * (1 - prog)).toFixed(1);
        const fillY = top + len * prog;
        cap.setAttribute("cy", fillY.toFixed(1));
        cap.classList.toggle("on", prog > 0.001 && prog < 0.999);
        for (let i = 0; i < dots.length; i++) {
          const lit = nodeY[i] <= fillY + 1;
          dots[i].classList.toggle("lit", lit);
          nums[i].classList.toggle("lit", lit);
          rows[i].classList.toggle("lit", lit);
        }
      };

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: reduce)", () => {
        build();
        if (fill) fill.style.strokeDashoffset = "0";
        dots.forEach((d) => d.classList.add("lit"));
        nums.forEach((n) => n.classList.add("lit"));
        rows.forEach((r) => r.classList.add("lit"));
      });
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        build();
        const st = ScrollTrigger.create({
          trigger: tl,
          start: "top 80%",
          end: "bottom 82%",
          onUpdate: update,
          onRefresh: () => {
            build();
            update();
          },
        });
        update();
        if ("fonts" in document) document.fonts.ready.then(() => { build(); update(); }).catch(() => {});
        return () => st.kill();
      });
    },
    { scope: tlRef },
  );

  return (
    <section id="process" className="tex-lines">
      <div className="wrap">
        <Reveal as="div" className="sec-head">
          <span className="eyebrow">
            <span className="tk">{p.tk}</span> {p.eyebrow}
          </span>
          <h2 className="display">{p.title}</h2>
          <p>{p.intro}</p>
        </Reveal>

        <div className="timeline" id="timeline" ref={tlRef}>
          <svg className="tl-spine" preserveAspectRatio="none" aria-hidden="true" ref={svgRef} />
          <div className="tl-rows">
            {p.stages.map((st) => (
              <div className="tl-row" key={st.n}>
                <div className="tl-card">
                  <h4>{st.h}</h4>
                  <p>{st.p}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
