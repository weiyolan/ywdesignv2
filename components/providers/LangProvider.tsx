"use client";

import { createContext, useContext } from "react";
import { defaultLocale, type Locale } from "@/lib/i18n";

// Holds the active locale for the current route so client components (links,
// the language switcher) can localize without threading `locale` through every
// prop. Seeded once at the root [lang] layout from the route param; during SSG
// the concrete locale is baked into the static HTML.
const LangContext = createContext<Locale>(defaultLocale);

export function LangProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return <LangContext.Provider value={locale}>{children}</LangContext.Provider>;
}

export function useLang(): Locale {
  return useContext(LangContext);
}
