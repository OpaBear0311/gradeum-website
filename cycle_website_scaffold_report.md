# Cycle Report — TASK-WEBSITE-SCAFFOLD

| Field | Value |
|-------|-------|
| **Task ID** | TASK-WEBSITE-SCAFFOLD |
| **Sprint** | 5 |
| **Phase** | 1 of 4 |
| **Date** | 2026-03-29 |
| **Executor** | Codex |
| **Stack** | Next.js 16.2.1, React 19, Tailwind CSS v4, TypeScript |
| **Status** | COMPLETE |

---

## Summary

Scaffolded the Gradeum marketing website from scratch at `C:\Users\jakew\gradeum-web`. Project foundation includes design tokens, shared layout components, content constants, middleware, all audience routing, and 14 compiled routes. Phase 2 tasks (Firms pages + Agencies pages) can now run in parallel.

---

## What Was Built

### Project Initialization
- Next.js 16.2.1 with App Router, TypeScript, Tailwind CSS v4, ESLint
- `@vercel/analytics` installed
- Tailwind v4 uses CSS-based `@theme inline` configuration (not `tailwind.config.ts`)

### Design Tokens (`app/globals.css`)

| Token | Value |
|-------|-------|
| `--color-paper` | `#FAF7F2` |
| `--color-navy` | `#1B3A5C` |
| `--color-navy-deep` | `#0F1D36` |
| `--color-navy-light` | `#2A3F66` |
| `--color-amber` | `#C4883A` |
| `--color-amber-light` | `#D4A65A` |
| `--color-amber-dark` | `#A0703A` |
| `--color-warm-gray` | `#E8E4DD` |
| `--font-serif` | Charter, Georgia, Cambria, serif |
| `--font-sans` | Inter, system-ui, sans-serif |

Base styles: `body` gets paper bg + navy text + sans font. `h1-h4` get serif font.

### Content Constants (`lib/constants.ts`)

All site copy centralized: `ROOT_HERO`, `FIRMS_HERO`, `AGENCIES_HERO`, `PRICING`, `FIRMS_NAV_LINKS`, `AGENCIES_NAV_LINKS`, `FOOTER_LINKS`, `FIRMS_FEATURES`, `AGENCIES_FEATURES`, `FIRMS_FAQ`, `AGENCIES_FAQ`, `AGENCY_USE_CASES`, `CONTACT_EMAIL`, `SIGNUP_LIVE` flag, `TAGLINE`.

### Middleware (`middleware.ts`)

Redirects `lite.gradeum.io/*` to `gradeum.io/agencies/*` via 301. Matcher excludes `_next`, `api`, `favicon.ico`, `art`, `og`.

**Note:** Next.js 16 shows a deprecation warning recommending `proxy` over `middleware`. The middleware still compiles and functions correctly. Migration to the proxy convention can happen in a future cycle.

---

## Files Created (30)

### Configuration
| File | Purpose |
|------|---------|
| `app/globals.css` | Tailwind v4 theme tokens + base styles |
| `lib/constants.ts` | All site copy, nav links, features, FAQ, use cases |
| `middleware.ts` | lite.gradeum.io subdomain redirect |

### Layout Components
| File | Props |
|------|-------|
| `components/layout/Navbar.tsx` | `audience: "firms" \| "agencies" \| "root"` — Sticky nav with scroll-aware bg (transparent -> navy-deep). Audience-specific links from constants. Cross-link to other audience. Amber CTA. Mobile hamburger with full-screen overlay. |
| `components/layout/Footer.tsx` | No props — Navy bg, 4-column link grid from `FOOTER_LINKS`, tagline + copyright bottom bar. |

### Section Components
| File | Props |
|------|-------|
| `components/sections/Hero.tsx` | `headline`, `sub`, `primaryCTA`, `secondaryCTA?`, `trustChips?`, `bgImage?` — Full viewport hero with paper overlay, serif headline, CTA buttons, optional trust chip badges. |
| `components/sections/AudienceFork.tsx` | No props — Two side-by-side cards ("For Firms" / "For Agencies") with inline SVG icons, hover lift effect, arrow links. |

### UI Components
| File | Props |
|------|-------|
| `components/ui/Button.tsx` | `variant: "primary" \| "secondary" \| "ghost"`, `size: "sm" \| "md" \| "lg"`, `href?`, `children`, `className?`, `onClick?` |
| `components/ui/Card.tsx` | `children`, `className?`, `hoverable?` |
| `components/ui/Badge.tsx` | `children`, `variant: "navy" \| "amber" \| "muted"` |
| `components/ui/Accordion.tsx` | `items: { question: string; answer: string }[]` — Single-open accordion with +/x toggle animation |
| `components/ui/CookieConsent.tsx` | No props — Bottom banner, localStorage persistence, Accept/Decline |

