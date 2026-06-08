"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { home } from "@/content/home";
import { Reveal } from "@/components/primitives/Reveal";
import { CaseLink } from "@/components/primitives/CaseLink";
import { Button } from "@/components/primitives/Button";
import { Terminal } from "@/components/home/Terminal";
import { SupportingTech } from "@/components/home/SupportingTech";

// Section 02 — stack deep-dive (index.html :214-366, ports app.js :188-302).
// `openIndex` is which panel is expanded (grid-rows accordion, CSS-animated);
// `railIndex` is how far the scroll-driven rail/lit state has progressed. A
// ScrollTrigger advances both as each bar crosses 42% of the viewport; clicks
// drive them too. The rail-fill height is measured from the active bar's centre.
export function StackDeepDive() {
  const s = home.stack;
  const [openIndex, setOpenIndex] = useState(0);
  const [railIndex, setRailIndex] = useState(-1);
  const rowsRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  // Scroll-driven active row (GSAP ScrollTrigger). Reduced motion: row 0 open.
  useGSAP(
    () => {
      const rowsEl = rowsRef.current;
      if (!rowsEl) return;

      const computeActive = () => {
        const vh = window.innerHeight || 800;
        const sect = rowsEl.getBoundingClientRect();
        if (sect.top > vh * 0.55) {
          setRailIndex(-1);
          return;
        }
        const threshold = vh * 0.42;
        const bars = rowsEl.querySelectorAll<HTMLElement>(".deep-bar");
        let idx = 0;
        bars.forEach((b, i) => {
          if (b.getBoundingClientRect().top <= threshold) idx = i;
        });
        setOpenIndex(idx);
        setRailIndex(idx);
      };

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: reduce)", () => {
        setOpenIndex(0);
        setRailIndex(0);
      });
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const st = ScrollTrigger.create({
          trigger: rowsEl,
          start: "top bottom",
          end: "bottom top",
          onUpdate: computeActive,
          onRefresh: computeActive,
          onLeaveBack: () => setRailIndex(-1),
        });
        computeActive();
        return () => st.kill();
      });
    },
    { scope: rowsRef },
  );

  // Measure rail-fill height from the active bar's centre (app.js :201-206).
  useEffect(() => {
    const rowsEl = rowsRef.current;
    const fill = fillRef.current;
    if (!rowsEl || !fill) return;

    const measure = () => {
      if (railIndex < 0) {
        fill.style.height = "0px";
        return;
      }
      const bars = rowsEl.querySelectorAll<HTMLElement>(".deep-bar");
      const bar = bars[railIndex];
      if (!bar) return;
      const b = bar.getBoundingClientRect();
      const base = rowsEl.getBoundingClientRect();
      const px = Math.max(0, b.top - base.top + b.height / 2);
      fill.style.height = px.toFixed(1) + "px";
    };

    measure();
    const t = window.setTimeout(measure, 480); // after the panel settles
    window.addEventListener("resize", measure);
    if ("fonts" in document) document.fonts.ready.then(measure).catch(() => {});
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("resize", measure);
    };
  }, [railIndex, openIndex]);

  const onBarClick = (i: number) => {
    if (i === openIndex) {
      // collapse the active row, retreat the rail one step
      setOpenIndex(-1);
      setRailIndex(i - 1);
    } else {
      setOpenIndex(i);
      setRailIndex(i);
    }
  };

  return (
    <section id="stack" className="tex-dots">
      <div className="wrap">
        <Reveal as="div" className="sec-head">
          <span className="eyebrow">
            <span className="tk">{s.tk}</span> {s.eyebrow}
          </span>
          <h2 className="display">
            {s.title[0]}
            <br />
            {s.title[1]}
          </h2>
          <p>{s.intro}</p>
        </Reveal>

        <div className="stack-deep">
          <div className="deep-rows" ref={rowsRef}>
            <div className="deep-rail" aria-hidden="true">
              <div className="deep-rail-track" />
              <div
                className={"deep-rail-fill" + (railIndex < 0 ? " empty" : "")}
                ref={fillRef}
              />
            </div>

            {s.rows.map((row, i) => (
              <article
                className={
                  "deep" +
                  (i === openIndex ? " is-open" : "") +
                  (i <= railIndex ? " lit" : "")
                }
                key={row.name}
              >
                <button
                  className="deep-bar"
                  type="button"
                  aria-expanded={i === openIndex}
                  onClick={() => onBarClick(i)}
                >
                  <span className="deep-node" aria-hidden="true" />
                  <span className="deep-mark">{row.mark}</span>
                  <span className="deep-meta">
                    <span className="deep-name">{row.name}</span>
                    <span className="deep-tag">{row.tag}</span>
                  </span>
                  <span className="deep-role">{row.role}</span>
                  <span className="deep-toggle" aria-hidden="true" />
                </button>
                <div className="deep-panel">
                  <div className="deep-panel-in">
                    <div className="deep-panel-pad">
                      <p>{row.body}</p>
                      <ul className="deep-points">
                        {row.points.map((pt, k) => (
                          <li key={k}>{pt}</li>
                        ))}
                      </ul>
                      <CaseLink data={row.case} />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <Reveal as="div" className="stack-term">
          <Terminal />
          <div className="stack-term-side">
            <span className="eyebrow">
              <span className="tk">{"//"}</span> {s.side.eyebrow}
            </span>
            <h3>
              {s.side.h[0]}
              <br />
              {s.side.h[1]}
            </h3>
            <p>{s.side.p}</p>
            <Button href={s.side.cta.href} variant="ghost">
              {s.side.cta.label} <span className="arr">→</span>
            </Button>
          </div>
        </Reveal>

        <SupportingTech />
      </div>
    </section>
  );
}
