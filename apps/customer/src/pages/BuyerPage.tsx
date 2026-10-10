import { useLocation } from 'react-router';

const pages: Record<string, { title: string; intro: string; items: string[] }> = {
  '/buyer': { title: 'Your StayRelay workspace', intro: 'A buyer dashboard will show server-confirmed discovery and transfer states after sign-in is connected.', items: ['Saved stays will appear here.', 'Search alerts will appear here.', 'Your Reservation Passport will appear here when a confirmed record exists.'] },
  '/buyer/saved': { title: 'Saved stays', intro: 'Save and compare discovery results after your account is connected.', items: ['No saved stays yet.', 'Demo cards are not persisted or bookable.', 'Server-owned persistence is not enabled.'] },
  '/buyer/alerts': { title: 'Search alerts', intro: 'Alerts will be delivered only after notification preferences and an approved delivery provider exist.', items: ['No alerts configured.', 'No email or SMS was sent.', 'You can continue browsing demo discovery cards.'] },
  '/buyer/help': { title: 'Buyer help', intro: 'Support guidance will connect to an authenticated case workflow when the support service is enabled.', items: ['Keep reservation evidence available.', 'Never treat a preview QR or screenshot as arrival proof.', 'No support case was created from this page.'] },
  '/account': { title: 'Account and security', intro: 'Profile, sessions, password, MFA and data-rights controls require the approved identity project.', items: ['No profile was loaded.', 'No session was changed.', 'No password, MFA or recovery action is available.'] },
};

export default function BuyerPage() {
  const page = pages[useLocation().pathname] ?? pages['/buyer'];
  return <section className="mx-auto max-w-4xl space-y-6" aria-labelledby="buyer-title"><div><p className="text-sm font-medium text-brand-700">Buyer workspace</p><h1 id="buyer-title" className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">{page.title}</h1><p className="mt-3 max-w-2xl leading-7 text-ink-600">{page.intro}</p></div><div className="grid gap-4 md:grid-cols-3">{page.items.map((item) => <div key={item} className="rounded-card border border-divider bg-surface p-5"><p className="text-sm leading-6 text-ink-600">{item}</p></div>)}</div><p role="status" className="rounded-control bg-attention-50 p-4 text-sm leading-6 text-attention-800">Buyer account features are not enabled for this pilot. No record or transaction changed.</p></section>;
}
