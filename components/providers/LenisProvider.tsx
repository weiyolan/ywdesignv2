"use client";

import { useRef, useEffect, useSyncExternalStore, type ReactNode } from "react";
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
  // Instant scroll on SPA route change (single source of truth): to the #hash
  // target when there is one (nav menu → /technology#gsap), else to the top.
  useEffect(() => {
    if (!lenis) return;
    const id = decodeURIComponent(location.hash.slice(1));
    const el = id ? document.getElementById(id) : null;
    if (!el) return void lenis.scrollTo(0, { immediate: true });
    // next frame: let pinned ScrollTrigger sections lay out first
    const raf = requestAnimationFrame(() => lenis.scrollTo(el, { offset: -92, immediate: true }));
    return () => cancelAnimationFrame(raf);
  }, [pathname, lenis]);
  return null;
}

const REDUCED = "(prefers-reduced-motion: reduce)";
const reducedMotion = () => window.matchMedia(REDUCED).matches;
function subscribeReducedMotion(cb: () => void) {
  const mq = window.matchMedia(REDUCED);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

export function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);
  // Respect prefers-reduced-motion: unmount Lenis -> native scroll (also
  // follows live OS-setting changes).
  const active = !useSyncExternalStore(subscribeReducedMotion, reducedMotion, () => false);

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
