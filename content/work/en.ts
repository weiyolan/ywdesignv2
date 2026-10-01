// Project case-study content — ported verbatim from the prototype's per-project
// HTML (Claude Design/projects/{nu,milo,bermuda,…}.html). English only for
// now, typed so EN/FR/NL can be lifted later via a getDictionary(lang) loader.
//
// Every section is a discriminated union member keyed by `kind`; the Section
// renderer (components/work/Section.tsx) switches on it. Signature demos carry
// their interactive payload in `signatureData` so the (server) page can hand it
// to the matching "use client" demo.
import type { Seg } from "@/content/home";

export type Slug = "nu" | "milo" | "automatx" | "bermuda" | "ywdesign" | "analoog";
export const order: Slug[] = ["nu", "milo", "automatx", "bermuda", "ywdesign", "analoog"];

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
      kind: "chapterIndex";
      head: Head;
      chapters: { cn: string; ct: string; cd: string }[];
    }
  | {
      kind: "signature";
      head: Head;
      demo: "nuLang" | "nuShop" | "miloRail" | "bermudaIcons" | "ywGlass" | "automatxWeb";
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
    /** cards in markup order: creativity, detail, personality */
    bermudaIcons?: {
      gl: string;
      cards: { t: string; sub: string }[];
      noteH: string;
      note: Seg[];
    };
    /** cards in icon order: responsive, animations, performance, ux/ui, cms, seo */
    ywGlass?: { toggle: string; cards: { t: string; d: string }[] };
    /** panel copy for the labs map; node labels stay as on the live (EN) site */
    automatxWeb?: { intro: string; hint: string; go: string };
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
    heroImg: "/work/nu-hero.jpg",
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
    heroImg: "/work/milo-hero.jpg",
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

  // ── 03 · AutomatX Labs ──────────────────────────────────────────────────
  automatx: {
    slug: "automatx",
    eyebrowNum: "03",
    category: "Engineering practice · Lyon",
    year: "2026",
    titleSegs: [
      { t: "AutomatX — one engineer, " },
      { t: "X labs.", scramble: true, accent: true },
    ],
    lede:
      "The site for AutomatX Labs, my independent engineering practice. Four labs split by what they improve (a process, a body, a physical thing, a computation), eight capabilities running through them, and a 3D star map that puts the whole model on one screen.",
    liveHref: "https://automatx.eu",
    meta: {
      role: "Brand, design & build",
      year: "2026",
      sector: "Engineering · Lab automation",
      stack: ["HTML", "CSS", "Vanilla JS", "three.js"],
    },
    heroImg: "/work/automatx-hero.jpg",
    heroAlt: "AutomatX Labs home — “One engineer. X labs.” on a dark engineering grid",
    metaTitle: "AutomatX Labs — Case study",
    metaDescription:
      "The automatx.eu build: a static, bilingual site with no external requests, an X Labs structure and an interactive three.js constellation of labs and capabilities.",
    sections: [
      {
        kind: "twoColFeature",
        head: {
          eyebrow: "The brief",
          title: "Many fields, one method, one site.",
        },
        paras: [
          [
            { t: "Lab automation, motion analysis, 3D printing, AI. On a CV that reads as scattered. The site had to show it's " },
            { t: "one method applied everywhere", b: true },
            { t: ": measure it, automate it, make it reproducible." },
          ],
          [
            { t: "The answer was the " },
            { t: "X Labs model", b: true },
            {
              t: ". Labs are split by the system they improve, and capabilities are the tools they share. A project belongs to the lab whose system it improves, not to the tools it uses.",
            },
          ],
        ],
        features: [
          {
            k: "[ x_labs ]",
            b: "Four labs, eight capabilities",
            p: "Process · Pharma, Body · Sports, Matter · Robotics and Compute · AI share sensors, electronics, mechanics, software, data, AI/ML, validation and industrialisation.",
          },
          {
            k: "[ zero_requests ]",
            b: "Nothing loads from elsewhere",
            p: "Fonts, scripts and three.js are all self-hosted. No CDN, no Google Fonts, no analytics, so there's nothing to raise a GDPR question.",
          },
          {
            k: "[ progressive ]",
            b: "Works without JavaScript",
            p: "Plain HTML and CSS first. Scripts only add to it: the 3D map, live sports figures and scroll reveals.",
          },
          {
            k: "[ i18n ]",
            b: "EN · FR",
            p: "Ten URLs, each paired with its French mirror through hreflang, plus a sitemap and JSON-LD.",
          },
        ],
      },
      {
        kind: "signature",
        demo: "automatxWeb",
        head: {
          eyebrow: "Signature build",
          title: "The labs, as a constellation",
          intro:
            "The hub map from the home page, running here as on the live site. The four labs sit on two diagonals, so their links draw the logo's X. Capabilities orbit on an outer sphere near the labs they serve. Drag to orbit, throw a star, hover to light its links.",
        },
        label: "web3d.js",
        note: "drag · hover · ctrl + scroll to zoom",
      },
      {
        kind: "approach",
        head: {
          eyebrow: "How it's built",
          title: "The SVG stays the source of truth",
          intro:
            "The map starts as an accessible SVG: real links, focusable nodes, readable labels. three.js is a layer behind it, and the SVG keeps working when that layer doesn't load.",
        },
        steps: [
          {
            sn: "01 / read the markup",
            h: "Nodes & edges from the DOM",
            p: "web3d.js builds the graph from the SVG circles and <line data-a data-b> edges, so changing the map is a markup edit.",
          },
          {
            sn: "02 / glue every frame",
            h: "Projected back to the screen",
            p: "Each frame, every star is projected to the screen and its SVG node moved there, keeping labels, focus rings and hit areas on the stars.",
          },
          {
            sn: "03 / spend nothing idle",
            h: "Lazy, paused, optional",
            p: "The script only loads as the map nears the viewport and pauses off-screen. With reduced motion or no WebGL, the flat map stays.",
          },
        ],
      },
      {
        kind: "statBand",
        stats: [
          { sv: "0", sl: "external requests" },
          { sv: "4 × 8", sl: "labs × capabilities" },
          { sv: "10", sl: "URLs · EN + FR" },
          { sv: "1", sl: "third-party library" },
        ],
      },
      {
        kind: "gallery",
        head: { eyebrow: "Gallery", title: "Through the site" },
        items: [
          { id: "automatx-g1", span: "wide", alt: "Hub — the labs × capabilities star map" },
          { id: "automatx-g2", span: "tall", alt: "Pharma lab — Hamilton VENUS automation and GMP validation" },
          { id: "automatx-g3", span: "half", alt: "Sports lab — simulated motion signals drawn as fine-line SVG" },
          { id: "automatx-g4", span: "half", alt: "Origin — KU Leuven research and the career path" },
        ],
      },
    ],
    signatureData: {
      automatxWeb: {
        intro:
          "AutomatX Labs is the independent engineering practice of Yolan Weiler, a biomedical & electrical engineer (KU Leuven) based in Lyon. One method applied everywhere: measure it, automate it, make it reproducible.",
        hint: "Drag to rotate · ⌘/Ctrl + scroll or pinch to zoom · tap a star to read →",
        go: "Open lab →",
      },
    },
  },

  // ── 04 · Bermuda Events ─────────────────────────────────────────────────
  bermuda: {
    slug: "bermuda",
    eyebrowNum: "04",
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
    heroImg: "/work/bermuda-hero.jpg",
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
    signatureData: {
      bermudaIcons: {
        gl: "Get lost in",
        cards: [
          { t: "Creativity", sub: "A new concept to your desire. Every time." },
          { t: "Detail", sub: "Nothing left to chance. Every detail thought of." },
          { t: "Personality", sub: "The same person, always there for you." },
        ],
        noteH: "Why it's recolored here",
        note: [
          { t: "Live, Bermuda runs on its own earth-tone identity — clay, sand, olive. For this case study I remapped the exact same morph to the portfolio's own system: " },
          { t: "neutral ink", accent: true },
          { t: " at rest, brightening to full contrast on focus, with the morphing focal shape resolving in the " },
          { t: "accent", accent: true },
          { t: ". The geometry is untouched — only the palette is swapped to black / white / accent so the component sits inside this site instead of fighting it." },
        ],
      },
    },
  },

  // ── 05 · YWdesign v1 ────────────────────────────────────────────────────
  ywdesign: {
    slug: "ywdesign",
    eyebrowNum: "05",
    category: "Studio site · Previous version",
    year: "2023",
    titleSegs: [
      { t: "YWdesign v1 — your " },
      { t: "digital partner.", scramble: true, accent: true },
    ],
    lede:
      "The first YWdesign studio site: frosted-glass panels floating over a drifting blue-teal gradient, a service grid, a fully transparent roadmap and a quote funnel. Built to make a one-person studio feel like a dependable partner.",
    liveHref: "https://ywdesign2.netlify.app/",
    meta: {
      role: "Brand, design & build",
      year: "2023",
      sector: "Web studio · Freelance",
      stack: ["Next.js", "Tailwind CSS", "Sanity", "Framer Motion"],
    },
    heroImg: "/work/ywdesign-hero.jpg",
    heroAlt: "YWdesign v1 home — “Your Digital Partner” over a blue-teal gradient with glass navigation",
    metaTitle: "YWdesign v1 — Case study",
    metaDescription:
      "The previous YWdesign studio site: a glassmorphism design system in Tailwind, a feature grid with custom icons, a transparent step-by-step roadmap and an EN · FR build.",
    sections: [
      {
        kind: "twoColFeature",
        head: {
          eyebrow: "The brief",
          title: "Make a one-person studio feel like a partner.",
        },
        paras: [
          [
            { t: "Clients hiring a freelancer worry about one thing: " },
            { t: "what happens after launch", b: true },
            {
              t: ". The site had to answer that before anyone asked — clear services, a visible process and a direct line to a human.",
            },
          ],
          [
            { t: "The look carried the message: " },
            { t: "light, layered glass", b: true },
            {
              t: " over a living gradient. Nothing heavy, everything readable, and every panel a little window onto the brand behind it.",
            },
          ],
        ],
        features: [
          {
            k: "[ glass_system ]",
            b: "Frosted panels, one recipe",
            p: "White at 10% opacity, backdrop blur, a hairline border and a soft shadow — the same Tailwind recipe for the nav, cards, footer and buttons.",
          },
          {
            k: "[ feature_icons ]",
            b: "Six promises, six icons",
            p: "Responsiveness, animations, performance, UX/UI, CMS and SEO — each a custom icon and a two-line promise.",
          },
          {
            k: "[ roadmap ]",
            b: "A process you can see",
            p: "From project definition to maintenance, every step drawn out so the price and the timeline never surprise.",
          },
          {
            k: "[ i18n ]",
            b: "EN · FR",
            p: "Bilingual routing and copy for clients across Belgium, France and Switzerland.",
          },
        ],
      },
      {
        kind: "signature",
        demo: "ywGlass",
        head: {
          eyebrow: "Signature build",
          title: "What makes a better website",
          intro:
            "The feature grid from the old services page, rebuilt in plain CSS: frosted cards over a drifting gradient, staggered columns, and a lift and border pulse on hover. Switch the glass off to see what the blur is doing.",
        },
        label: "components/FeatureCard.jsx",
        note: "hover · toggle the glass",
      },
      {
        kind: "approach",
        head: {
          eyebrow: "How it converts",
          title: "Transparency as the sales pitch",
          intro:
            "The roadmap page does the selling: every step from first meeting to handover is laid out, so a quote request feels like the natural next step.",
        },
        steps: [
          {
            sn: "01 / definition & contract",
            h: "Scope, timing, budget",
            p: "The first meeting fixes goals and resources; a contract proposal follows before any work starts.",
          },
          {
            sn: "02 / ideation & iteration",
            h: "Two rounds, then code",
            p: "Values, branding and style preferences become ideas, then two iterations on structure and design before sign-off.",
          },
          {
            sn: "03 / handover & maintenance",
            h: "You own all the code",
            p: "The finished product is handed over in full, with a maintenance plan to keep it healthy.",
          },
        ],
      },
      {
        kind: "quote",
        quote: [
          { t: "An apple a day keeps the doctor away. " },
          { t: "A maintenance plan", accent: true },
          { t: " is crucial for the health of your product." },
        ],
        cite: "// YWdesign v1 — the roadmap, last step",
      },
      {
        kind: "gallery",
        head: { eyebrow: "Gallery", title: "Through the site" },
        items: [
          { id: "ywdesign-g1", span: "wide", alt: "Projects — recent work under a glass navigation bar and skill ticker" },
          { id: "ywdesign-g2", span: "tall", alt: "Feature grid — six glass cards with custom icons" },
          { id: "ywdesign-g3", span: "half", alt: "Roadmap — the collaboration visualised step by step" },
          { id: "ywdesign-g4", span: "half", alt: "About — “Hi, I am Yolan”" },
        ],
      },
    ],
    signatureData: {
      ywGlass: {
        toggle: "Glass",
        cards: [
          { t: "Responsiveness", d: "Beautiful layout on all screen sizes." },
          { t: "Animations", d: "Dynamic interactions that bring your website alive." },
          { t: "Performance", d: "Tell your story using fast internet technology." },
          { t: "UX/UI Focused", d: "Users love an easy to use and lightweight design." },
          { t: "CMS", d: "You can manage the content yourself." },
          { t: "SEO Optimisation", d: "Organically reach new customers." },
        ],
      },
    },
  },

  // ── 06 · Milo Weiler — Analogue ─────────────────────────────────────────
  analoog: {
    slug: "analoog",
    eyebrowNum: "06",
    category: "Analogue photography · Belgium",
    year: "2026",
    titleSegs: [
      { t: "Milo Weiler Analogue — made to be " },
      { t: "passed down.", scramble: true, accent: true },
    ],
    lede:
      "A quiet, editorial service site for fine-art film photography — funerals, character portraits and weddings on medium format. Built to slow the visitor down, earn trust on the most delicate days of a life, and turn that into a first conversation.",
    liveHref: "https://analoog.miloweiler.com/en",
    meta: {
      role: "Design & build",
      year: "2026",
      sector: "Photography · Services",
      stack: ["Next.js", "Sanity", "i18n"],
    },
    heroImg: "/work/analoog-hero.jpg",
    heroAlt: "Milo Weiler Analogue — serif hero reading “Analogue made to be passed down”",
    metaTitle: "Milo Weiler Analogue — Case study",
    metaDescription:
      "An editorial service site for an Antwerp & Brussels film photographer — funeral reportage, character portraits and weddings on medium format, a four-step process and a trilingual NL · EN · FR build.",
    sections: [
      {
        kind: "twoColFeature",
        head: {
          eyebrow: "The brief",
          title: "Sell slowness in a world built for scrolling.",
        },
        paras: [
          [
            {
              t: "Milo shoots on a Mamiya RB67 — medium-format film, every frame weighed. The site had to make that ",
            },
            { t: "intention", b: true },
            {
              t: " felt before a word is read: warm paper tones, a classic serif, generous whitespace and images that arrive one at a time.",
            },
          ],
          [
            { t: "The hardest part was tone. A " },
            { t: "funeral service", b: true },
            {
              t: " sits next to portraits and weddings, so every line had to be calm, respectful and clear on price and process — reassurance first, sales second.",
            },
          ],
        ],
        features: [
          {
            k: "[ editorial_pacing ]",
            b: "Scroll that slows you down",
            p: "Letter-by-letter headlines, a framed showcase that grows to full bleed, and stacked service cards read like the pages of an album.",
          },
          {
            k: "[ three_services ]",
            b: "Farewell · Face · Promise",
            p: "Funeral reportage, character portraits and analogue weddings — each with its own promise, deliverable and detail page.",
          },
          {
            k: "[ headless_cms ]",
            b: "Sanity-managed content",
            p: "Services, images and copy editable by Milo in three languages, no deploys.",
          },
          {
            k: "[ i18n ]",
            b: "NL · EN · FR",
            p: "Localized routing and metadata for a Belgian audience across all three languages.",
          },
        ],
      },
      {
        kind: "approach",
        head: {
          eyebrow: "How it converts",
          title: "From first conversation to a piece in hand",
          intro:
            "The process section removes every reason to hesitate: one point of contact, a fixed price up front, the same simple path for every service.",
        },
        steps: [
          {
            sn: "01 / acquaintance",
            h: "A no-obligation call",
            p: "Phone or in person — the site leads straight to a direct number, not a form to fill in on a hard day.",
          },
          {
            sn: "02 / booking & sitting",
            h: "Clear price, calm day",
            p: "Date, scope and price fixed up front; on the day Milo arrives quietly, on film, and lets it unfold.",
          },
          {
            sn: "03 / the piece",
            h: "Bound by hand",
            p: "Developed, selected and hand-bound — delivered in four to eight weeks. The object is the product, and the site says so.",
          },
        ],
      },
      {
        kind: "quote",
        quote: [
          { t: "Not a fleeting digital snapshot, but " },
          { t: "a tangible, handcrafted image", accent: true },
          { t: " — made to pass down to the generations that follow." },
        ],
        cite: "// Milo Weiler — the philosophy, set as the site's backbone",
      },
      {
        kind: "gallery",
        head: { eyebrow: "Gallery", title: "Through the site" },
        items: [
          { id: "analoog-g1", span: "wide", alt: "Full-bleed showcase — “Analogue stays.”" },
          { id: "analoog-g2", span: "tall", alt: "Philosophy section with a black-and-white film still" },
          { id: "analoog-g3", span: "half", alt: "Four-step process — acquaintance, booking, sitting, the piece" },
          { id: "analoog-g4", span: "half", alt: "Framed showcase of a medium-format portrait" },
        ],
      },
    ],
  },
};
