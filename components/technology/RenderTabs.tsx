"use client";

import { useState } from "react";
import { getTechnology } from "@/content/technology";
import { useLocale } from "@/components/providers/LocaleProvider";
import { Segments } from "@/components/primitives/Segments";

// Next.js panel (technology.html :98-118, ports the tab script :397-416).
// Clicking SSG/ISR/SSR swaps the strategy blurb and animates the wave bars to
// the selected heights (the .render-wave i transition handles the easing).
export function RenderTabs() {
  const lang = useLocale();
  const { file, strats, seoFlags } = getTechnology(lang).render;
  const [active, setActive] = useState(0);
  const cur = strats[active];

  return (
    <div className="panel" id="next-panel">
      <div className="panel-bar">
        <i />
        <i />
        <i />
        <span>{file}</span>
      </div>
      <div className="render-tabs" id="render-tabs">
        {strats.map((s, i) => (
          <button
            key={s.k}
            type="button"
            className={i === active ? "on" : undefined}
            aria-pressed={i === active}
            onClick={() => setActive(i)}
          >
            {s.label}
          </button>
        ))}
      </div>
      <div className="render-body">
        <div className="rb-strat" id="rb-strat">
          <Segments segs={cur.body} />
        </div>
        <div className="render-wave" id="render-wave">
          {cur.wave.map((h, i) => (
            <i key={i} style={{ height: h + "%" }} />
          ))}
        </div>
      </div>
      <div className="source-peek">
        <span className="c">{"// what the crawler actually receives"}</span>
        <br />
        &lt;<span className="tag">title</span>&gt;
        <span className="tx">Nu — clean beauty, Antwerp</span>&lt;/
        <span className="tag">title</span>&gt;
        <br />
        &lt;<span className="tag">meta</span> <span className="at">name</span>=
        <span className="tx">"description"</span> ...&gt;
        <br />
        &lt;<span className="tag">h1</span>&gt;
        <span className="tx">Skincare, distilled.</span>&lt;/
        <span className="tag">h1</span>&gt;
      </div>
      <div className="seo-flags">
        {seoFlags.map((f) => (
          <span key={f}>{f}</span>
        ))}
      </div>
    </div>
  );
}
