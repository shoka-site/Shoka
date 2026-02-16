import { storage } from './storage';

// Initialize in-memory storage with data from translation files
// This runs on server start to populate the storage
export async function initializeStorage() {
    console.log('🌱 Initializing storage with default data...');

    try {
        // Hero Slides
        const existingSlides = await storage.getHeroSlides();
        if (existingSlides.length === 0) {
            console.log('  Creating default Hero Slides...');
            await storage.createHeroSlide({
                order: 1,
                imageUrl: '/src/assets/hero-meso-1.png',
                badgeEn: 'Intelligent Digital Systems',
                badgeAr: 'أنظمة رقمية ذكية',
                titleEn: 'Designing Intelligent Digital Systems',
                titleAr: 'تصميم أنظمة رقمية ذكية',
                descriptionEn: 'Shoka blends modern AI, cloud, and data solutions with the stability and wisdom of deep roots.',
                descriptionAr: 'تمزج شوكة حلول الذكاء الاصطناعي والسحابة والبيانات الحديثة مع الاستقرار والحكمة من الجذور العميقة.',
                published: true,
            });

            await storage.createHeroSlide({
                order: 2,
                imageUrl: '/src/assets/hero-meso-2.png',
                badgeEn: 'Infrastructure & Cloud',
                badgeAr: 'البنية التحتية والسحابة',
                titleEn: 'Building Resilient Systems for Growth.',
                titleAr: 'بناء أنظمة مرنة للنمو.',
                descriptionEn: 'Scalable infrastructure designed to adapt and evolve with your business needs.',
                descriptionAr: 'بنية تحتية قابلة للتوسع مصممة للتكيف والتطور مع احتياجات عملك.',
                published: true,
            });

            await storage.createHeroSlide({
                order: 3,
                imageUrl: '/src/assets/hero-meso-3.png',
                badgeEn: 'Future-Proof Architecture',
                badgeAr: 'هندسة معمارية مستقبلية',
                titleEn: 'Pioneering AI Innovation globally.',
                titleAr: 'ريادة الابتكار في الذكاء الاصطناعي عالمياً.',
                descriptionEn: 'Empowering enterprises with cutting-edge artificial intelligence and machine learning.',
                descriptionAr: 'تمكين المؤسسات بالذكاء الاصطناعي والتعلم الآلي المتطور.',
                published: true,
            });
        }

        // Stats
        const existingStats = await storage.getStats();
        if (existingStats.length === 0) {
            console.log('  Creating default Stats...');
            await storage.createStat({ key: 'experience', numberEn: '15+', numberAr: '15+', labelEn: 'Years Combined Experience', labelAr: 'سنوات من الخبرة المجمعة', order: 1 });
            await storage.createStat({ key: 'projects', numberEn: '100+', numberAr: '100+', labelEn: 'Projects Delivered', labelAr: 'مشروع مُنجز', order: 2 });
            await storage.createStat({ key: 'clients', numberEn: '50+', numberAr: '50+', labelEn: 'Enterprise Clients', labelAr: 'عميل مؤسسي', order: 3 });
            await storage.createStat({ key: 'satisfaction', numberEn: '99.8%', numberAr: '99.8%', labelEn: 'Client Satisfaction', labelAr: 'رضا العملاء', order: 4 });
        }

        // Services
        const existingServices = await storage.getServices();
        if (existingServices.length === 0) {
            console.log('  Creating default Services...');
            await storage.createService({
                order: 1,
                iconName: 'Brain',
                titleEn: 'AI Solutions',
                titleAr: 'حلول الذكاء الاصطناعي',
                descriptionEn: 'Intelligent automation, AI integration, and smart systems.',
                descriptionAr: 'الأتمتة الذكية، تكامل الذكاء الاصطناعي، والأنظمة الذكية.',
                published: true,
            });

            await storage.createService({
                order: 2,
                iconName: 'Code',
                titleEn: 'Full Stack Development',
                titleAr: 'تطوير متكامل',
                descriptionEn: 'Scalable, high-performance web & system development.',
                descriptionAr: 'تطوير ويب وأنظمة عالية الأداء وقابلة للتوسع.',
                published: true,
            });

            await storage.createService({
                order: 3,
                iconName: 'Database',
                titleEn: 'Data & Analytics',
                titleAr: 'البيانات والتحليلات',
                descriptionEn: 'Transforming data into strategic decisions.',
                descriptionAr: 'تحويل البيانات إلى قرارات استراتيجية.',
                published: true,
            });

            await storage.createService({
                order: 4,
                iconName: 'Cloud',
                titleEn: 'Cloud Services',
                titleAr: 'الخدمات السحابية',
                descriptionEn: 'Secure, scalable cloud infrastructure & deployment.',
                descriptionAr: 'بنية تحتية سحابية آمنة وقابلة للتوسع ونشر.',
                published: true,
            });
        }

        // Projects
        const existingProjects = await storage.getProjects();
        if (existingProjects.length === 0) {
            console.log('  Creating default Projects...');
            await storage.createProject({
                order: 1,
                imageUrl: '/src/assets/project-1.png',
                categoryEn: 'AI & Cloud',
                categoryAr: 'الذكاء الاصطناعي والسحابة',
                titleEn: 'National Data Archive modernization',
                titleAr: 'تحديث الأرشيف الوطني للبيانات',
                descriptionEn: 'Digitizing 50 years of historical records into a secure, searchable cloud database.',
                descriptionAr: 'رقمنة 50 عامًا من السجلات التاريخية في قاعدة بيانات سحابية آمنة وقابلة للبحث.',
                featured: true,
                published: true,
            });

            await storage.createProject({
                order: 2,
                imageUrl: '/src/assets/project-1.png',
                categoryEn: 'Full Stack',
                categoryAr: 'تطوير متكامل',
                titleEn: 'Modern Banking Platform',
                titleAr: 'منصة مصرفية حديثة',
                descriptionEn: 'Secure, scalable banking solution with real-time transactions.',
                descriptionAr: 'حل مصرفي آمن وقابل للتوسع مع معاملات في الوقت الفعلي.',
                featured: true,
                published: true,
            });
        }

        // Testimonials
        const existingTestimonials = await storage.getTestimonials();
        if (existingTestimonials.length === 0) {
            console.log('  Creating default Testimonials...');
            await storage.createTestimonial({
                order: 1,
                quoteEn: 'Shoka transformed our legacy infrastructure into a modern, scalable cloud platform. Their expertise in AI integration was exceptional.',
                quoteAr: 'حولت شوكة بنيتنا التحتية القديمة إلى منصة سحابية حديثة وقابلة للتوسع. خبرتهم في تكامل الذكاء الاصطناعي كانت استثنائية.',
                authorEn: 'Amira Hassan',
                authorAr: 'أميرة حسن',
                roleEn: 'CTO, National Data Systems',
                roleAr: 'المدير التقني، أنظمة البيانات الوطنية',
                rating: 5,
                published: true,
            });

            await storage.createTestimonial({
                order: 2,
                quoteEn: 'Working with Shoka was a game-changer. They delivered a complex full-stack solution ahead of schedule with remarkable precision.',
                quoteAr: 'العمل مع شوكة كان نقلة نوعية. قدموا حلاً متكاملاً معقداً قبل الموعد المحدد بدقة ملحوظة.',
                authorEn: 'Omar Al-Rashid',
                authorAr: 'عمر الرشيد',
                roleEn: 'VP Engineering, Modern Banking Corp',
                roleAr: 'نائب الرئيس للهندسة، شركة الخدمات المصرفية الحديثة',
                rating: 5,
                published: true,
            });

            await storage.createTestimonial({
                order: 3,
                quoteEn: 'Their AI-driven approach to solving our data challenges exceeded all expectations. True engineering excellence.',
                quoteAr: 'نهجهم المدفوع بالذكاء الاصطناعي لحل تحديات البيانات لدينا فاق كل التوقعات. تميز هندسي حقيقي.',
                authorEn: 'Layla Ibrahim',
                authorAr: 'ليلى إبراهيم',
                roleEn: 'Director of Innovation, Smart City Initiative',
                roleAr: 'مديرة الابتكار، مبادرة المدينة الذكية',
                rating: 5,
                published: true,
            });
        }

        // Why Shoka Points
        const existingPoints = await storage.getWhyShokaPoints();
        if (existingPoints.length === 0) {
            console.log('  Creating default Why Shoka points...');
            await storage.createWhyShokaPoint({
                order: 1,
                iconName: 'Target',
                titleEn: 'Business-First Solutions',
                titleAr: 'حلول تركز على الأعمال أولاً',
                descriptionEn: 'Technology serves your goals, not the other way around.',
                descriptionAr: 'التكنولوجيا تخدم أهدافك، وليس العكس.',
                published: true,
            });

            await storage.createWhyShokaPoint({
                order: 2,
                iconName: 'Zap',
                titleEn: 'Rapid Prototyping',
                titleAr: 'نماذج أولية سريعة',
                descriptionEn: 'Fast iteration cycles to validate ideas before full-scale development.',
                descriptionAr: 'دورات تكرار سريعة للتحقق من الأفكار قبل التطوير الكامل.',
                published: true,
            });

            await storage.createWhyShokaPoint({
                order: 3,
                iconName: 'Layers',
                titleEn: 'Modern Technology Stack',
                titleAr: 'تقنيات حديثة',
                descriptionEn: 'Latest tools and frameworks that ensure longevity and performance.',
                descriptionAr: 'أحدث الأدوات والأطر التي تضمن طول العمر والأداء.',
                published: true,
            });

            await storage.createWhyShokaPoint({
                order: 4,
                iconName: 'Cpu',
                titleEn: 'AI-Driven Mindset',
                titleAr: 'عقلية مدفوعة بالذكاء الاصطناعي',
                descriptionEn: 'Intelligence embedded in every solution we architect.',
                descriptionAr: 'الذكاء مدمج في كل حل نصممه.',
                published: true,
            });

            await storage.createWhyShokaPoint({
                order: 5,
                iconName: 'Lock',
                titleEn: 'Engineering Precision',
                titleAr: 'دقة هندسية',
                descriptionEn: 'Meticulous attention to detail in every line of code.',
                descriptionAr: 'اهتمام دقيق بالتفاصيل في كل سطر من التعليمات البرمجية.',
                published: true,
            });
        }

        // Process Steps
        const existingSteps = await storage.getProcessSteps();
        if (existingSteps.length === 0) {
            console.log('  Creating default Process Steps...');
            await storage.createProcessStep({ order: 1, stepNumber: '01', titleEn: 'Discover', titleAr: 'اكتشاف', descriptionEn: 'Understanding your business, challenges, and objectives.', descriptionAr: 'فهم عملك وتحدياتك وأهدافك.' });
            await storage.createProcessStep({ order: 2, stepNumber: '02', titleEn: 'Design', titleAr: 'تصميم', descriptionEn: 'Architecting solutions that align with your vision.', descriptionAr: 'هندسة الحلول التي تتماشى مع رؤيتك.' });
            await storage.createProcessStep({ order: 3, stepNumber: '03', titleEn: 'Build', titleAr: 'بناء', descriptionEn: 'Engineering robust, scalable systems with precision.', descriptionAr: 'هندسة أنظمة قوية وقابلة للتوسع بدقة.' });
            await storage.createProcessStep({ order: 4, stepNumber: '04', titleEn: 'Launch', titleAr: 'إطلاق', descriptionEn: 'Deploying and validating in production environments.', descriptionAr: 'النشر والتحقق في بيئات الإنتاج.' });
            await storage.createProcessStep({ order: 5, stepNumber: '05', titleEn: 'Scale', titleAr: 'توسيع', descriptionEn: 'Continuous optimization and growth enablement.', descriptionAr: 'التحسين المستمر وتمكين النمو.' });
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
