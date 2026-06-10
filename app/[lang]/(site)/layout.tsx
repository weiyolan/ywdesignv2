import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import type { Locale } from "@/lib/i18n";

// Chrome for the main marketing pages (home, technology, about, work index).
// Case studies live in (detail) with their own header/footer instead.
// SiteHeader is a client component and reads the locale from context (useLocale);
// SiteFooter is server-rendered, so it receives `lang` as a prop.
export default async function SiteLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const lang = (await params).lang as Locale;
  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter lang={lang} />
    </>
  );
}
