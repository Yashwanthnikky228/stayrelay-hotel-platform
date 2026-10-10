import { useEffect, useState, type ReactNode } from 'react';
import { isRouteErrorResponse, Links, Meta, Scripts, ScrollRestoration, useRouteError } from 'react-router';
import type { DemoReviewDecision, DemoReviewQueueItem, ReservationPassport } from '@stayrelay/domain';
import '@stayrelay/ui/styles.css';

export function Layout({ children }: { children: ReactNode }) {
  return <html lang="en"><head>
    <meta charSet="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#F5F7FA" />
    <meta name="description" content="StayRelay operations workspace in development." />
    <title>Operations | StayRelay</title><Meta /><Links />
  </head><body>{children}<ScrollRestoration /><Scripts /></body></html>;
}

export function HydrateFallback() {
  return <main className="mx-auto max-w-operations p-8" role="status">Loading StayRelay operations…</main>;
}

export default function OperationsRoot() {
  const [reviews, setReviews] = useState<DemoReviewQueueItem[]>();
  const [message, setMessage] = useState('Checking protected operator access…');
  const [available, setAvailable] = useState(true);
  const [passports, setPassports] = useState<ReservationPassport[]>([]);

  async function loadReviews() {
    const response = await fetch('/api/operations/reviews', { headers: { Accept: 'application/json' } });
    if (response.status === 401) { setReviews(undefined); setMessage('Sign in with the reserved local demo operator identity.'); return; }
    if (!response.ok) { setAvailable(false); setMessage('Operations review is disabled on this hosted demo until managed identity, database and private storage are configured.'); return; }
    const payload = await response.json() as { reviews: DemoReviewQueueItem[] }; setReviews(payload.reviews); setMessage(`${payload.reviews.length} synthetic submissions in the review queue.`);
    const passportResponse = await fetch('/api/operations/passports', { headers: { Accept: 'application/json' } });
    if (passportResponse.ok) setPassports((await passportResponse.json() as { passports: ReservationPassport[] }).passports);
  }
  useEffect(() => { void loadReviews(); }, []);
  async function signIn() {
    const response = await fetch('/api/test-auth/operator-session', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ email: 'operator@stayrelay.test' }) });
    if (!response.ok) { setAvailable(false); setMessage('Local demo operator access is unavailable.'); return; }
    await loadReviews();
  }
  async function decide(draftId: string, kind: 'eligibility' | 'risk', decision: Exclude<DemoReviewDecision, 'pending'>) {
    const response = await fetch(`/api/operations/reviews/${draftId}/${kind}`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ decision }) });
    if (!response.ok) { setMessage('The decision was not saved. No listing state changed.'); return; }
    await loadReviews();
  }
  async function advance(passport: ReservationPassport) {
    const actions: Partial<Record<ReservationPassport['status'], string>> = { payment_confirmation_pending: 'confirm_payment', under_review: 'approve_transfer', eligible_for_transfer: 'start_transfer', transfer_in_progress: 'confirm_transfer', transfer_confirmed: 'ready_for_arrival', ready_for_arrival: 'confirm_check_in' };
    const action = actions[passport.status]; if (!action) return;
    const response = await fetch(`/api/operations/passports/${passport.id}/transition`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ action, expectedVersion: passport.version }) });
    if (!response.ok) { setMessage('Passport changed or the transition was denied. Reloaded the server state.'); }
    await loadReviews();
  }
  return <div className="min-h-screen bg-canvas text-ink-900">
    <a className="skip-link" href="#main-content">Skip to content</a>
    <header className="border-b border-divider bg-surface">
      <div className="mx-auto flex min-h-16 max-w-operations items-center gap-4 px-4 md:px-6">
        <span aria-hidden="true" className="grid h-9 w-9 place-items-center rounded-full bg-ink-900 font-editorial text-xl text-white">s</span>
        <span className="font-semibold">StayRelay</span>
        <span className="ml-auto text-sm font-medium text-ink-600">Operations</span>
      </div>
    </header>
    <main id="main-content" className="mx-auto max-w-operations px-4 py-10 md:px-6">
      <p className="text-sm font-medium text-brand-700">Privileged workspace</p>
      <h1 className="mt-3 font-editorial text-4xl">Hotel operations</h1>
      <p className="mt-4 max-w-2xl leading-7 text-ink-600">Review synthetic evidence and record eligibility and risk as independent, audited decisions.</p>
      <section className="mt-8 rounded-card border border-divider bg-surface p-6 md:p-8" aria-labelledby="access-title">
        <p className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${available ? 'bg-brand-50 text-brand-700' : 'bg-attention-50 text-attention-800'}`}>{available ? 'Protected local demo' : 'Hosted safety lock'}</p>
        <h2 id="access-title" className="mt-4 text-xl font-semibold">Synthetic reservation review</h2>
        <p className="mt-2 max-w-2xl leading-6 text-ink-600" role="status">{message}</p>
        {available && !reviews && <button className="mt-5 min-h-11 rounded-control bg-ink-900 px-5 font-semibold text-white" type="button" onClick={() => void signIn()}>Enter local demo operations</button>}
      </section>
      {reviews && <section className="mt-6 space-y-4" aria-label="Synthetic review queue">{reviews.length === 0 ? <p className="rounded-card border border-divider bg-surface p-6">No synthetic submissions are waiting.</p> : reviews.map((item) => <article className="rounded-card border border-divider bg-surface p-6" key={item.draft.id}><div className="flex flex-wrap justify-between gap-3"><div><h2 className="text-xl font-semibold">{item.draft.hotelName}</h2><p className="mt-1 text-sm text-ink-600">{item.draft.city} · {item.draft.checkIn} to {item.draft.checkOut}</p></div><span className={`h-fit rounded-full px-3 py-1 text-xs font-semibold ${item.published ? 'bg-brand-50 text-brand-700' : 'bg-attention-50 text-attention-800'}`}>{item.published ? 'Published demo listing' : 'Not published'}</span></div><p className="mt-4 text-sm">Evidence: {item.evidence.length ? item.evidence.map((e) => `${e.originalFilename} (${e.state.replace('_', ' ')})`).join(', ') : 'None — fail closed'}</p><div className="mt-5 grid gap-4 md:grid-cols-2">{(['eligibility','risk'] as const).map((kind) => { const value = kind === 'eligibility' ? item.eligibilityDecision : item.riskDecision; return <div className="rounded-control bg-canvas p-4" key={kind}><p className="text-sm font-semibold capitalize">{kind}: {value}</p><div className="mt-3 flex gap-2"><button className="min-h-10 rounded-control bg-brand-600 px-3 text-sm font-semibold text-white" type="button" onClick={() => void decide(item.draft.id, kind, 'approved')}>Approve</button><button className="min-h-10 rounded-control border border-divider px-3 text-sm font-semibold" type="button" onClick={() => void decide(item.draft.id, kind, 'rejected')}>Reject</button></div></div>; })}</div></article>)}</section>}
      {reviews && <section className="mt-8 space-y-4" aria-label="Reservation Passport simulations"><div><p className="text-sm font-medium text-brand-700">Synthetic lifecycle controls</p><h2 className="mt-1 text-2xl font-semibold">Reservation Passports</h2></div>{passports.length === 0 ? <p className="rounded-card border border-divider bg-surface p-6">No checkout simulation has created a Passport.</p> : passports.map((passport) => <article className="rounded-card border border-divider bg-surface p-6" key={passport.id}><p className="text-xs font-semibold uppercase tracking-wider text-attention-800">Version {passport.version} · simulated only</p><h3 className="mt-2 text-xl font-semibold capitalize">{passport.status.replaceAll('_', ' ')}</h3><p className="mt-2 text-sm text-ink-600">No live payment, reservation transfer or hotel check-in is performed.</p><button className="mt-4 min-h-11 rounded-control bg-ink-900 px-4 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-divider disabled:text-ink-600" type="button" disabled={passport.status === 'checked_in'} onClick={() => void advance(passport)}>{passport.status === 'checked_in' ? 'Simulation complete' : 'Advance synthetic status'}</button></article>)}</section>}
    </main>
  </div>;
}

export function ErrorBoundary() {
  const error = useRouteError();
  const missing = isRouteErrorResponse(error) && error.status === 404;
  return <main className="mx-auto max-w-operations p-8">
    <h1 className="text-3xl font-semibold">{missing ? 'Page not found' : 'Operations is unavailable'}</h1>
    <p className="mt-4">No operational record was changed.</p>
  </main>;
}
