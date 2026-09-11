/**
 * البيانات الافتراضية للموقع.
 * لوحة التحكم تحفظ التعديلات في المتصفح وتتزامن عبر كل الصفحات.
 */

export type Phone = {
  id: string
  label: string
  display: string
  whatsapp: string
}

export type Company = {
  name: string
  tagline: string
  slogan: string
  description: string
  commercialRegister: string
  taxNumber: string
  iban: string
  email: string
  phones: Phone[]
  whatsappMessage: string
  mapEmbedUrl: string
  seo: {
    title: string
    description: string
  }
}

export type Service = {
  id: string
  title: string
  image: string
  summary: string
  details: string
}

export type TeamMember = {
  id: string
  name: string
  title: string
  role: string
  phone: string
  whatsapp: string
  email: string
  image: string
}

export type Partner = {
  id: string
  name: string
  logo: string
}

export type ValueItem = {
  title: string
  text: string
}

export type SiteData = {
  company: Company
  services: Service[]
  team: TeamMember[]
  partners: Partner[]
  values: ValueItem[]
}

export const navLinks = [
  { to: '/', label: 'الرئيسية' },
  { to: '/about', label: 'نبذة عن المؤسسة' },
  { to: '/services', label: 'خدماتنا' },
  { to: '/team', label: 'فريق العمل' },
  { to: '/partners', label: 'شركاء النجاح' },
  { to: '/contact', label: 'تواصل معنا' },
] as const

