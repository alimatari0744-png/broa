import {
  createContext,
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

const STORAGE_KEY = 'broa-site-data-v1'
const AUTH_KEY = 'broa-admin-auth'

type SiteContextValue = {
  data: SiteData
  isAdmin: boolean
  login: (identifier: string) => boolean
  logout: () => void
  saveData: (next: SiteData) => void
  resetData: () => void
  updateCompany: (patch: Partial<SiteData['company']>) => void
  setServices: (services: Service[]) => void
  setTeam: (team: TeamMember[]) => void
  setPartners: (partners: Partner[]) => void
  setValues: (values: SiteData['values']) => void
  whatsappUrl: (number: string) => string
}

const SiteContext = createContext<SiteContextValue | null>(null)

function loadStoredData(): SiteData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return structuredClone(defaultSiteData)
    const parsed = JSON.parse(raw) as Partial<SiteData>
    return {
      company: { ...defaultSiteData.company, ...parsed.company },
      services: parsed.services?.length ? parsed.services : defaultSiteData.services,
      team: parsed.team?.length ? parsed.team : defaultSiteData.team,
      partners: parsed.partners?.length
        ? parsed.partners
        : defaultSiteData.partners,
      values: parsed.values?.length ? parsed.values : defaultSiteData.values,
    }
  } catch {
    return structuredClone(defaultSiteData)
  }
}

export function SiteProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SiteData>(() => loadStoredData())
  const [isAdmin, setIsAdmin] = useState(
    () => sessionStorage.getItem(AUTH_KEY) === '1',
  )

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }, [data])

  const value = useMemo<SiteContextValue>(
    () => ({
      data,
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
      saveData: (next) => setData(next),
      resetData: () => setData(structuredClone(defaultSiteData)),
      updateCompany: (patch) =>
        setData((current) => ({
          ...current,
          company: { ...current.company, ...patch },
        })),
      setServices: (services) => setData((current) => ({ ...current, services })),
      setTeam: (team) => setData((current) => ({ ...current, team })),
      setPartners: (partners) => setData((current) => ({ ...current, partners })),
      setValues: (values) => setData((current) => ({ ...current, values })),
      whatsappUrl: (number: string) =>
        buildWhatsappUrl(number, data.company.whatsappMessage),
    }),
    [data, isAdmin],
  )

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>
}

export function useSite() {
  const ctx = useContext(SiteContext)
  if (!ctx) throw new Error('useSite must be used within SiteProvider')
  return ctx
}
