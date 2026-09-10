import { useLanguage, useLocalizedSite } from '../context/LanguageContext'

export function CompanyInfo() {
  const { t } = useLanguage()
  const data = useLocalizedSite()
  const { company } = data

  return (
    <section className="company-info">
      <div className="container company-info-card">
        <div>
          <p className="eyebrow">{t.companyInfoEyebrow}</p>
          <h2>{company.name}</h2>
          <p>{company.tagline}</p>
        </div>
        <div className="cr-box">
          <span>{t.commercialRegister}</span>
          <strong>{company.commercialRegister}</strong>
        </div>
        <div className="cr-box">
          <span>{t.taxNumber}</span>
          <strong dir="ltr">{company.taxNumber}</strong>
        </div>
        <div className="cr-box">
          <span>{t.iban}</span>
          <strong dir="ltr">{company.iban}</strong>
        </div>
      </div>
    </section>
  )
}
