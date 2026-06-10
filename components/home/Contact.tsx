import type { Home } from "@/content/home";
import type { Site } from "@/content/site";
import { ContactBlock } from "@/components/shared/ContactBlock";

// Home contact section — thin wrapper over the shared ContactBlock.
export function Contact({
  contact,
  site,
}: {
  contact: Home["contact"];
  site: Site["contact"];
}) {
  return <ContactBlock data={contact} contact={site} />;
}
