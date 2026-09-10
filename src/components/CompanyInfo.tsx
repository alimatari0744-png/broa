import { useSite } from '../context/SiteContext'

export function CompanyInfo() {
  const { data } = useSite()
  const { company } = data

  return (
    <section className="company-info">
      <div className="container company-info-card">
        <div>
          <p className="eyebrow">بيانات المنشأة</p>
          <h2>{company.name}</h2>
          <p>{company.tagline}</p>
        </div>
        <div className="cr-box">
          <span>السجل التجاري</span>
          <strong>{company.commercialRegister}</strong>
        </div>
        <div className="cr-box">
          <span>الرقم الضريبي</span>
          <strong dir="ltr">{company.taxNumber}</strong>
        </div>
        <div className="cr-box">
          <span>الآيبان</span>
          <strong dir="ltr">{company.iban}</strong>
        </div>
      </div>
    </section>
  )
}
