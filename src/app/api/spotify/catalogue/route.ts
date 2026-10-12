import { NextResponse } from "next/server";

const SPOTIFY_API = "https://api.spotify.com/v1";
const ALBUM_PAGE_SIZE = 10;
const MAX_ALBUM_PAGES = 100;
const TRACK_PAGE_SIZE = 50;
const MAX_TRACK_PAGES = 4;
const CACHE_SECONDS = 3_600;

type SpotifyTokenResponse = { access_token?: string; expires_in?: number };
type SpotifyPage<T> = { items?: T[]; next?: string | null };
type SpotifyArtist = { name?: string };
type SpotifyImage = { url?: string };

type SpotifyAlbum = {
  id: string;
  name: string;
  album_type: string;
  release_date: string;
  release_date_precision: "year" | "month" | "day";
  total_tracks: number;
  external_urls?: { spotify?: string };
  artists?: SpotifyArtist[];
  images?: SpotifyImage[];
};

type SpotifyTrack = {
  id: string;
  name: string;
  duration_ms: number;
  explicit?: boolean;
  track_number?: number;
  disc_number?: number;
  external_urls?: { spotify?: string };
  artists?: SpotifyArtist[];
};

type SpotifyFullTrack = SpotifyTrack & {
  album: SpotifyAlbum;
  external_ids?: { isrc?: string };
};

type CatalogueAlbum = {
  id: string;
  title: string;
  type: string;
  releaseDate: string;
  releaseDatePrecision: string;
  totalTracks: number;
  artists: string[];
  spotifyUrl: string;
};

type CatalogueTrack = {
  id: string;
  title: string;
  artists: string[];
  albumId: string;
  albumTitle: string;
  albumType: string;
  releaseDate: string;
  releaseDatePrecision: string;
  durationMs: number;
  explicit: boolean;
  discNumber: number;
  trackNumber: number;
  spotifyUrl: string;
  albumSpotifyUrl: string;
};

let tokenCache: { accessToken: string; expiresAt: number } | null = null;

async function getAccessToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  if (!clientId || !clientSecret) return null;

  if (tokenCache && tokenCache.expiresAt > Date.now() + 60_000) {
    return tokenCache.accessToken;
  }

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ grant_type: "client_credentials" }),
    cache: "no-store",
  });

  if (!response.ok) throw new Error("Spotify authentication failed");
  const tokenData = (await response.json()) as SpotifyTokenResponse;
  if (!tokenData.access_token) throw new Error("Spotify did not return an access token");

  tokenCache = {
    accessToken: tokenData.access_token,
    expiresAt: Date.now() + (tokenData.expires_in ?? 3_600) * 1_000,
  };
  return tokenCache.accessToken;
}

async function spotifyGet<T>(url: string, accessToken: string): Promise<T> {
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
    next: { revalidate: CACHE_SECONDS },
  });
  if (!response.ok) throw new Error(`Spotify catalogue request failed (${response.status})`);
  return (await response.json()) as T;
}

async function getArtistAlbums(accessToken: string, artistId: string, market: string) {
  const albums: SpotifyAlbum[] = [];
  let offset = 0;

  for (let page = 0; page < MAX_ALBUM_PAGES; page += 1) {
    const params = new URLSearchParams({
      include_groups: "album,single,compilation",
      market,
      limit: String(ALBUM_PAGE_SIZE),
      offset: String(offset),
    });
    const result = await spotifyGet<SpotifyPage<SpotifyAlbum>>(
      `${SPOTIFY_API}/artists/${encodeURIComponent(artistId)}/albums?${params}`,
      accessToken,
    );
    const pageAlbums = result.items ?? [];
    albums.push(...pageAlbums);
    if (!result.next || pageAlbums.length === 0) break;
    offset += pageAlbums.length;
  }

  return Array.from(new Map(albums.map((album) => [album.id, album])).values());
}

