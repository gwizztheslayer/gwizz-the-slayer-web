import type { Metadata } from "next";
import Discography from "@/components/Discography/Discography";
import AuraPlayer from "@/components/AuraPlayer/AuraPlayer";

export const metadata: Metadata = {
  title: "Discography | G-Wizz, The Slayer",
  description: "Browse albums and singles and play available tracks from G-Wizz, The Slayer."
};

export default function DiscographyPage() {
  return (
    <main className="min-h-screen bg-black pb-36 text-white">
      <Discography mode="full" />
      <AuraPlayer />
    </main>
  );
}
