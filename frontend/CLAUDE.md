# CLAUDE.md — Sehle Platform Engineering Guide

**Project:** Sehle — Iraqi Technology & Digital Training Platform
**Stack:** Next.js 15 App Router · React 19 · TypeScript strict · Prisma 5 · PostgreSQL · Tailwind CSS 4 · Zod · TanStack Query v5 · i18next (en/ar)
**Auth:** Credential-based, httpOnly cookie (`admin_auth`), in-memory rate limiter
**Deployment:** Docker + GitHub Actions CI → standalone Next.js build

---

## Commands

All commands run from `frontend/` unless otherwise noted.

```bash
# Development
npm run dev                # Next.js dev server (http://localhost:3000)

# Code quality (MUST pass before any commit)
npm run lint               # ESLint — next/core-web-vitals + next/typescript rules
npx tsc --noEmit           # TypeScript strict check — zero errors allowed

# Database
npm run db:push            # Sync prisma/schema.prisma → DB (dev only, no migration history)
npx prisma generate        # Regenerate Prisma client (auto-runs on npm install)
npx prisma studio          # GUI for DB inspection

# Production
npm run build              # Next.js standalone build (also triggers prisma generate)
npm run start              # Start production server

# Docker (run from project root)
docker-compose up --build  # Build and start full stack
docker-compose down        # Tear down

# Security
npm audit --audit-level=high   # Fail on high/critical vulnerabilities
```

> **No test runner is configured.** `npm test` will fail. Adding Jest is a priority before v1.0.

---

## Architecture Overview

```
frontend/
├── app/
│   ├── (main)/                  # Public route group — shared layout.tsx
│   │   ├── home/                # Homepage — ISR revalidate=60
│   │   ├── about/
│   │   ├── services/
│   │   ├── projects/
│   │   ├── industries/
│   │   ├── packages/
│   │   ├── news/
│   │   └── contact/
│   ├── admin/                   # Protected admin panel (cookie-gated)
│   ├── api/
│   │   ├── admin/               # Auth-required CRUD routes
│   │   │   ├── login/           # POST — rate-limited credential check
│   │   │   ├── logout/          # POST — clears cookie
│   │   │   ├── me/              # GET — auth verification
│   │   │   ├── services/        # GET + POST
│   │   │   ├── services/[id]/   # PUT + DELETE
│   │   │   └── [entity]/        # Same pattern for all 10 entities
│   │   ├── content/[lang]/      # Public read-only, language-aware
│   │   │   └── [entity]/        # GET — returns lang-transformed data
│   │   ├── health/              # GET — DB connectivity probe
│   │   └── upload/              # POST — file upload handler
├── components/
│   ├── ui/                      # Radix/shadcn primitives (generated — rarely edit)
│   ├── layout/                  # Navbar, Footer, Section — shared across public pages
│   ├── admin/                   # AdminLayout, ProtectedRoute
│   └── [page]/                  # Feature components per page (home/, services/, etc.)
├── lib/
│   ├── storage.ts               # IStorage interface + PrismaStorage — ALL DB access here
│   ├── auth.ts                  # assertAdmin(), verifyAdminCredentials(), rate limiter
│   ├── api-response.ts          # ok(), fail(), withErrorHandler()
│   ├── api-utils.ts             # transformForLanguage() — strips unused language suffix
│   ├── cache.ts                 # Entity-scoped in-memory caches (5-min TTL)
│   ├── env.ts                   # validateEnv() — fail-fast on missing env vars
│   ├── server-i18n.ts           # Server Component i18n (reads NEXT_LOCALE cookie)
│   ├── i18n.ts                  # Client-side i18next config
│   ├── queryClient.ts           # TanStack Query global config
│   └── utils.ts                 # cn(), other pure utilities
├── shared/
│   └── schema.ts                # Zod schemas + TypeScript types for all 10 entities
├── prisma/
│   └── schema.prisma            # Single source of truth for DB schema
├── locales/
│   ├── en.json                  # English translation strings
│   └── ar.json                  # Arabic translation strings
├── middleware.ts                 # Next.js middleware — protects /admin and /api/admin/*
├── next.config.mjs               # Security headers, ISR cache rules, standalone output
├── tailwind.config.ts            # Tailwind v4 content paths
└── Dockerfile                   # Multi-stage: deps → builder → runner (node:22-alpine)
```

