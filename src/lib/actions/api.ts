'use server'

import { headers } from 'next/headers'

const resolveApiBaseUrl = () => {
  const baseUrl =
    process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL
  if (!baseUrl) {
    throw new Error('API_BASE_URL is not set')
  }
  return baseUrl.replace(/\/$/, '')
}

const resolveTenantHost = () => {
  if (process.env.TENANT_HOST) {
    return process.env.TENANT_HOST
  }

  const headerList = headers()
  return headerList.get('x-forwarded-host') ?? headerList.get('host') ?? ''
}

const buildApiUrl = (path: string) => {
  const baseUrl = resolveApiBaseUrl()
  return path.startsWith('/') ? `${baseUrl}${path}` : `${baseUrl}/${path}`
}

const buildHeaders = (initHeaders?: HeadersInit) => {
  const headerBag = new Headers(initHeaders)
  const tenantHost = resolveTenantHost()

  if (!tenantHost) {
    throw new Error(
      'Tenant host header is missing. Set TENANT_HOST or send Host/X-Forwarded-Host.',
    )
  }

  headerBag.set('X-Forwarded-Host', tenantHost)
  return headerBag
}

export const fetchApi = async (path: string, init: RequestInit = {}) => {
  const url = buildApiUrl(path)
  const headerBag = buildHeaders(init.headers)

  return fetch(url, {
    ...init,
    headers: headerBag,
    cache: 'no-store',
  })
}
