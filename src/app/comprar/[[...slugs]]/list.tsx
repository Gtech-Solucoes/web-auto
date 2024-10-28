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
import { LoadingSpinner } from '@/components/loading-spinner'

export type DashboardGenericProps<T = unknown> = {
  children: React.ReactNode
  className?: string
} & T

export const metadata: Metadata = {
  title: 'Carros usados e seminovos em São José do Rio Preto',
  description: 'Veículos',
}

function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export default function ListVehicles({ filter, searchParams }: FilterProps) {
  const router = useRouter()
  const pathname = usePathname()

  const [models, setModels] = useState<string[]>([])
  const [brand, setBrand] = useState<string>(filter?.brand || '')
  const [model, setModel] = useState<string>(filter?.model || '')
  const [yearGte, setYearGte] = useState<string>(
    (searchParams?.yearGte as string) || '',
  )
  const [yearLte, setYearLte] = useState<string>(
    (searchParams?.yearLte as string) || '',
  )
  const [priceGte, setPriceGte] = useState<string>(
    (searchParams?.priceGte as string) || '',
  )
  const [priceLte, setPriceLte] = useState<string>(
    (searchParams?.priceLte as string) || '',
  )
  const [kmGte, setKmGte] = useState<string>(
    (searchParams?.kmGte as string) || '',
  )
  const [kmLte, setKmLte] = useState<string>(
    (searchParams?.kmLte as string) || '',
  )
  const [exchange, setExchange] = useState<string>(
    (searchParams?.exchange as string) || '',
  )

  // Debounce dos campos de busca
  const debouncedYearGte = useDebounce(yearGte, 1000)
  const debouncedYearLte = useDebounce(yearLte, 1000)
  const debouncedPriceGte = useDebounce(priceGte, 1000)
  const debouncedPriceLte = useDebounce(priceLte, 1000)
  const debouncedKmGte = useDebounce(kmGte, 1000)
  const debouncedKmLte = useDebounce(kmLte, 1000)
  const debouncedExchange = useDebounce(exchange, 1000)

  const swrKey = `${filter?.type || 'vehicles'}?${JSON.stringify(searchParams)}`
  const { data: vehicles, isLoading } = useSWR(swrKey, () =>
    getVehicles({ ...filter, searchParams }),
  )

  const handleBrandChange = (value: string) => {
    const selectedCar = cars.find((car) => car.brand === value)
    if (selectedCar) {
      const models = selectedCar.models.map((model) => model.name)
      setModels(models)
      setBrand(selectedCar.brand.toLowerCase())
      setModel('')

      const newUrl = pathname.replace(
        /(\/comprar\/carros)(\/[^/]+)?(\/[^/]*)?/,
        `$1/${selectedCar.brand.toLowerCase()}`,
      )

      router.push(newUrl, { scroll: false })
    }
  }

  const handleModelChange = (value: string) => {
    setModel(value)

    const newUrl = pathname.replace(
      /(\/comprar\/carros\/[^/]+)(\/[^/]+)?/,
      `$1/${value.toLowerCase()}`,
    )
    router.push(newUrl, { scroll: false })
  }

  useEffect(() => {
    if (brand) {
      const selectedCar = cars.find((car) => car.brand === brand)
      if (selectedCar) {
        const models = selectedCar.models.map((model) => model.name)
        setModels(models)
      }
    }
  }, [brand])

  const createQueryString = useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString())

      for (const [key, value] of Object.entries(params)) {
        if (value === null || value === '') {
          newSearchParams.delete(key)
        } else {
          newSearchParams.set(key, String(value))
        }
      }

      newSearchParams.forEach((value, key) => {
        if (key === '[object Object]') {
          newSearchParams.delete(key)
        }
      })

      return newSearchParams.toString()
    },
    [searchParams],
  )

  useEffect(() => {
    const queryString = createQueryString({
      yearGte: debouncedYearGte,
      yearLte: debouncedYearLte,
      priceGte: debouncedPriceGte,
      priceLte: debouncedPriceLte,
      kmGte: debouncedKmGte,
      kmLte: debouncedKmLte,
      exchange: debouncedExchange,
    })

    if (queryString) {
      router.push(`${pathname}?${queryString}`, { scroll: false })
    }
  }, [
    debouncedYearGte,
    debouncedYearLte,
    debouncedPriceGte,
    debouncedPriceLte,
    debouncedKmGte,
    debouncedKmLte,
    debouncedExchange,
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
                    variant={filter?.type === 'carros' ? 'default' : 'outline'}
                    className="flex-1 text-sm"
                  >
                    <Link href="/comprar/carros">Carros</Link>
                  </Button>
                  <Button
                    asChild
                    variant={filter?.type === 'motos' ? 'default' : 'outline'}
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
                    <Select onValueChange={handleModelChange} value={model}>
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
                    <Input
                      placeholder="De"
                      type="number"
                      value={yearGte}
                      onChange={(e) => setYearGte(e.target.value)}
                    />
                    <Input
                      placeholder="Até"
                      type="number"
                      value={yearLte}
                      onChange={(e) => setYearLte(e.target.value)}
                    />
                  </div>
                </SideBarItem>
                <SideBarItem className="flex-col">
                  <SideBarItemTitle title="Quilometragem" />
                  <div className="flex flex-row justify-between items-center gap-2">
                    <Input
                      placeholder="De"
                      type="number"
                      value={kmGte}
                      onChange={(e) => setKmGte(e.target.value)}
                    />
                    <Input
                      placeholder="Até"
                      type="number"
                      value={kmLte}
                      onChange={(e) => setKmLte(e.target.value)}
                    />
                  </div>
                </SideBarItem>
                <SideBarItem className="flex-col">
                  <SideBarItemTitle title="Preço" />
                  <div className="flex flex-row justify-between items-center gap-2">
                    <Input
                      placeholder="De"
                      type="text"
                      value={priceGte}
                      onChange={(e) => setPriceGte(e.target.value)}
                    />
                    <Input
                      placeholder="Até"
                      type="text"
                      value={priceLte}
                      onChange={(e) => setPriceLte(e.target.value)}
                    />
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
              {isLoading ? (
                <div className="w-full h-full flex items-center justify-center">
                  <LoadingSpinner className="w-10 h-10" />
                </div>
              ) : (
                <div className="w-full px-2 h-full mb-20">
                  <div className="flex flex-row flex-wrap items-stretch justify-center gap-4 w-full place-content-stretch">
                    {vehicles?.map((car) => (
                      <VehicleCard key={car.id} data={car} />
                    ))}
                  </div>
                </div>
              )}
            </DashboardMain>
          </div>
        </div>
      </DashboardContent>
    </Dashboard>
  )
}
