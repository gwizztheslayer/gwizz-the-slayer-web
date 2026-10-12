"use client";

import Image from "next/image";
import Link from "next/link";
import { inventory } from "@/lib/inventory";
import { useAudio } from "@/context/AudioContext";

export default function Arsenal() {
  const { playTrack, currentTrack, isPlaying, togglePlayPause } = useAudio();
  const physicalDrops = inventory.filter((item) => item.type === "physical");
  const digitalDrops = inventory.filter((item) => item.type === "digital");

  const handlePreview = (item: (typeof inventory)[number]) => {
    if (!item.previewUrl) return;
    const trackInfo = { title: `${item.name} (PREVIEW)`, artist: "G-Wizz, The Slayer", url: item.previewUrl, cover: item.image };
    if (currentTrack?.title === trackInfo.title) togglePlayPause();
    else playTrack(trackInfo, [trackInfo]);
  };

  const renderGrid = (items: readonly (typeof inventory)[number][]) => (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <article key={item.id} className="group flex flex-col border border-zinc-900/50 bg-zinc-950/70 p-4 transition-colors hover:border-toxic/40">
          <div className="relative mb-6 flex aspect-square w-full items-center justify-center overflow-hidden border border-zinc-900 bg-black p-4">
            <Image src={item.image} alt={item.name} fill className="object-contain p-4 transition-transform duration-500 group-hover:scale-105" />
          </div>
          <h3 className="text-xl font-bold uppercase tracking-wide text-zinc-200">{item.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.description}</p>

          {item.previewUrl && (
            <button onClick={() => handlePreview(item)} className="mt-6 w-full border border-zinc-800 py-4 font-mono text-xs font-bold uppercase tracking-widest text-zinc-300 transition-colors hover:border-toxic hover:text-toxic">
              {currentTrack?.title === `${item.name} (PREVIEW)` && isPlaying ? "Pause preview" : "Play audio preview"}
            </button>
          )}
          <div className="mt-auto pt-6">
            <p className="border border-white/10 p-4 text-center font-mono text-[10px] leading-relaxed tracking-wider text-zinc-400">
              SALES AND CHECKOUT ARE NOT OPEN YET.
            </p>
            <Link href="/contact" className="mt-3 block w-full border border-toxic/50 py-3 text-center font-mono text-[10px] font-bold uppercase tracking-widest text-toxic transition-colors hover:bg-toxic hover:text-black">
              Ask about availability
            </Link>
          </div>
        </article>
      ))}
    </div>
  );

  return (
    <section id="merchandise" className="scroll-mt-20 relative z-20 w-full border-y border-toxic/30 bg-black px-6 py-24 font-mono">
      <div className="mx-auto flex max-w-6xl flex-col gap-14">
        <header className="text-center">
          <h2 className="text-5xl font-black uppercase tracking-tighter text-toxic md:text-7xl">Merchandise</h2>
          <p className="mt-4 text-xs uppercase tracking-widest text-white/70">Apparel and digital releases from G-Wizz, The Slayer</p>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-zinc-400">The catalogue is here for browsing. Online orders will open once live payment, shipping, and return details are ready.</p>
        </header>
        <div>
          <h3 className="mb-8 border-b border-toxic/30 pb-2 text-xl font-black uppercase tracking-widest text-white">Physical Work</h3>
          {renderGrid(physicalDrops)}
        </div>
        <div>
          <h3 className="mb-8 border-b border-toxic/30 pb-2 text-xl font-black uppercase tracking-widest text-white">Digital Releases</h3>
          {renderGrid(digitalDrops)}
        </div>
      </div>
    </section>
  );
}
