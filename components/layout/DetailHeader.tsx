"use client";

import { useEffect, useState } from "react";
import type { Site } from "@/content/site";
import { LocaleLink } from "@/components/primitives/LocaleLink";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";

// Slim case-study nav: "← All work" → /work, the YWdesign logo → /, language
// switch. Scrolled state at scrollY > 20 (ports Claude Design/app.js :10-14 and
// the home nav pattern in SiteHeader.tsx).
export function DetailHeader({ site }: { site: Site }) {
  const [scrolled, setScrolled] = useState(false);
  const workLabel = site.nav.find((n) => n.href === "/work")?.label ?? "Work";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`detail-nav${scrolled ? " scrolled" : ""}`}>
      <LocaleLink className="back" href="/work">
        <span className="arr">←</span> {workLabel}
      </LocaleLink>
      <div className="detail-nav-end">
        <LocaleLink className="logo" href="/">
          <span className="mark">
            {site.brand.lead}
            <b>{site.brand.tail}</b>
          </span>
        </LocaleLink>
        <LanguageSwitcher />
      </div>
    </nav>
  );
}
