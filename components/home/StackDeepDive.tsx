"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { getHome } from "@/content/home";
import { localizedHref } from "@/lib/i18n";
import { useLocale } from "@/components/providers/LocaleProvider";
import { Reveal } from "@/components/primitives/Reveal";
import { CaseLink } from "@/components/primitives/CaseLink";
import { Button } from "@/components/primitives/Button";
import { Terminal } from "@/components/home/Terminal";
import { SupportingTech } from "@/components/home/SupportingTech";

// Section 02 — stack deep-dive (index.html :214-366, ports app.js :188-302).
// A single ScrollTrigger reads a "line" at 42% of the viewport every frame:
//   • the rail fill height is the continuous distance from the section top to
//     that line (smoothed with gsap.quickTo, so it grows fluidly with scroll);
//   • each row lights + expands (`lit` / `is-open`) the moment its node centre
//     passes the line. `openIndex` also responds to clicks; the next scroll tick
//     recomputes it (scroll wins). The accordion changes the section height, so
//     we ScrollTrigger.refresh() after a panel settles to re-sync.
export function StackDeepDive() {
  const lang = useLocale();
  const s = getHome(lang).stack;
  const [openIndex, setOpenIndex] = useState(0);
  const [litIndex, setLitIndex] = useState(-1);
  const [railActive, setRailActive] = useState(false);
  const rowsRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const rowsEl = rowsRef.current;
      const fillEl = fillRef.current;
      if (!rowsEl || !fillEl) return;

      // quickTo lerps toward the latest target each frame → buttery fill that
      // tracks rapid wheel steps without a CSS transition fighting the JS.
      const setFill = gsap.quickTo(fillEl, "height", {
        duration: 0.25,
        ease: "power3.out",
      });

      const computeActive = () => {
        const vh = window.innerHeight || 800;
        const line = vh * 0.42;
        const base = rowsEl.getBoundingClientRect();

        // Continuous fill: how far the read-line has travelled into the section.
        const fillPx = Math.min(Math.max(line - base.top, 0), base.height);
        setFill(fillPx);
        setRailActive(fillPx > 0.5);

        // Discrete states: a row is reached once its node centre passes the line.
        const bars = rowsEl.querySelectorAll<HTMLElement>(".deep-bar");
        let idx = -1;
        bars.forEach((b, i) => {
          const r = b.getBoundingClientRect();
          if (r.top + r.height / 2 <= line) idx = i;
        });
        setLitIndex(idx);
        setOpenIndex(idx);
      };

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        setOpenIndex(0);
        setLitIndex(0);
        setRailActive(true);
        const first = rowsEl.querySelector<HTMLElement>(".deep-bar");
        if (first) {
          const r = first.getBoundingClientRect();
          const base = rowsEl.getBoundingClientRect();
          gsap.set(fillEl, { height: r.top - base.top + r.height / 2 });
        }
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const st = ScrollTrigger.create({
          trigger: rowsEl,
          start: "top bottom",
          end: "bottom top",
          onUpdate: computeActive,
          onRefresh: computeActive,
        });
        computeActive();
        return () => st.kill();
      });
    },
    { scope: rowsRef },
  );

  // The accordion (grid-rows .44s) changes the section height; once it settles,
  // refresh so the rail — and every Reveal trigger below — re-measures.
  useEffect(() => {
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 500);
    return () => window.clearTimeout(t);
  }, [openIndex]);

  // Clicks just toggle the panel; the next scroll tick reconciles lit/open.
  const onBarClick = (i: number) => {
    setOpenIndex((cur) => (cur === i ? -1 : i));
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
                className={"deep-rail-fill" + (railActive ? "" : " empty")}
                ref={fillRef}
              />
            </div>

            {s.rows.map((row, i) => (
              <article
                className={
                  "deep" +
                  (i === openIndex ? " is-open" : "") +
                  (i <= litIndex ? " lit" : "")
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
                      <CaseLink data={row.case} lang={lang} />
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
            <Button href={localizedHref(s.side.cta.href, lang)} variant="ghost">
              {s.side.cta.label} <span className="arr">→</span>
            </Button>
          </div>
        </Reveal>

        <SupportingTech lang={lang} />
      </div>
    </section>
  );
}
