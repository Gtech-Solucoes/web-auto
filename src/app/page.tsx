'use client'

import { Navigation } from '@/components/navigation/navigation'
import { NavigationMobile } from '@/components/navigation/navigation-mobile'
import { Autocomplete } from '@/components/ui/autocomplete'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useState } from 'react'

export default function Home() {
  const [activeSearch, setActiveSearch] = useState('carros')
  const isCarActive = activeSearch === 'carros'
  const isMotoActive = activeSearch === 'motos'

  return (
    <div className="h-screen max-h-screen">
      <header className="bg-primary flex h-14 items-center sm:justify-between gap-4 px-4 lg:h-[60px] lg:px-6">
        <Navigation />
        <NavigationMobile />
      </header>
      <main className="bg-muted/40 h-full">
        <div className="flex justify-center w-full h-1/6 bg-primary relative">
          <Card className="w-2/5 absolute top-1/2">
            <CardContent>
              <div className="flex flex-col justify-center items-center">
                <div className="w-full flex flex-row pt-6 justify-center ">
                  <Button
                    variant={isCarActive ? 'default' : 'outline'}
                    size={'sm'}
                    className="px-14 rounded-full rounded-r-none border-r-none text-xs"
                    onClick={() => setActiveSearch('carros')}
                  >
                    Carros
                  </Button>
                  <Button
                    variant={isMotoActive ? 'default' : 'outline'}
                    size={'sm'}
                    className="px-14 rounded-full rounded-l-none border-l-none text-xs"
                    onClick={() => setActiveSearch('motos')}
                  >
                    Motos
                  </Button>
                </div>
                <div className="w-full mt-4 flex justify-center">
                  <div className="not-prose mt-8 flex flex-col gap-4">
                    <Autocomplete
                      placeholder="Busque uma marca ou modelo"
                      data={[
                        {
                          value: 'Toytoa Corolla',
                          label: 'Toytoa Corolla',
                        },
                        {
                          value: 'sveltekit',
                          label: 'SvelteKit',
                        },
                        {
                          value: 'nuxt.js',
                          label: 'Nuxt.js',
                        },
                        {
                          value: 'remix',
                          label: 'Remix',
                        },
                        {
                          value: 'astro',
                          label: 'Astro',
                        },
                        {
                          value: 'wordpress',
                          label: 'WordPress',
                        },
                        {
                          value: 'express.js',
                          label: 'Express.js',
                        },
                        {
                          value: 'nest.js',
                          label: 'Nest.js',
                        },
                      ]}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
