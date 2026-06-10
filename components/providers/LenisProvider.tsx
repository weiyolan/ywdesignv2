"use client";

import { useRef, useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis, useLenis, type LenisRef } from "lenis/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

// Rendered INSIDE <ReactLenis> so useLenis() reads its context.
function LenisGsapBridge() {
  const pathname = usePathname();
  const lenis = useLenis();
  // Keep ScrollTrigger in sync on every Lenis tick — this is what keeps the
  // scroll-driven components (SelectedWork, StackDeepDive, ProcessTimeline)
  // working untouched, since their onUpdate callbacks fire from ScrollTrigger.
  useLenis(ScrollTrigger.update);
  // Instant scroll-to-top on SPA route change (single source of truth).
  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true });
  }, [pathname, lenis]);
  return null;
}

export function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);
  const [active, setActive] = useState(true);

  // Respect prefers-reduced-motion: unmount Lenis -> native scroll.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActive(false);
    }
  }, []);

  // Hand the RAF loop to GSAP's single ticker. Read the instance lazily inside
  // the callback — the ref can be null on the first effect pass.
  useEffect(() => {
    const update = (time: number) => lenisRef.current?.lenis?.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0); // no lag compensation, or Lenis position desyncs
    return () => gsap.ticker.remove(update);
  }, []);

  if (!active) return <>{children}</>;

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false, // GSAP ticker owns the RAF loop
        lerp: 0.06, // heavier / smoother feel
        anchors: { offset: -92 }, // intercept #hash links, clear the fixed nav
        // syncTouch unset -> native momentum on touch
      }}
    >
      <LenisGsapBridge />
      {children}
    </ReactLenis>
  );
}
