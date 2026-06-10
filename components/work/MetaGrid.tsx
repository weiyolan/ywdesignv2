import type { Project } from "@/content/work";
import type { Site } from "@/content/site";

// Role / Year / Sector / Stack chips — the .meta-grid under the hero.
export function MetaGrid({
  meta,
  labels,
}: {
  meta: Project["meta"];
  labels: Site["ui"]["meta"];
}) {
  return (
    <div className="meta-grid">
      <div>
        <h4>{labels.role}</h4>
        <p>{meta.role}</p>
      </div>
      <div>
        <h4>{labels.year}</h4>
        <p>{meta.year}</p>
      </div>
      <div>
        <h4>{labels.sector}</h4>
        <p>{meta.sector}</p>
      </div>
      <div>
        <h4>{labels.stack}</h4>
        <div className="chips">
          {meta.stack.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
