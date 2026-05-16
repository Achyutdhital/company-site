export async function apiFetch(path: string, options: RequestInit = {}) {
  const base = process.env.NEXT_PUBLIC_API_BASE || '';
  const token = localStorage.getItem('admin_token');
  const headers: any = options.headers ? { ...options.headers } : {};
  if (token) headers['Authorization'] = `Bearer ${token}`;

  let res = await fetch(base + path, { ...options, headers });

  if (res.status === 401) {
    // try cookie-based refresh
    const r = await fetch(base + '/auth/refresh/', { method: 'POST' });
    if (r.ok) {
      const data = await r.json();
      localStorage.setItem('admin_token', data.access);
      headers['Authorization'] = `Bearer ${data.access}`;
      res = await fetch(base + path, { ...options, headers });
    }
  }

  return res;
}
