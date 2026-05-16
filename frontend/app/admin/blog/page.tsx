"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminBlog(){
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(()=>{
    const token = localStorage.getItem('admin_token'); if(!token) return router.push('/admin/login');
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/admin/blog/`, { headers: { Authorization:`Bearer ${token}` } })
      .then(r=> r.json()).then(d=> setItems(d)).catch(()=>{}).finally(()=> setLoading(false));
  },[router]);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Blog Posts</h2>
        <button onClick={()=> router.push('/admin/blog/new')} className="px-3 py-1 bg-sky-600 text-white rounded">New Post</button>
      </div>
      {loading ? <div>Loading...</div> : (
        <div className="space-y-3">{items.map(it=> (
          <div key={it.id||it.slug} className="p-3 border rounded flex justify-between items-center">
            <div>
              <div className="font-semibold">{it.title}</div>
              <div className="text-sm text-slate-500">{it.category}</div>
            </div>
            <div>
              <button onClick={()=> router.push(`/admin/blog/${it.slug}`)} className="px-2 py-1 bg-slate-200 rounded">Edit</button>
            </div>
          </div>))}</div>
      )}
    </div>
  );
}
