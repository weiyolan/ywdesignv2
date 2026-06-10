import { Fragment } from "react";
import type { Site } from "@/content/site";
import type { Seg } from "@/content/home";
import { Reveal } from "@/components/primitives/Reveal";
import { Segments } from "@/components/primitives/Segments";
import { Button } from "@/components/primitives/Button";

export type ContactCta = {
  label: string;
  href: string;
  variant: "primary" | "ghost";
  arrow?: string;
  external?: boolean;
};

export type ContactData = {
  eyebrow: string;
  title: Seg[][];
  p: string;
  ctas: ContactCta[];
};

// The centered contact/CTA block shared by the home, about (and any) page.
// Contact lines (email · phone · location) come from the resolved site dict.
export function ContactBlock({
  data,
  contact,
  id = "contact",
}: {
  data: ContactData;
  contact: Site["contact"];
  id?: string;
}) {
  return (
    <section id={id}>
      <div className="wrap contact">
        <Reveal as="span" className="eyebrow">
          <span className="tk">{"//"}</span> {data.eyebrow}
        </Reveal>
        <Reveal as="h2" className="display" delay={1}>
          {data.title.map((line, li) => (
            <Fragment key={li}>
              {li > 0 && <br />}
              <Segments segs={line} />
            </Fragment>
          ))}
        </Reveal>
        <Reveal as="p" delay={2}>
          {data.p}
        </Reveal>
        <Reveal as="div" className="hero-cta" delay={2}>
          {data.ctas.map((cta) => (
            <Button key={cta.label} href={cta.href} variant={cta.variant} external={Boolean(cta.external)}>
              {cta.label}
              {cta.arrow ? (
                <>
                  {" "}
                  <span className="arr">{cta.arrow}</span>
                </>
              ) : null}
            </Button>
          ))}
        </Reveal>
        <Reveal as="div" className="lines" delay={3}>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          {"  ·  "}
          <a href={contact.phoneHref}>{contact.phone}</a>
          {"  ·  "}
          {contact.location}
        </Reveal>
      </div>
    </section>
  );
}
