# UI/UX brief TASK-033–TASK-042 — Media and map readiness

**Date:** 2026-10-10

## Status

| Task | Status | Evidence / reason |
| --- | --- | --- |
| 033–037 Media inventory, registry and art direction | Partial | The canonical workbook contains the 140-slot image registry; rights and prompt audit still require source review. |
| 038 Responsive media | Done | `apps/customer/src/components/ResponsiveImage.tsx` supplies dimensions, lazy loading, sizes, alt text and a missing-asset fallback. |
| 039 Admin media library | Blocked | Requires protected admin identity and private storage authority. |
| 040 Media fallback rules | Done | Responsive component and preview-card neutral background preserve layout when media is missing or invalid. |
| 041 Maps configuration checklist | Blocked | No approved Google Cloud project, restricted key, billing or legal approval is available. |
| 042 Map-provider feature flag | Partial | The product has no map provider yet; map work remains disabled until a server-owned inventory/location contract exists. |

## Rules

Generated or illustrative media must never be presented as a named real property. Every published image needs rights/source, location applicability, alt text, focal point, route placement, owner and review/expiry data. Maps may enrich a confirmed inventory result but cannot establish bookability or availability.
