// Locale loader for project case-study content. EN is the source of truth;
// FR/NL mirror its shape (declared `satisfies Record<Slug, Project>`).
import type { Locale } from "@/lib/i18n";
import { projects as projectsEN } from "./en";
import { projectsFR } from "./fr";
import { projectsNL } from "./nl";
import type { Slug, Project } from "./en";

// Keep the public surface of the old flat module intact.
export { order, projects } from "./en";
export type { Slug, Head, Section, Project } from "./en";

const dict: Record<Locale, Record<Slug, Project>> = {
  en: projectsEN,
  fr: projectsFR,
  nl: projectsNL,
};

export function getProjects(lang: Locale): Record<Slug, Project> {
  return dict[lang];
}
