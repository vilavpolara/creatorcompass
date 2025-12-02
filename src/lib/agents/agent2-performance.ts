export async function performanceAgent(data: any) {
  const views = Number(data.channelStats.viewCount);
  const subs = Number(data.channelStats.subscriberCount);

  if (views > 1000000 && subs > 10000) {
    return {
      status: "growing",
      reason: "Strong growth: High views + growing subscribers",
    };
  }

  return {
    status: "declining",
    reason: "Engagement declining: Below growth thresholds",
  };
}
