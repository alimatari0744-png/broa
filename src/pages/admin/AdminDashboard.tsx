import { Navigate, Link } from 'react-router-dom'
import { useEffect, useRef, useState, type ChangeEvent, type ReactNode } from 'react'
import {
  createId,
  toMapEmbedUrl,
  toWhatsAppNumber,
  type Partner,
  type Service,
  type SiteData,
  type TeamMember,
} from '../../data/site'
import { useSite } from '../../context/SiteContext'
import { useLanguage } from '../../context/LanguageContext'
import { ensureGithubTokenFromEnv } from '../../lib/githubStore'
import { LanguageToggle } from '../../components/LanguageToggle'

type Tab = 'company' | 'contact' | 'services' | 'team' | 'partners' | 'values'

type TabLabelKey =
  | 'tabCompany'
  | 'tabContact'
  | 'tabServices'
  | 'tabTeam'
  | 'tabPartners'
  | 'tabValues'

const tabs: { id: Tab; labelKey: TabLabelKey; icon: ReactNode }[] = [
  {
    id: 'company',
    labelKey: 'tabCompany',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 20V9l8-5 8 5v11h-6v-6H10v6z" />
      </svg>
    ),
  },
  {
    id: 'contact',
    labelKey: 'tabContact',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 7a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .57 3.6 1 1 0 0 1-.25 1z" />
      </svg>
    ),
  },
  {
    id: 'services',
    labelKey: 'tabServices',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 5h7v7H4zm9 0h7v4h-7zM4 14h7v5H4zm9-3h7v8h-7z" />
      </svg>
    ),
  },
  {
    id: 'team',
    labelKey: 'tabTeam',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M9 11a3.5 3.5 0 1 0-3.5-3.5A3.5 3.5 0 0 0 9 11zm9.5-1a3 3 0 1 0-3-3 3 3 0 0 0 3 3zM9 13c-3.4 0-6 1.7-6 4v2h12v-2c0-2.3-2.6-4-6-4zm8.5 0c-.5 0-1 .05-1.5.14 1.6.9 2.5 2.2 2.5 3.86V19h4v-2c0-2-2-3.7-5-3.86z" />
      </svg>
    ),
  },
  {
    id: 'partners',
    labelKey: 'tabPartners',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8 8a3 3 0 1 0-3-3 3 3 0 0 0 3 3zm11 0a3 3 0 1 0-3-3 3 3 0 0 0 3 3zM8 10c-2.8 0-5 1.6-5 3.5V16h6.2A6.5 6.5 0 0 1 16 10.1 5.2 5.2 0 0 0 8 10zm8 1a4.5 4.5 0 0 0-4.5 4.5V20h9v-4.5A4.5 4.5 0 0 0 16 11z" />
      </svg>
    ),
  },
  {
    id: 'values',
    labelKey: 'tabValues',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 3h10a2 2 0 0 1 2 2v14l-7-3-7 3V5a2 2 0 0 1 2-2zm2 4v2h6V7zm0 4v2h6v-2z" />
      </svg>
    ),
  },
]

async function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}

function cloneData(value: SiteData): SiteData {
  return structuredClone(value)
}

