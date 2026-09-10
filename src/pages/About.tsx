import { Link } from 'react-router-dom'
import { CompanyInfo } from '../components/CompanyInfo'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import { SectionTitle } from '../components/SectionTitle'
import { WindowMotif } from '../components/WindowMotif'
import { useLanguage, useLocalizedSite } from '../context/LanguageContext'

export function About() {
  const { t } = useLanguage()
  const data = useLocalizedSite()
  const { company, values } = data

  return (
    <>
      <PageHero title={t.aboutEyebrow} text={t.aboutPageLead} />
      <section className="section">
        <div className="container about-preview">
          <Reveal>
            <div className="about-copy">
              <SectionTitle eyebrow={t.aboutWhoEyebrow} title={company.name} />
              <p>{company.description}</p>
              <p>{t.aboutP1}</p>
              <p>{t.aboutP2}</p>
            </div>
          </Reveal>
          <Reveal>
            <div className="about-media">
              <img src="/images/about.jpg" alt={t.heroImageAlt} />
            </div>
          </Reveal>
        </div>
      </section>
      <section className="section section-alt">
        <div className="container">
          <SectionTitle
            eyebrow={t.aboutValuesEyebrow}
            title={t.aboutValuesTitle}
          />
          <div className="values-grid">
            {values.map((value) => (
              <Reveal key={value.title}>
                <article className="value-card">
                  <WindowMotif />
                  <h3>{value.title}</h3>
                  <p>{value.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="section-cta">
            <Link to="/services" className="btn btn-gold">
              {t.aboutServicesCta}
            </Link>
          </div>
        </div>
      </section>
      <CompanyInfo />
    </>
  )
}
