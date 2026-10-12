import Image from "next/image";
import type { Metadata } from "next";

// 1. DYNAMIC METADATA (For Search & Social Previews)
export const metadata: Metadata = {
  title: "Demons Don't Sleep | G-Wizz The Slayer",
  description: "Stream the new album 'Demons Don't Sleep' by South African modern trap artist G-Wizz The Slayer. Featuring high-energy production by Ceoxcam88.",
  openGraph: {
    title: "Demons Don't Sleep | Out Now",
    description: "The official heavy-hitting trap experience from G-Wizz, The Slayer.",
    url: "https://gwizztheslayer.co.za/music/demons-dont-sleep",
    siteName: "G-Wizz The Slayer",
    type: "music.album",
  },
};

export default function DemonsDontSleepPage() {
  // 2. STRUCTURED DATA (For Google Knowledge Panels)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MusicAlbum",
    "name": "Demons Don't Sleep",
    "byArtist": {
      "@type": "MusicGroup",
      "name": "G-Wizz The Slayer"
    },
    "genre": "Modern Trap",
    "producer": {
      "@type": "Person",
      "name": "Ceoxcam88"
    }
  };

  return (
    <main className="min-h-screen bg-black text-white p-8">
      {/* Injecting the hidden JSON-LD schema into the DOM */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-red-600 mb-2 uppercase tracking-wider">
          Demons Don't Sleep
        </h1>
        <p className="text-xl text-zinc-400 mb-8">
          The new album by G-Wizz The Slayer.
        </p>

        {/* 3. OPTIMIZED VISUALS */}
        {/* Note: Place your actual album cover image inside your public folder and update the src below! */}
        <div className="border border-zinc-800 rounded-lg overflow-hidden bg-zinc-900 aspect-square w-full max-w-md">
          {/* <Image 
              src="/demons-cover.webp" 
              alt="Demons Don't Sleep Album Art - Cyberpunk Trap Aesthetic" 
              width={500} 
              height={500} 
              priority 
            /> 
          */}
          <div className="p-8 text-zinc-400">
            [Insert Next/Image Component Here]
          </div>
        </div>
      </div>
    </main>
  );
}

