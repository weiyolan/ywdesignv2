import type { Project } from "@/content/work";

// Role / Year / Sector / Stack chips — the .meta-grid under the hero.
export function MetaGrid({ meta }: { meta: Project["meta"] }) {
  return (
    <div className="meta-grid">
      <div>
        <h4>Role</h4>
        <p>{meta.role}</p>
      </div>
      <div>
        <h4>Year</h4>
        <p>{meta.year}</p>
      </div>
      <div>
        <h4>Sector</h4>
        <p>{meta.sector}</p>
      </div>
      <div>
        <h4>Stack</h4>
        <div className="chips">
          {meta.stack.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
