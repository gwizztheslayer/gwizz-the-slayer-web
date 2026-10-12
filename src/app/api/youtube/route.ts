import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type YouTubeResponse<T> = { items?: T[] };
type ChannelItem = { contentDetails?: { relatedPlaylists?: { uploads?: string } } };
type UploadItem = { snippet?: { title?: string; resourceId?: { videoId?: string } } };

async function youtubeGet<T>(params: Record<string, string>) {
  const url = new URL("https://www.googleapis.com/youtube/v3/");
  url.pathname += params.endpoint;
  for (const [key, value] of Object.entries(params)) {
    if (key !== "endpoint") url.searchParams.set(key, value);
  }
  const response = await fetch(url, { next: { revalidate: 3_600 } });
  if (!response.ok) throw new Error("YouTube API request failed");
  return response.json() as Promise<YouTubeResponse<T>>;
}

export async function GET() {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) return NextResponse.json({ videos: [] });

  try {
    const channelParams: Record<string, string> = {
      endpoint: "channels",
      part: "contentDetails",
      key: apiKey,
    };
    if (process.env.YOUTUBE_CHANNEL_ID) channelParams.id = process.env.YOUTUBE_CHANNEL_ID;
    else channelParams.forHandle = "@gwizztheslayer";
    const channelData = await youtubeGet<ChannelItem>(channelParams);
    const uploadsId = channelData.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
    if (!uploadsId) return NextResponse.json({ videos: [] });

    const uploads = await youtubeGet<UploadItem>({
      endpoint: "playlistItems",
      part: "snippet",
      playlistId: uploadsId,
      maxResults: "6",
      key: apiKey,
    });
    const videos = (uploads.items ?? [])
      .map((item) => ({ id: item.snippet?.resourceId?.videoId, title: item.snippet?.title }))
      .filter((video): video is { id: string; title: string } => Boolean(video.id && /^[\w-]{11}$/.test(video.id) && video.title));
    return NextResponse.json({ videos });
  } catch {
    return NextResponse.json({ videos: [] });
  }
}
