"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditMember(){
  const params = useParams(); const id = (params as any).id;
  const [loading, setLoading] = useState(true); const [name,setName]=useState(''); const [role,setRole]=useState(''); const [bio,setBio]=useState(''); const [error,setError]=useState(''); const router = useRouter();
  useEffect(()=>{ const token = localStorage.getItem('admin_token'); if(!token) return router.push('/admin/login'); fetch(`${process.env.NEXT_PUBLIC_API_BASE}/admin/team/${id}/`, { headers:{ Authorization:`Bearer ${token}` } }).then(r=> r.json()).then(d=>{ setName(d.name||''); setRole(d.role||''); setBio(d.bio||''); }).catch(()=>{}).finally(()=> setLoading(false)); },[id,router]);
  async function handleSubmit(e:React.FormEvent){ e.preventDefault(); setError(''); const token = localStorage.getItem('admin_token'); if(!token) return router.push('/admin/login'); const payload={name,role,bio}; try{ const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/admin/team/${id}/`, { method:'PUT', headers:{ 'Content-Type':'application/json', Authorization:`Bearer ${token}` }, body: JSON.stringify(payload) }); if(!res.ok){ setError('Update failed'); return; } router.push('/admin/team'); }catch(e){ setError('Update failed'); } }
  if(loading) return <div className="p-6">Loading...</div>;
  return (<div className="p-6 max-w-lg"><h2 className="text-xl font-bold mb-4">Edit Team Member</h2><form onSubmit={handleSubmit} className="space-y-4"><div><label className="block text-sm font-medium">Name</label><input value={name} onChange={e=>setName(e.target.value)} className="mt-1 block w-full rounded border p-2"/></div><div><label className="block text-sm font-medium">Role</label><input value={role} onChange={e=>setRole(e.target.value)} className="mt-1 block w-full rounded border p-2"/></div><div><label className="block text-sm font-medium">Bio</label><textarea value={bio} onChange={e=>setBio(e.target.value)} className="mt-1 block w-full rounded border p-2"/></div>{error && <div className="text-red-600">{error}</div>}<div><button className="px-3 py-1 bg-sky-600 text-white rounded">Save</button></div></form></div>);
}
