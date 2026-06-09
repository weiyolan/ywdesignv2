import { Hero } from "@/components/home/Hero";
import { Capabilities } from "@/components/home/Capabilities";
import { StackDeepDive } from "@/components/home/StackDeepDive";
import { SelectedWork } from "@/components/home/SelectedWork";
import { AiManifesto } from "@/components/home/AiManifesto";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { Contact } from "@/components/home/Contact";
import type { Locale } from "@/lib/i18n";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = (await params).lang as Locale;
  return (
    <main>
      <Hero lang={lang} />
      <Capabilities lang={lang} />
      <StackDeepDive />
      <SelectedWork />
      <AiManifesto lang={lang} />
      <ProcessTimeline />
      <Contact lang={lang} />
    </main>
  );
}
