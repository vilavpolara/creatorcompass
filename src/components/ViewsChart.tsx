"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function ViewsChart({ data }: { data: any[] }) {
  return (
    <LineChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="4 4" stroke="#ccc" />
      <XAxis dataKey="day" tick={{ fill: "#888" }} />
      <YAxis tick={{ fill: "#888" }} />
      <Tooltip />
      <Line
        type="monotone"
        dataKey="views"
        stroke="#6366f1"
        strokeWidth={3}
        dot={false}
      />
    </LineChart>
  );
}
