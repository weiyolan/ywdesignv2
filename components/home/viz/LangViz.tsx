"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeLabels, switchLocalePath } from "@/lib/i18n";
import { useLocale } from "@/components/providers/LocaleProvider";

// The "Multilingual routing" bento card's EN/FR/NL tabs, wired to real locale
// navigation (same mechanism as the nav LocaleSwitcher, styled as .lang pills).
// The #capabilities hash keeps the visitor on this card after the locale swap.
export function LangViz() {
  const pathname = usePathname();
  const active = useLocale();
  return (
    <div className="lang" role="group" aria-label="Language">
      {locales.map((l) => (
        <Link
          key={l}
          href={switchLocalePath(pathname, l) + "#capabilities"}
          hrefLang={l}
          aria-current={l === active ? "true" : undefined}
          className={l === active ? "on" : undefined}
        >
          {localeLabels[l]}
        </Link>
      ))}
    </div>
  );
}
