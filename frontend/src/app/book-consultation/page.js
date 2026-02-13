'use client';

import { useState } from 'react';

export default function BookingPage() {
  const [state, setState] = useState({ loading: false, message: '' });

  async function onSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    setState({ loading: true, message: '' });
    const res = await fetch('http://localhost:4000/api/bookings', {
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
      message: res.ok ? 'تم حجز الاستشارة، سيتم التواصل معك قريبًا.' : 'تعذر إتمام الحجز.'
    });

    if (res.ok) event.currentTarget.reset();
  }

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold text-brand-900">حجز استشارة</h1>
      <form className="card grid gap-4 md:grid-cols-2" onSubmit={onSubmit}>
        <input className="input" name="name" placeholder="الاسم" required />
        <input className="input" type="email" name="email" placeholder="البريد الإلكتروني" required />
        <input className="input" type="date" name="date" required />
        <input className="input" type="time" name="time" required />
        <select className="input md:col-span-2" name="service_type" required>
          <option value="">اختر نوع الخدمة</option>
          <option>AI Solutions</option>
          <option>Intelligent Automation</option>
          <option>Data & Analytics</option>
          <option>Cloud Systems</option>
          <option>Startup MVP</option>
        </select>
        <button className="btn-primary w-fit" disabled={state.loading} type="submit">
          {state.loading ? 'جارٍ الحجز...' : 'تأكيد الحجز'}
        </button>
        {state.message && <p className="text-sm text-slate-600 md:col-span-2">{state.message}</p>}
      </form>
    </section>
  );
}
