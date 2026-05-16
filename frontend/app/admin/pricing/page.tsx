"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Plan = { id: number; name: string; slug: string; price: number; category: string };

export default function AdminPricingList() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) return router.push('/admin/login');

    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/admin/pricing/`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((data) => setPlans(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [router]);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Pricing Plans</h2>
        <button onClick={() => router.push('/admin/pricing/new')} className="px-3 py-1 bg-sky-600 text-white rounded">New Plan</button>
      </div>
      {loading ? <div>Loading...</div> : (
        <div className="space-y-3">
          {plans.map(p => (
            <div key={p.id} className="p-3 border rounded flex justify-between items-center">
              <div>
                <div className="font-semibold">{p.name} — {p.category}</div>
                <div className="text-sm text-slate-500">${p.price}</div>
              </div>
              <div>
                <button onClick={() => router.push(`/admin/pricing/${p.id}`)} className="px-2 py-1 bg-slate-200 rounded">Edit</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
