import type { Metadata } from "next";
import {
  locales,
  defaultLocale,
  localizedHref,
  ogLocale,
  type Locale,
} from "@/lib/i18n";

// Per-page metadata builder. Produces a SELF-referencing canonical + the full
// hreflang alternate set for `path` (so every page points at its own locale URL,
// not the homepage — the duplicate-canonical bug we're fixing), plus localized
// Open Graph + Twitter cards sharing one static brand image.
//
// `path` is locale-agnostic ("/", "/work", "/work/nu"); localizedHref prefixes it.
// URLs stay relative — metadataBase (set in the root layout) resolves them.
export function pageMetadata({
  lang,
  path,
  title,
  description,
  absoluteTitle = false,
  ogTitle,
  ogDescription,
}: {
  lang: Locale;
  path: string;
  title: string;
  description: string;
  absoluteTitle?: boolean; // home uses its full title (skips the "· YWdesign" template)
  ogTitle?: string;
  ogDescription?: string;
}): Metadata {
  const canonical = localizedHref(path, lang);
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical,
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, localizedHref(path, l)])),
        "x-default": localizedHref(path, defaultLocale),
      },
    },
    openGraph: {
      title: ogTitle ?? title,
      description: ogDescription ?? description,
      url: canonical,
      siteName: "YWdesign",
      locale: ogLocale[lang],
      type: "website",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: "YWdesign" }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle ?? title,
      description: ogDescription ?? description,
      images: ["/og.png"],
    },
  };
}
