import { useLocation } from 'react-router';

const pages: Record<string, { title: string; intro: string; items: string[] }> = {
  '/seller': { title: 'Sell a reservation safely', intro: 'A submission starts as a private draft. Review and policy checks must pass before any listing can exist.', items: ['Evidence first: keep the original booking details.', 'A draft is not a listing.', 'Payout is not enabled for this pilot.'] },
  '/seller/submit': { title: 'Start a reservation draft', intro: 'The seller wizard will collect only the details needed for review after account and private storage services are connected.', items: ['Destination and dates', 'Booking channel and reservation facts', 'Evidence checklist and redaction guidance'] },
  '/seller/drafts': { title: 'Your drafts', intro: 'Drafts will be visible only to their authenticated owner.', items: ['No drafts loaded.', 'No evidence was uploaded.', 'No listing was created.'] },
  '/seller/status': { title: 'Submission status', intro: 'Eligibility, risk and listing states remain separate server-owned decisions.', items: ['No submission loaded.', 'Unknown does not mean eligible.', 'Payout remains not enabled.'] },
  '/seller/support': { title: 'Seller support', intro: 'Support will connect to an authenticated case workflow after the support service is approved.', items: ['Keep source evidence available.', 'Do not upload payment or identity documents here.', 'No support case was created.'] },
};

export default function SellerPage() {
  const page = pages[useLocation().pathname] ?? pages['/seller'];
  return <section className="mx-auto max-w-4xl space-y-6" aria-labelledby="seller-title"><div><p className="text-sm font-medium text-brand-700">Seller workspace</p><h1 id="seller-title" className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">{page.title}</h1><p className="mt-3 max-w-2xl leading-7 text-ink-600">{page.intro}</p></div><div className="grid gap-4 md:grid-cols-3">{page.items.map((item) => <div key={item} className="rounded-card border border-divider bg-surface p-5"><p className="text-sm leading-6 text-ink-600">{item}</p></div>)}</div><p role="status" className="rounded-control bg-attention-50 p-4 text-sm leading-6 text-attention-800">Seller workflows are not enabled for this pilot. No draft, evidence, listing or payout changed.</p></section>;
}
