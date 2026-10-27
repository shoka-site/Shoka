# Sehle Redesign — Phased Implementation Plan

> Derived from `Sehle Redesigning prompt.md`, which remains the **authoritative source** for design intent and constraints. This file only decomposes that brief into sequential, independently reviewable phases.

---

## How to use this plan

1. Work through phases in order. Each phase has a **single goal**, a checklist, and an **exit gate**.
2. Open one phase per branch/PR (branch already created: `feat/sehle-new-look`), or commit per phase on that branch if preferred.
3. Do not start a phase until the previous phase's exit gate is green.
4. Every phase must preserve existing routes, APIs, auth, data flows, and business logic (brief §16).
5. Never invent facts, clients, metrics, testimonials, team members, or contact details (brief §17, §19).
6. Run checks from `frontend/`: `npm run lint`, `npx tsc --noEmit`, `npm run build`, `npm test`.
7. Update the **Status Tracker** at the bottom as phases complete.

### Cross-cutting rules (apply to every phase)

- Reuse the existing stack: Next.js App Router, React, Tailwind CSS v4, Radix/shadcn primitives, i18next. Do not add dependencies without justification.
- Both Arabic and English must be complete at the end of every phase that touches user-facing content.
- Use logical CSS properties (`margin-inline`, `padding-inline`, `inset-inline-start`, etc.) so RTL/LTR work from one implementation.
- Semantic HTML, visible focus states, keyboard support, and reduced-motion respect are required, not deferred.
- Verify against the real rendered app, not just source code, whenever browser tooling is available.
- If something cannot be verified, record it as an open item instead of claiming it passed.

---

## Phase map

| Phase | Name | Goal | Brief refs | Depends on |
|-------|------|------|------------|------------|
| 0 | Discovery & Baseline Audit | Understand the real codebase, brand, content, and risks before changing anything | §2, §3.3, §5 (inspect), §16, §18 | — |
| 1 | Design System Foundation | Lock tokens, typography, spacing, and shared visual primitives | §3, §4, §12, §13 | 0 |
| 2 | App Shell & Navigation | Rebuild header, mega menu, mobile nav, language switcher, footer | §5, §6, §12, §13 | 1 |
| 3 | Homepage | Deliver the full eight-section homepage story | §7 | 2 |
| 4 | Services | Services landing page + individual service detail pages | §8 | 2 |
| 5 | Portfolio & Case Studies | Curated, evidence-based project showcase and detail pages | §9 | 2, 3 |
| 6 | About | Credible company positioning and working principles | §10 | 2 |
| 7 | Contact & Conversion | WhatsApp, email, inquiry form, validation, success/failure states | §11, §13 | 2 |
| 8 | Bilingual Content & RTL Audit | Complete both locales and verify RTL/LTR behavior end-to-end | §5, §14, §17 | 3–7 |
| 9 | Accessibility, SEO & Performance | Hardening pass across the whole site | §15 | 8 |
| 10 | Final QA, Regression & Launch Report | Full verification, regression check, and handoff report | §18, §20, §21 | 9 |

**Dependency graph**

```
0 ──► 1 ──► 2 ──┬──► 3 ──► 5
                ├──► 4
                ├──► 6
                └──► 7
3–7 ──► 8 ──► 9 ──► 10
```

Phases 4, 5, 6, and 7 may run in parallel once Phase 2 is complete, provided each uses the Phase 1 tokens and Phase 2 shell.

---

## Phase 0 — Discovery & Baseline Audit

**Goal:** Produce a factual map of the existing system before any visual work. No redesign changes in this phase.

**Brief refs:** §2 (mandatory workflow), §3.3 (brand preservation), §5 (inspect localization), §16 (constraints), §18 (baseline checks).

