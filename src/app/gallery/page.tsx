import type { Metadata } from "next";
import GalleryExperience from "@/components/Gallery/GalleryExperience";

export const metadata: Metadata = {
  title: "Full Gallery | G-Wizz, The Slayer",
  description: "Explore the complete physical artwork collection from G-Wizz, The Slayer."
};

export default function GalleryPage() {
  return <GalleryExperience />;
}
