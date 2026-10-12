import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AVC Information | G-Wizz, The Slayer",
  description: "Current public information about Aura Venture Coin and its unconfigured launch status.",
};

export default function AVCTerminal() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black px-4 pb-24 pt-32 font-mono text-white">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(57,255,20,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(57,255,20,0.03)_1px,transparent_1px)] bg-[size:30px_30px]" />
      <section className="relative z-10 mx-auto max-w-4xl">
        <header className="mb-10 border-b border-toxic/30 pb-8">
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-toxic">Project information</p>
          <h1 className="text-4xl font-black uppercase tracking-tight md:text-6xl">AVC <span className="text-toxic">Information</span></h1>
          <p className="mt-4 text-sm uppercase tracking-widest text-zinc-400">Aura Venture Coin · Current status</p>
        </header>

        <div className="border border-toxic/30 bg-zinc-950/80 p-6 shadow-[0_0_25px_rgba(57,255,20,0.05)] md:p-10">
          <div className="mb-8 inline-flex items-center gap-2 border border-amber-400/40 px-3 py-2 text-xs font-bold uppercase tracking-widest text-amber-300">
            <span className="h-2 w-2 rounded-full bg-amber-300" /> Launch details not verified
          </div>
          <p className="text-base leading-relaxed text-zinc-300">
            Aura Venture Coin is not currently configured for public transactions. The network, contract address, exchange rate, and minting status have not been verified, so this page is informational only.
          </p>
          <p className="mt-5 text-sm leading-relaxed text-zinc-400">
            There is no wallet connection, purchase, or minting action available here. This section will be updated if verified project details are published.
          </p>
          <dl className="mt-10 grid gap-4 border-t border-white/10 pt-6 sm:grid-cols-2">
            <div><dt className="text-xs uppercase tracking-widest text-zinc-500">Network</dt><dd className="mt-2 text-sm text-zinc-200">Not configured</dd></div>
            <div><dt className="text-xs uppercase tracking-widest text-zinc-500">Contract</dt><dd className="mt-2 text-sm text-zinc-200">Not verified</dd></div>
            <div><dt className="text-xs uppercase tracking-widest text-zinc-500">Exchange rate</dt><dd className="mt-2 text-sm text-zinc-200">Not published</dd></div>
            <div><dt className="text-xs uppercase tracking-widest text-zinc-500">Minting</dt><dd className="mt-2 text-sm text-zinc-200">Unavailable</dd></div>
          </dl>
        </div>
      </section>
    </main>
  );
}
