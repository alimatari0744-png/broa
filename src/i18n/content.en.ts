import type { SiteData } from '../data/site'

/** ترجمة المحتوى المنشور للعرض بالإنجليزية (حسب المعرّف) */
export const englishContent = {
  company: {
    name: 'Broa Trading Establishment',
    tagline: 'General contracting and equipment rental',
    slogan: 'We build and deliver with quality and professionalism',
    description:
      'A Saudi establishment specialized in general contracting, construction and finishing, petrol station development, equipment rental, and building materials supply.',
    whatsappMessage:
      'Hello, I would like to inquire about Broa Trading Establishment services',
    phoneLabel: 'Contact number',
    seoTitle: 'Broa Trading Establishment | General Contracting & Equipment Rental',
    seoDescription:
      'Official website of Broa Trading Establishment — general contracting, petrol stations, structural works, finishing, equipment rental, and building materials.',
  },
  aboutExtra:
    'We work in contracting and construction with clear professionalism, delivering integrated services covering residential projects, petrol stations, structural and finishing works, as well as equipment rental and materials supply.',
  services: {
    residential: {
      title: 'General contracting for residential buildings',
      summary:
        'Delivering residential projects from foundation to handover, with close site follow-up and high quality and safety standards.',
      details:
        'We provide end-to-end residential contracting solutions, including execution management, coordination with consultants, and adherence to drawings and schedules, with careful finishing quality and client satisfaction.',
    },
    petrol: {
      title: 'Petrol station construction and fit-out',
      summary:
        'Building and equipping fuel stations to technical and regulatory requirements, from civil works to operational systems.',
      details:
        'We handle petrol station construction and operational fit-out per approved requirements, with precision, site safety, and quality equipment readiness.',
    },
    structure: {
      title: 'Structural / shell works',
      summary:
        'Executing building structural frames with engineering accuracy, including foundations, columns, slabs, and walls.',
      details:
        'We execute shell works per approved structural drawings, with quality control on concrete, steel, and leveling for durability and readiness for finishing stages.',
    },
    finishing: {
      title: 'Finishing works',
      summary:
        'Interior and exterior finishing at a high standard — flooring, painting, ceilings, facades, and final details.',
      details:
        'We focus on finishing details that define the final look of the project, from material selection and installation to fine finishing that reflects project identity.',
    },
    equipment: {
      title: 'Equipment rental',
      summary:
        'Providing construction equipment and machinery with high operational readiness and regular maintenance.',
      details:
        'We supply equipment that supports site teams, with operational readiness and fast delivery to keep work moving without delay.',
    },
    materials: {
      title: 'Building materials supply',
      summary:
        'Supplying core and finishing materials from reliable sources, with quality and on-time delivery.',
      details:
        'We supply materials when the project needs them, matching required specs and continuous availability to support quality execution.',
    },
  } as Record<string, { title: string; summary: string; details: string }>,
  team: {
    nasser: {
      name: 'Nasser bin Sulaiman bin Mihdan Al-Shehri',
      title: 'General Manager',
      role: 'Owner',
    },
    mohammed: {
      name: 'Mohammed Khattab',
      title: 'Executive Manager — Projects & Public Relations',
      role: 'Executive lead across all projects',
    },
  } as Record<string, { name: string; title: string; role: string }>,
  partners: {
    tasannam: 'Tasannam Contracting Company',
    rawabi: 'Muheet Al Rawabi Company',
    azhar: 'Azhar Holding Company',
    kunooz: 'Kunooz Company',
  } as Record<string, string>,
  values: [
    {
      title: 'Execution quality',
      text: 'We follow precise standards at every stage, from structure to final handover.',
    },
    {
      title: 'On-time delivery',
      text: 'We plan clearly and protect the schedule without compromising quality.',
    },
    {
      title: 'Site safety',
      text: 'Team and site safety remain a top priority in daily work.',
    },
    {
      title: 'Trusted partnership',
      text: 'We build long-term relationships with clients and partners based on transparency.',
    },
  ],
} as const

export function localizeSiteData(data: SiteData, lang: 'ar' | 'en'): SiteData {
  if (lang === 'ar') return data

  const en = englishContent
  return {
    ...data,
    company: {
      ...data.company,
      name: en.company.name,
      tagline: en.company.tagline,
      slogan: en.company.slogan,
      description: en.company.description,
      whatsappMessage: en.company.whatsappMessage,
      phones: data.company.phones.map((phone) => ({
        ...phone,
        label: en.company.phoneLabel,
      })),
      seo: {
        title: en.company.seoTitle,
        description: en.company.seoDescription,
      },
    },
    services: data.services.map((service) => {
      const tr = en.services[service.id]
      if (!tr) return service
      return { ...service, ...tr }
    }),
    team: data.team.map((member) => {
      const tr = en.team[member.id]
      if (!tr) return member
      return { ...member, ...tr }
    }),
    partners: data.partners.map((partner) => {
      const name = en.partners[partner.id]
      return name ? { ...partner, name } : partner
    }),
    values: data.values.map((value, index) => en.values[index] ?? value),
  }
}
