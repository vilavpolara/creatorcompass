import { NextResponse } from "next/server";

export async function GET() {
  try {
    const channelId = process.env.CHANNEL_ID;
    const apiKey = process.env.YOUTUBE_API_KEY;

    if (!channelId || !apiKey) {
      return NextResponse.json(
        { error: "Missing CHANNEL_ID or YOUTUBE_API_KEY" },
        { status: 500 }
      );
    }

    // 1. Get channel metadata + statistics + playlist IDs
    const channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet,contentDetails&id=${channelId}&key=${apiKey}`;
    const channel = await fetch(channelUrl).then((r) => r.json());

    if (!channel.items || channel.items.length === 0) {
      return NextResponse.json(
        { error: "Invalid YouTube channel ID" },
        { status: 404 }
      );
    }

    const uploadsPlaylist =
      channel.items[0].contentDetails.relatedPlaylists.uploads;

    // 2. Get videos in uploads playlist
    const playlistUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${uploadsPlaylist}&maxResults=20&key=${apiKey}`;
    const videos = await fetch(playlistUrl).then((r) => r.json());

    // 3. Extract video IDs
    const videoIds = videos.items
      .map((v: any) => v.contentDetails.videoId)
      .join(",");

    // 4. Get statistics for each video
    const statsUrl = `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIds}&key=${apiKey}`;
    const stats = await fetch(statsUrl).then((r) => r.json());

    return NextResponse.json(
      {
        channel,
        videos,
        stats,
      },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
