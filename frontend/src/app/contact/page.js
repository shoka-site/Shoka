'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [state, setState] = useState({ loading: false, message: '' });

  async function onSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    setState({ loading: true, message: '' });
    const res = await fetch('http://localhost:4000/api/leads', {
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
      message: res.ok ? 'تم إرسال طلبك بنجاح.' : 'حدث خطأ، حاول مرة أخرى.'
    });

    if (res.ok) event.currentTarget.reset();
  }

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold text-brand-900">تواصل معنا</h1>
      <form className="card grid gap-4" onSubmit={onSubmit}>
        <input className="input" name="name" placeholder="الاسم" required />
        <input className="input" name="email" type="email" placeholder="البريد الإلكتروني" required />
        <input className="input" name="phone" placeholder="رقم الجوال" />
        <select className="input" name="inquiry_type" required>
          <option value="">نوع الطلب</option>
          <option>Service Request</option>
          <option>Proposal Request</option>
          <option>General Contact</option>
        </select>
        <input className="input" name="selected_service" placeholder="الخدمة المطلوبة" />
        <textarea className="input min-h-32" name="message" placeholder="اكتب تفاصيل طلبك" required />
        <button className="btn-primary w-fit" disabled={state.loading} type="submit">
          {state.loading ? 'جارٍ الإرسال...' : 'إرسال'}
        </button>
        {state.message && <p className="text-sm text-slate-600">{state.message}</p>}
      </form>
    </section>
  );
}
