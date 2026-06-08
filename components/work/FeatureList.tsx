import { Reveal } from "@/components/primitives/Reveal";
import { Segments } from "@/components/primitives/Segments";
import type { Head } from "@/content/work";
import type { Seg } from "@/content/home";

type Feature = { k: string; b: string; p: string };

// The bare .feature-list grid (k / bold title / paragraph rows). Reused by the
// two-column "brief" layout below.
export function FeatureCells({ features }: { features: Feature[] }) {
  return (
    <>
      {features.map((f) => (
        <div className="fl" key={f.b}>
          <div className="k">{f.k}</div>
          <b>{f.b}</b>
          <p>{f.p}</p>
        </div>
      ))}
    </>
  );
}

// Two-column "The brief" — left .ds-head + .prose, right .feature-list.
// (milo + bermuda). When `paras` is omitted this degrades to head + list.
export function FeatureList({
  head,
  paras,
  features,
}: {
  head: Head;
  paras?: Seg[][];
  features: Feature[];
}) {
  return (
    <section className="detail-section">
      <div className="wrap two-col">
        <Reveal as="div" className="ds-head">
          <span className="eyebrow">
            <span className="tk">{"//"}</span> {head.eyebrow}
          </span>
          <h2 className="display">{head.title}</h2>
          {head.intro ? <p>{head.intro}</p> : null}
          {paras && paras.length ? (
            <div className="prose" style={{ marginTop: 20 }}>
              {paras.map((p, i) => (
                <p key={i}>
                  <Segments segs={p} />
                </p>
              ))}
            </div>
          ) : null}
        </Reveal>
        <Reveal as="div" className="feature-list" delay={1}>
          <FeatureCells features={features} />
        </Reveal>
      </div>
    </section>
  );
}
