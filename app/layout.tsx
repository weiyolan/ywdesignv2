import type { Metadata } from "next";
import { Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { GsapProvider } from "@/components/providers/GsapProvider";
import { BackgroundFX } from "@/components/layout/BackgroundFX";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

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
      className={`${bricolage.variable} ${jetbrains.variable}`}
    >
      <body>
        <ThemeProvider>
          <BackgroundFX />
          <GsapProvider>
            <SiteHeader />
            {children}
            <SiteFooter />
          </GsapProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
