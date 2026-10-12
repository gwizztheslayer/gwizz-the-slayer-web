import type { Metadata } from "next";
import Arsenal from "@/components/Arsenal/Arsenal";

export const metadata: Metadata = {
  title: "Merchandise | G-Wizz, The Slayer",
  description: "Browse merchandise and digital releases from G-Wizz, The Slayer."
};

export default function MerchandisePage() {
  return <main className="min-h-screen bg-black text-white"><Arsenal /></main>;
}
