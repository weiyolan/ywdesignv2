import { getHome } from "@/content/home";
import type { Locale } from "@/lib/i18n";
import { Reveal } from "@/components/primitives/Reveal";
import { Segments } from "@/components/primitives/Segments";
import { Button } from "@/components/primitives/Button";
import { GrowthChart } from "@/components/home/GrowthChart";
import { Marquee } from "@/components/home/Marquee";

export function Hero({ lang }: { lang: Locale }) {
  const { hero } = getHome(lang);
  return (
    <header id="top">
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
          <GrowthChart />
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
