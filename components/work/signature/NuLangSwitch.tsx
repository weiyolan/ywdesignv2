"use client";

import { useState } from "react";
import type { Project } from "@/content/work";

type Dict = NonNullable<NonNullable<Project["signatureData"]>["nuLang"]>;
type Lang = "en" | "fr";

// Nu signature #1 — EN/FR language morph + quick-add product card.
// Ports nu.html inline <script> :266-288: the .morph opacity swap on language
// change (250ms text crossfade) and the add-to-cart .added state (1600ms).
export function NuLangSwitch({ dict }: { dict: Dict }) {
  const [lang, setLang] = useState<Lang>("en");
  // `swapping` toggles the .swap class on the morph spans (opacity → 0) while the
  // text is mid-change; `added` is the quick-add confirmation state.
  const [swapping, setSwapping] = useState(false);
  const [added, setAdded] = useState(false);

  const copy = dict[lang];

  const switchLang = (next: Lang) => {
    if (next === lang) return;
    setSwapping(true);
    window.setTimeout(() => {
      setLang(next);
      setSwapping(false);
    }, 250);
  };

  const addToCart = () => {
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  const m = `morph${swapping ? " swap" : ""}`;

  return (
    <div className="nu-demo">
      <div className="nu-copy">
        <div className="nu-lang">
          <button
            type="button"
            className={lang === "en" ? "on" : undefined}
            onClick={() => switchLang("en")}
          >
            EN
          </button>
          <button
            type="button"
            className={lang === "fr" ? "on" : undefined}
            onClick={() => switchLang("fr")}
          >
            FR
          </button>
        </div>
        <h3 className={m}>{copy.h}</h3>
        <p className={m}>{copy.p}</p>
      </div>
      <div className="nu-prod">
        <div className="ph">
          <span>/products/serum-01</span>
        </div>
        <div className="body">
          <div className={`nm ${m}`}>{copy.nm}</div>
          <div className="pr">€42,00</div>
          <button
            type="button"
            className={`btn btn-primary nu-add${added ? " added" : ""}`}
            onClick={addToCart}
          >
            <span className={m}>{added ? copy.added : copy.add}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
