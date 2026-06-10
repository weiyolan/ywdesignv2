import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getHome } from "@/content/home";
import { getSite } from "@/content/site";
import { isLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { Hero } from "@/components/home/Hero";
import { Capabilities } from "@/components/home/Capabilities";
import { StackDeepDive } from "@/components/home/StackDeepDive";
import { SelectedWork } from "@/components/home/SelectedWork";
import { AiManifesto } from "@/components/home/AiManifesto";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { Contact } from "@/components/home/Contact";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const seo = getSite(lang).seo;
  return pageMetadata({
    locale: lang,
    path: "/",
    title: seo.home.title,
    titleAbsolute: true,
    description: seo.home.description,
    ogTitle: seo.home.ogTitle,
    ogDescription: seo.home.ogDescription,
  });
}

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const home = getHome(lang);
  const site = getSite(lang);
  return (
    <main>
      <Hero hero={home.hero} growth={home.growth} marquee={site.marquee} />
      <Capabilities capabilities={home.capabilities} />
      <StackDeepDive
        stack={home.stack}
        terminal={site.terminal}
        terminalTitle={site.terminalTitle}
      />
      <SelectedWork work={home.work} />
      <AiManifesto ai={home.ai} />
      <ProcessTimeline process={home.process} />
      <Contact contact={home.contact} site={site.contact} />
    </main>
  );
}
