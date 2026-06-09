import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
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

const OG_LOCALE: Record<Locale, string> = {
  fr: "fr_FR",
  en: "en_US",
  nl: "nl_NL",
};

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
      className={`${bricolage.variable} ${jetbrains.variable}`}
    >
      <body data-surface="glass">
        <ThemeProvider>
          <BackgroundFX />
          <LocaleProvider lang={lang}>
            <GsapProvider>{children}</GsapProvider>
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
