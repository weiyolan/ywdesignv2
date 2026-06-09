import { Fragment } from "react";
import { getSite } from "@/content/site";
import type { Locale } from "@/lib/i18n";

// Infinite-scroll tech strip (CSS-only, pauses on hover — styles.css :279-289).
// The row is rendered twice so the -50% keyframe loops seamlessly.
export function Marquee({ lang }: { lang: Locale }) {
  const site = getSite(lang);
  return (
    <div className="strip">
      <div className="strip-track">
        {[0, 1].map((dup) => (
          <Fragment key={dup}>
            {site.marquee.map((item, i) => (
              <span className="strip-item" key={dup + "-" + i}>
                {item}
              </span>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
