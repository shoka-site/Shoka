# ENHANCEMENT.md — Project Audit & Improvement Plan
Generated: 2026-03-27
Audited by: Claude Code under CLAUDE.md engineering standards

---

## Executive Summary

The "Shoka" platform is a modern Next.js 15 + Prisma + PostgreSQL CMS/marketing hybrid with solid
technical foundations, multilingual support (Arabic/English), and a clean Prisma schema — but it
carries **critical security vulnerabilities** (authentication tokens stored in localStorage,
zero input validation on admin APIs, plain-text password comparison) and **zero test coverage**
that make it **not production-safe in its current state**. The biggest immediate risks are account
takeover via XSS and unrestricted admin API access; the biggest opportunity is establishing a
proper security baseline and CI/CD pipeline that will make all future development safe and fast.

---

## Audit Scorecard

| Category       | Score | Status |
|----------------|-------|--------|
| Frontend       | 6/10  | 🟡     |
| Backend        | 5/10  | 🟡     |
| Security       | 2/10  | 🔴     |
| DevOps/Cloud   | 5/10  | 🟡     |
| Testing        | 1/10  | 🔴     |
| Code Quality   | 6/10  | 🟡     |
| AI/ML Services | N/A   | —      |

---

## 🔴 Critical Issues (Fix immediately)

### C-1 · Authentication token stored in localStorage

**What**: `AuthContext.tsx` writes `localStorage.setItem('admin_auth', 'true')` on login.

**Why**: localStorage is fully readable by any JavaScript executing on the page. A single XSS
vector (injected ad script, browser extension, compromised dependency) reads this value and
instantly impersonates an admin.

**Affected files**:
- `frontend/contexts/AuthContext.tsx` — lines ~35-40 (localStorage set/get/remove)

**Exact fix**:
Remove every `localStorage.*('admin_auth', ...)` call. Auth state should be derived solely from
the httpOnly cookie already set by the server. Replace the `isAuthenticated` check with a
`/api/admin/me` server round-trip that returns 200 if the cookie is valid, 401 if not.

---

### C-2 · No input validation on any admin API endpoint

**What**: Every `POST` and `PATCH` handler in `/api/admin/*` passes `req.json()` directly to
Prisma with no schema validation.

**Why**: Malformed or malicious payloads can corrupt the database, trigger unexpected Prisma
errors that leak stack traces, or (in any future raw SQL paths) inject SQL.

**Affected files**:
- `frontend/app/api/admin/services/route.ts`
- `frontend/app/api/admin/projects/route.ts`
- `frontend/app/api/admin/packages/route.ts`
- `frontend/app/api/admin/testimonials/route.ts`
- `frontend/app/api/admin/team/route.ts`
- `frontend/app/api/admin/industries/route.ts`
- `frontend/app/api/admin/solutions/route.ts`
- `frontend/app/api/admin/platform-updates/route.ts`
- `frontend/app/api/admin/consultations/route.ts`
- `frontend/app/api/upload/route.ts`

**Exact fix**:
Parse every request body through a Zod schema before touching the database.
`frontend/shared/schema.ts` already has Zod schemas — wire them into route handlers:
```typescript
const result = createServiceSchema.safeParse(await req.json());
if (!result.success) {
  return NextResponse.json(
    { success: false, error: { code: 'VALIDATION_ERROR', details: result.error.issues } },
    { status: 400 }
  );
}
const service = await storage.createService(result.data);
```

---

### C-3 · Authentication enforced only in middleware, not inside API handlers

**What**: Admin API routes (`/api/admin/*`) rely 100% on `middleware.ts` to verify the cookie.
The route handlers themselves contain no auth check.

**Why**: Next.js middleware can be bypassed via direct fetch calls with crafted headers, edge-case
routing bugs, or future middleware refactoring. Defense-in-depth requires each API handler to
verify the session independently.

**Affected files**: All files under `frontend/app/api/admin/`

