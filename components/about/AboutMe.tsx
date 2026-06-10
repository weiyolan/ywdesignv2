import { getAbout } from "@/content/about";
import type { Locale } from "@/lib/i18n";
import { Reveal } from "@/components/primitives/Reveal";
import { Segments } from "@/components/primitives/Segments";

// "A little bit about me" — narrative + skill chips (about.html :152-180).
export function AboutMe({ lang }: { lang: Locale }) {
  const a = getAbout(lang).aboutMe;
  return (
    <section className="ab-section tex-dots">
      <div className="wrap ab-two">
        <Reveal as="div">
          <span className="eyebrow">
            <span className="tk">{a.tk}</span> {a.eyebrow}
          </span>
          <div className="ab-narr">
            {a.narrative.map((para, i) => (
              <p key={i}>
                <Segments segs={para} />
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal as="div" className="ab-skills" delay={1}>
          <span className="lbl">{a.skills.label}</span>
          <div className="chips">
            {a.skills.chips.map((c) => (
              <span key={c.label} className={c.hot ? "hot" : undefined}>
                {c.label}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
