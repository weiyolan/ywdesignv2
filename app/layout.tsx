import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  JetBrains_Mono,
  Fraunces,
  Newsreader,
} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { AppearanceProvider } from "@/components/providers/AppearanceProvider";
import { ACCENT_LC, TYPE_KEY, ACCENT_KEY } from "@/lib/appearance";
import { GsapProvider } from "@/components/providers/GsapProvider";
import { BackgroundFX } from "@/components/layout/BackgroundFX";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

// Editor-theme serifs. preload:false → the woff2 files download only when a visitor
// actually switches to the editor theme (the browser fetches a font file lazily, when
// some rendered text first uses the family), so the default "code" view pays nothing.
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  preload: false,
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
  style: ["normal", "italic"],
  preload: false,
});

// Runs before first paint (mirrors next-themes' own data-theme script) so a returning
// visitor's editor theme + custom accent are applied with no flash of the defaults.
const appearanceInit = `(function(){try{var d=document.documentElement;if(localStorage.getItem('${TYPE_KEY}')==='editor')d.setAttribute('data-type','editor');var h=localStorage.getItem('${ACCENT_KEY}');if(h)d.style.setProperty('--accent','oklch(${ACCENT_LC} '+h+')');}catch(e){}})();`;

export const metadata: Metadata = {
  metadataBase: new URL("https://ywdesign.co"),
  title: {
    default: "YWdesign — Senior web developer & designer, Antwerp",
    template: "%s · YWdesign",
  },
  description:
    "Yolan — a senior developer who architects fast, multilingual websites and stores line by line. Hand-coded, AI-accelerated. Mastered, not enslaved.",
  openGraph: {
    title: "YWdesign — Senior web developer & designer, Antwerp",
    description:
      "Hand-coded, AI-accelerated websites & stores. Next.js · Sanity · GSAP · Stripe.",
    url: "/",
    siteName: "YWdesign",
    locale: "en",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${bricolage.variable} ${jetbrains.variable} ${fraunces.variable} ${newsreader.variable}`}
    >
      <body data-surface="glass">
        <script dangerouslySetInnerHTML={{ __html: appearanceInit }} />
        <ThemeProvider>
          <AppearanceProvider>
            <BackgroundFX />
            <GsapProvider>{children}</GsapProvider>
          </AppearanceProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
