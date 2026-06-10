import type { Site } from "@/content/site";
import { LocaleLink } from "@/components/primitives/LocaleLink";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";

export function SiteFooter({ site }: { site: Site }) {
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
            {col.links.map((l) => (
              <LocaleLink key={l.label} href={l.href} external={l.external}>
                {l.label}
              </LocaleLink>
            ))}
          </div>
        ))}
      </div>

      <div className="wrap">
        <div className="foot-legal">
          {site.footer.legal.map((s) => (
            <span key={s}>{s}</span>
          ))}
          <LanguageSwitcher className="foot-lang" />
        </div>
      </div>
    </footer>
  );
}
