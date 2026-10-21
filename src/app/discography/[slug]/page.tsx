import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { catalogueAlbums, catalogueSingles } from '@/data/discography';

export default async function ReleasePage({ params }: { params: any }) {
  const resolvedParams = await params;
  const currentSlug = resolvedParams?.slug || "";

  const album = catalogueAlbums.find(a => a.slug.toLowerCase() === currentSlug.toLowerCase());
  const single = catalogueSingles.find(s => s.slug.toLowerCase() === currentSlug.toLowerCase());
  const release = album || single;

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
  
  // Safely extract optional data without triggering strict TypeScript errors
  const description = (release as any).description;
  const credits = (release as any).credits;
  const producer = (release as any).producer;

  return (
    <main className="min-h-screen bg-black text-white p-8 md:p-20 font-mono">
      <div className="max-w-5xl mx-auto">
        <Link href="/discography" className="text-toxic hover:text-white mb-12 inline-block text-xs uppercase tracking-widest transition-colors">
          <span className="mr-2">&lt;</span> Return to Discography
        </Link>

        <article className="grid md:grid-cols-[350px_1fr] gap-12 items-start">
          {/* Cover Art & Credits Column */}
          <div className="space-y-8">
            <div className="relative aspect-square w-full border border-zinc-800 bg-zinc-950 group hover:border-toxic transition-colors duration-500">
              <Image src={release.cover} alt={release.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 350px" priority />
            </div>
            
            {/* Credits Section */}
            {(credits || producer) && (
              <div className="border border-zinc-900 bg-zinc-950/50 p-6">
                <h3 className="text-toxic text-[10px] uppercase tracking-[0.2em] mb-4 border-b border-zinc-800 pb-2">Archival Credits</h3>
                <dl className="space-y-4 text-xs font-sans tracking-wide">
                  {producer && (
                    <div>
                      <dt className="text-zinc-600 font-mono uppercase tracking-widest text-[10px] mb-1">Production</dt>
                      <dd className="text-zinc-300">{producer}</dd>
                    </div>
                  )}
                  {credits && (
                    <div>
                      <dt className="text-zinc-600 font-mono uppercase tracking-widest text-[10px] mb-1">Features / Credits</dt>
                      <dd className="text-zinc-300">{credits}</dd>
                    </div>
                  )}
                </dl>
              </div>
            )}
          </div>

          {/* Data Column */}
          <div>
            <header className="mb-10 border-b border-zinc-800 pb-8">
              <div className="flex items-center gap-3 mb-3">
                <span className="border border-toxic text-toxic px-2 py-1 text-[9px] uppercase tracking-widest">
                  {isAlbum ? 'Full Project' : 'Single Track'}
                </span>
                <span className="text-zinc-500 uppercase tracking-widest text-xs">
                  {release.releaseDate || '2026'}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-6">
                {release.title}
              </h1>
              
              {/* Description Section */}
              {description && (
                <div className="text-zinc-400 text-sm leading-relaxed mb-8 max-w-2xl font-sans font-light border-l-2 border-zinc-800 pl-4">
                  {description}
                </div>
              )}

              {release.featureFmUrl && (
                <a href={release.featureFmUrl} target="_blank" rel="noopener noreferrer" className="inline-block border border-toxic bg-toxic/10 text-toxic px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-toxic hover:text-black transition-colors">
                  Access Release Hub
                </a>
              )}
            </header>

            <section>
              <h2 className="text-zinc-500 uppercase tracking-widest text-xs mb-6 border-l-2 border-toxic pl-3">Tracklist / Audio Data</h2>
              <ul className="divide-y divide-zinc-900 border-t border-zinc-900">
                {tracks.map((track: any, i: number) => (
                  <li key={i} className="py-4 flex flex-col md:flex-row md:justify-between md:items-center gap-4 group">
                    <div className="flex items-center gap-6">
                      <span className="text-zinc-700 text-xs font-bold w-4">{String(i + 1).padStart(2, '0')}</span>
                      <span className="text-zinc-300 group-hover:text-toxic transition-colors text-sm uppercase tracking-wider">{track.title}</span>
                    </div>
                    {/* Dark-mode inverted audio player renders only if audio exists */}
                    {track.audio && (
                      <audio 
                        controls 
                        preload="none" 
                        controlsList="nodownload"
                        className="h-8 w-full md:w-64 max-w-full invert grayscale opacity-80 hover:opacity-100 transition-opacity outline-none"
                      >
                        <source src={track.audio} type="audio/mpeg" />
                      </audio>
                    )}
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