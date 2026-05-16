"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Service = {
  id: number;
  name: string;
  slug: string;
  short_description?: string;
};

export default function AdminIndex() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.push("/admin/login");
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/services/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => setServices(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [router]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="mb-4">
        <button
          onClick={() => router.push("/admin/login")}
          className="px-3 py-1 rounded bg-slate-200"
        >
          Refresh Token / Re-login
        </button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="space-y-3">
          {services.length === 0 && <div>No services found.</div>}
          {services.map((s) => (
            <div key={s.id} className="p-3 border rounded flex justify-between items-center">
              <div>
                <div className="font-semibold">{s.name}</div>
                <div className="text-sm text-slate-500">{s.short_description}</div>
              </div>
              <div>
                <button className="mr-2 px-2 py-1 bg-sky-600 text-white rounded">Edit</button>
                <button className="px-2 py-1 bg-red-600 text-white rounded">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
