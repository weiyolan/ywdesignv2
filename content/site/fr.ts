// FR site chrome (nav, marquee, terminal, contact, footer) + per-page SEO.
// Mirrors `site` in en.ts 1:1; only translatable string values differ.
import type { NavLink, TerminalLine } from "./en";

export const siteFR = {
  brand: { lead: "YW", tail: "design" },
  status: "disponible",

  // Per-page SEO. `home` feeds the root layout default + the home route; the
  // rest feed their routes' generateMetadata. Titles (except home) get the
  // "%s · YWdesign" template appended automatically.
  seo: {
    home: {
      title: "YWdesign — Développeur & designer web senior, Anvers",
      description:
        "Yolan — un développeur senior qui architecture, ligne par ligne, des sites et boutiques rapides et multilingues. Codé à la main, accéléré par l’IA. Maîtrisée, pas subie.",
      ogTitle: "YWdesign — Développeur & designer web senior, Anvers",
      ogDescription:
        "Sites & boutiques codés à la main, accélérés par l’IA. Next.js · Sanity · GSAP · Stripe.",
    },
    work: {
      title: "Réalisations",
      description:
        "Livré, en production — projets clients sélectionnés : des sites et boutiques multilingues, rapides et orientés conversion, en Belgique et au-delà.",
    },
    technology: {
      title: "La technologie — plongée en profondeur",
      description:
        "Pas de WordPress, pas de page builders — chaque site est construit à la main sur une stack moderne : Next.js, Sanity, GSAP, React, TypeScript et Tailwind. Voici exactement ce qui tourne sous le capot, et pourquoi chaque pièce mérite sa place.",
    },
    about: {
      title: "À propos",
      description:
        "Yolan — ingénieur biomédical, développeur et surfeur, qui construit des sites rapides et réfléchis pour un impact positif à l’échelle mondiale.",
    },
  },

  nav: [
    { label: "Accueil", href: "/" },
    { label: "Réalisations", href: "/work" },
    { label: "Technologie", href: "/technology" },
    { label: "À propos", href: "/about" },
  ] as NavLink[],

  cta: { label: "Démarrer un projet", href: "/#contact" },

  // Cross-cutting micro-copy for the case-study template (hero actions + pager).
  ui: {
    prev: "Précédent",
    next: "Suivant",
    visitLive: "Voir le site en ligne",
    jumpToBuild: "Aller à la construction",
    meta: { role: "Rôle", year: "Année", sector: "Secteur", stack: "Stack" },
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
    phone: "+33 6 38 56 53 02",
    phoneHref: "tel:+33638565302",
    whatsapp: "https://wa.me/32471124525",
    location: "Mortsel · Anvers, BE",
  },

  footer: {
    tagline:
      "Développement & design web senior. Codé à la main, accéléré par l’IA, de bout en bout.",
    columns: [
      {
        title: "Site",
        links: [
          { label: "Compétences", href: "/#capabilities" },
          { label: "Stack", href: "/#stack" },
          { label: "Réalisations", href: "/work" },
          { label: "À propos", href: "/about" },
          { label: "Philosophie IA", href: "/#ai" },
          { label: "Processus", href: "/#process" },
        ] as NavLink[],
      },
      {
        title: "Contact",
        links: [
          { label: "E-mail", href: "mailto:contact@ywdesign.co" },
          { label: "WhatsApp", href: "https://wa.me/32471124525", external: true },
          { label: "Appeler", href: "tel:+33638565302" },
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
