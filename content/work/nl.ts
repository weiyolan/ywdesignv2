import type { Slug, Project } from "./en";

export const projectsNL: Record<Slug, Project> = {
  // ── 01 · Nu ─────────────────────────────────────────────────────────────
  nu: {
    slug: "nu",
    eyebrowNum: "01",
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
    heroImg: "/work/nu-hero.svg",
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
    heroImg: "/work/milo-hero.svg",
    heroAlt: "Milo Weiler — cinematografisch fotografieportfolio hero",
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
        demo: "miloRail",
        head: {
          eyebrow: "Signature build",
          title: "De vastgezette hoofdstukrail",
          intro:
            "Navigatie die zich tegelijk gedraagt als een inhoudstafel en een scrollpositie. Kies een hoofdstuk — het podium en de index reageren, net zoals de live site reageert wanneer je scrolt. Probeer het:",
        },
        label: "ChapterNav.tsx",
        note: "live component",
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
          { id: "milo-g1", span: "tall", alt: "Setfotografie" },
          { id: "milo-g2", span: "wide", alt: "Hoofdstuklanding" },
          { id: "milo-g3", span: "half", alt: "Portretten" },
          { id: "milo-g4", span: "half", alt: "Fine art" },
        ],
      },
    ],
    signatureData: {
      // `rail` = the short label on the rail button (prototype rail markup);
      // `t` = the caption heading shown in the stage (prototype data[] array).
      miloRail: [
        {
          rail: "Setfotografie",
          t: "Setfotografie",
          p: "Waar kunst en verhaal elkaar ontmoeten — momenten uit videoclips, film, theater en commercials in België en daarbuiten.",
        },
        {
          rail: "Corporate & Brand",
          t: "Corporate & Brand",
          p: "Een bedrijf is meer dan zijn product. Merkcampagnes, teamportretten en behind-the-scenes voor bedrijven in België en Nederland.",
        },
        {
          rail: "Events & Docs",
          t: "Events & Documentaires",
          p: "Van concertpodia tot conferentiezalen — events documenteren zoals ze zich ontvouwen, authentieke momenten boven geposeerde.",
        },
        {
          rail: "Portretten",
          t: "Portretten & Headshots",
          p: "Portretten als verlengstuk van iemands verhaal — professionele headshots voor acteurs, muzikanten en bedrijfsklanten, op digitaal en film.",
        },
        {
          rail: "Product & Food",
          t: "Product & Food",
          p: "Elk vakkundig gemaakt object vertelt een verhaal van ontwerp, textuur en intentie — vertaald door licht, vorm en oppervlak.",
        },
        {
          rail: "Fine Art",
          t: "Fine Art & Persoonlijk",
          p: "Doorlopende verkenningen tussen documentaire en geregisseerde benaderingen, die de onzichtbare context natrekken die een moment vormt.",
        },
      ],
    },
  },

  // ── 03 · Bermuda Events ─────────────────────────────────────────────────
  bermuda: {
    slug: "bermuda",
    eyebrowNum: "03",
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
    heroImg: "/work/bermuda-hero.svg",
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
        getLostIn: "Get lost in",
        cards: [
          { title: "Creativiteit", sub: "Een nieuw concept op jouw maat. Telkens weer." },
          { title: "Detail", sub: "Niets aan het toeval overgelaten. Aan elk detail gedacht." },
          { title: "Persoonlijkheid", sub: "Dezelfde persoon, altijd voor jou paraat." },
        ],
        note: {
          heading: "Waarom het hier herkleurd is",
          body: [
            { t: "Live draait Bermuda op zijn eigen aardetint-identiteit — klei, zand, olijf. Voor deze case study heb ik exact dezelfde morph hertekend naar het eigen systeem van het portfolio: " },
            { t: "neutrale inkt", accent: true },
            { t: " in rust, oplichtend tot vol contrast bij focus, terwijl de morphende focusvorm zich oplost in het " },
            { t: "accent", accent: true },
            { t: ". De geometrie blijft onaangeroerd — enkel het palet is omgewisseld naar zwart / wit / accent zodat het component in deze site past in plaats van ertegen te vechten." },
          ],
        },
      },
    },
  },

  // ── 04 · Spiree ─────────────────────────────────────────────────────────
  spiree: {
    slug: "spiree",
    eyebrowNum: "04",
    category: "Activewear merk · 100% Merino",
    year: "2025",
    titleSegs: [
      { t: "Spiree — hardlopen, " },
      { t: "hemels.", scramble: true, accent: true },
    ],
    lede:
      "Een gedurfde, verhaal-eerst merksite voor een onafhankelijk sportkledinglabel voor vrouwen. Een custom gradiëntsysteem en een Zon & Maan identiteit dragen een crowdfundinglancering — product tweede, verhaal eerst.",
    liveHref: "https://spiree-next.netlify.app/",
    meta: {
      role: "Ontwerp & build",
      year: "2025",
      sector: "E-commerce · DTC",
      stack: ["Next.js", "React", "Tailwind"],
    },
    heroImg: "/work/spiree-hero.svg",
    heroAlt: "Spiree — hemels activewear merk hero",
    metaTitle: "Spiree — Case study",
    metaDescription:
      "Een gedurfde, verhaal-eerst merksite voor een onafhankelijk sportkledinglabel voor vrouwen — een custom gradiëntsysteem en een Zon & Maan identiteit die een crowdfundinglancering dragen.",
    sections: [
      {
        kind: "narrative",
        head: { eyebrow: "Het verhaal", title: "Product tweede. Verhaal eerst." },
        paras: [
          [
            { t: "Spiree maakt " },
            { t: "baselayers van 100% Merinowol", b: true },
            {
              t: " voor hardlopen en bergsport — thermoregulerend van +30 °C tot −10 °C. Maar een spec sheet financiert geen lancering. De site moest een premium, duurzaam product verkopen ",
            },
            { t: "én", b: true },
            { t: " backers verzamelen voor een crowdfundingcampagne." },
          ],
          [
            { t: "Het antwoord was een " },
            { t: "hemelse identiteit", b: true },
            {
              t: " gebouwd rond Astrid — de hardloopster naar wie het merk vernoemd is. Een Sun-lijn om ",
            },
            { t: "je innerlijke vuur te ontketenen", accent: true },
            { t: ", een Moon-lijn om " },
            { t: "je etherische kant te omarmen", accent: true },
            { t: " — elk met zijn eigen gradiëntwereld, samengebracht door één verhaal." },
          ],
        ],
      },
      {
        kind: "signature",
        demo: "spireeOrb",
        head: {
          eyebrow: "Signature build",
          title: "De Sun ↔ Moon collectieswitch",
          intro:
            "De kerninteractie: één toggle vormt de hele productwereld om — gradiënt, copy, prijscontext en palet — tussen de twee hemelse collecties. Met de hand gebouwd, zonder library. Probeer het:",
        },
        label: "CollectionSwitch.tsx",
        note: "live component",
      },
      {
        kind: "compare",
        head: {
          eyebrow: "Twee werelden, één systeem",
          title: "Sun & Moon",
          intro:
            "De collectieswitch is geen gimmick — elke wereld stuurt zijn eigen palet, copy en productcontext aan vanuit één met de hand gebouwde gradiënt-engine.",
        },
        cols: [
          {
            ct: "☀ Collection",
            h: "Sun",
            p: "Ontketen je innerlijke vuur.",
            items: [
              "Warme amber → ember gradiëntwereld",
              "Energieke copy voor racedag",
              "Verhaal van overdag, warmteregulerend",
            ],
          },
          {
            ct: "☾ Collection",
            h: "Moon",
            p: "Omarm je etherische kant.",
            items: [
              "Koele indigo → zilver gradiëntwereld",
              "Kalme, reflectieve copy voor herstel",
              "Verhaal van nachtelijk lopen, warmtebehoudend",
            ],
          },
        ],
      },
      {
        kind: "statBand",
        stats: [
          { sv: "2", sl: "Collecties — Sun & Moon vanuit één gradiënt-engine" },
          { sv: "40°", sl: "Thermisch bereik — Merino-comfort van +30 tot −10 °C" },
          { sv: "€99", sl: "Baselayer — volledige webshop met maat & winkelmandje" },
        ],
      },
      {
        kind: "gallery",
        head: { eyebrow: "Galerij", title: "Doorheen de site" },
        items: [
          { id: "spiree-g1", span: "wide", alt: "Collectiepagina" },
          { id: "spiree-g2", span: "tall", alt: "Productdetail" },
          { id: "spiree-g3", span: "half", alt: "Merino-verhaal" },
          { id: "spiree-g4", span: "half", alt: "Maak kennis met Astrid" },
        ],
      },
    ],
    signatureData: {
      spireeOrb: {
        sun: { t: "Sun", s: "Ontketen je innerlijke vuur" },
        moon: { t: "Moon", s: "Omarm je etherische kant" },
        meta: "Incl. btw & verzending in EU",
        add: "Toevoegen aan winkelmandje",
        added: "✓ Toegevoegd aan winkelmandje",
      },
    },
  },
};
