"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup() {
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">

      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl p-10 shadow-xl">
        <h1 className="text-4xl font-bold text-center mb-8 dark:text-white">
          Create Account
        </h1>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-4 border rounded-lg mb-4 dark:bg-gray-700 dark:text-white"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-4 border rounded-lg mb-6 dark:bg-gray-700 dark:text-white"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-xl hover:opacity-80 transition"
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>

        <p className="text-center mt-6 dark:text-gray-300">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-blue-600">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
