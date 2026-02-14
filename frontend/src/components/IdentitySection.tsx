'use client';

import { motion } from 'framer-motion';
import { Users, Code, Handshake, Lightbulb } from 'lucide-react';

const identityPoints = [
    {
        icon: <Code className="w-8 h-8 text-brand-400" />,
        title: "تميز هندسي",
        description: "نلتزم بأعلى معايير الجودة في تطوير البرمجيات، مع التركيز على الكفاءة، القابلية للتوسع، والأمان."
    },
    {
        icon: <Users className="w-8 h-8 text-accent" />,
        title: "ثقافة محورها الإنسان",
        description: "نؤمن بأن التكنولوجيا تخدم الناس. فريقنا المتنوع يجمع بين الخبرة والشغف لبناء حلول ذات أثر حقيقي."
    },
    {
        icon: <Handshake className="w-8 h-8 text-green-400" />,
        title: "شراكة استراتيجية",
        description: "لا نكتفي بتنفيذ المشاريع، بل نعمل كشريك تقني طويل الأمد نساعدك في تحقيق أهدافك التجارية."
    },
    {
        icon: <Lightbulb className="w-8 h-8 text-yellow-400" />,
        title: "ابتكار مستمر",
        description: "نواكب أحدث التقنيات الناشئة لنقدم لعملائنا ميزة تنافسية وحلولاً سابقة لعصرها."
    }
];

export default function IdentitySection() {
    return (
        <section className="relative py-24 bg-dark-bg overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-brand-600/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl" />
            </div>

            <div className="container-shell relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-sm font-bold tracking-wider text-brand-500 uppercase mb-4">
                            هويتنا
                        </h2>
                        <h3 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                            نحن أكثر من مجرد <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-l from-brand-400 to-white">
                                شركة برمجيات
                            </span>
                        </h3>
                        <p className="text-lg text-slate-300 leading-relaxed mb-8">
                            في عالم يتسارع فيه التطور التقني، نمثل الجسر الذي يربط بين الرؤى الطموحة والواقع الرقمي.
                            نحن مجتمع من المبدعين والمهندسين الشغوفين بصناعة الفارق.
                        </p>

                        <div className="flex gap-8 border-t border-white/10 pt-8 mt-8">
                            <div>
                                <span className="block text-3xl font-bold text-white mb-1">+10</span>
                                <span className="text-sm text-slate-400">سنوات خبرة</span>
                            </div>
                            <div>
                                <span className="block text-3xl font-bold text-white mb-1">+50</span>
                                <span className="text-sm text-slate-400">مشروع ناجح</span>
                            </div>
                            <div>
                                <span className="block text-3xl font-bold text-white mb-1">100%</span>
                                <span className="text-sm text-slate-400">التزام بالجودة</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Cards Grid */}
                    <div className="grid sm:grid-cols-2 gap-6">
                        {identityPoints.map((point, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="glass-panel p-6 rounded-2xl hover:bg-white/5 transition-colors border border-white/5 hover:border-brand-500/30 group"
                            >
                                <div className="mb-4 p-3 bg-white/5 rounded-xl w-fit group-hover:scale-110 transition-transform duration-300">
                                    {point.icon}
                                </div>
                                <h4 className="text-xl font-bold text-white mb-3 group-hover:text-brand-300 transition-colors">
                                    {point.title}
                                </h4>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    {point.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}
