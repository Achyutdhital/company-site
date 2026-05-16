"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewService() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const token = localStorage.getItem("admin_token");
    if (!token) return router.push('/admin/login');

    const fd = new FormData();
    fd.append('name', name);
    fd.append('slug', slug);
    fd.append('short_description', shortDescription);
    if (file) fd.append('thumbnail', file);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/admin/services/`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });

      if (!res.ok) {
        setError('Create failed');
        return;
      }

      router.push('/admin/services');
    } catch (err) {
      setError('Create failed');
    }
  }

  return (
    <div className="p-6 max-w-xl">
      <h2 className="text-xl font-bold mb-4">New Service</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full rounded border p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">Slug</label>
          <input value={slug} onChange={(e) => setSlug(e.target.value)} className="mt-1 block w-full rounded border p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">Short description</label>
          <textarea value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} className="mt-1 block w-full rounded border p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">Thumbnail</label>
          <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} />
        </div>
        {error && <div className="text-red-600">{error}</div>}
        <div>
          <button className="px-3 py-1 bg-sky-600 text-white rounded">Create</button>
        </div>
      </form>
    </div>
  );
}
