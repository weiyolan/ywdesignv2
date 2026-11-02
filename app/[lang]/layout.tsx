import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { AppearanceProvider } from "@/components/providers/AppearanceProvider";
import { appearanceInit } from "@/lib/appearance";
import { fontVars } from "@/lib/fonts";
import { GsapProvider } from "@/components/providers/GsapProvider";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { LocaleProvider } from "@/components/providers/LocaleProvider";
import { BackgroundFX } from "@/components/layout/BackgroundFX";
import { getSite } from "@/content/site";
import { locales, defaultLocale, isLocale, ogLocale, localizedHref } from "@/lib/i18n";
import { ogCard } from "@/lib/metadata";
import { AREA_SERVED, SAME_AS } from "@/lib/seo";
import { getServices } from "@/content/services";

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
      images: [ogCard(locale, seo.ogTitle)],
    },
    twitter: { card: "summary_large_image", images: [`/og-${locale}.jpg`] },
    // Search Console / Bing Webmaster ownership tags — only emitted when the
    // tokens are set in the Netlify env (DNS verification needs neither).
    verification: {
      ...(process.env.GOOGLE_SITE_VERIFICATION && { google: process.env.GOOGLE_SITE_VERIFICATION }),
      ...(process.env.BING_SITE_VERIFICATION && {
        other: { "msvalidate.01": process.env.BING_SITE_VERIFICATION },
      }),
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
        image: `https://ywdesign.co/og-${lang}.jpg`,
        knowsLanguage: ["fr", "en", "nl"],
        sameAs: SAME_AS,
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
        image: `https://ywdesign.co/og-${lang}.jpg`,
        description: site.seo.home.description,
        email: "contact@ywdesign.co",
        telephone: "+33765601415",
        vatID: "FR65984069609",
        founder: { "@id": "https://ywdesign.co/#yolan" },
        logo: "https://ywdesign.co/icon-512.png",
        sameAs: SAME_AS,
        priceRange: "€€",
        areaServed: AREA_SERVED,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: getServices(lang).hub.eyebrow,
          itemListElement: getServices(lang).items.map((s) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: s.name,
              url: `https://ywdesign.co${localizedHref(`/services/${s.slug}`, lang)}`,
            },
          })),
        },
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
      suppressHydrationWarning
      className={fontVars}
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
              <LenisProvider>
                <GsapProvider>{children}</GsapProvider>
              </LenisProvider>
            </AppearanceProvider>
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
