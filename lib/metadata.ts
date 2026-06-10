import type { Metadata } from "next";
import {
  defaultLocale,
  locales,
  localizedHref,
  ogLocale,
  type Locale,
} from "@/lib/i18n";

// Builds per-page, per-locale metadata: localized title/description plus the
// canonical URL, hreflang alternates (incl. x-default → the default locale) and
// og:locale. `path` is the locale-agnostic route, e.g. "/work" or "/work/nu".
// Resolved against metadataBase (set in the root layout).
export function pageMetadata({
  locale,
  path,
  title,
  description,
  titleAbsolute = false,
  ogTitle,
  ogDescription,
}: {
  locale: Locale;
  path: string;
  title?: string;
  description?: string;
  /** Bypass the "%s · YWdesign" template (used for the home page). */
  titleAbsolute?: boolean;
  ogTitle?: string;
  ogDescription?: string;
}): Metadata {
  const canonical = localizedHref(locale, path);

  const languages: Record<string, string> = {};
  for (const loc of locales) languages[loc] = localizedHref(loc, path);
  languages["x-default"] = localizedHref(defaultLocale, path);

  return {
    ...(title ? { title: titleAbsolute ? { absolute: title } : title } : {}),
    ...(description ? { description } : {}),
    alternates: { canonical, languages },
    openGraph: {
      title: ogTitle ?? title,
      description: ogDescription ?? description,
      url: canonical,
      siteName: "YWdesign",
      type: "website",
      locale: ogLocale[locale],
      alternateLocale: locales
        .filter((l) => l !== locale)
        .map((l) => ogLocale[l]),
    },
  };
}
