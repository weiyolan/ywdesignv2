import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, defaultLocale, type Locale } from "@/lib/i18n";

// Next.js 16 renamed the `middleware` file convention to `proxy`.
// Detects the visitor's preferred locale and redirects unprefixed paths
// (e.g. /work) to a locale-prefixed URL (e.g. /fr/work).

// Minimal Accept-Language parser — avoids pulling in negotiator/intl-localematcher
// for a 3-locale site. Returns the best supported match, else the default (fr).
function getLocale(request: NextRequest): Locale {
  const header = request.headers.get("accept-language");
  if (!header) return defaultLocale;

  const wanted = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { tag: tag.toLowerCase(), q: q ? Number.parseFloat(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { tag } of wanted) {
    const base = tag.split("-")[0];
    const hit = locales.find((l) => l === tag || l === base);
    if (hit) return hit;
  }
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
  if (hasLocale) return;

  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  // 308 (permanent) so search engines consolidate ranking onto the locale URLs.
  // All internal links are already locale-prefixed; the switcher stays available.
  return NextResponse.redirect(request.nextUrl, 308);
}

export const config = {
  // Skip Next internals, the API, and any path with a file extension
  // (static assets in /public such as /work/*.svg, /icon.svg, favicon, …).
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
