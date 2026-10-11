// UI contract test; mocked API responses do not certify hosted authentication.
const assert = require('node:assert/strict');
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ executablePath: '/usr/bin/chromium', headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    const requests = [];
    let release;
    const pending = new Promise(resolve => { release = resolve; });
    let unavailable = false;
    await page.route('**/api/**', async route => {
      const path = new URL(route.request().url()).pathname;
      if (unavailable) return route.fulfill({ status: 503, json: { error: { message: 'Synthetic outage' } } });
      if (path.endsWith('/recovery-cases') && route.request().method() === 'POST') {
        requests.push(route.request().postDataJSON());
        await pending;
        return route.fulfill({ status: 201, json: { case: {} } });
      }
      const payload = path.endsWith('/passports') ? { passports: ['first', 'second'].map(id => ({ id, bookingId: `order-${id}`, status: 'under_review', version: 1 })) }
        : path.endsWith('/notification-preferences') ? { preference: { inAppEnabled: true, version: 1 } }
        : { cases: [], updates: [] };
      await route.fulfill({ json: payload });
    });
    await page.goto('http://localhost:5173/support');
    const select = page.getByLabel('Recovery Reservation Passport');
    await select.waitFor();
    const submit = page.getByRole('button', { name: 'Submit synthetic recovery' });
    await submit.click();
    await page.getByRole('status').filter({ hasText: 'Select the synthetic' }).waitFor();
    assert.equal(requests.length, 0);
    await select.selectOption('second');
    await submit.click();
    await page.waitForFunction(() => document.querySelector('[role=status]')?.textContent.includes('Submitting'));
    await submit.click();
    release();
    await page.getByRole('status').filter({ hasText: 'submitted for operations' }).waitFor();
    assert.equal(requests.length, 1);
    assert.equal(requests[0].passportId, 'second');
    for (const width of [320, 390, 768, 1280]) {
      await page.setViewportSize({ width, height: 900 });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    }
    await page.screenshot({ path: '/workspace/stayrelay-recovery-selection.png', fullPage: true });
    unavailable = true;
    await page.getByRole('button', { name: 'Refresh case updates' }).click();
    await page.getByRole('button', { name: 'Retry support service' }).waitFor();
    assert.equal(await select.count(), 0);
    console.log('PASS: explicit selection, no default write, duplicate guard, failed-refresh clearing, four viewport widths');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
