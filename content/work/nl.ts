// NL case-study copy — Dutch translation of content/work/en.ts.
// Mirrors `projects` in en.ts 1:1 (satisfies Record<Slug, Project>); only
// translatable values differ.
import type { Slug, Project } from "./en";

export const projectsNL = {
  // ── 01 · AutomatX Labs ──────────────────────────────────────────────────
  automatx: {
    slug: "automatx",
    eyebrowNum: "01",
    category: "Ingenieurspraktijk · Lyon",
    year: "2026",
    titleSegs: [
      { t: "AutomatX — één ingenieur, " },
      { t: "X labs.", scramble: true, accent: true },
    ],
    lede:
      "De site van AutomatX Labs, mijn onafhankelijke ingenieurspraktijk. Vier labs, ingedeeld naar wat ze verbeteren (een proces, een lichaam, iets fysieks, een berekening), acht vaardigheden die erdoorheen lopen, en een 3D-sterrenkaart die het hele model op één scherm zet.",
    liveHref: "https://automatx.eu",
    meta: {
      role: "Merk, design & bouw",
      year: "2026",
      sector: "Engineering · Labautomatisering",
      stack: ["HTML", "CSS", "Vanilla JS", "three.js"],
    },
    heroImg: "/work/automatx-hero.jpg",
    heroAlt: "Home van AutomatX Labs — “One engineer. X labs.” op een donker ingenieursraster",
    metaTitle: "AutomatX Labs — Case study",
    metaDescription:
      "De bouw van automatx.eu: een statische, tweetalige site zonder externe verzoeken, een X Labs-structuur en een interactieve three.js-constellatie van labs en vaardigheden.",
    sections: [
      {
        kind: "twoColFeature",
        head: {
          eyebrow: "De opdracht",
          title: "Veel vakgebieden, één methode, één site.",
        },
        paras: [
          [
            { t: "Labautomatisering, bewegingsanalyse, 3D-printen, AI. Op een cv oogt dat versnipperd. De site moest tonen dat het " },
            { t: "één methode is, overal toegepast", b: true },
            { t: ": meten, automatiseren, reproduceerbaar maken." },
          ],
          [
            { t: "Het antwoord werd het " },
            { t: "X Labs-model", b: true },
            {
              t: ". Labs zijn ingedeeld naar het systeem dat ze verbeteren, en vaardigheden zijn de tools die ze delen. Een project hoort bij het lab waarvan het het systeem verbetert, niet bij de tools die het gebruikt.",
            },
          ],
        ],
        features: [
          {
            k: "[ x_labs ]",
            b: "Vier labs, acht vaardigheden",
            p: "Proces · Pharma, Lichaam · Sport, Materie · Robotica en Rekenen · AI delen sensoren, elektronica, mechanica, software, data, AI/ML, validatie en industrialisatie.",
          },
          {
            k: "[ zero_requests ]",
            b: "Niets komt van elders",
            p: "Fonts, scripts en three.js worden allemaal zelf gehost. Geen CDN, geen Google Fonts, geen analytics, dus niets dat een AVG-vraag oproept.",
          },
          {
            k: "[ progressive ]",
            b: "Werkt zonder JavaScript",
            p: "Eerst gewone HTML en CSS. Scripts voegen alleen iets toe: de 3D-kaart, live sportfiguren en onthullingen bij het scrollen.",
          },
          {
            k: "[ i18n ]",
            b: "EN · FR",
            p: "Tien URL’s, elk via hreflang gekoppeld aan de Franse versie, plus een sitemap en JSON-LD.",
          },
        ],
      },
      {
        kind: "signature",
        demo: "automatxWeb",
        head: {
          eyebrow: "Signature build",
          title: "De labs als sterrenbeeld",
          intro:
            "De kaart van de homepage, die hier draait zoals op de live site. De vier labs staan op twee diagonalen, zodat hun verbindingen de X van het logo tekenen. Vaardigheden draaien op een buitenste bol, dicht bij de labs die ze bedienen. Sleep om te draaien, gooi een ster weg, hover om de verbindingen op te lichten.",
        },
        label: "web3d.js",
        note: "slepen · hover · ctrl + scroll om te zoomen",
      },
      {
        kind: "approach",
        head: {
          eyebrow: "Hoe het gebouwd is",
          title: "De SVG blijft de bron van waarheid",
          intro:
            "De kaart begint als een toegankelijke SVG: echte links, focusbare nodes, leesbare labels. three.js is een laag erachter, en de SVG blijft werken als die laag niet laadt.",
        },
        steps: [
          {
            sn: "01 / lees de markup",
            h: "Nodes & lijnen uit de DOM",
            p: "web3d.js bouwt de graaf op uit de SVG-cirkels en <line data-a data-b>-lijnen, dus de kaart aanpassen is een markup-aanpassing.",
          },
          {
            sn: "02 / elke frame vastplakken",
            h: "Terug op het scherm geprojecteerd",
            p: "Elke frame wordt elke ster op het scherm geprojecteerd en zijn SVG-node erheen verplaatst, zodat labels, focusringen en klikvlakken op de sterren blijven.",
          },
          {
            sn: "03 / niets in rust",
            h: "Lazy, gepauzeerd, optioneel",
            p: "Het script laadt pas als de kaart in beeld komt en pauzeert buiten beeld. Met beperkte beweging of zonder WebGL blijft de platte kaart staan.",
          },
        ],
      },
      {
        kind: "statBand",
        stats: [
          { sv: "0", sl: "externe verzoeken" },
          { sv: "4 × 8", sl: "labs × vaardigheden" },
          { sv: "10", sl: "URL’s · EN + FR" },
          { sv: "1", sl: "externe library" },
        ],
      },
      {
        kind: "gallery",
        head: { eyebrow: "Galerij", title: "Door de site" },
        items: [
          { id: "automatx-g1", span: "wide", alt: "Hub — de sterrenkaart van labs × vaardigheden" },
          { id: "automatx-g2", span: "tall", alt: "Pharma-lab — Hamilton VENUS-automatisering en GMP-validatie" },
          { id: "automatx-g3", span: "half", alt: "Sportlab — gesimuleerde bewegingssignalen als fijne SVG-lijnen" },
          { id: "automatx-g4", span: "half", alt: "Oorsprong — onderzoek aan de KU Leuven en het loopbaanpad" },
        ],
      },
    ],
    signatureData: {
      automatxWeb: {
        intro:
          "AutomatX Labs is de onafhankelijke ingenieurspraktijk van Yolan Weiler, biomedisch & elektrotechnisch ingenieur (KU Leuven), gevestigd in Lyon. Eén methode, overal toegepast: meten, automatiseren, reproduceerbaar maken.",
        hint: "Sleep om te draaien · ⌘/Ctrl + scroll of knijp om te zoomen · tik op een ster om te lezen →",
        go: "Open lab →",
      },
    },
  },

  // ── 02 · Milo Weiler ────────────────────────────────────────────────────
  milo: {
    slug: "milo",
    eyebrowNum: "02",
    category: "Fotografieportfolio",
    year: "2025",
    titleSegs: [
      { t: "Milo Weiler — getuige van de " },
      { t: "schoonheid van het leven.", scramble: true, accent: true },
    ],
    lede:
      "Een cinematografisch portfolio voor een Belgische set-, portret- en bedrijfsfotograaf — 55 projecten verdeeld over zeven hoofdstukken, samengehouden door een donkere schil en een vastgezette hoofdstuknavigatie.",
    liveHref: "https://miloweiler.com",
    meta: {
      role: "Ontwerp & build",
      year: "2025",
      sector: "Portfolio · Kunst",
      stack: ["Next.js", "Sanity", "Figma"],
    },
    heroImg: "/work/milo-hero.jpg",
    heroAlt: "Milo Weiler — zwart-witte fine-art projectgalerij op een dieprode pagina",
    metaTitle: "Milo Weiler — Case study",
    metaDescription:
      "Een cinematografisch, donker portfolio voor een Belgische fotograaf — 55 projecten over zeven hoofdstukken, vastgezette hoofdstuknavigatie, drietalig EN · NL · FR, topscores in Lighthouse.",
    sections: [
      {
        kind: "quote",
        quote: [
          { t: "Een oeuvre, geen rooster van thumbnails — de site moet lezen als een " },
          { t: "boek vol hoofdstukken", accent: true },
          { t: ", elk met zijn eigen stem." },
        ],
        cite: "// de briefing, in één zin",
      },
      {
        kind: "twoColFeature",
        head: {
          eyebrow: "De briefing",
          title: "Een oeuvre, geen rooster van thumbnails.",
        },
        paras: [
          [
            {
              t: "Milo's praktijk beweegt tussen digitaal en analoog, documentair en geregisseerd. Een vlakke galerij zou dat bereik platslaan. In plaats daarvan leest de site als een ",
            },
            { t: "boek vol hoofdstukken", b: true },
            {
              t: " — Set, Corporate & Brand, Events, Portretten, Product & Food, Fine Art — elk met zijn eigen stem.",
            },
          ],
          [
            { t: "Een " },
            { t: "donkere, cinematografische schil", b: true },
            {
              t: " laat de fotografie stralen, terwijl een vastgezette hoofdstuknavigatie je oriënteert doorheen 55 projecten. Drietalig EN · NL · FR, met sterke Lighthouse-scores op een uitgesproken beeldzware site.",
            },
          ],
        ],
        features: [
          {
            k: "[ sectioned_scroll ]",
            b: "Hoofdstukgebaseerde scroll",
            p: "Zeven secties met een vastgezette navigatie die volgt waar je bent terwijl je je door het werk beweegt.",
          },
          {
            k: "[ headless_cms ]",
            b: "Galerijen beheerd in Sanity",
            p: "55 projecten, bijschriften en volgorde — allemaal bewerkbaar door Milo, zonder deploys.",
          },
          {
            k: "[ performance ]",
            b: "Snel ondanks de beelden",
            p: "Responsief, uitgesteld laden van beelden houdt een mediazware site snel en CLS-zuiver.",
          },
          {
            k: "[ i18n ]",
            b: "EN · NL · FR",
            p: "Drie talen, gelokaliseerde routing en metadata van begin tot eind.",
          },
        ],
      },
      {
        kind: "signature",
        demo: "miloStack",
        placement: "hero",
        head: {
          eyebrow: "Signature build",
          title: "De dieptestapel-galerij",
          intro:
            "De homepage van miloweiler.com: elke categorie als 16:9-kaart in één dieptestapel. Eén scrolltik of swipe schuift één kaart op, een gelerpte ticker schaalt en verspringt de rest, en de ruimte neemt de kleur van elke foto aan. Scroll of swipe eroverheen:",
        },
        label: "CardCarousel.jsx",
        note: "scroll · swipe · ← →",
      },
      {
        kind: "chapterIndex",
        head: {
          eyebrow: "Architectuur",
          title: "Zeven hoofdstukken, één cinematografische schil",
          intro:
            "55 projecten horen niet thuis in een vlak rooster. Ze zijn ingedeeld in zeven oeuvres, elk met zijn eigen stem — de vastgezette rail volgt waar je bent terwijl je je erdoorheen beweegt.",
        },
        chapters: [
          { cn: "01", ct: "Setfotografie", cd: "Videoclips, film, theater & commercials" },
          { cn: "02", ct: "Corporate & Brand", cd: "Campagnes, teamportretten, behind-the-scenes" },
          { cn: "03", ct: "Events & Documentaires", cd: "Van concertpodia tot conferentiezalen" },
          { cn: "04", ct: "Portretten & Headshots", cd: "Acteurs, muzikanten & corporate, digitaal en film" },
          { cn: "05", ct: "Product & Food", cd: "Ontwerp, textuur en intentie door licht" },
          { cn: "06", ct: "Fine Art", cd: "Verkenningen tussen documentair & geregisseerd" },
          { cn: "07", ct: "Persoonlijk Werk", cd: "Het natrekken van de context die een moment vormt" },
        ],
      },
      {
        kind: "gallery",
        head: { eyebrow: "Galerij", title: "Doorheen de hoofdstukken" },
        items: [
          { id: "milo-s1", span: "wide", alt: "Home — de dieptestapel-carrousel" },
          { id: "milo-s2", span: "tall", alt: "Over mij — openingsportret met de getekende zon" },
          { id: "milo-s3", span: "half", alt: "Over mij — de zwevende fotocollage boven de maan" },
          { id: "milo-s4", span: "half", alt: "Fine Art — hoofdstukpagina" },
          { id: "milo-s5", span: "half", alt: "Categoriegalerij — Events" },
          { id: "milo-s6", span: "half", alt: "Contact — Get in touch en Trusted by" },
        ],
      },
    ],
    signatureData: {
      // rail label, card title, description; img/bg/count/year from the live home (Sanity)
      miloStack: {
        projects: "projecten",
        prev: "Vorige categorie",
        next: "Volgende categorie",
        items: [
          {
            rail: "Setfotografie",
            t: "Setfotografie",
            p: "Waar kunst en verhaal elkaar ontmoeten — momenten uit videoclips, film, theater en commercials in België en daarbuiten.",
            img: "/work/milo-stack-1.jpg", bg: "#4B0E07", count: 18, year: "2026",
          },
          {
            rail: "Corporate & Brand",
            t: "Corporate & Brand",
            p: "Een bedrijf is meer dan zijn product. Merkcampagnes, teamportretten en behind-the-scenes voor bedrijven in België en Nederland.",
            img: "/work/milo-stack-2.jpg", bg: "#BD9A75", count: 9, year: "2026",
          },
          {
            rail: "Events & Docs",
            t: "Events & Documentaires",
            p: "Van concertpodia tot conferentiezalen — events documenteren zoals ze zich ontvouwen, authentieke momenten boven geposeerde.",
            img: "/work/milo-stack-3.jpg", bg: "#032900", count: 12, year: "2025",
          },
          {
            rail: "Portretten",
            t: "Portretten & Headshots",
            p: "Portretten als verlengstuk van iemands verhaal — professionele headshots voor acteurs, muzikanten en bedrijfsklanten, op digitaal en film.",
            img: "/work/milo-stack-4.jpg", bg: "#93b9ba", count: 13, year: "2025",
          },
          {
            rail: "Product & Food",
            t: "Product & Food",
            p: "Elk vakkundig gemaakt object vertelt een verhaal van ontwerp, textuur en intentie — vertaald door licht, vorm en oppervlak.",
            img: "/work/milo-stack-5.jpg", bg: "#30221d", count: 6, year: "2026",
          },
          {
            rail: "Fine Art",
            t: "Fine Art & Persoonlijk",
            p: "Doorlopende verkenningen tussen documentaire en geregisseerde benaderingen, die de onzichtbare context natrekken die een moment vormt.",
            img: "/work/milo-stack-6.jpg", bg: "#070b22", count: 3, year: "2026",
          },
        ],
      },
    },
  },

  // ── 03 · Nu ─────────────────────────────────────────────────────────────
  nu: {
    slug: "nu",
    eyebrowNum: "03",
    category: "E-commerce voor beauty & wellness",
    year: "2024",
    titleSegs: [
      { t: "Nu — clean beauty, " },
      { t: "rustig verkocht.", scramble: true, accent: true },
    ],
    lede:
      "Een meertalige webshop voor een clean-beauty merk — een redactioneel ritme rond een vlotte, CMS-gestuurde aankoopflow die het team zelf kan beheren.",
    liveHref: "https://nu-site.netlify.app/en",
    meta: {
      role: "Ontwerp & build",
      year: "2024",
      sector: "E-commerce · DTC",
      stack: ["Next.js", "Sanity", "Stripe"],
    },
    heroImg: "/work/nu-hero.jpg",
    heroAlt: "Nu — clean beauty webshop hero",
    metaTitle: "Nu — Case study",
    metaDescription:
      "Een meertalige clean-beauty webshop — redactionele rust rond een vlotte, CMS-gestuurde, Stripe-aangedreven aankoopflow die het team zelf beheert.",
    sections: [
      {
        kind: "narrative",
        head: {
          eyebrow: "De uitdaging",
          title: "Een shop die aanvoelt als een magazine, draait als een winkel.",
        },
        paras: [
          [
            { t: "Clean-beauty kopers doen onderzoek voordat ze kopen. Nu had nood aan " },
            { t: "redactionele rust", b: true },
            {
              t: " — royale ruimte, doordachte typografie — zonder de harde mechaniek van een echte winkel op te geven: winkelmandje, checkout, voorraad en btw.",
            },
          ],
          [
            {
              t: "De briefing viel dus in twee delen uiteen: zorg dat elke pagina leest als een rustige printspread, en maak het geheel ",
            },
            { t: "zelfbeheerbaar", b: true },
            {
              t: " in twee talen, zonder dat er voor het dagelijkse werk een developer aan te pas komt.",
            },
          ],
        ],
      },
      {
        kind: "approach",
        head: { eyebrow: "Aanpak", title: "Drie zetten" },
        steps: [
          {
            sn: "01 / content",
            h: "Modelleer het in Sanity",
            p: "Producten, collecties en redactionele blokken als gestructureerde content — het team beheert elk woord en elk beeld.",
          },
          {
            sn: "02 / i18n",
            h: "Lokaliseer het hele oppervlak",
            p: "EN · FR routing, copy en SEO-metadata van bij de start ingebouwd, nooit achteraf erop geplakt.",
          },
          {
            sn: "03 / commerce",
            h: "Stripe end-to-end koppelen",
            p: "Winkelmandje, veilige checkout, voorraad en btw — een echte webshop die zoemt achter de rust.",
          },
        ],
      },
      {
        kind: "signature",
        demo: "nuLang",
        head: {
          eyebrow: "Signature build",
          title: "Eén catalogus, twee talen — meteen",
          intro:
            "Lokalisatie is geen bijzaak die achteraf erop geplakt wordt — ze is ingebouwd in de contentlaag. Wissel van taal en zie het hele productoppervlak omvormen, routing en al. Probeer het:",
        },
        label: "[locale]/products/[slug].tsx",
        note: "live component",
      },
      {
        kind: "statBand",
        head: {
          eyebrow: "Resultaat",
          title: "Rustig aan de oppervlakte, druk eronder.",
        },
        stats: [
          { sv: "2", sl: "Talen — EN · FR, volledig gelokaliseerde routing & SEO" },
          {
            sv: "0",
            sl: "Developer-uren om een nieuw product of campagne te publiceren",
          },
          {
            sv: "100%",
            sl: "CMS-gestuurde catalogus — elke pagina bewerkbaar door het team",
          },
        ],
      },
      {
        kind: "signature",
        demo: "nuShop",
        head: {
          eyebrow: "De shop, live",
          title: "Het productrooster — echt, geen screenshot",
          intro:
            "Dit is Nu's echte Products-component, herwerkt in het eigen lichte kleurenpalet van het merk — Corben koppen, pastel categorietegel, sterrenscores en een Stripe-aangedreven snel-toevoegen. Wissel van taal, voeg toe aan je mandje, hover over een kaart. Het is de build, live.",
        },
        label: "shop/page.tsx · Products.tsx · Product.tsx",
        note: "live component",
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

  // ── 04 · Bermuda Events ─────────────────────────────────────────────────
  bermuda: {
    slug: "bermuda",
    eyebrowNum: "04",
    category: "Eventbureau · België",
    year: "2025",
    titleSegs: [
      { t: "Bermuda Events — verlies je in de " },
      { t: "beleving.", scramble: true, accent: true },
    ],
    lede:
      "Een premium merksite voor een Antwerps eventbureau — die voorbije producties op schaal in beeld brengt, geloofwaardigheid opbouwt door pure productiekwaliteit, en de juiste leads naar een op maat gemaakte contactflow trechtert.",
    liveHref: "https://bermuda-events.be",
    meta: {
      role: "Ontwerp & build",
      year: "2025",
      sector: "Events · Bureau",
      stack: ["Next.js", "Sanity", "i18n"],
    },
    heroImg: "/work/bermuda-hero.jpg",
    heroAlt: "Bermuda Events — premium eventbureau hero",
    metaTitle: "Bermuda Events — Case study",
    metaDescription:
      "Een premium merksite voor een Antwerps eventbureau — voorbije producties op schaal in beeld, een 'Get Lost In' motief, en een contacttrechter gebouwd om de juiste leads te kwalificeren. NL · EN.",
    sections: [
      {
        kind: "twoColFeature",
        head: {
          eyebrow: "De briefing",
          title: "Verkoop een beleving die je niet in een productfoto vangt.",
        },
        paras: [
          [
            {
              t: "Bermuda is een eventbureau uit Berchem waar creativiteit grenzeloos is en elk event een nieuw concept. De site moest ",
            },
            { t: "gevoel", b: true },
            {
              t: " overbrengen — sfeer, schaal, vertrouwen — en dat vervolgens omzetten in gekwalificeerde aanvragen.",
            },
          ],
          [
            { t: "De build leunt op een " },
            { t: '"Get Lost In"-motief', b: true },
            {
              t: " — Creativiteit, Details, Persoonlijkheid — voorbije producties in beeld op premium schaal, en een contacttrechter ontworpen om te kwalificeren in plaats van louter te verzamelen. Tweetalig gebouwd, NL · EN.",
            },
          ],
        ],
        features: [
          {
            k: "[ brand_motion ]",
            b: '"Get Lost In" koppensysteem',
            p: "Een hero met roterend woord die de pitch telkens herkadert — creativiteit, details, persoonlijkheid — zonder de aandacht te herladen.",
          },
          {
            k: "[ premium_scale ]",
            b: "Producties in beeld op schaal",
            p: "Voorbije events groot en cinematografisch getoond — sfeer en ambitie doen het verkoopwerk nog voor één woord copy.",
          },
          {
            k: "[ lead_funnel ]",
            b: "Kwalificerende contactflow",
            p: "Een contacttrechter gebouwd om de juiste briefings naar boven te halen, niet zomaar een generiek formulier.",
          },
          {
            k: "[ i18n ]",
            b: "NL · EN",
            p: "Gelokaliseerde content en routing voor een Belgisch publiek.",
          },
        ],
      },
      {
        kind: "signature",
        demo: "bermudaIcons",
        head: {
          eyebrow: "Signature build",
          title: 'De "Get Lost In" icoonset',
          intro:
            "Drie custom SVG-iconen — Creativiteit, Detail, Persoonlijkheid — elk met de hand geanimeerd om te morphen terwijl je ze verkent. Hover of tik op een kaart om ze te zien transformeren. Dit is het echte component, geport van de live site.",
        },
        label: "components/Feature.jsx",
        note: "hover om te morphen",
      },
      {
        kind: "approach",
        head: {
          eyebrow: "Hoe het converteert",
          title: "Eerst het gevoel, dan de trechter",
          intro:
            "Een beleving verkopen die je niet in een productfoto vangt, betekent beginnen met sfeer — en die interesse vervolgens omzetten in het juiste soort aanvraag.",
        },
        steps: [
          {
            sn: "01 / positioning",
            h: "Kader het gevoel",
            p: "Voorbije producties getoond op premium schaal, zodat sfeer en ambitie het verkoopwerk doen nog voor één woord copy.",
          },
          {
            sn: "02 / proof",
            h: "Veranker het in het werk",
            p: "Voorbije producties, getoond op premium schaal, maken van de pitch een bewijs — het portfolio is de geloofwaardigheid.",
          },
          {
            sn: "03 / funnel",
            h: "Kwalificeer, verzamel niet",
            p: "Een contactflow ontworpen om de juiste briefings naar boven te halen — niet zomaar weer een inbox vol generieke mails verzamelen.",
          },
        ],
      },
      {
        kind: "quote",
        quote: [
          { t: "Verlies je in " },
          { t: "creativiteit, details en persoonlijkheid", accent: true },
          { t: " — telkens weer een nieuw concept op jouw maat." },
        ],
        cite: "// Bermuda Events — de merkregel, verwerkt in de hero",
      },
      {
        kind: "gallery",
        head: { eyebrow: "Galerij", title: "Doorheen de site" },
        items: [
          { id: "bermuda-g1", span: "wide", alt: "Hero / events" },
          { id: "bermuda-g2", span: "tall", alt: "Over ons" },
          { id: "bermuda-g3", span: "half", alt: "Netwerk / team" },
          { id: "bermuda-g4", span: "half", alt: "Contacttrechter" },
        ],
      },
    ],
    signatureData: {
      bermudaIcons: {
        gl: "Verlies je in",
        cards: [
          { t: "Creativiteit", sub: "Een nieuw concept naar jouw wens. Elke keer." },
          { t: "Detail", sub: "Niets aan het toeval overgelaten. Aan elk detail gedacht." },
          { t: "Persoonlijkheid", sub: "Dezelfde persoon, altijd voor je klaar." },
        ],
        noteH: "Waarom het hier herkleurd is",
        note: [
          { t: "Live draait Bermuda op een eigen identiteit in aardetinten — klei, zand, olijf. Voor deze case study heb ik exact dezelfde morph omgezet naar het systeem van dit portfolio: " },
          { t: "neutrale inkt", accent: true },
          { t: " in rust, oplichtend naar vol contrast bij focus, met de morphende focusvorm die uitkomt in het " },
          { t: "accent", accent: true },
          { t: ". De geometrie is onaangeroerd — alleen het palet is gewisseld naar zwart / wit / accent, zodat het component in deze site past in plaats van ermee te vechten." },
        ],
      },
    },
  },

  // ── 05 · YWdesign v1 ────────────────────────────────────────────────────
  ywdesign: {
    slug: "ywdesign",
    eyebrowNum: "05",
    category: "Studiosite · Vorige versie",
    year: "2023",
    titleSegs: [
      { t: "YWdesign v1 — je " },
      { t: "digitale partner.", scramble: true, accent: true },
    ],
    lede:
      "De eerste studiosite van YWdesign: matglazen panelen die zweven boven een bewegend blauwgroen verloop, een dienstenraster, een volledig transparante roadmap en een offertetrechter. Gebouwd om een eenmansstudio als een betrouwbare partner te laten voelen.",
    liveHref: "https://ywdesign2.netlify.app/",
    meta: {
      role: "Merk, design & bouw",
      year: "2023",
      sector: "Webstudio · Freelance",
      stack: ["Next.js", "Tailwind CSS", "Sanity", "Framer Motion"],
    },
    heroImg: "/work/ywdesign-hero.jpg",
    heroAlt: "Homepage van YWdesign v1 — “Your Digital Partner” op een blauwgroen verloop met glazen navigatie",
    metaTitle: "YWdesign v1 — Case study",
    metaDescription:
      "De vorige studiosite van YWdesign: een glassmorphism-designsysteem in Tailwind, een featureraster met eigen iconen, een transparante roadmap stap voor stap en een EN · FR-versie.",
    sections: [
      {
        kind: "twoColFeature",
        head: {
          eyebrow: "De briefing",
          title: "Laat een eenmansstudio voelen als een partner.",
        },
        paras: [
          [
            { t: "Wie een freelancer inhuurt, maakt zich zorgen over één ding: " },
            { t: "wat er na de lancering gebeurt", b: true },
            {
              t: ". De site moest dat beantwoorden vóór iemand het vroeg — duidelijke diensten, een zichtbaar proces en een directe lijn naar een mens.",
            },
          ],
          [
            { t: "De look droeg de boodschap: " },
            { t: "licht, gelaagd glas", b: true },
            {
              t: " boven een levend verloop. Niets zwaar, alles leesbaar, en elk paneel een klein venster op het merk erachter.",
            },
          ],
        ],
        features: [
          {
            k: "[ glass_system ]",
            b: "Matglazen panelen, één recept",
            p: "Wit op 10% dekking, achtergrondvervaging, een fijne rand en een zachte schaduw — hetzelfde Tailwind-recept voor navigatie, kaarten, footer en knoppen.",
          },
          {
            k: "[ feature_icons ]",
            b: "Zes beloftes, zes iconen",
            p: "Responsiveness, animaties, performance, UX/UI, CMS en SEO — elk met een eigen icoon en een belofte in twee regels.",
          },
          {
            k: "[ roadmap ]",
            b: "Een proces dat je ziet",
            p: "Van projectdefinitie tot onderhoud is elke stap uitgetekend, zodat prijs en planning nooit verrassen.",
          },
          {
            k: "[ i18n ]",
            b: "EN · FR",
            p: "Tweetalige routing en teksten voor klanten in België, Frankrijk en Zwitserland.",
          },
        ],
      },
      {
        kind: "signature",
        demo: "ywGlass",
        head: {
          eyebrow: "Signature build",
          title: "Wat maakt een betere website",
          intro:
            "Het featureraster van de oude dienstenpagina, herbouwd in pure CSS: matglazen kaarten op een bewegend verloop, verspringende kolommen, en een lift met pulserende rand bij hover. Zet het glas uit om te zien wat de vervaging doet.",
        },
        label: "components/FeatureCard.jsx",
        note: "hover · glas aan/uit",
      },
      {
        kind: "approach",
        head: {
          eyebrow: "Hoe het converteert",
          title: "Transparantie als verkoopargument",
          intro:
            "De roadmap-pagina doet de verkoop: elke stap van eerste gesprek tot oplevering ligt open, zodat een offerteaanvraag de logische volgende stap wordt.",
        },
        steps: [
          {
            sn: "01 / definitie & contract",
            h: "Scope, timing, budget",
            p: "Het eerste gesprek legt doelen en middelen vast; een contractvoorstel volgt vóór er gewerkt wordt.",
          },
          {
            sn: "02 / ideeën & iteratie",
            h: "Twee rondes, dan code",
            p: "Waarden, huisstijl en stijlvoorkeuren worden ideeën, gevolgd door twee iteraties op structuur en design vóór goedkeuring.",
          },
          {
            sn: "03 / oplevering & onderhoud",
            h: "Alle code is van jou",
            p: "Het afgewerkte product wordt volledig overgedragen, met een onderhoudsplan om het gezond te houden.",
          },
        ],
      },
      {
        kind: "quote",
        quote: [
          { t: "Voorkomen is beter dan genezen. " },
          { t: "Een onderhoudsplan", accent: true },
          { t: " is cruciaal voor de gezondheid van je product." },
        ],
        cite: "// YWdesign v1 — de roadmap, laatste stap",
      },
      {
        kind: "gallery",
        head: { eyebrow: "Galerij", title: "Door de site" },
        items: [
          { id: "ywdesign-g1", span: "wide", alt: "Projecten — recent werk onder een glazen navigatiebalk en een skill-ticker" },
          { id: "ywdesign-g2", span: "tall", alt: "Featureraster — zes glazen kaarten met eigen iconen" },
          { id: "ywdesign-g3", span: "half", alt: "Roadmap — de samenwerking stap voor stap gevisualiseerd" },
          { id: "ywdesign-g4", span: "half", alt: "Over mij — “Hi, I am Yolan”" },
        ],
      },
    ],
    signatureData: {
      ywGlass: {
        toggle: "Glas",
        cards: [
          { t: "Responsiveness", d: "Een mooie lay-out op elk schermformaat." },
          { t: "Animaties", d: "Dynamische interacties die je website tot leven brengen." },
          { t: "Performance", d: "Vertel je verhaal met snelle internettechnologie." },
          { t: "UX/UI-gericht", d: "Gebruikers houden van een licht en eenvoudig design." },
          { t: "CMS", d: "Je beheert de inhoud zelf." },
          { t: "SEO", d: "Bereik organisch nieuwe klanten." },
        ],
      },
    },
  },

  // ── 06 · Milo Weiler — Analoog ──────────────────────────────────────────
  analoog: {
    slug: "analoog",
    eyebrowNum: "06",
    category: "Analoge fotografie · België",
    year: "2026",
    titleSegs: [
      { t: "Milo Weiler Analoog — gemaakt om " },
      { t: "door te geven.", scramble: true, accent: true },
    ],
    lede:
      "Een rustige, redactionele dienstensite voor fine-art filmfotografie — uitvaarten, karakterportretten en huwelijken op middenformaat. Gebouwd om de bezoeker te laten vertragen, vertrouwen te winnen op de meest delicate dagen van een leven, en dat om te zetten in een eerste gesprek.",
    liveHref: "https://analoog.miloweiler.com/nl",
    meta: {
      role: "Ontwerp & build",
      year: "2026",
      sector: "Fotografie · Diensten",
      stack: ["Next.js", "Sanity", "i18n"],
    },
    heroImg: "/work/analoog-hero.jpg",
    heroAlt: "Milo Weiler Analoog — hero in serif “Analoog gemaakt om door te geven”",
    metaTitle: "Milo Weiler Analoog — Case study",
    metaDescription:
      "Een redactionele dienstensite voor een analoog fotograaf in Antwerpen & Brussel — uitvaartreportages, karakterportretten en huwelijken op middenformaat, een traject in vier stappen en een drietalige NL · EN · FR-build.",
    sections: [
      {
        kind: "twoColFeature",
        head: {
          eyebrow: "De briefing",
          title: "Traagheid verkopen in een wereld gemaakt om te scrollen.",
        },
        paras: [
          [
            {
              t: "Milo fotografeert met een Mamiya RB67 — middenformaat film, elk beeld gewogen. De site moest die ",
            },
            { t: "intentie", b: true },
            {
              t: " voelbaar maken nog voor er gelezen wordt: warme papiertinten, een klassieke serif, veel witruimte en beelden die één voor één binnenkomen.",
            },
          ],
          [
            { t: "Het moeilijkste was de toon. Een " },
            { t: "uitvaartdienst", b: true },
            {
              t: " staat naast portretten en huwelijken, dus elke zin moest rustig, respectvol en helder zijn over prijs en traject — eerst geruststellen, dan pas verkopen.",
            },
          ],
        ],
        features: [
          {
            k: "[ editorial_pacing ]",
            b: "Scrollen dat vertraagt",
            p: "Titels letter per letter, een ingekaderde showcase die uitgroeit tot volledig beeld, en gestapelde dienstkaarten die lezen als de pagina’s van een album.",
          },
          {
            k: "[ three_services ]",
            b: "Afscheid · Gezicht · Belofte",
            p: "Uitvaartreportage, karakterportretten en analoge huwelijken — elk met een eigen belofte, eindstuk en detailpagina.",
          },
          {
            k: "[ headless_cms ]",
            b: "Content beheerd in Sanity",
            p: "Diensten, beelden en teksten door Milo aanpasbaar in drie talen, zonder deploys.",
          },
          {
            k: "[ i18n ]",
            b: "NL · EN · FR",
            p: "Gelokaliseerde routing en metadata voor een Belgisch publiek in alle drie de talen.",
          },
        ],
      },
      {
        kind: "approach",
        head: {
          eyebrow: "Hoe het converteert",
          title: "Van eerste gesprek tot stuk in handen",
          intro:
            "De trajectsectie neemt elke twijfel weg: één aanspreekpunt, een vaste prijs vooraf, hetzelfde eenvoudige pad voor elke dienst.",
        },
        steps: [
          {
            sn: "01 / acquaintance",
            h: "Een vrijblijvend gesprek",
            p: "Telefonisch of in persoon — de site leidt meteen naar een rechtstreeks nummer, geen formulier op een zware dag.",
          },
          {
            sn: "02 / booking & sitting",
            h: "Heldere prijs, rustige dag",
            p: "Datum, omvang en prijs vooraf vastgelegd; op de dag zelf komt Milo rustig langs, op film, en laat hij de dag zich ontvouwen.",
          },
          {
            sn: "03 / the piece",
            h: "Met de hand gebonden",
            p: "Ontwikkeld, geselecteerd en met de hand gebonden — geleverd binnen vier tot acht weken. Het object is het product, en de site zegt het.",
          },
        ],
      },
      {
        kind: "quote",
        quote: [
          { t: "Geen vluchtige digitale opname, maar " },
          { t: "een tastbaar, handgemaakt beeld", accent: true },
          { t: " — om door te geven aan de generaties die volgen." },
        ],
        cite: "// Milo Weiler — de filosofie, als ruggengraat van de site",
      },
      {
        kind: "gallery",
        head: { eyebrow: "Galerij", title: "Doorheen de site" },
        items: [
          { id: "analoog-g1", span: "wide", alt: "Showcase op volledig scherm — “Analoog blijft.”" },
          { id: "analoog-g2", span: "tall", alt: "Filosofiesectie met een zwart-wit filmbeeld" },
          { id: "analoog-g3", span: "half", alt: "Traject in vier stappen — kennismaking, boeking, opname, het stuk" },
          { id: "analoog-g4", span: "half", alt: "Ingekaderde showcase van een middenformaatportret" },
        ],
      },
    ],
  },

  // ── 07 · Yoga, Zen & Tonic ──────────────────────────────────────────────
  yoga: {
    slug: "yoga",
    eyebrowNum: "07",
    category: "Yogaretreats · België",
    year: "2026",
    titleSegs: [
      { t: "Yoga, Zen & Tonic — één studio runt " },
      { t: "het hele bedrijf.", scramble: true, accent: true },
    ],
    lede:
      "Een tweetalige site voor de retreats, lessen en events van een yogaduo — en daarachter een Sanity Studio op hun maat. Rita & Philippe beheren inschrijvingen, mails, het contactboek, nieuwsbrieven, foto’s en elke pagina vanuit één plek, vaak op hun gsm.",
    liveHref: "https://yogazentonic.com",
    meta: {
      role: "Ontwerp, build & CMS",
      year: "2026",
      sector: "Wellness · Retreats",
      stack: ["Next.js", "Sanity", "Resend", "Gemini"],
    },
    heroImg: "/work/yoga-hero.jpg",
    heroAlt: "Home van Yoga, Zen & Tonic — “Yoga, zen en een scheut tonic.” over een woestijnfoto",
    metaTitle: "Yoga, Zen & Tonic — Case study",
    metaDescription:
      "Een retreatbedrijf gerund vanuit één Sanity Studio op maat: inschrijfformulieren, inschrijvingen met live plaatsen, bevestigingsmails, een contactboek, nieuwsbrieven, een fotobank en een NL · EN-site met AI-vertaling.",
    sections: [
      {
        kind: "signature",
        demo: "yogaStudio",
        placement: "hero",
        head: {
          eyebrow: "Signature build",
          title: "Hun studio, nagebouwd om zelf te klikken",
        },
        label: "studio/structure/index.ts",
        note: "Een werkende replica van hun Studio · bevestig een inschrijving, verstuur de nieuwsbrief, vertaal een retreat",
      },
      {
        kind: "twoColFeature",
        head: {
          eyebrow: "De briefing",
          title: "Eén login in plaats van zes tools.",
        },
        paras: [
          [
            { t: "Vroeger leefde een retreat in " },
            { t: "Google Forms, een spreadsheet, Gmail, Mailchimp, Facebook en een website", b: true },
            { t: " — elk met een eigen login en een eigen kopie van de deelnemerslijst. Niets wist hoeveel plaatsen er nog vrij waren." },
          ],
          [
            { t: "Rita & Philippe zijn niet technisch en werken op hun gsm tussen twee lessen door. De vraag was dus niet “een CMS”, maar " },
            { t: "één plek die het bedrijf draait", b: true },
            { t: ", en die zichzelf uitlegt bij elk veld." },
          ],
        ],
        features: [
          {
            k: "[ sign_ups ]",
            b: "Formulieren → inschrijvingen → plaatsen",
            p: "Een eigen formulierbouwer met stappen en voorwaardelijke vragen. Elke inschrijving opent als leesbare kaart; één klik op de status herberekent de vrije plaatsen op de site.",
          },
          {
            k: "[ mails ]",
            b: "Mails die ze zelf schrijven",
            p: "Bevestigings-, wachtlijst- en nieuwsbriefmails zijn documenten met een live HTML-voorbeeld, een testmail-naar-mezelf-knop en verzending via Resend.",
          },
          {
            k: "[ contact_book ]",
            b: "Iedereen, één keer",
            p: "Inschrijvingen, berichten, reviews en abonnees samengevoegd tot één rij per e-mailadres — met toestemming, afmeldingen, CSV-import en -export.",
          },
          {
            k: "[ i18n_ai ]",
            b: "NL · EN, met ✨",
            p: "Vertaling per veld met NL | EN-tabs. Eén klik vertaalt een veld, een bulktool vertaalt elk document waar nog Engels ontbreekt.",
          },
        ],
      },
      {
        kind: "chapterIndex",
        head: {
          eyebrow: "De studio",
          title: "Wat er allemaal door loopt",
          intro: "29 documenttypes, 24 eigen Studio-componenten, hooguit twee klikken naar elk document.",
        },
        chapters: [
          { cn: "01", ct: "Retreats", cd: "Eén document per retreat, tabs in de volgorde van de pagina, een overzicht van wat nog leeg is" },
          { cn: "02", ct: "Inschrijfformulieren", cd: "Stappen, voorwaardelijke vragen, “Andere: …”, een formulier per retreat of het standaardformulier" },
          { cn: "03", ct: "Inschrijvingen", cd: "Statusfilters, een leesbare kaart, een tabel met CSV, live “geboekt” per retreat" },
          { cn: "04", ct: "Mails", cd: "Bevestiging, wachtlijst en ontvangstbevestigingen — aanpasbaar, met voorbeeld, getest" },
          { cn: "05", ct: "Contactboek", cd: "Eén rij per adres, uit elk formulier, nieuwsbrief aan/uit" },
          { cn: "06", ct: "Nieuwsbrieven", cd: "Retreatkaarten, een doelgroep, een testmail, en dan één keer verstuurd" },
          { cn: "07", ct: "Fotobank", cd: "Elke foto één keer bewaard, met hotspot en AI-alt-tekst" },
          { cn: "08", ct: "Reviews", cd: "Komen privé binnen, gaan publiek zonder het e-mailadres" },
        ],
      },
      {
        kind: "featureList",
        head: {
          eyebrow: "Studio-UX",
          title: "Regels die ontstonden door hen te zien werken",
          intro: "De standaard van Sanity is gemaakt voor developers. Elke wijziging hieronder loste iets op dat de mensen verwarde die er elke dag mee werken.",
        },
        features: [
          {
            k: "[ where_it_goes ]",
            b: "Elk veld zegt waar het komt",
            p: "Niet “Titel”, maar “de grote titel op het kaartje en in Google” — achter een kleine ⓘ, zodat hulp geen plaats kost.",
          },
          {
            k: "[ two_clicks ]",
            b: "Twee klikken naar alles",
            p: "Groepen, dan documenten. De paginasingleton staat bovenaan zijn lijst; statussen zijn filterchips, geen extra panelen.",
          },
          {
            k: "[ no_red ]",
            b: "Geen rood voor “nog niet klaar”",
            p: "Leeg is geen fout: bezig = blauw, klaar = groen. Rood is voor echte fouten.",
          },
          {
            k: "[ placeholders ]",
            b: "[Haakjes] gaan nooit online",
            p: "Elke tekst nog tussen [haakjes] waarschuwt in geel en komt in één lijst “Nog in te vullen”.",
          },
          {
            k: "[ one_row ]",
            b: "Compact maar leesbaar",
            p: "Korte velden nemen één rij — titel, invoer, NL | EN, ✨ — zodat een retreat op een gsm-scherm past.",
          },
          {
            k: "[ live_preview ]",
            b: "Bewerken met de pagina ernaast",
            p: "Presentation met drafts en klik-om-te-bewerken; publiceren triggert een webhook die de statische site vernieuwt.",
          },
        ],
      },
      {
        kind: "statBand",
        stats: [
          { sv: "1", sl: "Studio voor inschrijvingen, mails, nieuwsbrieven en elke pagina" },
          { sv: "0", sl: "Extra tools — geen Google Forms, Mailchimp of spreadsheets" },
          { sv: "2", sl: "Talen per veld, met AI-vertaling" },
        ],
      },
      {
        kind: "quote",
        quote: [
          { t: "Leg uit waar de waarde naartoe gaat. " },
          { t: "Elk veld zegt waar het op de site verschijnt", accent: true },
          { t: " — en waarvoor het dient." },
        ],
        cite: "// Studio-UX-regel nr. 1 — studio/SANITY-UI.md",
      },
      {
        kind: "gallery",
        head: { eyebrow: "Galerij", title: "Door de site" },
        items: [
          { id: "yoga-g1", span: "wide", alt: "Dahab: Yoga & Freediving — een retreatpagina opent met haar foto, data en vrije plaatsen" },
          { id: "yoga-g2", span: "tall", alt: "Een retreatpagina op gsm — data, vrije plaatsen en de inschrijfknop" },
          { id: "yoga-g3", span: "half", alt: "Retreats — de komende retreats als kaartjes met vrije plaatsen" },
          { id: "yoga-g4", span: "half", alt: "Lessen — weekplanning met een niveau per les" },
        ],
      },
    ],
    signatureData: {
      yogaStudio: {
        hint: "Een werkende replica van hun Studio — klik gerust rond",
        publish: "Publiceren",
        published: "Gepubliceerd",
        draft: "Concept",
        soon: "Zit in de volledige Studio",
        months: ["jan", "feb", "mrt", "apr", "mei", "jun", "jul", "aug", "sep", "okt", "nov", "dec"],
        groups: { contact: "Contact", content: "Inhoud" },
        nav: {
          signups: "Inschrijvingen",
          messages: "Contactformulier",
          contacts: "Contactboek",
          newsletters: "Nieuwsbrieven",
          retreats: "Retreats",
          forms: "Formulieren",
          mails: "Mails",
          pages: "Pagina's",
          media: "Fotobank",
        },
        signups: {
          all: "Alle",
          statuses: { new: "Nieuw", confirmed: "Bevestigd", waitlist: "Wachtlijst", cancelled: "Geannuleerd" },
          allRetreats: "Alle retreats",
          empty: "Niets hier.",
          signedUpOn: "Ingeschreven op {date}",
          booked: "Geboekt {n} / {cap}",
          left: "nog {n} vrij",
          full: "volzet",
          status: "Status",
          fullWarn: "De retreat is volzet: zet deze inschrijving op Wachtlijst, of verhoog Max. deelnemers.",
          email: "E-mail",
          phone: "GSM",
          room: "Kamer / prijs",
          diet: "Dieetwensen of allergieën",
          message: "Vragen of opmerkingen",
          consent: "Akkoord gegevens · voorwaarden",
          yes: "Ja",
          no: "Nee",
          note: "Interne notitie (enkel zichtbaar in de Studio)",
          notePh: "bv. voorschot betaald op 8 nov",
          confirmMail: "Bevestigingsmail",
          mailSent: "Bevestigingsmail verstuurd naar {name}",
          statusToast: "Status: {s} — plaatsen op de site bijgewerkt",
        },
        newsletter: {
          sent: "Verstuurd op {date} · {n} adressen",
          steps: ["Schrijven", "Testen", "Publiceren", "Versturen"],
          tabContent: "Inhoud",
          tabSend: "Versturen",
          name: { label: "Naam", help: "Niet op de site: enkel om de nieuwsbrief terug te vinden in de Studio. Lezers zien dit niet." },
          subject: { label: "Onderwerp", help: "Wat ze in hun inbox zien. Gebruik {naam} voor hun voornaam." },
          heading: { label: "Titel", help: "Grote titel in de mail, onder de foto en boven de tekst. Optioneel." },
          body: { label: "Tekst", help: "De hoofdtekst van de mail. Begin bv. met “Dag {naam},”. Vet, cursief, links en opsommingen kunnen." },
          blocks: { label: "Onder de tekst", help: "Kaartjes van retreats of lessen, een eigen kaart, een knop of extra tekst — in deze volgorde." },
          blockCard: "Kaart: retreat",
          blockButton: "Knop",
          audience: { label: "Naar wie", help: "Nooit naar wie zich afmeldde. Iedereen krijgt hem in de eigen taal, met een eigen afmeldlink." },
          audiences: {
            subscribers: { label: "Nieuwsbrief-abonnees", help: "Schreven zich in via de footer of het contactformulier." },
            participants: { label: "Deelnemers van retreats", help: "Schreven zich ooit in voor een retreat (klanten: mag, met afmeldlink)." },
            contacts: { label: "Iedereen in het contactboek", help: "Enkel als ze daar toestemming voor gaven (GDPR)." },
          },
          preview: "Voorbeeld",
          test: "Stuur testmail naar mezelf",
          testSent: "Testmail verstuurd naar {email}",
          sendBtn: "Nieuwsbrief versturen…",
          sentOn: "Verstuurd op",
          dialogTitle: "“{name}” versturen",
          recipients: "{n} ontvangers ({nl} NL, {en} EN)",
          recipientsNote: "Het contactboek zonder wie zich afmeldde. Wordt automatisch ingevuld, zodat hij nooit twee keer vertrekt.",
          tip: "Tip: stuur eerst een testmail naar jezelf (rechts, onder het voorbeeld).",
          cancel: "Annuleren",
          sendTo: "Verstuur naar {n}",
          sentToast: "Nieuwsbrief verstuurd naar {n} adressen",
          publishedToast: "Gepubliceerd — klaar om te versturen",
        },
        retreat: {
          page: "Retreats-pagina",
          pageSub: "Titel, intro en openingsfoto van /retreats",
          upcoming: "Komend",
          past: "Voorbij",
          all: "Alle",
          featured: "in de kijker op Home",
          progress: "Retreat {pct}% ingevuld",
          noEn: "{n} zonder EN",
          translateAll: "Alles vertalen (AI)",
          stillEmpty: "Nog leeg:",
          standard: "standaard",
          custom: "aangepast",
          translate: "Vertaal NL → EN (AI)",
          translated: "{n} tekst(en) naar het Engels vertaald",
          translateEdited: "Demo: ✨ kent enkel de originele teksten — de echte vraagt het aan Gemini",
          auto: "automatisch, uit bevestigde inschrijvingen",
          groups: {
            basics: { t: "Basis", where: "Bovenaan de pagina en op de kaartjes: datum, plaats, prijs, “nog x plaatsen”." },
            nutshell: { t: "Notendop", where: "Het eerste tekstblok, met de belangrijkste punten op een rij." },
            place: { t: "De plek", where: "Het verblijf en de omgeving, met 2 foto's." },
            practical: { t: "Praktisch", where: "Prijzen per kamer, voorschot, wat (niet) inbegrepen is." },
            closing: { t: "Afsluiter", where: "Het slot onderaan: grote foto, korte tekst en de knop Inschrijven." },
            seo: { t: "SEO", where: "Google en delen op WhatsApp. Leeg = titel + notendop." },
          },
          fields: {
            title: { label: "Titel", help: "De grote titel op de retreatpagina, op de kaartjes en in Google. Kort: max. 40 tekens." },
            startDate: { label: "Van", help: "Eerste dag. Komend / Voorbij volgt uit de einddatum — nooit met de hand." },
            endDate: { label: "Tot en met", help: "Laatste dag. Daarna schuift de retreat naar “Voorbij” en toont hij de terugblik." },
            place: { label: "Plaats", help: "Naast de datum op de pagina en de kaartjes, bv. “Belgische Eifel”." },
            country: { label: "Land", help: "Naast de plaats, ook in het menu. bv. “België”." },
            capacity: { label: "Max. deelnemers", help: "Vrije plaatsen op de site = Max. − Geboekt − Extra. Niets meer vrij: “volzet” + wachtlijst." },
            booked: { label: "Geboekt (automatisch)", help: "Telt de bevestigde inschrijvingen. Wijzig de status van een inschrijving en dit volgt." },
            bookedExtra: { label: "Extra bezet (manueel)", help: "Plaatsen buiten het formulier om, bv. vrienden die cash betaalden." },
            nutshellTitle: { label: "Kop", help: "De kop van “In een notendop”, bv. “Onze klassieker.”" },
            nutshellText: { label: "Intro", help: "De eerste tekst die bezoekers lezen. Kort houden: max. 400 tekens." },
            highlights: { label: "Hoogtepunten", help: "Eén per regel. Op een rij getoond, met icoontjes." },
            placeTitle: { label: "Kop", help: "De kop van “De plek”." },
            placeText: { label: "Tekst", help: "Over het verblijf en de omgeving. Max. 400 tekens." },
            deposit: { label: "Voorschot (€)", help: "Gevraagd in de bevestigingsmail. Leeg = geen voorschotblok." },
            included: { label: "Inbegrepen", help: "Eén per regel, getoond met een ✓." },
            notIncluded: { label: "Niet inbegrepen", help: "Eén per regel, bv. “Vervoer naar het verblijf”." },
            closingTitle: { label: "Kop", help: "Grote kop op de slotfoto." },
            closingText: { label: "Tekst", help: "Eén of twee zinnen boven de knop Inschrijven." },
            seoTitle: { label: "Google-titel", help: "Leeg = de titel van de retreat. Max. 60 tekens." },
            seoDescription: { label: "Google-beschrijving", help: "Leeg = de intro van de notendop. Max. 160 tekens." },
          },
        },
      },
    },
  },
} satisfies Record<Slug, Project>;
