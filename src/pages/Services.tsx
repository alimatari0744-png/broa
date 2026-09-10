import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import { ServiceCard } from '../components/ServiceCard'
import { useSite } from '../context/SiteContext'

export function Services() {
  const { data } = useSite()
  const { services } = data

  return (
    <>
      <PageHero
        title="خدماتنا"
        text="خدمات متخصصة في المقاولات العامة، محطات البترول، أعمال العظم والتشطيب، تأجير المعدات، وتوريد مواد البناء."
      />
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
