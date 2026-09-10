import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import { TeamCard } from '../components/TeamCard'
import { useLanguage, useLocalizedSite } from '../context/LanguageContext'

export function Team() {
  const { t } = useLanguage()
  const data = useLocalizedSite()
  const { team } = data

  return (
    <>
      <PageHero title={t.navTeam} text={t.teamPageLead} />
      <section className="section">
        <div className="container">
          <div className="team-grid">
            {team.map((member) => (
              <Reveal key={member.id}>
                <TeamCard member={member} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
