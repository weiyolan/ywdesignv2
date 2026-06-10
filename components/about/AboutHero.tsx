import type { About } from "@/content/about";
import { Reveal } from "@/components/primitives/Reveal";
import { Segments } from "@/components/primitives/Segments";
import { SelfPortrait } from "@/components/about/SelfPortrait";

// About hero (about.html :127-150) — copy + animated self-portrait.
export function AboutHero({ hero }: { hero: About["hero"] }) {
  return (
    <header className="ab-hero">
      <div className="wrap ab-hero-grid">
        <div>
          <Reveal as="span" className="eyebrow">
            <span className="tk">{"//"}</span> {hero.eyebrow}
          </Reveal>
          <Reveal as="h1" className="display ab-h1" delay={1}>
            <Segments segs={[hero.h1[0]]} />
            <br />
            <Segments segs={[hero.h1[1]]} />
          </Reveal>
          <Reveal as="p" className="ab-lede" delay={2}>
            <Segments segs={hero.lede} />
          </Reveal>
          <Reveal as="div" className="ab-facts" delay={3}>
            {hero.facts.map((f) => (
              <div key={f.k}>
                <span className="k">{f.k}</span>
                <span className="v">{f.v}</span>
              </div>
            ))}
          </Reveal>
        </div>

        <Reveal as="div" className="ab-portrait" delay={2}>
          <SelfPortrait />
          <span className="ab-portrait-tag">{hero.portraitTag}</span>
        </Reveal>
      </div>
    </header>
  );
}
