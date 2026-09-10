import { useState, type FormEvent } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useSite } from '../../context/SiteContext'

export function AdminLogin() {
  const { isAdmin, login } = useSite()
  const navigate = useNavigate()
  const [identifier, setIdentifier] = useState('')
  const [error, setError] = useState('')

  if (isAdmin) return <Navigate to="/admin/dashboard" replace />

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const ok = login(identifier)
    if (!ok) {
      setError('أدخل بريدًا أو رقمًا للمتابعة.')
      return
    }
    navigate('/admin/dashboard')
  }

  return (
    <div className="admin-shell admin-login-shell">
      <form className="admin-login-card" onSubmit={handleSubmit}>
        <img src="/logo-mark.png?v=1" alt="" className="admin-login-logo" />
        <h1>لوحة التحكم</h1>
        <p>أدخل أي بريد أو رقم للدخول حاليًا (بدون كلمة مرور).</p>
        <label className="field">
          <span>البريد أو الرقم</span>
          <input
            type="text"
            value={identifier}
            onChange={(event) => {
              setIdentifier(event.target.value)
              setError('')
            }}
            placeholder="مثال: admin@broa.sa أو 05xxxxxxxx"
            autoFocus
          />
        </label>
        {error ? <p className="admin-error">{error}</p> : null}
        <button type="submit" className="btn btn-gold">
          دخول
        </button>
        <a href="/" className="admin-back-link">
          العودة للموقع
        </a>
      </form>
    </div>
  )
}