**Known starting points (verify, don't assume):**

- `frontend/package.json`, `frontend/next.config.mjs`, `frontend/tailwind.config.ts`, `frontend/tsconfig.json`
- `frontend/app/layout.tsx`, `frontend/app/(main)/layout.tsx`, `frontend/app/globals.css`
- `frontend/app/(main)/home/page.tsx`, `frontend/components/home/*`
- `frontend/app/(main)/services/`, `frontend/app/(main)/projects/`, `frontend/app/(main)/about/`, `frontend/app/(main)/contact/`
- `frontend/components/layout/Navbar.tsx`, `frontend/components/layout/navbar/*`, `frontend/components/layout/Footer.tsx`, `frontend/components/layout/BottomNav.tsx`
- `frontend/lib/i18n.ts`, `frontend/lib/server-i18n.ts`, `frontend/locales/ar.json`, `frontend/locales/en.json`
- `frontend/app/api/content/[lang]/`, `frontend/app/api/admin/*`, `frontend/prisma/`, `frontend/lib/repositories/`
- `frontend/public/` for logos, favicon, and imagery

### Tasks

- [ ] Document the routing architecture (App Router route groups, dynamic routes, redirects) and list every public route.
- [ ] Inventory reusable components and identify duplicates/conflicting style systems.
- [ ] Extract the real brand assets: logo variants, favicon, approved colors, fonts, any brand guidelines.
- [ ] Document existing design tokens in `globals.css` (currently "Mesopotamian Luxury" light/dark system) and note contrast/accessibility gaps.
- [ ] Document typography: font family, weights, loading strategy, Arabic rendering behavior (currently Cairo via `next/font`).
- [ ] Map the localization architecture: cookie `NEXT_LOCALE`, i18next setup, server/client boundary, document `lang`/`dir`.
- [ ] Inventory every public page's sections, components, content sources, and current quality.
- [ ] Inventory portfolio projects, screenshots, descriptions, and verified facts; flag anything unverified.
- [ ] Inventory verified contact channels (WhatsApp Business number, email, socials) and existing form submission endpoints.
- [ ] Inventory existing SEO metadata, schema, sitemap, analytics, Sentry, and caching/revalidation behavior.
- [ ] Record baseline check results: lint, type-check, build, tests, and current known failures.
- [ ] Produce a risk register: breaking changes, missing assets, missing copy, unverified claims, integrations to preserve.
- [ ] Publish a concise architecture + proposed change summary (as required by brief §2.8) and get sign-off.

### Deliverables

- Discovery notes (append to this file, or `docs/discovery.md` if the team prefers).
- Verified token/asset/content inventory.
- Baseline check report.
- Prioritized risk register.

### Exit gate

- [ ] Route and component map is complete.
- [ ] Brand tokens and assets are documented with sources.
- [ ] Every proposed homepage section/case study/service is marked **verified** or **needs input**.
- [ ] Baseline lint/type-check/build/test results are recorded.
- [ ] No production code has been rewritten yet.

---

## Phase 1 — Design System Foundation

**Goal:** Establish one consistent visual language before touching pages.

**Brief refs:** §3 (visual direction, brand preservation), §4 (color, typography, layout, spacing), §12 (shared components), §13 (interaction states).

**Depends on:** Phase 0.

### Tasks

- [x] Finalize semantic color tokens in `frontend/app/globals.css` for: primary, secondary, accent, background, alternate background, cards/elevated surfaces, text primary/secondary/muted, borders, focus ring, success/warning/error.
- [x] Preserve Sehle's recognizable identity (gold/ivory/obsidian direction); improve contrast for both locales rather than replacing the palette.
- [x] Define the typographic scale: hero, page title, section heading, card title, body, supporting text, nav, buttons/labels, metadata/captions.
- [x] Confirm font pairing/weights, Arabic rendering, line heights, and responsive sizing; avoid oversized headings and cramped Arabic.
- [x] Add layout tokens: content container width, page margins, responsive spacing scale, section rhythm, radii, border treatments, restrained shadows.
- [x] Define motion tokens: durations/easings, hover/focus/active/disabled/loading states, reduced-motion fallbacks.
- [x] Build or refactor only the shared primitives needed by later phases: buttons (primary/secondary/ghost), section heading, container, badge/eyebrow, surface/card, focus ring utility.
- [x] Remove or reconcile conflicting style approaches surfaced in Phase 0; do not leave two systems in place.
- [x] Verify the existing dark theme remains coherent (or explicitly scope it out with a documented decision).
- [x] Document the final tokens and component inventory in this file or `docs/design-system.md`.

### Deliverables

- Updated tokens in `globals.css` (and Tailwind theme wiring if needed).
- Shared primitives under `frontend/components/ui/` or the established component location.
- Design-system reference with token names and usage rules.
- Before/after screenshots of a representative component in AR/EN, light/dark (if dark retained).

### Exit gate

- [x] No hardcoded colors or magic spacing values in new/changed components.
- [x] Tokens pass contrast checks for normal and large text in both directions.
- [x] Typography scale renders correctly with Arabic and Latin content.
- [x] `npm run lint`, `npx tsc --noEmit`, and `npm run build` pass.
- [ ] Design tokens documented and approved. (Documented in `docs/design-system.md`; owner approval pending.)

---

## Phase 2 — App Shell & Navigation

**Goal:** Rebuild the persistent frame: header, desktop mega menu, mobile menu, language switcher, footer, and skip link.

**Brief refs:** §5 (bilingual requirements), §6 (site architecture, header/nav), §12 (shared components), §13 (interactions).

**Depends on:** Phase 1.

**Likely touchpoints:** `frontend/components/layout/Navbar.tsx`, `frontend/components/layout/navbar/*`, `Footer.tsx`, `BottomNav.tsx`, `frontend/app/(main)/layout.tsx`, `frontend/app/layout.tsx`, `frontend/locales/*.json`.

### Tasks

- [ ] Rebuild the header using the existing logo, main section links, accessible language switcher, and a primary "Discuss Your Project" action.
- [ ] Decide sticky vs. non-sticky based on viewport cost; document the decision.
- [ ] Make the desktop mega menu keyboard-operable with visible focus, escape-to-close, and correct active-route indication.
- [ ] Build the mobile navigation with functional open/close, focus trapping/return, scroll lock, and an easy-to-reach primary CTA.
- [ ] Implement the language switcher so the current page is preserved when an equivalent translation exists; update `NEXT_LOCALE`, `<html lang>`, and `dir`.
- [ ] Ensure all navigation, icon directionality, and arrows flip correctly in RTL without mirroring the logo or non-directional brand marks.
- [ ] Rebuild the footer: logo, positioning line, main nav, service links, language switch, verified email, verified WhatsApp, configured socials, legal/copyright.
- [ ] Handle overflow, wrapping, and mixed Arabic/Latin strings at mobile, tablet, and desktop widths.
- [ ] Remove dead links, placeholder destinations, and duplicated nav data.
- [ ] Verify skip-to-content remains first in tab order and targets `#main-content`.

### Deliverables

- Refactored header, mega menu, mobile menu, language switcher, footer, bottom nav (if retained).
- Updated nav/footer translations in both locales.
- Responsive screenshots of shell at representative widths in AR and EN.

### Exit gate

- [ ] Every nav/footer link resolves to a real route.
- [ ] Language switch preserves the current page where a translation exists.
- [ ] Keyboard-only navigation works end-to-end in both directions.
- [ ] No horizontal overflow at 320 px or 360 px widths.
- [ ] Lint, type-check, and build pass.

---

## Phase 3 — Homepage

**Goal:** Deliver the full eight-section homepage narrative: what Sehle does, who it helps, what it builds, why it is credible, and how to start.

**Brief refs:** §7 (all sections), §13 (interactions), §14 (responsive), §17 (content quality).

**Depends on:** Phase 2.

**Likely touchpoints:** `frontend/app/(main)/home/page.tsx`, `frontend/components/home/HomeStaticSections.tsx`, `HomeDataSections.tsx`, `HomeClientComponents.tsx`, plus section components under `frontend/components/home/`.

### Tasks

- [ ] **Hero:** business-focused headline, concise supporting copy, primary "Discuss Your Project" (verified WhatsApp/contact flow), secondary "Explore Our Services" (`/services`), authentic product/dashboard imagery.
- [ ] **Credibility & positioning:** verified company facts only; if proof is missing, explain capabilities instead of inventing metrics/logos/testimonials.
- [ ] **Services overview:** four verified categories (Custom Software, AI & Automation, Digital Product, Data/Cloud/IT Consulting) with specific descriptions and links; reconcile with the real service catalog.
- [ ] **Selected work:** 2–3 verified projects with name, industry (if permitted), problem, contribution, verified tech, genuine imagery, case-study link when available.
- [ ] **Why Sehle:** concrete differentiators with explanations, no superlatives or unsupported claims.
- [ ] **Working process:** 5-step editorial/timeline layout adapted to Sehle's real workflow, not another card grid.
- [ ] **Final CTA:** "Discuss Your Project" (primary) and email (secondary), welcoming copy for founders without full specs.
- [ ] **Footer:** already delivered in Phase 2 — verify homepage integration.
- [ ] Use varied section composition (asymmetry, editorial layout) instead of repeating the same card grid.
- [ ] Optimize and correctly size all imagery with `next/image`, meaningful alt text, and no layout shift.
- [ ] Add lightweight entrance motion only where it aids comprehension; respect `prefers-reduced-motion`.
- [ ] Ensure AR and EN copy are both complete and natural; no lorem ipsum.

### Deliverables

- Rebuilt homepage sections and components.
- Verified content for all eight sections (or documented placeholders with owner/deadline).
- AR/EN screenshots at mobile, tablet, laptop, desktop.

### Exit gate

- [ ] Homepage tells the full story in one scroll without repeating card grids.
- [ ] Both CTAs work on desktop and mobile with verified destinations.
- [ ] No unverified claims, fake stats, or stock imagery.
- [ ] AR/EN and RTL/LTR render correctly at all target widths.
- [ ] Lint, type-check, and build pass.

---

## Phase 4 — Services Overview & Detail Pages

**Goal:** Make the service offering understandable, discoverable, and actionable.

**Brief refs:** §6 (routes), §8 (services page + detail pages), §12, §17.

**Depends on:** Phase 2.

**Likely touchpoints:** `frontend/app/(main)/services/page.tsx`, `frontend/app/(main)/services/[slug]/`, `frontend/components/services/ServicesPageContent.tsx`, admin/content sources (read-only unless content schema needs extending).

### Tasks

- [ ] Audit the real service catalog and map it to the four proposed categories; preserve services that do not fit and adjust grouping where necessary.
- [ ] Rebuild the services landing page with clear category headings, meaningful descriptions, relevant visuals, and direct links.
- [ ] Build a consistent detail-page template: service hero/value proposition, business problems, capabilities/deliverables, use cases, related verified case studies, delivery process, FAQs (only when useful), inquiry CTA.
- [ ] Write specific content per service — no duplicated generic paragraphs.
- [ ] Publish only capabilities Sehle can actually deliver.
- [ ] Preserve existing routes/slugs; add redirects for any necessary route changes.
- [ ] Ensure one clear inquiry action per page without competing CTAs.
- [ ] Add/refresh metadata and structured data for the services index and detail pages.
- [ ] Verify dynamic routes render for every published service and handle unknown slugs correctly.

### Deliverables

- Rebuilt services landing page.
- Detail-page template + content for every verified service.
- AR/EN copy and metadata.
- Route/redirect notes.

### Exit gate

- [ ] Every category and service links to a working page.
- [ ] No service advertises unsupported capability.
- [ ] Unknown slugs return the intended not-found behavior.
- [ ] AR/EN and responsive checks pass.
- [ ] Lint, type-check, and build pass.

---

## Phase 5 — Portfolio & Case Studies

**Goal:** Prove capability with a small, genuine, well-documented body of work.

**Brief refs:** §7.4 (selected work), §9 (portfolio and case studies), §17.

**Depends on:** Phases 2 and 3 (selected-work section).

**Likely touchpoints:** `frontend/app/(main)/projects/page.tsx`, `frontend/app/(main)/projects/[slug]/`, `frontend/components/projects/*`, content/admin project records.

### Tasks

- [ ] Verify available project evidence: screenshots, descriptions, client permission, technical details, outcomes.
- [ ] Choose a curated set that demonstrates different capabilities; prefer fewer real projects over padding.
- [ ] Rebuild the portfolio index with filtering/categorization only if it stays simple and useful.
- [ ] Build the case-study narrative: overview, client context (if permitted), problem/opportunity, objectives, Sehle's role, solution/implementation, genuine visuals, verified technical details, results only when evidenced.
- [ ] Replace generic illustrations with authentic product imagery wherever possible.
- [ ] Rewrite homepage selected-work links to the final case studies.
- [ ] Mark any unverified outcome as a documented placeholder, never as a result.
- [ ] Add metadata and social preview images per case study.

### Deliverables

- Portfolio index and case-study pages.
- Verified asset set with licenses/permissions noted.
- AR/EN content and metadata.

### Exit gate

- [ ] Every published project has verified supporting information.
- [ ] No fabricated clients, results, or visuals.
- [ ] Portfolio and homepage links agree.
- [ ] AR/EN and responsive checks pass.
- [ ] Lint, type-check, and build pass.

---

## Phase 6 — About Page

**Goal:** Build confidence through honest company positioning, principles, and approach.

**Brief refs:** §10, §17.

**Depends on:** Phase 2.

**Likely touchpoints:** `frontend/app/(main)/about/page.tsx`, `frontend/components/about/*`.

### Tasks

- [ ] Present Sehle's identity, role as a technology partner, and approach to understanding business needs, choosing technology, delivering reliably, and collaborating.
- [ ] Use genuine company/team information only; no invented members, milestones, offices, or qualifications.
- [ ] Structure the page editorially (not another generic card grid) with a clear reading flow.
- [ ] Include verified proof points or capabilities where evidence exists.
- [ ] Add a clear inquiry CTA.
- [ ] Complete AR/EN copy and metadata.

### Exit gate

- [ ] Every factual claim is traceable to verified information.
- [ ] Page is focused on what prospective clients need to build confidence.
- [ ] AR/EN and responsive checks pass.
- [ ] Lint, type-check, and build pass.

---

## Phase 7 — Contact & Conversion

**Goal:** Make starting a conversation effortless and reliable.

**Brief refs:** §11 (contact + conversion), §13 (form states), §15 (form a11y), §17.

**Depends on:** Phase 2.

**Likely touchpoints:** `frontend/app/(main)/contact/page.tsx`, `frontend/components/contact/*`, existing inquiry API routes (if present), `frontend/app/api/*`.

### Tasks

- [ ] Rebuild the intro with welcoming, expectation-setting copy (what to share, what happens next).
- [ ] Add a prominent verified WhatsApp Business action with a correctly encoded `wa.me` link.
- [ ] Display the verified email address with a functional `mailto:` link.
- [ ] If a form is implemented, use only supported fields (name, email, company/project type, short description) and reuse any existing submission endpoint.
- [ ] Implement accessible labels, client-side validation, inline errors, disabled/loading states, and clear success/failure feedback.
- [ ] Never ship a form that silently discards submissions; if no working endpoint exists, use the established channels or clearly mark the integration as incomplete.
- [ ] Verify every contact action works on desktop and touch devices.
- [ ] Complete AR/EN copy and metadata.

### Exit gate

- [ ] WhatsApp and email destinations are verified and correct.
- [ ] Form (if present) actually delivers submissions and reports failures honestly.
- [ ] Keyboard, screen-reader labels, and error messaging work.
- [ ] AR/EN and responsive checks pass.
- [ ] Lint, type-check, and build pass.

---

## Phase 8 — Bilingual Content Completion & RTL/LTR Audit

**Goal:** Make Arabic and English first-class equals across the entire redesigned site.

**Brief refs:** §5, §14 (RTL inspection), §17.

**Depends on:** Phases 3–7.

### Tasks

- [ ] Audit every route for missing, literal, or machine-like translations; complete both locales.
- [ ] Verify consistent terminology for service names, navigation, buttons, and recurring terms.
- [ ] Verify document `lang`/`dir`, metadata, and language switcher behavior on every page.
- [ ] Check mixed Arabic/Latin content: technical terms, URLs, emails, numbers, code.
- [ ] Inspect navigation order, alignment, directional icons/arrows/breadcrumbs, forms, and reading flow independently in RTL.
- [ ] Confirm logos, brand marks, and non-directional media are not blindly mirrored.
- [ ] Check Arabic heading wrapping, line height, and spacing at mobile/tablet/desktop.
- [ ] Replace any remaining lorem ipsum or placeholder copy, or document the owner and deadline.
- [ ] Verify SEO titles/descriptions and localized alternates where supported.

### Exit gate

- [ ] No user-facing string falls back to the wrong language.
- [ ] RTL and LTR both pass visual review at all target widths.
- [ ] Terminology is consistent across pages.
- [ ] No untranslated or placeholder content remains without a documented owner.

---

## Phase 9 — Accessibility, SEO & Performance Hardening

**Goal:** Meet professional quality bars without sacrificing the visual result.

**Brief refs:** §15, §13 (reduced motion), §16 (no unnecessary client JS), §18.

**Depends on:** Phase 8.

### Tasks

- [ ] **Accessibility:** heading hierarchy, landmark structure, keyboard operability, visible focus, form labels/errors, contrast, reduced motion, descriptive link text, meaningful alt text.
- [ ] **SEO:** per-page titles/descriptions in both languages, canonical URLs, localized alternates where the routing supports them, preserved legacy routes/metadata, valid structured data, sitemap/robots sanity.
- [ ] **Performance:** audit LCP/CLS/INP, image sizing/formats/lazy loading, font loading and `display: swap`, bundle weight, unnecessary client components, and caching/rendering strategy.
- [ ] Remove unused dependencies/imports introduced during the redesign; justify any new ones.
- [ ] Check for layout shifts from images, fonts, banners, and conditional content.
- [ ] Run Lighthouse (or equivalent) on home, services, one detail page, portfolio, about, contact in AR and EN; record scores and findings.
- [ ] Fix high-impact regressions; document accepted trade-offs.
- [ ] Do not claim compliance or performance gains without recorded verification.

### Exit gate

- [ ] No critical/serious automated accessibility violations on primary pages.
- [ ] Primary routes have correct, localized metadata.
- [ ] No unbounded layout shift or oversized media.
- [ ] Recorded before/after performance notes exist.
- [ ] Lint, type-check, build, and tests pass.

---

## Phase 10 — Final QA, Regression & Launch Report

**Goal:** Prove the redesign is complete, safe, and ready to ship.

**Brief refs:** §18 (testing), §20 (definition of done), §21 (final report).

**Depends on:** Phase 9.

### Tasks

- [ ] Run `npm run lint`, `npx tsc --noEmit`, `npm run build`, and `npm test` in `frontend/`; resolve all introduced failures.
- [ ] Verify every primary route and internal link (no 404s, no dead anchors).
- [ ] Test AR/EN switching on every page, including direction and metadata.
- [ ] Test mobile navigation, keyboard interaction, and focus return.
- [ ] Verify WhatsApp and email destinations using the configured contact details.
- [ ] Test form validation and submission behavior end-to-end (if implemented).
- [ ] Inspect mobile, tablet, laptop, and desktop layouts in both locales.
- [ ] Check image loading, typography, spacing, wrapping, console errors, and broken assets.
- [ ] Confirm existing integrations, APIs, auth, admin flows, analytics, and business logic still work.
- [ ] Complete the brief §21 report: design improvements, pages/components changed, brand and bilingual preservation, assets used, tests run and results, remaining issues/assumptions, follow-up recommendations.
- [ ] Update this plan's Status Tracker and record unresolved blockers.

### Exit gate

- [ ] All applicable §18 checks are run and reported honestly (passed/failed/not run).
- [ ] The §20 definition of done is satisfied or every gap is documented.
- [ ] The §21 final report is delivered.
- [ ] No regressions in existing functionality.

---

## Traceability matrix (brief → phase)

| Brief section | Covered by |
|---------------|------------|
| §1 Role and objective | All phases |
| §2 Inspect before editing | Phase 0 (re-check at every phase) |
| §3 Brand identity and art direction | Phases 0, 1 |
| §4 Design system | Phase 1 |
| §5 Bilingual architecture | Phases 2, 8 (content in every page phase) |
| §6 Site architecture and navigation | Phases 2, 4 |
| §7 Homepage | Phase 3 |
| §8 Services | Phase 4 |
| §9 Portfolio and case studies | Phase 5 |
| §10 About | Phase 6 |
| §11 Contact and conversion | Phase 7 |
| §12 Components and visual assets | Phases 1–7 |
| §13 Interactions and animation | Phases 1–7, verified in 9 |
| §14 Responsive design | Every page phase, audited in 8 and 9 |
| §15 Accessibility, SEO, performance | Phase 9 (built into every phase) |
| §16 Technical implementation constraints | Phase 0 and all phases |
| §17 Content and localization quality | Every page phase, audited in 8 |
| §18 Testing and QA | Every phase + Phase 10 |
| §19 Design mistakes to avoid | Guardrails in every phase |
| §20 Definition of done | Phase 10 |
| §21 Final implementation report | Phase 10 |

---

## Status Tracker

| Phase | Status | Owner | PR / Commit | Notes |
|-------|--------|-------|-------------|-------|
| 0 — Discovery & Baseline Audit | In review | | | Audit complete in `docs/discovery.md`; owner sign-off pending; 43 baseline lint errors resolved in Phase 1 |
| 1 — Design System Foundation | In review | | | Tokens, primitives, docs, contrast tests, and before/after captures complete; lint/tsc/test/build pass; owner visual and token approval pending |
| 2 — App Shell & Navigation | In review | | | Header/nav/footer reviewed against Phase 2 requirements; lint/tsc/build/tests pass; skip link/RTL/language switch verified |
| 3 — Homepage | Not started | | | |
| 4 — Services | Not started | | | |
| 5 — Portfolio & Case Studies | Not started | | | |
| 6 — About | Not started | | | |
| 7 — Contact & Conversion | Not started | | | |
| 8 — Bilingual & RTL Audit | Not started | | | |
| 9 — A11y, SEO & Performance | Not started | | | |
| 10 — Final QA & Report | Not started | | | |

**Open questions / blockers**

Full list with evidence in `docs/discovery.md` §14 and §19.

- [x] WhatsApp confirmed by owner: **+964 748 589 2587** (`wa.me/9647485892587`). Code currently shows the wrong `+964 785 892 5817`; fix in Phase 2/7.
- [ ] Confirm the public email (code uses `sehle.iq@gmail.com`), business hours, and whether `+90 543 106 1211` is ever valid.
- [ ] Confirm the legal entity, HQ/service area, and whether the Ankara address is real.
- [ ] Confirm which portfolio projects, screenshots, logos, and outcomes may be published.
- [ ] Confirm the real service catalog and whether the brief's four categories replace the current seven types.
- [ ] Confirm the working process steps, delivery timeline, and team roles.
- [x] Inquiry form endpoint exists: public `POST /api/admin/consultations`; rate-limited and notifies via Resend.
- [ ] Confirm whether the 2 testimonials and the 20+ / 3 / 100% / 24/7 / 4.9 claims are real and publishable.
- [ ] Decide whether `/` and `/home` should both remain, and which is canonical.
- [ ] Confirm retained pages beyond the brief's six (blog, news, packages, industries, calculator, compare, glossary, refer, social kit, city pages, 108 combos).
- [ ] Decide locale URL strategy: cookie-only or `/ar` + `/en`.
- [ ] Confirm social handle source of truth (`sehle_it` vs `sehle_iq`) and legal/consent copy ownership.
