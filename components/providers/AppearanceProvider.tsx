"use client";

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  ACCENT_KEY,
  DEFAULT_HUE,
  TYPE_KEY,
  type TypeTheme,
} from "@/lib/appearance";

// Two visitor-chosen preferences that sit alongside next-themes' light/dark:
//   • typeTheme — "code" (default, Bricolage/JetBrains) ⇄ "editor" (Fraunces/Newsreader
//     serif + warm palette). Drives [data-type="editor"] on <html>; globals.css keys on it.
//   • accentHue — rotates the OKLCH accent. Lightness/chroma are fixed per theme in CSS
//     (--accent-l/--accent-c) so every hue stays legible on dark and light. Sets --accent-h inline.
// Both persist to localStorage; a pre-paint script in app/layout.tsx applies them before
// first paint (no flash). This provider just mirrors that into React state for the UI.

type AppearanceValue = {
  typeTheme: TypeTheme;
  accentHue: number;
  setTypeTheme: (t: TypeTheme) => void;
  setAccentHue: (h: number) => void;
};

const AppearanceContext = createContext<AppearanceValue | null>(null);

// Module-level store (one per page): lazily seeded from localStorage on the
// client, read through useSyncExternalStore so SSR/hydration render the defaults
// and the client snapshot follows — no setState-in-effect sync pass.
type Prefs = { typeTheme: TypeTheme; accentHue: number };
const SERVER_PREFS: Prefs = { typeTheme: "code", accentHue: DEFAULT_HUE };
let prefs: Prefs | null = null;
const listeners = new Set<() => void>();

function readStored(): Prefs {
  const next = { ...SERVER_PREFS };
  try {
    const t = localStorage.getItem(TYPE_KEY);
    if (t === "editor" || t === "code") next.typeTheme = t;
    const h = Number(localStorage.getItem(ACCENT_KEY));
    if (Number.isFinite(h) && h > 0) next.accentHue = h;
  } catch {}
  return next;
}
const getPrefs = () => (prefs ??= readStored());
const getServerPrefs = () => SERVER_PREFS;
function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => void listeners.delete(cb);
}
function update(patch: Partial<Prefs>) {
  prefs = { ...getPrefs(), ...patch };
  listeners.forEach((l) => l());
}

export function AppearanceProvider({ children }: { children: ReactNode }) {
  const { typeTheme, accentHue } = useSyncExternalStore(subscribe, getPrefs, getServerPrefs);

  const setTypeTheme = useCallback((t: TypeTheme) => {
    update({ typeTheme: t });
    document.documentElement.setAttribute("data-type", t);
    try {
      localStorage.setItem(TYPE_KEY, t);
    } catch {}
  }, []);

  const setAccentHue = useCallback((h: number) => {
    update({ accentHue: h });
    document.documentElement.style.setProperty("--accent-h", String(h));
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
