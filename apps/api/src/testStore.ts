import { createHash, randomBytes, randomUUID } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import type { DemoReviewDecision, DemoReviewQueueItem, PropertyOffer, PropertySearchFilters, ReservationPassport, SellerReservationDraft, SyntheticAccount, SyntheticEvidenceMetadata, SyntheticOrder, SyntheticSupportCase, SyntheticSupportUpdate } from '@stayrelay/domain';

const SESSION_TTL_SECONDS = 60 * 60 * 8;

function now() { return new Date().toISOString(); }
function digest(token: string) { return createHash('sha256').update(token).digest('hex'); }

interface AccountRow { id: string; email: string; display_name: string; created_at: string }
interface DraftRow { id: string; owner_id: string; hotel_name: string; city: string; check_in: string; check_out: string; guest_count: number; status: 'draft'; created_at: string; updated_at: string }
interface EvidenceRow { id: string; draft_id: string; owner_id: string; original_filename: string; content_type: 'text/plain' | 'application/pdf'; byte_size: number; sha256: string; state: 'quarantined' | 'simulated_clean'; scan_mode: SyntheticEvidenceMetadata['scanMode']; storage_key: string; created_at: string }

function accountFromRow(row: AccountRow): SyntheticAccount {
  return { id: row.id, email: row.email, displayName: row.display_name, createdAt: row.created_at };
}

function draftFromRow(row: DraftRow): SellerReservationDraft {
  return { id: row.id, ownerId: row.owner_id, hotelName: row.hotel_name, city: row.city, checkIn: row.check_in, checkOut: row.check_out, guestCount: row.guest_count, status: row.status, synthetic: true, createdAt: row.created_at, updatedAt: row.updated_at };
}

function evidenceFromRow(row: EvidenceRow): SyntheticEvidenceMetadata {
  return { id: row.id, draftId: row.draft_id, ownerId: row.owner_id, originalFilename: row.original_filename, contentType: row.content_type, byteSize: row.byte_size, sha256: row.sha256, state: row.state, scanMode: row.scan_mode, createdAt: row.created_at };
}

export class TestStore {
  readonly database: DatabaseSync;
  readonly storageRoot: string;

