import { Reveal } from "@/components/primitives/Reveal";
import { Segments } from "@/components/primitives/Segments";
import type { Head } from "@/content/work";
import type { Seg } from "@/content/home";

// Single-column story block — .ds-head + .narrative (nu "The challenge",
// spiree "The story").
export function Narrative({
  head,
  paras,
}: {
  head: Head;
  paras: Seg[][];
}) {
  return (
    <section className="detail-section">
      <div className="wrap">
        <Reveal as="div" className="ds-head">
          <span className="eyebrow">
            <span className="tk">{"//"}</span> {head.eyebrow}
          </span>
          <h2 className="display">{head.title}</h2>
          {head.intro ? <p>{head.intro}</p> : null}
        </Reveal>
        <Reveal as="div" className="narrative" delay={1}>
          {paras.map((p, i) => (
            <p key={i}>
              <Segments segs={p} />
            </p>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
