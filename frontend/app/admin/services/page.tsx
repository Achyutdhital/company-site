"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Service = { id: number; name: string; slug: string; short_description?: string };

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) return router.push("/admin/login");

    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/admin/services/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => setServices(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [router]);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Services</h2>
        <button onClick={() => router.push('/admin/services/new')} className="px-3 py-1 bg-sky-600 text-white rounded">New Service</button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="space-y-3">
          {services.map((s) => (
            <div key={s.id} className="p-3 border rounded flex justify-between items-center">
              <div>
                <div className="font-semibold">{s.name}</div>
                <div className="text-sm text-slate-500">{s.short_description}</div>
              </div>
              <div>
                <button onClick={() => router.push(`/admin/services/${s.slug}`)} className="mr-2 px-2 py-1 bg-slate-200 rounded">Edit</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
