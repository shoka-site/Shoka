# Iraqi Platform — Marketing Skills Enhancement Plan

## Overview

This plan maps **22 of the 33 marketing skills** from `temp_marketingskills/skills/` to concrete, implementable enhancements for the Iraqi Platform (shoka.site). Skills are organized into 5 tiers by impact and dependency order.

---

## Tier 1: Foundation (Do First — Everything Else Depends on These)

### 1. Product Marketing Context (`product-marketing-context`)
**What it does:** Creates a master positioning document that all other skills reference.
**Current gap:** No centralized positioning/messaging document exists. Copy is scattered across translation files.
**Enhancement:**
- Generate a `product-marketing-context.md` covering: target personas, value propositions, competitive differentiators, objection handling, customer language, brand voice
- This becomes the single source of truth for all copywriting, ads, and content
**Impact:** Every subsequent skill produces higher-quality, on-brand output

### 2. Analytics Tracking (`analytics-tracking`)
**What it does:** Designs a complete tracking plan with event specs and conversion definitions.
**Current gap:** Only Vercel Analytics exists. No GA4, no custom event tracking, no conversion tracking, no form submission events.
**Enhancement:**
- Implement GA4 with proper conversion events (form_submit, cta_click, package_view, language_toggle)
- Add UTM parameter tracking for campaign attribution
- Define and track micro-conversions (scroll depth, service card clicks, testimonial engagement)
- Set up GTM container for future flexibility
**Impact:** Without measurement, no other optimization skill can prove its value. This unlocks all CRO and paid ads work.

### 3. Site Architecture (`site-architecture`)
**What it does:** Plans URL structure, navigation hierarchy, breadcrumbs, and internal linking for SEO + UX.
**Current gap:** No sitemap.xml, no robots.txt, no breadcrumb schema on detail pages, no internal linking strategy.
**Enhancement:**
- Generate dynamic `sitemap.xml` via Next.js (all pages + language alternates)
- Create `robots.txt` with sitemap reference
- Add hreflang tags for AR/EN language alternates
- Implement breadcrumb JSON-LD on all detail pages (`/services/[id]`, `/projects/[id]`, etc.)
- Design internal linking strategy between related services, industries, and packages
**Impact:** Search engines can properly crawl and index the site. Estimated 30-50% improvement in organic discoverability.

---

## Tier 2: Search & Discovery (Get Found)

### 4. SEO Audit (`seo-audit`)
**What it does:** Comprehensive technical, on-page, and content SEO audit with prioritized fixes.
**Current gap:** Strong meta tags exist but: Google verification is a placeholder, no LocalBusiness schema, no FAQ schema, no structured data on detail pages, missing alt text strategy.
**Enhancement:**
- Fix Google Search Console verification (replace placeholder code)
- Add LocalBusiness schema (Ankara, Turkey office)
- Add Service schema on `/services/[id]` pages
- Add FAQ schema on package and service detail pages
- Audit and fix image alt text across all pages
- Add structured data for testimonials (Review schema)
**Impact:** Rich snippets in search results, improved click-through rates from SERPs

### 5. Schema Markup (`schema-markup`)
**What it does:** Implements JSON-LD structured data for rich search results.
**Current gap:** Only Organization and WebSite schemas exist. No page-level schemas.
**Enhancement:**
- **Service pages:** Add `Service` schema with provider, area served, description
- **Project pages:** Add `CreativeWork` schema with images, dateCreated, creator
- **Package pages:** Add `Product` or `Offer` schema with description
- **About page:** Add `AboutPage` schema + team members as `Person` schemas
- **Contact page:** Add `ContactPage` schema with ContactPoint
- **Testimonials:** Add `Review` + `AggregateRating` schema (4.9/5 from site metrics)
**Impact:** Star ratings in SERPs, rich cards, improved visibility in Google's knowledge panels

### 6. AI SEO (`ai-seo`)
**What it does:** Optimizes content to be cited by AI search engines (ChatGPT, Perplexity, Google AI Overviews).
**Current gap:** No AI-optimized content structure. Content is visually rich but lacks the semantic clarity AI parsers need.
**Enhancement:**
- Restructure service descriptions with clear definition → use-case → benefit patterns
- Add "What is [Service]?" sections that AI can extract as answers
- Create a `/glossary` or FAQ section with concise, quotable definitions
- Add citation-friendly data (specific numbers, methodologies, frameworks)
- Optimize for queries like "best Iraqi software company", "Iraqi digital transformation services"
**Impact:** Appear as a cited source when prospects ask AI assistants about Iraqi tech services

