// Locale loader for the service pages. EN is the source of truth; FR/NL mirror
// its shape (declared `satisfies Services`).
import type { Locale } from "@/lib/i18n";
import { services as servicesEN } from "./en";
import { servicesFR } from "./fr";
import { servicesNL } from "./nl";

export type { Service, ServiceSlug, ServicePoint, Faq, Services } from "./en";
import type { Services, Service } from "./en";

const dict: Record<Locale, Services> = { en: servicesEN, fr: servicesFR, nl: servicesNL };

export function getServices(lang: Locale): Services {
  return dict[lang];
}

export function getService(lang: Locale, slug: string): Service | undefined {
  return dict[lang].items.find((s) => s.slug === slug);
}

export const serviceSlugs = servicesEN.items.map((s) => s.slug);
