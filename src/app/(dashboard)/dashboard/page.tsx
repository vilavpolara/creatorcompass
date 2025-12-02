"use client";

import { useEffect, useState } from "react";
import GradientHeader from "@/components/GradientHeader";
import Card from "@/components/card";
import FadeIn from "@/components/FadeIn";
import ViewsChart from "@/components/ViewsChart";

export default function Dashboard() {
  const [yt, setYt] = useState<any>(null);

  useEffect(() => {
    fetch("/api/youtube")
      .then(res => res.json())
      .then(setYt);
  }, []);

  if (!yt) return <p>Loading YouTube data...</p>;

  const stats = yt.channel.items[0].statistics;

  const chartData = [
    { day: "Mon", views: 220 },
    { day: "Tue", views: 375 },
    { day: "Wed", views: 500 },
    { day: "Thu", views: 300 },
    { day: "Fri", views: 650 },
  ];

  return (
    <FadeIn>
      <GradientHeader title="Dashboard" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <h2 className="text-xl">Subscribers</h2>
          <p className="text-3xl font-bold mt-2">{stats.subscriberCount}</p>
        </Card>

        <Card>
          <h2 className="text-xl">Total Views</h2>
          <p className="text-3xl font-bold mt-2">{stats.viewCount}</p>
        </Card>

        <Card>
          <h2 className="text-xl">Videos Published</h2>
          <p className="text-3xl font-bold mt-2">{stats.videoCount}</p>
        </Card>
      </div>

      <Card className="mt-10">
        <h2 className="text-2xl mb-5">Weekly View Trends</h2>
        <ViewsChart data={chartData} />
      </Card>
    </FadeIn>
  );
}
