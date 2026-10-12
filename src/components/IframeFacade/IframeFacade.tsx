"use client";
import React, { useState } from "react";

export default function IframeFacade({ title, src, provider }: any) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className="w-full h-full min-h-[352px] bg-black/80 flex items-center justify-center relative overflow-hidden group cursor-pointer border border-toxic/20 hover:border-toxic/60 transition-all rounded-[12px]"
      onClick={() => setIsLoaded(true)}
    >
      {!isLoaded ? (
        <div className="flex flex-col items-center gap-4 z-10 p-6 text-center">
           <div className="w-16 h-16 rounded-full bg-toxic/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-toxic/20 transition-all border border-toxic/40">
             <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-toxic border-b-[10px] border-b-transparent ml-1" />
           </div>
           <span className="text-toxic font-mono text-xs tracking-widest uppercase bg-black px-4 py-2 border border-toxic/40 shadow-[0_0_10px_rgba(57,255,20,0.1)]">
             [ INITIALIZE {provider} UPLINK ]
           </span>
           <span className="text-zinc-400 font-mono text-[8px] tracking-widest uppercase">
             BYPASSING HEAVY PAYLOADS TO MAINTAIN OPTIMAL SYSTEM PERFORMANCE
           </span>
        </div>
      ) : (
         <iframe title={title} src={src} width="100%" height="100%" frameBorder="0" allowFullScreen={true} allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" className="absolute inset-0 w-full h-full rounded-[12px]" />
      )}
    </div>
  );
}