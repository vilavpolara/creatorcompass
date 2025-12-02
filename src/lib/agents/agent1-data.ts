export async function dataCollectorAgent() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/youtube`);
  const yt = await res.json();

  const channelStats = yt.channel.items[0].statistics;

  return {
    summary: "Collected YouTube metrics",
    channelStats,
    videos: yt.videos.items,
    videoStats: yt.stats.items,
  };
}
