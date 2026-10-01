"use client";

import { Fragment, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const GLYPHS = "!<>-_\\/[]{}=+*^?#__01010";

// Per-word character scramble — ported from app.js :52-79, fired once when the
// word scrolls into view. Reduced motion renders the final text immediately.
// The word is normally inside a Reveal-wrapped heading, so it's hidden during
// entrance and never flashes its final state before scrambling.
// The real words stay in the flow (transparent while scrambling) and the glyphs
// are drawn in an absolute overlay per word, so wider glyphs never reflow the line.
export function ScrambleText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const parts = text.split(/(\s+)/); // odd indices are the whitespace separators

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const fx = Array.from(el.querySelectorAll<HTMLElement>(".scr-fx"));
        const words = parts.filter((_, i) => i % 2 === 0 && parts[i]);
        const resolveAt = words.map((w) => w.split("").map(() => Math.floor(Math.random() * 16) + 6));
        const maxF = Math.max(...resolveAt.flat()) + 1;
        let frame = 0;
        let timer = 0;

        const tick = () => {
          words.forEach((w, wi) => {
            let out = "";
            for (let i = 0; i < w.length; i++)
              out += frame >= resolveAt[wi][i] ? w[i] : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            fx[wi].textContent = out;
          });
          frame++;
          if (frame <= maxF) timer = window.setTimeout(tick, 38);
          else done();
        };
        const done = () => {
          el.classList.remove("is-scr");
          fx.forEach((f) => (f.textContent = ""));
        };

        const st = ScrollTrigger.create({
          trigger: el,
          start: "top 92%",
          once: true,
          onEnter: () => {
            el.classList.add("is-scr");
            tick();
          },
        });

        return () => {
          window.clearTimeout(timer);
          st.kill();
          done();
        };
      });
    },
    { scope: ref, dependencies: [text] },
  );

  return (
    <span ref={ref} className={className}>
      {parts.map((p, i) =>
        i % 2 ? (
          <Fragment key={i}>{p}</Fragment>
        ) : p ? (
          <span key={i} className="scr-w">
            <span className="scr-t">{p}</span>
            <span className="scr-fx" aria-hidden="true" />
          </span>
        ) : null,
      )}
    </span>
  );
}
