import { getHome } from "@/content/home";
import type { Locale } from "@/lib/i18n";
import { ContactBlock } from "@/components/shared/ContactBlock";

// Home contact section — thin wrapper over the shared ContactBlock.
export function Contact({ lang }: { lang: Locale }) {
  return <ContactBlock data={getHome(lang).contact} />;
}
