import { Reveal } from "@/components/primitives/Reveal";
import { Segments } from "@/components/primitives/Segments";
import type { Seg } from "@/content/home";

// Big pull-quote — .quote-lead (milo brief line, bermuda brand line).
export function QuoteLead({
  quote,
  cite,
}: {
  quote: Seg[];
  cite: string;
}) {
  return (
    <section className="detail-section">
      <Reveal as="div" className="wrap quote-lead">
        <span className="qm">&ldquo;</span>
        <blockquote>
          <Segments segs={quote} />
        </blockquote>
        <cite>{cite}</cite>
      </Reveal>
    </section>
  );
}
