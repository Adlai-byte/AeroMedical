# Production Readiness Implementation Plan
## Aero Medical & Diagnostic Clinic — care-shine-growth

---

## Priority Legend

| Priority | Meaning |
|----------|---------|
| 🔴 P0 | Must-fix — site is broken or non-functional without it |
| 🟠 P1 | Should-fix — significant quality/functionality gap |
| 🟡 P2 | Nice-to-have — polish, DX improvements, future-proofing |

---

## Phase 1 — Critical Fixes (P0)

### 1.1 Wire Up the Booking Form to a Backend

**Problem:** The contact form at `/contact` pretends to submit but does nothing — `onSubmit` just sets `submitted = true`. No data is persisted or sent anywhere.

**Solution Options (pick one):**

| Option | Pros | Cons |
|--------|------|------|
| **A. TanStack Start server functions** | Native to the framework, type-safe, runs on Cloudflare Workers | Requires writing server-side logic, DB integration |
| **B. Cloudflare Workers + KV/D1** | Already deploying to CF, D1 is a SQLite DB on the edge | Additional CF config, schema design |
| **C. Third-party form service (Formspree/Getform)** | Zero backend code, emails submissions instantly | External dependency, limited free tier |
| **D. Resend/email API from server function** | Sends submissions directly to clinic email, stays in-house | Needs email API key, rate limiting |

**Recommended: Option A + D** — TanStack Start server function that:
1. Validates input with Zod (already installed)
2. Persists to Cloudflare D1 (lightweight, free tier)
3. Sends notification email via Resend (or similar)
4. Returns confirmation to the frontend

**Tasks:**
- [ ] Create `src/lib/server/submit-appointment.ts` — TanStack `createServerFn` with Zod validation
- [ ] Configure Cloudflare D1 database in `wrangler.jsonc` + create schema (`appointments` table)
- [ ] Set up Resend (or Mailgun/SendGrid) API key as CF secret
- [ ] Refactor `contact.tsx` form to use `react-hook-form` + `zod` resolver (already installed)
- [ ] Add loading states, error handling, and toast notifications (sonner already installed)
- [ ] Add rate limiting (simple IP-based, CF provides this)
- [ ] Add honeypot field for spam protection

**Files to create/modify:**
```
src/lib/server/submit-appointment.ts   (new)
src/lib/validation/appointment.ts      (new — Zod schema)
src/routes/contact.tsx                 (rewrite form section)
wrangler.jsonc                         (add D1 binding)
```

**Estimated effort:** 4–6 hours

---

### 1.2 Add Privacy Policy & Terms Pages

**Problem:** The form says "By submitting, you agree to be contacted" but there's no privacy policy. This is legally required in the Philippines (Data Privacy Act of 2012, NPC compliance).

**Tasks:**
- [ ] Create `src/routes/privacy.tsx` — privacy policy page
- [ ] Create `src/routes/terms.tsx` — terms of service page
- [ ] Link them from the form disclaimer and the footer
- [ ] Include: what data is collected, how it's used, retention period, contact for data concerns

**Files to create:**
```
src/routes/privacy.tsx   (new)
src/routes/terms.tsx     (new)
src/components/site/Footer.tsx   (add links)
```

**Estimated effort:** 2–3 hours

---

## Phase 2 — Important Fixes (P1)

### 2.1 Remove Unused shadcn/ui Components

**Problem:** 46 UI component files installed, only **9 are actually imported** in the site code.

**Used (keep):**
- `button.tsx`, `dialog.tsx`, `input.tsx`, `label.tsx`, `separator.tsx`, `sheet.tsx`, `skeleton.tsx`, `toggle.tsx`, `tooltip.tsx`

**Unused (37 files — safe to delete):**
- `accordion.tsx`, `alert-dialog.tsx`, `alert.tsx`, `aspect-ratio.tsx`, `avatar.tsx`, `badge.tsx`, `breadcrumb.tsx`, `calendar.tsx`, `card.tsx`, `carousel.tsx`, `chart.tsx`, `checkbox.tsx`, `collapsible.tsx`, `command.tsx`, `context-menu.tsx`, `drawer.tsx`, `dropdown-menu.tsx`, `form.tsx`, `hover-card.tsx`, `input-otp.tsx`, `menubar.tsx`, `navigation-menu.tsx`, `pagination.tsx`, `popover.tsx`, `progress.tsx`, `radio-group.tsx`, `resizable.tsx`, `scroll-area.tsx`, `select.tsx`, `slider.tsx`, `sonner.tsx`, `switch.tsx`, `table.tsx`, `tabs.tsx`, `textarea.tsx`, `toggle-group.tsx`, `sidebar.tsx`

> **Note:** `form.tsx`, `select.tsx`, and `sonner.tsx` may be needed after Phase 1 (form refactor + toast). Keep those if the form refactor uses them.

**Tasks:**
- [ ] Audit each unused component — confirm no dynamic imports or future use
- [ ] Delete unused files
- [ ] Run `bun build` to verify no breakage

**Estimated effort:** 30 minutes

---

