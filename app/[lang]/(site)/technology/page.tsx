import "./technology.css";

import { Fragment } from "react";
import type { Metadata } from "next";
import { getTechnology } from "@/content/technology";
import { localizedHref, type Locale } from "@/lib/i18n";
import { Reveal } from "@/components/primitives/Reveal";
import { Segments } from "@/components/primitives/Segments";
import { Button } from "@/components/primitives/Button";
import { TechHero } from "@/components/technology/TechHero";
import { TechDeep } from "@/components/technology/TechDeep";
import { RenderTabs } from "@/components/technology/RenderTabs";
import { SanityStudio } from "@/components/technology/SanityStudio";
import { GsapStar } from "@/components/technology/GsapStar";
import { ReactCounter } from "@/components/technology/ReactCounter";
import { TsPanel } from "@/components/technology/TsPanel";
import { TwPanel } from "@/components/technology/TwPanel";
import { StackRecap } from "@/components/technology/StackRecap";
import { getSite } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const lang = (await params).lang as Locale;
  const seo = getSite(lang).seo.technology;
  return pageMetadata({
    lang,
    path: "/technology",
    title: seo.title,
    description: seo.description,
  });
}

// Maps each deep section's `demo` discriminator to its visual + layout. Sanity
// uses the full-width "studio" layout; the rest are side-by-side .row panels.
function Demo({ demo }: { demo: string }) {
  switch (demo) {
    case "next":
      return <RenderTabs />;
    case "sanity":
      return <SanityStudio />;
    case "gsap":
      return <GsapStar />;
    case "react":
      return <ReactCounter />;
    case "ts":
      return <TsPanel />;
    case "tw":
      return <TwPanel />;
    default:
      return null;
  }
}

export default async function TechnologyPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = (await params).lang as Locale;
  const t = getTechnology(lang);
  return (
    <main>
      <TechHero lang={lang} />

      {t.sections.map((section) => (
        <TechDeep
          key={section.demo}
          section={section}
          layout={section.demo === "sanity" ? "full" : "row"}
        >
          <Demo demo={section.demo} />
        </TechDeep>
      ))}

      <StackRecap lang={lang} />

      <section className="tech-cta">
        <div className="wrap">
          <Reveal as="h2" className="display">
            {t.cta.title.map((line, li) => (
              <Fragment key={li}>
                {li > 0 && <br />}
                <Segments segs={line} />
              </Fragment>
            ))}
          </Reveal>
          <Reveal as="p" delay={1}>
            {t.cta.p}
          </Reveal>
          <Reveal as="div" className="hero-cta" delay={2}>
            {t.cta.ctas.map((cta) => (
              <Button
                key={cta.label}
                href={localizedHref(cta.href, lang)}
                variant={cta.variant}
                external={Boolean((cta as { external?: boolean }).external)}
              >
                {cta.label}
                {cta.arrow ? (
                  <>
                    {" "}
                    <span className="arr">{cta.arrow}</span>
                  </>
                ) : null}
              </Button>
            ))}
          </Reveal>
        </div>
      </section>
    </main>
  );
}
