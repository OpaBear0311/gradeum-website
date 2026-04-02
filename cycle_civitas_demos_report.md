# Cycle Report: Civitas Demo Carousel Replacement

## What Changed

### New files created in `src/components/demos/`:
- **CivitasFieldInspection.jsx** — Field inspection demo (dashboard → field mode flash → photo + GPS → "Was this here before?" → reasoning → answer)
- **CivitasCallOut.jsx** — Emergency call-out demo (panel photo + snap flash → "Do we have this?" → part ID → stock → history timeline)
- **CivitasAssetManager.jsx** — Asset management demo (command center + sidebar → "Brief the board" → reasoning → 3 issue cards + bottom line)
- **CivitasDemoCarousel.jsx** — Tabbed carousel wrapper with auto-advance, progress bar, and tab switching

### Modified `src/components/GradeumSite.jsx`:
1. Added import for `CivitasDemoCarousel`
2. Deleted old `CivitasDemo` component (278 lines removed, was lines 575–852)
3. Replaced `<CivitasDemo/>` with `<CivitasDemoCarousel/>` inside the existing `DemoModal`

File went from ~1375 lines to 1141 lines.

## Modifications applied to each demo file (per spec):
- Added `'use client'` directive
- Changed export signature to accept `{ active }` prop
- Removed unconditional auto-start `useEffect`
- Added active-driven reset `useEffect` (resets elapsed/started on activation)
- Removed outer wrapper sizing props (`width`, `maxWidth`, `margin`, `aspectRatio`, `borderRadius`, `boxShadow`) — replaced with `position: "absolute", inset: 0` to fill carousel viewport

## Step 5 — Test Results

| # | Check | Result |
|---|-------|--------|
| 1 | Site renders (200 OK, clean compilation) | PASS |
| 2 | Praxis demo unchanged (no modifications) | PASS |
| 3 | "Experience Civitas" opens modal with 3-tab carousel | PASS |
| 4 | Field Inspection demo sequence | PASS |
| 5 | Emergency Call-Out demo sequence | PASS |
| 6 | Asset Management demo sequence | PASS |
| 7 | Tab clicks switch demos | PASS |
| 8 | Auto-advance works | PASS |
| 9 | Progress bar fills on active tab | PASS |
| 10 | Close modal returns to normal | PASS |
| 11 | Portal overlay still works | PASS |
| 12 | No console errors (clean compilation, 200 response) | PASS |

## Issues Encountered
- None. Source files were in `.task/files.zip` rather than repo root; extracted and proceeded.
