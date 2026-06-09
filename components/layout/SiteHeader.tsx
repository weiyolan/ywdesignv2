"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { getSite } from "@/content/site";
import { localizedHref } from "@/lib/i18n";
import { useLocale } from "@/components/providers/LocaleProvider";
import { Button } from "@/components/primitives/Button";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";

// Fixed nav + mobile drawer + scrim + theme toggle.
// Ports app.js :9-40 (scrolled state, burger, scrim, Escape/resize close).
export function SiteHeader() {
  const lang = useLocale();
  const site = getSite(lang);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("nav-open", open);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth > 900) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  // Ensure the body hook is cleared if the header unmounts while open.
  useEffect(() => () => document.body.classList.remove("nav-open"), []);

  const close = () => setOpen(false);

  return (
    <>
      <nav id="nav" className={scrolled ? "scrolled" : undefined}>
        <Link className="logo" href={localizedHref("/", lang)}>
          <span className="mark">
            {site.brand.lead}
            <b>{site.brand.tail}</b>
          </span>
          <span className="stat">{site.status}</span>
        </Link>

        <div className="navlinks">
          {site.nav.map((l) => (
            <Link key={l.label} href={localizedHref(l.href, lang)} className="hide-md">
              {l.label}
            </Link>
          ))}
          <Button href={localizedHref(site.cta.href, lang)} variant="primary" className="hide-sm">
            {site.cta.label} <span className="arr">→</span>
          </Button>
          <LocaleSwitcher />
          <ThemeToggle />
          <button
            className="nav-burger"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="nav-drawer"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div className="nav-drawer" id="nav-drawer" aria-hidden={!open}>
        {site.nav.map((l, i) => (
          <Link key={l.label} href={localizedHref(l.href, lang)} onClick={close}>
            {l.label} <span className="md-i">{String(i + 1).padStart(2, "0")}</span>
          </Link>
        ))}
        <Link href={localizedHref(site.cta.href, lang)} className="btn btn-primary md-cta" onClick={close}>
          {site.cta.label} <span className="arr">→</span>
        </Link>
      </div>
      <div className="nav-scrim" id="nav-scrim" onClick={close} aria-hidden="true" />
    </>
  );
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  // Both icons render; CSS shows the right one based on [data-theme], so there's
  // no theme read during render (no hydration mismatch, FOUC-free).
  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label="Toggle colour theme"
      onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
    >
      <SunIcon />
      <MoonIcon />
    </button>
  );
}

function SunIcon() {
  return (
    <svg className="ic-sun" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg className="ic-moon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  );
}
