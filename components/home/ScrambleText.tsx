"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const GLYPHS = "!<>-_\\/[]{}=+*^?#__01010";

// Per-word character scramble — ported from app.js :52-79, fired once when the
// word scrolls into view. Reduced motion renders the final text immediately.
// The word is normally inside a Reveal-wrapped heading, so it's hidden during
// entrance and never flashes its final state before scrambling.
export function ScrambleText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const chars = text.split("");
        const isSpace = (c: string) => /\s| /.test(c);
        const resolveAt = chars.map((c) =>
          isSpace(c) ? 0 : Math.floor(Math.random() * 16) + 6,
        );
        const maxF = Math.max(...resolveAt) + 1;
        let frame = 0;
        let timer = 0;

        const tick = () => {
          let out = "";
          for (let i = 0; i < chars.length; i++) {
            const c = chars[i];
            if (isSpace(c)) {
              out += c;
              continue;
            }
            out +=
              frame >= resolveAt[i]
                ? c
                : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          }
          el.textContent = out;
          frame++;
          if (frame <= maxF) timer = window.setTimeout(tick, 38);
          else unlock();
        };

        // Glyphs are wider than most letters in the proportional display font,
        // so a scrambling word can grow and briefly wrap, making the heading jump.
        // Pin the word to its final width for the duration (single-line words only).
        const unlock = () => {
          el.textContent = text;
          el.style.removeProperty("display");
          el.style.removeProperty("width");
          el.style.removeProperty("white-space");
        };
        const start = () => {
          if (el.getClientRects().length === 1) {
            const w = el.getBoundingClientRect().width;
            el.style.display = "inline-block";
            el.style.width = `${w}px`;
            el.style.whiteSpace = "nowrap";
          }
          tick();
        };

        const st = ScrollTrigger.create({
          trigger: el,
          start: "top 92%",
          once: true,
          onEnter: start,
        });

        return () => {
          window.clearTimeout(timer);
          st.kill();
          unlock();
        };
      });
    },
    { scope: ref, dependencies: [text] },
  );

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}
