import { Link } from 'react-router-dom'
import type { Service } from '../data/site'
import { useLanguage } from '../context/LanguageContext'

export function ServiceCard({
  service,
  details = false,
}: {
  service: Service
  details?: boolean
}) {
  const { t } = useLanguage()

  return (
    <article className="service-card">
      <div className="service-card-media">
        <img src={service.image} alt={service.title} loading="lazy" />
      </div>
      <div className="service-card-body">
        <h3>{service.title}</h3>
        <p>{details ? service.details : service.summary}</p>
        {!details ? (
          <Link to="/services" className="text-link">
            {t.viewDetails}
          </Link>
        ) : null}
      </div>
    </article>
  )
}
