import type { SellerReservationDraft, SyntheticAccount, SyntheticEvidenceMetadata } from '@stayrelay/domain';

export class AccountApiError extends Error {
  constructor(message: string, readonly status: number, readonly code?: string) { super(message); }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`/api${path}`, { ...init, headers: { 'content-type': 'application/json', ...init?.headers } });
  if (response.status === 204) return undefined as T;
  const payload = await response.json() as T & { error?: { code?: string; message?: string } };
  if (!response.ok) throw new AccountApiError(payload.error?.message ?? 'Account request failed.', response.status, payload.error?.code);
  return payload;
}

export const accountApi = {
  current: () => request<{ account: SyntheticAccount }>('/account'),
  create: (email: string, displayName: string) => request<{ account: SyntheticAccount }>('/test-auth/accounts', { method: 'POST', body: JSON.stringify({ email, displayName }) }),
  signIn: (email: string) => request<{ account: SyntheticAccount }>('/test-auth/session', { method: 'POST', body: JSON.stringify({ email }) }),
  signOut: () => request<void>('/test-auth/session', { method: 'DELETE' }),
  drafts: () => request<{ drafts: SellerReservationDraft[] }>('/seller-drafts'),
  createDraft: (input: Pick<SellerReservationDraft, 'hotelName' | 'city' | 'checkIn' | 'checkOut' | 'guestCount'>) => request<{ draft: SellerReservationDraft }>('/seller-drafts', { method: 'POST', body: JSON.stringify(input) }),
  evidence: (draftId: string) => request<{ evidence: SyntheticEvidenceMetadata[] }>(`/seller-drafts/${draftId}/evidence`),
  attachSyntheticFixture: async (draftId: string) => {
    const response = await fetch(`/api/seller-drafts/${draftId}/evidence`, { method: 'POST', headers: { 'content-type': 'text/plain', 'x-file-name': 'stayrelay-synthetic-reservation.txt' }, body: 'SYNTHETIC TEST DOCUMENT — NOT VALID FOR IDENTIFICATION.\nGenerated StayRelay demonstration reservation evidence. No real guest or booking data.' });
    const payload = await response.json() as { evidence?: SyntheticEvidenceMetadata; error?: { code?: string; message?: string } };
    if (!response.ok || !payload.evidence) throw new AccountApiError(payload.error?.message ?? 'Synthetic evidence could not be attached.', response.status, payload.error?.code);
    return { evidence: payload.evidence };
  },
};