### 7. Programmatic SEO (`programmatic-seo`)
**What it does:** Builds SEO pages at scale using templates and data.
**Current gap:** Each industry, service, and package page is individually crafted but there's no scalable content generation for long-tail keywords.
**Enhancement:**
- Create `/{service}-for-{industry}` cross-reference pages (e.g., "/ai-solutions-for-healthcare", "/erp-for-oil-gas")
- Generate `/solutions-in-{city}` location pages for Iraqi cities (Baghdad, Basra, Erbil, etc.)
- Build comparison pages: "Iraqi Platform vs [competitor approach]"
- Template-driven, data-fed pages using existing services × industries data
**Impact:** Capture long-tail search traffic. If 10 services × 8 industries = 80 new indexed pages, each capturing niche queries.

---

## Tier 3: Conversion Optimization (Convert Visitors)

### 8. Page CRO (`page-cro`)
**What it does:** Analyzes and optimizes marketing pages to improve conversion rates.
**Current gap:** Strong visual design but: hero section lacks a clear value proposition headline, "Book Consultation" CTA doesn't communicate what happens next, no urgency signals, results metrics lack context.
**Enhancement:**
- Rewrite hero headline to lead with the customer's desired outcome (not company name)
- Add "What happens when you click" microcopy under CTAs
- Add social proof near CTAs (e.g., "Trusted by 20+ enterprises")
- Implement urgency where authentic (e.g., "Limited Q2 onboarding slots")
- A/B test headline variants
**Impact:** 15-30% improvement in contact form submissions

### 9. Copywriting (`copywriting`)
**What it does:** Writes persuasive page copy organized by section with headline alternatives.
**Current gap:** Copy is functional but generic. Descriptions read like feature lists rather than benefit-driven narratives.
**Enhancement:**
- Rewrite homepage hero copy: lead with transformation, not features
- Rewrite service descriptions: problem → solution → proof pattern
- Add customer-language headlines (use actual phrases from testimonials)
- Write stronger package descriptions that answer "why this package?"
- Create "above the fold" copy variants for A/B testing
**Impact:** Higher engagement, lower bounce rate, more qualified leads

### 10. Copy Editing (`copy-editing`)
**What it does:** Systematic editing passes for clarity, voice, benefits, proof, specificity.
**Current gap:** Both AR and EN translations could benefit from tighter, more benefit-focused language.
**Enhancement:**
- Run 7-sweep edit across all page copy: clarity → voice → benefits → proof → specificity → emotion → risk reduction
- Tighten headlines (remove filler words)
- Add specificity to vague claims ("fast delivery" → "launch in 8 weeks")
- Ensure Arabic copy is culturally resonant, not just translated
**Impact:** Improved readability scores, stronger perceived credibility

### 11. Signup Flow CRO (`signup-flow-cro`)
**What it does:** Optimizes form flows to reduce friction and increase completion.
**Current gap:** Contact form is 4 fields (name, email, company, message). No progressive disclosure, no smart defaults, no multi-step flow.
**Enhancement:**
- Split into 2-step form: Step 1 (name + email) → Step 2 (company + message + budget range + timeline)
- Add progress indicator
- Pre-populate message field based on referring page (already partially done via URL params)
- Add "What to expect" sidebar (response time, process overview)
- Add field-level validation with helpful microcopy
**Impact:** 20-40% increase in form completions

### 12. Form CRO (`form-cro`)
**What it does:** Optimizes non-signup forms for maximum completion.
**Current gap:** Single contact form serves all purposes (general inquiry, project discussion, partnership).
**Enhancement:**
- Create purpose-specific form variants (Project Inquiry, Partnership, Support)
- Add conditional fields based on selection (budget appears only for project inquiries)
- Implement inline validation with positive feedback
- Add social proof near submit button ("Join 20+ companies who trusted us")
**Impact:** Higher-quality leads, better sales team routing

