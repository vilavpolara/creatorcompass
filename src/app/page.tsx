"use client";

import Link from "next/link";
import FadeIn from "@/components/FadeIn";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-white transition-colors duration-300">

      {/* HERO SECTION */}
      <section className="text-center py-32 px-6 bg-linear-to-r from-blue-600 to-purple-600 text-white">
        <FadeIn>
          <h1 className="text-6xl font-extrabold mb-6 drop-shadow-xl">
            CreatorCompass
          </h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            Your AI-powered YouTube creator dashboard.  
            Analyze performance, plan content, and grow faster — intelligently.
          </p>

          <div className="mt-10 flex justify-center gap-6">
            <Link
              href="/auth/signup"
              className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl shadow-lg hover:opacity-80 transition"
            >
              Get Started
            </Link>

            <Link
              href="/dashboard"
              className="px-8 py-4 bg-gray-900 text-white font-semibold rounded-xl shadow-lg hover:opacity-80 transition"
            >
              Dashboard
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <FadeIn>
          <h2 className="text-4xl font-bold text-center mb-16">
            Powerful Features Built for Creators
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <Feature
              title="📊 AI Analytics"
              description="Agentic workflows that analyze performance, detect trends, and recommend what to post."
            />
            <Feature
              title="🎬 YouTube Integration"
              description="Real-time channel stats, video performance data, and auto-generated insights."
            />
            <Feature
              title="📆 Content Calendar"
              description="Drag-and-drop planning with AI idea generation and Supabase data storage."
            />
          </div>
        </FadeIn>
      </section>

      {/* SCREENSHOTS SECTION */}
      <section className="py-24 bg-gray-100 dark:bg-gray-800">
        <FadeIn>
          <h2 className="text-4xl font-bold text-center mb-16">
            A Glimpse Inside the Dashboard
          </h2>

          <div className="max-w-4xl mx-auto space-y-10">
            <ScreenshotCard title="Dashboard View" />
            <ScreenshotCard title="Video Performance" />
            <ScreenshotCard title="AI Insights" />
            <ScreenshotCard title="Content Calendar" />
          </div>
        </FadeIn>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 text-center">
        <FadeIn>
          <h2 className="text-4xl font-bold mb-6">Ready to Grow Faster?</h2>
          <p className="text-lg max-w-xl mx-auto mb-10 opacity-80">
            Join a new wave of YouTube creators using AI to automate insights, boost performance, and plan better content.
          </p>

          <Link
            href="/auth/signup"
            className="px-10 py-4 bg-blue-600 text-white rounded-xl shadow-lg text-xl hover:opacity-80 transition"
          >
            Start for Free
          </Link>
        </FadeIn>
      </section>

      {/* FOOTER */}
      <footer className="py-10 bg-gray-900 text-center text-white opacity-80">
        <p>CreatorCompass © {new Date().getFullYear()} — Built with ❤️</p>
      </footer>

    </div>
  );
}

/* COMPONENTS */

function Feature({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-xl transition">
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      <p className="opacity-75">{description}</p>
    </div>
  );
}

function ScreenshotCard({ title }: { title: string }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div className="w-full h-64 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
    </div>
  );
}
