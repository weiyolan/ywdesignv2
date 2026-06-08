import { Reveal } from "@/components/primitives/Reveal";
import { Narrative } from "@/components/work/Narrative";
import { Approach } from "@/components/work/Approach";
import { FeatureList } from "@/components/work/FeatureList";
import { StatBand } from "@/components/work/StatBand";
import { QuoteLead } from "@/components/work/QuoteLead";
import { Compare } from "@/components/work/Compare";
import { ChapterIndex } from "@/components/work/ChapterIndex";
import { Gallery } from "@/components/work/Gallery";
import { NuLangSwitch } from "@/components/work/signature/NuLangSwitch";
import { NuShop } from "@/components/work/signature/NuShop";
import { MiloChapterRail } from "@/components/work/signature/MiloChapterRail";
import { BermudaIcons } from "@/components/work/signature/BermudaIcons";
import { SpireeOrb } from "@/components/work/signature/SpireeOrb";
import type { Section as SectionT, Project } from "@/content/work";

// Picks the right demo for a signature section from the project's signatureData.
function SignatureDemo({
  demo,
  data,
}: {
  demo: Extract<SectionT, { kind: "signature" }>["demo"];
  data: Project["signatureData"];
}) {
  switch (demo) {
    case "nuLang":
      return data?.nuLang ? <NuLangSwitch dict={data.nuLang} /> : null;
    case "nuShop":
      return data?.nuShop ? <NuShop shop={data.nuShop} /> : null;
    case "miloRail":
      return data?.miloRail ? <MiloChapterRail chapters={data.miloRail} /> : null;
    case "bermudaIcons":
      return <BermudaIcons />;
    case "spireeOrb":
      return data?.spireeOrb ? <SpireeOrb data={data.spireeOrb} /> : null;
  }
}

// Switches on the section union and renders the matching block. `anchor` puts
// id="signature" on the first signature section (the hero "Jump to the build"
// target). `signatureData` is the project's interactive payload.
export function Section({
  section,
  anchor,
  signatureData,
}: {
  section: SectionT;
  anchor?: boolean;
  signatureData?: Project["signatureData"];
}) {
  switch (section.kind) {
    case "narrative":
      return <Narrative head={section.head} paras={section.paras} />;
    case "approach":
      return <Approach head={section.head} steps={section.steps} />;
    case "twoColFeature":
      return (
        <FeatureList
          head={section.head}
          paras={section.paras}
          features={section.features}
        />
      );
    case "featureList":
      return <FeatureList head={section.head} features={section.features} />;
    case "statBand":
      return <StatBand head={section.head} stats={section.stats} />;
    case "quote":
      return <QuoteLead quote={section.quote} cite={section.cite} />;
    case "compare":
      return <Compare head={section.head} cols={section.cols} />;
    case "chapterIndex":
      return <ChapterIndex head={section.head} chapters={section.chapters} />;
    case "gallery":
      return <Gallery head={section.head} items={section.items} />;
    case "signature":
      return (
        <section className="detail-section" id={anchor ? "signature" : undefined}>
          <div className="wrap">
            <Reveal as="div" className="ds-head">
              <span className="eyebrow">
                <span className="tk">{"//"}</span> {section.head.eyebrow}
              </span>
              <h2 className="display">{section.head.title}</h2>
              {section.head.intro ? <p>{section.head.intro}</p> : null}
            </Reveal>
            <Reveal as="div" className="demo" delay={1}>
              <div className="demo-head">
                <span className="lbl">
                  <span className="dot" /> {section.label}
                </span>
                <span>{section.note}</span>
              </div>
              {/* nuShop renders its own light-palette shell (no .demo-stage). */}
              {section.demo === "nuShop" ? (
                <SignatureDemo demo={section.demo} data={signatureData} />
              ) : (
                <div className="demo-stage">
                  <SignatureDemo demo={section.demo} data={signatureData} />
                </div>
              )}
            </Reveal>
          </div>
        </section>
      );
  }
}
