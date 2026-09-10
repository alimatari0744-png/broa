import { ContactForm } from '../components/ContactForm'
import { ContactPanel } from '../components/ContactPanel'
import { PageHero } from '../components/PageHero'
import { SectionTitle } from '../components/SectionTitle'
import { useLanguage } from '../context/LanguageContext'

export function Contact() {
  const { t } = useLanguage()

  return (
    <>
      <PageHero title={t.navContact} text={t.contactPageLead} />
      <section className="section">
        <div className="container">
          <SectionTitle
            eyebrow={t.contactDataEyebrow}
            title={t.contactDataTitle}
            text={t.contactDataText}
          />
          <ContactPanel />
        </div>
      </section>
      <section className="section section-alt">
        <div className="container">
          <SectionTitle
            eyebrow={t.formSectionEyebrow}
            title={t.formSectionTitle}
            text={t.formSectionText}
          />
          <ContactForm />
        </div>
      </section>
    </>
  )
}
