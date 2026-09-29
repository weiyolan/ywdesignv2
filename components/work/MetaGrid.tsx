import type { Project } from "@/content/work";
import { getSite } from "@/content/site";
import type { Locale } from "@/lib/i18n";

// Role / Year / Sector / Stack chips — the .meta-grid under the hero.
export function MetaGrid({ meta, lang }: { meta: Project["meta"]; lang: Locale }) {
  const m = getSite(lang).ui.meta;
  return (
    <dl className="meta-grid">
      <div>
        <dt>{m.role}</dt>
        <dd>{meta.role}</dd>
      </div>
      <div>
        <dt>{m.year}</dt>
        <dd>{meta.year}</dd>
      </div>
      <div>
        <dt>{m.sector}</dt>
        <dd>{meta.sector}</dd>
      </div>
      <div>
        <dt>{m.stack}</dt>
        <dd className="chips">
          {meta.stack.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </dd>
      </div>
    </dl>
  );
}
