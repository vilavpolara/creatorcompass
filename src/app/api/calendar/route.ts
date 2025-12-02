import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseClient";
import { openai } from "@/lib/openai";

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("calendar")
    .select("*")
    .order("day");

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const { item, day } = await req.json();

  const { data, error } = await supabaseAdmin.from("calendar").insert([
    {
      item,
      day,
      user_id: "demo",
    },
  ]);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data);
}

export async function PUT(req: Request) {
  const { id, day, item } = await req.json();

  const updates: any = {};
  if (day !== undefined) updates.day = day;
  if (item !== undefined) updates.item = item;

  const { data, error } = await supabaseAdmin
    .from("calendar")
    .update(updates)
    .eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();

  const { error } = await supabaseAdmin
    .from("calendar")
    .delete()
    .eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}

/* OPTIONAL BONUS: AI IDEA GENERATOR */
export async function PATCH() {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content:
          "Generate 5 YouTube content ideas with short titles only (max 7 words). Return just the titles.",
      },
    ],
    max_tokens: 70,
  });

  const ideas = completion.choices[0].message.content
    ?.split("\n")
    .filter(Boolean)
    .map((str) => str.replace(/^\d+\.\s*/, ""));

  return NextResponse.json(ideas);
}
