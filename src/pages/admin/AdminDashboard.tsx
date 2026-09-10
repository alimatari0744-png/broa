import { Navigate, Link } from 'react-router-dom'
import { useState, type ChangeEvent } from 'react'
import {
  createId,
  toWhatsAppNumber,
  type Partner,
  type Service,
  type TeamMember,
} from '../../data/site'
import { useSite } from '../../context/SiteContext'

type Tab = 'company' | 'contact' | 'services' | 'team' | 'partners' | 'values'

const tabs: { id: Tab; label: string }[] = [
  { id: 'company', label: 'بيانات المنشأة' },
  { id: 'contact', label: 'التواصل والخريطة' },
  { id: 'services', label: 'الخدمات' },
  { id: 'team', label: 'الموظفون' },
  { id: 'partners', label: 'الشركاء' },
  { id: 'values', label: 'منهج العمل' },
]

async function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}

export function AdminDashboard() {
  const {
    isAdmin,
    logout,
    data,
    updateCompany,
    setServices,
    setTeam,
    setPartners,
    setValues,
    resetData,
  } = useSite()
  const [tab, setTab] = useState<Tab>('company')
  const [savedNote, setSavedNote] = useState('')

  if (!isAdmin) return <Navigate to="/admin" replace />

  function flash() {
    setSavedNote('تم الحفظ — التغييرات تظهر مباشرة في الموقع.')
    window.setTimeout(() => setSavedNote(''), 2500)
  }

  async function onImagePick(
    event: ChangeEvent<HTMLInputElement>,
    onReady: (url: string) => void,
  ) {
    const file = event.target.files?.[0]
    if (!file) return
    const url = await fileToDataUrl(file)
    onReady(url)
    flash()
  }

  return (
    <div className="admin-shell">
      <header className="admin-top">
        <div>
          <p className="eyebrow">لوحة التحكم</p>
          <h1>إدارة محتوى الموقع</h1>
        </div>
        <div className="admin-top-actions">
          <Link to="/" className="btn btn-outline-dark" target="_blank">
            عرض الموقع
          </Link>
          <button type="button" className="btn btn-gold" onClick={logout}>
            خروج
          </button>
        </div>
      </header>

      <p className="admin-hint">
        أقسام الموقع ثابتة ولا يمكن إضافتها أو حذفها. عدّل المحتوى فقط من
        الخانات أدناه، وأي تغيير يتزامن في كل الصفحات.
      </p>

      {savedNote ? <p className="admin-saved">{savedNote}</p> : null}

      <div className="admin-tabs">
        {tabs.map((item) => (
          <button
            key={item.id}
            type="button"
            className={tab === item.id ? 'is-active' : ''}
            onClick={() => setTab(item.id)}
          >
            {item.label}
          </button>
        ))}
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
                    value={data.company[key]}
                    dir={
                      key === 'iban' || key === 'taxNumber' || key === 'email'
                        ? 'ltr'
                        : undefined
                    }
                    onChange={(event) => {
                      updateCompany({ [key]: event.target.value })
                      flash()
                    }}
                  />
                </label>
              ))}
              <label className="field field-full">
                <span>وصف المؤسسة</span>
                <textarea
                  rows={4}
                  value={data.company.description}
                  onChange={(event) => {
                    updateCompany({ description: event.target.value })
                    flash()
                  }}
                />
              </label>
            </div>
          </section>
        ) : null}

        {tab === 'contact' ? (
          <section className="admin-section">
            <h2>التواصل والخريطة</h2>
            <div className="admin-grid">
              <label className="field field-full">
                <span>رابط خريطة الموقع (Embed)</span>
                <input
                  dir="ltr"
                  value={data.company.mapEmbedUrl}
                  onChange={(event) => {
                    updateCompany({ mapEmbedUrl: event.target.value })
                    flash()
                  }}
                />
              </label>
              <label className="field field-full">
                <span>رسالة واتساب الافتراضية</span>
                <textarea
                  rows={3}
                  value={data.company.whatsappMessage}
                  onChange={(event) => {
                    updateCompany({ whatsappMessage: event.target.value })
                    flash()
                  }}
                />
              </label>
            </div>

            <h3>أرقام التواصل</h3>
            <div className="admin-list">
              {data.company.phones.map((phone, index) => (
                <div key={phone.id} className="admin-card">
                  <label className="field">
                    <span>التسمية</span>
                    <input
                      value={phone.label}
                      onChange={(event) => {
                        const phones = data.company.phones.map((item, i) =>
                          i === index
                            ? { ...item, label: event.target.value }
                            : item,
                        )
                        updateCompany({ phones })
                        flash()
                      }}
                    />
                  </label>
                  <label className="field">
                    <span>الرقم</span>
                    <input
                      dir="ltr"
                      value={phone.display}
                      onChange={(event) => {
                        const display = event.target.value
                        const phones = data.company.phones.map((item, i) =>
                          i === index
                            ? {
                                ...item,
                                display,
                                whatsapp: toWhatsAppNumber(display),
                              }
                            : item,
                        )
                        updateCompany({ phones })
                        flash()
                      }}
                    />
                  </label>
                  <button
                    type="button"
                    className="btn btn-outline-dark"
                    onClick={() => {
                      updateCompany({
                        phones: data.company.phones.filter((_, i) => i !== index),
                      })
                      flash()
                    }}
                  >
                    حذف الرقم
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="btn btn-gold"
              onClick={() => {
                updateCompany({
                  phones: [
                    ...data.company.phones,
                    {
                      id: createId('phone'),
                      label: 'رقم التواصل',
                      display: '',
                      whatsapp: '',
                    },
                  ],
                })
                flash()
              }}
            >
              إضافة رقم
            </button>
          </section>
        ) : null}

        {tab === 'services' ? (
          <section className="admin-section">
            <div className="admin-section-head">
              <h2>الخدمات</h2>
              <button
                type="button"
                className="btn btn-gold"
                onClick={() => {
                  const next: Service = {
                    id: createId('service'),
                    title: 'خدمة جديدة',
                    image: '/images/services/residential.jpg',
                    summary: 'وصف مختصر للخدمة.',
                    details: 'تفاصيل أوضح عن الخدمة.',
                  }
                  setServices([...data.services, next])
                  flash()
                }}
              >
                إضافة خدمة
              </button>
            </div>
            <div className="admin-list">
              {data.services.map((service, index) => (
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
                          onImagePick(event, (image) => {
                            setServices(
                              data.services.map((item, i) =>
                                i === index ? { ...item, image } : item,
                              ),
                            )
                          })
                        }
                      />
                    </label>
                  </div>
                  <label className="field">
                    <span>عنوان الخدمة</span>
                    <input
                      value={service.title}
                      onChange={(event) => {
                        setServices(
                          data.services.map((item, i) =>
                            i === index
                              ? { ...item, title: event.target.value }
                              : item,
                          ),
                        )
                        flash()
                      }}
                    />
                  </label>
                  <label className="field">
                    <span>الملخص</span>
                    <textarea
                      rows={3}
                      value={service.summary}
                      onChange={(event) => {
                        setServices(
                          data.services.map((item, i) =>
                            i === index
                              ? { ...item, summary: event.target.value }
                              : item,
                          ),
                        )
                        flash()
                      }}
                    />
                  </label>
                  <label className="field">
                    <span>التفاصيل</span>
                    <textarea
                      rows={4}
                      value={service.details}
                      onChange={(event) => {
                        setServices(
                          data.services.map((item, i) =>
                            i === index
                              ? { ...item, details: event.target.value }
                              : item,
                          ),
                        )
                        flash()
                      }}
                    />
                  </label>
                  <button
                    type="button"
                    className="btn btn-outline-dark"
                    onClick={() => {
                      setServices(data.services.filter((_, i) => i !== index))
                      flash()
                    }}
                  >
                    حذف الخدمة
                  </button>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {tab === 'team' ? (
          <section className="admin-section">
            <div className="admin-section-head">
              <h2>الموظفون</h2>
              <button
                type="button"
                className="btn btn-gold"
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
                  setTeam([...data.team, next])
                  flash()
                }}
              >
                إضافة موظف
              </button>
            </div>
            <div className="admin-list">
              {data.team.map((member, index) => (
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
                          onImagePick(event, (image) => {
                            setTeam(
                              data.team.map((item, i) =>
                                i === index ? { ...item, image } : item,
                              ),
                            )
                          })
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
                          setTeam(
                            data.team.map((item, i) => {
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
                          )
                          flash()
                        }}
                      />
                    </label>
                  ))}
                  <button
                    type="button"
                    className="btn btn-outline-dark"
                    onClick={() => {
                      setTeam(data.team.filter((_, i) => i !== index))
                      flash()
                    }}
                  >
                    حذف الموظف
                  </button>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {tab === 'partners' ? (
          <section className="admin-section">
            <div className="admin-section-head">
              <h2>الشركاء</h2>
              <button
                type="button"
                className="btn btn-gold"
                onClick={() => {
                  const next: Partner = {
                    id: createId('partner'),
                    name: 'شريك جديد',
                    logo: '/images/partners/tasannam.png?v=3',
                  }
                  setPartners([...data.partners, next])
                  flash()
                }}
              >
                إضافة شريك
              </button>
            </div>
            <div className="admin-list">
              {data.partners.map((partner, index) => (
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
                          onImagePick(event, (logo) => {
                            setPartners(
                              data.partners.map((item, i) =>
                                i === index ? { ...item, logo } : item,
                              ),
                            )
                          })
                        }
                      />
                    </label>
                  </div>
                  <label className="field">
                    <span>اسم الشركة</span>
                    <input
                      value={partner.name}
                      onChange={(event) => {
                        setPartners(
                          data.partners.map((item, i) =>
                            i === index
                              ? { ...item, name: event.target.value }
                              : item,
                          ),
                        )
                        flash()
                      }}
                    />
                  </label>
                  <button
                    type="button"
                    className="btn btn-outline-dark"
                    onClick={() => {
                      setPartners(data.partners.filter((_, i) => i !== index))
                      flash()
                    }}
                  >
                    حذف الشريك
                  </button>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {tab === 'values' ? (
          <section className="admin-section">
            <h2>منهج العمل</h2>
            <div className="admin-list">
              {data.values.map((value, index) => (
                <div key={`${value.title}-${index}`} className="admin-card">
                  <label className="field">
                    <span>العنوان</span>
                    <input
                      value={value.title}
                      onChange={(event) => {
                        setValues(
                          data.values.map((item, i) =>
                            i === index
                              ? { ...item, title: event.target.value }
                              : item,
                          ),
                        )
                        flash()
                      }}
                    />
                  </label>
                  <label className="field">
                    <span>النص</span>
                    <textarea
                      rows={3}
                      value={value.text}
                      onChange={(event) => {
                        setValues(
                          data.values.map((item, i) =>
                            i === index
                              ? { ...item, text: event.target.value }
                              : item,
                          ),
                        )
                        flash()
                      }}
                    />
                  </label>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <div className="admin-footer-actions">
          <button
            type="button"
            className="btn btn-outline-dark"
            onClick={() => {
              if (window.confirm('إعادة كل البيانات للوضع الافتراضي؟')) {
                resetData()
                flash()
              }
            }}
          >
            استعادة البيانات الافتراضية
          </button>
        </div>
      </div>
    </div>
  )
}
