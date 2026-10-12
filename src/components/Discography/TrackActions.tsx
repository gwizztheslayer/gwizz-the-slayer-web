"use client";

import { useAudio } from "@/context/AudioContext";
import type { CatalogueSingle } from "@/data/discography";
import { ShoppingCart } from "lucide-react";

export default function TrackActions({ track }: { track: CatalogueSingle }) {
  const { currentTrack, isPlaying, playTrack, togglePlayPause } = useAudio();
  const isCurrentTrack = Boolean(track.audio && currentTrack?.url === track.audio);

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        disabled={!track.audio}
        onClick={() => {
          if (!track.audio) return;
          if (isCurrentTrack) togglePlayPause();
          else playTrack({
            title: track.title,
            artist: "G-Wizz, The Slayer",
            url: track.audio,
            cover: track.cover,
            albumContext: track.album ?? "Single",
          });
        }}
        className="inline-flex min-h-12 items-center border border-toxic bg-toxic px-5 py-3 font-mono text-xs font-black uppercase tracking-widest text-black transition-colors hover:bg-transparent hover:text-toxic disabled:cursor-not-allowed disabled:border-white/10 disabled:bg-transparent disabled:text-white/35"
      >
        {!track.audio ? "Preview unavailable" : isCurrentTrack && isPlaying ? "Pause preview" : "Play preview"}
      </button>
      {track.featureFmUrl ? (
        <a
          href={track.featureFmUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Get ${track.title} via Feature.fm`}
          className="inline-flex min-h-12 items-center gap-2 border border-white/25 px-5 py-3 font-mono text-xs font-bold uppercase tracking-widest text-white transition-colors hover:border-toxic hover:text-toxic"
        >
          <ShoppingCart size={16} aria-hidden="true" />
          Get track <span className="sr-only">via Feature.fm</span>
        </a>
      ) : (
        <span className="inline-flex min-h-12 items-center border border-white/10 px-5 py-3 font-mono text-[10px] uppercase tracking-widest text-white/40">
          Feature.fm link pending
        </span>
      )}
    </div>
  );
}
