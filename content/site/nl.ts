// NL site chrome (nav, marquee, terminal, contact, footer) + per-page SEO.
// Mirrors `site` in en.ts 1:1 (satisfies Site); only translatable values differ.
import type { NavLink, TerminalLine, Site } from "./en";

export const siteNL = {
  brand: { lead: "YW", tail: "design" },
  status: "beschikbaar",

  seo: {
    home: {
      title: "YWdesign — Senior webdeveloper & designer, Lyon",
      description:
        "Yolan — een senior developer die snelle, meertalige websites en webshops regel voor regel uitbouwt. Met de hand geschreven, AI-versneld. Beheerst, niet onderworpen.",
      ogTitle: "YWdesign — Senior webdeveloper & designer, Lyon",
      ogDescription:
        "Met de hand geschreven, AI-versnelde websites & webshops. Next.js · Sanity · GSAP · Stripe.",
    },
    work: {
      title: "Werk",
      description:
        "Opgeleverd, in productie — geselecteerd klantenwerk: meertalige, snelle, conversiegerichte websites en webshops in België en daarbuiten.",
    },
    technology: {
      title: "De technologie — diepgaand",
      description:
        "Geen WordPress, geen page builders — elke site wordt met de hand gebouwd op een moderne stack: Next.js, Sanity, GSAP, React, TypeScript en Tailwind. Hier zie je precies wat er onder de motorkap draait, en waarom elk onderdeel zijn plaats verdient.",
    },
    about: {
      title: "Over",
      description:
        "Yolan — biomedisch ingenieur, developer en surfer die snelle, doordachte websites bouwt voor een wereldwijde positieve impact.",
    },
  },

  nav: [
    { label: "Home", href: "/" },
    { label: "Werk", href: "/work" },
    { label: "Technologie", href: "/technology" },
    { label: "Over", href: "/about" },
  ] as NavLink[],

  cta: { label: "Start een project", href: "/#contact" },

  ui: {
    prev: "Vorige",
    next: "Volgende",
    visitLive: "Bekijk de live site",
    jumpToBuild: "Spring naar de build",
    meta: { role: "Rol", year: "Jaar", sector: "Sector", stack: "Stack" },
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
      "Senior webdevelopment & design. Met de hand geschreven, AI-versneld, van begin tot eind.",
    columns: [
      {
        title: "Site",
        links: [
          { label: "Mogelijkheden", href: "/#capabilities" },
          { label: "Stack", href: "/#stack" },
          { label: "Werk", href: "/work" },
          { label: "Over", href: "/about" },
          { label: "AI-filosofie", href: "/#ai" },
          { label: "Proces", href: "/#process" },
        ] as NavLink[],
      },
      {
        title: "Contact",
        links: [
          { label: "E-mail", href: "mailto:contact@ywdesign.co" },
          { label: "WhatsApp", href: "https://wa.me/32471124525", external: true },
          { label: "Bellen", href: "tel:+33765601415" },
        ] as NavLink[],
      },
    ],
    legal: [
      "© 2026 YWdesign",
      "VAT FR65984069609",
      "504 Chemin de la Rivière, Pollionnay, France",
    ],
  },
} satisfies Site;
