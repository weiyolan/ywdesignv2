import { Reveal } from "@/components/primitives/Reveal";
import type { Head } from "@/content/work";

// Chapter / scope index — .chapter-index (milo "Architecture", 7 chapters).
export function ChapterIndex({
  head,
  chapters,
}: {
  head: Head;
  chapters: { cn: string; ct: string; cd: string }[];
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
        <Reveal as="div" className="chapter-index" delay={1}>
          {chapters.map((c) => (
            <div className="ci" key={c.cn}>
              <span className="cn">{c.cn}</span>
              <span className="ct">{c.ct}</span>
              <span className="cd">{c.cd}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
