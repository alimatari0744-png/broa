import { Link } from 'react-router-dom'
import { navLinks } from '../data/site'
import { navLabel, useLanguage } from '../context/LanguageContext'
import { useSite } from '../context/SiteContext'

export function Footer() {
  const { data, whatsappUrl } = useSite()
  const { t, lang } = useLanguage()
  const { company } = data

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <img src="/logo.png?v=2" alt={company.name} />
          <p>{company.description}</p>
        </div>

        <div>
          <h3>{t.footerSections}</h3>
          <ul>
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to}>{navLabel(link.to, t)}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3>{t.footerCompany}</h3>
          <ul>
            <li>{company.name}</li>
            <li>
              {lang === 'ar' ? 'السجل التجاري' : 'CR'}: {company.commercialRegister}
            </li>
            <li>
              {lang === 'ar' ? 'الرقم الضريبي' : 'Tax No.'}:{' '}
              <span dir="ltr">{company.taxNumber}</span>
            </li>
            <li>
              {lang === 'ar' ? 'الآيبان' : 'IBAN'}:{' '}
              <span dir="ltr">{company.iban}</span>
            </li>
            <li>{company.tagline}</li>
          </ul>
        </div>

        <div>
          <h3>{t.navContact}</h3>
          <ul>
            <li>
              <a href={`mailto:${company.email}`}>{company.email}</a>
            </li>
            {company.phones.map((phone) => (
              <li key={phone.id}>
                <a href={whatsappUrl(phone.whatsapp)} target="_blank" rel="noreferrer">
                  {lang === 'ar' ? 'رقم التواصل' : 'Phone'}{' '}
                  <span dir="ltr">{phone.display}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>
            © {new Date().getFullYear()} {company.name}
            {lang === 'ar' ? ' — جميع الحقوق محفوظة' : ' — All rights reserved'}
          </p>
          <p className="footer-meta">
            {lang === 'ar' ? 'الرقم الضريبي' : 'Tax'}:{' '}
            <span dir="ltr">{company.taxNumber}</span>
            <span className="footer-meta-sep" aria-hidden="true">
              |
            </span>
            {lang === 'ar' ? 'الآيبان' : 'IBAN'}:{' '}
            <span dir="ltr">{company.iban}</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
