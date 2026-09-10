import { CompanyInfo } from '../components/CompanyInfo'
import { ContactForm } from '../components/ContactForm'
import { ContactPanel } from '../components/ContactPanel'
import { PageHero } from '../components/PageHero'
import { SectionTitle } from '../components/SectionTitle'

export function Contact() {
  return (
    <>
      <PageHero
        title="تواصل معنا"
        text="يمكنك التواصل عبر الأرقام الرسمية أو إرسال طلبك من خلال النموذج أدناه."
      />
      <section className="section">
        <div className="container">
          <SectionTitle
            eyebrow="نموذج التواصل"
            title="أرسل بياناتك وسنعاود الاتصال"
            text="أدخل اسمك وبريدك ورقم جوالك، واختر الخدمة المطلوبة مع كتابة نص الرسالة."
          />
          <ContactForm />
        </div>
      </section>
      <section className="section section-alt">
        <div className="container">
          <SectionTitle
            eyebrow="بيانات التواصل"
            title="الأرقام الرسمية والخريطة"
            text="الأرقام الرسمية المعتمدة للاستفسارات والدعم، مع عرض الموقع على الخريطة."
          />
          <ContactPanel />
        </div>
      </section>
      <CompanyInfo />
    </>
  )
}
