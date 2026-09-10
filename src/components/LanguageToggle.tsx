import { useLanguage, type Lang } from '../context/LanguageContext'

export function LanguageToggle({ className = '' }: { className?: string }) {
  const { lang, setLang, t } = useLanguage()

  function select(next: Lang) {
    setLang(next)
  }

  return (
    <div
      className={`lang-switch ${className}`.trim()}
      role="group"
      aria-label={t.language}
    >
      <button
        type="button"
        className={lang === 'ar' ? 'is-active' : ''}
        aria-pressed={lang === 'ar'}
        onClick={() => select('ar')}
      >
        العربية
      </button>
      <button
        type="button"
        className={lang === 'en' ? 'is-active' : ''}
        aria-pressed={lang === 'en'}
        onClick={() => select('en')}
      >
        EN
      </button>
    </div>
  )
}
