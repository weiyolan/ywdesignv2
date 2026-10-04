// Service landing pages (/services + /services/[service]) — EN source of truth;
// fr.ts / nl.ts mirror this shape (`satisfies Services`). Each page targets what
// clients actually search ("custom website", "e-commerce store", "redesign"),
// links to the case studies that prove it, and feeds Service + FAQPage JSON-LD.
// Process stages and the contact block are reused from the home copy.
import type { Seg } from "@/content/home";

export type ServiceSlug = "website" | "e-commerce" | "redesign";
export type ServicePoint = { h: string; p: string };
export type Faq = { q: string; a: string };

export type Service = {
  slug: ServiceSlug;
  name: string; // short name — nav, footer, cards, breadcrumb, schema
  seo: { title: string; description: string };
  hero: { eyebrow: string; h1: Seg[][]; sub: string };
  card: string; // one-liner on the hub
  points: ServicePoint[];
  included: string[];
  cases: string[]; // work slugs (content/work)
  faq: Faq[];
};

export const services = {
  hub: {
    seo: {
      title: "Services — websites, e-commerce & redesigns",
      description:
        "Custom websites, e-commerce stores and redesigns, hand-coded in Lyon for France, Belgium and beyond. Fast, multilingual, SEO-ready — and yours to edit.",
    },
    eyebrow: "Services",
    title: "What I build for you.",
    intro:
      "Three ways to work together — each hand-coded from scratch, multilingual and SEO-ready, with a CMS you can edit yourself.",
    more: "Learn more",
  },
  labels: {
    points: "Why it works",
    included: "What's included",
    process: "How it goes",
    cases: "Proof, in production",
    faq: "Questions",
    caseStudy: "Case study",
  },
  items: [
    {
      slug: "website",
      name: "Custom website",
      seo: {
        title: "Custom website development, Lyon",
        description:
          "A hand-coded website built from scratch in Lyon — fast, multilingual, SEO-ready and easy to edit. No WordPress, no templates. France, Belgium & beyond.",
      },
      hero: {
        eyebrow: "Custom website · Lyon, FR",
        h1: [[{ t: "A website built" }], [{ t: "from " }, { t: "scratch", accent: true, scramble: true }, { t: "." }]],
        sub: "No templates, no page builders. A site designed around your brand and your visitors, hand-coded for speed and search — then handed over with a CMS you can edit yourself.",
      },
      card: "A brand or business site designed around you — fast, multilingual and ranking.",
      points: [
        { h: "Fast by default", p: "Static pages, optimised images and no plugin bloat — top Lighthouse scores and a site that feels instant on mobile." },
        { h: "Found on Google", p: "Clean markup, structured data, sitemaps and per-language metadata built in from day one, not bolted on." },
        { h: "Multilingual", p: "French, English, Dutch — or any mix — with proper language routing and translated SEO, not a widget." },
        { h: "Yours to edit", p: "A headless CMS (Sanity) so you can change text, images and pages without calling a developer." },
      ],
      included: [
        "Discovery workshop & site structure",
        "Custom design system — type, colour, motion",
        "Hand-coded build (Next.js)",
        "Headless CMS set-up & training",
        "Technical SEO & analytics",
        "Hosting, domain & launch",
      ],
      cases: ["milo", "bermuda", "automatx"],
      faq: [
        { q: "How long does a custom website take?", a: "Most brand or business sites take 4 to 8 weeks from discovery to launch, depending on the number of pages, languages and how quickly content is ready." },
        { q: "How much does a website cost?", a: "Every site is quoted at a fixed price after a free discovery call — you know the full cost before any work starts. No hourly surprises." },
        { q: "Can I edit the website myself?", a: "Yes. Content lives in a headless CMS (Sanity) with a simple editor: you change text, images and pages yourself, and I'm there for anything structural." },
        { q: "Why not WordPress or Wix?", a: "Hand-coded sites are faster, more secure and rank better — no plugin updates, no theme limits, no page-builder bloat. You get exactly the site you need." },
        { q: "Do you work outside Lyon?", a: "Yes — I'm based in Lyon and work with clients across France, Belgium and beyond, in French, English or Dutch." },
      ],
    },
    {
      slug: "e-commerce",
      name: "E-commerce store",
      seo: {
        title: "E-commerce store development — Stripe & headless",
        description:
          "A custom online store with Stripe checkout, built from scratch in Lyon: fast product pages, multilingual and multi-currency, SEO-ready and easy to manage.",
      },
      hero: {
        eyebrow: "E-commerce · Stripe · headless",
        h1: [[{ t: "An online store" }], [{ t: "that " }, { t: "sells", accent: true, scramble: true }, { t: "." }]],
        sub: "A storefront designed around your products, with a frictionless Stripe checkout — fast on every phone, translated for every market, and managed from one CMS.",
      },
      card: "A custom storefront with Stripe checkout — fast, multilingual and conversion-focused.",
      points: [
        { h: "Checkout that converts", p: "Stripe Checkout with Apple Pay, Google Pay, cards and Twint — secure, SCA-ready and one tap on mobile." },
        { h: "Speed is revenue", p: "Every second costs sales. Product pages are pre-rendered and image-optimised so they load before the visitor blinks." },
        { h: "Every market", p: "Multiple languages and currencies, tax and shipping rules — one store, set up for each country you sell in." },
        { h: "Simple to run", p: "Products, stock and content in one CMS, orders and payouts in Stripe — no plugin stack to maintain." },
      ],
      included: [
        "Store structure & product model",
        "Custom storefront design",
        "Stripe checkout, payments & webhooks",
        "Multilingual & multi-currency set-up",
        "Product SEO & structured data",
        "CMS training & launch support",
      ],
      cases: ["nu"],
      faq: [
        { q: "Shopify or a custom store?", a: "Shopify is great for standard catalogues. A custom store makes sense when design, speed, content or multilingual SEO matter — and it carries no monthly app fees." },
        { q: "Which payment methods are supported?", a: "Everything Stripe supports: cards, Apple Pay, Google Pay, Bancontact, iDEAL, SEPA, Twint and more, with Strong Customer Authentication built in." },
        { q: "Can I manage products myself?", a: "Yes. Products, prices, images and content are edited in the CMS; orders, refunds and payouts are handled in your Stripe dashboard." },
        { q: "How long does an online store take?", a: "Usually 6 to 10 weeks, depending on catalogue size, markets and integrations. The fixed quote after discovery includes a clear timeline." },
        { q: "Is the store optimised for Google?", a: "Yes — product structured data, fast pages, clean URLs and per-language metadata, so products can appear with price and availability in search." },
      ],
    },
    {
      slug: "redesign",
      name: "Website redesign",
      seo: {
        title: "Website redesign & migration — from WordPress or Wix",
        description:
          "Redesign your website and move off WordPress, Wix or Squarespace to a fast, hand-coded site — keeping your Google rankings with full SEO-safe redirects.",
      },
      hero: {
        eyebrow: "Redesign · migration · SEO-safe",
        h1: [[{ t: "Your site, rebuilt" }], [{ t: "to " }, { t: "perform", accent: true, scramble: true }, { t: "." }]],
        sub: "Outgrown a slow WordPress, Wix or Squarespace site? I rebuild it from scratch — new design, real speed — and migrate your content and rankings with it.",
      },
      card: "Move off WordPress, Wix or Squarespace to a fast, hand-coded site — rankings kept.",
      points: [
        { h: "Rankings kept", p: "Every old URL is mapped and redirected, metadata carried over and the sitemap resubmitted — so Google follows you to the new site." },
        { h: "Content migrated", p: "Pages, posts, images and translations moved into a modern CMS, cleaned up on the way." },
        { h: "A real speed jump", p: "From plugin-heavy pages to static, optimised ones — usually seconds faster and green Core Web Vitals." },
        { h: "A design that fits today", p: "Your brand, refreshed into a coherent design system that scales instead of a theme you fight." },
      ],
      included: [
        "Audit of the current site, SEO & analytics",
        "URL map & 301 redirect plan",
        "New design system & hand-coded build",
        "Content migration into the CMS",
        "Search Console & analytics continuity",
        "Post-launch monitoring",
      ],
      cases: ["ywdesign"],
      faq: [
        { q: "Will I lose my Google rankings?", a: "Not with a proper migration. Every URL gets a 301 redirect, metadata is preserved and Search Console is updated — rankings typically hold, and often improve with the speed gain." },
        { q: "Can you migrate from WordPress, Wix or Squarespace?", a: "Yes — content, images and pages are exported and moved into a headless CMS, then cleaned up and restructured where it helps." },
        { q: "Is my content moved over?", a: "Yes. Text, images, posts and translations are migrated; outdated pages are flagged so we can decide together what stays." },
        { q: "How long does a redesign take?", a: "Typically 5 to 10 weeks, depending on the size of the current site and how much content is migrated." },
      ],
    },
  ] as Service[],
};

export type Services = typeof services;
