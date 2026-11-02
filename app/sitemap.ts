import { execFileSync } from "node:child_process";
import type { MetadataRoute } from "next";
import { locales, defaultLocale, localizedHref } from "@/lib/i18n";
import { order } from "@/content/work";
import { serviceSlugs } from "@/content/services";

const BASE = "https://ywdesign.co";

// Source files behind each page — the newest commit touching any of them is the
// page's <lastmod>. Content is one file per locale (not per slug), so detail
// pages share their section's date.
const SOURCES: Record<string, string[]> = {
  home: ["content/home", "content/site", "app/[lang]/(site)/page.tsx", "components/home"],
  work: ["content/work", "app/[lang]/(site)/work"],
  workDetail: ["content/work", "app/[lang]/(detail)", "components/work"],
  technology: ["content/technology", "app/[lang]/(site)/technology", "components/technology"],
  about: ["content/about", "app/[lang]/(site)/about", "components/about"],
  services: ["content/services", "app/[lang]/(site)/services"],
};

// Last commit date for `files`, or undefined when git/history is unavailable
// (Google ignores a missing <lastmod>, but distrusts one that is always "now").
function lastCommit(files: string[]): Date | undefined {
  try {
    const iso = execFileSync("git", ["log", "-1", "--format=%cI", "--", ...files], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    return iso ? new Date(iso) : undefined;
  } catch {
    return undefined;
  }
}

// One entry per locale × page, each carrying the full hreflang alternate set
// (Google's recommended sitemap i18n pattern). `order` keeps the case studies
// in sync as projects are added.
export default function sitemap(): MetadataRoute.Sitemap {
  const dates = Object.fromEntries(
    Object.entries(SOURCES).map(([k, files]) => [k, lastCommit(files)]),
  ) as Record<keyof typeof SOURCES, Date | undefined>;

  const pages: { path: string; lastModified?: Date }[] = [
    { path: "/", lastModified: dates.home },
    { path: "/work", lastModified: dates.work },
    { path: "/technology", lastModified: dates.technology },
    { path: "/about", lastModified: dates.about },
    { path: "/services", lastModified: dates.services },
    ...serviceSlugs.map((s) => ({ path: `/services/${s}`, lastModified: dates.services })),
    ...order.map((s) => ({ path: `/work/${s}`, lastModified: dates.workDetail })),
  ];

  return pages.flatMap(({ path, lastModified }) =>
    locales.map((l) => ({
      url: BASE + localizedHref(path, l),
      ...(lastModified && { lastModified }),
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
