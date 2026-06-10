import "./detail.css";

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjects, order, type Slug } from "@/content/work";
import type { Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { corben, mulish } from "@/lib/projectFonts";
import { DetailHero } from "@/components/work/DetailHero";
import { DetailMedia } from "@/components/work/DetailMedia";
import { Section } from "@/components/work/Section";
import { Pager } from "@/components/work/Pager";

const SLUGS = new Set<string>(order);
const isSlug = (s: string): s is Slug => SLUGS.has(s);

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
  if (!isSlug(slug)) return {};
  const p = getProjects(lang as Locale)[slug];
  return pageMetadata({
    lang: lang as Locale,
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
  if (!isSlug(slug)) notFound();

  const project = getProjects(lang as Locale)[slug];
  // The first signature section owns the #signature anchor (hero "Jump to the
  // build" target).
  const firstSig = project.sections.findIndex((s) => s.kind === "signature");

  // Nu uses its own Corben/Mulish brand fonts inside the live-shop demo; expose
  // the CSS vars at the page root so the ported .nu-* CSS can reference them.
  const rootClass =
    slug === "nu" ? `${corben.variable} ${mulish.variable}` : undefined;

  return (
    <main className={rootClass}>
      <DetailHero project={project} lang={lang as Locale} />
      <DetailMedia src={project.heroImg} alt={project.heroAlt} />

      {project.sections.map((section, i) => (
        <Section
          key={i}
          section={section}
          anchor={i === firstSig}
          signatureData={project.signatureData}
        />
      ))}

      <Pager slug={slug} lang={lang as Locale} />
    </main>
  );
}
