import { storage } from './storage';

// Initialize in-memory storage with data from translation files
// This runs on server start to populate the storage
export async function initializeStorage() {
    console.log('🌱 Initializing storage with default data...');

    try {
        // Services
        const existingServices = await storage.getServices();
        if (existingServices.length === 0) {
            console.log('  Creating default Services...');
            await storage.createService({
                order: 1,
                type: 'Other',
                titleEn: 'AI Solutions',
                titleAr: 'حلول الذكاء الاصطناعي',
                descriptionEn: 'Intelligent automation, AI integration, and smart systems.',
                descriptionAr: 'الأتمتة الذكية، تكامل الذكاء الاصطناعي، والأنظمة الذكية.',
                published: true,
            });

            await storage.createService({
                order: 2,
                type: 'Other',
                titleEn: 'Full Stack Development',
                titleAr: 'تطوير متكامل',
                descriptionEn: 'Scalable, high-performance web & system development.',
                descriptionAr: 'تطوير ويب وأنظمة عالية الأداء وقابلة للتوسع.',
                published: true,
            });

            await storage.createService({
                order: 3,
                type: 'Other',
                titleEn: 'Data & Analytics',
                titleAr: 'البيانات والتحليلات',
                descriptionEn: 'Transforming data into strategic decisions.',
                descriptionAr: 'تحويل البيانات إلى قرارات استراتيجية.',
                published: true,
            });

            await storage.createService({
                order: 4,
                type: 'Other',
                titleEn: 'Cloud Services',
                titleAr: 'الخدمات السحابية',
                descriptionEn: 'Secure, scalable cloud infrastructure & deployment.',
                descriptionAr: 'بنية تحتية سحابية آمنة وقابلة للتوسع ونشر.',
                published: true,
            });
        }


        console.log('✅ Storage initialized successfully!');
    } catch (error) {
        console.error('❌ Error initializing storage:', error);
    }
}
