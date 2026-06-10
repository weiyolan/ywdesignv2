import "./about.css";

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAbout } from "@/content/about";
import { getSite } from "@/content/site";
import { isLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutMe } from "@/components/about/AboutMe";
import { Mission } from "@/components/about/Mission";
import { Values } from "@/components/about/Values";
import { Stats } from "@/components/about/Stats";
import { ContactBlock } from "@/components/shared/ContactBlock";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const seo = getSite(lang).seo.about;
  return pageMetadata({ locale: lang, path: "/about", title: seo.title, description: seo.description });
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const about = getAbout(lang);
  const site = getSite(lang);
  return (
    <main>
      <AboutHero hero={about.hero} />
      <AboutMe aboutMe={about.aboutMe} />
      <Mission mission={about.mission} />
      <Values vision={about.vision} />
      <Stats numbers={about.numbers} />
      <ContactBlock data={about.contact} contact={site.contact} />
    </main>
  );
}
