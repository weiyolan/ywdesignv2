"use client";

import { useState } from "react";
import { getTechnology } from "@/content/technology";
import { useLocale } from "@/components/providers/LocaleProvider";

// Sanity Studio dashboard (technology.html :132-206, ports the switcher :418-445).
// Clicking a sidebar doc-type swaps the middle document list; the editor pane
// and the GROQ → JSON panels are static dressing. Initial active type is the one
// flagged `on` in content (Products).
export function SanityStudio() {
  const lang = useLocale();
  const s = getTechnology(lang).studio;
  const initial = Math.max(
    0,
    s.types.findIndex((t) => t.on),
  );
  const [active, setActive] = useState(initial);
  const list = s.types[active];

  return (
    <div className="studio-wrap">
      <div className="studio">
        <div className="studio-top">
          <span className="brand">
            {s.brandLead} <b>{s.brandTail}</b>
          </span>
          <span>{s.lake}</span>
          <span className="pub">{s.pub}</span>
        </div>
        <div className="studio-grid">
          <div className="st-side">
            <div className="st-lbl">{s.contentLabel}</div>
            {s.types.map((t, i) => (
              <div
                key={t.doc}
                className={"st-type" + (i === active ? " on" : "")}
                role="button"
                tabIndex={0}
                onClick={() => setActive(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActive(i);
                  }
                }}
              >
                <span className="ico">{t.ico}</span> {t.label}
              </div>
            ))}
          </div>
          <div className="st-list" id="st-list">
            <div className="st-lbl">{list.listLabel}</div>
            {list.docs.map((d, i) => (
              <div className={"st-doc" + (d.on ? " on" : "")} key={i}>
                <div className="t">{d.t}</div>
                <div className="s">{d.s}</div>
                {d.badge ? <span className="badge">{d.badge}</span> : null}
              </div>
            ))}
          </div>
          <div className="st-editor">
            <div className="st-field">
              <div className="fl">
                Title <span className="req">*</span>
              </div>
              <div className="st-input">Renew Serum</div>
            </div>
            <div className="st-field">
              <div className="fl">Slug</div>
              <div className="st-input st-slug">
                /products/<b>renew-serum</b>
              </div>
            </div>
            <div className="st-field">
              <div className="fl">Hero image</div>
              <div className="st-img">drop · 1200×1500 · auto-CDN</div>
            </div>
            <div className="st-row2">
              <div className="st-field" style={{ margin: 0 }}>
                <div className="fl">Price (EUR)</div>
                <div className="st-input">48.00</div>
              </div>
              <div className="st-field" style={{ margin: 0 }}>
                <div className="fl">Stock</div>
                <div className="st-input">128</div>
              </div>
            </div>
            <div className="st-field" style={{ marginTop: 16 }}>
              <div className="fl">Description · Portable Text</div>
              <div className="st-input area">
                A featherweight vitamin-C serum that brightens and renews.
                Fragrance-free, vegan, made in Belgium.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="groq">
        <div className="panel">
          <div className="panel-bar">
            <i />
            <i />
            <i />
            <span>query.groq</span>
          </div>
          <pre>
            <span className="c">{"// fetch only what the page renders"}</span>
            {"\n"}
            *[_type == <span className="s">"product"</span> && stock &gt;{" "}
            <span className="s">0</span>]{"{"}
            {"\n"}  title, <span className="k">"slug"</span>: slug.current,
            {"\n"}  price, <span className="k">"img"</span>: image.asset-&gt;url
            {"\n"}
            {"}"} | order(price asc)
          </pre>
        </div>
        <div className="panel">
          <div className="panel-bar">
            <i />
            <i />
            <i />
            <span>result.json</span>
          </div>
          <pre>
            [
            {"\n"}  {"{"}
            {"\n"}    <span className="k">"title"</span>:{" "}
            <span className="s">"Renew Serum"</span>,
            {"\n"}    <span className="k">"slug"</span>:  {" "}
            <span className="s">"renew-serum"</span>,
            {"\n"}    <span className="k">"price"</span>: 48,
            {"\n"}    <span className="k">"img"</span>:   {" "}
            <span className="s">"cdn.sanity.io/…"</span>
            {"\n"}  {"}"}
            {"\n"}
            ]
          </pre>
        </div>
      </div>
    </div>
  );
}
