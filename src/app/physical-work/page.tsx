import type { Metadata } from "next";
import CanvasVault from "@/components/CanvasVault/CanvasVault";

export const metadata: Metadata = {
  title: "PAINTINGS | G-Wizz, The Slayer",
  description: "View selected original paintings by G-Wizz, The Slayer, and enter the full gallery."
};

export default function PhysicalWorkPage() {
  return <main className="min-h-screen bg-black text-white"><CanvasVault /></main>;
}

