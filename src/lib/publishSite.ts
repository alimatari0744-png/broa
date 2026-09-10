import type { SiteData } from '../data/site'
import {
  deleteRepoFile,
  decodeDataUrl,
  extensionForMime,
  isDataUrl,
  isManagedImagePath,
  managedPublicPath,
  publicPathToRepoPath,
  putBinaryFile,
  putTextFile,
  SITE_JSON_PATH,
} from './githubStore'

type ImageKind = 'services' | 'team' | 'partners'

async function persistImage(options: {
  kind: ImageKind
  id: string
  value: string
  token: string
  cacheStamp: number
}) {
  const { kind, id, value, token, cacheStamp } = options
  if (!isDataUrl(value)) {
    // مسار موجود (أصلي أو managed) — لا نعيد رفعه ولا نغيّر اسمه
    return value
  }

  const { mime, bytes } = decodeDataUrl(value)
  const ext = extensionForMime(mime)
  const publicPath = managedPublicPath(kind, id, ext)
  const repoPath = publicPathToRepoPath(publicPath)

  // نفس المسار لكل عنصر = استبدال الصورة السابقة وتوفير المساحة
  await putBinaryFile({
    path: repoPath,
    bytes,
    message: `chore(content): update ${kind} image ${id}`,
    token,
  })

  // احذف الامتدادات الأخرى لنفس العنصر إن وُجدت
  for (const otherExt of ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg']) {
    if (otherExt === ext) continue
    await deleteRepoFile({
      path: publicPathToRepoPath(managedPublicPath(kind, id, otherExt)),
      message: `chore(content): remove old ${kind} image ${id}.${otherExt}`,
      token,
    })
  }

  return `${publicPath}?v=${cacheStamp}`
}

async function removeManagedIfNeeded(
  value: string | undefined,
  token: string,
  message: string,
) {
  if (!value) return
  const clean = value.split('?')[0]
  if (!isManagedImagePath(clean)) return
  await deleteRepoFile({
    path: publicPathToRepoPath(clean),
    message,
    token,
  })
}

/**
 * يرفع الصور المستبدلة إلى GitHub (مع الاستبدال على نفس المسار)
 * ثم يحفظ site.json كمصدر الحقيقة المنشور.
 * لا يلمس ملفات الاستعادة الأصلية ولا site.defaults.json.
 */
export async function publishSiteData(options: {
  data: SiteData
  previous?: SiteData
  token: string
  message: string
}) {
  const { data, previous, token, message } = options
  const cacheStamp = Date.now()
  const next: SiteData = structuredClone(data)

  for (const service of next.services) {
    service.image = await persistImage({
      kind: 'services',
      id: service.id,
      value: service.image,
      token,
      cacheStamp,
    })
  }

  for (const member of next.team) {
    member.image = await persistImage({
      kind: 'team',
      id: member.id,
      value: member.image,
      token,
      cacheStamp,
    })
  }

  for (const partner of next.partners) {
    partner.logo = await persistImage({
      kind: 'partners',
      id: partner.id,
      value: partner.logo,
      token,
      cacheStamp,
    })
  }

  if (previous) {
    const nextManaged = new Set(
      [
        ...next.services.map((item) => item.image.split('?')[0]),
        ...next.team.map((item) => item.image.split('?')[0]),
        ...next.partners.map((item) => item.logo.split('?')[0]),
      ].filter(isManagedImagePath),
    )

    const previousManaged = [
      ...previous.services.map((item) => item.image),
      ...previous.team.map((item) => item.image),
      ...previous.partners.map((item) => item.logo),
    ]

    for (const value of previousManaged) {
      const clean = value.split('?')[0]
      if (!isManagedImagePath(clean) || nextManaged.has(clean)) continue
      await removeManagedIfNeeded(
        clean,
        token,
        `chore(content): remove unused managed image`,
      )
    }
  }

  await putTextFile({
    path: SITE_JSON_PATH,
    text: `${JSON.stringify(next, null, 2)}\n`,
    message,
    token,
  })

  return next
}
