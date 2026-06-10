// Locale loader for the technology page. EN is the source of truth; FR/NL
// mirror its shape (declared `satisfies Technology`).
import type { Locale } from "@/lib/i18n";
import { technology as technologyEN } from "./en";
import { technologyFR } from "./fr";
import { technologyNL } from "./nl";

// Keep the public surface of the old flat module intact.
export { technology } from "./en";
export type { ContrastCol, RenderStrat, StudioDoc, StudioType, TechDemo, TechSection, RecapItem } from "./en";
export type Technology = typeof technologyEN;

const dict: Record<Locale, Technology> = { en: technologyEN, fr: technologyFR, nl: technologyNL };

export function getTechnology(lang: Locale): Technology {
  return dict[lang];
}
