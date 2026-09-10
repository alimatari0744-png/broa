import { WindowMotif } from './WindowMotif'

type Props = {
  eyebrow?: string
  title: string
  text?: string
  light?: boolean
}

export function SectionTitle({ eyebrow, title, text, light }: Props) {
  return (
    <div className={`section-title ${light ? 'is-light' : ''}`}>
      <WindowMotif />
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      <span className="gold-rule" />
      {text ? <p className="section-lead">{text}</p> : null}
    </div>
  )
}
