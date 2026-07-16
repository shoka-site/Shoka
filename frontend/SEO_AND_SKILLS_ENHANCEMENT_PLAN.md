# Strategic Codebase Enhancement Plan based on `@skills` Audit

This document details all potential enhancements for **Sehle Platform** (`sehle.site`), derived from analyzing the codebase against the 6 core engineering and search optimization skills in `frontend/skills/`:
1. **AI SEO (Generative Engine Optimization & LLM Visibility)**
2. **Schema Markup (Structured Data & JSON-LD)**
3. **Competitor & Alternative Pages**
4. **Programmatic SEO (Scalable Templated Pages)**
5. **Technical & On-Page SEO Audit**
6. **Site Architecture & Information Design**

---

## 1. AI SEO Enhancements (`skills/ai-seo/SKILL.md`)

### A. Dynamic `/llms.txt` and `/llms-full.txt` Generation
* **Current State**: The platform does not currently serve an `llms.txt` file.
* **Enhancement**: Implement dynamic API routes (`app/llms.txt/route.ts` and `app/llms-full.txt/route.ts`) that output markdown documentation summarizing Sehle's corporate capabilities, services, packages, locations, and contact points.
* **Impact**: Empowers AI search agents (ChatGPT Search, Perplexity, Claude, Gemini) to directly extract and cite Sehle's exact service offerings.

### B. Extractable Direct Answer Blocks (40–60 words)
* **Current State**: Some detail pages feature longer hero copy.
* **Enhancement**: Restructure the top summary block of each detail page (`ServiceDetailsClient`, `IndustryDetailsClient`, `PackageDetailsClient`) into a concise 40–60 word self-contained answer block under an `H2` heading matching query intent (e.g., *"What is an Enterprise ERP System in Iraq?"*).
* **Impact**: Increases passage extraction eligibility for Google AI Overviews and ChatGPT snippets.

### C. Quantitative Benchmarks & Proof Statements (Princeton GEO Guidelines)
* **Current State**: Value propositions are descriptive.
* **Enhancement**: Add concrete statistics and dated metrics (e.g., *"Reduces manual bookkeeping overhead by up to 35%"*, *"99.99% uptime with offline-first local synchronization"*).
* **Impact**: Citing verifiable numbers boosts AI search citation rates by 37%–40%.

### D. Visible Content Freshness Indicators
* **Current State**: Metadata contains creation dates, but visible "Last Updated" text is missing on client templates.
* **Enhancement**: Add a visible *"Last Updated: [Date]"* badge on detail pages and update `dateModified` in `BlogPosting` and `Service` JSON-LD schemas.

---

## 2. Schema Markup Enhancements (`skills/schema-markup/SKILL.md`)

### A. Entity-Specific Detail Page JSON-LD
* **Current State**: Layout files inject section-level JSON-LD, but dynamic sub-routes lack entity-level structured data.
* **Enhancement**:
  * **Service Details (`/services/[slug]/`)**: Inject full `Service` schema with `provider`, `areaServed`, `offers`, and `hasOfferCatalog`.
  * **Package Details (`/packages/[slug]/`)**: Inject `Product` + `Offer` schema including price currency (`USD`/`IQD`), availability, and seller details.
  * **Project Details (`/projects/[slug]/`)**: Inject `CreativeWork` / `PortfolioItem` schema with author, publisher, and image object.
  * **Programmatic Location Pages (`/solutions-in-[city]/`)**: Inject `LocalBusiness` / `AreaServed` schema mapped specifically to Baghdad, Basra, Erbil, Najaf, or Sulaymaniyah.
  * **Cross-Industry Pages (`/[slug]/`)**: Inject dual `Service` + `BreadcrumbList` schema.

### B. Root Layout `@graph` Consolidation
* **Current State**: Multiple separate `<script type="application/ld+json">` tags exist in `layout.tsx`.
* **Enhancement**: Combine `Organization`, `WebSite`, `LocalBusiness`, and global `BreadcrumbList` into a unified `@graph` array in `app/layout.tsx`.

### C. Rich Result FAQ Implementation
* **Current State**: FAQ schemas exist on main section layouts.
* **Enhancement**: Inject localized `FAQPage` JSON-LD schema into `/compare`, `/quote-calculator`, and detail sub-pages.

---

## 3. Competitor & Alternative Page Enhancements (`skills/competitor-alternatives/SKILL.md`)

### A. `/compare` Page Structural Upgrades
* **Current State**: Offers a high-level comparison table between Sehle, Freelancers, and Offshore Agencies.
* **Enhancement**:
  * Add a **TL;DR Executive Summary** block above the comparison table for instant scanning.
  * Add an explicit **Migration Section** outlining the 4-step process for transferring legacy databases to Sehle's offline-first infrastructure.
  * Add `FAQPage` schema addressing concerns about source code ownership, post-launch support, and SLAs.
  * Update CTA query links to include trailing slashes (`/contact/?project=...`).

### B. Dedicated Comparison Sub-Pages (High-Intent Keyword Capture)
* **Current State**: Single comparison hub at `/compare`.
* **Enhancement**: Create programmatic comparison sub-routes:
  * `/compare/sehle-vs-freelancers/`
  * `/compare/sehle-vs-offshore-agencies/`
