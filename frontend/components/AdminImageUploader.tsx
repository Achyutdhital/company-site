"use client";

import { useState } from "react";
import { apiFetch } from "../lib/adminAuth";

export default function AdminImageUploader({ onComplete }: { onComplete: (url: string) => void }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    const fd = new FormData();
    fd.append('file', file);
    try {
      const res = await apiFetch('/admin/uploads/', { method: 'POST', body: fd });
      if (!res.ok) {
        setError('Upload failed');
        return;
      }
      const data = await res.json();
      onComplete(data.url);
    } catch (err) {
      setError('Upload failed');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFile} />
      {uploading && <div className="text-sm text-slate-500">Uploading...</div>}
      {error && <div className="text-sm text-red-600">{error}</div>}
    </div>
  );
}
