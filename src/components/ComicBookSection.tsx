import Image from "next/image";
import Link from "next/link";

export default function ComicBookSection() {
  return (
    <section id="comic-book" className="scroll-mt-20 w-full border-y border-toxic/30 bg-black/90 py-20 relative z-10">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-12 border-b border-toxic/20 pb-5 text-5xl font-black uppercase tracking-tighter text-toxic md:text-7xl">Comic Book</h2>
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <div className="relative mx-auto aspect-[2/3] w-full max-w-sm overflow-hidden border border-toxic/30 bg-zinc-950 shadow-[0_0_30px_rgba(57,255,20,0.08)]">
          <Image
            src="/comic/knysna-saviour-cover.png"
            alt="Knysna's Saviour comic book cover"
            fill
            sizes="(max-width: 768px) 90vw, 380px"
            className="object-contain"
          />
        </div>
        <div>
          <h3 className="text-4xl font-black uppercase tracking-tight text-white md:text-5xl">Knysna&apos;s Saviour</h3>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-300">
            Something woke up beneath Knysna. Enter the official dark fantasy comic by G-Wizz, The Slayer.
          </p>
          <Link
            href="/comic"
            className="mt-8 inline-flex border border-toxic px-6 py-4 font-mono text-xs font-bold uppercase tracking-widest text-toxic transition-colors hover:bg-toxic hover:text-black"
          >
            Open Comic Book Reader
          </Link>
        </div>
        </div>
      </div>
    </section>
  );
}
