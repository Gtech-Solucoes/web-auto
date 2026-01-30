import React from 'react'
import { Metadata } from 'next'

import Datail from './details'
import { addAccess } from '@/lib/actions/access.action'
import ListVehicles from './list'
import { getVehicleById } from '@/lib/actions/vehicles.action'
import { generateVehicleMetadata, generateListingMetadata } from '@/lib/seo-config'
import { VehicleJsonLd, BreadcrumbJsonLd } from '@/components/seo/json-ld'

type Props = {
  params: { slugs: string[] }
  searchParams: { [key: string]: string }
}

export type FilterProps = {
  filter?: {
    type: string
    brand: string
    model: string
    year: number
  }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slugs } = params

  if (!slugs || !Array.isArray(slugs) || slugs.length === 0) {
    return generateListingMetadata()
  }

  const isDetailsRoute = slugs.length === 6 && slugs[4] === 'detalhes'
  const [type, brand, model, year] = slugs

  if (isDetailsRoute) {
    const vehicle = await getVehicleById(slugs[5])

    if (vehicle) {
      return generateVehicleMetadata({
        brand: vehicle.brand,
        model: vehicle.model,
        year: vehicle.year,
        type: vehicle.type,
        price: vehicle.price,
        primaryImage: vehicle.primaryImage,
        description: vehicle.about || vehicle.description,
        km: vehicle.km,
      })
    }

    return generateVehicleMetadata({
      brand: brand || '',
      model: model || '',
      year: Number(year) || new Date().getFullYear(),
      type: type === 'carros' ? 'CARRO' : 'MOTO',
    })
  }

  return generateListingMetadata({
    type,
    brand,
    model,
    year: year ? Number(year) : undefined,
  })
}

export default async function Page({ params, searchParams }: Props) {
  const { slugs } = params
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'

  if (!slugs || !slugs.length) {
    return (
      <>
        <BreadcrumbJsonLd
          items={[
            { name: 'Início', url: baseUrl },
            { name: 'Veículos', url: `${baseUrl}/comprar` },
          ]}
        />
        <ListVehicles searchParams={searchParams || null} key={'any'} />
      </>
    )
  }

  const [type, brand, model, year, , id] = slugs

  const isDetailsRoute = slugs.length === 6 && slugs[4] === 'detalhes'

  if (isDetailsRoute) {
    await addAccess(id)
    const vehicle = await getVehicleById(id)

    const breadcrumbItems = [
      { name: 'Início', url: baseUrl },
      { name: 'Veículos', url: `${baseUrl}/comprar` },
      { name: type === 'carros' ? 'Carros' : 'Motos', url: `${baseUrl}/comprar/${type}` },
    ]

    if (brand) {
      breadcrumbItems.push({
        name: brand.charAt(0).toUpperCase() + brand.slice(1),
        url: `${baseUrl}/comprar/${type}/${brand}`,
      })
    }

    if (vehicle) {
      breadcrumbItems.push({
        name: `${vehicle.brand} ${vehicle.model} ${vehicle.year}`,
        url: `${baseUrl}/comprar/${type}/${brand}/${model}/${year}/detalhes/${id}`,
      })
    }

    return (
      <>
        <BreadcrumbJsonLd items={breadcrumbItems} />
        {vehicle && <VehicleJsonLd vehicle={vehicle} />}
        <Datail id={id} />
      </>
    )
  }

  const breadcrumbItems = [
    { name: 'Início', url: baseUrl },
    { name: 'Veículos', url: `${baseUrl}/comprar` },
  ]

  if (type) {
    breadcrumbItems.push({
      name: type === 'carros' ? 'Carros' : 'Motos',
      url: `${baseUrl}/comprar/${type}`,
    })
  }
  if (brand) {
    breadcrumbItems.push({
      name: brand.charAt(0).toUpperCase() + brand.slice(1),
      url: `${baseUrl}/comprar/${type}/${brand}`,
    })
  }
  if (model) {
    breadcrumbItems.push({
      name: model.charAt(0).toUpperCase() + model.slice(1),
      url: `${baseUrl}/comprar/${type}/${brand}/${model}`,
    })
  }
  if (year) {
    breadcrumbItems.push({
      name: year,
      url: `${baseUrl}/comprar/${type}/${brand}/${model}/${year}`,
    })
  }

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <ListVehicles
        filter={{
          brand,
          model,
          type,
          year: Number(year),
        }}
        searchParams={searchParams || null}
        key={'any'}
      />
    </>
  )
}
