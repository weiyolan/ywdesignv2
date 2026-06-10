// Locale loader for about-page copy.
import type { Locale } from "@/lib/i18n";
import { about as aboutEN } from "./en";
import { aboutFR } from "./fr";
import { aboutNL } from "./nl";

export type { Fact, SkillChip, ValueItem, Stat } from "./en";
export type About = typeof aboutEN;

const dict: Record<Locale, About> = { en: aboutEN, fr: aboutFR, nl: aboutNL };

export function getAbout(locale: Locale): About {
  return dict[locale];
}
