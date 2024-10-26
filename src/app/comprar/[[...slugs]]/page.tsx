import React from 'react'

import Datail from './details'
import { notFound } from 'next/navigation'
import { capitalize } from '@/utils/utils'

type Props = {
  params: { slugs: string[] }
}

export async function generateMetadata({ params }: Props) {
  const { slugs } = params
  if (!slugs || !Array.isArray(slugs)) {
    notFound()
  }

  const isDetailsRoute = slugs.length === 6 && slugs[4] === 'detalhes'
  const [tipo, marca, modelo, ano] = slugs

  if (isDetailsRoute) {
    const title = `${marca} ${modelo} ${ano} - Detalhes`
    const description = `Detalhes do ${capitalize(tipo)} ${capitalize(marca)} ${capitalize(modelo)} ${ano}`
    return { title, description }
  }

  const title = `Comprar ${tipo} ${marca} ${modelo} ${ano}`
  const description = `Listagem de ${tipo === 'carro' ? 'carros' : 'motos'} ${marca} ${modelo} ${ano}`
  return { title, description }
}

export default function Page({ params }: Props) {
  const { slugs } = params
  const [tipo, marca, modelo, ano, , id] = slugs

  const isDetailsRoute = slugs.length === 6 && slugs[4] === 'detalhes'
  return <>{isDetailsRoute && <Datail id={id} />}</>
}