---

## Frontend Standards

### Component Rules

**Server Components are the default.** Use `"use client"` only when strictly necessary (event handlers, hooks, browser APIs, language-switch re-renders).

```typescript
// CORRECT — server component fetches data directly
// app/(main)/services/page.tsx
export const revalidate = 60;

export default async function ServicesPage() {
  const { lang, isRtl } = await getServerTranslation();
  const services = await storage.getServices(true);     // Prisma, server-side
  return <ServicesSectionClient services={services} isRtl={isRtl} />;
}
```

```typescript
// CORRECT — client component handles interactivity
// components/services/ServicesSectionClient.tsx
"use client";
import { useTranslation } from "react-i18next";

export function ServicesSectionClient({ services, isRtl }: Props) {
  const { t } = useTranslation();
  // ...
}
```

**Never fetch in a Server Component via the public `/api/content/[lang]/` route.** Use `storage.*` directly — it's faster and avoids a network round-trip.

### File and Component Naming

| Type | Convention | Example |
|------|-----------|---------|
| Page | `page.tsx` (reserved) | `app/(main)/home/page.tsx` |
| Layout | `layout.tsx` (reserved) | `app/(main)/layout.tsx` |
| Component | PascalCase | `ServiceCard.tsx` |
| Server → Client split | `Page.tsx` + `[Name]Client.tsx` | `ServicesPage` → `ServicesSectionClient` |
| Utility/lib | camelCase | `api-utils.ts`, `server-i18n.ts` |
| Hook | `use` prefix, camelCase | `useAdminData.ts` |

### RTL and Bilingual UI

Every public-facing component receives `isRtl: boolean` as a prop (from `getServerTranslation()`) or reads `i18n.dir()` on the client.

```typescript
// Apply RTL conditionally with cn()
<div className={cn("flex gap-4", isRtl ? "flex-row-reverse" : "flex-row")}>
```

**Never hardcode Arabic or English strings in components.** Always use translation keys:
- Server Components: `t('namespace.key')` from `getServerTranslation()`
- Client Components: `t('namespace.key')` from `useTranslation()`

Translation keys live in `locales/en.json` and `locales/ar.json`. Keep both files in sync — adding a key to one requires adding it to the other in the same commit.

### Styling

- **Only Tailwind CSS utility classes.** No inline `style={{}}` except for dynamic computed values (e.g., animation delays).
- **No hardcoded color values** — use Tailwind's palette tokens or CSS variables.
- **Dark mode** via `next-themes` and `prefers-color-scheme`. Every new component must work in both modes.
- **RTL-safe layout:** Use `flex-row-reverse`, `text-right`, `ml-auto`/`mr-auto` conditionally. Avoid `pl-4` or `pr-4` when RTL support is needed — prefer `px-4` or a conditional class.

### Animations

- **Simple state transitions:** CSS / Tailwind `transition-*` utilities.
- **Complex sequences (page entry, staggered lists):** Framer Motion.
- **Loading states:** Skeleton components, never raw spinners for content areas.
- **Optimistic UI:** Mutation state from TanStack Query `useMutation` to reflect changes before server confirms.

### Performance

| Target | Threshold |
|--------|-----------|
| LCP | < 2.5s |
| FID / INP | < 100ms |
| CLS | < 0.1 |
| Lighthouse score | ≥ 90 all categories |

Rules:
- All public pages use `export const revalidate = 60` (ISR) unless data changes more frequently.
- Images: always `next/image` with explicit `width`, `height`, and `sizes`. Format: WebP/AVIF.
- Never import a heavy library without checking bundle impact.
- `/api/content/*` responses have `Cache-Control: public, max-age=60, stale-while-revalidate=300` via `next.config.mjs`.

---

## Backend Standards (API Routes)

### Protected Admin Route Pattern

Every handler in `app/api/admin/` follows this exact structure — no exceptions:

