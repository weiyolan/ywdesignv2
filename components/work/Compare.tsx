import { Reveal } from "@/components/primitives/Reveal";
import type { Head } from "@/content/work";

// Two-column comparison — .compare (spiree "Sun & Moon").
export function Compare({
  head,
  cols,
}: {
  head: Head;
  cols: { ct: string; h: string; p: string; items: string[] }[];
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
        <Reveal as="div" className="compare" delay={1}>
          {cols.map((c) => (
            <div className="col" key={c.h}>
              <div className="ct">{c.ct}</div>
              <h4>{c.h}</h4>
              <p>{c.p}</p>
              <ul>
                {c.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
