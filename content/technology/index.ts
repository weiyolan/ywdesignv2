// Locale loader for technology-page copy.
import type { Locale } from "@/lib/i18n";
import { technology as technologyEN } from "./en";
import { technologyFR } from "./fr";
import { technologyNL } from "./nl";

export type {
  ContrastCol,
  RenderStrat,
  StudioDoc,
  StudioType,
  TechDemo,
  TechSection,
  RecapItem,
} from "./en";
export type Technology = typeof technologyEN;

const dict: Record<Locale, Technology> = {
  en: technologyEN,
  fr: technologyFR,
  nl: technologyNL,
};

export function getTechnology(locale: Locale): Technology {
  return dict[locale];
}
