"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditGlobal(){
  const params = useParams(); const id = (params as any).id; const [loading,setLoading]=useState(true); const [key,setKey]=useState(''); const [value,setValue]=useState(''); const [error,setError]=useState(''); const router = useRouter();
  useEffect(()=>{ const token = localStorage.getItem('admin_token'); if(!token) return router.push('/admin/login'); fetch(`${process.env.NEXT_PUBLIC_API_BASE}/admin/global-content/${id}/`, { headers:{ Authorization:`Bearer ${token}` } }).then(r=> r.json()).then(d=>{ setKey(d.key||''); setValue(d.value||''); }).catch(()=>{}).finally(()=> setLoading(false)); },[id,router]);
  async function handleSubmit(e:React.FormEvent){ e.preventDefault(); setError(''); const token = localStorage.getItem('admin_token'); if(!token) return router.push('/admin/login'); const payload={ key, value }; try{ const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/admin/global-content/${id}/`, { method:'PUT', headers:{ 'Content-Type':'application/json', Authorization:`Bearer ${token}` }, body: JSON.stringify(payload) }); if(!res.ok){ setError('Update failed'); return; } router.push('/admin/globals'); }catch(e){ setError('Update failed'); } }
  if(loading) return <div className="p-6">Loading...</div>;
  return (<div className="p-6 max-w-lg"><h2 className="text-xl font-bold mb-4">Edit Global Content</h2><form onSubmit={handleSubmit} className="space-y-4"><div><label className="block text-sm font-medium">Key</label><input value={key} onChange={e=>setKey(e.target.value)} className="mt-1 block w-full rounded border p-2"/></div><div><label className="block text-sm font-medium">Value</label><textarea value={value} onChange={e=>setValue(e.target.value)} className="mt-1 block w-full rounded border p-2 h-24"/></div>{error && <div className="text-red-600">{error}</div>}<div><button className="px-3 py-1 bg-sky-600 text-white rounded">Save</button></div></form></div>);
}
