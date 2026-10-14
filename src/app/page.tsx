import HomeMerchSection from '@/components/Home/HomeMerchSection';
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import dynamic from "next/dynamic";
import AuraPlayer from "@/components/AuraPlayer/AuraPlayer";
import Discography from "@/components/Discography/Discography";
import ComicBookSection from "@/components/ComicBookSection";
import { ARTIST_PROFILE } from "@/data/artist";
import Network from "@/components/Network/Network";

import MarketOracle from "@/components/Oracle/MarketOracle";

const Visuals = dynamic(() => import("@/components/Visuals/Visuals"), { loading: () => <div className="w-full max-w-6xl mx-auto min-h-[400px] border border-toxic/10 bg-black flex items-center justify-center font-mono text-xs text-toxic/40 animate-pulse">[ INITIATING VISUAL FEED... ]</div> });
const CanvasVault = dynamic(() => import("@/components/CanvasVault/CanvasVault"), { loading: () => <div className="w-full max-w-6xl mx-auto min-h-[400px] border border-toxic/10 bg-black flex items-center justify-center font-mono text-xs text-toxic/40 animate-pulse">[ ACCESSING PHYSICAL CANVAS VAULT... ]</div> });
const Transmissions = dynamic(() => import("@/components/Transmissions/Transmissions"), { loading: () => <div className="w-full max-w-6xl mx-auto min-h-[400px] border border-toxic/10 bg-black flex items-center justify-center font-mono text-xs text-toxic/40 animate-pulse">[ ACCESSING THE VAULT... ]</div> });
const LiveTransmissions = dynamic(() => import("@/components/LiveTransmissions/LiveTransmissions"));
const Arsenal = dynamic(() => import("@/components/Arsenal/Arsenal"), { loading: () => <div className="w-full max-w-6xl mx-auto min-h-[400px] border border-toxic/10 bg-black flex items-center justify-center font-mono text-xs text-toxic/40 animate-pulse">[ ACCESSING MERCHANDISE... ]</div> });
const About = dynamic(() => import("@/components/About/About"));
const ContactForm = dynamic(() => import("@/components/ContactForm/ContactForm"));
const Support = dynamic(() => import("@/components/Support/Support"));
const LyricsSector = dynamic(() => import("@/components/LyricsSector/LyricsSector"), { loading: () => <div className="w-full max-w-6xl mx-auto min-h-[400px] border border-toxic/10 bg-black flex items-center justify-center font-mono text-xs text-toxic/40 animate-pulse">[ INITIATING LYRICS ENGINE... ]</div> });

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "G-Wizz, The Slayer | Music, Art, Comics & Events",
  description: "Explore music, original artwork, Knysna's Saviour, videos, articles, and live events from G-Wizz, The Slayer.",
  keywords: ["G-Wizz The Slayer", "modern trap music", "Knysna rap", "South African trap", "Knysna's Saviour", "urban-industrial rap", "Aura Venture Coin"],
  openGraph: {
    title: "G-Wizz, The Slayer | Official Hub",
    description: "Music, Lore, and the Knysna Underground.",
    type: "website",
    url: "https://www.gwizztheslayer.co.za",
  }
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MusicGroup",
        "name": "G-Wizz, The Slayer",
        "genre": ["Hip-Hop", "Rap", "Modern Trap"],
        "image": "https://gwizztheslayer.co.za/images/slayer-photo.jpg",
        "description": "Emerging from the Knysna underground, G-Wizz, The Slayer is an architect of urban-industrial modern trap music.",
        "url": "https://gwizztheslayer.co.za",
        "sameAs": [
          "https://open.spotify.com/artist/1GM9nGfwFjiwZtgIWO3sh2",
          "https://audiomack.com/gwizztheslayer",
          "https://www.youtube.com/@gwizztheslayer",
          "https://instagram.com/gwizztheslayer",
          "https://twitter.com/gwizz_theslayer"
        ],
        "subjectOf": {
          "@type": "VideoObject",
          "name": "G-Wizz, The Slayer - Taking Over Ft. Ace Mclein (music video)",
          "description": "Official music video for Taking Over by G-Wizz, The Slayer featuring Ace Mclein, utilizing 1934 public domain archive footage.",
          "thumbnailUrl": "https://gwizztheslayer.co.za/icon.png",
          "uploadDate": "2026-06-19T12:00:00+02:00",
          "contentUrl": "https://drive.google.com/file/d/1T4g1HitxceZnGPcA35UfhFjeQ7VziAKg/preview"
        }
      },
    ]
  };

  return (
    <main className="flex flex-col min-h-screen bg-black text-white selection:bg-toxic selection:text-black font-sans pb-24 relative overflow-hidden">
      <div className="shadow-vignette"></div>
      <Script id="home-schema-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="w-full pt-16 z-[900] relative">
        <MarketOracle />
      </div>

      <section id="home" className="relative flex flex-col items-center justify-center pt-24 pb-12 min-h-[70vh]">
        <div className="relative w-full max-w-5xl mx-auto px-4 flex justify-center mb-12 z-10 pointer-events-none">
          <Image src="/logo.png" alt="G-Wizz, The Slayer Logo" width={1024} height={300} priority sizes="(max-width: 768px) 90vw, 800px" className="object-contain drop-shadow-[0_0_30px_rgba(0,0,0,0.8)]" />
        </div>
        
        <div className="z-10 mx-auto flex w-full max-w-3xl flex-col items-center gap-6 px-4 text-center">
          <p className="max-w-2xl text-base leading-relaxed text-zinc-300 md:text-lg">{ARTIST_PROFILE.introduction}</p>
          <div className="mt-2 flex w-full flex-wrap justify-center gap-3 font-mono text-xs">
            <Link href="/discography" className="min-w-36 border border-toxic bg-toxic px-6 py-4 font-bold uppercase tracking-widest text-black transition-colors hover:bg-transparent hover:text-toxic">Listen</Link>
            <Link href="/visuals" className="min-w-36 border border-toxic/50 px-6 py-4 font-bold uppercase tracking-widest text-toxic transition-colors hover:bg-toxic hover:text-black">Watch</Link>
            <Link href="/contact" className="min-w-36 border border-white/20 px-6 py-4 font-bold uppercase tracking-widest text-white transition-colors hover:border-toxic hover:text-toxic">Book</Link>
            <a href="https://ar.gwizztheslayer.co.za" target="_blank" rel="noopener noreferrer" className="min-w-36 border border-purple-500/50 px-6 py-4 font-bold uppercase tracking-widest text-purple-400 transition-colors hover:bg-purple-500 hover:text-white">Enter AR</a>
          </div>
        </div>
      </section>

      <Discography />
      <CanvasVault />
      <ComicBookSection />
      <Visuals />
      <Transmissions />
      <LiveTransmissions />
      <Arsenal />

      <About />
      <LyricsSector />
      <Network />

      <ContactForm />
      <Support />

      <section className="w-full bg-black border-t-2 border-toxic/20 hover:border-toxic transition-all duration-700 relative z-50">
        <a href="https://dreams-of-colour.vercel.app/" aria-label="Visit Dreams Of Colour Record Label" target="_blank" rel="noopener noreferrer" className="block w-full group relative overflow-hidden">
          <div className="absolute inset-0 bg-toxic/0 group-hover:bg-toxic/20 transition-colors duration-500 z-10 mix-blend-overlay"></div>
          <Image src="/doc-footer.png" alt="Dreams Of Colour - Independent Record Label Hub" width={1920} height={400} className="w-full h-auto max-h-[400px] object-cover object-center group-hover:scale-[1.02] transition-transform duration-700" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 backdrop-blur-sm bg-black/60">
            <span className="text-toxic text-xs md:text-sm font-black tracking-[0.3em] uppercase border border-toxic px-8 py-4 bg-black/90 shadow-[0_0_30px_rgba(57,255,20,0.4)]">
              [ ENTER INDEPENDENT RECORD LABEL ]
            </span>
          </div>
        </a>
      </section>
      
      <AuraPlayer />
      
          {/* Anti-collision spacer */}
      <div className="w-full h-[120px] pointer-events-none" />
      <HomeMerchSection />
      </main>
  );
}
