# Sehle Redesign — Phase 0 Discovery & Baseline

**Status:** In review — audit complete; owner decisions pending.
**Branch:** `feat/sehle-new-look` (from `main`)
**Audit date:** 2026-10-26
**Authoritative brief:** `Sehle Redesigning prompt.md` (21 sections)
**Phase plan:** `SEHLE_REDESIGN_PHASES.md`

This document records the *actual* state of the application before any redesign work. It separates verified findings from facts that still require owner confirmation. No production code was changed in Phase 0.

---

## 1. Method and evidence

The audit combined source inspection, database reads, a production build, and runtime checks against `next start` on `127.0.0.1:3123`.

- Build, lint, type-check, and test output: `/tmp/opencode/{build,lint,tsc,test}.out`
- Database inventory: `/tmp/opencode/db-inventory.out`
- Runtime HTML samples: `/tmp/opencode/{home,service-detail,service-detail2,project-detail}.html`
- Sitemap and HTTP-status checks were run with `curl` against the local production server.
- Evidence trail: where a finding depends on a specific file/line, the path is listed.
- “Verified” means reproduced in source, database, build output, or rendered HTML. “Needs input” means the code contains a claim or value that cannot be confirmed from the repository.

---

## 2. System snapshot

| Area | Current state |
|---|---|
| Framework | Next.js App Router, `next ^16.3.0-canary.32` (installed preview/canary), React `^19.2.0` |
| Styling | Tailwind CSS v4.1 with `@theme inline` in `frontend/app/globals.css`; `tailwind.config.ts` is effectively empty |
| UI primitives | Radix UI / shadcn-style components under `frontend/components/ui/` |
| Data | Prisma 5.22 + PostgreSQL; repository/storage layer under `frontend/lib/repositories/`, `frontend/lib/storage.ts` |
| Localization | i18next + react-i18next; cookie `NEXT_LOCALE`; default `ar`; no URL locale prefix |
| Auth | Custom HMAC-signed `admin_auth` cookie; `frontend/proxy.ts` protects `/admin/*` and `/api/admin/*` |
| Analytics | GA/GTM component (inactive without IDs), Vercel Analytics and Speed Insights |
| Errors | Sentry configs present but inactive without DSNs |
| Email | Resend for consultation notifications |
| Deployment shape | Vercel-oriented, with standalone output for non-Vercel hosts |
| Code size | 195 TS/TSX files (~21.8k lines): 62 components (25 UI, 12 layout), 61 app TSX, 30 lib TS |
| Route inventory | 23 public page files, 12 admin pages, 38 API route handlers, plus robots/sitemap/llms handlers |

**Build result:** passes. Build output marks every public page as `ƒ Dynamic`; only `/robots.txt` and `/sitemap.xml` are static. The “Generating static pages 176/176” line refers largely to content-API variants, not public HTML pages.

**Critical architectural consequence:** `frontend/app/layout.tsx` and shared metadata read `cookies()`. This opts the whole public site into dynamic rendering. `export const revalidate = 60` on public pages is therefore mostly ineffective, and `/api/revalidate-all` + `router.refresh()` on every mount adds avoidable RSC and database work.

---

## 3. Route and rendering map

### Public routes

| Route | Source | Current rendering / notes |
|---|---|---|
| `/` | `app/page.tsx` → `WelcomePageClient` | Splash/intro page with A/B headline; self-canonical; in sitemap priority 1.0 |
| `/home` | `app/(main)/home/page.tsx` | The real 8-section homepage; self-canonical; in sitemap priority 1.0 |
| `/about` | DB team + updates + hardcoded stats | Dynamic; placeholder awards when empty |
| `/services` | DB services | Dynamic; server-rendered listing |
| `/services/[slug]` | DB service by slug/id/Arabic slug | Metadata server-fetched; body is a **client component** that fetches again |
| `/projects` | DB projects | Dynamic; server-rendered listing |
| `/projects/[slug]` | DB project | Same metadata-only SSR + client body pattern |
| `/packages` | DB packages + hardcoded comparison tiers | Dynamic; pricing table not backed by DB |
| `/packages/[slug]` | DB package | Same metadata-only SSR + client body pattern |
| `/industries` | DB industries | Dynamic |
| `/industries/[slug]` | DB industry | Same metadata-only SSR + client body pattern |
| `/contact` | static shell + form | Owner-confirmed WhatsApp +964 748 589 2587; code currently shows the wrong number; no privacy/consent |
| `/blog` | platform updates reused as posts | Only 1 active post; thin |
| `/blog/[slug]` | platform update | Soft 404 on unknown; not in sitemap |
| `/news` | platform updates | Only 1 active item |
| `/compare` | hardcoded comparison copy | Fabricated local-presence/offline claims |
| `/compare/[slug]` | 2 hardcoded comparisons | Not in sitemap; claims on-ground support |
| `/glossary` | hardcoded glossary | 5 terms |
| `/quote-calculator` | hardcoded prices/timelines + lead modal | No non-binding estimate disclaimer |
| `/refer`, `/social-kit` | static | Retained beyond brief |
| `/solutions-in-[city]` | 5 hardcoded cities | “Local” landing pages; schema uses Ankara phone |
| `/[slug]` | 12 services × 9 industries = 108 pages | Programmatic SEO pages; generic repeated bullets; breadcrumb links use IDs |
| `/robots.txt` | `app/robots.ts` | Allows GPTBot, ChatGPT-User, PerplexityBot, ClaudeBot, anthropic-ai, Google-Extended; blocks CCBot |
| `/sitemap.xml` | `app/sitemap.ts` | 171 URLs; includes broken slugs; omits blog/compare details |
| `/llms.txt`, `/llms-full.txt` | route handlers | Carry the +90 phone and Ankara HQ |

