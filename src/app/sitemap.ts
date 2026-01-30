import { MetadataRoute } from 'next'
import { getVehicles, Vehicle } from '@/lib/actions/vehicles.action'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/comprar`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/comprar/carros`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/comprar/motos`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ]

  try {
    const { records: vehicles } = await getVehicles({ page: 1 })

    const vehiclePages: MetadataRoute.Sitemap = vehicles.map(
      (vehicle: Partial<Vehicle>) => {
        const type = vehicle.type?.toLowerCase() === 'carro' ? 'carros' : 'motos'
        const brand = vehicle.brand?.toLowerCase().replace(/\s+/g, '-')
        const model = vehicle.model?.toLowerCase().replace(/\s+/g, '-')
        const year = vehicle.year

        return {
          url: `${baseUrl}/comprar/${type}/${brand}/${model}/${year}/detalhes/${vehicle.id}`,
          lastModified: vehicle.updatedAt || new Date(),
          changeFrequency: 'weekly' as const,
          priority: 0.8,
        }
      },
    )

    return [...staticPages, ...vehiclePages]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return staticPages
  }
}
