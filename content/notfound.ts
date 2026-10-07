// 404 copy (app/global-not-found.tsx). That page renders outside the [lang]
// layout, so the locale is read from the URL prefix client-side.
import type { Seg } from "@/content/home";
import type { Locale } from "@/lib/i18n";

export type NotFoundCopy = {
  eyebrow: string;
  title: Seg[];
  sub: string;
  missing: string; // "<path> — not found" suffix
  home: string;
  work: string;
  services: string;
  hint: string;
};

export const notFound: Record<Locale, NotFoundCopy> = {
  en: {
    eyebrow: "Error 404 · deep space",
    title: [{ t: "Nothing out " }, { t: "here", accent: true, scramble: true }, { t: "." }],
    sub: "This page drifted off — or never existed. The rest of the site is still in orbit.",
    missing: "not found",
    home: "Back to home",
    work: "See the work",
    services: "Services",
    hint: "move to look around",
  },
  fr: {
    eyebrow: "Erreur 404 · espace lointain",
    title: [{ t: "Il n’y a " }, { t: "rien", accent: true, scramble: true }, { t: " ici." }],
    sub: "Cette page a dérivé — ou n’a jamais existé. Le reste du site est toujours en orbite.",
    missing: "introuvable",
    home: "Retour à l’accueil",
    work: "Voir les projets",
    services: "Services",
    hint: "bougez pour regarder autour",
  },
  nl: {
    eyebrow: "Fout 404 · diepe ruimte",
    title: [{ t: "Hier is " }, { t: "niets", accent: true, scramble: true }, { t: "." }],
    sub: "Deze pagina is weggedreven — of heeft nooit bestaan. De rest van de site draait nog gewoon rond.",
    missing: "niet gevonden",
    home: "Terug naar home",
    work: "Bekijk het werk",
    services: "Diensten",
    hint: "beweeg om rond te kijken",
  },
};
