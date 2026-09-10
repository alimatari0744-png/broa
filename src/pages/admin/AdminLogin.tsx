import { useState, type FormEvent } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'
import { useSite } from '../../context/SiteContext'
import { ensureGithubTokenFromEnv } from '../../lib/githubStore'
import { LanguageToggle } from '../../components/LanguageToggle'

export function AdminLogin() {
  const { isAdmin, login } = useSite()
  const { t } = useLanguage()
  const navigate = useNavigate()
  const [identifier, setIdentifier] = useState('')
  const [error, setError] = useState('')

  if (isAdmin) return <Navigate to="/admin/dashboard" replace />

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const ok = login(identifier)
    if (!ok) {
      setError(t.adminLoginError)
      return
    }
    ensureGithubTokenFromEnv()
    navigate('/admin/dashboard')
  }

  return (
    <div className="admin-shell admin-login-shell">
      <form className="admin-login-card" onSubmit={handleSubmit}>
        <div className="admin-login-top">
          <img src="/logo-mark.png?v=1" alt="" className="admin-login-logo" />
          <LanguageToggle />
        </div>
        <label className="field">
          <span>{t.adminIdentifier}</span>
          <input
            type="text"
            value={identifier}
            onChange={(event) => {
              setIdentifier(event.target.value)
              setError('')
            }}
            placeholder={t.adminLoginPh}
            autoFocus
          />
        </label>
        {error ? <p className="admin-error">{error}</p> : null}
        <button type="submit" className="btn btn-gold">
          {t.adminEnter}
        </button>
        <a href="/" className="admin-back-link">
          {t.adminBack}
        </a>
      </form>
    </div>
  )
}
