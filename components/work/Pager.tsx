import Link from "next/link";
import { order, getProjects, type Slug } from "@/content/work";
import { localizedHref, type Locale } from "@/lib/i18n";

// Prev / next project, wrapping circularly through order[] (matches the
// prototype: nu ← spiree / nu → milo, spiree → nu, …). The display name is the
// linked project's hero title (its first title segment, trimmed of the trailing
// " — …"). Renders the .pager grid inside the closing nav block.
function nameOf(slug: Slug, lang: Locale): string {
  const t = getProjects(lang)[slug].titleSegs[0].t;
  const dash = t.indexOf(" — ");
  return dash === -1 ? t.trim() : t.slice(0, dash).trim();
}

export function Pager({ slug, lang }: { slug: Slug; lang: Locale }) {
  const i = order.indexOf(slug);
  const prev = order[(i - 1 + order.length) % order.length];
  const next = order[(i + 1) % order.length];

  return (
    <nav className="detail-section" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="pager">
          <Link href={localizedHref(`/work/${prev}`, lang)}>
            <span className="dir">← Previous</span>
            <span className="nm">{nameOf(prev, lang)}</span>
          </Link>
          <Link href={localizedHref(`/work/${next}`, lang)} className="next">
            <span className="dir">Next →</span>
            <span className="nm">{nameOf(next, lang)}</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
