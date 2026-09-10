/** إعدادات مستودع المحتوى المنشور على GitHub */
export const GITHUB_REPO = {
  owner: 'alimatari0744-png',
  repo: 'broa',
  branch: 'main',
} as const

export const SITE_JSON_PATH = 'public/data/site.json'
/** ملف الاستعادة الفردية — لا يُكتب عليه أبدًا من لوحة التحكم */
export const SITE_DEFAULTS_PATH = 'public/data/site.defaults.json'
export const MANAGED_IMAGE_ROOT = 'public/images/managed'

const TOKEN_KEY = 'broa-github-token'

export function getGithubToken() {
  const fromSession = sessionStorage.getItem(TOKEN_KEY)
  if (fromSession) return fromSession
  const fromEnv = import.meta.env.VITE_GITHUB_TOKEN
  return typeof fromEnv === 'string' ? fromEnv.trim() : ''
}

export function setGithubToken(token: string) {
  const value = token.trim()
  if (value) sessionStorage.setItem(TOKEN_KEY, value)
  else sessionStorage.removeItem(TOKEN_KEY)
}

/** يفعّل توكن البيئة تلقائياً عند دخول لوحة التحكم (بدون حقول في الواجهة) */
export function ensureGithubTokenFromEnv() {
  const token = getGithubToken()
  if (token) setGithubToken(token)
  return Boolean(token)
}

/** مسارات مسموح بالكتابة عليها فقط (الاستعادة الأصلية محمية) */
export function assertWritableRepoPath(path: string) {
  if (path === SITE_JSON_PATH) return
  if (path.startsWith(`${MANAGED_IMAGE_ROOT}/`)) return
  throw new Error(
    `مسار محمي ولا يمكن تعديله من لوحة التحكم: ${path}`,
  )
}

function apiUrl(path: string) {
  const { owner, repo } = GITHUB_REPO
  return `https://api.github.com/repos/${owner}/${repo}/contents/${path}`
}

function authHeaders(token: string): HeadersInit {
  return {
    Accept: 'application/vnd.github+json',
    Authorization: `Bearer ${token}`,
    'X-GitHub-Api-Version': '2022-11-28',
  }
}

export async function getFileSha(path: string, token: string) {
  const response = await fetch(
    `${apiUrl(path)}?ref=${encodeURIComponent(GITHUB_REPO.branch)}`,
    { headers: authHeaders(token) },
  )
  if (response.status === 404) return null
  if (!response.ok) {
    throw new Error(`تعذر قراءة الملف من GitHub (${response.status})`)
  }
  const data = (await response.json()) as { sha?: string }
  return data.sha ?? null
}

function toBase64(bytes: Uint8Array) {
  let binary = ''
  const chunk = 0x8000
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk))
  }
  return btoa(binary)
}

export async function putRepoFile(options: {
  path: string
  contentBase64: string
  message: string
  token: string
}) {
  const { path, contentBase64, message, token } = options
  assertWritableRepoPath(path)
  const sha = await getFileSha(path, token)
  const response = await fetch(apiUrl(path), {
    method: 'PUT',
    headers: {
      ...authHeaders(token),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message,
      content: contentBase64,
      branch: GITHUB_REPO.branch,
      ...(sha ? { sha } : {}),
    }),
  })

  if (!response.ok) {
    const detail = await response.text()
    throw new Error(
      `تعذر حفظ ${path} على GitHub (${response.status}): ${detail.slice(0, 180)}`,
    )
  }
}

export async function putTextFile(options: {
  path: string
  text: string
  message: string
  token: string
}) {
  const bytes = new TextEncoder().encode(options.text)
  await putRepoFile({
    path: options.path,
    contentBase64: toBase64(bytes),
    message: options.message,
    token: options.token,
  })
}

export async function putBinaryFile(options: {
  path: string
  bytes: Uint8Array
  message: string
  token: string
}) {
  await putRepoFile({
    path: options.path,
    contentBase64: toBase64(options.bytes),
    message: options.message,
    token: options.token,
  })
}

export async function deleteRepoFile(options: {
  path: string
  message: string
  token: string
}) {
  assertWritableRepoPath(options.path)
  const sha = await getFileSha(options.path, options.token)
  if (!sha) return
  const response = await fetch(apiUrl(options.path), {
    method: 'DELETE',
    headers: {
      ...authHeaders(options.token),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: options.message,
      sha,
      branch: GITHUB_REPO.branch,
    }),
  })
  if (!response.ok && response.status !== 404) {
    throw new Error(`تعذر حذف ${options.path} (${response.status})`)
  }
}

export function decodeDataUrl(dataUrl: string) {
  const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/)
  if (!match) throw new Error('صيغة الصورة غير مدعومة')
  const mime = match[1]
  const binary = atob(match[2])
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i)
  return { mime, bytes }
}

export function extensionForMime(mime: string) {
  if (mime.includes('png')) return 'png'
  if (mime.includes('webp')) return 'webp'
  if (mime.includes('gif')) return 'gif'
  if (mime.includes('svg')) return 'svg'
  return 'jpg'
}

export function isDataUrl(value: string) {
  return value.startsWith('data:')
}

export function isManagedImagePath(value: string) {
  return value.startsWith('/images/managed/')
}

export function managedPublicPath(
  kind: 'services' | 'team' | 'partners',
  id: string,
  ext: string,
) {
  const safeId = id.replace(/[^a-zA-Z0-9_-]/g, '-')
  return `/images/managed/${kind}/${safeId}.${ext}`
}

export function publicPathToRepoPath(publicPath: string) {
  const clean = publicPath.split('?')[0].replace(/^\//, '')
  return `public/${clean}`
}
