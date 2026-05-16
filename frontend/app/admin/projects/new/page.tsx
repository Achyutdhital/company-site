"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewProject(){
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSubmit(e:React.FormEvent){ e.preventDefault(); setError(''); const token = localStorage.getItem('admin_token'); if(!token) return router.push('/admin/login');
    const payload = { title, slug, category, description, live_url: liveUrl };
    try{ const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/admin/portfolio/`, { method:'POST', headers: { 'Content-Type':'application/json', Authorization:`Bearer ${token}` }, body: JSON.stringify(payload) }); if(!res.ok){ setError('Create failed'); return; } router.push('/admin/projects'); }catch(e){ setError('Create failed'); }
  }

  return (
    <div className="p-6 max-w-2xl">
      <h2 className="text-xl font-bold mb-4">New Project</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div><label className="block text-sm font-medium">Title</label><input value={title} onChange={e=>setTitle(e.target.value)} className="mt-1 block w-full rounded border p-2"/></div>
        <div><label className="block text-sm font-medium">Slug</label><input value={slug} onChange={e=>setSlug(e.target.value)} className="mt-1 block w-full rounded border p-2"/></div>
        <div><label className="block text-sm font-medium">Category</label><input value={category} onChange={e=>setCategory(e.target.value)} className="mt-1 block w-full rounded border p-2"/></div>
        <div><label className="block text-sm font-medium">Description</label><textarea value={description} onChange={e=>setDescription(e.target.value)} className="mt-1 block w-full rounded border p-2"/></div>
        <div><label className="block text-sm font-medium">Live URL</label><input value={liveUrl} onChange={e=>setLiveUrl(e.target.value)} className="mt-1 block w-full rounded border p-2"/></div>
        {error && <div className="text-red-600">{error}</div>}
        <div><button className="px-3 py-1 bg-sky-600 text-white rounded">Create</button></div>
      </form>
    </div>
  );
}
