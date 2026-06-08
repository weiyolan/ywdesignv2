import "./about.css";

import type { Metadata } from "next";
import { about } from "@/content/about";
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

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <AboutMe />
      <Mission />
      <Values />
      <Stats />
      <ContactBlock data={about.contact} />
    </main>
  );
}