### 2.2 Remove Unused npm Dependencies

**Problem:** Several packages are imported only inside shadcn/ui component files (which will be deleted) and not used by the actual site.

**Used by the site directly:**
- `react`, `react-dom`, `@tanstack/react-router`, `@tanstack/react-start`, `@tanstack/router-plugin`
- `@radix-ui/react-dialog`, `@radix-ui/react-label`, `@radix-ui/react-separator`, `@radix-ui/react-slot`, `@radix-ui/react-tooltip` (via used UI components)
- `@radix-ui/react-toggle` (via toggle.tsx)
- `tailwindcss`, `@tailwindcss/vite`, `tw-animate-css`
- `lucide-react`, `class-variance-authority`, `clsx`, `tailwind-merge`
- `vite`, `vite-tsconfig-paths`, `@vitejs/plugin-react`
- `@cloudflare/vite-plugin`

**Used only by unused UI components (remove after 2.1):**
- `recharts` → only in `chart.tsx`
- `react-day-picker` → only in `calendar.tsx`
- `cmdk` → only in `command.tsx`
- `input-otp` → only in `input-otp.tsx`
- `react-resizable-panels` → only in `resizable.tsx`
- `vaul` → only in `drawer.tsx`
- `embla-carousel-react` → only in `carousel.tsx`
- `sonner` → only in `sonner.tsx` (may keep after form refactor)
- Many `@radix-ui/*` packages used only by deleted components

**Not imported anywhere at all:**
- `@tanstack/react-query` — not used anywhere
- `date-fns` — not used anywhere (calendar component not used)

**Keep for Phase 1:**
- `react-hook-form` — will be used in form refactor
- `@hookform/resolvers` — will be used with zod
- `zod` — will be used for validation

**Tasks:**
- [ ] After removing unused UI components (2.1), run `bun pm ls` to identify orphaned packages
- [ ] Remove: `recharts`, `react-day-picker`, `cmdk`, `input-otp`, `react-resizable-panels`, `vaul`, `embla-carousel-react`, `@tanstack/react-query`, `date-fns`
- [ ] Remove Radix packages only used by deleted components
- [ ] Run `bun install` to update lockfile
- [ ] Run `bun build` to verify

**Estimated effort:** 1 hour

---

### 2.3 Extract Hardcoded Data from `index.tsx`

**Problem:** `index.tsx` is 660+ lines with services, packages, FAQs, testimonials, and process steps hardcoded as inline arrays inside the file. This makes content updates require code changes.

**Solution:** Extract data into a dedicated data layer.

**Tasks:**
- [ ] Create `src/data/services.ts` — services array
- [ ] Create `src/data/packages.ts` — pricing packages
- [ ] Create `src/data/testimonials.ts` — patient testimonials
- [ ] Create `src/data/faqs.ts` — FAQ questions/answers
- [ ] Create `src/data/content.ts` — trust strip, process steps, stats
- [ ] Refactor `index.tsx` to import from data files
- [ ] Refactor `services.tsx` to import service data from the same source
- [ ] Add TypeScript types for all data structures

**File structure:**
```
src/data/
  services.ts
  packages.ts
  testimonials.ts
  faqs.ts
  content.ts
  types.ts
```

**Estimated effort:** 2–3 hours

---

### 2.4 Fix Generic Links & Placeholders

**Problem:** Several links point to generic URLs instead of the real clinic's resources.

**Tasks:**
- [ ] **Facebook link** in Footer: `href="https://facebook.com"` → update to actual Aero Medical Facebook page URL
- [ ] **Google Maps embed** in Contact: query is `San+Isidro+Davao+Oriental+Philippines` → replace with exact clinic coordinates or Google Maps Place ID
- [ ] **Google Maps link** ("Get directions"): same generic query → use actual pinned location
- [ ] **Email**: `hello@aeromedical.ph` → verify this is real and set up, or replace with actual email
- [ ] **Phone numbers**: verify `0927 403 3804` and `0930 651 8366` are correct and active
- [ ] **Logo** (`logo.png`): verify it's the final, high-quality version

**Estimated effort:** 1 hour (mostly waiting on client confirmation)

---

### 2.5 Add Loading States & Error Boundaries

**Problem:** No loading indicators on page transitions or form submissions. The error component exists in `router.tsx` but could be improved.

**Tasks:**
- [ ] Add a global loading spinner/skeleton for route transitions (TanStack Router `pendingComponent`)
- [ ] Improve the `DefaultErrorComponent` with proper error logging
- [ ] Add proper loading states to the booking form during submission
- [ ] Add network error handling for the form (offline detection, retry)

**Files to modify:**
```
src/router.tsx              (add pendingComponent)
src/routes/contact.tsx      (form loading states)
```

**Estimated effort:** 2 hours

---

## Phase 3 — Polish & DX (P2)

### 3.1 SEO & Performance Audit

