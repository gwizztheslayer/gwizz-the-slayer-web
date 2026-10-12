import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Official Links | G-Wizz, The Slayer",
  description: "Official music, video, and contact links for G-Wizz, The Slayer.",
};

const links = [
  { label: "Listen to Demons Don't Sleep", href: "https://ffm.to/demonsdontsleepalbum" },
  { label: "Spotify artist page", href: "https://open.spotify.com/artist/1GM9nGfwFjiwZtgIWO3sh2" },
  { label: "YouTube channel", href: "https://www.youtube.com/@gwizztheslayer" },
  { label: "Instagram", href: "https://instagram.com/gwizztheslayer" },
  { label: "X / Twitter", href: "https://twitter.com/gwizz_theslayer" },
  { label: "Booking and enquiries", href: "/contact" },
];

export default function LinksPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black px-4 py-24 text-white">
      <div className="w-full max-w-md space-y-8">
        <header className="text-center">
          <h1 className="mb-2 text-3xl font-bold uppercase tracking-widest text-toxic">G-Wizz, The Slayer</h1>
          <p className="text-zinc-400">Official links</p>
        </header>
        <nav aria-label="Official links" className="flex w-full flex-col gap-3">
          {links.map((link) => (
            <a key={link.label} href={link.href} target={link.href.startsWith("https://") ? "_blank" : undefined} rel={link.href.startsWith("https://") ? "noopener noreferrer" : undefined} className="w-full border border-zinc-800 bg-zinc-950 p-4 text-center font-semibold tracking-wide transition-colors hover:border-toxic hover:text-toxic">
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </main>
  );
}
