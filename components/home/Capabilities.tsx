import type { Home } from "@/content/home";
import { Reveal } from "@/components/primitives/Reveal";
import { CountUp } from "@/components/primitives/CountUp";
import { CaseLink } from "@/components/primitives/CaseLink";

// Section 01 — capabilities bento grid (index.html :117-212).
export function Capabilities({ capabilities }: { capabilities: Home["capabilities"] }) {
  const c = capabilities;
  return (
    <section id="capabilities" className="tex-dots">
      <div className="wrap">
        <Reveal as="div" className="sec-head">
          <span className="eyebrow">
            <span className="tk">{c.tk}</span> {c.eyebrow}
          </span>
          <h2 className="display">
            {c.title[0]}
            <br />
            {c.title[1]}
          </h2>
          <p>{c.intro}</p>
        </Reveal>

        <div className="bento">
          {c.cards.map((card) => (
            <Reveal as="div" className={"card " + card.span} delay={card.d} key={card.h}>
              <div className="c-ico">[ {card.ico} ]</div>
              <h3>{card.h}</h3>
              <p>{card.p}</p>
              <Viz kind={card.viz} />
              <CaseLink data={card.case} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Viz({ kind }: { kind: string }) {
  if (kind === "scale")
    return (
      <div className="viz">
        <div className="viz-scale">
          <span style={{ fontSize: 34 }}>Aa</span>
          <span style={{ fontSize: 26 }}>Aa</span>
          <span style={{ fontSize: 20 }}>Aa</span>
          <span style={{ fontSize: 15 }}>Aa</span>
        </div>
        <div className="swatches">
          <i style={{ background: "var(--accent)" }} />
          <i style={{ background: "var(--text)" }} />
          <i style={{ background: "var(--text-3)" }} />
          <i style={{ background: "var(--bg-3)" }} />
          <i style={{ background: "var(--line-2)" }} />
        </div>
      </div>
    );

  if (kind === "bars")
    return (
      <div className="viz">
        <div className="bars">
          {Array.from({ length: 6 }).map((_, i) => (
            <i key={i} />
          ))}
        </div>
      </div>
    );

  if (kind === "lang")
    return (
      <div className="viz">
        <div className="lang">
          <b className="on">EN</b>
          <b>FR</b>
          <b>NL</b>
        </div>
      </div>
    );

  if (kind === "cms")
    return (
      <div className="viz">
        <div className="codeline">
          <span className="d">query</span> <span className="g">allProducts</span> {"{"}
          <br />
          &nbsp;&nbsp;title, price, <span className="g">slug</span>
          <br />
          {"}"}
        </div>
      </div>
    );

  if (kind === "commerce")
    return (
      <div className="viz">
        <div className="codeline">
          <span className="g">POST</span> /checkout <span className="d">→ 200</span>
          <br />
          <span className="d">stripe.session.create()</span>
        </div>
      </div>
    );

  if (kind === "gauge")
    return (
      <div className="viz">
        <div className="gauge">
          <CountUp end={100} className="num" />
          <div className="metrics">
            <b>Performance</b> · <b>SEO</b> · <b>Best Practices</b>
            <br />
            LCP <b>1.1s</b> · CLS <b>0.00</b> · TTI <b>1.4s</b>
          </div>
        </div>
      </div>
    );

  return null;
}
