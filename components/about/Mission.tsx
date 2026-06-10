import { Fragment } from "react";
import type { About } from "@/content/about";
import { Reveal } from "@/components/primitives/Reveal";
import { Segments } from "@/components/primitives/Segments";

// Mission section (about.html :182-189) — accent-tinted band.
export function Mission({ mission }: { mission: About["mission"] }) {
  const m = mission;
  return (
    <section className="ab-section ab-mission">
      <Reveal as="div" className="wrap">
        <span className="eyebrow">
          <span className="tk">{m.tk}</span> {m.eyebrow}
        </span>
        <h2 className="display ab-mission-h">
          {m.heading.map((line, li) => (
            <Fragment key={li}>
              {li > 0 && <br />}
              {line}
            </Fragment>
          ))}
        </h2>
        <p className="ab-mission-p">
          <Segments segs={m.p} />
        </p>
      </Reveal>
    </section>
  );
}
