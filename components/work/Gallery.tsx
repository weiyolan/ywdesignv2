import Image from "next/image";
import { Reveal } from "@/components/primitives/Reveal";
import type { Head } from "@/content/work";

// Gallery grid — .gallery with wide/tall/half spans. Each cell is a next/image
// `fill` frame (.cell is position:relative; aspect-ratio comes from the span).
// Desktop width per span = its share of the 6-col grid inside the 1280px .wrap
// (stacks full-width below 780px — detail.css .gallery).
const SIZES = { wide: "min(66vw, 820px)", tall: "min(33vw, 400px)", half: "min(50vw, 610px)" };

export function Gallery({
  head,
  items,
}: {
  head: Head;
  items: { id: string; span: "wide" | "tall" | "half"; alt: string }[];
}) {
  return (
    <section className="detail-section">
      <div className="wrap">
        <Reveal as="div" className="ds-head">
          <span className="eyebrow">
            <span className="tk">{"//"}</span> {head.eyebrow}
          </span>
          <h2 className="display">{head.title}</h2>
          {head.intro ? <p>{head.intro}</p> : null}
        </Reveal>
        <Reveal as="div" className="gallery" delay={1}>
          {items.map((it) => (
            <div className={`g-${it.span}`} key={it.id}>
              <div className="cell">
                <Image
                  src={`/work/${it.id}.jpg`}
                  alt={it.alt}
                  fill
                  sizes={`(max-width: 780px) 100vw, ${SIZES[it.span]}`}
                />
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
