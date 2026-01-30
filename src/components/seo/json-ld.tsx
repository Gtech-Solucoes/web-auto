import { siteConfig } from '@/lib/site-config'
import { Vehicle } from '@/lib/actions/vehicles.action'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'

export function OrganizationJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'AutoDealer',
    name: siteConfig.accountName,
    url: baseUrl,
    ...(siteConfig.ogImage && { logo: siteConfig.ogImage }),
    ...(siteConfig.addressLine && {
      address: {
        '@type': 'PostalAddress',
        streetAddress: siteConfig.addressLine,
      },
    }),
    ...(siteConfig.whatsappPhone && {
      telephone: siteConfig.whatsappPhone,
    }),
    ...(siteConfig.contactEmail && {
      email: siteConfig.contactEmail,
    }),
    sameAs: [
      siteConfig.instagramUrl,
      siteConfig.facebookUrl,
    ].filter(Boolean),
    priceRange: '$$',
    currenciesAccepted: 'BRL',
    paymentAccepted: 'Dinheiro, Cartão de Crédito, Financiamento',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function WebSiteJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.accountName || siteConfig.siteTitle,
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/comprar?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function VehicleJsonLd({ vehicle }: { vehicle: Partial<Vehicle> }) {
  const type = vehicle.type?.toLowerCase() === 'carro' ? 'carros' : 'motos'
  const brand = vehicle.brand?.toLowerCase().replace(/\s+/g, '-')
  const model = vehicle.model?.toLowerCase().replace(/\s+/g, '-')
  const vehicleUrl = `${baseUrl}/comprar/${type}/${brand}/${model}/${vehicle.year}/detalhes/${vehicle.id}`

  const schema = {
    '@context': 'https://schema.org',
    '@type': vehicle.type === 'CARRO' ? 'Car' : 'Motorcycle',
    name: `${vehicle.brand} ${vehicle.model} ${vehicle.year}`,
    brand: {
      '@type': 'Brand',
      name: vehicle.brand,
    },
    model: vehicle.model,
    vehicleModelDate: String(vehicle.modelYear || vehicle.year),
    modelDate: String(vehicle.year),
    ...(vehicle.primaryImage && { image: vehicle.primaryImage }),
    ...(vehicle.description && { description: vehicle.description }),
    ...(vehicle.km && {
      mileageFromOdometer: {
        '@type': 'QuantitativeValue',
        value: vehicle.km,
        unitCode: 'KMT',
      },
    }),
    ...(vehicle.fuel && { fuelType: vehicle.fuel }),
    ...(vehicle.exchange && { vehicleTransmission: vehicle.exchange }),
    ...(vehicle.color && { color: vehicle.color }),
    ...(vehicle.body && { bodyType: vehicle.body }),
    vehicleInteriorColor: vehicle.color,
    ...(vehicle.price && {
      offers: {
        '@type': 'Offer',
        price: vehicle.price,
        priceCurrency: 'BRL',
        availability: 'https://schema.org/InStock',
        url: vehicleUrl,
        seller: {
          '@type': 'AutoDealer',
          name: siteConfig.accountName,
        },
      },
    }),
    url: vehicleUrl,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function FAQJsonLd() {
  const faqs = [
    {
      question: 'Os veículos têm garantia?',
      answer: 'Sim, oferecemos garantia em todos os veículos para que você possa comprar com total segurança.',
    },
    {
      question: 'Vocês fazem financiamento?',
      answer: 'Sim, facilitamos o seu financiamento com condições que cabem no seu bolso e as melhores taxas do mercado.',
    },
    {
      question: 'Posso trocar meu veículo usado?',
      answer: 'Sim, avaliamos seu veículo e oferecemos a opção de troca com avaliação justa e transparente.',
    },
    {
      question: 'Como funciona o processo de compra?',
      answer: 'O processo é simples: escolha o veículo, entre em contato conosco pelo WhatsApp, faça um test drive e finalize a compra com nossa equipe.',
    },
  ]

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function ItemListJsonLd({ vehicles }: { vehicles: Partial<Vehicle>[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: vehicles.slice(0, 10).map((vehicle, index) => {
      const type = vehicle.type?.toLowerCase() === 'carro' ? 'carros' : 'motos'
      const brand = vehicle.brand?.toLowerCase().replace(/\s+/g, '-')
      const model = vehicle.model?.toLowerCase().replace(/\s+/g, '-')

      return {
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': vehicle.type === 'CARRO' ? 'Car' : 'Motorcycle',
          name: `${vehicle.brand} ${vehicle.model} ${vehicle.year}`,
          url: `${baseUrl}/comprar/${type}/${brand}/${model}/${vehicle.year}/detalhes/${vehicle.id}`,
          ...(vehicle.primaryImage && { image: vehicle.primaryImage }),
          ...(vehicle.price && {
            offers: {
              '@type': 'Offer',
              price: vehicle.price,
              priceCurrency: 'BRL',
            },
          }),
        },
      }
    }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
