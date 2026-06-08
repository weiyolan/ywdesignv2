import { Hero } from "@/components/home/Hero";
import { Capabilities } from "@/components/home/Capabilities";
import { StackDeepDive } from "@/components/home/StackDeepDive";
import { SelectedWork } from "@/components/home/SelectedWork";
import { AiManifesto } from "@/components/home/AiManifesto";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { Contact } from "@/components/home/Contact";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Capabilities />
      <StackDeepDive />
      <SelectedWork />
      <AiManifesto />
      <ProcessTimeline />
      <Contact />
    </main>
  );
}