### 13. Popup CRO (`popup-cro`)
**What it does:** Creates conversion-optimized popups with smart triggers.
**Current gap:** Zero popups/modals for lead capture. All dialog infrastructure exists but is unused.
**Enhancement:**
- **Exit-intent popup:** "Before you go — get our free Digital Transformation Checklist" (email capture)
- **Scroll-trigger popup:** After 60% page scroll on service pages, show "Want a custom quote?"
- **Time-delay popup:** After 45 seconds on pricing/packages page, show "Need help choosing a package?"
- Implement frequency capping (show once per session, max 2x per week)
- Use existing Radix Dialog components — minimal new code needed
**Impact:** 3-8% of visitors convert via popup (industry average), capturing leads that would otherwise bounce

### 14. Pricing Strategy (`pricing-strategy`)
**What it does:** Designs tier structures and monetization strategies.
**Current gap:** Packages exist but no visible pricing, no comparison table, no "recommended" badge, no annual/monthly toggle.
**Enhancement:**
- Add comparison table to `/packages` showing feature differences across tiers
- Mark one package as "Most Popular" or "Recommended"
- Add "Starting from $X" indicators (even ranges help)
- Implement pricing toggle (if applicable: monthly vs project-based)
- Add FAQ section answering "What's included?", "Can I customize?", "What's the timeline?"
**Impact:** Reduce "just browsing" behavior, increase qualified inquiries with budget context

---

## Tier 4: Engagement & Retention (Nurture Leads)

### 15. Lead Magnets (`lead-magnets`)
**What it does:** Plans downloadable assets that capture emails.
**Current gap:** No downloadable content, no email capture beyond the contact form.
**Enhancement:**
- Create "Digital Transformation Readiness Checklist" (PDF gated behind email)
- Create "Iraqi Market Tech Landscape 2026" report
- Create "Website Performance Audit Template"
- Gate behind simple email-capture form (name + email + company)
- Deliver via automated email with follow-up sequence
**Impact:** Build email list for nurturing. Convert 5-15% of visitors who aren't ready to buy yet.

### 16. Email Sequence (`email-sequence`)
**What it does:** Designs automated email flows for nurture, onboarding, and re-engagement.
**Current gap:** No email automation whatsoever. Form submissions go to DB but trigger no follow-up.
**Enhancement:**
- **Post-inquiry sequence** (5 emails over 14 days): Confirmation → Case study → Process overview → FAQ → Follow-up
- **Lead magnet nurture** (4 emails over 10 days): Delivery → Related tip → Service spotlight → Soft CTA
- **Re-engagement** (3 emails after 30 days of no contact): "Still exploring?" → New project showcase → Limited-time consultation offer
**Impact:** 2-3x increase in lead-to-conversation rate

### 17. Content Strategy (`content-strategy`)
**What it does:** Plans content pillars, topics, and channels that drive traffic.
**Current gap:** News page exists but has minimal content. No blog, no thought leadership, no content marketing.
**Enhancement:**
- Define 4 content pillars: Iraqi Digital Transformation, Technical Excellence, Industry Solutions, Company Culture
- Create a blog section (`/blog`) with SEO-optimized articles
- Plan 12-article editorial calendar (1/week for first quarter)
- Topics: "Why Iraqi Businesses Need Custom ERP", "AI in Iraqi Healthcare", "Cloud Migration Checklist"
**Impact:** Organic traffic growth of 50-200% over 6 months

### 18. Social Content (`social-content`)
**What it does:** Plans and creates social media content across platforms.
**Current gap:** Social links exist (LinkedIn, X, Instagram, TikTok, Facebook) but no content strategy feeding them.
**Enhancement:**
- Create content pillars for social: Behind-the-scenes, Client wins, Tech tips, Team spotlights
- Design templates for project showcase posts
- Plan posting cadence: LinkedIn 3x/week, Instagram 2x/week, X daily
- Repurpose blog content into social snippets
- Create engagement templates (polls, questions, threads)
**Impact:** Brand awareness, referral traffic, recruitment pipeline

---

## Tier 5: Growth & Scale (Accelerate)

### 19. Competitor Alternatives (`competitor-alternatives`)
**What it does:** Creates comparison pages for SEO and sales enablement.
**Enhancement:**
- Create "Iraqi Platform vs Freelancers", "Iraqi Platform vs Offshore Agencies", "Iraqi Platform vs DIY Platforms" comparison pages
- Build a "Why Choose Us" section with side-by-side feature tables
- Target search queries like "best software company in Iraq", "Iraqi web development alternatives"
**Impact:** Capture high-intent comparison shoppers, provide sales team with competitive ammunition

