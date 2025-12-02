"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/src/lib/supabaseClient";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) router.push("/auth/login");
      else setUser(data.user);
    });
  }, []);

  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      
      {/* SIDEBAR */}
      <aside className="w-64 p-6 bg-white dark:bg-gray-800 shadow-xl">
        <h2 className="text-3xl font-bold mb-10 dark:text-white">🧭 CreatorCompass</h2>

        <nav className="space-y-4 text-lg dark:text-white">
          <Link href="/dashboard" className="block hover:text-blue-600">📊 Dashboard</Link>
          <Link href="/videos" className="block hover:text-blue-600">🎬 Videos</Link>
          <Link href="/drafts" className="block hover:text-blue-600">📝 Drafts</Link>
          <Link href="/insights" className="block hover:text-blue-600">🤖 Insights</Link>
          <Link href="/calendar" className="block hover:text-blue-600">📆 Calendar</Link>
        </nav>

        <button
          onClick={async () => {
            await supabase.auth.signOut();
            router.push("/auth/login");
          }}
          className="mt-10 px-4 py-2 bg-red-600 text-white rounded-lg w-full"
        >
          Logout
        </button>
      </aside>

      <main className="flex-1 p-10 dark:text-white">{children}</main>
    </div>
  );
}