  constructor(path: string, storageRoot = '/tmp/stayrelay-private-evidence') {
    this.storageRoot = storageRoot;
    mkdirSync(storageRoot, { recursive: true, mode: 0o700 });
    this.database = new DatabaseSync(path);
    this.database.exec(`
      PRAGMA foreign_keys = ON;
      CREATE TABLE IF NOT EXISTS accounts (id TEXT PRIMARY KEY, email TEXT NOT NULL UNIQUE, display_name TEXT NOT NULL, created_at TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS sessions (token_digest TEXT PRIMARY KEY, account_id TEXT NOT NULL REFERENCES accounts(id), expires_at TEXT NOT NULL, revoked_at TEXT);
      CREATE TABLE IF NOT EXISTS seller_drafts (id TEXT PRIMARY KEY, owner_id TEXT NOT NULL REFERENCES accounts(id), hotel_name TEXT NOT NULL, city TEXT NOT NULL, check_in TEXT NOT NULL, check_out TEXT NOT NULL, guest_count INTEGER NOT NULL, status TEXT NOT NULL CHECK(status = 'draft'), created_at TEXT NOT NULL, updated_at TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS audit_events (id TEXT PRIMARY KEY, actor_id TEXT, action TEXT NOT NULL, reason_code TEXT NOT NULL, correlation_id TEXT NOT NULL, target_type TEXT NOT NULL, target_id TEXT NOT NULL, occurred_at TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS synthetic_evidence (id TEXT PRIMARY KEY, draft_id TEXT NOT NULL REFERENCES seller_drafts(id), owner_id TEXT NOT NULL REFERENCES accounts(id), original_filename TEXT NOT NULL, content_type TEXT NOT NULL, byte_size INTEGER NOT NULL, sha256 TEXT NOT NULL, state TEXT NOT NULL CHECK(state IN ('quarantined','simulated_clean')), scan_mode TEXT NOT NULL, storage_key TEXT NOT NULL UNIQUE, created_at TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS operator_accounts (account_id TEXT PRIMARY KEY REFERENCES accounts(id));
      CREATE TABLE IF NOT EXISTS demo_reviews (draft_id TEXT PRIMARY KEY REFERENCES seller_drafts(id), eligibility_decision TEXT NOT NULL DEFAULT 'pending', risk_decision TEXT NOT NULL DEFAULT 'pending', eligibility_reviewer_id TEXT, risk_reviewer_id TEXT, updated_at TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS demo_listings (draft_id TEXT PRIMARY KEY REFERENCES seller_drafts(id), published_at TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS synthetic_orders (id TEXT PRIMARY KEY, buyer_id TEXT NOT NULL REFERENCES accounts(id), draft_id TEXT NOT NULL REFERENCES seller_drafts(id), status TEXT NOT NULL CHECK(status = 'confirmation_pending'), created_at TEXT NOT NULL, UNIQUE(buyer_id, draft_id));
      CREATE TABLE IF NOT EXISTS reservation_passports (id TEXT PRIMARY KEY, order_id TEXT NOT NULL UNIQUE REFERENCES synthetic_orders(id), owner_id TEXT NOT NULL REFERENCES accounts(id), status TEXT NOT NULL CHECK(status = 'payment_confirmation_pending'), version INTEGER NOT NULL, status_updated_at TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS passport_state_events (id TEXT PRIMARY KEY, passport_id TEXT NOT NULL REFERENCES reservation_passports(id), status TEXT NOT NULL, version INTEGER NOT NULL, actor_id TEXT NOT NULL REFERENCES accounts(id), occurred_at TEXT NOT NULL, UNIQUE(passport_id, version));
      CREATE TABLE IF NOT EXISTS synthetic_support_cases (id TEXT PRIMARY KEY, owner_id TEXT NOT NULL REFERENCES accounts(id), passport_id TEXT REFERENCES reservation_passports(id), category TEXT NOT NULL CHECK(category IN ('transfer_failed','arrival_help','refund_question')), status TEXT NOT NULL CHECK(status IN ('open','escalated','resolved')), version INTEGER NOT NULL, created_at TEXT NOT NULL, updated_at TEXT NOT NULL);
    `);
    const auditColumns = (this.database.prepare('PRAGMA table_info(audit_events)').all() as unknown as { name: string }[]).map((column) => column.name);
    if (!auditColumns.includes('reason_code')) this.database.exec("ALTER TABLE audit_events ADD COLUMN reason_code TEXT NOT NULL DEFAULT 'legacy_event'");
    if (!auditColumns.includes('correlation_id')) this.database.exec("ALTER TABLE audit_events ADD COLUMN correlation_id TEXT NOT NULL DEFAULT 'legacy_event'");
  }

  ensureOperator(): SyntheticAccount {
    const existing = this.findAccountByEmail('operator@stayrelay.test');
    const account = existing ?? this.createAccount('operator@stayrelay.test', 'Demo Operations');
    if (!account) throw new Error('Could not establish local demo operator.');
    this.database.prepare('INSERT OR IGNORE INTO operator_accounts (account_id) VALUES (?)').run(account.id);
    return account;
  }

  isOperator(accountId: string): boolean {
    return Boolean(this.database.prepare('SELECT account_id FROM operator_accounts WHERE account_id = ?').get(accountId));
  }

