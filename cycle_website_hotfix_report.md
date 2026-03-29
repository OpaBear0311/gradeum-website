# Cycle Report: Website Hotfix — 6 QC Fixes
## Date: 2026-03-29
## Commit: 1250b79

---

## Fixes Applied

### Fix 1: Agent → Assistant (Board Decision D-87)
Every user-facing "Agent" replaced with "Assistant." Variable names, imports, and code references left unchanged.

| File | Change |
|------|--------|
| `lib/constants.ts` | "Gradeum Agent (on-premise...)" → "Gradeum Assistant (on-premise...)" (×2, firms + agencies features) |
| `lib/constants.ts` | "The Gradeum Agent runs on your server" → "The Gradeum Assistant runs on your server" (×2, firms + agencies FAQ) |
| `lib/constants.ts` | "The Agent processes scanned documents" → "The Assistant processes scanned documents" (agencies FAQ) |
| `app/about/page.tsx` | "The Gradeum Agent runs on your server" → "The Gradeum Assistant runs on your server" |
| `app/docs/page.tsx` | metadata description: "Agent installation guide" → "Assistant installation guide" |
| `components/sections/AgencyHowItWorks.tsx` | "Install the Agent" → "Install the Assistant", "The Gradeum Agent installs" → "The Gradeum Assistant installs" |
| `components/sections/HowItWorksSection.tsx` | "The Gradeum Agent installs" → "The Gradeum Assistant installs" |
| `components/sections/SecuritySection.tsx` | "between the Agent and" → "between the Assistant and", "The Gradeum Agent runs entirely" → "The Gradeum Assistant runs entirely", "Gradeum Agent" → "Gradeum Assistant" (architecture diagram) |
| `components/demo/GradeumSimulation.tsx` | "Gradeum Agent (Local)" → "Gradeum Assistant (Local)" |

**Not changed (code references only):** `app/robots.ts` — `userAgent` is a web standard property, not user-facing text.

### Fix 2: Hero Height
- `components/sections/Hero.tsx`: `min-h-[85vh]` → `min-h-[70vh]`, padding reduced, scroll indicator chevron added with CSS bounce animation
- `app/globals.css`: Added `@keyframes bounce-down` animation
- Next section now peeks above the fold on 1080p monitors

### Fix 3: www → gradeum.io Redirect
- `middleware.ts`: Added domain configuration comments documenting the required Vercel dashboard setup
- **No code change needed** — this is a Vercel dashboard configuration

### Fix 4: Demo Page — Simulation Embedded
- Copied `GradeumSimulation.tsx` from platform repo (`C:\Users\jakew\gradeum\frontend\src\components\`)
- `app/firms/demo/page.tsx`: Replaced placeholder with full simulation embed + CTA bar (See Pricing + Request a Walkthrough)
- Simulation fills `h-[calc(100vh-64px)]` below navbar

### Fix 5: Agencies Product Page Removed
- Deleted `app/agencies/product/page.tsx`
- Feature cards (Plain Language Search, Source Attribution, Report Generation) folded into `app/agencies/page.tsx` as "What You Get" section
- "Dual-Model Validation" renamed to "AI-Validated Results" with simplified copy
- Architecture diagram and security deep dive removed entirely
- `lib/constants.ts`: Removed `{ label: "Product", href: "/agencies/product" }` from `AGENCIES_NAV_LINKS`
- `app/sitemap.ts`: Removed `/agencies/product` entry
- Zero remaining references to `/agencies/product` in codebase

### Fix 6: Docs Page — Real Content
- `components/sections/DocsContent.tsx`: Rebuilt with 4 real content sections:
  1. **Getting Started** — Welcome text, 4-step walkthrough list, contact for onboarding
  2. **Gradeum Assistant** — Description, 5 key facts (infrastructure, requirements), installation contact
  3. **Platform** — Description, 6 topics being documented
  4. **API Reference** — Private beta status, contact for early access
- Added proper accessibility: `aria-label` on nav, `aria-current` on active item, `htmlFor`/`id` on search input

---

## Pages Removed
- `/agencies/product` — content folded into `/agencies` home page

## Navigation Changes
- Agencies nav: was [Product, Use Cases, Pricing, Contact] → now [Use Cases, Pricing, Contact]

## Route Count
- Before: 21 routes (20 static + 1 dynamic)
- After: 20 routes (19 static + 1 dynamic)
- Removed: `/agencies/product`

---

## Manual Action Required: www → gradeum.io Redirect

**Jacob must update Vercel dashboard:**

1. Go to **Vercel Dashboard → gradeum-website project → Settings → Domains**
2. If `www.gradeum.io` is the primary and `gradeum.io` redirects to it, flip them:
   - Remove both domains
   - Add `gradeum.io` FIRST as **Production**
   - Add `www.gradeum.io` as **Redirect** (301) to `gradeum.io`
3. Result: `gradeum.io` = primary, `www.gradeum.io` → 301 → `gradeum.io`

---

## Verification
- `npm run build`: 20 routes, 0 errors, 0 TypeScript errors
- `grep -ri "agent"` on .tsx/.ts: only `userAgent` in robots.ts (web standard, not user-facing)
- No references to `/agencies/product` remain in codebase
- Simulation component compiles and renders on `/firms/demo`
- All 4 docs sections render with real content
- Hero sections show scroll indicator and allow next section to peek above fold