```typescript
import { NextRequest } from "next/server";
import { assertAdmin } from "@/lib/auth";
import { ok, fail, withErrorHandler } from "@/lib/api-response";
import { insertXxxSchema } from "@shared/schema";
import { storage } from "@/lib/storage";

export const POST = withErrorHandler(async (req: NextRequest) => {
  const deny = await assertAdmin();           // Step 1: auth
  if (deny) return deny;                      // Step 2: bail on 401

  const body = await req.json().catch(() => null);
  const parsed = insertXxxSchema.safeParse(body);   // Step 3: validate
  if (!parsed.success) {
    return fail("VALIDATION_ERROR", "Invalid data", parsed.error.issues, 400);
  }

  const result = await storage.createXxx(parsed.data);  // Step 4: storage
  return ok(result, undefined, 201);                     // Step 5: respond
});
```

### Public Content Route Pattern

```typescript
// app/api/content/[lang]/[entity]/route.ts
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ lang: string }> }
) {
  const { lang: rawLang } = await params;
  const lang = (rawLang.split("-")[0] === "en" ? "en" : "ar") as "en" | "ar";

  const items = await storage.getXxx(true);          // published only
  return NextResponse.json(transformForLanguage(items, lang));
}
```

### Response Envelope

All responses use the standard envelope from `lib/api-response.ts`:

```typescript
// Success
ok(data)                          // { success: true, data }
ok(data, { page, limit, total })  // { success: true, data, meta }

// Error
fail("VALIDATION_ERROR", "message", zodIssues, 400)
fail("UNAUTHORIZED", "Authentication required", undefined, 401)
fail("NOT_FOUND", "Resource not found", undefined, 404)
fail("INTERNAL_ERROR", "An unexpected error occurred", undefined, 500)
```

**Never return HTTP 200 for errors. Never expose stack traces or internal messages to clients.**

### Error Handling

`withErrorHandler()` wraps every route. It catches unhandled exceptions and returns a generic 500. Do not add individual try/catch blocks inside route handlers — let the wrapper handle it.

### Pagination

Every list endpoint accepts `?page=1&limit=20`. Never return unbounded queries:

```typescript
const page = parseInt(searchParams.get("page") ?? "1");
const limit = Math.min(parseInt(searchParams.get("limit") ?? "20"), 100);
const skip = (page - 1) * limit;
```

---

## Storage Layer

**All database access goes through `lib/storage.ts`.** Direct Prisma calls outside of storage functions are forbidden.

### IStorage Interface

Every new entity requires:
1. Add Prisma model in `prisma/schema.prisma`
2. Add Zod schemas in `shared/schema.ts`
3. Add methods to `IStorage` interface in `lib/storage.ts`
4. Implement in `PrismaStorage` class
5. Add API routes in `app/api/admin/[entity]/` and `app/api/content/[lang]/[entity]/`

### Caching

- Public reads use `unstable_cache()` (5-min TTL) tagged by entity name.
- Admin routes bypass cache to guarantee live data.
- All mutations call `revalidateTag('[entity]')` after writing.

```typescript
// In storage.ts after any mutation
revalidateTag("services");   // Invalidates all service cache entries
```

---

## Database Standards

### Schema Conventions

**All 10 entities share these conventions — new entities MUST follow them:**

| Convention | Rule |
|-----------|------|
| Bilingual fields | `titleEn` + `titleAr`, `descriptionEn` + `descriptionAr`, etc. |
| Sort order | `order Int` — integer for admin-controlled manual ordering |
| Visibility toggle | `published Boolean @default(true)` |
| Timestamps | `createdAt DateTime @default(now())`, `updatedAt DateTime @updatedAt` |
| Primary key | `id String @id @default(uuid())` (UUID strings) |
| Composite index | `@@index([published, order])` or `@@index([published, date])` |

### Migrations

This project uses `prisma db push` (schema push, not migration files). This means:
- No migration history is tracked.
- **Never run `db:push` against production** without a tested rollback plan.
- For production schema changes: create a migration SQL file manually, test against a staging DB clone first.

### Query Patterns

```typescript
// CORRECT — explicit select, never SELECT *
await prisma.service.findMany({
  select: { id: true, titleEn: true, titleAr: true, published: true, order: true },
  where: { published: true },
  orderBy: { order: "asc" },
});

// CORRECT — paginated
await prisma.service.findMany({ skip, take: limit });

// WRONG — unbounded, no select
await prisma.service.findMany();
```

### Environment Variables for DB

