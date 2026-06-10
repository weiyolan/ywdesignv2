import type { Technology } from "@/content/technology";
import { Reveal } from "@/components/primitives/Reveal";
import { Segments } from "@/components/primitives/Segments";

// Technology hero (technology.html :49-78) — kicker, scrambled-accent h1, lede,
// and the "no-WP" contrast band. Mirrors the home hero's Reveal/Segments feel.
export function TechHero({ hero }: { hero: Technology["hero"] }) {
  const h = hero;
  return (
    <header className="tech-hero">
      <div className="wrap">
        <Reveal as="div" className="kicker">
          <b>{h.kicker.pre}</b> {h.kicker.mid} <span>{h.kicker.year}</span>
        </Reveal>
        <Reveal as="h1" className="display" delay={1}>
          <Segments segs={[h.h1[0]]} />
          <br />
          <Segments segs={h.h1.slice(1)} />
        </Reveal>
        <Reveal as="p" className="lede" delay={2}>
          <Segments segs={h.lede} />
        </Reveal>

        <Reveal as="div" className="no-wp" delay={2}>
          {h.contrast.map((col) => (
            <div className={"col " + col.tone} key={col.tone}>
              <div className="ct">{col.ct}</div>
              <h3>{col.h}</h3>
              <ul>
                {col.items.map((li, i) => (
                  <li key={i}>{li}</li>
                ))}
              </ul>
            </div>
          ))}
        </Reveal>
      </div>
    </header>
  );
}
