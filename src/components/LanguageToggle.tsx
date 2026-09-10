import { useLanguage } from '../context/LanguageContext'

export function LanguageToggle({ className = '' }: { className?: string }) {
  const { lang, toggleLang, t } = useLanguage()
  const nextIsEnglish = lang === 'ar'

  return (
    <button
      type="button"
      className={`lang-toggle ${className}`.trim()}
      onClick={toggleLang}
      aria-label={nextIsEnglish ? t.switchToEnglish : t.switchToArabic}
      title={nextIsEnglish ? t.switchToEnglish : t.switchToArabic}
    >
      <span lang={nextIsEnglish ? 'en' : 'ar'}>
        {nextIsEnglish ? 'EN' : 'ع'}
      </span>
    </button>
  )
}
