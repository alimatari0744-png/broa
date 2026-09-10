import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type Lang = 'ar' | 'en'

const STORAGE_KEY = 'broa-lang'

type Dictionary = {
  contactCta: string
  navHome: string
  navAbout: string
  navServices: string
  navTeam: string
  navPartners: string
  navContact: string
  openMenu: string
  closeMenu: string
  footerSections: string
  footerCompany: string
  adminViewSite: string
  adminLogout: string
  adminLogin: string
  adminIdentifier: string
  adminEnter: string
  adminBack: string
  tabCompany: string
  tabContact: string
  tabServices: string
  tabTeam: string
  tabPartners: string
  tabValues: string
  language: string
}

const dictionaries: Record<Lang, Dictionary> = {
  ar: {
    contactCta: 'تواصل معنا',
    navHome: 'الرئيسية',
    navAbout: 'نبذة عن المؤسسة',
    navServices: 'خدماتنا',
    navTeam: 'فريق العمل',
    navPartners: 'شركاء النجاح',
    navContact: 'تواصل معنا',
    openMenu: 'فتح القائمة',
    closeMenu: 'إغلاق القائمة',
    footerSections: 'أقسام الموقع',
    footerCompany: 'بيانات المؤسسة',
    adminViewSite: 'عرض الموقع',
    adminLogout: 'خروج',
    adminLogin: 'دخول',
    adminIdentifier: 'البريد أو الرقم',
    adminEnter: 'دخول',
    adminBack: 'العودة للموقع',
    tabCompany: 'بيانات المنشأة',
    tabContact: 'التواصل والخريطة',
    tabServices: 'الخدمات',
    tabTeam: 'الموظفون',
    tabPartners: 'الشركاء',
    tabValues: 'منهج العمل',
    language: 'اللغة',
  },
  en: {
    contactCta: 'Contact us',
    navHome: 'Home',
    navAbout: 'About',
    navServices: 'Services',
    navTeam: 'Team',
    navPartners: 'Partners',
    navContact: 'Contact',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    footerSections: 'Site sections',
    footerCompany: 'Company details',
    adminViewSite: 'View site',
    adminLogout: 'Log out',
    adminLogin: 'Sign in',
    adminIdentifier: 'Email or phone',
    adminEnter: 'Sign in',
    adminBack: 'Back to site',
    tabCompany: 'Company',
    tabContact: 'Contact & map',
    tabServices: 'Services',
    tabTeam: 'Team',
    tabPartners: 'Partners',
    tabValues: 'Values',
    language: 'Language',
  },
}

type LanguageContextValue = {
  lang: Lang
  setLang: (lang: Lang) => void
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
