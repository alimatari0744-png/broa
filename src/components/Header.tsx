import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { navLinks } from '../data/site'
import { navLabel, useLanguage } from '../context/LanguageContext'
import { useSite } from '../context/SiteContext'
import { LanguageToggle } from './LanguageToggle'

const icons: Record<string, ReactNode> = {
  '/': (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1z" />
    </svg>
  ),
  '/about': (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 20V9l8-5 8 5v11h-6v-6H10v6z" />
    </svg>
  ),
  '/services': (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 5h7v7H4zm9 0h7v4h-7zM4 14h7v5H4zm9-3h7v8h-7z" />
    </svg>
  ),
  '/team': (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 11a3.5 3.5 0 1 0-3.5-3.5A3.5 3.5 0 0 0 9 11zm9.5-1a3 3 0 1 0-3-3 3 3 0 0 0 3 3zM9 13c-3.4 0-6 1.7-6 4v2h12v-2c0-2.3-2.6-4-6-4zm8.5 0c-.5 0-1 .05-1.5.14 1.6.9 2.5 2.2 2.5 3.86V19h4v-2c0-2-2-3.7-5-3.86z" />
    </svg>
  ),
  '/partners': (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 8a3 3 0 1 0-3-3 3 3 0 0 0 3 3zm11 0a3 3 0 1 0-3-3 3 3 0 0 0 3 3zM8 10c-2.8 0-5 1.6-5 3.5V16h6.2A6.5 6.5 0 0 1 16 10.1 5.2 5.2 0 0 0 8 10zm8 1a4.5 4.5 0 0 0-4.5 4.5V20h9v-4.5A4.5 4.5 0 0 0 16 11z" />
    </svg>
  ),
  '/contact': (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 7a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .57 3.6 1 1 0 0 1-.25 1z" />
    </svg>
  ),
}

export function Header() {
  const { data } = useSite()
  const { t } = useLanguage()
  const { company } = data
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.classList.remove('menu-open')
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <Link to="/" className="brand" aria-label={company.name}>
            <img className="brand-mark" src="/logo-mark.png?v=1" alt="" />
          </Link>

          <nav className="desktop-nav" aria-label={t.navHome}>
            {navLinks
              .filter((link) => link.to !== '/contact')
              .map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) => (isActive ? 'is-active' : '')}
                >
                  {navLabel(link.to, t)}
                </NavLink>
              ))}
          </nav>

          <div className="header-end">
            <LanguageToggle className="lang-switch-desktop" />
            <Link to="/contact" className="btn btn-gold header-cta">
              {t.contactCta}
            </Link>
            <LanguageToggle className="lang-switch-mobile" />
            <button
              className={`menu-toggle ${open ? 'is-open' : ''}`}
              type="button"
              aria-label={open ? t.closeMenu : t.openMenu}
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-menu ${open ? 'is-open' : ''}`}>
        <button
          className="nav-backdrop"
          type="button"
          aria-label={t.closeMenu}
          onClick={() => setOpen(false)}
        />
        <aside className="mobile-drawer" aria-hidden={!open}>
          <div className="drawer-head">
            <div className="drawer-brand">
              <img className="drawer-mark" src="/logo-mark.png?v=1" alt="" />
              <img
                className="drawer-wordmark"
                src="/logo-wordmark.png?v=1"
                alt={company.name}
              />
            </div>
            <button
              type="button"
              aria-label={t.closeMenu}
              onClick={() => setOpen(false)}
            >
              ✕
            </button>
          </div>
          <nav aria-label={t.navHome}>
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) => (isActive ? 'is-active' : '')}
              >
                {icons[link.to]}
                <span>{navLabel(link.to, t)}</span>
              </NavLink>
            ))}
          </nav>
        </aside>
      </div>
    </>
  )
}
