import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { getSite } from "@/content/site";
import { isLocale } from "@/lib/i18n";

// Chrome for the main marketing pages (home, technology, about, work index).
// Case studies live in (detail) with their own header/footer instead.
export default async function SiteLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ lang: string }> }>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const site = getSite(lang);

  return (
    <>
      <SiteHeader site={site} />
      {children}
      <SiteFooter site={site} />
    </>
  );
}