### Pages (14 routes)
| File | Route | Content |
|------|-------|---------|
| `app/page.tsx` | `/` | Root landing — Hero + AudienceFork + Trust strip + Footer |
| `app/layout.tsx` | Root layout | Inter font, metadata, CookieConsent |
| `app/firms/layout.tsx` | `/firms/*` | Navbar (firms) + Footer wrapper |
| `app/firms/page.tsx` | `/firms` | Hero with firms copy + trust chips |
| `app/firms/product/page.tsx` | `/firms/product` | Placeholder |
| `app/firms/demo/page.tsx` | `/firms/demo` | Placeholder |
| `app/firms/pricing/page.tsx` | `/firms/pricing` | Placeholder |
| `app/agencies/layout.tsx` | `/agencies/*` | Navbar (agencies) + Footer wrapper |
| `app/agencies/page.tsx` | `/agencies` | Hero with agencies copy + trust chips |
| `app/agencies/product/page.tsx` | `/agencies/product` | Placeholder |
| `app/agencies/use-cases/page.tsx` | `/agencies/use-cases` | Placeholder |
| `app/agencies/pricing/page.tsx` | `/agencies/pricing` | Placeholder |
| `app/agencies/contact/page.tsx` | `/agencies/contact` | Email link to info@gradeum.io |
| `app/about/page.tsx` | `/about` | Placeholder |
| `app/docs/page.tsx` | `/docs` | Placeholder |
| `app/partners/login/page.tsx` | `/partners/login` | Placeholder |

### Directories Created (empty, ready for Phase 2)
- `components/demo/`
- `components/signup/`
- `public/art/`
- `public/og/`

---

## Issues Encountered and Resolved

| Issue | Resolution |
|-------|-----------|
| Route group collision: `(firms)` and `(agencies)` both resolved `/product` and `/pricing` to the same path | Changed from parenthesized route groups to actual path segments: `app/firms/` and `app/agencies/`. This means URLs are `/firms/product` and `/agencies/product` (which was the intended behavior). |
| Tailwind v4 uses CSS-based config, not `tailwind.config.ts` | Used `@theme inline` in `globals.css` for all design tokens instead of the v3 JS config file. |
| Next.js 16 middleware deprecation warning | Middleware still compiles and works. Warning is non-blocking. Migration to `proxy` convention deferred to a future cycle. |
| `create-next-app` prompted for React Compiler | Used `--yes` flag to auto-decline interactive prompts. |

---

## Design Token Verification

| Token | CSS Variable | Used In |
|-------|-------------|---------|
| Paper background | `bg-paper` / `--color-paper` | Body bg, Hero overlay |
| Navy text | `text-navy` / `--color-navy` | All headings, body text |
| Navy deep | `bg-navy-deep` / `--color-navy-deep` | Navbar (scrolled), Footer, Trust strip |
| Amber CTA | `bg-amber` / `--color-amber` | All CTA buttons, links |
| Warm gray borders | `border-warm-gray` / `--color-warm-gray` | Cards, dividers |
| Serif headings | `font-serif` | h1-h4 via base layer |
| Sans body | `font-sans` | Body via base layer |

All tokens resolve correctly via Tailwind v4's `@theme inline` directive.

---

## Build Verification

```
npm run build: PASS
14/14 routes compiled as static content
0 TypeScript errors
0 ESLint errors
1 deprecation warning (middleware -> proxy, non-blocking)
```

**Route Table:**
```
/                    -> Root landing (Hero + AudienceFork + Trust strip)
/firms               -> Firms hero
/firms/product       -> Placeholder
/firms/demo          -> Placeholder
/firms/pricing       -> Placeholder
/agencies            -> Agencies hero
/agencies/product    -> Placeholder
/agencies/use-cases  -> Placeholder
/agencies/pricing    -> Placeholder
/agencies/contact    -> Contact with email
/about               -> Placeholder
/docs                -> Placeholder
/partners/login      -> Placeholder
/_not-found          -> Next.js default 404
```

---

## What Phase 2 Tasks Need to Know

1. **Routing:** Use `app/firms/` and `app/agencies/` as actual path segments (not route groups with parentheses). Both have their own `layout.tsx` with audience-specific Navbar.

2. **Tailwind v4:** No `tailwind.config.ts` file. Custom colors and fonts are defined in `app/globals.css` via `@theme inline`. Use classes like `bg-paper`, `text-navy`, `bg-amber`, `text-navy/60` (opacity modifiers work).

3. **Constants:** All copy lives in `lib/constants.ts`. Import `FIRMS_FEATURES`, `FIRMS_FAQ`, `AGENCIES_FEATURES`, `AGENCIES_FAQ`, `AGENCY_USE_CASES`, `PRICING`, etc. No hardcoded strings in components.

4. **Components ready for use:** `Hero`, `Button`, `Card`, `Badge`, `Accordion` are all built and tested. Import from `@/components/ui/` or `@/components/sections/`.

5. **Middleware:** The `lite.gradeum.io` redirect works but uses the deprecated `middleware.ts` convention. It's functional — migration to `proxy` can be batched later.

6. **Next.js version:** This is Next.js **16.2.1** with React **19.2.4**. Some APIs may differ from Next.js 14/15. Check `node_modules/next/dist/docs/` if unsure.

7. **No auth:** This is a public marketing site. No authentication, no auth context, no protected routes.

---

*TASK-WEBSITE-SCAFFOLD | Sprint 5 | Phase 1 of 4 | March 29, 2026*
*Gradeum — Your knowledge. Empowered.*
