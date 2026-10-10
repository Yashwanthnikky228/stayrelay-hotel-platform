import type { Request, Response } from 'express';
import type { DemoReviewDecision, PropertySearchFilters, SellerReservationDraft } from '@stayrelay/domain';
import { sessionTtlSeconds, TestStore } from './testStore';

const cookieName = 'stayrelay_test_session';
const syntheticEmail = /^[a-z0-9._+-]+@(example|stayrelay)\.test$/i;
const isoDate = /^\d{4}-\d{2}-\d{2}$/;
const watermark = 'SYNTHETIC TEST DOCUMENT — NOT VALID FOR IDENTIFICATION.';

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
  if (!request.path.startsWith('/test-auth') && request.path !== '/account' && request.path !== '/properties' && request.path !== '/checkout-simulations' && request.path !== '/passports' && !request.path.startsWith('/seller-drafts') && !request.path.startsWith('/synthetic-evidence') && !request.path.startsWith('/operations/')) return false;
  response.setHeader('Cache-Control', 'no-store');
  if (!enabled && request.path === '/properties') return false;
  if (!enabled) { error(response, 503, 'TEST_AUTH_DISABLED', 'Local synthetic authentication is disabled.'); return true; }

  if (request.path === '/test-auth/accounts' && request.method === 'POST') {
    const input = body(request); const email = String(input.email ?? '').trim().toLowerCase(); const displayName = String(input.displayName ?? '').trim();
    if (!syntheticEmail.test(email) || email === 'operator@stayrelay.test' || !/^Demo [A-Za-z][A-Za-z -]{1,38}$/.test(displayName)) { error(response, 400, 'INVALID_SYNTHETIC_ACCOUNT', 'Use a non-operator reserved .test email and a display name beginning with Demo.'); return true; }
    const account = store.createAccount(email, displayName);
    if (!account) { error(response, 409, 'ACCOUNT_EXISTS', 'That synthetic account already exists. Sign in instead.'); return true; }
    setSession(response, store.createSession(account.id)); response.status(201).json({ account }); return true;
  }

  if (request.path === '/test-auth/operator-session' && request.method === 'POST') {
    const email = String(body(request).email ?? '').trim().toLowerCase();
    if (email !== 'operator@stayrelay.test') { error(response, 401, 'INVALID_OPERATOR_IDENTITY', 'Use the reserved local demo operator identity.'); return true; }
    const operator = store.ensureOperator(); setSession(response, store.createSession(operator.id)); response.status(200).json({ account: operator }); return true;
  }

  if (request.path === '/test-auth/session' && request.method === 'POST') {
    const email = String(body(request).email ?? '').trim().toLowerCase(); const account = store.findAccountByEmail(email);
    if (!syntheticEmail.test(email) || !account) { error(response, 401, 'INVALID_TEST_IDENTITY', 'Synthetic account not found.'); return true; }
    setSession(response, store.createSession(account.id)); response.status(200).json({ account }); return true;
  }

  if (request.path === '/properties' && request.method === 'GET') {
    const guests = Number(request.query.guests); const checkIn = String(request.query.checkIn ?? ''); const checkOut = String(request.query.checkOut ?? '');
    if (!isoDate.test(checkIn) || !isoDate.test(checkOut) || !Number.isInteger(guests) || guests < 1 || guests > 6) { error(response, 400, 'INVALID_SEARCH', 'Choose valid dates and one to six guests.'); return true; }
    const filters: PropertySearchFilters = { destination: String(request.query.destination ?? ''), checkIn, checkOut, guests };
    if (request.query.maxAmountMinor) filters.maxBuyerTotal = { amountMinor: Number(request.query.maxAmountMinor), currency: request.query.currency === 'USD' ? 'USD' : 'INR' };
    response.json({ offers: store.listPublishedOffers(filters) }); return true;
  }
  const token = tokenFrom(request); const account = token ? store.accountForSession(token) : undefined;
  if (request.path === '/test-auth/session' && request.method === 'DELETE') {
    if (token) store.revokeSession(token);
    response.setHeader('Set-Cookie', `${cookieName}=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0`); response.status(204).end(); return true;
  }
  if (!account) { error(response, 401, 'AUTHENTICATION_REQUIRED', 'Sign in with a synthetic test account.'); return true; }
  if (request.path.startsWith('/operations/')) {
    if (!store.isOperator(account.id)) { error(response, 403, 'OPERATOR_REQUIRED', 'Operator permission is required.'); return true; }
    if (request.path === '/operations/reviews' && request.method === 'GET') { response.json({ reviews: store.listReviewQueue() }); return true; }
    if (request.path === '/operations/passports' && request.method === 'GET') { response.json({ passports: store.listAllPassports() }); return true; }
    const passportTransition = request.path.match(/^\/operations\/passports\/([^/]+)\/transition$/);
    if (passportTransition && request.method === 'POST') {
      const input = body(request); const expectedVersion = Number(input.expectedVersion); const action = String(input.action ?? '');
      if (!Number.isInteger(expectedVersion) || expectedVersion < 1) { error(response, 400, 'INVALID_VERSION', 'Expected version must be a positive integer.'); return true; }
      const result = store.transitionPassport(account.id, passportTransition[1], action, expectedVersion);
      if (result === 'not_found') { error(response, 404, 'PASSPORT_NOT_FOUND', 'Reservation Passport not found.'); return true; }
      if (result === 'version_conflict') { error(response, 409, 'VERSION_CONFLICT', 'Passport changed; reload before retrying.'); return true; }
      if (result === 'invalid_transition') { error(response, 409, 'INVALID_TRANSITION', 'That transition is not allowed from the current status.'); return true; }
      response.json({ passport: result }); return true;
    }
    const decisionMatch = request.path.match(/^\/operations\/reviews\/([^/]+)\/(eligibility|risk)$/);
    if (decisionMatch && request.method === 'POST') {
      const decision = String(body(request).decision) as DemoReviewDecision;
      if (!['approved', 'rejected'].includes(decision)) { error(response, 400, 'INVALID_REVIEW_DECISION', 'Decision must be approved or rejected.'); return true; }
      const item = store.setReviewDecision(account.id, decisionMatch[1], decisionMatch[2] as 'eligibility' | 'risk', decision);
      if (!item) { error(response, 404, 'DRAFT_NOT_FOUND', 'Seller draft not found.'); return true; }
      response.json({ review: item }); return true;
    }
    error(response, 405, 'METHOD_NOT_ALLOWED', 'Method not allowed for this operations route.'); return true;
  }
  if (request.path === '/account' && request.method === 'GET') { response.json({ account }); return true; }
  if (request.path === '/checkout-simulations' && request.method === 'POST') {
    const result = store.createCheckoutSimulation(account.id, String(body(request).offerId ?? ''));
    if (result === 'not_found') { error(response, 404, 'OFFER_NOT_FOUND', 'Eligible synthetic offer not found.'); return true; }
    if (result === 'own_listing') { error(response, 409, 'OWN_LISTING_NOT_ALLOWED', 'A seller cannot buy their own synthetic listing.'); return true; }
    if (result === 'exists') { error(response, 409, 'ORDER_EXISTS', 'A synthetic order already exists for this buyer and offer.'); return true; }
    response.status(201).json(result); return true;
  }
  if (request.path === '/passports' && request.method === 'GET') { response.json({ passports: store.listPassports(account.id) }); return true; }
  if (request.path === '/seller-drafts' && request.method === 'GET') { response.json({ drafts: store.listDrafts(account.id) }); return true; }
  if (request.path === '/seller-drafts' && request.method === 'POST') {
    const input = body(request); const hotelName = String(input.hotelName ?? '').trim(); const city = String(input.city ?? '').trim(); const checkIn = String(input.checkIn ?? ''); const checkOut = String(input.checkOut ?? ''); const guestCount = Number(input.guestCount);
    if (!hotelName.startsWith('Demo ') || hotelName.length > 80 || !city || city.length > 80 || !isoDate.test(checkIn) || !isoDate.test(checkOut) || checkOut <= checkIn || !Number.isInteger(guestCount) || guestCount < 1 || guestCount > 6) { error(response, 400, 'INVALID_DRAFT', 'Use a Demo hotel name, valid city, ordered dates and one to six guests.'); return true; }
    const draft = store.createDraft(account.id, { hotelName, city, checkIn, checkOut, guestCount }); response.status(201).json({ draft }); return true;
  }
  const evidenceList = request.path.match(/^\/seller-drafts\/([^/]+)\/evidence$/);
  if (evidenceList && request.method === 'GET') {
    if (!store.getDraft(account.id, evidenceList[1])) { error(response, 404, 'DRAFT_NOT_FOUND', 'Seller draft not found.'); return true; }
    response.json({ evidence: store.listEvidence(account.id, evidenceList[1]) }); return true;
  }
  if (evidenceList && request.method === 'POST') {
    if (!store.getDraft(account.id, evidenceList[1])) { error(response, 404, 'DRAFT_NOT_FOUND', 'Seller draft not found.'); return true; }
    const contentType = request.headers['content-type']?.split(';')[0]; const filename = String(request.headers['x-file-name'] ?? '').trim();
    if ((contentType !== 'text/plain' && contentType !== 'application/pdf') || !Buffer.isBuffer(request.body) || request.body.byteLength === 0 || request.body.byteLength > 256 * 1024 || !/^[A-Za-z0-9][A-Za-z0-9._ -]{0,79}$/.test(filename)) { error(response, 400, 'INVALID_SYNTHETIC_DOCUMENT', 'Upload a bounded text or PDF synthetic document with a safe filename.'); return true; }
    const requestedScan = request.headers['x-scan-simulation'];
    const scanMode = !request.body.toString('utf8').includes(watermark) ? 'watermark_rejected' : requestedScan === 'unavailable' ? 'simulated_unavailable' : 'simulated_clean';
    const metadata = store.createEvidence(account.id, evidenceList[1], filename, contentType, request.body, scanMode);
    response.status(201).json({ evidence: metadata }); return true;
  }
  const evidenceDownload = request.path.match(/^\/synthetic-evidence\/([^/]+)\/content$/);
  if (evidenceDownload && request.method === 'GET') {
    const item = store.getEvidence(account.id, evidenceDownload[1]);
    if (!item) { error(response, 404, 'EVIDENCE_NOT_FOUND', 'Synthetic evidence not found.'); return true; }
    if (item.metadata.state !== 'simulated_clean') { error(response, 423, 'EVIDENCE_QUARANTINED', 'Synthetic evidence remains quarantined.'); return true; }
    response.setHeader('Content-Type', item.metadata.contentType); response.setHeader('Content-Disposition', `attachment; filename="${item.metadata.originalFilename}"`); response.send(item.bytes); return true;
  }
  const match = request.path.match(/^\/seller-drafts\/([^/]+)$/);
  if (match && request.method === 'GET') {
    const draft: SellerReservationDraft | undefined = store.getDraft(account.id, match[1]);
    if (!draft) { error(response, 404, 'DRAFT_NOT_FOUND', 'Seller draft not found.'); return true; }
    response.json({ draft }); return true;
  }
  error(response, 405, 'METHOD_NOT_ALLOWED', 'Method not allowed for this local test route.'); return true;
}
