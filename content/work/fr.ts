// FR case-study copy — French translation of content/work/en.ts.
// Mirrors `projects` in en.ts 1:1 (satisfies Record<Slug, Project>); only
// translatable values differ.
import type { Slug, Project } from "./en";

export const projectsFR = {
  // ── 01 · Nu ─────────────────────────────────────────────────────────────
  nu: {
    slug: "nu",
    eyebrowNum: "01",
    category: "E-commerce beauté & bien-être",
    year: "2024",
    titleSegs: [
      { t: "Nu — la clean beauty, " },
      { t: "vendue avec calme.", scramble: true, accent: true },
    ],
    lede:
      "Une boutique multilingue pour une marque de clean beauty — un rythme éditorial enveloppant un parcours d’achat sans friction, piloté par le CMS, que l’équipe gère elle-même.",
    liveHref: "https://nu-site.netlify.app/",
    meta: {
      role: "Design & développement",
      year: "2024",
      sector: "E-commerce · DTC",
      stack: ["Next.js", "Sanity", "Stripe"],
    },
    heroImg: "/work/nu-hero.jpg",
    heroAlt: "Nu — hero de la boutique clean beauty",
    metaTitle: "Nu — Étude de cas",
    metaDescription:
      "Une boutique clean beauty multilingue — un calme éditorial enveloppant un parcours d’achat sans friction, piloté par le CMS et propulsé par Stripe, que l’équipe gère elle-même.",
    sections: [
      {
        kind: "narrative",
        head: {
          eyebrow: "Le défi",
          title: "Une boutique qui se lit comme un magazine, qui tourne comme un commerce.",
        },
        paras: [
          [
            { t: "Les acheteuses de clean beauty se renseignent avant d’acheter. Nu avait besoin d’un " },
            { t: "calme éditorial", b: true },
            {
              t: " — de l’espace généreux, une typographie soignée — sans renoncer à la mécanique exigeante d’une vraie boutique : panier, paiement, stock et TVA.",
            },
          ],
          [
            {
              t: "Le brief s’est donc scindé en deux : faire que chaque page se lise comme une page de magazine paisible, et faire que l’ensemble ",
            },
            { t: "tourne tout seul", b: true },
            {
              t: " en deux langues, sans développeur dans la boucle au quotidien.",
            },
          ],
        ],
      },
      {
        kind: "approach",
        head: { eyebrow: "Approche", title: "Trois mouvements" },
        steps: [
          {
            sn: "01 / content",
            h: "Tout modéliser dans Sanity",
            p: "Produits, collections et blocs éditoriaux en contenu structuré — l’équipe possède chaque mot et chaque image.",
          },
          {
            sn: "02 / i18n",
            h: "Localiser toute la surface",
            p: "Routing EN · FR, copy et métadonnées SEO modélisés dès le départ, jamais rajoutés à la fin.",
          },
          {
            sn: "03 / commerce",
            h: "Câbler Stripe de bout en bout",
            p: "Panier, paiement sécurisé, stock et TVA — une vraie boutique qui bourdonne derrière le calme.",
          },
        ],
      },
      {
        kind: "signature",
        demo: "nuLang",
        head: {
          eyebrow: "Build signature",
          title: "Un seul catalogue, deux langues — instantanément",
          intro:
            "La localisation n’est pas un ajout de dernière minute — elle est modélisée au cœur de la couche de contenu. Basculez la langue et regardez toute la surface produit se métamorphoser, routing compris. Essayez :",
        },
        label: "[locale]/products/[slug].tsx",
        note: "composant en direct",
      },
      {
        kind: "statBand",
        head: {
          eyebrow: "Résultat",
          title: "Le calme en surface, l’activité en dessous.",
        },
        stats: [
          { sv: "2", sl: "Langues — EN · FR, routing & SEO entièrement localisés" },
          {
            sv: "0",
            sl: "Heures de développement pour publier un nouveau produit ou une campagne",
          },
          {
            sv: "100%",
            sl: "Catalogue piloté par le CMS — chaque page éditable par l’équipe",
          },
        ],
      },
      {
        kind: "signature",
        demo: "nuShop",
        head: {
          eyebrow: "La boutique, en direct",
          title: "La grille produit — réelle, pas une capture d’écran",
          intro:
            "Voici le véritable composant Products de Nu, recréé dans la palette claire de la marque — titres Corben, tuile catégorie pastel, notes en étoiles et ajout rapide propulsé par Stripe. Changez de langue, ajoutez au panier, survolez une carte. C’est le build, en marche.",
        },
        label: "shop/page.tsx · Products.tsx · Product.tsx",
        note: "composant en direct",
      },
    ],
    signatureData: {
      nuLang: {
        en: {
          h: "Quiet skincare, made to last.",
          p: "Formulated clean, shipped across Europe. Edit every word of this page in the CMS — in both languages.",
          nm: "Radiance Serum",
          add: "Add to cart",
          added: "✓ Added to cart",
        },
        fr: {
          h: "Des soins discrets, faits pour durer.",
          p: "Formulés proprement, expédiés dans toute l’Europe. Modifiez chaque mot de cette page dans le CMS — dans les deux langues.",
          nm: "Sérum Éclat",
          add: "Ajouter au panier",
          added: "✓ Ajouté au panier",
        },
      },
      nuShop: {
        products: [
          { id: "nu-p1", stars: 5 },
          { id: "nu-p2", stars: 4 },
          { id: "nu-p3", stars: 5 },
        ],
        copy: {
          fr: {
            crumb: "Boutique / Soins solides",
            tileH: "Soins solides",
            tileP:
              "Formulés propres, sans plastique. Faits pour durer, expédiés dans toute l'Europe.",
            tileB: "Voir la boutique",
            p1n: "Shampoing Solide",
            p1d: "Nettoie en douceur, sans sulfates ni plastique.",
            p2n: "Savon Nourrissant",
            p2d: "Huile d'olive & karité, pour les peaux sensibles.",
            p3n: "Baume Mains",
            p3d: "Répare et protège les mains sèches, parfum neutre.",
            see: "Voir plus",
            add: "Ajouter",
            added: "✓ Ajouté",
          },
          en: {
            crumb: "Shop / Solid care",
            tileH: "Solid care",
            tileP:
              "Clean formulas, zero plastic. Made to last, shipped across Europe.",
            tileB: "View the shop",
            p1n: "Solid Shampoo",
            p1d: "Gentle cleansing, no sulfates or plastic.",
            p2n: "Nourishing Soap",
            p2d: "Olive oil & shea, for sensitive skin.",
            p3n: "Hand Balm",
            p3d: "Repairs and protects dry hands, unscented.",
            see: "See more",
            add: "Add",
            added: "✓ Added",
          },
        },
      },
    },
  },

  // ── 02 · Milo Weiler ────────────────────────────────────────────────────
  milo: {
    slug: "milo",
    eyebrowNum: "02",
    category: "Portfolio de photographie",
    year: "2025",
    titleSegs: [
      { t: "Milo Weiler — témoin de la " },
      { t: "beauté de la vie.", scramble: true, accent: true },
    ],
    lede:
      "Un portfolio cinématographique pour un photographe belge de plateau, de portrait & corporate — 55 projets répartis sur sept chapitres, tenus ensemble par un écrin sombre et une navigation de chapitres collante.",
    liveHref: "https://miloweiler.com",
    meta: {
      role: "Design & développement",
      year: "2025",
      sector: "Portfolio · Arts",
      stack: ["Next.js", "Sanity", "Figma"],
    },
    heroImg: "/work/milo-hero.jpg",
    heroAlt: "Milo Weiler — hero du portfolio photographique cinématographique",
    metaTitle: "Milo Weiler — Étude de cas",
    metaDescription:
      "Un portfolio sombre et cinématographique pour un photographe belge — 55 projets sur sept chapitres, navigation de chapitres collante, trilingue EN · NL · FR, scores Lighthouse au sommet.",
    sections: [
      {
        kind: "quote",
        quote: [
          { t: "Un corpus d’œuvres, pas une grille de vignettes — le site doit se lire comme un " },
          { t: "livre de chapitres", accent: true },
          { t: ", chacun avec sa propre voix." },
        ],
        cite: "// le brief, en une ligne",
      },
      {
        kind: "twoColFeature",
        head: {
          eyebrow: "Le brief",
          title: "Un corpus d’œuvres, pas une grille de vignettes.",
        },
        paras: [
          [
            {
              t: "La pratique de Milo navigue entre numérique et argentique, documentaire et mise en scène. Une galerie plate aplatirait toute cette amplitude. Au lieu de cela, le site se lit comme un ",
            },
            { t: "livre de chapitres", b: true },
            {
              t: " — Plateau, Corporate & Marque, Événements, Portraits, Produit & Food, Beaux-arts — chacun avec sa propre voix.",
            },
          ],
          [
            { t: "Un " },
            { t: "écrin sombre et cinématographique", b: true },
            {
              t: " laisse la photographie rayonner, tandis qu’une navigation de chapitres collante vous garde orienté à travers 55 projets. Trilingue EN · NL · FR, avec de solides scores Lighthouse sur un site profondément riche en images.",
            },
          ],
        ],
        features: [
          {
            k: "[ sectioned_scroll ]",
            b: "Défilement par chapitres",
            p: "Sept sections avec une navigation collante qui suit où vous êtes à mesure que vous parcourez le travail.",
          },
          {
            k: "[ headless_cms ]",
            b: "Galeries gérées dans Sanity",
            p: "55 projets, légendes et ordre — tout éditable par Milo, sans déploiement.",
          },
          {
            k: "[ performance ]",
            b: "Rapide malgré les images",
            p: "Un chargement d’images responsive et différé garde un site riche en médias rapide et sans décalage CLS.",
          },
          {
            k: "[ i18n ]",
            b: "EN · NL · FR",
            p: "Trois langues, routing et métadonnées localisés de bout en bout.",
          },
        ],
      },
      {
        kind: "signature",
        demo: "miloRail",
        head: {
          eyebrow: "Build signature",
          title: "Le rail de chapitres collant",
          intro:
            "Une navigation qui se comporte à la fois comme une table des matières et comme une position de défilement. Choisissez un chapitre — la scène et l’index répondent, comme le site en ligne réagit quand vous défilez. Essayez :",
        },
        label: "ChapterNav.tsx",
        note: "composant en direct",
      },
      {
        kind: "chapterIndex",
        head: {
          eyebrow: "Architecture",
          title: "Sept chapitres, un seul écrin cinématographique",
          intro:
            "55 projets n’ont pas leur place dans une grille plate. Ils sont triés en sept corpus d’œuvres, chacun avec sa propre voix — le rail collant suit où vous êtes à mesure que vous les parcourez.",
        },
        chapters: [
          { cn: "01", ct: "Photographie de plateau", cd: "Clips, cinéma, théâtre & publicités" },
          { cn: "02", ct: "Corporate & Marque", cd: "Campagnes, portraits d’équipe, coulisses" },
          { cn: "03", ct: "Événements & Documentaires", cd: "Des scènes de concert aux salles de conférence" },
          { cn: "04", ct: "Portraits & Headshots", cd: "Acteurs, musiciens & corporate, numérique et argentique" },
          { cn: "05", ct: "Produit & Food", cd: "Design, texture et intention à travers la lumière" },
          { cn: "06", ct: "Beaux-arts", cd: "Explorations entre documentaire & mise en scène" },
          { cn: "07", ct: "Travaux personnels", cd: "Retracer le contexte qui façonne un instant" },
        ],
      },
      {
        kind: "gallery",
        head: { eyebrow: "Galerie", title: "À travers les chapitres" },
        items: [
          { id: "milo-g1", span: "tall", alt: "Photographie de plateau" },
          { id: "milo-g2", span: "wide", alt: "Page d’accueil de chapitre" },
          { id: "milo-g3", span: "half", alt: "Portraits" },
          { id: "milo-g4", span: "half", alt: "Beaux-arts" },
        ],
      },
    ],
    signatureData: {
      // `rail` = the short label on the rail button (prototype rail markup);
      // `t` = the caption heading shown in the stage (prototype data[] array).
      miloRail: [
        {
          rail: "Photographie de plateau",
          t: "Photographie de plateau",
          p: "Là où l’art et la narration se rencontrent — des instants de clips, de cinéma, de théâtre et de publicités à travers la Belgique et au-delà.",
        },
        {
          rail: "Corporate & Marque",
          t: "Corporate & Marque",
          p: "Une entreprise, c’est plus que son produit. Campagnes de marque, portraits d’équipe et coulisses pour des entreprises en Belgique et aux Pays-Bas.",
        },
        {
          rail: "Événements & Docs",
          t: "Événements & Documentaires",
          p: "Des scènes de concert aux salles de conférence — documenter les événements tels qu’ils se déroulent, les instants authentiques plutôt que posés.",
        },
        {
          rail: "Portraits",
          t: "Portraits & Headshots",
          p: "Le portrait comme prolongement de l’histoire de quelqu’un — des headshots professionnels pour acteurs, musiciens et clients corporate, en numérique et en argentique.",
        },
        {
          rail: "Produit & Food",
          t: "Produit & Food",
          p: "Chaque objet façonné raconte une histoire de design, de texture et d’intention — traduite par la lumière, la forme et la surface.",
        },
        {
          rail: "Beaux-arts",
          t: "Beaux-arts & Personnel",
          p: "Des explorations continues entre approches documentaire et dirigée, retraçant le contexte invisible qui façonne un instant.",
        },
      ],
    },
  },

  // ── 03 · YWdesign v1 ────────────────────────────────────────────────────
  ywdesign: {
    slug: "ywdesign",
    eyebrowNum: "03",
    category: "Site de studio · Version précédente",
    year: "2023",
    titleSegs: [
      { t: "YWdesign v1 — votre " },
      { t: "partenaire digital.", scramble: true, accent: true },
    ],
    lede:
      "Le premier site du studio YWdesign : des panneaux en verre dépoli flottant sur un dégradé bleu-turquoise mouvant, une grille de services, une feuille de route entièrement transparente et un tunnel de devis. Pensé pour qu’un studio d’une personne inspire la confiance d’un vrai partenaire.",
    liveHref: "https://ywdesign2.netlify.app/fr",
    meta: {
      role: "Marque, design & développement",
      year: "2023",
      sector: "Studio web · Freelance",
      stack: ["Next.js", "Tailwind CSS", "Sanity", "Framer Motion"],
    },
    heroImg: "/work/ywdesign-hero.jpg",
    heroAlt: "Accueil de YWdesign v1 — « Your Digital Partner » sur un dégradé bleu-turquoise avec une navigation en verre",
    metaTitle: "YWdesign v1 — Étude de cas",
    metaDescription:
      "L’ancien site du studio YWdesign : un design system glassmorphism en Tailwind, une grille de fonctionnalités aux icônes sur mesure, une feuille de route transparente étape par étape et une version EN · FR.",
    sections: [
      {
        kind: "twoColFeature",
        head: {
          eyebrow: "Le brief",
          title: "Faire d’un studio d’une personne un vrai partenaire.",
        },
        paras: [
          [
            { t: "Qui engage un freelance s’inquiète d’une chose : " },
            { t: "ce qui se passe après la mise en ligne", b: true },
            {
              t: ". Le site devait y répondre avant même la question — des services clairs, un processus visible et une ligne directe vers une vraie personne.",
            },
          ],
          [
            { t: "Le style portait le message : " },
            { t: "du verre léger, en couches", b: true },
            {
              t: ", sur un dégradé vivant. Rien de lourd, tout reste lisible, et chaque panneau devient une petite fenêtre sur la marque.",
            },
          ],
        ],
        features: [
          {
            k: "[ glass_system ]",
            b: "Des panneaux dépolis, une seule recette",
            p: "Du blanc à 10 % d’opacité, un flou d’arrière-plan, une bordure fine et une ombre douce — la même recette Tailwind pour la navigation, les cartes, le pied de page et les boutons.",
          },
          {
            k: "[ feature_icons ]",
            b: "Six promesses, six icônes",
            p: "Responsive, animations, performances, UX/UI, CMS et référencement — chacune avec son icône sur mesure et une promesse en deux lignes.",
          },
          {
            k: "[ roadmap ]",
            b: "Un processus visible",
            p: "De la définition du projet à la maintenance, chaque étape est dessinée pour que le prix et le calendrier ne surprennent jamais.",
          },
          {
            k: "[ i18n ]",
            b: "EN · FR",
            p: "Un routage et des textes bilingues pour des clients en Belgique, en France et en Suisse.",
          },
        ],
      },
      {
        kind: "signature",
        demo: "ywGlass",
        head: {
          eyebrow: "Réalisation phare",
          title: "Ce qui fait un meilleur site web",
          intro:
            "La grille de fonctionnalités de l’ancienne page services, reconstruite en CSS pur : des cartes dépolies sur un dégradé mouvant, des colonnes décalées, un léger soulèvement et une bordure qui pulse au survol. Désactivez le verre pour voir ce que fait le flou.",
        },
        label: "components/FeatureCard.jsx",
        note: "survoler · activer le verre",
      },
      {
        kind: "approach",
        head: {
          eyebrow: "Comment ça convertit",
          title: "La transparence comme argument",
          intro:
            "La page de la méthode fait la vente : chaque étape, du premier rendez-vous à la livraison, est exposée — la demande de devis devient l’étape naturelle suivante.",
        },
        steps: [
          {
            sn: "01 / définition & contrat",
            h: "Portée, calendrier, budget",
            p: "Le premier rendez-vous fixe les objectifs et les ressources ; une proposition de contrat suit avant tout travail.",
          },
          {
            sn: "02 / idéation & itération",
            h: "Deux tours, puis le code",
            p: "Valeurs, image de marque et préférences deviennent des idées, puis deux itérations sur la structure et le design avant validation.",
          },
          {
            sn: "03 / livraison & maintenance",
            h: "Tout le code vous appartient",
            p: "Le produit fini est livré dans son intégralité, avec un plan de maintenance pour le garder en bonne santé.",
          },
        ],
      },
      {
        kind: "quote",
        quote: [
          { t: "Une pomme par jour éloigne le médecin. " },
          { t: "Un plan de maintenance", accent: true },
          { t: " est essentiel à la santé de votre produit." },
        ],
        cite: "// YWdesign v1 — la feuille de route, dernière étape",
      },
      {
        kind: "gallery",
        head: { eyebrow: "Galerie", title: "À travers le site" },
        items: [
          { id: "ywdesign-g1", span: "wide", alt: "Projets — travaux récents sous une barre de navigation en verre et un bandeau de compétences" },
          { id: "ywdesign-g2", span: "tall", alt: "Grille de fonctionnalités — six cartes en verre aux icônes sur mesure" },
          { id: "ywdesign-g3", span: "half", alt: "Méthode — la collaboration visualisée étape par étape" },
          { id: "ywdesign-g4", span: "half", alt: "À propos — « Hi, I am Yolan »" },
        ],
      },
    ],
    signatureData: {
      ywGlass: {
        toggle: "Verre",
        cards: [
          { t: "Responsive", d: "Une belle mise en page sur toutes les tailles d’écran." },
          { t: "Animations", d: "Des interactions dynamiques qui donnent vie à votre site web." },
          { t: "Performances", d: "Racontez votre histoire avec des technologies rapides." },
          { t: "Axé sur l’UX/UI", d: "Les utilisateurs apprécient un design léger et facile à utiliser." },
          { t: "CMS", d: "Gérez vous-même le contenu de votre site web." },
          { t: "Référencement", d: "Atteignez de nouveaux clients de manière organique." },
        ],
      },
    },
  },

  // ── 04 · Bermuda Events ─────────────────────────────────────────────────
  bermuda: {
    slug: "bermuda",
    eyebrowNum: "04",
    category: "Agence événementielle · Belgique",
    year: "2025",
    titleSegs: [
      { t: "Bermuda Events — perdez-vous dans l’" },
      { t: "expérience.", scramble: true, accent: true },
    ],
    lede:
      "Un site de marque premium pour une agence événementielle anversoise — mettre en scène les productions passées à grande échelle, bâtir la crédibilité par la seule qualité de production, et canaliser les bons prospects dans un parcours de contact sur mesure.",
    liveHref: "https://bermuda-events.be",
    meta: {
      role: "Design & développement",
      year: "2025",
      sector: "Événementiel · Agence",
      stack: ["Next.js", "Sanity", "i18n"],
    },
    heroImg: "/work/bermuda-hero.jpg",
    heroAlt: "Bermuda Events — hero d’agence événementielle premium",
    metaTitle: "Bermuda Events — Étude de cas",
    metaDescription:
      "Un site de marque premium pour une agence événementielle anversoise — des productions passées mises en scène à grande échelle, un motif « Get Lost In » et un tunnel de contact conçu pour qualifier les bons prospects. NL · EN.",
    sections: [
      {
        kind: "twoColFeature",
        head: {
          eyebrow: "Le brief",
          title: "Vendre une expérience qu’on ne peut pas mettre dans une photo produit.",
        },
        paras: [
          [
            {
              t: "Bermuda est une agence événementielle de Berchem où la créativité est sans limites et chaque événement un nouveau concept. Le site devait transmettre une ",
            },
            { t: "émotion", b: true },
            {
              t: " — atmosphère, échelle, confiance — et la convertir ensuite en demandes qualifiées.",
            },
          ],
          [
            { t: "Le build s’appuie sur un " },
            { t: "motif « Get Lost In »", b: true },
            {
              t: " — Créativité, Détails, Personnalité — des productions passées mises en scène à l’échelle premium, et un tunnel de contact conçu pour qualifier plutôt que simplement collecter. Construit bilingue NL · EN.",
            },
          ],
        ],
        features: [
          {
            k: "[ brand_motion ]",
            b: "Système de titres « Get Lost In »",
            p: "Un hero à mot rotatif qui recadre le pitch — créativité, détails, personnalité — sans recharger l’attention.",
          },
          {
            k: "[ premium_scale ]",
            b: "Productions mises en scène à grande échelle",
            p: "Les événements passés montrés en grand et en cinémascope — l’atmosphère et l’ambition vendent avant le moindre mot de copy.",
          },
          {
            k: "[ lead_funnel ]",
            b: "Parcours de contact qualifiant",
            p: "Un tunnel de contact construit pour faire émerger les bons briefs, pas un simple formulaire générique.",
          },
          {
            k: "[ i18n ]",
            b: "NL · EN",
            p: "Contenu et routing localisés pour un public belge.",
          },
        ],
      },
      {
        kind: "signature",
        demo: "bermudaIcons",
        head: {
          eyebrow: "Build signature",
          title: "Le jeu d’icônes « Get Lost In »",
          intro:
            "Trois icônes SVG sur mesure — Créativité, Détail, Personnalité — chacune animée à la main pour se métamorphoser au fil de l’exploration. Survolez ou touchez une carte pour la voir se transformer. C’est le vrai composant, porté depuis le site en ligne.",
        },
        label: "components/Feature.jsx",
        note: "survoler pour métamorphoser",
      },
      {
        kind: "approach",
        head: {
          eyebrow: "Comment ça convertit",
          title: "L’émotion d’abord, puis le tunnel",
          intro:
            "Vendre une expérience qu’on ne peut pas mettre dans une photo produit, c’est mener par l’atmosphère — puis transformer cet intérêt en la bonne demande.",
        },
        steps: [
          {
            sn: "01 / positioning",
            h: "Cadrer l’émotion",
            p: "Des productions passées montrées à l’échelle premium, pour que l’atmosphère et l’ambition vendent avant le moindre mot de copy.",
          },
          {
            sn: "02 / proof",
            h: "L’ancrer dans le travail",
            p: "Les productions passées, montrées à l’échelle premium, transforment le pitch en preuve — le portfolio est la crédibilité.",
          },
          {
            sn: "03 / funnel",
            h: "Qualifier, pas collecter",
            p: "Un parcours de contact conçu pour faire émerger les bons briefs — pas pour amasser une boîte de plus d’e-mails génériques.",
          },
        ],
      },
      {
        kind: "quote",
        quote: [
          { t: "Perdez-vous dans la " },
          { t: "créativité, les détails et la personnalité", accent: true },
          { t: " — un nouveau concept à votre désir, à chaque fois." },
        ],
        cite: "// Bermuda Events — la signature de marque, intégrée au hero",
      },
      {
        kind: "gallery",
        head: { eyebrow: "Galerie", title: "À travers le site" },
        items: [
          { id: "bermuda-g1", span: "wide", alt: "Hero / événements" },
          { id: "bermuda-g2", span: "tall", alt: "À propos" },
          { id: "bermuda-g3", span: "half", alt: "Réseau / équipe" },
          { id: "bermuda-g4", span: "half", alt: "Tunnel de contact" },
        ],
      },
    ],
    signatureData: {
      bermudaIcons: {
        gl: "Perdez-vous dans",
        cards: [
          { t: "Créativité", sub: "Un nouveau concept selon vos envies. À chaque fois." },
          { t: "Détail", sub: "Rien n’est laissé au hasard. Chaque détail est pensé." },
          { t: "Personnalité", sub: "La même personne, toujours là pour vous." },
        ],
        noteH: "Pourquoi il est recoloré ici",
        note: [
          { t: "En ligne, Bermuda vit dans sa propre identité aux tons de terre — argile, sable, olive. Pour cette étude de cas, j’ai remappé exactement la même métamorphose sur le système du portfolio : " },
          { t: "une encre neutre", accent: true },
          { t: " au repos, qui passe en plein contraste au focus, la forme focale se résolvant dans l’" },
          { t: "accent", accent: true },
          { t: ". La géométrie est intacte — seule la palette passe en noir / blanc / accent pour que le composant s’intègre au site au lieu de le combattre." },
        ],
      },
    },
  },

  // ── 05 · Milo Weiler — Analogique ───────────────────────────────────────
  analoog: {
    slug: "analoog",
    eyebrowNum: "05",
    category: "Photographie argentique · Belgique",
    year: "2026",
    titleSegs: [
      { t: "Milo Weiler Analogique — fait pour être " },
      { t: "transmis.", scramble: true, accent: true },
    ],
    lede:
      "Un site de services éditorial et posé pour la photographie argentique fine art — funérailles, portraits de caractère et mariages en moyen format. Conçu pour ralentir le visiteur, gagner sa confiance pour les jours les plus délicats d’une vie, et en faire une première conversation.",
    liveHref: "https://analoog.miloweiler.com/fr",
    meta: {
      role: "Design & développement",
      year: "2026",
      sector: "Photographie · Services",
      stack: ["Next.js", "Sanity", "i18n"],
    },
    heroImg: "/work/analoog-hero.jpg",
    heroAlt: "Milo Weiler Analogique — hero à empattements « Analoog gemaakt om door te geven »",
    metaTitle: "Milo Weiler Analogique — Étude de cas",
    metaDescription:
      "Un site de services éditorial pour un photographe argentique à Anvers & Bruxelles — reportage funéraire, portraits de caractère et mariages en moyen format, un parcours en quatre étapes et un build trilingue NL · EN · FR.",
    sections: [
      {
        kind: "twoColFeature",
        head: {
          eyebrow: "Le brief",
          title: "Vendre la lenteur dans un monde fait pour scroller.",
        },
        paras: [
          [
            {
              t: "Milo photographie au Mamiya RB67 — du film moyen format, chaque image pesée. Le site devait faire ressentir cette ",
            },
            { t: "intention", b: true },
            {
              t: " avant même d’être lu : des tons de papier chauds, une serif classique, beaucoup d’air et des images qui arrivent une à une.",
            },
          ],
          [
            { t: "Le plus délicat était le ton. Un " },
            { t: "service funéraire", b: true },
            {
              t: " côtoie portraits et mariages : chaque ligne devait être calme, respectueuse et claire sur le prix et le parcours — rassurer d’abord, vendre ensuite.",
            },
          ],
        ],
        features: [
          {
            k: "[ editorial_pacing ]",
            b: "Un scroll qui ralentit",
            p: "Des titres lettre par lettre, une vitrine encadrée qui s’ouvre en plein écran et des cartes de services empilées qui se lisent comme les pages d’un album.",
          },
          {
            k: "[ three_services ]",
            b: "Un adieu · Un visage · Une promesse",
            p: "Reportage funéraire, portraits de caractère et mariages analogiques — chacun avec sa promesse, son objet livré et sa page dédiée.",
          },
          {
            k: "[ headless_cms ]",
            b: "Contenu géré dans Sanity",
            p: "Services, images et textes modifiables par Milo en trois langues, sans déploiement.",
          },
          {
            k: "[ i18n ]",
            b: "NL · EN · FR",
            p: "Routing et métadonnées localisés pour un public belge, dans les trois langues.",
          },
        ],
      },
      {
        kind: "approach",
        head: {
          eyebrow: "Comment ça convertit",
          title: "Du premier échange à l’œuvre en main",
          intro:
            "La section parcours lève chaque hésitation : un seul interlocuteur, un prix fixé d’avance, le même chemin simple pour chaque service.",
        },
        steps: [
          {
            sn: "01 / acquaintance",
            h: "Un appel sans engagement",
            p: "Par téléphone ou en personne — le site mène directement à un numéro, pas à un formulaire à remplir un jour difficile.",
          },
          {
            sn: "02 / booking & sitting",
            h: "Prix clair, journée sereine",
            p: "Date, ampleur et prix fixés d’avance ; le jour venu, Milo arrive en douceur, sur film, et laisse la journée se dérouler.",
          },
          {
            sn: "03 / the piece",
            h: "Relié à la main",
            p: "Développé, sélectionné et relié à la main — livré en quatre à huit semaines. L’objet est le produit, et le site le dit.",
          },
        ],
      },
      {
        kind: "quote",
        quote: [
          { t: "Pas un instantané numérique éphémère, mais " },
          { t: "une image tangible, faite à la main", accent: true },
          { t: " — pour être transmise aux générations qui suivent." },
        ],
        cite: "// Milo Weiler — la philosophie, colonne vertébrale du site",
      },
      {
        kind: "gallery",
        head: { eyebrow: "Galerie", title: "À travers le site" },
        items: [
          { id: "analoog-g1", span: "wide", alt: "Vitrine plein écran — « Analoog blijft. »" },
          { id: "analoog-g2", span: "tall", alt: "Section philosophie avec une image argentique noir et blanc" },
          { id: "analoog-g3", span: "half", alt: "Parcours en quatre étapes — rencontre, réservation, séance, l’œuvre" },
          { id: "analoog-g4", span: "half", alt: "Vitrine encadrée d’un portrait moyen format" },
        ],
      },
    ],
  },
} satisfies Record<Slug, Project>;
