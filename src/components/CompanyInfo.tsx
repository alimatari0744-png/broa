import { company } from '../data/site'

export function CompanyInfo() {
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
      </div>
    </section>
  )
}
