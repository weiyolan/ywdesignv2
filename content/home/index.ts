// Locale loader for home-page copy. EN is the source of truth; FR/NL mirror
// its shape (declared `satisfies Home`).
import type { Locale } from "@/lib/i18n";
import { home as homeEN } from "./en";
import { homeFR } from "./fr";
import { homeNL } from "./nl";

// Keep the public surface of the old flat module intact.
export { home } from "./en";
export type { Seg, CaseLink } from "./en";
export type Home = typeof homeEN;

const dict: Record<Locale, Home> = { en: homeEN, fr: homeFR, nl: homeNL };

export function getHome(lang: Locale): Home {
  return dict[lang];
}
