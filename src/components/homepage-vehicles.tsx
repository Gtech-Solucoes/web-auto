'use client'

import Link from 'next/link'
import { VehicleCard } from './card/car-card'
import { Button } from './ui/button'
import { getHomePageVehicles, Vehicle } from '@/lib/actions/vehicles.action'
import useSWR from 'swr'

type HomePageVehiclesProps = {
  initialVehicles?: Partial<Vehicle>[]
}

export function HomePageVehicles({ initialVehicles }: HomePageVehiclesProps) {
  const { data: vehicles, isLoading } = useSWR<Partial<Vehicle>[]>(
    'homePageVehicles',
    getHomePageVehicles,
    {
      fallbackData: initialVehicles,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateOnMount: !initialVehicles?.length,
    },
  )

  const visibleVehicles = vehicles?.slice(0, 8) ?? []

  return (
    <>
      {!isLoading && visibleVehicles.length > 0 && (
        <section className="relative overflow-hidden py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid items-end gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
              <div className="text-center lg:text-left">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
                  Estoque atualizado
                </p>
                <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                  Encontre seu próximo veículo
                </h2>
                <p className="mt-6 text-lg leading-8 text-muted-foreground">
                  Selecionamos modelos com histórico claro e inspeção técnica
                  para você escolher com confiança.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3 lg:justify-start">
                  <span className="rounded-full border border-foreground/10 bg-foreground/5 px-4 py-2 text-xs font-semibold text-foreground">
                    Revisados
                  </span>
                  <span className="rounded-full border border-foreground/10 bg-foreground/5 px-4 py-2 text-xs font-semibold text-foreground">
                    Condição real
                  </span>
                  <span className="rounded-full border border-foreground/10 bg-foreground/5 px-4 py-2 text-xs font-semibold text-foreground">
                    Documentação cuidada
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-center gap-4 text-center lg:items-end lg:text-right">
                <Button
                  className="max-w-72 w-full font-bold text-base bg-black"
                  size={'lg'}
                >
                  <Link href="/comprar">Ver todos Veículos</Link>
                </Button>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="h-2 w-2 rounded-full bg-primary"></span>
                  Novas oportunidades toda semana.
                </div>
              </div>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-6 justify-items-center sm:grid-cols-2 xl:grid-cols-4">
              {visibleVehicles.map((car) => (
                <VehicleCard key={car.id} data={car} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
