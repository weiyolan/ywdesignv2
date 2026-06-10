import "./technology.css";

import { Fragment } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTechnology } from "@/content/technology";
import { getSite } from "@/content/site";
import { isLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
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
import type { Technology } from "@/content/technology";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const seo = getSite(lang).seo.technology;
  return pageMetadata({ locale: lang, path: "/technology", title: seo.title, description: seo.description });
}

// Maps each deep section's `demo` discriminator to its visual + layout. Sanity
// uses the full-width "studio" layout; the rest are side-by-side .row panels.
function Demo({ demo, render, studio }: { demo: string; render: Technology["render"]; studio: Technology["studio"] }) {
  switch (demo) {
    case "next":
      return <RenderTabs render={render} />;
    case "sanity":
      return <SanityStudio studio={studio} />;
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

export default async function TechnologyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getTechnology(lang);
  return (
    <main>
      <TechHero hero={t.hero} />

      {t.sections.map((section) => (
        <TechDeep
          key={section.demo}
          section={section}
          layout={section.demo === "sanity" ? "full" : "row"}
        >
          <Demo demo={section.demo} render={t.render} studio={t.studio} />
        </TechDeep>
      ))}

      <StackRecap recap={t.recap} />

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
                href={cta.href}
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
