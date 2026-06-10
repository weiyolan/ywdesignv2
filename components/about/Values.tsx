import { Fragment } from "react";
import type { About } from "@/content/about";
import { Reveal } from "@/components/primitives/Reveal";

// Vision section — the four values (about.html :191-206).
export function Values({ vision }: { vision: About["vision"] }) {
  const v = vision;
  return (
    <section className="ab-section tex-lines">
      <div className="wrap">
        <Reveal as="div" className="sec-head">
          <span className="eyebrow">
            <span className="tk">{v.tk}</span> {v.eyebrow}
          </span>
          <h2 className="display">
            {v.title.map((line, li) => (
              <Fragment key={li}>
                {li > 0 && <br />}
                {line}
              </Fragment>
            ))}
          </h2>
          <p>{v.intro}</p>
        </Reveal>

        <div className="ab-values">
          {v.values.map((val, i) => (
            <Reveal as="div" className="ab-val" delay={i} key={val.n}>
              <span className="vn">{val.n}</span>
              <h3>{val.h}</h3>
              <p>{val.p}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