  createAccount(email: string, displayName: string): SyntheticAccount | undefined {
    const timestamp = now();
    const account: SyntheticAccount = { id: randomUUID(), email, displayName, createdAt: timestamp };
    try {
      this.database.prepare('INSERT INTO accounts (id, email, display_name, created_at) VALUES (?, ?, ?, ?)').run(account.id, account.email, account.displayName, timestamp);
    } catch (error) {
      if (error instanceof Error && error.message.includes('UNIQUE')) return undefined;
      throw error;
    }
    this.audit(account.id, 'account.created', 'account', account.id);
    return account;
  }

  findAccountByEmail(email: string): SyntheticAccount | undefined {
    const row = this.database.prepare('SELECT id, email, display_name, created_at FROM accounts WHERE email = ?').get(email) as AccountRow | undefined;
    return row ? accountFromRow(row) : undefined;
  }

  createSession(accountId: string): string {
    const token = randomBytes(32).toString('base64url');
    const expiresAt = new Date(Date.now() + SESSION_TTL_SECONDS * 1000).toISOString();
    this.database.prepare('INSERT INTO sessions (token_digest, account_id, expires_at) VALUES (?, ?, ?)').run(digest(token), accountId, expiresAt);
    this.audit(accountId, 'session.created', 'account', accountId);
    return token;
  }

  accountForSession(token: string): SyntheticAccount | undefined {
    const row = this.database.prepare(`SELECT a.id, a.email, a.display_name, a.created_at FROM sessions s JOIN accounts a ON a.id = s.account_id WHERE s.token_digest = ? AND s.revoked_at IS NULL AND s.expires_at > ?`).get(digest(token), now()) as AccountRow | undefined;
    return row ? accountFromRow(row) : undefined;
  }

  revokeSession(token: string): void {
    this.database.prepare('UPDATE sessions SET revoked_at = ? WHERE token_digest = ? AND revoked_at IS NULL').run(now(), digest(token));
  }

  createDraft(ownerId: string, input: Omit<SellerReservationDraft, 'id' | 'ownerId' | 'status' | 'synthetic' | 'createdAt' | 'updatedAt'>): SellerReservationDraft {
    const timestamp = now();
    const draft: SellerReservationDraft = { id: randomUUID(), ownerId, ...input, status: 'draft', synthetic: true, createdAt: timestamp, updatedAt: timestamp };
    this.database.prepare('INSERT INTO seller_drafts (id, owner_id, hotel_name, city, check_in, check_out, guest_count, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)').run(draft.id, draft.ownerId, draft.hotelName, draft.city, draft.checkIn, draft.checkOut, draft.guestCount, draft.status, timestamp, timestamp);
    this.audit(ownerId, 'seller_draft.created', 'seller_draft', draft.id);
    return draft;
  }

  listDrafts(ownerId: string): SellerReservationDraft[] {
    const rows = this.database.prepare('SELECT * FROM seller_drafts WHERE owner_id = ? ORDER BY created_at DESC').all(ownerId) as unknown as DraftRow[];
    return rows.map(draftFromRow);
  }

  getDraft(ownerId: string, draftId: string): SellerReservationDraft | undefined {
    const row = this.database.prepare('SELECT * FROM seller_drafts WHERE id = ? AND owner_id = ?').get(draftId, ownerId) as DraftRow | undefined;
    return row ? draftFromRow(row) : undefined;
  }

  createEvidence(ownerId: string, draftId: string, originalFilename: string, contentType: SyntheticEvidenceMetadata['contentType'], bytes: Buffer, scanMode: SyntheticEvidenceMetadata['scanMode']): SyntheticEvidenceMetadata {
    const id = randomUUID(); const createdAt = now(); const storageKey = `${id}.bin`;
    const state = scanMode === 'simulated_clean' ? 'simulated_clean' : 'quarantined';
    writeFileSync(join(this.storageRoot, storageKey), bytes, { mode: 0o600, flag: 'wx' });
    this.database.prepare('INSERT INTO synthetic_evidence (id, draft_id, owner_id, original_filename, content_type, byte_size, sha256, state, scan_mode, storage_key, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)').run(id, draftId, ownerId, originalFilename, contentType, bytes.byteLength, createHash('sha256').update(bytes).digest('hex'), state, scanMode, storageKey, createdAt);
    this.audit(ownerId, 'synthetic_evidence.uploaded', 'synthetic_evidence', id);
    return this.getEvidence(ownerId, id)?.metadata as SyntheticEvidenceMetadata;
  }

