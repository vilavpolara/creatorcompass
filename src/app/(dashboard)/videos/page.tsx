"use client";

import { useEffect, useState } from "react";
import GradientHeader from "@/components/GradientHeader";
import FadeIn from "@/components/FadeIn";
import VideoTable from "@/components/VideoTable";

export default function VideosPage() {
  const [yt, setYt] = useState<any>(null);

  useEffect(() => {
    fetch("/api/youtube")
      .then(res => res.json())
      .then(setYt);
  }, []);

  if (!yt) return <p>Loading videos...</p>;

  return (
    <FadeIn>
      <GradientHeader title="Your Videos" />

      <VideoTable videos={yt.videos.items} stats={yt.stats.items} />
    </FadeIn>
  );
}
