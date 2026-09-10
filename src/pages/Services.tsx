import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import { ServiceCard } from '../components/ServiceCard'
import { useLanguage, useLocalizedSite } from '../context/LanguageContext'

export function Services() {
  const { t } = useLanguage()
  const data = useLocalizedSite()
  const { services } = data

  return (
    <>
      <PageHero title={t.navServices} text={t.servicesPageLead} />
      <section className="section">
        <div className="container">
          <div className="cards-grid">
            {services.map((service) => (
              <Reveal key={service.id}>
                <ServiceCard service={service} details />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
