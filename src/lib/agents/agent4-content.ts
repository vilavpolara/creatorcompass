import { openai } from "../openai";

export async function contentAgent(trend: any) {
  const prompt = `
You are a YouTube content strategist.

Trend Strategy: ${trend.strategy}
Recommended Trend: ${trend.recommendedTrend}

Write:
1. 3 viral video title ideas
2. A short description for each
3. Best time of day to post
4. Why this trend works right now
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 300,
  });

  return {
    ideas: completion.choices[0].message.content,
    trend,
  };
}
