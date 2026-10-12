"use client";
import { useAudio } from "@/context/AudioContext";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function GlobalPlayer() {
  // Removed playNext and playPrev to satisfy AudioContextType
  const { currentTrack, isPlaying, togglePlayPause } = useAudio();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0);

  // Sync audio element with state
  useEffect(() => {
    if (audioRef.current && currentTrack) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Audio play failed:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      setProgress((current / duration) * 100 || 0);
    }
  };

  if (!currentTrack) return null; // Don't render if nothing is playing

  return (
    <div className="bg-[#050505] border-t border-toxic/30 text-white px-4 py-3 flex items-center justify-between shadow-[0_-5px_20px_rgba(57,255,20,0.1)] relative z-[100]">
      
      {/* CRITICAL OPTIMIZATION: preload="none" stops bandwidth drain */}
      <audio 
        ref={audioRef} 
        src={currentTrack.url} 
        onTimeUpdate={handleTimeUpdate}
        preload="none" 
      />

      {/* Progress Bar (Absolute top edge) */}
      <div className="absolute top-0 left-0 h-1 bg-void w-full">
        <div 
          className="h-full bg-toxic transition-all duration-100 ease-linear shadow-[0_0_10px_rgba(57,255,20,0.8)]"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Track Info */}
      <div className="flex items-center gap-4 w-1/3">
        <div className="relative w-12 h-12 border border-white/10 hidden sm:block">
          <Image src={currentTrack.cover} alt="Cover" fill className="object-cover" />
        </div>
        <div className="truncate">
          <h4 className="text-toxic font-bold text-sm truncate">{currentTrack.title}</h4>
          <p className="text-zinc-400 text-[10px] tracking-widest uppercase">G-WIZZ, THE SLAYER</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-6 w-1/3 justify-center">
        <button 
          onClick={togglePlayPause} 
          className="w-10 h-10 rounded-full border border-toxic text-toxic flex items-center justify-center hover:bg-toxic hover:text-black transition-colors shadow-[0_0_10px_rgba(57,255,20,0.2)]"
        >
          {isPlaying ? (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
          ) : (
            <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          )}
        </button>
      </div>

      {/* Empty block for flex spacing */}
      <div className="w-1/3 hidden sm:block"></div>
      
    </div>
  );
}