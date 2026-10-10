# UI/UX brief TASK-019–TASK-025 — Discovery readiness

**Date:** 2026-10-10  
**Scope:** Location, distance, dates, destination context, results and accommodation filters

## Status by task

| Task | Status | Evidence / reason |
| --- | --- | --- |
| 019 Location autocomplete abstraction | Partial | Destination input exists; provider-backed autocomplete, denied-permission and provider error states are not connected. |
| 020 Safe selected-location storage | Partial | Destination is URL-persisted as text; validated coordinates/source are not available until the server location contract exists. |
| 021 Distance selector | Blocked | A distance control without a verified PostGIS radius query would imply unsupported inventory behavior. |
| 022 Date and guest controls | Done | Existing keyboard-capable date inputs, guest select, validation, reset and exact-date messaging are covered by `SearchFilters.tsx` and `MarketplacePage.tsx`. |
| 023 Destination context banner | Done | Marketplace hero reflects the selected destination label and remains clear that it is discovery context, not inventory proof. |
| 024 Results shell | Partial | Cards, loading, empty, error and server-result states exist; map, sorting, pagination and structured filters are pending. |
| 025 Accommodation filters | Blocked | Inventory responses do not yet expose verified accommodation-type fields for filtering. |

## Safety boundary

The browser may collect a user-entered place label, but it cannot convert that label into coordinates, nearby inventory or property eligibility. A future location contract must validate latitude, longitude, radius, source and privacy boundary server-side. Google Maps, if later enabled, is visual enrichment and not inventory truth.

## Existing behavior verified

- Exact check-in/check-out dates are required for live search.
- Check-out must be after check-in.
- Guest count is constrained to one through six.
- Search cancellation prevents stale responses replacing newer state.
- When inventory is not configured, preview cards are visibly fictional and non-bookable.
