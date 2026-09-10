import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import { TeamCard } from '../components/TeamCard'
import { useSite } from '../context/SiteContext'

export function Team() {
  const { data } = useSite()
  const { team } = data

  return (
    <>
      <PageHero
        title="فريق العمل"
        text="فريق المؤسسة ببيانات التواصل الرسمية، والصور تجريبية لحين اعتماد الصور الحقيقية."
      />
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
