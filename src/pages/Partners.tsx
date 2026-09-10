import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import { useLanguage, useLocalizedSite } from '../context/LanguageContext'

export function Partners() {
  const { t } = useLanguage()
  const data = useLocalizedSite()
  const { partners } = data

  return (
    <>
      <PageHero title={t.navPartners} text={t.partnersPageLead} />
      <section className="section">
        <div className="container">
          <div className="partners-grid">
            {partners.map((partner) => (
              <Reveal key={partner.id}>
                <article className="partner-card">
                  <img src={partner.logo} alt={partner.name} />
                  <h3>{partner.name}</h3>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
