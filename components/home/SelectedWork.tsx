"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import type { Home } from "@/content/home";
import { Reveal } from "@/components/primitives/Reveal";
import { LocaleLink } from "@/components/primitives/LocaleLink";

// Section 03 — selected work. Cards are CSS position:sticky (styles.css :578-595);
// this adds the scale/brightness fall-off as each card is overlapped by the next
// (ports app.js :503-527). Desktop + no-reduced-motion only.
export function SelectedWork({ work }: { work: Home["work"] }) {
  const w = work;
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const grid = gridRef.current;
      if (!grid) return;
      const cards = Array.from(grid.querySelectorAll<HTMLElement>(".proj"));
      const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);

      const apply = () => {
        cards.forEach((c, i) => {
          const next = cards[i + 1];
          if (!next) {
            gsap.set(c, { clearProps: "transform,filter" });
            return;
          }
          const r = c.getBoundingClientRect();
          const nr = next.getBoundingClientRect();
          const gap = nr.top - r.top;
          const h = r.height || 1;
          const prog = clamp(1 - gap / h, 0, 1);
          gsap.set(c, {
            scale: 1 - prog * 0.05,
            filter: `brightness(${(1 - prog * 0.32).toFixed(3)})`,
          });
        });
      };

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference) and (min-width: 821px)", () => {
        const st = ScrollTrigger.create({
          trigger: grid,
          start: "top bottom",
          end: "bottom top",
          onUpdate: apply,
          onRefresh: apply,
        });
        apply();
        return () => {
          st.kill();
          cards.forEach((c) => gsap.set(c, { clearProps: "transform,filter" }));
        };
      });
    },
    { scope: gridRef },
  );

  return (
    <section id="work">
      <div className="wrap">
        <Reveal as="div" className="sec-head">
          <span className="eyebrow">
            <span className="tk">{w.tk}</span> {w.eyebrow}
          </span>
          <h2 className="display">{w.title}</h2>
          <p>{w.intro}</p>
        </Reveal>

        <div className="work-grid" id="work-grid" ref={gridRef}>
          {w.items.map((item, i) => (
            <article
              className="proj"
              style={{ "--i": i } as React.CSSProperties}
              key={item.title}
            >
              <LocaleLink className="shot" href={`/work/${item.slug}`}>
                <span className="num">{item.num}</span>
                <Image
                  src={item.img}
                  alt={`${item.title} — ${item.cat}`}
                  fill
                  sizes="(max-width: 820px) 100vw, 50vw"
                />
              </LocaleLink>
              <div className="p-in">
                <span className="p-cat">{item.cat}</span>
                <h3>
                  <LocaleLink href={`/work/${item.slug}`}>{item.title}</LocaleLink>
                </h3>
                <p>{item.body}</p>
                <div className="p-foot">
                  <LocaleLink className="visit case" href={`/work/${item.slug}`}>
                    {w.cta.caseStudy} <span className="arr">→</span>
                  </LocaleLink>
                  <a className="visit" href={item.href} target="_blank" rel="noopener noreferrer">
                    {w.cta.visit} <span className="arr">↗</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
