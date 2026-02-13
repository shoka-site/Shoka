# Software Service Platform (MVP)

Hybrid Technology Solutions & Advanced Digital Training Platform MVP focused on the **services business** (teaching excluded in station 1).

## Stack
- Frontend: Next.js + Tailwind CSS
- Backend: Node.js + Express
- Database: SQLite

## MVP Pages
- Home
- About
- Services
- Portfolio
- Contact
- Book Consultation

## Run locally

### 1) Backend
```bash
cd backend
npm install
npm run dev
```

Runs at `http://localhost:4000`.

### 2) Frontend
```bash
cd frontend
npm install
npm run dev
```

Runs at `http://localhost:3000`.

## API endpoints
- `GET /api/health`
- `GET /api/services`
- `GET /api/projects`
- `GET /api/team`
- `POST /api/leads`
- `POST /api/bookings`
- `GET /api/leads`
- `GET /api/bookings`
