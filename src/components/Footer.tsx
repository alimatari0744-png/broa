import { Link } from 'react-router-dom'
import { navLinks, whatsappUrl } from '../data/site'
import {
  navLabel,
  useLanguage,
  useLocalizedSite,
} from '../context/LanguageContext'

export function Footer() {
  const { t } = useLanguage()
  const data = useLocalizedSite()
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
              {t.commercialRegister}: {company.commercialRegister}
            </li>
            <li>
              {t.taxNumber}: <span dir="ltr">{company.taxNumber}</span>
            </li>
            <li>
              {t.iban}: <span dir="ltr">{company.iban}</span>
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
                <a
                  href={whatsappUrl(phone.whatsapp, company.whatsappMessage)}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t.phoneLabel} <span dir="ltr">{phone.display}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>
            © {new Date().getFullYear()} {company.name} — {t.rightsReserved}
          </p>
          <p className="footer-meta">
            {t.taxNumber}: <span dir="ltr">{company.taxNumber}</span>
            <span className="footer-meta-sep" aria-hidden="true">
              |
            </span>
            {t.iban}: <span dir="ltr">{company.iban}</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
