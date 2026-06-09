import { test, expect } from '@playwright/test';

const baseUrl = process.env.E2E_BASE_URL ?? 'http://localhost:5173/';

test.describe('Dashboard smoke', () => {
  test.skip(!process.env.E2E_BASE_URL, 'Set E2E_BASE_URL to run this test.');

  test('loads the dashboard shell', async ({ page }) => {
    await page.goto(baseUrl);
    await expect(page.locator('body')).toBeVisible();
  });
});
