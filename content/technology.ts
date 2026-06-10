// All technology-page copy — English only for now, typed for easy EN/FR/NL
// later (mirrors content/home.ts). Source of truth: Claude Design/technology.html.
// Decorative visuals live in their components (components/technology/*); only
// translatable copy + the small data tables the demos render live here.
import type { Seg } from "@/content/home";
import type { Locale } from "@/lib/i18n";

const nbsp = " ";

/** A "no-WordPress" contrast column. */
export type ContrastCol = {
  tone: "bad" | "good";
  ct: string; // small caps label
  h: string;
  items: string[];
};

/** A render-strategy tab (Next.js panel). */
export type RenderStrat = {
  k: "ssg" | "isr" | "ssr";
  label: string;
  body: Seg[]; // rendered into .rb-strat (leading bold accent run)
  wave: number[]; // bar heights, %
};

/** A Sanity Studio document row. */
export type StudioDoc = {
  t: string;
  s: string;
  on?: boolean;
  badge?: string; // e.g. "EN · NL"
};

/** A Sanity doc-type (sidebar entry + the list it shows). */
export type StudioType = {
  doc: "product" | "post" | "page" | "settings";
  ico: string;
  label: string; // sidebar label, e.g. "Products"
  on?: boolean;
  listLabel: string; // list header, e.g. "Products · 24"
  docs: StudioDoc[];
};

/** Which interactive demo a deep section renders. */
export type TechDemo = "next" | "sanity" | "gsap" | "react" | "ts" | "tw";

/** A deep section (Next / Sanity / GSAP / React / TS / Tailwind). */
export type TechSection = {
  demo: TechDemo;
  rev?: boolean; // reversed (image-first) row
  mark: string; // badge letter mark
  role: string; // small caps role line
  since: string; // provenance line
  h: Seg[]; // h2 with an accent run
  desc: Seg[]; // paragraph (bold runs allowed)
  points?: string[]; // optional .td-points feature list
};

/** A supporting-cast recap chip. */
export type RecapItem = { m: string; nm: string; rl: string };

