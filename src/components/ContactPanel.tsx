import { toMapEmbedUrl, whatsappUrl } from '../data/site'
import { useLanguage, useLocalizedSite } from '../context/LanguageContext'

export function ContactPanel() {
  const { t } = useLanguage()
  const data = useLocalizedSite()
  const { company } = data

  return (
    <div className="contact-layout">
      <div className="contact-details">
        <p className="official-note">{t.officialPhonesNote}</p>
        {company.phones.map((phone) => (
          <a
            key={phone.id}
            className="contact-item"
            href={whatsappUrl(phone.whatsapp, company.whatsappMessage)}
            target="_blank"
            rel="noreferrer"
          >
            <span>{t.phoneLabel}</span>
            <strong dir="ltr">{phone.display}</strong>
          </a>
        ))}
        <div className="contact-item is-static">
          <span>{t.emailLabel}</span>
          <a href={`mailto:${company.email}`}>
            <strong>{company.email}</strong>
          </a>
        </div>
      </div>
      <div className="contact-map">
        <iframe
          title={t.mapTitle}
          src={toMapEmbedUrl(company.mapEmbedUrl)}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  )
}
