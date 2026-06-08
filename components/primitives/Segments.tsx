import { Fragment } from "react";
import type { Seg } from "@/content/home";
import { ScrambleText } from "@/components/home/ScrambleText";

// Renders an inline run of text segments. Flags: scramble (animated), accent
// (.accent colour), b (bold), em (<em>, used by the AI/contact display heads).
export function Segments({ segs, wordClass }: { segs: Seg[]; wordClass?: string }) {
  return (
    <>
      {segs.map((seg, i) => {
        if (seg.scramble) {
          const cls = [wordClass, seg.accent ? "accent" : ""].filter(Boolean).join(" ");
          const sc = <ScrambleText text={seg.t} className={cls || undefined} />;
          return seg.em ? <em key={i}>{sc}</em> : <Fragment key={i}>{sc}</Fragment>;
        }
        if (seg.b) return <b key={i}>{seg.t}</b>;
        if (seg.em) return <em key={i}>{seg.t}</em>;
        if (seg.accent)
          return (
            <span key={i} className="accent">
              {seg.t}
            </span>
          );
        return <Fragment key={i}>{seg.t}</Fragment>;
      })}
    </>
  );
}
