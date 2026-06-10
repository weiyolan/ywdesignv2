import { notFound } from "next/navigation";
import { DetailHeader } from "@/components/layout/DetailHeader";
import { DetailFooter } from "@/components/layout/DetailFooter";
import { getSite } from "@/content/site";
import { isLocale } from "@/lib/i18n";

// Chrome for the project case studies. The root layout already provides
// ThemeProvider / BackgroundFX / GsapProvider, so we only add the slim detail
// header + footer here. Per-project fonts (Nu's Corben/Mulish) are applied on
// the [slug] page wrapper, not here.
export default async function DetailLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ lang: string }> }>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const site = getSite(lang);

  return (
    <>
      <DetailHeader site={site} />
      {children}
      <DetailFooter site={site} />
    </>
  );
}
