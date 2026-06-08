import { Fragment } from "react";
import { home } from "@/content/home";
import { site } from "@/content/site";
import { Reveal } from "@/components/primitives/Reveal";
import { Segments } from "@/components/primitives/Segments";
import { Button } from "@/components/primitives/Button";

// Contact section (index.html :485-499).
export function Contact() {
  const c = home.contact;
  return (
    <section id="contact">
      <div className="wrap contact">
        <Reveal as="span" className="eyebrow">
          <span className="tk">{"//"}</span> {c.eyebrow}
        </Reveal>
        <Reveal as="h2" className="display" delay={1}>
          {c.title.map((line, li) => (
            <Fragment key={li}>
              {li > 0 && <br />}
              <Segments segs={line} />
            </Fragment>
          ))}
        </Reveal>
        <Reveal as="p" delay={2}>
          {c.p}
        </Reveal>
        <Reveal as="div" className="hero-cta" delay={2}>
          {c.ctas.map((cta) => (
            <Button
              key={cta.label}
              href={cta.href}
              variant={cta.variant}
              external={"external" in cta ? Boolean(cta.external) : false}
            >
              {cta.label}
              {"arrow" in cta && cta.arrow ? (
                <>
                  {" "}
                  <span className="arr">{cta.arrow}</span>
                </>
              ) : null}
            </Button>
          ))}
        </Reveal>
        <Reveal as="div" className="lines" delay={3}>
          <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
          {"  ·  "}
          <a href={site.contact.phoneHref}>{site.contact.phone}</a>
          {"  ·  "}
          {site.contact.location}
        </Reveal>
      </div>
    </section>
  );
}
