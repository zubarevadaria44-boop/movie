"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid username or password");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-[#1B1E2A] border border-[#2A2E3E] rounded-sm p-8"
      >
        <h1 className="font-display text-3xl text-[#E8A33D] mb-6">Admin Login </h1>

        <label className="block text-sm text-[#8B90A0] mb-1">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full bg-[#12141C] border border-[#2A2E3E] rounded-sm px-3 py-2 mb-4 outline-none focus:border-[#E8A33D]"
        />

        <label className="block text-sm text-[#8B90A0] mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full bg-[#12141C] border border-[#2A2E3E] rounded-sm px-3 py-2 mb-4 outline-none focus:border-[#E8A33D]"
        />

        {error && <p className="text-[#B33A3A] text-sm mb-4">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#E8A33D] text-[#12141C] font-bold py-2 rounded-sm hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </main>
  );
}