* **Impact**: Captures high-intent searches like *"freelancer vs agency for software in Iraq"*.

---

## 4. Programmatic SEO Enhancements (`skills/programmatic-seo/SKILL.md`)

### A. City Location Page Expansion (`/solutions-in-[city]/`)
* **Current State**: Covers 5 major cities (Baghdad, Basra, Erbil, Sulaymaniyah, Najaf) with basic targeted copy.
* **Enhancement**:
  * Include city-specific customer testimonials or case study highlights per page.
  * Add localized `BreadcrumbList` and `LocalBusiness` schema for each location page.
  * Update contact CTA link to use normalized trailing slashes (`/contact/?project=...`).

### B. Cross-Industry Spoke-to-Hub Linking (`/[slug]/`)
* **Current State**: Generates pages for `[Service]-for-[Industry]` combinations.
* **Enhancement**:
  * Add explicit bidirectional links from each `[Service]-for-[Industry]` page back to the parent Service hub (`/services/[service-slug]/`) and Industry hub (`/industries/[industry-slug]/`).
  * Ensure canonical URLs strictly enforce trailing slashes.

---

## 5. Technical & On-Page SEO Audit Findings (`skills/seo-audit/SKILL.md`)

### A. Internal Navigation Link Normalization
* **Current State**: Standard pages were updated, but links in header (`Navbar.tsx`), footer (`Footer.tsx`), `nav-data.tsx`, `compare/page.tsx`, `[slug]/page.tsx`, and `solutions-in-[city]/page.tsx` still contain non-trailing-slash URLs.
* **Enhancement**: Append trailing slashes to all internal `href` targets across header navigation, footer links, CTA buttons, and breadcrumbs to eliminate remaining 308 redirects.

### B. Footer Architecture Expansion
* **Current State**: Footer links cover primary pages (Home, Services, Portfolio, Contact, Blog, Refer, Social Kit).
* **Enhancement**: Expand the footer into structured columns including Hub links:
  * **Solutions**: Services, Packages, Industries, Quote Calculator
  * **Comparisons**: Compare Options, Glossary, City Solutions (Baghdad, Erbil, Basra)
  * **Company**: About, News, Contact, Referral Program

### C. Image & Asset Performance Hardening
* **Current State**: Most images use Next.js `<Image>`, but some dynamic project previews lack explicit `sizes` attributes.
* **Enhancement**: Add optimal `sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"` and WebP fallback attributes across card grids.

---

## 6. Information Architecture & Site Design (`skills/site-architecture/SKILL.md`)

### A. Hub-and-Spoke Interlinking Architecture
* **Enhancement Plan**:
  ```
  [Homepage /]
  ├── [Services Hub /services/]
  │   ├── Detail Page (/services/[slug]/) ──> Interlinks to Related Packages & Case Studies
  │   └── Cross-Industry Spoke (/[service]-for-[industry]/) ──> Links back to Service Hub
  ├── [Industries Hub /industries/]
  │   └── Detail Page (/industries/[slug]/) ──> Interlinks to City Solutions
  ├── [Packages Hub /packages/]
  │   └── Detail Page (/packages/[slug]/) ──> Links to Quote Calculator
  ├── [Compare Hub /compare/]
  └── [Interactive Tools]
      ├── Quote Calculator (/quote-calculator/)
      └── Glossary (/glossary/)
  ```

---

## Prioritized Implementation Roadmap

| Priority | Category | Action Item | Affected Files |
| :--- | :--- | :--- | :--- |
| **P1** | Technical SEO | Update remaining internal links in Header, Footer, `nav-data.tsx`, `compare/page.tsx`, `[slug]/page.tsx`, `solutions-in-[city]/page.tsx` to use trailing slashes `/` | `Navbar.tsx`, `Footer.tsx`, `nav-data.tsx`, `compare/page.tsx`, `[slug]/page.tsx`, `solutions-in-[city]/page.tsx` |
| **P1** | AI SEO | Create dynamic `/llms.txt` and `/llms-full.txt` API routes for AI search engine indexing | `app/llms.txt/route.ts`, `app/llms-full.txt/route.ts` |
| **P2** | Schema Markup | Add dynamic entity-level JSON-LD schemas (`Service`, `Product`, `CreativeWork`, `LocalBusiness`, `FAQPage`) to dynamic detail and programmatic pages | `ServiceDetailsClient.tsx`, `PackageDetailsClient.tsx`, `ProjectDetailsClient.tsx`, `IndustryDetailsClient.tsx`, `solutions-in-[city]/page.tsx`, `[slug]/page.tsx`, `compare/page.tsx` |
| **P2** | Site Architecture | Expand Footer navigation to include full hub links (`/compare/`, `/quote-calculator/`, `/industries/`, `/packages/`, `/glossary/`) | `Footer.tsx` |
| **P3** | Competitor Pages | Upgrade `/compare` page with TL;DR summary, migration steps, and FAQ schema | `compare/page.tsx` |
| **P3** | AI SEO | Add 40-60 word extractable definition blocks & visible "Last Updated" timestamps to detail pages | Detail client components |