**Exact fix**:
Create an `assertAdmin(req)` helper in `frontend/lib/auth.ts`:
```typescript
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export function assertAdmin(): NextResponse | null {
  const cookieStore = cookies();
  const auth = cookieStore.get('admin_auth');
  if (!auth || auth.value !== 'true') {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }
  return null;
}
```
Call `const deny = assertAdmin(); if (deny) return deny;` as the first line of every admin handler.

---

### C-4 · Admin password compared in plain text (no hashing)

**What**: `frontend/app/api/admin/login/route.ts` compares `username === ADMIN_USERNAME &&
password === ADMIN_PASSWORD` directly against environment variable strings.

**Why**: Plain-text credential comparison means: (a) the password lives forever in environment
config and is trivially exposed if config is dumped, (b) no bcrypt cost factor to slow brute force,
(c) no lockout after N failed attempts.

**Affected files**:
- `frontend/app/api/admin/login/route.ts`

**Exact fix**:
- Store `ADMIN_PASSWORD_HASH` in `.env` as a bcrypt hash (generated once via `bcryptjs`)
- On login: `await bcrypt.compare(body.password, process.env.ADMIN_PASSWORD_HASH)`
- Add failed-attempt counter in-memory or Redis; lock after 5 failures for 15 minutes
- Log every login attempt (success and failure) with IP address

---

### C-5 · ESLint configuration broken (syntax error)

**What**: `frontend/.eslintrc.json` starts with `gigi{` instead of `{`, making it invalid JSON.
ESLint cannot parse the file and silently disables all linting.

**Why**: No linting = no automatic detection of `any` types, unused variables, missing
dependencies arrays, potential XSS sinks, etc.

**Affected files**:
- `frontend/.eslintrc.json` line 1

**Exact fix**:
```json
{
  "extends": ["next/core-web-vitals", "next/typescript"]
}
```

---

### C-6 · No tests — zero coverage across the entire project

**What**: No `*.test.ts`, `*.spec.ts`, or `*.test.tsx` files exist anywhere in the project.

**Why**: Every code change is a gamble. There is no safety net for regressions, no verification
that auth logic works, no check that the database layer behaves correctly under edge cases.

**Affected scope**: Entire project

**Exact fix** (minimum viable test suite):
1. Add `jest` + `@testing-library/react` for unit/component tests
2. Add `vitest` or keep Jest for API route integration tests
3. Write tests for: login flow, storage CRUD operations, language transformation utility,
   Zod schema validation, middleware auth logic
4. Target: 80% coverage on `lib/storage.ts`, `lib/api-utils.ts`, all API route handlers

---

## 🟠 High Priority (Fix this sprint)

### H-1 · No rate limiting on login or any endpoint

**What**: `/api/admin/login` accepts unlimited requests. Any other endpoint also unbounded.

**Why**: Trivial brute-force of admin credentials. DoS via resource exhaustion.

**Recommended approach**: Use `@upstash/ratelimit` (Redis-backed, works on Vercel Edge) or
`express-rate-limit`-style in-memory limiter. Apply 5 req/min to login, 100 req/min to all
other admin endpoints.

---

### H-2 · No pagination on list endpoints

**What**: `GET /api/admin/services` (and all other list routes) returns every row with no limit.

**Why**: As content grows, responses balloon; unbounded queries become table scans; memory spikes
on both server and client.

**Affected files**: All `GET` handlers in `/api/admin/*` and `/api/content/[lang]/*`

**Recommended approach**:
```typescript
const page = Number(req.nextUrl.searchParams.get('page') ?? 1);
const limit = Math.min(Number(req.nextUrl.searchParams.get('limit') ?? 20), 100);
const [data, total] = await Promise.all([
  storage.getServices(published, { skip: (page - 1) * limit, take: limit }),
  storage.countServices(published),
]);
return NextResponse.json({ success: true, data, meta: { page, limit, total } });
```

---

### H-3 · No response envelope — inconsistent API responses

