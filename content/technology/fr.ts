// FR technology copy — full French translation (mirrors content/technology/en.ts).
import type { Seg } from "@/content/home";
import type { ContrastCol, RenderStrat, StudioType, TechSection, RecapItem } from "./en";

const nbsp = " ";

export const technologyFR = {
  hero: {
    kicker: { pre: "//", mid: "La technologie · en profondeur ·", year: "2026" },
    // "Pas de WordPress.<br>Juste du code sur mesure." (accent run scrambles)
    h1: [
      { t: "Pas de WordPress." },
      { t: "Juste du " },
      { t: "code" + nbsp + "sur" + nbsp + "mesure.", scramble: true, accent: true },
    ] as Seg[],
    lede: [
      { t: "Pas de page builders, pas de plugins qui s’empilent, pas de thème à dompter. Chaque site est une application bâtie à la main sur une stack moderne que je maîtrise assez pour la plier à mes besoins. Voici " },
      { t: "exactement", b: true },
      { t: " ce qui tourne sous le capot — et pourquoi chaque pièce mérite sa place." },
    ] as Seg[],
    contrast: [
      {
        tone: "bad",
        ct: "La voie du template",
        h: "WordPress & page builders",
        items: [
          "Des piles de plugins que vous ne contrôlez ni ne comprenez",
          "Un balisage alourdi, des Core Web Vitals lents",
          "Une surface de sécurité à corriger en permanence",
          "Un design enfermé dans le thème de quelqu’un d’autre",
        ],
      },
      {
        tone: "good",
        ct: "Ma façon de construire",
        h: "Du code sur mesure",
        items: [
          "Chaque ligne écrite, lue et maîtrisée par moi",
          "Optimisé pour Lighthouse, rapide par construction",
          "Verrouillé par conception — pas de loterie de plugins",
          "Un design au pixel près, sans aucun compromis",
        ],
      },
    ] as ContrastCol[],
  },

  // The six deep sections, in render order.
  sections: [
    {
      demo: "next",
      mark: "N",
      role: "framework · la fondation",
      since: "Vercel · 2016 · chaque site tourne dessus",
      h: [{ t: "Next.js — " }, { t: "SSR & SEO", accent: true }, { t: ", intégrés." }],
      desc: [
        { t: "Chaque site est une application Next.js. Les pages sont rendues " },
        { t: "côté serveur", b: true },
        { t: " : le navigateur — et le crawler de Google — reçoivent un HTML complet instantanément, puis seules les parties interactives s’hydratent. Je choisis la stratégie de rendu route par route : statique là où c’est possible, dynamique là où il le faut." },
      ],
      points: [
        "App Router & Server Components",
        "SSG · ISR · SSR par route",
        "Optimisation next/image",
        "Routage i18n natif",
        "Metadata & données structurées",
        "Déployé en edge sur Vercel",
      ],
    },
    {
      demo: "sanity",
      mark: "S",
      role: "cms headless · contenu",
      since: "Sanity.io · le client le modifie lui-même",
      h: [{ t: "Sanity — un " }, { t: "tableau de bord", accent: true }, { t: " conçu autour du client." }],
      desc: [
        { t: "Le contenu vit dans un Sanity Studio que je façonne pour chaque client — entièrement découplé du front-end. Les éditeurs mettent à jour produits, articles et visuels dans une interface en temps réel ; j’interroge avec GROQ exactement la forme dont chaque page a besoin. " },
        { t: "Aucun développeur dans la boucle pour les modifications du quotidien.", b: true },
      ],
    },
    {
      demo: "gsap",
      mark: "G",
      role: "animation · la couche de mouvement",
      since: "GreenSock (GSAP) · standard du secteur",
      h: [{ t: "GSAP — le mouvement sur une " }, { t: "timeline", accent: true }, { t: "." }],
      desc: [
        { t: "Chaque révélation, chapitre de scroll et touche au survol tourne sur GSAP. " },
        { t: "ScrollTrigger", b: true },
        { t: " lie l’animation à la position de scroll et épingle les sections fixes ; " },
        { t: "Draggable", b: true },
        { t: " et " },
        { t: "MorphSVG", b: true },
        { t: " rendent les formes vectorielles saisissables et métamorphiques. C’est toute la différence entre un site qui charge et un site qui " },
        { t: "bouge", b: true },
        { t: " — calibré sur un budget de performance, jamais gratuit." },
      ],
      points: [
        "Scènes ScrollTrigger",
        "Timelines séquencées",
        "Interactions Draggable",
        "Morphing de formes MorphSVG",
        "Transforms GPU uniquement",
        "Respecte le reduced-motion",
      ],
    },
    {
      demo: "react",
      rev: true,
      mark: "R",
      role: "bibliothèque ui · composants",
      since: "Créé chez Facebook (Meta) · 2013",
      h: [{ t: "React — le modèle par " }, { t: "composants", accent: true }, { t: "." }],
      desc: [
        { t: "Né chez Facebook en 2013, React est la façon dont toute l’interface est construite : de petits morceaux composables d’interface pilotés par l’état. On écrit un composant une fois, on le réutilise partout, et la vue reflète toujours les données. " },
        { t: "C’est la couche sur laquelle tout le reste se branche.", b: true },
      ],
      points: [
        "Composants composables",
        "Interface déclarative, pilotée par l’état",
        "Hooks pour réutiliser la logique",
        "Écosystème vaste et éprouvé",
      ],
    },
    {
      demo: "ts",
      mark: "TS",
      role: "langage · sûreté des types",
      since: "Microsoft · 2012 · le JavaScript qui passe à l’échelle",
      h: [{ t: "TypeScript — " }, { t: "des erreurs attrapées", accent: true }, { t: " avant la mise en prod." }],
      desc: [
        { t: "Chaque ligne est typée. Le compilateur connaît la forme de vos données, de vos props et de vos réponses d’API — alors des classes entières de bugs sont attrapées dans l’éditeur, pas en production. " },
        { t: "C’est une documentation qui ne peut pas devenir obsolète et un filet de sécurité qui ne dort jamais.", b: true },
      ],
      points: [
        "Vérification statique des types",
        "Autocomplétion & intellisense dans l’éditeur",
        "Des contrats auto-documentés",
        "Des refactorings sûrs et sereins",
      ],
    },
    {
      demo: "tw",
      rev: true,
      mark: "T",
      role: "styling · design tokens",
      since: "Tailwind CSS · utility-first",
      h: [{ t: "Tailwind — " }, { t: "des design tokens", accent: true }, { t: ", pas des feuilles de style." }],
      desc: [
        { t: "Le style se fait dans le balisage avec des classes utilitaires reliées à un design system unique — espacements, couleurs et typographie tous issus de tokens partagés. " },
        { t: "Le résultat est cohérent par défaut, minuscule en production", b: true },
        { t: ", et impossible à dériver puisqu’il n’y a aucun fichier CSS orphelin qui pourrit." },
      ],
      points: [
        "Utilitaires pilotés par tokens",
        "Zéro CSS inutilisé livré",
        "Espacements & échelle cohérents",
        "Responsive en un seul endroit",
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
          { t: "Statique (SSG)", b: true, accent: true },
          { t: " — rendu une fois au build. Servi en HTML plat depuis l’edge : ce qu’une page peut faire de plus rapide. Pour les pages marketing & contenu." },
        ],
        wave: [20, 30, 28, 40, 55, 70, 85, 100],
      },
      {
        k: "isr",
        label: "ISR",
        body: [
          { t: "Incrémental (ISR)", b: true, accent: true },
          { t: " — vitesse du statique, mais régénéré en arrière-plan sur minuterie. Du contenu frais sans rebuild complet. Pour les catalogues & blogs." },
        ],
        wave: [24, 34, 30, 46, 50, 62, 74, 92],
      },
      {
        k: "ssr",
        label: "SSR",
        body: [
          { t: "Serveur (SSR)", b: true, accent: true },
          { t: " — rendu à chaque requête sur le serveur. Toujours à jour, personnalisé, toujours indexable. Pour les paniers, tableaux de bord & recherche." },
        ],
        wave: [40, 52, 48, 60, 66, 72, 80, 88],
      },
    ] as RenderStrat[],
    seoFlags: ["LCP 1.1s", "CLS 0.00", "entièrement indexable", "balises OG"],
  },

  // --- Sanity Studio: sidebar doc-types + the list each one shows (:419-437) ---
  studio: {
    brandLead: "Nu",
    brandTail: "Studio",
    lake: "· content lake",
    pub: "Publié",
    contentLabel: "Contenu",
    types: [
      {
        doc: "product",
        ico: "◆",
        label: "Produits",
        on: true,
        listLabel: "Produits · 24",
        docs: [
          { t: "Sérum Renew", s: "48 € · en stock", on: true, badge: "EN · NL" },
          { t: "Nettoyant Calm", s: "32 € · en stock" },
          { t: "SPF 30 Quotidien", s: "29 € · stock faible" },
          { t: "Baume de Nuit", s: "54 € · en stock" },
        ],
      },
      {
        doc: "post",
        ico: "¶",
        label: "Journal",
        listLabel: "Journal · 12",
        docs: [
          { t: "Le dossier vitamine C", s: "Publié · 4 min", on: true, badge: "EN · NL" },
          { t: "Pourquoi le sans-parfum", s: "Publié · 3 min" },
          { t: "Fabriqué en Belgique", s: "Brouillon" },
        ],
      },
      {
        doc: "page",
        ico: "▤",
        label: "Pages",
        listLabel: "Pages · 6",
        docs: [
          { t: "Accueil", s: "/ · publié", on: true },
          { t: "À propos", s: "/about · publié" },
          { t: "Contact", s: "/contact · publié" },
        ],
      },
      {
        doc: "settings",
        ico: "⚙",
        label: "Réglages",
        listLabel: "Réglages",
        docs: [
          { t: "Site & SEO", s: "métadonnées globales", on: true },
          { t: "Navigation", s: "menus" },
          { t: "Livraison", s: "zones · tarifs" },
        ],
      },
    ] as StudioType[],
  },

  // --- Full-stack recap chips (technology.html :363-370) ---
  recap: {
    eyebrow: "Les seconds rôles",
    title: "Le reste de la boîte à outils.",
    intro:
      "Tout le reste qui part sur un build typique — choisi pour la même raison : je le connais assez pour le maîtriser.",
    items: [
      { m: "No", nm: "Node.js", rl: "Runtime · API" },
      { m: "St", nm: "Stripe", rl: "Paiements · Twint" },
      { m: "M", nm: "MongoDB", rl: "NoSQL · données" },
      { m: "Rx", nm: "Redux", rl: "État · panier" },
      { m: "GQ", nm: "GraphQL", rl: "Requêtes typées" },
      { m: "Ln", nm: "Lenis", rl: "Scroll fluide" },
      { m: "V", nm: "Vercel", rl: "Hébergement · edge" },
      { m: "i18", nm: "i18n", rl: "EN · FR · NL" },
    ] as RecapItem[],
  },

  // --- Closing CTA (technology.html :376-384) ---
  cta: {
    title: [
      [{ t: "Vous voulez cette stack" }],
      [{ t: "derrière " }, { t: "votre", em: true }, { t: " site ?" }],
    ] as Seg[][],
    p: "Du fichier vierge au produit livré — sur les outils exacts ci-dessus. Dites-moi ce que vous avez en tête.",
    ctas: [
      { label: "Démarrer un projet", href: "mailto:contact@ywdesign.co?subject=Project", variant: "primary" as const, arrow: "→" },
      { label: "Voir le résultat livré", href: "/work", variant: "ghost" as const },
    ],
  },
};
