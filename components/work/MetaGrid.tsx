import type { Project } from "@/content/work";
import { getSite } from "@/content/site";
import type { Locale } from "@/lib/i18n";

// Role / Year / Sector / Stack chips — the .meta-grid under the hero.
export function MetaGrid({ meta, lang }: { meta: Project["meta"]; lang: Locale }) {
  const m = getSite(lang).ui.meta;
  return (
    <div className="meta-grid">
      <div>
        <h4>{m.role}</h4>
        <p>{meta.role}</p>
      </div>
      <div>
        <h4>{m.year}</h4>
        <p>{meta.year}</p>
      </div>
      <div>
        <h4>{m.sector}</h4>
        <p>{meta.sector}</p>
      </div>
      <div>
        <h4>{m.stack}</h4>
        <div className="chips">
          {meta.stack.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
