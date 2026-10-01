"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { getSite } from "@/content/site";
import { getHome } from "@/content/home";
import { localizedHref, type Locale } from "@/lib/i18n";
import { useLocale } from "@/components/providers/LocaleProvider";
import { Button } from "@/components/primitives/Button";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import { AppearanceMenu } from "@/components/layout/AppearanceMenu";

type Props = {
  // Optional leading affordance — case studies keep the "← All work" back-link.
  back?: { href: string; label: string };
};

// The single primary navigation, shared by every screen (marketing + case studies).
// Keeping one source means the full nav — links, CTA, locale + theme + accent controls,
// mobile drawer — can never drift out of sync between layouts again (the divergence that
// left case studies without the appearance menu). `back` adds the case-study back-link.
// Locale-aware: reads the active locale from context (useLocale) and prefixes every
// internal link with localizedHref so visitors stay in their chosen language.
// Ports app.js :9-40 (scrolled state, burger, scrim, Escape/resize close).
export function PrimaryNav({ back }: Props) {
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
        <div className="nav-lead">
          {back && (
            <Link className="back" href={localizedHref(back.href, lang)} aria-label={back.label}>
              <span className="arr">←</span>
              <span className="lbl">{back.label}</span>
            </Link>
          )}
          <Link className="logo" href={localizedHref("/", lang)}>
            <span className="mark" role="img" aria-label={site.brand.lead + site.brand.tail} />
            <span className="stat">{site.status}</span>
          </Link>
        </div>

        <div className="navlinks">
          {site.nav.map((l) =>
            l.href === "/work" ? (
              <WorkMenu key={l.label} label={l.label} lang={lang} />
            ) : (
              <Link key={l.label} href={localizedHref(l.href, lang)} className="hide-md">
                {l.label}
              </Link>
            ),
          )}
          <Button href={localizedHref(site.cta.href, lang)} variant="primary" className="hide-sm">
            {site.cta.label} <span className="arr">→</span>
          </Button>
          <LocaleSwitcher className="hide-md" />
          <ThemeToggle />
          <AppearanceMenu />
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
          <div key={l.label}>
            <Link href={localizedHref(l.href, lang)} onClick={close}>
              {l.label} <span className="md-i">{String(i + 1).padStart(2, "0")}</span>
            </Link>
            {l.href === "/work" && (
              <div className="md-sub">
                {getHome(lang).work.items.map((p) => (
                  <Link key={p.slug} href={localizedHref(`/work/${p.slug}`, lang)} onClick={close}>
                    {p.title} <span className="md-i">{p.num}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
        <Link href={localizedHref(site.cta.href, lang)} className="btn btn-primary md-cta" onClick={close}>
          {site.cta.label} <span className="arr">→</span>
        </Link>
        {/* Language lives in the drawer on mobile (hidden from the top bar via
            hide-md), so the switch stays reachable without crowding the header. */}
        <div className="md-locale">
          <span className="md-locale-label">{site.ui.language}</span>
          <LocaleSwitcher className="md-switch" />
        </div>
      </div>
      <div className="nav-scrim" id="nav-scrim" onClick={close} aria-hidden="true" />
    </>
  );
}

// "Work" + a shadcn-style NavigationMenu card panel listing every case study.
// Hover (desktop) or the chevron opens it; Esc / outside click / navigating closes it.
function WorkMenu({ label, lang }: { label: string; lang: Locale }) {
  const items = getHome(lang).work.items;
  const allWork = getSite(lang).ui.allWork;
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timer = useRef(0);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const hover = (v: boolean) => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setOpen(v), v ? 80 : 180);
  };
  const close = () => setOpen(false);

  return (
    <div className="navmenu hide-md" ref={ref} onMouseEnter={() => hover(true)} onMouseLeave={() => hover(false)}>
      <Link href={localizedHref("/work", lang)} onClick={close}>
        {label}
      </Link>
      <button
        type="button"
        className="navmenu-trigger"
        aria-label={label}
        aria-expanded={open}
        aria-controls="navmenu-panel"
        onClick={() => setOpen((v) => !v)}
      >
        <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
          <path d="M2 3.5 5 6.5 8 3.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </button>
      <div id="navmenu-panel" className="navmenu-panel" data-open={open} inert={!open}>
        <div className="navmenu-grid">
          {items.map((p) => (
            <Link key={p.slug} className="navmenu-card" href={localizedHref(`/work/${p.slug}`, lang)} onClick={close}>
              <span className="navmenu-thumb">
                <Image src={p.img} alt="" fill sizes="96px" />
              </span>
              <span className="navmenu-txt">
                <b>
                  <span className="n">{p.num}</span> {p.title}
                </b>
                <small>{p.cat}</small>
              </span>
            </Link>
          ))}
        </div>
        <Link className="navmenu-all" href={localizedHref("/work", lang)} onClick={close}>
          {allWork} <span className="arr">→</span>
        </Link>
      </div>
    </div>
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
