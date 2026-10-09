import assert from 'node:assert/strict';
import { test } from 'node:test';
import { ApiError, searchPropertyOffers } from '../../apps/customer/src/services/marketplace';

const filters = { destination: 'Mumbai', checkIn: '2026-11-01', checkOut: '2026-11-02', guests: 2 };

test('cancellation during JSON decoding cannot become an invalid-response error', async () => {
  const originalFetch = globalThis.fetch;
  let finishJson: ((value: unknown) => void) | undefined;
  let jsonStarted: (() => void) | undefined;
  const started = new Promise<void>((resolve) => { jsonStarted = resolve; });
  const json = new Promise<unknown>((resolve) => { finishJson = resolve; });
  const response = new Response('{"offers":[]}', { status: 200 });
  response.json = () => { jsonStarted?.(); return json; };
  globalThis.fetch = async () => response;
  const controller = new AbortController();
  try {
    const search = searchPropertyOffers(filters, controller.signal);
    await started;
    controller.abort();
    finishJson?.({ offers: [] });
    await assert.rejects(search, (error: unknown) => error instanceof ApiError && error.code === 'ABORTED');
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('unreadable non-aborted data fails without presenting inventory', async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => new Response('bad JSON', { status: 200 });
  try {
    await assert.rejects(searchPropertyOffers(filters), (error: unknown) => error instanceof ApiError && error.code === 'INVALID_RESPONSE');
  } finally {
    globalThis.fetch = originalFetch;
  }
});
