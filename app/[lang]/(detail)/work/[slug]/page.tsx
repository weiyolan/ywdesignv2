import "./detail.css";

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getWork, order, type Slug } from "@/content/work";
import { getSite } from "@/content/site";
import { isLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { corben, mulish } from "@/lib/projectFonts";
import { DetailHero } from "@/components/work/DetailHero";
import { DetailMedia } from "@/components/work/DetailMedia";
import { Section } from "@/components/work/Section";
import { Pager } from "@/components/work/Pager";

const SLUGS = new Set<string>(order);
const isSlug = (s: string): s is Slug => SLUGS.has(s);

// lang comes from the parent [lang] segment; this only enumerates the slugs.
export function generateStaticParams() {
  return order.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang) || !isSlug(slug)) return {};
  const p = getWork(lang)[slug];
  return pageMetadata({
    locale: lang,
    path: `/work/${slug}`,
    title: p.metaTitle,
    description: p.metaDescription,
  });
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isLocale(lang) || !isSlug(slug)) notFound();

  const projects = getWork(lang);
  const project = projects[slug];
  const { ui } = getSite(lang);

  // The first signature section owns the #signature anchor (hero "Jump to the
  // build" target).
  const firstSig = project.sections.findIndex((s) => s.kind === "signature");

  // Nu uses its own Corben/Mulish brand fonts inside the live-shop demo; expose
  // the CSS vars at the page root so the ported .nu-* CSS can reference them.
  const rootClass =
    slug === "nu" ? `${corben.variable} ${mulish.variable}` : undefined;

  return (
    <main className={rootClass}>
      <DetailHero project={project} labels={ui} />
      <DetailMedia src={project.heroImg} alt={project.heroAlt} />

      {project.sections.map((section, i) => (
        <Section
          key={i}
          section={section}
          anchor={i === firstSig}
          signatureData={project.signatureData}
        />
      ))}

      <Pager slug={slug} projects={projects} labels={ui} />
    </main>
  );
}
