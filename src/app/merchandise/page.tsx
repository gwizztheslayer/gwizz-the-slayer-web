import MerchandiseExperience from "@/components/Merchandise/MerchandiseExperience";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Supply Depot | G-Wizz, The Slayer",
  description: "Official Syndicate uniform and artifacts. Limited production runs.",
};

export default function MerchandisePage() {
  return <MerchandiseExperience />;
}
