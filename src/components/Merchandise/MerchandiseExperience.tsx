"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const MERCH_INVENTORY = [
  { id: "m-001", name: "SMOKED OUT HALO HOODIE", price: "R 850", description: "Heavyweight black cotton blend. Front graphic.", src: "/merch/halo-hoodie.jpg", status: "AVAILABLE", category: "APPAREL", sizes: ["S", "M", "L", "XL", "XXL"] },
  { id: "m-002", name: "APOCALYPTIC VISION HOODIE", price: "R 850", description: "Premium grey pullover. Features the 6-eyed entity.", src: "/merch/apoc-hoodie.jpg", status: "AVAILABLE", category: "APPAREL", sizes: ["S", "M", "L", "XL", "XXL"] },
  { id: "m-003", name: "NO F#CKS GIVEN TEE", price: "R 450", description: "Black streetwear tee. 100% combed cotton.", src: "/merch/nfg-tee.jpg", status: "AVAILABLE", category: "APPAREL", sizes: ["M", "L", "XL"] },
  { id: "m-004", name: "THE GREY STARE TEE", price: "R 450", description: "Black classic fit tee with vivid green entity portrait.", src: "/merch/stare-tee.jpg", status: "AVAILABLE", category: "APPAREL", sizes: ["M", "L", "XL"] },
  { id: "m-005", name: "VOLCANIC VISION TEE", price: "R 450", description: "White graphic tee featuring volcanic landscape.", src: "/merch/volcanic-tee.jpg", status: "LOW STOCK", category: "APPAREL", sizes: ["M", "L"] },
  { id: "m-006", name: "THE SPECIMEN TEE", price: "R 450", description: "White tee. High-contrast red and grey alien portrait.", src: "/merch/specimen-tee.jpg", status: "AVAILABLE", category: "APPAREL", sizes: ["S", "M", "L", "XL"] },
  { id: "m-007", name: "PLANET WALK TEE", price: "R 450", description: "Navy blue aesthetic tee. Red entity on blue planet.", src: "/merch/planet-tee.jpg", status: "AVAILABLE", category: "APPAREL", sizes: ["M", "L", "XL"] },
  { id: "m-008", name: "ABDUCTION PROTOCOL MUG", price: "R 200", description: "Black ceramic mug. Wraparound UFO graphic.", src: "/merch/abduction-mug.jpg", status: "AVAILABLE", category: "ACCESSORIES", sizes: ["OSFA"] },
  { id: "m-009", name: "APOCALYPTIC VISION CASE", price: "R 300", description: "Tough phone case with glossy graphic finish.", src: "/merch/apoc-case.jpg", status: "PRE-ORDER", category: "ACCESSORIES", sizes: ["iPhone 13", "14", "15", "Galaxy S23"] }
];

const CATEGORIES = ["ALL", "APPAREL", "ACCESSORIES"];

export default function MerchandiseExperience() {
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState("ALL");

  const handleSizeSelect = (itemId: string, size: string) => {
    setSelectedSizes(prev => ({ ...prev, [itemId]: size }));
  };

  const filteredInventory = MERCH_INVENTORY.filter(item => 
    activeTab === "ALL" || item.category === activeTab
  );

  return (
    <main className="min-h-screen bg-black text-white pt-24 pb-32">
      <section className="mx-auto max-w-7xl px-4">
        
        {/* HEADER BLOCK - ALIGNED TO MATCH GALLERY/DISCOGRAPHY */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-white/10">
          <div>
            <span className="text-toxic font-mono text-[10px] tracking-widest uppercase mb-2 block">
              OFFICIAL SYNDICATE UNIFORM
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight">
              MERCHANDISE
            </h1>
          </div>
          <Link 
            href="/physical-work" 
            className="mt-6 md:mt-0 inline-flex items-center border border-toxic px-6 py-3 text-toxic font-mono text-xs font-bold tracking-widest uppercase transition-colors hover:bg-toxic hover:text-black whitespace-nowrap"
          >
            ENTER PHYSICAL VAULT
          </Link>
        </div>

        {/* UI FILTER TABS */}
        <div className="flex items-center justify-start gap-4 mb-8 overflow-x-auto scrollbar-hide">
          {CATEGORIES.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 font-mono text-xs uppercase tracking-widest transition-all ${
                activeTab === tab 
                  ? "text-toxic border-b-2 border-toxic" 
                  : "text-zinc-500 hover:text-white border-b-2 border-transparent"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* MERCH GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredInventory.map((item) => (
            <div key={item.id} className="group flex flex-col border border-white/10 bg-[#050505] transition-all duration-500 hover:border-toxic/60 relative">
              <div className="absolute top-4 right-4 z-20">
                <span className={`px-3 py-1 font-mono text-[10px] uppercase tracking-widest border bg-black/90 backdrop-blur-md
                  ${item.status === 'AVAILABLE' ? 'border-toxic/50 text-toxic' : 
                    item.status === 'SOLD OUT' ? 'border-red-500/50 text-red-500' : 
                    'border-yellow-500/50 text-yellow-500'}`}
                >
                  {item.status}
                </span>
              </div>

              <div className="relative aspect-square w-full overflow-hidden bg-zinc-900 border-b border-white/5">
                <Image src={item.src} alt={item.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105 z-10" />
                 <div className="absolute inset-0 flex items-center justify-center text-zinc-800 font-mono text-xs z-0">
                    [ LOADING ]
                 </div>
              </div>

              <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-lg font-black uppercase tracking-wide leading-tight text-white group-hover:text-toxic transition-colors pr-4">
                    {item.name}
                  </h2>
                  <span className="font-mono text-sm text-toxic whitespace-nowrap">{item.price}</span>
                </div>
                <p className="text-xs text-zinc-500 mb-6 flex-grow">{item.description}</p>

                <div className="mt-auto">
                  {item.status !== "SOLD OUT" ? (
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {item.sizes.map(size => (
                          <button
                            key={size}
                            onClick={() => handleSizeSelect(item.id, size)}
                            className={`h-8 min-w-[32px] px-2 border font-mono text-[10px] uppercase tracking-wider transition-colors
                              ${selectedSizes[item.id] === size 
                                ? 'border-toxic bg-toxic text-black font-bold' 
                                : 'border-white/20 text-zinc-400 hover:border-toxic hover:text-toxic'}`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>

                      <button 
                        disabled={!selectedSizes[item.id]}
                        className={`w-full py-3 font-mono text-xs font-bold uppercase tracking-[0.2em] transition-all
                          ${selectedSizes[item.id] 
                            ? 'bg-white text-black hover:bg-toxic border border-transparent' 
                            : 'bg-zinc-900 text-zinc-600 border border-zinc-800 cursor-not-allowed'}`}
                      >
                        {selectedSizes[item.id] ? '[ ADD TO CART ]' : 'SELECT SIZE'}
                      </button>
                    </div>
                  ) : (
                    <button disabled className="w-full py-3 bg-black border border-red-500/20 text-red-500/50 font-mono text-xs font-bold uppercase tracking-[0.2em] cursor-not-allowed">
                      UNAVAILABLE
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}