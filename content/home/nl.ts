// NL home copy — full Dutch translation (Belgian/Flemish).
import type { NumFmt } from "@/lib/format";
import type { Seg, Home } from "./en";

const nbsp = " ";

export const homeNL = {
  hero: {
    eyebrow: "Senior webdeveloper & designer · Lyon, FR",
    headline: [
      [{ t: "Websites,", scramble: true }, { t: " gebouwd" }],
      [{ t: "vanaf " }, { t: "nul", scramble: true, accent: true }, { t: "—" }],
      [{ t: "AI is het " }, { t: "power" + nbsp + "tool.", scramble: true, accent: true }],
    ] as Seg[][],
    sub: [
      { t: "Ik ben " },
      { t: "Yolan", b: true },
      { t: " — een senior developer die snelle, meertalige websites en webshops regel voor regel uittekent. " },
      { t: "AI versnelt het vakwerk; het vervangt nooit het oordeel.", b: true },
      { t: " Beheerst, niet onderworpen." },
    ] as Seg[],
    ctas: [
      { label: "Bekijk het werk", href: "#work", variant: "primary" as const, arrow: "→" },
      { label: "De filosofie", href: "#ai", variant: "ghost" as const },
    ],
  },

  growth: {
    title: "growth.tsx — wat goede code oplevert",
    live: "live",
    funnel: [
      { k: "Bezoekers", val: 48200, fmt: "k" as NumFmt, d: "+0%" },
      { k: "Klikken", val: 13100, fmt: "k" as NumFmt, d: "27% CTR" },
      { k: "Winst", val: 92400, fmt: "eur" as NumFmt, d: "▲ live", profit: true },
    ],
  },

  capabilities: {
    tk: "01",
    eyebrow: "Wat ik meebreng",
    title: ["Geen template.", "Een toolkit, met de hand gebouwd."],
    intro:
      "Elke mogelijkheid hieronder is van nul af opgebouwd en bewezen op een echt, gelanceerd project. Geen page builders, geen boilerplate — gewoon code die ik van boven tot onder begrijp.",
    themeToggle: { light: "Licht", dark: "Donker" },
    cards: [
      {
        span: "feature span-3", d: 0, ico: "design_systems",
        h: "Designsystemen, vanaf de tokens",
        p: "Typeschalen, kleur, ruimte, beweging en componenten — een samenhangend systeem, geen hoop CSS.",
        viz: "scale",
        case: { pre: "CASE:", strong: "Spiree", post: "— gradiëntsysteem ↗", href: "https://spiree-next.netlify.app/", external: true },
      },
      {
        span: "feature span-3", d: 1, ico: "motion",
        h: "Scrollgedreven, cinematische beweging",
        p: "Scroll per sectie, sticky hoofdstukken en reveal-choreografie — performancebewust, nooit gratuit.",
        viz: "bars",
        case: { pre: "CASE:", strong: "Milo Weiler", post: "— scroll in 7 hoofdstukken ↗", href: "https://miloweiler.com", external: true },
      },
      {
        span: "span-2", d: 0, ico: "i18n",
        h: "Meertalige routing",
        p: "EN · FR · NL met gelokaliseerde SEO ingebakken.",
        viz: "lang",
        case: { pre: "CASE:", strong: "Bermuda", post: "↗", href: "https://bermuda-events.be", external: true },
      },
      {
        span: "span-2", d: 1, ico: "headless_cms",
        h: "Headless CMS",
        p: "Publiceer content-aanpassingen zonder dat er een developer aan te pas komt.",
        viz: "cms",
        case: { pre: "CASE:", strong: "Nu", post: "· Sanity ↗", href: "https://nu-site.netlify.app/en", external: true },
      },
      {
        span: "span-2", d: 2, ico: "commerce",
        h: "Commerce & betalingen",
        p: "Stripe- & Twint-checkouts die converteren.",
        viz: "commerce",
        case: { pre: "CASE:", strong: "Nu", post: "winkel ↗", href: "https://nu-site.netlify.app/en", external: true },
      },
      {
        span: "span-4", d: 0, ico: "performance · seo",
        h: "Lighthouse-getuned, zoekklaar",
        p: "Uitgestelde beeldlading, semantische markup en strakke Core Web Vitals — snel voor gebruikers én voor Google.",
        viz: "gauge",
        case: { pre: "CASE:", strong: "Milo Weiler", post: "↗", href: "https://miloweiler.com", external: true },
      },
      {
        span: "accent-card span-2", d: 1, ico: "theme · accent",
        h: "Licht & donker, by design",
        p: "Thema, accent, typografie — elke visuele keuze is een token. Wissel er één en het hele systeem volgt, live.",
        viz: "theme",
        case: { pre: "Maak het van jou ↑", href: "#capabilities" },
      },
    ],
  },

  stack: {
    tk: "02",
    eyebrow: "De stack, in detail",
    title: ["Geen WordPress.", "Code" + nbsp + "op maat."],
    intro:
      "Geen page builders, geen wildgroei aan plugins, geen thema om tegen te vechten. Elke site wordt van nul geschreven in een moderne stack die ik diep genoeg ken om naar mijn hand te zetten. De drie tools hieronder doen het zware werk — scroll, en elk opent zich zodra de lijn het bereikt.",
    rows: [
      {
        mark: "N", name: "Next.js", tag: "De basis — elke site draait erop", role: "framework", open: true,
        body: "Elke site die ik bouw is een Next.js-applicatie. De App Router geeft me server components, streaming en file-based routing — pagina's renderen op de server voor snelheid en SEO, en hydrateren daarna enkel de delen die interactief moeten zijn. Eén framework, van marketingpagina tot checkout.",
        points: ["App Router & React Server Components", "SSG · ISR · SSR per route gekozen", "next/image — automatische optimalisatie", "Native i18n-routing — en · fr · nl", "Code splitting op routeniveau", "Edge-klaar, gedeployed op Vercel"],
        case: { pre: "CASE:", strong: "Milo Weiler", post: "— 55 projecten, topscore op Lighthouse ↗", href: "https://miloweiler.com", external: true },
      },
      {
        mark: "S", name: "Sanity", tag: "Headless content die de klant zelf bewerkt", role: "headless cms",
        body: "Content leeft in Sanity, volledig ontkoppeld van de front-end. Redacteurs werken producten, posts en beeld bij in een Studio die ik op hun workflow afstem; ik bevraag exact de vorm die elke pagina nodig heeft met GROQ en render die via Portable Text. Geen tussenkomst van een developer voor de dagelijkse aanpassingen.",
        points: ["Aangepaste Studio-schema's per klant", "GROQ — bevraag enkel wat gerenderd wordt", "Portable Text rijke content", "Draftpreview & realtime updates", "Beeldpijplijn op een globale CDN", "Webhook-gestuurde rebuilds"],
        case: { pre: "CASE:", strong: "Nu", post: "— een CMS-gestuurde clean-beauty-catalogus ↗", href: "https://nu-site.netlify.app/en", external: true },
      },
      {
        mark: "St", name: "Stripe", tag: "Veilige checkout — multivaluta & Twint", role: "payments",
        body: "De checkout draait op Stripe. Sessies worden server-side aangemaakt, bevestigd door ondertekende webhooks en gereconcilieerd voor er iets verzonden wordt — veilig van bij de bouw, en vertrouwt daarbij nooit op de browser. Multivaluta plus Twint geeft Belgische en EU-klanten de betaalmethodes waar ze echt naar grijpen.",
        points: ["Server-side Checkout Sessions", "Afhandeling via ondertekende webhooks", "Prijzen in meerdere valuta", "Twint & kaarten voor de EU", "PaymentIntents met SCA", "Btw- & verzendlogica"],
        case: { pre: "CASE:", strong: "Nu", post: "winkel — een wrijvingsloze koopstroom ↗", href: "https://nu-site.netlify.app/en", external: true },
      },
      {
        mark: "G", name: "GSAP", tag: "De bewegingsengine — scroll- & timeline-animatie", role: "animation",
        body: "Elke reveal, elk scrollhoofdstuk en elke hover-flourish draait op GSAP. ScrollTrigger pint secties vast en koppelt animatie aan de scrollpositie; timelines sequencen de choreografie frame-accuraat. Het is het verschil tussen een site die laadt en een die beweegt — performancebewust, nooit gratuit.",
        points: ["ScrollTrigger — scrollgedreven scènes", "Timelines voor gesequenceerde beweging", "Pin & scrub voor sticky hoofdstukken", "Enkel GPU-vriendelijke transforms", "Bewust van reduced-motion", "60fps op mid-range mobiel"],
        case: { pre: "CASE:", strong: "Milo Weiler", post: "— scrollchoreografie in 7 hoofdstukken ↗", href: "https://miloweiler.com", external: true },
      },
    ],
    side: {
      eyebrow: "Telkens van nul",
      h: ["Zo ziet", "“geen template” eruit."],
      p: "Een site opgezet zoals ik echt werk — eerst architectuur, dan designsysteem, en dan gelanceerd. Het oordeel is menselijk; de snelheid komt van de tooling.",
      cta: { label: "Duik in de technologie", href: "#stack" },
    },
    supporting: {
      eyebrow: "Plus de ondersteunende cast",
      items: [
        { mark: "R", name: "React 18", role: "UI · componenten" },
        { mark: "TS", name: "TypeScript", role: "Types · veiligheid" },
        { mark: "T", name: "Tailwind", role: "Styling · tokens" },
        { mark: "N", name: "Node.js", role: "Runtime · API's" },
        { mark: "M", name: "MongoDB", role: "NoSQL · data" },
        { mark: "Rx", name: "Redux", role: "State · winkelmand" },
        { mark: "GQ", name: "GraphQL", role: "Getypte queries" },
        { mark: "V", name: "Vercel", role: "Hosting · edge" },
      ],
    },
  },

  work: {
    tk: "03",
    eyebrow: "Geselecteerd werk",
    title: "Gelanceerd, in productie.",
    intro:
      "Echte sites voor echte klanten in België en daarbuiten — meertalig, snel en gebouwd om te converteren.",
    cta: { caseStudy: "Case study", visit: "Bezoek" },
    items: [
      { num: "01", cat: "Beauty & wellness e-commerce", slug: "nu", title: "Nu", body: "Een meertalige clean-beauty-winkel — rustige redactionele cadans rond een wrijvingsloze, CMS-gestuurde koopstroom.", href: "https://nu-site.netlify.app/en", img: "/work/nu.jpg" },
      { num: "02", cat: "Fotografieportfolio", slug: "milo", title: "Milo Weiler", body: "Een cinematische, donkere portfolio opgedeeld in zeven scrollhoofdstukken — 55 projecten, sticky hoofdstuknavigatie, topscores op Lighthouse.", href: "https://miloweiler.com", img: "/work/milo.jpg" },
      { num: "03", cat: "Eventbureau · België", slug: "bermuda", title: "Bermuda Events", body: "Een premium merksite die voorbije producties op schaal in beeld brengt, met een contacttrechter gebouwd om de juiste leads te kwalificeren.", href: "https://bermuda-events.be", img: "/work/bermuda.jpg" },
      { num: "04", cat: "Activewearmerk · 100% Merino", slug: "spiree", title: "Spiree", body: "Een onafhankelijke sportkledingsite — gedurfd gradiëntsysteem, Sun- & Moon-collecties, een verhaalgedreven boog.", href: "https://spiree-next.netlify.app/", img: "/work/spiree.jpg" },
    ],
  },

  ai: {
    tk: "04",
    eyebrow: "De filosofie",
    title: [
      [{ t: "Een power tool." }],
      [{ t: "Beheerst", em: true, scramble: true }, { t: "," }],
      [{ t: "niet onderworpen." }],
    ] as Seg[][],
    lede:
      "Ik zet AI in zoals een vakman een power tool inzet — voor snelheid en hefboomwerking, nooit om het denken uit handen te geven. De app is het werk niet. Het oordeel wel.",
    principles: [
      { n: "01", b: "Ik bezit de architectuur", p: "AI schetst; ik beslis over structuur, afwegingen en het datamodel. De blauwdruk is menselijk." },
      { n: "02", b: "Elke regel gaat begrepen live", p: "Niets bereikt productie dat ik niet kan lezen, herstructureren en verdedigen. Geen black boxes." },
      { n: "03", b: "Snelheid, zonder het waarom te verliezen", p: "AI haalt het routinewerk weg zodat meer tijd naar vakwerk, performance en de details die ertoe doen gaat." },
      { n: "04", b: "Het gereedschap dient de developer", p: "Beheerst, niet onderworpen. De senior engineer blijft aan het stuur — altijd." },
    ],
  },

  process: {
    tk: "05",
    eyebrow: "Hoe ik werk",
    title: "Een transparante pijplijn.",
    intro:
      "Vijf fases, van start tot lancering. De lijn tekent zich terwijl je scrollt — elke fase licht op zodra je ze bereikt.",
    stages: [
      { n: "01", h: "Ontdekking", p: "Doelen, doelpubliek, budget — en wat succes echt betekent voor er een regel geschreven is." },
      { n: "02", h: "Architectuur", p: "Stack, datamodel en structuur vooraf bepaald — de blauwdruk is menselijk." },
      { n: "03", h: "Design", p: "Een echt systeem dat je vroeg ziet en waarop je reageert, samen verfijnd — geen statische mockup." },
      { n: "04", h: "Bouw", p: "Met de hand gecodeerd, AI-versneld, meertalig en SEO-klaar — elke regel gaat begrepen live." },
      { n: "05", h: "Lancering", p: "Meten, itereren, en ik blijf aan boord voor wat er ook volgt." },
    ],
  },

  contact: {
    eyebrow: "Contact",
    title: [
      [{ t: "Heb je iets" }],
      [{ t: "dat het waard is om te " }, { t: "bouwen?", em: true, scramble: true }],
    ] as Seg[][],
    p: "Van leeg bestand tot gelanceerd product. Vertel me wat je in gedachten hebt — ik vertel je hoe ik het zou bouwen.",
    ctas: [
      { label: "Start een project", href: "mailto:contact@ywdesign.co?subject=Project", variant: "primary" as const, arrow: "→" },
      { label: "WhatsApp", href: "https://wa.me/32471124525", variant: "ghost" as const, external: true },
    ],
  },
} satisfies Home;
