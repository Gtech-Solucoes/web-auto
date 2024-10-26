import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import wpIcon from '../../public/assets/whatsapp.svg'

import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Footer } from '@/components/dashboard/footer'

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'Webauto | Compre, venda e financie carros usados, novos e motos',
  description: 'Veículos',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-background antialiased overflow-x-hidden',
          poppins.className,
        )}
      >
        {children}
        <Footer />
        <div className="fixed bottom-6 right-6 float-right w-12 h-12 flex justify-center cursor-pointer items-center bg-green-500 rounded-full ">
          <Image src={wpIcon} width={28} height={28} alt="WhatsApp Icon" />
        </div>
      </body>
    </html>
  )
}
