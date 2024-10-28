'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel'
import {
  Dashboard,
  DashboardContent,
  DashboardHeader,
  DashboardMain,
} from '@/components/dashboard/dashboard'
import { Navigation } from '@/components/navigation/navigation'
import { NavigationMobile } from '@/components/navigation/navigation-mobile'
import { Input } from '@/components/ui/input'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Badge } from '@/components/ui/badge'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import useSWR from 'swr'
import { getVehicleById } from '@/lib/actions/vehicles.action'
import { booleanToHuman, capitalize } from '@/utils/utils'
import { LoadingSpinner } from '@/components/loading-spinner'
import { HomePageVehicles } from '@/components/homepage-vehicles'
import { useState } from 'react'
import { addLead } from '@/lib/actions/lead.action'

export default function Datail({ id }: { id: string }) {
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [customerMessage, setCustomerMessage] = useState(
    'Olá, tenho interesse no veículo Toyota Corolla. Gostaria de receber mais informações sobre o carro. Poderia entrar em contato?',
  )
  const { data, isLoading } = useSWR(`vehicle-${id}}`, () => getVehicleById(id))

  const onConfirm = async () => [
    await addLead({
      name: customerName,
      message: customerMessage,
      phone: customerPhone,
      interest: 'Comprar',
      vehicle: data?.id,
    }),
  ]

  return (
    <Dashboard className="flex justify-center w-screen">
      <DashboardContent className="w-full">
        <DashboardHeader>
          <Navigation />
          <NavigationMobile />
        </DashboardHeader>
        <DashboardMain>
          <div>
            <Breadcrumb className="mb-2">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/carros">Carros</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/comprar/123">
                    {`${data?.brand} ${data?.model} ${data?.year}`}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          {isLoading ? (
            <div className="w-screen h-screen flex items-center justify-center">
              <LoadingSpinner className="w-28 h-28" />
            </div>
          ) : (
            <>
              <div className="w-full">
                <Carousel
                  opts={{
                    loop: true,
                    align: 'center',
                  }}
                >
                  <CarouselContent>
                    {data?.images.map((image, index) => (
                      <CarouselItem
                        key={index}
                        className="pl-1 md:basis-1/2 lg:basis-1/3"
                      >
                        <Image
                          className="object-cover h-full"
                          src={image}
                          alt={`${data?.brand} ${data?.model} ${data?.year}`}
                          width={800}
                          height={400}
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
              <div className="flex justify-center gap-x-8 mt-5">
                {/*  CONTENT */}
                <div className="w-2/3 max-w-[700px]">
                  <div className="flex justify-between">
                    <div>
                      <h2 className="text-3xl font-bold uppercase">
                        {data?.brand}
                        <span className="text-3xl font-bold text-primary uppercase">
                          {' '}
                          {data?.model}
                        </span>
                      </h2>
                      <span className="text-muted-foreground font-normal">
                        {data?.description}
                      </span>
                    </div>
                    <div>
                      <p className="text-4xl font-bold text-primary">
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                          maximumFractionDigits: 0,
                          minimumFractionDigits: 0,
                        }).format(data!.price!)}
                      </p>
                    </div>
                  </div>

                  {/* Principal Infos  */}
                  <div className="grid grid-cols-3 gap-y-4 mt-8">
                    <div>
                      <span className="text-xs text-muted-foreground">Ano</span>
                      <p className="font-semibold">{`${data?.year}/${data?.modelYear}`}</p>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground">
                        Combustivel
                      </span>
                      <p className="font-semibold">{capitalize(data?.fuel)}</p>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground">KM</span>
                      <p className="font-semibold">{data?.km}</p>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground">
                        Câmbio
                      </span>
                      <p className="font-semibold">
                        {capitalize(data?.exchange)}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground">Cor</span>
                      <p className="font-semibold">{data?.color}</p>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground">
                        Carroceria
                      </span>
                      <p className="font-semibold">{capitalize(data?.body)}</p>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground">
                        Único dono
                      </span>
                      <p className="font-semibold">
                        {booleanToHuman(data?.singleOwner)}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground">
                        IPVA pago
                      </span>
                      <p className="font-semibold">
                        {booleanToHuman(data?.paidIPVA)}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground">
                        Licenciado
                      </span>
                      <p className="font-semibold">
                        {booleanToHuman(data?.licensed)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-10">
                    <h3 className="text-muted-foreground text-sm mt-2 font-medium">
                      Sobre este carro:
                    </h3>
                    <p className="mt-4 text-sm">{data?.about}</p>
                  </div>

                  <div className="mt-10">
                    <h3 className="text-muted-foreground text-sm mt-2 font-medium">
                      Itens de série e/ou Opcionais:
                    </h3>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {data?.itens?.map((opcionaisItem, opcionaisIndex) => (
                        <Badge key={opcionaisIndex} variant="outline">
                          {opcionaisItem}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8">
                    <h1 className="font-semibold text-xl mb-4">
                      Ficha Técnica
                    </h1>
                    <Accordion type="single" collapsible>
                      <AccordionItem key={id} value={id}>
                        <AccordionTrigger>Dimensões</AccordionTrigger>
                        <AccordionContent className="flex justify-between max-w-[60%]">
                          <div className="flex flex-col space-y-4">
                            <div className="flex flex-col">
                              <span className="text-muted-foreground">
                                Largura {'(mm)'}
                              </span>
                              <span className="text-muted-foreground">
                                {data?.width}
                              </span>
                            </div>

                            <div className="flex flex-col">
                              <span className="text-muted-foreground">
                                Altura {'(mm)'}
                              </span>
                              <span className="text-muted-foreground">
                                {data?.height}
                              </span>
                            </div>

                            <div className="flex flex-col">
                              <span className="text-muted-foreground">
                                Tanque
                              </span>
                              <span className="text-muted-foreground">
                                {data?.tank} {'(L)'}
                              </span>
                            </div>

                            <div className="flex flex-col">
                              <span className="text-muted-foreground">
                                Porta-Malas {'(L)'}
                              </span>
                              <span className="text-muted-foreground">
                                {data?.trunk}
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-col space-y-4">
                            <div className="flex flex-col">
                              <span className="text-muted-foreground">
                                Comprimento
                              </span>
                              <span className="text-muted-foreground">
                                {data?.length}
                              </span>
                            </div>

                            <div className="flex flex-col">
                              <span className="text-muted-foreground">
                                Entre-eixos
                              </span>
                              <span className="text-muted-foreground">
                                {data?.wheelbase} {'(mm)'}
                              </span>
                            </div>

                            <div className="flex flex-col">
                              <span className="text-muted-foreground">
                                Peso {'(kg)'}
                              </span>
                              <span className="text-muted-foreground">
                                {data?.weight}
                              </span>
                            </div>

                            <div className="flex flex-col">
                              <span className="text-muted-foreground">
                                Ocupantes
                              </span>
                              <span className="text-muted-foreground">
                                {data?.occupants}
                              </span>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                    <p className="text-xs text-gray-500">
                      *Informações fornecidas pelo fabricante e não,
                      necessariamente, condizem com a condição do veículo.
                    </p>
                  </div>
                </div>

                {/* FORM */}
                <div>
                  <div className="flex flex-1 p-2 border border-1 bg-white">
                    <div className="m-2 grid md:w-3/3 ">
                      <div className="mb-4 md:w-full">
                        <h2 className="font-semibold text-xl">
                          Fale com um vendedor
                        </h2>
                        <div className="flex flex-col gap-2">
                          <label
                            className="block text-sm font-medium  mt-2"
                            htmlFor="name"
                          ></label>
                          <Input
                            id="name"
                            placeholder="Nome"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                          />
                          <label
                            className="block text-sm font-medium "
                            htmlFor="telefone"
                          ></label>
                          <Input
                            id="telefone"
                            placeholder="Telefone"
                            value={customerPhone}
                            onChange={(e) => setCustomerPhone(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="flex flex-col w-full">
                        <Label className="text-xs mb-2" htmlFor="message">
                          Mensagem pré definida
                        </Label>
                        <Textarea
                          className="mb-4"
                          placeholder="Mensagem pré definida"
                          id="message"
                          defaultValue={customerMessage}
                          rows={6}
                        />
                      </div>
                      <Button onClick={onConfirm}>Enviar Mensagem</Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full h-full py-8">
                <HomePageVehicles />
              </div>
            </>
          )}
        </DashboardMain>
      </DashboardContent>
    </Dashboard>
  )
}
