# UI/UX brief TASK-011 — Typography and interaction states

**Status:** Complete as a design contract.  
**Dependency:** TASK-010 remains blocked pending approved local font assets.

## Type scale

| Use | Size / line height | Rule |
| --- | --- | --- |
| Display | `clamp(2.25rem, 5vw, 4.5rem)` / 1.05 | Newsreader only when approved editorial font is available; otherwise serif fallback |
| Page heading | `clamp(1.875rem, 3vw, 3rem)` / 1.1 | One clear heading per route |
| Section heading | `1.5rem` / 1.25 | Use for content groups |
| Body | `1rem` / 1.5 | Keep paragraphs near 65ch |
| Small / metadata | `0.875rem` / 1.4 | Never carry essential meaning by size alone |
| Dense operational data | `0.875rem` / 1.35 | Use tabular numerals for money, dates and statuses |

## Interaction states

Every interactive control must expose default, hover, focus-visible, pressed, disabled, loading and invalid states where applicable. Focus uses a visible 3px relay-blue outline with offset. Disabled controls explain why they are unavailable when the reason affects the user's next action. Reduced-motion users receive no required animation.

## Layout rules

- Use the existing 4/8 rhythm and minimum 44px touch targets.
- Keep forms and operational tables readable at 320px width through reflow or horizontal scrolling with a labelled region.
- Pair status colour with text or icon shape; never use colour alone.
- Reserve editorial type for large display text; navigation, forms, prices and operational data use sans-serif.
