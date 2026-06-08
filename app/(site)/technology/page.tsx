import "./technology.css";

import { Fragment } from "react";
import type { Metadata } from "next";
import { technology } from "@/content/technology";
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

export const metadata: Metadata = {
  title: "The technology — deep dive",
  description:
    "No WordPress, no page builders — every site is hand-built on a modern stack: Next.js, Sanity, GSAP, React, TypeScript and Tailwind. Here's exactly what runs under the hood, and why each piece earns its place.",
};

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

export default function TechnologyPage() {
  const t = technology;
  return (
    <main>
      <TechHero />

      {t.sections.map((section) => (
        <TechDeep
          key={section.demo}
          section={section}
          layout={section.demo === "sanity" ? "full" : "row"}
        >
          <Demo demo={section.demo} />
        </TechDeep>
      ))}

      <StackRecap />

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
