"use client";

import { useEffect, useMemo, useState } from "react";

type LiveEvent = {
  id?: string;
  datetime: string;
  title?: string;
  url?: string;
  offers?: { url?: string }[];
  venue?: {
    name?: string;
    city?: string;
    region?: string;
    country?: string;
    latitude?: string | number;
    longitude?: string | number;
  };
};

function coordinatesFor(event: LiveEvent | undefined) {
  const latitude = Number(event?.venue?.latitude);
  const longitude = Number(event?.venue?.longitude);
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return null;
  if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) return null;
  return { latitude, longitude };
}

const KNYSNA_MAP_CENTER = { latitude: -34.0421, longitude: 23.0492 };

export default function LiveTransmissions() {
  const [events, setEvents] = useState<LiveEvent[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [feedError, setFeedError] = useState(false);
  const appId = process.env.NEXT_PUBLIC_BANDSINTOWN_APP_ID;

  useEffect(() => {
    if (!appId) return;

    const controller = new AbortController();
    const loadEvents = async () => {
      try {
        const response = await fetch(
          `https://rest.bandsintown.com/artists/G-Wizz%2C%20The%20Slayer/events?app_id=${encodeURIComponent(appId)}`,
          { signal: controller.signal }
        );
        if (!response.ok) throw new Error("The event feed returned an error.");
        const result: unknown = await response.json();
        if (!Array.isArray(result)) throw new Error("The event feed response was invalid.");
        const upcoming = (result as LiveEvent[])
          .filter((event) => event.datetime && Date.parse(event.datetime) >= Date.now())
          .sort((a, b) => Date.parse(a.datetime) - Date.parse(b.datetime));
        setEvents(upcoming);
      } catch {
        if (!controller.signal.aborted) setFeedError(true);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    void loadEvents();
    return () => controller.abort();
  }, [appId]);

  const selectedEvent = events[selectedIndex] ?? events[0];
  const coordinates = useMemo(() => coordinatesFor(selectedEvent), [selectedEvent]);
  const mapCenter = coordinates ?? KNYSNA_MAP_CENTER;
  const mapHref = `https://www.openstreetmap.org/?mlat=${mapCenter.latitude}&mlon=${mapCenter.longitude}#map=${coordinates ? 15 : 13}/${mapCenter.latitude}/${mapCenter.longitude}`;
  const marker = coordinates ? `&marker=${coordinates.latitude}%2C${coordinates.longitude}` : "";
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${mapCenter.longitude - 0.08}%2C${mapCenter.latitude - 0.05}%2C${mapCenter.longitude + 0.08}%2C${mapCenter.latitude + 0.05}&layer=mapnik${marker}`;

  return (
    <section id="live-events" className="scroll-mt-20 relative z-10 border-t border-toxic/20 bg-black/90 py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-toxic">Shows and appearances</p>
          <h2 className="mt-3 text-4xl font-black uppercase tracking-tight text-white md:text-5xl">Live Events</h2>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="overflow-hidden border border-toxic/30 bg-zinc-950">
            <>
              <iframe
                key={`${mapCenter.latitude}-${mapCenter.longitude}`}
                title={coordinates ? `Map showing ${selectedEvent?.venue?.name ?? "event location"}` : "Interactive map centered on Knysna, South Africa"}
                src={mapSrc}
                className="h-[360px] w-full border-0 sm:h-[480px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-toxic/20 p-4 font-mono text-xs">
                <span className="text-zinc-300">{selectedEvent?.venue?.name ?? "Knysna, South Africa"}</span>
                <a href={mapHref} target="_blank" rel="noopener noreferrer" className="text-toxic underline underline-offset-4">{coordinates ? "Open event map" : "Open map"}</a>
              </div>
              {!coordinates && <p className="px-4 pb-4 text-xs leading-relaxed text-zinc-500">{selectedEvent ? "This event has no coordinates yet; the map is centered on Knysna." : "Map centered on Knysna. Event locations will appear when the Bandsintown feed is configured."}</p>}
            </>
          </div>

          <div className="space-y-4">
            {loading ? (
              <div className="border border-white/10 bg-zinc-950 p-8 text-center font-mono text-xs uppercase tracking-widest text-zinc-400">Loading event listings…</div>
            ) : feedError || !appId ? (
              <div className="border border-white/10 bg-zinc-950 p-8 text-center">
                <h3 className="font-mono text-sm font-bold uppercase tracking-widest text-white">Event feed unavailable</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{appId ? "Check the event feed connection to show upcoming dates." : "Configure the Bandsintown app ID to show upcoming dates."}</p>
              </div>
            ) : events.length === 0 ? (
              <div className="border border-white/10 bg-zinc-950 p-8 text-center">
                <h3 className="font-mono text-sm font-bold uppercase tracking-widest text-white">No upcoming events</h3>
                <p className="mt-3 text-sm text-zinc-400">New show dates will appear here when announced.</p>
              </div>
            ) : (
              events.map((event, index) => {
                const ticketUrl = event.offers?.find((offer) => offer.url)?.url ?? event.url;
                const eventDate = new Date(event.datetime);
                return (
                  <article key={event.id ?? `${event.datetime}-${event.venue?.name ?? index}`} className={`border bg-zinc-950 p-5 transition-colors ${selectedIndex === index ? "border-toxic/70" : "border-white/10 hover:border-toxic/40"}`}>
                    <button type="button" onClick={() => setSelectedIndex(index)} className="w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-toxic" aria-pressed={selectedIndex === index}>
                      <span className="font-mono text-xs uppercase tracking-widest text-toxic">{eventDate.toLocaleDateString("en-ZA", { day: "2-digit", month: "short", year: "numeric" })}</span>
                      <span className="mt-2 block text-xl font-black uppercase text-white">{event.title ?? event.venue?.name ?? "Live Event"}</span>
                      <span className="mt-1 block text-sm text-zinc-400">{event.venue?.name}{event.venue?.city ? ` · ${event.venue.city}` : ""}{event.venue?.region ? `, ${event.venue.region}` : ""}{event.venue?.country ? ` · ${event.venue.country}` : ""}</span>
                    </button>
                    {ticketUrl && <a href={ticketUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex border border-toxic/50 px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-widest text-toxic hover:bg-toxic hover:text-black">Event details / tickets</a>}
                  </article>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
