import { useEffect, useState, type FormEvent } from 'react';
import type { ReservationPassport, SyntheticNotificationPreference, SyntheticRecoveryCase, SyntheticRecoveryRequestType, SyntheticSupportCase, SyntheticSupportUpdate } from '@stayrelay/domain';
import { accountApi } from '../services/account';

const labels: Record<SyntheticSupportCase['category'], string> = {
  transfer_failed: 'Transfer simulation failed',
  arrival_help: 'Synthetic arrival help',
  refund_question: 'Refund simulation question',
};

function SupportCaseCard({ item }: { item: SyntheticSupportCase }) {
  return <article className="rounded-card border border-divider bg-surface p-6"><div className="flex flex-wrap items-center justify-between gap-3"><h2 className="text-lg font-semibold">{labels[item.category]}</h2><span className="rounded-full bg-canvas px-3 py-1 text-xs font-semibold capitalize">{item.status}</span></div><p className="mt-3 text-sm text-ink-600">Version {item.version} · Updated {new Date(item.updatedAt).toLocaleString()}</p>{item.passportId && <p className="mt-2 break-all text-sm text-ink-600">Passport: {item.passportId}</p>}</article>;
}

export default function SupportPage() {
  const [cases, setCases] = useState<SyntheticSupportCase[]>();
  const [updates, setUpdates] = useState<SyntheticSupportUpdate[]>([]);
  const [passports, setPassports] = useState<ReservationPassport[]>([]);
  const [category, setCategory] = useState<SyntheticSupportCase['category']>('transfer_failed');
  const [passportId, setPassportId] = useState('');
  const [message, setMessage] = useState('Checking your protected synthetic records…');
  const [saving, setSaving] = useState(false);
  const [preference, setPreference] = useState<SyntheticNotificationPreference>();
  const [recoveryCases, setRecoveryCases] = useState<SyntheticRecoveryCase[]>([]);
  const [recoveryType, setRecoveryType] = useState<SyntheticRecoveryRequestType>('cancellation');
  const [recoveryReason, setRecoveryReason] = useState('Synthetic demo recovery request');
  const [recoveryExplanation, setRecoveryExplanation] = useState('This is a synthetic test request. No real payment or reservation change is requested.');

  async function load() {
    setMessage('Checking your protected synthetic records…');
    try {
      const [caseResult, passportResult, preferenceResult, recoveryResult] = await Promise.all([accountApi.supportCases(), accountApi.passports(), accountApi.notificationPreference(), accountApi.recoveryCases()]);
      setCases(caseResult.cases); setUpdates(caseResult.updates); setPassports(passportResult.passports); setPreference(preferenceResult.preference); setRecoveryCases(recoveryResult.cases);
      setMessage(caseResult.cases.length ? '' : 'No synthetic support cases yet.');
    } catch { setCases(undefined); setUpdates([]); setPreference(undefined); setRecoveryCases([]); setMessage('Support cases are unavailable. Check your connection and sign in to the local demo, then retry. Hosted support remains disabled.'); }
  }
  useEffect(() => { void load(); }, []);
  async function submit(event: FormEvent) {
    event.preventDefault(); setSaving(true); setMessage('Saving the synthetic case…');
    try { await accountApi.createSupportCase(category, passportId || undefined); await load(); }
    catch { setMessage('The case was not saved. No reservation, transfer, or money state changed.'); }
    finally { setSaving(false); }
  }
  async function togglePreference() {
    if (!preference) return;
    try { const result = await accountApi.setNotificationPreference(!preference.inAppEnabled, preference.version); setPreference(result.preference); setMessage('Saved the synthetic in-app update preference.'); }
    catch { setMessage('Preference changed or unavailable. Reload the server state before retrying.'); }
  }
  async function submitRecovery(event: FormEvent) {
    event.preventDefault(); const passport = passports[0]; if (!passport) { setMessage('A synthetic Reservation Passport is required before opening recovery.'); return; }
    try { await accountApi.createRecoveryCase({ passportId: passport.id, requestType: recoveryType, reason: recoveryReason, explanation: recoveryExplanation }); await load(); setMessage('Synthetic recovery case submitted for operations review.'); }
    catch { setMessage('Recovery case was not submitted. No refund, payment, transfer, or reservation state changed.'); }
  }

  return <section className="mx-auto max-w-3xl space-y-6">
    <div><p className="text-sm font-medium text-brand-700">Synthetic help workflow</p><h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">Support and recovery</h1><p className="mt-3 max-w-2xl leading-7 text-ink-600">Create a constrained test case for a simulated transfer, arrival, or refund question. Do not enter real booking, identity, payment, or health information.</p></div>
    {cases && <form className="rounded-card border border-divider bg-surface p-6 md:p-8" onSubmit={submit} aria-labelledby="new-case-title"><h2 id="new-case-title" className="text-xl font-semibold">Open a synthetic case</h2><div className="mt-5 grid gap-4 sm:grid-cols-2"><label className="grid gap-2 text-sm font-semibold">Category<select className="min-h-11 rounded-control border border-divider bg-surface px-3 font-normal" value={category} onChange={(event) => setCategory(event.target.value as SyntheticSupportCase['category'])}>{Object.entries(labels).map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label><label className="grid gap-2 text-sm font-semibold">Reservation Passport (optional)<select className="min-h-11 rounded-control border border-divider bg-surface px-3 font-normal" value={passportId} onChange={(event) => setPassportId(event.target.value)}><option value="">No Passport selected</option>{passports.map((passport) => <option value={passport.id} key={passport.id}>{passport.status.replaceAll('_', ' ')} · {passport.id.slice(0, 8)}</option>)}</select></label></div><button className="mt-5 min-h-11 rounded-control bg-ink-900 px-5 font-semibold text-white disabled:cursor-not-allowed disabled:bg-divider" disabled={saving} type="submit">{saving ? 'Saving…' : 'Create synthetic case'}</button></form>}
    <p className="text-sm text-ink-600" role="status">{message}</p>
    {cases && <div className="space-y-4" aria-label="Your synthetic support cases">{cases.map((item) => <SupportCaseCard item={item} key={item.id} />)}</div>}
    {cases && <section className="rounded-card border border-divider bg-surface p-6" aria-labelledby="support-updates-title"><h2 id="support-updates-title" className="text-xl font-semibold">Case updates</h2><p className="mt-2 text-sm text-ink-600">Latest 100 saved demo updates. Email and SMS delivery are disabled.</p>{updates.length ? <ol className="mt-4 space-y-3">{updates.map((update) => <li key={update.id} className="rounded-control bg-canvas p-3 text-sm"><p className="font-semibold capitalize">Case {update.event}</p><p className="mt-1 break-all text-ink-600">{update.caseId}</p><time className="text-ink-600" dateTime={update.occurredAt}>{new Date(update.occurredAt).toLocaleString()}</time></li>)}</ol> : <p className="mt-4 text-sm">No saved updates yet.</p>}<button type="button" className="mt-4 min-h-11 rounded-control border border-divider px-4 text-sm font-semibold" onClick={() => void load()}>Refresh case updates</button></section>}
    {cases && preference && <section className="rounded-card border border-divider bg-surface p-6" aria-labelledby="notification-preference-title"><h2 id="notification-preference-title" className="text-xl font-semibold">In-app update preference</h2><p className="mt-2 text-sm text-ink-600">Controls this local feed only. No email, SMS, push or webhook is sent.</p><button className="mt-4 min-h-11 rounded-control border border-divider px-4 text-sm font-semibold" type="button" onClick={() => void togglePreference()}>{preference.inAppEnabled ? 'Disable in-app updates' : 'Enable in-app updates'}</button><p className="mt-2 text-xs text-ink-600">Version {preference.version}</p></section>}
    {cases && <form className="rounded-card border border-divider bg-surface p-6" onSubmit={submitRecovery} aria-labelledby="recovery-title"><h2 id="recovery-title" className="text-xl font-semibold">Open synthetic recovery</h2><p className="mt-2 text-sm text-ink-600">Operations can review this test request. It cannot trigger a real refund or reservation change.</p><div className="mt-4 grid gap-4 sm:grid-cols-2"><label className="grid gap-2 text-sm font-semibold">Request type<select className="min-h-11 rounded-control border border-divider bg-surface px-3 font-normal" value={recoveryType} onChange={(event) => setRecoveryType(event.target.value as SyntheticRecoveryRequestType)}>{[['cancellation','Cancellation'],['refund_review','Refund review'],['transfer_failure','Transfer failure'],['arrival_issue','Arrival/check-in issue'],['seller_payout_hold','Seller payout hold'],['evidence_dispute','Evidence dispute']].map(([value,label]) => <option value={value} key={value}>{label}</option>)}</select></label><label className="grid gap-2 text-sm font-semibold">Reason<input className="min-h-11 rounded-control border border-divider px-3 font-normal" value={recoveryReason} maxLength={120} onChange={(event) => setRecoveryReason(event.target.value)} /></label></div><label className="mt-4 grid gap-2 text-sm font-semibold">Explanation<textarea className="min-h-24 rounded-control border border-divider p-3 font-normal" value={recoveryExplanation} maxLength={1000} onChange={(event) => setRecoveryExplanation(event.target.value)} /></label><button className="mt-4 min-h-11 rounded-control bg-ink-900 px-4 text-sm font-semibold text-white" type="submit">Submit synthetic recovery</button></form>}
    {cases && <section className="rounded-card border border-divider bg-surface p-6" aria-labelledby="recovery-status-title"><h2 id="recovery-status-title" className="text-xl font-semibold">Recovery status</h2>{recoveryCases.length ? <div className="mt-4 space-y-3">{recoveryCases.map((item) => <article className="rounded-control bg-canvas p-4" key={item.id}><div className="flex flex-wrap justify-between gap-3"><strong className="capitalize">{item.requestType.replaceAll('_',' ')}</strong><span className="rounded-full bg-surface px-2 py-1 text-xs font-semibold capitalize">{item.status.replaceAll('_',' ')}</span></div><p className="mt-2 text-sm text-ink-600">Version {item.version} · Synthetic demo only. Provider refund is disabled.</p><p className="mt-1 text-xs text-ink-600">{item.reason}</p></article>)}</div> : <p className="mt-3 text-sm text-ink-600">No recovery case submitted.</p>}</section>}
    {!cases && <button className="min-h-11 rounded-control border border-divider px-4 text-sm font-semibold" type="button" onClick={() => void load()}>Retry support service</button>}
  </section>;
}
