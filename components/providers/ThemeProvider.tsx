"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";

// Drives [data-theme="dark|light"] on <html> — exactly what globals.css keys on.
// next-themes injects a pre-paint inline script, so this replaces the prototype's
// theme-init.js with no flash of the wrong theme.
export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
