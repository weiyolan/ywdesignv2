"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { site } from "@/content/site";

// Slim case-study nav: "← All work" → /work and the YWdesign logo → /.
// Scrolled state at scrollY > 20 (ports Claude Design/app.js :10-14 and the home
// nav pattern in SiteHeader.tsx).
export function DetailHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`detail-nav${scrolled ? " scrolled" : ""}`}>
      <Link className="back" href="/work">
        <span className="arr">←</span> All work
      </Link>
      <Link className="logo" href="/">
        <span className="mark">
          {site.brand.lead}
          <b>{site.brand.tail}</b>
        </span>
      </Link>
    </nav>
  );
}
