// Project case-study content — ported verbatim from the prototype's per-project
// HTML (Claude Design/projects/{nu,milo,bermuda,spiree}.html). English only for
// now, typed so EN/FR/NL can be lifted later via a getDictionary(lang) loader.
//
// Every section is a discriminated union member keyed by `kind`; the Section
// renderer (components/work/Section.tsx) switches on it. Signature demos carry
// their interactive payload in `signatureData` so the (server) page can hand it
// to the matching "use client" demo.
import type { Seg } from "@/content/home";

export type Slug = "nu" | "milo" | "bermuda" | "spiree";
export const order: Slug[] = ["nu", "milo", "bermuda", "spiree"];

/** A meta chip group head + body — the .ds-head / .sec-kicker intro of a section. */
export type Head = {
  /** kicker token, e.g. "The challenge" (rendered after "//") */
  eyebrow: string;
  title: string;
  /** optional lede paragraph under the heading */
  intro?: string;
};

export type Section =
  | {
      kind: "narrative";
      head: Head;
      /** paragraphs as Seg[] so inline <b>/.accent runs survive */
      paras: Seg[][];
    }
  | {
      kind: "approach";
      head: Head;
      steps: { sn: string; h: string; p: string }[];
    }
  | {
      kind: "twoColFeature";
      head: Head;
      /** left-column prose (under the head) */
      paras: Seg[][];
      features: { k: string; b: string; p: string }[];
    }
  | {
      kind: "featureList";
      head: Head;
      features: { k: string; b: string; p: string }[];
    }
  | {
      kind: "statBand";
      head?: Head;
      stats: { sv: string; sl: string }[];
    }
  | {
      kind: "quote";
      /** blockquote body as Seg[] (accent runs) */
      quote: Seg[];
      cite: string;
    }
  | {
      kind: "compare";
      head: Head;
      cols: { ct: string; h: string; p: string; items: string[] }[];
    }
  | {
      kind: "chapterIndex";
      head: Head;
      chapters: { cn: string; ct: string; cd: string }[];
    }
  | {
      kind: "signature";
      head: Head;
      demo: "nuLang" | "nuShop" | "miloRail" | "bermudaIcons" | "spireeOrb";
      /** the .demo-head label (file path) and right-hand caption */
      label: string;
      note: string;
    }
  | {
      kind: "gallery";
      head: Head;
      items: { id: string; span: "wide" | "tall" | "half"; alt: string }[];
    };

export type Project = {
  slug: Slug;
  eyebrowNum: string;
  category: string;
  year: string;
  /** h1 with the accent/scramble run flagged */
  titleSegs: Seg[];
  lede: string;
  liveHref: string;
  meta: { role: string; year: string; sector: string; stack: string[] };
  heroImg: string;
  heroAlt: string;
  sections: Section[];
  /** SEO */
  metaTitle: string;
  metaDescription: string;
  /** per-demo interactive payloads (consumed by signature components) */
  signatureData?: {
    nuLang?: {
      en: { h: string; p: string; nm: string; add: string; added: string };
      fr: { h: string; p: string; nm: string; add: string; added: string };
    };
    nuShop?: {
      products: { id: string; stars: number }[];
      copy: {
        fr: Record<string, string>;
        en: Record<string, string>;
      };
    };
    miloRail?: { rail: string; t: string; p: string }[];
    spireeOrb?: {
      sun: { t: string; s: string };
      moon: { t: string; s: string };
    };
  };
};

