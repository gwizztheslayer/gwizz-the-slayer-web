import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { catalogueAlbums, catalogueSingles } from '@/data/discography';

export default function ReleasePage({ params }: { params: { slug: string } }) {
  const album = catalogueAlbums.find(a => a.slug === params.slug);
  const single = catalogueSingles.find(s => s.slug === params.slug);
  const release = album || single;

  if (!release) return notFound();

  const isAlbum = !!album;
  const tracks = album ? album.tracks : (single ? [{ title: single.title, audio: single.audio }] : []);

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