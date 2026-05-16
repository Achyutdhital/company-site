"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditService() {
  const params = useParams();
  const slug = (params as any).slug;
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) return router.push('/admin/login');

    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/admin/services/${slug}/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => {
        setName(data.name || '');
        setShortDescription(data.short_description || '');
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [router, slug]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const token = localStorage.getItem("admin_token");
    if (!token) return router.push('/admin/login');

    const fd = new FormData();
    fd.append('name', name);
    fd.append('short_description', shortDescription);
    if (file) fd.append('thumbnail', file);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/admin/services/${slug}/`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });

      if (!res.ok) {
        setError('Update failed');
        return;
      }

      router.push('/admin/services');
    } catch (err) {
      setError('Update failed');
    }
  }

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-xl">
      <h2 className="text-xl font-bold mb-4">Edit Service</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full rounded border p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">Short description</label>
          <textarea value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} className="mt-1 block w-full rounded border p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">Thumbnail (upload to replace)</label>
          <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} />
        </div>
        {error && <div className="text-red-600">{error}</div>}
        <div>
          <button className="px-3 py-1 bg-sky-600 text-white rounded">Save</button>
        </div>
      </form>
    </div>
  );
}