  listEvidence(ownerId: string, draftId: string): SyntheticEvidenceMetadata[] {
    const rows = this.database.prepare('SELECT * FROM synthetic_evidence WHERE owner_id = ? AND draft_id = ? ORDER BY created_at DESC').all(ownerId, draftId) as unknown as EvidenceRow[];
    return rows.map(evidenceFromRow);
  }

  getEvidence(ownerId: string, evidenceId: string): { metadata: SyntheticEvidenceMetadata; bytes: Buffer } | undefined {
    const row = this.database.prepare('SELECT * FROM synthetic_evidence WHERE id = ? AND owner_id = ?').get(evidenceId, ownerId) as EvidenceRow | undefined;
    if (!row) return undefined;
    return { metadata: evidenceFromRow(row), bytes: readFileSync(join(this.storageRoot, row.storage_key)) };
  }

  listReviewQueue(): DemoReviewQueueItem[] {
    const drafts = this.database.prepare('SELECT * FROM seller_drafts ORDER BY created_at ASC').all() as unknown as DraftRow[];
    return drafts.map((row) => {
      const draft = draftFromRow(row);
      const review = this.database.prepare('SELECT eligibility_decision, risk_decision FROM demo_reviews WHERE draft_id = ?').get(draft.id) as { eligibility_decision: DemoReviewDecision; risk_decision: DemoReviewDecision } | undefined;
      const evidenceRows = this.database.prepare('SELECT * FROM synthetic_evidence WHERE draft_id = ? ORDER BY created_at DESC').all(draft.id) as unknown as EvidenceRow[];
      return { draft, evidence: evidenceRows.map(evidenceFromRow), eligibilityDecision: review?.eligibility_decision ?? 'pending', riskDecision: review?.risk_decision ?? 'pending', published: Boolean(this.database.prepare('SELECT draft_id FROM demo_listings WHERE draft_id = ?').get(draft.id)) };
    });
  }

  setReviewDecision(operatorId: string, draftId: string, kind: 'eligibility' | 'risk', decision: DemoReviewDecision): DemoReviewQueueItem | undefined {
    if (!this.database.prepare('SELECT id FROM seller_drafts WHERE id = ?').get(draftId)) return undefined;
    this.database.prepare(`INSERT INTO demo_reviews (draft_id, eligibility_decision, risk_decision, updated_at) VALUES (?, 'pending', 'pending', ?) ON CONFLICT(draft_id) DO NOTHING`).run(draftId, now());
    const column = kind === 'eligibility' ? 'eligibility_decision' : 'risk_decision';
    const reviewer = kind === 'eligibility' ? 'eligibility_reviewer_id' : 'risk_reviewer_id';
    this.database.prepare(`UPDATE demo_reviews SET ${column} = ?, ${reviewer} = ?, updated_at = ? WHERE draft_id = ?`).run(decision, operatorId, now(), draftId);
    this.audit(operatorId, `review.${kind}.${decision}`, 'seller_draft', draftId);
    const review = this.database.prepare('SELECT eligibility_decision, risk_decision FROM demo_reviews WHERE draft_id = ?').get(draftId) as { eligibility_decision: DemoReviewDecision; risk_decision: DemoReviewDecision };
    const cleanEvidence = Boolean(this.database.prepare("SELECT id FROM synthetic_evidence WHERE draft_id = ? AND state = 'simulated_clean' LIMIT 1").get(draftId));
    if (review.eligibility_decision === 'approved' && review.risk_decision === 'approved' && cleanEvidence) {
      this.database.prepare('INSERT OR IGNORE INTO demo_listings (draft_id, published_at) VALUES (?, ?)').run(draftId, now());
      this.audit(operatorId, 'demo_listing.published', 'seller_draft', draftId);
    } else {
      this.database.prepare('DELETE FROM demo_listings WHERE draft_id = ?').run(draftId);
    }
    return this.listReviewQueue().find((item) => item.draft.id === draftId);
  }

