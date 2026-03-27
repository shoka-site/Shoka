# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Commands

```bash
# Development
npm run dev           # Start Next.js dev server

# Build & Check
npm run build         # Production build (also runs Prisma generate via postinstall)
npm run lint          # ESLint — must pass before committing
npx tsc --noEmit      # TypeScript check — must pass before committing

# Database
npm run db:push       # Sync Prisma schema → database (dev only)
npx prisma generate   # Regenerate Prisma client (auto-runs on npm install)
npx prisma studio     # GUI for database inspection

# Production
npm run start         # Start production server
```

No test runner is configured yet — `npm test` will fail.

---

## Architecture

### Stack
Next.js 15 App Router · React 19 · TypeScript (strict) · Prisma 5 (PostgreSQL) · Tailwind CSS 4 · Zod · TanStack Query v5 · Framer Motion · i18next

### Directory Map

| Path | Role |
|------|------|
| `app/` | Pages and API routes (App Router) |
| `app/(main)/` | Public-facing route group with shared layout |
| `app/admin/` | Admin panel pages (protected) |
| `app/api/admin/` | Protected admin CRUD API routes |
| `app/api/content/[lang]/` | Public, language-aware read API |
| `components/ui/` | Shadcn/Radix UI primitives (generated, rarely edited) |
| `lib/` | Core utilities — see table below |
| `shared/schema.ts` | Zod schemas + TypeScript types for all 10 DB entities |
| `prisma/schema.prisma` | Single source of truth for DB models |
| `locales/` | `en.json` / `ar.json` — i18n string maps |

### Key `lib/` Files

| File | What it does |
|------|-------------|
| `storage.ts` | `IStorage` interface + Prisma implementation — all DB access goes through here |
| `auth.ts` | `assertAdmin()`, timing-safe credential check, in-memory rate limiter (5 req/min, 15-min lockout) |
| `api-response.ts` | `ok(data, meta?)` / `fail(code, message, details?)` envelope + `withErrorHandler()` route wrapper |
| `cache.ts` | 9 entity-scoped in-memory caches (5-min TTL), pattern-based invalidation |
| `env.ts` | `validateEnv()` — fails fast if required env vars are missing |
| `seo.ts` | Structured data (JSON-LD) generators for all page types |
| `server-i18n.ts` | Server-side translation lookup (used in Server Components) |

### Data Model Patterns
All 10 Prisma models share these conventions:
- **Bilingual fields**: every user-visible string has `...En` + `...Ar` variants
- **`order` field**: integer for manual sort ordering
- **`published` boolean**: visibility toggle for all content types
- Composite indexes on `[published, order]` (or `[published, date]` for PlatformUpdate)

### API Conventions
Every admin API route follows this pattern:
```typescript
export const POST = withErrorHandler(async (req: NextRequest) => {
  const deny = await assertAdmin();
  if (deny) return deny;                          // 401 if not authenticated
  const parsed = insertXxxSchema.safeParse(...);
  if (!parsed.success) return fail('VALIDATION_ERROR', '...', parsed.error.issues);
  const result = await storage.createXxx(parsed.data);
  return ok(result, undefined, 201);
});
```

Response envelope:
```json
{ "success": true, "data": {}, "meta": { "page": 1, "limit": 20, "total": 100 } }
{ "success": false, "error": { "code": "VALIDATION_ERROR", "message": "...", "details": [] } }
```

All list endpoints paginate via `?page=&limit=` query params.

### Authentication Flow
- Cookie name: `admin_auth` (httpOnly, Secure in prod, SameSite=Strict, 24h TTL)
- Client auth state: `AuthContext` verifies via `GET /api/admin/me` on mount — **no localStorage**
- Every protected API handler calls `assertAdmin()` directly (not relying solely on middleware)

### Internationalization
- Language stored in `localStorage` as `i18nextLng`
- Public API routes are under `/api/content/[lang]/` where `lang` is `en` or `ar`
- `transformForLanguage()` in `lib/api-utils.ts` strips the unused language suffix before returning data
- Server Components use `getServerTranslation()` from `lib/server-i18n.ts`

### Caching
`lib/cache.ts` wraps each entity in a `MemoryCache`. Cache is invalidated by pattern after any mutation in `storage.ts`. Direct DB reads bypass cache only in admin routes (to ensure admins see live data).

### Environment Variables
Required at runtime (see `.env.example`):
- `DATABASE_URL` — Prisma connection pooling URL
- `DIRECT_URL` — Direct PostgreSQL URL (for migrations)
- `ADMIN_USERNAME` / `ADMIN_PASSWORD` — Admin login credentials
- `NEXT_PUBLIC_SITE_URL` / `NEXT_PUBLIC_API_URL`

`validateEnv()` is called in `lib/env.ts` and should be invoked at app startup to fail fast.

### CI/CD
GitHub Actions (`.github/workflows/ci.yml`):
1. **Lint & Typecheck** — `npm run lint` + `npx tsc --noEmit`
2. **Security Audit** — `npm audit --audit-level=high`
3. **Build** — `npm run build` (needs `DATABASE_URL`, `ADMIN_*` env vars set as secrets)
4. **Docker Build** — on `main` branch only; builds from `./frontend` context
