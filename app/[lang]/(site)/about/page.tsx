import "./about.css";

import type { Metadata } from "next";
import { getAbout } from "@/content/about";
import type { Locale } from "@/lib/i18n";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutMe } from "@/components/about/AboutMe";
import { Mission } from "@/components/about/Mission";
import { Values } from "@/components/about/Values";
import { Stats } from "@/components/about/Stats";
import { ContactBlock } from "@/components/shared/ContactBlock";

export const metadata: Metadata = {
  title: "About",
  description:
    "Yolan — a biomedical engineer, developer and surfer building fast, considered websites for a global positive impact.",
};

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = (await params).lang as Locale;
  return (
    <main>
      <AboutHero lang={lang} />
      <AboutMe lang={lang} />
      <Mission lang={lang} />
      <Values lang={lang} />
      <Stats lang={lang} />
      <ContactBlock data={getAbout(lang).contact} />
    </main>
  );
}
