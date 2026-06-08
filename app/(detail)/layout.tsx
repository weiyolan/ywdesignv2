import { DetailHeader } from "@/components/layout/DetailHeader";
import { DetailFooter } from "@/components/layout/DetailFooter";

// Chrome for the project case studies. The root layout already provides
// ThemeProvider / BackgroundFX / GsapProvider, so we only add the slim detail
// header + footer here. Per-project fonts (Nu's Corben/Mulish) are applied on
// the [slug] page wrapper, not here.
export default function DetailLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <DetailHeader />
      {children}
      <DetailFooter />
    </>
  );
}
