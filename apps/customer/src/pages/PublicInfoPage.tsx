import { useLocation } from 'react-router';

const pages = {
  '/how-it-works': {
    eyebrow: 'A clear process',
    title: 'Reservation transfers, explained plainly.',
    intro: 'StayRelay helps people submit reservations they may not use. Every submission is reviewed before it can become an eligible stay.',
    sections: [
      ['Submit evidence', 'A seller provides reservation details and supporting evidence. A draft is not a listing and does not promise transferability.'],
      ['Review eligibility', 'StayRelay checks the reservation route and policy conditions separately from exposure and risk capacity. Unknown or conflicting evidence stays closed.'],
      ['Complete an approved transfer', 'Only an authoritative service event can confirm transfer progress. Payment, arrival and payout remain disabled until their controls are connected.'],
    ],
  },
  '/safety': {
    eyebrow: 'Safety and trust',
    title: 'Clear status is safer than a confident guess.',
    intro: 'StayRelay does not treat typed details, a preview card or a QR image as proof of a valid reservation.',
    sections: [
      ['Evidence first', 'Reservation, policy, eligibility, risk, transfer and arrival are separate server-owned states.'],
      ['Fail closed', 'Stale, unknown, conflicting or insufficient evidence does not become a sale or transfer confirmation.'],
      ['Pilot boundaries', 'Demo cards are fictional and non-bookable. Payment, identity verification, live hotel policy checks and payout are not enabled for this pilot.'],
    ],
  },
  '/support': {
    eyebrow: 'StayRelay support',
    title: 'Questions should have a safe next step.',
    intro: 'Support workflows will be connected after identity, case storage and response ownership are configured.',
    sections: [
      ['Before you submit', 'Keep the original booking channel and reservation evidence available. Remove unrelated personal or payment information.'],
      ['If a status looks wrong', 'Do not rely on a screenshot or QR preview. Wait for the server-confirmed status or contact the approved support channel.'],
      ['Pilot status', 'No support request is created from this page yet.'],
    ],
  },
  '/privacy': {
    eyebrow: 'Privacy preview',
    title: 'Data minimisation is part of the product.',
    intro: 'The final privacy notice requires the approved legal entity, retention schedule, storage providers and jurisdiction decisions.',
    sections: [
      ['What is planned', 'Only information needed for discovery, reservation review, support and approved transfer workflows should be collected.'],
      ['What is not enabled', 'Identity documents, private evidence storage, payments and outbound messaging are not connected in this pilot.'],
      ['Your choices', 'Export and deletion workflows will be available after authenticated account and administrative review services are connected.'],
    ],
  },
  '/terms': {
    eyebrow: 'Terms placeholder',
    title: 'Terms are not final yet.',
    intro: 'Do not use this development site as a completed offer or a promise that a reservation can be transferred.',
    sections: [
      ['Pilot state', 'This environment demonstrates product flows with fictional, non-bookable examples.'],
      ['No transaction', 'No card collection, payment capture, refund, payout or live transfer occurs here.'],
      ['Approval required', 'Final terms require legal and business approval before any pilot is enabled.'],
    ],
  },
} as const;

export default function PublicInfoPage() {
  const page = pages[useLocation().pathname as keyof typeof pages] ?? pages['/how-it-works'];
  return <article className="mx-auto max-w-3xl space-y-8">
    <header><p className="text-sm font-semibold text-brand-700">{page.eyebrow}</p><h1 className="mt-2 font-editorial text-4xl leading-tight text-ink-900 md:text-5xl">{page.title}</h1><p className="mt-4 max-w-2xl text-lg leading-8 text-ink-600">{page.intro}</p></header>
    <div className="grid gap-4">{page.sections.map(([title, body]) => <section key={title} className="rounded-card border border-divider bg-surface p-6"><h2 className="text-lg font-semibold text-ink-900">{title}</h2><p className="mt-2 leading-7 text-ink-600">{body}</p></section>)}</div>
  </article>;
}
