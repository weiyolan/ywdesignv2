// FR home copy — full French translation, mirroring `home` in ./en.
import type { NumFmt } from "@/lib/format";
import type { Seg } from "./en";

const nbsp = " ";

export const homeFR = {
  hero: {
    eyebrow: "Développeur & designer web senior · Anvers, BE",
    headline: [
      [{ t: "Des sites,", scramble: true }, { t: " conçus" }],
      [{ t: "de " }, { t: "zéro", scramble: true, accent: true }, { t: " —" }],
      [{ t: "l’IA, c’est l’" }, { t: "outil.", scramble: true, accent: true }],
    ] as Seg[][],
    sub: [
      { t: "Je suis " },
      { t: "Yolan", b: true },
      { t: " — un développeur senior qui architecture des sites et boutiques rapides et multilingues, ligne après ligne. " },
      { t: "L’IA accélère le métier ; elle ne remplace jamais le jugement.", b: true },
      { t: " Maîtrisée, pas subie." },
    ] as Seg[],
    ctas: [
      { label: "Voir les réalisations", href: "#work", variant: "primary" as const, arrow: "→" },
      { label: "La philosophie", href: "#ai", variant: "ghost" as const },
    ],
  },

  growth: {
    title: "growth.tsx — ce que rapporte un bon code",
    live: "en direct",
    funnel: [
      { k: "Visiteurs", val: 48200, fmt: "k" as NumFmt, d: "+0 %" },
      { k: "Clics", val: 13100, fmt: "k" as NumFmt, d: "27 % CTR" },
      { k: "Profit", val: 92400, fmt: "eur" as NumFmt, d: "▲ livré", profit: true },
    ],
  },

  capabilities: {
    tk: "01",
    eyebrow: "Ce que j’apporte",
    title: ["Pas un template.", "Une boîte à outils, faite main."],
    intro:
      "Chaque capacité ci-dessous est conçue de zéro et éprouvée sur un projet réel, mis en production. Aucun page builder, aucun boilerplate — juste du code que je maîtrise de bout en bout.",
    cards: [
      {
        span: "feature span-3", d: 0, ico: "design_systems",
        h: "Design systems, des tokens jusqu’en haut",
        p: "Échelles typographiques, couleurs, espacements, motion et composants — un système cohérent, pas un tas de CSS.",
        viz: "scale",
        case: { pre: "CAS :", strong: "Spiree", post: "— système de dégradés ↗", href: "https://spiree-next.netlify.app/", external: true },
      },
      {
        span: "feature span-3", d: 1, ico: "motion",
        h: "Motion cinématique, piloté au scroll",
        p: "Scroll sectionné, chapitres collants et chorégraphie de révélation — au budget de performance, jamais gratuit.",
        viz: "bars",
        case: { pre: "CAS :", strong: "Milo Weiler", post: "— scroll en 7 chapitres ↗", href: "https://miloweiler.com", external: true },
      },
      {
        span: "span-2", d: 0, ico: "i18n",
        h: "Routage multilingue",
        p: "EN · FR · NL avec un SEO localisé intégré.",
        viz: "lang",
        case: { pre: "CAS :", strong: "Bermuda", post: "↗", href: "https://bermuda-events.be", external: true },
      },
      {
        span: "span-2", d: 1, ico: "headless_cms",
        h: "CMS headless",
        p: "Publiez vos modifications de contenu sans développeur dans la boucle.",
        viz: "cms",
        case: { pre: "CAS :", strong: "Nu", post: "· Sanity ↗", href: "https://nu-site.netlify.app/en", external: true },
      },
      {
        span: "span-2", d: 2, ico: "commerce",
        h: "Commerce & paiements",
        p: "Des paiements Stripe & Twint qui convertissent.",
        viz: "commerce",
        case: { pre: "CAS :", strong: "Nu", post: "boutique ↗", href: "https://nu-site.netlify.app/en", external: true },
      },
      {
        span: "span-4", d: 0, ico: "performance · seo",
        h: "Optimisé Lighthouse, prêt pour la recherche",
        p: "Imagerie différée, balisage sémantique et Core Web Vitals au propre — rapide pour les utilisateurs comme pour Google.",
        viz: "gauge",
        case: { pre: "CAS :", strong: "Milo Weiler", post: "↗", href: "https://miloweiler.com", external: true },
      },
      {
        span: "accent-card span-2", d: 1, ico: "ai_assisted",
        h: "L’IA, maîtrisée",
        p: "Prompt → du code relu, refactorisé, compris. La vitesse sans céder l’architecture.",
        viz: "none",
        case: { pre: "Lire la philosophie ↓", href: "#ai" },
      },
    ],
  },

  stack: {
    tk: "02",
    eyebrow: "La stack, en profondeur",
    title: ["Pas de WordPress.", "Du code" + nbsp + "personnalisé."],
    intro:
      "Aucun page builder, aucune prolifération de plugins, aucun thème à dompter. Chaque site est écrit de zéro dans une stack moderne que je connais assez pour la plier. Les trois outils ci-dessous font le gros du travail — faites défiler, et chacun s’ouvre dès que la ligne l’atteint.",
    rows: [
      {
        mark: "N", name: "Next.js", tag: "La fondation — chaque site tourne dessus", role: "framework", open: true,
        body: "Chaque site que je construis est une application Next.js. L’App Router me donne les server components, le streaming et le routage par fichiers — les pages sont rendues côté serveur pour la vitesse et le SEO, puis seules les parties qui doivent être interactives sont hydratées. Un seul framework, de la page marketing au paiement.",
        points: ["App Router & React Server Components", "SSG · ISR · SSR choisis par route", "next/image — optimisation automatique", "Routage i18n natif — en · fr · nl", "Code splitting au niveau des routes", "Prêt pour l’edge, déployé sur Vercel"],
        case: { pre: "CAS :", strong: "Milo Weiler", post: "— 55 projets, Lighthouse au top ↗", href: "https://miloweiler.com", external: true },
      },
      {
        mark: "S", name: "Sanity", tag: "Du contenu headless que le client édite lui-même", role: "headless cms",
        body: "Le contenu vit dans Sanity, totalement découplé du front-end. Les éditeurs mettent à jour produits, articles et imagerie dans un Studio que je taille sur mesure pour leur workflow ; j’interroge exactement la forme dont chaque page a besoin avec GROQ et je la rends via Portable Text. Aucun développeur dans la boucle pour les modifications du quotidien.",
        points: ["Schémas Studio sur mesure par client", "GROQ — n’interroger que ce qui est rendu", "Contenu riche en Portable Text", "Aperçu des brouillons & mises à jour en temps réel", "Pipeline d’images sur un CDN global", "Rebuilds déclenchés par webhook"],
        case: { pre: "CAS :", strong: "Nu", post: "— un catalogue clean-beauty piloté par CMS ↗", href: "https://nu-site.netlify.app/en", external: true },
      },
      {
        mark: "St", name: "Stripe", tag: "Paiement sécurisé — multidevise & Twint", role: "payments",
        body: "Le paiement tourne sur Stripe. Les sessions sont créées côté serveur, confirmées par des webhooks signés et réconciliées avant toute expédition — sécurisé par conception, sans jamais faire confiance au navigateur. Le multidevise et Twint donnent aux clients belges et de l’UE les moyens de paiement qu’ils utilisent réellement.",
        points: ["Checkout Sessions côté serveur", "Traitement par webhook signé", "Tarification multidevise", "Twint & cartes pour l’UE", "PaymentIntents avec SCA", "Logique de TVA & d’expédition"],
        case: { pre: "CAS :", strong: "Nu", post: "boutique — un parcours d’achat sans friction ↗", href: "https://nu-site.netlify.app/en", external: true },
      },
      {
        mark: "G", name: "GSAP", tag: "Le moteur de motion — animation au scroll & timeline", role: "animation",
        body: "Chaque révélation, chapitre de scroll et fioriture au survol tourne sur GSAP. ScrollTrigger épingle les sections et lie l’animation à la position de scroll ; les timelines séquencent la chorégraphie à l’image près. C’est la différence entre un site qui se charge et un site qui bouge — au budget de performance, jamais gratuit.",
        points: ["ScrollTrigger — scènes pilotées au scroll", "Timelines pour le motion séquencé", "Pin & scrub des chapitres collants", "Transforms compatibles GPU uniquement", "Conscient du reduced-motion", "60 fps sur mobile milieu de gamme"],
        case: { pre: "CAS :", strong: "Milo Weiler", post: "— chorégraphie de scroll en 7 chapitres ↗", href: "https://miloweiler.com", external: true },
      },
    ],
    side: {
      eyebrow: "De zéro, à chaque fois",
      h: ["Voilà à quoi ressemble", "un « sans template »."],
      p: "Un site monté comme je travaille vraiment — l’architecture d’abord, le design system ensuite, puis la mise en production. Le jugement est humain ; la vitesse, c’est l’outillage.",
      cta: { label: "Plonger dans la technologie", href: "#stack" },
    },
    supporting: {
      eyebrow: "Plus la distribution de soutien",
      items: [
        { mark: "R", name: "React 18", role: "UI · composants" },
        { mark: "TS", name: "TypeScript", role: "Types · sûreté" },
        { mark: "T", name: "Tailwind", role: "Styling · tokens" },
        { mark: "N", name: "Node.js", role: "Runtime · APIs" },
        { mark: "M", name: "MongoDB", role: "NoSQL · données" },
        { mark: "Rx", name: "Redux", role: "État · panier" },
        { mark: "GQ", name: "GraphQL", role: "Requêtes typées" },
        { mark: "V", name: "Vercel", role: "Hébergement · edge" },
      ],
    },
  },

  work: {
    tk: "03",
    eyebrow: "Réalisations choisies",
    title: "Livré, en production.",
    intro:
      "De vrais sites pour de vrais clients, en Belgique et au-delà — multilingues, rapides et conçus pour convertir.",
    cta: { caseStudy: "Étude de cas", visit: "Visiter" },
    items: [
      { num: "01", cat: "E-commerce beauté & bien-être", slug: "nu", title: "Nu", body: "Une boutique clean-beauty multilingue — un rythme éditorial posé autour d’un parcours d’achat sans friction, piloté par CMS.", href: "https://nu-site.netlify.app/en", img: "/work/nu.svg" },
      { num: "02", cat: "Portfolio de photographie", slug: "milo", title: "Milo Weiler", body: "Un portfolio sombre et cinématique découpé en sept chapitres de scroll — 55 projets, navigation de chapitres collante, scores Lighthouse au top.", href: "https://miloweiler.com", img: "/work/milo.svg" },
      { num: "03", cat: "Agence événementielle · Belgique", slug: "bermuda", title: "Bermuda Events", body: "Un site de marque premium qui met en scène les productions passées à grande échelle, avec un tunnel de contact conçu pour qualifier les bons leads.", href: "https://bermuda-events.be", img: "/work/bermuda.svg" },
      { num: "04", cat: "Marque d’activewear · 100 % Merino", slug: "spiree", title: "Spiree", body: "Le site d’une marque de sportswear indépendante — système de dégradés audacieux, collections Sun & Moon, un récit qui prime.", href: "https://spiree-next.netlify.app/", img: "/work/spiree.svg" },
    ],
  },

  ai: {
    tk: "04",
    eyebrow: "La philosophie",
    title: [
      [{ t: "Un outil puissant." }],
      [{ t: "Maîtrisé", em: true, scramble: true }, { t: "," }],
      [{ t: "pas subi." }],
    ] as Seg[][],
    lede:
      "J’exploite l’IA comme un artisan exploite un outil électrique — pour la vitesse et l’effet de levier, jamais pour lui céder la réflexion. L’application n’est pas le travail. Le jugement, oui.",
    principles: [
      { n: "01", b: "Je possède l’architecture", p: "L’IA esquisse ; je décide de la structure, des arbitrages et du modèle de données. Le plan est humain." },
      { n: "02", b: "Chaque ligne livrée est comprise", p: "Rien n’atteint la production que je ne puisse lire, refactoriser et défendre. Aucune boîte noire." },
      { n: "03", b: "La vitesse, sans perdre le pourquoi", p: "L’IA élimine le travail répétitif pour laisser plus de temps au métier, à la performance et aux détails qui comptent." },
      { n: "04", b: "L’outil sert le développeur", p: "Maîtrisé, pas subi. L’ingénieur senior reste aux commandes — toujours." },
    ],
  },

  process: {
    tk: "05",
    eyebrow: "Ma façon de travailler",
    title: "Un pipeline transparent.",
    intro:
      "Cinq étapes, du départ à la mise en production. La ligne se trace à mesure que vous faites défiler — chaque étape s’allume dès que vous l’atteignez.",
    stages: [
      { n: "01", h: "Découverte", p: "Objectifs, audience, budget — et ce que signifie vraiment le succès avant qu’une seule ligne soit écrite." },
      { n: "02", h: "Architecture", p: "Stack, modèle de données et structure décidés en amont — le plan est humain." },
      { n: "03", h: "Design", p: "Un vrai système que vous voyez tôt et auquel vous réagissez, affiné ensemble — pas une maquette figée." },
      { n: "04", h: "Construction", p: "Codé à la main, accéléré par l’IA, multilingue et prêt pour le SEO — chaque ligne livrée est comprise." },
      { n: "05", h: "Mise en production", p: "Mesurer, itérer, et je reste présent pour la suite, quelle qu’elle soit." },
    ],
  },

  contact: {
    eyebrow: "Contact",
    title: [
      [{ t: "Un projet" }],
      [{ t: "qui mérite d’être " }, { t: "construit ?", em: true, scramble: true }],
    ] as Seg[][],
    p: "Du fichier vierge au produit livré. Dites-moi ce que vous avez en tête — je vous dirai comment je le construirais.",
    ctas: [
      { label: "Démarrer un projet", href: "mailto:contact@ywdesign.co?subject=Project", variant: "primary" as const, arrow: "→" },
      { label: "WhatsApp", href: "https://wa.me/32471124525", variant: "ghost" as const, external: true },
    ],
  },
};