async function getAlbumTracks(album: SpotifyAlbum, accessToken: string, market: string): Promise<CatalogueTrack[]> {
  const tracks: CatalogueTrack[] = [];
  let offset = 0;

  for (let page = 0; page < MAX_TRACK_PAGES; page += 1) {
    const params = new URLSearchParams({ market, limit: String(TRACK_PAGE_SIZE), offset: String(offset) });
    const result = await spotifyGet<SpotifyPage<SpotifyTrack>>(
      `${SPOTIFY_API}/albums/${encodeURIComponent(album.id)}/tracks?${params}`,
      accessToken,
    );
    const pageTracks = result.items ?? [];

    tracks.push(...pageTracks.map((track) => ({
      id: track.id,
      title: track.name,
      artists: (track.artists ?? []).map((artist) => artist.name).filter((name): name is string => Boolean(name)),
      albumId: album.id,
      albumTitle: album.name,
      albumType: album.album_type,
      releaseDate: album.release_date,
      releaseDatePrecision: album.release_date_precision,
      durationMs: track.duration_ms,
      explicit: Boolean(track.explicit),
      discNumber: track.disc_number ?? 1,
      trackNumber: track.track_number ?? 0,
      spotifyUrl: track.external_urls?.spotify ?? `https://open.spotify.com/track/${track.id}`,
      albumSpotifyUrl: album.external_urls?.spotify ?? `https://open.spotify.com/album/${album.id}`,
    })));

    if (!result.next || pageTracks.length === 0) break;
    offset += pageTracks.length;
  }

  return tracks;
}

export async function GET(request: Request) {
  const artistId = process.env.SPOTIFY_ARTIST_ID ?? "1GM9nGfwFjiwZtgIWO3sh2";
  const market = process.env.SPOTIFY_MARKET ?? "ZA";
  const trackId = new URL(request.url).searchParams.get("trackId");

  if (trackId && !/^[A-Za-z0-9]{22}$/.test(trackId)) {
    return NextResponse.json({ message: "Invalid Spotify track ID." }, { status: 400 });
  }

  try {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      return NextResponse.json(
        { configured: false, message: "Spotify catalogue sync is not configured.", albums: [], tracks: [] },
        { status: 503 },
      );
    }

    if (trackId) {
      const params = new URLSearchParams({ market });
      const sourceTrack = await spotifyGet<SpotifyFullTrack>(
        `${SPOTIFY_API}/tracks/${encodeURIComponent(trackId)}?${params}`,
        accessToken,
      );
      const track = {
        id: sourceTrack.id,
        title: sourceTrack.name,
        artists: (sourceTrack.artists ?? []).map((artist) => artist.name).filter((name): name is string => Boolean(name)),
        albumTitle: sourceTrack.album.name,
        releaseDate: sourceTrack.album.release_date,
        releaseDatePrecision: sourceTrack.album.release_date_precision,
        durationMs: sourceTrack.duration_ms,
        explicit: Boolean(sourceTrack.explicit),
        isrc: sourceTrack.external_ids?.isrc ?? null,
        spotifyUrl: sourceTrack.external_urls?.spotify ?? `https://open.spotify.com/track/${sourceTrack.id}`,
        albumSpotifyUrl: sourceTrack.album.external_urls?.spotify ?? `https://open.spotify.com/album/${sourceTrack.album.id}`,
      };

      return NextResponse.json(
        { configured: true, track },
        { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } },
      );
    }

    const spotifyAlbums = await getArtistAlbums(accessToken, artistId, market);
    const albums: CatalogueAlbum[] = spotifyAlbums.map((album) => ({
      id: album.id,
      title: album.name,
      type: album.album_type,
      releaseDate: album.release_date,
      releaseDatePrecision: album.release_date_precision,
      totalTracks: album.total_tracks,
      artists: (album.artists ?? []).map((artist) => artist.name).filter((name): name is string => Boolean(name)),
      spotifyUrl: album.external_urls?.spotify ?? `https://open.spotify.com/album/${album.id}`,
    }));

    const allTracks: CatalogueTrack[] = [];
    for (let start = 0; start < spotifyAlbums.length; start += 4) {
      const batch = spotifyAlbums.slice(start, start + 4);
      const results = await Promise.all(batch.map((album) => getAlbumTracks(album, accessToken, market)));
      allTracks.push(...results.flat());
    }

    const tracks = Array.from(new Map(allTracks.map((track) => [track.id, track])).values())
      .sort((a, b) => b.releaseDate.localeCompare(a.releaseDate) || a.albumTitle.localeCompare(b.albumTitle) || a.trackNumber - b.trackNumber);

    return NextResponse.json(
      { configured: true, artistUrl: `https://open.spotify.com/artist/${artistId}`, albums, tracks },
      { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } },
    );
  } catch {
    return NextResponse.json(
      { configured: false, message: "Spotify catalogue is temporarily unavailable.", albums: [], tracks: [] },
      { status: 502 },
    );
  }
}
