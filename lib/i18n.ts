// Locale model for the whole site. FR is the default and is served UNPREFIXED
// at the root (`/`, `/work`, …); EN and NL live under `/en/*` and `/nl/*`.
// The locale routing itself (rewrite of unprefixed → /fr, redirect of /fr → /)
// lives in proxy.ts; this file is the shared source of truth both it and the
// app import.

export const locales = ["fr", "en", "nl"] as const;
export type Locale = (typeof locales)[number];

/** The default locale — served without a path prefix. */
export const defaultLocale: Locale = "fr";

/** Short chips for the language switcher (FR / EN / NL). */
export const localeLabels: Record<Locale, string> = {
  fr: "FR",
  en: "EN",
  nl: "NL",
};

/** Full names for accessible labels / titles. */
export const localeNames: Record<Locale, string> = {
  fr: "Français",
  en: "English",
  nl: "Nederlands",
};

/** Value for the <html lang> attribute. */
export const htmlLang: Record<Locale, string> = {
  fr: "fr",
  en: "en",
  nl: "nl",
};

/** Value for og:locale (region-qualified where it reads naturally). */
export const ogLocale: Record<Locale, string> = {
  fr: "fr_BE",
  en: "en_GB",
  nl: "nl_BE",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Cookie holding the visitor's chosen/detected locale (set by the switcher and
 *  the proxy; read by the proxy to honour explicit choices over Accept-Language). */
export const LOCALE_COOKIE = "NEXT_LOCALE";

/**
 * Best-matching supported locale from an Accept-Language header, or null if none
 * match (e.g. a crawler that sends no header → fall back to the default locale).
 */
export function matchAcceptLanguage(header: string | null | undefined): Locale | null {
  if (!header) return null;
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { base: tag.toLowerCase().split("-")[0], q: q ? parseFloat(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  for (const { base } of ranked) {
    if (isLocale(base)) return base;
  }
  return null;
}

/**
 * Prefix an app-internal href for a locale.
 * - External / protocol / mailto / tel / pure same-page hash → untouched.
 * - Default locale (fr) → returned as authored (no prefix).
 * - Otherwise the locale prefix is prepended: "/work" → "/en/work",
 *   "/" → "/en", "/#contact" → "/en#contact".
 */
export function localizedHref(locale: Locale, href: string): string {
  if (/^(https?:|mailto:|tel:|#)/.test(href)) return href;
  if (locale === defaultLocale) return href;
  if (href === "/") return `/${locale}`;
  if (href.startsWith("/#")) return `/${locale}${href.slice(1)}`; // "/#x" → "/en#x"
  return `/${locale}${href}`;
}

/**
 * Strip a leading locale prefix from a pathname, returning the locale-agnostic
 * "bare" path (always starting with "/"). Used by the language switcher to map
 * the current URL onto another locale.
 * "/en/work" → "/work"; "/work" → "/work"; "/en" → "/"; "/" → "/".
 *
 * Strips ALL locales — including the default ("/fr") — so the result is stable
 * whether usePathname() reports the clean URL ("/work") or the proxy-rewritten
 * internal path ("/fr/work"); both collapse to the same bare path.
 */
export function stripLocale(pathname: string): string {
  for (const loc of locales) {
    if (pathname === `/${loc}`) return "/";
    if (pathname.startsWith(`/${loc}/`)) return pathname.slice(loc.length + 1);
  }
  return pathname || "/";
}
