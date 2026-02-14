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
    ['باقة الذكاء الاصطناعي للمبتدئين', 'حلول الذكاء الاصطناعي', 'تقييم سريع لفرص الذكاء الاصطناعي وتنفيذ أولي.', JSON.stringify(['اكتشاف حالات الاستخدام', 'نموذج أولي', 'خطة نشر']), 'حسب المشروع'],
    ['باقة أتمتة الأعمال', 'الأتمتة', 'أتمتة سير العمل المتكرر عبر العمليات والمبيعات.', JSON.stringify(['رسم خرائط العمليات', 'أتمتة سير العمل', 'لوحة تحكم التقارير']), 'اشتراك'],
    ['باقة MVP للشركات الناشئة', 'هندسة المنتجات', 'تصميم وإطلاق حلول MVP جاهزة للمستثمرين.', JSON.stringify(['الهندسة التقنية', 'تطوير MVP', 'دعم الإطلاق']), 'حسب الإنجاز'],
    ['لوحة ذكاء البيانات', 'البيانات والتحليلات', 'لوحات معلومات تنفيذية مع رؤية قابلة للتنفيذ لمؤشرات الأداء.', JSON.stringify(['تكامل البيانات', 'إطار عمل المؤشرات', 'لوحات تفاعلية']), 'حسب المشروع'],
    ['باقة إعداد وتوسيع السحابة', 'البنية التحتية السحابية', 'أساس سحابي آمن وهندسة قابلة للتطوير.', JSON.stringify(['إعداد السحابة', 'خط أنابيب CI/CD', 'المراقبة والأمان']), 'عقد شهري']
  ];

  const stmtServices = await db.prepare('INSERT INTO services (title, category, description, features, pricing_model) VALUES (?, ?, ?, ?, ?)');
  for (const svc of services) {
    await stmtServices.run(svc);
  }
  await stmtServices.finalize();

  const projects = [
    ['أتمتة القبول الذكي', 'فرز القبول المدعوم بالذكاء الاصطناعي وأتمتة الاتصالات لقطاع التعليم.', JSON.stringify(['Node.js', 'OpenAI API', 'PostgreSQL']), 'التعليم', 'خفض وقت الاستجابة بنسبة 68%.', JSON.stringify(['https://placehold.co/800x500'])],
    ['مركز قيادة تحليلات التجزئة', 'لوحة تحكم موحدة للمخزون والمبيعات وأداء الحملات.', JSON.stringify(['Next.js', 'Python', 'Power BI']), 'التجزئة', 'تحسين دقة التنبؤ بنسبة 34%.', JSON.stringify(['https://placehold.co/800x500'])]
  ];

  const stmtProjects = await db.prepare('INSERT INTO projects (title, description, technologies, industry, results, images) VALUES (?, ?, ?, ?, ?, ?)');
  for (const project of projects) {
    await stmtProjects.run(project);
  }
  await stmtProjects.finalize();

  const team = [
    ['أمينة السالم', 'amina@platform.com', '+966500000001', 'رائدة حلول الذكاء الاصطناعي'],
    ['عمر حسن', 'omar@platform.com', '+966500000002', 'مهندس سحابي']
  ];

  const stmtTeam = await db.prepare('INSERT INTO team_members (name, email, phone, role) VALUES (?, ?, ?, ?)');
  for (const member of team) {
    await stmtTeam.run(member);
  }
  await stmtTeam.finalize();
}
