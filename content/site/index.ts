// Locale loader for global site chrome (nav, marquee, terminal, contact, footer).
import type { Locale } from "@/lib/i18n";
import { site as siteEN } from "./en";
import { siteFR } from "./fr";
import { siteNL } from "./nl";

export type { NavLink, TerminalLine } from "./en";
export type Site = typeof siteEN;

const dict: Record<Locale, Site> = { en: siteEN, fr: siteFR, nl: siteNL };

export function getSite(locale: Locale): Site {
  return dict[locale];
}
