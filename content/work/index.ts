// Locale loader for project case-study content. `order` and the Slug/Section
// types are locale-agnostic (they drive routing); only the `projects` data is
// translated. Note: each project's `signatureData` may itself carry en/fr demo
// payloads — those belong to the case-study UI and are NOT the visitor locale.
import type { Locale } from "@/lib/i18n";
import { projects as projectsEN } from "./en";
import { projectsFR } from "./fr";
import { projectsNL } from "./nl";

export { order } from "./en";
export type { Slug, Head, Section, Project } from "./en";
export type Projects = typeof projectsEN;

const dict: Record<Locale, Projects> = {
  en: projectsEN,
  fr: projectsFR,
  nl: projectsNL,
};

export function getWork(locale: Locale): Projects {
  return dict[locale];
}
