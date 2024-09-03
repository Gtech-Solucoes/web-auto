import Link from 'next/link'
import {
  Bike,
  Car,
  CircleDollarSign,
  Handshake,
  Menu,
  Phone,
} from 'lucide-react'

import { Button } from '@/components/ui/button'

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import React from 'react'

export function NavigationMobile() {
  return (
    <div className="w-full md:hidden flex justify-between items-center">
      <Link href="/" className="w-full flex items-center gap-2 font-semibold">
        <Car className="h-6 w-6" />
        <span>Logo Veículos</span>
      </Link>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Car className="h-6 w-6" />
              Logo Veículos
            </Link>
            <Link
              href="/"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <Car className="h-5 w-5" />
              Carros
            </Link>
            <Link
              href="/"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <Bike className="h-5 w-5" />
              Carros
            </Link>
            <Link
              href="/#vender"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <Handshake className="h-5 w-5" />
              Vender
            </Link>
            <Link
              href="/#financiar"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <CircleDollarSign className="h-5 w-5" />
              Financiamento
            </Link>
            <Link
              href="/"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <Phone className="h-5 w-5" />
              Contato
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  )
}
