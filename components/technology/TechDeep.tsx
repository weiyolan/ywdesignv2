import type { ReactNode } from "react";
import type { TechSection } from "@/content/technology";
import { Reveal } from "@/components/primitives/Reveal";
import { Segments } from "@/components/primitives/Segments";

// Alternating deep-dive section shell (technology.html :81-352). Two layouts:
//  • "row"   — the .td-head and its visual sit side-by-side in a .row grid
//              (.tech-deep.rev flips the order); used by Next/GSAP/React/TS/Tw.
//  • "full"  — a centred .td-head (max-width 720) with the visual stacked
//              full-width beneath it; used by Sanity.
// The visual (panel / studio) is passed as children so the data-heavy demos
// stay in their own components.
export function TechDeep({
  section,
  layout = "row",
  children,
}: {
  section: TechSection;
  layout?: "row" | "full";
  children: ReactNode;
}) {
  const head = (
    <Reveal as="div" className={"td-head" + (layout === "full" ? " td-head-wide" : "")}>
      <div className="badge">
        <span className="mk">{section.mark}</span>
        <span>
          <span className="role">{section.role}</span>
          <span className="since">{section.since}</span>
        </span>
      </div>
      <h2>
        <Segments segs={section.h} />
      </h2>
      <p className="desc">
        <Segments segs={section.desc} />
      </p>
      {section.points ? (
        <ul className="td-points">
          {section.points.map((pt, i) => (
            <li key={i}>{pt}</li>
          ))}
        </ul>
      ) : null}
    </Reveal>
  );

  return (
    <section className={"tech-deep" + (section.rev ? " rev" : "")}>
      <div className="wrap">
        {layout === "full" ? (
          <>
            {head}
            <Reveal as="div" delay={1}>
              {children}
            </Reveal>
          </>
        ) : (
          <div className="row">
            {head}
            <Reveal as="div" delay={1}>
              {children}
            </Reveal>
          </div>
        )}
      </div>
    </section>
  );
}
