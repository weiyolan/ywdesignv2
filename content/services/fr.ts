// FR service pages — mirrors `services` in ./en.
import type { Service, Services } from "./en";

export const servicesFR = {
  hub: {
    seo: {
      title: "Services — création de site web, e-commerce & refonte",
      description:
        "Création de sites web sur mesure, boutiques en ligne et refontes, codés à la main à Lyon pour la France et la Belgique. Rapides, multilingues, optimisés SEO.",
    },
    eyebrow: "Services",
    title: "Ce que je construis pour vous.",
    intro:
      "Trois façons de travailler ensemble — toujours codé à la main de zéro, multilingue et optimisé SEO, avec un CMS que vous modifiez vous-même.",
    more: "En savoir plus",
  },
  labels: {
    points: "Pourquoi ça marche",
    included: "Ce qui est inclus",
    process: "Comment ça se passe",
    cases: "La preuve, en production",
    faq: "Questions fréquentes",
    caseStudy: "Étude de cas",
  },
  items: [
    {
      slug: "website",
      name: "Site web sur mesure",
      seo: {
        title: "Création de site web sur mesure à Lyon",
        description:
          "Création de site internet sur mesure à Lyon, codé à la main : rapide, multilingue, optimisé pour Google et facile à modifier. Sans WordPress ni template.",
      },
      hero: {
        eyebrow: "Site web sur mesure · Lyon, FR",
        h1: [[{ t: "Un site web conçu" }], [{ t: "de " }, { t: "zéro", accent: true, scramble: true }, { t: "." }]],
        sub: "Pas de template, pas de page builder. Un site pensé pour votre marque et vos visiteurs, codé à la main pour la vitesse et le référencement — puis livré avec un CMS que vous modifiez vous-même.",
      },
      card: "Un site vitrine ou d’entreprise pensé pour vous — rapide, multilingue et bien référencé.",
      points: [
        { h: "Rapide par défaut", p: "Pages statiques, images optimisées, aucun plugin superflu — des scores Lighthouse au sommet et un site instantané sur mobile." },
        { h: "Trouvé sur Google", p: "Code propre, données structurées, sitemaps et métadonnées par langue intégrés dès le premier jour, pas ajoutés après coup." },
        { h: "Multilingue", p: "Français, anglais, néerlandais — ou un mélange — avec un vrai routage par langue et un SEO traduit, pas un widget." },
        { h: "Modifiable par vous", p: "Un CMS headless (Sanity) pour changer textes, images et pages sans appeler un développeur." },
      ],
      included: [
        "Atelier de découverte & arborescence",
        "Design system sur mesure — typo, couleurs, animation",
        "Développement codé à la main (Next.js)",
        "Mise en place du CMS headless & formation",
        "SEO technique & statistiques",
        "Hébergement, nom de domaine & mise en ligne",
      ],
      cases: ["milo", "bermuda", "automatx"],
      faq: [
        { q: "Combien de temps pour créer un site sur mesure ?", a: "La plupart des sites vitrines ou d’entreprise demandent 4 à 8 semaines entre la découverte et la mise en ligne, selon le nombre de pages, de langues et la disponibilité des contenus." },
        { q: "Combien coûte un site web ?", a: "Chaque site fait l’objet d’un devis à prix fixe après un appel de découverte gratuit — vous connaissez le coût total avant le début des travaux. Aucune mauvaise surprise." },
        { q: "Puis-je modifier le site moi-même ?", a: "Oui. Les contenus vivent dans un CMS headless (Sanity) simple à utiliser : vous modifiez textes, images et pages vous-même, et je reste disponible pour tout ce qui touche à la structure." },
        { q: "Pourquoi pas WordPress ou Wix ?", a: "Un site codé à la main est plus rapide, plus sûr et mieux référencé — pas de mises à jour de plugins, pas de limites de thème, pas de page builder qui alourdit. Vous avez exactement le site dont vous avez besoin." },
        { q: "Travaillez-vous en dehors de Lyon ?", a: "Oui — je suis basé à Lyon et je travaille avec des clients partout en France, en Belgique et au-delà, en français, en anglais ou en néerlandais." },
      ],
    },
    {
      slug: "e-commerce",
      name: "Boutique en ligne",
      seo: {
        title: "Création de boutique en ligne — Stripe & headless",
        description:
          "Création de site e-commerce sur mesure avec paiement Stripe, à Lyon : fiches produits rapides, multilingue et multidevise, optimisé SEO et simple à gérer.",
      },
      hero: {
        eyebrow: "E-commerce · Stripe · headless",
        h1: [[{ t: "Une boutique en ligne" }], [{ t: "qui " }, { t: "vend", accent: true, scramble: true }, { t: "." }]],
        sub: "Une boutique pensée autour de vos produits, avec un paiement Stripe sans friction — rapide sur chaque téléphone, traduite pour chaque marché et gérée depuis un seul CMS.",
      },
      card: "Une boutique sur mesure avec paiement Stripe — rapide, multilingue et pensée pour convertir.",
      points: [
        { h: "Un paiement qui convertit", p: "Stripe Checkout avec Apple Pay, Google Pay, cartes et Twint — sécurisé, conforme SCA et en un geste sur mobile." },
        { h: "La vitesse, c’est du chiffre", p: "Chaque seconde coûte des ventes. Les fiches produits sont pré-générées et les images optimisées pour s’afficher instantanément." },
        { h: "Chaque marché", p: "Plusieurs langues et devises, règles de TVA et de livraison — une seule boutique, configurée pour chaque pays où vous vendez." },
        { h: "Simple à gérer", p: "Produits, stocks et contenus dans un seul CMS, commandes et virements dans Stripe — aucune pile de plugins à maintenir." },
      ],
      included: [
        "Structure de la boutique & modèle produit",
        "Design de boutique sur mesure",
        "Paiement Stripe, encaissements & webhooks",
        "Configuration multilingue & multidevise",
        "SEO produits & données structurées",
        "Formation au CMS & accompagnement au lancement",
      ],
      cases: ["nu"],
      faq: [
        { q: "Shopify ou une boutique sur mesure ?", a: "Shopify convient très bien aux catalogues standards. Une boutique sur mesure se justifie quand le design, la vitesse, le contenu ou le SEO multilingue comptent — et sans frais d’applications mensuels." },
        { q: "Quels moyens de paiement sont acceptés ?", a: "Tout ce que Stripe propose : cartes, Apple Pay, Google Pay, Bancontact, iDEAL, SEPA, Twint et plus, avec l’authentification forte (SCA) intégrée." },
        { q: "Puis-je gérer les produits moi-même ?", a: "Oui. Produits, prix, images et contenus se modifient dans le CMS ; commandes, remboursements et virements se gèrent dans votre tableau de bord Stripe." },
        { q: "Combien de temps pour une boutique en ligne ?", a: "Généralement 6 à 10 semaines, selon la taille du catalogue, les marchés et les intégrations. Le devis à prix fixe après la découverte inclut un calendrier clair." },
        { q: "La boutique est-elle optimisée pour Google ?", a: "Oui — données structurées produits, pages rapides, URLs propres et métadonnées par langue, pour que vos produits apparaissent avec prix et disponibilité dans les résultats." },
      ],
    },
    {
      slug: "redesign",
      name: "Refonte de site web",
      seo: {
        title: "Refonte de site web — quitter WordPress ou Wix",
        description:
          "Refonte de site internet : quittez WordPress, Wix ou Squarespace pour un site rapide codé à la main, sans perdre votre référencement Google.",
      },
      hero: {
        eyebrow: "Refonte · migration · SEO préservé",
        h1: [[{ t: "Votre site, reconstruit" }], [{ t: "pour " }, { t: "performer", accent: true, scramble: true }, { t: "." }]],
        sub: "Votre site WordPress, Wix ou Squarespace est devenu lent ou limité ? Je le reconstruis de zéro — nouveau design, vraie vitesse — et je migre vos contenus et votre référencement avec.",
      },
      card: "Quittez WordPress, Wix ou Squarespace pour un site rapide codé à la main — référencement conservé.",
      points: [
        { h: "Référencement conservé", p: "Chaque ancienne URL est répertoriée et redirigée, les métadonnées reprises et le sitemap renvoyé — Google vous suit sur le nouveau site." },
        { h: "Contenus migrés", p: "Pages, articles, images et traductions transférés dans un CMS moderne, et nettoyés au passage." },
        { h: "Un vrai gain de vitesse", p: "De pages chargées de plugins à des pages statiques optimisées — généralement plusieurs secondes gagnées et des Core Web Vitals au vert." },
        { h: "Un design actuel", p: "Votre marque, rafraîchie dans un design system cohérent qui évolue avec vous, au lieu d’un thème qu’on contourne." },
      ],
      included: [
        "Audit du site actuel, du SEO & des statistiques",
        "Cartographie des URLs & plan de redirections 301",
        "Nouveau design system & développement sur mesure",
        "Migration des contenus dans le CMS",
        "Continuité Search Console & statistiques",
        "Suivi après la mise en ligne",
      ],
      cases: ["ywdesign"],
      faq: [
        { q: "Vais-je perdre mon référencement Google ?", a: "Pas avec une migration bien faite. Chaque URL reçoit une redirection 301, les métadonnées sont conservées et la Search Console est mise à jour — le référencement se maintient, et s’améliore souvent grâce au gain de vitesse." },
        { q: "Pouvez-vous migrer depuis WordPress, Wix ou Squarespace ?", a: "Oui — contenus, images et pages sont exportés et transférés dans un CMS headless, puis nettoyés et restructurés là où c’est utile." },
        { q: "Mes contenus sont-ils repris ?", a: "Oui. Textes, images, articles et traductions sont migrés ; les pages obsolètes sont signalées pour décider ensemble de ce qui reste." },
        { q: "Combien de temps dure une refonte ?", a: "En général 5 à 10 semaines, selon la taille du site actuel et la quantité de contenus à migrer." },
      ],
    },
  ] as Service[],
} satisfies Services;
