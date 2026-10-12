import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AuraPlayer from "@/components/AuraPlayer/AuraPlayer";
import TrackActions from "@/components/Discography/TrackActions";
import SpotifyTrackDetails from "@/components/Discography/SpotifyTrackDetails";
import { catalogueSingles, getCatalogueSingle } from "@/data/discography";

type TrackPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return catalogueSingles.map((single) => ({ slug: single.slug }));
}

export async function generateMetadata({ params }: TrackPageProps): Promise<Metadata> {
  const { slug } = await params;
  const single = getCatalogueSingle(slug);

  if (!single) return { title: "Track not found | G-Wizz, The Slayer" };

  return {
    title: `${single.title} | G-Wizz, The Slayer`,
    description: single.description ?? `Track details, credits, and listening links for ${single.title} by G-Wizz, The Slayer.`,
    openGraph: {
      title: `${single.title} | G-Wizz, The Slayer`,
      description: single.description ?? `Track details and credits for ${single.title}.`,
      images: [{ url: single.cover, alt: `${single.title} cover` }],
    },
  };
}

function DetailValue({ value }: { value: string | null | undefined }) {
  return <span className={value ? "text-white" : "text-white/40"}>{value ?? "Not listed"}</span>;
}

export default async function CatalogueTrackPage({ params }: TrackPageProps) {
  const { slug } = await params;
  const track = getCatalogueSingle(slug);
  if (!track) notFound();

  const details = [
    { label: "Artist", value: "G-Wizz, The Slayer" },
    { label: "Album / project", value: track.album },
    { label: "Featuring", value: track.featuredArtists.length ? track.featuredArtists.join(", ") : null },
    { label: "Produced by", value: track.producedBy },
    { label: "Written by", value: track.songwriters },
    { label: "Duration", value: track.duration },
    { label: "Release date", value: track.releaseDate },
    { label: "Distributed by", value: track.distributedBy },
    { label: "Published by", value: track.publishedBy },
    { label: "Label", value: track.label },
    { label: "ISRC", value: track.isrc },
  ];

  return (
    <main className="min-h-screen bg-black pb-36 pt-24 text-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <Link href="/discography" className="inline-flex min-h-11 items-center font-mono text-xs uppercase tracking-widest text-toxic hover:text-white">
          <span aria-hidden="true" className="mr-2">←</span> Full catalogue
        </Link>

        <article className="mt-6 grid gap-8 border-y border-toxic/20 py-8 md:grid-cols-[minmax(280px,420px)_1fr] md:gap-12 md:py-12">
          <div className="relative aspect-square overflow-hidden border border-toxic/30 shadow-[0_0_35px_rgba(57,255,20,0.08)]">
            <Image src={track.cover} alt={`${track.title} single cover`} fill priority sizes="(max-width: 768px) 90vw, 420px" className="object-cover" />
          </div>
          <div className="flex flex-col justify-center">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-toxic">Single · G-Wizz, The Slayer</p>
            <h1 className="mt-4 text-4xl font-black uppercase leading-tight tracking-tight sm:text-6xl">{track.title}</h1>
            <h2 className="mt-5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-toxic">Track bio</h2>
            <p className="mt-2 max-w-2xl leading-relaxed text-zinc-300">
              {track.description ?? "Track notes have not been published for this release yet."}
            </p>
            <div className="mt-7">
              <TrackActions track={track} />
            </div>

            <section aria-labelledby="track-credits-heading" className="mt-10">
              <h2 id="track-credits-heading" className="mb-4 border-b border-white/10 pb-3 font-mono text-xs font-bold uppercase tracking-[0.2em] text-toxic">Track information & credits</h2>
              <dl className="grid gap-x-8 sm:grid-cols-2">
                {details.map((detail) => (
                  <div key={detail.label} className="flex min-h-12 items-center justify-between gap-4 border-b border-white/10 py-3 text-sm">
                    <dt className="font-mono text-[10px] uppercase tracking-wider text-white/50">{detail.label}</dt>
                    <dd className="text-right"><DetailValue value={detail.value} /></dd>
                  </div>
                ))}
              </dl>
            </section>
            <SpotifyTrackDetails trackId={track.spotifyTrackId} />
          </div>
        </article>

        <div className="mt-8 flex flex-wrap gap-3">
          {catalogueSingles.filter((item) => item.slug !== track.slug).slice(0, 4).map((item) => (
            <Link key={item.slug} href={`/discography/${item.slug}`} className="border border-white/10 px-3 py-2 font-mono text-[10px] uppercase tracking-wider text-white/60 transition-colors hover:border-toxic hover:text-toxic">
              {item.title}
            </Link>
          ))}
        </div>
      </div>
      <AuraPlayer />
    </main>
  );
}
