import { getHome } from "@/content/home";
import type { Locale } from "@/lib/i18n";
import { Reveal } from "@/components/primitives/Reveal";
import { Segments } from "@/components/primitives/Segments";
import { Button } from "@/components/primitives/Button";
import { SunMoonDemo } from "@/components/home/SunMoonDemo";
import { Marquee } from "@/components/home/Marquee";

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

// Landing hero: the copy on the left, the real-time 3D sun ⇄ moon (draggable
// shader orb, lazy WebGL island) on the right, in its deep-space band.
export function Hero({ lang }: { lang: Locale }) {
  const { hero, orb } = getHome(lang);
  return (
    <header id="top" className="sunmoon sm-hero">
      <div className="sm-sky" aria-hidden="true">
        {SKY.map((bg, i) => (
          <i key={i} className={`l${i + 1}`} style={{ backgroundImage: bg }} />
        ))}
      </div>
      <div className="wrap hero-grid">
        <div className="hero hero-copy">
          <Reveal as="span" className="eyebrow">
            <span className="tk">{"//"}</span> {hero.eyebrow}
          </Reveal>

          <Reveal as="h1" className="display" delay={1}>
            {hero.headline.map((line, li) => (
              <span className="line" key={li}>
                <Segments segs={line} wordClass="word" />
              </span>
            ))}
          </Reveal>

          <Reveal as="p" className="hero-sub" delay={2}>
            <Segments segs={hero.sub} />
          </Reveal>

          <Reveal as="div" className="hero-cta" delay={3}>
            {hero.ctas.map((c) => (
              <Button key={c.label} href={c.href} variant={c.variant}>
                {c.label}
                {"arrow" in c && c.arrow ? (
                  <>
                    {" "}
                    <span className="arr">{c.arrow}</span>
                  </>
                ) : null}
              </Button>
            ))}
          </Reveal>
        </div>

        <Reveal as="div" delay={2}>
          <SunMoonDemo hero copy={orb} />
        </Reveal>
      </div>

      <div className="wrap">
        <Reveal as="div">
          <Marquee lang={lang} />
        </Reveal>
      </div>
    </header>
  );
}
