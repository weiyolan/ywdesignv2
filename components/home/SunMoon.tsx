import { Fragment } from "react";
import { getHome } from "@/content/home";
import type { Locale } from "@/lib/i18n";
import { Reveal } from "@/components/primitives/Reveal";
import { Segments } from "@/components/primitives/Segments";
import { SunMoonDemo } from "@/components/home/SunMoonDemo";

// Section 02 — real-time 3D showcase: a draggable shader sun that spins into a
// dark moon. Copy is server-rendered; the WebGL scene is a lazy client island.
export function SunMoon({ lang }: { lang: Locale }) {
  const o = getHome(lang).orb;
  return (
    <section id="sunmoon" className="sunmoon">
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
