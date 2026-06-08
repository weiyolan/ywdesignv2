"use client";

import { useState } from "react";
import type { Project } from "@/content/work";

type Orb = NonNullable<NonNullable<Project["signatureData"]>["spireeOrb"]>;
type Mode = "sun" | "moon";

const SIZES = ["XS", "S", "M", "L"];

// Spiree signature — the Sun ↔ Moon collection switch. Ports spiree.html inline
// <script> :200-222: the .sp-toggle sets data-mode on the demo (CSS morphs the
// orb gradient/scale), swapping the title + sub; size buttons toggle .on
// (default S); add-to-cart shows the .added confirmation for 1600ms.
export function SpireeOrb({ data }: { data: Orb }) {
  const [mode, setMode] = useState<Mode>("sun");
  const [size, setSize] = useState("S");
  const [added, setAdded] = useState(false);

  const copy = data[mode];

  const addToCart = () => {
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div className="spiree-demo" data-mode={mode}>
      <div className="orb-wrap">
        <div className="orb" />
      </div>
      <div className="spiree-card">
        <div className="sp-toggle">
          <button
            type="button"
            className={mode === "sun" ? "on" : undefined}
            onClick={() => setMode("sun")}
          >
            ☀ Sun
          </button>
          <button
            type="button"
            className={mode === "moon" ? "on" : undefined}
            onClick={() => setMode("moon")}
          >
            ☾ Moon
          </button>
        </div>
        <div className="sp-title">{copy.t}</div>
        <div className="sp-sub">{copy.s}</div>
        <div className="sp-price">€99,-</div>
        <div className="sp-meta">Incl. VAT &amp; shipping in EU</div>
        <div className="sp-sizes">
          {SIZES.map((s) => (
            <button
              type="button"
              key={s}
              className={s === size ? "on" : undefined}
              onClick={() => setSize(s)}
            >
              {s}
            </button>
          ))}
        </div>
        <button
          type="button"
          className={`btn btn-primary sp-add${added ? " added" : ""}`}
          onClick={addToCart}
        >
          {added ? "✓ Added to cart" : "Add to cart"}
        </button>
      </div>
    </div>
  );
}
