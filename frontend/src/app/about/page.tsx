import { Target, Users, Shield, Zap } from 'lucide-react';

export default function AboutPage() {
  return (
    <section className="min-h-screen bg-shoka-ivory">
      {/* Hero Section */}
      <div className="pt-32 pb-20 bg-shoka-ivory relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-shoka-sand/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />

        <div className="container-shell relative z-10 text-center max-w-4xl mx-auto">
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-shoka-clay bg-shoka-clay/5 rounded-full border border-shoka-clay/10">
            قصتنا
          </span>
          <h1 className="heading-premium text-5xl md:text-7xl mb-8">
            الجذور العميقة <br />
            <span className="text-shoka-clay">والرؤية المستقبلية</span>
          </h1>
          <p className="text-body-premium max-w-2xl mx-auto">
            من قلب الحضارة، ننطلق نحو المستقبل. نحن مؤسسة تقنية تدمج بين أصالة التراث العراقي وأحدث ابتكارات العصر الرقمي.
          </p>
        </div>
      </div>

      {/* Narrative Section */}
      <div className="section-wrapper bg-white">
        <div className="container-shell grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-shoka-sand/5 border border-shoka-dark/5 relative">
              <div className="absolute inset-0 bg-[url('/architectural-pattern.svg')] opacity-30 mix-blend-multiply" />
              {/* Placeholder for "Heritage x Future" Visual */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 border-2 border-shoka-clay/20 rounded-full" />
                <div className="absolute w-64 h-64 border border-shoka-dark/10 rounded-full" />
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="heading-premium text-4xl mb-6">هوية شوكا (Shoka)</h2>
            <div className="space-y-6 text-body-premium">
              <p>
                استوحينا اسم "شوكا" من عمق التاريخ، ليعكس القوة والاستقرار. نحن لا نبني مجرد برمجيات، بل نبني أنظمة رقمية ذكية تصمد أمام اختبار الزمن.
              </p>
              <p>
                رؤيتنا تتجاوز الحلول التقليدية؛ نحن نسعى لتمكين المؤسسات العراقية والعالمية من تبني الذكاء الاصطناعي والأتمتة كجزء أساسي من هويتهم التشغيلية، وليس مجرد أدوات إضافية.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Values Grid */}
      <div className="py-24 bg-shoka-ivory relative border-t border-shoka-dark/5">
        <div className="container-shell">
          <div className="text-center mb-16">
            <h2 className="heading-premium text-3xl mb-4">قيمنا الجوهرية</h2>
            <p className="text-text-secondary max-w-2xl mx-auto">المبادئ التي تقود كل سطر برمجي نكتبه وكل قرار نتخذه.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Target, title: 'الدقة المتناهية', desc: 'نلتزم بأعلى معايير الجودة في كل تفصيل.' },
              { icon: Zap, title: 'الابتكار المستمر', desc: 'نتحرك بسرعة السوق، ولكن بثبات الخبرة.' },
              { icon: Shield, title: 'الموثوقية', desc: 'نبني علاقات شراكة طويلة الأمد مبنية على الثقة.' },
              { icon: Users, title: 'التمكين', desc: 'نجاح شركائنا هو المعيار الحقيقي لنجاحنا.' },
            ].map((val, i) => (
              <div key={i} className="card-premium text-center p-8 hover:-translate-y-2 transition-transform duration-300">
                <div className="w-14 h-14 mx-auto bg-shoka-sand/20 text-shoka-clay rounded-2xl flex items-center justify-center mb-6">
                  <val.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-shoka-dark mb-3">{val.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
