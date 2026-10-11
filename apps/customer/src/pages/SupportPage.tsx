import { useEffect, useState, type FormEvent } from 'react';
import type { ReservationPassport, SyntheticSupportCase } from '@stayrelay/domain';
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
  const [passports, setPassports] = useState<ReservationPassport[]>([]);
  const [category, setCategory] = useState<SyntheticSupportCase['category']>('transfer_failed');
  const [passportId, setPassportId] = useState('');
  const [message, setMessage] = useState('Checking your protected synthetic records…');
  const [saving, setSaving] = useState(false);

  async function load() {
    setMessage('Checking your protected synthetic records…');
    try {
      const [caseResult, passportResult] = await Promise.all([accountApi.supportCases(), accountApi.passports()]);
      setCases(caseResult.cases); setPassports(passportResult.passports);
      setMessage(caseResult.cases.length ? '' : 'No synthetic support cases yet.');
    } catch { setCases(undefined); setMessage('Support cases are disabled on the hosted demo. Sign in through the isolated local synthetic environment to test this flow.'); }
  }
  useEffect(() => { void load(); }, []);
  async function submit(event: FormEvent) {
    event.preventDefault(); setSaving(true); setMessage('Saving the synthetic case…');
    try { await accountApi.createSupportCase(category, passportId || undefined); await load(); }
    catch { setMessage('The case was not saved. No reservation, transfer, or money state changed.'); }
    finally { setSaving(false); }
  }

  return <section className="mx-auto max-w-3xl space-y-6">
    <div><p className="text-sm font-medium text-brand-700">Synthetic help workflow</p><h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">Support and recovery</h1><p className="mt-3 max-w-2xl leading-7 text-ink-600">Create a constrained test case for a simulated transfer, arrival, or refund question. Do not enter real booking, identity, payment, or health information.</p></div>
    {cases && <form className="rounded-card border border-divider bg-surface p-6 md:p-8" onSubmit={submit} aria-labelledby="new-case-title"><h2 id="new-case-title" className="text-xl font-semibold">Open a synthetic case</h2><div className="mt-5 grid gap-4 sm:grid-cols-2"><label className="grid gap-2 text-sm font-semibold">Category<select className="min-h-11 rounded-control border border-divider bg-surface px-3 font-normal" value={category} onChange={(event) => setCategory(event.target.value as SyntheticSupportCase['category'])}>{Object.entries(labels).map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label><label className="grid gap-2 text-sm font-semibold">Reservation Passport (optional)<select className="min-h-11 rounded-control border border-divider bg-surface px-3 font-normal" value={passportId} onChange={(event) => setPassportId(event.target.value)}><option value="">No Passport selected</option>{passports.map((passport) => <option value={passport.id} key={passport.id}>{passport.status.replaceAll('_', ' ')} · {passport.id.slice(0, 8)}</option>)}</select></label></div><button className="mt-5 min-h-11 rounded-control bg-ink-900 px-5 font-semibold text-white disabled:cursor-not-allowed disabled:bg-divider" disabled={saving} type="submit">{saving ? 'Saving…' : 'Create synthetic case'}</button></form>}
    <p className="text-sm text-ink-600" role="status">{message}</p>
    {cases && <div className="space-y-4" aria-label="Your synthetic support cases">{cases.map((item) => <SupportCaseCard item={item} key={item.id} />)}</div>}
    {!cases && <button className="min-h-11 rounded-control border border-divider px-4 text-sm font-semibold" type="button" onClick={() => void load()}>Retry support service</button>}
  </section>;
}
