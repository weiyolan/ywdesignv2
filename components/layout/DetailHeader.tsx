"use client";

import { PrimaryNav } from "@/components/layout/PrimaryNav";
import { useLocale } from "@/components/providers/LocaleProvider";
import { getSite } from "@/content/site";

// Case studies get the same full primary nav, plus a leading "← All work" back-link.
export function DetailHeader() {
  const label = getSite(useLocale()).ui.allWork;
  return <PrimaryNav back={{ href: "/work", label }} />;
}
