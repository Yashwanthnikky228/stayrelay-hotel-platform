import type { Request, Response } from 'express';
import type { SellerReservationDraft } from '@stayrelay/domain';
import { sessionTtlSeconds, TestStore } from './testStore';

const cookieName = 'stayrelay_test_session';
const syntheticEmail = /^[a-z0-9._+-]+@(example|stayrelay)\.test$/i;
const isoDate = /^\d{4}-\d{2}-\d{2}$/;

function body(request: Request): Record<string, unknown> { return request.body && typeof request.body === 'object' ? request.body as Record<string, unknown> : {}; }
function tokenFrom(request: Request): string | undefined {
  return request.headers.cookie?.split(';').map((value) => value.trim()).find((value) => value.startsWith(`${cookieName}=`))?.slice(cookieName.length + 1);
}
function error(response: Response, status: number, code: string, message: string) { return response.status(status).json({ error: { code, message } }); }
function setSession(response: Response, token: string) {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  response.setHeader('Set-Cookie', `${cookieName}=${token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${sessionTtlSeconds}${secure}`);
}

export function handleTestAccountRoute(request: Request, response: Response, store: TestStore, enabled: boolean): boolean {
  if (!request.path.startsWith('/test-auth') && request.path !== '/account' && !request.path.startsWith('/seller-drafts')) return false;
  response.setHeader('Cache-Control', 'no-store');
  if (!enabled) { error(response, 503, 'TEST_AUTH_DISABLED', 'Local synthetic authentication is disabled.'); return true; }

  if (request.path === '/test-auth/accounts' && request.method === 'POST') {
    const input = body(request); const email = String(input.email ?? '').trim().toLowerCase(); const displayName = String(input.displayName ?? '').trim();
    if (!syntheticEmail.test(email) || !/^Demo [A-Za-z][A-Za-z -]{1,38}$/.test(displayName)) { error(response, 400, 'INVALID_SYNTHETIC_ACCOUNT', 'Use a reserved .test email and a display name beginning with Demo.'); return true; }
    const account = store.createAccount(email, displayName);
    if (!account) { error(response, 409, 'ACCOUNT_EXISTS', 'That synthetic account already exists. Sign in instead.'); return true; }
    setSession(response, store.createSession(account.id)); response.status(201).json({ account }); return true;
  }

  if (request.path === '/test-auth/session' && request.method === 'POST') {
    const email = String(body(request).email ?? '').trim().toLowerCase(); const account = store.findAccountByEmail(email);
    if (!syntheticEmail.test(email) || !account) { error(response, 401, 'INVALID_TEST_IDENTITY', 'Synthetic account not found.'); return true; }
    setSession(response, store.createSession(account.id)); response.status(200).json({ account }); return true;
  }

  const token = tokenFrom(request); const account = token ? store.accountForSession(token) : undefined;
  if (request.path === '/test-auth/session' && request.method === 'DELETE') {
    if (token) store.revokeSession(token);
    response.setHeader('Set-Cookie', `${cookieName}=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0`); response.status(204).end(); return true;
  }
  if (!account) { error(response, 401, 'AUTHENTICATION_REQUIRED', 'Sign in with a synthetic test account.'); return true; }
  if (request.path === '/account' && request.method === 'GET') { response.json({ account }); return true; }
  if (request.path === '/seller-drafts' && request.method === 'GET') { response.json({ drafts: store.listDrafts(account.id) }); return true; }
  if (request.path === '/seller-drafts' && request.method === 'POST') {
    const input = body(request); const hotelName = String(input.hotelName ?? '').trim(); const city = String(input.city ?? '').trim(); const checkIn = String(input.checkIn ?? ''); const checkOut = String(input.checkOut ?? ''); const guestCount = Number(input.guestCount);
    if (!hotelName.startsWith('Demo ') || hotelName.length > 80 || !city || city.length > 80 || !isoDate.test(checkIn) || !isoDate.test(checkOut) || checkOut <= checkIn || !Number.isInteger(guestCount) || guestCount < 1 || guestCount > 6) { error(response, 400, 'INVALID_DRAFT', 'Use a Demo hotel name, valid city, ordered dates and one to six guests.'); return true; }
    const draft = store.createDraft(account.id, { hotelName, city, checkIn, checkOut, guestCount }); response.status(201).json({ draft }); return true;
  }
  const match = request.path.match(/^\/seller-drafts\/([^/]+)$/);
  if (match && request.method === 'GET') {
    const draft: SellerReservationDraft | undefined = store.getDraft(account.id, match[1]);
    if (!draft) { error(response, 404, 'DRAFT_NOT_FOUND', 'Seller draft not found.'); return true; }
    response.json({ draft }); return true;
  }
  error(response, 405, 'METHOD_NOT_ALLOWED', 'Method not allowed for this local test route.'); return true;
}
