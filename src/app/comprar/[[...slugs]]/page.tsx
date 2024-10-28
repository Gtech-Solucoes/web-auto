import React from 'react'

import Datail from './details'
import { capitalize } from '@/utils/utils'
import { addAccess } from '@/lib/actions/access.action'
import ListVehicles from './list'

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

export async function generateMetadata({ params }: Props) {
  const { slugs } = params
  if (slugs || Array.isArray(slugs)) {
    const isDetailsRoute = slugs.length === 6 && slugs[4] === 'detalhes'
    const [tipo, marca, modelo, ano] = slugs

    if (isDetailsRoute) {
      const title = `${capitalize(marca)} ${capitalize(modelo)} ${ano} - NORTHBENS`
      const description = `Detalhes do ${capitalize(tipo)} ${capitalize(marca)} ${capitalize(modelo)} ${ano}`
      return { title, description }
    }

    const title = `Comprar ${tipo} ${marca} ${modelo} ${ano}`
    const description = `Listagem de ${tipo === 'carro' ? 'carros' : 'motos'} ${marca} ${modelo} ${ano}`
    return { title, description }
  }
}

export default async function Page({ params, searchParams }: Props) {
  const { slugs } = params

  if (!slugs || !slugs.length) {
    return <ListVehicles searchParams={searchParams || null} key={'any'} />
  }

  const [type, brand, model, year, , id] = slugs

  const isDetailsRoute = slugs.length === 6 && slugs[4] === 'detalhes'

  if (isDetailsRoute) {
    await addAccess(id)
  }

  return (
    <>
      {isDetailsRoute ? (
        <Datail id={id} />
      ) : (
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
      )}
    </>
  )
}