  listPublishedOffers(filters: PropertySearchFilters): PropertyOffer[] {
    const rows = this.database.prepare('SELECT d.* FROM demo_listings l JOIN seller_drafts d ON d.id = l.draft_id ORDER BY l.published_at DESC').all() as unknown as DraftRow[];
    return rows.map(draftFromRow).filter((draft) => (!filters.destination || `${draft.hotelName} ${draft.city}`.toLowerCase().includes(filters.destination.toLowerCase())) && draft.checkIn === filters.checkIn && draft.checkOut === filters.checkOut && draft.guestCount >= filters.guests).map((draft) => ({
      id: `demo-offer-${draft.id}`,
      isPreview: false as const,
      guestCapacity: draft.guestCount,
      buyerTotal: { amountMinor: 1250000, currency: 'INR' as const },
      property: { id: `demo-property-${draft.id}`, name: draft.hotelName, destination: draft.city, timezone: 'Asia/Kolkata', summary: 'Approved synthetic demonstration listing. No real reservation or transfer.', media: [], amenities: ['Synthetic demonstration'], inventoryDecision: 'eligible' as const, policyReviewedAt: now() },
    })).filter((offer) => !filters.maxBuyerTotal || offer.buyerTotal.amountMinor <= filters.maxBuyerTotal.amountMinor);
  }

  createCheckoutSimulation(buyerId: string, offerId: string): { order: SyntheticOrder; passport: ReservationPassport } | 'not_found' | 'own_listing' | 'exists' {
    const draftId = offerId.startsWith('demo-offer-') ? offerId.slice('demo-offer-'.length) : '';
    const row = this.database.prepare('SELECT d.* FROM demo_listings l JOIN seller_drafts d ON d.id = l.draft_id WHERE d.id = ?').get(draftId) as DraftRow | undefined;
    if (!row) return 'not_found';
    if (row.owner_id === buyerId) return 'own_listing';
    if (this.database.prepare('SELECT id FROM synthetic_orders WHERE buyer_id = ? AND draft_id = ?').get(buyerId, draftId)) return 'exists';
    const createdAt = now(); const order: SyntheticOrder = { id: randomUUID(), buyerId, draftId, status: 'confirmation_pending', synthetic: true, createdAt };
    const passport: ReservationPassport = { id: randomUUID(), bookingId: order.id, ownerId: buyerId, status: 'payment_confirmation_pending', version: 1, statusUpdatedAt: createdAt, nextAction: { label: 'Wait for simulated payment confirmation', owner: 'payment_provider' }, arrivalGuideAvailable: false };
    this.database.exec('BEGIN');
    try {
      this.database.prepare('INSERT INTO synthetic_orders (id, buyer_id, draft_id, status, created_at) VALUES (?, ?, ?, ?, ?)').run(order.id, buyerId, draftId, order.status, createdAt);
      this.database.prepare('INSERT INTO reservation_passports (id, order_id, owner_id, status, version, status_updated_at) VALUES (?, ?, ?, ?, ?, ?)').run(passport.id, order.id, buyerId, passport.status, passport.version, createdAt);
      this.database.prepare('INSERT INTO passport_state_events (id, passport_id, status, version, actor_id, occurred_at) VALUES (?, ?, ?, ?, ?, ?)').run(randomUUID(), passport.id, passport.status, passport.version, buyerId, createdAt);
      this.audit(buyerId, 'checkout_simulation.created', 'synthetic_order', order.id); this.audit(buyerId, 'reservation_passport.created', 'reservation_passport', passport.id);
      this.database.exec('COMMIT');
    } catch (error) { this.database.exec('ROLLBACK'); throw error; }
    return { order, passport };
  }