**What**: Some routes return raw arrays, some return `{error}`, some return `{message}`. No
standard shape.

**Why**: Client code cannot reliably detect success vs failure. Error details sometimes leak
internal Prisma messages.

**Recommended approach**: Standardize to:
```json
{ "success": true, "data": {}, "meta": {} }
{ "success": false, "error": { "code": "...", "message": "...", "details": [] } }
```

---

### H-4 · No security headers

**What**: Missing `Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options`,
`Content-Security-Policy`, `Referrer-Policy`, `Permissions-Policy`.

**Why**: Without these, the app is vulnerable to clickjacking, MIME sniffing, cross-site data
leakage, and downgrade attacks.

**Recommended approach**: Add to `next.config.mjs`:
```js
headers: async () => [{
  source: '/(.*)',
  headers: [
    { key: 'X-Frame-Options', value: 'DENY' },
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
    { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  ],
}]
```

---

### H-5 · No CI/CD pipeline

**What**: No GitHub Actions or any automated pipeline. Deployments are manual.

**Why**: No automated testing means every push could ship broken or insecure code. No automated
security scans means vulnerabilities accumulate silently.

**Recommended approach**: Create `.github/workflows/ci.yml` with:
- Lint + type-check on every PR
- Unit + integration tests on every PR
- `npm audit --audit-level=high` on every PR
- Block merge on any failure
- Auto-deploy to staging on merge to `main`

---

### H-6 · File upload endpoint has no visible validation

**What**: `frontend/app/api/upload/route.ts` accepts file uploads. No evidence of type validation,
size limits, or path sanitization.

**Why**: Accepting arbitrary files enables: malware upload and serving, path traversal attacks,
storage exhaustion, serving of phishing content.

**Recommended approach**:
- Validate MIME type using magic bytes (not file extension)
- Enforce max file size (e.g., 5MB for images)
- Strip EXIF metadata from images
- Rename files to UUID on save (prevent path traversal)
- Serve uploads through a CDN, not the app server

---

### H-7 · In-memory cache cannot scale horizontally

**What**: `frontend/lib/cache.ts` uses a JavaScript Map in the Node.js process memory.

**Why**: On any multi-instance deployment (Vercel serverless, Docker replicas), each instance
has its own cache. Cache invalidation after a write only affects the current instance. Other
instances serve stale data indefinitely.

**Recommended approach**: Replace with Redis (Upstash Redis for Vercel, or a self-hosted instance
for Docker). Drop-in replacement using `ioredis` with the same TTL-based pattern.

---

### H-8 · No health check endpoint

**What**: No `/api/health` or `/health` endpoint exists.

**Why**: Container orchestrators (Docker, Kubernetes) and uptime monitors cannot verify app
health. A crashed database connection would not be detected until users report errors.

**Recommended approach**:
```typescript
// frontend/app/api/health/route.ts
export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ status: 'ok', db: 'connected' });
  } catch {
    return NextResponse.json({ status: 'error', db: 'disconnected' }, { status: 503 });
  }
}
```

---

### H-9 · No structured logging or error tracking

**What**: Application has no centralized log aggregation, no error tracking (Sentry), no
request ID correlation.

**Why**: Debugging production issues is impossible. Security events (failed logins, auth errors)
are invisible. Performance regressions go undetected.

**Recommended approach**:
- Add Sentry (`@sentry/nextjs`) for error tracking
- Add structured JSON logging with a `requestId` (UUID per request) in middleware
- Log: all auth events, API errors, slow queries (> 200ms)
- Never log: passwords, tokens, PII

---

### H-10 · No CORS configuration

**What**: CORS headers not explicitly set anywhere in the application.

**Why**: Without explicit CORS policy, browsers apply default rules which may be too permissive
or restrictive depending on context. Admin API endpoints could be called from unauthorized origins.

**Recommended approach**: In middleware or API handlers, explicitly set:
```typescript
'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGIN ?? 'https://your-domain.com'
'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS'
```

