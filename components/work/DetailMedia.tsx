import Image from "next/image";
import { Reveal } from "@/components/primitives/Reveal";

// Full-bleed hero media — the .detail-media block. next/image `fill` covers the
// 16/9 .media frame (detail.css gives it position:relative + aspect-ratio).
export function DetailMedia({ src, alt }: { src: string; alt: string }) {
  return (
    <Reveal as="div" className="detail-media">
      <div className="media">
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="(max-width: 720px) 100vw, 1200px"
        />
      </div>
    </Reveal>
  );
}
