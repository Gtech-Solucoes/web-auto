import { AutoplayCarousel } from '@/components/autoplay-carousel/carousel'
import {
  Dashboard,
  DashboardContent,
  DashboardHeader,
} from '@/components/dashboard/dashboard'
import { HomePageVehicles } from '@/components/homepage-vehicles'
import { Navigation } from '@/components/navigation/navigation'
import { NavigationMobile } from '@/components/navigation/navigation-mobile'
import { Button } from '@/components/ui/button'

import { HandCoins, Headset, ShieldCheck, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const features = [
  {
    name: 'Garantia',
    icon: ShieldCheck,
    description:
      'Morbi viverra dui mi arcu sed. Tellus semper adipiscing suspendisse semper morbi. Odio urna massa nunc massa.',
  },
  {
    name: 'Financiamento',
    icon: HandCoins,
    description:
      'Morbi viverra dui mi arcu sed. Tellus semper adipiscing suspendisse semper morbi. Odio urna massa nunc massa.',
  },
  {
    name: 'Qualidade',
    icon: Star,
    description:
      'Morbi viverra dui mi arcu sed. Tellus semper adipiscing suspendisse semper morbi. Odio urna massa nunc massa.',
  },
  {
    name: 'Atendimento',
    icon: Headset,
    description:
      'Morbi viverra dui mi arcu sed. Tellus semper adipiscing suspendisse semper morbi. Odio urna massa nunc massa.',
  },
]

export default function Datail() {
  return (
    <Dashboard className="flex justify-center w-screen overflow-x-hidden relative">
      <DashboardContent className="w-full">
        <DashboardHeader className="bg-background">
          <Navigation />
          <NavigationMobile />
        </DashboardHeader>
        <div className="absolute sm:top-[60px] top-[360px] right-0 w-[78vw] sm:w-[40vw] sm:h-[40vh] h-[25vh] lg:h-[58vh] rounded-tl-[250px] rounded-bl-[450px] bg-primary z-[-1]"></div>

        <div className="hidden xl:flex absolute z-[-1] top-[400px] left-0 w-[58vw] h-[150px] rounded-tr-[20px] rounded-br-[90px] bg-primary"></div>

        <section className="w-full flex sm:flex-row flex-col sm:justify-center sm:h-[50vh] h-[60vh] sm:mt-20 mt-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="w-full flex items-center sm:items-start text-center sm:text-start flex-col">
            <h1 className="text-4xl lg:text-5xl font-bold">
              Seu próximo veículo está na NorthBens Veiculos
            </h1>
            <span className="text-lg pt-2 text-muted-foreground">
              Carros seminovos incríveis com qualidade certificada
            </span>
            <Button
              className="max-w-52 mt-3 font-bold text-base bg-black"
              size={'lg'}
            >
              <Link href="/comprar">Ver todos Veículos</Link>
            </Button>
          </div>
          <div className="w-full flex justify-end mt-4">
            <Image
              className="absolute lg:right-[-50px]
               w-[95vw] sm:w-[55vw] lg:w-[60vw] xl:w-[50vw] 2xl:w-[40vw] mt-4 sm:mt-0 right-[-10px] md:right-0 2xl:right-[200px] 2xl:top-[100px]"
              src={
                'https://fastback.fiat.com.br/images//Versions/fastback-turbo-at/249.webp'
              }
              width={1612}
              height={861}
              alt="Imagem de um carro"
            ></Image>
          </div>
        </section>

        <HomePageVehicles />

        <section className="py-24 sm:py-32 bg-current">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-primary">
                Nossa história
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                4 motivos para comprar seu novo Veículo com a North Bens
              </p>
              <p className="mt-6 text-lg leading-8 text-muted">
                Quis tellus eget adipiscing convallis sit sit eget aliquet quis.
                Suspendisse eget egestas a elementum pulvinar et feugiat blandit
                at. In mi viverra elit nunc.
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-16">
                    <dt className="text-base font-semibold leading-7 text-white">
                      <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                        <feature.icon
                          aria-hidden="true"
                          className="h-6 w-6 text-white"
                        />
                      </div>
                      {feature.name}
                    </dt>
                    <dd className="mt-2 text-base leading-7 text-muted">
                      {feature.description}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="flex w-full justify-center">
              <Button
                className="max-w-72 w-full mt-10 font-bold text-base bg-primary"
                size={'lg'}
              >
                <Link href="/comprar">Ver todos Veículos</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-24 sm:py32 xl:flex xl:items-center" id="vender">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 lg:flex">
            <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Troque ou venda
                <br />
                seu Veículo.
              </h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Ac euismod vel sit maecenas id pellentesque eu sed consectetur.
                Malesuada adipiscing sagittis vel nulla.
              </p>
              <Button
                className="max-w-72 w-full font-bold mt-8 text-base bg-black xl:flex hidden"
                size={'lg'}
              >
                <a href="https://api.whatsapp.com/send?phone=5517981667986&text=Ol%C3%A1%20gostaria%20de%20vender%20ou%20trocar%20meu%20carro.%0APode%20me%20ajudar%3F">
                  Quero vender ou trocar
                </a>
              </Button>
            </div>
            <div className="mt-16 h-full lg:mt-36 w-full">
              <Image
                alt="App screenshot"
                src="https://fastback.fiat.com.br/images//Versions/fastback-turbo-at/249.webp"
                width={1824}
                height={1080}
                className="max-w-screen lg:max-w-[50vw] xl:max-w-[45vw]"
              />
            </div>
          </div>
          <div className="flex justify-center xl:hidden">
            <Button
              className="max-w-72 w-full font-bold mt-8 text-base bg-black"
              size={'lg'}
            >
              <a href="https://api.whatsapp.com/send?phone=5517981667986&text=Ol%C3%A1%20gostaria%20de%20vender%20ou%20trocar%20meu%20carro.%0APode%20me%20ajudar%3F">
                Quero vender ou trocar
              </a>
            </Button>
          </div>
        </section>

        <section
          className="py-24 sm:py32 bg-current xl:flex xl:items-center"
          id="financiar"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8 lg:flex lg:flex-row-reverse">
            <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">
                Simule o financiamento do seu novo carro
              </h2>
              <p className="mt-6 text-lg leading-8 text-muted">
                Ac euismod vel sit maecenas id pellentesque eu sed consectetur.
                Malesuada adipiscing sagittis vel nulla.
              </p>
              <Button
                className="max-w-72 w-full mt-10 font-bold text-base bg-primary hidden xl:flex"
                size={'lg'}
              >
                <a href="https://api.whatsapp.com/send?phone=5517981667986&text=Ol%C3%A1%20gostaria%20de%20vender%20ou%20trocar%20meu%20carro.%0APode%20me%20ajudar%3F">
                  Fale com um consultor
                </a>
              </Button>
            </div>
            <div className="relative mt-16 h-full lg:mt-36">
              <Image
                alt="App screenshot"
                src="https://fastback.fiat.com.br/images//Versions/fastback-turbo-at/249.webp"
                width={1824}
                height={1080}
                className="max-w-screen lg:max-w-[50vw] xl:max-w-[45vw]"
              />
            </div>
          </div>
          <div className="flex justify-center xl:hidden">
            <Button
              className="max-w-72 w-full mt-10 font-bold text-base bg-primary "
              size={'lg'}
            >
              <a href="https://api.whatsapp.com/send?phone=5517981667986&text=Ol%C3%A1%20gostaria%20de%20vender%20ou%20trocar%20meu%20carro.%0APode%20me%20ajudar%3F">
                Fale com um consultor
              </a>
            </Button>
          </div>
        </section>

        <section className="py-24 sm:py32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7">Avaliações</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                Veja nossas avaliações
              </p>
            </div>
            <div className="py-10">
              <AutoplayCarousel></AutoplayCarousel>
            </div>
          </div>
        </section>
      </DashboardContent>
    </Dashboard>
  )
}
