"use client";

import { createContext, useContext } from "react";
import type { Locale } from "@/lib/i18n";

// Holds the active locale for client components (which can't read route params).
// Set once from the server root layout via the awaited `lang` param.
const LocaleContext = createContext<Locale | null>(null);

export function LocaleProvider({
  lang,
  children,
}: {
  lang: Locale;
  children: React.ReactNode;
}) {
  return (
    <LocaleContext.Provider value={lang}>{children}</LocaleContext.Provider>
  );
}

export function useLocale(): Locale {
  const lang = useContext(LocaleContext);
  if (!lang) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return lang;
}
