"use client";

import { useEffect, type ReactNode } from "react";
import { ScrollTrigger } from "@/lib/gsap";

// Web fonts shift layout after first paint; recalc all ScrollTrigger positions
// once fonts are ready (mirrors the prototype's document.fonts.ready rebuilds).
export function GsapProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    if ("fonts" in document) {
      document.fonts.ready.then(refresh).catch(() => {});
    }
    const id = window.setTimeout(refresh, 300);
    return () => window.clearTimeout(id);
  }, []);

  return <>{children}</>;
}
