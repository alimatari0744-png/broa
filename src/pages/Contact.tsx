import { CompanyInfo } from '../components/CompanyInfo'
import { ContactPanel } from '../components/ContactPanel'
import { PageHero } from '../components/PageHero'

export function Contact() {
  return (
    <>
      <PageHero
        title="تواصل معنا"
        text="الأرقام الرسمية المعتمدة للاستفسارات والدعم، مع عرض الموقع على الخريطة بجانب بيانات التواصل والبريد."
      />
      <section className="section">
        <div className="container">
          <ContactPanel />
        </div>
      </section>
      <CompanyInfo />
    </>
  )
}
