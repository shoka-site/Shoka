import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { createDatabase } from './db.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const db = await createDatabase();

app.get('/api/health', (_, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/services', async (_, res) => {
  const services = await db.all('SELECT * FROM services ORDER BY created_at DESC');
  const normalized = services.map((s) => ({ ...s, features: JSON.parse(s.features) }));
  res.json(normalized);
});

app.get('/api/projects', async (_, res) => {
  const projects = await db.all('SELECT * FROM projects ORDER BY created_at DESC');
  const normalized = projects.map((p) => ({
    ...p,
    technologies: JSON.parse(p.technologies),
    images: p.images ? JSON.parse(p.images) : []
  }));
  res.json(normalized);
});

app.get('/api/team', async (_, res) => {
  const team = await db.all('SELECT id, name, email, phone, role FROM team_members ORDER BY id ASC');
  res.json(team);
});

app.post('/api/leads', async (req, res) => {
  const { name, email, phone, inquiry_type, selected_service, message } = req.body;
  if (!name || !email || !inquiry_type || !message) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  const result = await db.run(
    `INSERT INTO leads (name, email, phone, inquiry_type, selected_service, message)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [name, email, phone ?? '', inquiry_type, selected_service ?? '', message]
  );

  return res.status(201).json({ id: result.lastID, message: 'Lead submitted successfully.' });
});

app.post('/api/bookings', async (req, res) => {
  const { name, email, date, time, service_type } = req.body;
  if (!name || !email || !date || !time || !service_type) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  const result = await db.run(
    `INSERT INTO bookings (name, email, date, time, service_type)
     VALUES (?, ?, ?, ?, ?)`,
    [name, email, date, time, service_type]
  );

  return res.status(201).json({ id: result.lastID, message: 'Booking created successfully.' });
});

app.get('/api/leads', async (_, res) => {
  const leads = await db.all('SELECT * FROM leads ORDER BY created_at DESC');
  res.json(leads);
});

app.get('/api/bookings', async (_, res) => {
  const bookings = await db.all('SELECT * FROM bookings ORDER BY id DESC');
  res.json(bookings);
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
