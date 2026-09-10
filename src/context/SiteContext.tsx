import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  defaultSiteData,
  whatsappUrl as buildWhatsappUrl,
  type Partner,
  type Service,
  type SiteData,
  type TeamMember,
} from '../data/site'
import { getGithubToken } from '../lib/githubStore'
import { publishSiteData } from '../lib/publishSite'

const AUTH_KEY = 'broa-admin-auth'
const SITE_JSON_URL = '/data/site.json'

type SiteContextValue = {
  data: SiteData
  loading: boolean
  isAdmin: boolean
  login: (identifier: string) => boolean
  logout: () => void
  /** ينشر البيانات على GitHub (site.json + الصور المستبدلة) ويحدّث الحالة المحلية */
  publishData: (next: SiteData, message: string) => Promise<SiteData>
  resetData: () => Promise<SiteData>
  updateCompany: (patch: Partial<SiteData['company']>) => void
  setServices: (services: Service[]) => void
  setTeam: (team: TeamMember[]) => void
  setPartners: (partners: Partner[]) => void
  setValues: (values: SiteData['values']) => void
  whatsappUrl: (number: string) => string
}

const SiteContext = createContext<SiteContextValue | null>(null)

function mergeWithDefaults(parsed: Partial<SiteData>): SiteData {
  return {
    company: { ...defaultSiteData.company, ...parsed.company },
    services: parsed.services?.length ? parsed.services : defaultSiteData.services,
    team: parsed.team?.length ? parsed.team : defaultSiteData.team,
    partners: parsed.partners?.length
      ? parsed.partners
      : defaultSiteData.partners,
    values: parsed.values?.length ? parsed.values : defaultSiteData.values,
  }
}

async function fetchPublishedData(): Promise<SiteData> {
  try {
    const response = await fetch(`${SITE_JSON_URL}?v=${Date.now()}`, {
      cache: 'no-store',
    })
    if (!response.ok) throw new Error('missing site.json')
    const parsed = (await response.json()) as Partial<SiteData>
    return mergeWithDefaults(parsed)
  } catch {
    return structuredClone(defaultSiteData)
  }
}

export function SiteProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SiteData>(() =>
    structuredClone(defaultSiteData),
  )
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(
    () => sessionStorage.getItem(AUTH_KEY) === '1',
  )

  useEffect(() => {
    let active = true
    fetchPublishedData().then((published) => {
      if (!active) return
      setData(published)
      setLoading(false)
    })
    return () => {
      active = false
    }
  }, [])

  const publishData = useCallback(
    async (next: SiteData, message: string) => {
      const token = getGithubToken()
      if (!token) {
          throw new Error(
          'تعذر الاتصال بـ GitHub. تأكد أن إعداد التخزين مفعّل في بيئة التشغيل.',
        )
      }
      const published = await publishSiteData({
        data: next,
        previous: data,
        token,
        message,
      })
      setData(published)
      return published
    },
    [data],
  )

  const resetData = useCallback(async () => {
    const defaults = structuredClone(defaultSiteData)
    return publishData(
      defaults,
      'content: restore individual default site data',
    )
  }, [publishData])

  const value = useMemo<SiteContextValue>(
    () => ({
      data,
      loading,
      isAdmin,
      login: (identifier: string) => {
        if (!identifier.trim()) return false
        sessionStorage.setItem(AUTH_KEY, '1')
        setIsAdmin(true)
        return true
      },
      logout: () => {
        sessionStorage.removeItem(AUTH_KEY)
        setIsAdmin(false)
      },
      publishData,
      resetData,
      updateCompany: (patch) =>
        setData((current) => ({
          ...current,
          company: { ...current.company, ...patch },
        })),
      setServices: (services) =>
        setData((current) => ({ ...current, services })),
      setTeam: (team) => setData((current) => ({ ...current, team })),
      setPartners: (partners) =>
        setData((current) => ({ ...current, partners })),
      setValues: (values) => setData((current) => ({ ...current, values })),
      whatsappUrl: (number: string) =>
        buildWhatsappUrl(number, data.company.whatsappMessage),
    }),
    [data, loading, isAdmin, publishData, resetData],
  )

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>
}

export function useSite() {
  const ctx = useContext(SiteContext)
  if (!ctx) throw new Error('useSite must be used within SiteProvider')
  return ctx
}
