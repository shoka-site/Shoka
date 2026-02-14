'use client';

import PageHeader from '@/components/PageHeader';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <section className="section-alt min-h-screen">
      <div className="container-shell">
        <PageHeader
          title="من نحن"
          description="نحن منصة رائدة تجمع بين حلول التكنولوجيا الذكية والتعليم التقني المتقدم."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="glass-panel relative overflow-hidden rounded-3xl p-8 lg:p-12"
        >
          <div className="relative z-10 max-w-4xl mx-auto space-y-8 text-lg leading-relaxed text-slate-300">
            <p>
              نحن نؤمن بأن المستقبل يُبنى بالابتكار والمعرفة. رؤيتنا هي تمكين الشركات والأفراد من خلال أحدث تقنيات الذكاء الاصطناعي وهندسة البرمجيات.
            </p>

            <div className="grid md:grid-cols-2 gap-8 my-12">
              <div className="p-6 rounded-2xl bg-brand-500/5 border border-brand-500/10">
                <h3 className="text-xl font-bold text-white mb-4">ماذا نقدم؟</h3>
                <p className="text-sm">
                  نقدم استشارات تقنية، حلول برمجية مخصصة، وتدريب احترافي يركز على التطبيق العملي وبناء المهارات المطلوبة في السوق.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-accent/5 border border-accent/10">
                <h3 className="text-xl font-bold text-white mb-4">لمن نتوجه؟</h3>
                <p className="text-sm">
                  نركز على الشركات الناشئة، المؤسسات الكبيرة التي تسعى للتحول الرقمي، والأفراد الطموحين الراغبين في دخول عالم التقنية.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-4">ركائز استراتيجيتنا:</h3>
              <ul className="grid gap-4 md:grid-cols-3">
                {[
                  'استجابة سريعة ونمذجة أولية',
                  'تسليم Agile ونتائج قابلة للقياس',
                  'تركيز على ROI والكفاءة'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 bg-slate-800/50 p-4 rounded-xl border border-white/5">
                    <div className="h-2 w-2 rounded-full bg-brand-400" />
                    <span className="text-sm font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
