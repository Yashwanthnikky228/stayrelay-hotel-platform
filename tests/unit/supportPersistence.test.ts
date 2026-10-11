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
