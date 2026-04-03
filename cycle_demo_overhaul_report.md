# Cycle Report — Demo Overhaul

**Date:** 2026-04-02
**Commit:** be1c808
**Deploy:** Vercel auto-deploy to gradeum.io on push to main

---

## What was changed

### New files (5 in `src/components/demos/`)
- `PraxisPrincipal.jsx` — Principal role demo (priority briefing)
- `PraxisPE.jsx` — PE role demo (dual-model calc review)
- `PraxisPM.jsx` — PM role demo (reported vs actual status)
- `PraxisEIT.jsx` — EIT role demo (guided learning + QC)
- `PraxisDemoCarousel.jsx` — 4-tab carousel wrapper for Praxis

### Previously added (4 in `src/components/demos/`, from prior commit)
- `CivitasFieldInspection.jsx`
- `CivitasCallOut.jsx`
- `CivitasAssetManager.jsx`
- `CivitasDemoCarousel.jsx`

### Modified
- `src/components/GradeumSite.jsx`
  - Added `PraxisDemoCarousel` import (line 3)
  - Deleted old `PraxisDemo` component (345 lines removed)
  - Replaced `<PraxisDemo/>` with `<PraxisDemoCarousel/>`
  - `<CivitasDemoCarousel/>` was already in place from prior commit

### Pricing metadata removed
- Old PraxisDemo had `$0.02`, `$0.22`, `$0.36`, `0.8s`, `4.2s`, `3.1s`, `1.4s`, `2.8s` cost/time badges — all deleted with the component
- Old CivitasDemo `$0.06` was removed in prior commit
- No pricing metadata remains in any demo file

---

## Verification results

| # | Check | Pass? |
|---|-------|-------|
| 1 | Site renders (HTTP 200, full HTML returned) | YES |
| 2 | No compilation errors (Next.js Turbopack clean build) | YES |
| 3 | No pricing/cost metadata (`$0.XX`, `X.Xs`) in any demo | YES |
| 4 | PraxisDemoCarousel properly imported and rendered in DemoModal | YES |
| 5 | CivitasDemoCarousel properly imported and rendered in DemoModal | YES |
| 6 | All 9 demo files present in `src/components/demos/` | YES |
| 7 | DemoModal shell untouched (title, close button, border) | YES |
| 8 | Oracle, Portal, Pillars, Scutum, countdown, cards all untouched | YES |
| 9 | No console/build errors in dev server logs | YES |

**Note:** Visual/interactive checks (carousel tab switching, auto-advance, progress bars, individual demo animations) require manual browser testing at http://localhost:3001 or https://gradeum.io after deploy.

---

## Issues encountered
- None. CivitasDemo carousel was already integrated from a prior commit (a5193bb). Only the Praxis carousel integration was needed.
