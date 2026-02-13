import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';

// For Next.js in development, prevent multiple connections
let cachedDb: Database | null = null;

const dbPath = path.resolve(process.cwd(), 'database.sqlite');

export async function createDatabase(): Promise<Database> {
  if (cachedDb) {
    return cachedDb;
  }

  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS admin (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      phone TEXT
    );

    CREATE TABLE IF NOT EXISTS team_members (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE,
      phone TEXT,
      role TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS services (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      description TEXT NOT NULL,
      features TEXT NOT NULL,
      pricing_model TEXT,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      technologies TEXT NOT NULL,
      industry TEXT,
      results TEXT,
      images TEXT,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      inquiry_type TEXT NOT NULL,
      selected_service TEXT,
      message TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'new',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      date TEXT NOT NULL,
      time TEXT NOT NULL,
      service_type TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending'
    );
  `);

  const count = await db.get('SELECT COUNT(*) as total FROM services');
  if (count.total === 0) {
    await seedData(db);
  }

  cachedDb = db;
  return db;
}

async function seedData(db: Database) {
  const services = [
    ['AI Starter Package', 'AI Solutions', 'Rapid AI opportunity assessment and first implementation.', JSON.stringify(['Use-case discovery', 'Prototype model', 'Deployment plan']), 'Project-based'],
    ['Business Automation Package', 'Automation', 'Automate repetitive workflows across operations and sales.', JSON.stringify(['Process mapping', 'Workflow automation', 'Reporting dashboard']), 'Subscription'],
    ['Startup MVP Package', 'Product Engineering', 'Design and launch investor-ready MVP solutions.', JSON.stringify(['Technical architecture', 'MVP development', 'Launch support']), 'Milestone-based'],
    ['Data Intelligence Dashboard', 'Data & Analytics', 'Executive dashboards with actionable KPI visibility.', JSON.stringify(['Data integration', 'KPI framework', 'Interactive dashboards']), 'Project-based'],
    ['Cloud Setup & Scaling Package', 'Cloud Infrastructure', 'Secure cloud foundation and scalable architecture.', JSON.stringify(['Cloud setup', 'CI/CD pipeline', 'Monitoring & security']), 'Monthly retainer']
  ];

  const stmtServices = await db.prepare('INSERT INTO services (title, category, description, features, pricing_model) VALUES (?, ?, ?, ?, ?)');
  for (const svc of services) {
    await stmtServices.run(svc);
  }
  await stmtServices.finalize();

  const projects = [
    ['Smart Admissions Automation', 'AI-assisted admissions triage and communication automation for education sector.', JSON.stringify(['Node.js', 'OpenAI API', 'PostgreSQL']), 'Education', 'Reduced response time by 68%.', JSON.stringify(['https://placehold.co/800x500'])],
    ['Retail Analytics Command Center', 'Unified dashboard for inventory, sales, and campaign performance.', JSON.stringify(['Next.js', 'Python', 'Power BI']), 'Retail', 'Improved forecasting accuracy by 34%.', JSON.stringify(['https://placehold.co/800x500'])]
  ];

  const stmtProjects = await db.prepare('INSERT INTO projects (title, description, technologies, industry, results, images) VALUES (?, ?, ?, ?, ?, ?)');
  for (const project of projects) {
    await stmtProjects.run(project);
  }
  await stmtProjects.finalize();

  const team = [
    ['Amina Al-Salem', 'amina@platform.com', '+966500000001', 'AI Solutions Lead'],
    ['Omar Hassan', 'omar@platform.com', '+966500000002', 'Cloud Architect']
  ];

  const stmtTeam = await db.prepare('INSERT INTO team_members (name, email, phone, role) VALUES (?, ?, ?, ?)');
  for (const member of team) {
    await stmtTeam.run(member);
  }
  await stmtTeam.finalize();
}
