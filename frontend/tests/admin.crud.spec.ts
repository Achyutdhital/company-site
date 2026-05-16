import { test, expect } from '@playwright/test';

test('admin API create and list service (API-only)', async ({ request }) => {
  const loginResp = await request.post('http://127.0.0.1:8000/api/v1/auth/login/', {
    data: { username: 'admin', password: 'password' }
  });
  expect(loginResp.ok()).toBeTruthy();
  const loginJson = await loginResp.json();
  const access = loginJson.access;

  const servicePayload = {
    name: 'E2E Service API',
    slug: 'e2e-service-api',
    short_description: 'e2e short',
    full_description: 'e2e full',
    meta_description: 'e2e meta',
    order: 1001
  };

  const createResp = await request.post('http://127.0.0.1:8000/api/v1/admin/services/', {
    data: servicePayload,
    headers: { Authorization: `Bearer ${access}` }
  });
  expect(createResp.status()).toBe(201);

  const listResp = await request.get('http://127.0.0.1:8000/api/v1/services/');
  expect(listResp.ok()).toBeTruthy();
  const json = await listResp.json();
  const found = json.results.some((s: any) => s.slug === servicePayload.slug);
  expect(found).toBeTruthy();
});
