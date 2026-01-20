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

const normalizeTenantDomain = (value: string) =>
  value
    .trim()
    .replace(/^https?:\/\//, '')
    .replace(/\/.*$/, '')

const readTenantDomainFromRequest = () => {
  try {
    const headerList = headers()
    return (
      headerList.get('x-tenant-domain') ??
      headerList.get('x-forwarded-host') ??
      headerList.get('host') ??
      headerList.get('origin') ??
      headerList.get('referer') ??
      ''
    )
  } catch {
    return ''
  }
}

const buildApiUrl = (path: string) => {
  const baseUrl = resolveApiBaseUrl()
  return path.startsWith('/') ? `${baseUrl}${path}` : `${baseUrl}/${path}`
}

const resolveTenantDomain = (
  headerBag: Headers,
  explicitTenantDomain?: string,
) => {
  if (explicitTenantDomain) {
    return normalizeTenantDomain(explicitTenantDomain)
  }

  const headerTenantDomain = headerBag.get('x-tenant-domain')
  if (headerTenantDomain) {
    return normalizeTenantDomain(headerTenantDomain)
  }

  const requestTenantDomain = readTenantDomainFromRequest()
  return requestTenantDomain ? normalizeTenantDomain(requestTenantDomain) : ''
}

const buildHeaders = (
  initHeaders?: HeadersInit,
  tenantDomain?: string,
) => {
  const headerBag = new Headers(initHeaders)
  const resolvedTenantDomain = resolveTenantDomain(headerBag, tenantDomain)

  if (!resolvedTenantDomain) {
    throw new Error(
      'Tenant domain header is missing. Pass tenantDomain or send Host/X-Forwarded-Host/Origin.',
    )
  }

  headerBag.set('x-tenant-domain', resolvedTenantDomain)
  return headerBag
}

export type ApiFetchInit = RequestInit & { tenantDomain?: string }

export const apiFetch = async (path: string, init: ApiFetchInit = {}) => {
  const { tenantDomain, headers: initHeaders, ...fetchInit } = init
  const url = buildApiUrl(path)
  const headerBag = buildHeaders(initHeaders, tenantDomain)

  return fetch(url, {
    ...fetchInit,
    headers: headerBag,
    cache: 'no-store',
  })
}
