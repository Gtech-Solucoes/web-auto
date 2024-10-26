import Link from 'next/link'
import { Search } from 'lucide-react'

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
  SideBarItem,
  SideBarItemTitle,
} from '@/components/dashboard/sidebar/sidebar'
import { orders } from '@/constants/order'

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

export default function ListVehicles() {
  const isTrue = true
  const vehicles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
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
                    variant={isTrue ? 'default' : 'outline'}
                    className="flex-1 text-sm"
                  >
                    <Link href="/carros">Carros</Link>
                  </Button>
                  <Button
                    asChild
                    variant={!isTrue ? 'default' : 'outline'}
                    size={'default'}
                    className="flex-1 text-sm"
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
          <div className="flex-1">
            <DashboardTopFilter>
              <div className="relative ml-auto flex-1 md:grow-0">
                <Search className="absolute right-3 top-2.5 h-5 w-5" />
                <Input
                  type="search"
                  placeholder="Buscar por marca ou modelo"
                  className="w-full text-base rounded-lg bg-background md:w-[200px] lg:w-[500px]"
                />
              </div>
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
              <div className="w-full px-2 h-full mb-20">
                <div className="flex flex-row flex-wrap items-stretch justify-center gap-4 w-full place-content-stretch">
                  {vehicles.map((car) => (
                    <VehicleCard key={car} />
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
