import type { Metadata } from "next";
import LiveTransmissions from "@/components/LiveTransmissions/LiveTransmissions";

export const metadata: Metadata = {
  title: "Live Events | G-Wizz, The Slayer",
  description: "Find upcoming shows, event locations, and ticket details for G-Wizz, The Slayer."
};

export default function LiveEventsPage() {
  return <main className="min-h-screen bg-black text-white"><LiveTransmissions /></main>;
}
