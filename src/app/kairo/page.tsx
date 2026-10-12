import React from 'react';
import OracleTerminal from '@/components/Oracle/OracleTerminal';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "K.A.I.R.O. | G-Wizz, The Slayer",
  description: "Access the corrupted Relay Operator beneath Knysna. Uncover the lore.",
};

export default function KairoPage() {
  return (
    <div className="min-h-screen bg-black font-mono relative overflow-hidden flex flex-col items-center pt-32 pb-12 px-4">
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>
      
      <div className="z-10 w-full max-w-3xl text-center mb-4">
        <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-[0.3em] drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
          K.A.I.R.<span className="text-toxic">O.</span>
        </h1>
        <p className="text-zinc-400 text-xs md:text-sm tracking-widest mt-4 uppercase">
          [ KNYSNA ARTIFICIAL INTELLIGENCE RELAY OPERATOR ]
        </p>
      </div>

      <div className="w-full z-10">
        <OracleTerminal />
      </div>
    </div>
  );
}
