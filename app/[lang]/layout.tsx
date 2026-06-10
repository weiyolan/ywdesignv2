import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Bricolage_Grotesque,
  JetBrains_Mono,
  Fraunces,
  Newsreader,
} from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { AppearanceProvider } from "@/components/providers/AppearanceProvider";
import { ACCENT_LC, TYPE_KEY, ACCENT_KEY } from "@/lib/appearance";
import { GsapProvider } from "@/components/providers/GsapProvider";
import { LocaleProvider } from "@/components/providers/LocaleProvider";
import { BackgroundFX } from "@/components/layout/BackgroundFX";
import { locales, defaultLocale, isLocale, type Locale } from "@/lib/i18n";

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

const OG_LOCALE: Record<Locale, string> = {
  fr: "fr_FR",
  en: "en_US",
  nl: "nl_NL",
};

// Runs before first paint (mirrors next-themes' own data-theme script) so a returning
// visitor's editor theme + custom accent are applied with no flash of the defaults.
const appearanceInit = `(function(){try{var d=document.documentElement;if(localStorage.getItem('${TYPE_KEY}')==='editor')d.setAttribute('data-type','editor');var h=localStorage.getItem('${ACCENT_KEY}');if(h)d.style.setProperty('--accent','oklch(${ACCENT_LC} '+h+')');}catch(e){}})();`;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

// Only the three known locales are served; anything else 404s.
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;

  return {
    metadataBase: new URL("https://ywdesign.co"),
    title: {
      default: "YWdesign — Senior web developer & designer, Lyon",
      template: "%s · YWdesign",
    },
    description:
      "Yolan — a senior developer who architects fast, multilingual websites and stores line by line. Hand-coded, AI-accelerated. Mastered, not enslaved.",
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, `/${l}`])),
        "x-default": `/${defaultLocale}`,
      },
    },
    openGraph: {
      title: "YWdesign — Senior web developer & designer, Lyon",
      description:
        "Hand-coded, AI-accelerated websites & stores. Next.js · Sanity · GSAP · Stripe.",
      url: `/${locale}`,
      siteName: "YWdesign",
      locale: OG_LOCALE[locale],
      type: "website",
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <html
      lang={lang}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${bricolage.variable} ${jetbrains.variable} ${fraunces.variable} ${newsreader.variable}`}
    >
      <body data-surface="glass">
        <script dangerouslySetInnerHTML={{ __html: appearanceInit }} />
        <ThemeProvider>
          <BackgroundFX />
          <LocaleProvider lang={lang}>
            <AppearanceProvider>
              <GsapProvider>{children}</GsapProvider>
            </AppearanceProvider>
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
