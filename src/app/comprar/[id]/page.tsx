import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import {
  Dashboard,
  DashboardContent,
  DashboardHeader,
  DashboardMain,
} from "@/components/dashboard/dashboard";
import { Navigation } from "@/components/navigation/navigation";
import { NavigationMobile } from "@/components/navigation/navigation-mobile";
import { Car } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Toggle } from "@/components/ui/toggle";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function Datail() {
  const opcionais = [
    "Ar Condicionado",
    "Controle elétrico do vidros dianteiros",
    "Travas elétricas",
    "Retrovisores elétricos",
    "Alarme",
    "Bancos revestidos de couro",
    "Airbags frontais",
    "Limpador do vidro traseiro",
    "Desembaçador do vidro traseiro",
    "Rodas de liga leve",
  ];
  const adicionais = ["Garantia de fábrica", "Aceita troca"];
  const accordionData = [
    {
      id: "accordion-1",
      title: "Mecânica",
      content: "Yes. It adheres to the WAI-ARIA design pattern.",
    },
    {
      id: "accordion-2",
      title: "Dimensões",
      content: "Yes. It is styled using Tailwind CSS.",
    },
    {
      id: "accordion-3",
      title: "Segurança",
      content:
        "Yes. You can create multiple accordions using the same component.",
    },
    {
      id: "accordion-4",
      title: "Conforto",
      content:
        "Yes. You can create multiple accordions using the same component.",
    },
    {
      id: "accordion-5",
      title: "Som",
      content:
        "Yes. You can create multiple accordions using the same component.",
    },
    {
      id: "accordion-6",
      title: "Bancos",
      content:
        "Yes. You can create multiple accordions using the same component.",
    },
    {
      id: "accordion-7",
      title: "Janelas",
      content:
        "Yes. You can create multiple accordions using the same component.",
    },
    {
      id: "accordion-8",
      title: "Outros",
      content:
        "Yes. You can create multiple accordions using the same component.",
    },
  ];
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
            <Carousel className="">
              <CarouselContent>
                {Array.from([1, 2, 3, 4, 5, 6]).map((image) => (
                  <CarouselItem
                    key={image}
                    className="pl-2 md:basis-1/2 lg:basis-1/3"
                  >
                    <img
                      src="https://image1.mobiauto.com.br/images/api/images/v1.0/290534936/transform/fl_progressive,f_webp,q_70,w_800"
                      alt="corolla-preto-frente"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
          <div className="flex gap-20 mx-20">
            <div className="justify-between w-2/3">
              <div className="flex justify-between border-b-2">
                <div>
                  <h1>
                    <span className="text-2xl font-semibold">TOYOTA</span>
                    <span className="text-2xl font-semibold text-primary">
                      {" "}
                      COROLLA
                    </span>
                  </h1>
                  <h2>XEi 2.0 Flex</h2>
                </div>
                <div>
                  <p className="text-3xl font-semibold text-primary">
                    R$ 89.990
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-10 m-1">
                <div>
                  <h1>Ano</h1>
                  <p className="font-semibold">2022/2023</p>
                </div>
                <div>
                  <h1>Combustivel</h1>
                  <p className="font-semibold">Flex</p>
                </div>
                <div>
                  <h1>KM</h1>
                  <p className="font-semibold">0</p>
                </div>
                <div>
                  <h1>Câmbio</h1>
                  <p className="font-semibold">Automático</p>
                </div>
                <div>
                  <h1>Cor</h1>
                  <p className="font-semibold">Preto</p>
                </div>
                <div>
                  <h1>Carroceria</h1>
                  <p className="font-semibold">Sedan</p>
                </div>
              </div>
              <div className="mt-10">
                <h1 className="font-semibold text-xl">
                  Informações Adicionais
                </h1>
                <h2 className="text-gray-900 text-lg mt-2">
                  Opcionais e Itens de série:
                </h2>
                <div className=" gap-2 mt-2">
                  {opcionais.map((opcionaisItem, opcionaisIndex) => (
                    <Badge
                      key={opcionaisIndex}
                      variant="secondary"
                      className="text-sm"
                    >
                      {opcionaisItem}
                    </Badge>
                  ))}
                </div>
                <h2 className="text-gray-900 text-lg mt-2">Adicionais</h2>
                <div className="gap-2 mt-2">
                  {adicionais.map((adicionaisItem, adicionaisIndex) => (
                    <Badge
                      key={adicionaisIndex}
                      variant="secondary"
                      className="text-sm"
                    >
                      {adicionaisItem}
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
            <div>
              <div className="flex p-2 border border-1 bg-white">
                <form className="m-2 grid md:w-3/3 ">
                  <div className="mb-4 md:w-full">
                    <h1 className="font-semibold text-xl">
                      FALE COM O VENDEDOR
                    </h1>
                    <div className="flex flex-col gap-2">
                      <label
                        className="block text-sm font-medium  mt-5"
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
                  <p className="text-sm">Gostaria de (opcional):</p>
                  <div className="flex items-center mt-2 gap-3">
                    <div>
                      <Checkbox id="trade-in" />
                      <label className="ml-2 text-sm" htmlFor="trade-in">
                        Dar minha moto na troca
                      </label>
                    </div>
                    <div>
                      <Checkbox id="finance" />
                      <label className="ml-2 text-sm" htmlFor="finance">
                        Financiar
                      </label>
                    </div>
                  </div>
                  <div className="grid w-full gap-2 py-4">
                    <Label htmlFor="message">Mensagem pré definida</Label>
                    <Textarea
                      placeholder="Mensagem pré definida"
                      id="message"
                      defaultValue={"Olá, tenho interesse no veículo Toyota Corolla. Gostaria de receber mais informações sobre o carro. Poderia entrar em contato?"}
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
  );
}