---

## 🟡 Medium Priority (Fix next sprint)

### M-1 · `storage.ts` is 589 lines — violates 300-line file limit

**What**: `frontend/lib/storage.ts` is a monolithic class with all database operations.

**Why**: Hard to navigate, test, and maintain. Violates CLAUDE.md 300-line limit.

**Recommended approach**: Split into per-entity repository files:
`lib/repositories/services.ts`, `lib/repositories/projects.ts`, etc.

---

### M-2 · Accessibility gaps (WCAG 2.1 A, not AA)

**What**: Missing `aria-label` on icon-only buttons, missing alt text on some images, carousel
not keyboard-navigable, some color contrast ratios below 4.5:1, no skip-to-content link.

**Why**: Excludes users with disabilities; potential legal liability in some jurisdictions.

**Recommended approach**:
- Run axe-core audit on all pages
- Add `aria-label` to all interactive elements without visible text
- Add skip link as first element in layout
- Verify contrast ratios with Colour Contrast Analyser

---

### M-3 · Hero video not optimized

**What**: `Evolution_of_Writing_Mediums.mp4` is served as a static asset with no size hints,
poster image, or lazy loading.

**Why**: Large video on initial load degrades LCP and CLS scores; hurts Core Web Vitals.

**Recommended approach**:
- Add `poster` attribute with a AVIF/WebP still frame
- Add `preload="none"` or `preload="metadata"`
- Add `width`/`height` attributes to prevent layout shift
- Consider serving via CDN (Cloudinary, CloudFront)

---

### M-4 · No startup environment variable validation

**What**: App starts even if `DATABASE_URL`, `ADMIN_USERNAME`, or `ADMIN_PASSWORD` are missing.

**Why**: Runtime crashes with cryptic errors instead of a clear startup failure message.

**Recommended approach**: Add a `validateEnv()` function called at startup:
```typescript
const required = ['DATABASE_URL', 'ADMIN_USERNAME', 'ADMIN_PASSWORD_HASH'];
for (const key of required) {
  if (!process.env[key]) throw new Error(`Missing required env var: ${key}`);
}
```

---

### M-5 · Admin dashboard not responsive on mobile

**What**: Admin dashboard has fixed widths and column layouts that break on small screens.

**Why**: Admins using mobile devices cannot manage content effectively.

**Recommended approach**: Audit all admin pages for responsive breakpoints; use Tailwind
responsive prefixes (`sm:`, `md:`, `lg:`) to adjust layouts.

---

### M-6 · No soft deletes / audit trail

**What**: Deleting any entity (service, project, team member) is immediate and permanent.
No history of who changed what or when (beyond `updatedAt`).

**Why**: Accidental deletions cannot be recovered. Compliance or audit requirements unmet.

**Recommended approach**: Add `deletedAt DateTime?` to all models and filter on
`deletedAt: null` in all queries. Consider an `AuditLog` table for mutations.

---

### M-7 · `memorystore` package is unused

**What**: `memorystore` listed in `package.json` but no usage found in codebase.

**Why**: Adds unnecessary bundle weight and attack surface.

**Recommended approach**: Remove with `npm uninstall memorystore`.

---

### M-8 · Inconsistent error handling patterns across API routes

**What**: Some routes wrap errors in try/catch, some do not. Error shapes differ per route.

**Why**: Unhandled promise rejections can crash the serverless function. Inconsistent shapes
confuse clients and complicate debugging.

**Recommended approach**: Create a `withErrorHandler` wrapper:
```typescript
export function withErrorHandler(handler: RouteHandler): RouteHandler {
  return async (req) => {
    try {
      return await handler(req);
    } catch (err) {
      console.error({ err, path: req.url });
      return NextResponse.json(
        { success: false, error: { code: 'INTERNAL_ERROR', message: 'Unexpected error' } },
        { status: 500 }
      );
    }
  };
}
```

