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
      'https://www.openstreetmap.org/export/embed.html?bbox=46.52%2C24.58%2C46.88%2C24.85&layer=mapnik',
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
      image: '/images/team/abdullah.jpg',
    },
    {
      id: 'mohammed',
      name: 'محمد خطاب',
      title: 'مدير تنفيذي المشاريع والعلاقات العامة',
      role: 'مسؤول تنفيذي بجميع المشاريع',
      phone: '0502622476',
      whatsapp: '966502622476',
      email: 'Troytotroy86@gmail.com',
      image: '/images/team/khaled.jpg',
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
