import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { GsapProvider } from "@/components/providers/GsapProvider";
import { LangProvider } from "@/components/providers/LangProvider";
import { BackgroundFX } from "@/components/layout/BackgroundFX";
import { getSite } from "@/content/site";
import { htmlLang, isLocale, locales, ogLocale } from "@/lib/i18n";

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

// Build all three locales statically; 404 anything else.
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const { home } = getSite(lang).seo;

  return {
    metadataBase: new URL("https://ywdesign.co"),
    title: { default: home.title, template: "%s · YWdesign" },
    description: home.description,
    openGraph: {
      title: home.ogTitle,
      description: home.ogDescription,
      siteName: "YWdesign",
      type: "website",
      locale: ogLocale[lang],
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ lang: string }> }>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <html
      lang={htmlLang[lang]}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${bricolage.variable} ${jetbrains.variable}`}
    >
      <body data-surface="glass">
        <LangProvider locale={lang}>
          <ThemeProvider>
            <BackgroundFX />
            <GsapProvider>{children}</GsapProvider>
          </ThemeProvider>
        </LangProvider>
      </body>
    </html>
  );
}
