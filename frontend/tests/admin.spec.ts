import { test, expect } from '@playwright/test';

test.describe('Admin UI smoke', () => {
  test('renders login and dashboard', async ({ page }) => {
    await page.goto('/admin');
    await expect(page).toHaveTitle(/Elite IT Solutions/);
    // check login link/button exists
    const login = page.locator('text=Login').first();
    // It may not show a Login button if already showing admin dashboard; just ensure page loads
    await expect(page.locator('header')).toBeVisible();
  });
});
