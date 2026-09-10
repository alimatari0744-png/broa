import { useState, type FormEvent } from 'react'
import { useSite } from '../context/SiteContext'

const initialForm = {
  name: '',
  email: '',
  phone: '',
  serviceId: '',
  message: '',
}

export function ContactForm() {
  const { data } = useSite()
  const [form, setForm] = useState(initialForm)
  const [sent, setSent] = useState(false)

  function updateField(field: keyof typeof initialForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }))
    setSent(false)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const selectedService =
      data.services.find((service) => service.id === form.serviceId)?.title ??
      'غير محدد'

    const body = [
      `الاسم: ${form.name}`,
      `البريد: ${form.email}`,
      `الجوال: ${form.phone}`,
      `الخدمة: ${selectedService}`,
      '',
      'الرسالة:',
      form.message,
    ].join('\n')

    const mailto = `mailto:${data.company.email}?subject=${encodeURIComponent(
      `طلب تواصل — ${form.name}`,
    )}&body=${encodeURIComponent(body)}`

    window.location.href = mailto
    setSent(true)
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-form-head">
        <h3>أرسل استفسارك</h3>
        <p>عبّئ البيانات التالية وسنعاود التواصل معك في أقرب وقت.</p>
      </div>

      <div className="contact-form-grid">
        <label className="field">
          <span>الاسم</span>
          <input
            type="text"
            name="name"
            required
            autoComplete="name"
            placeholder="الاسم الكامل"
            value={form.name}
            onChange={(event) => updateField('name', event.target.value)}
          />
        </label>

        <label className="field">
          <span>البريد الإلكتروني</span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            dir="ltr"
            placeholder="name@example.com"
            value={form.email}
            onChange={(event) => updateField('email', event.target.value)}
          />
        </label>

        <label className="field">
          <span>رقم الجوال</span>
          <input
            type="tel"
            name="phone"
            required
            autoComplete="tel"
            dir="ltr"
            placeholder="05xxxxxxxx"
            value={form.phone}
            onChange={(event) => updateField('phone', event.target.value)}
          />
        </label>

        <label className="field">
          <span>الخدمة المطلوبة</span>
          <select
            name="service"
            required
            value={form.serviceId}
            onChange={(event) => updateField('serviceId', event.target.value)}
          >
            <option value="" disabled>
              اختر خدمة
            </option>
            {data.services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.title}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="field field-full">
        <span>نص الرسالة</span>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="اكتب تفاصيل طلبك أو استفسارك هنا"
          value={form.message}
          onChange={(event) => updateField('message', event.target.value)}
        />
      </label>

      <div className="contact-form-actions">
        <button type="submit" className="btn btn-gold">
          إرسال الرسالة
        </button>
        {sent ? (
          <p className="contact-form-hint">
            تم تجهيز الرسالة في برنامج البريد لديك.
          </p>
        ) : null}
      </div>
    </form>
  )
}
