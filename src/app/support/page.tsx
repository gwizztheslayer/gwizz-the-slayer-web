import type { Metadata } from "next";
import Support from "@/components/Support/Support";

export const metadata: Metadata = {
  title: "Support | G-Wizz, The Slayer",
  description: "Find ways to support the work and ask about availability."
};

export default function SupportPage() {
  return <main className="min-h-screen bg-black text-white"><Support /></main>;
}
