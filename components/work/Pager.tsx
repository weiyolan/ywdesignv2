import Link from "next/link";
import { order, projects, type Slug } from "@/content/work";

// Prev / next project, wrapping circularly through order[] (matches the
// prototype: nu ← spiree / nu → milo, spiree → nu, …). The display name is the
// linked project's hero title (its first title segment, trimmed of the trailing
// " — …"). Renders the .pager grid inside the closing nav block.
function nameOf(slug: Slug): string {
  const t = projects[slug].titleSegs[0].t;
  const dash = t.indexOf(" — ");
  return dash === -1 ? t.trim() : t.slice(0, dash).trim();
}

export function Pager({ slug }: { slug: Slug }) {
  const i = order.indexOf(slug);
  const prev = order[(i - 1 + order.length) % order.length];
  const next = order[(i + 1) % order.length];

  return (
    <nav className="detail-section" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="pager">
          <Link href={`/work/${prev}`}>
            <span className="dir">← Previous</span>
            <span className="nm">{nameOf(prev)}</span>
          </Link>
          <Link href={`/work/${next}`} className="next">
            <span className="dir">Next →</span>
            <span className="nm">{nameOf(next)}</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