### 20. Referral Program (`referral-program`)
**What it does:** Designs customer referral mechanics and incentives.
**Enhancement:**
- Design a "Refer a Business" program: existing clients refer → get discount on next project / service credit
- Create referral landing page with unique tracking links
- Implement referral tracking in the admin system
- Build automated referral notification emails
**Impact:** Customer acquisition at near-zero marginal cost

### 21. Marketing Psychology (`marketing-psychology`)
**What it does:** Applies psychological principles to improve conversions.
**Enhancement:**
- Apply **anchoring** on packages page (show highest tier first)
- Apply **social proof** near CTAs (live counter: "23 projects delivered this quarter")
- Apply **loss aversion** in exit-intent popups ("Don't miss your free audit")
- Apply **reciprocity** via free lead magnets before asking for business
- Apply **authority** by adding certifications, partner badges, media mentions
**Impact:** Compounds with all CRO improvements above

### 22. A/B Test Setup (`ab-test-setup`)
**What it does:** Designs statistically valid experiments.
**Enhancement:**
- Set up A/B testing infrastructure (Vercel Edge Config or custom)
- Priority tests:
  1. Hero headline (benefit-led vs feature-led)
  2. CTA color (current gold vs high-contrast white)
  3. Contact form (single-step vs multi-step)
  4. Package page (with pricing vs without)
- Define sample sizes, duration, and success metrics for each test
**Impact:** Data-driven optimization replaces guesswork

---

## Skills NOT Applicable (11 of 33)

| Skill | Reason |
|-------|--------|
| `cold-email` | B2B outbound — requires sales team infrastructure not yet present |
| `paid-ads` | Requires budget allocation and analytics foundation first (Tier 1) |
| `ad-creative` | Depends on paid-ads strategy being defined first |
| `churn-prevention` | No subscription/SaaS model — project-based business |
| `onboarding-cro` | No user dashboard or product login flow |
| `paywall-upgrade-cro` | No freemium/paywall model |
| `free-tool-strategy` | Good idea but lower priority than foundational work |
| `revops` | Requires CRM and sales pipeline — premature for current stage |
| `sales-enablement` | Requires defined sales process first |
| `launch-strategy` | Relevant when launching new products/features, not for ongoing optimization |
| `marketing-ideas` | Meta-skill — the specific skills above already cover the best ideas |

---

## Recommended Implementation Order

```
Phase 1 (Week 1-2): Foundation
├── product-marketing-context
├── analytics-tracking (GA4 + events)
└── site-architecture (sitemap, robots.txt, hreflang, breadcrumbs)

Phase 2 (Week 3-4): SEO & Discovery
├── seo-audit (fix technical issues)
├── schema-markup (all page types)
└── ai-seo (content restructuring)

Phase 3 (Week 5-6): Conversion
├── page-cro (homepage + service pages)
├── copywriting (hero + service rewrites)
├── copy-editing (full sweep)
├── signup-flow-cro (multi-step form)
└── form-cro (purpose-specific variants)

Phase 4 (Week 7-8): Lead Capture
├── popup-cro (exit-intent + scroll triggers)
├── lead-magnets (first downloadable asset)
├── pricing-strategy (comparison table + FAQ)
└── email-sequence (post-inquiry + nurture)

Phase 5 (Week 9-12): Growth
├── content-strategy (blog launch)
├── social-content (posting cadence)
├── programmatic-seo (cross-reference pages)
├── competitor-alternatives (comparison pages)
├── referral-program (design + launch)
├── marketing-psychology (apply across site)
└── ab-test-setup (first 2 experiments)
```

---

## Expected Outcomes

| Metric | Current Baseline | Target (90 days) |
|--------|-----------------|-------------------|
| Organic search traffic | Unknown (no GA4) | +100-200% |
| Contact form submissions | Unknown | +40-60% |
| Email list size | 0 | 500+ subscribers |
| Pages indexed by Google | ~15 | 80+ (with programmatic SEO) |
| Rich snippets in SERPs | 0 | 8+ page types |
| Avg. time on site | Unknown | +30% (with better content) |
| Bounce rate | Unknown | -20% (with popups + CRO) |
