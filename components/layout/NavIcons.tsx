import type { ReactNode } from "react";

// Original monoline icons for the Services / Technology nav menus (24×24,
// currentColor strokes). Every stroked shape carries pathLength=1 so CSS can
// "draw" it in (stroke-dashoffset 1 → 0) when a menu opens or a card is hovered.
// They hint at each service / tool without reproducing any brand mark.

export type NavIconName =
  | "website"
  | "e-commerce"
  | "redesign"
  | "next"
  | "sanity"
  | "gsap"
  | "react"
  | "ts"
  | "tw";

const P = { pathLength: 1 } as const;

const ICONS: Record<NavIconName, ReactNode> = {
  // browser window + cursor
  website: (
    <>
      <path {...P} d="M20 12V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h7" />
      <path {...P} d="M3 8.5h17" />
      <path {...P} d="m14.5 13.5 6 2.2-2.6 1-1 2.6z" />
      <circle cx="6" cy="6.3" r=".6" className="dot" />
      <circle cx="8.2" cy="6.3" r=".6" className="dot" />
    </>
  ),
  // shopping bag + check
  "e-commerce": (
    <>
      <path {...P} d="M5 8h14l-1.1 11.2A2 2 0 0 1 15.9 21H8.1a2 2 0 0 1-2-1.8z" />
      <path {...P} d="M9 10V6.5a3 3 0 0 1 6 0V10" />
      <path {...P} d="m9.4 14.6 1.9 1.9 3.4-3.6" />
    </>
  ),
  // old layer → new layer, with a refresh arc
  redesign: (
    <>
      <path className="dash" d="M10 13H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v5" strokeDasharray="1.6 1.8" />
      <path {...P} d="M13 10h6a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2z" />
      <path {...P} d="M4 16.5a5 5 0 0 0 4.5 4" />
      <path {...P} d="m6.6 21.6 1.9-1.1-1-1.9" />
    </>
  ),
  // framework: a route arrow through a ring
  next: (
    <>
      <path {...P} d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z" />
      <path {...P} d="M9 16V8l7.5 10" />
      <path {...P} d="M15 8v5.2" />
    </>
  ),
  // structured content blocks
  sanity: (
    <>
      <path {...P} d="M5.5 4h13a1.5 1.5 0 0 1 0 3h-13a1.5 1.5 0 0 1 0-3z" />
      <path {...P} d="M5.5 10.5h8a1.5 1.5 0 0 1 0 3h-8a1.5 1.5 0 0 1 0-3z" />
      <path {...P} d="M5.5 17h13a1.5 1.5 0 0 1 0 3h-13a1.5 1.5 0 0 1 0-3z" />
      <path {...P} d="M17.5 10.5v3" />
    </>
  ),
  // easing curve + its handles
  gsap: (
    <>
      <path {...P} d="M4 19.5C4 10 20 14 20 4.5" />
      <path {...P} d="M4 19.5V11" />
      <path {...P} d="M20 4.5V13" />
      <circle cx="4" cy="11" r="1.4" className="dot" />
      <circle cx="20" cy="13" r="1.4" className="dot" />
    </>
  ),
  // component orbits
  react: (
    <>
      <path {...P} d="M12 8.6c5 0 9 1.5 9 3.4s-4 3.4-9 3.4-9-1.5-9-3.4 4-3.4 9-3.4z" />
      <path {...P} d="M12 8.6c5 0 9 1.5 9 3.4s-4 3.4-9 3.4-9-1.5-9-3.4 4-3.4 9-3.4z" transform="rotate(60 12 12)" />
      <path {...P} d="M12 8.6c5 0 9 1.5 9 3.4s-4 3.4-9 3.4-9-1.5-9-3.4 4-3.4 9-3.4z" transform="rotate(120 12 12)" />
      <circle cx="12" cy="12" r="1.5" className="dot" />
    </>
  ),
  // braces around a type
  ts: (
    <>
      <path {...P} d="M8 4H7a2 2 0 0 0-2 2v3.5L3 12l2 2.5V18a2 2 0 0 0 2 2h1" />
      <path {...P} d="M16 4h1a2 2 0 0 1 2 2v3.5l2 2.5-2 2.5V18a2 2 0 0 1-2 2h-1" />
      <path {...P} d="M9.2 9.5h5.6M12 9.5V15" />
    </>
  ),
  // utility waves
  tw: (
    <>
      <path {...P} d="M3 10.5c2.5-3.5 5-3.5 7.5 0s5 3.5 7.5 0c1-1.4 2-2.2 3-2.4" />
      <path {...P} d="M3 15.9c1-.2 2-1 3-2.4 2.5-3.5 5-3.5 7.5 0s5 3.5 7.5 0" />
    </>
  ),
};

export function NavIcon({ name, size = 24 }: { name: NavIconName; size?: number }) {
  return (
    <svg
      className="nav-ic"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONS[name]}
    </svg>
  );
}
