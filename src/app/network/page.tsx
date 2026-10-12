import type { Metadata } from "next";
import Network from "@/components/Network/Network";

export const metadata: Metadata = {
  title: "Network | G-Wizz, The Slayer",
  description: "Official social, music, and video channels for G-Wizz, The Slayer."
};

export default function NetworkPage() {
  return <main className="min-h-screen bg-black text-white"><Network /></main>;
}
