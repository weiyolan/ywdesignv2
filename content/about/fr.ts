// FR about copy — full French translation, mirroring `about` in en.ts.
import type { Seg } from "@/content/home";
import type { ContactData } from "@/components/shared/ContactBlock";
import type { Fact, SkillChip, ValueItem, Stat, About } from "./en";

export const aboutFR = {
  hero: {
    eyebrow: "À propos · Yolan Weiler · Lyon, FR",
    h1: [
      { t: "Bonjour, je suis" },
      { t: "Yolan.", scramble: true, accent: true },
    ] as Seg[],
    lede: [
      { t: "Un " },
      { t: "ingénieur biomédical", b: true },
      { t: " passionné et surfeur, déterminé à avoir un " },
      { t: "impact positif mondial", b: true },
      { t: " — un site web rapide et réfléchi à la fois." },
    ] as Seg[],
    facts: [
      { k: "Basé à", v: "Lyon, FR" },
      { k: "Formation", v: "Ingénierie biomédicale" },
      { k: "Méthode", v: "PRINCE2 · au cœur du code" },
      { k: "Hors écran", v: "Dans l’eau, à surfer" },
    ] as Fact[],
    portraitTag: "// dessiné en code · pas une photo",
  },

  aboutMe: {
    tk: "01",
    eyebrow: "Un petit mot sur moi",
    narrative: [
      [
        { t: "Je suis une personne ouverte d’esprit et ambitieuse, qui voit dans chaque défi une occasion d’apprendre. J’adore travailler avec les gens — et j’ai tendance à révéler le meilleur de chacun autour de moi." },
      ],
      [
        { t: "L’écoute et la planification sont ce qui me permet de " },
        { t: "faire avancer une équipe", b: true },
        { t: ", vers des résultats qui ne cessent de s’améliorer, ensemble. C’est le même instinct que j’apporte à un projet : comprendre en profondeur, puis avancer." },
      ],
    ] as Seg[][],
    skills: {
      label: "// ce que j’apporte",
      chips: [
        { label: "Informatique", hot: true },
        { label: "Ingénierie biomédicale", hot: true },
        { label: "PRINCE2" },
        { label: "Gestion de projet" },
        { label: "Stratégie digitale" },
        { label: "Design graphique" },
        { label: "Optimisation SEO" },
        { label: "Storytelling" },
        { label: "Leadership" },
        { label: "Communication" },
        { label: "Adaptabilité" },
        { label: "Écoute" },
      ] as SkillChip[],
    },
  },

  mission: {
    tk: "02",
    eyebrow: "Mission",
    heading: ["Un impact positif sur la planète", "et sur celles et ceux qui l’habitent."],
    p: [
      { t: "Je veux mettre ma passion pour le " },
      { t: "design graphique", accent: true },
      { t: " et l’" },
      { t: "informatique", accent: true },
      { t: " au service de l’inspiration et de la motivation du plus grand nombre. En créant des outils numériques qui tirent parti d’internet, davantage de personnes peuvent comprendre les idées qui changeront le monde." },
    ] as Seg[],
  },

  vision: {
    tk: "03",
    eyebrow: "Vision",
    title: ["Tout commence", "par une vision."],
    intro: "Quatre valeurs qui guident ma façon de créer et de travailler — sur l’écran comme en dehors.",
    values: [
      { n: "01", h: "Impact", p: "Avoir de l’impact, c’est partager ses idées — et faire en sorte que le plus grand nombre les comprenne vraiment." },
      { n: "02", h: "Excellence", p: "Réussir tout ce que l’on entreprend, c’est rester ouvert d’esprit quant à sa propre amélioration." },
      { n: "03", h: "Écoute", p: "Les grandes victoires se partagent — elles ne s’obtiennent qu’en ouvrant les oreilles et en écoutant." },
      { n: "04", h: "Apprentissage", p: "Sur le chemin de la compréhension, il faut se libérer des valeurs qui ont façonné notre réalité." },
    ] as ValueItem[],
  },

  numbers: {
    tk: "04",
    eyebrow: "Chiffres",
    title: ["Mesurer pour", "générer de l’impact."],
    intro: "Pourquoi le web compte — et pourquoi il vaut la peine d’être bien fait.",
    stats: [
      { value: 3, suffix: "x", label: "Mettez votre marque en ligne", p: "Croissance des ventes au détail via l’e-commerce dans le monde depuis 2015." },
      { value: 58, suffix: "%", label: "Ayez un site responsive", p: "Part du trafic web mondial provenant des appareils mobiles." },
      { value: 92, suffix: "%", label: "Optimisez votre SEO", p: "Recherches sur internet dans le monde passant par le moteur de recherche de Google." },
    ] as Stat[],
  },

  contact: {
    eyebrow: "Contact",
    title: [
      [{ t: "Construisons" }],
      [{ t: "quelque chose " }, { t: "qui en vaut la peine.", em: true, scramble: true }],
    ],
    p: "Une idée, une marque ou un site qui doit aller plus vite ? Dites-moi ce que vous avez en tête — je vous dirai comment je le construirais.",
    ctas: [
      { label: "Démarrer un projet", href: "mailto:contact@ywdesign.co?subject=Project", variant: "primary", arrow: "→" },
      { label: "WhatsApp", href: "https://wa.me/32471124525", variant: "ghost", external: true },
    ],
  } as ContactData,
} satisfies About;
