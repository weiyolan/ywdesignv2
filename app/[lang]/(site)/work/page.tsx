import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getHome } from "@/content/home";
import { getSite } from "@/content/site";
import { isLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { SelectedWork } from "@/components/home/SelectedWork";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const seo = getSite(lang).seo.work;
  return pageMetadata({ locale: lang, path: "/work", title: seo.title, description: seo.description });
}

export default async function WorkPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const work = getHome(lang).work;
  return (
    <main className="page-pad">
      <SelectedWork work={work} />
    </main>
  );
}
