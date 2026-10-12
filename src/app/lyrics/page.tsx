import type { Metadata } from "next";
import LyricsSector from "@/components/LyricsSector/LyricsSector";

export const metadata: Metadata = {
  title: "Lyrics Engine | G-Wizz, The Slayer",
  description: "Search available lyric transcriptions for selected G-Wizz, The Slayer tracks."
};

export default function LyricsPage() {
  return <main className="min-h-screen bg-black text-white"><LyricsSector /></main>;
}
