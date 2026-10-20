import Image from "next/image";
import Link from "next/link";
import { FEATURED_ARTWORK_IDS, GALLERY_ARTWORKS } from "@/data/gallery-artworks";
import CheckoutButton from "@/components/Commerce/CheckoutButton";

const featuredArtworks = FEATURED_ARTWORK_IDS
  .map((id) => GALLERY_ARTWORKS.find((artwork) => artwork.id === id))
  .filter((artwork) => artwork !== undefined);

export default function CanvasVault() {
  return (
    <section id="physical-work" className="scroll-mt-20 w-full border-t border-toxic/20 bg-black py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-toxic font-mono text-xs tracking-[0.25em] uppercase mb-3">Original artwork</p>
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-[0.12em]">Physical Work</h2>
          </div>
          <Link href="/gallery" className="inline-flex w-fit items-center border border-toxic px-5 py-3 text-toxic font-mono text-xs font-bold tracking-widest uppercase transition-colors hover:bg-toxic hover:text-black">
            Enter Full Gallery
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {featuredArtworks.map((artwork: any) => (
            <article key={artwork.id} className="group flex flex-col justify-between border border-white/10 bg-zinc-950/80 transition-colors hover:border-toxic/50">
              <div>
                <div className="relative aspect-[4/5] overflow-hidden bg-black">
                  <Image src={artwork.src} alt={artwork.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-lg font-black tracking-wide text-white group-hover:text-toxic">{artwork.title}</h3>
                    <span className="shrink-0 font-mono text-xs text-zinc-500">{artwork.year}</span>
                  </div>
                  <p className="mt-2 text-sm text-zinc-400">{artwork.medium}</p>
                  {artwork.price && (
                    <p className="mt-3 font-mono text-emerald-400 font-bold">ZAR {artwork.price}.00</p>
                  )}
                </div>
              </div>
              <div className="p-5 pt-0 mt-auto">
                <CheckoutButton cartItems={[{
                  name: artwork.title,
                  price: artwork.price || 0,
                  quantity: 1,
                  image: typeof artwork.src === 'string' ? artwork.src : artwork.src?.src
                }]} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
