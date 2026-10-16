import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Space_Grotesk } from "next/font/google";
import { LazyMotion, domAnimation } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import PageTransition from "@/components/PageTransition";
import MetaPixel from "@/components/MetaPixel/MetaPixel";
import KairoWidget from "@/components/KairoWidget/KairoWidget";
import Navbar from "@/components/Navbar/Navbar";
import { AudioProvider } from "@/context/AudioContext";

const mainFont = Space_Grotesk({ subsets: ["latin"], display: "swap" });

export const metadata = {
  metadataBase: new URL("https://www.gwizztheslayer.co.za"),
  title: "G-Wizz, The Slayer | Audio, Art, Apparel & Software",
  description: "The digital hub of G-Wizz, The Slayer. Discover self-produced rap and hip-hop, physical canvas paintings, official clothing drops, and custom web applications built from Knysna, South Africa.",
  keywords: ["G-Wizz The Slayer", "Audio, Art, Apparel & Software", "Knysna Music", "South African Rap", "Knysna's Saviour", "Dreams Of Colour"],
  verification: { other: { "p:domain_verify": "64694b793816c01bce092bf33f4e5710" } },
  icons: { icon: "/icon.png", apple: "/icon.png" },
  openGraph: {
    title: "G-Wizz, The Slayer | Audio, Art, Apparel & Software",
    description: "The digital hub of G-Wizz, The Slayer. Discover self-produced rap and hip-hop, physical canvas paintings, official clothing drops, and custom web applications built from Knysna, South Africa.",
    url: "https://www.gwizztheslayer.co.za",
    siteName: "G-Wizz, The Slayer",
    images: [{ url: "/comic/knysna-saviour-cover.png", width: 1200, height: 630, alt: "Knysna's Saviour comic cover" }],
    locale: "en_ZA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "G-Wizz, The Slayer | Audio, Art, Apparel & Software",
    description: "The digital hub of G-Wizz, The Slayer. Discover self-produced rap and hip-hop, physical canvas paintings, official clothing drops, and custom web applications built from Knysna, South Africa.",
    images: ["/comic/knysna-saviour-cover.png"],
  },
};

const artistJsonLd = {
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  name: "G-Wizz, The Slayer",
  url: "https://www.gwizztheslayer.co.za",
  image: "https://www.gwizztheslayer.co.za/images/slayer-photo.jpg",
  genre: ["Trap", "Hip-Hop", "Audio, Art, Apparel & Software"],
  origin: { "@type": "Place", name: "Knysna, South Africa" },
  sameAs: [
    "https://open.spotify.com/artist/1GM9nGfwFjiwZtgIWO3sh2",
    "https://www.youtube.com/@gwizztheslayer",
    "https://instagram.com/gwizztheslayer",
    "https://twitter.com/gwizz_theslayer",
    "https://audiomack.com/gwizztheslayer",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-black">
      <body className={`${mainFont.className} bg-black text-white selection:bg-cyan-500 selection:text-black antialiased`}>
        <MetaPixel />
        <Script id="artist-schema-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(artistJsonLd) }} />
        <Navbar />
        <LazyMotion features={domAnimation}>
          <AudioProvider>
            <PageTransition>{children}</PageTransition>
          </AudioProvider>
        </LazyMotion>
        <Analytics />
        <SpeedInsights />
        <KairoWidget />
        {process.env.NEXT_PUBLIC_GA_ID && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />}
      </body>
    </html>
  );
}

