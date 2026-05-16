"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewClient(){
  const [name, setName] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSubmit(e:React.FormEvent){ e.preventDefault(); setError(''); const token = localStorage.getItem('admin_token'); if(!token) return router.push('/admin/login');
    const payload = { name, logoUrl, websiteUrl };
    try{
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/admin/clients/`, { method: 'POST', headers: { 'Content-Type':'application/json', Authorization:`Bearer ${token}` }, body: JSON.stringify(payload) });
      if(!res.ok){ setError('Create failed'); return; }
      router.push('/admin/clients');
    }catch(e){ setError('Create failed'); }
  }

  return (
    <div className="p-6 max-w-lg">
      <h2 className="text-xl font-bold mb-4">New Client</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input value={name} onChange={e=>setName(e.target.value)} className="mt-1 block w-full rounded border p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">Logo URL</label>
          <input value={logoUrl} onChange={e=>setLogoUrl(e.target.value)} className="mt-1 block w-full rounded border p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">Website URL</label>
          <input value={websiteUrl} onChange={e=>setWebsiteUrl(e.target.value)} className="mt-1 block w-full rounded border p-2" />
        </div>
        {error && <div className="text-red-600">{error}</div>}
        <div>
          <button className="px-3 py-1 bg-sky-600 text-white rounded">Create</button>
        </div>
      </form>
    </div>
  );
}
