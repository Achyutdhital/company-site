"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/auth/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        setError("Invalid credentials");
        return;
      }

      const data = await res.json();
      // access token returned; refresh saved as httpOnly cookie
      localStorage.setItem("admin_token", data.access);
      router.push("/admin");
    } catch (err) {
      setError("Login failed");
    }
  }

  return (
    <div className="max-w-md mx-auto mt-24 p-6 bg-white dark:bg-slate-800 rounded-md shadow">
      <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full rounded border-gray-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900 p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full rounded border-gray-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900 p-2"
          />
        </div>
        {error && <div className="text-sm text-red-600">{error}</div>}
        <button className="w-full bg-sky-600 text-white p-2 rounded">Sign in</button>
      </form>
    </div>
  );
}
