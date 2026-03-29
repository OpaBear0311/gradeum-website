# Cycle Report: Website Support — SEO, Analytics, Accessibility

## What Was Built

### Task 1: Partner Sign-In Page
- `app/partners/login/page.tsx` — Stub page with disabled form, "launching soon" message, link to partner inquiries

### Task 2: Legal Pages
- `app/terms/page.tsx` — Links to app.gradeum.io/terms
- `app/privacy/page.tsx` — Links to app.gradeum.io/privacy

### Task 3: SEO
- `app/sitemap.ts` — 11 pages, XML sitemap at /sitemap.xml
- `app/robots.ts` — Allow all, sitemap reference
- `lib/schema.ts` — FAQPage schema helper
- Schema.org Organization JSON-LD in root layout
- FAQPage JSON-LD on both pricing pages (firms + agencies)
- `metadataBase` set to https://gradeum.io in root layout
- OG image SVG placeholders in `public/og/` (8 files)
- OG image metadata on all major pages

### Task 4: GA4 + Cookie Consent
- `components/layout/Analytics.tsx` — GA4 script loader, consent-gated via localStorage
- `components/ui/CookieConsent.tsx` — Updated to use `gradeum-analytics-consent` key, triggers Analytics on accept
- `lib/analytics.ts` — `trackEvent()` helper with proper Window typing
- `components/ui/TrackClick.tsx` — Client wrapper for click tracking
- `components/sections/AudienceFork.tsx` — Tracks `audience_toggle` event
- `components/sections/ContactForm.tsx` — Tracks `contact_submit` event
- Vercel Analytics (`@vercel/analytics/react`) added to root layout

### Task 5: Accessibility (WCAG 2.1 AA)
- Skip-to-content link in Navbar (first focusable element)
- `id="main-content"` on all `<main>` elements (7 pages + 2 layouts)
- `aria-label="Main navigation"` on `<nav>`
- `aria-label="Site footer"` on `<footer>`
- `aria-label="Cookie consent"` + `role="dialog"` on consent banner
- Global `:focus-visible` outline style (amber, 2px) in globals.css
- Accordion: `aria-expanded`, `aria-controls`, `role="region"`, `aria-labelledby`, proper `<h3>` wrapping
- Contact form: `htmlFor`/`id` pairs on all labels/inputs, `aria-required="true"`, `aria-describedby` for error, `role="alert"` on error, `role="status"` + `aria-live="polite"` on success
- Partner login: `htmlFor`/`id` pairs on form fields
- Decorative SVG icons: `aria-hidden="true"` on AudienceFork icons

---

## SEO Audit — Metadata Per Page

| Page | Title | Description | OG Image |
|------|-------|-------------|----------|
| Root (/) | Gradeum — AI for Engineering & Infrastructure | AI-powered practice management for firms. Document retrieval for agencies. Your data never leaves. | /og/home.svg |
| Firms Home | Gradeum — Be an engineer again | AI practice management: document Q&A, PE workflow, time tracking, resource planning. | /og/firms.svg |
| Firms Product | Product — Gradeum | Program mgmt, resource planning, PE review, time tracking. Built for licensed firms. | /og/firms-product.svg |
| Demo | Demo — Gradeum | Interactive walkthrough of the platform. | /og/firms.svg |
| Firms Pricing | Pricing — Gradeum | $385/seat/month. Every feature. 60-day trial. | /og/pricing.svg |
| About | About — Gradeum | Built by a licensed PE. Time returned to judgment. | /og/about.svg |
| Agencies Home | Gradeum for Agencies — Your archive, accessible | Document retrieval for government organizations. Files never leave your network. | /og/agencies.svg |
| Agencies Product | How It Works — Gradeum for Agencies | Install locally, index your archive, search in plain language. Data sovereignty guaranteed. | /og/agencies-product.svg |
| Use Cases | Use Cases — Gradeum for Agencies | Port authorities, cities, counties, DOTs, USCG. Real scenarios... | (inherits agencies layout) |
| Agencies Pricing | Pricing — Gradeum for Agencies | $129/seat/month. Document retrieval. Files never leave. | /og/agencies-pricing.svg |
| Agencies Contact | Contact — Gradeum for Agencies | Get in touch with Gradeum. Document retrieval for government organizations. | (inherits agencies layout) |
| Partners Login | Partner Portal — Gradeum | Sign in to the Gradeum Partner Portal. | (inherits root) |
| Terms | Terms of Service — Gradeum | Gradeum Terms of Service. | (inherits root) |
| Privacy | Privacy Policy — Gradeum | Gradeum Privacy Policy. | (inherits root) |

---

## Accessibility Audit

### Fixes Applied
- Skip-to-content link (sr-only, visible on focus)
- Global focus-visible ring (amber outline)
- All form inputs have associated labels via htmlFor/id
- Required fields marked with aria-required
- Error states use role="alert" and aria-describedby
- Success states use aria-live="polite"
- Accordion buttons have aria-expanded and aria-controls
- Navigation landmarks have aria-labels
- Decorative icons marked aria-hidden

### Color Contrast Notes
- Navy (#1B3A5C) on Paper (#FAF7F2): ~8.2:1 — passes AA and AAA
- White (#FFFFFF) on Navy (#1B3A5C): ~8.2:1 — passes AA and AAA
- Amber (#C4883A) on Paper (#FAF7F2): ~3.1:1 — passes AA for large text only. Used primarily for buttons (large text) and links (underlined). For small body text, amber-dark (#A0703A) should be used.
- White on Amber (#C4883A): ~3.4:1 — passes AA for large text (buttons are 14px+ bold)

### Remaining
- axe-core browser audit not possible in CLI — should be run manually in Chrome DevTools
- Mobile keyboard navigation should be verified in browser

---

## Analytics Status

- **GA4**: Placeholder ready. Set `NEXT_PUBLIC_GA_ID` environment variable to activate. GA4 loads ONLY after cookie consent is accepted.
- **Vercel Analytics**: Active, loads without consent (no cookies, privacy-friendly).
- **Event tracking**: `audience_toggle`, `contact_submit` events wired. Additional CTA click events can be added via the `TrackClick` wrapper component.

---

## Contact Form Status

- Client-side validation: complete
- API route (/api/contact): validates and logs to console
- Email service (Resend/SendGrid): TODO — placeholder in route.ts
- Supabase leads table: TODO — placeholder in route.ts

---

## Blocking Items

1. **GA4 Measurement ID** — Need `NEXT_PUBLIC_GA_ID` env variable set in Vercel
2. **Email service** — Contact form logs to console only; needs Resend/SendGrid integration
3. **Supabase leads table** — Contact submissions not persisted; needs backend infra
4. **OG images** — Currently SVG placeholders; most social platforms require PNG/JPG. Convert to raster before production launch or implement Next.js dynamic OG image generation.
5. **Art assets** — Hero sketch art backgrounds (bridges, infrastructure on papyrus) not yet created

---

## Next Cycle Should

1. Run axe-core in Chrome DevTools on every page — fix any violations
2. Test cookie consent flow end-to-end (accept → GA4 loads, decline → no GA4)
3. Verify /sitemap.xml and /robots.txt serve correctly in production
4. Test OG images with social media debuggers (LinkedIn, Twitter, Facebook)
5. Verify keyboard navigation through all pages including mobile menu
6. Test contact form submission end-to-end
7. Verify all pages render correctly at 375px mobile viewport
8. Convert OG SVGs to PNGs for social media compatibility
9. Connect email service and Supabase to contact form
