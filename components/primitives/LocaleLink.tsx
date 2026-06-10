"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useLang } from "@/components/providers/LangProvider";
import { localizedHref } from "@/lib/i18n";

// Locale-aware internal link. Reads the active locale from context and prefixes
// the href for non-default locales (see localizedHref). External / hash / mailto
// / tel hrefs render as a plain <a> so same-page anchors still smooth-scroll and
// new-tab links behave; internal routes use next/link for client navigation.
//
// Content stays locale-agnostic — store "/work" and let this prefix it to
// "/en/work" under EN, "/work" under the default (FR).
export function LocaleLink({
  href,
  external = false,
  className,
  children,
  ...rest
}: {
  href: string;
  external?: boolean;
  className?: string;
  children: ReactNode;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className">) {
  const locale = useLang();
  const isPlain = external || /^(#|mailto:|tel:|https?:)/.test(href);

  if (isPlain) {
    return (
      <a
        href={href}
        className={className}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={localizedHref(locale, href)} className={className} {...rest}>
      {children}
    </Link>
  );
}
