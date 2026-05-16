"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewMember(){
  const [name,setName]=useState(''); const [role,setRole]=useState(''); const [bio,setBio]=useState(''); const [error,setError]=useState(''); const router = useRouter();
  async function handleSubmit(e:React.FormEvent){ e.preventDefault(); setError(''); const token = localStorage.getItem('admin_token'); if(!token) return router.push('/admin/login');
    const payload = { name, role, bio };
    try{ const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/admin/team/`, { method:'POST', headers:{ 'Content-Type':'application/json', Authorization:`Bearer ${token}` }, body: JSON.stringify(payload) }); if(!res.ok){ setError('Create failed'); return; } router.push('/admin/team'); }catch(e){ setError('Create failed'); }
  }
  return (<div className="p-6 max-w-lg"><h2 className="text-xl font-bold mb-4">New Team Member</h2><form onSubmit={handleSubmit} className="space-y-4"><div><label className="block text-sm font-medium">Name</label><input value={name} onChange={e=>setName(e.target.value)} className="mt-1 block w-full rounded border p-2"/></div><div><label className="block text-sm font-medium">Role</label><input value={role} onChange={e=>setRole(e.target.value)} className="mt-1 block w-full rounded border p-2"/></div><div><label className="block text-sm font-medium">Bio</label><textarea value={bio} onChange={e=>setBio(e.target.value)} className="mt-1 block w-full rounded border p-2"/></div>{error && <div className="text-red-600">{error}</div>}<div><button className="px-3 py-1 bg-sky-600 text-white rounded">Create</button></div></form></div>);
}
