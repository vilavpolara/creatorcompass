import { NextResponse } from "next/server";
import { dataCollectorAgent } from "@/lib/agents/agent1-data";
import { performanceAgent } from "@/lib/agents/agent2-performance";
import { trendAgent } from "@/lib/agents/agent3-trends";
import { contentAgent } from "@/lib/agents/agent4-content";
import { supabaseAdmin } from "@/lib/supabaseClient";

export async function POST() {
  try {
    // Step 1: Collect data from YouTube
    const step1 = await dataCollectorAgent();

    // Step 2: Analyze performance with branching
    const step2 = await performanceAgent(step1);

    // Step 3: Predict trends based on performance
    const step3 = await trendAgent(step2);

    // Step 4: Generate content using OpenAI
    const step4 = await contentAgent(step3);

    // Save to Supabase (history)
    await supabaseAdmin.from("reports").insert({
      user_id: "demo", // Replace with auth.user once auth is added
      report: step4,
    });

    return NextResponse.json(
      {
        message: "AI workflow executed successfully",
        step1,
        step2,
        step3,
        step4,
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
