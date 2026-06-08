import { home } from "@/content/home";
import { ContactBlock } from "@/components/shared/ContactBlock";

// Home contact section — thin wrapper over the shared ContactBlock.
export function Contact() {
  return <ContactBlock data={home.contact} />;
}