  listPassports(ownerId: string): ReservationPassport[] {
    const rows = this.database.prepare(`SELECT p.id, p.order_id, p.owner_id, e.status, e.version, e.occurred_at AS status_updated_at FROM reservation_passports p JOIN passport_state_events e ON e.passport_id = p.id AND e.version = (SELECT MAX(version) FROM passport_state_events WHERE passport_id = p.id) WHERE p.owner_id = ? ORDER BY e.occurred_at DESC`).all(ownerId) as unknown as { id: string; order_id: string; owner_id: string; status: ReservationPassport['status']; version: number; status_updated_at: string }[];
    return rows.map((row) => ({ id: row.id, bookingId: row.order_id, ownerId: row.owner_id, status: row.status, version: row.version, statusUpdatedAt: row.status_updated_at, nextAction: row.status === 'checked_in' ? undefined : { label: row.status === 'payment_confirmation_pending' ? 'Wait for simulated payment confirmation' : 'Continue the synthetic operations simulation', owner: row.status === 'payment_confirmation_pending' ? 'payment_provider' : 'stayrelay_operations' }, arrivalGuideAvailable: row.status === 'ready_for_arrival' || row.status === 'checked_in' }));
  }

  listAllPassports(): ReservationPassport[] {
    const owners = this.database.prepare('SELECT DISTINCT owner_id FROM reservation_passports').all() as unknown as { owner_id: string }[];
    return owners.flatMap((row) => this.listPassports(row.owner_id));
  }

  transitionPassport(operatorId: string, passportId: string, action: string, expectedVersion: number): ReservationPassport | 'not_found' | 'version_conflict' | 'invalid_transition' {
    const current = this.listAllPassports().find((passport) => passport.id === passportId);
    if (!current) return 'not_found';
    if (current.version !== expectedVersion) return 'version_conflict';
    const transitions: Record<string, Partial<Record<string, ReservationPassport['status']>>> = {
      payment_confirmation_pending: { confirm_payment: 'under_review' },
      under_review: { approve_transfer: 'eligible_for_transfer' },
      eligible_for_transfer: { start_transfer: 'transfer_in_progress' },
      transfer_in_progress: { confirm_transfer: 'transfer_confirmed' },
      transfer_confirmed: { ready_for_arrival: 'ready_for_arrival' },
      ready_for_arrival: { confirm_check_in: 'checked_in' },
    };
    const nextStatus = transitions[current.status]?.[action];
    if (!nextStatus) return 'invalid_transition';
    const version = current.version + 1; const occurredAt = now();
    try {
      this.database.prepare('INSERT INTO passport_state_events (id, passport_id, status, version, actor_id, occurred_at) VALUES (?, ?, ?, ?, ?, ?)').run(randomUUID(), passportId, nextStatus, version, operatorId, occurredAt);
    } catch (error) {
      if (error instanceof Error && error.message.includes('UNIQUE')) return 'version_conflict';
      throw error;
    }
    this.audit(operatorId, `passport.${action}`, 'reservation_passport', passportId);
    return { ...current, status: nextStatus, version, statusUpdatedAt: occurredAt, nextAction: nextStatus === 'checked_in' ? undefined : { label: 'Continue the synthetic operations simulation', owner: 'stayrelay_operations' }, arrivalGuideAvailable: nextStatus === 'ready_for_arrival' || nextStatus === 'checked_in' };
  }

