import { Fragment } from "react";
import { about } from "@/content/about";
import { Reveal } from "@/components/primitives/Reveal";
import { CountUp } from "@/components/primitives/CountUp";

// Numbers section (about.html :208-234) — three count-up stats.
export function Stats() {
  const n = about.numbers;
  return (
    <section className="ab-section">
      <div className="wrap">
        <Reveal as="div" className="sec-head">
          <span className="eyebrow">
            <span className="tk">{n.tk}</span> {n.eyebrow}
          </span>
          <h2 className="display">
            {n.title.map((line, li) => (
              <Fragment key={li}>
                {li > 0 && <br />}
                {line}
              </Fragment>
            ))}
          </h2>
          <p>{n.intro}</p>
        </Reveal>

        <div className="ab-stats">
          {n.stats.map((s, i) => (
            <Reveal as="div" className="ab-stat" delay={i} key={s.label}>
              <div className="num">
                <CountUp end={s.value} />
                {s.suffix}
              </div>
              <b>{s.label}</b>
              <p>{s.p}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
