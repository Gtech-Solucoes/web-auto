'use client'

import { Button } from '../ui/button'
import { usePathname } from 'next/navigation'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import Link from 'next/link'
import { cars } from '@/constants/cars-brands'

export function SideBarFilter() {
  const pathname = usePathname().slice(1)
  const isCarPath = pathname === ''
  const isMotoPath = pathname === 'motos'

  return (
    <aside className="h-full w-full max-w-[300px] md:w-1/4 p-4 border-r">
      <div className="space-y-6">
        <div>
          <div className="w-full flex flex-row justify-between items-center">
            <Button
              asChild
              size={'default'}
              variant={isCarPath ? 'default' : 'outline'}
              className="px-6"
            >
              <Link href="/comprar/carros">Carros</Link>
            </Button>
            <Button
              asChild
              variant={isMotoPath ? 'default' : 'outline'}
              size={'default'}
              className="px-6"
            >
              <Link href="/comprar/motos">Motos</Link>
            </Button>
          </div>
        </div>
        <div>
          <h3 className="font-bold text-sm mb-2">Marcas</h3>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione uma marca" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {cars.map((brand) => (
                  <SelectItem value={brand.brand} key={brand.brand}>
                    {brand.brand}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div>
          <h3 className="font-bold text-sm mb-2">Ano</h3>
          <div className="flex flex-row justify-between items-center gap-2">
            <Input placeholder="De" />
            <Input placeholder="Até" />
          </div>
        </div>
        <div>
          <h3 className="font-bold text-sm mb-2">Quilometragem</h3>
          <div className="flex flex-row justify-between items-center gap-2">
            <Input placeholder="De" />
            <Input placeholder="Até" />
          </div>
        </div>
        <div>
          <h3 className="font-bold text-sm mb-2">Preço</h3>
          <div className="flex flex-row justify-between items-center gap-2">
            <Input placeholder="De" />
            <Input placeholder="Até" />
          </div>
        </div>
        <div>
          <h3 className="font-bold text-sm mb-2">Câmbio</h3>
          <div>
            <RadioGroup
              defaultValue=""
              className="flex flex-row gap-6 justify-start items-center"
            >
              <div className="flex items-center justify-center space-x-2">
                <RadioGroupItem value="carro" id="r1" />
                <Label htmlFor="r1" className="font-normal">
                  Manual
                </Label>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <RadioGroupItem value="moto" id="r2" />
                <Label htmlFor="r2" className="font-normal">
                  Automático
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>
    </aside>
  )
}
