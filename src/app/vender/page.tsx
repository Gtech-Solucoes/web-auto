import {
  Dashboard,
  DashboardContent,
  DashboardHeader,
} from '@/components/dashboard/dashboard'
import { Navigation } from '@/components/navigation/navigation'
import { NavigationMobile } from '@/components/navigation/navigation-mobile'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function Datail() {
  return (
    <Dashboard className="flex justify-center w-screen overflow-x-hidden">
      <DashboardContent className="w-full ">
        <DashboardHeader className="bg-background">
          <Navigation />
          <NavigationMobile />
        </DashboardHeader>
        <div className="absolute top-[60px] right-0 w-[40vw] h-[58vh] rounded-tl-[250px] rounded-bl-[450px] bg-primary z-[-1]"></div>

        <div className="absolute z-[-1] top-[400px] left-0 w-[58vw] h-[150px] rounded-tr-[20px] rounded-br-[90px] bg-primary"></div>

        <section className="max-w-screen-xl w-full flex justify-start h-[50vh] mt-20 mx-auto">
          <div className="min-w-[600px] w-full flex relative flex-col">
            <h1 className="text-5xl font-bold">
              Seu próximo veículo está na NorthBens Veiculos
            </h1>
            <span className="text-lg pt-2">
              Carros seminovos incríveis com qualidade certificada
            </span>
            <Button
              className="max-w-52 mt-3 font-bold text-base bg-black"
              size={'lg'}
            >
              Ver ofertas
            </Button>
          </div>
          <div className="w-full">
            <Image
              className="absolute w-[35%]"
              src={
                'https://fastback.fiat.com.br/images//Versions/fastback-turbo-at/249.webp'
              }
              width={1612}
              height={861}
              alt="Imagem de um carro"
            ></Image>
          </div>
        </section>
        <div className="w-full h-[900px] bg-background"></div>
      </DashboardContent>
    </Dashboard>
  )
}
