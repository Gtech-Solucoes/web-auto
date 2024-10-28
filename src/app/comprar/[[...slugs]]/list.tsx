'use client'

import Link from 'next/link'

import { Button } from '@/components/ui/button'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { VehicleCard } from '@/components/card/car-card'
import React, { useCallback, useEffect, useState } from 'react'
import { Navigation } from '@/components/navigation/navigation'
import { NavigationMobile } from '@/components/navigation/navigation-mobile'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbLink,
} from '@/components/ui/breadcrumb'
import {
  Dashboard,
  DashboardContent,
  DashboardHeader,
  DashboardMain,
  DashboardTopFilter,
} from '@/components/dashboard/dashboard'

import { Metadata } from 'next'
import {
  SideBar,
  SideBarBody,
  SideBarContent,
  SideBarItem,
  SideBarItemTitle,
} from '@/components/dashboard/sidebar/sidebar'
import { orders } from '@/constants/order'
import useSWR from 'swr'
import { getVehicles } from '@/lib/actions/vehicles.action'
import { cars } from '@/constants/cars-brands'
import { FilterProps } from './page'
import { useRouter, usePathname } from 'next/navigation'
import { capitalize } from '@/utils/utils'

export type DashboardGenericProps<T = unknown> = {
  children: React.ReactNode
  className?: string
} & T

export const metadata: Metadata = {
  title: 'Carros usados e seminovos em São José do Rio Preto',
  description: 'Veículos',
}

