import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '../shared/schema';
import enTranslations from '../src/locales/en.json';
import arTranslations from '../src/locales/ar.json';

// Get database connection
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool, { schema });

async function seedHeroSlides() {
    console.log('Seeding hero slides...');

    const slides = [1, 2, 3].map((num, index) => ({
        order: index + 1,
        imageUrl: `/src/assets/hero-meso-${num}.png`,
        badgeEn: enTranslations.hero.slides[num].badge,
        badgeAr: arTranslations.hero.slides[num].badge,
        titleEn: `${enTranslations.hero.slides[num].title_prefix || ''} ${enTranslations.hero.slides[num].title_highlight || ''} ${enTranslations.hero.slides[num].title_suffix || ''}`.trim() || enTranslations.hero.slides[num].title,
        titleAr: `${arTranslations.hero.slides[num].title_prefix || ''} ${arTranslations.hero.slides[num].title_highlight || ''} ${arTranslations.hero.slides[num].title_suffix || ''}`.trim() || arTranslations.hero.slides[num].title,
        descriptionEn: enTranslations.hero.slides[num].description,
        descriptionAr: arTranslations.hero.slides[num].description,
        published: true,
    }));

    await db.insert(schema.heroSlides).values(slides);
    console.log(`✅ Seeded ${slides.length} hero slides`);
}

async function seedStats() {
    console.log('Seeding stats...');

    const statsData = [
        {
            key: 'experience',
            numberEn: enTranslations.stats.experience.number,
            numberAr: arTranslations.stats.experience.number,
            labelEn: enTranslations.stats.experience.label,
            labelAr: arTranslations.stats.experience.label,
            order: 1,
        },
        {
            key: 'projects',
            numberEn: enTranslations.stats.projects.number,
            numberAr: arTranslations.stats.projects.number,
            labelEn: enTranslations.stats.projects.label,
            labelAr: arTranslations.stats.projects.label,
            order: 2,
        },
        {
            key: 'clients',
            numberEn: enTranslations.stats.clients.number,
            numberAr: arTranslations.stats.clients.number,
            labelEn: enTranslations.stats.clients.label,
            labelAr: arTranslations.stats.clients.label,
            order: 3,
        },
        {
            key: 'satisfaction',
            numberEn: enTranslations.stats.satisfaction.number,
            numberAr: arTranslations.stats.satisfaction.number,
            labelEn: enTranslations.stats.satisfaction.label,
            labelAr: arTranslations.stats.satisfaction.label,
            order: 4,
        },
    ];

    await db.insert(schema.stats).values(statsData);
    console.log(`✅ Seeded ${statsData.length} stats`);
}

async function seedServices() {
    console.log('Seeding services...');

    const servicesData = [
        {
            order: 1,
            iconName: 'Brain',
            titleEn: enTranslations.home.services.ai.title,
            titleAr: arTranslations.home.services.ai.title,
            descriptionEn: enTranslations.home.services.ai.desc,
            descriptionAr: arTranslations.home.services.ai.desc,
            published: true,
        },
        {
            order: 2,
            iconName: 'Code',
            titleEn: enTranslations.home.services.fullstack.title,
            titleAr: arTranslations.home.services.fullstack.title,
            descriptionEn: enTranslations.home.services.fullstack.desc,
            descriptionAr: arTranslations.home.services.fullstack.desc,
            published: true,
        },
        {
            order: 3,
            iconName: 'Database',
            titleEn: enTranslations.home.services.data.title,
            titleAr: arTranslations.home.services.data.title,
            descriptionEn: enTranslations.home.services.data.desc,
            descriptionAr: arTranslations.home.services.data.desc,
            published: true,
        },
        {
            order: 4,
            iconName: 'Cloud',
            titleEn: enTranslations.home.services.cloud.title,
            titleAr: arTranslations.home.services.cloud.title,
            descriptionEn: enTranslations.home.services.cloud.desc,
            descriptionAr: arTranslations.home.services.cloud.desc,
            published: true,
        },
    ];

    await db.insert(schema.services).values(servicesData);
    console.log(`✅ Seeded ${servicesData.length} services`);
}

