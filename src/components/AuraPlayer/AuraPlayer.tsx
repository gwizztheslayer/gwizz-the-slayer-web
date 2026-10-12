"use client";

import { useAudio } from "@/context/AudioContext";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function AuraPlayer() {
  const { currentTrack, isPlaying, togglePlayPause, audioRef } = useAudio();
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100 || 0);
    };

    audio.addEventListener("timeupdate", updateProgress);
    return () => audio.removeEventListener("timeupdate", updateProgress);
  }, [audioRef]);

  if (pathname === "/avc") return null;

  // The 'fixed' classes here guarantee it is ALWAYS visible on the screen, floating at the bottom, zero scrolling required.
  return (
    <div className="fixed bottom-0 md:bottom-6 left-0 md:left-1/2 md:-translate-x-1/2 w-full md:w-[90%] max-w-4xl z-[9999]">
      <div className="bg-black/95 backdrop-blur-xl border-t md:border border-toxic/50 shadow-[0_0_30px_rgba(57,255,20,0.2)] md:rounded-[16px] flex flex-col md:flex-row items-center p-3 sm:px-6 h-[90px] md:h-20 overflow-hidden">
        
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-zinc-900 md:rounded-t-[16px]">
          <div
            className="h-full bg-toxic shadow-[0_0_10px_rgba(57,255,20,1)] transition-all duration-100 ease-linear md:rounded-tl-[16px]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Track Info */}
        <div className="flex items-center w-full md:w-1/3 mb-2 md:mb-0 h-full">
          {currentTrack?.cover ? (
            <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 relative border border-toxic/40 mr-3 shadow-[0_0_10px_rgba(57,255,20,0.2)]">
              <Image src={currentTrack.cover} alt={`${currentTrack.title} Cover`} fill className="object-cover" sizes="48px" />
            </div>
          ) : (
            <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 relative border border-toxic/20 mr-3 bg-zinc-950 flex items-center justify-center">
               <span className="text-[6px] text-toxic/50 tracking-widest font-mono">IDLE</span>
            </div>
          )}
          <div className="flex flex-col overflow-hidden w-full">
            <span className="text-white font-black text-xs md:text-sm uppercase truncate leading-tight drop-shadow-md">
              {currentTrack ? currentTrack.title : "SYSTEM IDLE"}
            </span>
            <span className="text-toxic font-mono text-[9px] md:text-[10px] tracking-[0.2em] uppercase truncate mt-1">
              {currentTrack ? currentTrack.artist : "AWAITING AUDIO INPUT"}
            </span>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex justify-center items-center w-full md:w-1/3 h-full">
          <button
            onClick={togglePlayPause}
            aria-label="Play or Pause Track"
            disabled={!currentTrack}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all border-2 ${currentTrack ? 'bg-toxic border-toxic text-black shadow-[0_0_20px_rgba(57,255,20,0.5)] hover:scale-105' : 'bg-transparent border-zinc-800 text-zinc-700 cursor-not-allowed'}`}
          >
            {isPlaying ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
        </div>

        {/* Volume & Aux */}
        <div className="hidden md:flex justify-end items-center w-1/3 gap-4 text-toxic/80 h-full pr-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M5 10H2v4h3l4 4V6l-4 4z" />
          </svg>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            aria-label="Volume Control"
            defaultValue="1"
            onChange={(e) => {
              if (audioRef.current) audioRef.current.volume = parseFloat(e.target.value);
            }}
            className="w-20 h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-toxic"
          />
        </div>
      </div>
    </div>
  );
}