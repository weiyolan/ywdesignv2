// Central GSAP entry point — registers plugins exactly once.
// All client components import from "@/lib/gsap".
// (As of GSAP 3.13 every plugin — ScrollTrigger, Draggable, MorphSVG — is free,
// and they ship inside the `gsap` package, so no extra install is needed.)
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { Observer } from "gsap/Observer";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, Draggable, MorphSVGPlugin, Observer);
}

export { gsap, ScrollTrigger, Draggable, MorphSVGPlugin, Observer };
