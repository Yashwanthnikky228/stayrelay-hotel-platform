export function MarketplacePage() {
  return (
    <div className="space-y-10">
      <section className="grid gap-8 rounded-signature bg-ink-900 p-6 text-white md:grid-cols-[1.2fr_0.8fr] md:items-end md:p-10">
        <div className="space-y-4">
          <p className="text-sm font-medium text-blue-200">A more thoughtful way to find a stay</p>
          <h1 className="max-w-2xl font-editorial text-4xl leading-tight md:text-6xl">Good stays, with the details made clear.</h1>
          <p className="max-w-xl text-base leading-7 text-slate-200">Discover hotel reservations that have been reviewed for an authorised guest change. Dates and transfer terms stay in view from the start.</p>
        </div>
        <div className="rounded-card bg-white p-5 text-ink-900 shadow-overlay">
          <h2 className="text-lg font-semibold">Search exact dates</h2>
          <form className="mt-4 grid gap-3" onSubmit={(event) => event.preventDefault()}>
            <label className="field-label">Destination<input className="field-control" name="destination" placeholder="City or area" /></label>
            <div className="grid grid-cols-2 gap-3">
              <label className="field-label">Check in<input className="field-control" name="checkIn" type="date" /></label>
              <label className="field-label">Check out<input className="field-control" name="checkOut" type="date" /></label>
            </div>
            <label className="field-label">Guests<input className="field-control" name="guests" min="1" defaultValue="2" type="number" /></label>
            <button className="mt-1 min-h-12 rounded-control bg-brand-600 px-5 font-semibold text-white transition-colors hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2" type="submit">Search eligible stays</button>
          </form>
        </div>
      </section>
      <section aria-labelledby="how-heading" className="grid gap-6 md:grid-cols-3">
        <div><h2 id="how-heading" className="text-xl font-semibold">Clear dates</h2><p className="mt-2 leading-6 text-ink-600">Your exact stay dates and full price remain visible as you review a reservation.</p></div>
        <div><h3 className="text-xl font-semibold">Reviewed eligibility</h3><p className="mt-2 leading-6 text-ink-600">A booking is shown only after its transfer route and reservation evidence have been checked.</p></div>
        <div><h3 className="text-xl font-semibold">One arrival record</h3><p className="mt-2 leading-6 text-ink-600">Follow confirmed steps in your Reservation Passport, through arrival and check-in.</p></div>
      </section>
      <p className="border-l-2 border-brand-600 pl-4 text-sm leading-6 text-ink-600">No live inventory is connected yet. Search results will appear here only when verified availability is returned by the StayRelay API.</p>
    </div>
  );
}