  createSupportCase(ownerId: string, category: SyntheticSupportCase['category'], passportId?: string): SyntheticSupportCase | 'passport_not_found' {
    if (passportId && !this.listPassports(ownerId).some((passport) => passport.id === passportId)) return 'passport_not_found';
    const timestamp = now(); const item: SyntheticSupportCase = { id: randomUUID(), ownerId, ...(passportId ? { passportId } : {}), category, status: 'open', version: 1, createdAt: timestamp, updatedAt: timestamp };
    return this.supportTransaction(() => {
      this.database.prepare('INSERT INTO synthetic_support_cases (id, owner_id, passport_id, category, status, version, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)').run(item.id, ownerId, passportId ?? null, category, item.status, item.version, timestamp, timestamp);
      this.audit(ownerId, 'support_case.created', 'synthetic_support_case', item.id); return item;
    });
  }

  listSupportCases(ownerId?: string): SyntheticSupportCase[] {
    const rows = (ownerId ? this.database.prepare('SELECT * FROM synthetic_support_cases WHERE owner_id = ? ORDER BY created_at DESC').all(ownerId) : this.database.prepare('SELECT * FROM synthetic_support_cases ORDER BY created_at DESC').all()) as unknown as { id: string; owner_id: string; passport_id: string | null; category: SyntheticSupportCase['category']; status: SyntheticSupportCase['status']; version: number; created_at: string; updated_at: string }[];
    return rows.map((row) => ({ id: row.id, ownerId: row.owner_id, ...(row.passport_id ? { passportId: row.passport_id } : {}), category: row.category, status: row.status, version: row.version, createdAt: row.created_at, updatedAt: row.updated_at }));
  }

  transitionSupportCase(operatorId: string, caseId: string, status: 'escalated' | 'resolved', expectedVersion: number): SyntheticSupportCase | 'not_found' | 'version_conflict' {
    const item = this.listSupportCases().find((candidate) => candidate.id === caseId); if (!item) return 'not_found';
    if (item.version !== expectedVersion || item.status === 'resolved' || (item.status === 'escalated' && status === 'escalated')) return 'version_conflict';
    const version = item.version + 1; const updatedAt = now();
    return this.supportTransaction(() => {
      const changed = this.database.prepare('UPDATE synthetic_support_cases SET status = ?, version = ?, updated_at = ? WHERE id = ? AND version = ?').run(status, version, updatedAt, caseId, expectedVersion);
      if (!changed.changes) return 'version_conflict';
      this.audit(operatorId, `support_case.${status}`, 'synthetic_support_case', caseId);
      return { ...item, status, version, updatedAt };
    });
  }

  listSupportUpdates(ownerId: string): SyntheticSupportUpdate[] {
    const rows = this.database.prepare(`
      SELECT a.id, a.target_id AS caseId, a.action, a.occurred_at AS occurredAt
      FROM audit_events a JOIN synthetic_support_cases c ON c.id = a.target_id
      WHERE c.owner_id = ? AND a.target_type = 'synthetic_support_case'
        AND a.action IN ('support_case.created', 'support_case.escalated', 'support_case.resolved')
      ORDER BY a.rowid DESC LIMIT 100
    `).all(ownerId) as unknown as { id: string; caseId: string; action: string; occurredAt: string }[];
    return rows.map(({ action, ...row }) => ({ ...row, event: action.slice('support_case.'.length) as SyntheticSupportUpdate['event'] }));
  }

  private supportTransaction<T>(command: () => T): T {
    this.database.exec('BEGIN IMMEDIATE');
    try {
      const result = command();
      this.database.exec('COMMIT');
      return result;
    } catch (error) {
      this.database.exec('ROLLBACK');
      throw error;
    }
  }

  private audit(actorId: string | null, action: string, targetType: string, targetId: string) {
    this.database.prepare('INSERT INTO audit_events (id, actor_id, action, reason_code, correlation_id, target_type, target_id, occurred_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)').run(randomUUID(), actorId, action, action.replaceAll('.', '_'), randomUUID(), targetType, targetId, now());
  }
}

export const sessionTtlSeconds = SESSION_TTL_SECONDS;