async function seedProjects() {
    console.log('Seeding projects...');

    const projectsData = [
        {
            order: 1,
            imageUrl: '/src/assets/project-1.png',
            categoryEn: enTranslations.portfolio.projects.archive.category,
            categoryAr: arTranslations.portfolio.projects.archive.category,
            titleEn: enTranslations.portfolio.projects.archive.title,
            titleAr: arTranslations.portfolio.projects.archive.title,
            descriptionEn: enTranslations.portfolio.projects.archive.desc,
            descriptionAr: arTranslations.portfolio.projects.archive.desc,
            featured: true,
            published: true,
        },
        {
            order: 2,
            imageUrl: '/src/assets/project-1.png',
            categoryEn: enTranslations.portfolio.projects.banking.category,
            categoryAr: arTranslations.portfolio.projects.banking.category,
            titleEn: enTranslations.portfolio.projects.banking.title,
            titleAr: arTranslations.portfolio.projects.banking.title,
            descriptionEn: enTranslations.portfolio.projects.banking.desc,
            descriptionAr: arTranslations.portfolio.projects.banking.desc,
            featured: true,
            published: true,
        },
    ];

    await db.insert(schema.projects).values(projectsData);
    console.log(`✅ Seeded ${projectsData.length} projects`);
}

async function seedTestimonials() {
    console.log('Seeding testimonials...');

    const testimonialsData = [1, 2, 3].map((num, index) => ({
        order: index + 1,
        quoteEn: enTranslations.home.trust.testimonials[num].quote,
        quoteAr: arTranslations.home.trust.testimonials[num].quote,
        authorEn: enTranslations.home.trust.testimonials[num].author,
        authorAr: arTranslations.home.trust.testimonials[num].author,
        roleEn: enTranslations.home.trust.testimonials[num].role,
        roleAr: arTranslations.home.trust.testimonials[num].role,
        rating: enTranslations.home.trust.testimonials[num].rating,
        published: true,
    }));

    await db.insert(schema.testimonials).values(testimonialsData);
    console.log(`✅ Seeded ${testimonialsData.length} testimonials`);
}

async function seedWhyShokaPoints() {
    console.log('Seeding Why Shoka points...');

    const points = [
        { key: 'business_first', icon: 'Target', order: 1 },
        { key: 'rapid_prototyping', icon: 'Zap', order: 2 },
        { key: 'modern_stack', icon: 'Layers', order: 3 },
        { key: 'ai_driven', icon: 'Cpu', order: 4 },
        { key: 'engineering_precision', icon: 'Lock', order: 5 },
    ];

    const pointsData = points.map((point) => ({
        order: point.order,
        iconName: point.icon,
        titleEn: enTranslations.home.why_shoka.points[point.key].title,
        titleAr: arTranslations.home.why_shoka.points[point.key].title,
        descriptionEn: enTranslations.home.why_shoka.points[point.key].desc,
        descriptionAr: arTranslations.home.why_shoka.points[point.key].desc,
        published: true,
    }));

    await db.insert(schema.whyShokaPoints).values(pointsData);
    console.log(`✅ Seeded ${pointsData.length} Why Shoka points`);
}

async function seedProcessSteps() {
    console.log('Seeding process steps...');

    const steps = ['discover', 'design', 'build', 'launch', 'scale'];

    const stepsData = steps.map((step, index) => ({
        order: index + 1,
        stepNumber: `0${index + 1}`,
        titleEn: enTranslations.home.process.steps[step].title,
        titleAr: arTranslations.home.process.steps[step].title,
        descriptionEn: enTranslations.home.process.steps[step].desc,
        descriptionAr: arTranslations.home.process.steps[step].desc,
    }));

    await db.insert(schema.processSteps).values(stepsData);
    console.log(`✅ Seeded ${stepsData.length} process steps`);
}

async function seedInsightTopics() {
    console.log('Seeding insight topics...');

    const topicsData = [1, 2, 3].map((num, index) => ({
        order: index + 1,
        titleEn: enTranslations.home.insights.topics[num].title,
        titleAr: arTranslations.home.insights.topics[num].title,
        descriptionEn: enTranslations.home.insights.topics[num].desc,
        descriptionAr: arTranslations.home.insights.topics[num].desc,
        readTimeEn: enTranslations.home.insights.topics[num].readTime,
        readTimeAr: arTranslations.home.insights.topics[num].readTime,
        published: true,
    }));

    await db.insert(schema.insightTopics).values(topicsData);
    console.log(`✅ Seeded ${topicsData.length} insight topics`);
}

async function main() {
    console.log('🌱 Starting database seed...\n');

    try {
        await seedHeroSlides();
        await seedStats();
        await seedServices();
        await seedProjects();
        await seedTestimonials();
        await seedWhyShokaPoints();
        await seedProcessSteps();
        await seedInsightTopics();

        console.log('\n✅ Database seeding completed successfully!');
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        throw error;
    } finally {
        await pool.end();
    }
}

main();