export default function ListVehicles({ filter, searchParams }: FilterProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { data: vehicles } = useSWR(`vehicles/${filter.type}`, () =>
    getVehicles({ ...filter, searchParams }),
  )
  const [models, setModels] = useState<string[]>([])
  const [brand, setBrand] = useState<string>(filter?.brand || '')
  const [model, setModel] = useState<string>('')
  const [yearGte, setYearGte] = useState<string>('')
  const [yearLte, setYearLte] = useState<string>('')
  const [priceGte, setPriceGte] = useState<string>('')
  const [priceLte, setPriceLte] = useState<string>('')
  const [kmGte, setKmGte] = useState<string>('')
  const [kmLte, setKmLte] = useState<string>('')
  const [exchange, setExchange] = useState<string>('')

  const createQueryString = useCallback(
    (params: Record<string, string | number | null>) => {
      console.log('params', params)
      const newSearchParams = new URLSearchParams(searchParams?.toString())

      for (const [key, value] of Object.entries(params)) {
        if (value === null || value === '') {
          newSearchParams.delete(key)
        } else {
          console.log('key', key)
          newSearchParams.set(key, String(value))
        }
      }

      return newSearchParams.size > 1 ? newSearchParams.toString() : null
    },
    [searchParams],
  )

  const handleBrandChange = (value: string) => {
    const selectedCar = cars.find((car) => car.brand === value)
    if (selectedCar) {
      const models = selectedCar.models.map((model) => model.name)
      setModels(models)
      setBrand(selectedCar.brand.toLowerCase())

      // Atualiza a parte relevante da URL
      const newUrl = pathname.replace(
        /(\/comprar\/carros\/)[^/]+/,
        `$1${selectedCar.brand.toLowerCase()}`,
      )
      router.push(newUrl, { scroll: false })
    }
  }

  useEffect(() => {
    if (brand) {
      const newUrl = pathname.replace(
        /(\/comprar\/carros\/)[^/]+/,
        `$1${brand}`,
      )
      router.push(newUrl, { scroll: false })
    }
  }, [brand, pathname, router])

  useEffect(() => {
    const queryString = createQueryString({
      yearGte,
      yearLte,
      priceGte,
      priceLte,
      kmGte,
      kmLte,
      exchange,
    })

    if (queryString) {
      router.push(`${pathname}?${queryString}`, { scroll: false })
    }
  }, [
    yearGte,
    yearLte,
    priceGte,
    priceLte,
    kmGte,
    kmLte,
    exchange,
    createQueryString,
    pathname,
    router,
  ])

  return (
    <Dashboard>
      <DashboardContent className="w-full">
        <DashboardHeader>
          <Navigation />
          <NavigationMobile />
        </DashboardHeader>
        <div className="flex h-full">
          <SideBar>
            <SideBarContent className="w-full">
              <SideBarBody>
                <SideBarItem className="flex-row items-center justify-evenly gap-2 border-none">
                  <Button
                    asChild
                    size={'default'}
                    variant={filter.type === 'carros' ? 'default' : 'outline'}
                    className="flex-1 text-sm"
                  >
                    <Link href="/comprar/carros">Carros</Link>
                  </Button>
                  <Button
                    asChild
                    variant={filter.type === 'motos' ? 'default' : 'outline'}
                    size={'default'}
                    className="flex-1 text-sm"
                  >
                    <Link href="/comprar/motos">Motos</Link>
                  </Button>
                </SideBarItem>
                <SideBarItem className="flex-col items-start">
                  <SideBarItemTitle title="Marcas" />
                  <div className="flex flex-col gap-4 w-full">
                    <Select onValueChange={handleBrandChange} value={brand}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Marca" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {cars.map((brand) => (
                            <SelectItem value={brand.brand} key={brand.brand}>
                              {capitalize(brand.brand)}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Modelo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {models.map((model) => (
                            <SelectItem value={model} key={model}>
                              {model}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </SideBarItem>
                <SideBarItem className="flex-col">
                  <SideBarItemTitle title="Ano" />
                  <div className="flex flex-row justify-between items-center gap-2">
                    <Input placeholder="De" />
                    <Input placeholder="Até" />
                  </div>
                </SideBarItem>
                <SideBarItem className="flex-col">
                  <SideBarItemTitle title="Quilometragem" />
                  <div className="flex flex-row justify-between items-center gap-2">
                    <Input placeholder="De" />
                    <Input placeholder="Até" />
                  </div>
                </SideBarItem>
                <SideBarItem className="flex-col">
                  <SideBarItemTitle title="Preço" />
                  <div className="flex flex-row justify-between items-center gap-2">
                    <Input placeholder="De" />
                    <Input placeholder="Até" />
                  </div>
                </SideBarItem>
                <SideBarItem className="flex-col">
                  <SideBarItemTitle title="Câmbio" />
                  <div className="flex flex-row">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="manual" />
                      <label
                        htmlFor="terms"
                        className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Manual
                      </label>
                    </div>
                    <div className="flex items-center space-x-2 pl-10">
                      <Checkbox id="automatic" />
                      <label
                        htmlFor="terms"
                        className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Automático
                      </label>
                    </div>
                  </div>
                </SideBarItem>
              </SideBarBody>
            </SideBarContent>
          </SideBar>
          <div className="flex-1">
            <DashboardTopFilter>
              <div>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Ordenar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {orders.map((order) => (
                        <SelectItem value={order} key={order}>
                          {order}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </DashboardTopFilter>
            <DashboardMain className="bg-muted/40 h-[94%]">
              <div className="flex items-start flex-col">
                <Breadcrumb className="mb-2">
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/carros">Carros</BreadcrumbLink>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
                <h2 className="text-2xl font-semibold">Carros</h2>
                <p className="text-xs text-muted-foreground">
                  {vehicles?.length} veículos disponíveis
                </p>
              </div>
              <div className="w-full px-2 h-full mb-20">
                <div className="flex flex-row flex-wrap items-stretch justify-center gap-4 w-full place-content-stretch">
                  {vehicles?.map((car) => (
                    <VehicleCard key={car.id} data={car} />
                  ))}
                </div>
              </div>
            </DashboardMain>
          </div>
        </div>
      </DashboardContent>
    </Dashboard>
  )
}