export const projects: Record<Slug, Project> = {
  // ── 01 · Nu ─────────────────────────────────────────────────────────────
  nu: {
    slug: "nu",
    eyebrowNum: "01",
    category: "Beauty & wellness e-commerce",
    year: "2024",
    titleSegs: [
      { t: "Nu — clean beauty, " },
      { t: "sold calmly.", scramble: true, accent: true },
    ],
    lede:
      "A multilingual storefront for a clean-beauty brand — editorial pacing wrapped around a frictionless, CMS-driven buying flow the team can run themselves.",
    liveHref: "https://nu-site.netlify.app/en",
    meta: {
      role: "Design & build",
      year: "2024",
      sector: "E-commerce · DTC",
      stack: ["Next.js", "Sanity", "Stripe"],
    },
    heroImg: "/work/nu-hero.svg",
    heroAlt: "Nu — clean beauty storefront hero",
    metaTitle: "Nu — Case study",
    metaDescription:
      "A multilingual clean-beauty storefront — editorial calm wrapped around a frictionless, CMS-driven, Stripe-backed buying flow the team runs themselves.",
    sections: [
      {
        kind: "narrative",
        head: {
          eyebrow: "The challenge",
          title: "A store that feels like a magazine, runs like a shop.",
        },
        paras: [
          [
            { t: "Clean-beauty buyers research before they buy. Nu needed " },
            { t: "editorial calm", b: true },
            {
              t: " — generous space, considered type — without giving up the hard mechanics of a real store: cart, checkout, stock and tax.",
            },
          ],
          [
            {
              t: "So the brief split in two: make every page read like a quiet print spread, and make the whole thing ",
            },
            { t: "run itself", b: true },
            {
              t: " in two languages, with no developer in the loop for the day-to-day.",
            },
          ],
        ],
      },
      {
        kind: "approach",
        head: { eyebrow: "Approach", title: "Three moves" },
        steps: [
          {
            sn: "01 / content",
            h: "Model it in Sanity",
            p: "Products, collections and editorial blocks as structured content — the team owns every word and image.",
          },
          {
            sn: "02 / i18n",
            h: "Localise the whole surface",
            p: "EN · FR routing, copy and SEO metadata modelled in from the start, never bolted on at the end.",
          },
          {
            sn: "03 / commerce",
            h: "Wire Stripe end-to-end",
            p: "Cart, secure checkout, stock and tax — a real storefront humming behind the calm.",
          },
        ],
      },
      {
        kind: "signature",
        demo: "nuLang",
        head: {
          eyebrow: "Signature build",
          title: "One catalogue, two languages — instantly",
          intro:
            "Localization isn't an afterthought bolted on at the end — it's modelled into the content layer. Toggle the language and watch the whole product surface morph, routing and all. Try it:",
        },
        label: "[locale]/products/[slug].tsx",
        note: "live component",
      },
      {
        kind: "statBand",
        head: {
          eyebrow: "Outcome",
          title: "Calm on the surface, busy underneath.",
        },
        stats: [
          { sv: "2", sl: "Languages — EN · FR, fully localised routing & SEO" },
          {
            sv: "0",
            sl: "Developer hours to publish a new product or campaign",
          },
          {
            sv: "100%",
            sl: "CMS-driven catalogue — every page editable by the team",
          },
        ],
      },
      {
        kind: "signature",
        demo: "nuShop",
        head: {
          eyebrow: "The shop, live",
          title: "The product grid — real, not a screenshot",
          intro:
            "This is Nu's actual Products component, recreated in the brand's own light palette — Corben headings, pastel category tile, star ratings and a Stripe-backed quick-add. Switch language, add to cart, hover a card. It's the build, running.",
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
    category: "Photography portfolio",
    year: "2025",
    titleSegs: [
      { t: "Milo Weiler — witness the " },
      { t: "beauty of life.", scramble: true, accent: true },
    ],
    lede:
      "A cinematic portfolio for a Belgian set, portrait & corporate photographer — 55 projects split across seven chapters, held together by a dark shell and sticky chapter navigation.",
    liveHref: "https://miloweiler.com",
    meta: {
      role: "Design & build",
      year: "2025",
      sector: "Portfolio · Arts",
      stack: ["Next.js", "Sanity", "Figma"],
    },
    heroImg: "/work/milo-hero.svg",
    heroAlt: "Milo Weiler — cinematic photography portfolio hero",
    metaTitle: "Milo Weiler — Case study",
    metaDescription:
      "A cinematic, dark portfolio for a Belgian photographer — 55 projects across seven chapters, sticky chapter navigation, trilingual EN · NL · FR, top Lighthouse scores.",
    sections: [
      {
        kind: "quote",
        quote: [
          { t: "A body of work, not a grid of thumbnails — the site should read like a " },
          { t: "book of chapters", accent: true },
          { t: ", each with its own voice." },
        ],
        cite: "// the brief, in one line",
      },
      {
        kind: "twoColFeature",
        head: {
          eyebrow: "The brief",
          title: "A body of work, not a grid of thumbnails.",
        },
        paras: [
          [
            {
              t: "Milo's practice moves between digital and analogue, documentary and directed. A flat gallery would flatten that range. Instead the site reads like a ",
            },
            { t: "book of chapters", b: true },
            {
              t: " — Set, Corporate & Brand, Events, Portraits, Product & Food, Fine Art — each with its own voice.",
            },
          ],
          [
            { t: "A " },
            { t: "dark, cinematic shell", b: true },
            {
              t: " lets the photography glow, while sticky chapter navigation keeps you oriented across 55 projects. Trilingual EN · NL · FR, with strong Lighthouse scores on a deeply image-heavy site.",
            },
          ],
        ],
        features: [
          {
            k: "[ sectioned_scroll ]",
            b: "Chapter-based scroll",
            p: "Seven sections with sticky navigation that tracks where you are as you move through the work.",
          },
          {
            k: "[ headless_cms ]",
            b: "Sanity-managed galleries",
            p: "55 projects, captions and ordering — all editable by Milo, no deploys.",
          },
          {
            k: "[ performance ]",
            b: "Fast despite the imagery",
            p: "Responsive, deferred image loading keeps a media-heavy site quick and CLS-clean.",
          },
          {
            k: "[ i18n ]",
            b: "EN · NL · FR",
            p: "Three languages, localized routing and metadata throughout.",
          },
        ],
      },
      {
        kind: "signature",
        demo: "miloRail",
        head: {
          eyebrow: "Signature build",
          title: "The sticky chapter rail",
          intro:
            "Navigation that behaves like a table of contents and a scroll position at once. Pick a chapter — the stage and index respond, the way the live site reacts as you scroll. Try it:",
        },
        label: "ChapterNav.tsx",
        note: "live component",
      },
      {
        kind: "chapterIndex",
        head: {
          eyebrow: "Architecture",
          title: "Seven chapters, one cinematic shell",
          intro:
            "55 projects don't belong in a flat grid. They're sorted into seven bodies of work, each with its own voice — the sticky rail tracks where you are as you move through them.",
        },
        chapters: [
          { cn: "01", ct: "Set Photography", cd: "Music videos, film, theatre & commercials" },
          { cn: "02", ct: "Corporate & Brand", cd: "Campaigns, team portraits, behind-the-scenes" },
          { cn: "03", ct: "Events & Documentaries", cd: "From concert stages to conference halls" },
          { cn: "04", ct: "Portraits & Headshots", cd: "Actors, musicians & corporate, digital and film" },
          { cn: "05", ct: "Product & Food", cd: "Design, texture and intention through light" },
          { cn: "06", ct: "Fine Art", cd: "Explorations between documentary & directed" },
          { cn: "07", ct: "Personal Work", cd: "Tracing the context that shapes a moment" },
        ],
      },
      {
        kind: "gallery",
        head: { eyebrow: "Gallery", title: "Through the chapters" },
        items: [
          { id: "milo-g1", span: "tall", alt: "Set photography" },
          { id: "milo-g2", span: "wide", alt: "Chapter landing" },
          { id: "milo-g3", span: "half", alt: "Portraits" },
          { id: "milo-g4", span: "half", alt: "Fine art" },
        ],
      },
    ],
    signatureData: {
      // `rail` = the short label on the rail button (prototype rail markup);
      // `t` = the caption heading shown in the stage (prototype data[] array).
      miloRail: [
        {
          rail: "Set Photography",
          t: "Set Photography",
          p: "Where art and storytelling meet — moments from music videos, film, theatre and commercials across Belgium and beyond.",
        },
        {
          rail: "Corporate & Brand",
          t: "Corporate & Brand",
          p: "A company is more than its product. Brand campaigns, team portraits and behind-the-scenes for companies across Belgium and the Netherlands.",
        },
        {
          rail: "Events & Docs",
          t: "Events & Documentaries",
          p: "From concert stages to conference halls — documenting events as they unfold, authentic moments over posed ones.",
        },
        {
          rail: "Portraits",
          t: "Portraits & Headshots",
          p: "Portraits as an extension of someone’s story — professional headshots for actors, musicians and corporate clients, on digital and film.",
        },
        {
          rail: "Product & Food",
          t: "Product & Food",
          p: "Every crafted object tells a story of design, texture and intention — translated through light, form and surface.",
        },
        {
          rail: "Fine Art",
          t: "Fine Art & Personal",
          p: "Ongoing explorations between documentary and directed approaches, tracing the invisible context that shapes a moment.",
        },
      ],
    },
  },

  // ── 03 · Bermuda Events ─────────────────────────────────────────────────
  bermuda: {
    slug: "bermuda",
    eyebrowNum: "03",
    category: "Events agency · Belgium",
    year: "2025",
    titleSegs: [
      { t: "Bermuda Events — get lost in the " },
      { t: "experience.", scramble: true, accent: true },
    ],
    lede:
      "A premium brand site for an Antwerp events agency — framing past productions at scale, building credibility through sheer production quality, and funnelling the right leads into a tailored contact flow.",
    liveHref: "https://bermuda-events.be",
    meta: {
      role: "Design & build",
      year: "2025",
      sector: "Events · Agency",
      stack: ["Next.js", "Sanity", "i18n"],
    },
    heroImg: "/work/bermuda-hero.svg",
    heroAlt: "Bermuda Events — premium events agency hero",
    metaTitle: "Bermuda Events — Case study",
    metaDescription:
      "A premium brand site for an Antwerp events agency — past productions framed at scale, a 'Get Lost In' motif, and a contact funnel built to qualify the right leads. NL · EN.",
    sections: [
      {
        kind: "twoColFeature",
        head: {
          eyebrow: "The brief",
          title: "Sell an experience you can't put in a product shot.",
        },
        paras: [
          [
            {
              t: "Bermuda is an event agency from Berchem where creativity is limitless and every event is a new concept. The site had to convey ",
            },
            { t: "feeling", b: true },
            {
              t: " — atmosphere, scale, trust — and then convert that into qualified enquiries.",
            },
          ],
          [
            { t: "The build leans on a " },
            { t: '"Get Lost In" motif', b: true },
            {
              t: " — Creativity, Details, Personality — past productions framed at premium scale, and a contact funnel designed to qualify rather than just collect. Built bilingual NL · EN.",
            },
          ],
        ],
        features: [
          {
            k: "[ brand_motion ]",
            b: '"Get Lost In" headline system',
            p: "A rotating-word hero that reframes the pitch — creativity, details, personality — without reloading attention.",
          },
          {
            k: "[ premium_scale ]",
            b: "Productions framed at scale",
            p: "Past events shown large and cinematic — atmosphere and ambition do the selling before a word of copy.",
          },
          {
            k: "[ lead_funnel ]",
            b: "Qualifying contact flow",
            p: "A contact funnel built to surface the right briefs, not just a generic form.",
          },
          {
            k: "[ i18n ]",
            b: "NL · EN",
            p: "Localized content and routing for a Belgian audience.",
          },
        ],
      },
      {
        kind: "signature",
        demo: "bermudaIcons",
        head: {
          eyebrow: "Signature build",
          title: 'The "Get Lost In" icon set',
          intro:
            "Three custom SVG icons — Creativity, Detail, Personality — each hand-animated to morph as you explore them. Hover or tap a card to watch it transform. This is the real component, ported from the live site.",
        },
        label: "components/Feature.jsx",
        note: "hover to morph",
      },
      {
        kind: "approach",
        head: {
          eyebrow: "How it converts",
          title: "Feeling first, then the funnel",
          intro:
            "Selling an experience you can't put in a product shot means leading with atmosphere — then turning that interest into the right kind of enquiry.",
        },
        steps: [
          {
            sn: "01 / positioning",
            h: "Frame the feeling",
            p: "Past productions shown at premium scale, so atmosphere and ambition do the selling before a word of copy.",
          },
          {
            sn: "02 / proof",
            h: "Anchor it in the work",
            p: "Past productions, shown at premium scale, turn the pitch into proof — the portfolio is the credibility.",
          },
          {
            sn: "03 / funnel",
            h: "Qualify, don't collect",
            p: "A contact flow designed to surface the right briefs — not just gather another inbox of generic emails.",
          },
        ],
      },
      {
        kind: "quote",
        quote: [
          { t: "Get lost in " },
          { t: "creativity, details and personality", accent: true },
          { t: " — a new concept to your desire, every time." },
        ],
        cite: "// Bermuda Events — the brand line, built into the hero",
      },
      {
        kind: "gallery",
        head: { eyebrow: "Gallery", title: "Through the site" },
        items: [
          { id: "bermuda-g1", span: "wide", alt: "Hero / events" },
          { id: "bermuda-g2", span: "tall", alt: "About" },
          { id: "bermuda-g3", span: "half", alt: "Network / team" },
          { id: "bermuda-g4", span: "half", alt: "Contact funnel" },
        ],
      },
    ],
  },

  // ── 04 · Spiree ─────────────────────────────────────────────────────────
  spiree: {
    slug: "spiree",
    eyebrowNum: "04",
    category: "Activewear brand · 100% Merino",
    year: "2025",
    titleSegs: [
      { t: "Spiree — running, " },
      { t: "celestial.", scramble: true, accent: true },
    ],
    lede:
      "A bold, story-first brand site for an independent women's sportswear label. A custom gradient system and a Sun & Moon identity carry a crowdfunding launch — product second, story first.",
    liveHref: "https://spiree-next.netlify.app/",
    meta: {
      role: "Design & build",
      year: "2025",
      sector: "E-commerce · DTC",
      stack: ["Next.js", "React", "Tailwind"],
    },
    heroImg: "/work/spiree-hero.svg",
    heroAlt: "Spiree — celestial activewear brand hero",
    metaTitle: "Spiree — Case study",
    metaDescription:
      "A bold, story-first brand site for an independent women's sportswear label — a custom gradient system and a Sun & Moon identity carrying a crowdfunding launch.",
    sections: [
      {
        kind: "narrative",
        head: { eyebrow: "The story", title: "Product second. Story first." },
        paras: [
          [
            { t: "Spiree makes " },
            { t: "100% Merino wool base layers", b: true },
            {
              t: " for running and mountain sports — thermoregulating from +30°C to −10°C. But a spec sheet doesn't fund a launch. The site had to sell a premium, sustainable product ",
            },
            { t: "and", b: true },
            { t: " rally backers for a crowdfunding campaign." },
          ],
          [
            { t: "The answer was a " },
            { t: "celestial identity", b: true },
            {
              t: " built around Astrid — the runner the brand is named for. A Sun line to ",
            },
            { t: "unleash your inner fire", accent: true },
            { t: ", a Moon line to " },
            { t: "embrace your ethereal side", accent: true },
            { t: " — each with its own gradient world, tied together by one story." },
          ],
        ],
      },
      {
        kind: "signature",
        demo: "spireeOrb",
        head: {
          eyebrow: "Signature build",
          title: "The Sun ↔ Moon collection switch",
          intro:
            "The centrepiece interaction: one toggle morphs the entire product world — gradient, copy, price context and palette — between the two celestial collections. Hand-built, no library. Try it:",
        },
        label: "CollectionSwitch.tsx",
        note: "live component",
      },
      {
        kind: "compare",
        head: {
          eyebrow: "Two worlds, one system",
          title: "Sun & Moon",
          intro:
            "The collection switch isn't a gimmick — each world drives its own palette, copy and product context from a single hand-built gradient engine.",
        },
        cols: [
          {
            ct: "☀ Collection",
            h: "Sun",
            p: "Unleash your inner fire.",
            items: [
              "Warm amber → ember gradient world",
              "High-energy copy for race day",
              "Daytime, heat-regulating story",
            ],
          },
          {
            ct: "☾ Collection",
            h: "Moon",
            p: "Embrace your ethereal side.",
            items: [
              "Cool indigo → silver gradient world",
              "Calm, reflective copy for recovery",
              "Night running, warmth-keeping story",
            ],
          },
        ],
      },
      {
        kind: "statBand",
        stats: [
          { sv: "2", sl: "Collections — Sun & Moon from one gradient engine" },
          { sv: "40°", sl: "Thermal range — Merino comfort from +30 to −10°C" },
          { sv: "€99", sl: "Base layer — full storefront with size & cart" },
        ],
      },
      {
        kind: "gallery",
        head: { eyebrow: "Gallery", title: "Through the site" },
        items: [
          { id: "spiree-g1", span: "wide", alt: "Collection page" },
          { id: "spiree-g2", span: "tall", alt: "Product detail" },
          { id: "spiree-g3", span: "half", alt: "Merino story" },
          { id: "spiree-g4", span: "half", alt: "Meet Astrid" },
        ],
      },
    ],
    signatureData: {
      spireeOrb: {
        sun: { t: "Sun", s: "Unleash your inner fire" },
        moon: { t: "Moon", s: "Embrace your ethereal side" },
      },
    },
  },
};