export function AdminDashboard() {
  const { isAdmin, logout, data, publishData, resetData } = useSite()
  const { t } = useLanguage()
  const [tab, setTab] = useState<Tab>('company')
  const [draft, setDraft] = useState<SiteData>(() => cloneData(data))
  const [savedSection, setSavedSection] = useState<Tab | 'reset' | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [publishing, setPublishing] = useState(false)
  const [publishError, setPublishError] = useState('')
  const saveTimerRef = useRef<number | null>(null)

  useEffect(() => {
    ensureGithubTokenFromEnv()
  }, [])

  useEffect(() => {
    setDraft(cloneData(data))
  }, [data])

  useEffect(() => {
    document.body.classList.toggle('admin-menu-open', menuOpen)
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.classList.remove('admin-menu-open')
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    return () => {
      if (saveTimerRef.current) window.clearTimeout(saveTimerRef.current)
    }
  }, [])

  if (!isAdmin) return <Navigate to="/admin" replace />

  function flash(section: Tab | 'reset') {
    setSavedSection(section)
    if (saveTimerRef.current) window.clearTimeout(saveTimerRef.current)
    saveTimerRef.current = window.setTimeout(() => setSavedSection(null), 4000)
  }

  function selectTab(id: Tab) {
    setTab(id)
    setMenuOpen(false)
  }

  async function onImagePick(
    event: ChangeEvent<HTMLInputElement>,
    onReady: (url: string) => void,
  ) {
    const file = event.target.files?.[0]
    if (!file) return
    const url = await fileToDataUrl(file)
    onReady(url)
    event.target.value = ''
  }

  async function commitSection(
    next: SiteData,
    section: Tab | 'reset',
    message: string,
  ) {
    setPublishing(true)
    setPublishError('')
    try {
      await publishData(next, message)
      flash(section)
    } catch (error) {
      setPublishError(
        error instanceof Error ? error.message : 'فشل الحفظ على GitHub',
      )
    } finally {
      setPublishing(false)
    }
  }

  function saveCompany() {
    const c = draft.company
    const next: SiteData = {
      ...data,
      company: {
        ...data.company,
        name: c.name,
        tagline: c.tagline,
        slogan: c.slogan,
        description: c.description,
        commercialRegister: c.commercialRegister,
        taxNumber: c.taxNumber,
        iban: c.iban,
        email: c.email,
      },
    }
    void commitSection(next, 'company', 'content: update company profile')
  }

  function saveContact() {
    const c = draft.company
    const next: SiteData = {
      ...data,
      company: {
        ...data.company,
        mapEmbedUrl: toMapEmbedUrl(c.mapEmbedUrl),
        whatsappMessage: c.whatsappMessage,
        phones: c.phones.map((phone) => ({
          ...phone,
          whatsapp: toWhatsAppNumber(phone.display || phone.whatsapp),
        })),
      },
    }
    void commitSection(next, 'contact', 'content: update contact and map')
  }

  function saveServices() {
    const next: SiteData = {
      ...data,
      services: cloneData(draft).services,
    }
    void commitSection(next, 'services', 'content: update services')
  }

  function saveTeam() {
    const next: SiteData = {
      ...data,
      team: cloneData(draft).team.map((member) => ({
        ...member,
        whatsapp: toWhatsAppNumber(member.phone || member.whatsapp),
      })),
    }
    void commitSection(next, 'team', 'content: update team')
  }

  function savePartners() {
    const next: SiteData = {
      ...data,
      partners: cloneData(draft).partners,
    }
    void commitSection(next, 'partners', 'content: update partners')
  }

  function saveValues() {
    const next: SiteData = {
      ...data,
      values: cloneData(draft).values,
    }
    void commitSection(next, 'values', 'content: update values')
  }

  async function confirmReset() {
    const ok = window.confirm(
      'هل تريد استعادة البيانات الافتراضية؟\nسيتم نشر النسخة الأصلية على GitHub، مع الإبقاء على صور وملفات الاستعادة الفردية دون حذفها أو استبدالها.',
    )
    if (!ok) return
    setPublishing(true)
    setPublishError('')
    try {
      await resetData()
      flash('reset')
    } catch (error) {
      setPublishError(
        error instanceof Error ? error.message : 'فشل الاستعادة على GitHub',
      )
    } finally {
      setPublishing(false)
    }
  }

  function SaveBar({
    section,
    label,
    onSave,
  }: {
    section: Tab
    label: string
    onSave: () => void
  }) {
    return (
      <div className="admin-save-bar">
        <button
          type="button"
          className="btn btn-gold"
          onClick={onSave}
          disabled={publishing}
        >
          {publishing ? 'جاري الحفظ…' : label}
        </button>
        {publishing ? (
          <p className="admin-save-pending" role="status">
            جاري الرفع إلى GitHub…
          </p>
        ) : null}
        {!publishing && savedSection === section ? (
          <p className="admin-save-ok" role="status">
            تم الحفظ ✓ — نُشر على GitHub
          </p>
        ) : null}
      </div>
    )
  }

  return (
    <div className="admin-shell">
      <header className="admin-top">
        <div className="admin-top-title">
          <img src="/logo-mark.png?v=1" alt="" className="admin-top-mark" />
        </div>
        <div className="admin-top-actions">
          <LanguageToggle />
          <button
            className={`menu-toggle admin-menu-toggle ${menuOpen ? 'is-open' : ''}`}
            type="button"
            aria-label={menuOpen ? t.closeMenu : t.openMenu}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
          >
            <span />
            <span />
            <span />
          </button>
          <Link
            to="/"
            className="btn btn-outline-dark admin-desktop-action"
            target="_blank"
          >
            {t.adminViewSite}
          </Link>
          <button
            type="button"
            className="btn btn-gold admin-desktop-action"
            onClick={logout}
          >
            {t.adminLogout}
          </button>
        </div>
      </header>

      {savedSection === 'reset' ? (
        <p className="admin-saved">تم استعادة البيانات الافتراضية ✓</p>
      ) : null}

      {publishError ? <p className="admin-error-banner">{publishError}</p> : null}

      <div className="admin-tabs">
        {tabs.map((item) => (
          <button
            key={item.id}
            type="button"
            className={tab === item.id ? 'is-active' : ''}
            onClick={() => selectTab(item.id)}
          >
            {t[item.labelKey]}
          </button>
        ))}
      </div>

      <div className={`admin-mobile-menu ${menuOpen ? 'is-open' : ''}`}>
        <button
          className="admin-nav-backdrop"
          type="button"
          aria-label="إغلاق القائمة"
          onClick={() => setMenuOpen(false)}
        />
        <aside className="admin-drawer" aria-hidden={!menuOpen}>
          <div className="drawer-head">
            <div className="drawer-brand">
              <img className="drawer-mark" src="/logo-mark.png?v=1" alt="" />
              <img
                className="drawer-wordmark"
                src="/logo-wordmark.png?v=1"
                alt="بروعة"
              />
            </div>
            <button
              type="button"
              aria-label="إغلاق القائمة"
              onClick={() => setMenuOpen(false)}
            >
              ✕
            </button>
          </div>
          <nav aria-label="أقسام لوحة التحكم">
            {tabs.map((item) => (
              <button
                key={item.id}
                type="button"
                className={tab === item.id ? 'is-active' : ''}
                onClick={() => selectTab(item.id)}
              >
                {item.icon}
                <span>{t[item.labelKey]}</span>
              </button>
            ))}
          </nav>
          <div className="admin-drawer-actions">
            <Link
              to="/"
              className="btn btn-outline-dark"
              target="_blank"
              onClick={() => setMenuOpen(false)}
            >
              {t.adminViewSite}
            </Link>
            <button type="button" className="btn btn-gold" onClick={logout}>
              {t.adminLogout}
            </button>
          </div>
        </aside>
      </div>

      <div className="admin-panel">
        {tab === 'company' ? (
          <section className="admin-section">
            <h2>بيانات المنشأة</h2>
            <div className="admin-grid">
              {(
                [
                  ['name', 'اسم المؤسسة'],
                  ['tagline', 'النشاط / الشعار الفرعي'],
                  ['slogan', 'العبارة التعريفية'],
                  ['commercialRegister', 'السجل التجاري'],
                  ['taxNumber', 'الرقم الضريبي'],
                  ['iban', 'الآيبان'],
                  ['email', 'البريد الرسمي'],
                ] as const
              ).map(([key, label]) => (
                <label key={key} className="field">
                  <span>{label}</span>
                  <input
                    value={draft.company[key]}
                    dir={
                      key === 'iban' || key === 'taxNumber' || key === 'email'
                        ? 'ltr'
                        : undefined
                    }
                    onChange={(event) =>
                      setDraft((current) => ({
                        ...current,
                        company: {
                          ...current.company,
                          [key]: event.target.value,
                        },
                      }))
                    }
                  />
                </label>
              ))}
              <label className="field field-full">
                <span>وصف المؤسسة</span>
                <textarea
                  rows={4}
                  value={draft.company.description}
                  onChange={(event) =>
                    setDraft((current) => ({
                      ...current,
                      company: {
                        ...current.company,
                        description: event.target.value,
                      },
                    }))
                  }
                />
              </label>
            </div>
            <SaveBar
              section="company"
              label="حفظ بيانات المنشأة"
              onSave={saveCompany}
            />
          </section>
        ) : null}

        {tab === 'contact' ? (
          <section className="admin-section">
            <h2>التواصل والخريطة</h2>
            <div className="admin-grid">
              <label className="field field-full">
                <span>رابط خرائط جوجل</span>
                <input
                  dir="ltr"
                  placeholder="الصق رابط Google Maps هنا"
                  value={draft.company.mapEmbedUrl}
                  onChange={(event) =>
                    setDraft((current) => ({
                      ...current,
                      company: {
                        ...current.company,
                        mapEmbedUrl: event.target.value,
                      },
                    }))
                  }
                />
                <small className="admin-field-hint">
                  لأدق موقع: في Google Maps اضغط مشاركة ← تضمين خريطة ← انسخ رابط
                  الـ iframe (أو الصق كود التضمين كاملاً). أو افتح الرابط في المتصفح
                  وانسخ الرابط الكامل من شريط العنوان ثم احفظ.
                </small>
              </label>
              <div className="admin-map-preview field-full">
                <span>معاينة الخريطة</span>
                <iframe
                  title="معاينة الخريطة"
                  src={toMapEmbedUrl(draft.company.mapEmbedUrl)}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <label className="field field-full">
                <span>رسالة واتساب الافتراضية</span>
                <textarea
                  rows={3}
                  value={draft.company.whatsappMessage}
                  onChange={(event) =>
                    setDraft((current) => ({
                      ...current,
                      company: {
                        ...current.company,
                        whatsappMessage: event.target.value,
                      },
                    }))
                  }
                />
              </label>
            </div>

            <h3>أرقام التواصل</h3>
            <div className="admin-list">
              {draft.company.phones.map((phone, index) => (
                <div key={phone.id} className="admin-card">
                  <label className="field">
                    <span>التسمية</span>
                    <input
                      value={phone.label}
                      onChange={(event) =>
                        setDraft((current) => ({
                          ...current,
                          company: {
                            ...current.company,
                            phones: current.company.phones.map((item, i) =>
                              i === index
                                ? { ...item, label: event.target.value }
                                : item,
                            ),
                          },
                        }))
                      }
                    />
                  </label>
                  <label className="field">
                    <span>الرقم</span>
                    <input
                      dir="ltr"
                      value={phone.display}
                      onChange={(event) => {
                        const display = event.target.value
                        setDraft((current) => ({
                          ...current,
                          company: {
                            ...current.company,
                            phones: current.company.phones.map((item, i) =>
                              i === index
                                ? {
                                    ...item,
                                    display,
                                    whatsapp: toWhatsAppNumber(display),
                                  }
                                : item,
                            ),
                          },
                        }))
                      }}
                    />
                  </label>
                  <button
                    type="button"
                    className="btn btn-outline-dark"
                    onClick={() =>
                      setDraft((current) => ({
                        ...current,
                        company: {
                          ...current.company,
                          phones: current.company.phones.filter(
                            (_, i) => i !== index,
                          ),
                        },
                      }))
                    }
                  >
                    حذف الرقم
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="btn btn-outline-dark"
              onClick={() =>
                setDraft((current) => ({
                  ...current,
                  company: {
                    ...current.company,
                    phones: [
                      ...current.company.phones,
                      {
                        id: createId('phone'),
                        label: 'رقم التواصل',
                        display: '',
                        whatsapp: '',
                      },
                    ],
                  },
                }))
              }
            >
              إضافة رقم
            </button>
            <SaveBar
              section="contact"
              label="حفظ التواصل والخريطة"
              onSave={saveContact}
            />
          </section>
        ) : null}

        {tab === 'services' ? (
          <section className="admin-section">
            <div className="admin-section-head">
              <h2>الخدمات</h2>
              <button
                type="button"
                className="btn btn-outline-dark"
                onClick={() => {
                  const next: Service = {
                    id: createId('service'),
                    title: 'خدمة جديدة',
                    image: '/images/services/residential.jpg',
                    summary: 'وصف مختصر للخدمة.',
                    details: 'تفاصيل أوضح عن الخدمة.',
                  }
                  setDraft((current) => ({
                    ...current,
                    services: [...current.services, next],
                  }))
                }}
              >
                إضافة خدمة
              </button>
            </div>
            <div className="admin-list">
              {draft.services.map((service, index) => (
                <div key={service.id} className="admin-card">
                  <div className="admin-thumb">
                    <img src={service.image} alt="" />
                    <label className="btn btn-outline-dark admin-upload">
                      تغيير الصورة
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={(event) =>
                          onImagePick(event, (image) =>
                            setDraft((current) => ({
                              ...current,
                              services: current.services.map((item, i) =>
                                i === index ? { ...item, image } : item,
                              ),
                            })),
                          )
                        }
                      />
                    </label>
                  </div>
                  <label className="field">
                    <span>عنوان الخدمة</span>
                    <input
                      value={service.title}
                      onChange={(event) =>
                        setDraft((current) => ({
                          ...current,
                          services: current.services.map((item, i) =>
                            i === index
                              ? { ...item, title: event.target.value }
                              : item,
                          ),
                        }))
                      }
                    />
                  </label>
                  <label className="field">
                    <span>الملخص</span>
                    <textarea
                      rows={3}
                      value={service.summary}
                      onChange={(event) =>
                        setDraft((current) => ({
                          ...current,
                          services: current.services.map((item, i) =>
                            i === index
                              ? { ...item, summary: event.target.value }
                              : item,
                          ),
                        }))
                      }
                    />
                  </label>
                  <label className="field">
                    <span>التفاصيل</span>
                    <textarea
                      rows={4}
                      value={service.details}
                      onChange={(event) =>
                        setDraft((current) => ({
                          ...current,
                          services: current.services.map((item, i) =>
                            i === index
                              ? { ...item, details: event.target.value }
                              : item,
                          ),
                        }))
                      }
                    />
                  </label>
                  <button
                    type="button"
                    className="btn btn-outline-dark"
                    onClick={() =>
                      setDraft((current) => ({
                        ...current,
                        services: current.services.filter((_, i) => i !== index),
                      }))
                    }
                  >
                    حذف الخدمة
                  </button>
                </div>
              ))}
            </div>
            <SaveBar
              section="services"
              label="حفظ الخدمات"
              onSave={saveServices}
            />
          </section>
        ) : null}

        {tab === 'team' ? (
          <section className="admin-section">
            <div className="admin-section-head">
              <h2>الموظفون</h2>
              <button
                type="button"
                className="btn btn-outline-dark"
                onClick={() => {
                  const next: TeamMember = {
                    id: createId('member'),
                    name: 'موظف جديد',
                    title: 'المسمى الوظيفي',
                    role: 'وصف مختصر للدور',
                    phone: '',
                    whatsapp: '',
                    email: '',
                    image: '/images/team/abdullah.jpg',
                  }
                  setDraft((current) => ({
                    ...current,
                    team: [...current.team, next],
                  }))
                }}
              >
                إضافة موظف
              </button>
            </div>
            <div className="admin-list">
              {draft.team.map((member, index) => (
                <div key={member.id} className="admin-card">
                  <div className="admin-thumb">
                    <img src={member.image} alt="" />
                    <label className="btn btn-outline-dark admin-upload">
                      رفع صورة
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={(event) =>
                          onImagePick(event, (image) =>
                            setDraft((current) => ({
                              ...current,
                              team: current.team.map((item, i) =>
                                i === index ? { ...item, image } : item,
                              ),
                            })),
                          )
                        }
                      />
                    </label>
                  </div>
                  {(
                    [
                      ['name', 'الاسم'],
                      ['title', 'المهنة / الدور'],
                      ['role', 'وصف مختصر'],
                      ['phone', 'الجوال'],
                      ['email', 'البريد'],
                    ] as const
                  ).map(([key, label]) => (
                    <label key={key} className="field">
                      <span>{label}</span>
                      <input
                        dir={key === 'phone' || key === 'email' ? 'ltr' : undefined}
                        value={member[key]}
                        onChange={(event) => {
                          const value = event.target.value
                          setDraft((current) => ({
                            ...current,
                            team: current.team.map((item, i) => {
                              if (i !== index) return item
                              if (key === 'phone') {
                                return {
                                  ...item,
                                  phone: value,
                                  whatsapp: toWhatsAppNumber(value),
                                }
                              }
                              return { ...item, [key]: value }
                            }),
                          }))
                        }}
                      />
                    </label>
                  ))}
                  <button
                    type="button"
                    className="btn btn-outline-dark"
                    onClick={() =>
                      setDraft((current) => ({
                        ...current,
                        team: current.team.filter((_, i) => i !== index),
                      }))
                    }
                  >
                    حذف الموظف
                  </button>
                </div>
              ))}
            </div>
            <SaveBar section="team" label="حفظ الموظفين" onSave={saveTeam} />
          </section>
        ) : null}

        {tab === 'partners' ? (
          <section className="admin-section">
            <div className="admin-section-head">
              <h2>الشركاء</h2>
              <button
                type="button"
                className="btn btn-outline-dark"
                onClick={() => {
                  const next: Partner = {
                    id: createId('partner'),
                    name: 'شريك جديد',
                    logo: '/images/partners/tasannam.png?v=3',
                  }
                  setDraft((current) => ({
                    ...current,
                    partners: [...current.partners, next],
                  }))
                }}
              >
                إضافة شريك
              </button>
            </div>
            <div className="admin-list">
              {draft.partners.map((partner, index) => (
                <div key={partner.id} className="admin-card">
                  <div className="admin-thumb">
                    <img src={partner.logo} alt="" />
                    <label className="btn btn-outline-dark admin-upload">
                      تغيير الشعار
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={(event) =>
                          onImagePick(event, (logo) =>
                            setDraft((current) => ({
                              ...current,
                              partners: current.partners.map((item, i) =>
                                i === index ? { ...item, logo } : item,
                              ),
                            })),
                          )
                        }
                      />
                    </label>
                  </div>
                  <label className="field">
                    <span>اسم الشركة</span>
                    <input
                      value={partner.name}
                      onChange={(event) =>
                        setDraft((current) => ({
                          ...current,
                          partners: current.partners.map((item, i) =>
                            i === index
                              ? { ...item, name: event.target.value }
                              : item,
                          ),
                        }))
                      }
                    />
                  </label>
                  <button
                    type="button"
                    className="btn btn-outline-dark"
                    onClick={() =>
                      setDraft((current) => ({
                        ...current,
                        partners: current.partners.filter((_, i) => i !== index),
                      }))
                    }
                  >
                    حذف الشريك
                  </button>
                </div>
              ))}
            </div>
            <SaveBar
              section="partners"
              label="حفظ الشركاء"
              onSave={savePartners}
            />
          </section>
        ) : null}

        {tab === 'values' ? (
          <section className="admin-section">
            <h2>منهج العمل</h2>
            <div className="admin-list">
              {draft.values.map((value, index) => (
                <div key={`${value.title}-${index}`} className="admin-card">
                  <label className="field">
                    <span>العنوان</span>
                    <input
                      value={value.title}
                      onChange={(event) =>
                        setDraft((current) => ({
                          ...current,
                          values: current.values.map((item, i) =>
                            i === index
                              ? { ...item, title: event.target.value }
                              : item,
                          ),
                        }))
                      }
                    />
                  </label>
                  <label className="field">
                    <span>النص</span>
                    <textarea
                      rows={3}
                      value={value.text}
                      onChange={(event) =>
                        setDraft((current) => ({
                          ...current,
                          values: current.values.map((item, i) =>
                            i === index
                              ? { ...item, text: event.target.value }
                              : item,
                          ),
                        }))
                      }
                    />
                  </label>
                </div>
              ))}
            </div>
            <SaveBar
              section="values"
              label="حفظ منهج العمل"
              onSave={saveValues}
            />
          </section>
        ) : null}

        <div className="admin-footer-actions">
          <button
            type="button"
            className="btn btn-outline-dark"
            onClick={() => void confirmReset()}
            disabled={publishing}
          >
            استعادة البيانات الافتراضية
          </button>
        </div>
      </div>
    </div>
  )
}
