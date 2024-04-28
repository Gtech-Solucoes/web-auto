import { VehicleCard } from '@/components/card/car-card'
import { SideBarFilter } from '@/components/filters/sidebar-filter'
import { TopFilter } from '@/components/filters/top-filter'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbLink,
} from '@/components/ui/breadcrumb'

export default function Home() {
  const vehicles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
  return (
    <div className="bg-white w-full">
      <div className="w-full flex flex-row">
        <SideBarFilter />
        <div>
          <TopFilter />
          <main className="w-full p-6 bg-zinc-100">
            <Breadcrumb className="mb-2">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/carros">Components</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <h2 className="text-2xl font-bold">Carros</h2>
            <p className="text-xs mb-4 text-muted-foreground">
              {vehicles.length} veículos disponíveis
            </p>
            <div className="flex flex-row flex-wrap items-stretch justify-center gap-4 w-full place-content-stretch">
              {vehicles.map((car) => (
                <VehicleCard key={car} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
