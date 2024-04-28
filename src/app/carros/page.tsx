import Link from 'next/link'
import { Car, Search } from 'lucide-react'

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
import { ScrollArea } from '@/components/ui/scroll-area'
import { VehicleCard } from '@/components/card/car-card'
import { cn } from '@/lib/utils'
import React from 'react'
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

type ComponentGenericProps = {
  className?: string
  children: React.ReactNode
}

export type DashboardGenericProps<T = unknown> = {
  children: React.ReactNode
  className?: string
} & T

const brands = [
  'Toyota',
  'Volkswagen',
  'Ford',
  'Chevrolet',
  'Honda',
  'Nissan',
  'BMW',
  'Mercedes-Benz',
  'Audi',
  'Hyundai',
  'Kia',
  'Fiat',
  'Jeep',
  'Volvo',
  'Porsche',
  'Land Rover',
  'Jaguar',
  'Subaru',
  'Mazda',
  'Mitsubishi',
  'Peugeot',
  'Citroën',
  'Renault',
  'Lexus',
  'Tesla',
  'Dodge',
  'Chrysler',
  'Buick',
  'Cadillac',
  'GMC',
]

export default function DashboardPage() {
  const isTrue = true
  const vehicles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
  return (
    <Dashboard>
      <SiderBar>
        <SiderBarContent>
          <SiderBarHeader>
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Car className="h-6 w-6" />
              <span>Logo Veículos</span>
            </Link>
          </SiderBarHeader>
          <SiderBarBody>
            <SiderBarItem className="flex-row items-center justify-evenly gap-2 border-none">
              <Button
                asChild
                size={'xs'}
                variant={isTrue ? 'default' : 'outline'}
                className="flex-1"
              >
                <Link href="/carros">Carros</Link>
              </Button>
              <Button
                asChild
                variant={!isTrue ? 'default' : 'outline'}
                size={'xs'}
                className="flex-1"
              >
                <Link href="/motos">Motos</Link>
              </Button>
            </SiderBarItem>
            <SiderBarItem className="flex-col items-start">
              <SiderBarItemTitle title="Marcas" />
              <div className="flex flex-col gap-4 w-full">
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Marca" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {brands.map((brand) => (
                        <SelectItem value={brand} key={brand}>
                          {brand}
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
                      {brands.map((brand) => (
                        <SelectItem value={brand} key={brand}>
                          {brand}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </SiderBarItem>
            <SiderBarItem className="flex-col">
              <SiderBarItemTitle title="Ano" />
              <div className="flex flex-row justify-between items-center gap-2">
                <Input placeholder="De" />
                <Input placeholder="Até" />
              </div>
            </SiderBarItem>
            <SiderBarItem className="flex-col">
              <SiderBarItemTitle title="Quilometragem" />
              <div className="flex flex-row justify-between items-center gap-2">
                <Input placeholder="De" />
                <Input placeholder="Até" />
              </div>
            </SiderBarItem>
            <SiderBarItem className="flex-col">
              <SiderBarItemTitle title="Preço" />
              <div className="flex flex-row justify-between items-center gap-2">
                <Input placeholder="De" />
                <Input placeholder="Até" />
              </div>
            </SiderBarItem>
            <SiderBarItem className="flex-col">
              <SiderBarItemTitle title="Câmbio" />
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
            </SiderBarItem>
          </SiderBarBody>
        </SiderBarContent>
      </SiderBar>
      <DashboardContent>
        <DashboardHeader>
          <Navigation />
          <NavigationMobile />
        </DashboardHeader>
        <DashboardTopFilter>
          <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar por marca ou modelo"
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            />
          </div>
          <div>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Ordenar" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {brands.map((brand) => (
                    <SelectItem value={brand} key={brand}>
                      {brand}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </DashboardTopFilter>
        <DashboardMain>
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
              {vehicles.length} veículos disponíveis
            </p>
          </div>
          <ScrollArea className="w-full px-2">
            <div className="flex flex-row flex-wrap items-stretch justify-center gap-4 w-full place-content-stretch">
              {vehicles.map((car) => (
                <VehicleCard key={car} />
              ))}
            </div>
          </ScrollArea>
        </DashboardMain>
      </DashboardContent>
    </Dashboard>
  )
}

export function Dashboard({ className, children }: ComponentGenericProps) {
  return (
    <div
      className={cn([
        'grid min-h-screen w-full md:grid-cols-[280px_1fr]',
        className,
      ])}
    >
      {children}
    </div>
  )
}

export function DashboardContent({
  className,
  children,
}: ComponentGenericProps) {
  return <div className={cn(['flex flex-col', className])}>{children}</div>
}

export function DashboardHeader({
  className,
  children,
}: ComponentGenericProps) {
  return (
    <div
      className={cn([
        'flex h-14 items-center sm:justify-between gap-4 border-b px-4 lg:h-[60px] lg:px-6',
        className,
      ])}
    >
      {children}
    </div>
  )
}

export function DashboardTopFilter({
  className,
  children,
}: ComponentGenericProps) {
  return (
    <div
      className={cn(
        'w-full justify-end flex h-14 items-center gap-4 border-b px-4 lg:px-6',
        className,
      )}
    >
      {children}
    </div>
  )
}

export function DashboardMain({ className, children }: ComponentGenericProps) {
  return (
    <main
      className={cn(
        'flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-muted/40',
        className,
      )}
    >
      {children}
    </main>
  )
}

export function SiderBar({ className, children }: ComponentGenericProps) {
  return (
    <aside className={cn(['hidden md:block', className])}>{children}</aside>
  )
}

export function SiderBarContent({
  className,
  children,
}: ComponentGenericProps) {
  return (
    <div className={cn(['flex h-full max-h-screen flex-col', className])}>
      {children}
    </div>
  )
}

export function SiderBarHeader({ className, children }: ComponentGenericProps) {
  return (
    <div
      className={cn([
        'flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6',
        className,
      ])}
    >
      {children}
    </div>
  )
}

export function SiderBarBody({ className, children }: ComponentGenericProps) {
  return <div className={cn(['flex-1 border-r', className])}>{children}</div>
}

export function SiderBarItem({ className, children }: ComponentGenericProps) {
  return (
    <div
      className={cn([
        'text-sm font-normal py-4 px-4 border-b w-full flex',
        className,
      ])}
    >
      {children}
    </div>
  )
}

type SiderBarItemTitleProps = {
  className?: string
  title: string
}

export function SiderBarItemTitle({
  className,
  title,
}: SiderBarItemTitleProps) {
  return (
    <h3
      className={cn([
        'font-semibold text-xs mb-3 text-muted-foreground',
        className,
      ])}
    >
      {title}
    </h3>
  )
}
