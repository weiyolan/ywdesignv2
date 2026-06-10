import type { Home } from "@/content/home";
import { Reveal } from "@/components/primitives/Reveal";

export function SupportingTech({ supporting }: { supporting: Home["stack"]["supporting"] }) {
  const s = supporting;
  return (
    <Reveal as="div" className="tech-mini-wrap">
      <span className="eyebrow">
        <span className="tk">{"//"}</span> {s.eyebrow}
      </span>
      <div className="tech-grid">
        {s.items.map((t) => (
          <div className="tech-mini" key={t.name}>
            <span className="tm-mark">{t.mark}</span>
            <span className="tm-text">
              <span className="tm-name">{t.name}</span>
              <span className="tm-role">{t.role}</span>
            </span>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
