import { useEffect, useState } from 'react';
import type { ReservationPassport } from '@stayrelay/domain';
import { accountApi } from '../services/account';

export function PassportPage() {
  const [passports, setPassports] = useState<ReservationPassport[]>();
  const [message, setMessage] = useState('Checking your protected synthetic records…');
  useEffect(() => { void accountApi.passports().then((result) => { setPassports(result.passports); setMessage(result.passports.length ? '' : 'No Reservation Passport to show.'); }).catch(() => setMessage('Reservation Passports are disabled on the hosted demo. Sign in through the isolated local synthetic environment to test this flow.')); }, []);
  return (
    <section className="mx-auto max-w-3xl space-y-6">
      <div>
        <p className="text-sm font-medium text-brand-700">Your reservation, step by step</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">Reservation Passport</h1>
        <p className="mt-3 max-w-2xl leading-7 text-ink-600">The Passport is a clear record of transfer and arrival status. Each status comes from the reservation service and includes the next action when one is needed.</p>
      </div>
      {!passports?.length ? <div className="rounded-card border border-divider bg-surface p-6 md:p-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-canvas text-xl text-ink-600" aria-hidden="true">i</div>
        <h2 className="mt-5 text-xl font-semibold">{message}</h2>
        <p className="mt-2 leading-6 text-ink-600">After an approved synthetic checkout simulation, its server-confirmed status and next action will appear here.</p>
        <p className="mt-5 rounded-control bg-canvas p-4 text-sm leading-6 text-ink-600">A QR arrival credential will be displayed only after transfer confirmation and pre-arrival checks are complete.</p>
      </div> : <div className="space-y-4">{passports.map((passport) => <article className="rounded-card border border-divider bg-surface p-6 md:p-8" key={passport.id}><p className="text-xs font-semibold uppercase tracking-wider text-attention-800">Synthetic test record · version {passport.version}</p><h2 className="mt-3 text-2xl font-semibold">{passport.status.replaceAll('_', ' ')}</h2><p className="mt-3 text-ink-600">This is a simulated server status. No live payment, transfer or hotel check-in occurred.</p><dl className="mt-5 grid gap-3 rounded-control bg-canvas p-4 text-sm sm:grid-cols-2"><div><dt className="font-semibold">Passport ID</dt><dd className="mt-1 break-all text-ink-600">{passport.id}</dd></div><div><dt className="font-semibold">Updated</dt><dd className="mt-1 text-ink-600">{new Date(passport.statusUpdatedAt).toLocaleString()}</dd></div></dl><p className={`mt-4 rounded-control p-3 text-sm ${passport.arrivalGuideAvailable ? 'bg-brand-50 text-brand-700' : 'bg-attention-50 text-attention-800'}`}>{passport.arrivalGuideAvailable ? 'Synthetic arrival guide unlocked. No real QR credential is generated.' : 'Arrival guide and QR remain locked until simulated transfer and pre-arrival checks pass.'}</p></article>)}</div>}
    </section>
  );
}

export default PassportPage;
