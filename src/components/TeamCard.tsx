import { whatsappUrl, type team } from '../data/site'

type Member = (typeof team)[number]

export function TeamCard({ member }: { member: Member }) {
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
          <a href={whatsappUrl(member.whatsapp)} target="_blank" rel="noreferrer">
            <span>الهاتف</span>
            <b dir="ltr">{member.phone}</b>
          </a>
          <a href={`mailto:${member.email}`}>
            <span>البريد</span>
            <b>{member.email}</b>
          </a>
        </div>
      </div>
    </article>
  )
}
