import { Fragment } from "react";
import { getHome } from "@/content/home";
import type { Locale } from "@/lib/i18n";
import { Reveal } from "@/components/primitives/Reveal";
import { Segments } from "@/components/primitives/Segments";

// Section 04 — AI manifesto (index.html :441-456).
export function AiManifesto({ lang }: { lang: Locale }) {
  const a = getHome(lang).ai;
  return (
    <section id="ai" className="ai">
      <div className="wrap ai-grid">
        <div>
          <Reveal as="span" className="eyebrow">
            <span className="tk">{a.tk}</span> {a.eyebrow}
          </Reveal>
          <Reveal as="h2" className="display" delay={1}>
            {a.title.map((line, li) => (
              <Fragment key={li}>
                {li > 0 && <br />}
                <Segments segs={line} />
              </Fragment>
            ))}
          </Reveal>
          <Reveal as="p" className="lede" delay={2}>
            {a.lede}
          </Reveal>
        </div>

        <Reveal as="div" className="principles" delay={1}>
          {a.principles.map((p) => (
            <div className="principle" key={p.n}>
              <span className="n">{p.n}</span>
              <div>
                <b>{p.b}</b>
                <p>{p.p}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
