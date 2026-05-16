"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditProject(){
  const params = useParams(); const slug = (params as any).slug;
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(()=>{
    const token = localStorage.getItem('admin_token'); if(!token) return router.push('/admin/login');
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/admin/portfolio/${slug}/`, { headers: { Authorization:`Bearer ${token}` } })
      .then(r=> r.json()).then(d=>{ setTitle(d.title||''); setCategory(d.category||''); setDescription(d.description||''); setLiveUrl(d.live_url||''); }).catch(()=>{}).finally(()=> setLoading(false));
  },[slug,router]);

  async function handleSubmit(e:React.FormEvent){ e.preventDefault(); setError(''); const token = localStorage.getItem('admin_token'); if(!token) return router.push('/admin/login');
    const payload = { title, category, description, live_url: liveUrl };
    try{ const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/admin/portfolio/${slug}/`, { method:'PUT', headers: { 'Content-Type':'application/json', Authorization:`Bearer ${token}` }, body: JSON.stringify(payload) }); if(!res.ok){ setError('Update failed'); return; } router.push('/admin/projects'); }catch(e){ setError('Update failed'); }
  }

  if(loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-2xl">
      <h2 className="text-xl font-bold mb-4">Edit Project</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div><label className="block text-sm font-medium">Title</label><input value={title} onChange={e=>setTitle(e.target.value)} className="mt-1 block w-full rounded border p-2"/></div>
        <div><label className="block text-sm font-medium">Category</label><input value={category} onChange={e=>setCategory(e.target.value)} className="mt-1 block w-full rounded border p-2"/></div>
        <div><label className="block text-sm font-medium">Description</label><textarea value={description} onChange={e=>setDescription(e.target.value)} className="mt-1 block w-full rounded border p-2"/></div>
        <div><label className="block text-sm font-medium">Live URL</label><input value={liveUrl} onChange={e=>setLiveUrl(e.target.value)} className="mt-1 block w-full rounded border p-2"/></div>
        {error && <div className="text-red-600">{error}</div>}
        <div><button className="px-3 py-1 bg-sky-600 text-white rounded">Save</button></div>
      </form>
    </div>
  );
}
