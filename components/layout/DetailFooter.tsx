import Link from "next/link";
import { getSite } from "@/content/site";
import { localizedHref, type Locale } from "@/lib/i18n";

// Slim case-study footer: logo + copyright + email (ports the .detail-foot block
// from the prototype project pages).
export function DetailFooter({ lang }: { lang: Locale }) {
  const site = getSite(lang);
  return (
    <footer className="detail-foot">
      <div className="wrap">
        <Link className="logo" href={localizedHref("/", lang)}>
          <span className="mark">
            {site.brand.lead}
            <b>{site.brand.tail}</b>
          </span>
        </Link>
        <span className="lg">
          © 2026 YWdesign ·{" "}
          <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
        </span>
      </div>
    </footer>
  );
}
