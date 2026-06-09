import { PrimaryNav } from "@/components/layout/PrimaryNav";

// Case studies get the same full primary nav, plus a leading "← All work" back-link.
export function DetailHeader() {
  return <PrimaryNav back={{ href: "/work", label: "All work" }} />;
}
