"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Pause, Play, ShoppingCart } from "lucide-react";
import type { ReactNode } from "react";
import { useAudio, type Track } from "@/context/AudioContext";
import {
  catalogueAlbums,
  catalogueSingles,
  type CatalogueAlbum,
  type CatalogueSingle,
} from "@/data/discography";

type DiscographyProps = {
  mode?: "preview" | "full";
};

type SpotifyCatalogueTrack = {
  id: string;
  title: string;
  artists: string[];
  albumTitle: string;
  releaseDate: string;
  releaseDatePrecision: string;
  durationMs: number;
};

type SpotifyCatalogueResponse = { tracks?: SpotifyCatalogueTrack[] };

function normalizeTrackTitle(value: string) {
  return value
    .toLocaleLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\b(feat(?:uring)?|ft)\.?\s+.*$/i, "")
    .replace(/\([^)]*\)|\[[^\]]*\]/g, " ")
    .replace(/[^a-z0-9]/g, "");
}

function findSpotifyMatch(single: CatalogueSingle, tracks: SpotifyCatalogueTrack[]) {
  if (single.spotifyTrackId) {
    const exactMatch = tracks.find((track) => track.id === single.spotifyTrackId);
    if (exactMatch) return exactMatch;
  }

  const normalizedTitle = normalizeTrackTitle(single.title);
  if (!normalizedTitle) return undefined;
  const matches = tracks.filter((track) => normalizeTrackTitle(track.title) === normalizedTitle);
  if (matches.length < 2 || !single.album) return matches[0];
  const normalizedAlbum = normalizeTrackTitle(single.album);
  return matches.find((track) => normalizeTrackTitle(track.albumTitle).includes(normalizedAlbum)) ?? matches[0];
}