---

### M-9 · Token rotation not implemented for admin session

**What**: The `admin_auth` cookie has a 7-day fixed expiry with no rotation.

**Why**: A stolen cookie remains valid for up to 7 days. No way to detect concurrent sessions
or force logout on compromise.

**Recommended approach**: Implement a signed session ID stored in the database with a 24-hour
sliding window. On each authenticated request, extend the session. Provide a server-side
`/api/admin/logout` that invalidates the session record.

---

### M-10 · No `Content-Security-Policy` header

**What**: CSP header is absent, allowing inline scripts and arbitrary external script sources.

**Why**: Without CSP, XSS attacks execute freely. CSP is the most effective mitigation against
stored/reflected XSS.

**Recommended approach**:
```
Content-Security-Policy: default-src 'self'; script-src 'self' 'nonce-{nonce}';
  img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com;
  connect-src 'self' https://www.google-analytics.com;
```
Use Next.js nonce injection for RSC compatibility.

---

## 🟢 Low Priority (Nice to have)

### L-1 · No Storybook / component documentation

Shadcn/ui components are well-documented externally, but custom components (`home/`, `marketing/`,
`admin/`) have no visual documentation. Adding Storybook would help new developers understand
available patterns without reading source.

---

### L-2 · Bundle analysis not configured

`next build --analyze` (requires `@next/bundle-analyzer`) is not set up. Without it, unused
dependencies and large chunks are invisible. Run once to identify dead weight.

---

### L-3 · Design tokens not extracted to CSS custom properties

Colors and spacing are mostly Tailwind utilities, but some components have hardcoded values.
Extracting all tokens to `:root` CSS variables enables theming, white-labeling, and design
system consistency.

---

### L-4 · `server.log` committed to repository

**File**: `/server.log` at project root is tracked by git (appears in git status as deleted).
Log files should never be in the repository — they grow unboundedly and may contain PII or
sensitive request data.

**Recommended approach**: Add `*.log` and `server.log` to `.gitignore`.

---

### L-5 · `temp_marketingskills/` directory at project root

A large collection of AI prompt templates is stored at the project root. This is not part of
the application and pollutes the repository structure.

**Recommended approach**: Move to a separate repository or a dedicated `docs/` or `tools/`
directory with clear ownership.

---

### L-6 · README is minimal

`README.md` contains basic setup steps but lacks: architecture overview, environment variable
documentation, deployment guide, local development walkthrough, and contribution guide.

---

### L-7 · No OpenAPI / Swagger documentation

The API has 30+ endpoints with no machine-readable documentation. Adding OpenAPI (via
`next-swagger-doc` or hand-authored `openapi.yaml`) enables client generation, postman
collections, and onboarding.

---

### L-8 · Fonts not self-hosted for performance/GDPR

`Readex Pro` loaded from `fonts.googleapis.com`. Each page load makes an external DNS lookup
and font request. Self-hosting via `next/font/google` (automatic) or Fontsource eliminates the
external dependency and satisfies GDPR font-request logging concerns.

Check `frontend/app/layout.tsx` — if already using `next/font/google`, this is addressed.
If using a `<link>` tag, switch to `next/font`.

---

## Enhancement Roadmap

### ⚡ Quick Wins (< 1 hour each)

1. **Fix ESLint** — Change `gigi{` to `{` in `.eslintrc.json`. Re-run `eslint --fix`. (5 min)
2. **Add security headers** — Add `headers()` config to `next.config.mjs`. (15 min)
3. **Add health check endpoint** — Create `app/api/health/route.ts` with DB ping. (20 min)
4. **Remove `localStorage` auth writes** — Delete 3 lines in `AuthContext.tsx`. (10 min)
5. **Add `assertAdmin()` helper** — Single file, called from all admin handlers. (30 min)
6. **Add env var startup validation** — One function call in root layout or server startup. (20 min)
7. **Add `*.log` to `.gitignore`** — One-line fix. (2 min)
8. **Uninstall unused `memorystore` package** — `npm uninstall memorystore`. (5 min)

