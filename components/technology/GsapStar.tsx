"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, Draggable, MorphSVGPlugin } from "@/lib/gsap";

// GSAP panel (technology.html :228-247, ports the star script :456-517).
// A draggable SVG that morphs between three shapes on tap and springs home on
// reset. Entrance pop + idle wobble run via ScrollTrigger; reduced motion keeps
// a static star but still allows tap-to-morph (no entrance / idle / inertia).
const STAR =
  "M0 -46 L10.87 -14.97 L43.75 -14.21 L17.59 5.72 L27.04 37.21 L0 18.5 L-27.04 37.21 L-17.59 5.72 L-43.75 -14.21 L-10.87 -14.97 Z";
const HEART =
  "M0 -16 C -11 -42 -46 -33 -46 -7 C -46 14 -17 30 0 44 C 17 30 46 14 46 -7 C 46 -33 11 -42 0 -16 Z";
const BLOB =
  "M0 -42 C 24 -42 46 -24 42 0 C 39 22 46 30 30 40 C 14 50 -16 48 -32 36 C -48 24 -44 4 -44 -8 C -44 -30 -22 -42 0 -42 Z";
const SHAPES = [STAR, HEART, BLOB];

export function GsapStar() {
  const stageRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const resetRef = useRef<HTMLButtonElement>(null);
  const idxRef = useRef(0);

  useGSAP(
    () => {
      const svg = svgRef.current;
      const path = pathRef.current;
      const stage = stageRef.current;
      const resetBtn = resetRef.current;
      if (!svg || !path || !stage) return;

      // MorphSVGPlugin is registered in lib/gsap; guard anyway for SSR/no-plugin.
      const hasMorph = Boolean(MorphSVGPlugin);

      const morph = () => {
        idxRef.current = (idxRef.current + 1) % SHAPES.length;
        const idx = idxRef.current;
        const to = SHAPES[idx];
        gsap.to(svg, {
          keyframes: [
            { scale: 1.18, duration: 0.16 },
            { scale: 1, duration: 0.34, ease: "elastic.out(1,.5)" },
          ],
          rotate: "+=" + (idx % 2 ? 18 : -18),
          transformOrigin: "50% 50%",
        });
        if (hasMorph) {
          gsap.to(path, { duration: 0.6, morphSVG: to, ease: "back.inOut(1.7)" });
        } else {
          path.setAttribute("d", to);
        }
      };

      const resetStar = () => {
        gsap.to(svg, { x: 0, y: 0, rotate: 0, scale: 1, duration: 0.55, ease: "power3.out" });
        if (idxRef.current !== 0) {
          idxRef.current = 0;
          if (hasMorph) {
            gsap.to(path, { duration: 0.55, morphSVG: STAR, ease: "back.inOut(1.7)" });
          } else {
            path.setAttribute("d", STAR);
          }
        }
      };

      resetBtn?.addEventListener("click", resetStar);

      const mm = gsap.matchMedia();

      // Reduced motion: static star, tap-to-morph only (no entrance/idle/drag).
      mm.add("(prefers-reduced-motion: reduce)", () => {
        svg.style.cursor = "pointer";
        svg.addEventListener("click", morph);
        return () => svg.removeEventListener("click", morph);
      });

      // Full motion: entrance pop + idle wobble (ScrollTrigger), Draggable + morph.
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const st = ScrollTrigger.create({
          trigger: stage,
          start: "top 75%",
          once: true,
          onEnter: () => {
            gsap.from(svg, {
              scale: 0,
              rotate: -140,
              opacity: 0,
              duration: 1,
              ease: "back.out(1.7)",
              transformOrigin: "50% 50%",
            });
            gsap.to(svg, {
              rotate: "+=4",
              duration: 3.2,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              delay: 1,
            });
          },
        });

        let drag: Draggable | undefined;
        try {
          // Pass the element, not a "#star-stage" selector — Draggable's selector
          // resolution can return undefined here and throw in applyBounds.
          [drag] = Draggable.create(svg, {
            type: "x,y",
            bounds: stage,
            edgeResistance: 0.65,
            dragClickables: true,
            onClick: morph,
          });
        } catch {
          // Draggable is an enhancement — never let it break the page.
          svg.style.cursor = "pointer";
          svg.addEventListener("click", morph);
        }

        return () => {
          st.kill();
          drag?.kill();
          svg.removeEventListener("click", morph);
        };
      });

      return () => {
        resetBtn?.removeEventListener("click", resetStar);
      };
    },
    { scope: stageRef },
  );

  return (
    <div className="panel" id="gsap-panel">
      <div className="panel-bar">
        <i />
        <i />
        <i />
        <span>draggable-star.tsx</span>
        <button className="star-reset" id="star-reset" type="button" aria-label="Reset star" ref={resetRef}>
          ↺ reset
        </button>
      </div>
      <div className="star-stage" id="star-stage" ref={stageRef}>
        <svg
          className="star-drag"
          id="star-drag"
          viewBox="-50 -50 100 100"
          role="img"
          aria-label="Draggable star — tap to morph"
          ref={svgRef}
        >
          <path id="star-path" d={STAR} ref={pathRef} />
        </svg>
        <span className="star-hint">
          <b>drag</b> me &nbsp;·&nbsp; <b>tap</b> to morph
        </span>
      </div>
      <div className="gsap-code">
        <span className="cm">{"// grab it, fling it, morph it"}</span>
        {"\n"}
        Draggable.<span className="fn">create</span>(<span className="st">"#star"</span>, {"{"}
        {"\n"}  bounds: <span className="st">"#stage"</span>, type: <span className="st">"x,y"</span>,
        {"\n"}  onClick: () =&gt; gsap.<span className="fn">to</span>(<span className="st">"#star"</span>, {"{"}
        {"\n"}    morphSVG: next, ease: <span className="st">"back.inOut(1.7)"</span>
        {"\n"}  {"}"})
        {"\n"}
        {"});"}
      </div>
    </div>
  );
}
