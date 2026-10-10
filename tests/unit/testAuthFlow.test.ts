import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import type { Server } from 'node:http';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createApp } from '../../apps/api/src/app';
import { TestStore } from '../../apps/api/src/testStore';

let server: Server; let baseUrl = ''; const storageRoot = mkdtempSync(join(tmpdir(), 'stayrelay-evidence-test-'));
before(() => new Promise<void>((resolve) => {
  server = createApp({ store: new TestStore(':memory:', storageRoot), testAuthEnabled: true }).listen(0, '127.0.0.1', () => {
    const address = server.address(); if (!address || typeof address === 'string') throw new Error('Missing test address');
    baseUrl = `http://127.0.0.1:${address.port}/api`; resolve();
  });
}));
after(() => new Promise<void>((resolve, reject) => server.close((error) => { rmSync(storageRoot, { recursive: true, force: true }); error ? reject(error) : resolve(); })));

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

test('synthetic evidence stays private and fails closed when watermark or scanner evidence is absent', async () => {
  const owner = await json('/test-auth/session', { method: 'POST', body: JSON.stringify({ email: 'seller-one@example.test' }) });
  const ownerCookie = owner.response.headers.get('set-cookie')?.split(';')[0]; assert.ok(ownerCookie);
  const drafts = await json('/seller-drafts', { headers: { cookie: ownerCookie } }); const draftId = ((drafts.body?.drafts as { id: string }[])[0]).id;
  const validText = 'SYNTHETIC TEST DOCUMENT — NOT VALID FOR IDENTIFICATION.\nDemo reservation evidence only.';
  const uploaded = await fetch(`${baseUrl}/seller-drafts/${draftId}/evidence`, { method: 'POST', headers: { cookie: ownerCookie, 'content-type': 'text/plain', 'x-file-name': 'demo-evidence.txt' }, body: validText });
  assert.equal(uploaded.status, 201); const clean = await uploaded.json() as { evidence: { id: string; state: string } }; assert.equal(clean.evidence.state, 'simulated_clean');
  assert.equal((await fetch(`${baseUrl}/synthetic-evidence/${clean.evidence.id}/content`, { headers: { cookie: ownerCookie } })).status, 200);

  const unavailable = await fetch(`${baseUrl}/seller-drafts/${draftId}/evidence`, { method: 'POST', headers: { cookie: ownerCookie, 'content-type': 'text/plain', 'x-file-name': 'scanner-down.txt', 'x-scan-simulation': 'unavailable' }, body: validText });
  const quarantined = await unavailable.json() as { evidence: { id: string; state: string } }; assert.equal(quarantined.evidence.state, 'quarantined');
  assert.equal((await fetch(`${baseUrl}/synthetic-evidence/${quarantined.evidence.id}/content`, { headers: { cookie: ownerCookie } })).status, 423);
  const missingMark = await fetch(`${baseUrl}/seller-drafts/${draftId}/evidence`, { method: 'POST', headers: { cookie: ownerCookie, 'content-type': 'text/plain', 'x-file-name': 'unsafe.txt' }, body: 'not marked synthetic' });
  assert.equal((await missingMark.json() as { evidence: { state: string } }).evidence.state, 'quarantined');

  const other = await json('/test-auth/session', { method: 'POST', body: JSON.stringify({ email: 'seller-two@example.test' }) });
  const otherCookie = other.response.headers.get('set-cookie')?.split(';')[0]; assert.ok(otherCookie);
  assert.equal((await fetch(`${baseUrl}/synthetic-evidence/${clean.evidence.id}/content`, { headers: { cookie: otherCookie } })).status, 404);
});

