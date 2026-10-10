export interface DestinationContext {
  id: string;
  label: string;
  region: string;
  description: string;
  heroClass: string;
}

export const destinationContexts: DestinationContext[] = [
  { id: 'mumbai', label: 'Mumbai', region: 'Maharashtra, India', description: 'City stays shaped around exact dates and verified transfer routes.', heroClass: 'from-[#10233f] via-[#183d5a] to-[#8d6544]' },
  { id: 'hyderabad', label: 'Hyderabad', region: 'Telangana, India', description: 'Calm discovery for business districts, cultural quarters and event dates.', heroClass: 'from-[#17253d] via-[#334b5a] to-[#8c7051]' },
  { id: 'bengaluru', label: 'Bengaluru', region: 'Karnataka, India', description: 'Garden-city stays with transparent totals and evidence-backed status.', heroClass: 'from-[#13283c] via-[#315348] to-[#8b7657]' },
];

export function resolveDestination(value: string): DestinationContext | undefined {
  const normalized = value.trim().toLocaleLowerCase();
  if (!normalized) return undefined;
  return destinationContexts.find(({ id, label, region }) =>
    normalized === id || normalized === label.toLocaleLowerCase() || normalized === `${label}, ${region}`.toLocaleLowerCase(),
  );
}
