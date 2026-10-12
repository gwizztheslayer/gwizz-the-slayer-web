const links = [
  { name: "SPOTIFY", url: "https://open.spotify.com/artist/1GM9nGfwFjiwZtgIWO3sh2" },
  { name: "SOUNDCLOUD", url: "https://soundcloud.com/gwizztheslayer" },
  { name: "YOUTUBE", url: "https://www.youtube.com/@gwizztheslayer" },
  { name: "INSTAGRAM", url: "https://instagram.com/gwizztheslayer" },
  { name: "X / TWITTER", url: "https://twitter.com/gwizz_theslayer" },
  { name: "AUDIOMACK", url: "https://audiomack.com/gwizztheslayer" }
];

export default function Network() {
  return (
    <section id="network" className="scroll-mt-20 relative z-10 border-y border-toxic/20 bg-black/80 py-24 text-center">
      <div className="mx-auto max-w-5xl px-4">
        <h1 className="mb-12 text-3xl font-black uppercase tracking-[0.2em] text-white md:text-5xl">The Network</h1>
        <div className="flex flex-wrap justify-center gap-4">
          {links.map((link) => (
            <a key={link.name} href={link.url} aria-label={`Follow on ${link.name}`} target="_blank" rel="noopener noreferrer" className="border border-toxic bg-black/50 px-8 py-4 text-xs font-bold uppercase tracking-widest text-toxic transition-all hover:bg-toxic hover:text-black">
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
