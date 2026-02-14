'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import PageHeader from '@/components/PageHeader';
import { Calendar, Clock, CheckCircle } from 'lucide-react';

export default function BookingPage() {
  const [state, setState] = useState({ loading: false, message: '' });

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    setState({ loading: true, message: '' });
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.get('name'),
          email: form.get('email'),
          date: form.get('date'),
          time: form.get('time'),
          service_type: form.get('service_type')
        })
      });

      setState({
        loading: false,
        message: res.ok ? 'تم حجز الاستشارة بنجاح. سنرسل لك تفاصيل الموعد عبر البريد.' : 'تعذر إتمام الحجز، يرجى التحقق من البيانات.'
      });

      if (res.ok) event.currentTarget.reset();
    } catch (e) {
      setState({ loading: false, message: 'فشل الاتصال بالخادم.' });
    }
  }

  return (
    <section className="section-alt min-h-screen">
      <div className="container-shell">
        <PageHeader
          title="احجز استشارة"
          description="خطوة واحدة تفصلك عن تحقيق رؤيتك الرقمية. حدد موعداً للتحدث مع خبرائنا."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="glass-panel mx-auto max-w-2xl p-8 rounded-2xl relative overflow-hidden"
        >
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 blur-[50px] rounded-bl-full" />

        <form className="relative z-10 space-y-6" onSubmit={onSubmit}>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">الاسم الكامل</label>
              <input className="input" name="name" placeholder="محمد علي" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">البريد الإلكتروني</label>
              <input className="input" type="email" name="email" placeholder="email@example.com" required />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <Calendar size={16} className="text-brand-400" />
                التاريخ المفضل
              </label>
              <input className="input" type="date" name="date" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <Clock size={16} className="text-brand-400" />
                الوقت المفضل
              </label>
              <input className="input" type="time" name="time" required />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">نوع الخدمة / الموضوع</label>
            <select className="input text-slate-400" name="service_type" required>
              <option value="" className="bg-slate-800">اختر من القائمة...</option>
              <option value="AI Solutions" className="bg-slate-800">حلول الذكاء الاصطناعي</option>
              <option value="Intelligent Automation" className="bg-slate-800">أتمتة الأعمال</option>
              <option value="Data & Analytics" className="bg-slate-800">تحليل البيانات</option>
              <option value="Cloud Systems" className="bg-slate-800">الأنظمة السحابية</option>
              <option value="Startup MVP" className="bg-slate-800">تطوير MVP للشركات الناشئة</option>
            </select>
          </div>

          <button className="btn-primary w-full group mt-4" disabled={state.loading} type="submit">
            {state.loading ? 'جارٍ تأكيد الحجز...' : (
              <span className="flex items-center gap-2">
                تأكيد الموعد
                <CheckCircle size={18} className="group-hover:scale-110 transition-transform" />
              </span>
            )}
          </button>

          {state.message && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className={`p-4 rounded-xl text-sm text-center ${state.message.includes('بنجاح') ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}
            >
              {state.message}
            </motion.div>
          )}
        </form>
      </motion.div>
      </div>
    </section>
  );
}
