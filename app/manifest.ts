import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "YWdesign — Senior web developer & designer",
    short_name: "YWdesign",
    description:
      "Hand-coded, AI-accelerated websites & stores. Next.js · Sanity · GSAP · Stripe.",
    start_url: "/",
    display: "standalone",
    background_color: "#161a1f",
    theme_color: "#161a1f",
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { src: "/icon-512.png", type: "image/png", sizes: "512x512", purpose: "any" },
    ],
  };
}
