// Central GSAP entry point — registers ScrollTrigger exactly once.
// All client components import { gsap, ScrollTrigger } from "@/lib/gsap".
// (As of GSAP 3.13 every plugin, including ScrollTrigger, is free.)
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
