"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { getHome } from "@/content/home";
import { localizedHref } from "@/lib/i18n";
import { useLocale } from "@/components/providers/LocaleProvider";
import { Reveal } from "@/components/primitives/Reveal";

// Section 03 — selected work. Cards are CSS position:sticky (styles.css :578-595);
// this adds the scale/brightness fall-off as each card is overlapped by the next
// (ports app.js :503-527). Desktop + no-reduced-motion only.
export function SelectedWork({ titleAs = "h2" }: { titleAs?: "h1" | "h2" } = {}) {
  const lang = useLocale();
  const w = getHome(lang).work;
  const gridRef = useRef<HTMLDivElement>(null);
  const Title = titleAs;

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
          <Title className="display">{w.title}</Title>
          <p>{w.intro}</p>
        </Reveal>

        <div className="work-grid" id="work-grid" ref={gridRef}>
          {w.items.map((item, i) => (
            <article
              className="proj"
              style={{ "--i": i } as React.CSSProperties}
              key={item.title}
            >
              <Link className="shot" href={localizedHref(`/work/${item.slug}`, lang)}>
                <span className="num">{item.num}</span>
                <Image
                  src={item.img}
                  alt={`${item.title} — ${item.cat}`}
                  fill
                  sizes="(max-width: 820px) 100vw, 50vw"
                />
              </Link>
              <div className="p-in">
                <span className="p-cat">{item.cat}</span>
                <h3>
                  <Link href={localizedHref(`/work/${item.slug}`, lang)}>{item.title}</Link>
                </h3>
                <p>{item.body}</p>
                <div className="p-foot">
                  <Link className="visit case" href={localizedHref(`/work/${item.slug}`, lang)}>
                    {w.cta.caseStudy} <span className="arr">→</span>
                  </Link>
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
