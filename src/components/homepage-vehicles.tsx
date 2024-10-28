'use client'

import Link from 'next/link'
import { VehicleCard } from './card/car-card'
import { Button } from './ui/button'
import { getHomePageVehicles, Vehicle } from '@/lib/actions/vehicles.action'
import useSWR from 'swr'

export function HomePageVehicles() {
  const { data: vehicles, isLoading } = useSWR<Partial<Vehicle>[]>(
    'homePageVehicles',
    getHomePageVehicles,
  )

  return (
    <>
      {!isLoading && vehicles?.length && (
        <section className="w-full flex text-center justify-center flex-col md:pb-24 md:pt-0 sm:py-32 py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-semibold">
              Encontre seu próximo veículo
            </h2>
            <div className="flex flex-col md:grid md:grid-cols-2 xl:grid-cols-4 justify-center md:space-y-0 md:gap-6 md:mt-8 w-full items-center space-y-6 mt-6">
              {vehicles.map((car) => (
                <VehicleCard key={car.id} data={car} />
              ))}
            </div>
            <Button
              className="max-w-72 w-full mt-10 font-bold text-base bg-black"
              size={'lg'}
            >
              <Link href="/comprar">Ver todos Veículos</Link>
            </Button>
          </div>
        </section>
      )}
    </>
  )
}
