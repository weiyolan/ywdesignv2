"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getSite } from "@/content/site";
import { localizedHref } from "@/lib/i18n";
import { useLocale } from "@/components/providers/LocaleProvider";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";

// Slim case-study nav: "← All work" → /work and the YWdesign logo → /.
// Scrolled state at scrollY > 20 (ports Claude Design/app.js :10-14 and the home
// nav pattern in SiteHeader.tsx).
export function DetailHeader() {
  const lang = useLocale();
  const site = getSite(lang);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`detail-nav${scrolled ? " scrolled" : ""}`}>
      <Link className="back" href={localizedHref("/work", lang)}>
        <span className="arr">←</span> All work
      </Link>
      <LocaleSwitcher />
      <Link className="logo" href={localizedHref("/", lang)}>
        <span className="mark">
          {site.brand.lead}
          <b>{site.brand.tail}</b>
        </span>
      </Link>
    </nav>
  );
}
