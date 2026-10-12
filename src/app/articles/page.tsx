import type { Metadata } from "next";
import Transmissions from "@/components/Transmissions/Transmissions";

export const metadata: Metadata = {
  title: "Articles | G-Wizz, The Slayer",
  description: "Read articles and updates from G-Wizz, The Slayer."
};

export default function ArticlesPage() {
  return <main className="min-h-screen bg-black text-white"><Transmissions /></main>;
}
