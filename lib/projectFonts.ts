// Per-project fonts. Nu's live brand pairs Corben (serif headings) with Mulish
// (sans body); both are recreated here for the case study's "real shop" demo so
// it sits in Nu's own light palette. Referenced via var(--font-corben) /
// var(--font-mulish) in the ported .nu-* CSS (detail.css). Applied as CSS-var
// classes on the Nu shop wrapper (and the [slug] root when slug === "nu").
import { Corben, Mulish } from "next/font/google";

export const corben = Corben({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-corben",
  display: "swap",
});

export const mulish = Mulish({
  subsets: ["latin"],
  variable: "--font-mulish",
  display: "swap",
});
