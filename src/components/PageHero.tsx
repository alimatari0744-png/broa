import { WindowMotif } from './WindowMotif'

type Props = {
  title: string
  text: string
}

export function PageHero({ title, text }: Props) {
  return (
    <section className="page-hero">
      <div className="container page-hero-inner">
        <WindowMotif />
        <p className="eyebrow">مؤسسة بروع التجارية</p>
        <h1>{title}</h1>
        <span className="gold-rule" />
        <p>{text}</p>
      </div>
    </section>
  )
}
