import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Image from 'next/image'
import { Button } from '../ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

export function VehicleCard() {
  return (
    <>
      <Card className="w-[230px]">
        <CardHeader className="w-full p-0 pb-2">
          <Carousel
            opts={{
              loop: true,
              align: 'center',
            }}
          >
            <CarouselContent>
              {Array.from([1, 2, 3]).map((image) => (
                <CarouselItem key={image}>
                  <Image
                    alt="Car image"
                    className="w-full rounded-t-lg"
                    height="200"
                    src="https://image1.mobiauto.com.br/images/api/images/v1.0/290534902/transform/fl_progressive,f_webp,q_70,w_800"
                    style={{
                      aspectRatio: '300/200',
                      objectFit: 'cover',
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
        <CardContent className="p-3 py-2">
          <div className="flex flex-col justify-between mb-2">
            <h3 className="font-medium text-normal uppercase">
              Toyota Corolla
            </h3>
            <p className="font-normal text-xs text-muted-foreground">
              1.6 VTI 120 FLEX FEEL EAT6
            </p>
          </div>

          <div className="flex flex-col justify-between py-2 pt-4">
            <div className="flex flex-row justify-between items-center mb-1">
              <h3 className="text-lg font-semibold">R$ 89.990</h3>
              <Button size={'xs'} variant={'outline'}>
                Ver parcelas
              </Button>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-xs text-muted-foreground">2022/2023</span>
              <span className="text-xs text-muted-foreground">98.736 km</span>
            </div>
          </div>
        </CardContent>
        <Button className="w-full rounded-none rounded-b-lg">
          Enviar Mensagem
        </Button>
      </Card>
    </>
  )
}
