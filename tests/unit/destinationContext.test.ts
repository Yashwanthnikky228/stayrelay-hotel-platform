import assert from 'node:assert/strict';
import { test } from 'node:test';
import { destinationContexts, resolveDestination } from '../../apps/customer/src/data/destinations';

test('known destinations resolve from safe fixture labels without guessing partial input', () => {
  assert.equal(resolveDestination('Mumbai')?.id, 'mumbai');
  assert.equal(resolveDestination('Bengaluru, Karnataka, India')?.id, 'bengaluru');
  assert.equal(resolveDestination('mum'), undefined);
});

test('destination fixtures use unique ids and labels', () => {
  assert.equal(new Set(destinationContexts.map(({ id }) => id)).size, destinationContexts.length);
  assert.equal(new Set(destinationContexts.map(({ label }) => label)).size, destinationContexts.length);
});