---

### 🔧 Medium Enhancements (1 day each)

1. **Input validation on all admin APIs** — Wire existing Zod schemas from `shared/schema.ts`
   into all 9 admin route handlers (POST + PATCH). Standardize response envelope. (~4 hours)

2. **Rate limiting on login + admin endpoints** — Integrate `@upstash/ratelimit` or in-memory
   limiter. Apply 5 req/min to `/api/admin/login`, 100 req/min to all other admin routes. (~3 hours)

3. **Password hashing** — Switch `ADMIN_PASSWORD` to `ADMIN_PASSWORD_HASH` (bcrypt). Add
   failed-login counter with 15-minute lockout. (~2 hours)

4. **Pagination on all list endpoints** — Add `page`/`limit` query params to public and admin
   list endpoints. Update Prisma queries with `skip`/`take`. (~4 hours)

5. **Basic test suite** — Add Jest + `@testing-library/react`. Write tests for: auth flow,
   storage CRUD, language transformation, Zod schemas, middleware. (~6 hours)

6. **Centralized error handling** — Create `withErrorHandler` wrapper. Apply to all routes.
   Ensure no stack traces leak to client. (~2 hours)

7. **Video optimization** — Add poster image, `preload="none"`, explicit dimensions to hero video.
   Move to Cloudinary if available. (~2 hours)

8. **Accessibility audit + fixes** — Run axe-core, fix aria-labels, add skip link, improve
   contrast ratios on flagged elements. (~4 hours)

9. **Structured logging** — Add `requestId` UUID to all requests in middleware. Log auth events,
   API errors, slow queries with consistent JSON structure. (~3 hours)

---

### 🏗️ Major Upgrades (Multi-day)

1. **CI/CD Pipeline with GitHub Actions** (~2 days)
   - PR workflow: lint, typecheck, unit tests, `npm audit`, build verification
   - Merge to main: build + push Docker image, deploy to staging, smoke tests
   - Manual gate for production promotion
   - Dependencies: GitHub repo access, staging environment, Docker registry

2. **Replace in-memory cache with Redis** (~1 day)
   - Install `ioredis` + `@upstash/redis` (for Vercel)
   - Replace `MemoryCache` class with Redis client
   - Add TTL-based invalidation on mutations
   - Dependencies: Redis instance (Upstash free tier works for start)

3. **Proper session management with DB-backed sessions** (~1.5 days)
   - Add `sessions` table (id, adminId, expiresAt, createdAt)
   - Issue signed session token on login; validate on every request
   - Implement sliding window expiry (24h), session listing, force logout
   - Dependencies: C-1, C-3, C-4 must be done first

4. **Full test suite (80% coverage target)** (~3 days)
   - Unit tests: all service/repository functions, utility functions
   - Integration tests: all API endpoints with real test database
   - E2E tests with Playwright: login flow, CRUD operations, multilingual switching
   - Dependencies: test database setup, CI/CD pipeline

5. **Error tracking + observability stack** (~1 day)
   - Integrate Sentry (`@sentry/nextjs`) for error capture and performance tracing
   - Add `/metrics` endpoint (Prometheus-compatible counters for requests, errors, latency)
   - Configure Sentry alerts for error rate > 1%, P95 > 500ms
   - Dependencies: Sentry account or self-hosted instance

6. **Split monolithic `storage.ts` into repository pattern** (~1 day)
   - Create `lib/repositories/{services,projects,testimonials,...}.ts`
   - Each file < 100 lines, single responsibility
   - Update all API routes to import from specific repositories
   - Enables per-repository testing

7. **RBAC and multi-admin support** (~2 days)
   - Add `AdminUser` model (email, passwordHash, role: SUPER_ADMIN | EDITOR | VIEWER)
   - Replace env-var credentials with database users
   - RBAC middleware: SUPER_ADMIN can delete, EDITOR can write, VIEWER read-only
   - Admin user management UI

