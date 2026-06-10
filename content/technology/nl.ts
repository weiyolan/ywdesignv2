// NL technology copy — Dutch (Belgian/Flemish) translation, mirrors en.ts.
import type { Seg } from "@/content/home";
import type { ContrastCol, RenderStrat, StudioType, TechSection, RecapItem, Technology } from "./en";

const nbsp = " ";

export const technologyNL = {
  hero: {
    kicker: { pre: "//", mid: "De technologie · in detail ·", year: "2026" },
    // "Geen WordPress.<br>Enkel code op maat." (accent run scrambles)
    h1: [
      { t: "Geen WordPress." },
      { t: "Enkel " },
      { t: "code" + nbsp + "op" + nbsp + "maat.", scramble: true, accent: true },
    ] as Seg[],
    lede: [
      { t: "Geen page builders, geen wildgroei aan plugins, geen thema om tegen te vechten. Elke site is een handgebouwde applicatie op een moderne stack die ik diep genoeg ken om te plooien naar mijn hand. Dit is " },
      { t: "precies", b: true },
      { t: " wat er onder de motorkap draait — en waarom elk onderdeel zijn plaats verdient." },
    ] as Seg[],
    contrast: [
      {
        tone: "bad",
        ct: "De templateroute",
        h: "WordPress & page builders",
        items: [
          "Pluginstacks die je niet beheert of begrijpt",
          "Opgeblazen markup, trage Core Web Vitals",
          "Een aanvalsoppervlak dat constant patches vraagt",
          "Design ingeperkt door andermans thema",
        ],
      },
      {
        tone: "good",
        ct: "Hoe ik bouw",
        h: "Code op maat",
        items: [
          "Elke regel door mij geschreven, gelezen en beheerd",
          "Afgestemd op Lighthouse, snel van bij de bouw",
          "Dichtgetimmerd van bij het ontwerp — geen pluginloterij",
          "Pixelnauwkeurig design zonder compromis",
        ],
      },
    ] as ContrastCol[],
  },

  // The six deep sections, in render order.
  sections: [
    {
      demo: "next",
      mark: "N",
      role: "framework · het fundament",
      since: "Vercel · 2016 · elke site draait erop",
      h: [{ t: "Next.js — " }, { t: "SSR & SEO", accent: true }, { t: ", ingebouwd." }],
      desc: [
        { t: "Elke site is een Next.js-app. Pagina's renderen " },
        { t: "op de server", b: true },
        { t: " zodat de browser — en de crawler van Google — meteen volledige HTML krijgen, en daarna enkel de interactieve delen hydrateren. Ik kies de renderstrategie per route: statisch waar het kan, dynamisch waar het moet." },
      ],
      points: [
        "App Router & Server Components",
        "SSG · ISR · SSR per route",
        "next/image-optimalisatie",
        "Native i18n-routing",
        "Metadata & gestructureerde data",
        "Edge-deployment op Vercel",
      ],
    },
    {
      demo: "sanity",
      mark: "S",
      role: "headless cms · content",
      since: "Sanity.io · de klant beheert het zelf",
      h: [{ t: "Sanity — een " }, { t: "dashboard", accent: true }, { t: " gebouwd rond de klant." }],
      desc: [
        { t: "Content leeft in een Sanity Studio die ik per klant op maat maak — volledig losgekoppeld van de front-end. Redacteurs werken producten, artikels en beeldmateriaal bij in een realtime-interface; ik bevraag exact de vorm die elke pagina nodig heeft met GROQ. " },
        { t: "Geen ontwikkelaar nodig voor de dagelijkse aanpassingen.", b: true },
      ],
    },
    {
      demo: "gsap",
      mark: "G",
      role: "animatie · de bewegingslaag",
      since: "GreenSock (GSAP) · industriestandaard",
      h: [{ t: "GSAP — beweging op een " }, { t: "tijdlijn", accent: true }, { t: "." }],
      desc: [
        { t: "Elke reveal, scrollhoofdstuk en hover-accent draait op GSAP. " },
        { t: "ScrollTrigger", b: true },
        { t: " koppelt animatie aan de scrollpositie en pint sticky secties vast; " },
        { t: "Draggable", b: true },
        { t: " en " },
        { t: "MorphSVG", b: true },
        { t: " maken vectorvormen grijpbaar en vormveranderlijk. Het is het verschil tussen een site die laadt en een site die " },
        { t: "beweegt", b: true },
        { t: " — binnen het performancebudget, nooit gratuit." },
      ],
      points: [
        "ScrollTrigger-scènes",
        "Opeenvolgende tijdlijnen",
        "Draggable-interacties",
        "MorphSVG-vormtweens",
        "Enkel GPU-transforms",
        "Bewust van reduced-motion",
      ],
    },
    {
      demo: "react",
      rev: true,
      mark: "R",
      role: "ui-library · componenten",
      since: "Ontstaan bij Facebook (Meta) · 2013",
      h: [{ t: "React — het " }, { t: "component", accent: true }, { t: "model." }],
      desc: [
        { t: "Geboren bij Facebook in 2013, is React de manier waarop de volledige UI gebouwd wordt: kleine, samenstelbare stukken state-gestuurde interface. Schrijf een component één keer, hergebruik het overal, en de weergave weerspiegelt altijd de data. " },
        { t: "Het is de laag waar al de rest op aansluit.", b: true },
      ],
      points: [
        "Samenstelbare componenten",
        "Declaratieve, state-gestuurde UI",
        "Hooks voor herbruikbare logica",
        "Enorm, beproefd ecosysteem",
      ],
    },
    {
      demo: "ts",
      mark: "TS",
      role: "taal · typeveiligheid",
      since: "Microsoft · 2012 · JavaScript dat schaalt",
      h: [{ t: "TypeScript — " }, { t: "fouten gevangen", accent: true }, { t: " voor ze live gaan." }],
      desc: [
        { t: "Elke regel is getypeerd. De compiler kent de vorm van je data, je props en je API-responses — zodat hele categorieën bugs in de editor opgevangen worden, niet in productie. " },
        { t: "Het is documentatie die niet kan verouderen en een vangnet dat nooit slaapt.", b: true },
      ],
      points: [
        "Statische typecontrole",
        "Autocomplete & intellisense in de editor",
        "Zelfdocumenterende contracten",
        "Veilige, zelfverzekerde refactors",
      ],
    },
    {
      demo: "tw",
      rev: true,
      mark: "T",
      role: "styling · design tokens",
      since: "Tailwind CSS · utility-first",
      h: [{ t: "Tailwind — " }, { t: "design tokens", accent: true }, { t: ", geen stylesheets." }],
      desc: [
        { t: "Styling gebeurt in de markup met utility-classes die gekoppeld zijn aan één design system — spacing, kleur en typografie komen allemaal uit gedeelde tokens. " },
        { t: "Het resultaat is standaard consistent, minuscuul in productie", b: true },
        { t: ", en onmogelijk om af te drijven omdat er geen verweesde CSS-bestanden zijn die rotten." },
      ],
      points: [
        "Token-gestuurde utilities",
        "Geen ongebruikte CSS meegeleverd",
        "Consistente spacing & schaal",
        "Responsief op één plek",
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
          { t: "Statisch (SSG)", b: true, accent: true },
          { t: " — één keer gerenderd bij build time. Geserveerd als platte HTML vanaf de edge: het snelste wat een pagina kan zijn. Gebruikt voor marketing- & contentpagina's." },
        ],
        wave: [20, 30, 28, 40, 55, 70, 85, 100],
      },
      {
        k: "isr",
        label: "ISR",
        body: [
          { t: "Incrementeel (ISR)", b: true, accent: true },
          { t: " — statische snelheid, maar op een timer hergenereerd in de achtergrond. Verse content zonder een volledige rebuild. Gebruikt voor catalogi & blogs." },
        ],
        wave: [24, 34, 30, 46, 50, 62, 74, 92],
      },
      {
        k: "ssr",
        label: "SSR",
        body: [
          { t: "Server (SSR)", b: true, accent: true },
          { t: " — per request gerenderd op de server. Altijd actueel, gepersonaliseerd, nog steeds doorzoekbaar. Gebruikt voor winkelmandjes, dashboards & zoekfuncties." },
        ],
        wave: [40, 52, 48, 60, 66, 72, 80, 88],
      },
    ] as RenderStrat[],
    seoFlags: ["LCP 1.1s", "CLS 0.00", "volledig indexeerbaar", "OG-tags"],
  },

  // --- Sanity Studio: sidebar doc-types + the list each one shows (:419-437) ---
  studio: {
    brandLead: "Nu",
    brandTail: "Studio",
    lake: "· content lake",
    pub: "Gepubliceerd",
    contentLabel: "Content",
    types: [
      {
        doc: "product",
        ico: "◆",
        label: "Producten",
        on: true,
        listLabel: "Producten · 24",
        docs: [
          { t: "Renew Serum", s: "€48 · op voorraad", on: true, badge: "EN · NL" },
          { t: "Calm Cleanser", s: "€32 · op voorraad" },
          { t: "Daily SPF 30", s: "€29 · lage voorraad" },
          { t: "Night Balm", s: "€54 · op voorraad" },
        ],
      },
      {
        doc: "post",
        ico: "¶",
        label: "Journal",
        listLabel: "Journal · 12",
        docs: [
          { t: "De vitamine-C-editie", s: "Gepubliceerd · 4 min", on: true, badge: "EN · NL" },
          { t: "Waarom parfumvrij", s: "Gepubliceerd · 3 min" },
          { t: "Gemaakt in België", s: "Concept" },
        ],
      },
      {
        doc: "page",
        ico: "▤",
        label: "Pagina's",
        listLabel: "Pagina's · 6",
        docs: [
          { t: "Home", s: "/ · gepubliceerd", on: true },
          { t: "Over", s: "/about · gepubliceerd" },
          { t: "Contact", s: "/contact · gepubliceerd" },
        ],
      },
      {
        doc: "settings",
        ico: "⚙",
        label: "Instellingen",
        listLabel: "Instellingen",
        docs: [
          { t: "Site & SEO", s: "globale metadata", on: true },
          { t: "Navigatie", s: "menu's" },
          { t: "Verzending", s: "zones · tarieven" },
        ],
      },
    ] as StudioType[],
  },

  // --- Full-stack recap chips (technology.html :363-370) ---
  recap: {
    eyebrow: "De bijrolspelers",
    title: "De rest van de gereedschapskist.",
    intro:
      "Al de rest die meegaat in een doorsnee build — gekozen om dezelfde reden: ik ken het goed genoeg om het te beheren.",
    items: [
      { m: "No", nm: "Node.js", rl: "Runtime · API's" },
      { m: "St", nm: "Stripe", rl: "Betalingen · Twint" },
      { m: "M", nm: "MongoDB", rl: "NoSQL · data" },
      { m: "Rx", nm: "Redux", rl: "State · winkelmandje" },
      { m: "GQ", nm: "GraphQL", rl: "Getypeerde queries" },
      { m: "Ln", nm: "Lenis", rl: "Vloeiend scrollen" },
      { m: "V", nm: "Vercel", rl: "Hosting · edge" },
      { m: "i18", nm: "i18n", rl: "EN · FR · NL" },
    ] as RecapItem[],
  },

  // --- Closing CTA (technology.html :376-384) ---
  cta: {
    title: [
      [{ t: "Wil je deze stack" }],
      [{ t: "achter " }, { t: "jouw", em: true }, { t: " site?" }],
    ] as Seg[][],
    p: "Van blanco bestand tot afgewerkt product — op exact de tools hierboven. Vertel me wat je in gedachten hebt.",
    ctas: [
      { label: "Start een project", href: "mailto:contact@ywdesign.co?subject=Project", variant: "primary" as const, arrow: "→" },
      { label: "Bekijk het live", href: "/work", variant: "ghost" as const },
    ],
  },
} satisfies Technology;
