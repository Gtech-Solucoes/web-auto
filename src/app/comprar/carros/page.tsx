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
  SideBarHeader,
  SideBarItem,
  SideBarItemTitle,
} from '@/components/dashboard/sidebar/sidebar'

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

export const metadata: Metadata = {
  title: 'Carros usados e seminovos em São José do Rio Preto',
  description: 'Veículos',
}

export default function DashboardPage() {
  const isTrue = true
  const vehicles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
  return (
    <Dashboard>
      <SideBar>
        <SideBarContent>
          <SideBarHeader>
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Car className="h-6 w-6" />
              <span>Logo Veículos</span>
            </Link>
          </SideBarHeader>
          <SideBarBody>
            <SideBarItem className="flex-row items-center justify-evenly gap-2 border-none">
              <Button
                asChild
                size={'xs'}
                variant={isTrue ? 'default' : 'outline'}
                className="flex-1 text-xs"
              >
                <Link href="/carros">Carros</Link>
              </Button>
              <Button
                asChild
                variant={!isTrue ? 'default' : 'outline'}
                size={'xs'}
                className="flex-1 text-xs"
              >
                <Link href="/motos">Motos</Link>
              </Button>
            </SideBarItem>
            <SideBarItem className="flex-col items-start">
              <SideBarItemTitle title="Marcas" />
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
          <ScrollArea className="w-full px-2 md:h-[70vh] h-full">
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
