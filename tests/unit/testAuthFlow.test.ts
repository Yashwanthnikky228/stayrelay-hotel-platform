import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import type { Server } from 'node:http';
import { createApp } from '../../apps/api/src/app';
import { TestStore } from '../../apps/api/src/testStore';

let server: Server; let baseUrl = '';
before(() => new Promise<void>((resolve) => {
  server = createApp({ store: new TestStore(':memory:'), testAuthEnabled: true }).listen(0, '127.0.0.1', () => {
    const address = server.address(); if (!address || typeof address === 'string') throw new Error('Missing test address');
    baseUrl = `http://127.0.0.1:${address.port}/api`; resolve();
  });
}));
after(() => new Promise<void>((resolve, reject) => server.close((error) => error ? reject(error) : resolve())));

async function json(path: string, init: RequestInit = {}) {
  const response = await fetch(`${baseUrl}${path}`, { ...init, headers: { 'content-type': 'application/json', ...init.headers } });
  return { response, body: response.status === 204 ? undefined : await response.json() as Record<string, unknown> };
}

test('synthetic account session persists a seller draft and enforces ownership and sign-out', async () => {
  const created = await json('/test-auth/accounts', { method: 'POST', body: JSON.stringify({ email: 'seller-one@example.test', displayName: 'Demo Seller One' }) });
  assert.equal(created.response.status, 201); const cookieA = created.response.headers.get('set-cookie')?.split(';')[0]; assert.ok(cookieA);
  const draft = await json('/seller-drafts', { method: 'POST', headers: { cookie: cookieA }, body: JSON.stringify({ hotelName: 'Demo Harbour House', city: 'Mumbai', checkIn: '2027-01-12', checkOut: '2027-01-14', guestCount: 2 }) });
  assert.equal(draft.response.status, 201); const draftId = (draft.body?.draft as { id: string }).id;
  const listed = await json('/seller-drafts', { headers: { cookie: cookieA } }); assert.equal((listed.body?.drafts as unknown[]).length, 1);

  const second = await json('/test-auth/accounts', { method: 'POST', body: JSON.stringify({ email: 'seller-two@example.test', displayName: 'Demo Seller Two' }) });
  const cookieB = second.response.headers.get('set-cookie')?.split(';')[0]; assert.ok(cookieB);
  assert.equal((await json(`/seller-drafts/${draftId}`, { headers: { cookie: cookieB } })).response.status, 404);
  assert.equal((await json('/seller-drafts', { headers: { cookie: cookieB } })).body?.drafts instanceof Array, true);

  assert.equal((await json('/test-auth/session', { method: 'DELETE', headers: { cookie: cookieA } })).response.status, 204);
  assert.equal((await json('/seller-drafts', { headers: { cookie: cookieA } })).response.status, 401);
  const signedIn = await json('/test-auth/session', { method: 'POST', body: JSON.stringify({ email: 'seller-one@example.test' }) });
  const newCookie = signedIn.response.headers.get('set-cookie')?.split(';')[0]; assert.ok(newCookie);
  assert.equal((await json('/seller-drafts', { headers: { cookie: newCookie } })).body?.drafts instanceof Array, true);
});

test('test auth rejects real-looking domains and remains disabled by default', async () => {
  assert.equal((await json('/test-auth/accounts', { method: 'POST', body: JSON.stringify({ email: 'person@gmail.com', displayName: 'Demo Person' }) })).response.status, 400);
  const disabled = createApp({ store: new TestStore(':memory:'), testAuthEnabled: false });
  const disabledServer = disabled.listen(0, '127.0.0.1'); await new Promise((resolve) => disabledServer.once('listening', resolve));
  const address = disabledServer.address(); assert.ok(address && typeof address !== 'string');
  const response = await fetch(`http://127.0.0.1:${address.port}/api/account`); assert.equal(response.status, 503);
  await new Promise<void>((resolve, reject) => disabledServer.close((error) => error ? reject(error) : resolve()));
});
