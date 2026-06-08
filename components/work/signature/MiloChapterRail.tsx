"use client";

import { useState } from "react";

type Chapter = { rail: string; t: string; p: string };

// Milo signature — the sticky chapter rail. Ports milo.html inline <script>
// :183-206: clicking a rail button fades the big number + caption (.swap for
// 350ms), swaps the text, then fades back in. The active button gets .on.
export function MiloChapterRail({ chapters }: { chapters: Chapter[] }) {
  const [active, setActive] = useState(0);
  // `shown` lags `active` by the 350ms fade so the stage text changes while
  // it's transparent; `swapping` toggles the .swap class during that window.
  const [shown, setShown] = useState(0);
  const [swapping, setSwapping] = useState(false);

  const pick = (i: number) => {
    if (i === active) return;
    setActive(i);
    setSwapping(true);
    window.setTimeout(() => {
      setShown(i);
      setSwapping(false);
    }, 350);
  };

  const cap = chapters[shown];
  const fade = `chapter-fade${swapping ? " swap" : ""}`;

  return (
    <div className="milo-demo">
      <div className="chapter-rail">
        {chapters.map((c, i) => (
          <button
            type="button"
            key={c.rail}
            className={i === active ? "on" : undefined}
            onClick={() => pick(i)}
          >
            <span className="cn">{String(i + 1).padStart(2, "0")}</span>
            <span className="ct">{c.rail}</span>
          </button>
        ))}
      </div>
      <div className="chapter-stage">
        <div className={`big ${fade}`}>
          {String(shown + 1).padStart(2, "0")}
        </div>
        <div className={`cap ${fade}`}>
          <h4>{cap.t}</h4>
          <p>{cap.p}</p>
        </div>
      </div>
    </div>
  );
}
