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

        // Insight Topics
        const existingTopics = await storage.getInsightTopics();
        if (existingTopics.length === 0) {
            console.log('  Creating default Insight Topics...');
            await storage.createInsightTopic({
                order: 1,
                titleEn: 'The Future of AI in Modern Infrastructure',
                titleAr: 'مستقبل الذكاء الاصطناعي في البنية التحتية الحديثة',
                descriptionEn: 'Exploring how artificial intelligence is reshaping enterprise systems and cloud architecture.',
                descriptionAr: 'استكشاف كيفية إعادة تشكيل الذكاء الاصطناعي لأنظمة المؤسسات وهندسة السحابة.',
                readTimeEn: '5 min read',
                readTimeAr: 'قراءة 5 دقائق',
                published: true,
            });

            await storage.createInsightTopic({
                order: 2,
                titleEn: 'Building Resilient Cloud Systems',
                titleAr: 'بناء أنظمة سحابية مرنة',
                descriptionEn: 'Best practices for designing fault-tolerant, scalable cloud infrastructure that grows with your business.',
                descriptionAr: 'أفضل الممارسات لتصميم بنية تحتية سحابية متسامحة مع الأخطاء وقابلة للتوسع تنمو مع عملك.',
                readTimeEn: '7 min read',
                readTimeAr: 'قراءة 7 دقائق',
                published: true,
            });

            await storage.createInsightTopic({
                order: 3,
                titleEn: 'Data-Driven Decision Making',
                titleAr: 'اتخاذ القرارات القائمة على البيانات',
                descriptionEn: 'Transforming raw data into actionable insights through advanced analytics and machine learning.',
                descriptionAr: 'تحويل البيانات الخام إلى رؤى قابلة للتنفيذ من خلال التحليلات المتقدمة والتعلم الآلي.',
                readTimeEn: '6 min read',
                readTimeAr: 'قراءة 6 دقائق',
                published: true,
            });
        }

        console.log('✅ Storage initialized successfully!');
    } catch (error) {
        console.error('❌ Error initializing storage:', error);
    }
}
