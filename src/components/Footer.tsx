import { Link } from 'react-router-dom'
import { company, navLinks, whatsappUrl } from '../data/site'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <img src="/logo.png?v=2" alt={company.name} />
          <p>{company.description}</p>
        </div>

        <div>
          <h3>أقسام الموقع</h3>
          <ul>
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3>بيانات المؤسسة</h3>
          <ul>
            <li>{company.name}</li>
            <li>السجل التجاري: {company.commercialRegister}</li>
            <li>
              الرقم الضريبي: <span dir="ltr">{company.taxNumber}</span>
            </li>
            <li>
              الآيبان: <span dir="ltr">{company.iban}</span>
            </li>
            <li>{company.tagline}</li>
          </ul>
        </div>

        <div>
          <h3>التواصل الرسمي</h3>
          <ul>
            <li>
              <a href={`mailto:${company.email}`}>{company.email}</a>
            </li>
            {company.phones.map((phone) => (
              <li key={phone.id}>
                <a href={whatsappUrl(phone.whatsapp)} target="_blank" rel="noreferrer">
                  رقم التواصل <span dir="ltr">{phone.display}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>
            © {new Date().getFullYear()} {company.name} — جميع الحقوق محفوظة
          </p>
          <p className="footer-meta">
            الرقم الضريبي: <span dir="ltr">{company.taxNumber}</span>
            <span className="footer-meta-sep" aria-hidden="true">
              |
            </span>
            الآيبان: <span dir="ltr">{company.iban}</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
