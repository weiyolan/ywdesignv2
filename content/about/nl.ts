// NL about copy — Dutch (Belgian/Flemish).
import type { Seg } from "@/content/home";
import type { ContactData } from "@/components/shared/ContactBlock";
import type { Fact, SkillChip, ValueItem, Stat, About } from "./en";

export const aboutNL = {
  hero: {
    eyebrow: "Over · Yolan Weiler · Lyon, FR",
    h1: [
      { t: "Hallo, ik ben" },
      { t: "Yolan.", scramble: true, accent: true },
    ] as Seg[],
    lede: [
      { t: "Een gepassioneerde " },
      { t: "biomedisch ingenieur", b: true },
      { t: " en surfer, die een " },
      { t: "wereldwijde positieve impact", b: true },
      { t: " wil maken — één snelle, doordachte website per keer." },
    ] as Seg[],
    facts: [
      { k: "Standplaats", v: "Lyon, FR" },
      { k: "Opleiding", v: "Biomedische ingenieurswetenschappen" },
      { k: "Methode", v: "PRINCE2 · tot in de code" },
      { k: "Naast het scherm", v: "In het water, aan het surfen" },
    ] as Fact[],
    portraitTag: "// getekend in code · geen foto",
  },

  aboutMe: {
    tk: "01",
    eyebrow: "Een beetje over mij",
    narrative: [
      [
        { t: "Ik ben een open en ambitieus iemand die elke uitdaging aangrijpt als een kans om bij te leren. Ik werk graag met mensen — en ik haal meestal het beste uit iedereen rondom mij." },
      ],
      [
        { t: "Luisteren en plannen zijn wat me toelaat om " },
        { t: "een team vooruit te trekken", b: true },
        { t: ", richting resultaten die samen blijven verbeteren. Het is hetzelfde instinct dat ik in een build leg: eerst grondig begrijpen, dan handelen." },
      ],
    ] as Seg[][],
    skills: {
      label: "// wat ik op tafel breng",
      chips: [
        { label: "Computerwetenschappen", hot: true },
        { label: "Biomedische ingenieurswetenschappen", hot: true },
        { label: "PRINCE2" },
        { label: "Projectmanagement" },
        { label: "Digitale strategie" },
        { label: "Grafisch ontwerp" },
        { label: "SEO-optimalisatie" },
        { label: "Storytelling" },
        { label: "Leiderschap" },
        { label: "Communicatie" },
        { label: "Aanpassingsvermogen" },
        { label: "Luisteren" },
      ] as SkillChip[],
    },
  },

  mission: {
    tk: "02",
    eyebrow: "Missie",
    heading: ["Een positieve impact op de planeet", "en op de mensen erop."],
    p: [
      { t: "Ik wil mijn passie voor " },
      { t: "grafisch ontwerp", accent: true },
      { t: " en " },
      { t: "computerwetenschappen", accent: true },
      { t: " gebruiken om velen te inspireren en te motiveren. Door digitale tools te bouwen die het internet benutten, kunnen meer mensen de ideeën begrijpen die de wereld zullen veranderen." },
    ] as Seg[],
  },

  vision: {
    tk: "03",
    eyebrow: "Visie",
    title: ["Alles begint", "met een visie."],
    intro: "Vier waarden waarmee ik bouw en werk — op het scherm en daarbuiten.",
    values: [
      { n: "01", h: "Impact", p: "Impact hebben is je ideeën delen — en velen ze écht laten begrijpen." },
      { n: "02", h: "Excellentie", p: "Slagen in wat je ook doet, is openstaan om jezelf te blijven verbeteren." },
      { n: "03", h: "Luisteren", p: "Grote overwinningen worden gedeeld — alleen behaald wanneer je je oren opent en luistert." },
      { n: "04", h: "Leren", p: "Op weg naar begrip moet je je losmaken van de waarden die jouw realiteit hebben gevormd." },
    ] as ValueItem[],
  },

  numbers: {
    tk: "04",
    eyebrow: "Cijfers",
    title: ["Meten om", "impact te sturen."],
    intro: "Waarom het web ertoe doet — en waarom het de moeite waard is om het goed te doen.",
    stats: [
      { value: 3, suffix: "x", label: "Zet je merk online", p: "Groei van de detailhandelsverkoop via e-commerce wereldwijd sinds 2015." },
      { value: 58, suffix: "%", label: "Heb een responsieve site", p: "Aandeel van het wereldwijde websiteverkeer via mobiele toestellen." },
      { value: 92, suffix: "%", label: "Optimaliseer je SEO", p: "Internetzoekopdrachten wereldwijd die via de zoekmachine van Google verlopen." },
    ] as Stat[],
  },

  contact: {
    eyebrow: "Contact",
    title: [
      [{ t: "Laten we iets bouwen" }],
      [{ t: "dat de " }, { t: "moeite waard is.", em: true, scramble: true }],
    ],
    p: "Heb je een idee, een merk of een site die sneller vooruit moet? Vertel me wat je in gedachten hebt — ik vertel je hoe ik het zou bouwen.",
    ctas: [
      { label: "Start een project", href: "mailto:contact@ywdesign.co?subject=Project", variant: "primary", arrow: "→" },
      { label: "WhatsApp", href: "https://wa.me/32471124525", variant: "ghost", external: true },
    ],
  } as ContactData,
} satisfies About;
