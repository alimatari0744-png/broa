import { Link } from 'react-router-dom'
import { CompanyInfo } from '../components/CompanyInfo'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import { SectionTitle } from '../components/SectionTitle'
import { WindowMotif } from '../components/WindowMotif'
import { company, values } from '../data/site'

export function About() {
  return (
    <>
      <PageHero
        title="نبذة عن المؤسسة"
        text="منشأة متخصصة في المقاولات العامة وتأجير المعدات، تعمل بهوية واضحة ومعايير تنفيذ احترافية."
      />
      <section className="section">
        <div className="container about-preview">
          <Reveal>
            <div className="about-copy">
              <SectionTitle eyebrow="من نحن" title={company.name} />
              <p>{company.description}</p>
              <p>
                تأسست المؤسسة لتقديم خدمات متكاملة في قطاع البناء، بدءًا من
                المقاولات العامة للمباني السكنية، مرورًا بإنشاء وتجهيز محطات
                البترول وأعمال العظم والتشطيب، وصولًا إلى تأجير المعدات وتوريد
                مواد البناء.
              </p>
              <p>
                نسعى لأن نكون شريكًا موثوقًا في تنفيذ المشاريع، عبر التزام واضح
                بالجودة، والسلامة، ومواعيد التسليم، والتواصل المباشر مع العميل
                في كل مرحلة.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <div className="about-media">
              <img src="/images/about.jpg" alt="أعمال مؤسسة بروع التجارية" />
            </div>
          </Reveal>
        </div>
      </section>
      <section className="section section-alt">
        <div className="container">
          <SectionTitle eyebrow="قيم العمل" title="ما نلتزم به في كل مشروع" />
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
              استعرض خدماتنا
            </Link>
          </div>
        </div>
      </section>
      <CompanyInfo />
    </>
  )
}
