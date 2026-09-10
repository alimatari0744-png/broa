import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { dictionaries, type Dictionary, type Lang } from '../i18n/dictionaries'
import { localizeSiteData } from '../i18n/content.en'
import type { SiteData } from '../data/site'
import { useSite } from './SiteContext'

const STORAGE_KEY = 'broa-lang'

type LanguageContextValue = {
  lang: Lang
  setLang: (lang: Lang) => void
  toggleLang: () => void
  t: Dictionary
  dir: 'rtl' | 'ltr'
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function readStoredLang(): Lang {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    if (value === 'en' || value === 'ar') return value
  } catch {
    // ignore
  }
  return 'ar'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => readStoredLang())

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    localStorage.setItem(STORAGE_KEY, lang)
  }, [lang])

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      setLang: setLangState,
      toggleLang: () => setLangState((current) => (current === 'ar' ? 'en' : 'ar')),
      t: dictionaries[lang],
      dir: lang === 'ar' ? 'rtl' : 'ltr',
    }),
    [lang],
  )

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}

export function useLocalizedSite(): SiteData {
  const { data } = useSite()
  const { lang } = useLanguage()
  return useMemo(() => localizeSiteData(data, lang), [data, lang])
}

export function navLabel(path: string, t: Dictionary) {
  switch (path) {
    case '/':
      return t.navHome
    case '/about':
      return t.navAbout
    case '/services':
      return t.navServices
    case '/team':
      return t.navTeam
    case '/partners':
      return t.navPartners
    case '/contact':
      return t.navContact
    default:
      return path
  }
}

export type { Lang, Dictionary }
