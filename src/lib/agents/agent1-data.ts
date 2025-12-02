export async function dataCollectorAgent() {
  const base = process.env.NEXT_PUBLIC_SITE_URL!;
  const res = await fetch(`${base}/api/youtube`, {
    cache: "no-store",
});

  const yt = await res.json();

  const channelStats = yt.channel.items[0].statistics;

  return {
    summary: "Collected YouTube metrics",
    channelStats,
    videos: yt.videos.items,
    videoStats: yt.stats.items,
  };
}
