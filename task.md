You are now operating under the full engineering standards defined in CLAUDE.md.
Before doing anything else, read CLAUDE.md completely and internalize every rule.

Your task is a DEEP AUDIT of this entire project. Do not implement anything yet.
Your only output is a file called `ENHANCEMENT.md`.

---

## PHASE 1 — EXPLORE (Read everything, touch nothing)

Walk the entire project structure:
- Read every source file, config, schema, and environment setup
- Map the architecture: how services connect, how data flows, how auth works
- Identify the tech stack in use and compare it against CLAUDE.md standards
- Read package.json / requirements.txt — audit every dependency

---

## PHASE 2 — AUDIT (Judge against world-class standards)

Audit every layer ruthlessly against CLAUDE.md. For each finding, note:
- What the issue is
- Why it matters (security risk / performance cost / maintainability debt / bad UX)
- How severe it is: 🔴 Critical / 🟠 High / 🟡 Medium / 🟢 Low

Audit categories:

### 🎨 Frontend
- Component structure and reusability
- Design system consistency (tokens, spacing, typography, color)
- Performance (bundle size, image optimization, lazy loading, Core Web Vitals)
- Accessibility (semantic HTML, ARIA, keyboard nav, contrast)
- Loading states, error states, empty states
- Mobile responsiveness
- Dark mode support

### ⚙️ Backend
- API design (REST conventions, versioning, response envelope)
- Service/controller/repository separation
- Missing or unbounded queries
- Error handling consistency
- Input validation coverage
- Background job usage vs blocking operations
- Missing indexes on DB schema
- N+1 query risks

### 🔐 Security
- Auth implementation (token storage, expiry, rotation)
- RBAC enforcement across all routes
- Input sanitization and validation gaps
- Secrets management (hardcoded values, .env hygiene)
- Security headers presence
- Rate limiting coverage
- Multi-tenant data isolation (if applicable)
- Dependency vulnerabilities (check package versions)

### ☁️ Cloud & DevOps
- Dockerfile quality (multi-stage, non-root user, pinned versions)
- CI/CD pipeline completeness
- Missing health check endpoints
- Observability gaps (logging, error tracking, metrics)
- Environment config hygiene (.env.example, validation at startup)

### 🧪 Testing
- Test coverage assessment (unit, integration, E2E)
- Missing critical test cases
- Test quality (are they actually testing behavior?)

### 📐 Code Quality
- TypeScript strictness violations
- Any/unknown type usage
- Dead code, commented-out blocks, debug logs left in
- Files or functions exceeding size limits
- Missing or misleading documentation

### 🤖 AI/ML Services (if present)
- Model loading strategy (startup vs per-request)
- Input validation before inference
- Missing confidence scores or metadata in responses
- Error handling in inference pipeline

---

## PHASE 3 — PROPOSE (Build the enhancement plan)

Before invoking any MCP or tool for deeper analysis, ask for permission.

After the full audit, identify the top opportunities across three horizons:

**Quick Wins** — Can be done in under 1 hour, high impact
**Medium Enhancements** — 1 day of work, significant improvement
**Major Upgrades** — Multi-day, architectural or structural improvements

---

## PHASE 4 — WRITE ENHANCEMENT.md

Create a file called `ENHANCEMENT.md` in the project root with this structure:
```markdown
# ENHANCEMENT.md — Project Audit & Improvement Plan
Generated: [date]
Audited by: Claude Code under CLAUDE.md engineering standards

---

## Executive Summary
[2-3 sentences: overall project health, biggest risks, biggest opportunities]

## Audit Scorecard
| Category       | Score | Status |
|----------------|-------|--------|
| Frontend       | x/10  | 🔴/🟠/🟡/🟢 |
| Backend        | x/10  | 🔴/🟠/🟡/🟢 |
| Security       | x/10  | 🔴/🟠/🟡/🟢 |
| DevOps/Cloud   | x/10  | 🔴/🟠/🟡/🟢 |
| Testing        | x/10  | 🔴/🟠/🟡/🟢 |
| Code Quality   | x/10  | 🔴/🟠/🟡/🟢 |
| AI/ML Services | x/10  | 🔴/🟠/🟡/🟢 |

---

## 🔴 Critical Issues (Fix immediately)
[List each with: what, why, affected files, exact fix]

## 🟠 High Priority (Fix this sprint)
[List each with: what, why, affected files, recommended approach]

## 🟡 Medium Priority (Fix next sprint)
[List each with: what, why, recommended approach]

## 🟢 Low Priority (Nice to have)
[List each with: what, why]

---

## Enhancement Roadmap

### ⚡ Quick Wins (< 1 hour each)
[Numbered list — most impactful first]

### 🔧 Medium Enhancements (1 day each)
[Numbered list with estimated effort]

### 🏗️ Major Upgrades (Multi-day)
[Numbered list with estimated effort and dependencies]

---

## MCP & Agent Recommendations
[List which MCP servers or AI agents would help most with implementation,
and what you would need permission to invoke]

---

## Implementation Order
[Recommended sequence to implement all enhancements safely,
considering dependencies, risk, and impact]
```

---

## Rules for this task
- Read first, write last — complete the full audit before writing a single line of ENHANCEMENT.md
- Be brutally honest — a false positive score helps no one
- Be specific — every finding must name the exact file and line where possible
- Do NOT implement any fix — this is an audit and planning document only
- If you need to invoke an MCP for deeper analysis, ask for permission first
- When ENHANCEMENT.md is complete, present it and give me a one-paragraph verbal summary of the most urgent findings