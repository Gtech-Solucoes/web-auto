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
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
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
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { capitalize, slugify, unSlugify } from '@/utils/utils'
import { X } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

export type DashboardGenericProps<T = unknown> = {
  children: React.ReactNode
  className?: string
} & T

type AppliedFilter = {
  key: string
  label: string
  onRemove: () => void
}

export const metadata: Metadata = {
  title: siteConfig.listingTitle || siteConfig.siteTitle,
  description:
    siteConfig.listingDescription || siteConfig.siteDescription || 'Veículos',
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

export default function ListVehicles({ filter }: FilterProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const currentBrand = unSlugify(filter?.brand)
  const currentModel = unSlugify(filter?.model)

  const [models, setModels] = useState<string[]>([])
  const [brand, setBrand] = useState<string>(currentBrand || '')
  const [model, setModel] = useState<string>(currentModel || '')
  const [yearGte, setYearGte] = useState<string>(
    (searchParams?.get('yearGte') as string) || '',
  )
  const [yearLte, setYearLte] = useState<string>(
    (searchParams?.get('yearLte') as string) || '',
  )
  const [priceGte, setPriceGte] = useState<string>(
    (searchParams?.get('priceGte') as string) || '',
  )
  const [priceLte, setPriceLte] = useState<string>(
    (searchParams?.get('priceLte') as string) || '',
  )
  const [kmGte, setKmGte] = useState<string>(
    (searchParams?.get('kmGte') as string) || '',
  )
  const [kmLte, setKmLte] = useState<string>(
    (searchParams?.get('kmLte') as string) || '',
  )
  const [exchange, setExchange] = useState<string>(
    (searchParams?.get('exchange') as string) || '',
  )
  const [page, setPage] = useState(Number(searchParams?.get('page')) || 1)
  const [order, setOrder] = useState(searchParams?.get('order') || '')

  // Debounce dos campos de busca
  const debouncedYearGte = useDebounce(yearGte, 1000)
  const debouncedYearLte = useDebounce(yearLte, 1000)
  const debouncedPriceGte = useDebounce(priceGte, 1000)
  const debouncedPriceLte = useDebounce(priceLte, 1000)
  const debouncedKmGte = useDebounce(kmGte, 1000)
  const debouncedKmLte = useDebounce(kmLte, 1000)
  const debouncedExchange = useDebounce(exchange, 1000)

  const swrKey = `${filter?.type || 'vehicles'}?${JSON.stringify({
    yearGte,
    yearLte,
    priceGte,
    priceLte,
    kmGte,
    kmLte,
    exchange,
    page,
    order,
  })}`
  const { data: vehicles, isLoading } = useSWR(swrKey, () =>
    getVehicles({
      ...filter,
      page,
      searchParams: {
        yearGte,
        yearLte,
        priceGte,
        priceLte,
        kmGte,
        kmLte,
        exchange,
      },
      sort: order,
    }),
  )

  const totalPages = Math.max(vehicles?.meta?.totalPages ?? 1, 1)
  const hasPrev = page > 1
  const hasNext = page < totalPages

  const handlePageChange = (nextPage: number) => {
    const clamped = Math.min(Math.max(1, nextPage), totalPages)
    if (clamped !== page) {
      setPage(clamped)
    }
  }

  useEffect(() => {
    if (!vehicles) return

    if (page > totalPages) {
      setPage(totalPages)
    }

    if (page < 1) {
      setPage(1)
    }
  }, [page, totalPages, vehicles])

  const basePath = filter?.type ? `/comprar/${filter.type}` : '/comprar'
  const orderLabel = useMemo(() => {
    if (!order) return ''
    return orders.find((item) => item.value === order)?.label || order
  }, [order])
  const didMountRef = useRef(false)

  const handleRemoveBrand = () => {
    setBrand('')
    setModel('')
    setPage(1)
    router.push(basePath, { scroll: false })
  }

  const handleRemoveModel = () => {
    if (!filter?.brand) return
    setModel('')
    setPage(1)
    router.push(`${basePath}/${filter.brand}`, { scroll: false })
  }

  const handleClearFilters = () => {
    setBrand('')
    setModel('')
    setYearGte('')
    setYearLte('')
    setPriceGte('')
    setPriceLte('')
    setKmGte('')
    setKmLte('')
    setExchange('')
    setOrder('')
    setPage(1)
    router.push(basePath, { scroll: false })
  }

  const appliedFilters = useMemo<AppliedFilter[]>(
    () =>
      [
        filter?.brand
          ? {
              key: 'brand',
              label: `Marca: ${currentBrand}`,
              onRemove: handleRemoveBrand,
            }
          : null,
        filter?.model
          ? {
              key: 'model',
              label: `Modelo: ${currentModel}`,
              onRemove: handleRemoveModel,
            }
          : null,
        yearGte
          ? {
              key: 'yearGte',
              label: `Ano ≥ ${yearGte}`,
              onRemove: () => setYearGte(''),
            }
          : null,
        yearLte
          ? {
              key: 'yearLte',
              label: `Ano ≤ ${yearLte}`,
              onRemove: () => setYearLte(''),
            }
          : null,
        priceGte
          ? {
              key: 'priceGte',
              label: `Preço ≥ ${priceGte}`,
              onRemove: () => setPriceGte(''),
            }
          : null,
        priceLte
          ? {
              key: 'priceLte',
              label: `Preço ≤ ${priceLte}`,
              onRemove: () => setPriceLte(''),
            }
          : null,
        kmGte
          ? {
              key: 'kmGte',
              label: `KM ≥ ${kmGte}`,
              onRemove: () => setKmGte(''),
            }
          : null,
        kmLte
          ? {
              key: 'kmLte',
              label: `KM ≤ ${kmLte}`,
              onRemove: () => setKmLte(''),
            }
          : null,
        exchange
          ? {
              key: 'exchange',
              label: `Câmbio: ${capitalize(exchange)}`,
              onRemove: () => setExchange(''),
            }
          : null,
        order
          ? {
              key: 'order',
              label: `Ordenar: ${orderLabel}`,
              onRemove: () => setOrder(''),
            }
          : null,
      ].filter((item): item is AppliedFilter => Boolean(item)),
    [
      currentBrand,
      currentModel,
      exchange,
      filter?.brand,
      filter?.model,
      handleRemoveBrand,
      handleRemoveModel,
      kmGte,
      kmLte,
      order,
      orderLabel,
      priceGte,
      priceLte,
      yearGte,
      yearLte,
    ],
  )
  const hasFilters = appliedFilters.length > 0
  const totalRows = vehicles?.meta?.totalRows ?? 0
  const hasRecords = (vehicles?.records?.length ?? 0) > 0
  const showEmptyState = !isLoading && vehicles && !hasRecords

  const handleBrandChange = (value: string) => {
    const selectedCar = cars.find((car) => car.brand === value)
    if (selectedCar) {
      const models = selectedCar.models.map((model) => model.name)
      setModels(models)
      setBrand(slugify(selectedCar.brand)!)
      setModel('')

      const newUrl = pathname.replace(
        /(\/comprar\/carros)(\/[^/]+)?(\/[^/]*)?/,
        `$1/${slugify(selectedCar.brand)}`,
      )

      router.push(newUrl, { scroll: false })
    }
  }

  const handleModelChange = (value: string) => {
    setModel(slugify(value)!)

    const newUrl = pathname.replace(
      /(\/comprar\/carros\/[^/]+)(\/[^/]+)?/,
      `$1/${slugify(value)}`,
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
    if (!didMountRef.current) {
      didMountRef.current = true
      return
    }

    setPage(1)
  }, [
    debouncedYearGte,
    debouncedYearLte,
    debouncedPriceGte,
    debouncedPriceLte,
    debouncedKmGte,
    debouncedKmLte,
    debouncedExchange,
    order,
    filter?.brand,
    filter?.model,
    filter?.type,
  ])

  useEffect(() => {
    const queryString = createQueryString({
      page: page > 1 ? page : null,
      yearGte: debouncedYearGte,
      yearLte: debouncedYearLte,
      priceGte: debouncedPriceGte,
      priceLte: debouncedPriceLte,
      kmGte: debouncedKmGte,
      kmLte: debouncedKmLte,
      exchange: debouncedExchange,
      order,
    })

    const nextUrl = queryString ? `${pathname}?${queryString}` : pathname
    router.push(nextUrl, { scroll: false })
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
    page,
    order,
  ])
  return (
    <Dashboard>
      <DashboardContent className="w-full">
        <DashboardHeader>
          <Navigation />
          <NavigationMobile />
        </DashboardHeader>
        <div className="flex flex-col md:flex-row h-full">
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
                <SideBarItem className="flex-col items-start ">
                  <SideBarItemTitle title="Marcas" />
                  <div className="flex flex-row md:flex-col gap-4 w-full">
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

          <div className="flex-1 bg-muted/40">
            <DashboardTopFilter
              className={
                hasFilters
                  ? 'h-auto flex-wrap justify-between gap-3 py-3'
                  : undefined
              }
            >
              {hasFilters && (
                <div className="flex flex-wrap items-center gap-2">
                  {appliedFilters.map((filter) => (
                    <Button
                      key={filter.key}
                      variant="secondary"
                      size="xs"
                      className="rounded-full gap-1"
                      onClick={filter.onRemove}
                      aria-label={`Remover filtro ${filter.label}`}
                    >
                      <span>{filter.label}</span>
                      <X className="h-3 w-3" />
                    </Button>
                  ))}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClearFilters}
                  >
                    Limpar filtros
                  </Button>
                </div>
              )}
              <div className="w-full sm:w-auto">
                <Select onValueChange={(value) => setOrder(value)}>
                  <SelectTrigger className="w-full sm:w-[220px]">
                    <SelectValue placeholder="Ordenar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {orders.map((order) => (
                        <SelectItem value={order.value} key={order.value}>
                          {order.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </DashboardTopFilter>
            <DashboardMain className="h-auto">
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
                  {totalRows} veículos disponíveis
                </p>
              </div>
              {isLoading ? (
                <div className="w-full px-2 h-full flex flex-col justify-between">
                  <div className="flex flex-row flex-wrap items-stretch justify-center gap-4 w-full place-content-stretch">
                    {Array.from({ length: 8 }).map((_, index) => (
                      <div
                        key={`skeleton-${index}`}
                        className="w-[300px] overflow-hidden rounded-lg border bg-white"
                      >
                        <div className="h-[200px] w-full animate-pulse bg-muted" />
                        <div className="space-y-3 p-4">
                          <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
                          <div className="h-3 w-full animate-pulse rounded bg-muted" />
                          <div className="h-3 w-2/3 animate-pulse rounded bg-muted" />
                          <div className="h-6 w-1/2 animate-pulse rounded bg-muted" />
                          <div className="flex justify-between">
                            <div className="h-3 w-16 animate-pulse rounded bg-muted" />
                            <div className="h-3 w-16 animate-pulse rounded bg-muted" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="w-full px-2 h-full flex flex-col justify-between">
                  {hasRecords && (
                    <div className="flex flex-row flex-wrap items-stretch justify-center gap-4 w-full place-content-stretch">
                      {vehicles?.records?.map((car) => (
                        <VehicleCard key={car.id} data={car} />
                      ))}
                    </div>
                  )}
                  {showEmptyState && (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                      <h3 className="text-lg font-semibold">
                        Nenhum veículo encontrado
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Tente ajustar os filtros para ver mais resultados.
                      </p>
                      {hasFilters && (
                        <Button
                          variant="outline"
                          className="mt-4"
                          onClick={handleClearFilters}
                        >
                          Limpar filtros
                        </Button>
                      )}
                    </div>
                  )}
                  {hasRecords && (
                    <Pagination className="py-10">
                      <PaginationContent>
                        <PaginationItem
                          aria-disabled={!hasPrev}
                          className={!hasPrev ? 'pointer-events-none opacity-50' : ''}
                          onClick={() => handlePageChange(page - 1)}
                        >
                          <PaginationPrevious />
                        </PaginationItem>
                        {page > 1 && (
                          <PaginationItem
                            onClick={() => handlePageChange(page - 1)}
                          >
                            <PaginationLink>{page - 1}</PaginationLink>
                          </PaginationItem>
                        )}
                        <PaginationItem>
                          <PaginationLink isActive>{page}</PaginationLink>
                        </PaginationItem>
                        {page + 1 <= totalPages && (
                          <PaginationItem
                            onClick={() => handlePageChange(page + 1)}
                          >
                            <PaginationLink>{page + 1}</PaginationLink>
                          </PaginationItem>
                        )}
                        {page + 2 <= totalPages && (
                          <PaginationItem>
                            <PaginationEllipsis />
                          </PaginationItem>
                        )}
                        <PaginationItem
                          aria-disabled={!hasNext}
                          className={!hasNext ? 'pointer-events-none opacity-50' : ''}
                          onClick={() => handlePageChange(page + 1)}
                        >
                          <PaginationNext />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  )}
                </div>
              )}
            </DashboardMain>
          </div>
        </div>
      </DashboardContent>
    </Dashboard>
  )
}