**Tasks:**
- [ ] Add `robots.txt` and `sitemap.xml` (or generate dynamically)
- [ ] Add structured data (JSON-LD) for `LocalBusiness` / `MedicalBusiness` schema
- [ ] Optimize images — convert JPGs to WebP, add proper `width`/`height` to avoid CLS
- [ ] Add `alt` text audit — verify all images have descriptive alt text
- [ ] Add Open Graph image (`og:image`) — currently missing from meta tags
- [ ] Add favicon and app icons
- [ ] Run Lighthouse audit and fix issues above 90 target
- [ ] Add `<link rel="canonical">` to all pages

**Estimated effort:** 3–4 hours

---

### 3.2 Accessibility Audit

**Tasks:**
- [ ] Verify keyboard navigation works on all interactive elements
- [ ] Add skip-to-content link
- [ ] Ensure color contrast meets WCAG 2.1 AA (especially oklch values in dark mode)
- [ ] Add proper ARIA labels to the FAQ accordion (currently uses `<details>`, which is OK)
- [ ] Test with screen reader (NVDA/VoiceOver)
- [ ] Add focus-visible styles for keyboard users

**Estimated effort:** 2–3 hours

---

### 3.3 Analytics & Monitoring

**Tasks:**
- [ ] Add Cloudflare Web Analytics (free, privacy-friendly, no cookies)
- [ ] Set up error tracking (Sentry free tier or CF error logging)
- [ ] Add conversion tracking for form submissions
- [ ] Consider adding a "How did you hear about us?" field to the form

**Estimated effort:** 1–2 hours

---

### 3.4 Development Workflow Improvements

**Tasks:**
- [ ] Set up conventional commits (e.g., `feat:`, `fix:`, `chore:`) — current history is all "Changes"
- [ ] Add Husky + lint-staged for pre-commit hooks (format + lint)
- [ ] Add a `README.md` with setup instructions, environment variables, deployment guide
- [ ] Add `.env.example` with required environment variables (email API key, D1 binding, etc.)
- [ ] Set up CI/CD pipeline (GitHub Actions) for lint + type-check on PR
- [ ] Add proper `.gitignore` entries if missing

**Estimated effort:** 2–3 hours

---

### 3.5 Mobile & Cross-Browser Testing

**Tasks:**
- [ ] Test on iOS Safari, Android Chrome, Firefox, Edge
- [ ] Verify mobile menu works smoothly (animation, body scroll lock)
- [ ] Test form on mobile (date picker, select dropdown, keyboard types)
- [ ] Verify Google Maps iframe is touch-friendly on mobile
- [ ] Test on slow 3G connection (images lazy loading, fonts)

**Estimated effort:** 2 hours

---

## Implementation Order (Recommended)

```
Week 1: Production Blockers
├── Day 1-2: 1.1 Wire up booking form backend (server function + D1 + email)
├── Day 3:   1.2 Privacy policy + terms pages
└── Day 4:   2.4 Fix generic links (requires client input)

Week 2: Cleanup & Quality
├── Day 1:   2.1 Remove unused UI components
├── Day 1:   2.2 Remove unused npm dependencies
├── Day 2:   2.3 Extract hardcoded data
├── Day 3:   2.5 Loading states & error boundaries
└── Day 4:   3.1 SEO & performance

Week 3: Polish
├── Day 1:   3.2 Accessibility audit
├── Day 2:   3.3 Analytics & monitoring
├── Day 3:   3.4 Dev workflow improvements
└── Day 4:   3.5 Cross-browser testing + final QA
```

---

## Environment Variables Needed

```env
# .env.example

# Email service (Resend recommended)
RESEND_API_KEY=re_xxxxxxxx

# Cloudflare (set via wrangler, not .env)
# CF_D1_DATABASE_ID=xxxx
# CF_ACCOUNT_ID=xxxx
```

---

## Database Schema (Cloudflare D1)

```sql
CREATE TABLE appointments (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(8)))),
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  service TEXT NOT NULL,
  preferred_date TEXT NOT NULL,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'pending',  -- pending, confirmed, completed, cancelled
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  ip_address TEXT
);

CREATE INDEX idx_appointments_status ON appointments(status);
CREATE INDEX idx_appointments_date ON appointments(preferred_date);
```

---

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Form spam | High | Medium | Honeypot field + rate limiting + Cloudflare Turnstile |
| D1 free tier limits exceeded | Low | Medium | Monitor usage, archive old records |
| Email delivery failures | Medium | High | Queue retries, log all submissions to D1 as backup |
| Client doesn't provide real links | Medium | Low | Use placeholder that's clearly marked, deploy anyway |
| Image sizes slow mobile load | Medium | Medium | Convert to WebP, add responsive `srcset` |

---

## Success Criteria

- [ ] Booking form submissions are persisted to a database and trigger email notifications
- [ ] Privacy policy and terms pages are live and linked from footer + form
- [ ] All links point to real clinic resources (verified by client)
- [ ] Bundle size reduced by removing ~30 unused component files and ~15 unused npm packages
- [ ] Lighthouse score ≥ 90 across all categories
- [ ] Site loads in < 3s on 3G connection
- [ ] Zero TypeScript errors in production build
- [ ] CI pipeline passes on all PRs
