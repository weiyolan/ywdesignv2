import { DetailHeader } from "@/components/layout/DetailHeader";
import { DetailFooter } from "@/components/layout/DetailFooter";
import type { Locale } from "@/lib/i18n";

// Chrome for the project case studies. The root layout already provides
// ThemeProvider / BackgroundFX / GsapProvider, so we only add the slim detail
// header + footer here. Per-project fonts (Nu's Corben/Mulish) are applied on
// the [slug] page wrapper, not here.
// DetailHeader reads the locale from context; DetailFooter takes it as a prop.
export default async function DetailLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const lang = (await params).lang as Locale;
  return (
    <>
      <DetailHeader />
      {children}
      <DetailFooter lang={lang} />
    </>
  );
}
