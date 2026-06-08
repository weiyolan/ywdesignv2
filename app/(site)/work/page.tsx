import type { Metadata } from "next";
import { SelectedWork } from "@/components/home/SelectedWork";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Shipped, in production — selected client work: multilingual, fast, conversion-focused websites and stores across Belgium and beyond.",
};

export default function WorkPage() {
  return (
    <main className="page-pad">
      <SelectedWork />
    </main>
  );
}
