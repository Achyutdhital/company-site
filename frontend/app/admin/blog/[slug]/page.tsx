"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditPost(){
  const params = useParams(); const slug = (params as any).slug;
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(()=>{ const token = localStorage.getItem('admin_token'); if(!token) return router.push('/admin/login');
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/admin/blog/${slug}/`, { headers: { Authorization:`Bearer ${token}` } }).then(r=> r.json()).then(d=>{ setTitle(d.title||''); setCategory(d.category||''); setExcerpt(d.excerpt||''); setBody(d.body||''); }).catch(()=>{}).finally(()=> setLoading(false)); },[slug,router]);

  async function handleSubmit(e:React.FormEvent){ e.preventDefault(); setError(''); const token = localStorage.getItem('admin_token'); if(!token) return router.push('/admin/login');
    const payload = { title, category, excerpt, body };
    try{ const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/admin/blog/${slug}/`, { method:'PUT', headers: { 'Content-Type':'application/json', Authorization:`Bearer ${token}` }, body: JSON.stringify(payload) }); if(!res.ok){ setError('Update failed'); return; } router.push('/admin/blog'); }catch(e){ setError('Update failed'); }
  }

  if(loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-3xl">
      <h2 className="text-xl font-bold mb-4">Edit Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div><label className="block text-sm font-medium">Title</label><input value={title} onChange={e=>setTitle(e.target.value)} className="mt-1 block w-full rounded border p-2"/></div>
        <div><label className="block text-sm font-medium">Category</label><input value={category} onChange={e=>setCategory(e.target.value)} className="mt-1 block w-full rounded border p-2"/></div>
        <div><label className="block text-sm font-medium">Excerpt</label><textarea value={excerpt} onChange={e=>setExcerpt(e.target.value)} className="mt-1 block w-full rounded border p-2"/></div>
        <div><label className="block text-sm font-medium">Body</label><textarea value={body} onChange={e=>setBody(e.target.value)} className="mt-1 block w-full rounded border p-2 h-48"/></div>
        {error && <div className="text-red-600">{error}</div>}
        <div><button className="px-3 py-1 bg-sky-600 text-white rounded">Save</button></div>
      </form>
    </div>
  );
}
