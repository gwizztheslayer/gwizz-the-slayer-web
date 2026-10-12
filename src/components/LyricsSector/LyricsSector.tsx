"use client";
import React, { useState } from 'react';
import Image from 'next/image';

const tracklist = ["Drowning", "CX", "Drip", "Lit", "Bozza"];

export default function LyricsSector() {
  const [activeTrack, setActiveTrack] = useState<string | null>(null);
  const [geniusData, setGeniusData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchLyrics = async (track: string) => {
    setActiveTrack(track);
    setLoading(true);
    const res = await fetch(`/api/lyrics?track=${encodeURIComponent(track)}`);
    const data = await res.json();
    setGeniusData(data.url ? data : null);
    setLoading(false);
  };

  return (
    <section id="lyrics" className="w-full bg-black py-24 px-6 border-y border-toxic/30 font-mono">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Track Selector */}
        <div>
          <h2 className="text-3xl text-toxic font-black uppercase tracking-[0.2em] mb-8">
            [ LINGUISTICS ENGINE ]
          </h2>
          <div className="space-y-2">
            {tracklist.map(track => (
              <button 
                key={track}
                onClick={() => fetchLyrics(track)}
                className={`w-full text-left p-4 border transition-colors uppercase tracking-widest text-sm ${activeTrack === track ? 'border-toxic text-toxic bg-toxic/5' : 'border-zinc-900 text-zinc-400 hover:border-zinc-700'}`}
              >
                {track}
              </button>
            ))}
          </div>
        </div>

        {/* Display Panel */}
        <div className="border border-zinc-900 bg-zinc-950 p-6 flex flex-col justify-center items-center min-h-[400px]">
          {loading ? (
            <div className="text-toxic animate-pulse uppercase tracking-widest text-xs">
              [ INTERFACING WITH GENIUS DATABASE... ]
            </div>
          ) : geniusData ? (
            <div className="text-center space-y-6">
              {geniusData.art && (
                <div className="relative w-32 h-32 mx-auto border border-toxic/30">
                  <Image src={geniusData.art} alt={geniusData.title} fill className="object-cover" />
                </div>
              )}
              <div>
                <div className="text-white font-bold text-lg">{geniusData.title}</div>
                <div className="text-zinc-300 text-xs mt-2 uppercase">Verified Transcription Available</div>
              </div>
              <a href={geniusData.url} target="_blank" rel="noopener noreferrer" className="inline-block border border-toxic text-toxic px-8 py-3 uppercase tracking-widest text-xs hover:bg-toxic hover:text-black transition-colors">
                [ ACCESS FULL LYRICS ]
              </a>
            </div>
          ) : activeTrack ? (
            <div className="text-red-500 uppercase tracking-widest text-xs">
              [ TRANSCRIPT NOT FOUND IN DATABASE ]
            </div>
          ) : (
            <div className="text-zinc-400 uppercase tracking-widest text-xs">
              [ SELECT AUDIO FILE TO INITIALIZE ]
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