```
DATABASE_URL   — Prisma connection pooling URL (used at runtime)
DIRECT_URL     — Direct PostgreSQL URL (required for prisma db push / migrations)
```

Both must be set. `validateEnv()` in `lib/env.ts` enforces this at startup.

---

## Authentication

### How It Works

1. `POST /api/admin/login` → rate limit check → `verifyAdminCredentials()` (timing-safe SHA-256 comparison) → set `admin_auth` httpOnly cookie
2. `middleware.ts` guards `/admin/*` and `/api/admin/*` — redirects browser to `/admin/login`, returns 401 JSON for API requests
3. Every API handler additionally calls `assertAdmin()` (defense in depth — never rely on middleware alone)
4. `GET /api/admin/me` → client `AuthContext` verifies session on mount

### Security Properties

| Property | Value |
|---------|-------|
| Cookie | `admin_auth`, httpOnly, Secure (prod), SameSite=Strict, 24h |
| Rate limiting | 5 failures → 15-min lockout (in-memory, per IP) |
| Credential check | `timingSafeEqual(sha256(input), sha256(stored))` |
| Response delay | 200ms uniform delay on failed login (timing attack mitigation) |
| Token storage | **httpOnly cookie only — never localStorage** |

### Credentials

Set via environment variables only. Never hardcode:
```
ADMIN_USERNAME=<strong_username>
ADMIN_PASSWORD=<strong_password_min_20_chars>
```

---

## Internationalization

### Language Support

| Code | Language | Direction |
|------|---------|---------|
| `ar` | Arabic | RTL (default) |
| `en` | English | LTR |

### Language Detection Chain

- **Server Components:** `NEXT_LOCALE` cookie → fallback to `ar`
- **Client Components:** i18next browser detector → `localStorage` key `i18nextLng`
- **Public API:** `[lang]` path param in `/api/content/[lang]/`

### Adding a New Translation Key

1. Add to `locales/en.json` with the English value
2. Add to `locales/ar.json` with the Arabic value (both in the same commit)
3. Use the key via `t('namespace.key')` — never inline strings

### Adding a New Bilingual Entity

Every new Prisma model with user-visible text must have dual language fields:
```prisma
model Example {
  titleEn       String
  titleAr       String
  descriptionEn String
  descriptionAr String
  // ...
}
```

`transformForLanguage()` in `lib/api-utils.ts` handles stripping the unused suffix before returning public API responses.

---

## Security Practices

### Input Validation

Every API input is validated with Zod before any processing. Schemas live in `shared/schema.ts` and are shared between client and server:

```typescript
// shared/schema.ts — single source of truth for entity shape
export const insertServiceSchema = serviceSchema.omit({ id: true, createdAt: true, updatedAt: true });
export const updateServiceSchema = insertServiceSchema.partial();
```

Never call `storage.*` or write to the DB without a successful `safeParse()` result.

### File Uploads

- Validate file type by magic bytes, not extension
- Enforce file size limit (define per upload context)
- Uploaded files land in `public/uploads/` — never execute them
- Sanitize filenames before saving (no path traversal: `../`)

### Security Headers

