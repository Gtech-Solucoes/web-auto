'use client'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import Image from 'next/image'
import { Button } from '../ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Link from 'next/link'
import { Vehicle } from '@/lib/actions/vehicles.action'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { addLead } from '@/lib/actions/lead.action'
import { useState } from 'react'

interface VehicleCardProps {
  data?: Partial<Vehicle>
}

export function VehicleCard({ data }: VehicleCardProps) {
  const urlType = data?.type === 'CARRO' ? 'carros' : 'motos'
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')

  const onConfirm = async () => {
    await addLead({
      name: customerName,
      message: 'Tenho interesse.',
      phone: customerPhone,
      interest: 'Comprar',
      vehicle: data?.id,
    })
  }

  return (
    <>
      <Card className="w-[300px]">
        <CardHeader className="w-full p-0 pb-2">
          <Carousel
            opts={{
              loop: true,
              align: 'center',
            }}
          >
            <CarouselContent>
              {data?.images?.map((image, index) => (
                <CarouselItem key={index}>
                  <Image
                    alt="Car image"
                    className="w-full rounded-t-lg"
                    height="200"
                    priority
                    src={image}
                    style={{
                      aspectRatio: '300/200',
                      objectFit: 'cover',
                      objectPosition: 'center',
                    }}
                    width={300}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious variant={'transparent'} />
            <CarouselNext variant={'transparent'} />
          </Carousel>
        </CardHeader>
        <Link
          href={`/comprar/${urlType}/${data?.brand}/${data?.model}/${data?.year}/detalhes/${data?.id}`}
        >
          <CardContent className="p-3 py-2">
            <div className="flex flex-col justify-between mb-2">
              <h3 className="font-medium text-normal uppercase">
                {`${data?.brand} ${data?.model}`}
              </h3>
              <p className="font-normal text-xs text-muted-foreground">
                {data?.description}
              </p>
            </div>

            <div className="flex flex-col justify-between py-2 pt-6">
              <div className="flex flex-row justify-between items-center mb-1">
                <h3 className="text-lg font-semibold">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    maximumFractionDigits: 0,
                    minimumFractionDigits: 0,
                  }).format(data!.price!)}
                </h3>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-xs text-muted-foreground">{`${data?.year}/${data?.modelYear}`}</span>
                <span className="text-xs text-muted-foreground">
                  {data?.km?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{' '}
                  km
                </span>
              </div>
            </div>
          </CardContent>
        </Link>
        <CardFooter className="p-0">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full rounded-none rounded-b-lg ">
                Enviar Mensagem
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Mensagem</DialogTitle>
                <DialogDescription>
                  Envie uma mensagem para um de nossos consultores
                </DialogDescription>
              </DialogHeader>
              <form className="grid gap-4 py-4">
                <div className=" items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Seu nome
                  </Label>
                  <Input
                    onChange={(e) => setCustomerName(e.target.value)}
                    value={customerName}
                    id="name"
                    placeholder="João da Silva"
                    className="col-span-3"
                  />
                </div>
                <div className="items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Telefone
                  </Label>
                  <Input
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    value={customerPhone}
                    id="Telefone"
                    placeholder="17 99999-9999"
                    className="col-span-3"
                  />
                </div>
              </form>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" onClick={onConfirm}>
                    Enviar
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </>
  )
}
