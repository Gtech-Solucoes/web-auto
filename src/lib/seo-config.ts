import { Metadata } from 'next'
import { siteConfig } from './site-config'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'

export const defaultMetadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: siteConfig.siteTitle || siteConfig.accountName || 'Concessionária',
    template: `%s | ${siteConfig.accountName || 'Concessionária'}`,
  },
  description:
    siteConfig.siteDescription ||
    'Carros e motos seminovos com garantia. Financiamento facilitado e avaliação transparente.',
  keywords: [
    'carros seminovos',
    'motos seminovos',
    'veículos usados',
    'financiamento de veículos',
    'comprar carro',
    'comprar moto',
    'concessionária',
    'veículos com garantia',
    siteConfig.accountName,
  ].filter(Boolean) as string[],
  authors: [{ name: siteConfig.accountName }],
  creator: siteConfig.accountName,
  publisher: siteConfig.accountName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: baseUrl,
    siteName: siteConfig.accountName || 'Concessionária',
    title: siteConfig.siteTitle || siteConfig.accountName,
    description: siteConfig.siteDescription,
    ...(siteConfig.ogImage ? { images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }] } : {}),
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.siteTitle || siteConfig.accountName,
    description: siteConfig.siteDescription,
    ...(siteConfig.ogImage ? { images: [siteConfig.ogImage] } : {}),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: baseUrl,
  },
  verification: {
    // Add Google Search Console verification if available
    // google: 'your-google-verification-code',
  },
}

export const generateVehicleMetadata = (vehicle: {
  brand: string
  model: string
  year: number
  type: string
  price?: number
  primaryImage?: string
  description?: string
  km?: number
}): Metadata => {
  const title = `${vehicle.brand} ${vehicle.model} ${vehicle.year}`
  const description =
    vehicle.description ||
    `${vehicle.type === 'CARRO' ? 'Carro' : 'Moto'} ${vehicle.brand} ${vehicle.model} ${vehicle.year}${vehicle.km ? ` com ${vehicle.km.toLocaleString('pt-BR')} km` : ''}${vehicle.price ? ` por R$ ${vehicle.price.toLocaleString('pt-BR')}` : ''}. Veículo seminovo com garantia na ${siteConfig.accountName}.`

  const type = vehicle.type?.toLowerCase() === 'carro' ? 'carros' : 'motos'
  const brand = vehicle.brand?.toLowerCase().replace(/\s+/g, '-')
  const model = vehicle.model?.toLowerCase().replace(/\s+/g, '-')
  const canonicalUrl = `${baseUrl}/comprar/${type}/${brand}/${model}/${vehicle.year}/detalhes`

  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${siteConfig.accountName}`,
      description,
      type: 'website',
      url: canonicalUrl,
      ...(vehicle.primaryImage ? { images: [{ url: vehicle.primaryImage, width: 1200, height: 630 }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${siteConfig.accountName}`,
      description,
      ...(vehicle.primaryImage ? { images: [vehicle.primaryImage] } : {}),
    },
    alternates: {
      canonical: canonicalUrl,
    },
  }
}

export const generateListingMetadata = (filters?: {
  type?: string
  brand?: string
  model?: string
  year?: number
}): Metadata => {
  let title = siteConfig.listingTitle || 'Veículos Seminovos'
  let description =
    siteConfig.listingDescription ||
    'Encontre o veículo ideal. Carros e motos seminovos com garantia, financiamento facilitado e atendimento personalizado.'

  if (filters) {
    const parts: string[] = []
    if (filters.type) {
      parts.push(filters.type === 'carros' ? 'Carros' : 'Motos')
    }
    if (filters.brand) {
      parts.push(filters.brand.charAt(0).toUpperCase() + filters.brand.slice(1))
    }
    if (filters.model) {
      parts.push(filters.model.charAt(0).toUpperCase() + filters.model.slice(1))
    }
    if (filters.year) {
      parts.push(String(filters.year))
    }

    if (parts.length > 0) {
      title = `${parts.join(' ')} Seminovos`
      description = `${parts.join(' ')} seminovos com garantia. Encontre as melhores ofertas na ${siteConfig.accountName}.`
    }
  }

  const pathParts = ['/comprar']
  if (filters?.type) pathParts.push(filters.type)
  if (filters?.brand) pathParts.push(filters.brand.toLowerCase())
  if (filters?.model) pathParts.push(filters.model.toLowerCase())
  if (filters?.year) pathParts.push(String(filters.year))
  const canonicalUrl = `${baseUrl}${pathParts.join('/')}`

  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${siteConfig.accountName}`,
      description,
      type: 'website',
      url: canonicalUrl,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${siteConfig.accountName}`,
      description,
    },
    alternates: {
      canonical: canonicalUrl,
    },
  }
}
