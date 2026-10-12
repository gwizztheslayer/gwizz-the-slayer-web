"use client";

import { useEffect, useState } from "react";

type SpotifyTrackDetailsData = {
  id: string;
  title: string;
  artists: string[];
  albumTitle: string;
  releaseDate: string;
  releaseDatePrecision: "year" | "month" | "day";
  durationMs: number;
  explicit: boolean;
  isrc: string | null;
};

type SpotifyTrackDetailsResponse = { track?: SpotifyTrackDetailsData };

function formatDuration(milliseconds: number) {
  const seconds = Math.floor(milliseconds / 1_000);
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

export default function SpotifyTrackDetails({ trackId }: { trackId?: string | null }) {
  const [track, setTrack] = useState<SpotifyTrackDetailsData | null>(null);

  useEffect(() => {
    if (!trackId) return;
    const controller = new AbortController();

    fetch(`/api/spotify/catalogue?trackId=${encodeURIComponent(trackId)}`, {
      signal: controller.signal,
      cache: "no-store",
    })
      .then(async (response) => {
        if (!response.ok) return null;
        return response.json() as Promise<SpotifyTrackDetailsResponse>;
      })
      .then((result) => {
        if (result?.track) setTrack(result.track);
      })
      .catch(() => undefined);

    return () => controller.abort();
  }, [trackId]);

  if (!track) return null;

  const details = [
    { label: "Artist credits", value: track.artists.join(", ") || null },
    { label: "Release", value: track.albumTitle },
    { label: "Release date", value: track.releaseDate },
    { label: "Duration", value: formatDuration(track.durationMs) },
    { label: "ISRC", value: track.isrc },
    { label: "Explicit", value: track.explicit ? "Yes" : "No" },
  ];

  return (
    <section aria-labelledby="spotify-track-details-heading" className="mt-8 border border-white/10 bg-zinc-950/70 p-4 sm:p-6">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
        <div>
          <h2 id="spotify-track-details-heading" className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-toxic">Track credits & catalogue details</h2>
          <p className="mt-1 font-mono text-[9px] uppercase tracking-wider text-white/40">Catalogue data · {track.releaseDatePrecision} date precision</p>
        </div>
      </div>
      <dl className="grid gap-x-8 sm:grid-cols-2">
        {details.map((detail) => (
          <div key={detail.label} className="flex min-h-11 items-center justify-between gap-4 border-b border-white/10 py-2 text-sm">
            <dt className="font-mono text-[9px] uppercase tracking-wider text-white/45">{detail.label}</dt>
            <dd className={detail.value ? "text-right text-white" : "text-right text-white/40"}>{detail.value ?? "Not listed"}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
