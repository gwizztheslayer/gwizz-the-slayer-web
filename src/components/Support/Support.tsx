import Link from "next/link";

export default function Support() {
  return (
    <section id="support" className="border-y border-toxic/20 bg-black/90 py-16 text-center">
      <div className="mx-auto max-w-3xl px-4">
        <h2 className="text-3xl font-black uppercase tracking-widest text-toxic">Support the work</h2>
        <p className="mx-auto mt-4 max-w-2xl font-mono text-sm leading-relaxed text-zinc-400">
          Merchandise checkout and online payments are not available yet. For bookings, collaborations, or product availability, send an enquiry.
        </p>
        <Link href="/contact" className="mt-7 inline-flex min-h-11 items-center border border-toxic px-8 py-4 font-mono text-xs font-bold uppercase tracking-widest text-toxic transition-colors hover:bg-toxic hover:text-black">
          Contact G-Wizz
        </Link>
      </div>
    </section>
  );
}
