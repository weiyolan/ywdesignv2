import { Fragment } from "react";
import { getHome } from "@/content/home";
import type { Locale } from "@/lib/i18n";
import { Reveal } from "@/components/primitives/Reveal";
import { Segments } from "@/components/primitives/Segments";
import { SunMoonDemo } from "@/components/home/SunMoonDemo";

// Seeded star tile (deterministic → identical on server and client). Layers
// get bigger tiles, fewer but larger/brighter stars — parallax depth.
function starTile(size: number, count: number, rMax: number, seed: number) {
  let x = seed;
  const rnd = () => ((x = (x * 16807) % 2147483647) / 2147483647);
  let dots = "";
  for (let i = 0; i < count; i++) {
    const r = (0.3 + rnd() * rMax).toFixed(2);
    const o = (0.35 + rnd() * 0.65).toFixed(2);
    const c = rnd() > 0.85 ? "#ffd9b3" : rnd() > 0.7 ? "#b9ccff" : "#fff";
    dots += `<circle cx='${(rnd() * size).toFixed(1)}' cy='${(rnd() * size).toFixed(1)}' r='${r}' fill='${c}' opacity='${o}'/>`;
  }
  return `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}'>${dots}</svg>`)}")`;
}
const SKY = [starTile(360, 70, 0.6, 7), starTile(520, 45, 1, 42), starTile(760, 22, 1.6, 1337)];

// Section 02 — real-time 3D showcase: a draggable shader sun that spins into a
// dark moon. Copy is server-rendered; the WebGL scene is a lazy client island.
export function SunMoon({ lang }: { lang: Locale }) {
  const o = getHome(lang).orb;
  return (
    <section id="sunmoon" className="sunmoon">
      <div className="sm-sky" aria-hidden="true">
        {SKY.map((bg, i) => (
          <i key={i} className={`l${i + 1}`} style={{ backgroundImage: bg }} />
        ))}
      </div>
      <div className="wrap sm-grid">
        <div>
          <Reveal as="span" className="eyebrow">
            <span className="tk">{o.tk}</span> {o.eyebrow}
          </Reveal>
          <Reveal as="h2" className="display" delay={1}>
            {o.title.map((line, li) => (
              <Fragment key={li}>
                {li > 0 && <br />}
                <Segments segs={line} />
              </Fragment>
            ))}
          </Reveal>
          <Reveal as="p" className="lede" delay={2}>
            {o.lede}
          </Reveal>
        </div>
        <Reveal as="div" delay={1}>
          <SunMoonDemo
            copy={{ sun: o.sun, moon: o.moon, toggle: o.toggle, hint: o.hint, chips: o.chips, aria: o.aria }}
          />
        </Reveal>
      </div>
    </section>
  );
}
