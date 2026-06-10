"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  accentFromHue,
  ACCENT_KEY,
  DEFAULT_HUE,
  TYPE_KEY,
  type TypeTheme,
} from "@/lib/appearance";

// Two visitor-chosen preferences that sit alongside next-themes' light/dark:
//   • typeTheme — "code" (default, Bricolage/JetBrains) ⇄ "editor" (Fraunces/Newsreader
//     serif + warm palette). Drives [data-type="editor"] on <html>; globals.css keys on it.
//   • accentHue — rotates the OKLCH accent. Lightness/chroma stay locked (ACCENT_LC) so
//     every hue is tasteful and --accent-ink contrast stays valid. Sets --accent inline.
// Both persist to localStorage; a pre-paint script in app/layout.tsx applies them before
// first paint (no flash). This provider just mirrors that into React state for the UI.

type AppearanceValue = {
  typeTheme: TypeTheme;
  accentHue: number;
  setTypeTheme: (t: TypeTheme) => void;
  setAccentHue: (h: number) => void;
};

const AppearanceContext = createContext<AppearanceValue | null>(null);

export function AppearanceProvider({ children }: { children: ReactNode }) {
  const [typeTheme, setTypeThemeState] = useState<TypeTheme>("code");
  const [accentHue, setAccentHueState] = useState<number>(DEFAULT_HUE);

  // Sync React state to whatever the pre-paint script already applied to <html>.
  useEffect(() => {
    const t = localStorage.getItem(TYPE_KEY);
    if (t === "editor" || t === "code") setTypeThemeState(t);
    const h = Number(localStorage.getItem(ACCENT_KEY));
    if (Number.isFinite(h) && h > 0) setAccentHueState(h);
  }, []);

  const setTypeTheme = useCallback((t: TypeTheme) => {
    setTypeThemeState(t);
    document.documentElement.setAttribute("data-type", t);
    try {
      localStorage.setItem(TYPE_KEY, t);
    } catch {}
  }, []);

  const setAccentHue = useCallback((h: number) => {
    setAccentHueState(h);
    document.documentElement.style.setProperty("--accent", accentFromHue(h));
    try {
      localStorage.setItem(ACCENT_KEY, String(h));
    } catch {}
  }, []);

  return (
    <AppearanceContext.Provider
      value={{ typeTheme, accentHue, setTypeTheme, setAccentHue }}
    >
      {children}
    </AppearanceContext.Provider>
  );
}

export function useAppearance() {
  const ctx = useContext(AppearanceContext);
  if (!ctx)
    throw new Error("useAppearance must be used within AppearanceProvider");
  return ctx;
}
