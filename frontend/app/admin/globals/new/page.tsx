"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewGlobal(){
  const [key,setKey]=useState(''); const [value,setValue]=useState(''); const [error,setError]=useState(''); const router = useRouter();
  async function handleSubmit(e:React.FormEvent){ e.preventDefault(); setError(''); const token = localStorage.getItem('admin_token'); if(!token) return router.push('/admin/login'); const payload={ key, value }; try{ const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/admin/global-content/`, { method:'POST', headers:{ 'Content-Type':'application/json', Authorization:`Bearer ${token}` }, body: JSON.stringify(payload) }); if(!res.ok){ setError('Create failed'); return; } router.push('/admin/globals'); }catch(e){ setError('Create failed'); } }
  return (<div className="p-6 max-w-lg"><h2 className="text-xl font-bold mb-4">New Global Content</h2><form onSubmit={handleSubmit} className="space-y-4"><div><label className="block text-sm font-medium">Key</label><input value={key} onChange={e=>setKey(e.target.value)} className="mt-1 block w-full rounded border p-2"/></div><div><label className="block text-sm font-medium">Value</label><textarea value={value} onChange={e=>setValue(e.target.value)} className="mt-1 block w-full rounded border p-2 h-24"/></div>{error && <div className="text-red-600">{error}</div>}<div><button className="px-3 py-1 bg-sky-600 text-white rounded">Create</button></div></form></div>);
}
