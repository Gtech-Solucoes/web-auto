import dynamic from "next/dynamic";
import {
  Dashboard,
  DashboardContent,
  DashboardHeader,
} from "@/components/dashboard/dashboard";
import { HomePageVehiclesSection } from "@/components/homepage-vehicles-section";
import { Navigation } from "@/components/navigation/navigation";
import { NavigationMobile } from "@/components/navigation/navigation-mobile";
import { Button } from "@/components/ui/button";
import { HomeHeroSearch } from "@/components/home-hero-search";
import { siteConfig, siteLinks } from "@/lib/site-config";

import { HandCoins, Headset, ShieldCheck, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const AutoplayCarousel = dynamic(
  () =>
    import("@/components/autoplay-carousel/carousel").then(
      (mod) => mod.AutoplayCarousel
    ),
  {
    loading: () => <div className="h-72 w-full" aria-hidden="true" />,
  }
);

const features = [
  {
    name: "Garantia",
    icon: ShieldCheck,
    description:
      "Oferecemos garantia em todos os veículos para que você possa comprar com total segurança. Nosso compromisso é garantir a sua tranquilidade e satisfação, com cobertura para possíveis reparos e manutenção.",
  },
  {
    name: "Financiamento",
    icon: HandCoins,
    description:
      "Facilitamos o seu financiamento com condições que cabem no seu bolso. Conte com o suporte de nossa equipe para encontrar as melhores taxas e formas de pagamento para a realização do seu sonho de ter um veículo próprio.",
  },
  {
    name: "Qualidade",
    icon: Star,
    description:
      "Nossos veículos são rigorosamente avaliados para garantir a melhor qualidade. Aqui, você encontra carros em excelentes condições, prontos para proporcionar uma experiência de direção segura e confortável.",
  },
  {
    name: "Atendimento",
    icon: Headset,
    description:
      "Nossa equipe está sempre pronta para te atender com dedicação e profissionalismo. Desde o primeiro contato até a entrega do veículo, garantimos um atendimento completo e personalizado para atender às suas necessidades.",
  },
];

export default function Datail() {
  return (
    <Dashboard className="flex justify-center w-screen overflow-x-hidden relative">
      <DashboardContent className="w-full">
        <DashboardHeader className="bg-background">
          <Navigation />
          <NavigationMobile />
        </DashboardHeader>
        <section className="relative overflow-hidden pt-12 pb-20 sm:pt-16 sm:pb-24">
          <div className="absolute inset-0 -z-10" aria-hidden="true">
            <div className="absolute -right-36 -top-16 h-[360px] w-[360px] rounded-full bg-primary sm:h-[460px] sm:w-[460px] lg:h-[560px] lg:w-[560px]"></div>
            <div className="absolute -left-24 bottom-6 h-[120px] w-[70%] max-w-[760px] rounded-r-[999px] bg-primary sm:bottom-10 sm:h-[150px]"></div>
          </div>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
              <div className="text-center lg:text-left">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
                  Seminovos certificados
                </p>
                <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                  Seu próximo veículo está na {siteConfig.accountName}
                </h1>
                <p className="mt-6 text-lg leading-8 text-muted-foreground">
                  Carros e motos selecionados com inspeção criteriosa, prontos
                  para você sair dirigindo com tranquilidade.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3 lg:justify-start">
                  <span className="rounded-full bg-primary px-3.5 py-1.5 text-[12px] font-semibold text-background">
                    Estoque atualizado
                  </span>
                  <span className="rounded-full bg-primary px-3.5 py-1.5 text-[12px] font-semibold text-background">
                    Avaliação transparente
                  </span>
                  <span className="rounded-full bg-primary px-3.5 py-1.5 text-[12px] font-semibold text-background">
                    Atendimento humano
                  </span>
                </div>
                <HomeHeroSearch className="mt-8" />
              </div>
              <div className="relative">
                <div className="absolute -left-6 top-20 z-10 hidden w-60 flex-col gap-3 rounded-2xl border border-foreground/10 bg-background/90 p-4 text-xs shadow-sm backdrop-blur xl:flex">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                    Destaques
                  </span>
                  <div className="space-y-3 border-t border-dashed border-foreground/20 pt-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Revisado</span>
                      <span className="text-xs text-muted-foreground">
                        Checklist
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Garantia</span>
                      <span className="text-xs text-muted-foreground">
                        Assistida
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Financiamento</span>
                      <span className="text-xs text-muted-foreground">
                        Flexível
                      </span>
                    </div>
                  </div>
                </div>
                <Image
                  className="relative z-20 pointer-events-none ml-auto w-[110%] max-w-[920px] sm:w-[112%] lg:w-[170%] lg:max-w-[1040px]"
                  src={"/assets/two-cars.png"}
                  width={1612}
                  height={861}
                  alt="Imagem de um carro"
                  priority
                  sizes="(min-width: 1280px) 45vw, (min-width: 1024px) 55vw, 100vw"
                />
              </div>
            </div>
          </div>
        </section>

        <HomePageVehiclesSection />

        <section className="relative overflow-hidden py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid items-end gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
              <div className="text-center lg:text-left">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
                  Nossa história
                </p>
                <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                  4 motivos para comprar seu novo veículo com a{" "}
                  {siteConfig.accountName}
                </h2>
                <p className="mt-6 text-lg leading-8 text-muted-foreground">
                  Do primeiro atendimento até a entrega, você encontra um
                  processo transparente, com suporte técnico e dedicação em cada
                  detalhe do veículo.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
                  <span className="rounded-full border border-foreground/10 bg-foreground/5 px-4 py-2 text-xs font-semibold text-foreground">
                    Processo transparente
                  </span>
                  <span className="rounded-full border border-foreground/10 bg-foreground/5 px-4 py-2 text-xs font-semibold text-foreground">
                    Inspeção criteriosa
                  </span>
                  <span className="rounded-full border border-foreground/10 bg-foreground/5 px-4 py-2 text-xs font-semibold text-foreground">
                    Atendimento humano
                  </span>
                </div>
              </div>
              <div className="rounded-3xl border border-foreground/10 bg-background/80 p-6 shadow-sm backdrop-blur">
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  <span>Relatório</span>
                  <span className="text-primary">Confiança</span>
                </div>
                <div className="mt-6 space-y-4 text-sm">
                  <div className="flex items-center justify-between border-b border-dashed border-foreground/20 pb-3">
                    <span className="font-semibold">Inspeção técnica</span>
                    <span className="text-muted-foreground">
                      Rigor em cada veículo
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-dashed border-foreground/20 pb-3">
                    <span className="font-semibold">Negociação clara</span>
                    <span className="text-muted-foreground">Sem surpresas</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Entrega segura</span>
                    <span className="text-muted-foreground">
                      Documentação cuidada
                    </span>
                  </div>
                </div>
                <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="h-2 w-2 rounded-full bg-primary"></span>
                  Suporte do início ao pós-venda
                </div>
              </div>
            </div>
            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              {features.map((feature, index) => (
                <div
                  key={feature.name}
                  className="group relative overflow-hidden rounded-2xl border border-foreground/10 bg-background/70 p-6 shadow-sm"
                >
                  <div className="absolute right-6 top-6 text-xs font-semibold text-muted-foreground">
                    {`#0${index + 1}`}
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                      <feature.icon aria-hidden="true" className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{feature.name}</h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  <div className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-primary/30"></div>
                </div>
              ))}
            </div>
            <div className="mt-12 flex flex-col items-center justify-between gap-4 rounded-2xl border border-foreground/10 bg-foreground/5 p-6 text-center md:flex-row md:text-left">
              <p className="text-sm text-muted-foreground">
                Pronto para escolher seu próximo veículo? A equipe acompanha
                você até a entrega.
              </p>
              <Button
                className="w-full max-w-72 font-bold text-base bg-primary"
                size={"lg"}
              >
                <Link href="/comprar/carros">Ver todos Veículos</Link>
              </Button>
            </div>
          </div>
        </section>

        <section
          className="relative overflow-hidden py-24 sm:py-32"
          id="vender"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
              <div className="text-center lg:text-left">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
                  Venda ou troca
                </p>
                <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                  Troque ou venda seu veículo com avaliação clara
                </h2>
                <p className="mt-6 text-lg leading-8 text-muted-foreground">
                  Envie os detalhes do carro, receba uma avaliação justa e
                  escolha o melhor caminho para fechar negócio com
                  tranquilidade.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
                  <span className="rounded-full border border-foreground/10 bg-foreground/5 px-4 py-2 text-xs font-semibold text-foreground">
                    Avaliação justa
                  </span>
                  <span className="rounded-full border border-foreground/10 bg-foreground/5 px-4 py-2 text-xs font-semibold text-foreground">
                    Sem burocracia
                  </span>
                  <span className="rounded-full border border-foreground/10 bg-foreground/5 px-4 py-2 text-xs font-semibold text-foreground">
                    Pagamento rápido
                  </span>
                </div>
                <div className="mt-10 flex flex-col items-center gap-4 lg:flex-row lg:items-center">
                  <Button
                    className="w-full max-w-72 font-bold text-base bg-black"
                    size={"lg"}
                  >
                    <a href={siteLinks.whatsappDefault}>
                      Quero vender ou trocar
                    </a>
                  </Button>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="h-2 w-2 rounded-full bg-primary"></span>
                    Resposta rápida no WhatsApp
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -left-10 top-10 hidden xl:flex w-[258px] flex-col gap-3 rounded-2xl border border-foreground/10 bg-background/80 p-4 text-xs shadow-sm backdrop-blur">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                    Ticket
                  </span>
                  <div className="space-y-3 border-t border-dashed border-foreground/20 pt-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">1. Avaliação</span>
                      <span className="text-xs text-muted-foreground">
                        15 min
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">2. Proposta</span>
                      <span className="text-xs text-muted-foreground">
                        Transparente
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">3. Fechamento</span>
                      <span className="text-xs text-muted-foreground">
                        No seu tempo
                      </span>
                    </div>
                  </div>
                </div>
                <Image
                  alt="Imagem de veículo para venda ou troca"
                  src={"/assets/car.webp"}
                  width={1200}
                  height={900}
                  className="w-full max-w-[560px] mx-auto"
                  sizes="(min-width: 1280px) 40vw, (min-width: 1024px) 50vw, 100vw"
                />
                <div className="mt-6 grid grid-cols-3 gap-3 text-center text-xs text-muted-foreground">
                  <div className="rounded-xl border border-foreground/10 bg-foreground/5 py-3">
                    Envio dos dados
                  </div>
                  <div className="rounded-xl border border-foreground/10 bg-foreground/5 py-3">
                    Avaliação
                  </div>
                  <div className="rounded-xl border border-foreground/10 bg-foreground/5 py-3">
                    Fechamento
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="relative overflow-hidden py-24 sm:py-32 bg-foreground text-background"
          id="financiar"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
              <div className="order-2 lg:order-1">
                <Image
                  alt="Imagem de financiamento de veículo"
                  src={"/assets/car-financiamento.png"}
                  width={1200}
                  height={900}
                  className="w-full max-w-[560px] mx-auto"
                  sizes="(min-width: 1280px) 40vw, (min-width: 1024px) 50vw, 100vw"
                />
                <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs text-background/70">
                  <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
                    Entrada flexível
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
                    Parcelas ajustadas
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
                    Resposta rápida
                  </span>
                </div>
              </div>
              <div className="order-1 text-center lg:order-2 lg:text-left">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
                  Financiamento
                </p>
                <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl text-background">
                  Simule o financiamento do seu novo carro
                </h2>
                <p className="mt-6 text-lg leading-8 text-background/70">
                  Descubra a melhor condição para o seu perfil, com parcelas que
                  cabem no seu orçamento e acompanhamento completo da equipe.
                </p>
                <div className="mt-8 grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-background">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Entrada flexível</span>
                    <span className="text-background/60">Personalizada</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Parcelas</span>
                    <span className="text-background/60">
                      Ajustadas ao perfil
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Prazo</span>
                    <span className="text-background/60">Até 60x</span>
                  </div>
                </div>
                <Button
                  className="mt-10 w-full max-w-72 font-bold text-base bg-primary"
                  size={"lg"}
                >
                  <a href={siteLinks.whatsappFinance}>Fale com um consultor</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid items-start gap-12 lg:grid-cols-[minmax(320px,0.95fr)_minmax(0,1.05fr)] lg:gap-20">
              <div className="text-center lg:text-left lg:pr-6">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
                  Avaliações
                </p>
                <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                  Veja o que os clientes dizem
                </h2>
                <p className="mt-6 text-lg leading-8 text-muted-foreground">
                  Depoimentos de pessoas que compraram, venderam ou financiaram
                  com a {siteConfig.accountName}.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
                  <span className="rounded-full border border-foreground/10 bg-foreground/5 px-4 py-2 text-xs font-semibold text-foreground">
                    Atendimento dedicado
                  </span>
                  <span className="rounded-full border border-foreground/10 bg-foreground/5 px-4 py-2 text-xs font-semibold text-foreground">
                    Processo transparente
                  </span>
                  <span className="rounded-full border border-foreground/10 bg-foreground/5 px-4 py-2 text-xs font-semibold text-foreground">
                    Experiência completa
                  </span>
                </div>
                <div className="mt-10 flex items-center justify-center gap-2 text-sm text-muted-foreground lg:justify-start">
                  <span className="h-2 w-2 rounded-full bg-primary"></span>
                  Relatos reais de clientes.
                </div>
              </div>
              <div className="min-w-0 rounded-3xl border border-foreground/10 bg-background/80 p-6 shadow-sm backdrop-blur">
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  <span>Feedback</span>
                  <span className="text-primary">Experiências</span>
                </div>
                <div className="mt-6 overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/5 p-4">
                  <AutoplayCarousel></AutoplayCarousel>
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="h-2 w-2 rounded-full bg-primary"></span>
                  Depoimentos publicados pelos clientes.
                </div>
              </div>
            </div>
          </div>
        </section>
      </DashboardContent>
    </Dashboard>
  );
}