8. **Soft deletes and audit logging** (~1 day)
   - Add `deletedAt DateTime?` to all content models
   - Add `AuditLog` table (entity, entityId, action, adminUserId, changedFields, timestamp)
   - Filter all queries on `deletedAt: null`
   - Audit log viewer in admin dashboard

---

## MCP & Agent Recommendations

The following MCP servers would meaningfully improve implementation quality and speed:

| MCP Server | Use Case | Permission Needed |
|------------|----------|-------------------|
| `github` | Create CI/CD workflows, manage PRs, run security scans | Yes — request before invoking |
| `playwright` | Run E2E test suite, verify accessibility, capture screenshots for visual regression | Yes — request before invoking |
| `postgresql` | Audit live database schema, run query explain plans, verify index usage | Yes — requires `DATABASE_URL` access |
| `sequential-thinking` | Design the session management system and RBAC architecture before implementation | Yes — request before invoking |
| `context7` | Pull latest Next.js 15, Prisma 5, and Zod docs before implementing validation layer | Yes — request before invoking |
| `firecrawl` | Research best practices for Next.js App Router security, CSP with RSC | Yes — request before invoking |

Recommended invocation order:
1. `context7` — fetch latest Next.js middleware + App Router security docs before writing auth
2. `sequential-thinking` — design session management architecture
3. `playwright` — automated accessibility and regression testing after C-1 through C-6 are fixed
4. `github` — set up CI/CD pipeline after tests exist

---

## Implementation Order

Safe, dependency-aware sequence to implement all enhancements:

**Week 1 — Security Baseline (Blockers)**
```
Day 1 (morning):  C-5  Fix ESLint → re-run linter to surface hidden issues
Day 1 (afternoon): C-1  Remove localStorage auth → auth now purely cookie-based
Day 2 (morning):  C-3  Add assertAdmin() helper to all API handlers
Day 2 (afternoon): C-4  Implement password hashing (bcrypt) + login lockout
Day 3:            C-2  Zod validation on all admin POST/PATCH handlers
Day 4:            H-4  Security headers in next.config.mjs
                  H-8  Health check endpoint
                  H-10 Content-Security-Policy header
Day 5:            H-1  Rate limiting on login + admin endpoints
                  H-6  File upload validation (type, size, rename)
```

**Week 2 — API Quality**
```
Day 6:  H-2  Pagination on all list endpoints
        H-3  Standardize response envelope across all routes
        M-8  Centralized error handler wrapper
Day 7:  H-10 CORS explicit configuration
        M-4  Startup env var validation
        M-9  Session rotation (sliding window)
Day 8:  C-6  Write initial test suite (auth + storage unit tests)
Day 9:  C-6  Integration tests for all API endpoints
Day 10: H-5  GitHub Actions CI pipeline (lint → test → build → security scan)
```

**Week 3 — Infrastructure & Observability**
```
Day 11: H-9  Sentry integration + structured logging with requestId
        H-7  Redis cache (replace in-memory cache)
Day 12: M-3  Video optimization + CDN setup
        M-2  Accessibility fixes (axe-core audit pass)
Day 13: M-1  Split storage.ts into repository files
        M-6  Add soft deletes to all content models
Day 14: L-3  Extract CSS custom properties / design tokens
        L-8  Switch to next/font for Readex Pro
        L-4  Clean up .gitignore (logs, temp files)
```

**Week 4 — Scale & Governance**
```
Day 15-17: Major-7  RBAC + multi-admin user management
Day 18-19: Major-8  Audit log table + admin viewer
Day 20:    Major-5  E2E tests with Playwright for critical flows
```

**Ongoing after Week 4:**
- Bundle analysis pass (L-2) before each major dependency addition
- OpenAPI documentation (L-7) as each endpoint stabilizes
- Storybook setup (L-1) once RBAC and design tokens are finalized
