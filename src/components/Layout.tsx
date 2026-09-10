import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useLocalizedSite } from '../context/LanguageContext'
import { Header } from './Header'
import { Footer } from './Footer'
import { WhatsAppFab } from './WhatsAppFab'

export function Layout() {
  const { pathname } = useLocation()
  const { company } = useLocalizedSite()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname])

  useEffect(() => {
    document.title = company.seo.title
    const meta = document.querySelector('meta[name="description"]')
    if (meta) {
      meta.setAttribute('content', company.seo.description)
    }
  }, [company.seo.title, company.seo.description])

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  )
}