export const defaultSiteData: SiteData = {
  company: {
    name: 'مؤسسة بروع التجارية',
    tagline: 'للمقاولات العامة وتأجير المعدات',
    slogan: 'نبني وننجز بمعايير الجودة والاحتراف',
    description:
      'مؤسسة سعودية متخصصة في المقاولات العامة، أعمال البناء والتشطيب، إنشاء وتجهيز محطات البترول، تأجير المعدات، وتوريد مواد البناء.',
    commercialRegister: '7006720796',
    taxNumber: '302166810800003',
    iban: 'SA0710000046800001125807',
    email: 'info@broa.sa',
    phones: [
      {
        id: 'phone-1',
        label: 'رقم التواصل',
        display: '0592589204',
        whatsapp: '966592589204',
      },
      {
        id: 'phone-2',
        label: 'رقم التواصل',
        display: '0502622476',
        whatsapp: '966502622476',
      },
    ],
    whatsappMessage:
      'السلام عليكم، أرغب في الاستفسار عن خدمات مؤسسة بروع التجارية',
    mapEmbedUrl:
      'https://www.google.com/maps?q=24.7136,46.6753&z=12&output=embed',
    seo: {
      title: 'مؤسسة بروع التجارية | المقاولات العامة وتأجير المعدات',
      description:
        'الموقع الرسمي لمؤسسة بروع التجارية — مقاولات عامة، إنشاء وتجهيز محطات البترول، أعمال العظم والتشطيب، تأجير المعدات، وتوريد مواد البناء.',
    },
  },
  services: [
    {
      id: 'residential',
      title: 'المقاولات العامة للمباني السكنية',
      image: '/images/services/residential.jpg',
      summary:
        'تنفيذ مشاريع المباني السكنية من التأسيس حتى التسليم، بمتابعة ميدانية دقيقة ومعايير جودة وسلامة عالية.',
      details:
        'نقدم حلول مقاولات متكاملة للمباني السكنية، تشمل إدارة التنفيذ، التنسيق مع الاستشاريين، والالتزام بالمخططات والجدول الزمني، مع الحرص على جودة التشطيب النهائي ورضا العميل.',
    },
    {
      id: 'petrol',
      title: 'إنشاء وتجهيز محطات البترول',
      image: '/images/services/petrol.jpg',
      summary:
        'إنشاء وتجهيز محطات الوقود وفق المتطلبات الفنية والتنظيمية، من الأعمال الإنشائية إلى التجهيزات التشغيلية.',
      details:
        'نتولى أعمال إنشاء محطات البترول وتجهيزها تشغيليًا وفق الاشتراطات المعتمدة، مع الاهتمام بدقة التنفيذ، سلامة الموقع، وجودة التجهيزات بما يخدم جاهزية المحطة للعمل.',
    },
    {
      id: 'structure',
      title: 'أعمال العظم',
      image: '/images/services/structure.jpg',
      summary:
        'تنفيذ الهيكل الإنشائي للمباني بدقة هندسية، بما يشمل القواعد والأعمدة والأسقف والجدران.',
      details:
        'ننفذ أعمال العظم وفق المخططات الإنشائية المعتمدة، مع ضبط الجودة في الخرسانة والحديد والتسوية، لضمان متانة المبنى واستعداده لمراحل البناء والتشطيب التالية.',
    },
    {
      id: 'finishing',
      title: 'أعمال التشطيب',
      image: '/images/services/finishing.jpg',
      summary:
        'تشطيب داخلي وخارجي بمستوى فاخر يشمل الأرضيات، الدهانات، الأسقف، الواجهات، والتفاصيل النهائية.',
      details:
        'نعتني بتفاصيل التشطيب التي تُظهر المشروع بصورته النهائية، من اختيار المواد وتنفيذها إلى ضبط التشطيبات الدقيقة، بما يعكس هوية المشروع ويرفع قيمة التنفيذ.',
    },
    {
      id: 'equipment',
      title: 'تأجير المعدات',
      image: '/images/services/equipment.jpg',
      summary:
        'توفير معدات البناء والآليات اللازمة لتنفيذ المشاريع، بجاهزية تشغيل عالية وصيانة دورية.',
      details:
        'نوفر معدات وآليات تدعم فرق العمل في المواقع، مع الالتزام بجاهزية التشغيل وسرعة التوريد، بما يساعد على استمرار العمل دون تأخير ويخفض تعطّل التنفيذ.',
    },
    {
      id: 'materials',
      title: 'توريد مواد البناء',
      image: '/images/services/materials.jpg',
      summary:
        'توريد مواد البناء الأساسية والتشطيبية من مصادر موثوقة، مع الالتزام بالجودة ومواعيد التوريد.',
      details:
        'نورد مواد البناء التي يحتاجها المشروع في الوقت المناسب، مع مراعاة المواصفات المطلوبة واستمرارية الإمداد، لدعم سير العمل والحفاظ على جودة التنفيذ.',
    },
  ],
  team: [
    {
      id: 'nasser',
      name: 'ناصر بن سليمان بن محضان الشهري',
      title: 'مدير عام',
      role: 'المالك',
      phone: '0592589204',
      whatsapp: '966592589204',
      email: 'nasser_s059@hotmail.com',
      image: '/images/team/nasser.png',
    },
    {
      id: 'mohammed',
      name: 'محمد خطاب',
      title: 'مدير تنفيذي المشاريع والعلاقات العامة',
      role: 'مسؤول تنفيذي بجميع المشاريع',
      phone: '0502622476',
      whatsapp: '966502622476',
      email: 'Troytotroy86@gmail.com',
      image: '/images/team/mohammed.png',
    },
  ],
  partners: [
    {
      id: 'tasannam',
      name: 'شركة تسنم للمقاولات',
      logo: '/images/partners/tasannam.png?v=3',
    },
    {
      id: 'rawabi',
      name: 'شركة محيط الروابي',
      logo: '/images/partners/rawabi.png?v=3',
    },
    {
      id: 'azhar',
      name: 'شركة أزهر القابضة',
      logo: '/images/partners/azhar.png?v=3',
    },
    {
      id: 'kunooz',
      name: 'شركة كنوز',
      logo: '/images/partners/kunooz.png?v=3',
    },
  ],
  values: [
    {
      title: 'جودة التنفيذ',
      text: 'نلتزم بمعايير دقيقة في كل مرحلة، من العظم حتى التسليم النهائي.',
    },
    {
      title: 'التزام بالمواعيد',
      text: 'نخطط للمشروع بوضوح ونحافظ على الجدول الزمني دون الإخلال بالجودة.',
    },
    {
      title: 'سلامة الموقع',
      text: 'نضع سلامة الفرق والموقع في مقدمة أولويات العمل اليومي.',
    },
    {
      title: 'شراكة موثوقة',
      text: 'نبني علاقات طويلة الأمد مع العملاء وشركاء النجاح على أساس الشفافية.',
    },
  ],
}

/** توافق خلفي مع الاستيرادات القديمة أثناء الانتقال */
export const company = defaultSiteData.company
export const services = defaultSiteData.services
export const team = defaultSiteData.team
export const partners = defaultSiteData.partners
export const values = defaultSiteData.values

export function toWhatsAppNumber(phone: string) {
  const digits = phone.replace(/\D/g, '')
  if (digits.startsWith('966')) return digits
  if (digits.startsWith('0')) return `966${digits.slice(1)}`
  if (digits.startsWith('5') && digits.length === 9) return `966${digits}`
  return digits
}