function formatDuration(milliseconds: number) {
  const seconds = Math.floor(milliseconds / 1_000);
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

const playableCatalogueSingles: Track[] = catalogueSingles
  .filter((single) => single.audio)
  .map((single) => ({
    title: single.title,
    artist: "G-Wizz, The Slayer",
    url: single.audio as string,
    cover: single.cover,
    albumContext: single.album ?? "Single",
  }));

type PreviewButtonProps = {
  title: string;
  audio: string | null;
  cover: string;
  albumContext?: string;
  playlist?: Track[];
  className?: string;
  children?: ReactNode;
};

function PreviewButton({ title, audio, cover, albumContext, playlist, className, children }: PreviewButtonProps) {
  const { currentTrack, isPlaying, playTrack, togglePlayPause } = useAudio();
  const isCurrentTrack = Boolean(audio && currentTrack?.url === audio);
  const playablePlaylist = playlist ?? (audio ? [{
    title,
    artist: "G-Wizz, The Slayer",
    url: audio,
    cover,
    albumContext,
  }] : []);

  return (
    <button
      type="button"
      disabled={!audio}
      aria-label={!audio ? `Preview unavailable for ${title}` : `${isCurrentTrack && isPlaying ? "Pause" : "Play"} ${title}`}
      onClick={() => {
        if (!audio) return;
        if (isCurrentTrack) togglePlayPause();
        else playTrack(
          { title, artist: "G-Wizz, The Slayer", url: audio, cover, albumContext },
          playablePlaylist.length ? playablePlaylist : undefined,
        );
      }}
      className={className ?? "inline-flex min-h-10 items-center gap-2 border border-toxic/50 px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-wider text-toxic transition-colors hover:bg-toxic hover:text-black disabled:cursor-not-allowed disabled:border-white/10 disabled:text-white/30 disabled:hover:bg-transparent disabled:hover:text-white/30"}
    >
      <span aria-hidden="true" className="shrink-0">
        {isCurrentTrack && isPlaying ? <Pause size={14} /> : <Play size={14} />}
      </span>
      {children ?? (!audio ? "Preview unavailable" : isCurrentTrack && isPlaying ? "Pause preview" : "Play preview")}
    </button>
  );
}

function FeatureFmCartLink({ href, releaseName }: { href: string; releaseName: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${releaseName} on Feature.fm`}
      title="Open Feature.fm"
      className="inline-flex min-h-10 items-center gap-2 border border-toxic/50 px-3 py-2 font-mono text-[9px] font-bold uppercase tracking-widest text-toxic transition-colors hover:bg-toxic hover:text-black"
    >
      <ShoppingCart size={14} aria-hidden="true" />
      <span>Get release</span>
    </a>
  );
}

function AlbumCard({ album, full }: { album: CatalogueAlbum; full: boolean }) {
  const playableTracks = album.tracks.filter((track) => track.audio).map((track) => ({
    title: track.title,
    artist: "G-Wizz, The Slayer",
    url: track.audio as string,
    cover: album.cover,
    albumContext: album.title,
  }));

  if (!full) {
    return (
      <article className="border border-white/10 bg-zinc-950 p-3 transition-colors hover:border-toxic/60">
        <Link href={`/discography#album-${album.slug}`} className="group block">
          <div className="relative aspect-square overflow-hidden">
            <Image src={album.cover} alt={`${album.title} cover`} fill sizes="(max-width: 640px) 45vw, 300px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
          </div>
          <div className="flex items-center justify-between gap-3 px-1 pb-1 pt-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">{album.title}</h3>
            <span className="shrink-0 font-mono text-[10px] uppercase text-toxic">{album.tracks.length} tracks</span>
          </div>
        </Link>
        {album.featureFmUrl && (
          <div className="mt-3"><FeatureFmCartLink href={album.featureFmUrl} releaseName={album.title} /></div>
        )}
      </article>
    );
  }

  return (
    <article id={`album-${album.slug}`} className="scroll-mt-24 border border-white/10 bg-zinc-950 p-4">
      <div className="grid gap-5 sm:grid-cols-[180px_1fr]">
        <div className="relative aspect-square overflow-hidden border border-toxic/20 sm:sticky sm:top-24 sm:self-start">
          <Image src={album.cover} alt={`${album.title} cover`} fill sizes="(max-width: 640px) 90vw, 180px" className="object-cover" />
        </div>
        <div className="min-w-0">
          <div className="mb-4 border-b border-toxic/20 pb-3">
            <p className="font-mono text-[10px] uppercase tracking-widest text-toxic">Album · {album.tracks.length} tracks</p>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="mt-2 text-xl font-black uppercase tracking-wide text-white">{album.title}</h3>
              {album.featureFmUrl && (
                <FeatureFmCartLink href={album.featureFmUrl} releaseName={album.title} />
              )}
            </div>
          </div>
          <ol className="divide-y divide-white/10">
            {album.tracks.map((track, index) => (
              <li key={`${album.slug}-${track.title}`} className="flex items-center justify-between gap-3 py-2.5">
                <PreviewButton
                  title={track.title}
                  audio={track.audio}
                  cover={album.cover}
                  albumContext={album.title}
                  playlist={playableTracks}
                  className="group flex min-h-10 min-w-0 flex-1 items-center gap-3 py-2 text-left text-sm text-white/80 transition-colors hover:text-toxic disabled:cursor-not-allowed disabled:text-white/40"
                >
                  <span className="font-mono text-[10px] text-toxic/70">{String(index + 1).padStart(2, "0")}</span>
                  <span className="min-w-0 truncate">{track.title}</span>
                </PreviewButton>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </article>
  );
}

function SingleCard({ single, full, spotifyTrack }: { single: CatalogueSingle; full: boolean; spotifyTrack?: SpotifyCatalogueTrack }) {
  const duration = spotifyTrack ? formatDuration(spotifyTrack.durationMs) : single.duration;
  const releaseDate = spotifyTrack?.releaseDate ?? single.releaseDate;

  return (
    <article className="border border-white/10 bg-zinc-950 p-3 transition-colors hover:border-toxic/50">
      <div>
        <div className="relative aspect-square overflow-hidden">
          <PreviewButton
            title={single.title}
            audio={single.audio}
            cover={single.cover}
            albumContext={single.album ?? "Single"}
            playlist={playableCatalogueSingles}
            className="group absolute inset-0 block h-full w-full text-left disabled:cursor-not-allowed"
          >
            <Image src={single.cover} alt={`${single.title} cover`} fill sizes="(max-width: 640px) 45vw, 240px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
            <span aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/30">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-toxic bg-black/85 text-toxic opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                {single.audio ? <Play size={20} fill="currentColor" /> : <span className="px-2 text-center font-mono text-[8px] uppercase">Preview unavailable</span>}
              </span>
            </span>
          </PreviewButton>
          <Link href={`/discography/${single.slug}`} className="absolute bottom-2 left-2 z-10 border border-toxic/60 bg-black/90 px-2 py-1 font-mono text-[9px] uppercase tracking-wider text-toxic">
            View track details
          </Link>
        </div>
        <h3 className="mt-3">
          <PreviewButton
            title={single.title}
            audio={single.audio}
            cover={single.cover}
            albumContext={single.album ?? "Single"}
            playlist={playableCatalogueSingles}
            className="group flex min-h-8 w-full items-center justify-center gap-2 text-center text-xs font-bold uppercase tracking-widest text-white transition-colors hover:text-toxic disabled:cursor-not-allowed disabled:text-white/40"
          >
            <span className="truncate text-center">{single.title}</span>
          </PreviewButton>
        </h3>
      </div>
      <div className="mt-3 border-t border-white/10 pt-3">
        {full && <p className="mb-2 truncate font-mono text-[9px] uppercase text-white/45">{single.album ?? "Single"}</p>}
        <div className="flex flex-wrap items-center gap-2">
          {single.featureFmUrl && <FeatureFmCartLink href={single.featureFmUrl} releaseName={single.title} />}
        </div>
      </div>
      {full && (duration || releaseDate) && (
        <p className="mt-2 font-mono text-[9px] uppercase tracking-wider text-white/45">
          {duration ? `Duration ${duration}` : ""}{duration && releaseDate ? " · " : ""}{releaseDate ? `Released ${releaseDate}` : ""}
        </p>
      )}
    </article>
  );
}

export default function Discography({ mode = "preview" }: DiscographyProps) {
  const full = mode === "full";
  const [spotifyTracks, setSpotifyTracks] = useState<SpotifyCatalogueTrack[]>([]);

  useEffect(() => {
    if (!full) return;
    const controller = new AbortController();

    fetch("/api/spotify/catalogue", { signal: controller.signal, cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) return null;
        return response.json() as Promise<SpotifyCatalogueResponse>;
      })
      .then((result) => {
        if (result?.tracks) setSpotifyTracks(result.tracks);
      })
      .catch(() => undefined);

    return () => controller.abort();
  }, [full]);

  const albums = full ? catalogueAlbums : catalogueAlbums.slice(0, 3);
  const singles = full ? catalogueSingles : catalogueSingles.slice(0, 4);

  return (
    <section id="music" className={`relative z-10 bg-black/90 ${full ? "pb-12 pt-28" : "py-20"}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b border-toxic/20 pb-4">
          <div>
            <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.28em] text-toxic">Dreams Of Colour · Release archive</p>
            <h2 className="text-4xl font-black uppercase tracking-tighter text-white sm:text-6xl">Discography</h2>
          </div>
          {!full && (
            <Link href="/discography" className="inline-flex min-h-11 items-center border border-toxic px-5 py-3 font-mono text-xs font-bold uppercase tracking-widest text-toxic transition-colors hover:bg-toxic hover:text-black">
              Open full catalogue <span aria-hidden="true" className="ml-2">→</span>
            </Link>
          )}
        </div>

        <section aria-labelledby="album-catalogue-heading" className="mb-16">
          <div className="mb-5 flex items-center justify-between gap-3">
            <h3 id="album-catalogue-heading" className="border-l-4 border-toxic pl-3 text-xl font-bold uppercase tracking-widest text-white">Albums</h3>
            {!full && <span className="font-mono text-[10px] uppercase text-white/45">Featured releases</span>}
          </div>
          <div className={full ? "grid gap-5 lg:grid-cols-2" : "grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6"}>
            {albums.map((album) => <AlbumCard key={album.slug} album={album} full={full} />)}
          </div>
        </section>

        <section aria-labelledby="singles-catalogue-heading">
          <div className="mb-5 flex items-center justify-between gap-3">
            <h3 id="singles-catalogue-heading" className="border-l-4 border-toxic pl-3 text-xl font-bold uppercase tracking-widest text-white">Singles</h3>
            {!full && <span className="font-mono text-[10px] uppercase text-white/45">Latest and selected tracks</span>}
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {singles.map((single) => (
              <SingleCard
                key={single.slug}
                single={single}
                full={full}
                spotifyTrack={findSpotifyMatch(single, spotifyTracks)}
              />
            ))}
          </div>
        </section>

        {!full && (
          <div className="mt-10 flex justify-center">
            <Link href="/discography" className="inline-flex min-h-11 items-center border border-toxic/50 px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest text-toxic transition-colors hover:bg-toxic hover:text-black">
              View all albums and singles
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
