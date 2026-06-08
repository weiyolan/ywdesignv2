import { Reveal } from "@/components/primitives/Reveal";
import type { Head } from "@/content/work";

// Numbered approach steps — .approach grid. Two intro shapes from the prototype:
//   · no intro  → tight .sec-kicker (nu "Approach / Three moves")
//   · has intro → wide .ds-head    (bermuda "How it converts")
export function Approach({
  head,
  steps,
}: {
  head: Head;
  steps: { sn: string; h: string; p: string }[];
}) {
  return (
    <section className="detail-section">
      <div className="wrap">
        {head.intro ? (
          <Reveal as="div" className="ds-head">
            <span className="eyebrow">
              <span className="tk">{"//"}</span> {head.eyebrow}
            </span>
            <h2 className="display">{head.title}</h2>
            <p>{head.intro}</p>
          </Reveal>
        ) : (
          <Reveal as="div" className="sec-kicker">
            <span className="eyebrow">
              <span className="tk">{"//"}</span> {head.eyebrow}
            </span>
            <h2 className="display">{head.title}</h2>
          </Reveal>
        )}
        <Reveal as="div" className="approach" delay={1}>
          {steps.map((s) => (
            <div className="step" key={s.sn}>
              <div className="sn">{s.sn}</div>
              <h4>{s.h}</h4>
              <p>{s.p}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
