"use client";

import { useState } from "react";
import { marked } from "marked";

export default function MarkdownEditor({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [preview, setPreview] = useState(false);

  return (
    <div>
      <div className="mb-2">
        <button type="button" onClick={() => setPreview(p => !p)} className="px-2 py-1 bg-slate-200 rounded">{preview ? 'Edit' : 'Preview'}</button>
      </div>
      {preview ? (
        <div className="prose max-w-none p-2 border rounded" dangerouslySetInnerHTML={{ __html: marked.parse(value || '') }} />
      ) : (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} className="w-full p-2 border rounded h-52" />
      )}
    </div>
  );
}
