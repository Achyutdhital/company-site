"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminSettings() {
  const [loading, setLoading] = useState(true);
  const [companyName, setCompanyName] = useState('');
  const [tagline, setTagline] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(()=>{
    const token = localStorage.getItem('admin_token'); if(!token) return router.push('/admin/login');
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/admin/settings/`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r=> r.json())
      .then(data=>{
        setCompanyName(data.companyName||''); setTagline(data.tagline||''); setEmail(data.email||''); setPhone(data.phone||'');
      })
      .catch(()=>{})
      .finally(()=> setLoading(false));
  },[router]);

  async function handleSubmit(e:React.FormEvent){ e.preventDefault(); setMessage(''); const token = localStorage.getItem('admin_token'); if(!token) return router.push('/admin/login');
    const payload = { companyName, tagline, email, phone };
    try{
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/admin/settings/`, { method: 'PUT', headers: { 'Content-Type':'application/json', Authorization:`Bearer ${token}` }, body: JSON.stringify(payload) });
      if(!res.ok){ setMessage('Update failed'); return; }
      setMessage('Saved');
    }catch(e){ setMessage('Update failed'); }
  }

  if(loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-2xl">
      <h2 className="text-xl font-bold mb-4">Site Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Company Name</label>
          <input value={companyName} onChange={e=>setCompanyName(e.target.value)} className="mt-1 block w-full rounded border p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">Tagline</label>
          <input value={tagline} onChange={e=>setTagline(e.target.value)} className="mt-1 block w-full rounded border p-2" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input value={email} onChange={e=>setEmail(e.target.value)} className="mt-1 block w-full rounded border p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Phone</label>
            <input value={phone} onChange={e=>setPhone(e.target.value)} className="mt-1 block w-full rounded border p-2" />
          </div>
        </div>
        {message && <div className="text-sm text-slate-600">{message}</div>}
        <div>
          <button className="px-3 py-1 bg-sky-600 text-white rounded">Save Settings</button>
        </div>
      </form>
    </div>
  );
}
