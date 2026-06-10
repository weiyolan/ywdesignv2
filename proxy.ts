import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  defaultLocale,
  isLocale,
  locales,
  LOCALE_COOKIE,
  matchAcceptLanguage,
} from "@/lib/i18n";

// Locale routing + language auto-detection. The default locale (FR) is served
// WITHOUT a path prefix, the others (EN/NL) under "/en/*" and "/nl/*". All pages
// physically live under app/[lang]; this proxy maps clean URLs onto that tree:
//
//   /en, /en/work        → pass through (resolve as lang="en"), sync cookie
//   /fr, /fr/work        → redirect to "/", "/work" (no duplicate default URLs)
//   /, /work  (no prefix) → preferred locale:
//                            · FR  → rewrite to /fr, /fr/work  (URL stays clean)
//                            · EN/NL → redirect to /en/*, /nl/*
//
// Preferred locale = NEXT_LOCALE cookie (an explicit switcher choice) → else the
// Accept-Language header → else the default. A crawler that sends no
// Accept-Language gets the default (FR), so "/" stays the canonical French URL.
const prefixed = locales.filter((l) => l !== defaultLocale);
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

function preferredLocale(request: NextRequest) {
  const cookie = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookie && isLocale(cookie)) return cookie;
  return matchAcceptLanguage(request.headers.get("accept-language")) ?? defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // EN / NL: already prefixed — resolve under app/[lang] and keep the cookie in
  // sync with where the visitor actually is.
  for (const loc of prefixed) {
    if (pathname === `/${loc}` || pathname.startsWith(`/${loc}/`)) {
      const res = NextResponse.next();
      if (request.cookies.get(LOCALE_COOKIE)?.value !== loc) {
        res.cookies.set(LOCALE_COOKIE, loc, {
          path: "/",
          maxAge: COOKIE_MAX_AGE,
          sameSite: "lax",
        });
      }
      return res;
    }
  }

  // Explicit default-locale prefix → redirect to the clean URL and pin the cookie
  // to FR, so the auto-detect below won't bounce it to another locale.
  if (
    pathname === `/${defaultLocale}` ||
    pathname.startsWith(`/${defaultLocale}/`)
  ) {
    const stripped = pathname.slice(defaultLocale.length + 1) || "/";
    const res = NextResponse.redirect(new URL(stripped, request.url));
    res.cookies.set(LOCALE_COOKIE, defaultLocale, {
      path: "/",
      maxAge: COOKIE_MAX_AGE,
      sameSite: "lax",
    });
    return res;
  }

  // Unprefixed path → auto-detect.
  const preferred = preferredLocale(request);
  if (preferred !== defaultLocale) {
    // Non-default preference → redirect to the prefixed URL (cookie is then synced
    // by the pass-through branch above on the redirect target).
    const url = request.nextUrl.clone();
    url.pathname = `/${preferred}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url);
  }

  // Default locale → serve the FR tree, keeping the URL prefix-free.
  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Next internals, API routes, metadata files and any path with a file
  // extension (static assets in /public).
  matcher: [
    "/((?!_next/static|_next/image|api|favicon.ico|icon.svg|robots.txt|sitemap.xml|.*\\..*).*)",
  ],
};
