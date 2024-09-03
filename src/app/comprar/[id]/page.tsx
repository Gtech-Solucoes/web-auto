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

export default function Datail() {
  const opcionais = [
    'Ar Condicionado',
    'Controle elétrico do vidros dianteiros',
    'Travas elétricas',
    'Retrovisores elétricos',
    'Alarme',
    'Bancos revestidos de couro',
    'Airbags frontais',
    'Limpador do vidro traseiro',
    'Desembaçador do vidro traseiro',
    'Rodas de liga leve',
  ]
  const accordionData = [
    {
      id: 'accordion-1',
      title: 'Mecânica',
      content: 'Yes. It adheres to the WAI-ARIA design pattern.',
    },
    {
      id: 'accordion-2',
      title: 'Dimensões',
      content: 'Yes. It is styled using Tailwind CSS.',
    },
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
                    Toyota Corolla 2022
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="w-full">
            <Carousel
              opts={{
                loop: true,
                align: 'center',
              }}
            >
              <CarouselContent>
                {Array.from([1, 2, 3, 4, 5, 6]).map((image) => (
                  <CarouselItem
                    key={image}
                    className="pl-1 md:basis-1/2 lg:basis-1/3"
                  >
                    <Image
                      src="https://image1.mobiauto.com.br/images/api/images/v1.0/290534936/transform/fl_progressive,f_webp,q_70,w_800"
                      alt="corolla-preto-frente"
                      width={800}
                      height={400}
                      objectFit="cover"
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
                  <h2 className="text-3xl font-bold">
                    TOYOTA
                    <span className="text-3xl font-bold text-primary">
                      {' '}
                      COROLLA
                    </span>
                  </h2>
                  <span className="text-muted-foreground font-normal">
                    XEi 2.0 Flex
                  </span>
                </div>
                <div>
                  <p className="text-4xl font-bold text-primary">R$ 89.990</p>
                </div>
              </div>

              {/* Principal Infos  */}
              <div className="grid grid-cols-3 gap-y-4 mt-8">
                <div>
                  <span className="text-xs text-muted-foreground">Ano</span>
                  <p className="font-semibold">2022/2023</p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">
                    Combustivel
                  </span>
                  <p className="font-semibold">Flex</p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">KM</span>
                  <p className="font-semibold">0</p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">Câmbio</span>
                  <p className="font-semibold">Automático</p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">Cor</span>
                  <p className="font-semibold">Preto</p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">
                    Carroceria
                  </span>
                  <p className="font-semibold">Sedan</p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">
                    Único dono
                  </span>
                  <p className="font-semibold">Sim</p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">
                    IPVA pago
                  </span>
                  <p className="font-semibold">Sim</p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">
                    Licenciado
                  </span>
                  <p className="font-semibold">Sim</p>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-muted-foreground text-sm mt-2 font-medium">
                  Sobre este carro:
                </h3>
                <p className="mt-4 text-sm">
                  Único dono, revisões feitas na autorizada, pacote premium (som
                  beats e teto solar), bateria nova (Moura), 100% original, já
                  instalado engate, manual e chave reserva, pra quem procura um
                  Compass de qualidade absoluta. A procura de um Jeep COMPASS -
                  Branco - seminovo? Aqui tem. Gostou deste carro? Temos uma
                  equipe de atendimento on-line pronta para te atender. Tire
                  todas suas dúvidas de forma rápida e descomplicada, entrando
                  em contato conosco, ou se preferir, faça uma visita, estamos
                  te esperando!
                </p>
              </div>

              <div className="mt-10">
                <h3 className="text-muted-foreground text-sm mt-2 font-medium">
                  Itens de série e/ou Opcionais:
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {opcionais.map((opcionaisItem, opcionaisIndex) => (
                    <Badge key={opcionaisIndex} variant="outline">
                      {opcionaisItem}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <h1 className="font-semibold text-xl mb-4">Ficha Técnica</h1>
                <Accordion type="single" collapsible>
                  {accordionData.map(({ id, title, content }) => (
                    <AccordionItem key={id} value={id}>
                      <AccordionTrigger>{title}</AccordionTrigger>
                      <AccordionContent>{content}</AccordionContent>
                    </AccordionItem>
                  ))}
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
                <form className="m-2 grid md:w-3/3 ">
                  <div className="mb-4 md:w-full">
                    <h2 className="font-semibold text-xl">
                      FALE COM O VENDEDOR
                    </h2>
                    <div className="flex flex-col gap-2">
                      <label
                        className="block text-sm font-medium  mt-2"
                        htmlFor="name"
                      ></label>
                      <Input id="name" placeholder="Nome" />
                      <label
                        className="block text-sm font-medium "
                        htmlFor="email"
                      ></label>
                      <Input id="email" placeholder="Email" />
                      <label
                        className="block text-sm font-medium "
                        htmlFor="telefone"
                      ></label>
                      <Input id="telefone" placeholder="Telefone" />
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
                      defaultValue={
                        'Olá, tenho interesse no veículo Toyota Corolla. Gostaria de receber mais informações sobre o carro. Poderia entrar em contato?'
                      }
                      rows={6}
                    />
                  </div>
                  <Button type="submit">Enviar Mensagem</Button>
                </form>
              </div>
            </div>
          </div>
        </DashboardMain>
      </DashboardContent>
    </Dashboard>
  )
}
