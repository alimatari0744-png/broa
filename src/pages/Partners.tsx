import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import { partners } from '../data/site'

export function Partners() {
  return (
    <>
      <PageHero
        title="شركاء النجاح"
        text="شركاء النجاح المعتمدون لدى المؤسسة."
      />
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
