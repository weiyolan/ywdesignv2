// Global site chrome copy (nav, marquee, terminal, contact, footer) + per-page
// SEO. English source of truth; fr.ts / nl.ts mirror this shape (declared
// `satisfies Site`) and are loaded per-locale via getSite(locale) from ./index.
// Internal hrefs are stored locale-agnostic ("/work", "/#contact") and prefixed
// at render by localizedHref.

export type NavLink = { label: string; href: string; external?: boolean };
export type TerminalLine = {
  cls: "prompt" | "ok" | "key" | "dim";
  text: string;
  type?: boolean;
};

export const site = {
  brand: { lead: "YW", tail: "design" },
  status: "available",

  // Per-page SEO. `home` feeds the root layout default + the home route; the
  // rest feed their routes' generateMetadata. Titles (except home) get the
  // "%s · YWdesign" template appended automatically.
  seo: {
    home: {
      title: "YWdesign — Senior web developer & designer, Lyon",
      description:
        "Yolan — a senior developer who architects fast, multilingual websites and stores line by line. Hand-coded, AI-accelerated. Mastered, not enslaved.",
      ogTitle: "YWdesign — Senior web developer & designer, Lyon",
      ogDescription:
        "Hand-coded, AI-accelerated websites & stores. Next.js · Sanity · GSAP · Stripe.",
    },
    work: {
      title: "Work",
      description:
        "Shipped, in production — selected client work: multilingual, fast, conversion-focused websites and stores across Belgium and beyond.",
    },
    technology: {
      title: "The technology — deep dive",
      description:
        "No WordPress, no page builders — every site is hand-built on a modern stack: Next.js, Sanity, GSAP, React, TypeScript and Tailwind. Here's exactly what runs under the hood, and why each piece earns its place.",
    },
    about: {
      title: "About",
      description:
        "Yolan — a biomedical engineer, developer and surfer building fast, considered websites for a global positive impact.",
    },
  },

  nav: [
    { label: "Home", href: "/" },
    { label: "Work", href: "/work" },
    { label: "Technology", href: "/technology" },
    { label: "About", href: "/about" },
  ] as NavLink[],

  cta: { label: "Start a project", href: "/#contact" },

  // Cross-cutting micro-copy for the case-study template (hero actions + pager).
  ui: {
    prev: "Previous",
    next: "Next",
    visitLive: "Visit live site",
    jumpToBuild: "Jump to the build",
    language: "Language",
    meta: { role: "Role", year: "Year", sector: "Sector", stack: "Stack" },
  },

  // tech marquee — app.js :44-45
  marquee: [
    "Next.js", "React", "TypeScript", "Tailwind", "Sanity CMS", "Node.js",
    "Stripe", "Framer Motion", "GraphQL", "Vercel", "Headless", "i18n",
    "SEO", "Web Performance", "AI-assisted",
  ],

  // terminal — app.js :101-109
  terminal: [
    { cls: "prompt", text: "$ yw new site --from-scratch", type: true },
    { cls: "ok", text: "✓ architecture     hand-rolled" },
    { cls: "ok", text: "✓ design-system    tokens · type · motion" },
    { cls: "ok", text: "✓ i18n             en · fr · nl" },
    { cls: "key", text: "✓ ai               pair-programmer, not pilot" },
    { cls: "prompt", text: "$ yw ship", type: true },
    { cls: "dim", text: "deploying… done in 0.9s ⚡" },
  ] as TerminalLine[],

  terminalTitle: "yolan@ywdesign — zsh",

  contact: {
    email: "contact@ywdesign.co",
    phone: "+33 7 65 60 14 15",
    phoneHref: "tel:+33765601415",
    whatsapp: "https://wa.me/32471124525",
    location: "Lyon, FR",
  },

  footer: {
    tagline:
      "Senior web development & design. Hand-coded, AI-accelerated, end to end.",
    columns: [
      {
        title: "Site",
        links: [
          { label: "Capabilities", href: "/#capabilities" },
          { label: "Stack", href: "/#stack" },
          { label: "Work", href: "/work" },
          { label: "About", href: "/about" },
          { label: "AI philosophy", href: "/#ai" },
          { label: "Process", href: "/#process" },
        ] as NavLink[],
      },
      {
        title: "Contact",
        links: [
          { label: "Email", href: "mailto:contact@ywdesign.co" },
          { label: "WhatsApp", href: "https://wa.me/32471124525", external: true },
          { label: "Call", href: "tel:+33765601415" },
        ] as NavLink[],
      },
    ],
    legal: [
      "© 2026 YWdesign",
      "VAT FR65984069609",
      "504 Chemin de la Rivière, Pollionnay, France",
    ],
  },
};

export type Site = typeof site;
