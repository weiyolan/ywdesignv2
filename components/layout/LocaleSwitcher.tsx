"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeLabels, switchLocalePath } from "@/lib/i18n";
import { useLocale } from "@/components/providers/LocaleProvider";
import styles from "./LocaleSwitcher.module.css";

// FR / EN / NL toggle. Swaps the leading locale segment of the current path so
// the visitor stays on the same page in the chosen language.
export function LocaleSwitcher() {
  const pathname = usePathname();
  const active = useLocale();

  return (
    <div className={styles.switch} role="group" aria-label="Language">
      {locales.map((l) => (
        <Link
          key={l}
          href={switchLocalePath(pathname, l)}
          hrefLang={l}
          aria-current={l === active ? "true" : undefined}
          className={`${styles.link}${l === active ? " " + styles.active : ""}`}
        >
          {localeLabels[l]}
        </Link>
      ))}
    </div>
  );
}