### Admin surface

12 admin pages (`/admin`, login, consultations, industries, packages, platform-updates, projects, services, solutions, team, testimonials, components-docs). All protected by `proxy.ts` except `/admin/login`; all admin APIs except login/logout are protected. `POST /api/admin/consultations` is deliberately public for the contact form.

### Rendering findings

- **Detail pages ship no body content.** Service, project, package, and industry detail pages server-fetch only metadata and pass an `id` to a client hook. Initial HTML contains no `<h1>` and 18 `animate-pulse` placeholders. Measured rendered body text: 18 words (navigation only).
- **Full-screen loader first.** Each detail page shows `InitialLoader` until the client fetch resolves. The loader also enforces a 1000 ms artificial delay after `load` (with a 5 s fallback), delaying LCP and perceived content.
- **Double fetch.** Metadata is fetched on the server; the visible body is fetched again from `/api/content/[lang]/...` in the browser.
- **Unknown URLs are soft 404s.** `/services/no-such`, `/projects/no-such`, `/packages/no-such`, `/industries/no-such`, `/blog/no-such`, and `/no-such-page/` all return **HTTP 200** with a “not found” UI. Unknown service pages also emit `robots: index, follow` and canonical `/services/`. This fails the Phase 0/4 expectation that unknown slugs produce proper not-found behavior.
- **Duplicate URL variants.** Detail pages resolve by slug, ID, or Arabic slug. The ID and Arabic-slug URLs canonicalise to themselves, creating duplicate content. Example: `/services/<uuid>/` returns 200 and canonicalises to the UUID URL.
- **Two homepages.** `/` and `/home` are independent pages, both canonical, both priority 1.0 in the sitemap, with different titles and different content. This requires an owner decision.
- **Programmatic pages are dynamic too.** Even routes with `generateStaticParams` (cities, compare details) render dynamically because the root layout reads cookies.

---

## 4. Design system, typography, and brand assets

### Tokens currently defined

`frontend/app/globals.css` defines a “Mesopotamian Luxury” light/dark palette:

| Token | Light | Dark |
|---|---|---|
| `--background` | `hsl(40 20% 97.5%)` (#faf9f7) | `hsl(0 0% 0%)` (#000000) |
| `--foreground` | `hsl(0 0% 12%)` (#1f1f1f) | `hsl(0 0% 100%)` (#ffffff) |
| `--card` | `hsl(0 0% 100%)` | `hsl(0 0% 5%)` (#0d0d0d) |
| `--primary` | `hsl(42 65% 38%)` (#a07a22) | `hsl(42 43% 56%)` (#bfa25f) |
| `--primary-foreground` | `hsl(0 0% 100%)` | `hsl(0 0% 0%)` |
| `--secondary` | `hsl(40 18% 91%)` | `hsl(0 0% 10%)` |
| `--muted-foreground` | `hsl(30 8% 38%)` (#696159) | `hsl(0 0% 52%)` (#858585) |
| `--border` | `hsl(42 40% 50% / 0.22)` | `hsl(42 43% 56% / 0.15)` |
| `--ring` | `hsl(42 65% 38%)` | `hsl(42 43% 56%)` |
| `--radius` | `0.5rem` | `0.5rem` |

Missing tokens: success, warning, info, surface-raised, shadow scale, motion durations/easings, spacing scale, and container width. `--radius` is the only radius primitive; components use many one-off `rounded-[2rem]`/`[2.5rem]`/`[3.5rem]` values.

### Contrast (WCAG 2.1)

| Pair | Ratio | Result |
|---|---:|---|
| Light primary #a07a22 on white | **3.96** | Fails AA for normal text |
| White on light primary | **3.96** | Fails AA for normal text |
| Light primary on background | **3.76** | Fails AA for normal text |
| Light muted-fg on muted | 5.30 | Passes AA |
| Light fg on background | 15.67 | Passes AAA |
| Dark primary on black | 8.55 | Passes AAA |
| Dark muted-fg on black | 5.69 | Passes AA |
| Dark muted-fg on card | 5.27 | Passes AA |
| White on dark primary | **2.46** | Fails AA |
| Black on dark primary | 8.55 | Passes AAA |

The light gold is used for small uppercase labels and CTAs with white text, so the failure is visible in real UI, not only in theory.

### Typography

- Cairo is loaded via `next/font/google`, weights 300/400/600/700, `display: swap`, `preload: true`.
- `--font-sans`, `--font-display`, and `--font-arabic` all resolve to Cairo. There is no display/body pairing, so the brief’s typography requirement is not met yet.
- Arabic letter-spacing is globally forced to 0 in RTL via `html[dir="rtl"] * { letter-spacing: 0 !important; }`; this is a sensible mitigation for connected script.
- No `prefers-reduced-motion` handling exists anywhere in `app/`, `components/`, or `globals.css`.

### Hardcoded color debt

- **229** six-digit hex values in TS/TSX: 161 in `lib/generateGuidePdf.ts`, 15 in `lib/notifications.ts`, and 53 across UI/app/components.
- **90** occurrences of `rgba(194,164,92, ...)` gold in UI code.
- 9 hex values in `globals.css` token definitions.
- Highest UI concentrations: `WelcomePageClient.tsx` (18), `HomeClientComponents.tsx` (19), `HomeDataSections.tsx` (6), admin components-docs (5).

### Brand assets

| Asset | Finding |
|---|---|
| `public/logoo.png` | 838×298, 178 KB; used by Navbar, loaders, welcome page |
| `public/logo1.png` | Byte-identical duplicate of `logoo.png` (MD5 `1cdf6a376e54318383c2550f4fb2f096`); unused |
| `app/favicon.ico` | Actually a 2048×2048 PNG (160 KB), not a multi-size ICO |
| `public/og-image.png` | 2048×2048 PNG, but metadata declares 1200×630 |
| `public/cuneiform-glyph.png` | 1024×1024, 1.7 MB; used in About |
| `public/uploads/` | 31 MB / 36 files; largest 6.7 MB; includes Gemini-generated images, iStock imagery, and dataset samples |
| Missing | No `icon*`, `apple-icon*`, `manifest*`, `opengraph-image*`, or `twitter-image*` files |
| Footer logo | Footer uses a text wordmark, not the logo asset |

Image rights are unresolved. Uploaded files include `1773227960880-gemini_generated_image_...png`, `1773227593145-gemini_generated_image_...png`, `1773228840166-istock-1488343348-1024x683.webp`, stock vector imagery, and a brain-tumor dataset sample. These must not be treated as verified client work or licensed brand imagery.

---

## 5. Localization and RTL

| Item | State |
|---|---|
| Locale storage | `NEXT_LOCALE` cookie; default `ar`; no `/ar` or `/en` URL prefix |
| Bundles | Both `ar.json` and `en.json` are eagerly imported |
| Key parity | 374 keys per locale; **0 missing keys** in either direction |
| HTML attributes | Server-rendered `<html lang="ar" dir="rtl">` or `lang="en" dir="ltr"`; verified at runtime |
| Server/client boundary | `getServerTranslation()` reads the cookie; Navbar receives `lang`; Providers sync i18n direction |
| Switch behavior | Sets cookie, changes `document.dir`/`lang`, calls `i18n.changeLanguage`, then hard-reloads the page |
| Hardcoded UI strings | Contact form, calculator, footer, and several marketing surfaces still contain ternary English/Arabic strings instead of locale keys |

### Structural SEO limitation

The site serves one URL per page for both languages. `buildMetadata` emits:

```html
<link rel="alternate" hreflang="ar-IQ" href="https://www.sehle.site/about/">
<link rel="alternate" hreflang="en-US" href="https://www.sehle.site/about/">
<link rel="alternate" hreflang="x-default" href="https://www.sehle.site/about/">
```

All three point to the same URL. Googlebot normally has no `NEXT_LOCALE` cookie, so it sees the Arabic version. English pages are therefore not independently indexable. `sitemap.ts` intentionally emits no hreflang. The HTML and sitemap strategies currently contradict each other.

This is an owner decision, not a styling change. Options are (a) keep one URL and remove misleading hreflang, or (b) introduce locale-prefixed URLs. The brief requires a bilingual site; option (b) is the only way to make English pages independently indexable.

### Content language quality

Database service descriptions are written in Iraqi dialect, e.g. “شلون المستخدم يرتاح”, “نسويله”, “مالتك”, “چات بوت”. The brief asks for Modern Standard Arabic for published copy. English descriptions are fluent but sometimes read as direct translations. No locale is currently missing at the key level; the gap is editorial quality, not coverage.

---

## 6. Database and content inventory

| Model | Total | Active (`deletedAt: null`) | Observations |
|---|---:|---:|---|
| Service | 12 | 12 | 7 `type` values, not the brief’s 4 categories; titles can have trailing spaces; UI/UX is typed “Full Stack Development” |
| Project | 13 | 12 | All `status: "past"`; **0** `liveUrl`; **0** metrics; 1–3 images each |
| Package | 10 | 10 | **No price or feature fields** in Prisma; UI supplies tiers/prices separately |
| Industry | 9 | 9 | Used for landing pages and 108 combos |
| TeamMember | 2 | 2 | About page depends on these |
| Testimonial | 2 | 2 | Ratings both 5; company fields empty; no permissions evidence |
| PlatformUpdate | 3 | 1 | Only one active post/update: “Our history is our Legacy.” (project, 2026-07-07) |
| Consultation | 11 | 11 | All `pending`; no follow-up status yet |

Deleted rows include project “Converting Image to SVG format” and updates “Storage Management System” / “Tambursan” (2026-07-07).

Service types currently in use: `Full Stack Development` (3), `AI & ML` (3), `Cloud & Infrastructure` (2), `Data Analytics` (1), `Automation` (1), `IT Consulting` (1), `Other` (1 DevOps). This does not map cleanly to the brief’s four proposed categories.

Project quality is mixed. The strongest candidates for real work are:

- Tamborsan Startup Profile Website
- Storage Management System
- Landing page (Tevfik Mobilia company)
- Natural Language Processing (NLP)
- Speech Recognition

The remaining entries are largely academic, experimental, or personal projects (mental-health statistics, air pollution, brain-tumor prediction, energy forecasting, personal portfolio, story generator, “Mesopotaia”). None currently has a live URL or verified business outcome. Publication rights and client permissions are unknown.

Package descriptions exist in both languages, but package title/description data is not enough to render the commercial comparison table. `PackagesPageContent.tsx` hardcodes “Startup Basic”, “Business Growth”, “Enterprise Bespoke”, hours, support levels, and inclusions.

---

## 7. Page-by-page content audit

| Page/group | What exists | Key issues |
|---|---|---|
| `/` welcome | Cinematic intro, social links, A/B hero, “enter” action | Duplicate of `/home`; A/B variant B claims “Digitized in 8 Weeks”; variant applies after hydration, causing headline CLS; X link uses `sehle_iq` |
| `/home` | Hero driven by platform update, Why Us, philosophy, services, featured projects, packages, process, results, testimonials, CTA | 3 `<h1>` elements (one per word), hero text has inline `opacity: 0` until JS; fabricated results; only 1 update; “20+ projects” etc. |
| `/about` | Hero, history timeline (2024/2025/2026), legacy/cuneiform, stats, team, awards | Hardcoded 20+ clients, 3 countries, 100% on-time, 24/7; empty awards render 4 dashed placeholder cards |
| `/services` | Listing from DB | 7 types; no mapping to brief’s 4 categories; Iraqi-dialect copy |
| `/services/[slug]` | Metadata + JSON-LD only; client body | **No server HTML/H1**; loader; duplicate FAQ/Service schema; unknown slug returns 200 |
| `/projects` | Listing from DB | All 12 are “past”; no live URLs or outcomes; mostly personal/academic |
| `/projects/[slug]` | Metadata + client body | Same SSR/loader/soft-404 issues; images may be stock/dataset/AI |
| `/packages` | DB descriptions + hardcoded tiers/table | Commercial terms are invented/hardcoded; no source data |
| `/packages/[slug]` | Metadata + client body | Same SSR/loader pattern; package has no price/features |
| `/industries` | DB listing | Thin; generic |
| `/industries/[slug]` | Metadata + client body | Same SSR/loader pattern |
| `/contact` | 2-step form, email, WhatsApp, Ankara address | Wrong WhatsApp number in code (+964 785 892 5817; owner-confirmed is +964 748 589 2587); schema uses +90; no privacy notice or consent; hardcoded English prefill; no spam protection |
| `/blog` | 1 platform update rendered as a post | Thin; not a real editorial blog |
| `/blog/[slug]` | Platform update body = summary | No `notFound()`; soft 404; not in sitemap |
| `/news` | 1 active update | Thin; “latest news” with one item |
| `/compare` + 2 details | Hardcoded comparisons | Claims “on-ground” support, local physical presence, offline-first systems, 100% code ownership without evidence |
| `/glossary` | 5 terms | Thin but harmless |
| `/quote-calculator` | 4 solution types, 5 modules, USD/IQD output, lead modal | Hardcoded $1,500–$2,500 bases and $400–$800 modules; 1,500 IQD/USD; no “non-binding estimate” disclaimer; uses 3 fake fallback testimonials |
| `/refer`, `/social-kit` | Static marketing pages | Retained beyond brief |
| `/solutions-in-[city]` | 5 city pages | Implies local presence; schema phone/HQ are Ankara; thin duplicate copy |
| `/[slug]` (108 pages) | Service × industry landing pages | Generic repeated benefit bullets; breadcrumb links to IDs; duplicate/canonical risk |

### Repeated shell/templates

- Shared hero pattern: `h-[65vh] min-h-[500px]`, gold radial gradient, dotted grid.
- Duplicate `pick(enVal, arVal)` helpers across detail clients.
- `InitialLoader` used by all four detail clients.
- Scroll/exit-intent lead popups on services, packages, and the main layout.

---

## 8. Conversion, contact, and integrations

| Item | State |
|---|---|
| Email | `sehle.iq@gmail.com` — consistent in UI, schema, llms files |
| Verified WhatsApp | Owner-confirmed: `+964 748 589 2587` / `https://wa.me/9647485892587`. **Current code uses `+964 785 892 5817` / `wa.me/9647858925817`, which is wrong and must be replaced.** |
| Business hours | Not yet provided |
| Schema/LLMs phone | `+90-543-106-1211` in `schema-generator.ts` (5 places) and both llms files |
| Visible address | Kızılay, Ankara, Turkey |
| Schema HQ | Kızılay, Ankara, TR; geo 39.9208, 32.8541 |
| X/Twitter | Footer and metadata use `@sehle_it`; root welcome uses `https://x.com/sehle_iq` |
| LinkedIn | Two different URLs but same company |
| Instagram/TikTok/Facebook | Consistent `sehle_iq` handles / company page |
| Contact form | 2-step; zod: name ≥2, email valid, message ≥10; `?project=` prefill; UTM + click tracking; success/error toast |
| Form endpoint | Public `POST /api/admin/consultations`; 5 requests / 10 min / IP; sanitised; Resend notification; admin GET protected |
| Lead capture | Quote calculator modal submits a consultation; no explicit consent |
| Privacy/legal | **No privacy, terms, cookie, or consent pages/routes** |
| Uploads | Admin-only; magic-byte validation; 5 MB limit; Vercel Blob if `BLOB_READ_WRITE_TOKEN`, otherwise local disk fallback |
| Rate limiting | Upstash if configured, otherwise per-process `Map` |
| Sentry | Configs present; no DSN in `.env`; CSP does not allow Sentry ingest |
| GA/GTM | Component present; no `NEXT_PUBLIC_GA_ID` / `NEXT_PUBLIC_GTM_ID`; analytics events no-op |
| Vercel Analytics | Present in root layout |

### Environment configuration

`frontend/.env` currently has: `DATABASE_URL`, `DIRECT_URL`, `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_API_URL`, `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `NOTIFICATION_EMAIL`.

Missing but referenced by code:

- `BLOB_READ_WRITE_TOKEN` → local-disk upload fallback (ephemeral/read-only on Vercel)
- `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` → in-memory rate limits (not shared across serverless instances)
- `SENTRY_DSN` / `NEXT_PUBLIC_SENTRY_DSN` → Sentry no-ops
- `NEXT_PUBLIC_GA_ID` / `NEXT_PUBLIC_GTM_ID` → analytics no-ops

`.env.example` does not document the Blob, Upstash, Sentry, or GA/GTM variables.

### Auth and admin

The admin session design is sound: HMAC-SHA256 token, `HttpOnly`, `Secure` in production, `SameSite=Strict`, 24-hour expiry, constant-time signature comparison, login rate limiting, and audit logging. Remaining gaps: no MFA, no CSRF token beyond `SameSite=Strict`, and the public consultation POST is nested under `/api/admin/*` (intentional but easy to misconfigure).

---

## 9. SEO and discoverability

### What works

- Correct self-canonical URLs on the main static pages (`/about`, `/services`, `/projects`, `/packages`, `/industries`, `/contact`, `/news`, `/home`).
- Strong security headers (HSTS, CSP, frame denial, permissions policy).
- Robots file blocks admin and API.
- Trustworthy `metadataBase` and trailing-slash canonicalisation.
- Detail pages have metadata and JSON-LD.

### Critical issues

1. **Sitemap slug mismatch.** `app/sitemap.ts` uses `replace(/[^a-z0-9]+/g, "-")`; `lib/utils.ts` `slugify` removes non-word characters without a hyphen. For “UI/UX Design” the sitemap emits `ui-ux-design` while the route is `uiux-design`. Broken sitemap URLs:
   - `/services/ui-ux-design/`
   - 9 × `/ui-ux-design-for-<industry>/`
   - `/packages/ui-ux-revamp-conversion-package/`
   - Total: **11 broken URLs** in a 171-URL sitemap.

2. **Sitemap omissions.** No `/blog/[slug]` URL (1 active post) and no `/compare/[slug]` URLs (2 comparisons). Every included URL uses `lastModified = now` and `changeFrequency: "daily"`, so the freshness signal is meaningless.

3. **Soft 404s.** Unknown dynamic slugs return 200 and are indexable. This includes the broken sitemap URLs above.

4. **No server body/H1 on detail pages.** Service/project/package/industry pages have metadata but no rendered content in the initial HTML; Google and social crawlers see a loader and navigation.

5. **Duplicate homepages.** `/` and `/home` both canonical, both priority 1.0.

6. **Duplicate detail URLs.** ID and Arabic-slug variants canonicalise to themselves.

7. **Bilingual URLs.** All hreflang values point to one URL; English is not independently indexable.

8. **Open Graph gaps.** 9 key pages emit no `og:image` because page-level `openGraph` metadata overrides the layout without an image: `/home`, `/about`, `/services`, `/projects`, `/packages`, `/industries`, `/contact`, `/blog`, `/news`. Detail pages do include it.

9. **OG asset mismatch.** `og-image.png` is 2048×2048 but metadata says 1200×630; social previews may crop or scale incorrectly.

10. **Favicon/packaging.** `app/favicon.ico` is a 2048×2048 PNG; no icon set, apple icon, or manifest.

11. **Schema fabrication.** `/home` emits an `AggregateRating` with `ratingValue: "4.9"`, `ratingCount: "5"`, `reviewCount: "5"`, derived from `Math.max(testimonials.length, 5)` with only 2 testimonials. All review ratings are hardcoded 5. This is a manual-action risk.

12. **Schema duplication.** Home renders 3 JSON-LD blocks and two `Organization` entities (root graph + aggregate-rating block). Service detail pages render two `Service`, two `FAQPage`, and three `BreadcrumbList` entities.

13. **Identity inconsistency in schema.** Organization/ProfessionalService phone is +90, address is Ankara; visible contact is +964 and operations in Iraq. City pages also use the +90 phone.

14. **Thin programmatic pages.** 108 service × industry combinations share generic benefit bullets and imply local delivery. They add crawl weight without unique value.

15. **Internal breadcrumb links use IDs.** In `app/(main)/[slug]/page.tsx`, breadcrumbs point to `/services/${service.id}/` and `/industries/${industry.id}/` rather than canonical slugs.

### Heading structure

- `/home`: **3 `<h1>` elements** (“تاريخنا”, “هو”, “إرثنا.”), generated by splitting one platform-update title into words.
- Detail pages: **0 `<h1>` elements** in initial HTML.
- `/about`, `/services`, `/projects`, `/packages`, `/contact`: one `<h1>`.
- Net effect: the heading outline is not reliable for assistive tech or search.

---

## 10. Accessibility

| Area | Finding |
|---|---|
| Skip link | Present and first in DOM; targets `#main-content` |
| Global focus | No global `:focus-visible` or `*:focus` rule in `globals.css` |
| Component focus | shadcn primitives use `focus-visible:ring-1`; custom Navbar/Footer links often have no visible focus |
| Buttons | 30 `<button>` elements; only 10 `aria-label` attributes across components |
| Carousel | Prev/next have labels; pagination dots have no labels and two controls use `focus:outline-none` with no replacement |
| Touch targets | Several 32 px and 40 px icon controls; below the 44 px recommendation |
| Mobile navigation | **No hamburger/drawer.** Mobile navigation is the 5-tab `BottomNav` only (home, services, projects, about, contact). Packages, industries, blog, news, compare, glossary, and quote calculator are reachable only through the footer or in-page links. |
| Reduced motion | No `prefers-reduced-motion` support; all Framer Motion entrance/scroll animations run |
| Hero visibility | `/home` hero words carry inline `opacity: 0` and `transform` until JS hydration; JS-disabled users see no headline |
| Contrast | Light gold/white combinations fail AA normal text; white on dark gold fails |
| Headings | 3 h1s on home; 0 h1s on detail pages |
| Images | Logo alt “Sehle” is fine; About cuneiform image alt “Legacy” is not meaningful; some admin previews use generic “Preview” |
| Forms | Contact form has labels and validation messages; no privacy/consent control |
| Language | `aria-label="Toggle Language"` is English-only and does not announce the target locale |
| Error/loading states | `InitialLoader`, `page-loading`, and `page-error` say “Powered by Iraqi Platform” — wrong brand text |

---

## 11. Performance

| Issue | Evidence / impact |
|---|---|
| Every public page dynamic | Root `cookies()`; no CDN HTML caching; `revalidate=60` ineffective |
| Client-only detail bodies | Metadata + JSON-LD on server, then API fetch + full-page loader; poor LCP and no content for crawlers |
| Artificial loader delay | `InitialLoader` waits 1000 ms after `load` before revealing content |
| Revalidation churn | `Providers` POSTs `/api/revalidate-all` on mount; if allowed, `router.refresh()` + `queryClient.invalidateQueries()`; 10/min/IP cap; cache stampede risk |
| Router cache disabled | `staleTimes.dynamic: 0` forces fresh server segments |
| Hero animation | Headline opacity/transform starts at 0; LCP depends on hydration |
| Asset weight | 31 MB uploads, 6.7 MB largest image, 1.7 MB cuneiform glyph, 160 KB 2048 favicon |
| Image config | AVIF/WebP enabled; uploads served with `max-age=0, must-revalidate`; remote patterns allow any HTTPS host |
| Fonts | Cairo 4 weights bundled; no display/body pairing; no subset of unused glyphs beyond next/font defaults |
| No bundle budget | No CI size check; build passes but no performance gate |
| No reduced-motion | Continuous decorative animations run on low-power devices |
| Analytics absent | GA no-op; Vercel Analytics/Speed Insights present |

No Lighthouse/CWV run was performed in Phase 0. The structural issues above make a “90+” target unlikely without fixing rendering first.

---

## 12. Security and operations

### Good

- Admin cookie is HMAC-signed, constant-time verified, `HttpOnly`, `SameSite=Strict`, `Secure` in production.
- Proxy protects admin pages and APIs, with an explicit public exception for consultation POST.
- Login rate limiting, uniform 200 ms delay, audit logs.
- Upload validates magic bytes, MIME type, extension, and size (5 MB).
- Zod validation on login, contact, and admin payloads.
- Security headers: HSTS, CSP, `X-Frame-Options`, `X-Content-Type-Options`, referrer policy, permissions policy.
- Health endpoint checks DB connectivity.

### Gaps / risks

- **Local upload fallback** writes to `public/uploads`; fails or is ephemeral on Vercel without Blob.
- **In-memory rate limiting** is per instance; ineffective across serverless instances. Applies to login, contact, and revalidate.
- **Sentry CSP** cannot send events: `connect-src` lacks Sentry ingest. Sentry would be silently blocked once enabled.
- **Remote image wildcard** (`hostname: "**"`) allows any HTTPS host through `next/image`; tighten to the actual Blob host.
- **No MFA** for admin.
- **No legal pages / consent** for form submissions and analytics.
- **No spam protection** (honeypot/Turnstile) on the public consultation endpoint.
- **CSP uses `unsafe-inline`** for scripts and styles; documented tradeoff, but a nonce-based CSP is a later hardening item.
- **Consultation POST under `/api/admin`** is intentionally public; a future proxy change could accidentally break the form or expose admin GET routes.

---

## 13. Baseline check report

Run from `frontend/` on 2026-10-26:

| Check | Result |
|---|---|
| `npm run lint` | **Fails: 43 errors, 0 warnings.** Unused variables, `any`, unescaped entities. Examples: `QuoteCalculatorClient.tsx`, `HomeClientComponents.tsx`, `TestimonialCarouselClient.tsx`, `lib/repositories/projects.ts` |
| `npx tsc --noEmit` | **Passes** (no output) |
| `npm test` | **Passes:** 2 files, 15 tests (`tests/utils.test.ts`, `tests/auth.test.ts`) |
| `npm run build` | **Passes**; all public pages `ƒ Dynamic`; `/robots.txt` and `/sitemap.xml` static |
| Runtime smoke | `next start` served `/`, `/home`, `/about`, `/services`, `/services/uiux-design`, `/projects`, `/packages`, `/industries`, `/contact`, `/blog`, `/news`, `/compare`, `/quote-calculator`, `/glossary` |
| Sitemap | 171 `<loc>` entries; 11 broken; 3 omitted detail URLs |
| E2E/visual regression | None configured |
| Coverage | Not measured; only 15 unit tests |

The lint failure is pre-existing and must be either fixed or explicitly accepted as a baseline before Phase 0 can be called green. The Phase 0 exit gate also requires owner sign-off on the architecture summary.

---

## 14. Verified vs needs input

### Verified in the repository

- Route inventory, component inventory, stack versions, build behavior.
- Token values and contrast ratios.
- 374/374 locale key parity; cookie locale architecture; RTL/LTR HTML attributes.
- Database counts, service types, package schema, project metadata, testimonials, updates.
- Sitemap slug mismatch and 11 broken URLs.
- Soft 404 behavior and indexable unknown pages.
- Detail pages have no server body/H1 and use a client loader.
- `/` and `/home` are both canonical and in the sitemap.
- Missing OG images on 9 pages; 2048×2048 OG asset; 2048 PNG favicon.
- AggregateRating fabrication and review-count inflation.
- Fake fallback testimonials in the quote calculator.
- WhatsApp number wrong in code; schema uses +90 while the owner-confirmed number is +964; Ankara vs Iraq address conflict; X handle conflict.
- No privacy/terms/consent routes.
- No mobile hamburger/drawer.
- No reduced-motion handling; no global focus style.
- Missing production env vars and silent fallbacks.
- Lint/type-check/test/build results.

### Needs owner input before content changes

- Business hours for the verified WhatsApp number.
- Confirm that `sehle.iq@gmail.com` is the correct public email.
- Real legal entity, HQ, and service-area wording (including whether +90 is ever a valid contact number).
- Which projects, logos, screenshots, and outcomes may be published, with permission.
- Real service catalog and whether the brief’s four categories replace the current seven types.
- Real process steps, team roles/photos, and company milestones.
- Whether the 2 testimonials are approved for publication and what company names may be shown.
- Real package prices/features or a decision to keep “contact for pricing”.
- Approval to remove fabricated metrics, ratings, testimonials, awards, and “20+ clients / 3 countries / 100% / 24/7” claims.
- Whether `/` and `/home` should be consolidated (redirect, canonical, or noindex one).
- Whether extra routes (blog, news, packages, industries, compare, glossary, quote calculator, refer, social kit, city pages, 108 combos) are retained.
- Whether to provision Blob, Upstash, Sentry, and GA/GTM.
- Locale URL strategy: keep one URL (and remove misleading hreflang) or introduce `/ar` and `/en`.
- Social handle source of truth (`sehle_it` vs `sehle_iq`).
- Privacy policy, terms, and consent copy/owner.

---

## 15. Prioritized risk register

Severity reflects launch/SEO/trust impact, not effort.

| ID | Severity | Risk | Evidence | Phase |
|---|---|---|---|---|
| R-01 | Critical | Fabricated `AggregateRating` 4.9 with 5 reviews from 2 testimonials | `app/(main)/home/layout.tsx:105-116`; rendered JSON-LD | 3, 9 |
| R-02 | Critical | Fabricated metrics, client counts, SLA, awards, and testimonials across Home/About/Compare/Calculator | Locale `home.results`; `AboutPageContent.tsx:162-166`; `TestimonialCarouselClient.tsx:20-76` | 3, 5, 6, 7 |
| R-03 | Critical | Detail pages have no server body content or H1; full-screen loader delays LCP | `services/[slug]/page.tsx:78`; `ServiceDetailsClient.tsx:49-50`; rendered HTML 0 h1 / 18 skeletons | 4, 5, 9 |
| R-04 | Critical | 11 broken URLs in sitemap due conflicting slug logic | `app/sitemap.ts:41`; `lib/utils.ts:8-17` | 4, 9 |
| R-05 | Critical | Unknown slugs return 200 + indexable soft 404 | `curl` status checks; `[slug]/page.tsx:102`; detail pages render “not found” UI | 4, 9 |
| R-06 | Critical | Contact identity conflict: code uses wrong WhatsApp (+964 785 892 5817; verified is +964 748 589 2587) and schema uses +90/Ankara | `contact/page.tsx:85`; `schema-generator.ts:30,236,269,382` | 2, 7, 9 |
| R-07 | Critical | No privacy policy, terms, cookie notice, or form consent | No legal routes; no consent controls | 7, 9 |
| R-08 | High | Entire public site dynamic; ISR ineffective; revalidate-all churn | Root `cookies()`; all routes `ƒ`; `providers.tsx:42-52` | 9 |
| R-09 | High | No mobile menu; only 5-tab bottom nav | `Navbar.tsx` mobile actions contain theme/language only; `BottomNav.tsx` | 2 |
| R-10 | High | Duplicate homepage `/` and `/home`, both canonical and sitemap priority 1.0 | `app/page.tsx`; `app/(main)/home/page.tsx`; `sitemap.ts` | 3, 9 |
| R-11 | High | English pages not independently indexable; hreflang points to same URL | `lib/seo.ts:82-90`; runtime `<link rel=alternate>` | 8, 9 |
| R-12 | High | Light-theme gold/white contrast fails AA | Ratios 3.96 / 3.76 / 2.46 | 1, 9 |
| R-13 | High | No reduced-motion support; continuous animations | No `prefers-reduced-motion` anywhere | 1, 9 |
| R-14 | High | Heading and focus accessibility failures | 3 h1 home; 0 h1 detail; no global focus; 10 aria-labels / 30 buttons | 1, 2, 9 |
| R-15 | High | Missing OG images and wrong OG dimensions | 9 pages no `og:image`; 2048×2048 asset vs 1200×630 metadata | 9 |
| R-16 | High | 31 MB uploads, 1.7 MB glyph, 6.7 MB image, 2048 favicon; stock/AI rights unclear | `public/uploads`; `cuneiform-glyph.png`; `favicon.ico`; `og-image.png` | 1, 3, 5, 9 |
| R-17 | High | Packages/pricing and quote timelines are hardcoded, not DB-backed, with no disclaimer | `PackagesPageContent.tsx:197-211`; `QuoteCalculatorClient.tsx:39-108` | 4, 7 |
| R-18 | High | Production fallbacks: local uploads, per-instance rate limits, no Sentry/GA | `.env`; `api/upload/route.ts:72`; `lib/rate-limit.ts:28` | 7, 9 |
| R-19 | High | CSP blocks Sentry; image remotePatterns allow any HTTPS host | `next.config.ts:109`; `images.remotePatterns` | 9 |
| R-20 | Medium | 108 programmatic pages are thin/duplicate; ID/Arabic slug URLs duplicate canonical | `app/(main)/[slug]/page.tsx`; detail resolvers | 4, 9 |
| R-21 | Medium | Duplicate schema blocks on home and service pages | 3 JSON-LD blocks home; duplicate Service/FAQ/Breadcrumb | 9 |
| R-22 | Medium | Blog/news are platform updates with 1 item; not a real editorial system | `app/(main)/blog/page.tsx`; DB update count | 3, 9 |
| R-23 | Medium | Hardcoded bilingual strings and Iraqi-dialect service copy conflict with brief | `ContactForm.tsx`; `Footer.tsx`; DB descriptions | 8 |
| R-24 | Medium | Data quality: 7 service types, trailing spaces, packages lack prices/features, projects lack live URLs/outcomes | Prisma inventory; DB queries | 4, 5 |
| R-25 | Medium | Pre-existing lint failures | `npm run lint`: 43 errors | 0, 10 |
| R-26 | Medium | Root welcome A/B causes headline CLS; `cta_color` assigned but unused; no conversion linkage | `WelcomePageClient.tsx:62`; `proxy.ts` experiments | 3, 9 |
| R-27 | Medium | Admin has no MFA and no nonce-based CSP | `lib/auth.ts`; `next.config.ts` | 9 |
| R-28 | Low | 404 page is dark-only, brand-inconsistent, and outside the main shell | `app/not-found.tsx` | 2, 9 |

---

## 16. What must be preserved

The redesign must not break these existing contracts:

- App Router route structure and trailing-slash URLs.
- `NEXT_LOCALE` cookie localization and server/client language handoff.
- Prisma models, repository/storage APIs, and `/api/content/[lang]/*` shapes.
- Admin auth, session cookie contract (`admin_auth`), and proxy protection.
- Public `POST /api/admin/consultations` behavior used by the contact form.
- Resend notification flow and audit logging.
- A/B cookie assignment in `proxy.ts` (unless explicitly replaced).
- Existing SEO routes (`robots.txt`, `sitemap.xml`, `llms.txt`, `llms-full.txt`) until Phase 9.
- Vercel deployment assumptions and `npm run build` / `next start`.

No route renames, database migrations, dependency additions, or auth changes should happen in Phase 1.

---

## 17. Phase implications

| Phase | Must address from this audit |
|---|---|
| 1 — Design system | Contrast-safe gold/ivory tokens, semantic success/warning/info, type scale with display/body pairing, focus-visible utility, reduced-motion strategy, shadow/spacing/radius tokens, remove hardcoded hex/gold rgba |
| 2 — Shell | Real mobile menu, footer with verified WhatsApp/email/legal, language switch that preserves page, correct socials, accessible focus and touch targets, 404 shell |
| 3 — Homepage | One H1, server-rendered hero, remove fabricated metrics/testimonials, reconcile `/` vs `/home`, 8-section narrative, real project imagery only |
| 4 — Services | Server-render detail bodies/H1, fix slug logic, proper 404s, canonical slug/ID handling, real service taxonomy, remove duplicate schema |
| 5 — Portfolio | Publish only verified projects with permission, real screenshots, live URLs/outcomes where available; no stock/AI imagery |
| 6 — About | Verified company facts, real team/milestones, remove empty award placeholders, no invented client counts |
| 7 — Contact | Replace the wrong WhatsApp with verified `+964 748 589 2587`, resolve whether +90 is valid, privacy/consent, spam protection, non-binding quote disclaimer, production Blob/Upstash |
| 8 — Bilingual/RTL | MSA rewrite, remove hardcoded strings, locale URL decision, hreflang consistency, English content QA |
| 9 — A11y/SEO/Perf | Static/ISR strategy, detail SSR, sitemap fixes, OG assets, schema cleanup, 404 status codes, reduced motion, Lighthouse |
| 10 — QA | Regression on preserved contracts, lint baseline resolution, E2E/visual checks, launch report |

---

## 18. Phase 0 exit gate

| Gate | Status |
|---|---|
| Route and component map complete | Yes |
| Brand tokens/assets documented with sources | Yes |
| Homepage sections/case studies/services marked verified or needs input | Yes |
| Baseline lint/type-check/build/test recorded | Yes |
| No production code rewritten | Yes |
| Architecture summary signed off | **Pending owner review** |

**Recommendation:** keep Phase 0 in review, not done, until the owner answers the identity/claims decisions in §14. Phase 1 can start in parallel only for token/typography work that does not depend on those answers, but the palette cannot be finalized until the light-theme contrast direction is approved.

---

## 19. Open questions for the owner

- [x] WhatsApp Business number: **+964 748 589 2587** (`wa.me/9647485892587`). The code currently shows `+964 785 892 5817` and must be corrected.
- [ ] Is `+90 543 106 1211` ever a valid public contact? If not, remove it from schema and llms files.
- [ ] What is the legal entity name, registered address, and preferred service-area wording?
- [ ] Which projects may be published, with what names, screenshots, logos, and client permissions?
- [ ] Which projects have live URLs or verified outcomes we can cite?
- [ ] Is the real catalog the current 12 services / 7 types, or the brief’s four categories?
- [ ] What are the real process steps and delivery timeline?
- [ ] Are the 2 testimonials approved? May we use names/companies?
- [ ] Are the 20+ clients / 3 countries / 100% / 24/7 / 4.9 rating claims real? If not, may we remove them?
- [ ] Should `/` redirect to `/home`, should `/home` redirect to `/`, or should one be noindexed?
- [ ] Do we keep blog, news, packages, industries, compare, glossary, quote calculator, refer, social kit, city pages, and the 108 service×industry pages?
- [ ] Do we keep “contact for pricing” or publish real package prices/features?
- [ ] Should we implement locale-prefixed URLs (`/ar`, `/en`) or keep cookie-only localization?
- [ ] Which X handle is canonical: `sehle_it` or `sehle_iq`?
- [ ] Who owns privacy policy, terms, cookie notice, and consent copy?
- [ ] Will Blob, Upstash, Sentry, and GA/GTM be provisioned for production?
