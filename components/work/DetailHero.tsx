import { Reveal } from "@/components/primitives/Reveal";
import { Segments } from "@/components/primitives/Segments";
import { Button } from "@/components/primitives/Button";
import { MetaGrid } from "@/components/work/MetaGrid";
import type { Project } from "@/content/work";

// Case-study hero — eyebrow "0X · Category · Year", h1 with the scramble accent
// run, lede, actions and the MetaGrid. Ports the <header class="detail-hero">
// block; the scramble word comes through <Segments> like the home hero.
export function DetailHero({ project }: { project: Project }) {
  return (
    <header className="detail-hero">
      <div className="wrap">
        <div className="dh-eyebrow">
          <b>{project.eyebrowNum}</b> · {project.category} ·{" "}
          <span>{project.year}</span>
        </div>
        <Reveal as="h1" className="display">
          <Segments segs={project.titleSegs} />
        </Reveal>
        <Reveal as="p" className="dh-lede" delay={1}>
          {project.lede}
        </Reveal>
        <Reveal as="div" className="dh-actions" delay={2}>
          <Button href={project.liveHref} variant="primary" external>
            Visit live site <span className="arr">↗</span>
          </Button>
          <Button href="#signature" variant="ghost">
            Jump to the build
          </Button>
        </Reveal>
        <Reveal as="div" delay={2}>
          <MetaGrid meta={project.meta} />
        </Reveal>
      </div>
    </header>
  );
}
