'use client';

import { useState } from 'react';
import { Calendar, Clock, CheckCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

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
    <section className="min-h-screen bg-shoka-ivory">
      <div className="pt-32 pb-12 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-shoka-sand/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />

        <div className="container-shell relative z-10 text-center max-w-2xl mx-auto px-4">
          <Link href="/contact" className="inline-flex items-center gap-2 text-shoka-clay/80 hover:text-shoka-clay mb-6 text-sm font-medium transition-colors">
            <ArrowLeft size={16} /> العودة للتواصل
          </Link>
          <h1 className="heading-premium text-4xl md:text-5xl mb-4">
            احجز <span className="text-shoka-clay">استشارة</span>
          </h1>
          <p className="text-body-premium">
            خطوة واحدة تفصلك عن تحقيق رؤيتك الرقمية. حدد موعداً للتحدث مع خبرائنا.
          </p>
        </div>
      </div>

      <div className="section-wrapper pt-0 pb-20">
        <div className="container-shell max-w-3xl mx-auto">
          <div className="bg-white p-8 lg:p-12 rounded-3xl shadow-premium border border-shoka-dark/5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-shoka-clay via-shoka-sand to-shoka-clay" />

            <form className="space-y-8" onSubmit={onSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-shoka-dark">الاسم الكامل</label>
                  <input className="input-premium w-full" name="name" placeholder="الاسم هنا" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-shoka-dark">البريد الإلكتروني</label>
                  <input className="input-premium w-full" name="email" type="email" placeholder="email@example.com" required />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-shoka-dark flex items-center gap-2">
                    <Calendar size={16} className="text-shoka-clay" /> التاريخ المفضل
                  </label>
                  <input className="input-premium w-full" type="date" name="date" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-shoka-dark flex items-center gap-2">
                    <Clock size={16} className="text-shoka-clay" /> الوقت المفضل
                  </label>
                  <input className="input-premium w-full" type="time" name="time" required />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-shoka-dark">موضوع الاستشارة</label>
                <select className="input-premium w-full appearance-none" name="service_type" required>
                  <option value="">اختر الخدمة المطلوبة...</option>
                  <option value="AI Solutions">حلول الذكاء الاصطناعي</option>
                  <option value="Process Automation">أتمتة العمليات</option>
                  <option value="Data Analytics">تحليل البيانات</option>
                  <option value="Cloud Infrastructure">البنية التحتية السحابية</option>
                  <option value="Digital Transformation">استشارات التحول الرقمي</option>
                </select>
              </div>

              <div className="pt-4 border-t border-shoka-dark/5">
                <button className="btn-secondary w-full group flex items-center justify-center gap-3 text-lg" disabled={state.loading} type="submit">
                  {state.loading ? 'جارٍ تأكيد الحجز...' : (
                    <>
                      تأكيد الموعد
                      <CheckCircle size={20} className="group-hover:scale-110 transition-transform" />
                    </>
                  )}
                </button>
              </div>

              {state.message && (
                <div className={`p-4 rounded-xl text-sm text-center font-medium ${state.message.includes('بنجاح') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                  {state.message}
                </div>
              )}
            </form>
          </div>

          <p className="text-center text-sm text-shoka-dark/40 mt-6">
            جميع المواعيد تخضع للتأكيد النهائي من قبل فريقنا. سيتم إرسال رابط الاجتماع عبر البريد الإلكتروني.
          </p>
        </div>
      </div>
    </section>
  );
}
