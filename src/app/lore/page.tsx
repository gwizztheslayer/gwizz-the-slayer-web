import React from 'react';
import { createClient } from 'next-sanity';
import { createImageUrlBuilder } from '@sanity/image-url';
import Link from 'next/link';
import Image from 'next/image';

const client = createClient({ 
  projectId: 'wcx01w97', 
  dataset: 'production', 
  apiVersion: '2024-01-01', 
  useCdn: false 
});

const builder = createImageUrlBuilder(client);
function urlFor(source: any) { return builder.image(source); }

export default async function LorePage() {
  const comics = await client.fetch(`*[_type == "comic"] | order(issueNumber asc)`);
  
  // THE GUARANTEED WORKING PATH
  const fallbackCover = "/comic/knysna-saviour-cover.png";

  return (
    <div className="min-h-screen bg-black text-white p-8 font-mono pb-32">
      <div className="max-w-5xl mx-auto pt-24">
        <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-widest mb-2">
          THE <span className="text-toxic aura-toxic-text">LORE</span>
        </h1>
        <h2 className="text-sm md:text-base text-zinc-400 mb-16 uppercase tracking-widest">
          KNYSNA'S SAVIOUR // OFFICIAL MANGA ARCHIVE
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {comics.length > 0 ? comics.map((comic: any) => {
            const imgSrc = comic.cover ? urlFor(comic.cover).url() : fallbackCover;
            return (
              <div key={comic._id} className="flex flex-col group">
                <div className="aspect-[2/3] bg-zinc-950 border border-zinc-900 mb-6 relative overflow-hidden flex items-center justify-center shadow-[0_0_15px_rgba(57,255,20,0.05)] group-hover:shadow-[0_0_30px_rgba(57,255,20,0.2)] transition-shadow duration-500">
                  <Image src={imgSrc} alt={`Cover for Issue ${comic.issueNumber || 1}`} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm z-10">
                    <Link href={`/lore/issue-${comic.issueNumber || 1}`} className="bg-toxic text-black px-6 py-3 font-black tracking-widest uppercase text-sm hover:bg-white text-center animate-aura-pulse">
                      INITIALIZE READER
                    </Link>
                  </div>
                </div>
                <h3 className="text-2xl font-black uppercase tracking-widest mb-1 text-toxic">ISSUE #{comic.issueNumber || 1}</h3>
                <h4 className="text-lg font-bold uppercase tracking-widest text-zinc-400">{comic.title || "Knysna's Saviour"}</h4>
              </div>
            )
          }) : (
            <div className="flex flex-col group">
              <div className="aspect-[2/3] bg-zinc-950 border border-zinc-900 mb-6 relative overflow-hidden flex items-center justify-center shadow-[0_0_15px_rgba(57,255,20,0.05)] group-hover:shadow-[0_0_30px_rgba(57,255,20,0.2)] transition-shadow duration-500">
                <Image src={fallbackCover} alt="Cover for Issue 1" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm z-10">
                  <Link href="/lore/issue-1" className="bg-toxic text-black px-6 py-3 font-black tracking-widest uppercase text-sm hover:bg-white text-center animate-aura-pulse">
                    INITIALIZE READER
                  </Link>
                </div>
              </div>
              <h3 className="text-2xl font-black uppercase tracking-widest mb-1 text-toxic">ISSUE #1</h3>
              <h4 className="text-lg font-bold uppercase tracking-widest text-zinc-400">Knysna's Saviour</h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}



