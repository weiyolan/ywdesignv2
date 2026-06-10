"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "@/components/providers/LangProvider";
import {
  locales,
  localeLabels,
  localeNames,
  localizedHref,
  LOCALE_COOKIE,
  stripLocale,
} from "@/lib/i18n";

// Persist the explicit choice so the proxy honours it over Accept-Language
// (so picking FR isn't auto-redirected back to a detected EN/NL).
function setLocaleCookie(loc: string) {
  document.cookie = `${LOCALE_COOKIE}=${loc};path=/;max-age=31536000;samesite=lax`;
}

// FR / EN / NL switch. Keeps the visitor on the same logical page: strips the
// current locale prefix to the bare path, then re-localizes it for each locale.
// Renders the .lang-switch group used in the site + detail headers/footers.
export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const active = useLang();
  const pathname = usePathname();
  const bare = stripLocale(pathname);

  return (
    <div
      className={`lang-switch${className ? " " + className : ""}`}
      role="group"
      aria-label="Language"
    >
      {locales.map((loc) => {
        const current = loc === active;
        return (
          <Link
            key={loc}
            href={localizedHref(loc, bare)}
            hrefLang={loc}
            aria-label={localeNames[loc]}
            aria-current={current ? "true" : undefined}
            className={current ? "is-active" : undefined}
            onClick={() => setLocaleCookie(loc)}
          >
            {localeLabels[loc]}
          </Link>
        );
      })}
    </div>
  );
}
