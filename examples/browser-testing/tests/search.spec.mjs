import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.beforeEach(async ({ page, browser }, testInfo) => {
  testInfo.annotations.push({ type: 'browser-version', description: browser.version() });
  await page.goto('/');
  await expect(page.locator('meta[name="toolwiki-fixture"]')).toHaveAttribute('content', 'browser-testing-v1');
});

test('search finds a capability and retains the relevant link', async ({ page }) => {
  // A test ID reaches the intentionally unlabeled input in the faulty fixture.
  await page.getByTestId('tool-query').fill('memory');
  await expect(page.locator('#tool-results li:visible')).toHaveCount(1);
  await expect(page.getByRole('link', { name: 'AddressSanitizer', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'AddressSanitizer', exact: true })).toHaveAttribute('href', 'https://zwadhams.github.io/ToolWiki/tools/address-sanitizer/');
  await expect(page.getByRole('status')).toHaveText('1 tool');
  await page.getByTestId('tool-query').fill('MYpy');
  await expect(page.getByRole('link', { name: 'mypy', exact: true })).toBeVisible();
  await expect(page.locator('#tool-results li:visible')).toHaveCount(1);
});

test('initial page has no violations in the selected WCAG rule tags', async ({ page }, testInfo) => {
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
  await testInfo.attach('axe-results', { body: JSON.stringify(results, null, 2), contentType: 'application/json' });
  await testInfo.attach('axe-summary', {
    body: JSON.stringify({
      engine: results.testEngine, environment: results.testEnvironment,
      violationIds: results.violations.map(result => result.id),
      incompleteIds: results.incomplete.map(result => result.id),
      passIds: results.passes.map(result => result.id),
      inapplicableIds: results.inapplicable.map(result => result.id),
    }, null, 2), contentType: 'application/json',
  });
  expect(results.violations, 'Review axe-results and its affected nodes.').toEqual([]);
});
