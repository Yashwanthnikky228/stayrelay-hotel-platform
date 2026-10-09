export function PassportPage() {
  return (
    <section className="mx-auto max-w-3xl space-y-6">
      <div>
        <p className="text-sm font-medium text-brand-700">Your reservation, step by step</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">Reservation Passport</h1>
        <p className="mt-3 max-w-2xl leading-7 text-ink-600">The Passport is a clear record of transfer and arrival status. Each status comes from the reservation service and includes the next action when one is needed.</p>
      </div>
      <div className="rounded-card border border-divider bg-surface p-6 md:p-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-canvas text-xl text-ink-600" aria-hidden="true">i</div>
        <h2 className="mt-5 text-xl font-semibold">No Reservation Passport to show</h2>
        <p className="mt-2 leading-6 text-ink-600">After you make an eligible reservation, its confirmed details and arrival steps will appear here.</p>
        <p className="mt-5 rounded-control bg-canvas p-4 text-sm leading-6 text-ink-600">A QR arrival credential will be displayed only after transfer confirmation and pre-arrival checks are complete.</p>
      </div>
    </section>
  );
}
