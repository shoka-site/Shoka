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

## Run with Docker (Recommended for Collaboration)

This is the easiest way to run the project on both **Ubuntu** and **Windows**.

### Prerequisites
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Steps
1. **Build and Start:**
   ```bash
   docker-compose up --build
   ```
2. **Access the app:**
   Open `http://localhost:3000` in your browser.

3. **Stop the app:**
   ```bash
   docker-compose down
   ```

### Troubleshooting (Ubuntu/Linux)
If you see a "Permission denied" error when running docker commands:
1. Run with `sudo`:
   ```bash
   sudo docker-compose up --build
   ```
2. **OR** fix permissions permanently (recommended):
   ```bash
   sudo usermod -aG docker $USER
   newgrp docker
   ```

*Note: The database (`database.sqlite`) is persisted in the `frontend` folder.*

## API endpoints
- `GET /api/health`
- `GET /api/services`
- `GET /api/projects`
- `GET /api/team`
- `POST /api/leads`
- `POST /api/bookings`
- `GET /api/leads`
- `GET /api/bookings`
