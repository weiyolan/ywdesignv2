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
import { getSite } from "@/content/site";
import { locales, defaultLocale, isLocale, ogLocale } from "@/lib/i18n";

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
  const seo = getSite(locale).seo.home;

  // No `alternates` here on purpose: each page sets its own self-referencing
  // canonical + hreflang (a layout-level canonical would make every page claim
  // the homepage URL). This block is the localized default title/description +
  // shared social card.
  return {
    metadataBase: new URL("https://ywdesign.co"),
    title: { default: seo.title, template: "%s · YWdesign" },
    description: seo.description,
    openGraph: {
      title: seo.ogTitle,
      description: seo.ogDescription,
      siteName: "YWdesign",
      locale: ogLocale[locale],
      type: "website",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: "YWdesign" }],
    },
    twitter: { card: "summary_large_image", images: ["/og.png"] },
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

  const site = getSite(lang);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://ywdesign.co/#yolan",
        name: "Yolan Weiler",
        jobTitle: "Senior web developer & designer",
        email: "contact@ywdesign.co",
        telephone: "+33765601415",
        url: `https://ywdesign.co/${lang}`,
        image: "https://ywdesign.co/og.png",
        knowsLanguage: ["fr", "en", "nl"],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Lyon",
          addressCountry: "FR",
        },
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://ywdesign.co/#ywdesign",
        name: "YWdesign",
        url: `https://ywdesign.co/${lang}`,
        image: "https://ywdesign.co/og.png",
        description: site.seo.home.description,
        email: "contact@ywdesign.co",
        telephone: "+33765601415",
        vatID: "FR65984069609",
        founder: { "@id": "https://ywdesign.co/#yolan" },
        areaServed: "Worldwide",
        address: {
          "@type": "PostalAddress",
          streetAddress: "504 Chemin de la Rivière",
          addressLocality: "Pollionnay",
          postalCode: "69290",
          addressCountry: "FR",
        },
      },
    ],
  };

  return (
    <html
      lang={lang}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${bricolage.variable} ${jetbrains.variable} ${fraunces.variable} ${newsreader.variable}`}
    >
      <body data-surface="glass">
        <script dangerouslySetInnerHTML={{ __html: appearanceInit }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
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
