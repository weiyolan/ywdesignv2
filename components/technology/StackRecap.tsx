import type { Technology } from "@/content/technology";
import { Reveal } from "@/components/primitives/Reveal";

// Full-stack recap (technology.html :355-373) — "the rest of the toolbox" chips.
export function StackRecap({ recap }: { recap: Technology["recap"] }) {
  const r = recap;
  return (
    <section className="stack-recap">
      <div className="wrap">
        <Reveal as="div" className="ds-head" delay={0}>
          <span className="eyebrow">
            <span className="tk">{"//"}</span> {r.eyebrow}
          </span>
          <h2 className="display">{r.title}</h2>
          <p>{r.intro}</p>
        </Reveal>{/* prototype had inline margin-bottom:0; see .stack-recap .ds-head in technology.css */}
        <Reveal as="div" className="recap-grid" delay={1}>
          {r.items.map((it) => (
            <div className="recap" key={it.nm}>
              <span className="m">{it.m}</span>
              <span>
                <span className="nm">{it.nm}</span>
                <span className="rl">{it.rl}</span>
              </span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
