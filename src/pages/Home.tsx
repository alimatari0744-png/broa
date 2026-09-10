import { Link } from 'react-router-dom'
import { CompanyInfo } from '../components/CompanyInfo'
import { ContactPanel } from '../components/ContactPanel'
import { Reveal } from '../components/Reveal'
import { SectionTitle } from '../components/SectionTitle'
import { ServiceCard } from '../components/ServiceCard'
import { TeamCard } from '../components/TeamCard'
import { WindowMotif } from '../components/WindowMotif'
import { company, partners, services, team, values } from '../data/site'

export function Home() {
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
                <span>للمقاولات العامة</span>
                <em>وتأجير المعدات</em>
              </span>
              <span className="hero-slogan-rule" aria-hidden="true" />
              <span className="hero-slogan-sub">بمعايير الجودة والاحتراف</span>
            </h1>
            <p className="hero-lead">{company.description}</p>
            <div className="hero-actions">
              <Link to="/services" className="btn btn-gold">
                خدماتنا
              </Link>
              <Link to="/contact" className="btn btn-outline-dark">
                تواصل معنا
              </Link>
            </div>
          </Reveal>
          <Reveal>
            <div className="hero-visual">
              <img src="/images/hero.jpg" alt="أعمال مؤسسة بروع التجارية" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container about-preview">
          <Reveal>
            <div className="about-copy">
              <SectionTitle
                eyebrow="نبذة عن المؤسسة"
                title={company.name}
                text={company.description}
              />
              <p>
                نعمل في قطاع المقاولات والبناء بروح احترافية واضحة، ونقدم خدمات
                متكاملة تغطي السكن، محطات البترول، أعمال العظم والتشطيب، إلى جانب
                تأجير المعدات وتوريد مواد البناء.
              </p>
              <Link to="/about" className="btn btn-gold">
                المزيد عن المؤسسة
              </Link>
            </div>
          </Reveal>
          <Reveal>
            <div className="about-media">
              <img src="/images/about.jpg" alt="فريق العمل في أحد مواقع المشاريع" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <SectionTitle
            eyebrow="خدماتنا"
            title="حلول متكاملة في المقاولات والبناء"
            text="نقدم خدماتنا من خلال بطاقات مستقلة تسهّل التعرف على نشاط المؤسسة واختيار ما يناسب مشروعك."
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
          <SectionTitle eyebrow="منهج العمل" title="معايير واضحة في كل مشروع" />
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
            eyebrow="فريق العمل"
            title="خبرات تشرف على التنفيذ"
            text="بيانات فريق العمل الرسمية، والصور تجريبية لحين اعتماد الصور الحقيقية."
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
              عرض فريق العمل
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle
            eyebrow="شركاء النجاح"
            title="ثقة تُبنى بالإنجاز"
            text="شركاء نجاح نعتمد عليهم في تنفيذ المشاريع."
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
            eyebrow="تواصل معنا"
            title="الأرقام الرسمية المعتمدة"
            text="للاستفسار والدعم يمكنكم التواصل مباشرة عبر واتساب، مع عرض الموقع على الخريطة بجانب بيانات التواصل."
          />
          <ContactPanel />
        </div>
      </section>
    </>
  )
}