Configured in `next.config.mjs`. Do not weaken these:
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Strict-Transport-Security: max-age=63072000`
- `Permissions-Policy: camera=(), microphone=()`

If adding a Content-Security-Policy, test thoroughly in both languages (RTL/LTR) before shipping.

### Secrets

| Rule | Detail |
|------|--------|
| Source | Environment variables only |
| Committed file | `.env.example` — keys, no values |
| Ignored file | `.env` — always in `.gitignore` |
| Startup | `validateEnv()` fails fast if any required var is missing |
| Logging | Never log env var values, passwords, or tokens |

### CORS

Not explicitly configured — defaults to same-origin. The admin API is not intended for cross-origin consumption. Do not add permissive CORS headers to admin routes.

---

## Testing Strategy

> **Current state:** No test runner configured. Adding Jest + React Testing Library is a high-priority task before v1.0.

### Planned Coverage Targets

| Layer | Coverage Target | Framework |
|-------|---------------|-----------|
| `lib/auth.ts` | 100% | Jest |
| `lib/storage.ts` | 90% | Jest + real test DB |
| `lib/api-response.ts` | 100% | Jest |
| `shared/schema.ts` | 95% | Jest |
| API route handlers | 80% | Jest + Supertest / `next-test-api-route-handler` |
| Critical UI flows | E2E | Playwright |

### Test Setup (When Implementing)

1. Install: `jest`, `@testing-library/react`, `@testing-library/jest-dom`, `jest-environment-jsdom`
2. Add `jest.config.ts` and `jest.setup.ts` to `frontend/`
3. Update `tsconfig.json` to include test files
4. Add coverage thresholds to `jest.config.ts`
5. Add `npm test` and `npm run test:coverage` scripts to `package.json`
6. Add test job to `.github/workflows/ci.yml` — block merge on failure

### Priority Test Cases

1. `verifyAdminCredentials()` — valid creds, invalid creds, timing safety
2. `checkLoginRateLimit()` — under limit, at limit, locked out, recovery
3. `ok()` / `fail()` response shapes
4. `transformForLanguage()` — en output, ar output, nested objects
5. `insertServiceSchema.safeParse()` — valid, missing required field, wrong type
6. `assertAdmin()` — cookie present, cookie absent
7. Admin login route — success, wrong creds, rate limited

---

## CI/CD Pipeline

### GitHub Actions (`.github/workflows/ci.yml`)

Triggers: push to `main`/`develop`, all pull requests.

| Job | What runs | Blocks on |
|-----|-----------|----------|
| `lint-and-typecheck` | `npm run lint` + `npx tsc --noEmit` + `npx prisma generate` | Lint errors, type errors |
| `security-audit` | `npm audit --audit-level=high` | High or critical vulnerability |
| `build` | `npm run build` with dummy env vars | Build failure |
| `docker-build` | Docker buildx from `./frontend` | `main` branch only |

### Branch Strategy

```
main          → production-ready, always deployable
develop       → integration branch (PRs target this)
feature/*     → new features
fix/*         → bug fixes
hotfix/*      → urgent production fixes (branch from main)
```

### Commit Format (Conventional Commits)

```
feat(services): add drag-and-drop ordering for admin panel
fix(auth): handle expired cookie on admin page refresh
perf(home): reduce ISR revalidation from 300s to 60s
security(login): add SHA-256 normalization before timingSafeEqual
refactor(storage): extract consultation queries into ConsultationRepository
test(auth): add unit tests for rate limiter edge cases
docs(api): update OpenAPI spec for /api/admin/team endpoints
```

### Pre-Commit Checklist

Before every PR:
- [ ] `npm run lint` passes with zero warnings
- [ ] `npx tsc --noEmit` passes with zero errors
- [ ] `npm audit --audit-level=high` is clean
- [ ] No `console.log` / `console.error` debug statements left in production code
- [ ] No secrets committed (check with `git diff HEAD`)
- [ ] Both `en.json` and `ar.json` updated if UI strings changed
- [ ] `.env.example` updated if new env vars added
- [ ] API response envelope used consistently (no raw `NextResponse.json({ ... })` in handlers)
- [ ] New DB model follows bilingual + order + published + timestamps conventions

---

## Adding a New Content Entity

Follow these 5 steps in order:

### Step 1 — Prisma Schema (`prisma/schema.prisma`)

```prisma
model Example {
  id            String   @id @default(uuid())
  order         Int
  titleEn       String
  titleAr       String
  descriptionEn String
  descriptionAr String
  published     Boolean  @default(true)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  @@index([published, order])
}
```

Run `npm run db:push` after adding.

### Step 2 — Zod Schemas (`shared/schema.ts`)

```typescript
export const exampleSchema = z.object({
  id: z.string().uuid(),
  order: z.number().int().min(0),
  titleEn: z.string().min(1),
  titleAr: z.string().min(1),
  descriptionEn: z.string(),
  descriptionAr: z.string(),
  published: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Example = z.infer<typeof exampleSchema>;
export const insertExampleSchema = exampleSchema.omit({ id: true, createdAt: true, updatedAt: true });
export type InsertExample = z.infer<typeof insertExampleSchema>;
export const updateExampleSchema = insertExampleSchema.partial();
export type UpdateExample = z.infer<typeof updateExampleSchema>;
```

### Step 3 — Storage Layer (`lib/storage.ts`)

Add to `IStorage` interface and implement in `PrismaStorage`:

```typescript
getExamples(published?: boolean): Promise<Example[]>;
getExample(id: string): Promise<Example | undefined>;
createExample(data: InsertExample): Promise<Example>;
updateExample(id: string, data: UpdateExample): Promise<Example | undefined>;
deleteExample(id: string): Promise<boolean>;
```

Tag invalidation: `revalidateTag("examples")` after any mutation.

### Step 4 — Admin API Routes (`app/api/admin/examples/`)

- `route.ts` → `GET` (list) + `POST` (create)
- `[id]/route.ts` → `PUT` (update) + `DELETE`

Follow the exact protected route pattern above.

### Step 5 — Public API Route (`app/api/content/[lang]/examples/route.ts`)

Follow the public content route pattern above. Returns only published items, language-transformed.

---

## Code Quality Guardrails

### TypeScript

- `strict: true` — zero `any` types. Use `unknown` + type narrowing.
- Explicit return types on all exported functions.
- Derive types from Zod schemas (`z.infer<typeof schema>`), not hand-written interfaces for DB entities.
- No barrel `index.ts` files that re-export everything — causes circular dependency risk.

### File Size Limits

| Limit | Rule |
|-------|------|
| 300 lines | Maximum per file — extract when exceeded |
| 40 lines | Maximum per function — extract when exceeded |
| 10 | Maximum cyclomatic complexity per function |

### Naming Conventions

| Pattern | Example |
|---------|---------|
| Zod schema | `camelCaseSchema` | `insertServiceSchema` |
| Zod type | `PascalCase` | `InsertService`, `Service` |
| Storage method | `getX`, `createX`, `updateX`, `deleteX` | `getServices` |
| API route file | `route.ts` (reserved by Next.js) | — |
| Constants | `UPPER_SNAKE_CASE` | `MAX_LOGIN_ATTEMPTS` |
| Environment var | `UPPER_SNAKE_CASE` | `ADMIN_PASSWORD` |
| Translation key | `namespace.key` dot notation | `home.hero.title` |

### Comments

Comment the **why**, not the **what**. Code explains what it does; comments explain why decisions were made.

```typescript
// GOOD — explains non-obvious security decision
// Hash both sides before timingSafeEqual to normalize length.
// Comparing variable-length strings directly leaks timing info.
const usernameMatch = timingSafeEqual(sha256(username), sha256(stored));

// BAD — restates the code
// Compare username
const usernameMatch = username === stored;
```

---

## Hard Rules — Never Violate

1. **Never commit secrets** — no API keys, passwords, or tokens in code
2. **Never use `any` in TypeScript** — use `unknown` + narrowing or proper types
3. **Never fetch from `/api/content/` in Server Components** — use `storage.*` directly
4. **Never bypass `assertAdmin()`** — dual check in middleware + handler is mandatory
5. **Never return raw error messages or stack traces to clients** — `withErrorHandler` returns generic 500
6. **Never query the DB without pagination** on list endpoints
7. **Never add a bilingual entity without both `...En` and `...Ar` fields**
8. **Never store tokens in localStorage** — httpOnly cookie only
9. **Never run `npm run db:push` against production** without a tested rollback
10. **Never skip `validateEnv()`** — must be called at startup or import time
11. **Never use `SELECT *`** — always use Prisma `select` to specify fields
12. **Never add a UI string without a translation key in both `en.json` and `ar.json`**
13. **Never weaken security headers** in `next.config.mjs`
14. **Never call Prisma directly outside `lib/storage.ts`**

---

## Environment Variables Reference

| Variable | Required | Purpose |
|----------|---------|---------|
| `DATABASE_URL` | Yes | Prisma pooled connection string |
| `DIRECT_URL` | Yes | Direct PostgreSQL URL for migrations |
| `ADMIN_USERNAME` | Yes | Admin panel login username |
| `ADMIN_PASSWORD` | Yes | Admin panel login password (min 20 chars recommended) |
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical site URL for SEO/OG |
| `NEXT_PUBLIC_API_URL` | Yes | API base URL for client-side requests |

All variables must be defined in `.env.example` (without values). `validateEnv()` in `lib/env.ts` throws at startup if any required var is missing.
