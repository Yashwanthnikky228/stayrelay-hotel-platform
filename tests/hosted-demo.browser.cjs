// Browser verification through the environment's TLS-validating HTTPS proxy.
// Chromium itself does not trust that proxy CA; curl retains TLS verification.
const { chromium } = require('playwright');
const { execFileSync } = require('node:child_process');
const { mkdtempSync, readFileSync, rmSync } = require('node:fs');
const { tmpdir } = require('node:os');
const { join } = require('node:path');
const assert = require('node:assert/strict');

(async () => {
  const origin = 'https://stayrelay-hotel-platform.vercel.app';
  const root = mkdtempSync(join(tmpdir(), 'stayrelay-hosted-check-'));
  const browser = await chromium.launch({ executablePath: '/usr/bin/chromium', headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    let count = 0;
    await page.route('**/*', async route => {
      const url = route.request().url();
      if (new URL(url).origin !== origin) return route.abort();
      const file = join(root, String(count++));
      const output = execFileSync('curl', ['-sS', '--max-time', '20', '-o', file, '-w', '%{http_code} %{content_type}', url], { encoding: 'utf8' });
      const [status, ...type] = output.split(' ');
      await route.fulfill({ status: Number(status), contentType: type.join(' '), body: readFileSync(file) });
    });
    await page.goto(origin);
    await page.getByRole('heading', { name: 'A change of plans. A new place to stay.', exact: true }).waitFor();
    await page.screenshot({ path: '/workspace/stayrelay-live-desktop.png', fullPage: true });
    await page.getByRole('button', { name: 'Mumbai', exact: true }).click();
    assert.match(await page.getByRole('heading', { level: 1 }).textContent(), /Mumbai/);
    await page.getByRole('link', { name: 'View stay details' }).first().click();
    await page.waitForURL('**/properties/**');
    for (const path of ['/account', '/passport', '/support', '/operations']) {
      const response = await page.goto(origin + path);
      assert.equal(response.status(), 200);
      await page.getByRole('heading', { level: 1 }).waitFor();
    }
    await page.goto(origin);
    await page.getByRole('heading', { level: 1 }).waitFor();
    for (const width of [320, 390, 768, 1280]) {
      await page.setViewportSize({ width, height: 844 });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await page.getByText('Menu', { exact: true }).click();
    await page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: 'Support', exact: true }).waitFor();
    await page.screenshot({ path: '/workspace/stayrelay-live-mobile.png', fullPage: true });
    console.log('PASS public homepage, city selection, property details, portal shells, four widths and mobile navigation');
  } finally {
    await browser.close();
    rmSync(root, { recursive: true, force: true });
  }
})().catch(error => { console.error(error.message); process.exitCode = 1; });
