import type { Metadata } from "next";
import { SelectedWork } from "@/components/home/SelectedWork";
import { getSite } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import type { Locale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const lang = (await params).lang as Locale;
  const seo = getSite(lang).seo.work;
  return pageMetadata({
    lang,
    path: "/work",
    title: seo.title,
    description: seo.description,
  });
}

export default function WorkPage() {
  return (
    <main className="page-pad">
      <SelectedWork titleAs="h1" />
    </main>
  );
}
