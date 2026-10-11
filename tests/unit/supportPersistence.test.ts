import assert from 'node:assert/strict';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { TestStore } from '../../apps/api/src/testStore';

function fixture() {
  const root = mkdtempSync(join(tmpdir(), 'stayrelay-support-'));
  const path = join(root, 'test.sqlite');
  const stores: TestStore[] = [];
  const open = () => { const store = new TestStore(path, join(root, 'evidence')); stores.push(store); return store; };
  const store = open();
  const owner = store.createAccount('support-owner@example.test', 'Demo Support Owner')!;
  const other = store.createAccount('support-other@example.test', 'Demo Support Other')!;
  const operator = store.ensureOperator();
  return { store, owner, other, operator, open, cleanup: () => { for (const item of stores) item.database.close(); rmSync(root, { recursive: true, force: true }); } };
}

test('preference audit failure rolls back its version and permits retry after reopen', () => {
  const f = fixture();
  try {
    const initial = f.store.getNotificationPreference(f.owner.id);
    f.store.database.exec("CREATE TRIGGER fail_preference BEFORE INSERT ON audit_events WHEN NEW.target_type = 'notification_preference' BEGIN SELECT RAISE(ABORT, 'audit unavailable'); END");
    assert.throws(() => f.store.setNotificationPreference(f.owner.id, false, 1), /audit unavailable/);
    assert.deepEqual(f.open().getNotificationPreference(f.owner.id), initial);
    f.store.database.exec('DROP TRIGGER fail_preference');
    assert.equal(typeof f.store.setNotificationPreference(f.owner.id, false, 1), 'object');
    assert.equal(f.open().getNotificationPreference(f.owner.id).inAppEnabled, false);
    assert.equal(f.store.setNotificationPreference(f.owner.id, true, 1), 'version_conflict');
  } finally { f.cleanup(); }
});

test('recovery audit failure preserves state, retry persists and stale decisions fail closed', () => {
  const f = fixture();
  try {
    const draft = f.store.createDraft(f.other.id, { hotelName: 'Synthetic Hotel', city: 'Mumbai', checkIn: '2027-03-01', checkOut: '2027-03-04', guestCount: 2 });
    // Seed publication only: this test targets recovery durability, not review eligibility.
    f.store.database.prepare('INSERT INTO demo_listings (draft_id, published_at) VALUES (?, ?)').run(draft.id, new Date().toISOString());
    const checkout = f.store.createCheckoutSimulation(f.owner.id, `demo-offer-${draft.id}`);
    if (typeof checkout === 'string') throw new Error(checkout);
    const item = f.store.createRecoveryCase(f.owner.id, checkout.passport.id, 'refund_review', 'Synthetic request', 'No real payment');
    if (typeof item === 'string') throw new Error(item);
    const ordersBefore = f.store.database.prepare('SELECT * FROM synthetic_orders').all();
    const passportsBefore = f.store.listPassports(f.owner.id);
    f.store.database.exec("CREATE TRIGGER fail_recovery BEFORE INSERT ON audit_events WHEN NEW.action = 'recovery_case.under_review' BEGIN SELECT RAISE(ABORT, 'audit unavailable'); END");
    assert.throws(() => f.store.transitionRecoveryCase(f.operator.id, item.id, 'under_review', 1), /audit unavailable/);
    const second = f.open();
    assert.deepEqual(second.listRecoveryCases(f.owner.id), [item]);
    assert.equal(second.database.prepare('SELECT COUNT(*) AS n FROM audit_events WHERE target_id = ?').get(item.id)?.n, 1);
    f.store.database.exec('DROP TRIGGER fail_recovery');
    assert.equal(typeof second.transitionRecoveryCase(f.operator.id, item.id, 'under_review', 1), 'object');
    assert.equal(f.store.transitionRecoveryCase(f.operator.id, item.id, 'recovery_pending', 1), 'version_conflict');
    assert.equal(f.store.transitionRecoveryCase(f.operator.id, item.id, 'approved_synthetic_refund', 2), 'invalid_transition');
    assert.equal(f.open().listRecoveryCases(f.other.id)[0].status, 'under_review');
    assert.deepEqual(f.store.database.prepare('SELECT * FROM synthetic_orders').all(), ordersBefore);
    assert.deepEqual(f.store.listPassports(f.owner.id), passportsBefore);
    assert.deepEqual(f.store.database.prepare('SELECT action FROM audit_events WHERE target_id = ? ORDER BY rowid').all(item.id).map(row => row.action), ['recovery_case.submitted', 'recovery_case.under_review']);
  } finally { f.cleanup(); }
});

