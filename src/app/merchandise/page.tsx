"use client";
import { useState } from "react";
import Link from "next/link";

const PRODUCTS = [
  {
    id: "drop-01",
    name: "Syndicate Red Eye Hoodie",
    category: "APPAREL",
    price: "R850.00",
    status: "COMING SOON",
    description: "Heavyweight black cotton hoodie featuring custom red alien motif and sleeve typography.",
    specs: ["400 GSM Heavyweight Cotton", "Relaxed Tactical Fit", "Custom Screenprint Details"]
  },
  {
    id: "drop-02",
    name: "Apocalypse Landscape Hoodie",
    category: "APPAREL",
    price: "R850.00",
    status: "COMING SOON",
    description: "Charcoal grey hoodie showcasing atomic surrealist dark artwork inspired by syndicate lore.",
    specs: ["400 GSM Heavyweight Cotton", "Brushed Interior", "Distressed Wash Finish"]
  },
  {
    id: "drop-03",
    name: "Green Alien Portrait Tee",
    category: "APPAREL",
    price: "R450.00",
    status: "COMING SOON",
    description: "Premium black cotton t-shirt with high-definition toxic green front art print.",
    specs: ["220 GSM Combed Cotton", "Boxy Streetwear Cut", "Reinforced Neck Ribbing"]
  },
  {
    id: "drop-04",
    name: "Knysna's Saviour (Deluxe Vinyl + Comic)",
    category: "PHYSICAL",
    price: "R650.00",
    status: "PRE-ORDER",
    description: "Limited physical collaborative release featuring full album vinyl press and accompanying 24-page webcomic booklet.",
    specs: ["180g Transparent Green Vinyl", "Full-Color Glossy Comic Booklet", "Hand-Numbered Gatefold Sleeve"]
  },
  {
    id: "drop-05",
    name: "Demons Don't Sleep (Master Stems Pack)",
    category: "DIGITAL",
    price: "R300.00",
    status: "AVAILABLE",
    description: "Complete FL Studio project files and audio stems for the full album Demons Don't Sleep.",
    specs: ["FL Studio 24 Project Files", "24-bit Lossless Audio Stems", "Unrestricted Producer Rights"]
  },
  {
    id: "drop-06",
    name: "Syndicate UI Asset & Font Pack",
    category: "DIGITAL",
    price: "R200.00",
    status: "AVAILABLE",
    description: "Custom monospace terminal fonts, SVG icons, and Tailwind configuration presets used across the digital hub.",
    specs: ["OTF / WOFF2 Terminal Fonts", "Complete SVG Icon Library", "Tailwind CSS Design Tokens"]
  }
];

export default function MerchandisePage() {
  const [activeTab, setActiveTab] = useState("ALL");

  const filteredProducts = activeTab === "ALL" 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeTab);

  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-16">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-toxic/30 pb-6 mb-10">
          <div>
            <span className="text-toxic font-mono text-xs tracking-[0.3em] uppercase">[ OFFICIAL SYNDICATE SUPPLY DEPOT ]</span>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-widest mt-2 text-white">Merchandise & Assets</h1>
          </div>
          <div className="mt-4 md:mt-0 flex gap-4">
            <Link href="/vault/auth" className="border border-toxic px-5 py-2.5 text-toxic font-mono text-xs font-bold tracking-widest uppercase hover:bg-toxic hover:text-black transition-colors">
              Vault Access &rarr;
            </Link>
          </div>
        </div>

        {/* Intro Description */}
        <p className="text-zinc-400 font-mono text-xs md:text-sm leading-relaxed max-w-3xl mb-10">
          Official apparel drops, physical vinyl records, comic booklets, and digital production assets from G-WIZZ, THE SLAYER. Manufactured and distributed directly from Knysna, South Africa.
        </p>

        {/* Category Navigation Tabs */}
        <div className="flex flex-wrap gap-3 mb-12 border-b border-white/10 pb-6">
          {["ALL", "APPAREL", "PHYSICAL", "DIGITAL"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 font-mono text-xs uppercase tracking-widest border transition-all ${
                activeTab === tab 
                  ? "bg-toxic text-black border-toxic font-bold shadow-[0_0_15px_rgba(0,255,0,0.3)]" 
                  : "bg-black text-zinc-400 border-white/20 hover:border-toxic hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-[#050505] border border-toxic/20 p-6 flex flex-col justify-between group hover:border-toxic transition-colors">
              <div>
                <div className="h-64 bg-zinc-900 mb-6 flex items-center justify-center border border-white/10 relative overflow-hidden group-hover:border-toxic/50 transition-colors">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>
                  <span className="text-zinc-600 font-mono text-xs tracking-widest uppercase relative z-20 group-hover:text-toxic transition-colors">
                    [ {product.id.toUpperCase()} ]
                  </span>
                  <div className="absolute top-3 right-3 z-20 bg-black/80 border border-toxic/40 px-2.5 py-1 text-[10px] font-mono text-toxic uppercase">
                    {product.status}
                  </div>
                </div>

                <div className="flex justify-between items-start mb-2">
                  <span className="text-toxic font-mono text-[10px] tracking-widest uppercase">{product.category}</span>
                  <span className="text-white font-mono text-sm font-bold">{product.price}</span>
                </div>

                <h3 className="text-white font-black text-lg tracking-wider uppercase mb-3">{product.name}</h3>
                <p className="text-zinc-400 font-mono text-xs mb-4 leading-relaxed">{product.description}</p>

                <ul className="space-y-1.5 mb-6 border-t border-white/10 pt-4">
                  {product.specs.map((spec, sIdx) => (
                    <li key={sIdx} className="text-zinc-500 font-mono text-[11px] flex items-center gap-2">
                      <span className="text-toxic">&gt;</span> {spec}
                    </li>
                  ))}
                </ul>
              </div>

              <button 
                disabled={product.status === "COMING SOON"}
                className={`w-full py-3 font-mono text-xs uppercase tracking-widest border transition-all flex items-center justify-center gap-2 ${
                  product.status === "COMING SOON"
                    ? "border-zinc-800 bg-zinc-900/50 text-zinc-600 cursor-not-allowed"
                    : "border-toxic bg-black text-toxic hover:bg-toxic hover:text-black font-bold"
                }`}
              >
                {product.status === "COMING SOON" ? "[ SECURE DROP PENDING ]" : "ACQUIRE ASSET"}
              </button>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
