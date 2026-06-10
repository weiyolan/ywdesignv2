import { Hero } from "@/components/home/Hero";
import { Capabilities } from "@/components/home/Capabilities";
import { StackDeepDive } from "@/components/home/StackDeepDive";
import { SelectedWork } from "@/components/home/SelectedWork";
import { AiManifesto } from "@/components/home/AiManifesto";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { Contact } from "@/components/home/Contact";
import type { Locale } from "@/lib/i18n";
import type { Metadata } from "next";
import { getSite } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const lang = (await params).lang as Locale;
  const seo = getSite(lang).seo.home;
  return pageMetadata({
    lang,
    path: "/",
    title: seo.title,
    description: seo.description,
    absoluteTitle: true,
    ogTitle: seo.ogTitle,
    ogDescription: seo.ogDescription,
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = (await params).lang as Locale;
  return (
    <main>
      <Hero lang={lang} />
      <Capabilities lang={lang} />
      <StackDeepDive />
      <SelectedWork />
      <AiManifesto lang={lang} />
      <ProcessTimeline />
      <Contact lang={lang} />
    </main>
  );
}
