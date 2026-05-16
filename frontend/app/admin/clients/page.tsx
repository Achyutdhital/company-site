"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Client = { id:number; name:string; logoUrl:string; websiteUrl:string }

export default function AdminClients(){
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(()=>{
    const token = localStorage.getItem('admin_token'); if(!token) return router.push('/admin/login');
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/admin/clients/`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r=> r.json())
      .then(data=> setClients(data))
      .catch(()=>{})
      .finally(()=> setLoading(false));
  },[router]);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Clients</h2>
        <button onClick={()=> router.push('/admin/clients/new')} className="px-3 py-1 bg-sky-600 text-white rounded">New Client</button>
      </div>
      {loading ? <div>Loading...</div> : (
        <div className="space-y-3">
          {clients.map(c=> (
            <div key={c.id} className="p-3 border rounded flex justify-between items-center">
              <div>
                <div className="font-semibold">{c.name}</div>
                <div className="text-sm text-slate-500">{c.websiteUrl}</div>
              </div>
              <div>
                <button onClick={()=> router.push(`/admin/clients/${c.id}`)} className="px-2 py-1 bg-slate-200 rounded">Edit</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