export function whatsappUrl(number: string, message?: string) {
  const text = encodeURIComponent(
    message ?? defaultSiteData.company.whatsappMessage,
  )
  return `https://wa.me/${number}?text=${text}`
}

export function createId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`
}

/**
 * يستخرج أفضل إحداثيات ودرجة تقريب من رابط خرائط جوجل.
 * الأولوية لإحداثيات الدبوس (!3d!4d) ثم مركز العرض (@lat,lng,zoom).
 */
function extractMapPin(raw: string): { lat: string; lng: string; zoom: number } | null {
  const pinMatch = raw.match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/)
  const atMatch = raw.match(
    /@(-?\d+\.\d+),(-?\d+\.\d+)(?:,(\d+(?:\.\d+)?)z)?/,
  )
  const llMatch = raw.match(/[?&](?:ll|center)=(-?\d+\.\d+),(-?\d+\.\d+)/i)
  const qCoordMatch = raw.match(
    /[?&]q=(-?\d+\.\d+)[,+\s](-?\d+\.\d+)/i,
  )

  let lat: string | null = null
  let lng: string | null = null
  let zoom = 17

  if (pinMatch) {
    lat = pinMatch[1]
    lng = pinMatch[2]
  } else if (atMatch) {
    lat = atMatch[1]
    lng = atMatch[2]
  } else if (llMatch) {
    lat = llMatch[1]
    lng = llMatch[2]
  } else if (qCoordMatch) {
    lat = qCoordMatch[1]
    lng = qCoordMatch[2]
  }

  if (atMatch?.[3]) {
    zoom = Math.min(21, Math.max(3, Math.round(Number(atMatch[3]))))
  } else if (pinMatch) {
    zoom = 18
  }

  const zoomParam = raw.match(/[?&]z=(\d+)/i)
  if (zoomParam) {
    zoom = Math.min(21, Math.max(3, Number(zoomParam[1])))
  }

  if (!lat || !lng) return null
  return { lat, lng, zoom }
}

function buildCoordEmbed(lat: string, lng: string, zoom: number) {
  return `https://www.google.com/maps?q=${lat},${lng}&ll=${lat},${lng}&z=${zoom}&hl=ar&output=embed`
}

/**
 * يحوّل رابط خرائط جوجل (مشاركة / مكان / إحداثيات / كود embed)
 * إلى رابط iframe بدقة أعلى قدر الإمكان.
 */
export function toMapEmbedUrl(input: string) {
  let raw = input.trim()
  if (!raw) return raw

  const iframeSrc = raw.match(/src=["']([^"']+)["']/i)
  if (iframeSrc) raw = iframeSrc[1].trim()

  if (
    raw.includes('/maps/embed') ||
    /[?&]output=embed\b/i.test(raw) ||
    raw.includes('openstreetmap.org/export/embed')
  ) {
    return raw
  }

  const pin = extractMapPin(raw)
  if (pin) return buildCoordEmbed(pin.lat, pin.lng, pin.zoom)

  try {
    const url = new URL(raw)
    const q =
      url.searchParams.get('q') ||
      url.searchParams.get('query') ||
      url.searchParams.get('destination')
    if (q) {
      const fromQ = extractMapPin(`?q=${q}`)
      if (fromQ) return buildCoordEmbed(fromQ.lat, fromQ.lng, fromQ.zoom)
      return `https://www.google.com/maps?q=${encodeURIComponent(q)}&z=17&hl=ar&output=embed`
    }

    const placeMatch = url.pathname.match(/\/place\/([^/]+)/)
    if (placeMatch) {
      const place = decodeURIComponent(placeMatch[1].replace(/\+/g, ' '))
      return `https://www.google.com/maps?q=${encodeURIComponent(place)}&z=17&hl=ar&output=embed`
    }

    const cidHex = raw.match(/!1s(0x[0-9a-f]+):(0x[0-9a-f]+)/i)
    if (cidHex) {
      try {
        const cid = BigInt(cidHex[2]).toString(10)
        return `https://www.google.com/maps?cid=${cid}&hl=ar&z=17&output=embed`
      } catch {
        // تجاهل
      }
    }
  } catch {
    // نص حر أو رابط غير مكتمل
  }

  return `https://www.google.com/maps?q=${encodeURIComponent(raw)}&z=17&hl=ar&output=embed`
}
