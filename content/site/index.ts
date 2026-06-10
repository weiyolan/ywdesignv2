// Locale loader for global site chrome (nav, marquee, terminal, contact,
// footer) + per-page SEO. EN is the source of truth; FR/NL mirror its shape.
import type { Locale } from "@/lib/i18n";
import { site as siteEN } from "./en";
import { siteFR } from "./fr";
import { siteNL } from "./nl";

// Keep the public surface of the old flat module intact.
export { site } from "./en";
export type { NavLink, TerminalLine } from "./en";
export type Site = typeof siteEN;

const dict: Record<Locale, Site> = { en: siteEN, fr: siteFR, nl: siteNL };

export function getSite(lang: Locale): Site {
  return dict[lang];
}
