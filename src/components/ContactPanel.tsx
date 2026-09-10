import { company, whatsappUrl } from '../data/site'

export function ContactPanel() {
  return (
    <div className="contact-layout">
      <div className="contact-details">
        <p className="official-note">
          الأرقام التالية هي الأرقام الرسمية المعتمدة للاستفسارات والدعم.
        </p>
        {company.phones.map((phone) => (
          <a
            key={phone.id}
            className="contact-item"
            href={whatsappUrl(phone.whatsapp)}
            target="_blank"
            rel="noreferrer"
          >
            <span>رقم التواصل</span>
            <strong dir="ltr">{phone.display}</strong>
          </a>
        ))}
        <div className="contact-item is-static">
          <span>البريد الإلكتروني</span>
          <a href={`mailto:${company.email}`}>
            <strong>{company.email}</strong>
          </a>
        </div>
      </div>
      <div className="contact-map">
        <iframe
          title="موقع مؤسسة بروع التجارية على الخريطة"
          src={company.mapEmbedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  )
}
