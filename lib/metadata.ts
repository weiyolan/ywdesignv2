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
// Open Graph + Twitter cards (the locale's sun card unless a page passes its own).
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
  image,
  type = "website",
}: {
  lang: Locale;
  path: string;
  title: string;
  description: string;
  absoluteTitle?: boolean; // home uses its full title (skips the "· YWdesign" template)
  ogTitle?: string;
  ogDescription?: string;
  image?: { url: string; width: number; height: number; alt: string; type?: string };
  type?: "website" | "article";
}): Metadata {
  const canonical = localizedHref(path, lang);
  image ??= ogCard(lang, ogTitle ?? title);
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
      type,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle ?? title,
      description: ogDescription ?? description,
      images: [image.url],
    },
  };
}

// Localized 1200×630 social card with the 3D sun (scripts/gen-assets.mjs).
// JPEG, ≈70 KB — well inside WhatsApp's preview size limit.
export function ogCard(lang: Locale, alt: string) {
  return { url: `/og-${lang}.jpg`, width: 1200, height: 630, alt, type: "image/jpeg" };
}
