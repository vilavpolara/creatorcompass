"use client";

import { useState } from "react";
import GradientHeader from "@/components/GradientHeader";
import Card from "@/components/card";
import FadeIn from "@/components/FadeIn";

export default function InsightsPage() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function runWorkflow() {
    setLoading(true);
    const res = await fetch("/api/run-workflow", { method: "POST" });
    const json = await res.json();
    setResult(json);
    setLoading(false);
  }

  return (
    <FadeIn>
      <GradientHeader title="AI Insights" />

      <button
        onClick={runWorkflow}
        className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:opacity-80 transition"
      >
        Run Daily Analysis
      </button>

      {loading && <p className="mt-4">Running AI pipeline...</p>}

      {result && (
        <Card className="mt-6">
          <pre className="whitespace-pre-wrap text-sm">
            {JSON.stringify(result, null, 2)}
          </pre>
        </Card>
      )}
    </FadeIn>
  );
}
