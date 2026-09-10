import type { TeamMember } from '../data/site'
import { whatsappUrl } from '../data/site'
import { useLanguage, useLocalizedSite } from '../context/LanguageContext'

export function TeamCard({ member }: { member: TeamMember }) {
  const { t } = useLanguage()
  const { company } = useLocalizedSite()

  return (
    <article className="team-card">
      <div className="team-card-photo">
        <img src={member.image} alt={member.name} />
      </div>
      <div className="team-card-body">
        <h3>{member.name}</h3>
        <p className="team-role-title">{member.title}</p>
        <p className="team-role">{member.role}</p>
        <div className="team-contacts">
          <a
            href={whatsappUrl(member.whatsapp, company.whatsappMessage)}
            target="_blank"
            rel="noreferrer"
          >
            <span>{t.phone}</span>
            <b dir="ltr">{member.phone}</b>
          </a>
          <a href={`mailto:${member.email}`}>
            <span>{t.email}</span>
            <b>{member.email}</b>
          </a>
        </div>
      </div>
    </article>
  )
}
