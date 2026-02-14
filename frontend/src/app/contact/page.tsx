'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import PageHeader from '@/components/PageHeader';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
  const [state, setState] = useState({ loading: false, message: '' });

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    setState({ loading: true, message: '' });
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.get('name'),
          email: form.get('email'),
          phone: form.get('phone'),
          inquiry_type: form.get('inquiry_type'),
          selected_service: form.get('selected_service'),
          message: form.get('message')
        })
      });

      setState({
        loading: false,
        message: res.ok ? 'تم إرسال طلبك بنجاح. سنتواصل معك قريباً.' : 'حدث خطأ غير متوقع، يرجى المحاولة مرة أخرى.'
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
          title="تواصل معنا"
          description="نحن هنا لمساعدتك. سواء كان لديك استفسار أو يرغب في بدء مشروع جديد، يسعدنا سماع صوتك."
        />

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="glass-panel p-8 rounded-2xl space-y-6">
              <h3 className="text-2xl font-bold text-white">معلومات الاتصال</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-slate-300">
                  <div className="h-12 w-12 rounded-xl bg-brand-500/10 flex items-center justify-center text-brand-400">
                    <Mail size={20} />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">البريد الإلكتروني</div>
                    <div className="font-medium">info@ssplatform.com</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-slate-300">
                  <div className="h-12 w-12 rounded-xl bg-brand-500/10 flex items-center justify-center text-brand-400">
                    <Phone size={20} />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">الهاتف</div>
                    <div className="font-medium">+964 780 000 0000</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-slate-300">
                  <div className="h-12 w-12 rounded-xl bg-brand-500/10 flex items-center justify-center text-brand-400">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">الموقع</div>
                    <div className="font-medium">بغداد، العراق - شارع الكندي</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form className="glass-panel p-8 rounded-2xl space-y-4" onSubmit={onSubmit}>
              <h3 className="text-2xl font-bold text-white mb-6">أرسل لنا رسالة</h3>

              <div className="grid md:grid-cols-2 gap-4">
                <input className="input" name="name" placeholder="الاسم الكامل" required />
                <input className="input" name="email" type="email" placeholder="البريد الإلكتروني" required />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <input className="input" name="phone" placeholder="رقم الجوال" />
                <select className="input text-slate-400" name="inquiry_type" required>
                  <option value="" className="bg-slate-800">نوع الطلب</option>
                  <option value="Service Request" className="bg-slate-800">طلب خدمة</option>
                  <option value="Proposal Request" className="bg-slate-800">طلب عرض سعر</option>
                  <option value="General Contact" className="bg-slate-800">استفسار عام</option>
                </select>
              </div>

              <input className="input" name="selected_service" placeholder="اسم الخدمة (اختياري)" />
              <textarea className="input min-h-[150px]" name="message" placeholder="اكتب تفاصيل طلبك هنا..." required />

              <button className="btn-primary w-full group" disabled={state.loading} type="submit">
                {state.loading ? 'جارٍ الإرسال...' : (
                  <span className="flex items-center gap-2">
                    إرسال الرسالة
                    <Send size={18} className="group-hover:-translate-x-1 transition-transform" />
                  </span>
                )}
              </button>

              {state.message && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl text-sm ${state.message.includes('نجاح') ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}
                >
                  {state.message}
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