test('support survives database reopen and rejects stale writes from another connection', () => {
  const f = fixture();
  try {
    const item = f.store.createSupportCase(f.owner.id, 'arrival_help'); assert.notEqual(item, 'passport_not_found');
    if (typeof item === 'string') throw new Error(item);
    const second = f.open();
    assert.deepEqual(second.listSupportCases(f.owner.id), [item]);
    assert.deepEqual(second.listSupportCases(f.other.id), []);
    const escalated = f.store.transitionSupportCase(f.operator.id, item.id, 'escalated', 1);
    assert.equal(typeof escalated, 'object');
    assert.equal(second.transitionSupportCase(f.operator.id, item.id, 'resolved', 1), 'version_conflict');
    assert.equal(second.transitionSupportCase(f.operator.id, item.id, 'escalated', 2), 'version_conflict');
    const resolved = second.transitionSupportCase(f.operator.id, item.id, 'resolved', 2);
    assert.equal(typeof resolved, 'object');
    assert.equal(f.store.listSupportCases(f.owner.id)[0].version, 3);
    const reopened = f.open();
    assert.equal(reopened.listSupportCases(f.owner.id)[0].status, 'resolved');
    assert.equal(reopened.transitionSupportCase(f.operator.id, item.id, 'resolved', 3), 'version_conflict');
    assert.equal(reopened.transitionSupportCase(f.operator.id, 'missing', 'resolved', 1), 'not_found');
    const events = reopened.database.prepare("SELECT action FROM audit_events WHERE target_id = ? ORDER BY rowid").all(item.id);
    assert.deepEqual(events.map((event) => event.action), ['support_case.created', 'support_case.escalated', 'support_case.resolved']);
    const updates = reopened.listSupportUpdates(f.owner.id);
    assert.deepEqual(updates.map((update) => update.event), ['resolved', 'escalated', 'created']);
    assert.deepEqual(reopened.listSupportUpdates(f.other.id), []);
    assert.deepEqual(Object.keys(updates[0]).sort(), ['caseId', 'event', 'id', 'occurredAt']);
  } finally { f.cleanup(); }
});

test('failed support audit insert rolls back creation and transition, allowing a safe retry', () => {
  const f = fixture();
  try {
    f.store.database.exec("CREATE TRIGGER fail_support_audit BEFORE INSERT ON audit_events WHEN NEW.target_type = 'synthetic_support_case' BEGIN SELECT RAISE(ABORT, 'injected audit failure'); END");
    assert.throws(() => f.store.createSupportCase(f.owner.id, 'refund_question'), /injected audit failure/);
    assert.deepEqual(f.store.listSupportCases(f.owner.id), []);
    f.store.database.exec('DROP TRIGGER fail_support_audit');
    const item = f.store.createSupportCase(f.owner.id, 'transfer_failed');
    if (typeof item === 'string') throw new Error(item);
    f.store.database.exec("CREATE TRIGGER fail_support_audit BEFORE INSERT ON audit_events WHEN NEW.action = 'support_case.escalated' BEGIN SELECT RAISE(ABORT, 'injected audit failure'); END");
    assert.throws(() => f.store.transitionSupportCase(f.operator.id, item.id, 'escalated', 1), /injected audit failure/);
    assert.deepEqual(f.store.listSupportCases(f.owner.id), [item]);
    assert.deepEqual(f.store.listSupportUpdates(f.owner.id).map((update) => update.event), ['created']);
    assert.equal(f.store.database.prepare('SELECT COUNT(*) AS count FROM audit_events WHERE target_id = ?').get(item.id)?.count, 1);
    f.store.database.exec('DROP TRIGGER fail_support_audit');
    const retry = f.store.transitionSupportCase(f.operator.id, item.id, 'escalated', 1);
    assert.equal(typeof retry, 'object');
    assert.equal(f.store.listSupportCases(f.owner.id)[0].version, 2);
  } finally { f.cleanup(); }
});

test('support update projection is bounded to the latest 100 saved events', () => {
  const f = fixture();
  try {
    for (let index = 0; index < 105; index++) f.store.createSupportCase(f.owner.id, 'arrival_help');
    const updates = f.store.listSupportUpdates(f.owner.id);
    assert.equal(updates.length, 100);
    assert.equal(new Set(updates.map((update) => update.id)).size, 100);
    const latest = f.store.database.prepare("SELECT id FROM audit_events WHERE target_type = 'synthetic_support_case' ORDER BY rowid DESC LIMIT 1").get();
    assert.equal(updates[0].id, latest?.id);
  } finally { f.cleanup(); }
});

test('notification preference and disconnected delivery simulation are versioned and fail closed', () => {
  const f = fixture();
  try {
    const initial = f.store.getNotificationPreference(f.owner.id); assert.equal(initial.inAppEnabled, true); assert.equal(initial.version, 1);
    const disabled = f.store.setNotificationPreference(f.owner.id, false, 1); assert.equal(typeof disabled, 'object');
    assert.equal(f.store.setNotificationPreference(f.owner.id, true, 1), 'version_conflict');
    const item = f.store.createSupportCase(f.owner.id, 'arrival_help'); if (typeof item === 'string') throw new Error(item);
    const update = f.store.listSupportUpdates(f.owner.id)[0];
    const delivered = f.store.recordDeliveryAttempt(f.operator.id, update.id, 'delivered'); assert.equal(typeof delivered, 'object');
    const failed = f.store.recordDeliveryAttempt(f.operator.id, update.id, 'failed'); assert.equal(typeof failed, 'object');
    assert.equal((failed as { attempt: number }).attempt, 2); assert.equal((failed as { errorCode?: string }).errorCode, 'DELIVERY_SIMULATED_FAILURE');
    assert.equal(f.store.recordDeliveryAttempt(f.operator.id, 'missing', 'delivered'), 'not_found');
  } finally { f.cleanup(); }
});
