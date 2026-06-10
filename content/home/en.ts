// All home-page copy — English only for now, typed for easy EN/FR/NL later.
// Source of truth: Claude Design/index.html. Decorative visuals (the bento
// mini-graphics, charts, terminal) live in their components; only translatable
// copy lives here.
import type { NumFmt } from "@/lib/format";

/** An inline text run: plain, or flagged to scramble / accent / bold / emphasise. */
export type Seg = {
  t: string;
  scramble?: boolean;
  accent?: boolean;
  b?: boolean;
  em?: boolean;
};

export type CaseLink = {
  pre?: string; // e.g. "CASE:" or a standalone label
  strong?: string; // e.g. "Spiree"
  post?: string; // e.g. "— gradient system ↗"
  href: string;
  external?: boolean;
};

const nbsp = " ";

export const home = {
  hero: {
    eyebrow: "Senior web developer & designer · Lyon, FR",
    headline: [
      [{ t: "Websites,", scramble: true }, { t: " built" }],
      [{ t: "from " }, { t: "scratch", scramble: true, accent: true }, { t: "—" }],
      [{ t: "AI is the " }, { t: "power" + nbsp + "tool.", scramble: true, accent: true }],
    ] as Seg[][],
    sub: [
      { t: "I'm " },
      { t: "Yolan", b: true },
      { t: " — a senior developer who architects fast, multilingual websites and stores line by line. " },
      { t: "AI accelerates the craft; it never replaces the judgement.", b: true },
      { t: " Mastered, not enslaved." },
    ] as Seg[],
    ctas: [
      { label: "See the work", href: "#work", variant: "primary" as const, arrow: "→" },
      { label: "The philosophy", href: "#ai", variant: "ghost" as const },
    ],
  },

  growth: {
    title: "growth.tsx — what good code earns",
    live: "live",
    funnel: [
      { k: "Visitors", val: 48200, fmt: "k" as NumFmt, d: "+0%" },
      { k: "Clicks", val: 13100, fmt: "k" as NumFmt, d: "27% CTR" },
      { k: "Profit", val: 92400, fmt: "eur" as NumFmt, d: "▲ shipped", profit: true },
    ],
  },

  capabilities: {
    tk: "01",
    eyebrow: "What I bring",
    title: ["Not a template.", "A toolkit, hand-built."],
    intro:
      "Every capability below is engineered from scratch and proven on a real, shipped project. No page builders, no boilerplate — just code I understand top to bottom.",
    themeToggle: { light: "Light", dark: "Dark" },
    cards: [
      {
        span: "feature span-3", d: 0, ico: "design_systems",
        h: "Design systems, from tokens up",
        p: "Type scales, color, spacing, motion and components — a coherent system, not a pile of CSS.",
        viz: "scale",
        case: { pre: "CASE:", strong: "Spiree", post: "— gradient system ↗", href: "https://spiree-next.netlify.app/", external: true },
      },
      {
        span: "feature span-3", d: 1, ico: "motion",
        h: "Scroll-driven, cinematic motion",
        p: "Sectioned scroll, sticky chapters and reveal choreography — performance-budgeted, never gratuitous.",
        viz: "bars",
        case: { pre: "CASE:", strong: "Milo Weiler", post: "— 7-chapter scroll ↗", href: "https://miloweiler.com", external: true },
      },
      {
        span: "span-2", d: 0, ico: "i18n",
        h: "Multilingual routing",
        p: "EN · FR · NL with localized SEO baked in.",
        viz: "lang",
        case: { pre: "CASE:", strong: "Bermuda", post: "↗", href: "https://bermuda-events.be", external: true },
      },
      {
        span: "span-2", d: 1, ico: "headless_cms",
        h: "Headless CMS",
        p: "Ship content edits without a developer in the loop.",
        viz: "cms",
        case: { pre: "CASE:", strong: "Nu", post: "· Sanity ↗", href: "https://nu-site.netlify.app/en", external: true },
      },
      {
        span: "span-2", d: 2, ico: "commerce",
        h: "Commerce & payments",
        p: "Stripe & Twint checkouts that convert.",
        viz: "commerce",
        case: { pre: "CASE:", strong: "Nu", post: "store ↗", href: "https://nu-site.netlify.app/en", external: true },
      },
      {
        span: "span-4", d: 0, ico: "performance · seo",
        h: "Lighthouse-tuned, search-ready",
        p: "Deferred imagery, semantic markup and clean Core Web Vitals — fast for users and for Google.",
        viz: "gauge",
        case: { pre: "CASE:", strong: "Milo Weiler", post: "↗", href: "https://miloweiler.com", external: true },
      },
      {
        span: "accent-card span-2", d: 1, ico: "theme · accent",
        h: "Light & dark, by design",
        p: "Theme, accent, typeface — every visual decision is a token. Flip one and the whole system follows, live.",
        viz: "theme",
        case: { pre: "Make it yours ↑", href: "#capabilities" },
      },
    ],
  },

  stack: {
    tk: "02",
    eyebrow: "The stack, in depth",
    title: ["No WordPress.", "Personalized" + nbsp + "code."],
    intro:
      "No page builders, no plugin sprawl, no theme to fight. Every site is written from scratch in a modern stack I know deep enough to bend. The three tools below do the heavy lifting — scroll, and each one opens itself as the line reaches it.",
    rows: [
      {
        mark: "N", name: "Next.js", tag: "The foundation — every site runs on it", role: "framework", open: true,
        body: "Every site I build is a Next.js application. The App Router gives me server components, streaming and file-based routing — pages render on the server for speed and SEO, then hydrate only the parts that need to be interactive. One framework, from marketing page to checkout.",
        points: ["App Router & React Server Components", "SSG · ISR · SSR chosen per route", "next/image — automatic optimisation", "Native i18n routing — en · fr · nl", "Route-level code splitting", "Edge-ready, deployed on Vercel"],
        case: { pre: "CASE:", strong: "Milo Weiler", post: "— 55 projects, top Lighthouse ↗", href: "https://miloweiler.com", external: true },
      },
      {
        mark: "S", name: "Sanity", tag: "Headless content the client edits themselves", role: "headless cms",
        body: "Content lives in Sanity, fully decoupled from the front-end. Editors update products, posts and imagery inside a Studio I tailor to their workflow; I query exactly the shape each page needs with GROQ and render it through Portable Text. No developer in the loop for day-to-day edits.",
        points: ["Custom Studio schemas per client", "GROQ — query only what's rendered", "Portable Text rich content", "Draft preview & real-time updates", "Image pipeline on a global CDN", "Webhook-triggered rebuilds"],
        case: { pre: "CASE:", strong: "Nu", post: "— a CMS-driven clean-beauty catalog ↗", href: "https://nu-site.netlify.app/en", external: true },
      },
      {
        mark: "St", name: "Stripe", tag: "Secure checkout — multi-currency & Twint", role: "payments",
        body: "Checkout runs on Stripe. Sessions are created server-side, confirmed by signed webhooks and reconciled before anything ships — secure by construction, never trusting the browser. Multi-currency plus Twint gives Belgian and EU customers the payment methods they actually reach for.",
        points: ["Server-side Checkout Sessions", "Signed-webhook fulfilment", "Multi-currency pricing", "Twint & cards for the EU", "PaymentIntents with SCA", "Tax & shipping logic"],
        case: { pre: "CASE:", strong: "Nu", post: "store — a frictionless buying flow ↗", href: "https://nu-site.netlify.app/en", external: true },
      },
      {
        mark: "G", name: "GSAP", tag: "The motion engine — scroll & timeline animation", role: "animation",
        body: "Every reveal, scroll chapter and hover flourish runs on GSAP. ScrollTrigger pins sections and ties animation to scroll position; timelines sequence the choreography frame-accurately. It's the difference between a site that loads and one that moves — performance-budgeted, never gratuitous.",
        points: ["ScrollTrigger — scroll-driven scenes", "Timelines for sequenced motion", "Pin & scrub sticky chapters", "GPU-friendly transforms only", "Reduced-motion aware", "60fps on mid-range mobile"],
        case: { pre: "CASE:", strong: "Milo Weiler", post: "— 7-chapter scroll choreography ↗", href: "https://miloweiler.com", external: true },
      },
    ],
    side: {
      eyebrow: "From scratch, every time",
      h: ["This is what", "“no template” looks like."],
      p: "A site spun up the way I actually work — architecture first, design system second, then shipped. The judgement is human; the speed is the tooling.",
      cta: { label: "Deep-dive the technology", href: "#stack" },
    },
    supporting: {
      eyebrow: "Plus the supporting cast",
      items: [
        { mark: "R", name: "React 18", role: "UI · components" },
        { mark: "TS", name: "TypeScript", role: "Types · safety" },
        { mark: "T", name: "Tailwind", role: "Styling · tokens" },
        { mark: "N", name: "Node.js", role: "Runtime · APIs" },
        { mark: "M", name: "MongoDB", role: "NoSQL · data" },
        { mark: "Rx", name: "Redux", role: "State · cart" },
        { mark: "GQ", name: "GraphQL", role: "Typed queries" },
        { mark: "V", name: "Vercel", role: "Hosting · edge" },
      ],
    },
  },

  work: {
    tk: "03",
    eyebrow: "Selected work",
    title: "Shipped, in production.",
    intro:
      "Real sites for real clients across Belgium and beyond — multilingual, fast, and built to convert.",
    cta: { caseStudy: "Case study", visit: "Visit" },
    items: [
      { num: "01", cat: "Beauty & wellness e-commerce", slug: "nu", title: "Nu", body: "A multilingual clean-beauty storefront — calm editorial pacing around a frictionless, CMS-driven buying flow.", href: "https://nu-site.netlify.app/en", img: "/work/nu.jpg" },
      { num: "02", cat: "Photography portfolio", slug: "milo", title: "Milo Weiler", body: "A cinematic, dark portfolio split into seven scroll chapters — 55 projects, sticky chapter nav, top Lighthouse scores.", href: "https://miloweiler.com", img: "/work/milo.jpg" },
      { num: "03", cat: "Events agency · Belgium", slug: "bermuda", title: "Bermuda Events", body: "A premium brand site framing past productions at scale, with a contact funnel built to qualify the right leads.", href: "https://bermuda-events.be", img: "/work/bermuda.jpg" },
      { num: "04", cat: "Activewear brand · 100% Merino", slug: "spiree", title: "Spiree", body: "An independent sportswear brand site — bold gradient system, Sun & Moon collections, a story-first arc.", href: "https://spiree-next.netlify.app/", img: "/work/spiree.jpg" },
    ],
  },

  ai: {
    tk: "04",
    eyebrow: "The philosophy",
    title: [
      [{ t: "A power tool." }],
      [{ t: "Mastered", em: true, scramble: true }, { t: "," }],
      [{ t: "not enslaved." }],
    ] as Seg[][],
    lede:
      "I harness AI the way a craftsman harnesses a power tool — for speed and leverage, never to hand over the thinking. The app isn't the work. The judgement is.",
    principles: [
      { n: "01", b: "I own the architecture", p: "AI drafts; I decide structure, trade-offs and the data model. The blueprint is human." },
      { n: "02", b: "Every line ships understood", p: "Nothing reaches production I can't read, refactor and defend. No black boxes." },
      { n: "03", b: "Speed, without losing the why", p: "AI removes the busywork so more time goes to craft, performance and the details that matter." },
      { n: "04", b: "The tool serves the developer", p: "Mastered, not enslaved. The senior engineer stays in the driver's seat — always." },
    ],
  },

  process: {
    tk: "05",
    eyebrow: "How I work",
    title: "A transparent pipeline.",
    intro:
      "Five stages, start to ship. The line draws as you scroll — each stage lights up the moment you reach it.",
    stages: [
      { n: "01", h: "Discovery", p: "Goals, audience, budget — and what success actually means before a line is written." },
      { n: "02", h: "Architecture", p: "Stack, data model and structure decided up front — the blueprint is human." },
      { n: "03", h: "Design", p: "A real system you can see early and react to, refined together — not a static mockup." },
      { n: "04", h: "Build", p: "Hand-coded, AI-accelerated, multilingual and SEO-ready — every line shipped understood." },
      { n: "05", h: "Ship", p: "Measure, iterate, and I stay on for whatever comes next." },
    ],
  },

  contact: {
    eyebrow: "Contact",
    title: [
      [{ t: "Got something" }],
      [{ t: "worth " }, { t: "building?", em: true, scramble: true }],
    ] as Seg[][],
    p: "From blank file to shipped product. Tell me what you have in mind — I'll tell you how I'd build it.",
    ctas: [
      { label: "Start a project", href: "mailto:contact@ywdesign.co?subject=Project", variant: "primary" as const, arrow: "→" },
      { label: "WhatsApp", href: "https://wa.me/32471124525", variant: "ghost" as const, external: true },
    ],
  },
};

export type Home = typeof home;
