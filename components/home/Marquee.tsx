import { Fragment } from "react";
import type { Site } from "@/content/site";

// Infinite-scroll tech strip (CSS-only, pauses on hover — styles.css :279-289).
// The row is rendered twice so the -50% keyframe loops seamlessly.
export function Marquee({ marquee }: { marquee: Site["marquee"] }) {
  return (
    <div className="strip">
      <div className="strip-track">
        {[0, 1].map((dup) => (
          <Fragment key={dup}>
            {marquee.map((item, i) => (
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
