export async function trendAgent(performance: any) {
  if (performance.status === "growing") {
    return {
      strategy: "double-down",
      recommendedTrend: "Tech Tutorials & Deep Dives",
      message: "Your channel is growing — lean into longer content.",
    };
  }

  return {
    strategy: "recovery",
    recommendedTrend: "Short-Form Viral Clips",
    message: "Growth slowed — test short-form viral content.",
  };
}