test('protected operations decisions publish only a clean, doubly-approved demo listing to buyer search', async () => {
  const seller = await json('/test-auth/session', { method: 'POST', body: JSON.stringify({ email: 'seller-one@example.test' }) });
  const sellerCookie = seller.response.headers.get('set-cookie')?.split(';')[0]; assert.ok(sellerCookie);
  assert.equal((await json('/operations/reviews', { headers: { cookie: sellerCookie } })).response.status, 403);

  const operator = await json('/test-auth/operator-session', { method: 'POST', body: JSON.stringify({ email: 'operator@stayrelay.test' }) });
  const operatorCookie = operator.response.headers.get('set-cookie')?.split(';')[0]; assert.ok(operatorCookie);
  const queue = await json('/operations/reviews', { headers: { cookie: operatorCookie } });
  const review = (queue.body?.reviews as { draft: { id: string }; published: boolean }[])[0]; assert.ok(review); assert.equal(review.published, false);
  const draftId = review.draft.id;

  const eligibility = await json(`/operations/reviews/${draftId}/eligibility`, { method: 'POST', headers: { cookie: operatorCookie }, body: JSON.stringify({ decision: 'approved' }) });
  assert.equal((eligibility.body?.review as { published: boolean }).published, false);
  const beforeRisk = await json('/properties?destination=Mumbai&checkIn=2027-01-12&checkOut=2027-01-14&guests=2');
  assert.deepEqual(beforeRisk.body?.offers, []);

  const risk = await json(`/operations/reviews/${draftId}/risk`, { method: 'POST', headers: { cookie: operatorCookie }, body: JSON.stringify({ decision: 'approved' }) });
  assert.equal((risk.body?.review as { published: boolean }).published, true);
  const visible = await json('/properties?destination=Mumbai&checkIn=2027-01-12&checkOut=2027-01-14&guests=2');
  const offers = visible.body?.offers as { isPreview: boolean; property: { inventoryDecision: string } }[];
  assert.equal(offers.length, 1); assert.equal(offers[0].isPreview, false); assert.equal(offers[0].property.inventoryDecision, 'eligible');

  const rejected = await json(`/operations/reviews/${draftId}/risk`, { method: 'POST', headers: { cookie: operatorCookie }, body: JSON.stringify({ decision: 'rejected' }) });
  assert.equal((rejected.body?.review as { published: boolean }).published, false);
  assert.deepEqual((await json('/properties?destination=Mumbai&checkIn=2027-01-12&checkOut=2027-01-14&guests=2')).body?.offers, []);
});

test('checkout simulation creates an owner-scoped Reservation Passport without moving money', async () => {
  const seller = await json('/test-auth/session', { method: 'POST', body: JSON.stringify({ email: 'seller-one@example.test' }) });
  const sellerCookie = seller.response.headers.get('set-cookie')?.split(';')[0]; assert.ok(sellerCookie);
  const queue = await json('/test-auth/operator-session', { method: 'POST', body: JSON.stringify({ email: 'operator@stayrelay.test' }) });
  const operatorCookie = queue.response.headers.get('set-cookie')?.split(';')[0]; assert.ok(operatorCookie);
  const reviews = await json('/operations/reviews', { headers: { cookie: operatorCookie } }); const draftId = ((reviews.body?.reviews as { draft: { id: string } }[])[0]).draft.id;
  await json(`/operations/reviews/${draftId}/risk`, { method: 'POST', headers: { cookie: operatorCookie }, body: JSON.stringify({ decision: 'approved' }) });

  const buyer = await json('/test-auth/accounts', { method: 'POST', body: JSON.stringify({ email: 'buyer-one@example.test', displayName: 'Demo Buyer One' }) });
  const buyerCookie = buyer.response.headers.get('set-cookie')?.split(';')[0]; assert.ok(buyerCookie);
  const checkout = await json('/checkout-simulations', { method: 'POST', headers: { cookie: buyerCookie }, body: JSON.stringify({ offerId: `demo-offer-${draftId}` }) });
  assert.equal(checkout.response.status, 201); assert.equal((checkout.body?.order as { status: string }).status, 'confirmation_pending'); assert.equal((checkout.body?.passport as { status: string }).status, 'payment_confirmation_pending');
  assert.equal((await json('/checkout-simulations', { method: 'POST', headers: { cookie: buyerCookie }, body: JSON.stringify({ offerId: `demo-offer-${draftId}` }) })).response.status, 409);
  assert.equal(((await json('/passports', { headers: { cookie: buyerCookie } })).body?.passports as unknown[]).length, 1);
  assert.equal(((await json('/passports', { headers: { cookie: sellerCookie } })).body?.passports as unknown[]).length, 0);
  assert.equal((await json('/checkout-simulations', { method: 'POST', headers: { cookie: sellerCookie }, body: JSON.stringify({ offerId: `demo-offer-${draftId}` }) })).response.status, 409);
});
