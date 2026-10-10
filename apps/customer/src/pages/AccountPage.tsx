import { useEffect, useState, type FormEvent } from 'react';
import type { SellerReservationDraft, SyntheticAccount, SyntheticEvidenceMetadata } from '@stayrelay/domain';
import { accountApi, AccountApiError } from '../services/account';

type Workspace = 'buyer' | 'seller';

export function AccountPage() {
  const [account, setAccount] = useState<SyntheticAccount>();
  const [drafts, setDrafts] = useState<SellerReservationDraft[]>([]);
  const [workspace, setWorkspace] = useState<Workspace>('buyer');
  const [mode, setMode] = useState<'create' | 'signin'>('create');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string>();
  const [serviceAvailable, setServiceAvailable] = useState(true);
  const [evidence, setEvidence] = useState<Record<string, SyntheticEvidenceMetadata[]>>({});

  async function loadAccount() {
    try {
      const current = await accountApi.current();
      setAccount(current.account);
      setDrafts((await accountApi.drafts()).drafts);
    } catch (error) {
      if (!(error instanceof AccountApiError) || error.status !== 401) { setServiceAvailable(false); setMessage('Synthetic account tools are disabled on this hosted demo. Use the isolated local test environment; never upload real documents.'); }
      setAccount(undefined); setDrafts([]);
    } finally { setLoading(false); }
  }

  useEffect(() => { void loadAccount(); }, []);

  async function authenticate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setMessage(undefined);
    const form = new FormData(event.currentTarget);
    const email = String(form.get('email') ?? '');
    try {
      const result = mode === 'create' ? await accountApi.create(email, String(form.get('displayName') ?? '')) : await accountApi.signIn(email);
      setAccount(result.account); setDrafts((await accountApi.drafts()).drafts); setMessage(`Signed in as ${result.account.displayName}.`);
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Sign-in failed.'); }
  }

  async function createDraft(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setMessage(undefined);
    const form = new FormData(event.currentTarget);
    try {
      const result = await accountApi.createDraft({ hotelName: String(form.get('hotelName') ?? ''), city: String(form.get('city') ?? ''), checkIn: String(form.get('checkIn') ?? ''), checkOut: String(form.get('checkOut') ?? ''), guestCount: Number(form.get('guestCount')) });
      setDrafts((current) => [result.draft, ...current]); setMessage('Synthetic reservation draft saved. It is not a listing.'); event.currentTarget.reset();
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Draft could not be saved.'); }
  }

  async function signOut() {
    await accountApi.signOut(); setAccount(undefined); setDrafts([]); setWorkspace('buyer'); setMessage('Signed out. Protected account data has been cleared from this view.');
  }

  async function attachFixture(draftId: string) {
    setMessage(undefined);
    try {
      const result = await accountApi.attachSyntheticFixture(draftId);
      setEvidence((current) => ({ ...current, [draftId]: [result.evidence, ...(current[draftId] ?? [])] }));
      setMessage('Generated synthetic evidence attached privately and passed the simulated scan.');
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Synthetic fixture could not be attached.'); }
  }

  if (loading) return <p className="rounded-card border border-divider bg-surface p-6" role="status">Checking the local test session…</p>;

  if (!account) return (
    <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1fr_0.9fr]">
      <section className="rounded-signature bg-ink-900 p-7 text-white md:p-10">
        <p className="text-sm font-semibold text-brand-50">Local synthetic test environment</p>
        <h1 className="mt-3 font-editorial text-4xl md:text-5xl">One customer account. Buyer and seller workspaces.</h1>
        <p className="mt-5 leading-7 text-divider">This local adapter creates fictional accounts only. It does not send email, store passwords, collect identity documents or establish hosted authentication.</p>
      </section>
      <section className="rounded-card border border-divider bg-surface p-6 shadow-sm">
        {!serviceAvailable ? <div><p className="inline-flex rounded-full bg-attention-50 px-3 py-1 text-sm font-semibold text-attention-800">Hosted demo safety lock</p><h2 className="mt-4 text-2xl font-semibold">Account and evidence tools are disabled online</h2><p className="mt-3 leading-7 text-ink-600">The current local SQLite database and private filesystem are not durable hosted services. This page will not accept identity documents or create public demo sessions.</p></div> : <>
        <div className="flex gap-2" role="group" aria-label="Account action">
          {(['create','signin'] as const).map((value) => <button className={`min-h-11 rounded-control px-4 text-sm font-semibold ${mode === value ? 'bg-brand-50 text-brand-700' : 'text-ink-600'}`} key={value} type="button" onClick={() => setMode(value)}>{value === 'create' ? 'Create test account' : 'Sign in again'}</button>)}
        </div>
        <form className="mt-6 space-y-4" onSubmit={authenticate}>
          {mode === 'create' && <label className="field-label">Synthetic display name<input className="field-control" name="displayName" required placeholder="Demo Seller One" /></label>}
          <label className="field-label">Reserved test email<input className="field-control" name="email" type="email" required placeholder="seller-one@example.test" /></label>
          <button className="min-h-12 w-full rounded-control bg-brand-600 px-5 font-semibold text-white" type="submit">{mode === 'create' ? 'Create and sign in' : 'Sign in to test account'}</button>
        </form>
        {message && <p className="mt-4 rounded-control bg-attention-50 p-3 text-sm text-attention-800" role="status">{message}</p>}
        </>}
      </section>
    </div>
  );

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4 rounded-card border border-divider bg-surface p-5">
        <div><p className="text-xs font-semibold uppercase tracking-wider text-attention-800">Synthetic test account</p><h1 className="mt-1 text-2xl font-semibold">{account.displayName}</h1><p className="text-sm text-ink-600">{account.email}</p></div>
        <button className="min-h-11 rounded-control border border-divider px-4 text-sm font-semibold" type="button" onClick={() => void signOut()}>Sign out</button>
      </header>
      <nav aria-label="Customer workspaces" className="flex gap-2 rounded-card bg-divider/50 p-1">
        {(['buyer','seller'] as const).map((value) => <button className={`min-h-11 flex-1 rounded-control text-sm font-semibold capitalize ${workspace === value ? 'bg-surface text-brand-700 shadow-sm' : 'text-ink-600'}`} key={value} type="button" aria-pressed={workspace === value} onClick={() => setWorkspace(value)}>{value} workspace</button>)}
      </nav>
      {message && <p className="rounded-control bg-brand-50 p-3 text-sm text-brand-700" role="status">{message}</p>}
      {workspace === 'buyer' ? (
        <section className="rounded-card border border-divider bg-surface p-6"><p className="text-sm font-semibold text-brand-700">Buyer workspace</p><h2 className="mt-2 text-2xl font-semibold">Saved stays and orders will appear here.</h2><p className="mt-3 text-ink-600">No eligible inventory or order exists for this synthetic account yet.</p></section>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <form className="space-y-4 rounded-card border border-divider bg-surface p-6" onSubmit={createDraft}>
            <div><p className="text-sm font-semibold text-brand-700">Seller workspace</p><h2 className="mt-1 text-xl font-semibold">Save a synthetic reservation draft</h2><p className="mt-2 text-sm text-ink-600">Drafts are private and never publish automatically.</p></div>
            <label className="field-label">Demo hotel name<input className="field-control" name="hotelName" required placeholder="Demo Harbour House" /></label>
            <label className="field-label">City<input className="field-control" name="city" required placeholder="Mumbai" /></label>
            <div className="grid gap-4 sm:grid-cols-2"><label className="field-label">Check in<input className="field-control" name="checkIn" type="date" required /></label><label className="field-label">Check out<input className="field-control" name="checkOut" type="date" required /></label></div>
            <label className="field-label">Guests<select className="field-control" name="guestCount">{[1,2,3,4,5,6].map((count) => <option key={count}>{count}</option>)}</select></label>
            <button className="min-h-12 w-full rounded-control bg-brand-600 px-5 font-semibold text-white" type="submit">Save private draft</button>
          </form>
          <section className="rounded-card border border-divider bg-surface p-6"><h2 className="text-xl font-semibold">Your private drafts</h2>{drafts.length === 0 ? <p className="mt-4 text-ink-600">No seller drafts yet.</p> : <ul className="mt-4 space-y-3">{drafts.map((draft) => <li className="rounded-control bg-canvas p-4" key={draft.id}><div className="flex justify-between gap-4"><strong>{draft.hotelName}</strong><span className="text-xs font-semibold uppercase text-attention-800">Draft · not listed</span></div><p className="mt-1 text-sm text-ink-600">{draft.city} · {draft.checkIn} to {draft.checkOut} · {draft.guestCount} guests</p><p className="mt-2 text-xs text-ink-600">Synthetic record ID: {draft.id}</p><button className="mt-3 min-h-11 rounded-control border border-brand-600 px-4 text-sm font-semibold text-brand-700" type="button" onClick={() => void attachFixture(draft.id)}>Attach generated synthetic evidence</button>{evidence[draft.id]?.map((item) => <p className="mt-2 text-xs font-semibold text-brand-700" key={item.id}>{item.originalFilename} · {item.state.replace('_', ' ')}</p>)}</li>)}</ul>}</section>
        </div>
      )}
    </div>
  );
}

export default AccountPage;
