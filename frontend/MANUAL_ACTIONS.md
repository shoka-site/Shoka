# Manual Actions Required (Non-Code Tasks)

These are actions that need to be completed outside the codebase to fully activate the marketing enhancements.

---

## Priority 1 — Immediate Setup

### 1. Google Analytics 4
- Create a GA4 property at [analytics.google.com](https://analytics.google.com)
- Get your Measurement ID (format: `G-XXXXXXXXXX`)
- Add to your environment: `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX` in `.env` / `.env.local`
- The GA4 component is already wired up — it activates automatically when the env var is set

### 2. Google Search Console
- Verify site ownership at [search.google.com/search-console](https://search.google.com/search-console)
- Get the verification code
- Replace the placeholder `"google-site-verification-code"` in `app/layout.tsx` (line ~112) with your actual code
- Submit sitemap URL: `https://www.sehle.site/sitemap.xml`

### 3. Update Phone Number
- Replace the placeholder phone number `"+90-000-000-0000"` in the LocalBusiness schema in `app/layout.tsx` with the real business phone number

---

## Priority 2 — Content Creation

### 4. Product Marketing Context Document
Write a positioning document covering:
- Target personas (who buys from you)
- Value propositions (why they buy)
- Competitive differentiators (why you vs alternatives)
- Objection handling (common concerns and rebuttals)
- Brand voice guidelines
- Customer language (phrases real clients use)

### 5. Lead Magnet PDF
Create a downloadable asset to offer visitors, e.g.:
- "Digital Transformation Readiness Checklist"
- "Iraqi Market Tech Landscape 2026"
- "Website Performance Audit Template"

### 6. Blog Content
Plan 12 articles (1/week for first quarter):
- "Why Iraqi Businesses Need Custom ERP"
- "AI in Iraqi Healthcare: Opportunities & Challenges"
- "Cloud Migration Checklist for Iraqi Companies"
- "How to Choose the Right Software Partner in Iraq"
- Case studies from completed projects (2-3 detailed write-ups with metrics)

### 7. Case Studies
Document 2-3 detailed client success stories including:
- Client background and challenge
- Solution implemented
- Measurable results (%, timeline, cost savings)

---

## Priority 3 — Email Marketing

### 8. Email Service Provider
Choose and set up one of:
- [Resend](https://resend.com) (developer-friendly)
- [Mailchimp](https://mailchimp.com) (full marketing suite)
- [SendGrid](https://sendgrid.com) (transactional + marketing)

### 9. Post-Inquiry Email Sequence
Write 5 emails sent over 14 days after someone submits the contact form:
1. **Confirmation** — "We received your message" (immediate)
2. **Case Study** — Share a relevant success story (Day 2)
3. **Process Overview** — "Here's how we work" (Day 5)
4. **FAQ** — Address common questions (Day 9)
5. **Follow-up** — "Still interested? Let's schedule a call" (Day 14)

### 10. Newsletter Welcome Sequence
Write 3 emails for newsletter subscribers:
1. **Welcome** — Thank you + what to expect (immediate)
2. **Value Content** — Useful tip or industry insight (Day 3)
3. **Soft CTA** — "Here's how we can help your business" (Day 7)

---

## Priority 4 — Social & Content Marketing

### 11. Social Content Calendar
Plan posting schedule:
- **LinkedIn:** 3x/week (thought leadership, case studies, team spotlights)
- **Instagram:** 2x/week (visual projects, behind-the-scenes, team)
- **X (Twitter):** Daily (tech tips, industry news, engagement)

### 12. Social Templates
Create branded templates for:
- Project showcase posts
- Team spotlight posts
- Tech tip carousels
- Client testimonial graphics

### 13. Content Repurposing
For each blog post, create:
- 3-5 social media posts
- 1 email newsletter feature
- 1 LinkedIn article summary

---

## Priority 5 — Advanced Growth

### 14. Competitor Comparison Content
Write comparison content for:
- "Sehle vs Freelancers" — why a full team beats solo developers
- "Sehle vs Offshore Agencies" — local understanding + quality
- "Sehle vs DIY Platforms" — custom solutions vs templates

### 15. Referral Program
Design a referral program:
- Define incentives (discount on next project, service credit)
- Create referral landing page copy
- Set up tracking mechanism for referral links

### 16. A/B Test Hypotheses
Define first 3 experiments to run:
1. **Hero headline** — benefit-led vs feature-led
2. **CTA color** — current gold vs high-contrast white
3. **Contact form** — single-step vs multi-step

### 17. Programmatic SEO Content
Prepare data for service × industry cross-reference pages:
- 10 services × 8 industries = 80 potential pages
- Write template copy for each combination
- Example: `/ai-solutions-for-healthcare`, `/erp-for-oil-gas`

### 18. AI SEO Optimization
Restructure service descriptions:
- Add "What is [Service]?" definition sections
- Use clear definition → use-case → benefit patterns
- Include specific numbers and methodologies
- Optimize for queries like "best Iraqi software company"

---

## Tracking Progress

| # | Action | Status |
|---|--------|--------|
| 1 | GA4 Setup | [ ] |
| 2 | Search Console | [ ] |
| 3 | Phone Number | [ ] |
| 4 | Marketing Context | [ ] |
| 5 | Lead Magnet PDF | [ ] |
| 6 | Blog Content | [ ] |
| 7 | Case Studies | [ ] |
| 8 | Email Provider | [ ] |
| 9 | Post-Inquiry Emails | [ ] |
| 10 | Newsletter Emails | [ ] |
| 11 | Social Calendar | [ ] |
| 12 | Social Templates | [ ] |
| 13 | Content Repurposing | [ ] |
| 14 | Competitor Content | [ ] |
| 15 | Referral Program | [ ] |
| 16 | A/B Tests | [ ] |
| 17 | Programmatic SEO | [ ] |
| 18 | AI SEO | [ ] |
