// Locale loader for home-page copy. `en.ts` is the source of truth (it also owns
// the shared Seg / CaseLink types); fr.ts and nl.ts mirror its shape. Components
// receive the resolved dictionary via props — they never import a locale directly.
import type { Locale } from "@/lib/i18n";
import { home as homeEN } from "./en";
import { homeFR } from "./fr";
import { homeNL } from "./nl";

export type { Seg, CaseLink } from "./en";
export type Home = typeof homeEN;

const dict: Record<Locale, Home> = { en: homeEN, fr: homeFR, nl: homeNL };

export function getHome(locale: Locale): Home {
  return dict[locale];
}
