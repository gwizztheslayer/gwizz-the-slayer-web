import type { Metadata } from "next";
import Visuals from "@/components/Visuals/Visuals";

export const metadata: Metadata = {
  title: "Visuals | G-Wizz, The Slayer",
  description: "Watch music videos and visual work from G-Wizz, The Slayer."
};

export default function VisualsPage() {
  return <main className="min-h-screen bg-black text-white"><Visuals /></main>;
}
