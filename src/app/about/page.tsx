import type { Metadata } from "next";
import About from "@/components/About/About";

export const metadata: Metadata = {
  title: "About | G-Wizz, The Slayer",
  description: "Learn about Cameron Stander, the artist and developer behind G-Wizz, The Slayer."
};

export default function AboutPage() {
  return <main className="min-h-screen bg-black text-white"><About /></main>;
}
