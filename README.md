# Sehle Platform — Iraq's Digital Systems Platform

Sehle is a premium digital transformation and custom software engineering platform built for businesses in Iraq and the region.

---

## 🏗️ Architecture & Stack

Sehle is built using a modern, unified Next.js App Router structure:
- **Frontend**: Next.js (App Router), Tailwind CSS v4, Framer Motion, Radix UI.
- **Backend & Database**: Next.js API Routes, Prisma ORM, SQLite database.
- **Rate Limiting**: Distributed, low-latency rate limiting via Upstash Redis.
- **Email Notifications**: Resend integration for admin alerts & client confirmations.
- **Experimentation**: Built-in A/B Testing middleware variant assignment & GA4 exposure tracking.

---

## ⚙️ Environment Configuration

Create a `frontend/.env` file with the following variables:

```bash
# Database connections
DATABASE_URL="file:./database.sqlite"

# Upstash Redis rate limiting config
UPSTASH_REDIS_REST_URL="https://your-redis-url.upstash.io"
UPSTASH_REDIS_REST_TOKEN="your-token"

# Resend Mail Configuration
RESEND_API_KEY="re_..."
RESEND_FROM_EMAIL="onboarding@resend.dev"
NEXT_PUBLIC_SITE_URL="https://www.sehle.site"
```

---

## 🚀 Running Locally

### Prerequisites
- Node.js (v18+)
- npm (v10+)

### Setup Steps
1. **Navigate and Install**:
   ```bash
   cd frontend
   npm install
   ```
2. **Setup Database**:
   ```bash
   npm run db:push
   ```
3. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🐳 Docker Deployment

The simplest way to run the entire project inside an isolated containerized environment:

1. **Build and Run**:
   ```bash
   docker-compose up --build
   ```
2. **Stop Container**:
   ```bash
   docker-compose down
   ```

---

## 🧪 Testing

We use **Vitest** for testing:
```bash
cd frontend
npm run test
```

---

## 📜 API & OpenAPI Specifications
Machine-readable REST API documentation is available at `openapi.yaml` in the project root. Key endpoints include:
- `GET /api/health` — Service status check.
- `GET /api/content/services` — Public localized services.
- `GET /api/content/projects` — Public completed projects.
- `POST /api/admin/consultations` — Request contact consultation (supports UTM & GA4 tracking).
