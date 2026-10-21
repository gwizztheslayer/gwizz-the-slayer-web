import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { catalogueAlbums, catalogueSingles } from '@/data/discography';

export default async function ReleasePage({ params }: { params: any }) {
  // Await params to safely support Next.js 15 async route parameters
  const resolvedParams = await params;
  const currentSlug = resolvedParams?.slug || "";

  // Case-insensitive matching to prevent minor typos from breaking the route
  const album = catalogueAlbums.find(a => a.slug.toLowerCase() === currentSlug.toLowerCase());
  const single = catalogueSingles.find(s => s.slug.toLowerCase() === currentSlug.toLowerCase());
  const release = album || single;

  // Visual debugger: If the slug doesn't exist, tell us exactly what it was looking for
  if (!release) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center p-8 font-mono">
        <div className="text-center border border-toxic p-8 max-w-lg">
          <h1 className="text-toxic text-2xl font-bold mb-4">DATA MISMATCH</h1>
          <p className="text-zinc-400 mb-2">The dynamic route is working, but it cannot find this release.</p>
          <p className="text-zinc-400">Your data file does not contain the slug: <strong className="text-white">"{currentSlug}"</strong></p>
          <Link href="/discography" className="mt-8 inline-block text-xs uppercase tracking-widest text-toxic hover:text-white transition-colors">
            Return to Discography
          </Link>
        </div>
      </main>
    );
  }

  const isAlbum = !!album;
  const tracks = isAlbum ? album.tracks : [{ title: single.title, audio: single.audio }];

  return (
    <main className="min-h-screen bg-black text-white p-8 md:p-20 font-mono">
      <div className="max-w-5xl mx-auto">
        <Link href="/discography" className="text-toxic hover:text-white mb-12 inline-block text-xs uppercase tracking-widest transition-colors">
          <span className="mr-2">&lt;</span> Return to Discography
        </Link>

        <article className="grid md:grid-cols-[350px_1fr] gap-12 items-start">
          <div className="relative aspect-square w-full border border-zinc-800 bg-zinc-950 group hover:border-toxic transition-colors duration-500">
            <Image src={release.cover} alt={release.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 350px" priority />
          </div>

          <div>
            <header className="mb-10 border-b border-zinc-800 pb-8">
              <p className="text-zinc-500 uppercase tracking-widest text-xs mb-3">
                {isAlbum ? 'Album' : 'Single'} / {release.releaseDate || '2026'}
              </p>
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-6">
                {release.title}
              </h1>
            </header>

            <section>
              <h2 className="text-zinc-500 uppercase tracking-widest text-xs mb-6 border-l-2 border-toxic pl-3">Tracklist / Data</h2>
              <ul className="divide-y divide-zinc-900 border-t border-zinc-900">
                {tracks.map((track, i) => (
                  <li key={i} className="py-4 flex justify-between items-center group">
                    <div className="flex items-center gap-6">
                      <span className="text-zinc-700 text-xs font-bold w-4">{String(i + 1).padStart(2, '0')}</span>
                      <span className="text-zinc-300 group-hover:text-toxic transition-colors text-sm uppercase tracking-wider">{track.title}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </article>
      </div>
    </main>
  );
}