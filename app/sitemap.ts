import type { MetadataRoute } from "next";
import { locales, defaultLocale, localizedHref } from "@/lib/i18n";
import { order } from "@/content/work";

const BASE = "https://ywdesign.co";

// One entry per locale × page, each carrying the full hreflang alternate set
// (Google's recommended sitemap i18n pattern). `order` keeps the case studies
// in sync as projects are added.
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/work",
    "/technology",
    "/about",
    ...order.map((s) => `/work/${s}`),
  ];

  return paths.flatMap((path) =>
    locales.map((l) => ({
      url: BASE + localizedHref(path, l),
      alternates: {
        languages: {
          ...Object.fromEntries(
            locales.map((ll) => [ll, BASE + localizedHref(path, ll)]),
          ),
          "x-default": BASE + localizedHref(path, defaultLocale),
        },
      },
    })),
  );
}
