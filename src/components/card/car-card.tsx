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

interface VehicleCardProps {
  data?: Partial<Vehicle>
}

export function VehicleCard({ data }: VehicleCardProps) {
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
                    src={image}
                    style={{
                      aspectRatio: '300/200',
                      objectFit: 'cover',
                      objectPosition: 'top',
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
        <Link href="/comprar/carros/fiat/uno/2015/detalhes/671ae4c13ef9973303edff1f">
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
                <h3 className="text-lg font-semibold">R$ {data?.price}</h3>
                <Button size={'xs'} variant={'outline'}>
                  Ver parcelas
                </Button>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-xs text-muted-foreground">{`${data?.year}/${data?.modelYear}`}</span>
                <span className="text-xs text-muted-foreground">
                  {data?.km} km
                </span>
              </div>
            </div>
          </CardContent>
        </Link>
        <CardFooter className="p-0">
          <Button className="w-full rounded-none rounded-b-lg ">
            Enviar Mensagem
          </Button>
        </CardFooter>
      </Card>
    </>
  )
}
