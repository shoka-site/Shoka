# MISSION: PERFORMANCE OVERHAUL (RES 18 MOBILE / 66 DESKTOP)
**Objective:** Restore the project to elite engineering standards (Target RES 90+).
**Reference:** Follow all protocols defined in `CLAUDE.md`.

---

## 🔍 PHASE 1: FORENSIC DIAGNOSTICS
*Do not write code until the following data is gathered and analyzed.*

1. **Vercel Inspection:**
   - Execute `vercel link` to synchronize project state.
   - Run `vercel inspect` on the latest production deployment to pull server-side logs and build metadata.
   
2. **Bundle Analysis:**
   - Run `! npx next build --analyze` (if @next/bundle-analyzer is available) or `! npx webpack-bundle-analyzer`.
   - Identify the top 3 "Heavy Killers" (libraries > 50kb Gzipped) impacting Mobile INP.

3. **Runtime Audit:**
   - Use `playwright` or a browser MCP to profile the URL.
   - Identify the exact DOM node causing the **0.5 CLS**.
   - Identify the **LCP** element and its "Time to First Byte" vs. "Render Delay."

---

## 🛠️ PHASE 2: ELITE IMPLEMENTATION
*Implement changes using Next.js 14+ / React 18+ strict patterns.*

### 1. Visual Stability (CLS < 0.1)
- **Image Optimization:** Refactor all layout-shifting `<img>` tags to `next/image`.
- **Space Reservation:** Audit the DOM for dynamic content (ads, banners, client-side hydration). Use CSS `aspect-ratio` or `min-height` skeletons.
- **Font Strategy:** Migrate all custom fonts to `next/font` to eliminate layout shift during swap.

### 2. Mobile Responsiveness (LCP < 2.5s & INP < 200ms)
- **Hydration Strategy:** Identify heavy client components. Use `next/dynamic` with `{ ssr: false }` for components below the fold.
- **Third-Party Scripting:** Move all non-essential scripts (Analytics, Chat, GTM) to `next/script` with `strategy="worker"` or `strategy="lazyOnload"`.
- **Main-Thread Unblocking:** Wrap heavy state updates in `React.useTransition` or `requestIdleCallback`.

### 3. Build & Infrastructure
- **Asset Optimization:** Ensure `priority` is set on the LCP hero image.
- **Caching:** Verify `Cache-Control` headers on edge-cached routes via Vercel Edge Config.

---

## ✅ PHASE 3: VALIDATION & CI
- **Local Verification:** Compare 'First Load JS' size before and after.
- **Preview Deployment:** Run `vercel --previews` and provide the URL.
- **Report:** Provide a concise "Impact Summary" explaining the 'Why' behind every architectural refactor.

---

**STATUS:** 🔴 CRITICAL (Mobile RES: 18)  
**AUTHORITY:** FULL (Filesystem, Vercel, Sequential-Thinking, Playwright)