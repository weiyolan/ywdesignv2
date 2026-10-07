// Global 404 for every unmatched URL (experimental.globalNotFound). The root
// layout lives under app/[lang], so this page brings its own <html>, styles,
// fonts, theme + appearance init. Locale is resolved client-side in <NotFound>.
import "./globals.css";
import "./notfound.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { NotFound } from "@/components/notfound/NotFound";
import { appearanceInit } from "@/lib/appearance";
import { fontVars } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "404 — YWdesign",
  description: "This page doesn't exist.",
  robots: { index: false, follow: true },
};

export default function GlobalNotFound() {
  return (
    <html lang="fr" suppressHydrationWarning className={fontVars}>
      <body data-surface="glass">
        <script dangerouslySetInnerHTML={{ __html: appearanceInit }} />
        <ThemeProvider>
          <NotFound />
        </ThemeProvider>
      </body>
    </html>
  );
}
