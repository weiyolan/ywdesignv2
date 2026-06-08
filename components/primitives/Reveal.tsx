"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

// Scroll-reveal wrapper — replaces the prototype's [data-reveal]/[data-d]
// (app.js :148-176). Renders AS the given element (no extra wrapper) so it can
// stay a grid item. Content is visible by default; GSAP sets the hidden start
// state at runtime, so no-JS and reduced-motion both show everything.
export function Reveal({
  as,
  delay = 0,
  className,
  id,
  children,
}: {
  as?: ElementType;
  delay?: number; // data-d index → 0.07s steps
  className?: string;
  id?: string;
  children?: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(el, {
          autoAlpha: 0,
          y: 24,
          duration: 0.8,
          ease: "power3.out",
          delay: delay * 0.07,
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        });
      });
    },
    { scope: ref },
  );

  const Tag = (as ?? "div") as ElementType;
  return (
    <Tag ref={ref} className={className} id={id}>
      {children}
    </Tag>
  );
}
