import "../services.css";

import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getService, getServices, serviceSlugs } from "@/content/services";
import { getHome } from "@/content/home";
import { getSite } from "@/content/site";
import { localizedHref, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { AREA_SERVED, SITE_URL } from "@/lib/seo";
import { Reveal } from "@/components/primitives/Reveal";
import { Segments } from "@/components/primitives/Segments";
import { Button } from "@/components/primitives/Button";
import { ContactBlock } from "@/components/shared/ContactBlock";
import { JsonLd } from "@/components/shared/JsonLd";

export function generateStaticParams() {
  return serviceSlugs.map((service) => ({ service }));
}
export const dynamicParams = false;

type Params = Promise<{ lang: string; service: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang, service } = await params;
  const s = getService(lang as Locale, service);
  if (!s) return {};
  return pageMetadata({ lang: lang as Locale, path: `/services/${s.slug}`, title: s.seo.title, description: s.seo.description });
}

// Service landing page: hero → benefits → deliverables → process → proof → FAQ → contact.
export default async function ServicePage({ params }: { params: Params }) {
  const { lang: l, service } = await params;
  const lang = l as Locale;
  const s = getService(lang, service);
  if (!s) notFound();
  const { hub, labels } = getServices(lang);
  const home = getHome(lang);
  const cases = s.cases.map((slug) => home.work.items.find((w) => w.slug === slug)).filter((w) => w !== undefined);
  const url = SITE_URL + localizedHref(`/services/${s.slug}`, lang);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: s.name,
        serviceType: s.name,
        description: s.seo.description,
        url,
        inLanguage: lang,
        provider: { "@id": `${SITE_URL}/#ywdesign` },
        areaServed: AREA_SERVED,
      },
      {
        "@type": "FAQPage",
        mainEntity: s.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { name: "YWdesign", path: "/" },
          { name: hub.eyebrow, path: "/services" },
          { name: s.name, path: `/services/${s.slug}` },
        ].map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: SITE_URL + localizedHref(c.path, lang) })),
      },
    ],
  };

  return (
    <main>
      <JsonLd data={jsonLd} />

      <header className="svc-hero">
        <div className="wrap">
          <nav className="svc-crumbs" aria-label="Breadcrumb">
            <Link href={localizedHref("/services", lang)}>{hub.eyebrow}</Link> <span aria-hidden="true">/</span> {s.name}
          </nav>
          <Reveal as="span" className="eyebrow">
            <span className="tk">{"//"}</span> {s.hero.eyebrow}
          </Reveal>
          <Reveal as="h1" className="display svc-h1" delay={1}>
            {s.hero.h1.map((line, li) => (
              <Fragment key={li}>
                {li > 0 && <> <br /></>}
                <Segments segs={line} />
              </Fragment>
            ))}
          </Reveal>
          <Reveal as="p" className="svc-sub" delay={2}>
            {s.hero.sub}
          </Reveal>
          <Reveal as="div" className="hero-cta" delay={3}>
            <Button href="#contact">
              {getSite(lang).cta.label} <span className="arr">→</span>
            </Button>
            <Button href="#cases" variant="ghost">
              {labels.cases}
            </Button>
          </Reveal>
        </div>
      </header>

      <section className="svc-sec">
        <div className="wrap">
          <Reveal as="h2" className="eyebrow svc-label">
            <span className="tk">01</span> {labels.points}
          </Reveal>
          <div className="svc-points">
            {s.points.map((p, i) => (
              <Reveal as="div" key={p.h} className="card svc-point" delay={i + 1}>
                <h3>{p.h}</h3>
                <p>{p.p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="svc-sec">
        <div className="wrap svc-two">
          <div>
            <Reveal as="h2" className="eyebrow svc-label">
              <span className="tk">02</span> {labels.included}
            </Reveal>
            <ul className="svc-included">
              {s.included.map((x) => (
                <Reveal as="li" key={x}>
                  {x}
                </Reveal>
              ))}
            </ul>
          </div>
          <div>
            <Reveal as="h2" className="eyebrow svc-label">
              <span className="tk">03</span> {labels.process}
            </Reveal>
            <ol className="svc-process">
              {home.process.stages.map((st) => (
                <Reveal as="li" key={st.n}>
                  <span className="n">{st.n}</span>
                  <div>
                    <b>{st.h}</b>
                    <p>{st.p}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="svc-sec" id="cases">
        <div className="wrap">
          <Reveal as="h2" className="eyebrow svc-label">
            <span className="tk">04</span> {labels.cases}
          </Reveal>
          <div className="svc-cases">
            {cases.map((w, i) => (
              <Reveal as="div" key={w.slug} delay={i + 1}>
                <Link className="card svc-case" href={localizedHref(`/work/${w.slug}`, lang)}>
                  <span className="thumb">
                    <Image src={w.img} alt="" fill sizes="(max-width: 720px) 100vw, 33vw" />
                  </span>
                  <span className="txt">
                    <b>{w.title}</b>
                    <small>{w.cat}</small>
                    <span className="more">
                      {labels.caseStudy} <span className="arr">→</span>
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="svc-sec">
        <div className="wrap">
          <Reveal as="h2" className="eyebrow svc-label">
            <span className="tk">05</span> {labels.faq}
          </Reveal>
          <div className="svc-faq">
            {s.faq.map((f) => (
              <details key={f.q}>
                <summary>
                  <h3>{f.q}</h3>
                </summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <ContactBlock data={home.contact} />
    </main>
  );
}
