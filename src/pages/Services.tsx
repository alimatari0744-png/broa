import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import { ServiceCard } from '../components/ServiceCard'
import { services } from '../data/site'

export function Services() {
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
