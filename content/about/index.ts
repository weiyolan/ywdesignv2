// Locale loader for about-page copy. EN is the source of truth; FR/NL mirror
// its shape (declared `satisfies About`).
import type { Locale } from "@/lib/i18n";
import { about as aboutEN } from "./en";
import { aboutFR } from "./fr";
import { aboutNL } from "./nl";

// Keep the public surface of the old flat module intact.
export { about } from "./en";
export type { Fact, SkillChip, ValueItem, Stat } from "./en";
export type About = typeof aboutEN;

const dict: Record<Locale, About> = { en: aboutEN, fr: aboutFR, nl: aboutNL };

export function getAbout(lang: Locale): About {
  return dict[lang];
}
