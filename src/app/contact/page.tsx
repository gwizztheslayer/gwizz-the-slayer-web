import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm/ContactForm";

export const metadata: Metadata = {
  title: "Contact | G-Wizz, The Slayer",
  description: "Send a booking, collaboration, or general enquiry to G-Wizz, The Slayer."
};

export default function ContactPage() {
  return <main className="min-h-screen bg-black text-white"><ContactForm /></main>;
}
