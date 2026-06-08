import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer>
      <div className="wrap foot-grid">
        <div className="foot-brand">
          <div className="mark">
            {site.brand.lead}
            <b>{site.brand.tail}</b>
          </div>
          <p>{site.footer.tagline}</p>
        </div>

        {site.footer.columns.map((col) => (
          <div className="foot-col" key={col.title}>
            <h5>{col.title}</h5>
            {col.links.map((l) =>
              l.external ? (
                <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer">
                  {l.label}
                </a>
              ) : (
                <a key={l.label} href={l.href}>
                  {l.label}
                </a>
              ),
            )}
          </div>
        ))}
      </div>

      <div className="wrap">
        <div className="foot-legal">
          {site.footer.legal.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
      </div>
    </footer>
  );
}
