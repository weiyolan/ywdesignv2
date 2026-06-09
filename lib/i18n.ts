// Locale config + URL helpers for the EN / FR / NL site.
// Default locale is French; routes are sub-path prefixed (/fr, /en, /nl).
export const locales = ["fr", "en", "nl"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

// Short labels for the locale switcher.
export const localeLabels: Record<Locale, string> = {
  fr: "FR",
  en: "EN",
  nl: "NL",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

// Prefix an internal app path with the active locale. External links,
// mailto:/tel:, and bare hashes are returned untouched.
//   "/"          -> "/fr"
//   "/#contact"  -> "/fr#contact"
//   "/work/nu"   -> "/fr/work/nu"
export function localizedHref(href: string, lang: Locale): string {
  if (!href.startsWith("/")) return href;
  if (href === "/") return `/${lang}`;
  if (href.startsWith("/#")) return `/${lang}${href.slice(1)}`;
  return `/${lang}${href}`;
}

// Swap the leading locale segment of a pathname for `lang`, preserving the rest.
// Used by the locale switcher. "/en/work/nu" + "fr" -> "/fr/work/nu".
export function switchLocalePath(pathname: string, lang: Locale): string {
  const segments = pathname.split("/");
  // segments[0] is "" (leading slash); segments[1] is the current locale.
  if (segments[1] && isLocale(segments[1])) {
    segments[1] = lang;
    return segments.join("/") || `/${lang}`;
  }
  return `/${lang}${pathname}`;
}
