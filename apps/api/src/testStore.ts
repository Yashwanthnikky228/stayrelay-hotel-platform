import { createHash, randomBytes, randomUUID } from 'node:crypto';
import { DatabaseSync } from 'node:sqlite';
import type { SellerReservationDraft, SyntheticAccount } from '@stayrelay/domain';

const SESSION_TTL_SECONDS = 60 * 60 * 8;

function now() { return new Date().toISOString(); }
function digest(token: string) { return createHash('sha256').update(token).digest('hex'); }

interface AccountRow { id: string; email: string; display_name: string; created_at: string }
interface DraftRow { id: string; owner_id: string; hotel_name: string; city: string; check_in: string; check_out: string; guest_count: number; status: 'draft'; created_at: string; updated_at: string }

function accountFromRow(row: AccountRow): SyntheticAccount {
  return { id: row.id, email: row.email, displayName: row.display_name, createdAt: row.created_at };
}

function draftFromRow(row: DraftRow): SellerReservationDraft {
  return { id: row.id, ownerId: row.owner_id, hotelName: row.hotel_name, city: row.city, checkIn: row.check_in, checkOut: row.check_out, guestCount: row.guest_count, status: row.status, synthetic: true, createdAt: row.created_at, updatedAt: row.updated_at };
}

export class TestStore {
  readonly database: DatabaseSync;

  constructor(path: string) {
    this.database = new DatabaseSync(path);
    this.database.exec(`
      PRAGMA foreign_keys = ON;
      CREATE TABLE IF NOT EXISTS accounts (id TEXT PRIMARY KEY, email TEXT NOT NULL UNIQUE, display_name TEXT NOT NULL, created_at TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS sessions (token_digest TEXT PRIMARY KEY, account_id TEXT NOT NULL REFERENCES accounts(id), expires_at TEXT NOT NULL, revoked_at TEXT);
      CREATE TABLE IF NOT EXISTS seller_drafts (id TEXT PRIMARY KEY, owner_id TEXT NOT NULL REFERENCES accounts(id), hotel_name TEXT NOT NULL, city TEXT NOT NULL, check_in TEXT NOT NULL, check_out TEXT NOT NULL, guest_count INTEGER NOT NULL, status TEXT NOT NULL CHECK(status = 'draft'), created_at TEXT NOT NULL, updated_at TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS audit_events (id TEXT PRIMARY KEY, actor_id TEXT, action TEXT NOT NULL, target_type TEXT NOT NULL, target_id TEXT NOT NULL, occurred_at TEXT NOT NULL);
    `);
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

  private audit(actorId: string | null, action: string, targetType: string, targetId: string) {
    this.database.prepare('INSERT INTO audit_events (id, actor_id, action, target_type, target_id, occurred_at) VALUES (?, ?, ?, ?, ?, ?)').run(randomUUID(), actorId, action, targetType, targetId, now());
  }
}

export const sessionTtlSeconds = SESSION_TTL_SECONDS;
