import { Link } from 'react-router-dom'
import { CompanyInfo } from '../components/CompanyInfo'
import { ContactForm } from '../components/ContactForm'
import { ContactPanel } from '../components/ContactPanel'
import { Reveal } from '../components/Reveal'
import { SectionTitle } from '../components/SectionTitle'
import { ServiceCard } from '../components/ServiceCard'
import { TeamCard } from '../components/TeamCard'
import { WindowMotif } from '../components/WindowMotif'
import { useLanguage, useLocalizedSite } from '../context/LanguageContext'

export function Home() {
  const { t } = useLanguage()
  const data = useLocalizedSite()
  const { company, partners, services, team, values } = data

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <Reveal className="hero-copy">
            <div className="hero-logo-wrap">
              <img src="/logo-mark.png?v=1" alt={company.name} />
            </div>
            <h1 className="hero-slogan">
              <span className="hero-slogan-main">
                <span>{t.heroLine1}</span>
                <em>{t.heroLine2}</em>
              </span>
              <span className="hero-slogan-rule" aria-hidden="true" />
              <span className="hero-slogan-sub">{t.heroLine3}</span>
            </h1>
            <p className="hero-lead">{company.description}</p>
            <div className="hero-actions">
              <Link to="/services" className="btn btn-gold">
                {t.navServices}
              </Link>
              <Link to="/contact" className="btn btn-outline-dark">
                {t.contactCta}
              </Link>
            </div>
          </Reveal>
          <Reveal>
            <div className="hero-visual">
              <img src="/images/hero.jpg" alt={t.heroImageAlt} />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container about-preview">
          <Reveal>
            <div className="about-copy">
              <SectionTitle
                eyebrow={t.aboutEyebrow}
                title={company.name}
                text={company.description}
              />
              <p>{t.aboutExtra}</p>
              <Link to="/about" className="btn btn-gold">
                {t.aboutMore}
              </Link>
            </div>
          </Reveal>
          <Reveal>
            <div className="about-media">
              <img src="/images/about.jpg" alt={t.aboutMediaAlt} />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <SectionTitle
            eyebrow={t.servicesEyebrow}
            title={t.servicesTitle}
            text={t.servicesText}
          />
          <div className="cards-grid">
            {services.map((service) => (
              <Reveal key={service.id}>
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle eyebrow={t.valuesEyebrow} title={t.valuesTitle} />
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
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <SectionTitle
            eyebrow={t.teamEyebrow}
            title={t.teamTitle}
            text={t.teamText}
          />
          <div className="team-grid">
            {team.map((member) => (
              <Reveal key={member.id}>
                <TeamCard member={member} />
              </Reveal>
            ))}
          </div>
          <div className="section-cta">
            <Link to="/team" className="btn btn-outline-dark">
              {t.teamCta}
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle
            eyebrow={t.partnersEyebrow}
            title={t.partnersTitle}
            text={t.partnersText}
          />
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

      <CompanyInfo />

      <section className="section section-alt">
        <div className="container">
          <SectionTitle
            eyebrow={t.contactEyebrow}
            title={t.contactTitle}
            text={t.contactText}
          />
          <ContactPanel />
        </div>
      </section>

      <section className="section">
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
