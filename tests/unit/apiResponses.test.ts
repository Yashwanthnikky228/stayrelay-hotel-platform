import assert from 'node:assert/strict';
import { once } from 'node:events';
import { test } from 'node:test';
import type { AddressInfo } from 'node:net';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { app } from '../../apps/api/src/app';
import healthHandler from '../../api/health';
import propertiesHandler from '../../api/properties';
import notFoundHandler from '../../api/not-found';

test('local API keeps inventory unavailable and refuses unsupported methods', async (context) => {
  const server = app.listen(0, '127.0.0.1');
  context.after(() => new Promise<void>((resolve, reject) => server.close((error) => error ? reject(error) : resolve())));
  await once(server, 'listening');
  const address = server.address() as AddressInfo;
  const base = `http://127.0.0.1:${address.port}`;

  for (const [path, method, status, code] of [
    ['/api/health', 'GET', 200, undefined],
    ['/api/properties?destination=Mumbai', 'GET', 503, 'INVENTORY_NOT_CONFIGURED'],
    ['/api/health', 'POST', 405, 'METHOD_NOT_ALLOWED'],
    ['/api/properties', 'DELETE', 405, 'METHOD_NOT_ALLOWED'],
    ['/api/missing', 'GET', 404, 'NOT_FOUND'],
    ['/missing', 'GET', 404, 'NOT_FOUND'],
  ] as const) {
    const response = await fetch(`${base}${path}`, { method });
    assert.equal(response.status, status, `${method} ${path}`);
    assert.equal(response.headers.get('cache-control'), 'no-store');
    if (status === 405) assert.equal(response.headers.get('allow'), 'GET, HEAD');
    const body = await response.json() as { error?: { code: string }; status?: string };
    if (code) assert.equal(body.error?.code, code);
    else assert.equal(body.status, 'ok');
  }

  const head = await fetch(`${base}/api/properties`, { method: 'HEAD' });
  assert.equal(head.status, 503);
  assert.equal(await head.text(), '');
});

test('Vercel function adapters expose the same disabled contract', () => {
  function invoke(handler: typeof healthHandler, method: string) {
    const headers = new Map<string, string>();
    let status = 0;
    let body: unknown;
    const response = {
      setHeader(name: string, value: string) { headers.set(name.toLowerCase(), value); return this; },
      status(value: number) { status = value; return this; },
      json(value: unknown) { body = value; return this; },
    } as unknown as VercelResponse;
    handler({ method } as VercelRequest, response);
    return { status, headers, body: body as { error?: { code: string }; status?: string } };
  }

  const health = invoke(healthHandler, 'GET');
  assert.equal(health.status, 200);
  assert.equal(health.body.status, 'ok');
  const unavailable = invoke(propertiesHandler, 'GET');
  assert.equal(unavailable.status, 503);
  assert.equal(unavailable.body.error?.code, 'INVENTORY_NOT_CONFIGURED');
  for (const handler of [healthHandler, propertiesHandler]) {
    const rejected = invoke(handler, 'POST');
    assert.equal(rejected.status, 405);
    assert.equal(rejected.headers.get('allow'), 'GET, HEAD');
    assert.equal(rejected.headers.get('cache-control'), 'no-store');
    assert.equal(rejected.body.error?.code, 'METHOD_NOT_ALLOWED');
  }
  const missing = invoke(notFoundHandler, 'GET');
  assert.equal(missing.status, 404);
  assert.equal(missing.headers.get('cache-control'), 'no-store');
  assert.equal(missing.body.error?.code, 'NOT_FOUND');
});
