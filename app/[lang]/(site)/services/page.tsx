import "./services.css";

import Link from "next/link";
import type { Metadata } from "next";
import { getServices } from "@/content/services";
import { getHome } from "@/content/home";
import { getSite } from "@/content/site";
import { localizedHref, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { SITE_URL } from "@/lib/seo";
import { Reveal } from "@/components/primitives/Reveal";
import { ContactBlock } from "@/components/shared/ContactBlock";
import { JsonLd } from "@/components/shared/JsonLd";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const lang = (await params).lang as Locale;
  const { seo } = getServices(lang).hub;
  return pageMetadata({ lang, path: "/services", title: seo.title, description: seo.description });
}

// Services hub: one card per service page.
export default async function ServicesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = (await params).lang as Locale;
  const { hub, items } = getServices(lang);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { name: "YWdesign", path: "/" },
      { name: hub.eyebrow, path: "/services" },
    ].map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: SITE_URL + localizedHref(c.path, lang) })),
  };
  return (
    <main>
      <JsonLd data={jsonLd} />
      <header className="svc-hero">
        <div className="wrap">
          <div className="sec-head">
            <Reveal as="span" className="eyebrow">
              <span className="tk">{"//"}</span> {hub.eyebrow} · {getSite(lang).contact.location}
            </Reveal>
            <Reveal as="h1" delay={1}>
              {hub.title}
            </Reveal>
            <Reveal as="p" delay={2}>
              {hub.intro}
            </Reveal>
          </div>
          <div className="svc-cards">
            {items.map((s, i) => (
              <Reveal as="div" key={s.slug} delay={i + 1}>
                <Link className="card svc-card" href={localizedHref(`/services/${s.slug}`, lang)}>
                  <span className="n">0{i + 1}</span>
                  <h2>{s.name}</h2>
                  <p>{s.card}</p>
                  <span className="more">
                    {hub.more} <span className="arr">→</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </header>
      <ContactBlock data={getHome(lang).contact} />
    </main>
  );
}
