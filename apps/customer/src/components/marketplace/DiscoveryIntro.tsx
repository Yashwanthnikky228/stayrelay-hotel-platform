import { destinationContexts, type DestinationContext } from '../../data/destinations';

export function DiscoveryIntro({ destination, onDestination }: { destination?: DestinationContext; onDestination: (city: string) => void }) {
  return <section className="overflow-hidden rounded-signature border border-divider bg-[#f4efe6]">
    <div className="grid lg:grid-cols-[1.2fr_1fr]">
      <div className="px-6 py-10 md:px-10 md:py-14">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-600">StayRelay / The considered stay</p>
        <h1 className="mt-6 max-w-xl font-editorial text-4xl leading-tight text-ink-900 md:text-6xl">{destination ? `A different way to discover ${destination.label}.` : 'A change of plans. A new place to stay.'}</h1>
        <p className="mt-5 max-w-lg leading-7 text-ink-600">Explore the reservation-transfer experience, with clear prices and evidence at every step. This is a synthetic demo—no real bookings or payments.</p>
        <a href="#property-results-heading" className="mt-7 inline-flex min-h-12 items-center rounded-control bg-ink-900 px-6 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">Explore example stays <span className="ml-5" aria-hidden="true">↗</span></a>
        <p className="mt-4 text-xs text-ink-600">Fictional properties. Real product preview.</p>
      </div>
      <div className="relative flex min-h-72 items-center justify-center overflow-hidden bg-[#d5dfd5] p-8 md:min-h-96" aria-label="Illustration of a fictional courtyard hotel">
        <svg viewBox="0 0 440 340" className="w-full max-w-md" role="img" aria-label="Architectural illustration, not a photograph of a listed property">
          <circle cx="330" cy="70" r="44" fill="#f9ebc9" />
          <path d="M25 290h390v25H25z" fill="#8fa897" />
          <path d="M75 100h290v190H75z" fill="#f3ead8" />
          <path d="M55 95l165-55 165 55z" fill="#607b70" />
          <path d="M95 125h250v12H95zM95 200h250v10H95z" fill="#d2c4a8" />
          {[110, 175, 240, 305].map(x => <g key={x}><path d={`M${x} 155a15 15 0 0 1 30 0v32h-30z`} fill="#587169" /><path d={`M${x} 235a15 15 0 0 1 30 0v42h-30z`} fill="#587169" /></g>)}
          <path d="M195 290v-42a25 25 0 0 1 50 0v42" fill="#344d46" />
          <path d="M40 290v-70M390 290v-90" stroke="#657765" strokeWidth="7" />
          <ellipse cx="40" cy="205" rx="27" ry="48" fill="#799581" /><ellipse cx="390" cy="195" rx="29" ry="57" fill="#799581" />
          <path d="M195 315h50l25 25H170z" fill="#eee3cb" />
        </svg>
        <span className="absolute bottom-5 left-6 rounded-full bg-white/90 px-3 py-2 text-xs text-ink-600">The courtyard collection · illustrative only</span>
      </div>
    </div>
    <div className="flex flex-wrap items-center gap-3 border-t border-ink-900/10 px-6 py-5 md:px-10">
      <span className="mr-2 text-sm text-ink-600">Start with a city</span>
      {destinationContexts.map(city => <button key={city.id} type="button" aria-pressed={destination?.id === city.id} onClick={() => onDestination(city.label)} className={`min-h-11 rounded-full border px-5 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${destination?.id === city.id ? 'border-ink-900 bg-ink-900 text-white' : 'border-ink-900/20 bg-white/70 text-ink-900 hover:bg-white'}`}>{city.label}</button>)}
    </div>
  </section>;
}
