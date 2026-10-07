// Site fonts (next/font) — shared by the root layout and app/global-not-found.tsx,
// which renders its own <html> outside the [lang] layout.
import { Bricolage_Grotesque, JetBrains_Mono, Fraunces, Newsreader } from "next/font/google";

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

export const fontVars = `${bricolage.variable} ${jetbrains.variable} ${fraunces.variable} ${newsreader.variable}`;
