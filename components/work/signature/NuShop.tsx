"use client";

import { useState } from "react";
import Image from "next/image";
import { corben, mulish } from "@/lib/projectFonts";
import type { Project } from "@/content/work";

type Shop = NonNullable<NonNullable<Project["signatureData"]>["nuShop"]>;
type Lang = "fr" | "en";

const LIVE = "https://nu-site.netlify.app/";

// Star row — `filled` of 5 lit, the rest dimmed (.e). Mirrors the prototype's
// ★★★★★ / ★★★★<span class="e">★</span> markup.
function Stars({ filled }: { filled: number }) {
  return (
    <div className="nu-stars" aria-label={`${filled} / 5`}>
      {Array.from({ length: 5 }, (_, i) =>
        i < filled ? (
          <span key={i}>★</span>
        ) : (
          <span key={i} className="e">
            ★
          </span>
        ),
      )}
    </div>
  );
}

const PRICES: Record<string, string> = {
  "nu-p1": "€ 13,90",
  "nu-p2": "€ 9,50",
  "nu-p3": "€ 12,00",
};

// Nu signature #2 — the real Products grid, recreated in Nu's own light brand
// palette (Corben/Mulish). Ports nu.html inline <script> :290-319: FR/EN toggle
// (default FR) re-keying every [data-t] string, and a per-card quick-add that
// shows the localized "added" label for 1500ms. Corben + Mulish are scoped to
// the .nu-shop wrapper via their CSS-var classes.
export function NuShop({ shop }: { shop: Shop }) {
  const [lang, setLang] = useState<Lang>("fr");
  // per-product-id "just added" flags
  const [added, setAdded] = useState<Record<string, boolean>>({});
  const t = shop.copy[lang];

  const add = (id: string) => {
    setAdded((prev) => ({ ...prev, [id]: true }));
    window.setTimeout(
      () => setAdded((prev) => ({ ...prev, [id]: false })),
      1500,
    );
  };

  return (
    <div className={`nu-shop ${corben.variable} ${mulish.variable}`}>
      <div className="nu-shop-head">
        <span className="crumb">{t.crumb}</span>
        <div className="nu-lang2">
          <button
            type="button"
            className={lang === "fr" ? "on" : undefined}
            onClick={() => setLang("fr")}
          >
            FR
          </button>
          <button
            type="button"
            className={lang === "en" ? "on" : undefined}
            onClick={() => setLang("en")}
          >
            EN
          </button>
        </div>
      </div>
      <div className="nu-grid">
        <div className="nu-tile" style={{ background: "#96BC8F" }}>
          <h3>{t.tileH}</h3>
          <p>{t.tileP}</p>
          <a href={LIVE} target="_blank" rel="noopener noreferrer">
            {t.tileB}
          </a>
        </div>

        {shop.products.map((p, i) => {
          const n = i + 1;
          const isAdded = !!added[p.id];
          return (
            <div className="nu-card" key={p.id}>
              <div className="shot">
                <Image
                  src={`/work/${p.id}.jpg`}
                  alt={t[`p${n}n`]}
                  fill
                  sizes="(max-width: 640px) 50vw, 33vw"
                />
              </div>
              <Stars filled={p.stars} />
              <span className="nm">{t[`p${n}n`]}</span>
              <p className="desc">{t[`p${n}d`]}</p>
              <span className="price">{PRICES[p.id]}</span>
              <div className="nu-actions">
                <a
                  className="nu-btn"
                  href={LIVE}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.see}
                </a>
                <button
                  type="button"
                  className={`nu-btn primary${isAdded ? " added" : ""}`}
                  onClick={() => add(p.id)}
                >
                  {isAdded ? t.added : t.add}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
