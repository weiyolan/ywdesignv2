"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

// three.js + R3F live in their own chunk, fetched only when the section nears
// the viewport — the home page's first-load JS is unchanged.
const SunMoonScene = dynamic(() => import("@/components/home/SunMoonScene"), { ssr: false });

// Flare ghosts along the light axis: k = position on the axis (negative = the
// opposite side), s = size, c = colour, t = look (disc / ring / hex).
const GHOSTS = [
  { k: -0.55, s: 90, c: "#ff5fa2", t: "disc" },
  { k: 0.32, s: 46, c: "#ffd36b", t: "disc" },
  { k: 0.58, s: 130, c: "#7cf2c8", t: "ring" },
  { k: 0.86, s: 64, c: "#ff8a3c", t: "hex" },
  { k: 1.18, s: 210, c: "#9b7bff", t: "disc" },
  { k: 1.55, s: 38, c: "#fff1c2", t: "hex" },
];

// star layers: [parallax px per radian of yaw, tile size px] — tiles match SunMoon.tsx
const SKY = [
  [60, 360],
  [110, 520],
  [190, 760],
] as const;

type Copy = {
  sun: string;
  moon: string;
  toggle: string;
  hint: string;
  chips: string[];
  aria: { sun: string; moon: string };
};

export function SunMoonDemo({ copy }: { copy: Copy }) {
  const [moon, setMoon] = useState(false);
  const [near, setNear] = useState(false); // ever came close → mount the scene
  const [visible, setVisible] = useState(false); // on screen → run the frame loop
  const [webgl, setWebgl] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const fx = useRef<HTMLDivElement>(null);
  // drag / rotation → CSS vars on the section (no React state per frame): the
  // flares read --fx/--fy, the three star layers slide by --s1..3 (parallax,
  // wrapped to their tile size so they never run out) and --sy.
  const onLight = (x: number, y: number, yaw: number, pitch: number) => {
    const el = fx.current?.closest("section");
    if (!el) return;
    el.style.setProperty("--fx", x.toFixed(3));
    el.style.setProperty("--fy", y.toFixed(3));
    SKY.forEach(([k, tile], i) => {
      const off = (((yaw * k) % tile) + tile) % tile;
      el.style.setProperty(`--s${i + 1}`, `${(-off).toFixed(1)}px`);
    });
    el.style.setProperty("--sy", `${(pitch * 40).toFixed(1)}px`);
  };

  // Space fades in as the section scrolls in, holds while it fills the view,
  // and fades out on the way past (scrubbed → reversible, scroll-linked).
  useGSAP(() => {
    const el = fx.current?.closest("section");
    if (!el) return;
    gsap
      .timeline({ scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.6 } })
      .fromTo(el, { "--sp": 0 }, { "--sp": 1, duration: 0.3, ease: "none" }, 0.1)
      .to(el, { "--sp": 0, duration: 0.3, ease: "none" }, 0.62)
      .set({}, {}, 1);
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time capability probe
    setWebgl(!!document.createElement("canvas").getContext("webgl2"));
    const io = new IntersectionObserver(
      ([e]) => {
        setVisible(e.isIntersecting);
        if (e.isIntersecting) setNear(true);
      },
      { rootMargin: "300px 0px" },
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const mode = moon ? "moon" : "sun";
  return (
    <div className="sm-demo" data-mode={mode}>
      <div className="sm-toggle" role="group" aria-label={copy.toggle}>
        <button type="button" aria-pressed={!moon} onClick={() => setMoon(false)}>
          ☀ {copy.sun}
        </button>
        <button type="button" aria-pressed={moon} onClick={() => setMoon(true)}>
          ☾ {copy.moon}
        </button>
      </div>
      <div className="sm-stagewrap">
        {/* page-crossing lens flares, anchored on the orb, bleeding past the stage */}
        <div ref={fx} className="sm-fx" aria-hidden="true">
          <span className="sm-haze" />
          <span className="sm-streak" />
          <span className="sm-burst" />
          {GHOSTS.map((g, i) => (
            <span key={i} className={`sm-g ${g.t}`} style={{ "--k": g.k, "--s": `${g.s}px`, "--c": g.c } as CSSProperties} />
          ))}
        </div>
        <div ref={ref} className="sm-stage" role="img" aria-label={copy.aria[mode]}>
          {webgl ? (
            near && <SunMoonScene moon={moon} active={visible} onLight={onLight} />
          ) : (
            <div className="sm-fallback" />
          )}
          <span className="sm-hint" aria-hidden="true">
            ↻ {copy.hint}
          </span>
        </div>
      </div>
      <ul className="sm-chips">
        {copy.chips.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
    </div>
  );
}
