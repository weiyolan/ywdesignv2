import { order, type Projects, type Slug } from "@/content/work";
import { LocaleLink } from "@/components/primitives/LocaleLink";

// Prev / next project, wrapping circularly through order[] (matches the
// prototype: nu ← spiree / nu → milo, spiree → nu, …). The display name is the
// linked project's hero title (its first title segment, trimmed of the trailing
// " — …"). Renders the .pager grid inside the closing nav block.
function nameOf(projects: Projects, slug: Slug): string {
  const t = projects[slug].titleSegs[0].t;
  const dash = t.indexOf(" — ");
  return dash === -1 ? t.trim() : t.slice(0, dash).trim();
}

export function Pager({
  slug,
  projects,
  labels,
}: {
  slug: Slug;
  projects: Projects;
  labels: { prev: string; next: string };
}) {
  const i = order.indexOf(slug);
  const prev = order[(i - 1 + order.length) % order.length];
  const next = order[(i + 1) % order.length];

  return (
    <nav className="detail-section" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="pager">
          <LocaleLink href={`/work/${prev}`}>
            <span className="dir">← {labels.prev}</span>
            <span className="nm">{nameOf(projects, prev)}</span>
          </LocaleLink>
          <LocaleLink href={`/work/${next}`} className="next">
            <span className="dir">{labels.next} →</span>
            <span className="nm">{nameOf(projects, next)}</span>
          </LocaleLink>
        </div>
      </div>
    </nav>
  );
}
