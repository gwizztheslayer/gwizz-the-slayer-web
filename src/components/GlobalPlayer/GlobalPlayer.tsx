"use client";
import { useState, useRef, useEffect } from "react";

// Placeholder tracklist for Demons Don't Sleep
const PLAYLIST = [
  { id: 1, title: "DROWNING", src: "/audio/drowning.mp3" },
  { id: 2, title: "BOZZA", src: "/audio/bozza.mp3" },
  { id: 3, title: "IDGAF", src: "/audio/idgaf.mp3" }
];

export default function GlobalPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = PLAYLIST[currentTrackIndex];

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % PLAYLIST.length);
    setIsPlaying(true);
  };

  // Auto-play when track changes if it was already playing
  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play();
    }
  }, [currentTrackIndex]);

  return (
    <div className="fixed bottom-0 left-0 w-full bg-black/95 border-t border-toxic/30 backdrop-blur-md z-[5000] px-4 py-3 flex items-center justify-between shadow-[0_-4px_20px_rgba(0,255,0,0.1)]">
      {/* Audio Element */}
      <audio 
        ref={audioRef} 
        src={currentTrack.src} 
        onEnded={nextTrack}
        className="hidden" 
      />

      {/* Track Info */}
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 bg-zinc-900 border border-toxic/50 flex items-center justify-center relative overflow-hidden">
           <div className="absolute inset-0 bg-toxic/20 animate-pulse" />
           <span className="font-black text-toxic text-xs z-10">DDS</span>
        </div>
        <div className="flex flex-col">
          <span className="font-mono text-[10px] text-toxic tracking-widest uppercase">Now Transmitting</span>
          <span className="font-black text-white text-sm tracking-wide uppercase">{currentTrack.title}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-6">
        <button className="text-zinc-500 hover:text-white transition-colors" onClick={() => setCurrentTrackIndex((prev) => (prev - 1 + PLAYLIST.length) % PLAYLIST.length)}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
        </button>
        
        <button 
          onClick={togglePlay}
          className="h-10 w-10 rounded-full border border-toxic text-toxic flex items-center justify-center hover:bg-toxic hover:text-black transition-all"
        >
          {isPlaying ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
          )}
        </button>

        <button className="text-zinc-500 hover:text-white transition-colors" onClick={nextTrack}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
        </button>
      </div>
    </div>
  );
}