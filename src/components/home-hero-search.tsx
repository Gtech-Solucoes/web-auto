'use client'

import { useMemo, useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
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
import { cars } from '@/constants/cars-brands'
import { cn } from '@/lib/utils'
import { slugify } from '@/utils/utils'

type HomeHeroSearchProps = {
  className?: string
}

export function HomeHeroSearch({ className }: HomeHeroSearchProps) {
  const router = useRouter()
  const [brand, setBrand] = useState('')
  const [model, setModel] = useState('')

  const models = useMemo(() => {
    const selected = cars.find((car) => car.brand === brand)
    return selected?.models ?? []
  }, [brand])

  const handleBrandChange = (value: string) => {
    setBrand(value)
    setModel('')
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const brandSlug = slugify(brand)
    const modelSlug = slugify(model)

    let path = '/comprar/carros'

    if (brandSlug) {
      path += `/${brandSlug}`
    }

    if (brandSlug && modelSlug) {
      path += `/${modelSlug}`
    }

    router.push(path)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        'relative z-10 w-full max-w-xl rounded-2xl border border-muted-foreground/20 bg-background p-4 shadow-lg',
        className,
      )}
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-end">
        <div className="flex-1">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Marca
          </span>
          <Select onValueChange={handleBrandChange} value={brand}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {cars.map((car) => (
                  <SelectItem value={car.brand} key={car.brand}>
                    {car.brand}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Modelo
          </span>
          <Select onValueChange={setModel} value={model}>
            <SelectTrigger className="w-full" disabled={!brand}>
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {models.map((item) => (
                  <SelectItem value={item.name} key={item.name}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit" className="w-full md:w-auto">
          <Search className="mr-2 h-4 w-4" />
          Buscar
        </Button>
      </div>
      <div className="mt-3 flex justify-center">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/comprar/carros">Ver todos Veículos</Link>
        </Button>
      </div>
    </form>
  )
}
