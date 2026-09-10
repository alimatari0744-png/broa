import { useState, type FormEvent } from 'react'
import { useLanguage, useLocalizedSite } from '../context/LanguageContext'

const initialForm = {
  name: '',
  email: '',
  phone: '',
  serviceId: '',
  message: '',
}

export function ContactForm() {
  const { t } = useLanguage()
  const data = useLocalizedSite()
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
      t.formUnspecified

    const body = [
      `${t.formName}: ${form.name}`,
      `${t.formEmail}: ${form.email}`,
      `${t.formMobile}: ${form.phone}`,
      `${t.formService}: ${selectedService}`,
      '',
      `${t.formMessage}:`,
      form.message,
    ].join('\n')

    const mailto = `mailto:${data.company.email}?subject=${encodeURIComponent(
      `${t.contactCta} — ${form.name}`,
    )}&body=${encodeURIComponent(body)}`

    window.location.href = mailto
    setSent(true)
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-form-head">
        <h3>{t.formTitle}</h3>
        <p>{t.formLead}</p>
      </div>

      <div className="contact-form-grid">
        <label className="field">
          <span>{t.formName}</span>
          <input
            type="text"
            name="name"
            required
            autoComplete="name"
            placeholder={t.formNamePh}
            value={form.name}
            onChange={(event) => updateField('name', event.target.value)}
          />
        </label>

        <label className="field">
          <span>{t.formEmail}</span>
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
          <span>{t.formMobile}</span>
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
          <span>{t.formService}</span>
          <select
            name="service"
            required
            value={form.serviceId}
            onChange={(event) => updateField('serviceId', event.target.value)}
          >
            <option value="" disabled>
              {t.formChooseService}
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
        <span>{t.formMessage}</span>
        <textarea
          name="message"
          required
          rows={5}
          placeholder={t.formMessagePh}
          value={form.message}
          onChange={(event) => updateField('message', event.target.value)}
        />
      </label>

      <div className="contact-form-actions">
        <button type="submit" className="btn btn-gold">
          {t.formSubmit}
        </button>
        {sent ? <p className="contact-form-hint">{t.formSentHint}</p> : null}
      </div>
    </form>
  )
}
