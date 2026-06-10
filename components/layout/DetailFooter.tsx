import type { Site } from "@/content/site";
import { LocaleLink } from "@/components/primitives/LocaleLink";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";

// Slim case-study footer: logo + copyright + email (ports the .detail-foot block
// from the prototype project pages).
export function DetailFooter({ site }: { site: Site }) {
  return (
    <footer className="detail-foot">
      <div className="wrap">
        <LocaleLink className="logo" href="/">
          <span className="mark">
            {site.brand.lead}
            <b>{site.brand.tail}</b>
          </span>
        </LocaleLink>
        <span className="lg">
          © 2026 YWdesign ·{" "}
          <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
        </span>
        <LanguageSwitcher />
      </div>
    </footer>
  );
}