export const technology = {
  hero: {
    kicker: { pre: "//", mid: "The technology · in depth ·", year: "2026" },
    // "No WordPress.<br>Just personalized code." (accent run scrambles)
    h1: [
      { t: "No WordPress." },
      { t: "Just " },
      { t: "personalized" + nbsp + "code.", scramble: true, accent: true },
    ] as Seg[],
    lede: [
      { t: "No page builders, no plugin sprawl, no theme to fight. Every site is a hand-built application on a modern stack I know deep enough to bend. Here's " },
      { t: "exactly", b: true },
      { t: " what runs under the hood — and why each piece earns its place." },
    ] as Seg[],
    contrast: [
      {
        tone: "bad",
        ct: "The template route",
        h: "WordPress & page builders",
        items: [
          "Plugin stacks you don't control or understand",
          "Bloated markup, slow Core Web Vitals",
          "Security surface that needs constant patching",
          "Design boxed in by someone else's theme",
        ],
      },
      {
        tone: "good",
        ct: "The way I build",
        h: "Personalized code",
        items: [
          "Every line written, read and owned by me",
          "Lighthouse-tuned, fast by construction",
          "Locked-down by design — no plugin lottery",
          "Pixel-exact design with zero compromise",
        ],
      },
    ] as ContrastCol[],
  },

  // The six deep sections, in render order.
  sections: [
    {
      demo: "next",
      mark: "N",
      role: "framework · the foundation",
      since: "Vercel · 2016 · every site runs on it",
      h: [{ t: "Next.js — " }, { t: "SSR & SEO", accent: true }, { t: ", built in." }],
      desc: [
        { t: "Every site is a Next.js app. Pages render " },
        { t: "on the server", b: true },
        { t: " so the browser — and Google's crawler — receive complete HTML instantly, then only the interactive parts hydrate. I pick the render strategy per route: static where it can be, dynamic where it must be." },
      ],
      points: [
        "App Router & Server Components",
        "SSG · ISR · SSR per route",
        "next/image optimisation",
        "Native i18n routing",
        "Metadata & structured data",
        "Edge-deployed on Vercel",
      ],
    },
    {
      demo: "sanity",
      mark: "S",
      role: "headless cms · content",
      since: "Sanity.io · the client edits it themselves",
      h: [{ t: "Sanity — a " }, { t: "dashboard", accent: true }, { t: " built around the client." }],
      desc: [
        { t: "Content lives in a Sanity Studio I tailor per client — decoupled from the front-end entirely. Editors update products, posts and imagery in a real-time interface; I query exactly the shape each page needs with GROQ. " },
        { t: "No developer in the loop for day-to-day edits.", b: true },
      ],
    },
    {
      demo: "gsap",
      mark: "G",
      role: "animation · the motion layer",
      since: "GreenSock (GSAP) · industry-standard",
      h: [{ t: "GSAP — motion on a " }, { t: "timeline", accent: true }, { t: "." }],
      desc: [
        { t: "Every reveal, scroll chapter and hover flourish runs on GSAP. " },
        { t: "ScrollTrigger", b: true },
        { t: " ties animation to scroll position and pins sticky sections; " },
        { t: "Draggable", b: true },
        { t: " and " },
        { t: "MorphSVG", b: true },
        { t: " make vector shapes grabbable and shape-shifting. It's the difference between a site that loads and one that " },
        { t: "moves", b: true },
        { t: " — performance-budgeted, never gratuitous." },
      ],
      points: [
        "ScrollTrigger scenes",
        "Sequenced timelines",
        "Draggable interactions",
        "MorphSVG shape tweens",
        "GPU-only transforms",
        "Reduced-motion aware",
      ],
    },
    {
      demo: "react",
      rev: true,
      mark: "R",
      role: "ui library · components",
      since: "Created at Facebook (Meta) · 2013",
      h: [{ t: "React — the " }, { t: "component", accent: true }, { t: " model." }],
      desc: [
        { t: "Born at Facebook in 2013, React is how the entire UI is built: small, composable pieces of state-driven interface. Write a component once, reuse it everywhere, and the view always reflects the data. " },
        { t: "It's the layer everything else plugs into.", b: true },
      ],
      points: [
        "Composable components",
        "Declarative, state-driven UI",
        "Hooks for logic reuse",
        "Huge, battle-tested ecosystem",
      ],
    },
    {
      demo: "ts",
      mark: "TS",
      role: "language · type safety",
      since: "Microsoft · 2012 · JavaScript that scales",
      h: [{ t: "TypeScript — " }, { t: "errors caught", accent: true }, { t: " before they ship." }],
      desc: [
        { t: "Every line is typed. The compiler knows the shape of your data, your props and your API responses — so whole classes of bugs are caught in the editor, not in production. " },
        { t: "It's documentation that can't go stale and a safety net that never sleeps.", b: true },
      ],
      points: [
        "Static type checking",
        "Editor autocomplete & intellisense",
        "Self-documenting contracts",
        "Safe, confident refactors",
      ],
    },
    {
      demo: "tw",
      rev: true,
      mark: "T",
      role: "styling · design tokens",
      since: "Tailwind CSS · utility-first",
      h: [{ t: "Tailwind — " }, { t: "design tokens", accent: true }, { t: ", not stylesheets." }],
      desc: [
        { t: "Styling happens in the markup with utility classes mapped to a single design system — spacing, color, type all pulled from shared tokens. " },
        { t: "The result is consistent by default, tiny in production", b: true },
        { t: ", and impossible to drift because there are no orphaned CSS files to rot." },
      ],
      points: [
        "Token-driven utilities",
        "Zero unused CSS shipped",
        "Consistent spacing & scale",
        "Responsive in one place",
      ],
    },
  ] as TechSection[],

  // --- Next.js panel: render-strategy tabs (technology.html :398-402) ---
  render: {
    file: "render-strategy.ts",
    strats: [
      {
        k: "ssg",
        label: "SSG",
        body: [
          { t: "Static (SSG)", b: true, accent: true },
          { t: " — rendered once at build time. Served as flat HTML from the edge: the fastest a page can be. Used for marketing & content pages." },
        ],
        wave: [20, 30, 28, 40, 55, 70, 85, 100],
      },
      {
        k: "isr",
        label: "ISR",
        body: [
          { t: "Incremental (ISR)", b: true, accent: true },
          { t: " — static speed, but re-generated in the background on a timer. Fresh content without a full rebuild. Used for catalogs & blogs." },
        ],
        wave: [24, 34, 30, 46, 50, 62, 74, 92],
      },
      {
        k: "ssr",
        label: "SSR",
        body: [
          { t: "Server (SSR)", b: true, accent: true },
          { t: " — rendered per request on the server. Always current, personalised, still crawlable. Used for carts, dashboards & search." },
        ],
        wave: [40, 52, 48, 60, 66, 72, 80, 88],
      },
    ] as RenderStrat[],
    seoFlags: ["LCP 1.1s", "CLS 0.00", "fully indexable", "OG tags"],
  },

  // --- Sanity Studio: sidebar doc-types + the list each one shows (:419-437) ---
  studio: {
    brandLead: "Nu",
    brandTail: "Studio",
    lake: "· content lake",
    pub: "Published",
    contentLabel: "Content",
    types: [
      {
        doc: "product",
        ico: "◆",
        label: "Products",
        on: true,
        listLabel: "Products · 24",
        docs: [
          { t: "Renew Serum", s: "€48 · in stock", on: true, badge: "EN · NL" },
          { t: "Calm Cleanser", s: "€32 · in stock" },
          { t: "Daily SPF 30", s: "€29 · low stock" },
          { t: "Night Balm", s: "€54 · in stock" },
        ],
      },
      {
        doc: "post",
        ico: "¶",
        label: "Journal",
        listLabel: "Journal · 12",
        docs: [
          { t: "The vitamin-C edit", s: "Published · 4 min", on: true, badge: "EN · NL" },
          { t: "Why fragrance-free", s: "Published · 3 min" },
          { t: "Made in Belgium", s: "Draft" },
        ],
      },
      {
        doc: "page",
        ico: "▤",
        label: "Pages",
        listLabel: "Pages · 6",
        docs: [
          { t: "Home", s: "/ · published", on: true },
          { t: "About", s: "/about · published" },
          { t: "Contact", s: "/contact · published" },
        ],
      },
      {
        doc: "settings",
        ico: "⚙",
        label: "Settings",
        listLabel: "Settings",
        docs: [
          { t: "Site & SEO", s: "global metadata", on: true },
          { t: "Navigation", s: "menus" },
          { t: "Shipping", s: "zones · rates" },
        ],
      },
    ] as StudioType[],
  },

  // --- Full-stack recap chips (technology.html :363-370) ---
  recap: {
    eyebrow: "The supporting cast",
    title: "The rest of the toolbox.",
    intro:
      "Everything else that ships on a typical build — chosen for the same reason: I know it well enough to own it.",
    items: [
      { m: "No", nm: "Node.js", rl: "Runtime · APIs" },
      { m: "St", nm: "Stripe", rl: "Payments · Twint" },
      { m: "M", nm: "MongoDB", rl: "NoSQL · data" },
      { m: "Rx", nm: "Redux", rl: "State · cart" },
      { m: "GQ", nm: "GraphQL", rl: "Typed queries" },
      { m: "Ln", nm: "Lenis", rl: "Smooth scroll" },
      { m: "V", nm: "Vercel", rl: "Hosting · edge" },
      { m: "i18", nm: "i18n", rl: "EN · FR · NL" },
    ] as RecapItem[],
  },

  // --- Closing CTA (technology.html :376-384) ---
  cta: {
    title: [
      [{ t: "Want this stack" }],
      [{ t: "behind " }, { t: "your", em: true }, { t: " site?" }],
    ] as Seg[][],
    p: "From blank file to shipped product — on the exact tools above. Tell me what you have in mind.",
    ctas: [
      { label: "Start a project", href: "mailto:contact@ywdesign.co?subject=Project", variant: "primary" as const, arrow: "→" },
      { label: "See it shipped", href: "/work", variant: "ghost" as const },
    ],
  },
};

export type Technology = typeof technology;
const technologyByLocale: Record<Locale, Technology> = {
  fr: technology,
  en: technology,
  nl: technology,
};
// FR/NL reuse the EN dictionary until translations are written.
export function getTechnology(lang: Locale): Technology {
  return technologyByLocale[lang];
}
