import type { ReactNode } from "react";
import { LocaleLink } from "@/components/primitives/LocaleLink";

type Variant = "primary" | "ghost";

// Renders the design-system .btn. Delegates link handling to LocaleLink, which
// prefixes internal routes by locale and falls back to a plain <a> for
// hash/mailto/tel/external hrefs.
export function Button({
  href,
  variant = "primary",
  external = false,
  className = "",
  children,
}: {
  href: string;
  variant?: Variant;
  external?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const cls = `btn btn-${variant}${className ? " " + className : ""}`;
  return (
    <LocaleLink href={href} external={external} className={cls}>
      {children}
    </LocaleLink>
  );
}
