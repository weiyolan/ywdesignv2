// Global site chrome copy (nav, marquee, terminal, contact, footer).
// English only for now — kept here as a typed dictionary so EN/FR/NL can be
// lifted later via a getDictionary(lang) loader without touching components.
//
// NOTE: cross-page links (Work / Technology / About) point at on-page anchors
// for now because only the home page is built. Repoint to /work, /technology,
// /about routes when those pages exist.

export type NavLink = { label: string; href: string; external?: boolean };
export type TerminalLine = {
  cls: "prompt" | "ok" | "key" | "dim";
  text: string;
  type?: boolean;
};

export const site = {
  brand: { lead: "YW", tail: "design" },
  status: "available",

  nav: [
    { label: "Home", href: "/" },
    { label: "Work", href: "/work" },
    { label: "Technology", href: "/technology" },
    { label: "About", href: "/about" },
  ] as NavLink[],

  cta: { label: "Start a project", href: "/#contact" },

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
    phone: "+33 6 38 56 53 02",
    phoneHref: "tel:+33638565302",
    whatsapp: "https://wa.me/32471124525",
    location: "Mortsel · Antwerp, BE",
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
          { label: "Call", href: "tel:+33638565302" },
        ] as NavLink[],
      },
    ],
    legal: [
      "© 2026 YWdesign",
      "VAT BE0794.586.584",
      "Hof Savelkoul 40, 2640 Mortsel, Antwerp, Belgium",
    ],
  },
};
