// All about-page copy — English only for now, typed for easy EN/FR/NL later.
// Source of truth: Claude Design/about.html. The animated self-portrait SVG
// paths live in the SelfPortrait component; only translatable copy lives here.
import type { Seg } from "@/content/home";
import type { ContactData } from "@/components/shared/ContactBlock";
import type { Locale } from "@/lib/i18n";

export type Fact = { k: string; v: string };
export type SkillChip = { label: string; hot?: boolean };
export type ValueItem = { n: string; h: string; p: string };
export type Stat = { value: number; suffix: string; label: string; p: string };

export const about = {
  hero: {
    eyebrow: "About · Yolan Wauters · Lyon, FR",
    h1: [
      { t: "Hi, I'm" },
      { t: "Yolan.", scramble: true, accent: true },
    ] as Seg[],
    lede: [
      { t: "A passionate " },
      { t: "biomedical engineer", b: true },
      { t: " and surfer, dedicated to having a " },
      { t: "global positive impact", b: true },
      { t: " — one fast, considered website at a time." },
    ] as Seg[],
    facts: [
      { k: "Based", v: "Lyon, FR" },
      { k: "Training", v: "Biomedical Engineering" },
      { k: "Method", v: "PRINCE2 · code-deep" },
      { k: "Off-screen", v: "In the water, surfing" },
    ] as Fact[],
    portraitTag: "// drawn in code · not a photo",
  },

  aboutMe: {
    tk: "01",
    eyebrow: "A little bit about me",
    narrative: [
      [
        { t: "I'm an open-minded, ambitious person who takes every challenge as a chance to learn. I love working with people — and I tend to get the best out of everyone around me." },
      ],
      [
        { t: "Listening and planning are what let me " },
        { t: "pull a team forward", b: true },
        { t: ", toward results that keep improving, together. It's the same instinct I bring to a build: understand deeply, then move." },
      ],
    ] as Seg[][],
    skills: {
      label: "// what I bring to the table",
      chips: [
        { label: "Computer Science", hot: true },
        { label: "Biomedical Engineering", hot: true },
        { label: "PRINCE2" },
        { label: "Project Management" },
        { label: "Digital Strategy" },
        { label: "Graphic Design" },
        { label: "SEO Optimisation" },
        { label: "Storytelling" },
        { label: "Leadership" },
        { label: "Communication" },
        { label: "Adaptability" },
        { label: "Listening" },
      ] as SkillChip[],
    },
  },

  mission: {
    tk: "02",
    eyebrow: "Mission",
    heading: ["A positive impact on the planet", "and the people on it."],
    p: [
      { t: "I want to use my passion for " },
      { t: "graphic design", accent: true },
      { t: " and " },
      { t: "computer science", accent: true },
      { t: " to inspire and motivate the many. By building digital tools that leverage the internet, more people can understand the ideas that will change the world." },
    ] as Seg[],
  },

  vision: {
    tk: "03",
    eyebrow: "Vision",
    title: ["Everything starts", "with a vision."],
    intro: "Four values I build and work by — on the screen and off it.",
    values: [
      { n: "01", h: "Impact", p: "To have an impact is to share your ideas — and to have the many truly understand them." },
      { n: "02", h: "Excellence", p: "To succeed at whatever you do is to stay open-minded about improving yourself." },
      { n: "03", h: "Listening", p: "Great victories are shared — achieved only when you open your ears and listen." },
      { n: "04", h: "Learning", p: "On the road to understanding, you have to become free of the values that shaped your reality." },
    ] as ValueItem[],
  },

  numbers: {
    tk: "04",
    eyebrow: "Numbers",
    title: ["Measure to", "drive impact."],
    intro: "Why the web matters — and why it's worth doing properly.",
    stats: [
      { value: 3, suffix: "x", label: "Get your brand online", p: "Growth of retail sales through e-commerce worldwide since 2015." },
      { value: 58, suffix: "%", label: "Have a responsive site", p: "Share of global website traffic coming through mobile devices." },
      { value: 92, suffix: "%", label: "Optimise your SEO", p: "Internet searches globally going through Google's search engine." },
    ] as Stat[],
  },

  contact: {
    eyebrow: "Contact",
    title: [
      [{ t: "Let's build" }],
      [{ t: "something " }, { t: "worth it.", em: true, scramble: true }],
    ],
    p: "Got an idea, a brand, or a site that needs to move faster? Tell me what you have in mind — I'll tell you how I'd build it.",
    ctas: [
      { label: "Start a project", href: "mailto:contact@ywdesign.co?subject=Project", variant: "primary", arrow: "→" },
      { label: "WhatsApp", href: "https://wa.me/32471124525", variant: "ghost", external: true },
    ],
  } as ContactData,
};

export type About = typeof about;
const aboutByLocale: Record<Locale, About> = { fr: about, en: about, nl: about };
// FR/NL reuse the EN dictionary until translations are written.
export function getAbout(lang: Locale): About {
  return aboutByLocale[lang];
}
