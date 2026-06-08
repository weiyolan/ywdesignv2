"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { fmtValue, type NumFmt } from "@/lib/format";

// Count-up on enter-view — replaces [data-count]/funnel counters (app.js :81-95,
// :425-437). Reduced motion jumps straight to the final value.
export function CountUp({
  end,
  fmt = "plain",
  duration = 1.1,
  className,
}: {
  end: number;
  fmt?: NumFmt;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const final = fmtValue(end, fmt);
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: reduce)", () => {
        el.textContent = final;
      });
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const obj = { v: 0 };
        gsap.to(obj, {
          v: end,
          duration,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          onUpdate: () => {
            el.textContent = fmtValue(obj.v, fmt);
          },
          onComplete: () => {
            el.textContent = final;
          },
        });
      });
    },
    { scope: ref },
  );

  return (
    <span ref={ref} className={className}>
      0
    </span>
  );
}
