# Cycle Report: Website V2 — Visual & Structural Overhaul
## Date: 2026-03-29
## Commit: 946c671

---

## Files Modified (29)

### Pages
- `app/page.tsx` — Root landing: removed hero CTAs, added industry strip
- `app/firms/page.tsx` — Removed hero CTAs, removed "Get Started" button from CTA section
- `app/firms/product/page.tsx` — Tightened hero/section spacing, removed CTA section
- `app/firms/pricing/page.tsx` — Tightened spacing, changed CTA to "Contact Us" (secondary)
- `app/firms/demo/page.tsx` — Replaced amber buttons with navy outlined links
- `app/agencies/page.tsx` — Removed hero CTAs, removed "Get Started" button, kept "Contact Us" as secondary
- `app/agencies/pricing/page.tsx` — Tightened spacing, changed CTA to "Contact Us" (secondary)
- `app/agencies/use-cases/page.tsx` — Removed hero CTAs, changed CTA to "Contact Us" (secondary)
- `app/about/page.tsx` — Removed "Get Started" button, tightened spacing
- `app/partners/login/page.tsx` — Changed amber accents to navy

### Components
- `components/layout/Navbar.tsx` — Removed amber "Get Started" button, added navy "Demo" link
- `components/layout/Footer.tsx` — Tightened padding (py-16→py-10, gap-10→gap-8, mb-14→mb-10)
- `components/sections/Hero.tsx` — Removed CTA buttons/props, min-h-[70vh]→min-h-[55vh], trust chips moved directly under sub
- `components/sections/AudienceFork.tsx` — Updated Firms description with industry context, tightened spacing (py-20→py-10, p-10→p-8)
- `components/sections/ProblemSection.tsx` — Tightened spacing (py-20/28→py-10/14, mb-12→mb-8)
- `components/sections/PillarsSection.tsx` — Tightened (py-20/28→py-12/16, gap-8→gap-6)
- `components/sections/TrustStrip.tsx` — Tightened (py-14/16→py-10/12), removed subtitle
- `components/sections/HowItWorksSection.tsx` — Tightened (py-20/28→py-12/16), step circles changed from amber to navy
- `components/sections/StorySection.tsx` — Tightened (py-20/28→py-12/16)
- `components/sections/AgencyHowItWorks.tsx` — Tightened (py-20→py-12/16), step numbers from amber to navy/30
- `components/sections/UseCaseCards.tsx` — Tightened (py-20→py-12)
- `components/sections/SecuritySection.tsx` — Tightened (py-20/28→py-12/16), shield icons from amber to white/40
- `components/sections/ModuleShowcase.tsx` — Tightened (py-20/28→py-12/16, space-y-20→space-y-12)
- `components/sections\PricingCard.tsx` — CTA changed to secondary variant, checkmarks from amber to navy/40, badge from amber to navy
- `components/sections/ContactForm.tsx` — Submit button from amber to navy

### UI
- `components/ui/Button.tsx` — Primary variant changed from `bg-amber` to `bg-navy`
- `components/ui/CookieConsent.tsx` — Accept button from amber to navy

### Config
- `lib/constants.ts` — Added INDUSTRIES array, removed "Demo" from FIRMS_NAV_LINKS (now in navbar directly)
- `next.config.ts` — Added www.gradeum.io → gradeum.io permanent redirect

---

## Acceptance Criteria Results

| # | Criteria | Result | Notes |
|---|----------|--------|-------|
| 1 | Zero "Get Started" buttons | PASS | `grep "Get Started"` returns 0 matches |
| 2 | Zero amber/orange CTA buttons | PASS | No `bg-amber` on any button. Amber only in: Badge definition (unused), ContactForm required markers (`*`), focus rings, simulation (internal) |
| 3 | "Demo" link in navbar → /firms/demo | PASS | Navy outlined button in desktop nav + mobile menu |
| 4 | Trust badges under subheadline | PASS | trustChips rendered directly after `sub` text, before scroll indicator |
| 5 | Root landing has industry context | PASS | Industries strip: "Ports & Marine · Bridges & Highways · Coastal Protection · Water & Utilities · Buildings & Structures" |
| 6 | Section spacing reduced globally | PASS | All py-20/24/28/32 → py-10/12/16. All mb-14/16 → mb-8/10 |
| 7 | Problem section tight to hero | PASS | Hero min-h-[55vh] + ProblemSection py-10 = seamless transition |
| 8 | www redirect configured | PASS | next.config.ts redirect rule + Vercel dashboard note |
| 9 | `npm run build` passes | PASS | 20 routes, 0 errors |
| 10 | All copy in constants.ts | PASS | INDUSTRIES added to constants, no new hardcoded strings |

---

## Key Visual Changes

### Before → After
- **Hero height:** 70vh → 55vh (next section visible above fold)
- **CTA buttons:** Amber pills everywhere → zero amber buttons, only navy outlines where needed
- **Navbar:** Had amber "Get Started" pill → now has subtle navy "Demo" link
- **Section gaps:** ~80-112px between sections → ~40-64px
- **Footer:** 64px top padding → 40px
- **Root landing:** Generic audience cards → industry-contextualized with infrastructure verticals
- **Color palette shift:** Amber was dominant action color → Navy is now the primary UI color, amber retained only as accent (form markers, focus rings)

---

## What Needs Manual QA

1. Browser test at 375px, 768px, 1440px — spacing changes look correct at all breakpoints
2. Verify "Demo" nav link works on mobile hamburger menu
3. Verify www.gradeum.io → gradeum.io redirect works in production
4. Visual review that the tighter spacing feels right — not too cramped on mobile
5. Verify simulation still loads correctly on /firms/demo

---

## Next Cycle Should Address

1. Replace placeholder module screenshots on /firms/product with actual platform screenshots
2. Commission hero sketch art assets (bridges, infrastructure illustrations)
3. Consider adding a "Watch Demo" video embed as alternative to the interactive simulation
4. Add email service integration to contact form
5. Review whether Contact Us should appear more prominently now that Get Started is removed
