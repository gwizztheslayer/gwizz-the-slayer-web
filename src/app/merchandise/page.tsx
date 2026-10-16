"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const PRODUCTS = [
  {
    id: "drop-01",
    name: "Syndicate Red Eye Hoodie",
    category: "APPAREL",
    price: "R850.00",
    status: "COMING SOON",
    image: "/merch/black hoodie.jpg",
    description: "Heavyweight black cotton hoodie featuring custom red alien motif and sleeve typography.",
    specs: ["400 GSM Heavyweight Cotton", "Relaxed Tactical Fit", "Custom Screenprint Details"]
  },
  {
    id: "drop-02",
    name: "Apocalypse Landscape Hoodie",
    category: "APPAREL",
    price: "R850.00",
    status: "COMING SOON",
    image: "/merch/grey hoodie.jpg",
    description: "Charcoal grey hoodie showcasing atomic surrealist dark artwork inspired by syndicate lore.",
    specs: ["400 GSM Heavyweight Cotton", "Brushed Interior", "Distressed Wash Finish"]
  },
  {
    id: "drop-03",
    name: "Green Alien Portrait Tee",
    category: "APPAREL",
    price: "R450.00",
    status: "COMING SOON",
    image: "/merch/t shirt.jpg",
    description: "Premium black cotton t-shirt with high-definition toxic green front art print.",
    specs: ["220 GSM Combed Cotton", "Boxy Streetwear Cut", "Reinforced Neck Ribbing"]
  },
  {
    id: "drop-04",
    name: "Knysna's Saviour (Deluxe Vinyl + Comic)",
    category: "PHYSICAL",
    price: "R650.00",
    status: "PRE-ORDER",
    image: "/merch/t shirt 2.jpg",
    description: "Limited physical collaborative release featuring full album vinyl press and accompanying webcomic.",
    specs: ["180g Transparent Green Vinyl", "Full-Color Glossy Comic Booklet", "Hand-Numbered Gatefold Sleeve"]
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
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-widest mt-2 text-white">Merchandise</h1>
          </div>
          <div className="mt-4 md:mt-0 flex gap-4">
            <Link href="/vault/auth" className="border border-toxic px-5 py-2.5 text-toxic font-mono text-xs font-bold tracking-widest uppercase hover:bg-toxic hover:text-black transition-colors">
              Vault Access &rarr;
            </Link>
          </div>
        </div>

        {/* Intro Description */}
        <p className="text-zinc-400 font-mono text-xs md:text-sm leading-relaxed max-w-3xl mb-10">
          The catalogue is here for browsing. Online orders will open once live payment, shipping, and return details are ready. Official apparel drops, physical vinyl records, comic booklets, and digital production assets from G-WIZZ, THE SLAYER.
        </p>

        {/* Category Navigation Tabs */}
        <div className="flex flex-wrap gap-3 mb-12 border-b border-white/10 pb-6">
          {["ALL", "APPAREL", "PHYSICAL"].map((tab) => (
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
                <div className="h-72 bg-zinc-900 mb-6 flex items-center justify-center border border-white/10 relative overflow-hidden group-hover:border-toxic/50 transition-colors">
                  <Image 
                    src={product.image} 
                    alt={product.name}
                    fill
                    className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>
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
