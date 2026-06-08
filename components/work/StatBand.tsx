import { Reveal } from "@/components/primitives/Reveal";
import type { Head } from "@/content/work";

// Outcome / metric band — .stat-band. Optional .ds-head (nu "Outcome" has one,
// spiree's band is bare). Values are static, exactly as the prototype shows them
// (mixed formats: "0", "2", "100%", "40°", "€99").
export function StatBand({
  head,
  stats,
}: {
  head?: Head;
  stats: { sv: string; sl: string }[];
}) {
  return (
    <section className="detail-section">
      <div className="wrap">
        {head ? (
          <Reveal as="div" className="ds-head">
            <span className="eyebrow">
              <span className="tk">{"//"}</span> {head.eyebrow}
            </span>
            <h2 className="display">{head.title}</h2>
            {head.intro ? <p>{head.intro}</p> : null}
          </Reveal>
        ) : null}
        <Reveal as="div" className="stat-band" delay={head ? 1 : 0}>
          {stats.map((s) => (
            <div key={s.sl}>
              <div className="sv">{s.sv}</div>
              <div className="sl">{s.sl}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
