"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

type Feature = { text: string; isIncluded: boolean };
type Group = { name: string; features: Feature[] };

export default function EditPricing() {
  const params = useParams();
  const id = (params as any).id;
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('seo');
  const [price, setPrice] = useState(0);
  const [tagline, setTagline] = useState('');
  const [groups, setGroups] = useState<Group[]>([]);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(()=>{
    const token = localStorage.getItem('admin_token'); if(!token) return router.push('/admin/login');
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/admin/pricing/${id}/`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r=> r.json())
      .then(data=>{
        setName(data.name||''); setSlug(data.slug||''); setCategory(data.category||'seo'); setPrice(data.price||0); setTagline(data.tagline||'');
        setGroups((data.feature_groups||[]).map((g:any)=> ({ name: g.name, features: (g.features||[]).map((f:any)=> ({ text: f.text, isIncluded: f.is_included })) })));
      })
      .catch(()=>{})
      .finally(()=> setLoading(false));
  },[id,router]);

  function addGroup(){ setGroups(g => [...g, { name: 'New Group', features: [{ text: '', isIncluded: true }] }]); }
  function removeGroup(i:number){ setGroups(g=> g.filter((_,idx)=>idx!==i)); }
  function addFeature(gi:number){ setGroups(g=> g.map((grp,idx)=> idx===gi? {...grp, features:[...grp.features,{text:'',isIncluded:true}]}:grp)); }
  function updateFeature(gi:number, fi:number, val:Partial<Feature>){ setGroups(g=> g.map((grp,idx)=> idx===gi? {...grp, features: grp.features.map((f,ii)=> ii===fi? {...f,...val}:f)}:grp)); }

  async function handleSubmit(e:React.FormEvent){ e.preventDefault(); setError(''); const token = localStorage.getItem('admin_token'); if(!token) return router.push('/admin/login');
    const payload = { name, slug, category, price, tagline, featureGroups: groups.map(g=> ({ name: g.name, features: g.features })) };
    try{
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/admin/pricing/${id}/`, { method: 'PUT', headers: { 'Content-Type':'application/json', Authorization:`Bearer ${token}` }, body: JSON.stringify(payload) });
      if(!res.ok){ setError('Update failed'); return; }
      router.push('/admin/pricing');
    }catch(e){ setError('Update failed'); }
  }

  if(loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-3xl">
      <h2 className="text-xl font-bold mb-4">Edit Pricing Plan</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input value={name} onChange={e=>setName(e.target.value)} className="mt-1 block w-full rounded border p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">Slug</label>
          <input value={slug} onChange={e=>setSlug(e.target.value)} className="mt-1 block w-full rounded border p-2" />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-sm font-medium">Category</label>
            <select value={category} onChange={e=>setCategory(e.target.value)} className="mt-1 block w-full rounded border p-2">
              <option value="seo">SEO</option>
              <option value="social">Social</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Price</label>
            <input type="number" value={price} onChange={e=>setPrice(Number(e.target.value))} className="mt-1 block w-full rounded border p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Tagline</label>
            <input value={tagline} onChange={e=>setTagline(e.target.value)} className="mt-1 block w-full rounded border p-2" />
          </div>
        </div>

        <div>
          <h3 className="font-semibold">Feature Groups</h3>
          {groups.map((g,gi)=> (
            <div key={gi} className="p-3 border rounded my-2">
              <div className="flex justify-between items-center mb-2">
                <input value={g.name} onChange={e=> setGroups(gs=> gs.map((grp,idx)=> idx===gi? {...grp, name: e.target.value}:grp))} className="border p-1 rounded" />
                <div>
                  <button type="button" onClick={()=>addFeature(gi)} className="mr-2 px-2 py-1 bg-slate-200 rounded">+ Feature</button>
                  <button type="button" onClick={()=>removeGroup(gi)} className="px-2 py-1 bg-red-600 text-white rounded">Remove</button>
                </div>
              </div>
              {g.features.map((f,fi)=> (
                <div key={fi} className="flex items-center gap-2 mb-2">
                  <input value={f.text} onChange={e=> updateFeature(gi,fi,{ text: e.target.value })} className="flex-1 border p-1 rounded" />
                  <label className="flex items-center gap-1"><input type="checkbox" checked={f.isIncluded} onChange={e=> updateFeature(gi,fi,{ isIncluded: e.target.checked })} /> Included</label>
                </div>
              ))}
            </div>
          ))}
          <div>
            <button type="button" onClick={addGroup} className="px-3 py-1 bg-sky-600 text-white rounded">Add Group</button>
          </div>
        </div>

        {error && <div className="text-red-600">{error}</div>}
        <div>
          <button className="px-3 py-1 bg-sky-600 text-white rounded">Save Plan</button>
        </div>
      </form>
    </div>
  );
}
