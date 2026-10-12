"use client";

import Image from "next/image";

const realArtworks = [
  { id: 1, title: "SMOKED OUT HALO", src: "/vault/art-1.jpg", status: "AVAILABLE" },
  { id: 2, title: "VOLCANIC VISION", src: "/vault/art-2.jpg", status: "AVAILABLE" },
  { id: 3, title: "PLANET WALK", src: "/vault/art-3.jpg", status: "RESERVED" },
  { id: 4, title: "NO F#CKS GIVEN", src: "/vault/art-4.jpg", status: "AVAILABLE" },
  { id: 5, title: "THE GREY STARE", src: "/vault/art-5.jpg", status: "AVAILABLE" },
  { id: 6, title: "ABDUCTION PROTOCOL", src: "/vault/art-6.jpg", status: "AVAILABLE" },
  { id: 7, title: "APOCALYPTIC VISION", src: "/vault/art-7.jpg", status: "RESERVED" },
  { id: 8, title: "THE SPECIMEN", src: "/vault/art-8.jpg", status: "AVAILABLE" },
];

export default function GalleryExperience() {
  return (
    <section className="w-full py-16 bg-black text-white">
      <header className="text-center mb-12 px-4">
        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-[0.2em]">
          PHYSICAL <span className="text-toxic">ARCHIVE</span>
        </h2>
        <p className="text-white/50 text-sm md:text-base tracking-widest max-w-2xl mx-auto mt-4">
          [ DECLASSIFIED ARTIFACTS ] — Original 1-of-1 physical works held in the Syndicate Vault.
        </p>
      </header>

      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {realArtworks.map((art) => (
            <article
              key={art.id}
              className="relative group flex flex-col border border-white/10 bg-[#0a0a0a] p-4 hover:border-toxic/50 transition-colors duration-500"
            >
              <div className="absolute top-8 left-8 z-20 bg-black/90 border border-white/10 px-3 py-1">
                <span className={art.status === "AVAILABLE"
                  ? "text-toxic text-xs font-black tracking-[0.2em]"
                  : "text-zinc-500 text-xs font-black tracking-[0.2em]"}>
                  {art.status}
                </span>
              </div>

              <div className="relative aspect-[4/5] w-full overflow-hidden mb-6 bg-zinc-900 border border-white/5">
                <Image
                  src={art.src}
                  alt={art.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  quality={90}
                />
              </div>

              <div className="border-t border-white/10 pt-4">
                <h3 className="text-white font-black uppercase tracking-widest text-lg mb-2 truncate">
                  {art.title}
                </h3>
                <div className="flex justify-between items-center gap-3">
                  <span className="text-white/40 text-xs uppercase tracking-widest">
                    Acrylic on Canvas
                  </span>
                  <a
                    href={`mailto:contact@gwizztheslayer.co.za?subject=${encodeURIComponent(`Inquiry: ${art.title}`)}`}
                    className="text-toxic hover:text-white text-xs font-bold uppercase tracking-widest transition-colors"
                  >
                    [ INQUIRE ]
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}