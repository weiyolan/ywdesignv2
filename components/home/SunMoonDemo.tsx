"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

// three.js + R3F live in their own chunk, fetched only when the section nears
// the viewport — the home page's first-load JS is unchanged.
const SunMoonScene = dynamic(() => import("@/components/home/SunMoonScene"), { ssr: false });

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
      <div ref={ref} className="sm-stage" role="img" aria-label={copy.aria[mode]}>
        {webgl ? (
          near && <SunMoonScene moon={moon} active={visible} />
        ) : (
          <div className="sm-fallback" />
        )}
        <span className="sm-hint" aria-hidden="true">
          ↻ {copy.hint}
        </span>
      </div>
      <ul className="sm-chips">
        {copy.chips.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
    </div>
  );
}
