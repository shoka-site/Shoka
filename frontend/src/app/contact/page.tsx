'use client';

import { useState } from 'react';
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
    <section className="min-h-screen bg-shoka-ivory">
      <div className="pt-32 pb-16 bg-shoka-ivory relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-shoka-sand/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />

        <div className="container-shell relative z-10 text-center max-w-4xl mx-auto">
          <h1 className="heading-premium text-5xl md:text-6xl mb-6">
            تواصل <span className="text-shoka-clay">معنا</span>
          </h1>
          <p className="text-body-premium max-w-2xl mx-auto">
            نحن هنا لمساعدتك. سواء كان لديك استفسار أو ترغب في بدء رحلة تحول رقمي، فريقنا جاهز للاستماع.
          </p>
        </div>
      </div>

      <div className="section-wrapper bg-white">
        <div className="container-shell grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-shoka-sand/5 p-8 rounded-3xl border border-shoka-sand/20">
              <h3 className="heading-premium text-2xl mb-8">معلومات الاتصال</h3>
              <div className="space-y-8">
                {[
                  { icon: Mail, label: 'البريد الإلكتروني', value: 'hello@shoka.iq' },
                  { icon: Phone, label: 'الهاتف', value: '+964 780 000 0000' },
                  { icon: MapPin, label: 'الموقع', value: 'بغداد، المنصور - شارع 14 رمضان' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-soft flex items-center justify-center text-shoka-clay group-hover:bg-shoka-clay group-hover:text-white transition-colors duration-300">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-shoka-clay uppercase tracking-wider mb-1">{item.label}</div>
                      <div className="text-lg font-medium text-shoka-dark">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-shoka-dark p-8 rounded-3xl text-shoka-ivory relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-shoka-clay/20 rounded-full blur-2xl" />
              <h3 className="heading-premium text-white text-xl mb-4 relative z-10">هل تبحث عن استشارة فورية؟</h3>
              <p className="text-shoka-ivory/70 mb-6 relative z-10">يمكنك حجز موعد استشارة مجانية مع خبرائنا لمناقشة احتياجاتك.</p>
              <a href="/book-consultation" className="btn-secondary w-full text-center relative z-10">حجز استشارة الآن</a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 lg:p-10 rounded-3xl shadow-premium border border-shoka-dark/5">
            <h3 className="heading-premium text-2xl mb-8">أرسل لنا رسالة</h3>

            <form className="space-y-6" onSubmit={onSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-shoka-dark">الاسم الكامل</label>
                  <input className="input-premium w-full" name="name" placeholder="مثال: أحمد علي" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-shoka-dark">البريد الإلكتروني</label>
                  <input className="input-premium w-full" name="email" type="email" placeholder="ahmed@example.com" required />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-shoka-dark">رقم الهاتف</label>
                  <input className="input-premium w-full" name="phone" placeholder="07XX XXX XXXX" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-shoka-dark">نوع الاستفسار</label>
                  <select className="input-premium w-full appearance-none" name="inquiry_type" required>
                    <option value="">اختر نوع الطلب</option>
                    <option value="Service Request">طلب خدمة</option>
                    <option value="Partnership">شراكة</option>
                    <option value="General">استفسار عام</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-shoka-dark">الرسالة</label>
                <textarea className="input-premium w-full min-h-[150px]" name="message" placeholder="كيف يمكننا مساعدتك؟" required />
              </div>

              <button className="btn-primary w-full group flex items-center justify-center gap-2" disabled={state.loading} type="submit">
                {state.loading ? 'جارٍ الإرسال...' : (
                  <>
                    إرسال الرسالة
                    <Send size={18} className="group-hover:-translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              {state.message && (
                <div className={`p-4 rounded-xl text-sm ${state.message.includes('نجاح') ? 'bg-green-50 text-green-600 border border-green-200' : 'bg-red-50 text-red-600 border border-red-200'}`}>
                  {state.message}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
