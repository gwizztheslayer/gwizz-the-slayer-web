"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const MERCH_INVENTORY = [
  // RESTORED ORIGINAL CATALOGUE
  { id: "legacy-1", name: "ENTITY CLUSTER TEE", price: "R 450", description: "White tee with classic entity graphic.", src: "/images/merch-placeholder-1.jpg", status: "AVAILABLE", category: "PAINTINGS", sizes: ["S", "M", "L", "XL"] },
  { id: "legacy-2", name: "NEON YOUTH TEE", price: "R 450", description: "Black tee featuring neon youth portrait.", src: "/images/merch-placeholder-2.jpg", status: "AVAILABLE", category: "PAINTINGS", sizes: ["M", "L", "XL"] },
  
  // NEW SYNDICATE DROP
  { id: "m-001", name: "SMOKED OUT HALO HOODIE", price: "R 850", description: "Heavyweight black cotton blend. Front graphic.", src: "/merch/halo-hoodie.jpg", status: "AVAILABLE", category: "PAINTINGS", sizes: ["S", "M", "L", "XL", "XXL"] },
  { id: "m-002", name: "APOCALYPTIC VISION HOODIE", price: "R 850", description: "Premium grey pullover. Features the 6-eyed entity.", src: "/merch/apoc-hoodie.jpg", status: "AVAILABLE", category: "PAINTINGS", sizes: ["S", "M", "L", "XL", "XXL"] },
  { id: "m-003", name: "NO F#CKS GIVEN TEE", price: "R 450", description: "Black streetwear tee. 100% combed cotton.", src: "/merch/nfg-tee.jpg", status: "AVAILABLE", category: "PAINTINGS", sizes: ["M", "L", "XL"] },
  { id: "m-004", name: "THE GREY STARE TEE", price: "R 450", description: "Black classic fit tee with vivid green entity portrait.", src: "/merch/stare-tee.jpg", status: "AVAILABLE", category: "PAINTINGS", sizes: ["M", "L", "XL"] },
  { id: "m-005", name: "VOLCANIC VISION TEE", price: "R 450", description: "White graphic tee featuring volcanic landscape.", src: "/merch/volcanic-tee.jpg", status: "LOW STOCK", category: "PAINTINGS", sizes: ["M", "L"] },
  { id: "m-006", name: "THE SPECIMEN TEE", price: "R 450", description: "White tee. High-contrast red and grey alien portrait.", src: "/merch/specimen-tee.jpg", status: "AVAILABLE", category: "PAINTINGS", sizes: ["S", "M", "L", "XL"] },
  { id: "m-007", name: "PLANET WALK TEE", price: "R 450", description: "Navy blue aesthetic tee. Red entity on blue planet.", src: "/merch/planet-tee.jpg", status: "AVAILABLE", category: "PAINTINGS", sizes: ["M", "L", "XL"] },
  
  // ACCESSORIES
  { id: "m-008", name: "ABDUCTION PROTOCOL MUG", price: "R 200", description: "Black ceramic mug. Wraparound UFO graphic.", src: "/merch/abduction-mug.jpg", status: "AVAILABLE", category: "ACCESSORIES", sizes: ["OSFA"] },
  { id: "m-009", name: "APOCALYPTIC VISION CASE", price: "R 300", description: "Tough phone case with glossy graphic finish.", src: "/merch/apoc-case.jpg", status: "PRE-ORDER", category: "ACCESSORIES", sizes: ["iPhone 13", "14", "15", "Galaxy S23"] }
];

export default function MerchandiseExperience() {
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});

  const handleSizeSelect = (itemId: string, size: string) => {
    setSelectedSizes(prev => ({ ...prev, [itemId]: size }));
  };

  const apparelItems = MERCH_INVENTORY.filter(item => item.category === "PAINTINGS");
  const accessoryItems = MERCH_INVENTORY.filter(item => item.category === "ACCESSORIES");

  const ProductCard = ({ item }: { item: any }) => (
    <div className="group flex flex-col border border-white/10 bg-[#050505] transition-all duration-500 hover:border-toxic/60 relative">
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
                {item.sizes.map((size: string) => (
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
  );

  return (
    <main className="min-h-screen bg-black text-white pt-24 pb-32">
      <section className="mx-auto max-w-7xl px-4">
        
        {/* CENTERED HEADER */}
        <div className="flex flex-col items-center justify-center mb-20 text-center space-y-4">
          <h1 className="text-5xl md:text-7xl font-black text-toxic uppercase tracking-widest">
            MERCHANDISE
          </h1>
          <p className="font-mono text-[10px] md:text-xs text-zinc-400 tracking-[0.2em] uppercase">
            APPAREL AND DIGITAL RELEASES FROM G-WIZZ, THE SLAYER
          </p>
          <p className="max-w-2xl text-xs md:text-sm text-zinc-500 font-mono mt-4">
            The catalogue is here for browsing. Online orders will open once live payment, shipping, and return details are ready.
          </p>
        </div>

        {/* PAINTINGS SECTION WITH RIGHT-ALIGNED TAB */}
        <div className="mb-16">
          <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4 flex-grow">
              <h2 className="text-white font-mono text-sm md:text-base font-bold tracking-widest uppercase whitespace-nowrap">
                PAINTINGS
              </h2>
              <div className="h-[1px] flex-grow bg-toxic/30"></div>
            </div>
            
            <Link 
              href="/physical-work" 
              className="inline-flex items-center justify-center border border-toxic px-5 py-2 text-toxic font-mono text-[10px] font-bold tracking-widest uppercase transition-colors hover:bg-toxic hover:text-black whitespace-nowrap shrink-0"
            >
              ENTER PHYSICAL VAULT &rarr;
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {apparelItems.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* ACCESSORIES SECTION */}
        <div className="mb-16">
          <div className="w-full flex items-center gap-4 mb-8">
            <h2 className="text-white font-mono text-sm md:text-base font-bold tracking-widest uppercase whitespace-nowrap">
              ACCESSORIES
            </h2>
            <div className="h-[1px] flex-grow bg-toxic/30"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {accessoryItems.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        </div>

      </section>
    </main>
  );
}
